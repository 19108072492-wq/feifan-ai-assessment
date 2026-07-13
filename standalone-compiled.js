import { jsxDEV as _jsxDEV, Fragment as _Fragment } from "react/jsx-dev-runtime";
const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;

/* ======================== ASSESSMENT DATA ======================== */
const ASSESSMENT_VERSION = "assessment-v1";
const OPEN_PROMPT = "你需要用 AI 制作一份《2027届浙江美术艺考家长讲座》PPT。对象是第一次接触艺考的高二家长，时长40分钟；目标是让家长理解备考阶段、文化与专业平衡、家长配合重点。你手头有本校课程安排、近三年政策文件和往届家长常见问题。请写出一段你会直接交给 AI 的完整提示词。";
const dimensions = [{
  id: "scene",
  label: "场景应用力",
  weight: 15
}, {
  id: "task",
  label: "任务定义力",
  weight: 20
}, {
  id: "data",
  label: "资料组织力",
  weight: 15
}, {
  id: "collaboration",
  label: "人机协作力",
  weight: 15
}, {
  id: "verification",
  label: "结果验证力",
  weight: 20
}, {
  id: "agent",
  label: "Agent认知力",
  weight: 15
}];
const abilityQuestion = (id, dimension, prompt, options) => ({
  id,
  kind: "ability",
  dimension,
  prompt,
  options: options.map((text, score) => ({
    id: `${id}-${score}`,
    text,
    score
  }))
});
const styleQuestion = (id, prompt, axis, weight, left, right) => ({
  id,
  kind: "style",
  axis,
  weight,
  prompt,
  options: [{
    id: `${id}-${left.pole.toLowerCase()}`,
    text: left.text,
    pole: left.pole
  }, {
    id: `${id}-${right.pole.toLowerCase()}`,
    text: right.text,
    pole: right.pole
  }]
});
const questions = [abilityQuestion("q1", "scene", "过去一个月，你最常用 AI 完成哪类工作？", ["查问题、翻译或润色一小段文字", "起草文案、方案或 PPT 大纲", "分析多份资料、表格或长文档并整理结论", "推进完整任务，并产出能检查、修改和交付的文件或工具"]), abilityQuestion("q2", "scene", "要用 AI 制作一场家长讲座 PPT，你通常怎样开始？", ["直接说「帮我做一个家长讲座 PPT」", "先让 AI 给一个大纲，再根据感觉补充", "交代对象、时长、目标、内容范围和表达风格后再让 AI 规划", "整理任务说明与参考资料，明确验收标准，让 Agent 先检查资料再分步交付"]), abilityQuestion("q3", "task", "收到「做一份 AI 培训材料」这样的模糊任务时，你最可能怎么做？", ["先让 AI 做一版，出来以后再说", "补充想要的页数和大致主题", "先确认受众、使用场景、学习目标和最终形式", "把对象、目标、输入、输出、限制、流程和验收整理成完整工作说明"]), abilityQuestion("q4", "task", "AI 的初稿看起来不错，但与你真正想要的不一致，你会怎样处理？", ["换一个模型重新生成", "告诉 AI「不够好，再优化一下」", "指出不符合预期的部分，并补充示例或风格要求", "回到任务目标和验收条件，逐项标出差距、优先级与下一轮修改范围"]), abilityQuestion("q5", "data", "制作政策类家长讲座时，资料散落在多个文件和聊天记录里，你会怎样给 AI？", ["不整理，直接让 AI 根据常识完成", "把记得的重点粘贴到对话框", "按政策、课程、案例分类整理后提供相关文件", "分类整理并标注来源、日期、版本、适用范围，先匿名化个人信息再交给 AI"]), abilityQuestion("q6", "data", "AI 的结论与原始政策文件冲突时，你会怎么做？", ["觉得 AI 更新，优先相信 AI", "手动改掉冲突的那一句", "要求 AI 回到原文件，指出引用位置并重新解释", "确认权威来源和版本，限定可用资料范围，修正后再检查所有相关结论"]), abilityQuestion("q7", "collaboration", "第一版成果只有六成符合预期时，你通常怎样继续？", ["清空对话，换一种说法从头生成", "连续让 AI「继续优化」，直到看着顺眼", "列出主要问题，让 AI 按反馈修改一轮", "按验收清单区分内容、结构、事实和呈现问题，分轮修改并在每轮后复核"]), abilityQuestion("q8", "verification", "Agent 说工具或 PPT 已完成时，你会如何验收？", ["相信它已经完成，直接交付", "快速浏览一遍，页面能打开就算完成", "抽查关键内容和主要使用流程", "按需求逐项检查功能、内容、易用性、异常情况和实际使用者是否会用"]), abilityQuestion("q9", "verification", "发现 AI 在讲座材料里写错一条关键事实，你会怎么处理？", ["只改掉这一句话", "让 AI 重新生成整页内容", "要求给出出处并与原始材料交叉核对", "明确可信来源与禁止编造规则，修正错误、追查受影响内容并重新执行验收"]), abilityQuestion("q10", "agent", "下面哪种说法最接近你对 AI Agent 的理解？", ["Agent 就是回答更聪明的聊天机器人", "Agent 能自动生成内容，所以人不需要再检查", "Agent 可以读取文件和调用工具，比普通聊天多一些功能", "Agent 在明确任务、上下文、资料、规则和工具支持下推进多步工作，人仍对交付负责"]), styleQuestion("q11", "接到一个陌生任务时，你更自然的第一步是？", "explorationExecution", 2, {
  pole: "E",
  text: "先让 AI 帮我发散可能方向，看见更多选择"
}, {
  pole: "D",
  text: "先明确要交付的结果，再拆步骤推进"
}), styleQuestion("q12", "AI 给出三种可行路线时，你更倾向于？", "explorationExecution", 1, {
  pole: "E",
  text: "继续比较和扩展，弄清每条路线的可能性"
}, {
  pole: "D",
  text: "选定最合适的一条，快速做出最小版本"
}), styleQuestion("q13", "任务说明已经比较完整时，你希望 AI 怎么配合？", "assignCocreate", 2, {
  pole: "A",
  text: "独立推进到约定检查点，再集中向我汇报"
}, {
  pole: "C",
  text: "边做边交流关键判断，与我共同调整"
}), styleQuestion("q14", "初稿需要明显修改时，你更习惯？", "assignCocreate", 1, {
  pole: "A",
  text: "整理成完整修改清单，一次委派 AI 执行"
}, {
  pole: "C",
  text: "围绕关键问题多轮讨论，逐步共同完善"
}), styleQuestion("q15", "拿到一个已经可用的初稿时，你更倾向于？", "fastVerify", 2, {
  pole: "F",
  text: "先在小范围真实试用，再根据反馈修改"
}, {
  pole: "V",
  text: "先充分核对与完善，再交给别人使用"
}), styleQuestion("q16", "遇到一个刚出现的新 AI 工具时，你更可能？", "fastVerify", 1, {
  pole: "F",
  text: "马上拿几个真实任务试一试能力边界"
}, {
  pole: "V",
  text: "先了解隐私、稳定性和限制，再决定怎么用"
})];
const levelForScore = score => {
  if (score >= 80) return {
    code: "L4",
    name: "Agent推动者",
    range: "80–100"
  };
  if (score >= 60) return {
    code: "L3",
    name: "协同交付者",
    range: "60–79"
  };
  if (score >= 40) return {
    code: "L2",
    name: "任务表达者",
    range: "40–59"
  };
  return {
    code: "L1",
    name: "AI体验者",
    range: "0–39"
  };
};
const styleProfiles = {
  EAF: {
    name: "灵感探路者",
    strength: "擅长快速打开思路并把任务交给 AI 推进",
    blindSpot: "容易在方向很多时忽略收束和核验"
  },
  EAV: {
    name: "洞察研究者",
    strength: "喜欢探索多种可能，并重视依据和质量",
    blindSpot: "可能花较多时间研究，推迟第一次真实交付"
  },
  ECF: {
    name: "灵感共创者",
    strength: "善于在对话中激发想法并快速形成新方案",
    blindSpot: "多轮交流容易发散，需要主动固定目标和版本"
  },
  ECV: {
    name: "深度共研者",
    strength: "擅长与 AI 深入讨论并不断校准判断",
    blindSpot: "容易在细节中投入过多，需要设置交付节点"
  },
  DAF: {
    name: "敏捷执行者",
    strength: "目标明确、委派直接，能快速做出可用结果",
    blindSpot: "速度较快时可能遗漏资料边界和异常情况"
  },
  DAV: {
    name: "标准交付者",
    strength: "擅长给清楚标准，让 AI 稳定完成任务",
    blindSpot: "面对高度模糊的新问题时可能探索不足"
  },
  DCF: {
    name: "协同推进者",
    strength: "能围绕目标与 AI 快速协作、边做边调整",
    blindSpot: "频繁调整可能打断整体结构，需要保留验收清单"
  },
  DCV: {
    name: "质量守门人",
    strength: "目标聚焦、共同校准，并对交付质量保持敏感",
    blindSpot: "质量要求较高时可能降低试错速度"
  }
};
const selectedOptionMap = selectedIds => {
  const selected = new Set(selectedIds);
  return questions.flatMap(q => q.options).filter(opt => selected.has(opt.id));
};
function scoreStyle(selectedIds) {
  const totals = {
    explorationExecution: 0,
    assignCocreate: 0,
    fastVerify: 0
  };
  const poles = {
    explorationExecution: ["E", "D"],
    assignCocreate: ["A", "C"],
    fastVerify: ["F", "V"]
  };
  for (const q of questions.filter(i => i.kind === "style")) {
    const opt = q.options.find(i => selectedIds.includes(i.id));
    if (!opt) continue;
    totals[q.axis] += opt.pole === poles[q.axis][0] ? q.weight : -q.weight;
  }
  const chars = Object.entries(totals).map(([axis, value]) => poles[axis][value > 0 ? 0 : 1]);
  const confidence = Object.fromEntries(Object.entries(totals).map(([axis, value]) => [axis, Math.abs(value) === 3 ? "明显" : "轻微"]));
  const code = chars.join("");
  return {
    code,
    ...styleProfiles[code],
    confidence,
    axes: totals
  };
}
const average = values => values.reduce((s, v) => s + v, 0) / Math.max(values.length, 1);
const percent = value => Math.round(value / 3 * 100);
const clampRubric = (rubric, key) => Math.min(3, Math.max(0, Number(rubric[key]) || 0));
function scoreAssessment(selectedIds, rubric) {
  const selected = selectedOptionMap(selectedIds);
  const choiceDimensions = Object.fromEntries(dimensions.map(dim => {
    const ids = questions.filter(q => q.kind === "ability" && q.dimension === dim.id).flatMap(q => q.options.map(o => o.id));
    const scores = selected.filter(o => ids.includes(o.id)).map(o => o.score);
    return [dim.id, percent(average(scores))];
  }));
  const open = Object.fromEntries(["audience", "purpose", "inputs", "process", "output", "constraints", "acceptance"].map(key => [key, percent(clampRubric(rubric, key))]));
  const openScore = Math.round(average(Object.values(open)));
  const choiceScore = Math.round(dimensions.reduce((s, d) => s + choiceDimensions[d.id] * (d.weight / 100), 0));
  const finalDimensions = {
    scene: Math.round(choiceDimensions.scene * 0.8 + average([open.audience, open.purpose]) * 0.2),
    task: Math.round(choiceDimensions.task * 0.3 + average([open.audience, open.purpose, open.output]) * 0.7),
    data: Math.round(choiceDimensions.data * 0.4 + open.inputs * 0.6),
    collaboration: Math.round(choiceDimensions.collaboration * 0.4 + open.process * 0.6),
    verification: Math.round(choiceDimensions.verification * 0.75 + average([open.constraints, open.acceptance]) * 0.25),
    agent: choiceDimensions.agent
  };
  const totalScore = Math.round(choiceScore * 0.6 + openScore * 0.4);
  return {
    choiceScore,
    openScore,
    totalScore,
    dimensions: finalDimensions,
    level: levelForScore(totalScore),
    style: scoreStyle(selectedIds)
  };
}
function seededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let r = value;
    r = Math.imul(r ^ r >>> 15, r | 1);
    r ^= r + Math.imul(r ^ r >>> 7, r | 61);
    return ((r ^ r >>> 14) >>> 0) / 4294967296;
  };
}
function shuffledOptions(question, seed) {
  const output = [...question.options];
  const random = seededRandom(seed);
  for (let i = output.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}

/* ======================== HEURISTIC ANALYZER ======================== */
const RUBRIC_KEYS = ["audience", "purpose", "inputs", "process", "output", "constraints", "acceptance"];
const DIM_CONFIG = {
  audience: {
    label: "对象",
    keywords: ["家长", "学生", "教师", "员工", "受众", "用户", "读者", "听众", "对象", "面向", "高一", "高二", "高三", "新人", "管培生", "顾问", "班主任", "校长", "领导", "客户", "团队", "学员", "讲师"],
    specificKeywords: ["第一次", "首次", "新手", "零基础", "初学者", "有经验", "高一", "高二", "高三", "新入职"],
    evidenceHints: ["家长", "学生", "对象", "面向", "受众", "给"]
  },
  purpose: {
    label: "目的",
    keywords: ["目标", "目的", "理解", "掌握", "帮助", "用于", "为了", "完成", "达到", "学会", "了解", "知道", "认识", "能够", "实现", "提升", "培养", "训练", "教会", "让"],
    specificKeywords: ["平衡", "配合", "重点", "阶段", "策略", "方案", "流程", "方法", "技巧", "规划"],
    evidenceHints: ["目标", "目的", "为了", "帮助", "让", "理解", "掌握", "学会"]
  },
  inputs: {
    label: "输入资料",
    keywords: ["资料", "文件", "数据", "来源", "政策", "课程", "安排", "案例", "往届", "参考", "材料", "文档", "表格", "记录", "信息", "清单", "模板", "背景", "历史", "附件"],
    specificKeywords: ["标注", "来源", "日期", "版本", "适用", "整理", "分类", "匿名", "脱敏", "排序", "优先级"],
    evidenceHints: ["资料", "文件", "政策", "课程", "案例", "参考", "材料", "数据"]
  },
  process: {
    label: "执行方式",
    keywords: ["步骤", "流程", "先", "再", "然后", "第一步", "首先", "接着", "最后", "检查点", "分步", "轮次", "迭代", "修改", "调整", "逐项", "依次", "阶段", "环节", "顺序"],
    specificKeywords: ["检查点", "验收", "分轮", "迭代", "复核", "确认", "审核", "反馈", "修改", "优化", "校对"],
    evidenceHints: ["步骤", "流程", "先", "再", "然后", "分步", "检查", "修改"]
  },
  output: {
    label: "输出格式",
    keywords: ["PPT", "ppt", "演示", "大纲", "格式", "页数", "结构", "模板", "文档", "表格", "图表", "幻灯片", "页面", "章节", "目录", "排版", "设计", "风格", "色调", "字体"],
    specificKeywords: ["页", "分钟", "字数", "章节", "目录", "封面", "封底", "动画", "过渡", "备注", "讲稿"],
    evidenceHints: ["PPT", "大纲", "格式", "页", "结构", "模板", "演示", "幻灯片"]
  },
  constraints: {
    label: "限制边界",
    keywords: ["不要", "禁止", "避免", "时长", "限制", "范围", "边界", "字数", "时间", "注意", "必须", "不得", "不能", "确保", "保证", "不超过", "至少", "最少", "最多"],
    specificKeywords: ["不要", "禁止", "不得", "不能", "避免", "必须", "确保", "保证", "事实", "准确", "真实", "隐私", "敏感", "脱敏", "版权"],
    evidenceHints: ["不要", "禁止", "避免", "时长", "限制", "必须", "不得", "不能", "确保"]
  },
  acceptance: {
    label: "验收标准",
    keywords: ["验收", "标准", "检查", "确认", "合格", "完成", "满足", "要求", "达到", "验证", "核对", "测试", "审核", "通过", "交付", "检查清单", "准则"],
    specificKeywords: ["验收", "标准", "核对", "验证", "测试", "检查清单", "合格", "通过", "交付", "确认"],
    evidenceHints: ["验收", "标准", "检查", "确认", "合格", "满足", "验证", "核对"]
  }
};
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function splitSentences(text) {
  return text.split(/[。\n；;！!？?]/).map(s => s.trim()).filter(s => s.length > 2);
}
function countMatches(text, keywords) {
  let count = 0;
  for (const kw of keywords) {
    const m = text.match(new RegExp(escapeRegExp(kw), "gi"));
    if (m) count += m.length;
  }
  return count;
}
function extractEvidence(text, hints) {
  const sentences = splitSentences(text);
  let best = "",
    bestScore = 0;
  for (const s of sentences) {
    let sc = 0;
    for (const h of hints) {
      if (s.includes(h)) sc++;
    }
    if (sc > bestScore) {
      bestScore = sc;
      best = s;
    }
  }
  if (!best && sentences.length > 0) best = sentences[0];
  return best.slice(0, 160);
}
function scoreDimension(text, config) {
  const gen = countMatches(text, config.keywords);
  const spec = countMatches(text, config.specificKeywords);
  const total = gen + spec;
  if (total === 0) return 0;
  if (spec >= 2 && gen >= 2) return 3;
  if (spec >= 1 && gen >= 2) return 2;
  if (gen >= 2) return 2;
  if (gen >= 1) return 1;
  return 0;
}
function buildUpgradedPrompt(original, scores) {
  const parts = [];
  parts.push("【对象】" + (scores.audience >= 2 ? extractEvidence(original, DIM_CONFIG.audience.evidenceHints) : "请明确面向的具体对象（如：第一次接触艺考的高二家长）"));
  parts.push("【目的】" + (scores.purpose >= 2 ? extractEvidence(original, DIM_CONFIG.purpose.evidenceHints) : "请说明任务的具体目标（如：让家长理解备考阶段、文化与专业平衡、家长配合重点）"));
  parts.push("【输入资料】" + (scores.inputs >= 2 ? extractEvidence(original, DIM_CONFIG.inputs.evidenceHints) : "请列出可用资料及来源（如：本校课程安排、近三年政策文件、往届家长常见问题），标注来源、日期和版本"));
  parts.push("【执行步骤】" + (scores.process >= 2 ? extractEvidence(original, DIM_CONFIG.process.evidenceHints) : "请说明执行流程：先规划大纲→填充内容→检查事实→排版美化→最终验收"));
  parts.push("【输出格式】" + (scores.output >= 2 ? extractEvidence(original, DIM_CONFIG.output.evidenceHints) : "请指定输出为40分钟时长的PPT演示文稿，包含封面、目录、各章节内容页和封底"));
  parts.push("【限制边界】" + (scores.constraints >= 2 ? extractEvidence(original, DIM_CONFIG.constraints.evidenceHints) : "请注意：不得编造未提供的政策信息，语言风格通俗易懂，适合非专业家长理解"));
  parts.push("【验收标准】" + (scores.acceptance >= 2 ? extractEvidence(original, DIM_CONFIG.acceptance.evidenceHints) : "请定义验收标准：内容准确无误、时长控制在40分钟内、家长能理解三个核心要点"));
  return `请按以下完整说明制作一份《2027届浙江美术艺考家长讲座》PPT：\n\n${parts.join("\n\n")}\n\n请先输出大纲让我确认，再逐页制作。每完成5页让我检查一次。`;
}
function generateStrengths(scores, evidence) {
  const out = [];
  const labels = Object.fromEntries(RUBRIC_KEYS.map(k => [k, DIM_CONFIG[k].label]));
  for (const k of RUBRIC_KEYS) {
    if (scores[k] >= 2) out.push(`${labels[k]}描述${scores[k] === 3 ? "具体且可执行" : "比较清楚"}：${evidence[k].slice(0, 40)}…`);
  }
  if (out.length === 0) out.push("已尝试表达任务意图，可以在此基础上补充结构");
  return out.slice(0, 3);
}
function generateRisks(scores) {
  const out = [];
  const labels = Object.fromEntries(RUBRIC_KEYS.map(k => [k, DIM_CONFIG[k].label]));
  const suggestions = {
    audience: `${labels.audience}不够具体，AI可能无法针对正确的人群调整表达深度`,
    purpose: `${labels.purpose}不够清晰，AI可能偏离你真正想要的结果`,
    inputs: `${labels.inputs}缺失，AI可能依赖常识编造内容`,
    process: `${labels.process}未说明，AI可能一次性输出而非分步交付`,
    output: `${labels.output}不明确，AI可能产出不符合使用场景的格式`,
    constraints: `${labels.constraints}未设定，AI可能编造事实或忽略隐私要求`,
    acceptance: `${labels.acceptance}缺失，无法判断AI产出是否达标`
  };
  for (const k of RUBRIC_KEYS) {
    if (scores[k] <= 1) out.push(suggestions[k]);
  }
  if (out.length === 0) out.push("提示词已较完整，可进一步细化验收标准以确保交付质量");
  return out.slice(0, 3);
}
function generateNextActions(scores) {
  const out = [];
  const labels = Object.fromEntries(RUBRIC_KEYS.map(k => [k, DIM_CONFIG[k].label]));
  const sorted = RUBRIC_KEYS.map(k => ({
    key: k,
    score: scores[k]
  })).sort((a, b) => a.score - b.score);
  const actionMap = {
    audience: "练习在每次提示词开头明确写出面向对象的特征（身份、经验水平、核心需求）",
    purpose: "训练用一句话写出任务目标：让谁、做什么、达到什么效果",
    inputs: "练习整理资料清单并标注来源、日期和版本，养成先给资料再提要求的习惯",
    process: "练习把任务拆成3-5个步骤，设定检查点，让AI分步交付而非一次性输出",
    output: "训练明确指定输出格式、页数/字数、结构和风格，减少AI的猜测空间",
    constraints: "练习设定事实边界、语言风格和禁止事项，防止AI编造或跑偏",
    acceptance: "训练在每次任务前写出2-3条验收标准，完成后逐项核对"
  };
  for (const {
    key
  } of sorted.slice(0, 3)) out.push(actionMap[key]);
  return out;
}
function generateSummary(scores) {
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  const max = RUBRIC_KEYS.length * 3;
  if (total >= max * 0.75) return "提示词结构完整，主要要素齐全且较具体，属于高质量任务说明。";
  if (total >= max * 0.5) return "提示词有基本框架，但部分关键要素缺失或不够具体，建议补充。";
  if (total >= max * 0.25) return "提示词仅覆盖少量要素，AI大概率需要大量猜测，建议重新组织。";
  return "提示词过于笼统，缺少任务说明的核心要素，建议按七项量表重写。";
}
function analyzePrompt(promptText) {
  const text = String(promptText || "").trim();
  if (text.length < 30) throw new Error("提示词长度不足30字");
  const rubric = {},
    scores = {},
    rubricEvidence = {};
  for (const key of RUBRIC_KEYS) {
    const config = DIM_CONFIG[key];
    const score = scoreDimension(text, config);
    const evidence = extractEvidence(text, config.evidenceHints);
    rubric[key] = {
      score,
      evidence: evidence || "未在原文中找到明确证据"
    };
    scores[key] = score;
    rubricEvidence[key] = evidence;
  }
  return {
    rubric,
    scores,
    summary: generateSummary(scores),
    strengths: generateStrengths(scores, rubricEvidence),
    risks: generateRisks(scores),
    upgradedPrompt: buildUpgradedPrompt(text, scores),
    nextActions: generateNextActions(scores)
  };
}

/* ======================== LOCAL STORE ======================== */
const SK = {
  sessions: "ai-assessment:sessions",
  submissions: "ai-assessment:submissions",
  loginAttempts: "ai-assessment:login-attempts",
  adminCode: "ai-assessment:admin-code"
};
const TOKEN_KEY = "ai-assessment:admin-tokens";
const DEFAULT_ADMIN_CODE = "teacher2026";
function readKey(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeKey(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function getSessions() {
  return readKey(SK.sessions);
}
function getSessionById(id) {
  return getSessions().find(s => s.id === id) || null;
}
function getSessionByCode(code) {
  return getSessions().find(s => s.code === code.toUpperCase()) || null;
}
function saveSession(session) {
  const sessions = getSessions();
  const i = sessions.findIndex(s => s.id === session.id);
  if (i >= 0) sessions[i] = {
    ...sessions[i],
    ...session
  };else sessions.unshift(session);
  writeKey(SK.sessions, sessions);
  return session;
}
function deleteSessionById(id) {
  writeKey(SK.sessions, getSessions().filter(s => s.id !== id));
  writeKey(SK.submissions, getSubmissions().filter(s => s.sessionId !== id));
}
function getSubmissions() {
  return readKey(SK.submissions);
}
function getSubmissionsBySession(sid) {
  return getSubmissions().filter(s => s.sessionId === sid).sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt));
}
function getSubmissionByToken(token) {
  return getSubmissions().find(s => s.reportToken === token) || null;
}
function getSubmissionById(id) {
  return getSubmissions().find(s => s.id === id) || null;
}
function saveSubmission(sub) {
  const subs = getSubmissions();
  const i = subs.findIndex(s => s.id === sub.id);
  if (i >= 0) subs[i] = {
    ...subs[i],
    ...sub
  };else subs.unshift(sub);
  writeKey(SK.submissions, subs);
  return sub;
}
function findSubmissionByIdempotency(sid, key) {
  return getSubmissions().find(s => s.sessionId === sid && s.idempotencyKey === key) || null;
}
function getLoginAttempt(ipHash) {
  return readKey(SK.loginAttempts).find(a => a.ipHash === ipHash) || null;
}
function saveLoginAttempt(attempt) {
  const attempts = readKey(SK.loginAttempts);
  const i = attempts.findIndex(a => a.ipHash === attempt.ipHash);
  if (i >= 0) attempts[i] = attempt;else attempts.push(attempt);
  writeKey(SK.loginAttempts, attempts);
}
function clearLoginAttempt(ipHash) {
  writeKey(SK.loginAttempts, readKey(SK.loginAttempts).filter(a => a.ipHash !== ipHash));
}
function getAdminCode() {
  return localStorage.getItem(SK.adminCode) || DEFAULT_ADMIN_CODE;
}
function generateId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
function generateSessionCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = typeof crypto !== "undefined" && "getRandomValues" in crypto ? crypto.getRandomValues(new Uint8Array(6)) : Array.from({
    length: 6
  }, () => Math.floor(Math.random() * 256));
  return Array.from(bytes, b => alphabet[b % alphabet.length]).join("");
}
function generateReportToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "").slice(0, 43);
  return Array.from({
    length: 43
  }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".charAt(Math.floor(Math.random() * 64))).join("");
}

