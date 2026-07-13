/**
 * assessment-v3 — 四岗位 AI 能力与风格测评
 * 5 道基础 + 4 道应用 + 6 道风格 + 3 道岗位业务 = 18 道选择题。
 */

export const ASSESSMENT_VERSION = "assessment-v3";

export const dimensions = [
  { id: "scene", label: "场景应用力", weight: 15 },
  { id: "task", label: "任务定义力", weight: 20 },
  { id: "data", label: "资料组织力", weight: 15 },
  { id: "collaboration", label: "人机协作力", weight: 15 },
  { id: "verification", label: "结果验证力", weight: 20 },
  { id: "agent", label: "Agent认知力", weight: 15 },
];

export const roles = [
  { id: "consultant", label: "顾问", description: "负责销售、招生、咨询" },
  { id: "coach", label: "教练", description: "负责学生服务、跟盯、学习督查、作业跟进、学习管理等" },
  { id: "teacher", label: "教师", description: "负责授课、教学、教研、课程设计" },
  { id: "general", label: "通用测评", description: "适用于其他岗位及日常办公场景" },
];

const abilityQuestion = (id, section, dimension, prompt, options, scenarioTag) => ({
  id,
  kind: "ability",
  section,
  dimension,
  prompt,
  scenarioTag,
  options: options.map(({ text, score }, index) => ({ id: `${id}-${index}`, text, score })),
});

const multiQuestion = (id, section, dimension, prompt, options, strategy, scenarioTag) => ({
  id,
  kind: "multi",
  section,
  dimension,
  prompt,
  strategy,
  scenarioTag,
  options,
});

const styleQuestion = (id, prompt, axis, weight, left, right, scenarioTag) => ({
  id,
  kind: "style",
  section: "style",
  axis,
  weight,
  prompt,
  scenarioTag,
  options: [
    { id: `${id}-${left.pole.toLowerCase()}`, text: left.text, pole: left.pole },
    { id: `${id}-${right.pole.toLowerCase()}`, text: right.text, pole: right.pole },
  ],
});

