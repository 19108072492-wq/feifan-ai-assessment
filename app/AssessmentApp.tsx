"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  getQuestionsForRole,
  getOpenPromptForRole,
  roles as roleOptions,
  shuffledOptions,
  dimensions,
} from "@/lib/assessment.mjs";
import { apiRequest } from "@/lib/api.mjs";
import { ReportView } from "./components/ReportView";
import { TeacherDashboard } from "./components/TeacherDashboard";

type SessionInfo = { id: string; code: string; title: string; cohort: string; status: string };
type Profile = { name: string; role: string; roleKey: string };

function makeIdempotencyKey() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function findRoleKey(label) {
  const match = roleOptions.find((r) => r.label === label);
  return match ? match.id : "general";
}

export function AssessmentApp() {
  const [mode, setMode] = useState<"landing" | "profile" | "assessment" | "generating" | "report" | "teacher">("landing");
  const [sessionCode, setSessionCode] = useState("");
  const [session, setSession] = useState<SessionInfo | null>(null);
  const [profile, setProfile] = useState<Profile>({ name: "", role: "", roleKey: "general" });
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [openPrompt, setOpenPrompt] = useState("");
  const [current, setCurrent] = useState(0);
  const [report, setReport] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [seed] = useState(() => Math.floor(Math.random() * 100000));
  const [idempotencyKey, setIdempotencyKey] = useState(() => makeIdempotencyKey());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("teacher") === "1") {
      setMode("teacher");
      return;
    }
    const reportToken = params.get("report");
    if (reportToken) {
      setMode("generating");
      void loadReport(reportToken);
      return;
    }
    const code = params.get("s");
    if (code) {
      setSessionCode(code.toUpperCase());
      void loadSession(code.toUpperCase());
    }
  }, []);

  // 当 profile.roleKey 改变时，重置 current 到 0（避免越界）
  useEffect(() => {
    if (mode === "assessment" || mode === "profile") {
      setCurrent(0);
    }
  }, [profile.roleKey, mode]);

  useEffect(() => {
    if (!session?.code || mode !== "assessment") return;
    const draft = { profile, answers, openPrompt, current, idempotencyKey };
    localStorage.setItem(`ai-assessment-draft:${session.code}`, JSON.stringify(draft));
  }, [answers, current, idempotencyKey, mode, openPrompt, profile, session?.code]);

  const questionList = useMemo(() => getQuestionsForRole(profile.roleKey), [profile.roleKey]);
  const totalQuestions = questionList.length;
  const question = current < totalQuestions ? questionList[current] : null;
  const displayedOptions = useMemo(
    () => (question ? shuffledOptions(question, seed + current * 101) : []),
    [current, question, seed],
  );

  async function loadSession(code: string) {
    setLoading(true);
    setMessage("");
    try {
      const data = await apiRequest(`/session/${encodeURIComponent(code)}`);
      setSession(data.session);
      const rawDraft = localStorage.getItem(`ai-assessment-draft:${code}`);
      if (rawDraft) {
        const draft = JSON.parse(rawDraft);
        if (draft.profile) {
          setProfile({
            name: draft.profile.name || "",
            role: draft.profile.role || "",
            roleKey: draft.profile.roleKey || findRoleKey(draft.profile.role),
          });
        }
        setAnswers(draft.answers || {});
        setOpenPrompt(draft.openPrompt || "");
        setCurrent(Number(draft.current) || 0);
        setIdempotencyKey(draft.idempotencyKey || makeIdempotencyKey());
      }
      setMode("profile");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "场次读取失败");
      setMode("landing");
    } finally {
      setLoading(false);
    }
  }

  async function loadReport(token: string) {
    setMessage("");
    try {
      const data = await apiRequest(`/report/${encodeURIComponent(token)}`);
      setReport(data.report);
      if (data.report.aiStatus === "pending" || data.report.aiStatus === "failed") {
        try {
          await apiRequest(`/report/${encodeURIComponent(token)}/analyze`, { method: "POST" });
          const refreshed = await apiRequest(`/report/${encodeURIComponent(token)}`);
          setReport(refreshed.report);
        } catch (error) {
          setMessage(error instanceof Error ? error.message : "AI点评暂未生成");
        }
      }
      setMode("report");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "报告读取失败");
      setMode("landing");
    }
  }

  function enterSession(event: FormEvent) {
    event.preventDefault();
    const code = sessionCode.trim().toUpperCase();
    if (!code) return setMessage("请输入场次码");
    history.replaceState({}, "", `?s=${encodeURIComponent(code)}`);
    void loadSession(code);
  }

  function beginAssessment(event: FormEvent) {
    event.preventDefault();
    if (!profile.name.trim()) return setMessage("请填写姓名");
    if (!profile.role) return setMessage("请选择岗位");
    setMessage("");
    setMode("assessment");
  }

  function chooseAnswer(optionId: string) {
    if (!question) return;
    setAnswers((value) => ({ ...value, [question.id]: optionId }));
  }

  function toggleMultiOption(optionId: string) {
    if (!question || question.kind !== "multi") return;
    setAnswers((value) => {
      const currentValue = value[question.id];
      const selected = Array.isArray(currentValue) ? currentValue : [];
      if (question.id === "f-q5" && optionId === "f-q5-none") {
        return { ...value, [question.id]: selected.includes(optionId) ? [] : [optionId] };
      }
      const withoutNone = question.id === "f-q5" ? selected.filter((id) => id !== "f-q5-none") : selected;
      const next = withoutNone.includes(optionId)
        ? withoutNone.filter((id) => id !== optionId)
        : [...withoutNone, optionId];
      return { ...value, [question.id]: next };
    });
  }

  async function submitAssessment() {
    if (openPrompt.trim().length < 30) return setMessage("请写出至少30字的完整提示词");
    if (!session) return;
    setMode("generating");
    setMessage("");
    try {
      const response = await apiRequest("/submit", {
        method: "POST",
        body: JSON.stringify({
          sessionCode: session.code,
          participantName: profile.name.trim(),
          participantRole: profile.role,
          participantRoleKey: profile.roleKey,
          answers: questionList.map((item) => answers[item.id] || (item.kind === "multi" ? [] : "")),
          openPrompt: openPrompt.trim(),
          idempotencyKey,
        }),
      });
      localStorage.removeItem(`ai-assessment-draft:${session.code}`);
      history.replaceState({}, "", `?report=${encodeURIComponent(response.reportToken)}`);
      await loadReport(response.reportToken);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "提交失败，请稍后重试");
      setMode("assessment");
    }
  }

  if (mode === "teacher") return <TeacherDashboard onExit={() => { history.replaceState({}, "", window.location.pathname); setMode("landing"); }} />;
  if (mode === "report" && report) return <ReportView report={report} message={message} />;
  if (mode === "generating") {
    return (
      <main className="center-page">
        <section className="generating-card">
          <div className="pulse-mark">AI</div>
          <p className="eyebrow">DeepSeek 正在生成</p>
          <h1>答卷已经安全保存</h1>
          <p>DeepSeek 正在按七项固定量表分析你的提示词；服务异常时自动回退到本地启发式分析。</p>
          <div className="loading-line"><span /></div>
        </section>
      </main>
    );
  }

  if (mode === "profile" && session) {
    return (
      <main className="center-page">
        <section className="form-card">
          <p className="eyebrow">{session.cohort || "现场测评"}</p>
          <h1>{session.title}</h1>
          <p className="muted">填写真实信息。我们会根据你的岗位出针对性题目，个人结果仅教师后台可见；课堂投屏只展示匿名分布。</p>
          <form onSubmit={beginAssessment} className="stack-form">
            <label>姓名<input value={profile.name} maxLength={30} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="请输入姓名" /></label>
            <label>岗位<select value={profile.role} onChange={(e) => {
              const label = e.target.value;
              setProfile({ ...profile, role: label, roleKey: findRoleKey(label) });
            }}><option value="">请选择岗位（不同岗位会出不同题）</option>{roleOptions.map((r) => <option key={r.id} value={r.label}>{r.label}</option>)}</select></label>
            {profile.role && (
              <div className="role-hint">
                你将看到针对【{profile.role}】的 {totalQuestions} 道题
                ，AI 点评将由 DeepSeek 分析，服务异常时自动回退
              </div>
            )}
            {message && <p className="error-text">{message}</p>}
            <button className="primary-button" type="submit">开始测评</button>
          </form>
        </section>
      </main>
    );
  }

  if (mode === "assessment" && question) {
    const selected = answers[question.id];
    const selectedIds = Array.isArray(selected) ? selected : selected ? [selected] : [];
    const hasSelection = selectedIds.length > 0;
    const progress = Math.round(((current + 1) / totalQuestions) * 100);
    return (
      <main className="assessment-page">
        <header className="assessment-header">
          <div><span className="brand-mark">AI</span><span>{session?.title} · {profile.role}</span></div>
          <span>{current + 1} / {totalQuestions}</span>
        </header>
        <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
        <section className="question-card">
          <p className="eyebrow">{question.kind === "style" ? "使用偏好题 · 没有标准答案" : "AI能力探究"}</p>
          <h1>{question.prompt}</h1>
          {question.kind === "multi" && <p className="multi-hint">可多选，请按真实使用情况选择</p>}
          <div className="option-list">
            {displayedOptions.map((option, index) => (
              <button key={option.id} type="button" className={`option-button ${selectedIds.includes(option.id) ? "selected" : ""}`} onClick={() => question.kind === "multi" ? toggleMultiOption(option.id) : chooseAnswer(option.id)}>
                <span>{question.kind === "multi" && selectedIds.includes(option.id) ? "✓" : String.fromCharCode(65 + index)}</span>{option.text}
              </button>
            ))}
          </div>
          <div className="question-actions">
            <button type="button" className="text-button" disabled={current === 0} onClick={() => setCurrent((value) => value - 1)}>上一题</button>
            <button type="button" className="primary-button" disabled={!hasSelection} onClick={() => setCurrent((value) => value + 1)}>下一题</button>
          </div>
        </section>
      </main>
    );
  }

  if (mode === "assessment" && current === totalQuestions) {
    return (
      <main className="assessment-page">
        <header className="assessment-header"><div><span className="brand-mark">AI</span><span>真实提示词任务</span></div><span>{totalQuestions} / {totalQuestions}</span></header>
        <div className="progress-track"><span style={{ width: "100%" }} /></div>
        <section className="question-card open-card">
          <p className="eyebrow">开放题 · 按你真实会使用的方式作答</p>
          <h1>请写出一段你会直接交给 AI 的完整提示词</h1>
          <div className="scenario-box">{getOpenPromptForRole(profile.roleKey)}</div>
          <textarea value={openPrompt} onChange={(e) => setOpenPrompt(e.target.value)} maxLength={2000} placeholder="请在这里写下完整提示词……" />
          <div className="textarea-meta"><span>至少30字</span><span>{openPrompt.length} / 2000</span></div>
          {message && <p className="error-text">{message}</p>}
          <div className="question-actions"><button className="text-button" onClick={() => setCurrent(totalQuestions - 1)}>上一题</button><button className="primary-button" onClick={() => void submitAssessment()}>提交并生成画像</button></div>
        </section>
      </main>
    );
  }

  return (
    <main className="landing-page">
      <nav className="top-nav"><div><span className="brand-mark">AI</span><strong>非凡 · AI学习实验室</strong></div><button className="text-button" onClick={() => { history.replaceState({}, "", "?teacher=1"); setMode("teacher"); }}>教师后台</button></nav>
      <section className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">AI能力与风格测评 · ASSESSMENT V2</p>
          <h1>看见你的<br /><em>AI 工作方式</em></h1>
          <p className="hero-description">根据你的岗位（教师 / 顾问 / 班主任 / 管培生 / 教学管理）出 22 道针对性题，加上一段真实提示词任务。约10分钟，获得六维能力、成长等级与AI使用风格画像。</p>
          <div className="feature-row"><span>按岗位出题</span><span>六维能力雷达</span><span>三轴8型风格</span><span>提示词升级建议</span></div>
        </div>
        <form className="join-card" onSubmit={enterSession}>
          <div className="join-number">01</div>
          <p className="eyebrow">加入课堂测评</p>
          <h2>输入场次码</h2>
          <input value={sessionCode} onChange={(e) => setSessionCode(e.target.value.toUpperCase())} placeholder="例如 A7K9Q2" maxLength={8} autoCapitalize="characters" />
          {message && <p className="error-text">{message}</p>}
          <button className="primary-button" type="submit" disabled={loading}>{loading ? "正在连接…" : "进入测评"}</button>
          <p className="privacy-note">姓名仅用于教师课后指导，不参与公开排名。</p>
        </form>
      </section>
      <footer className="landing-footer"><span>课程起点画像，不是标准化心理测验</span><span>约 10–12 分钟</span></footer>
    </main>
  );
}