/* ======================== TOKEN MGMT ======================== */
function getTokens() {
  try {
    return JSON.parse(localStorage.getItem(TOKEN_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveTokens(tokens) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}
function createToken() {
  const token = generateId() + generateId();
  const tokens = getTokens();
  tokens.push({
    token,
    createdAt: Date.now(),
    expiresAt: Date.now() + 8 * 3600 * 1000
  });
  saveTokens(tokens);
  return token;
}
function verifyToken(token) {
  if (!token) return false;
  const tokens = getTokens();
  const found = tokens.find(t => t.token === token);
  if (!found) return false;
  if (Date.now() > found.expiresAt) {
    saveTokens(tokens.filter(t => t.token !== token));
    return false;
  }
  return true;
}

/* ======================== DASHBOARD SUMMARY + CSV ======================== */
function countBy(rows, codeKey, nameKey) {
  const counts = new Map();
  for (const row of rows) {
    const code = String(row[codeKey] || "");
    if (!code) continue;
    const key = `${code} ${String(row[nameKey] || "")}`.trim();
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return Object.fromEntries(counts);
}
function dominant(dist) {
  return Object.entries(dist).reduce((winner, entry) => entry[1] > (winner?.[1] || 0) ? entry : winner, null)?.[0] || "";
}
function summarizeDashboard(rows) {
  const total = rows.length;
  const scoredRows = rows.filter(r => r.total_score !== null && r.total_score !== undefined);
  const scoredTotal = scoredRows.length;
  const dimIds = ["scene", "task", "data", "collaboration", "verification", "agent"];
  const levelDist = countBy(scoredRows, "level_code", "level_name");
  const styleDist = countBy(rows, "style_code", "style_name");
  const dimAvgs = Object.fromEntries(dimIds.map(id => [id, scoredTotal ? Math.round(scoredRows.reduce((s, r) => s + Number(r.dimension_scores?.[id] || 0), 0) / scoredTotal) : 0]));
  return {
    total,
    scoredTotal,
    averageScore: scoredTotal ? Math.round(scoredRows.reduce((s, r) => s + Number(r.total_score), 0) / scoredTotal) : 0,
    dominantLevel: dominant(levelDist),
    dominantStyle: dominant(styleDist),
    dimensionAverages: dimAvgs,
    levelDistribution: levelDist,
    styleDistribution: styleDist
  };
}
function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
function buildCsv(rows) {
  const headers = ["姓名", "岗位", "综合分", "成长等级", "风格代码", "风格名称", "AI点评状态", "开放题原文", "提交时间"];
  const lines = rows.map(r => [r.participant_name, r.participant_role, r.total_score, r.level_name, r.style_code, r.style_name, r.ai_status, r.open_prompt, r.submitted_at].map(csvCell).join(","));
  return `\ufeff${[headers.join(","), ...lines].join("\r\n")}`;
}

/* ======================== LOCAL API ======================== */
function sessionJson(session) {
  const subs = getSubmissionsBySession(session.id);
  return {
    id: session.id,
    code: session.code,
    title: session.title,
    cohort: session.cohort,
    status: session.status,
    assessmentVersion: session.assessmentVersion || ASSESSMENT_VERSION,
    createdAt: session.createdAt,
    submissionCount: subs.length
  };
}
function publicReport(sub, session) {
  return {
    assessmentVersion: session.assessmentVersion || ASSESSMENT_VERSION,
    participant: {
      name: sub.participantName,
      role: sub.participantRole
    },
    session: {
      title: session.title,
      cohort: session.cohort
    },
    aiStatus: sub.aiStatus,
    analysis: sub.analysis,
    scores: {
      choiceScore: sub.choiceScore,
      openScore: sub.openScore,
      totalScore: sub.totalScore,
      dimensions: sub.dimensionScores,
      level: {
        code: sub.levelCode,
        name: sub.levelName
      },
      style: sub.styleData
    }
  };
}
function validateAnswerIds(answerIds) {
  if (!Array.isArray(answerIds) || answerIds.length !== 16) throw new Error("请完成全部16道选择题");
  for (let i = 0; i < questions.length; i++) {
    if (!questions[i].options.some(o => o.id === answerIds[i])) throw new Error("答卷选项无效，请刷新后重新填写");
  }
}
function runAnalysis(sub) {
  try {
    const analysis = analyzePrompt(sub.openPrompt);
    const scores = scoreAssessment(sub.answers, analysis.scores);
    sub.aiStatus = "complete";
    sub.analysis = analysis;
    sub.choiceScore = scores.choiceScore;
    sub.openScore = scores.openScore;
    sub.totalScore = scores.totalScore;
    sub.levelCode = scores.level.code;
    sub.levelName = scores.level.name;
    sub.dimensionScores = scores.dimensions;
    saveSubmission(sub);
    return sub;
  } catch (e) {
    sub.aiStatus = "failed";
    sub.aiError = e instanceof Error ? e.message : String(e);
    saveSubmission(sub);
    throw new Error("答卷已保存，AI点评暂时失败，教师可以稍后重试");
  }
}
function handleLocalApi(method, path, body = {}, headers = {}) {
  if (method === "GET" && path === "/health") return {
    ok: true,
    status: 200,
    body: {
      ok: true,
      version: ASSESSMENT_VERSION
    }
  };
  if (method === "GET" && path.startsWith("/session/")) {
    const code = decodeURIComponent(path.slice("/session/".length)).toUpperCase();
    const session = getSessionByCode(code);
    if (!session) return {
      ok: false,
      status: 404,
      body: {
        error: "没有找到这个测评场次"
      }
    };
    if (session.status !== "open") return {
      ok: false,
      status: 409,
      body: {
        error: "本场测评已经关闭"
      }
    };
    return {
      ok: true,
      status: 200,
      body: {
        session: sessionJson(session)
      }
    };
  }
  if (method === "POST" && path === "/submit") {
    let payload;
    try {
      payload = function () {
        const p = body && typeof body === "object" ? body : {};
        if (!Array.isArray(p.answers) || p.answers.length !== 16 || p.answers.some(a => typeof a !== "string" || !a)) throw new Error("请完成全部16道选择题");
        const openPrompt = String(p.openPrompt || "").trim();
        if (openPrompt.length < 30) throw new Error("开放题提示词至少30字");
        if (openPrompt.length > 2000) throw new Error("开放题提示词不能超过2000字");
        const participantName = String(p.participantName || "").trim().slice(0, 30);
        const participantRole = String(p.participantRole || "").trim().slice(0, 30);
        if (!participantName) throw new Error("请填写姓名");
        if (!participantRole) throw new Error("请选择岗位");
        const idempotencyKey = String(p.idempotencyKey || "").trim();
        if (idempotencyKey.length < 3 || idempotencyKey.length > 100) throw new Error("提交标识无效");
        const sessionCode = String(p.sessionCode || "").trim().toUpperCase();
        if (!/^[A-Z0-9]{6}$/.test(sessionCode)) throw new Error("场次码无效");
        return {
          sessionCode,
          participantName,
          participantRole,
          answers: p.answers,
          openPrompt,
          idempotencyKey
        };
      }();
      validateAnswerIds(payload.answers);
    } catch (err) {
      return {
        ok: false,
        status: 400,
        body: {
          error: err instanceof Error ? err.message : "答卷无效"
        }
      };
    }
    const session = getSessionByCode(payload.sessionCode);
    if (!session) return {
      ok: false,
      status: 404,
      body: {
        error: "没有找到这个测评场次"
      }
    };
    if (session.status !== "open") return {
      ok: false,
      status: 409,
      body: {
        error: "本场测评已经关闭，不能继续提交"
      }
    };
    const existing = findSubmissionByIdempotency(session.id, payload.idempotencyKey);
    if (existing) return {
      ok: true,
      status: 200,
      body: {
        reportToken: existing.reportToken,
        aiStatus: existing.aiStatus
      }
    };
    const style = scoreStyle(payload.answers);
    const sub = {
      id: generateId(),
      sessionId: session.id,
      reportToken: generateReportToken(),
      participantName: payload.participantName,
      participantRole: payload.participantRole,
      answers: payload.answers,
      openPrompt: payload.openPrompt,
      idempotencyKey: payload.idempotencyKey,
      styleCode: style.code,
      styleName: style.name,
      styleData: style,
      aiStatus: "pending",
      aiAttempts: 0,
      submittedAt: new Date().toISOString()
    };
    saveSubmission(sub);
    return {
      ok: true,
      status: 201,
      body: {
        reportToken: sub.reportToken,
        aiStatus: "pending"
      }
    };
  }
  if (method === "GET" && path.startsWith("/report/") && !path.endsWith("/analyze")) {
    const token = decodeURIComponent(path.slice("/report/".length));
    const sub = getSubmissionByToken(token);
    if (!sub) return {
      ok: false,
      status: 404,
      body: {
        error: "报告链接无效或已被删除"
      }
    };
    const session = getSessionById(sub.sessionId);
    if (!session) return {
      ok: false,
      status: 404,
      body: {
        error: "场次不存在"
      }
    };
    return {
      ok: true,
      status: 200,
      body: {
        report: publicReport(sub, session)
      }
    };
  }
  if (method === "POST" && path.startsWith("/report/") && path.endsWith("/analyze")) {
    const token = decodeURIComponent(path.slice("/report/".length, -"/analyze".length));
    const sub = getSubmissionByToken(token);
    if (!sub) return {
      ok: false,
      status: 404,
      body: {
        error: "报告链接无效或已被删除"
      }
    };
    if (sub.aiStatus === "complete") return {
      ok: true,
      status: 200,
      body: {
        aiStatus: "complete"
      }
    };
    try {
      runAnalysis(sub);
      return {
        ok: true,
        status: 200,
        body: {
          aiStatus: "complete"
        }
      };
    } catch {
      return {
        ok: true,
        status: 200,
        body: {
          aiStatus: "failed"
        }
      };
    }
  }
  if (method === "POST" && path === "/admin/login") {
    const ipHash = "local-" + window.location.hostname;
    const attempt = getLoginAttempt(ipHash);
    if (attempt?.blockedUntil && new Date(attempt.blockedUntil) > new Date()) return {
      ok: false,
      status: 429,
      body: {
        error: "尝试次数过多，请稍后再试"
      }
    };
    const accessCode = String(body?.accessCode || "");
    if (accessCode !== getAdminCode()) {
      const cur = (attempt?.attempts || 0) + 1;
      const block = cur >= 5;
      saveLoginAttempt({
        ipHash,
        windowStartedAt: attempt?.windowStartedAt || new Date().toISOString(),
        attempts: cur,
        blockedUntil: block ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : null
      });
      return {
        ok: false,
        status: block ? 429 : 401,
        body: {
          error: block ? "尝试次数过多，请15分钟后再试" : "教师口令不正确"
        }
      };
    }
    clearLoginAttempt(ipHash);
    return {
      ok: true,
      status: 200,
      body: {
        token: createToken()
      }
    };
  }
  const authHeader = String(headers?.authorization || "").replace(/^Bearer\s+/i, "");
  const isAdmin = verifyToken(authHeader);
  if (path.startsWith("/admin") && !isAdmin) return {
    ok: false,
    status: 401,
    body: {
      error: "教师登录已失效，请重新登录"
    }
  };
  if (method === "GET" && path === "/admin/sessions") return {
    ok: true,
    status: 200,
    body: {
      sessions: getSessions().map(sessionJson)
    }
  };
  if (method === "POST" && path === "/admin/sessions") {
    const title = String(body?.title || "").trim().slice(0, 60);
    const cohort = String(body?.cohort || "").trim().slice(0, 60);
    if (!title) return {
      ok: false,
      status: 400,
      body: {
        error: "请填写场次名称"
      }
    };
    const session = {
      id: generateId(),
      code: generateSessionCode(),
      title,
      cohort,
      status: "open",
      assessmentVersion: ASSESSMENT_VERSION,
      createdAt: new Date().toISOString(),
      closedAt: null
    };
    saveSession(session);
    return {
      ok: true,
      status: 201,
      body: {
        session: sessionJson(session)
      }
    };
  }
  if (method === "PATCH" && path.startsWith("/admin/sessions/") && !path.includes("/dashboard") && !path.includes("/export")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length));
    const status = body?.status;
    if (!["open", "closed"].includes(status)) return {
      ok: false,
      status: 400,
      body: {
        error: "场次状态无效"
      }
    };
    const session = getSessionById(id);
    if (!session) return {
      ok: false,
      status: 404,
      body: {
        error: "场次不存在"
      }
    };
    session.status = status;
    session.closedAt = status === "closed" ? new Date().toISOString() : null;
    saveSession(session);
    return {
      ok: true,
      status: 200,
      body: {
        session: sessionJson(session)
      }
    };
  }
  if (method === "DELETE" && path.startsWith("/admin/sessions/") && !path.includes("/dashboard") && !path.includes("/export")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length));
    const session = getSessionById(id);
    if (!session) return {
      ok: false,
      status: 404,
      body: {
        error: "场次不存在"
      }
    };
    deleteSessionById(id);
    return {
      ok: true,
      status: 204,
      body: {}
    };
  }
  if (method === "GET" && path.startsWith("/admin/sessions/") && path.endsWith("/dashboard")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length, -"/dashboard".length));
    const session = getSessionById(id);
    if (!session) return {
      ok: false,
      status: 404,
      body: {
        error: "场次不存在"
      }
    };
    const rows = getSubmissionsBySession(id);
    const mappedRows = rows.map(r => ({
      participant_name: r.participantName,
      participant_role: r.participantRole,
      total_score: r.totalScore,
      level_code: r.levelCode,
      level_name: r.levelName,
      style_code: r.styleCode,
      style_name: r.styleName,
      ai_status: r.aiStatus,
      submitted_at: r.submittedAt,
      report_token: r.reportToken,
      id: r.id,
      dimension_scores: r.dimensionScores,
      open_prompt: r.openPrompt
    }));
    const summary = summarizeDashboard(mappedRows);
    const ordered = dimensions.map(d => ({
      label: d.label,
      score: summary.dimensionAverages[d.id] || 0
    })).sort((a, b) => b.score - a.score);
    summary.commonStrengths = ordered.slice(0, 2);
    summary.commonGaps = [...ordered].reverse().slice(0, 2);
    return {
      ok: true,
      status: 200,
      body: {
        dashboard: {
          session: sessionJson(session),
          summary,
          submissions: rows.map(r => ({
            id: r.id,
            participantName: r.participantName,
            participantRole: r.participantRole,
            levelCode: r.levelCode,
            levelName: r.levelName,
            styleCode: r.styleCode,
            styleName: r.styleName,
            aiStatus: r.aiStatus,
            submittedAt: r.submittedAt,
            reportToken: r.reportToken
          }))
        }
      }
    };
  }
  if (method === "POST" && path.startsWith("/admin/submissions/") && path.endsWith("/retry")) {
    const id = decodeURIComponent(path.slice("/admin/submissions/".length, -"/retry".length));
    const sub = getSubmissionById(id);
    if (!sub) return {
      ok: false,
      status: 404,
      body: {
        error: "答卷不存在"
      }
    };
    sub.aiStatus = "pending";
    saveSubmission(sub);
    try {
      runAnalysis(sub);
      return {
        ok: true,
        status: 200,
        body: {
          aiStatus: "complete"
        }
      };
    } catch {
      return {
        ok: true,
        status: 200,
        body: {
          aiStatus: "failed"
        }
      };
    }
  }
  if (method === "GET" && path.startsWith("/admin/sessions/") && path.endsWith("/export")) {
    const id = decodeURIComponent(path.slice("/admin/sessions/".length, -"/export".length));
    const rows = getSubmissionsBySession(id);
    const mappedRows = rows.map(r => ({
      participant_name: r.participantName,
      participant_role: r.participantRole,
      total_score: r.totalScore,
      level_name: r.levelName,
      style_code: r.styleCode,
      style_name: r.styleName,
      ai_status: r.aiStatus,
      open_prompt: r.openPrompt,
      submitted_at: r.submittedAt
    }));
    return {
      ok: true,
      status: 200,
      body: {
        csv: buildCsv(mappedRows),
        isCsv: true
      }
    };
  }
  return {
    ok: false,
    status: 404,
    body: {
      error: "接口不存在"
    }
  };
}

