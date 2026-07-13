/**
 * 题库与评分核心
 *
 * 设计原则：
 * 1. 按岗位（教师 / 课程顾问 / 班主任 / 管培生 / 教学管理）出 5 套不同场景的题
 * 2. 每套 16 道能力题（覆盖六维）+ 6 道风格题 = 22 题
 * 3. 选项设计为"真实场景的 4 种做法"，不再从粗到细递进，避免引导性
 * 4. 开放题场景也按岗位动态生成
 *
 * 六维能力：scene / task / data / collaboration / verification / agent
 * 三轴风格：explorationExecution(E/D) / assignCocreate(A/C) / fastVerify(F/V)
 */

export const ASSESSMENT_VERSION = "assessment-v2";

export const dimensions = [
  { id: "scene", label: "场景应用力", weight: 15 },
  { id: "task", label: "任务定义力", weight: 20 },
  { id: "data", label: "资料组织力", weight: 15 },
  { id: "collaboration", label: "人机协作力", weight: 15 },
  { id: "verification", label: "结果验证力", weight: 20 },
  { id: "agent", label: "Agent认知力", weight: 15 },
];

export const roles = [
  { id: "teacher", label: "教师" },
  { id: "consultant", label: "课程顾问" },
  { id: "headteacher", label: "班主任" },
  { id: "trainee", label: "管培生" },
  { id: "admin", label: "教学管理" },
];

/* ---------------------- 题库构造工具 ---------------------- */

const abilityQuestion = (id, dimension, prompt, options, scenarioTag) => ({
  id,
  kind: "ability",
  dimension,
  prompt,
  scenarioTag,
  options: options.map((text, score) => ({ id: `${id}-${score}`, text, score })),
});

const styleQuestion = (id, prompt, axis, weight, left, right, scenarioTag) => ({
  id,
  kind: "style",
  axis,
  weight,
  prompt,
  scenarioTag,
  options: [
    { id: `${id}-${left.pole.toLowerCase()}`, text: left.text, pole: left.pole },
    { id: `${id}-${right.pole.toLowerCase()}`, text: right.text, pole: right.pole },
  ],
});

/* ============================================================
 * 选项设计说明
 * 4 个选项对应 4 种真实工作场景里都合理的做法：
 *  - 0 = "自由派"（依赖个人经验、灵活、未必文档化）
 *  - 1 = "标准派"（流程化、有模板、要求明确）
 *  - 2 = "协作派"（边做边沟通、多轮迭代、强调共识）
 *  - 3 = "审慎派"（完整资料清单、来源标注、严格验收）
 *
 * 不再从 0 分到 3 分递进；分数体现"匹配岗位/任务复杂度"，
 * 而非"做法好坏"。每道题根据选项实质行为给分。
 * ============================================================ */

