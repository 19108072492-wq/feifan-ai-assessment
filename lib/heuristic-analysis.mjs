/**
 * Heuristic prompt analyzer — 本地启发式评分。
 *
 * 相比 v1 的改进：
 * 1) 按"原子句"切分而不是按段落 — 每个维度抽取独立句子作为 evidence
 * 2) 评分拆为两层：基本分（是否提到）+ 质量分（具体/可执行/有数字/有示例）
 * 3) upgradedPrompt 用结构化模板拼接岗位定制，不再复用 evidence
 * 4) 拆解维度清晰分离：评分 / 证据 / 改进点三栏
 */

export const RUBRIC_KEYS = [
  "audience",
  "purpose",
  "inputs",
  "process",
  "output",
  "constraints",
  "acceptance",
];

/* ============== 维度配置 ==============
 *  keywords: 基本提及词（命中给基本分）
 *  qualityKeywords: 质量信号词（命中提升具体性等级）
 *  evidenceHints: 用于从原文中抽取证据的提示词
 *  specificSignals: 包含具体细节（数字/示例/范围/可测量）才算 3 分
 */
const DIMENSION_CONFIG = {
  audience: {
    label: "对象",
    keywords: ["家长", "学生", "教师", "员工", "受众", "用户", "读者", "听众", "对象", "面向", "高一", "高二", "高三", "新人", "管培生", "顾问", "班主任", "校长", "领导", "客户", "团队", "学员", "讲师", "同事", "主管"],
    qualityKeywords: ["第一次", "首次", "新手", "零基础", "初学者", "有经验", "新入职", "无基础", "高敏感", "挑剔", "积极", "保守", "专业", "非专业", "零基础", "有美术基础", "无美术基础"],
    evidenceHints: ["家长", "学生", "对象", "面向", "受众", "给", "听众", "新人", "教师", "顾问", "客户", "团队", "管培生"],
    specificSignals: ["岁", "年级", "年级", "类", "批", "名", "位", "经验", "基础", "背景", "特征", "画像", "情况"],
  },
  purpose: {
    label: "目的",
    keywords: ["目标", "目的", "理解", "掌握", "帮助", "用于", "为了", "完成", "达到", "学会", "了解", "知道", "认识", "能够", "实现", "提升", "培养", "训练", "教会", "让", "说服", "推动", "促成"],
    qualityKeywords: ["平衡", "配合", "重点", "阶段", "策略", "方案", "流程", "方法", "技巧", "规划", "定位", "卖点", "差异", "区分", "澄清", "消除", "覆盖", "对齐", "达成"],
    evidenceHints: ["目标", "目的", "为了", "帮助", "让", "理解", "掌握", "学会", "说服", "促成", "达成", "实现", "覆盖"],
    specificSignals: ["成", "率", "分", "项", "步", "种", "个", "位", "条", "轮", "级", "类"],
  },
  inputs: {
    label: "输入资料",
    keywords: ["资料", "文件", "数据", "来源", "政策", "课程", "安排", "案例", "往届", "参考", "材料", "文档", "表格", "记录", "信息", "清单", "模板", "背景", "历史", "附件", "课件", "教案", "话术", "脚本", "问卷", "画像"],
    qualityKeywords: ["标注", "来源", "日期", "版本", "适用", "整理", "分类", "匿名", "脱敏", "排序", "优先级", "更新", "时间", "近三年", "本校", "本校课程"],
    evidenceHints: ["资料", "文件", "政策", "课程", "案例", "参考", "材料", "数据", "课件", "话术", "问卷", "画像", "脚本"],
    specificSignals: ["份", "张", "页", "份", "条", "年", "月", "周", "版", "号", "节", "次", "段"],
  },
  process: {
    label: "执行方式",
    keywords: ["步骤", "流程", "先", "再", "然后", "第一步", "首先", "接着", "最后", "检查点", "分步", "轮次", "迭代", "修改", "调整", "逐项", "依次", "阶段", "环节", "顺序", "按", "流程", "步骤"],
    qualityKeywords: ["检查点", "验收", "分轮", "迭代", "复核", "确认", "审核", "反馈", "修改", "优化", "校对", "交叉", "抽样", "回访", "对话", "演练", "试讲", "讨论", "评审"],
    evidenceHints: ["步骤", "流程", "先", "再", "然后", "分步", "检查", "修改", "演练", "试讲", "评审", "抽样", "复核", "交叉", "讨论"],
    specificSignals: ["次", "轮", "步", "段", "分", "5", "3", "10", "一", "二", "三", "两"],
  },
  output: {
    label: "输出格式",
    keywords: ["PPT", "ppt", "演示", "大纲", "格式", "页数", "结构", "模板", "文档", "表格", "图表", "幻灯片", "页面", "章节", "目录", "排版", "设计", "风格", "色调", "字体", "PDF", "doc", "word", "邮件", "信", "通知", "稿", "总结", "方案", "周报", "月报", "简历"],
    qualityKeywords: ["页", "分钟", "字数", "章节", "目录", "封面", "封底", "动画", "过渡", "备注", "讲稿", "字号", "段距", "色", "logo", "图表", "表格", "提纲", "结构", "字号", "格式", "段距"],
    evidenceHints: ["PPT", "大纲", "格式", "页", "结构", "模板", "演示", "幻灯片", "文档", "邮件", "信", "稿", "周报", "月报", "PDF", "总结", "方案", "简历"],
    specificSignals: ["页", "分钟", "字", "节", "章", "段", "幅", "种", "个", "5", "3", "10", "15", "20", "30", "40"],
  },
  constraints: {
    label: "限制边界",
    keywords: ["不要", "禁止", "避免", "时长", "限制", "范围", "边界", "字数", "时间", "注意", "必须", "不得", "不能", "避免", "确保", "保证", "不超过", "至少", "最少", "最多", "应该", "不能"],
    qualityKeywords: ["不要", "禁止", "不得", "不能", "避免", "必须", "确保", "保证", "事实", "准确", "真实", "隐私", "敏感", "脱敏", "版权", "合规", "唯一", "首家", "最", "绝对", "未成年", "未提供", "未核实"],
    evidenceHints: ["不要", "禁止", "避免", "时长", "限制", "必须", "不得", "不能", "确保", "保证", "合规", "敏感", "隐私", "脱敏", "事实", "准确", "版权", "未成年"],
    specificSignals: ["分钟", "字", "页", "岁", "年", "月", "条", "项", "份", "内", "外", "前", "后"],
  },
  acceptance: {
    label: "验收标准",
    keywords: ["验收", "标准", "检查", "确认", "合格", "完成", "满足", "要求", "达到", "验证", "核对", "测试", "审核", "通过", "交付", "检查清单", "准则", "评分", "核对", "复评", "复审", "通过", "评价"],
    qualityKeywords: ["验收", "标准", "核对", "验证", "测试", "检查清单", "合格", "通过", "交付", "确认", "评分", "复评", "复审", "实测", "可追溯", "可核对", "可验证", "可衡量", "可量化"],
    evidenceHints: ["验收", "标准", "检查", "确认", "合格", "满足", "验证", "核对", "复评", "复审", "可追溯", "可核对", "评分"],
    specificSignals: ["分", "条", "项", "次", "轮", "级", "5", "3", "10", "一", "二", "三", "两"],
  },
};