const COMMON_QUESTIONS = [
  abilityQuestion("f-q1", "foundation", "scene", "过去一个月，你使用 AI 的情况更接近哪一种？", [
    { text: "遇到搜索或写作任务时偶尔用一次", score: 0 },
    { text: "每周会在几类固定任务中使用几次", score: 1 },
    { text: "多数工作日都会用来处理真实任务", score: 2 },
    { text: "已形成固定流程并持续复用和优化", score: 3 },
  ], "usage-frequency"),
  multiQuestion("f-q2", "foundation", "agent", "下面哪些 AI 工具是你经常实际使用的？", [
    { id: "f-q2-deepseek", text: "DeepSeek", score: 1, family: "model" },
    { id: "f-q2-doubao", text: "豆包", score: 1, family: "model" },
    { id: "f-q2-kimi", text: "Kimi", score: 1, family: "model" },
    { id: "f-q2-qwen", text: "通义千问", score: 1, family: "model" },
    { id: "f-q2-yuanbao", text: "腾讯元宝", score: 1, family: "model" },
    { id: "f-q2-chatgpt", text: "ChatGPT", score: 1, family: "model" },
    { id: "f-q2-claude", text: "Claude", score: 1, family: "model" },
    { id: "f-q2-gemini", text: "Gemini", score: 1, family: "model" },
    { id: "f-q2-coze", text: "扣子 / Coze", score: 2, family: "agent" },
    { id: "f-q2-feishu", text: "飞书智能伙伴", score: 2, family: "agent" },
    { id: "f-q2-dify", text: "Dify", score: 3, family: "workflow" },
    { id: "f-q2-n8n", text: "n8n", score: 3, family: "workflow" },
    { id: "f-q2-cursor", text: "Cursor", score: 3, family: "coding" },
    { id: "f-q2-codex", text: "Codex", score: 3, family: "coding" },
    { id: "f-q2-claude-code", text: "Claude Code", score: 3, family: "coding" },
  ], "tool-depth", "tool-inventory"),
  multiQuestion("f-q3", "foundation", "scene", "你曾经用 AI 实际完成过哪些类型的任务？", [
    { id: "f-q3-writing", text: "文案、总结或邮件", score: 1, family: "content" },
    { id: "f-q3-research", text: "资料搜索与信息整理", score: 1, family: "research" },
    { id: "f-q3-slides", text: "PPT、讲稿或汇报材料", score: 1, family: "delivery" },
    { id: "f-q3-data", text: "表格、数据或批量处理", score: 1, family: "data" },
    { id: "f-q3-media", text: "图片、视频或音频内容", score: 1, family: "media" },
    { id: "f-q3-service", text: "客户或学生服务任务", score: 1, family: "service" },
    { id: "f-q3-knowledge", text: "知识库或资料问答", score: 1, family: "knowledge" },
    { id: "f-q3-code", text: "网站、程序或自动化", score: 1, family: "build" },
  ], "task-breadth", "task-inventory"),
  abilityQuestion("f-q4", "foundation", "agent", "你现在更常用哪种方式让 AI 完成任务？", [
    { text: "直接描述需求，主要看当次回答是否可用", score: 0 },
    { text: "使用固定模板，补充背景后生成完整初稿", score: 1 },
    { text: "分阶段提供资料，按反馈多轮修改结果", score: 2 },
    { text: "配置规则与工具，让流程自动执行并留痕", score: 3 },
  ], "usage-depth"),
  multiQuestion("f-q5", "foundation", "agent", "下面哪些项目经历符合你的真实完成情况？", [
    { id: "f-q5-none", text: "暂未完成过独立 AI 项目", score: 0, family: "none" },
    { id: "f-q5-template", text: "体验或改过现成项目模板", score: 1, family: "template" },
    { id: "f-q5-website-live", text: "个人网站已完成并可访问", score: 2, family: "website" },
    { id: "f-q5-knowledge-active", text: "个人知识库已持续使用", score: 2, family: "knowledge" },
    { id: "f-q5-automation-live", text: "自动化流程已稳定运行", score: 3, family: "automation" },
    { id: "f-q5-mini-core", text: "参与小程序核心功能开发", score: 3, family: "mini-core" },
    { id: "f-q5-mini-live", text: "参与的小程序已运行上线", score: 3, family: "mini-live" },
  ], "project-depth", "project-evidence"),

  abilityQuestion("a-q1", "application", "task", "接到一个比较模糊的任务时，你通常怎样开始和 AI 沟通？", [
    { text: "先让 AI 给几个方向，再从中挑一个继续", score: 1 },
    { text: "先讲清背景情况，再请 AI 生成完整方案", score: 2 },
    { text: "先确定目标、对象、交付物和验收方式", score: 3 },
    { text: "先发一句核心需求，根据回答再逐步补充", score: 0 },
  ], "task-definition"),
  abilityQuestion("a-q2", "application", "data", "需要 AI 参考多份资料完成任务时，你通常怎么处理？", [
    { text: "整理来源、版本和用途，再分批交给 AI", score: 3 },
    { text: "挑几份最相关资料，让 AI 先做出初稿", score: 1 },
    { text: "把现有资料一起发送，再说明重点内容", score: 0 },
    { text: "先让 AI 建资料框架，再逐项补充缺口", score: 2 },
  ], "context-prep"),
  abilityQuestion("a-q3", "application", "collaboration", "AI 的第一版结果和预期有差距时，你更常怎么修改？", [
    { text: "换一个模型重新提问，再比较两版结果", score: 1 },
    { text: "告诉 AI 重新优化，直到整体感觉合适", score: 0 },
    { text: "补充一个参考案例，请 AI 模仿其结构", score: 2 },
    { text: "按验收项逐条反馈，分轮修改并留版本", score: 3 },
  ], "iteration"),
  abilityQuestion("a-q4", "application", "verification", "准备使用 AI 结果对外交付前，你通常如何检查？", [
    { text: "快速通读一遍，重点修改表达和格式", score: 1 },
    { text: "按来源、事实、边界和验收清单复核", score: 3 },
    { text: "让另一个 AI 复查，再采用它的结论", score: 2 },
    { text: "主要看结构是否完整，细节后续再调整", score: 0 },
  ], "verification"),

  styleQuestion("s-q1", "面对一个完全陌生的任务，你更自然的第一步是？", "explorationExecution", 2,
    { pole: "E", text: "先让 AI 展开几种方向，再边试边收敛" },
    { pole: "D", text: "先确认目标与边界，再按步骤向前推进" }, "style-start"),
  styleQuestion("s-q2", "AI 给出三套都能用的方案时，你通常会？", "explorationExecution", 1,
    { pole: "E", text: "让三套各发展一点，再比较新的可能" },
    { pole: "D", text: "选最接近目标的一套，继续打磨交付" }, "style-choice"),
  styleQuestion("s-q3", "你希望 AI 参与一项重要任务的方式是？", "assignCocreate", 2,
    { pole: "A", text: "我给清楚任务与标准，让 AI 完成初版" },
    { pole: "C", text: "我和 AI 边讨论边推进，共同形成结果" }, "style-collaboration"),
  styleQuestion("s-q4", "AI 的思路与你不同时，你更倾向怎么处理？", "assignCocreate", 1,
    { pole: "A", text: "整理修改要求，让 AI 按要求重新完成" },
    { pole: "C", text: "先讨论分歧原因，再一起调整任务方向" }, "style-disagreement"),
  styleQuestion("s-q5", "得到一份基本可用的 AI 成果后，你通常会？", "fastVerify", 2,
    { pole: "F", text: "先在小范围真实使用，再根据反馈优化" },
    { pole: "V", text: "先系统检查关键风险，再进入真实使用" }, "style-delivery"),
  styleQuestion("s-q6", "准备采用一个新的 AI 工具时，你更接近？", "fastVerify", 1,
    { pole: "F", text: "先拿一个真实任务试用，看能否提效" },
    { pole: "V", text: "先了解数据与规则，再决定是否使用" }, "style-tool"),
];

