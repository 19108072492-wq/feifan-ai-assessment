"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { dimensions } from "@/lib/assessment.mjs";

const rubricLabels: Record<string, string> = {
  audience: "对象",
  purpose: "目的",
  inputs: "输入资料",
  process: "执行方式",
  output: "输出格式",
  constraints: "限制边界",
  acceptance: "验收标准",
};

export function ReportView({ report, message = "" }: { report: any; message?: string }) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const radarData = dimensions.map((dimension) => ({
    subject: dimension.label.replace("力", ""),
    value: report.scores?.dimensions?.[dimension.id] || 0,
    fullMark: 100,
  }));

  async function downloadReport() {
    if (!reportRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(reportRef.current, {
        width: 1080,
        pixelRatio: 1,
        cacheBust: true,
        backgroundColor: "#f4f0e6",
        style: { width: "1080px", maxWidth: "1080px" },
      });
      const link = document.createElement("a");
      link.download = `${report.participant?.name || "学员"}-AI能力与风格画像.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setDownloading(false);
    }
  }

  const analysis = report.analysis;
  return (
    <main className="report-page">
      <div className="report-toolbar">
        <div><span className="brand-mark">AI</span><strong>个人成长画像</strong></div>
        <button className="primary-button small" onClick={() => void downloadReport()} disabled={downloading}>{downloading ? "正在生成…" : "下载报告长图"}</button>
      </div>
      <div className="report-sheet" ref={reportRef}>
        <header className="report-hero">
          <div>
            <p className="eyebrow">AI能力与风格测评 · {report.assessmentVersion || "ASSESSMENT-V1"}</p>
            <h1>{report.participant?.name}，你的 AI 工作方式画像</h1>
            <p>{report.session?.title} · {report.participant?.role}</p>
          </div>
          <div className="score-ring"><strong>{report.scores?.totalScore ?? "—"}</strong><span>综合能力</span></div>
        </header>

        <section className="report-summary-grid">
          <article className="level-panel">
            <p className="panel-label">当前成长等级</p>
            <span className="level-code">{report.scores?.level?.code}</span>
            <h2>{report.scores?.level?.name || "结果生成中"}</h2>
            <p>{analysis?.summary || "开放题点评暂未生成，你的答卷已经保存，教师可以稍后重新生成。"}</p>
          </article>
          <article className="style-panel">
            <p className="panel-label">AI 使用风格</p>
            <span className="style-code">{report.scores?.style?.code}</span>
            <h2>{report.scores?.style?.name}</h2>
            <p>{report.scores?.style?.strength}</p>
            <div className="style-axes">
              {Object.entries(report.scores?.style?.confidence || {}).map(([axis, value]) => (
                <span key={axis}>{String(value)}倾向</span>
              ))}
            </div>
          </article>
        </section>

        <section className="report-section radar-section">
          <div><p className="panel-label">六维能力雷达</p><h2>你已经会什么，下一步该补什么</h2></div>
          <div className="radar-wrap">
            <ResponsiveContainer width="100%" height={330}>
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="#c9c2b2" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "#201f1b", fontSize: 13 }} />
                <Radar dataKey="value" stroke="#d7a900" fill="#f2c94c" fillOpacity={0.54} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="dimension-grid">{radarData.map((item) => <div key={item.subject}><span>{item.subject}</span><strong>{item.value}</strong></div>)}</div>
        </section>

        <section className="report-section">
          <p className="panel-label">提示词七项拆解</p>
          <h2>从“想让 AI 做”到“让 AI 做对”</h2>
          {analysis ? (
            <div className="rubric-grid">{Object.entries(analysis.rubric || {}).map(([key, value]: [string, any]) => (
              <article key={key}>
                <div><strong>{rubricLabels[key]}</strong><span>{value.score} / 3</span></div>
                <p>{value.evidence}</p>
              </article>
            ))}</div>
          ) : <div className="pending-panel">{message || "DeepSeek点评生成中，稍后刷新即可查看。"}</div>}
        </section>

        {analysis && <>
          <section className="report-section two-column">
            <article><p className="panel-label">你的优势</p><ul>{analysis.strengths?.map((item: string) => <li key={item}>{item}</li>)}</ul></article>
            <article><p className="panel-label">容易忽略</p><ul>{analysis.risks?.map((item: string) => <li key={item}>{item}</li>)}</ul></article>
          </section>
          <section className="report-section upgraded-prompt">
            <p className="panel-label">DeepSeek升级版提示词</p>
            <h2>保留你的原意，补齐可执行信息</h2>
            <pre>{analysis.upgradedPrompt}</pre>
          </section>
          <section className="report-section">
            <p className="panel-label">下一步训练</p>
            <div className="action-grid">{analysis.nextActions?.map((item: string, index: number) => <article key={item}><span>0{index + 1}</span><p>{item}</p></article>)}</div>
          </section>
        </>}

        <footer className="report-footer"><span>AI能力与风格测评</span><span>课程起点画像，不是标准化心理测验</span></footer>
      </div>
    </main>
  );
}