/* ============== 句法切分 ============== */

/**
 * 把文本切成更细的"原子句"，每个原子句尽量只表达一个意思。
 * - 按中英文标点切分
 * - 再按连接词（"先""然后""再""最后"）切分
 * - 过滤掉过短的片段
 */
function splitAtomicSentences(text) {
  const raw = text
    .replace(/[\r\t]+/g, " ")
    .split(/[。\n；;！!？?]/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 4);

  const atoms = [];
  for (const s of raw) {
    const parts = s
      .split(/(?<=[，,；;])\s*(?=先|再|然后|接着|最后|其次|第一|第二步|第三步)/)
      .map((p) => p.trim())
      .filter((p) => p.length >= 4);
    atoms.push(...parts);
  }
  return atoms.length > 0 ? atoms : raw;
}

/* ============== 关键词匹配 ============== */

function countMatches(text, keywords) {
  let count = 0;
  for (const keyword of keywords) {
    const regex = new RegExp(escapeRegExp(keyword), "gi");
    const matches = text.match(regex);
    if (matches) count += matches.length;
  }
  return count;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ============== 维度评估（三层） ==============
 *
 * 返回：
 *  - base: 0-2，是否提到这个维度
 *  - quality: 0-1，质量信号（具体/可执行/有数字）
 *  - score: 0-3，最终分
 *  - evidence: 从原文抽取的最相关原子句
 *  - suggestions: 该维度的具体改进点
 */
function evaluateDimension(text, config) {
  const baseCount = countMatches(text, config.keywords);
  const qualityCount = countMatches(text, config.qualityKeywords);
  const specificCount = countMatches(text, config.specificSignals);

  const atomicSentences = splitAtomicSentences(text);
  let bestSentence = "";
  let bestScore = 0;
  const seen = new Set();
  for (const sentence of atomicSentences) {
    let score = 0;
    for (const hint of config.evidenceHints) {
      if (sentence.includes(hint)) score += 2;
    }
    for (const kw of config.qualityKeywords) {
      if (sentence.includes(kw)) score += 1;
    }
    if (score > 0 && !seen.has(sentence)) {
      seen.add(sentence);
      if (score > bestScore) {
        bestScore = score;
        bestSentence = sentence;
      }
    }
  }

  let base = 0;
  if (baseCount >= 3) base = 2;
  else if (baseCount >= 1) base = 1;

  let quality = 0;
  if (qualityCount >= 2 && specificCount >= 1) quality = 1;
  else if (qualityCount >= 1 || specificCount >= 2) quality = 1;
  else if (specificCount >= 1) quality = 0;

  const score = Math.min(3, base + quality);

  const suggestions = [];
  if (base === 0) suggestions.push(`完全没有提到"${config.label}"相关的内容，需要补一段`);
  else if (base === 1) suggestions.push(`"${config.label}"只笼统提了一下，建议更具体地描述`);
  if (base >= 1 && quality === 0) suggestions.push(`"${config.label}"没有数字、示例或可测量标准，建议补充`);
  if (base >= 1 && qualityCount === 0) suggestions.push(`"${config.label}"缺少边界/范围/方法描述，可以更具体`);

  return {
    score,
    evidence: bestSentence.slice(0, 100) || "未在原文中找到明确证据",
    suggestions: suggestions.slice(0, 2),
  };
}

/* ============== 升级版提示词（结构化模板） ============== */

/**
 * 用结构化模板生成升级版提示词。
 * 关键：每个维度从原文 evidence 中抽独立句子；evidence 不足时用岗位定制补全。
 */
function buildUpgradedPrompt(original, evaluations, role) {
  const safeRole = role || "teacher";
  const taskMap = {
    teacher: "面向同组教师与教学主任的公开课",
    consultant: "高一家长首次咨询后的跟进沟通",
    headteacher: "高一新班级的家长会开场发言",
    trainee: "入职第一个月的个人总结",
    admin: "下学期教研组调整建议",
  };
  const taskDesc = taskMap[safeRole] || taskMap.teacher;

  const sections = [];
  sections.push(`请按以下完整结构准备【${taskDesc}】，每段都基于我提供的事实，缺什么直接告诉我，不要自己编。\n`);

  sections.push(
    `【对象】请明确：是谁、有什么经验或基础、可能有哪些顾虑。\n` +
    (evaluations.audience.score >= 2
      ? `可参考我原话：${evaluations.audience.evidence}`
      : `示例：第一次接触艺考的高二家长，孩子成绩中等、家庭对艺考费用有顾虑。`),
  );

  sections.push(
    `【目的】请说明：要让谁理解/接受/做到什么，达到什么可观察的效果。\n` +
    (evaluations.purpose.score >= 2
      ? `可参考我原话：${evaluations.purpose.evidence}`
      : `示例：让家长理解三个核心要点（备考阶段、文化与专业平衡、家长配合重点），并能在讲座后准确回答其他家长的提问。`),
  );

  sections.push(
    `【输入资料】请列出我提供的资料，并标注来源/日期/版本/适用范围，未提供的资料不要用。\n` +
    (evaluations.inputs.score >= 2
      ? `可参考我原话：${evaluations.inputs.evidence}`
      : `示例：\n- 本校课程安排（来源：教务处 2026 春，版本 V3）\n- 近三年美术艺考政策文件（来源：省考试院 2024-2026）\n- 往届家长常见问题汇总（来源：招生办 2025）`),
  );

  sections.push(
    `【执行步骤】请按顺序说明你要怎么完成：先做什么 → 中间检查点 → 再做什么 → 怎么让我确认。\n` +
    (evaluations.process.score >= 2
      ? `可参考我原话：${evaluations.process.evidence}`
      : `示例：\n1. 先列大纲发我确认\n2. 按章节填充内容\n3. 每完成 5 页给我检查一次\n4. 全部完成后做整体核对`),
  );

  sections.push(
    `【输出格式】请明确：用什么格式、多少页/多少字、什么结构、是否要备注讲稿。\n` +
    (evaluations.output.score >= 2
      ? `可参考我原话：${evaluations.output.evidence}`
      : `示例：40 分钟讲座 PPT，30-35 页，包含封面、目录、4 章正文（每章 6-8 页）、封底，每页右下角附讲稿备注。`),
  );

  sections.push(
    `【限制边界】请明确：哪些事不能做、不能编造什么、字数/时长/页数限制、风格要求。\n` +
    (evaluations.constraints.score >= 2
      ? `可参考我原话：${evaluations.constraints.evidence}`
      : `示例：\n- 不得编造未提供的政策信息\n- 不得使用\"唯一/首家/最\"等绝对化表述\n- 时长不超过 40 分钟\n- 语言通俗易懂，避免专业术语\n- 涉及学生姓名/家庭信息要脱敏`),
  );

  sections.push(
    `【验收标准】请明确：完成后我怎么判断合格，至少给 3 条可核对的标准。\n` +
    (evaluations.acceptance.score >= 2
      ? `可参考我原话：${evaluations.acceptance.evidence}`
      : `示例：\n1. 政策数字与原始文件 100% 一致，可逐条对照\n2. 时长控制在 40 分钟以内，PPT 30-35 页\n3. 家长能听懂并准确回答其他家长 3 个常见问题`),
  );

  sections.push(
    `\n请先输出大纲让我确认，再按章节制作。每完成 5 页让我检查一次。如果有信息缺失，明确告诉我缺什么，不要自己编。`,
  );

  return sections.join("\n\n");
}

/* ============== 优劣势生成 ============== */

function generateStrengths(evaluations) {
  const strengths = [];
  for (const key of RUBRIC_KEYS) {
    if (evaluations[key].score >= 2 && evaluations[key].evidence !== "未在原文中找到明确证据") {
      const qualityWord = evaluations[key].score === 3 ? "具体可执行" : "比较清楚";
      strengths.push(
        `${DIMENSION_CONFIG[key].label}描述${qualityWord}："${evaluations[key].evidence}"`,
      );
    }
  }
  if (strengths.length === 0) {
    strengths.push("已经尝试表达任务意图，可以在此基础上补充结构化要素");
  }
  return strengths.slice(0, 3);
}

function generateImprovements(evaluations) {
  const improvements = [];
  for (const key of RUBRIC_KEYS) {
    if (evaluations[key].score <= 1) {
      for (const s of evaluations[key].suggestions) {
        improvements.push(s);
      }
    }
  }
  if (improvements.length === 0) {
    improvements.push("整体结构较完整，可进一步补充可量化的验收标准");
  }
  return improvements.slice(0, 5);
}

function generateRisks(evaluations) {
  const risks = [];
  for (const key of RUBRIC_KEYS) {
    if (evaluations[key].score <= 1) {
      const riskMap = {
        audience: "AI 可能默认通用表达，无法针对你面向的特定人群调整深度",
        purpose: "AI 可能输出形式上完整但偏离你真正想要的结果",
        inputs: "AI 可能依赖常识编造内容，引入未核实的政策或数据",
        process: "AI 可能一次性输出大量内容，不给你中间调整的机会",
        output: "AI 可能产出不符合使用场景的格式（比如家长想看的是案例，你给了一堆理论）",
        constraints: "AI 可能使用绝对化表述、编造事实或忽略敏感信息",
        acceptance: "你无法判断 AI 的产出是否达标，最后要返工",
      };
      risks.push(riskMap[key]);
    }
  }
  if (risks.length === 0) {
    risks.push("提示词已较完整，可进一步加入可量化验收标准");
  }
  return risks.slice(0, 3);
}

function generateNextActions(evaluations) {
  const sorted = RUBRIC_KEYS
    .map((k) => ({ key: k, score: evaluations[k].score }))
    .sort((a, b) => a.score - b.score);

  const actionMap = {
    audience: "练习在每次提示词开头明确写出面向对象的特征：身份、经验、基础、可能的顾虑",
    purpose: "训练用一句话写出任务目标：让谁、做什么、达到什么可观察效果",
    inputs: "练习整理资料清单并标注来源、日期和版本，养成先给资料再提要求的习惯",
    process: "练习把任务拆成 3-5 个步骤，设定检查点，让 AI 分步交付",
    output: "训练明确指定输出格式、页数/字数、结构和风格",
    constraints: "练习设定事实边界、语言风格、绝对化表述禁区",
    acceptance: "训练在每次任务前写出 2-3 条可核对的验收标准",
  };

  return sorted.slice(0, 3).map(({ key }) => actionMap[key]);
}

function generateSummary(evaluations) {
  const total = RUBRIC_KEYS.reduce((s, k) => s + evaluations[k].score, 0);
  const maxScore = RUBRIC_KEYS.length * 3;
  if (total >= maxScore * 0.75) {
    return "提示词结构完整，主要要素齐全且较具体，属于高质量任务说明，可直接交给 AI 推进。";
  }
  if (total >= maxScore * 0.5) {
    return "提示词有基本框架，但部分关键要素（资料边界/验收标准）不够具体，建议按七项量表逐条补全。";
  }
  if (total >= maxScore * 0.25) {
    return "提示词只覆盖少量要素，AI 大概率需要大量猜测，建议重新组织，按七项量表重写。";
  }
  return "提示词过于笼统，缺少任务说明的核心要素，建议先用七项量表搭骨架再填充。";
}

/* ============== 入口 ============== */

export function analyzePrompt(promptText, role) {
  const text = String(promptText || "").trim();
  if (text.length < 30) throw new Error("提示词长度不足30字");

  const evaluations = {};
  const scores = {};
  const evidence = {};
  const suggestions = {};

  for (const key of RUBRIC_KEYS) {
    const config = DIMENSION_CONFIG[key];
    const result = evaluateDimension(text, config);
    evaluations[key] = result;
    scores[key] = result.score;
    evidence[key] = { score: result.score, evidence: result.evidence };
    suggestions[key] = result.suggestions;
  }

  return {
    rubric: evaluations,
    scores,
    summary: generateSummary(evaluations),
    strengths: generateStrengths(evaluations),
    risks: generateRisks(evaluations),
    improvements: generateImprovements(evaluations),
    upgradedPrompt: buildUpgradedPrompt(text, evaluations, role),
    nextActions: generateNextActions(evaluations),
  };
}