/* ======================== API REQUEST ======================== */
function adminHeaders() {
  const token = sessionStorage.getItem("ai-assessment-admin-token");
  return token ? {
    authorization: `Bearer ${token}`
  } : {};
}
async function apiRequest(path, options = {}) {
  const method = (options.method || "GET").toUpperCase();
  let body = {};
  if (options.body) {
    try {
      body = typeof options.body === "string" ? JSON.parse(options.body) : options.body;
    } catch {
      body = {};
    }
  }
  const headers = {
    ...(options.headers || {})
  };
  const admin = adminHeaders();
  for (const key of Object.keys(admin)) {
    if (!headers[key]) headers[key] = admin[key];
  }
  const result = handleLocalApi(method, path, body, headers);
  if (!result.ok) throw new Error(result.body?.error || `请求失败（${result.status}）`);
  if (result.body?.isCsv) return {
    csv: result.body.csv
  };
  return result.body || {};
}
async function downloadCsv(path, filename) {
  const result = await apiRequest(path, {
    headers: adminHeaders()
  });
  if (!result.csv) throw new Error("导出失败");
  const blob = new Blob([result.csv], {
    type: "text/csv;charset=utf-8"
  });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}
function makeIdempotencyKey() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/* ======================== RADAR CHART (SVG) ======================== */
function RadarChart({
  data
}) {
  const size = 300,
    cx = size / 2,
    cy = size / 2,
    maxR = 110;
  const angleStep = Math.PI * 2 / data.length;
  const levels = [0.25, 0.5, 0.75, 1.0];
  const pointAt = (angle, ratio) => [cx + Math.cos(angle - Math.PI / 2) * maxR * ratio, cy + Math.sin(angle - Math.PI / 2) * maxR * ratio];
  const gridRings = levels.map((lv, li) => {
    const pts = data.map((_, i) => pointAt(i * angleStep, lv).join(",")).join(" ");
    return React.createElement("polygon", {
      key: li,
      points: pts,
      fill: "none",
      stroke: "#c9c2b2",
      strokeWidth: 1
    });
  });
  const axes = data.map((d, i) => {
    const [x, y] = pointAt(i * angleStep, 1.0);
    const [lx, ly] = pointAt(i * angleStep, 1.18);
    return React.createElement("g", {
      key: i
    }, React.createElement("line", {
      x1: cx,
      y1: cy,
      x2: x,
      y2: y,
      stroke: "#c9c2b2",
      strokeWidth: 1
    }), React.createElement("text", {
      x: lx,
      y: ly,
      textAnchor: "middle",
      dominantBaseline: "middle",
      fill: "#201f1b",
      fontSize: 13
    }, d.subject));
  });
  const dataPoints = data.map((d, i) => pointAt(i * angleStep, Math.max(0, Math.min(100, d.value)) / 100));
  const dataPath = dataPoints.map(p => p.join(",")).join(" ");
  return React.createElement("svg", {
    viewBox: `0 0 ${size} ${size}`,
    style: {
      width: "100%",
      height: "100%"
    }
  }, ...gridRings, ...axes, React.createElement("polygon", {
    points: dataPath,
    fill: "#f2c94c",
    fillOpacity: 0.54,
    stroke: "#d7a900",
    strokeWidth: 2
  }), dataPoints.map((p, i) => React.createElement("circle", {
    key: i,
    cx: p[0],
    cy: p[1],
    r: 3,
    fill: "#d7a900"
  })));
}