const BUSINESS_QUESTIONS = {
  consultant: [
    abilityQuestion("c-q1", "business", "task", "准备第一次家长咨询时，你会怎样使用 AI？", [
      { text: "让 AI 生成标准咨询流程，现场灵活调整", score: 1 },
      { text: "先整理家庭信息，再生成问题与判断清单", score: 3 },
      { text: "请 AI 模拟家长提问，提前练习回答方式", score: 2 },
      { text: "咨询后再把记录发给 AI，请它整理重点", score: 0 },
    ], "consultation-prep"),
    abilityQuestion("c-q2", "business", "collaboration", "家长对费用和结果都有顾虑时，你会怎样借助 AI？", [
      { text: "生成一段完整说服话术，直接用于沟通", score: 0 },
      { text: "整理常见异议，请 AI 分别给出回应建议", score: 1 },
      { text: "结合家庭情况，设计分层沟通与跟进节点", score: 3 },
      { text: "让 AI 扮演家长，模拟几轮高压咨询对话", score: 2 },
    ], "objection-handling"),
    abilityQuestion("c-q3", "business", "verification", "AI 给出的艺考政策信息准备发给家长时，你会？", [
      { text: "调整成易懂表达，再发送给家长参考", score: 1 },
      { text: "请另一个 AI 复核，两边一致就采用", score: 2 },
      { text: "标注仅供参考，提醒家长自行再次确认", score: 0 },
      { text: "回查官方原文、年份和适用范围后再发", score: 3 },
    ], "policy-check"),
  ],
  coach: [
    abilityQuestion("o-q1", "business", "scene", "学生连续几次没有按时交作业，你会怎样使用 AI？", [
      { text: "生成一段提醒话术，分别发给学生家长", score: 0 },
      { text: "整理缺交记录，请 AI 帮忙归纳可能原因", score: 2 },
      { text: "结合记录和沟通，制定分阶段跟进方案", score: 3 },
      { text: "让 AI 提供几种管理办法，选择一项试用", score: 1 },
    ], "assignment-followup"),
    abilityQuestion("o-q2", "business", "data", "每周需要跟进多名学生学习情况时，你会？", [
      { text: "把聊天记录交给 AI，生成每人情况摘要", score: 1 },
      { text: "建立统一记录表，让 AI 标记变化和异常", score: 3 },
      { text: "只记录需要重点关注的学生和具体问题", score: 0 },
      { text: "让 AI 按成绩和作业表现生成跟进顺序", score: 2 },
    ], "student-tracking"),
    abilityQuestion("o-q3", "business", "verification", "AI 判断某位学生可能出现学习倦怠时，你会？", [
      { text: "先按 AI 建议沟通，再观察学生的反应", score: 1 },
      { text: "结合出勤、作业和访谈记录交叉判断", score: 3 },
      { text: "请 AI 给出更多可能性，再选择一种解释", score: 2 },
      { text: "把判断写进周报，提醒教师和家长关注", score: 0 },
    ], "student-risk"),
  ],
  teacher: [
    abilityQuestion("t-q1", "business", "task", "准备一节新课时，你更可能怎样使用 AI？", [
      { text: "让 AI 生成完整教案，再按经验进行修改", score: 1 },
      { text: "先确定学情与目标，再设计活动和评价", score: 3 },
      { text: "请 AI 给出几种导入方式，选择合适方案", score: 2 },
      { text: "主要用 AI 搜集案例，教学结构自己完成", score: 0 },
    ], "lesson-design"),
    abilityQuestion("t-q2", "business", "collaboration", "使用 AI 辅助作业评价时，你会怎样安排？", [
      { text: "让 AI 先写全部评语，我统一调整表达", score: 0 },
      { text: "提供评价标准，让 AI 标出需要关注处", score: 2 },
      { text: "AI 做分类统计，我负责个性判断和反馈", score: 3 },
      { text: "挑选典型作业请 AI 总结共性问题", score: 1 },
    ], "assignment-review"),
    abilityQuestion("t-q3", "business", "verification", "AI 提供了一条新的教学研究结论，你会？", [
      { text: "用于教研讨论，请同事一起判断是否适用", score: 2 },
      { text: "查找原始研究、样本和适用条件后再用", score: 3 },
      { text: "作为新思路加入方案，并注明由 AI 提供", score: 1 },
      { text: "只要符合教学经验，就先在课堂中试用", score: 0 },
    ], "research-check"),
  ],
  general: [
    abilityQuestion("g-q1", "business", "task", "领导让你尽快准备一份情况汇报，你会怎样用 AI？", [
      { text: "说明汇报主题，请 AI 直接生成完整材料", score: 0 },
      { text: "先列目标和受众，再整理事实与结构要求", score: 3 },
      { text: "找一份以往材料，请 AI 按相同格式改写", score: 1 },
      { text: "请 AI 先问关键问题，再逐项补齐材料", score: 2 },
    ], "work-report"),
    abilityQuestion("g-q2", "business", "data", "需要整合多个部门的资料时，你通常会？", [
      { text: "全部交给 AI，请它统一格式并提炼重点", score: 0 },
      { text: "先按来源和版本归类，再建立统一口径", score: 3 },
      { text: "挑出差异较大的部分，请 AI 协助比较", score: 2 },
      { text: "先采用最新资料，其余内容作为补充参考", score: 1 },
    ], "cross-team-data"),
    abilityQuestion("g-q3", "business", "verification", "AI 生成的方案中包含几项陌生数据，你会？", [
      { text: "删除陌生数据，只保留熟悉的内容", score: 1 },
      { text: "要求 AI 列来源，再逐项回到原文核对", score: 3 },
      { text: "换一个模型复核，结果接近就继续使用", score: 2 },
      { text: "保留数据并标注为估算，交付后再确认", score: 0 },
    ], "data-verification"),
  ],
};

