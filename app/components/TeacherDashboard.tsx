"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { apiRequest, adminHeaders, downloadCsv } from "@/lib/api.mjs";
import { dimensions } from "@/lib/assessment.mjs";
import { StyleAtlas } from "./StyleAtlas";

function QrImage({ url }: { url: string }) {
  const [src, setSrc] = useState("");
  useEffect(() => { void QRCode.toDataURL(url, { width: 320, margin: 1, color: { dark: "#171713", light: "#ffffff" } }).then(setSrc); }, [url]);
  return src ? <img className="qr-image" src={src} alt="学员扫码进入本场测评" /> : <div className="qr-placeholder">正在生成二维码</div>;
}

export function TeacherDashboard({ onExit }: { onExit: () => void }) {
  const [token, setToken] = useState(() => typeof window === "undefined" ? "" : sessionStorage.getItem("ai-assessment-admin-token") || "");
  const [accessCode, setAccessCode] = useState("");
  const [sessions, setSessions] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [dashboard, setDashboard] = useState<any>(null);
  const [title, setTitle] = useState("AI能力与风格测评");
  const [cohort, setCohort] = useState("");
  const [filter, setFilter] = useState({ level: "", style: "", role: "" });
  const [message, setMessage] = useState("");
  const [showAtlas, setShowAtlas] = useState(false);

  useEffect(() => { if (token) void loadSessions(); }, [token]);
  useEffect(() => {
    if (!selectedId || !token) return;
    void loadDashboard(selectedId);
    const interval = window.setInterval(() => void loadDashboard(selectedId, true), 5000);
    return () => window.clearInterval(interval);
  }, [selectedId, token]);

  async function adminRequest(path: string, options: any = {}) {
    return apiRequest(path, { ...options, headers: { ...adminHeaders(), ...(options.headers || {}) } });
  }
  async function loadSessions() {
    try {
      const data = await adminRequest("/admin/sessions");
      setSessions(data.sessions || []);
      if (!selectedId && data.sessions?.[0]) setSelectedId(data.sessions[0].id);
    } catch (error) { setMessage(error instanceof Error ? error.message : "后台读取失败"); }
  }
  async function loadDashboard(id: string, quiet = false) {
    try { const data = await adminRequest(`/admin/sessions/${id}/dashboard`); setDashboard(data.dashboard); }
    catch (error) { if (!quiet) setMessage(error instanceof Error ? error.message : "看板读取失败"); }
  }
  async function login(event: FormEvent) {
    event.preventDefault(); setMessage("");
    try {
      const data = await apiRequest("/admin/login", { method: "POST", body: JSON.stringify({ accessCode }) });
      sessionStorage.setItem("ai-assessment-admin-token", data.token); setToken(data.token); setAccessCode("");
    } catch (error) { setMessage(error instanceof Error ? error.message : "登录失败"); }
  }
  async function createSession(event: FormEvent) {
    event.preventDefault();
    try {
      const data = await adminRequest("/admin/sessions", { method: "POST", body: JSON.stringify({ title, cohort }) });
      setCohort(""); await loadSessions(); setSelectedId(data.session.id);
    } catch (error) { setMessage(error instanceof Error ? error.message : "创建失败"); }
  }
  async function updateSession(status: string) {
    await adminRequest(`/admin/sessions/${selectedId}`, { method: "PATCH", body: JSON.stringify({ status }) });
    await Promise.all([loadSessions(), loadDashboard(selectedId)]);
  }
  async function deleteSession() {
    if (!confirm("确认删除整场测评及所有姓名、答卷和报告？此操作不可撤销。")) return;
    await adminRequest(`/admin/sessions/${selectedId}`, { method: "DELETE" });
    setDashboard(null); setSelectedId(""); await loadSessions();
  }
  async function retrySubmission(id: string) {
    setMessage("");
    try {
      await adminRequest(`/admin/submissions/${id}/retry`, { method: "POST" });
      await loadDashboard(selectedId);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "AI点评重试失败");
      await loadDashboard(selectedId, true);
    }
  }
  function logout() { sessionStorage.removeItem("ai-assessment-admin-token"); setToken(""); setDashboard(null); }

  const submissions = useMemo(() => (dashboard?.submissions || []).filter((item: any) =>
    (!filter.level || item.levelCode === filter.level) && (!filter.style || item.styleCode === filter.style) && (!filter.role || item.participantRole === filter.role)), [dashboard, filter]);
  const publicUrl = dashboard ? `${window.location.origin}${window.location.pathname}?s=${dashboard.session.code}` : "";

  if (!token) return (
    <main className="center-page admin-login"><section className="form-card"><button className="text-button back-link" onClick={onExit}>← 返回测评首页</button><p className="eyebrow">教师专属入口</p><h1>管理课堂测评</h1><p className="muted">创建场次、展示匿名班级画像，并查看需要课后指导的个人报告。</p><form className="stack-form" onSubmit={login}><label>教师口令<input type="password" value={accessCode} onChange={(e) => setAccessCode(e.target.value)} placeholder="请输入教师口令" /></label>{message && <p className="error-text">{message}</p>}<button className="primary-button">登录后台</button></form></section></main>
  );

  return (
    <main className="admin-page">
      <aside className="admin-sidebar">
        <div className="admin-brand"><span className="brand-mark">AI</span><div><strong>教师控制台</strong><small>能力与风格测评</small></div></div>
        <button className="new-session-button" onClick={() => setSelectedId("new")}>＋ 创建新场次</button>
        <p className="side-label">测评场次</p>
        <div className="session-list">{sessions.map((item) => <button key={item.id} className={selectedId === item.id ? "active" : ""} onClick={() => setSelectedId(item.id)}><span>{item.title}</span><small>{item.cohort || item.code} · {item.submissionCount || 0}人</small></button>)}</div>
        <p className="side-label">AI 点评引擎</p>
        <div className="ai-engine-card">
          <div className="ai-engine-status">
            <span className="ai-dot deepseek" />
            <strong>DeepSeek · 服务端托管</strong>
          </div>
          <p className="ai-engine-meta">测评完成后自动生成七项提示词分析<br />服务异常时自动回退到本地启发式分析</p>
        </div>
        <button className="atlas-sidebar-button" onClick={() => setShowAtlas(true)}>查看8型风格大全</button>
        <div className="sidebar-footer"><button onClick={onExit}>测评首页</button><button onClick={logout}>退出登录</button></div>
      </aside>
      <section className="admin-content">
        {selectedId === "new" ? <div className="admin-section narrow"><p className="eyebrow">NEW SESSION</p><h1>创建一场测评</h1><form className="stack-form" onSubmit={createSession}><label>场次名称<input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={60} /></label><label>班级 / 批次<input value={cohort} onChange={(e) => setCohort(e.target.value)} placeholder="例如：2026新兵营第1期" maxLength={60} /></label><button className="primary-button">创建并生成二维码</button></form></div> : dashboard ? <>
          <header className="admin-header"><div><p className="eyebrow">{dashboard.session.cohort || "课堂测评"}</p><h1>{dashboard.session.title}</h1><p>场次码 {dashboard.session.code} · {dashboard.session.status === "open" ? "正在收集" : "已关闭"}</p></div><div className="admin-actions"><button onClick={() => void navigator.clipboard.writeText(publicUrl)}>复制学员链接</button><button onClick={() => void downloadCsv(`/admin/sessions/${selectedId}/export`, `${dashboard.session.title}.csv`)}>导出CSV</button>{dashboard.session.status === "open" ? <button onClick={() => void updateSession("closed")}>关闭场次</button> : <button onClick={() => void updateSession("open")}>重新开启</button>}<button className="danger" onClick={() => void deleteSession()}>删除</button></div></header>
          <div className="stat-grid"><article><span>已提交</span><strong>{dashboard.summary.total}</strong><small>份有效答卷</small></article><article><span>综合均值</span><strong>{dashboard.summary.averageScore || "—"}</strong><small>不用于排名</small></article><article><span>主流等级</span><strong>{dashboard.summary.dominantLevel || "—"}</strong><small>班级成长起点</small></article><article><span>主流风格</span><strong>{dashboard.summary.dominantStyle || "—"}</strong><small>班级协作偏好</small></article></div>
          <div className="dashboard-grid"><article className="chart-card"><div className="card-heading"><div><p className="eyebrow">匿名班级画像</p><h2>六维能力均值</h2></div></div><div className="bar-chart">{dimensions.map((dimension) => <div key={dimension.id}><span>{dimension.label}</span><div><i style={{ width: `${dashboard.summary.dimensionAverages?.[dimension.id] || 0}%` }} /></div><strong>{dashboard.summary.dimensionAverages?.[dimension.id] || 0}</strong></div>)}</div></article><article className="qr-card"><p className="eyebrow">学员入口</p><h2>扫码开始测评</h2><QrImage url={publicUrl} /><strong>{dashboard.session.code}</strong><p>投屏时只展示本二维码和匿名统计</p></article></div>
          <div className="distribution-grid"><article className="chart-card"><p className="eyebrow">成长等级</p><h2>四级分布</h2><div className="distribution-list">{Object.entries(dashboard.summary.levelDistribution || {}).map(([key, value]) => <div key={key}><span>{key}</span><strong>{String(value)}人</strong></div>)}</div></article><article className="chart-card"><p className="eyebrow">AI使用风格</p><h2>8型分布</h2><div className="distribution-list compact">{Object.entries(dashboard.summary.styleDistribution || {}).map(([key, value]) => <div key={key}><span>{key}</span><strong>{String(value)}人</strong></div>)}</div></article></div>
          {dashboard.summary.scoredTotal > 0 && <div className="distribution-grid"><article className="chart-card"><p className="eyebrow">共同优势</p><h2>班级当前较强维度</h2><div className="distribution-list">{dashboard.summary.commonStrengths?.map((item: any) => <div key={item.label}><span>{item.label}</span><strong>{item.score}</strong></div>)}</div></article><article className="chart-card"><p className="eyebrow">共同短板</p><h2>课堂优先训练维度</h2><div className="distribution-list">{dashboard.summary.commonGaps?.map((item: any) => <div key={item.label}><span>{item.label}</span><strong>{item.score}</strong></div>)}</div></article></div>}
          <article className="submission-card"><div className="card-heading"><div><p className="eyebrow">仅教师可见</p><h2>个人报告</h2></div><div className="filters"><select value={filter.level} onChange={(e) => setFilter({ ...filter, level: e.target.value })}><option value="">全部等级</option><option>L1</option><option>L2</option><option>L3</option><option>L4</option></select><select value={filter.style} onChange={(e) => setFilter({ ...filter, style: e.target.value })}><option value="">全部风格</option>{["EAF","EAV","ECF","ECV","DAF","DAV","DCF","DCV"].map((code) => <option key={code}>{code}</option>)}</select><select value={filter.role} onChange={(e) => setFilter({ ...filter, role: e.target.value })}><option value="">全部岗位</option>{[...new Set((dashboard.submissions || []).map((item: any) => item.participantRole))].map((role: any) => <option key={role}>{role}</option>)}</select></div></div><div className="table-wrap"><table><thead><tr><th>学员</th><th>岗位</th><th>等级</th><th>风格</th><th>AI点评</th><th>提交时间</th><th /></tr></thead><tbody>{submissions.map((item: any) => <tr key={item.id}><td><strong>{item.participantName}</strong></td><td>{item.participantRole}</td><td>{item.levelCode ? `${item.levelCode} · ${item.levelName}` : "生成中"}</td><td>{item.styleCode} · {item.styleName}</td><td><span className={`status ${item.aiStatus}`}>{item.aiStatus === "complete" ? "已生成" : item.aiStatus === "processing" ? "生成中" : "待重试"}</span>{item.aiStatus === "complete" && item.aiEngine && <small className="engine-tag">{item.aiEngine === "deepseek" ? "DS" : "本地"}</small>}</td><td>{new Date(item.submittedAt).toLocaleString("zh-CN")}</td><td>{item.aiStatus === "failed" ? <button className="text-button" onClick={() => void retrySubmission(item.id)}>重新生成</button> : <a href={`?report=${item.reportToken}`} target="_blank">查看报告</a>}</td></tr>)}</tbody></table></div></article>
        </> : <div className="empty-admin"><h2>选择一场测评</h2><p>查看实时班级画像，或创建新的课堂场次。</p></div>}
        {message && <p className="admin-message">{message}</p>}
      </section>
      <StyleAtlas open={showAtlas} onClose={() => setShowAtlas(false)} />
    </main>
  );
}