/* ======================== QR IMAGE ======================== */
function QrImage({
  url
}) {
  const [src, setSrc] = useState("");
  useEffect(() => {
    if (window.QRCode) {
      window.QRCode.toDataURL(url, {
        width: 320,
        margin: 1,
        color: {
          dark: "#171713",
          light: "#ffffff"
        }
      }).then(setSrc).catch(() => {});
    }
  }, [url]);
  return src ? React.createElement("img", {
    className: "qr-image",
    src: src,
    alt: "学员扫码进入本场测评"
  }) : React.createElement("div", {
    className: "qr-placeholder"
  }, "正在生成二维码");
}

/* ======================== REPORT VIEW ======================== */
const rubricLabels = {
  audience: "对象",
  purpose: "目的",
  inputs: "输入资料",
  process: "执行方式",
  output: "输出格式",
  constraints: "限制边界",
  acceptance: "验收标准"
};
function ReportView({
  report,
  message
}) {
  const reportRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const radarData = dimensions.map(d => ({
    subject: d.label.replace("力", ""),
    value: report.scores?.dimensions?.[d.id] || 0,
    fullMark: 100
  }));
  async function downloadReport() {
    if (!reportRef.current || !window.htmlToImage) return;
    setDownloading(true);
    try {
      const dataUrl = await window.htmlToImage.toPng(reportRef.current, {
        width: 1080,
        pixelRatio: 1,
        cacheBust: true,
        backgroundColor: "#f4f0e6",
        style: {
          width: "1080px",
          maxWidth: "1080px"
        }
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
  return /*#__PURE__*/_jsxDEV("main", {
    className: "report-page",
    children: [/*#__PURE__*/_jsxDEV("div", {
      className: "report-toolbar",
      children: [/*#__PURE__*/_jsxDEV("div", {
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "brand-mark",
          children: "AI"
        }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
          children: "\u4E2A\u4EBA\u6210\u957F\u753B\u50CF"
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("button", {
        className: "primary-button small",
        onClick: () => void downloadReport(),
        disabled: downloading,
        children: downloading ? "正在生成…" : "下载报告长图"
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
      className: "report-sheet",
      ref: reportRef,
      children: [/*#__PURE__*/_jsxDEV("header", {
        className: "report-hero",
        children: [/*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("p", {
            className: "eyebrow",
            children: ["AI\u80FD\u529B\u4E0E\u98CE\u683C\u6D4B\u8BC4 \xB7 ", report.assessmentVersion || "ASSESSMENT-V1"]
          }, void 0, true), /*#__PURE__*/_jsxDEV("h1", {
            children: [report.participant?.name, "\uFF0C\u4F60\u7684 AI \u5DE5\u4F5C\u65B9\u5F0F\u753B\u50CF"]
          }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
            children: [report.session?.title, " \xB7 ", report.participant?.role]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "score-ring",
          children: [/*#__PURE__*/_jsxDEV("strong", {
            children: report.scores?.totalScore ?? "—"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            children: "\u7EFC\u5408\u80FD\u529B"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
        className: "report-summary-grid",
        children: [/*#__PURE__*/_jsxDEV("article", {
          className: "level-panel",
          children: [/*#__PURE__*/_jsxDEV("p", {
            className: "panel-label",
            children: "\u5F53\u524D\u6210\u957F\u7B49\u7EA7"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "level-code",
            children: report.scores?.level?.code
          }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
            children: report.scores?.level?.name || "结果生成中"
          }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
            children: analysis?.summary || "开放题点评暂未生成，你的答卷已经保存，教师可以稍后重新生成。"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
          className: "style-panel",
          children: [/*#__PURE__*/_jsxDEV("p", {
            className: "panel-label",
            children: "AI \u4F7F\u7528\u98CE\u683C"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            className: "style-code",
            children: report.scores?.style?.code
          }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
            children: report.scores?.style?.name
          }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
            children: report.scores?.style?.strength
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "style-axes",
            children: Object.entries(report.scores?.style?.confidence || {}).map(([axis, value]) => /*#__PURE__*/_jsxDEV("span", {
              children: [String(value), "\u503E\u5411"]
            }, axis, true))
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
        className: "report-section radar-section",
        children: [/*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("p", {
            className: "panel-label",
            children: "\u516D\u7EF4\u80FD\u529B\u96F7\u8FBE"
          }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
            children: "\u4F60\u5DF2\u7ECF\u4F1A\u4EC0\u4E48\uFF0C\u4E0B\u4E00\u6B65\u8BE5\u8865\u4EC0\u4E48"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "radar-wrap",
          children: /*#__PURE__*/_jsxDEV(RadarChart, {
            data: radarData
          }, void 0, false)
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "dimension-grid",
          children: radarData.map(item => /*#__PURE__*/_jsxDEV("div", {
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: item.subject
            }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
              children: item.value
            }, void 0, false)]
          }, item.subject, true))
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
        className: "report-section",
        children: [/*#__PURE__*/_jsxDEV("p", {
          className: "panel-label",
          children: "\u63D0\u793A\u8BCD\u4E03\u9879\u62C6\u89E3"
        }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
          children: "\u4ECE\"\u60F3\u8BA9 AI \u505A\"\u5230\"\u8BA9 AI \u505A\u5BF9\""
        }, void 0, false), analysis ? /*#__PURE__*/_jsxDEV("div", {
          className: "rubric-grid",
          children: Object.entries(analysis.rubric || {}).map(([key, value]) => /*#__PURE__*/_jsxDEV("article", {
            children: [/*#__PURE__*/_jsxDEV("div", {
              children: [/*#__PURE__*/_jsxDEV("strong", {
                children: rubricLabels[key]
              }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
                children: [value.score, " / 3"]
              }, void 0, true)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
              children: value.evidence
            }, void 0, false)]
          }, key, true))
        }, void 0, false) : /*#__PURE__*/_jsxDEV("div", {
          className: "pending-panel",
          children: message || "AI点评生成中，稍后刷新即可查看。"
        }, void 0, false)]
      }, void 0, true), analysis && /*#__PURE__*/_jsxDEV(_Fragment, {
        children: [/*#__PURE__*/_jsxDEV("section", {
          className: "report-section two-column",
          children: [/*#__PURE__*/_jsxDEV("article", {
            children: [/*#__PURE__*/_jsxDEV("p", {
              className: "panel-label",
              children: "\u4F60\u7684\u4F18\u52BF"
            }, void 0, false), /*#__PURE__*/_jsxDEV("ul", {
              children: analysis.strengths?.map(item => /*#__PURE__*/_jsxDEV("li", {
                children: item
              }, item, false))
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
            children: [/*#__PURE__*/_jsxDEV("p", {
              className: "panel-label",
              children: "\u5BB9\u6613\u5FFD\u7565"
            }, void 0, false), /*#__PURE__*/_jsxDEV("ul", {
              children: analysis.risks?.map(item => /*#__PURE__*/_jsxDEV("li", {
                children: item
              }, item, false))
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "report-section upgraded-prompt",
          children: [/*#__PURE__*/_jsxDEV("p", {
            className: "panel-label",
            children: "AI\u5347\u7EA7\u7248\u63D0\u793A\u8BCD"
          }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
            children: "\u4FDD\u7559\u4F60\u7684\u539F\u610F\uFF0C\u8865\u9F50\u53EF\u6267\u884C\u4FE1\u606F"
          }, void 0, false), /*#__PURE__*/_jsxDEV("pre", {
            children: analysis.upgradedPrompt
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
          className: "report-section",
          children: [/*#__PURE__*/_jsxDEV("p", {
            className: "panel-label",
            children: "\u4E0B\u4E00\u6B65\u8BAD\u7EC3"
          }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
            className: "action-grid",
            children: analysis.nextActions?.map((item, index) => /*#__PURE__*/_jsxDEV("article", {
              children: [/*#__PURE__*/_jsxDEV("span", {
                children: ["0", index + 1]
              }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
                children: item
              }, void 0, false)]
            }, item, true))
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("footer", {
        className: "report-footer",
        children: [/*#__PURE__*/_jsxDEV("span", {
          children: "AI\u80FD\u529B\u4E0E\u98CE\u683C\u6D4B\u8BC4"
        }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
          children: "\u8BFE\u7A0B\u8D77\u70B9\u753B\u50CF\uFF0C\u4E0D\u662F\u6807\u51C6\u5316\u5FC3\u7406\u6D4B\u9A8C"
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true)]
  }, void 0, true);
}

/* ======================== TEACHER DASHBOARD ======================== */
function TeacherDashboard({
  onExit
}) {
  const [token, setToken] = useState(() => sessionStorage.getItem("ai-assessment-admin-token") || "");
  const [accessCode, setAccessCode] = useState("");
  const [sessions, setSessions] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [dashboard, setDashboard] = useState(null);
  const [title, setTitle] = useState("AI能力与风格测评");
  const [cohort, setCohort] = useState("");
  const [filter, setFilter] = useState({
    level: "",
    style: "",
    role: ""
  });
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (token) void loadSessions();
  }, [token]);
  useEffect(() => {
    if (!selectedId || !token || selectedId === "new") return;
    void loadDashboard(selectedId);
    const interval = window.setInterval(() => void loadDashboard(selectedId, true), 5000);
    return () => window.clearInterval(interval);
  }, [selectedId, token]);
  async function adminRequest(path, options = {}) {
    return apiRequest(path, {
      ...options,
      headers: {
        ...adminHeaders(),
        ...(options.headers || {})
      }
    });
  }
  async function loadSessions() {
    try {
      const data = await adminRequest("/admin/sessions");
      setSessions(data.sessions || []);
      if (!selectedId && data.sessions?.[0]) setSelectedId(data.sessions[0].id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "后台读取失败");
    }
  }
  async function loadDashboard(id, quiet = false) {
    try {
      const data = await adminRequest(`/admin/sessions/${id}/dashboard`);
      setDashboard(data.dashboard);
    } catch (error) {
      if (!quiet) setMessage(error instanceof Error ? error.message : "看板读取失败");
    }
  }
  async function login(event) {
    event.preventDefault();
    setMessage("");
    try {
      const data = await apiRequest("/admin/login", {
        method: "POST",
        body: JSON.stringify({
          accessCode
        })
      });
      sessionStorage.setItem("ai-assessment-admin-token", data.token);
      setToken(data.token);
      setAccessCode("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "登录失败");
    }
  }
  async function createSession(event) {
    event.preventDefault();
    try {
      const data = await adminRequest("/admin/sessions", {
        method: "POST",
        body: JSON.stringify({
          title,
          cohort
        })
      });
      setCohort("");
      await loadSessions();
      setSelectedId(data.session.id);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "创建失败");
    }
  }
  async function updateSession(status) {
    await adminRequest(`/admin/sessions/${selectedId}`, {
      method: "PATCH",
      body: JSON.stringify({
        status
      })
    });
    await Promise.all([loadSessions(), loadDashboard(selectedId)]);
  }
  async function deleteSession() {
    if (!confirm("确认删除整场测评及所有姓名、答卷和报告？此操作不可撤销。")) return;
    await adminRequest(`/admin/sessions/${selectedId}`, {
      method: "DELETE"
    });
    setDashboard(null);
    setSelectedId("");
    await loadSessions();
  }
  async function retrySubmission(id) {
    setMessage("");
    try {
      await adminRequest(`/admin/submissions/${id}/retry`, {
        method: "POST"
      });
      await loadDashboard(selectedId);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "AI点评重试失败");
      await loadDashboard(selectedId, true);
    }
  }
  function logout() {
    sessionStorage.removeItem("ai-assessment-admin-token");
    setToken("");
    setDashboard(null);
  }
  const submissions = useMemo(() => (dashboard?.submissions || []).filter(item => (!filter.level || item.levelCode === filter.level) && (!filter.style || item.styleCode === filter.style) && (!filter.role || item.participantRole === filter.role)), [dashboard, filter]);
  const publicUrl = dashboard ? `${window.location.origin}${window.location.pathname}?s=${dashboard.session.code}` : "";
  if (!token) return /*#__PURE__*/_jsxDEV("main", {
    className: "center-page admin-login",
    children: /*#__PURE__*/_jsxDEV("section", {
      className: "form-card",
      children: [/*#__PURE__*/_jsxDEV("button", {
        className: "text-button back-link",
        onClick: onExit,
        children: "\u2190 \u8FD4\u56DE\u6D4B\u8BC4\u9996\u9875"
      }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
        className: "eyebrow",
        children: "\u6559\u5E08\u4E13\u5C5E\u5165\u53E3"
      }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
        children: "\u7BA1\u7406\u8BFE\u5802\u6D4B\u8BC4"
      }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
        className: "muted",
        children: "\u521B\u5EFA\u573A\u6B21\u3001\u5C55\u793A\u533F\u540D\u73ED\u7EA7\u753B\u50CF\uFF0C\u5E76\u67E5\u770B\u9700\u8981\u8BFE\u540E\u6307\u5BFC\u7684\u4E2A\u4EBA\u62A5\u544A\u3002\u9ED8\u8BA4\u53E3\u4EE4\uFF1Ateacher2026"
      }, void 0, false), /*#__PURE__*/_jsxDEV("form", {
        className: "stack-form",
        onSubmit: login,
        children: [/*#__PURE__*/_jsxDEV("label", {
          children: ["\u6559\u5E08\u53E3\u4EE4", /*#__PURE__*/_jsxDEV("input", {
            type: "password",
            value: accessCode,
            onChange: e => setAccessCode(e.target.value),
            placeholder: "\u8BF7\u8F93\u5165\u6559\u5E08\u53E3\u4EE4"
          }, void 0, false)]
        }, void 0, true), message && /*#__PURE__*/_jsxDEV("p", {
          className: "error-text",
          children: message
        }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
          className: "primary-button",
          type: "submit",
          children: "\u767B\u5F55\u540E\u53F0"
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true)
  }, void 0, false);
  return /*#__PURE__*/_jsxDEV("main", {
    className: "admin-page",
    children: [/*#__PURE__*/_jsxDEV("aside", {
      className: "admin-sidebar",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "admin-brand",
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "brand-mark",
          children: "AI"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("strong", {
            children: "\u6559\u5E08\u63A7\u5236\u53F0"
          }, void 0, false), /*#__PURE__*/_jsxDEV("small", {
            children: "\u80FD\u529B\u4E0E\u98CE\u683C\u6D4B\u8BC4"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("button", {
        className: "new-session-button",
        onClick: () => setSelectedId("new"),
        children: "\uFF0B \u521B\u5EFA\u65B0\u573A\u6B21"
      }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
        className: "side-label",
        children: "\u6D4B\u8BC4\u573A\u6B21"
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "session-list",
        children: sessions.map(item => /*#__PURE__*/_jsxDEV("button", {
          className: selectedId === item.id ? "active" : "",
          onClick: () => setSelectedId(item.id),
          children: [/*#__PURE__*/_jsxDEV("span", {
            children: item.title
          }, void 0, false), /*#__PURE__*/_jsxDEV("small", {
            children: [item.cohort || item.code, " \xB7 ", item.submissionCount || 0, "\u4EBA"]
          }, void 0, true)]
        }, item.id, true))
      }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
        className: "sidebar-footer",
        children: [/*#__PURE__*/_jsxDEV("button", {
          onClick: onExit,
          children: "\u6D4B\u8BC4\u9996\u9875"
        }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
          onClick: logout,
          children: "\u9000\u51FA\u767B\u5F55"
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
      className: "admin-content",
      children: [selectedId === "new" ? /*#__PURE__*/_jsxDEV("div", {
        className: "admin-section narrow",
        children: [/*#__PURE__*/_jsxDEV("p", {
          className: "eyebrow",
          children: "NEW SESSION"
        }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
          children: "\u521B\u5EFA\u4E00\u573A\u6D4B\u8BC4"
        }, void 0, false), /*#__PURE__*/_jsxDEV("form", {
          className: "stack-form",
          onSubmit: createSession,
          children: [/*#__PURE__*/_jsxDEV("label", {
            children: ["\u573A\u6B21\u540D\u79F0", /*#__PURE__*/_jsxDEV("input", {
              value: title,
              onChange: e => setTitle(e.target.value),
              maxLength: 60
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("label", {
            children: ["\u73ED\u7EA7 / \u6279\u6B21", /*#__PURE__*/_jsxDEV("input", {
              value: cohort,
              onChange: e => setCohort(e.target.value),
              placeholder: "\u4F8B\u5982\uFF1A2026\u65B0\u5175\u8425\u7B2C1\u671F",
              maxLength: 60
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("button", {
            className: "primary-button",
            type: "submit",
            children: "\u521B\u5EFA\u5E76\u751F\u6210\u4E8C\u7EF4\u7801"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true) : dashboard ? /*#__PURE__*/_jsxDEV(_Fragment, {
        children: [/*#__PURE__*/_jsxDEV("header", {
          className: "admin-header",
          children: [/*#__PURE__*/_jsxDEV("div", {
            children: [/*#__PURE__*/_jsxDEV("p", {
              className: "eyebrow",
              children: dashboard.session.cohort || "课堂测评"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
              children: dashboard.session.title
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              children: ["\u573A\u6B21\u7801 ", dashboard.session.code, " \xB7 ", dashboard.session.status === "open" ? "正在收集" : "已关闭"]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "admin-actions",
            children: [/*#__PURE__*/_jsxDEV("button", {
              onClick: () => void navigator.clipboard.writeText(publicUrl),
              children: "\u590D\u5236\u5B66\u5458\u94FE\u63A5"
            }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
              onClick: () => void downloadCsv(`/admin/sessions/${selectedId}/export`, `${dashboard.session.title}.csv`),
              children: "\u5BFC\u51FACSV"
            }, void 0, false), dashboard.session.status === "open" ? /*#__PURE__*/_jsxDEV("button", {
              onClick: () => void updateSession("closed"),
              children: "\u5173\u95ED\u573A\u6B21"
            }, void 0, false) : /*#__PURE__*/_jsxDEV("button", {
              onClick: () => void updateSession("open"),
              children: "\u91CD\u65B0\u5F00\u542F"
            }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
              className: "danger",
              onClick: () => void deleteSession(),
              children: "\u5220\u9664"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "stat-grid",
          children: [/*#__PURE__*/_jsxDEV("article", {
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "\u5DF2\u63D0\u4EA4"
            }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
              children: dashboard.summary.total
            }, void 0, false), /*#__PURE__*/_jsxDEV("small", {
              children: "\u4EFD\u6709\u6548\u7B54\u5377"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "\u7EFC\u5408\u5747\u503C"
            }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
              children: dashboard.summary.averageScore || "—"
            }, void 0, false), /*#__PURE__*/_jsxDEV("small", {
              children: "\u4E0D\u7528\u4E8E\u6392\u540D"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "\u4E3B\u6D41\u7B49\u7EA7"
            }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
              children: dashboard.summary.dominantLevel || "—"
            }, void 0, false), /*#__PURE__*/_jsxDEV("small", {
              children: "\u73ED\u7EA7\u6210\u957F\u8D77\u70B9"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: "\u4E3B\u6D41\u98CE\u683C"
            }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
              children: dashboard.summary.dominantStyle || "—"
            }, void 0, false), /*#__PURE__*/_jsxDEV("small", {
              children: "\u73ED\u7EA7\u534F\u4F5C\u504F\u597D"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "dashboard-grid",
          children: [/*#__PURE__*/_jsxDEV("article", {
            className: "chart-card",
            children: [/*#__PURE__*/_jsxDEV("div", {
              className: "card-heading",
              children: /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("p", {
                  className: "eyebrow",
                  children: "\u533F\u540D\u73ED\u7EA7\u753B\u50CF"
                }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                  children: "\u516D\u7EF4\u80FD\u529B\u5747\u503C"
                }, void 0, false)]
              }, void 0, true)
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "bar-chart",
              children: dimensions.map(dim => /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: dim.label
                }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
                  children: /*#__PURE__*/_jsxDEV("i", {
                    style: {
                      width: `${dashboard.summary.dimensionAverages?.[dim.id] || 0}%`
                    }
                  }, void 0, false)
                }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
                  children: dashboard.summary.dimensionAverages?.[dim.id] || 0
                }, void 0, false)]
              }, dim.id, true))
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
            className: "qr-card",
            children: [/*#__PURE__*/_jsxDEV("p", {
              className: "eyebrow",
              children: "\u5B66\u5458\u5165\u53E3"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
              children: "\u626B\u7801\u5F00\u59CB\u6D4B\u8BC4"
            }, void 0, false), /*#__PURE__*/_jsxDEV(QrImage, {
              url: publicUrl
            }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
              children: dashboard.session.code
            }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
              children: "\u6295\u5C4F\u65F6\u53EA\u5C55\u793A\u672C\u4E8C\u7EF4\u7801\u548C\u533F\u540D\u7EDF\u8BA1"
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
          className: "distribution-grid",
          children: [/*#__PURE__*/_jsxDEV("article", {
            className: "chart-card",
            children: [/*#__PURE__*/_jsxDEV("p", {
              className: "eyebrow",
              children: "\u6210\u957F\u7B49\u7EA7"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
              children: "\u56DB\u7EA7\u5206\u5E03"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "distribution-list",
              children: Object.entries(dashboard.summary.levelDistribution || {}).map(([key, value]) => /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: key
                }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
                  children: [String(value), "\u4EBA"]
                }, void 0, true)]
              }, key, true))
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
            className: "chart-card",
            children: [/*#__PURE__*/_jsxDEV("p", {
              className: "eyebrow",
              children: "AI\u4F7F\u7528\u98CE\u683C"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
              children: "8\u578B\u5206\u5E03"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "distribution-list compact",
              children: Object.entries(dashboard.summary.styleDistribution || {}).map(([key, value]) => /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: key
                }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
                  children: [String(value), "\u4EBA"]
                }, void 0, true)]
              }, key, true))
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), dashboard.summary.scoredTotal > 0 && /*#__PURE__*/_jsxDEV("div", {
          className: "distribution-grid",
          children: [/*#__PURE__*/_jsxDEV("article", {
            className: "chart-card",
            children: [/*#__PURE__*/_jsxDEV("p", {
              className: "eyebrow",
              children: "\u5171\u540C\u4F18\u52BF"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
              children: "\u73ED\u7EA7\u5F53\u524D\u8F83\u5F3A\u7EF4\u5EA6"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "distribution-list",
              children: dashboard.summary.commonStrengths?.map(item => /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: item.label
                }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
                  children: item.score
                }, void 0, false)]
              }, item.label, true))
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
            className: "chart-card",
            children: [/*#__PURE__*/_jsxDEV("p", {
              className: "eyebrow",
              children: "\u5171\u540C\u77ED\u677F"
            }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
              children: "\u8BFE\u5802\u4F18\u5148\u8BAD\u7EC3\u7EF4\u5EA6"
            }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
              className: "distribution-list",
              children: dashboard.summary.commonGaps?.map(item => /*#__PURE__*/_jsxDEV("div", {
                children: [/*#__PURE__*/_jsxDEV("span", {
                  children: item.label
                }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
                  children: item.score
                }, void 0, false)]
              }, item.label, true))
            }, void 0, false)]
          }, void 0, true)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("article", {
          className: "submission-card",
          children: [/*#__PURE__*/_jsxDEV("div", {
            className: "card-heading",
            children: [/*#__PURE__*/_jsxDEV("div", {
              children: [/*#__PURE__*/_jsxDEV("p", {
                className: "eyebrow",
                children: "\u4EC5\u6559\u5E08\u53EF\u89C1"
              }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
                children: "\u4E2A\u4EBA\u62A5\u544A"
              }, void 0, false)]
            }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
              className: "filters",
              children: [/*#__PURE__*/_jsxDEV("select", {
                value: filter.level,
                onChange: e => setFilter({
                  ...filter,
                  level: e.target.value
                }),
                children: [/*#__PURE__*/_jsxDEV("option", {
                  value: "",
                  children: "\u5168\u90E8\u7B49\u7EA7"
                }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                  children: "L1"
                }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                  children: "L2"
                }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                  children: "L3"
                }, void 0, false), /*#__PURE__*/_jsxDEV("option", {
                  children: "L4"
                }, void 0, false)]
              }, void 0, true), /*#__PURE__*/_jsxDEV("select", {
                value: filter.style,
                onChange: e => setFilter({
                  ...filter,
                  style: e.target.value
                }),
                children: [/*#__PURE__*/_jsxDEV("option", {
                  value: "",
                  children: "\u5168\u90E8\u98CE\u683C"
                }, void 0, false), ["EAF", "EAV", "ECF", "ECV", "DAF", "DAV", "DCF", "DCV"].map(c => /*#__PURE__*/_jsxDEV("option", {
                  children: c
                }, c, false))]
              }, void 0, true), /*#__PURE__*/_jsxDEV("select", {
                value: filter.role,
                onChange: e => setFilter({
                  ...filter,
                  role: e.target.value
                }),
                children: [/*#__PURE__*/_jsxDEV("option", {
                  value: "",
                  children: "\u5168\u90E8\u5C97\u4F4D"
                }, void 0, false), [...new Set((dashboard.submissions || []).map(i => i.participantRole))].map(r => /*#__PURE__*/_jsxDEV("option", {
                  children: r
                }, r, false))]
              }, void 0, true)]
            }, void 0, true)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
            className: "table-wrap",
            children: /*#__PURE__*/_jsxDEV("table", {
              children: [/*#__PURE__*/_jsxDEV("thead", {
                children: /*#__PURE__*/_jsxDEV("tr", {
                  children: [/*#__PURE__*/_jsxDEV("th", {
                    children: "\u5B66\u5458"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("th", {
                    children: "\u5C97\u4F4D"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("th", {
                    children: "\u7B49\u7EA7"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("th", {
                    children: "\u98CE\u683C"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("th", {
                    children: "AI\u70B9\u8BC4"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("th", {
                    children: "\u63D0\u4EA4\u65F6\u95F4"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("th", {}, void 0, false)]
                }, void 0, true)
              }, void 0, false), /*#__PURE__*/_jsxDEV("tbody", {
                children: submissions.map(item => /*#__PURE__*/_jsxDEV("tr", {
                  children: [/*#__PURE__*/_jsxDEV("td", {
                    children: /*#__PURE__*/_jsxDEV("strong", {
                      children: item.participantName
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("td", {
                    children: item.participantRole
                  }, void 0, false), /*#__PURE__*/_jsxDEV("td", {
                    children: item.levelCode ? `${item.levelCode} · ${item.levelName}` : "生成中"
                  }, void 0, false), /*#__PURE__*/_jsxDEV("td", {
                    children: [item.styleCode, " \xB7 ", item.styleName]
                  }, void 0, true), /*#__PURE__*/_jsxDEV("td", {
                    children: /*#__PURE__*/_jsxDEV("span", {
                      className: `status ${item.aiStatus}`,
                      children: item.aiStatus === "complete" ? "已生成" : item.aiStatus === "processing" ? "生成中" : "待重试"
                    }, void 0, false)
                  }, void 0, false), /*#__PURE__*/_jsxDEV("td", {
                    children: new Date(item.submittedAt).toLocaleString("zh-CN")
                  }, void 0, false), /*#__PURE__*/_jsxDEV("td", {
                    children: item.aiStatus === "failed" ? /*#__PURE__*/_jsxDEV("button", {
                      className: "text-button",
                      onClick: () => void retrySubmission(item.id),
                      children: "\u91CD\u65B0\u751F\u6210"
                    }, void 0, false) : /*#__PURE__*/_jsxDEV("a", {
                      href: `?report=${item.reportToken}`,
                      target: "_blank",
                      children: "\u67E5\u770B\u62A5\u544A"
                    }, void 0, false)
                  }, void 0, false)]
                }, item.id, true))
              }, void 0, false)]
            }, void 0, true)
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true) : /*#__PURE__*/_jsxDEV("div", {
        className: "empty-admin",
        children: [/*#__PURE__*/_jsxDEV("h2", {
          children: "\u9009\u62E9\u4E00\u573A\u6D4B\u8BC4"
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          children: "\u67E5\u770B\u5B9E\u65F6\u73ED\u7EA7\u753B\u50CF\uFF0C\u6216\u521B\u5EFA\u65B0\u7684\u8BFE\u5802\u573A\u6B21\u3002"
        }, void 0, false)]
      }, void 0, true), message && /*#__PURE__*/_jsxDEV("p", {
        className: "admin-message",
        children: message
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
}

/* ======================== ASSESSMENT APP ======================== */
function AssessmentApp() {
  const [mode, setMode] = useState("landing");
  const [sessionCode, setSessionCode] = useState("");
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState({
    name: "",
    role: ""
  });
  const [answers, setAnswers] = useState({});
  const [openPrompt, setOpenPrompt] = useState("");
  const [current, setCurrent] = useState(0);
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [seed] = useState(() => Math.floor(Math.random() * 100000));
  const [idempotencyKey, setIdempotencyKey] = useState(() => makeIdempotencyKey());
  const roles = ["教师", "课程顾问", "班主任", "管培生", "教学管理", "其他"];
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
  useEffect(() => {
    if (!session?.code || mode !== "assessment") return;
    const draft = {
      profile,
      answers,
      openPrompt,
      current,
      idempotencyKey
    };
    localStorage.setItem(`ai-assessment-draft:${session.code}`, JSON.stringify(draft));
  }, [answers, current, idempotencyKey, mode, openPrompt, profile, session?.code]);
  const question = questions[current];
  const displayedOptions = useMemo(() => question ? shuffledOptions(question, seed + current * 101) : [], [current, question, seed]);
  async function loadSession(code) {
    setLoading(true);
    setMessage("");
    try {
      const data = await apiRequest(`/session/${encodeURIComponent(code)}`);
      setSession(data.session);
      const rawDraft = localStorage.getItem(`ai-assessment-draft:${code}`);
      if (rawDraft) {
        const draft = JSON.parse(rawDraft);
        setProfile(draft.profile || {
          name: "",
          role: ""
        });
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
  async function loadReport(token) {
    setMessage("");
    try {
      const data = await apiRequest(`/report/${encodeURIComponent(token)}`);
      setReport(data.report);
      if (data.report.aiStatus === "pending" || data.report.aiStatus === "failed") {
        try {
          await apiRequest(`/report/${encodeURIComponent(token)}/analyze`, {
            method: "POST"
          });
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
  function enterSession(event) {
    event.preventDefault();
    const code = sessionCode.trim().toUpperCase();
    if (!code) return setMessage("请输入场次码");
    history.replaceState({}, "", `?s=${encodeURIComponent(code)}`);
    void loadSession(code);
  }
  function beginAssessment(event) {
    event.preventDefault();
    if (!profile.name.trim()) return setMessage("请填写姓名");
    if (!profile.role) return setMessage("请选择岗位");
    setMessage("");
    setMode("assessment");
  }
  function chooseAnswer(optionId) {
    setAnswers(v => ({
      ...v,
      [question.id]: optionId
    }));
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
          answers: questions.map(q => answers[q.id]),
          openPrompt: openPrompt.trim(),
          idempotencyKey
        })
      });
      localStorage.removeItem(`ai-assessment-draft:${session.code}`);
      history.replaceState({}, "", `?report=${encodeURIComponent(response.reportToken)}`);
      await loadReport(response.reportToken);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "提交失败，请稍后重试");
      setMode("assessment");
    }
  }
  if (mode === "teacher") return /*#__PURE__*/_jsxDEV(TeacherDashboard, {
    onExit: () => {
      history.replaceState({}, "", window.location.pathname);
      setMode("landing");
    }
  }, void 0, false);
  if (mode === "report" && report) return /*#__PURE__*/_jsxDEV(ReportView, {
    report: report,
    message: message
  }, void 0, false);
  if (mode === "generating") {
    return /*#__PURE__*/_jsxDEV("main", {
      className: "center-page",
      children: /*#__PURE__*/_jsxDEV("section", {
        className: "generating-card",
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "pulse-mark",
          children: "AI"
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          className: "eyebrow",
          children: "\u6B63\u5728\u751F\u6210\u4E2A\u4EBA\u753B\u50CF"
        }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
          children: "\u7B54\u5377\u5DF2\u7ECF\u5B89\u5168\u4FDD\u5B58"
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          children: "\u6B63\u5728\u6309\u4E03\u9879\u56FA\u5B9A\u91CF\u8868\u5206\u6790\u4F60\u7684\u63D0\u793A\u8BCD\uFF0C\u901A\u5E38\u53EA\u9700\u8981\u51E0\u79D2\u3002"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "loading-line",
          children: /*#__PURE__*/_jsxDEV("span", {}, void 0, false)
        }, void 0, false)]
      }, void 0, true)
    }, void 0, false);
  }
  if (mode === "profile" && session) {
    return /*#__PURE__*/_jsxDEV("main", {
      className: "center-page",
      children: /*#__PURE__*/_jsxDEV("section", {
        className: "form-card",
        children: [/*#__PURE__*/_jsxDEV("p", {
          className: "eyebrow",
          children: session.cohort || "现场测评"
        }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
          children: session.title
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          className: "muted",
          children: "\u586B\u5199\u771F\u5B9E\u4FE1\u606F\uFF0C\u4E2A\u4EBA\u7ED3\u679C\u4EC5\u6559\u5E08\u540E\u53F0\u53EF\u89C1\uFF1B\u8BFE\u5802\u6295\u5C4F\u53EA\u5C55\u793A\u533F\u540D\u5206\u5E03\u3002"
        }, void 0, false), /*#__PURE__*/_jsxDEV("form", {
          onSubmit: beginAssessment,
          className: "stack-form",
          children: [/*#__PURE__*/_jsxDEV("label", {
            children: ["\u59D3\u540D", /*#__PURE__*/_jsxDEV("input", {
              value: profile.name,
              maxLength: 30,
              onChange: e => setProfile({
                ...profile,
                name: e.target.value
              }),
              placeholder: "\u8BF7\u8F93\u5165\u59D3\u540D"
            }, void 0, false)]
          }, void 0, true), /*#__PURE__*/_jsxDEV("label", {
            children: ["\u5C97\u4F4D", /*#__PURE__*/_jsxDEV("select", {
              value: profile.role,
              onChange: e => setProfile({
                ...profile,
                role: e.target.value
              }),
              children: [/*#__PURE__*/_jsxDEV("option", {
                value: "",
                children: "\u8BF7\u9009\u62E9\u5C97\u4F4D"
              }, void 0, false), roles.map(r => /*#__PURE__*/_jsxDEV("option", {
                children: r
              }, r, false))]
            }, void 0, true)]
          }, void 0, true), message && /*#__PURE__*/_jsxDEV("p", {
            className: "error-text",
            children: message
          }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
            className: "primary-button",
            type: "submit",
            children: "\u5F00\u59CB\u6D4B\u8BC4"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)
    }, void 0, false);
  }
  if (mode === "assessment" && question) {
    const selected = answers[question.id];
    const progress = Math.round((current + 1) / 17 * 100);
    return /*#__PURE__*/_jsxDEV("main", {
      className: "assessment-page",
      children: [/*#__PURE__*/_jsxDEV("header", {
        className: "assessment-header",
        children: [/*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "brand-mark",
            children: "AI"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            children: session?.title
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
          children: [current + 1, " / 17"]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "progress-track",
        children: /*#__PURE__*/_jsxDEV("span", {
          style: {
            width: `${progress}%`
          }
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
        className: "question-card",
        children: [/*#__PURE__*/_jsxDEV("p", {
          className: "eyebrow",
          children: question.kind === "ability" ? "能力情境题" : "使用偏好题 · 没有标准答案"
        }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
          children: question.prompt
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "option-list",
          children: displayedOptions.map((option, index) => /*#__PURE__*/_jsxDEV("button", {
            type: "button",
            className: `option-button ${selected === option.id ? "selected" : ""}`,
            onClick: () => chooseAnswer(option.id),
            children: [/*#__PURE__*/_jsxDEV("span", {
              children: String.fromCharCode(65 + index)
            }, void 0, false), option.text]
          }, option.id, true))
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "question-actions",
          children: [/*#__PURE__*/_jsxDEV("button", {
            type: "button",
            className: "text-button",
            disabled: current === 0,
            onClick: () => setCurrent(v => v - 1),
            children: "\u4E0A\u4E00\u9898"
          }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
            type: "button",
            className: "primary-button",
            disabled: !selected,
            onClick: () => setCurrent(v => v + 1),
            children: "\u4E0B\u4E00\u9898"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)]
    }, void 0, true);
  }
  if (mode === "assessment" && current === questions.length) {
    return /*#__PURE__*/_jsxDEV("main", {
      className: "assessment-page",
      children: [/*#__PURE__*/_jsxDEV("header", {
        className: "assessment-header",
        children: [/*#__PURE__*/_jsxDEV("div", {
          children: [/*#__PURE__*/_jsxDEV("span", {
            className: "brand-mark",
            children: "AI"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            children: "\u771F\u5B9E\u63D0\u793A\u8BCD\u4EFB\u52A1"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("span", {
          children: "17 / 17"
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("div", {
        className: "progress-track",
        children: /*#__PURE__*/_jsxDEV("span", {
          style: {
            width: "100%"
          }
        }, void 0, false)
      }, void 0, false), /*#__PURE__*/_jsxDEV("section", {
        className: "question-card open-card",
        children: [/*#__PURE__*/_jsxDEV("p", {
          className: "eyebrow",
          children: "\u5F00\u653E\u9898 \xB7 \u6309\u4F60\u771F\u5B9E\u4F1A\u4F7F\u7528\u7684\u65B9\u5F0F\u4F5C\u7B54"
        }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
          children: "\u8BF7\u5199\u51FA\u4E00\u6BB5\u4F60\u4F1A\u76F4\u63A5\u4EA4\u7ED9 AI \u7684\u5B8C\u6574\u63D0\u793A\u8BCD"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "scenario-box",
          children: OPEN_PROMPT
        }, void 0, false), /*#__PURE__*/_jsxDEV("textarea", {
          value: openPrompt,
          onChange: e => setOpenPrompt(e.target.value),
          maxLength: 2000,
          placeholder: "\u8BF7\u5728\u8FD9\u91CC\u5199\u4E0B\u5B8C\u6574\u63D0\u793A\u8BCD\u2026\u2026"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "textarea-meta",
          children: [/*#__PURE__*/_jsxDEV("span", {
            children: "\u81F3\u5C1130\u5B57"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            children: [openPrompt.length, " / 2000"]
          }, void 0, true)]
        }, void 0, true), message && /*#__PURE__*/_jsxDEV("p", {
          className: "error-text",
          children: message
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "question-actions",
          children: [/*#__PURE__*/_jsxDEV("button", {
            className: "text-button",
            onClick: () => setCurrent(questions.length - 1),
            children: "\u4E0A\u4E00\u9898"
          }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
            className: "primary-button",
            onClick: () => void submitAssessment(),
            children: "\u63D0\u4EA4\u5E76\u751F\u6210\u753B\u50CF"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true)]
    }, void 0, true);
  }
  return /*#__PURE__*/_jsxDEV("main", {
    className: "landing-page",
    children: [/*#__PURE__*/_jsxDEV("nav", {
      className: "top-nav",
      children: [/*#__PURE__*/_jsxDEV("div", {
        children: [/*#__PURE__*/_jsxDEV("span", {
          className: "brand-mark",
          children: "AI"
        }, void 0, false), /*#__PURE__*/_jsxDEV("strong", {
          children: "\u975E\u51E1 \xB7 AI\u5B66\u4E60\u5B9E\u9A8C\u5BA4"
        }, void 0, false)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("button", {
        className: "text-button",
        onClick: () => {
          history.replaceState({}, "", "?teacher=1");
          setMode("teacher");
        },
        children: "\u6559\u5E08\u540E\u53F0"
      }, void 0, false)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("section", {
      className: "hero-grid",
      children: [/*#__PURE__*/_jsxDEV("div", {
        className: "hero-copy",
        children: [/*#__PURE__*/_jsxDEV("p", {
          className: "eyebrow",
          children: "AI\u80FD\u529B\u4E0E\u98CE\u683C\u6D4B\u8BC4 \xB7 ASSESSMENT V1"
        }, void 0, false), /*#__PURE__*/_jsxDEV("h1", {
          children: ["\u770B\u89C1\u4F60\u7684", /*#__PURE__*/_jsxDEV("br", {}, void 0, false), /*#__PURE__*/_jsxDEV("em", {
            children: "AI \u5DE5\u4F5C\u65B9\u5F0F"
          }, void 0, false)]
        }, void 0, true), /*#__PURE__*/_jsxDEV("p", {
          className: "hero-description",
          children: "16 \u9053\u9009\u62E9\u9898\uFF0C\u52A0\u4E0A\u4E00\u6BB5\u771F\u5B9E\u63D0\u793A\u8BCD\u4EFB\u52A1\u3002\u7EA610\u5206\u949F\uFF0C\u83B7\u5F97\u516D\u7EF4\u80FD\u529B\u3001\u6210\u957F\u7B49\u7EA7\u4E0EAI\u4F7F\u7528\u98CE\u683C\u753B\u50CF\u3002"
        }, void 0, false), /*#__PURE__*/_jsxDEV("div", {
          className: "feature-row",
          children: [/*#__PURE__*/_jsxDEV("span", {
            children: "\u516D\u7EF4\u80FD\u529B\u96F7\u8FBE"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            children: "\u4E09\u8F748\u578B\u98CE\u683C"
          }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
            children: "\u63D0\u793A\u8BCD\u5347\u7EA7\u5EFA\u8BAE"
          }, void 0, false)]
        }, void 0, true)]
      }, void 0, true), /*#__PURE__*/_jsxDEV("form", {
        className: "join-card",
        onSubmit: enterSession,
        children: [/*#__PURE__*/_jsxDEV("div", {
          className: "join-number",
          children: "01"
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          className: "eyebrow",
          children: "\u52A0\u5165\u8BFE\u5802\u6D4B\u8BC4"
        }, void 0, false), /*#__PURE__*/_jsxDEV("h2", {
          children: "\u8F93\u5165\u573A\u6B21\u7801"
        }, void 0, false), /*#__PURE__*/_jsxDEV("input", {
          value: sessionCode,
          onChange: e => setSessionCode(e.target.value.toUpperCase()),
          placeholder: "\u4F8B\u5982 A7K9Q2",
          maxLength: 8,
          autoCapitalize: "characters"
        }, void 0, false), message && /*#__PURE__*/_jsxDEV("p", {
          className: "error-text",
          children: message
        }, void 0, false), /*#__PURE__*/_jsxDEV("button", {
          className: "primary-button",
          type: "submit",
          disabled: loading,
          children: loading ? "正在连接…" : "进入测评"
        }, void 0, false), /*#__PURE__*/_jsxDEV("p", {
          className: "privacy-note",
          children: "\u59D3\u540D\u4EC5\u7528\u4E8E\u6559\u5E08\u8BFE\u540E\u6307\u5BFC\uFF0C\u4E0D\u53C2\u4E0E\u516C\u5F00\u6392\u540D\u3002"
        }, void 0, false)]
      }, void 0, true)]
    }, void 0, true), /*#__PURE__*/_jsxDEV("footer", {
      className: "landing-footer",
      children: [/*#__PURE__*/_jsxDEV("span", {
        children: "\u8BFE\u7A0B\u8D77\u70B9\u753B\u50CF\uFF0C\u4E0D\u662F\u6807\u51C6\u5316\u5FC3\u7406\u6D4B\u9A8C"
      }, void 0, false), /*#__PURE__*/_jsxDEV("span", {
        children: "\u7EA6 10\u201312 \u5206\u949F"
      }, void 0, false)]
    }, void 0, true)]
  }, void 0, true);
}

/* ======================== RENDER ======================== */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(AssessmentApp));