/* ------------------ 1) 教师套题 ------------------ */
const teacherQuestions = [
  abilityQuestion("t-q1", "scene", "用 AI 准备一节《色彩构成》新课时，你最自然的起点是？", [
    "先让 AI 列出近三年课标对本课的要求，再对照教材选定重难点",
    "直接让 AI 写一份完整教案，拿到课堂上再边用边改",
    "把往届学生作业、课件截图、本届学情丢给 AI，让它给三版风格不同的引入",
    "先在备课本上写本课 3 个核心问题，再让 AI 围绕这 3 个问题找案例和练习",
  ], "lesson-prep"),
  abilityQuestion("t-q2", "scene", "批改全班 48 份课后作业时，AI 怎么用最顺手？", [
    "让 AI 按我给的评分标准先打一个初稿，我只看标注的扣分点",
    "只把明显有代表性的 5-6 份交给 AI 看，让它总结共性错题",
    "先用 AI 分类整理全部作业的常见错题，我再针对错题写讲评",
    "AI 帮我做错题统计和分档，我亲自写每个学生的个性化评语",
  ], "grading"),
  abilityQuestion("t-q3", "task", "学校让你面向高一开一门新选修课，你打算怎样用 AI 规划？", [
    "先让 AI 出一份完整的课程纲要，我再挑能落地的部分",
    "把学校的培养目标、可排课时数、对接的大学专业发给 AI，让它给一版完整方案",
    "我和 AI 反复讨论课程目标、学生基础、评价方式，三四轮后定下版本",
    "整理学校文件、本届学生画像、家长期待清单，标注来源后再让 AI 设计",
  ], "course-design"),
  abilityQuestion("t-q4", "task", "学生向你求助：AI 帮他写的作文被老师质疑不像他写的。你建议他？", [
    "把 AI 当草稿，自己重写一遍后交上去",
    "让 AI 改到他看不出 AI 痕迹为止，他再背下来",
    "和 AI 一起头脑风暴找角度，由他亲自写每一段，AI 只帮他检查语法和逻辑",
    "让他把作文评判标准、自己的写作习惯、对题目的理解整理好再让 AI 协助，AI 输出的每段都注明是参考还是引用",
  ], "academic-honesty"),
  abilityQuestion("t-q5", "data", "学校收集了 5 年学生成绩和升学结果数据，你想用 AI 分析学情。你会？", [
    "把全表丢给 AI，让它自己找规律",
    "只挑我这学期任教班级的数据请 AI 分析",
    "先脱敏、标注数据来源和采集年份，再分批给 AI 找教学相关规律",
    "按学年度、班级、学科拆分整理成多份带说明的子表，AI 每份输出都必须标注引用了哪几行",
  ], "data-governance"),
  abilityQuestion("t-q6", "data", "AI 总结说\"近三年美术班升学率明显提升\"，但你记得中间有政策变化。你会？", [
    "AI 应该没错，可能是我记混了",
    "用 AI 总结的那句话作为参考资料",
    "让 AI 指出具体是哪三年、哪些班级、提升了几个百分点",
    "回到原始数据，按政策变化前后分段重算，并标注不同年份的可比性",
  ], "fact-check"),
  abilityQuestion("t-q7", "collaboration", "AI 写出的教案和学生实际水平差距很大，你通常会？", [
    "清空对话，重写提示词让 AI 再来一次",
    "直接告诉 AI \"不符合学情，重新写\"，直到它写对",
    "列出 3-5 条具体问题（哪些环节超纲、哪类学生跟不上），让 AI 按条修改",
    "对照学情表、课程标准、教学目标逐项打分给 AI 看，分轮改并保留版本对比",
  ], "iterative-edit"),
  abilityQuestion("t-q8", "verification", "AI 帮你设计了一份单元测试卷，你会如何验收？", [
    "看一遍题目顺不顺，能用就发",
    "只检查答案对不对",
    "挑几道重点题和同事讨论一下",
    "对照课标考点、题量、难度梯度、近三年真题出题方向做核对，对争议题标注理由",
  ], "review-test"),
  abilityQuestion("t-q9", "verification", "你在学生作业里发现 AI 写了\"达·芬奇是文艺复兴后期代表人物\"，其实应该是盛期。你会？", [
    "改掉这一句就行",
    "把这一段重写",
    "让 AI 给出这句话的出处",
    "标记这是事实性错误，限定 AI 必须依据指定资料作答，修正后让 AI 列出还有没有同类问题",
  ], "fact-discipline"),
  abilityQuestion("t-q10", "agent", "学校希望引入 AI 助教帮你备课、改作业。你认为 AI 助教最合理的角色是？", [
    "比搜索引擎聪明的工具，可以直接用它生成最终材料",
    "能自动出题改卷，我负责最后看一眼",
    "能读我的课件和资料、调用工具，按我的指令出草稿",
    "在我明确任务、上下文、可用资料、禁区、交付标准后分步推进，AI 给的每一步我都能拒绝和修订",
  ], "agent-understanding"),
  abilityQuestion("t-q11", "scene", "学生请你推荐一个 AI 工具做日常作业辅助，你通常？", [
    "把市面上 3-4 个主流工具都介绍给他，让他自己选",
    "推荐我用过觉得靠谱的那一个",
    "和他聊聊他常用什么工具、做什么作业、家长怎么管，再给建议",
    "整理一份对照表：每个工具的能力、隐私政策、是否留痕、家长能否看到，按他情况给推荐",
  ], "tool-recommend"),
  abilityQuestion("t-q12", "data", "教研组要做一份\"AI 在课堂的使用规范\"，你贡献的部分会？", [
    "从我自己班的尝试里总结",
    "在网上找几篇别人的规范改一改",
    "和组里老师开一次讨论会，再让 AI 帮整理",
    "收集组里各班的真实使用案例、家长反馈、学生问题，按学段分类后让 AI 整理规范初稿",
  ], "policy-coauthor"),
  abilityQuestion("t-q13", "task", "家长会要讲 30 分钟\"AI 时代孩子的能力培养\"，你准备怎么写讲稿？", [
    "直接让 AI 写一稿，我念完就行",
    "先列几个我特别想讲的观点，让 AI 串成稿",
    "和 AI 一起头脑风暴开场案例和互动设计，再让 AI 写完整讲稿",
    "先定 3 个核心信息、目标家长画像、不能讲的禁区，再让 AI 围绕这几点写并提供数据来源",
  ], "parent-talk"),
  abilityQuestion("t-q14", "collaboration", "AI 帮你做的课件里，案例和学校所在城市完全不相关。你会？", [
    "把不相关的案例删了",
    "让 AI 全部换成我所在城市的案例",
    "让 AI 改 3-5 个最显眼的案例",
    "把城市特征、学校特色、可引用资源整理好，让 AI 按学校实际重写并保留可复用模板",
  ], "localize"),
  abilityQuestion("t-q15", "verification", "AI 给你一份学生作文评分（5 分制），分数集中在 4-4.5 分，分布很集中。你会？", [
    "分数都差不多，应该没问题",
    "整体看一下分数，挑几份复评",
    "让 AI 把评分依据列出来",
    "要求 AI 同时输出每篇的扣分点、亮点和总评，并和我自己的评分盲样比对，标记 5 分以上差距的篇目",
  ], "grade-distribution"),
  abilityQuestion("t-q16", "agent", "学校想试一个\"AI 自动出月考卷\"的 Agent。你最担心？", [
    "会不会出太简单的题",
    "学生会不会直接抄答案",
    "AI 能不能真的减少我的工作量",
    "它的题目范围、难度梯度、答案唯一性、错题溯源是否符合我们月考的目的",
  ], "agent-trust"),

  styleQuestion("t-q17", "接触一门新学科的 AI 工具时，你更自然的做法是？", "explorationExecution", 2, { pole: "E", text: "先拿几个班级试不同用法，看哪种最受欢迎" }, { pole: "D", text: "先看官方教程和别人的使用案例，再定一个最稳的方案" }, "style-newtool"),
  styleQuestion("t-q18", "AI 给你 3 套课件风格让你选，你更倾向？", "explorationExecution", 1, { pole: "E", text: "3 套都让 AI 各自发展一版再比较" }, { pole: "D", text: "选一版最接近我风格的，让 AI 继续完善" }, "style-choose"),
  styleQuestion("t-q19", "你希望 AI 帮你写教学设计的方式是？", "assignCocreate", 2, { pole: "A", text: "我写完大纲后给 AI 完整指令，让它一版出完" }, { pole: "C", text: "我和 AI 边讨论边改，每个环节都过一下" }, "style-mode"),
  styleQuestion("t-q20", "AI 写出的第一版教学设计和你预期差距较大时，你更习惯？", "assignCocreate", 1, { pole: "A", text: "一次性把要改的点列清楚，让 AI 重写" }, { pole: "C", text: "先讨论哪些是关键问题，再决定怎么改" }, "style-fix"),
  styleQuestion("t-q21", "AI 帮你做出一份可用的课件后，你更倾向？", "fastVerify", 2, { pole: "F", text: "先在下一节课小范围用，根据学生反应再改" }, { pole: "V", text: "先和教研组讨论通过，再进课堂" }, "style-validate"),
  styleQuestion("t-q22", "学校引入一个新的 AI 平台时，你更可能？", "fastVerify", 1, { pole: "F", text: "马上拿一个班试用一周，看效果" }, { pole: "V", text: "先看隐私协议、数据归属、学生使用条款再决定" }, "style-rollout"),
];

