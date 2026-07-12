import { randomUUID } from "node:crypto";
import { questions } from "../lib/assessment.mjs";

const baseUrl = (process.env.BASE_URL || "http://116.62.188.106/api").replace(/\/$/, "");
const accessCode = process.env.TEACHER_ACCESS_CODE;

if (!accessCode) throw new Error("TEACHER_ACCESS_CODE is required");

async function request(path, options = {}) {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: { "content-type": "application/json", ...(options.headers || {}) },
  });
  const bytes = new Uint8Array(await response.arrayBuffer());
  const text = new TextDecoder().decode(bytes);
  const isJson = response.headers.get("content-type")?.includes("application/json");
  const body = text && isJson ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(`${options.method || "GET"} ${path}: ${response.status} ${body.error || text}`);
  return { response, body, text, bytes };
}

const login = await request("/admin/login", {
  method: "POST",
  body: JSON.stringify({ accessCode }),
});
const authorization = `Bearer ${login.body.token}`;
let session;

try {
  const created = await request("/admin/sessions", {
    method: "POST",
    headers: { authorization },
    body: JSON.stringify({ title: "上线验收测试", cohort: "自动化验收" }),
  });
  session = created.body.session;

  const answers = questions.map((question) => {
    if (question.kind === "ability") return question.options.at(-1).id;
    return question.options[0].id;
  });
  const openPrompt = [
    "你是熟悉浙江美术艺考与家长沟通的课程策划师。请根据我随后提供的本校课程安排、近三年政策文件和往届家长常见问题，",
    "为第一次接触艺考的高二家长制作一份40分钟《2027届浙江美术艺考家长讲座》PPT。目标是让家长理解备考阶段、文化与专业平衡、家长配合重点。",
    "先检查资料的日期、版本和冲突，只使用我提供且可核验的政策，不确定内容标为待核查，禁止编造政策、分数和案例；所有学生信息匿名化。",
    "先输出讲座逻辑与页数规划，经确认后再逐页输出。每页包含标题、核心观点、家长能听懂的讲解、建议图表和讲师备注，并标注资料来源。",
    "控制在18到22页，语言专业但不制造焦虑，最后给出家长行动清单与常见问题。完成后按对象匹配、时间控制、政策准确、逻辑完整、可讲授性逐项自检并列出待核查项。",
  ].join("");

  const idempotencyKey = randomUUID();
  const submissionPayload = {
    sessionCode: session.code,
    participantName: "验收学员",
    participantRole: "教师",
    answers,
    openPrompt,
    idempotencyKey,
  };
  const submitted = await request("/submit", {
    method: "POST",
    body: JSON.stringify(submissionPayload),
  });
  const reportToken = submitted.body.reportToken;
  const duplicate = await request("/submit", { method: "POST", body: JSON.stringify(submissionPayload) });
  if (duplicate.body.reportToken !== reportToken) throw new Error("idempotent submission created a second report");
  if (reportToken.length < 40 || reportToken.includes(session.id)) throw new Error("report token is not sufficiently opaque");

  await request(`/report/${reportToken}/analyze`, { method: "POST" });
  const report = (await request(`/report/${reportToken}`)).body.report;
  const dashboard = (await request(`/admin/sessions/${session.id}/dashboard`, {
    headers: { authorization },
  })).body.dashboard;
  const csv = await request(`/admin/sessions/${session.id}/export`, { headers: { authorization } });

  if (report.aiStatus !== "complete") throw new Error(`analysis status is ${report.aiStatus}`);
  if (Object.keys(report.analysis?.rubric || {}).length !== 7) throw new Error("AI rubric is incomplete");
  if (dashboard.summary.total !== 1) throw new Error("dashboard submission count mismatch");
  if (csv.bytes[0] !== 0xef || csv.bytes[1] !== 0xbb || csv.bytes[2] !== 0xbf) {
    throw new Error("CSV is missing UTF-8 BOM");
  }
  await request(`/admin/sessions/${session.id}`, {
    method: "PATCH",
    headers: { authorization },
    body: JSON.stringify({ status: "closed" }),
  });
  const closedResponse = await fetch(`${baseUrl}/submit`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...submissionPayload, idempotencyKey: randomUUID() }),
  });
  if (closedResponse.status !== 409) throw new Error(`closed session returned ${closedResponse.status}`);

  process.stdout.write(JSON.stringify({
    ok: true,
    reportLevel: report.scores.level.name,
    reportStyle: report.scores.style.name,
    rubricCount: Object.keys(report.analysis.rubric).length,
    dashboardCount: dashboard.summary.total,
    csvBom: true,
    idempotent: true,
    closedSessionRejected: true,
  }));
} finally {
  if (session?.id) {
    await request(`/admin/sessions/${session.id}`, {
      method: "DELETE",
      headers: { authorization },
    });
  }
}