export const OPEN_PROMPTS = {
  consultant: "请写一段你会直接交给 AI 的完整提示词：为一位第一次咨询艺考的高二家长准备后续沟通方案。学生文化成绩中等、对美术有兴趣，家长同时担心费用、升学结果和学习风险。你需要在下一次20分钟沟通中帮助家长理解路径并明确下一步行动。",
  coach: "请写一段你会直接交给 AI 的完整提示词：为一名连续两周作业完成率下降、近期沟通意愿较弱的高二学生设计一周跟进方案。你手头有出勤、作业、测评和沟通记录，需要兼顾学生感受、学习执行和必要的家校沟通。",
  teacher: "请写一段你会直接交给 AI 的完整提示词：准备一节45分钟的公开课，课题可以结合你的真实教学内容。对象是当前所教学生，听课人员包括同组教师和教学负责人，需要体现学情、目标、活动设计、评价方式和课后改进。",
  general: "请写一段你会直接交给 AI 的完整提示词：把来自三个部门、格式不同且部分信息存在冲突的材料，整理成一份供负责人决策的工作简报。需要说明事实来源、核心问题、可选方案、风险和建议行动，并标出仍需人工确认的信息。",
};

export function getOpenPromptForRole(role) {
  return OPEN_PROMPTS[role] || OPEN_PROMPTS.general;
}