/* ------------------ 2) 课程顾问套题 ------------------ */
const consultantQuestions = [
  abilityQuestion("c-q1", "scene", "一位高二家长来咨询，孩子成绩中等、对美术有兴趣。你最自然的做法是？", [
    "直接给家长讲我们学校的优势和升学数据",
    "用 AI 整理这份孩子情况对应的\"典型成功路径\"，再针对性讲",
    "和 AI 模拟一遍咨询对话，找出家长最关心的问题，再针对性回应",
    "整理这位家长提到的信息（孩子成绩、兴趣点、家庭期待），让 AI 给出咨询要点和需补问的问题清单",
  ], "consult-parent"),
  abilityQuestion("c-q2", "scene", "一个月内要跟 30 位家长沟通，每个人的关注点不同。你会？", [
    "用 AI 给每位家长生成一份专属沟通话术",
    "只对其中最可能签单的 5 位做个性化沟通",
    "先让 AI 按家长画像分 3-4 类，每类给一套话术模板，我再针对个人调整",
    "把 30 位家长的画像、跟进阶段、关键疑虑整理成表，让 AI 按表给出下一步沟通重点和禁忌",
  ], "consult-batch"),
  abilityQuestion("c-q3", "task", "校长让你做一份《2027 届招生方案》，你打算怎么用 AI？", [
    "让 AI 直接出一份完整方案",
    "我列要点，AI 帮我串成完整文档",
    "先和 AI 头脑风暴定位、卖点、节奏，再让 AI 写初稿",
    "把去年方案、今年政策变化、目标家庭画像、预算、可用渠道整理好，标注每项数据来源，让 AI 出方案并保留可调参数",
  ], "admission-plan"),
  abilityQuestion("c-q4", "task", "家长反复问\"你们和某机构的区别\"，AI 帮你准备的话术哪条更合适？", [
    "强调我们师资强，机构是流水线",
    "列出我们和对方 5 个维度的对比",
    "让 AI 整理家长最常见的 10 个对比问题，给到话术和案例",
    "整理我们和对方在课程、师资、价格、服务上的可核验事实，让 AI 生成既不贬低对方又能凸显差异的话术，并标注每条事实来源",
  ], "objection"),
  abilityQuestion("c-q5", "data", "你需要给家长发一份《学员成长手册》PDF，资料零散。你会？", [
    "把记得的要点给 AI，让它写",
    "用 AI 在网上找类似模板再改",
    "把往届家长最关心的 10 个问题给 AI，让它生成对应章节",
    "整理我校课程表、师资介绍、典型学员故事、家长常见问答、签约流程，标注资料日期和适用范围后再交给 AI",
  ], "manual-write"),
  abilityQuestion("c-q6", "data", "AI 总结\"近三年家长满意度 95%\"，但你记得去年有过一次投诉风波。你会？", [
    "95% 应该是总体情况，没问题",
    "把 95% 改成 90% 比较稳",
    "让 AI 解释这个 95% 是怎么算出来的",
    "回到原始问卷，标注那次投诉和后续改进，让 AI 重新统计可对外引用的数据并说明统计口径",
  ], "fact-claim"),
  abilityQuestion("c-q7", "collaboration", "AI 写出的招生话术家长听了觉得\"太硬\"，你会？", [
    "重写一版更软的话术",
    "让 AI 把\"硬词\"换成\"软词\"",
    "给 AI 几条具体家长反馈让它改",
    "整理家长原话反馈、咨询目标、我们底线话术，让 AI 按场景重写并保留可复用句式",
  ], "revise-tone"),
  abilityQuestion("c-q8", "verification", "AI 帮你做了一份家长咨询前的\"话术包\"。你会如何验收？", [
    "看一遍顺口就行",
    "挑最常用的 3 句背下来",
    "用其中 2-3 句和同事演练一次",
    "对照咨询目标、家长常见异议、品牌口径、合规要求逐条核对，对未提供数据的部分标注\"待补\"",
  ], "verify-scripts"),
  abilityQuestion("c-q9", "verification", "AI 在朋友圈文案里写\"我们学校是杭州唯一通过 X 认证的\"，你不确定。你会？", [
    "应该没问题，先发",
    "把\"唯一\"改成\"首批\"",
    "问 AI 这个认证的全称和颁布机构",
    "明确 AI 不能用未经核实的\"唯一/首家/最\"等绝对化表述，要求重写并标注每个数据需要核验的来源",
  ], "fact-rule"),
  abilityQuestion("c-q10", "agent", "市场部想上一个 AI 咨询助手挂官微。你认为最合理的角色是？", [
    "24 小时在线答疑的客服",
    "能主动加家长微信的 AI",
    "能读学校资料库并按家长提问给出准确回答",
    "能读学校资料库、政策文件、合规话术，按家长画像给出初稿建议，关键决策（签约、价格让步）必须由人完成",
  ], "agent-role"),
  abilityQuestion("c-q11", "scene", "周末开放日有 50 组家庭来咨询。AI 能帮你做什么最有效？", [
    "给每组家庭生成欢迎词",
    "现场帮家长查学校信息",
    "帮我先按家长背景分批匹配最合适的咨询师和讲解重点",
    "把提前收集的 50 组家庭画像整理成表，给每组生成咨询目标、可能问题、推荐参观路线，咨询师据此准备",
  ], "open-day"),
  abilityQuestion("c-q12", "data", "你想用 AI 分析\"为什么这个月签单率下降\"，你会？", [
    "把这个月数据给 AI 让它分析",
    "让 AI 列出常见原因再对照",
    "我和 AI 一边讨论一边找原因",
    "整理这个月跟进记录、家长反馈、竞品动作、政策变化，标注数据来源和时间，让 AI 按数据出假设并标注每条需要的验证方式",
  ], "data-analysis"),
  abilityQuestion("c-q13", "task", "一份给家长看的《高中三年学习规划》PDF，AI 帮你怎么做？", [
    "让 AI 写一版完整的",
    "我列每个年级的关键词，AI 串起来",
    "让 AI 找 5 份同类规划做参考，我挑一种改",
    "整理我校课程节奏、各年级关键节点、家长可参与的事项、可提供的资源，标注每项数据来源后让 AI 写并保留可调整章节",
  ], "plan-write"),
  abilityQuestion("c-q14", "collaboration", "AI 写出的规划里\"高一\"部分和我们实际课程不匹配。你会？", [
    "把高一整段删掉",
    "让 AI 重新生成高一",
    "给 AI 几条我们高一的实际安排让它改",
    "整理高一的实际课程表、关键节点、家长角色，让 AI 按事实重写并标注哪些是我们独有、哪些是行业通用",
  ], "align-facts"),
  abilityQuestion("c-q15", "verification", "AI 帮你写的 10 条朋友圈文案，哪条适合发你会？", [
    "看起来都不重复就轮着发",
    "挑数据最多的那条",
    "挑最符合学校调性的那条",
    "对照学校调性、合规要求、家长关注点逐条打分，对使用未经核实数据或绝对化表述的标注为\"不可发\"",
  ], "verify-copy"),
  abilityQuestion("c-q16", "agent", "AI 助手能在你没上班时自动回复家长咨询。你最担心？", [
    "会不会答错",
    "家长会不会发现是 AI",
    "能不能比人工回答得快",
    "它的回答口径、紧急情况识别、关键问题转人工的规则、家长隐私保护是否到位",
  ], "agent-risk"),

  styleQuestion("c-q17", "面对一个挑剔型家长，你更自然的第一步是？", "explorationExecution", 2, { pole: "E", text: "先多角度了解他到底在担心什么" }, { pole: "D", text: "先明确他是否在我们目标家庭画像内，再决定投入程度" }, "style-difficult"),
  styleQuestion("c-q18", "AI 给你三版招生方案，你倾向？", "explorationExecution", 1, { pole: "E", text: "三版各自发展一版，详细比较" }, { pole: "D", text: "选最稳的一版直接落地" }, "style-plan"),
  styleQuestion("c-q19", "你希望 AI 帮你准备咨询的方式？", "assignCocreate", 2, { pole: "A", text: "我提供完整家长信息，AI 一次性给全套话术" }, { pole: "C", text: "我和 AI 边准备边演练，过程里调优" }, "style-prep"),
  styleQuestion("c-q20", "AI 话术和家长实际反馈差距大时，你更习惯？", "assignCocreate", 1, { pole: "A", text: "整理反馈清单一次性给 AI 重写" }, { pole: "C", text: "和 AI 讨论哪些是偶发、哪些是共性问题再决定" }, "style-feedback"),
  styleQuestion("c-q21", "AI 帮你做完一份家长会讲稿后，你更倾向？", "fastVerify", 2, { pole: "F", text: "先在一次小型家长会试讲，看反应再优化" }, { pole: "V", text: "先在校内对家长代表演练通过再正式讲" }, "style-rehearse"),
  styleQuestion("c-q22", "你试用一个新的 AI 销售工具时，更可能？", "fastVerify", 1, { pole: "F", text: "马上拿来跟 1-2 个家长沟通看效果" }, { pole: "V", text: "先了解数据归属、家长隐私和销售合规再决定" }, "style-toolnew"),
];

