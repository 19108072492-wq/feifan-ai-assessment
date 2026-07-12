export const ASSESSMENT_VERSION = "assessment-v1";

export const OPEN_PROMPT =
  "你需要用 AI 制作一份《2027届浙江美术艺考家长讲座》PPT。对象是第一次接触艺考的高二家长，时长40分钟；目标是让家长理解备考阶段、文化与专业平衡、家长配合重点。你手头有本校课程安排、近三年政策文件和往届家长常见问题。请写出一段你会直接交给 AI 的完整提示词。";

export const dimensions = [
  { id: "scene", label: "场景应用力", weight: 15 },
  { id: "task", label: "任务定义力", weight: 20 },
  { id: "data", label: "资料组织力", weight: 15 },
  { id: "collaboration", label: "人机协作力", weight: 15 },
  { id: "verification", label: "结果验证力", weight: 20 },
  { id: "agent", label: "Agent认知力", weight: 15 },
];

const abilityQuestion = (id, dimension, prompt, options) => ({
  id,
  kind: "ability",
  dimension,
  prompt,
  options: options.map((text, score) => ({ id: `${id}-${score}`, text, score })),
});

const styleQuestion = (id, prompt, axis, weight, left, right) => ({
  id,
  kind: "style",
  axis,
  weight,
  prompt,
  options: [
    { id: `${id}-${left.pole.toLowerCase()}`, text: left.text, pole: left.pole },
    { id: `${id}-${right.pole.toLowerCase()}`, text: right.text, pole: right.pole },
  ],
});