export function getQuestionsForRole(role) {
  const business = BUSINESS_QUESTIONS[role] || BUSINESS_QUESTIONS.general;
  return [...COMMON_QUESTIONS, ...business];
}

export const questions = getQuestionsForRole("teacher");

export const styleProfiles = {
  EAF: {
    name: "灵感探路者",
    tagline: "先打开可能性，再快速让 AI 推进。",
    startMode: "你习惯从多个方向起步，通过快速试做找到值得继续的路线。",
    divisionMode: "你倾向给出目标后让 AI 主动产出，再从结果中选择和调整。",
    speedQuality: "你更相信真实反馈，愿意先做出可用版本再持续优化。",
    strengths: ["快速打开思路", "敢于尝试新工具", "能迅速形成初版"],
    risks: ["方向过多时不易收束", "可能弱化事实与边界检查"],
    bestTasks: ["创意策划", "新项目探索", "内容原型"],
    collaborationMode: "先给 AI 试错空间，再用明确节点收束方向。",
    recommendedWorkflow: ["生成三个方向", "选定一条主线", "按清单完成核验"],
    nextProjects: ["个人网站", "内容策划 Agent"],
    upgrade: "每次探索前先写下停止条件和最终验收项。",
    strength: "擅长快速打开思路并让 AI 推进",
    blindSpot: "容易在方向很多时忽略收束和核验",
  },
  EAV: {
    name: "洞察研究者",
    tagline: "广泛探索，同时追问依据与风险。",
    startMode: "你会先扩大信息面，比较多种解释后再决定采用哪条路径。",
    divisionMode: "你愿意把检索和整理交给 AI，但重要判断通常由自己把关。",
    speedQuality: "你重视证据和完整性，宁愿多核对一步再进入正式使用。",
    strengths: ["信息搜集全面", "善于比较观点", "风险意识较强"],
    risks: ["研究时间可能过长", "容易推迟第一次交付"],
    bestTasks: ["行业研究", "政策分析", "复杂选型"],
    collaborationMode: "让 AI 并行研究不同方向，再统一来源和判断标准。",
    recommendedWorkflow: ["列出研究问题", "并行检索与比对", "形成带来源结论"],
    nextProjects: ["专题知识库", "研究型 Agent"],
    upgrade: "为研究阶段设置时间盒，并提前定义最低可交付版本。",
    strength: "喜欢探索多种可能并重视依据",
    blindSpot: "可能投入过多研究时间",
  },
  ECF: {
    name: "灵感共创者",
    tagline: "在持续对话中激发想法并快速成形。",
    startMode: "你习惯先聊起来，通过追问、反问和联想逐渐看清任务方向。",
    divisionMode: "你把 AI 当成讨论伙伴，双方在多轮互动中共同形成结果。",
    speedQuality: "你愿意快速尝试，并根据交流过程不断改变和优化版本。",
    strengths: ["对话中容易产生新意", "调整方向比较灵活", "共创过程参与度高"],
    risks: ["多轮交流容易发散", "关键决定可能没有留痕"],
    bestTasks: ["内容创作", "课程共创", "方案脑暴"],
    collaborationMode: "每轮只解决一个关键问题，并及时固化已经达成的共识。",
    recommendedWorkflow: ["共同澄清问题", "分轮发展方案", "锁定版本与决策"],
    nextProjects: ["共创提示词库", "课程设计助手"],
    upgrade: "在每轮对话结束时让 AI 输出共识、分歧和下一步。",
    strength: "善于在对话中激发想法",
    blindSpot: "多轮交流容易发散",
  },
  ECV: {
    name: "深度共研者",
    tagline: "通过深入对话，把复杂问题研究透。",
    startMode: "你会从不同角度提出问题，与 AI 一起构建对任务的完整理解。",
    divisionMode: "你倾向共同分析和校准，重要结论会在讨论中逐层确认。",
    speedQuality: "你重视推理过程和结果可靠性，通常不会急于采用第一版。",
    strengths: ["复杂问题理解深入", "善于发现隐含假设", "能够持续校准判断"],
    risks: ["容易陷入细节讨论", "交付节奏可能偏慢"],
    bestTasks: ["复杂决策", "课程研究", "策略设计"],
    collaborationMode: "用阶段结论和决策日志控制深度讨论的范围。",
    recommendedWorkflow: ["建立问题地图", "逐层验证假设", "形成决策与证据链"],
    nextProjects: ["决策知识库", "深度研究工作流"],
    upgrade: "为每个研究阶段设置明确输出，避免无限延伸。",
    strength: "擅长与 AI 深入讨论并校准判断",
    blindSpot: "容易在细节中投入过多",
  },
  DAF: {
    name: "敏捷执行者",
    tagline: "目标明确、委派直接、快速交付。",
    startMode: "你更愿意先明确要什么，然后马上让 AI 开始形成结果。",
    divisionMode: "你通常负责目标和标准，AI 负责高效完成大部分初版工作。",
    speedQuality: "你偏好先交付可用成果，再从真实使用中发现需要修改的地方。",
    strengths: ["推进速度快", "任务委派清楚", "容易形成稳定产出"],
    risks: ["可能探索不足", "快速交付时容易漏掉异常"],
    bestTasks: ["高频文案", "标准材料", "快速执行"],
    collaborationMode: "用短指令启动，用关键验收点控制质量。",
    recommendedWorkflow: ["明确交付标准", "AI 完成初版", "小范围使用后修正"],
    nextProjects: ["批量内容工作流", "自动化执行 Agent"],
    upgrade: "在快速交付前增加一次来源、边界和异常检查。",
    strength: "目标明确并能快速做出结果",
    blindSpot: "速度较快时可能遗漏边界",
  },
  DAV: {
    name: "标准交付者",
    tagline: "把标准说清楚，让 AI 稳定交付。",
    startMode: "你通常先把目标、格式和要求确认清楚，再开始调用 AI。",
    divisionMode: "你负责定义规范和验收，AI 按规则完成可复用的标准成果。",
    speedQuality: "你重视一致性和可靠性，正式交付前会完成必要检查。",
    strengths: ["任务边界清晰", "交付稳定可控", "容易沉淀标准模板"],
    risks: ["面对模糊问题探索不足", "规则过多时灵活性下降"],
    bestTasks: ["标准报告", "批量材料", "流程规范"],
    collaborationMode: "用模板、示例和验收清单让 AI 稳定复现。",
    recommendedWorkflow: ["定义标准模板", "按模板生成", "逐项验收归档"],
    nextProjects: ["标准化知识库", "文档生成 Agent"],
    upgrade: "在正式执行前保留一个小范围探索环节。",
    strength: "擅长给出清楚标准并稳定交付",
    blindSpot: "面对高度模糊问题时探索不足",
  },
  DCF: {
    name: "协同推进者",
    tagline: "围绕目标持续协作，边做边调整。",
    startMode: "你会先确认主要目标，然后在推进过程中逐步解决具体问题。",
    divisionMode: "你与 AI 保持频繁协作，根据每一步结果动态调整分工。",
    speedQuality: "你愿意快速推进，也会在关键节点共同检查是否偏离目标。",
    strengths: ["协作推进顺畅", "应对变化灵活", "反馈转化速度快"],
    risks: ["频繁调整会打断结构", "版本之间容易缺少记录"],
    bestTasks: ["项目推进", "迭代运营", "跨部门协作"],
    collaborationMode: "以任务看板和阶段版本维持共同节奏。",
    recommendedWorkflow: ["拆分阶段目标", "边做边反馈", "节点复盘并固化"],
    nextProjects: ["项目协作 Agent", "自动跟进工作流"],
    upgrade: "每次调整都记录原因、影响和当前有效版本。",
    strength: "能围绕目标与 AI 快速协作",
    blindSpot: "频繁调整可能打断整体结构",
  },
  DCV: {
    name: "质量守门人",
    tagline: "目标聚焦、共同校准、严守质量。",
    startMode: "你通常先锁定目标与风险，再和 AI 一起拆解实现路径。",
    divisionMode: "你会与 AI 共同校准关键判断，同时保留最终质量责任。",
    speedQuality: "你更重视正式结果的可信度，习惯在关键节点系统核验。",
    strengths: ["质量意识稳定", "风险控制扎实", "关键判断较可靠"],
    risks: ["质量要求可能拖慢试错", "容易投入过多检查成本"],
    bestTasks: ["重要交付", "高风险决策", "质量审核"],
    collaborationMode: "让 AI 参与检查与反驳，但关键证据必须回到原始来源。",
    recommendedWorkflow: ["明确风险清单", "共同完成与校准", "独立核验后交付"],
    nextProjects: ["质量检查 Agent", "合规知识库"],
    upgrade: "区分必须核验和可以试错的部分，提升整体节奏。",
    strength: "对交付质量保持稳定敏感",
    blindSpot: "质量要求较高时可能降低试错速度",
  },
};