/* ------------------ 3) 班主任套题 ------------------ */
const headteacherQuestions = [
  abilityQuestion("h-q1", "scene", "新生入学第一周，你要和家长建立联系。AI 怎么用最自然？", [
    "用 AI 写一封统一的开学报到通知",
    "用 AI 帮我想一些开场话题",
    "让 AI 按不同家庭类型准备几版通知，我挑改",
    "整理家长信息表（孩子来源、是否寄宿、特殊需求），让 AI 帮生成有针对性的开学沟通要点清单",
  ], "class-new"),
  abilityQuestion("h-q2", "scene", "班里最近有 3 个学生情绪波动较大，你最自然的做法是？", [
    "找 AI 学一些应对话术",
    "AI 帮我整理一下最近班级发生了什么大事",
    "我口述每个学生最近表现，AI 帮我列观察清单",
    "整理这 3 个学生近 1 个月考勤、作业、互动、社交记录，标注信息来源（自己/科任/家长），让 AI 给观察角度和谈话建议",
  ], "student-care"),
  abilityQuestion("h-q3", "task", "学校让你做一份《班级文化建设方案》，你打算怎么用 AI？", [
    "直接让 AI 写一版完整方案",
    "我把班级情况口述一下，AI 帮我润色",
    "我先定主题，AI 帮我展开活动和视觉",
    "整理班级人数、男女比、特长分布、家委会资源、年度活动预算，让 AI 出多版方案并标注可复用 vs 需新设计的部分",
  ], "class-culture"),
  abilityQuestion("h-q4", "task", "家长对孩子升学方向有分歧（爸想走文化课，妈想走艺考），你来调解。你会？", [
    "按学校政策给家长讲一遍",
    "让 AI 帮我说服其中一方",
    "让 AI 整理两种方向的利弊清单",
    "把两个方向的近年数据、就业情况、我校实际案例整理好，标注信息来源，让 AI 帮我做一份双方都能听的中立材料",
  ], "conflict-mediation"),
  abilityQuestion("h-q5", "data", "学校要求每周提交一份《班级周报》，你怎么用 AI？", [
    "让 AI 直接按上周情况写",
    "我口述重点，AI 帮我组织语言",
    "我和 AI 一起列周报框架，再让 AI 写",
    "整理本周考勤、作业、课堂表现、家校沟通记录、待解决问题，标注信息来源后让 AI 写并保留可填充模板",
  ], "weekly-report"),
  abilityQuestion("h-q6", "data", "AI 写\"这周班级整体表现良好\"，但你记得有 2 次较大冲突。你会？", [
    "整体良好没问题，细节略过",
    "在周报里加一句\"偶有摩擦\"",
    "让 AI 把\"良好\"改得准确些",
    "让 AI 重写\"良好\"的具体含义：基于哪些数据、忽略哪些例外、未提的两起冲突是否需要补充并说明原因",
  ], "honest-report"),
  abilityQuestion("h-q7", "collaboration", "AI 写出的家校沟通话术家长看了觉得\"机械\"，你会？", [
    "重写一版更口语的",
    "让 AI 全部改成口语",
    "给 AI 几条家长原话让它改",
    "整理这个家长的原话、孩子实际表现、我校既往沟通风格，让 AI 按场景重写并保留可复用句式",
  ], "rewrite-warm"),
  abilityQuestion("h-q8", "verification", "AI 帮你做了一份《学生综合素质评价》。你会如何验收？", [
    "看一遍通顺就行",
    "只检查分数有没有错",
    "挑两个学生和任课老师对一下",
    "对照评价维度、本学期事实记录、班主任观察，对每条评价都标注依据来源，对\"待补充\"项明确截止时间",
  ], "verify-eval"),
  abilityQuestion("h-q9", "verification", "AI 在学生评语里写了\"该生学习态度端正\"，但其实他这学期经常迟到。你会？", [
    "把这句话删了",
    "让 AI 重写这一段",
    "让 AI 把这句话改具体一些",
    "明确 AI 必须基于本学期事实记录写评语，修正该条并让 AI 列出还有哪些类似的套话需要替换",
  ], "rewrite-vague"),
  abilityQuestion("h-q10", "agent", "学校想给班主任配一个 AI 助手处理日常杂事。你最希望它能？", [
    "帮我回家长微信",
    "帮我写周报和总结",
    "能读学校资料和学生档案，按我指令整理信息",
    "能读班级资料、学生档案、政策文件，按我指令整理信息和起草草稿，但涉及学生评价、家长敏感沟通必须由我确认",
  ], "agent-help"),
  abilityQuestion("h-q11", "scene", "家长会前 30 分钟临时取消，AI 能帮你做什么最有效？", [
    "帮我想个开场",
    "帮我把材料改成一封信",
    "和 AI 演练一遍家长可能问的问题",
    "整理原计划要点、最近家长关心的问题、必须告知的信息，AI 帮我把家长会改成 10 分钟通知 + 一封信，标注哪些信息必读",
  ], "last-minute"),
  abilityQuestion("h-q12", "data", "你怀疑班里学生最近\"作业抄袭率上升\"，AI 帮你怎么分析？", [
    "让 AI 直接分析作业数据",
    "让 AI 列出可能原因",
    "我和 AI 一边聊一边找原因",
    "整理近 1 个月作业提交记录、查重结果、个别学生访谈记录，标注信息来源，让 AI 出假设并标注每条需要的验证方式",
  ], "data-find"),
  abilityQuestion("h-q13", "task", "班里有学生被校园欺凌，你要出一份处理方案。AI 帮你怎么用？", [
    "让 AI 写一版处理方案",
    "我把情况说给 AI 让它给建议",
    "和 AI 头脑风暴各种处理方式",
    "整理事件经过、涉及学生、家长态度、学校政策、心理老师意见，标注信息来源和敏感信息脱敏状态后让 AI 出方案",
  ], "bully-handle"),
  abilityQuestion("h-q14", "collaboration", "AI 给的处理建议和你校实际处分条例不一致。你会？", [
    "按 AI 建议办",
    "完全按学校条例来",
    "让 AI 把建议改成符合学校条例的",
    "整理学校条例原文和本次事件具体情况，让 AI 按条例重写并标注哪些是条例硬性要求、哪些是建议空间",
  ], "policy-align"),
  abilityQuestion("h-q15", "verification", "AI 帮你写的 5 份学生谈话记录，你会怎么检查？", [
    "看一遍通顺就行",
    "只看老师评价部分",
    "挑和 AI 关系最熟的学生那份详细看",
    "对照每次谈话的时间、地点、对象、议题、承诺事项逐条核对，对\"待跟进\"项明确时间节点",
  ], "verify-talk"),
  abilityQuestion("h-q16", "agent", "你担心 AI 助手在学生评价里\"过度美言\"。你最看重？", [
    "AI 文采好",
    "AI 出稿快",
    "AI 能找到所有相关事实",
    "AI 的每条评价都有事实依据、未提供依据的部分明确标注，对敏感词有提醒",
  ], "agent-honest"),

  styleQuestion("h-q17", "面对一个突然来告状的家长，你更自然的第一步是？", "explorationExecution", 2, { pole: "E", text: "先让家长说完整件事，过程中找关键" }, { pole: "D", text: "先明确这件事的紧急程度和影响范围，再决定怎么处理" }, "style-parent"),
  styleQuestion("h-q18", "AI 给你三版学生谈话方案，你倾向？", "explorationExecution", 1, { pole: "E", text: "三版各自准备开头，对比哪个最自然" }, { pole: "D", text: "选最稳重的一版，按部就班谈" }, "style-talk"),
  styleQuestion("h-q19", "你希望 AI 帮你写班级总结的方式？", "assignCocreate", 2, { pole: "A", text: "我列要点，AI 一版写完" }, { pole: "C", text: "我和 AI 边写边讨论，哪段不满意改哪段" }, "style-summary"),
  styleQuestion("h-q20", "AI 写的总结和你想表达的有出入时，你更习惯？", "assignCocreate", 1, { pole: "A", text: "一次性把要改的地方列清楚，让 AI 重写" }, { pole: "C", text: "和 AI 讨论一下哪些是表达差异、哪些是观点差异" }, "style-edit"),
  styleQuestion("h-q21", "AI 帮你做了一份家长会讲稿后，你更倾向？", "fastVerify", 2, { pole: "F", text: "先在班里学生干部那试讲一下" }, { pole: "V", text: "先和年级组老师对一遍口径再讲" }, "style-try"),
  styleQuestion("h-q22", "你试用一个新的 AI 班主任工具时，更可能？", "fastVerify", 1, { pole: "F", text: "马上拿来处理一两件杂事看效果" }, { pole: "V", text: "先确认它处理学生数据是否符合隐私规范再决定" }, "style-tool"),
];