export const questions = [
  abilityQuestion("q1", "scene", "过去一个月，你最常用 AI 完成哪类工作？", [
    "查问题、翻译或润色一小段文字",
    "起草文案、方案或 PPT 大纲",
    "分析多份资料、表格或长文档并整理结论",
    "推进完整任务，并产出能检查、修改和交付的文件或工具",
  ]),
  abilityQuestion("q2", "scene", "要用 AI 制作一场家长讲座 PPT，你通常怎样开始？", [
    "直接说“帮我做一个家长讲座 PPT”",
    "先让 AI 给一个大纲，再根据感觉补充",
    "交代对象、时长、目标、内容范围和表达风格后再让 AI 规划",
    "整理任务说明与参考资料，明确验收标准，让 Agent 先检查资料再分步交付",
  ]),
  abilityQuestion("q3", "task", "收到“做一份 AI 培训材料”这样的模糊任务时，你最可能怎么做？", [
    "先让 AI 做一版，出来以后再说",
    "补充想要的页数和大致主题",
    "先确认受众、使用场景、学习目标和最终形式",
    "把对象、目标、输入、输出、限制、流程和验收整理成完整工作说明",
  ]),
  abilityQuestion("q4", "task", "AI 的初稿看起来不错，但与你真正想要的不一致，你会怎样处理？", [
    "换一个模型重新生成",
    "告诉 AI“不够好，再优化一下”",
    "指出不符合预期的部分，并补充示例或风格要求",
    "回到任务目标和验收条件，逐项标出差距、优先级与下一轮修改范围",
  ]),
  abilityQuestion("q5", "data", "制作政策类家长讲座时，资料散落在多个文件和聊天记录里，你会怎样给 AI？", [
    "不整理，直接让 AI 根据常识完成",
    "把记得的重点粘贴到对话框",
    "按政策、课程、案例分类整理后提供相关文件",
    "分类整理并标注来源、日期、版本、适用范围，先匿名化个人信息再交给 AI",
  ]),
  abilityQuestion("q6", "data", "AI 的结论与原始政策文件冲突时，你会怎么做？", [
    "觉得 AI 更新，优先相信 AI",
    "手动改掉冲突的那一句",
    "要求 AI 回到原文件，指出引用位置并重新解释",
    "确认权威来源和版本，限定可用资料范围，修正后再检查所有相关结论",
  ]),
  abilityQuestion("q7", "collaboration", "第一版成果只有六成符合预期时，你通常怎样继续？", [
    "清空对话，换一种说法从头生成",
    "连续让 AI“继续优化”，直到看着顺眼",
    "列出主要问题，让 AI 按反馈修改一轮",
    "按验收清单区分内容、结构、事实和呈现问题，分轮修改并在每轮后复核",
  ]),
  abilityQuestion("q8", "verification", "Agent 说工具或 PPT 已完成时，你会如何验收？", [
    "相信它已经完成，直接交付",
    "快速浏览一遍，页面能打开就算完成",
    "抽查关键内容和主要使用流程",
    "按需求逐项检查功能、内容、易用性、异常情况和实际使用者是否会用",
  ]),
  abilityQuestion("q9", "verification", "发现 AI 在讲座材料里写错一条关键事实，你会怎么处理？", [
    "只改掉这一句话",
    "让 AI 重新生成整页内容",
    "要求给出出处并与原始材料交叉核对",
    "明确可信来源与禁止编造规则，修正错误、追查受影响内容并重新执行验收",
  ]),
  abilityQuestion("q10", "agent", "下面哪种说法最接近你对 AI Agent 的理解？", [
    "Agent 就是回答更聪明的聊天机器人",
    "Agent 能自动生成内容，所以人不需要再检查",
    "Agent 可以读取文件和调用工具，比普通聊天多一些功能",
    "Agent 在明确任务、上下文、资料、规则和工具支持下推进多步工作，人仍对交付负责",
  ]),
  styleQuestion(
    "q11",
    "接到一个陌生任务时，你更自然的第一步是？",
    "explorationExecution",
    2,
    { pole: "E", text: "先让 AI 帮我发散可能方向，看见更多选择" },
    { pole: "D", text: "先明确要交付的结果，再拆步骤推进" },
  ),
  styleQuestion(
    "q12",
    "AI 给出三种可行路线时，你更倾向于？",
    "explorationExecution",
    1,
    { pole: "E", text: "继续比较和扩展，弄清每条路线的可能性" },
    { pole: "D", text: "选定最合适的一条，快速做出最小版本" },
  ),
  styleQuestion(
    "q13",
    "任务说明已经比较完整时，你希望 AI 怎么配合？",
    "assignCocreate",
    2,
    { pole: "A", text: "独立推进到约定检查点，再集中向我汇报" },
    { pole: "C", text: "边做边交流关键判断，与我共同调整" },
  ),
  styleQuestion(
    "q14",
    "初稿需要明显修改时，你更习惯？",
    "assignCocreate",
    1,
    { pole: "A", text: "整理成完整修改清单，一次委派 AI 执行" },
    { pole: "C", text: "围绕关键问题多轮讨论，逐步共同完善" },
  ),
  styleQuestion(
    "q15",
    "拿到一个已经可用的初稿时，你更倾向于？",
    "fastVerify",
    2,
    { pole: "F", text: "先在小范围真实试用，再根据反馈修改" },
    { pole: "V", text: "先充分核对与完善，再交给别人使用" },
  ),
  styleQuestion(
    "q16",
    "遇到一个刚出现的新 AI 工具时，你更可能？",
    "fastVerify",
    1,
    { pole: "F", text: "马上拿几个真实任务试一试能力边界" },
    { pole: "V", text: "先了解隐私、稳定性和限制，再决定怎么用" },
  ),
];

export const levelForScore = (score) => {
  if (score >= 80) return { code: "L4", name: "Agent推动者", range: "80–100" };
  if (score >= 60) return { code: "L3", name: "协同交付者", range: "60–79" };
  if (score >= 40) return { code: "L2", name: "任务表达者", range: "40–59" };
  return { code: "L1", name: "AI体验者", range: "0–39" };
};

