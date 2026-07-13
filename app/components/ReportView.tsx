"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { dimensions } from "@/lib/assessment.mjs";
import { StyleAtlas } from "./StyleAtlas";

const rubricLabels: Record<string, string> = {
  audience: "对象",
  purpose: "目的",
  inputs: "输入资料",
  process: "执行方式",
  output: "输出格式",
  constraints: "限制边界",
  acceptance: "验收标准",
};

type RadarItem = { subject: string; value: number; fullMark: number };

function radarPoint(index: number, total: number, scale: number) {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / total;
  const radius = 94 * scale;
  return { x: 130 + Math.cos(angle) * radius, y: 130 + Math.sin(angle) * radius };
}

function radarPolygon(data: RadarItem[], scale: number | ((item: RadarItem) => number)) {
  return data.map((item, index) => {
    const value = typeof scale === "function" ? scale(item) : scale;
    const point = radarPoint(index, data.length, Math.max(0, Math.min(1, value)));
    return `${point.x.toFixed(1)},${point.y.toFixed(1)}`;
  }).join(" ");
}

function CapabilityRadar({ data }: { data: RadarItem[] }) {
  return (
    <svg className="capability-radar" viewBox="0 0 260 260" role="img" aria-label="六维能力雷达图">
      {[0.25, 0.5, 0.75, 1].map((level) => <polygon key={level} points={radarPolygon(data, level)} fill="none" stroke="#c9c2b2" strokeWidth="1" />)}
      {data.map((item, index) => {
        const end = radarPoint(index, data.length, 1);
        return <line key={item.subject} x1="130" y1="130" x2={end.x} y2={end.y} stroke="#d8d1c1" strokeWidth="1" />;
      })}
      <polygon points={radarPolygon(data, (item) => item.value / item.fullMark)} fill="#f2c94c" fillOpacity="0.54" stroke="#d7a900" strokeWidth="2.5" />
      {data.map((item, index) => {
        const point = radarPoint(index, data.length, item.value / item.fullMark);
        return <circle key={item.subject} cx={point.x} cy={point.y} r="3.5" fill="#181814" />;
      })}
    </svg>
  );
}

export function ReportView({ report, message = "" }: { report: any; message?: string }) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [showAtlas, setShowAtlas] = useState(false);
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
  const style = report.scores?.style || {};
  const projectBonus = report.scores?.projectBonus || 0;
  const projectUpgrade = report.scores?.projectUpgrade || {};
  return (
    <main className="report-page">
      <div className="report-toolbar">
        <div><span className="brand-mark">AI</span><strong>个人成长画像</strong></div>
        <div className="report-toolbar-actions"><button className="text-button" onClick={() => setShowAtlas(true)}>查看8型风格大全</button><button className="primary-button small" onClick={() => void downloadReport()} disabled={downloading}>{downloading ? "正在生成…" : "下载报告长图"}</button></div>
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
            <span className="style-code">{style.code}</span>
            <h2>{style.name}</h2>
            <p>{style.tagline || style.strength}</p>
            <div className="style-axes">
              {(style.axisDetails || []).map((item: any) => (
                <span key={item.axis}>{item.tendency} · {item.strength}</span>
              ))}
            </div>
          </article>
        </section>

        {(projectBonus > 0 || projectUpgrade.eligible) && <section className="report-section score-notes">
          {projectBonus > 0 && <article><span>＋{projectBonus}</span><div><strong>项目实践加分</strong><p>真实完成个人网站、知识库或自动化工作流，已计入综合分。</p></div></article>}
          {projectUpgrade.eligible && <article><span>↑1</span><div><strong>小程序实战升级</strong><p>{projectUpgrade.applied ? "核心参与开发且成功运行，最终等级提升一级。" : "已满足实战条件；当前等级已达最高级。"}</p></div></article>}
        </section>}

        <section className="report-section personal-style-section">
          <p className="panel-label">个人风格深度分析</p>
          <h2>{style.code} · {style.name}，你更自然的 AI 协作方式</h2>
          <div className="style-analysis-grid">
            <article><span>01</span><h3>你如何启动任务</h3><p>{style.startMode}</p></article>
            <article><span>02</span><h3>你如何与AI分工</h3><p>{style.divisionMode}</p></article>
            <article><span>03</span><h3>你如何处理速度与质量</h3><p>{style.speedQuality}</p></article>
            <article><span>04</span><h3>你的三项优势</h3><ul>{style.strengths?.map((item: string) => <li key={item}>{item}</li>)}</ul></article>
            <article><span>05</span><h3>需要留意的两项风险</h3><ul>{style.risks?.map((item: string) => <li key={item}>{item}</li>)}</ul></article>
            <article><span>06</span><h3>推荐的AI工作流程</h3><ol>{style.recommendedWorkflow?.map((item: string) => <li key={item}>{item}</li>)}</ol></article>
            <article><span>07</span><h3>下一步适合尝试</h3><p>{style.nextProjects?.join("、")}</p><small>{style.upgrade}</small></article>
          </div>
        </section>

        <section className="report-section radar-section">
          <div><p className="panel-label">六维能力雷达</p><h2>你已经会什么，下一步该补什么</h2></div>
          <div className="radar-wrap">
            <CapabilityRadar data={radarData} />
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
          {analysis.improvements && analysis.improvements.length > 0 && (
            <section className="report-section">
              <p className="panel-label">具体改进点</p>
              <h2>逐项给你提示，哪里再加一点</h2>
              <ul className="improvement-list">{analysis.improvements.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
            </section>
          )}
          <section className="report-section upgraded-prompt">
            <p className="panel-label">{report.aiEngine === "deepseek" ? "DeepSeek 升级版提示词" : "AI 升级版提示词"}</p>
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
      <StyleAtlas open={showAtlas} onClose={() => setShowAtlas(false)} activeCode={style.code} />
    </main>
  );
}