/* ------------------ 4) 管培生套题 ------------------ */
const traineeQuestions = [
  abilityQuestion("n-q1", "scene", "入职第 1 周，师父让你整理一份《部门工作地图》。你打算？", [
    "直接问 AI 行业通用模板",
    "用 AI 帮我想一份目录",
    "和 AI 模拟一下我可能需要了解的内容",
    "整理我这周观察到的部门会议、流程文档、人员分工，标注信息来源，让 AI 帮我梳理结构并标注待补充项",
  ], "onboard"),
  abilityQuestion("n-q2", "scene", "主管让你写一份《竞品分析》。你打算？", [
    "让 AI 写一版完整的",
    "我口述要点，AI 帮我润色",
    "我列大纲，AI 帮我扩写",
    "整理我们和竞品可公开信息、最近动作、用户评价，标注每条信息来源和日期，让 AI 写并保留可调结构",
  ], "competitive"),
  abilityQuestion("n-q3", "task", "主管让你 3 天内交一份《下季度 OKR 草案》。你怎么用 AI？", [
    "让 AI 直接生成 OKR",
    "我列想法，AI 帮我整理语言",
    "和 AI 头脑风暴 OKR 角度",
    "整理部门目标、我接手的工作、可用资源、关键风险，标注每项来源，让 AI 按 SMART 原则出草案并标注待确认项",
  ], "okr"),
  abilityQuestion("n-q4", "task", "你对主管的某个决策有疑问，但不确定该不该问。AI 帮你？", [
    "让 AI 教我怎么说",
    "让 AI 帮我分析该不该问",
    "和 AI 模拟一遍对话",
    "整理这个决策的公开信息、可能的影响、我能问的合适场合，让 AI 帮我列利弊和表达方式，但最终是否问由我决定",
  ], "ask-boss"),
  abilityQuestion("n-q5", "data", "部门要你整理一份《行业月报》。你打算？", [
    "让 AI 直接写",
    "我把记得的事件说给 AI 让它写",
    "我列事件清单，AI 帮我串成月报",
    "整理本月行业新闻、政策、竞品动作、数据来源链接和日期，让 AI 写并标注每条数据原始链接",
  ], "monthly"),
  abilityQuestion("n-q6", "data", "AI 在月报里写\"行业整体增长 20%\"，但你记得数据来源不一致。你会？", [
    "AI 应该没错，先用",
    "把 20% 改成 15% 比较稳",
    "让 AI 给出 20% 的来源",
    "回到原始数据，统一统计口径，标注不同来源的可比性，让 AI 重新给出可对外引用的数字并说明计算方式",
  ], "verify-data"),
  abilityQuestion("n-q7", "collaboration", "AI 写出的月报被主管说\"太学生气\"。你会？", [
    "全部用更\"职业\"的词重写",
    "让 AI 改得更专业",
    "给 AI 几条主管原话让它改",
    "整理主管原话、我们部门月报以往范本、目标读者，让 AI 按风格重写并保留可复用段落",
  ], "rewrite-pro"),
  abilityQuestion("n-q8", "verification", "AI 帮你做了 5 份会议纪要。你会如何验收？", [
    "看一遍通顺就行",
    "只看决议部分",
    "挑最重要的那次详细看",
    "对照会议录音或笔记核对每条决议、待办、负责人、时间节点，对模糊处标注\"待确认\"",
  ], "verify-minutes"),
  abilityQuestion("n-q9", "verification", "AI 写错了一个参会人姓名（把同名的两个部门同事搞混）。你会？", [
    "改掉这一处",
    "让 AI 全文重写",
    "给 AI 名单让它重写",
    "明确 AI 必须依据会议出席记录写，修正该条并让 AI 列出还有没有其他事实性错误",
  ], "fact-name"),
  abilityQuestion("n-q10", "agent", "公司想给新人配一个 AI 助理帮融入团队。你最希望它能？", [
    "回答公司基本问题",
    "帮我写周报和总结",
    "能读公司内部资料，按我指令整理信息",
    "能读公司资料、岗位说明、内部 Wiki，按我指令整理信息和起草草稿，但涉及保密信息和最终决策由人完成",
  ], "agent-junior"),
  abilityQuestion("n-q11", "scene", "第一次和部门同事吃饭，AI 能帮你什么？", [
    "帮我想几个聊天话题",
    "帮我想 3 个有趣的开场白",
    "AI 模拟一下饭局上可能聊什么",
    "整理部门同事的公开背景（领英/官网/近 3 个月分享），AI 帮我标注共同话题和需要避免的话题",
  ], "lunch"),
  abilityQuestion("n-q12", "data", "主管让你\"用数据看部门问题\"，你打算？", [
    "让 AI 自己找数据",
    "我口述部门情况让 AI 总结",
    "和 AI 头脑风暴可能的数据",
    "整理部门可用的数据源（业务、运营、HR、财务），标注数据可获取范围和敏感级别，让 AI 给分析角度并标注每条需要的取数方式",
  ], "data-explore"),
  abilityQuestion("n-q13", "task", "你被指派去一个跨部门项目组，第一次开会前你怎么做？", [
    "让 AI 写一份自我介绍",
    "让 AI 帮我想想问什么问题",
    "AI 帮我模拟一下会议",
    "整理项目背景、参会角色、我部门关注点、敏感信息，AI 帮我列会议目标、要提的问题、不能表态的事",
  ], "meeting-prep"),
  abilityQuestion("n-q14", "collaboration", "AI 帮你准备的会议问题被同事说\"太细\"。你会？", [
    "把太细的问题删了",
    "让 AI 全部改成宏观问题",
    "给 AI 几条同事反馈让它改",
    "整理同事原话、他们部门关注点、我们部门底线，AI 帮我按角色重写并标注哪些是必问、哪些是加分项",
  ], "align-questions"),
  abilityQuestion("n-q15", "verification", "AI 帮你写的《项目周报》，你会怎么检查？", [
    "看一遍通顺就行",
    "只看进度百分比",
    "挑和项目最相关的部分看",
    "对照本周事项清单、数据指标、风险事项、跨部门协调点逐条核对，对\"待跟进\"项明确负责人和时间",
  ], "verify-weekly"),
  abilityQuestion("n-q16", "agent", "AI 助理想自动帮你回复内部邮件。你最看重？", [
    "它能写得像我",
    "它能秒回",
    "它能读到我部门相关历史邮件",
    "它对邮件类型能分类，关键邮件（涉及承诺、决策、跨部门协调）会先停一下让人确认，普通通知自动起草不发送",
  ], "agent-mail"),

  styleQuestion("n-q17", "面对一个完全陌生的新任务，你更自然的第一步是？", "explorationExecution", 2, { pole: "E", text: "先让 AI 列几种可能的方向再选" }, { pole: "D", text: "先问清楚任务目标和验收标准再动" }, "style-newtask"),
  styleQuestion("n-q18", "AI 给你三版 OKR 草案，你倾向？", "explorationExecution", 1, { pole: "E", text: "三版各自发展一版，详细比较" }, { pole: "D", text: "选最稳的一版，按主管风格调" }, "style-okr"),
  styleQuestion("n-q19", "你希望 AI 帮你写工作文档的方式？", "assignCocreate", 2, { pole: "A", text: "我列要点，AI 一版写完，我再改" }, { pole: "C", text: "我和 AI 边讨论边写，过程里对齐" }, "style-doc"),
  styleQuestion("n-q20", "AI 写出的文档和你预期差距大时，你更习惯？", "assignCocreate", 1, { pole: "A", text: "一次性把要改的点列清楚，让 AI 重写" }, { pole: "C", text: "和 AI 讨论哪些是表达差异、哪些是认知差异" }, "style-gap"),
  styleQuestion("n-q21", "AI 帮你做出一份可用文档后，你更倾向？", "fastVerify", 2, { pole: "F", text: "先发给关系好的同事看一眼再交" }, { pole: "V", text: "先按公司格式、过往版本核对再交" }, "style-docv"),
  styleQuestion("n-q22", "公司引入新的 AI 工具时，你更可能？", "fastVerify", 1, { pole: "F", text: "马上拿来试一两个真实工作看效果" }, { pole: "V", text: "先看数据安全、内部合规再决定" }, "style-newai"),
];