export const styleProfiles = {
  EAF: { name: "灵感探路者", strength: "擅长快速打开思路并把任务交给 AI 推进", blindSpot: "容易在方向很多时忽略收束和核验" },
  EAV: { name: "洞察研究者", strength: "喜欢探索多种可能，并重视依据和质量", blindSpot: "可能花较多时间研究，推迟第一次真实交付" },
  ECF: { name: "灵感共创者", strength: "善于在对话中激发想法并快速形成新方案", blindSpot: "多轮交流容易发散，需要主动固定目标和版本" },
  ECV: { name: "深度共研者", strength: "擅长与 AI 深入讨论并不断校准判断", blindSpot: "容易在细节中投入过多，需要设置交付节点" },
  DAF: { name: "敏捷执行者", strength: "目标明确、委派直接，能快速做出可用结果", blindSpot: "速度较快时可能遗漏资料边界和异常情况" },
  DAV: { name: "标准交付者", strength: "擅长给清楚标准，让 AI 稳定完成任务", blindSpot: "面对高度模糊的新问题时可能探索不足" },
  DCF: { name: "协同推进者", strength: "能围绕目标与 AI 快速协作、边做边调整", blindSpot: "频繁调整可能打断整体结构，需要保留验收清单" },
  DCV: { name: "质量守门人", strength: "目标聚焦、共同校准，并对交付质量保持敏感", blindSpot: "质量要求较高时可能降低试错速度" },
};

const selectedOptionMap = (selectedIds) => {
  const selected = new Set(selectedIds);
  return questions.flatMap((question) => question.options).filter((option) => selected.has(option.id));
};

export function scoreStyle(selectedIds) {
  const totals = {
    explorationExecution: 0,
    assignCocreate: 0,
    fastVerify: 0,
  };
  const poles = {
    explorationExecution: ["E", "D"],
    assignCocreate: ["A", "C"],
    fastVerify: ["F", "V"],
  };

  for (const question of questions.filter((item) => item.kind === "style")) {
    const option = question.options.find((item) => selectedIds.includes(item.id));
    if (!option) continue;
    totals[question.axis] += option.pole === poles[question.axis][0] ? question.weight : -question.weight;
  }

  const chars = Object.entries(totals).map(([axis, value]) => poles[axis][value > 0 ? 0 : 1]);
  const confidence = Object.fromEntries(
    Object.entries(totals).map(([axis, value]) => [axis, Math.abs(value) === 3 ? "明显" : "轻微"]),
  );
  const code = chars.join("");
  return { code, ...styleProfiles[code], confidence, axes: totals };
}

const average = (values) => values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
const percent = (value) => Math.round((value / 3) * 100);
const clampRubric = (rubric, key) => Math.min(3, Math.max(0, Number(rubric[key]) || 0));

export function scoreAssessment(selectedIds, rubric) {
  const selected = selectedOptionMap(selectedIds);
  const choiceDimensions = Object.fromEntries(
    dimensions.map((dimension) => {
      const ids = questions
        .filter((question) => question.kind === "ability" && question.dimension === dimension.id)
        .flatMap((question) => question.options.map((option) => option.id));
      const scores = selected.filter((option) => ids.includes(option.id)).map((option) => option.score);
      return [dimension.id, percent(average(scores))];
    }),
  );

  const open = Object.fromEntries(
    ["audience", "purpose", "inputs", "process", "output", "constraints", "acceptance"].map((key) => [
      key,
      percent(clampRubric(rubric, key)),
    ]),
  );
  const openScore = Math.round(average(Object.values(open)));
  const choiceScore = Math.round(
    dimensions.reduce((sum, dimension) => sum + choiceDimensions[dimension.id] * (dimension.weight / 100), 0),
  );

  const finalDimensions = {
    scene: Math.round(choiceDimensions.scene * 0.8 + average([open.audience, open.purpose]) * 0.2),
    task: Math.round(choiceDimensions.task * 0.3 + average([open.audience, open.purpose, open.output]) * 0.7),
    data: Math.round(choiceDimensions.data * 0.4 + open.inputs * 0.6),
    collaboration: Math.round(choiceDimensions.collaboration * 0.4 + open.process * 0.6),
    verification: Math.round(
      choiceDimensions.verification * 0.75 + average([open.constraints, open.acceptance]) * 0.25,
    ),
    agent: choiceDimensions.agent,
  };

  const totalScore = Math.round(choiceScore * 0.6 + openScore * 0.4);

  return {
    choiceScore,
    openScore,
    totalScore,
    dimensions: finalDimensions,
    level: levelForScore(totalScore),
    style: scoreStyle(selectedIds),
  };
}

function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let result = value;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffledOptions(question, seed) {
  const output = [...question.options];
  const random = seededRandom(seed);
  for (let index = output.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [output[index], output[swap]] = [output[swap], output[index]];
  }
  return output;
}
