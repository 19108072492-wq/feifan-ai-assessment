"use client";

import { styleProfiles } from "@/lib/assessment.mjs";

export function StyleAtlas({ open, onClose, activeCode = "" }: { open: boolean; onClose: () => void; activeCode?: string }) {
  if (!open) return null;
  return (
    <div className="atlas-backdrop" role="dialog" aria-modal="true" aria-label="AI使用风格画像大全" onMouseDown={(event) => { if (event.currentTarget === event.target) onClose(); }}>
      <section className="atlas-panel">
        <header className="atlas-header">
          <div>
            <p className="eyebrow">3 AXES · 8 STYLES</p>
            <h2>AI使用风格画像大全</h2>
            <p>风格由三条倾向轴组合而成：探索 E / 执行 D、委派 A / 共创 C、敏捷 F / 审慎 V。</p>
          </div>
          <button type="button" className="atlas-close" onClick={onClose} aria-label="关闭风格画像大全">×</button>
        </header>
        <div className="atlas-axis-legend">
          <span>探索 E / 执行 D</span><span>委派 A / 共创 C</span><span>敏捷 F / 审慎 V</span>
        </div>
        <div className="atlas-grid">
          {Object.entries(styleProfiles).map(([code, profile]: [string, any]) => (
            <article key={code} className={`atlas-card ${activeCode === code ? "active" : ""}`}>
              <div className="atlas-card-title"><span>{code}</span><div><h3>{profile.name}</h3><p>{profile.tagline}</p></div></div>
              <dl>
                <div><dt>擅长</dt><dd>{profile.strengths.join(" · ")}</dd></div>
                <div><dt>留意</dt><dd>{profile.risks.join(" · ")}</dd></div>
                <div><dt>适合</dt><dd>{profile.bestTasks.join(" · ")}</dd></div>
              </dl>
              {activeCode === code && <strong className="atlas-current">你的当前风格</strong>}
            </article>
          ))}
        </div>
        <footer className="atlas-footer">风格没有高低之分。它是课程起点画像，不是标准化心理测验。</footer>
      </section>
    </div>
  );
}