/* ------------------ 5) 教学管理套题 ------------------ */
const adminQuestions = [
  abilityQuestion("a-q1", "scene", "新学期排课，40 个班 + 60 位老师的约束极多。你最自然的做法是？", [
    "让 AI 按规则自动排一版",
    "我口述约束，AI 帮我生成初稿",
    "我和 AI 头脑风暴排课策略",
    "整理硬约束（教室、课时、师训）、软约束（学生选课、教研组期望）、往年坑点，标注来源后让 AI 出多版排课并标注可调参数",
  ], "schedule"),
  abilityQuestion("a-q2", "scene", "校长让你做一份《年度教学数据白皮书》。你打算？", [
    "让 AI 直接生成",
    "我口述数据，AI 帮我写",
    "我和 AI 列白皮书框架再写",
    "整理学校一年教学、师资、生源、升学数据，标注每项来源和统计口径，让 AI 写并保留可调图表占位",
  ], "whitepaper"),
  abilityQuestion("a-q3", "task", "校长让你评估\"是否引入新校本课程\"。你打算？", [
    "让 AI 直接给结论",
    "我列倾向，AI 帮我整理",
    "和 AI 头脑风暴评估维度",
    "整理学校战略、师资匹配度、生源需求、试点数据、风险点，标注每项来源，让 AI 出评估报告并标注关键假设",
  ], "evaluate"),
  abilityQuestion("a-q4", "task", "三个学科组都报预算，你需要在 1 天内出汇总方案。AI 帮你？", [
    "把三份预算给 AI 让它合并",
    "我列合并规则，AI 帮我串",
    "和 AI 头脑风暴合并方案",
    "整理三份预算明细、共享项、冲突项、学校年度预算上限，标注来源，让 AI 出汇总并标注哪些可砍、哪些必须保",
  ], "budget"),
  abilityQuestion("a-q5", "data", "你要做一份《学生评教报告》。你打算？", [
    "让 AI 直接分析",
    "我口述印象让 AI 写",
    "我列维度，AI 帮我写",
    "整理评教原始数据（去标识）、样本量、收集方式，标注每项来源，让 AI 出报告并保留原始数据可追溯",
  ], "teaching-eval"),
  abilityQuestion("a-q6", "data", "AI 报告里说\"学生对新课改满意度 92%\"，但样本只有 30%。你会？", [
    "92% 这个数没问题",
    "把 92% 改成 80% 比较稳",
    "让 AI 解释 92% 怎么算的",
    "明确 AI 必须标注样本量、收集方式、置信度，对低样本数据明确\"仅供参考\"，重写报告",
  ], "verify-sample"),
  abilityQuestion("a-q7", "collaboration", "AI 写出的评估报告被校长说\"不够全面\"。你会？", [
    "重写更全面的版本",
    "让 AI 全部加上更多数据",
    "给 AI 几条校长原话让它改",
    "整理校长原话、过去类似报告结构、学校战略文件，让 AI 按学校语境重写并保留可复用分析框架",
  ], "rewrite-full"),
  abilityQuestion("a-q8", "verification", "AI 帮你做了 6 个学科组的发展规划。你会如何验收？", [
    "看一遍通顺就行",
    "只检查数字指标",
    "挑重点学科组详细看",
    "对照学校战略、师资现状、本学年度资源，对每项目标、措施、时间节点标注依据，对\"待确认\"项明确截止时间",
  ], "verify-plans"),
  abilityQuestion("a-q9", "verification", "AI 在学科规划里把\"升学率\"作为核心指标，但学校其实更看重\"全面发展\"。你会？", [
    "把\"升学率\"删了",
    "让 AI 全文重写指标",
    "让 AI 把核心指标改了",
    "明确 AI 必须按学校官方战略文件设指标，修正该规划并让 AI 列出还有哪些是按个人偏好而非学校战略写的",
  ], "fact-strategy"),
  abilityQuestion("a-q10", "agent", "学校想给教学管理配一个 AI 助手。你最看重？", [
    "能帮我查数据",
    "能帮我写文档",
    "能读学校资料库，按我指令整理信息",
    "能读学校资料库、政策文件、内部流程，按我指令整理信息和起草草稿，对涉及决策、评估、家长沟通的内容必须人确认",
  ], "agent-admin"),
  abilityQuestion("a-q11", "scene", "开学前一周 5 项紧急任务同时来。AI 帮你？", [
    "帮我想优先级",
    "帮我把任务列表列一下",
    "帮我把每项任务的步骤列出来",
    "整理 5 项任务的截止时间、依赖关系、可分派人手、关键产出，AI 帮我排优先级和并行方案",
  ], "multi-task"),
  abilityQuestion("a-q12", "data", "你想用 AI 分析\"为什么本学期投诉增加\"。你打算？", [
    "把投诉记录给 AI 让它分析",
    "我口述印象让 AI 写",
    "和 AI 头脑风暴可能原因",
    "整理本学期投诉记录、处理结果、时间分布、对应政策变化，标注来源，AI 出假设并标注每条需要的验证方式",
  ], "data-reason"),
  abilityQuestion("a-q13", "task", "你负责新教师培训方案设计。AI 帮你？", [
    "让 AI 直接出方案",
    "我列目标，AI 帮我写",
    "和 AI 头脑风暴方案",
    "整理学校培训目标、新教师实际需求、可用资源、过往培训反馈，标注来源，让 AI 出多版方案并标注预算和时间投入",
  ], "training"),
  abilityQuestion("a-q14", "collaboration", "AI 出的培训方案和教务处现有安排冲突。你会？", [
    "把冲突部分删了",
    "让 AI 按教务处安排重写",
    "给 AI 几条教务处安排让它改",
    "整理教务处冲突事项的真实原因、可调整空间、必须遵守的硬约束，让 AI 按真实约束重写并标注哪些是协商项",
  ], "conflict-align"),
  abilityQuestion("a-q15", "verification", "AI 帮你出的 10 份工作总结，你会怎么检查？", [
    "看一遍通顺就行",
    "只看数字指标",
    "挑重要岗位那份详细看",
    "对照每份工作职责、年初目标、本年度关键事件逐条核对，对未提供数据或夸张表述标注\"待补\"或\"待修\"",
  ], "verify-summaries"),
  abilityQuestion("a-q16", "agent", "AI 助手要进校级数据看板。你最看重？", [
    "数据全",
    "数据快",
    "能按角色看到不同数据",
    "数据权限分级清晰，敏感数据有脱敏，决策建议必须可追溯到原始数据和责任人",
  ], "agent-dashboard"),

  styleQuestion("a-q17", "面对上级布置的模糊任务，你更自然的第一步是？", "explorationExecution", 2, { pole: "E", text: "先多角度收集信息再定方向" }, { pole: "D", text: "先确认任务边界和验收标准再启动" }, "style-vague"),
  styleQuestion("a-q18", "AI 给你三版学校方案，你倾向？", "explorationExecution", 1, { pole: "E", text: "三版各自发展一版再比较" }, { pole: "D", text: "选最稳的一版，按学校惯例调" }, "style-school"),
  styleQuestion("a-q19", "你希望 AI 帮你写规划文档的方式？", "assignCocreate", 2, { pole: "A", text: "我列要点，AI 一版写完" }, { pole: "C", text: "我和 AI 边写边对齐" }, "style-plan-mode"),
  styleQuestion("a-q20", "AI 写的方案和你预期差距大时，你更习惯？", "assignCocreate", 1, { pole: "A", text: "一次性把要改的点列清楚，让 AI 重写" }, { pole: "C", text: "和 AI 讨论哪些是表达差异、哪些是认知差异" }, "style-plan-fix"),
  styleQuestion("a-q21", "AI 帮你做出一份规划后，你更倾向？", "fastVerify", 2, { pole: "F", text: "先在小范围试点，再决定是否全校推" }, { pole: "V", text: "先经过多方评审通过再落地" }, "style-validate"),
  styleQuestion("a-q22", "学校引入新 AI 系统时，你更可能？", "fastVerify", 1, { pole: "F", text: "马上挑一个部门试运行看效果" }, { pole: "V", text: "先看数据安全、合规、家长沟通影响再决定" }, "style-newsystem"),
];