export const levelForScore = (score) => {
  if (score >= 80) return { code: "L4", name: "Agent推动者", range: "80–100" };
  if (score >= 60) return { code: "L3", name: "协同交付者", range: "60–79" };
  if (score >= 40) return { code: "L2", name: "任务表达者", range: "40–59" };
  return { code: "L1", name: "AI体验者", range: "0–39" };
};

const LEVELS = [
  { code: "L1", name: "AI体验者", range: "0–39" },
  { code: "L2", name: "任务表达者", range: "40–59" },
  { code: "L3", name: "协同交付者", range: "60–79" },
  { code: "L4", name: "Agent推动者", range: "80–100" },
];

function nextLevel(level) {
  const index = LEVELS.findIndex((item) => item.code === level.code);
  return LEVELS[Math.min(LEVELS.length - 1, index + 1)];
}

export function normalizeAnswerIds(answers) {
  if (!Array.isArray(answers)) return [];
  return [...new Set(answers.flatMap((value) => Array.isArray(value) ? value : [value]).filter(Boolean))];
}

function selectedOptions(question, selectedIds) {
  return question.options.filter((option) => selectedIds.includes(option.id));
}

function scoreQuestion(question, selectedIds) {
  const selected = selectedOptions(question, selectedIds);
  if (!selected.length) return 0;
  if (question.kind !== "multi") return Number(selected[0].score) || 0;

  if (question.strategy === "task-breadth") {
    return Math.min(3, selected.length * 0.5);
  }
  if (question.strategy === "tool-depth") {
    const highest = Math.max(...selected.map((option) => Number(option.score) || 0));
    const families = new Set(selected.map((option) => option.family));
    return Math.min(3, highest + Math.min(0.4, Math.max(0, families.size - 1) * 0.1));
  }
  return Math.max(...selected.map((option) => Number(option.score) || 0));
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

function percent(value) {
  return Math.round((value / 3) * 100);
}

function rubricPercent(rubric, key) {
  const value = Math.min(3, Math.max(0, Number(rubric?.[key]) || 0));
  return percent(value);
}

function projectResult(selectedIds) {
  const bonuses = {
    "f-q5-website-live": 3,
    "f-q5-knowledge-active": 3,
    "f-q5-automation-live": 4,
  };
  const projectBonus = Math.min(8, Object.entries(bonuses)
    .filter(([id]) => selectedIds.includes(id))
    .reduce((sum, [, value]) => sum + value, 0));
  const miniCore = selectedIds.includes("f-q5-mini-core");
  const miniLive = selectedIds.includes("f-q5-mini-live");
  return { projectBonus, miniCore, miniLive, eligible: miniCore && miniLive };
}

export function scoreStyle(answers, questionList = questions) {
  const selectedIds = normalizeAnswerIds(answers);
  const totals = { explorationExecution: 0, assignCocreate: 0, fastVerify: 0 };
  const poles = {
    explorationExecution: ["E", "D"],
    assignCocreate: ["A", "C"],
    fastVerify: ["F", "V"],
  };

  for (const question of questionList.filter((item) => item.kind === "style")) {
    const option = question.options.find((item) => selectedIds.includes(item.id));
    if (!option) continue;
    totals[question.axis] += option.pole === poles[question.axis][0] ? question.weight : -question.weight;
  }

  const chars = Object.entries(totals).map(([axis, value]) => poles[axis][value > 0 ? 0 : 1]);
  const confidence = Object.fromEntries(
    Object.entries(totals).map(([axis, value]) => [axis, Math.abs(value) === 3 ? "明显" : "轻微"]),
  );
  const code = chars.join("");
  const profile = styleProfiles[code] || styleProfiles.DCV;
  const axisDetails = [
    { axis: "explorationExecution", label: "探索 / 执行", pole: chars[0], tendency: chars[0] === "E" ? "探索" : "执行", strength: confidence.explorationExecution },
    { axis: "assignCocreate", label: "委派 / 共创", pole: chars[1], tendency: chars[1] === "A" ? "委派" : "共创", strength: confidence.assignCocreate },
    { axis: "fastVerify", label: "敏捷 / 审慎", pole: chars[2], tendency: chars[2] === "F" ? "敏捷" : "审慎", strength: confidence.fastVerify },
  ];
  return { code, ...profile, confidence, axes: totals, axisDetails };
}

export function scoreAssessment(answers, rubric, questionList = questions) {
  const selectedIds = normalizeAnswerIds(answers);
  const scoredQuestions = questionList.filter((question) => ["foundation", "application", "business"].includes(question.section));
  const questionScores = new Map(scoredQuestions.map((question) => [question.id, scoreQuestion(question, selectedIds)]));
  const sectionScore = (section) => percent(average(
    scoredQuestions.filter((question) => question.section === section).map((question) => questionScores.get(question.id) || 0),
  ));
  const sectionScores = {
    foundation: sectionScore("foundation"),
    application: sectionScore("application"),
    business: sectionScore("business"),
  };
  const choiceScore = Math.round(
    sectionScores.foundation * 0.30 + sectionScores.application * 0.45 + sectionScores.business * 0.25,
  );

  const open = Object.fromEntries(
    ["audience", "purpose", "inputs", "process", "output", "constraints", "acceptance"]
      .map((key) => [key, rubricPercent(rubric, key)]),
  );
  const openScore = Math.round(average(Object.values(open)));
  const rawTotalScore = Math.round(choiceScore * 0.60 + openScore * 0.40);
  const project = projectResult(selectedIds);
  const totalScore = Math.min(100, rawTotalScore + project.projectBonus);
  const baseLevel = levelForScore(totalScore);
  const level = project.eligible ? nextLevel(baseLevel) : baseLevel;

  const choiceDimensions = Object.fromEntries(dimensions.map((dimension) => {
    const values = scoredQuestions
      .filter((question) => question.dimension === dimension.id)
      .map((question) => questionScores.get(question.id) || 0);
    return [dimension.id, percent(average(values))];
  }));
  const dimensionsResult = {
    scene: Math.round(choiceDimensions.scene * 0.7 + average([open.audience, open.purpose]) * 0.3),
    task: Math.round(choiceDimensions.task * 0.5 + average([open.audience, open.purpose, open.output]) * 0.5),
    data: Math.round(choiceDimensions.data * 0.6 + open.inputs * 0.4),
    collaboration: Math.round(choiceDimensions.collaboration * 0.6 + open.process * 0.4),
    verification: Math.round(choiceDimensions.verification * 0.7 + average([open.constraints, open.acceptance]) * 0.3),
    agent: choiceDimensions.agent,
  };

  return {
    choiceScore,
    openScore,
    rawTotalScore,
    projectBonus: project.projectBonus,
    totalScore,
    projectUpgrade: {
      applied: project.eligible && baseLevel.code !== "L4",
      eligible: project.eligible,
      levels: project.eligible && baseLevel.code !== "L4" ? 1 : 0,
      miniCore: project.miniCore,
      miniLive: project.miniLive,
      baseLevelCode: baseLevel.code,
    },
    sectionScores,
    dimensions: dimensionsResult,
    level,
    style: scoreStyle(answers, questionList),
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