/* ------------------ 开放题场景：按岗位生成 ------------------ */
export const OPEN_PROMPTS = {
  teacher: "请写一段你会直接交给 AI 的提示词，用来准备本学期一节公开课：课题自拟（如《色彩构成》《速写基础》），上课时间 45 分钟，听课对象是同组教师 + 教学主任，请把他们的关注点也写进提示词。",
  consultant: "请写一段你会直接交给 AI 的提示词，用来准备一次家长咨询后的跟进沟通：家长是第一次来咨询的高一家长，孩子成绩中等、对美术有兴趣、家庭对艺考费用有顾虑。",
  headteacher: "请写一段你会直接交给 AI 的提示词，用来准备一次家长会开场发言：班级新高一，30 位家长到场，10 分钟发言，请把班级管理、家校配合、新高考变化都覆盖到。",
  trainee: "请写一段你会直接交给 AI 的提示词，用来准备入职第一个月的个人总结：直属主管 + 部门负责人 + HR 都看，请把工作成果、学习成长、未来规划都写清楚。",
  admin: "请写一段你会直接交给 AI 的提示词，用来写一份《下学期教研组调整建议》：校长 + 教务主任 + 各教研组长都会看到，请把现状、问题、调整方案、风险都覆盖到。",
};

export function getOpenPromptForRole(role) {
  return OPEN_PROMPTS[role] || OPEN_PROMPTS.teacher;
}

/* ------------------ 岗位 → 题库 映射 ------------------ */

const QUESTION_BANK = {
  teacher: teacherQuestions,
  consultant: consultantQuestions,
  headteacher: headteacherQuestions,
  trainee: traineeQuestions,
  admin: adminQuestions,
};

export function getQuestionsForRole(role) {
  return QUESTION_BANK[role] || teacherQuestions;
}

/* ------------------ 通用导出（兼容旧逻辑） ------------------ */

// 默认导出：教师套题。AssessmentApp 会通过 getQuestionsForRole 重新获取
export const questions = teacherQuestions;

/* ------------------ 风格档案（与原版一致） ------------------ */

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

export const levelForScore = (score) => {
  if (score >= 80) return { code: "L4", name: "Agent推动者", range: "80–100" };
  if (score >= 60) return { code: "L3", name: "协同交付者", range: "60–79" };
  if (score >= 40) return { code: "L2", name: "任务表达者", range: "40–59" };
  return { code: "L1", name: "AI体验者", range: "0–39" };
};

export function scoreStyle(selectedIds, questionList) {
  const items = questionList || questions;
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

  for (const question of items.filter((item) => item.kind === "style")) {
    const option = question.options.find((item) => selectedIds.includes(item.id));
    if (!option) continue;
    totals[question.axis] += option.pole === poles[question.axis][0] ? question.weight : -question.weight;
  }

  const chars = Object.entries(totals).map(([axis, value]) => poles[axis][value > 0 ? 0 : 1]);
  const confidence = Object.fromEntries(
    Object.entries(totals).map(([axis, value]) => [axis, Math.abs(value) === 3 ? "明显" : "轻微"]),
  );
  const code = chars.join("");
  return { code, ...(styleProfiles[code] || styleProfiles.DCV), confidence, axes: totals };
}

const average = (values) => values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
const percent = (value) => Math.round((value / 3) * 100);
const clampRubric = (rubric, key) => Math.min(3, Math.max(0, Number(rubric[key]) || 0));

export function scoreAssessment(selectedIds, rubric, questionList) {
  const items = questionList || questions;
  const selected = items
    .flatMap((question) => question.options)
    .filter((option) => selectedIds.includes(option.id));

  const choiceDimensions = Object.fromEntries(
    dimensions.map((dimension) => {
      const ids = items
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
    style: scoreStyle(selectedIds, items),
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
