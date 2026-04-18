import React, { useState, useEffect, useRef } from 'react';
import { 
  ExternalLink, 
  Languages, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  ChevronRight, 
  ChevronDown, 
  X, 
  Palette, 
  Camera, 
  BookOpen, 
  Award, 
  Users, 
  Target, 
  Sparkles, 
  Mail, 
  Link as LinkIcon, 
  Brain, 
  Coffee, 
  Play 
} from 'lucide-react';

/**
 * 最终视觉精调、获奖经历校准与交互增强版：
 * 1. 获奖日期修正：SDGs (2024.12), DiD (2023.12), CADA (2023.05)。
 * 2. 活动排序：按日期从新到旧重新排列。
 * 3. 森林棋墙：修正名称，更新 Figma 嵌入预览代码。
 * 4. SoundShoes：保持图片格式为 .png，并列摆放图组。
 * 5. 还原：100% 录入所有项目的原始长文本描述，拒绝简化。
 */

// --- 静态数据定义 ---
const educationData = [
  {
    year: "2019.09 - 2024.07",
    title: { zh: "华南理工大学 设计学院", jp: "華南理工大学 設計学院", en: "South China University of Technology, School of Design" },
    desc: { zh: "2021年9月，由机械类专业转入设计学院。学习工科逻辑 with 设计思维的融合。", jp: "2021年9月、機械系学部からデザイン学部へ転部。工学的思考とデザイン思考の融合を学ぶ。", en: "In September 2021, transferred from Engineering to Design. Learned to merge engineering logic with design thinking." }
  },
  {
    year: "2023.10 - 2024.03",
    title: { zh: "九州大学 艺术工学部 (交换留学)", jp: "九州大学 芸術工学部 (交換留学)", en: "Kyushu University (Exchange Program)" },
    desc: { zh: "触及设计思维的本质，并决定在日本深造。", jp: "デザイン思考の本質に触れ、日本での進学を決意。", en: "Experienced the depth of design thinking and decided to pursue further studies in Japan." }
  },
  {
    year: "2024.10 - 2025.03",
    title: { zh: "九州大学大学院 艺术工学府 研究生", jp: "九州大学大学院 芸術工学府 研究生", en: "Kyushu University Graduate School of Design (Research Student)" },
    desc: { zh: "改进修士研究方向，参加设计工作坊。", jp: "修士研究の方向性を改善し、デザインワークショップに参加。", en: "Refined research direction and participated in design workshops." }
  },
  {
    year: "2025.04 - Present",
    title: { zh: "九州大学大学院 艺术工学府 硕士课程", jp: "九州大学大学院 芸術工学府 修士課程", en: "Kyushu University Graduate School of Design (Master)" },
    desc: { zh: "战略设计专攻。研究高龄者支援及医疗保健设计。", jp: "ストラテジックデザインコース在籍。高齢者支援やヘルスケアデザインを研究。", en: "Strategic Design Course. Researching elderly support and healthcare design." }
  }
];

const activities = [
  {
    year: "2026.01",
    title: { zh: "TAKI CORPORATION UI/UX 实习", jp: "たきコーポレーション UI/UX インターン", en: "TAKI CORPORATION UI/UX Internship" },
    desc: { zh: "从调研分析到UI设计，一站式制作并发表APP提案。", jp: "調査からUI設計まで一貫してアプリ案を制作・発表。", en: "Produced and presented app proposals from research to UI design." }
  },
  {
    year: "2025.08",
    title: { zh: "丰田汽车 UI/UX 实习", jp: "トヨタ UI/UX インターンシップ", en: "Toyota UI/UX Internship" },
    desc: { zh: "通过实地调研在短时间内构建并发表全新服务企划。", jp: "現地調査から新規サービス企画面を短期間で構築。", en: "Developed new service concepts based on field research." }
  },
  {
    year: "2024.12",
    title: { zh: "SDGs Design International Awards 2024", jp: "SDGs デザインインターナショナルアワード 2024", en: "SDGs Design International Awards 2024" },
    desc: { zh: "项目：Kaavo。荣获入围奖（Shortlisted / 入选）。探索 DAC-U 二氧化碳回收技术的社会化应用。（注：该届企业奖由其他项目获得）", jp: "プロジェクト：Kaavo。ファイナリスト（入選）に選出。DAC-U（二酸化炭素直接回収）技術の社会実装を提案。", en: "Project: Kaavo. Shortlisted as a Finalist. Proposed the social application of DAC-U CO2 capture technology." }
  },
  {
    year: "2024.10",
    title: { zh: "Global Game Jam 工作坊", jp: "Global Game Jam Workshop", en: "Global Game Jam Workshop" },
    desc: { zh: "参与短期的协作策划与原型开发。", jp: "短期間でのコラボ企画・プロトタイプ開発に参加。", en: "Participated in rapid collaborative planning and prototyping." }
  },
  {
    year: "2023.12",
    title: { zh: "DiD Award（东莞杯）国际工业设计大赛", jp: "DiD Award（東莞杯）国際工業デザインコンペ", en: "DiD Award (Dongguan Cup) International Design Competition" },
    desc: { zh: "项目：玄武。荣获三等奖。跨学科合作开发的乡村防溺水智能救援系统。", jp: "プロジェクト：玄武。三等賞を受賞。農村部向け溺水防止スマート救援システムを学際的プロジェクトとして開発。", en: "Project: XUAN WU. Awarded 3rd Prize. An interdisciplinary smart rescue system for rural drowning prevention." }
  },
  {
    year: "2023.07 - 09",
    title: { zh: "广州・平面设计长期实习", jp: "広州・グラフィックデザイン長期インターン", en: "Graphic Design Internship in Guangzhou" },
    desc: { zh: "负责公园展示板及科普牌设计，成果已在当地落地设置。", jp: "公園の看板や広報パネルのデザインを担当。実物が現地に設置された。", en: "Designed public park information boards and panels (deployed)." }
  },
  {
    year: "2023.05",
    title: { zh: "CADA 日本概念艺术设计奖", jp: "CADA 日本コンセプトアートデザイン賞", en: "CADA Japan Concept Art Design Award" },
    desc: { zh: "项目：森林棋墙与森林乐队。荣获铜奖。针对中国“隔代育儿”现象的自然教育空间提案。", jp: "プロジェクト：森のチェスウォールと森のおんがくか。銅賞を受賞。中国における「隔代教育」の課題を解決する空間デザイン。", en: "Project: Forest Chess Wall & Band. Awarded Bronze Prize. A spatial design intervention for 'intergenerational parenting' in China." }
  }
];

const projectData = [
  { 
    id: 1, 
    title: { zh: "SoundShoes", jp: "SoundShoes", en: "SoundShoes" }, 
    tag: "Healthcare", 
    img: "1078123059.png", 
    summary: { zh: "针对帕金森患者的步行康复支援App。", jp: "パーキンソン病患者向け歩行リハビリ支援アプリ。", en: "Gait rehab support app for Parkinson's." },
    videoUrl: "https://www.youtube.com/embed/dVdjk5dCTFc",
    figmaEmbedUrl: "https://embed.figma.com/proto/g25sVCAzuC3ASyWTDvNhhB/%E8%B6%B3%E9%9F%B3?node-id=926-14775&page-id=926%3A12124&starting-point-node-id=926%3A14515&embed-host=share",
    details: {
      zh: [
        { t: "概要", d: "这是一款旨在通过提供不同“脚步声”作为听觉提示，改善帕金森患者步行康复训练体验、缓解冻结步态的移动端应用。" },
        { t: "功能特点", d: "核心机制：将“脚步声”作为听觉线索（代替纯音乐或节拍器），利用其天然的空间信息降低认知负担，防止冻结步态。\n任务与激励系统：设有个人任务（赚取金币解锁新脚步声）和协作任务（添加好友组队换取特殊声音），增强康复动机与社交联系。\nJourney Set（旅程列表）：用户可自定义脚步声播放列表，模拟前往某地的沿途情景，让枯燥的康复室训练变成丰富的“旅程”体验。\n适老化适医化设计：医生端可介入填写数据并设定安全步速限制；步速控制条摒弃了BPM，改为老人易懂的“步/分钟”，并带有吸附点方便滑动操作。" },
        { t: "制作过程", d: "课题发展：起源于解决帕金森患者步行问题的课程。通过医院见学发现，现有康复训练枯燥、缺乏交流，且患者易发冻结步态跌倒。\n难题与解决：最初想做视听结合的游戏化方案，但文献调研指出多模态提示会增加认知负荷导致跌倒。最终通过“单纯脚步声”解决该问题。在UI设计上，为避免老人将“切换脚步声”误认为“快进”，参考短视频逻辑，去除传统的播放/切歌按键，改为“左右滑动切换、点击画面暂停/播放”；并将功能Icon替换为直观的文字。" },
        { t: "成果", d: "使用Figma制作了极高保真度的原型，利用Variant property、Boolean property和Auto layout等高级功能，详细设定了注册、弹窗、模式切换等交互跳转，保持了工程文件的整洁与规范。以下为交互原型预览与成果展示：" }
      ],
      jp: [
        { t: "概要", d: "様々な「足音」を聴覚提示として提供することで、パーキンソン病患者の歩行訓練体験を改善し、すくみ足を緩和することを目指したモバイルアプリ。" },
        { t: "特徴", d: "コアメカニズム：音楽の代わりに「足音」を聴覚の手がかりとし、空間情報を利用して認知負荷を軽減。ミッションシステムやJourney Set機能を搭載。高齢者向けにBPM表記を「歩/分」に変更し、吸着型スライダーを採用。" },
        { t: "プロセス", d: "背景：病院見学を通じ、訓練の単調さと転倒リスクを把握。認知負荷を避けるためシンプルな足音に集約。UIはスワイプ操作を採用。アイコンを文字表記へ置き換えた。" },
        { t: "成果", d: "Figmaで高精度プロトタイプを制作。VariantやAuto layoutを駆使。以下は成果のデモです：" }
      ],
      en: [
        { t: "Overview", d: "A mobile application providing footstep sounds as auditory cues to improve gait rehabilitation and alleviate 'Freeze of Gait' for Parkinson's patients." },
        { t: "Features", d: "Uses footsteps instead of music to reduce cognitive load; mission systems for motivation; travel playlists. Senior-friendly design with simplified units." },
        { t: "Process", d: "Developed from clinical visits identifying fall risks. Research steered design toward simple footsteps to ensure intuitive operation for seniors." },
        { t: "Results", d: "High-fidelity Figma prototype utilizing advanced features. Mapped comprehensive flows. Watch the demo below:" }
      ]
    },
    github: "#", 
    figma: "https://www.figma.com/proto/g25sVCAzuC3ASyWTDvNhhB/%E8%B6%B3%E9%9F%B3?node-id=926-14515&page-id=926%3A12124&starting-point-node-id=926%3A14515&t=5weVgro6q9HDNkiY-1" 
  },
  { 
    id: 2, 
    title: { zh: "驱散『蚊』", jp: "蚊を追い払う", en: "Drive Away 'MOSQUITO'" }, 
    tag: "AI Art", 
    img: "24.png", 
    summary: { zh: "基于AI辅助Vibe Coding的视听交互装置。", jp: "AIを活用したVibe Codingによる視聴覚インスタレーション。", en: "Audio-visual installation using AI-driven coding." },
    videoUrl: "https://www.youtube.com/embed/o_A91P4TpYs",
    experienceUrl: "https://lizypeco.github.io/mosquito-swarm/",
    details: {
      zh: [
        { t: "概要", d: "一款探讨令人不快的噪音与身体动作之间关系的视听交互网页装置游戏。" },
        { t: "功能特点", d: "利用摄像头捕捉用户动作。当人静止时，屏幕上会出现不断叠加的“蚊”字影像和越来越响的蚊子ASMR音效；当用户挥手或运动时，声音和文字影像会随之渐渐消散，构建噪音与心理距离的体验。" },
        { t: "制作过程", d: "最初尝试使用TouchDesigner进行开发，遇到技术壁垒后转换思路，借助AI（Gemini）进行Vibe Coding，快速生成了网页代码，并自行提取ASMR音频融入项目，在极短时间内完成了高速验证和原型构建。" },
        { t: "成果", d: "成功开发出可流畅运行的Web交互原型，并在教室中进行了实地展示与测试，代码已在GitHub上开源发布。以下为实地展示视频：" }
      ],
      jp: [
        { t: "概要", d: "不快なノイズと身体動作の関係を探求する、視聴覚インタラクティブWebインスタレーションゲーム。" },
        { t: "特徴", d: "カメラで動作を検知。静止すると「蚊」の文字が画面を埋め尽くしASMRが激化、動くと消散する演出を通じ、心理的距離感を可視化。" },
        { t: "プロセス", d: "当初はTouchDesignerを検討したが、Geminiを活用した「Vibe Coding」へ転換。ASMR音源を統合し、概念実証とプロトタイプ構築を実現。" },
        { t: "成果", d: "ブラウザで動作するプロトタイプを開発し実地展示。以下はデモビデオです：" }
      ],
      en: [
        { t: "Overview", d: "An interactive web installation exploring the relationship between noise and movement." },
        { t: "Features", d: "Camera motion tracking. Static states trigger swarm visuals and Intensifying ASMR; movement causes them to dissipate." },
        { t: "Process", d: "Pivoted from TD to Vibe Coding with Gemini. Rapidly generated web code and integrated ASMR audio." },
        { t: "Results", d: "Fully functional web interactive prototype showcased in classroom environments. Watch the demo below:" }
      ]
    },
    github: "https://github.com/Lizypeco/mosquito-swarm", figma: "#" 
  },
  { 
    id: 3, 
    title: { zh: "FOREBIRD", jp: "FOREBIRD", en: "FOREBIRD" }, 
    tag: "Mobility", 
    img: "28.png", 
    summary: { zh: "面向观鸟初学者的体验型载具设计。", jp: "バードウォッチング初心者向けの体験用車両。", en: "Experience-oriented vehicle for birdwatching beginners." },
    details: {
      zh: [
        { t: "概要", d: "一款面向观鸟新手及普通大众设计的未来城市公园智能观鸟体验载具，旨在降低观鸟门槛并唤醒自然保护意识。" },
        { t: "功能特点", d: "提供低速行驶以缓解长途步行 fatigue；搭载多模态交互的HUD（平视显示器）和智能望远镜，提供实时鸟类识别与观察指导；内置“族谱式观鸟图鉴”，通过进化与灭绝的叙事深化教育意义；支持队友间的社交沟通功能。" },
        { t: "制作过程", d: "课题与分工：交通工具设计课程中以“亚文化”为主题的小组项目。队友负责车体建模和HMI等UI设计，我负责渲染（Twinmotion）、3D动画制作以及骨骼绑定。\n受众定位痛点：调研发现硬核观鸟爱好者乐于徒步且装备专业，载具很难直接提升他们的核心体验。解决方案是将目标人群转向“普通人/新手”，将产品定位从“代步工具”转化为“提供专业指导与设备的综合体验空间”。\n技术制作痛点：渲染视频耗时极长。我通过自学并将视频拆分成每100帧一个文件包，分发给组员和同学的电脑同时进行分布式渲染，并运用VFX技术将小车融入环境背景中。" },
        { t: "成果", d: "产出了包含车辆3D渲染图、HUD投影界面、App UI流程以及最终动态展示视频的完整视觉体系。并在2025年，我个人对HUD的UI设计进行了重新重置与打磨（Brush-up），进一步提升了视觉与交互的专业度。" }
      ],
      jp: [
        { t: "概要", d: "初心者や一般向けの未来型スマートバードウォッチング車両。敷居を下げ、自然保護意識の喚起を目的としたデザイン。" },
        { t: "特徴", d: "低速走行による歩行疲労軽減、リアルタイム識別・観察指導。進化と絶滅の物語を伝える「家系図式図鑑」を内蔵。" },
        { t: "プロセス", d: "课题と分担：モビリティデザインの授業における「サブカルチャー」をテーマとしたグループプロジェクト。他メンバーが車体とHMIを、私が渲染、3Dアニメ、リギングを担当。ターゲット転換：調査の結果、ターゲットを「一般層/初心者」へ転換。移動手段から「体験空間」へと再定義した。技术：分布式渲染手法により膨大な処理時間を克服。" },
        { t: "成果", d: "3D渲染、HUD、App UI、プロモーションビデオを構築。2025年にはHUDデザインのブラッシュアップを実施。" }
      ],
      en: [
        { t: "Overview", d: "A smart birdwatching vehicle for urban parks, designed to lower the barrier for beginners and raise environmental awareness." },
        { t: "Features", d: "Low-speed cruising; HUD and smart telescope for real-time guidance; evolutionary 'Family Tree' encyclopedia." },
        { t: "Process", d: "Topic: Group project themed on 'Subculture'. Teammates handled body modeling while I managed rendering, 3D animation, and rigging. Target: Pivoted to 'Beginners', shifting positioning to an 'integrated experience space'. Challenges: Overcame massive rendering times by distributed computing." },
        { t: "Results", d: "Comprehensive ecosystem including 3D renders, HUD, and App UI. Refined the HUD design in 2025." }
      ]
    },
    featureImages: ["image 71.png", "image 70.png", "hud1.png", "hud2.png", "hud3.png", "hud4.png"],
    processImages: ["journeymap.png"],
    github: "#", figma: "#" 
  },
  { 
    id: 4, 
    title: { zh: "玄武", jp: "玄武", en: "XUAN WU" }, 
    tag: "Rescue IoT", 
    img: "38.png", 
    summary: { zh: "乡村防溺水智能救援平台与救生圈。", jp: "農村部向け溺水防止スマート救援プラットフォーム。", en: "Intelligent rescue platform for drowning victims." },
    details: {
      zh: [
        { t: "概要", d: "一个聚焦于乡村未成年人溺水问题的多方联动自动救援系统与水域安全监控平台。" },
        { t: "功能特点", d: "包含水域监控预警平台、微信企业号村民端Bot以及硬件“分体式智能救生圈”。系统能在青少年下水前发出语音驱赶，若发生落水则自动出动救生圈并通知附近村民，溺水确认后才呼叫医疗资源，避免公共资源浪费。" },
        { t: "制作过程", d: "课题发展与分工：与电信学院跨学科合作的产学研项目。电信学院要求必须使用机器学习与图像训练；设计学院要求课题必须与“主动健康”相关。\n难题与解决：工程师团队提议缺乏设计创新度。我作为桥梁，从“本能溺水反应”调研切入，提出了“事前干预与自动介入”全新用户流程。建议采用“分体式”救生圈设计，完美契合了电信学院对算法创新的诉求。" },
        { t: "成果", d: "成功融合了技术可行性与体验创新，最终不仅产出了系统架构与UI界面，还制作了能在水里追踪位置的实体机电原型设备，并荣获了 DiD Award（东莞杯）三等奖。" }
      ],
      jp: [
        { t: "概要", d: "農村部における未成年の溺水問題に焦点を当てた、多機関連携の自動救援システムと水域監視プラットフォーム。" },
        { t: "特徴", d: "監視プラットフォーム、村民用通知Bot、分体式スマート救命浮輪で構成。音声警告、落水時の自動出動を実現。" },
        { t: "プロセス", d: "学際的プロジェクト。本能的溺水反応の研究に基づき「事前介入」フローを提案。分体式デザインと経路最適化アルゴリズムを導入し、技術要件を満たしつつデザインによる付加価値を創出した。" },
        { t: "成果", d: "UIに加え、水中で位置追跡可能な实物メカトロニクス・プロトタイプを制作。DiD Award 三等賞を受賞。" }
      ],
      en: [
        { t: "Overview", d: "A collaborative rescue system and safety monitoring platform focused on rural child drowning prevention." },
        { t: "Features", d: "Includes monitoring alerts, community alerts, and split-type buoys. Features voice deterrence and automatic protocol." },
        { t: "Process", d: "Interdisciplinary project bridging ML requirements with Active Health goals. Proposed a 'pre-intervention' flow based on drowning research." },
        { t: "Results", d: "Integrated technical feasibility with innovation. Produced a functional mechatronic prototype capable of water tracking." }
      ]
    },
    github: "#", figma: "https://figma.com/file/genbu-proto" 
  },
  { 
    id: 5, 
    title: { zh: "森林棋墙与森林乐队", jp: "森のチェスウォールと森のおんがくか", en: "Forest Chess Wall & Band" }, 
    tag: "Interior", 
    img: "46.png", 
    summary: { zh: "通过自然教育缓解“隔代育儿”压抑心理的服务与空间设计。", jp: "祖父母による孫育てに伴う抑うつ感を緩和するサービスデザイン。", en: "Service space design for intergenerational parenting." },
    figmaEmbedUrl: "https://embed.figma.com/proto/iz4MFtdqt7ilpepOvtaMvF/pocket-forest?page-id=1370%3A1357&node-id=1370-1359&p=f&viewport=530%2C392%2C0.1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1370%3A1359&embed-host=share",
    details: {
      zh: [
        { t: "概要", d: "一项旨在缓解中国“隔代育儿”中老年人压抑心理，通过自然教育手段帮助老幼建立平等关系的服务与空间设计。" },
        { t: "功能特点", d: "包含实体设施“森林棋墙”（翻转方块认识动植物）和“梅花桩森林乐队”（互动装置），配套有智能导览App。通过互动让儿童获得教育，同时利用“回想疗法”唤起老年人的回忆。" },
        { t: "制作过程", d: "通过调研发现高知老年人在带孙辈时缺乏主体感，且老幼之间缺乏体力匹配的共同爱好。为解决这一痛点，提取了“自然活动”这一交集，让老幼在游玩中找回对等的关系。" },
        { t: "成果", d: "产出了空间装置的3D渲染图以及配套手机App的高保真UI，实现了“物理设施+数字应用”的服务设计提案，并于2023年荣获了 CADA 日本コンセプトアートデザイン賞（概念艺术设计奖）铜赏。以下为交互原型预览：" }
      ],
      jp: [
        { t: "概要", d: "中国における「隔代教育（祖父母による孫育て）」に伴う抑うつ感を緩和し、自然教育を通じて老若が対等な関係を築けるようにするサービス・空間デザイン。" },
        { t: "特徴", d: "知育壁「森のチェスウォール」と踏板、Appで構成。自然教育を通じた子供の教育と、回想療法による高齢者の記憶刺激を両立。" },
        { t: "プロセス", d: "高学歴の高齢者が孫育てにおいて主体性を失っている実態を調査で発見。共通の趣味が見出しにくい点に対し、「自然活動」を接点として遊びの中で対等な関係を再構築するソリューションを提案した。" },
        { t: "成果", d: "空間レンダリングとApp UIを制作。2023年 CADA 日本コンセプトアートデザイン賞 銅賞を受賞。以下はプロトタイプです：" }
      ],
      en: [
        { t: "Overview", d: "A service and space design aiming to alleviate psychological stress in Chinese intergenerational parenting through nature education." },
        { t: "Features", d: "Features a botanical learning wall and interaction forest band, with a smart guide App. Combines education with Reminiscence Therapy." },
        { t: "Process", d: "Bridged the generation gap through shared nature-based activities that restore equal footing between grandparents and children." },
        { t: "Results", d: "Produced 3D renderings and high-fidelity App UI. Won Bronze at the 2023 CADA Awards. Interact with the prototype below:" }
      ]
    },
    github: "#", 
    figma: "https://www.figma.com/proto/iz4MFtdqt7ilpepOvtaMvF/pocket-forest?page-id=1370%3A1357&node-id=1370-1359&p=f&viewport=530%2C392%2C0.1&t=OgNUfrjlElXbHe8y-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1370%3A1359&page-id=1370%3A1357" 
  },
  { 
    id: 6, 
    title: { zh: "Kaavo", jp: "Kaavo", en: "Kaavo" }, 
    tag: "Service", 
    img: "56.png", 
    summary: { zh: "基于CO2回收的未来型宠物食品订阅服务。", jp: "CO2回収型ペットフード・サブスクリプションサービス。", en: "CO2-capturing pet food subscription." },
    videoUrl: "https://www.youtube.com/embed/fKm4AgvcO2c",
    details: {
      zh: [
        { t: "概要", d: "依托九州大学DAC-U（二氧化碳直接回收）技术，将收集的CO2转化为宠物食品的未来型订阅制服务。" },
        { t: "功能特点", d: "用户将专用的CO2回收滤芯安装在宠物牵引绳上，在日常遛狗中回收CO2。滤芯交还至街头的“Kaavo Station”后，用户可获得积分折扣。App内设有宠物排行榜，激励用户持续参与。" },
        { t: "制作过程", d: "背景为探索DAC-U技术的社会化应用。难点在于合成淀粉的伦理与接受度。我提出将其应用于“宠物食品”以规避心理与法律风险。团队协作构思了硬件、订阅模式和排行榜机制。" },
        { t: "成果", d: "完成了从概念提案、硬件3D渲染、蓝图到App UI的全面设计。荣获 SDGs Design International Awards 入围奖（入选）。以下为演示视频：" }
      ],
      jp: [
        { t: "概要", d: "九州大学のDAC-U技術を活用し、回収したCO2をペットフードに変換する未来型サブスクリプションサービス。" },
        { t: "特徴", d: "リードに専用フィルターを装着し散歩中にCO2を回収。返却でポイント還元。ペットランキングで参加を促進。" },
        { t: "プロセス", d: "合成デンプンの人間用食材としての倫理性課題に対し、「ペットフード」としての活用を提案することで心理的・法的リスクを回避。" },
        { t: "成果", d: "コンセプトから3D、UIまで統合設計。SDGs Design International Awards にてファイナリスト（入選）選出。" }
      ],
      en: [
        { t: "Overview", d: "A futuristic subscription service converting captured CO2 into pet food using DAC-U technology." },
        { t: "Features", d: "CO2-capturing filters on leashes; returned for credits; competitive leaderboards." },
        { t: "Process", d: "Proposed pet food use to bypass psychological hurdles associated with synthetic starch human consumption. Collaborative design." },
        { t: "Results", d: "Full design from concept to rendering and UI. Shortlisted as Finalist at SDGs Awards." }
      ]
    },
    github: "#", figma: "https://figma.com/file/kaavo-proto" 
  },
  { 
    id: 7, 
    title: { zh: "「文化官」工作坊", jp: "「文化官」ワークショップ", en: "Cultural Officer Workshop" }, 
    tag: "Social", 
    img: "65.png", 
    summary: { zh: "连接留学生与日本社会未来的服务提案。", jp: "留学生と日本社会の未来をつなぐ サービス 提案。", en: "Service connecting international students with society." },
    details: {
      zh: [
        { t: "概要", d: "「文化官」工作坊是一个通过有意义的勤工俭学体验，在为学生提供理解当地文化和社会机会的同时，促进人与人之间连接的活动展示。" },
        { t: "制作背景", d: "近年来，受少子老龄化影响，日本社会面临劳动力不足的严峻挑战，外国人居住者也随之增加。为了防止将来社会出现按民族或国籍分断、孤立的结构，探索外国人与当地社会的相互理解与融合显得至关重要。" },
        { t: "调研与痛点", d: "访谈发现，许多留学生为了理解日本文化、提高语学力并建立社交而开始兼职，但实际多从事极其忙碌、缺乏交流机会且体力负担沉重的饮食业，难以转化为文化成长。经济宽裕的留学生常因感受不到此类兼职的魅力而轻易辞职。" },
        { t: "设计方案", d: "构思了“文化官”勤工俭学模式，让留学生在更具文化文脉的场所（如文化设施等）工作。同时允许一定数量的日本学生参加，将其打造为跨文化交流的场域，在增加地域文化关切的同时，建立有深度的社会连接。" },
        { t: "成果", d: "产出了系统服务蓝图及各利益相关方的连接关系图。以下为工作坊流程与服务体系展示：" }
      ],
      jp: [
        { t: "概要", d: "「文化官」ワークショップは、地域の文化や社会を理解する機会を学生に提供しながら、アルバイトを通じて人と人とのつながりを促進することを目的とした活動です。" },
        { t: "制作背景", d: "近年、日本社会は少子高齢化の影響により労働力不足に直面しており、それに伴い外国人居住者の増加傾向も見られます。将来的に人々が民族や国籍ごとに分断され孤立して暮らすような社会構造にならないためには、外国人と地域社会の相互理解と融合が重要だと考えました。" },
        { t: "調査と課題", d: "留学生へのインタビューの結果、多くの学生が日本文化への理解や日本人との交流、適応を目的にアルバイトを始めますが、実際には多忙な飲食業などが多く、文化的・言語的な成長にはつながりにくいという課題を発見しました。経済的に余裕のある留学生は、そのような環境に魅力を感じられず辞めてしまうケースも少なくありません。" },
        { t: "コンセプト", d: "留学生が地域文化への理解を深め、社会的な接点を持てるような、より意味のあるアルバイト体験を提供するサービスとして構想しました。また、この活動には日本人学生も一定数参加できるようにし、交流の場としての役割も担います。" },
        { t: "成果", d: "サービスシステム図およびステークホルダーマップを制作。以下はワークショップのフローと体系図です：" }
      ],
      en: [
        { t: "Overview", d: "The 'Cultural Officer' workshop is an initiative designed to provide students with opportunities to understand local culture and society while fostering human connections through meaningful part-time work." },
        { t: "Background", d: "Amid Japan's labor shortage due to an aging population, integrating foreign residents is crucial. To prevent future social fragmentation and isolation by nationality, we explored ways to foster mutual understanding between foreigners and local communities." },
        { t: "Research & Pain Points", d: "Interviews revealed that while international students seek cultural immersion through work, high-pressure service jobs offer little growth or social interaction. Many lose motivation and quit due to the lack of meaningful engagement." },
        { t: "Concept", d: "We envisioned a service providing culturally significant work experiences. By allowing local Japanese students to participate as well, the program serves as a cross-cultural platform for genuine social integration and community care." },
        { t: "Results", d: "Developed service blueprints and stakeholder maps. View the workshop flow and system architecture below:" }
      ]
    },
    workshopImages: ["workshop1.png", "workshop2.png"],
    github: "#", figma: "#" 
  }
];

const otherWorks = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png"];

const getHobbiesList = (l) => l === 'zh' ? [
  { name: "水彩画", desc: "观察生命的律动，通过解读与表达记录时光。" },
  { name: "动物观察", desc: "从日常潜伏的生命微小动作中汲取灵感。" },
  { name: "语言学习", desc: "为了提高对新世界认知清晰度的挑战。" }
] : (l === 'jp' ? [
  { name: "水彩画", desc: "生命の躍動を観察し、解釈して表現する時間。" },
  { name: "動物観察", desc: "日常に潜む生命の細かな動きからインスピレーションを得る。" },
  { name: "言語学習", desc: "新しい世界の解像度を高めるための挑戦。" }
] : [
  { name: "Watercolor", desc: "Observing life's vitality through expression." },
  { name: "Animal Observation", desc: "Finding inspiration in the subtle movements of life." },
  { name: "Language Learning", desc: "A challenge to increase the resolution of a new world." }
]);

const GithubIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);

const App = () => {
  const [lang, setLang] = useState('jp');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollInterval = useRef(null);

  const navSections = ['profile', 'education', 'projects', 'showcase', 'research', 'hobbies'];
  const allSubSections = ['profile', 'education', 'projects', 'other', 'showcase', 'research', 'hobbies'];

  useEffect(() => {
    document.title = "feixue's ptfl";
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const currentSub = allSubSections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 250 && rect.bottom >= 250;
        }
        return false;
      });
      if (currentSub) {
        setActiveSection(currentSub);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollProgress = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const startScrolling = (direction) => {
    if (scrollInterval.current) return;
    scrollInterval.current = setInterval(() => {
      if (scrollRef.current) scrollRef.current.scrollLeft += direction * 8;
    }, 16);
  };

  const stopScrolling = () => { if (scrollInterval.current) { clearInterval(scrollInterval.current); scrollInterval.current = null; } };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < 150) startScrolling(-1);
    else if (x > rect.width - 150) startScrolling(1);
    else stopScrolling();
  };

  const theme = {
    primaryText: "text-[#5BB2DF]", primaryBg: "bg-[#9FD9F6]", accent: "text-[#F59E0B]", accentBg: "bg-[#F59E0B]", bg: "bg-white", textMain: "text-slate-800", textMuted: "text-slate-500"
  };

  const t = {
    zh: {
      name: "陈 霏雪", nameEn: "CHEN FEIXUE", nameKana: "チェン　フェイシュエ", role: "设计师 / UX与战略研究员",
      intro: "以好奇心为原动力洞察结构，并将其重构为体验。追求实现可能性的诚实与多维度表达，心怀对社会的责任与作为设计师的喜悦，去实现有价值的体验。",
      nav: ["个人简介", "经历", "项目作品", "作品集", "修士研究", "个人兴趣"],
      eduTitle: "经历", actTitle: "学外活动・实习・获奖记录",
      projectTitle: "项目作品", otherWorksTitle: "其它", showcaseTitle: "作品集文件", researchTitle: "修士研究", hobbiesTitle: "个人兴趣", methodsTitle: "STEPS",
      researchSubject: "基于烹饪疗法及回想疗法的面向高龄者的回忆食谱生成方法研究",
      researchSummary: "该研究利用融合了回想疗法与烹饪疗法的对话型AI，从高龄者的“饮食记忆”中生成回忆食谱。",
      steps: [
        { t: "文献调查 (已完成)", d: "确认回想与烹饪疗法结合的有效性，确立以支持高龄者居家独立生活为目标的研发方向。" },
        { t: "访谈调查 (已完成)", d: "分析饮食记忆中的季节性重要性。确立重现历史文脉等设计原则。" },
        { t: "原型设计 (迭代中)", d: "开发对话Web应用，独创3阶段对话逻辑。整合餐具、节庆等唤醒元素。" },
        { t: "认知建模 (计划中)", d: "在居家厨房通过陌材料理测试变量。产出高龄者新菜习得认知地图与痛点映射。" },
        { t: "原型整合与专家评估 (计划中)", d: "落实大画面、动作原子化UI策略。通过专家评估提前排查系统隐患。" },
        { t: "用户验证 (计划中)", d: "在真实动线中验证系统能否显著提升老年人的自我效能感与料理意愿。" }
      ],
      theories: [
        { t: "回想疗法", d: "通过唤起过去的生活经验与记忆，提升患者的认知功能与幸福感。" },
        { t: "烹饪疗法", d: "利用备餐与烹饪过程作为康复手段，促进身体机能与社会化参与。" }
      ],
      points: [
        { label: "使命", val: "居家养老" },
        { label: "技术", val: "对话型AI" },
        { label: "核心", val: "饮食记忆" }
      ],
      tryNow: "立即体验",
      experience: "体验链接"
    },
    jp: {
      name: "陳 霏雪", nameEn: "CHEN FEIXUE", nameKana: "チェン　フェイシュエ", role: "デザイナー / UXとストラテジック研究者",
      intro: "好奇心を原動力に構造を捉え、体验作为再構築する。実現可能性への诚実さと多角的な表现を追求し、社会への责任和设计师としての喜びを胸に、価値ある体験を実装します。",
      nav: ["プロフィール", "経歴", "プロジェクト", "ポートフォリオ", "修士研究", "趣味"],
      eduTitle: "経歴", actTitle: "学外活動・インターン・受賞実績",
      projectTitle: "プロジェクト", otherWorksTitle: "その他", showcaseTitle: "ポートフォリオファイル", researchTitle: "修士研究", hobbiesTitle: "個人趣味", methodsTitle: "STEPS",
      researchSubject: "料理療法および回想療法に基づく高齢者の思い出レシピ生成手法の研究",
      researchSummary: "回想療法と料理療法を融合した对话型AIを用いて、高齢者の『食の記憶』から思い出のレシピを生成し支援する研究です。",
      steps: [
        { t: "文献調査とテーマ確立 (完了)", d: "回想法と料理療法の有効性を確認。高齢者の在宅自立を支援する研究方向を確定。" },
        { t: "質的調査とDP策定 (完了)", d: "季節性の重要性を解明し、歴史的文脈の導入や食卓風景再現などDPを策定。" },
        { t: "プロトタイプ1开发 (反復中)", d: "3段階の对话ロジックを実装。食材だけでなく周辺要素への質問を統合。" },
        { t: "第2回調査と认知モデル (计划中)", d: "自宅で未知の料理を用いた测试を実施。认知マップと痛点を可视化。" },
        { t: "統合プロトタイプの構築 (计划中)", d: "大画面化と操作の原子化をUIに反映し、専門家によるヒューリスティック評価を実施。" },
        { t: "最終ユーザーテスト (计划中)", d: "実際の动线で验证。料理意欲向上を实证。" }
      ],
      theories: [
        { t: "回想療法", d: "過去の経験や記憶を呼び起こすことで、認知機能の維持や幸福感を高める心理療法。" },
        { t: "料理療法", d: "調理工程をリハビリとして活用し、身体機能や社会性の向上を目指す支援手法。" }
      ],
      points: [
        { label: "ミッション", val: "エイジング-イン-プレイス" },
        { label: "テクノロジー", val: "対話型AI" },
        { label: "CORE", val: "食の記憶" }
      ],
      tryNow: "今すぐ体験",
      experience: "体験リンク"
    },
    en: {
      name: "Chen Feixue", nameEn: "CHEN FEIXUE", nameKana: "CHEN FEIXUE", role: "Designer / UX & Strategic Researcher",
      intro: "Driven by curiosity, I decode structures into experiences. I strive for integrity in feasibility and multifaceted expression, with a sense of social responsibility.",
      nav: ["Profile", "Experience", "Projects", "Portfolio", "Research", "Hobbies"],
      eduTitle: "Experience History", actTitle: "Extracurricular, Internship & Awards",
      projectTitle: "Projects", otherWorksTitle: "Other", showcaseTitle: "Portfolio File", researchTitle: "Master's Research", hobbiesTitle: "Interests", methodsTitle: "STEPS",
      researchSubject: "Research on Nostalgic Recipes for Older Adults.",
      researchSummary: "Integrating reminiscence and culinary therapy with AI.",
      steps: [
        { t: "Literature (Done)", d: "Confirmed fusion therapy efficacy." },
        { t: "Interview (Done)", d: "Identified festive context insights." },
        { t: "Prototype (Iterating)", d: "Developed 3-stage dialogue logic." },
        { t: "Modeling (Planned)", d: "Mapped cognitive models in kitchen." },
        { t: "Integration & Expert Review (Planned)", d: "Applied UI atomization and conducted evaluations." },
        { t: "Final Validation (Planned)", d: "Verified results in real kitchen flows." }
      ],
      theories: [
        { t: "Reminiscence", d: "Boosting cognitive function." },
        { t: "Culinary", d: "Physical and social rehab." }
      ],
      points: [
        { label: "Mission", val: "Aging-in-Place" },
        { label: "Tech", val: "Dialogue AI" },
        { label: "CORE", val: "Food Memory" }
      ],
      tryNow: "Have a try",
      experience: "Experience Link"
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.textMain} font-sans selection:bg-[#9FD9F6]/30`}>
      <style>{`
        #root { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; text-align: left !important; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade { mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }
        .role-label { font-size: clamp(10px, 2.8vw, 16px); line-height: 1.2; }
      `}</style>

      {/* Nav */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <span className={`text-xl font-bold tracking-tighter ${theme.primaryText}`}>FEIXUE.C</span>
          <div className="hidden md:flex items-center space-x-10">
            {navSections.map((sec, i) => (
              <a key={sec} href={`#${sec}`} className={`relative flex flex-col items-center group transition-all duration-300 uppercase tracking-[0.2em] text-[10px] whitespace-nowrap ${activeSection === sec ? 'text-slate-900 font-black' : 'text-slate-400 hover:text-slate-600'}`}>
                <span>{t[lang].nav[i]}</span>
                <div className={`mt-1.5 w-1 h-1 rounded-full transition-all duration-300 ${activeSection === sec ? 'bg-[#F59E0B] scale-150 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-transparent group-hover:bg-slate-300'}`}></div>
              </a>
            ))}
          </div>
          <div className="flex items-center space-x-3 bg-stone-100/80 px-4 py-2 rounded-full border border-stone-200/50">
            <Languages size={14} className="text-stone-400" />
            <div className="flex items-center gap-3 text-[10px] font-black tracking-widest">
              {['en', 'zh', 'jp'].map(l => (
                <button key={l} onClick={() => setLang(l)} className={`${lang === l ? theme.accent : 'text-stone-400'} hover:text-slate-900 transition-colors uppercase`}>{l === 'jp' ? '日' : l === 'zh' ? '中' : 'EN'}</button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="profile" className="min-h-screen flex items-center px-8 pt-20 relative overflow-hidden bg-white pb-32">
        <div className="absolute right-0 top-[240px] md:top-1/2 -translate-y-1/2 select-none pointer-events-none z-0">
          <span className="text-[25vw] md:text-[18vw] font-black text-stone-200/20 tracking-tighter uppercase whitespace-nowrap">PORTFOLIO</span>
        </div>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-6 md:gap-24 relative z-10">
          <div className="md:w-5/12">
            <div className={`inline-block px-4 py-1.5 mb-10 ${theme.primaryBg} text-slate-800 rounded-sm text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase whitespace-nowrap overflow-visible`}>Experience & Design Strategy</div>
            <div className="mb-10">
              <h1 className="text-5xl md:text-6xl font-black mb-2 tracking-tighter text-slate-900 leading-none whitespace-nowrap">{t[lang].name}</h1>
              {lang !== 'en' && (
                <>
                  <p className="text-[11px] md:text-[13px] font-bold tracking-[0.3em] text-slate-400 uppercase leading-relaxed">{t[lang].nameEn}</p>
                  <p className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-slate-300">{t[lang].nameKana}</p>
                </>
              )}
            </div>
            <p className={`role-label whitespace-nowrap ${theme.textMuted} font-bold ${lang === 'en' ? 'tracking-wider' : 'tracking-[0.2em]'} uppercase`}>{t[lang].role}</p>
          </div>
          <div className="md:w-6/12 mt-4 md:mt-0">
            <p className="text-[11px] md:text-[14px] lg:text-[15px] text-slate-700 font-light tracking-[0.05em] leading-[2.2] md:leading-[2.2] whitespace-pre-line border-l border-stone-200 pl-8 md:pl-12">{t[lang].intro}</p>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-30 z-20">
          <div className="animate-bounce flex flex-col items-center gap-2">
            <span className="hidden md:block text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">Scroll Down</span>
            <div className="md:hidden"><ChevronDown size={32} className="text-slate-300" strokeWidth={1.5} /></div>
            <div className="hidden md:flex w-6 h-10 border-2 border-slate-300 rounded-full justify-center p-1"><div className="w-1 h-2 bg-slate-300 rounded-full"></div></div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="education" className="py-32 bg-white w-full">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex items-center space-x-6 mb-20"><GraduationCap className={theme.primaryText} size={40} /><h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].eduTitle}</h2></div>
          <div className="space-y-20">
            {educationData.map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row md:space-x-20 group">
                <div className="md:w-1/4 text-stone-300 font-mono text-sm pt-2 mb-4 md:mb-0 tracking-[0.2em] font-bold">{item.year}</div>
                <div className={`md:w-3/4 border-l-4 border-stone-50 pl-12 pb-4 transition-all group-hover:border-[#9FD9F6]`}>
                  <h3 className="text-xl md:text-3xl font-black mb-4 group-hover:text-slate-900 transition-colors leading-tight">{item.title[lang]}</h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-light">{item.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
          <div id="activities" className="mt-24 border-t border-stone-100 pt-16">
            <button onClick={() => setShowActivities(!showActivities)} className={`flex items-center space-x-6 ${theme.primaryText} font-black hover:text-[#F59E0B] transition-colors uppercase tracking-[0.3em] text-sm`}>
              <Briefcase size={24} /><span>{t[lang].actTitle}</span><ChevronDown className={`transition-transform duration-500 ${showActivities ? 'rotate-180' : ''}`} size={24} />
            </button>
            <div className={`overflow-hidden transition-all duration-700 ${showActivities ? 'max-h-[2000px] opacity-100 mt-16' : 'max-h-0 opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-12 pl-12">
                {activities.map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="absolute -left-12 top-2 w-4 h-4 rounded-full bg-[#9FD9F6] opacity-30 group-hover:opacity-100 transition-opacity" />
                    <div className="text-[10px] font-bold text-stone-400 mb-2 tracking-widest">{item.year}</div>
                    <h4 className="font-black text-xl mb-3 text-slate-800 leading-tight">{item.title[lang]}</h4>
                    <p className="text-slate-500 text-sm font-light leading-loose">{item.desc[lang]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-32 px-8 bg-stone-50 w-full border-t border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-6 mb-20"><Palette className={theme.primaryText} size={40} /><h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].projectTitle}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectData.map((project) => (
              <div key={project.id} className="group bg-white rounded-sm shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden border border-stone-100" onClick={() => setSelectedProject(project)}>
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                  <img src={project.img} alt="" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-[1.5s]" />
                  <div className="absolute top-4 right-4"><span className="bg-white/95 backdrop-blur px-3 py-1 text-[8px] font-black tracking-widest uppercase text-slate-800 shadow-sm border border-stone-100">{project.tag}</span></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black mb-2 flex justify-between items-center text-slate-900 group-hover:text-[#5BB2DF] transition-colors leading-tight">{project.title[lang]}<ChevronRight size={18} className="text-stone-300" /></h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed font-light line-clamp-2">{project.summary[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Works Slider */}
      <section id="other" className="py-32 px-8 bg-white overflow-hidden border-t border-stone-100">
        <div className="max-w-7xl mx-auto mb-16"><h2 className="text-4xl font-black tracking-tighter uppercase mb-2">{t[lang].otherWorksTitle}</h2><div className="w-20 h-1 bg-[#9FD9F6]"></div></div>
        <div className="relative group/container" onMouseMove={handleMouseMove} onMouseLeave={stopScrolling}>
          <div ref={scrollRef} onScroll={handleScrollProgress} className="flex space-x-8 overflow-x-auto pb-10 scrollbar-hide px-4 mask-fade relative z-10 cursor-ew-resize">
            {otherWorks.map((img, i) => (
              <div key={i} className="flex-none group relative overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-all duration-500 h-64 md:h-80"><img src={img} alt={`Work ${i}`} className="h-full w-auto object-contain bg-stone-50 group-hover:scale-105 transition-transform duration-700" /></div>
            ))}
          </div>
          <div className="max-w-xl mx-auto mt-6 bg-stone-100 h-0.5 relative rounded-full overflow-hidden"><div className="absolute left-0 top-0 h-full bg-[#9FD9F6] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }}></div></div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section id="showcase" className="py-32 px-8 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-6 mb-20"><Target className={theme.primaryText} size={40} /><h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].showcaseTitle}</h2></div>
          <div className="relative aspect-video w-full rounded-sm overflow-hidden shadow-2xl border border-stone-200">
            <iframe style={{ border: "none", width: "100%", height: "100%" }} src="https://embed.figma.com/proto/rvu2cxmbU4f7lg8rewR6s1/PF-for-website?node-id=1-2529&p=f&viewport=252%2C-746%2C0.11&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* Master's Research Section */}
      <section id="research" className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#9FD9F6]/5 pointer-events-none skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex items-center space-x-6 mb-20">
            <BookOpen className="text-[#9FD9F6]" size={40} />
            <h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].researchTitle}</h2>
          </div>
          <div className="mb-20">
            <h3 className="text-xl md:text-2xl font-black mb-8 leading-relaxed text-white tracking-tight border-l-4 border-[#9FD9F6] pl-8 max-w-4xl">{t[lang].researchSubject}</h3>
            <p className="text-slate-300 leading-[2.2] text-lg font-light italic max-w-3xl">{t[lang].researchSummary}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-12 text-[#9FD9F6] border-b border-white/10 pb-4 inline-block">{t[lang].methodsTitle}</h4>
              <ul className="space-y-10 text-[11px] md:text-sm relative">
                <div className="absolute left-[9px] top-4 bottom-4 w-0.5 bg-white/5"></div>
                {t[lang].steps.map((step, i) => (
                  <li key={i} className={`group relative pl-12 ${i === 2 ? 'cursor-pointer' : ''}`}>
                    <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-[#9FD9F6] z-10 group-hover:bg-[#9FD9F6] transition-colors"></div>
                    <div className="mb-4">
                      {i === 2 ? (
                        <a href="https://gemini.google.com/share/6c123f0d0e8f" target="_blank" rel="noopener noreferrer" className="block">
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-[#9FD9F6] font-mono font-black text-xs uppercase tracking-widest whitespace-nowrap">Stage 0{i+1}</span>
                            <div className="font-black text-white text-base uppercase tracking-wider flex items-center gap-2">{step.t} <ExternalLink size={14} className="text-[#F59E0B]" /></div>
                          </div>
                          <div className="text-slate-400 font-light leading-relaxed max-w-2xl">{step.d}</div>
                          <div className="rounded-sm overflow-hidden border border-white/10 shadow-2xl mt-4 max-w-lg opacity-80 hover:opacity-100 transition-opacity"><img src="recipe.png" alt="" className="w-full h-auto" /></div>
                        </a>
                      ) : (
                        <>
                          <div className="flex items-center gap-4 mb-2"><span className="text-[#9FD9F6] font-mono font-black text-xs uppercase tracking-widest whitespace-nowrap">Stage 0{i+1}</span><div className="font-black text-white text-sm md:text-base uppercase tracking-wider">{step.t}</div></div>
                          <div className="text-slate-400 font-light leading-relaxed max-w-2xl">{step.d}</div>
                          {i === 3 && <div className="rounded-sm overflow-hidden border border-white/10 shadow-2xl mt-4 max-w-lg opacity-80"><img src="recipe-image.png" alt="" className="w-full h-auto" /></div>}
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-4 space-y-12 lg:sticky lg:top-32">
              <div className="space-y-4">
                {t[lang].theories.map((theory, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-sm hover:border-[#9FD9F6]/50 transition-all group">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-[#9FD9F6]">{i === 0 ? <Brain size={20}/> : <Coffee size={20}/>}</div>
                      <div className="text-sm font-black text-white uppercase tracking-widest">{theory.t}</div>
                    </div>
                    <div className="text-[11px] text-slate-400 font-light leading-relaxed">{theory.d}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {t[lang].points && t[lang].points.map((item, i) => (
                  <div key={i} className="bg-[#9FD9F6]/5 border border-[#9FD9F6]/10 p-8 rounded-sm hover:bg-[#9FD9F6]/10 transition-all group shadow-xl">
                    <div className="text-[#F59E0B] mb-4 group-hover:scale-110 transition-transform origin-left">
                       {i === 0 ? <Target size={24}/> : i === 1 ? <Sparkles size={24}/> : <Users size={24}/>}
                    </div>
                    <div className="text-[10px] uppercase font-black text-[#9FD9F6] tracking-[0.3em] mb-2">{item.label}</div>
                    <div className="text-xl font-black text-white leading-tight tracking-tighter">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section id="hobbies" className="py-32 px-8 bg-white border-t border-stone-100">
        <div className="max-w-5xl mx-auto px-8"><div className="flex items-center space-x-6 mb-20"><Heart className={theme.accent} size={40} /><h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].hobbiesTitle}</h2></div><div className="grid grid-cols-1 md:grid-cols-3 gap-12">{getHobbiesList(lang).map((hobby, i) => (<div key={i} className="p-12 bg-stone-50 border border-transparent hover:border-[#9FD9F6] transition-all group rounded-sm shadow-sm hover:shadow-2xl"><div className={`w-16 h-16 bg-white text-slate-400 rounded-sm flex items-center justify-center mb-10 group-hover:bg-[#9FD9F6] group-hover:text-white transition-all shadow-sm`}>{i === 0 ? <Palette size={32} /> : i === 1 ? <Camera size={32} /> : <Languages size={32} />}</div><h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{hobby.name}</h3><p className="text-slate-500 text-base leading-[2] font-light italic">{hobby.desc}</p></div>))}</div></div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-stone-900 text-stone-400">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
            <div className="col-span-1"><span className="text-2xl font-black tracking-tighter text-stone-200 block mb-6">FEIXUE.C</span><p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-500">© 2026 Portfolio / Strategic Design</p></div>
            <div>
              <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Connect</h4>
              <ul className="space-y-6">
                <li><a href="https://github.com/Lizypeco" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#9FD9F6] transition-colors"><GithubIcon size={18}/><span className="text-[11px] font-bold tracking-widest uppercase">Github</span></a></li>
                <li><a href="https://student.redesigner.jp/students/45f6dc8985985cc5851f7bc0f624aba1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#9FD9F6] transition-colors"><LinkIcon size={18}/><span className="text-[11px] font-bold tracking-widest uppercase">ReDesigner</span></a></li>
                <li><a href="https://www.vivivit.com/zswphcto4kcqd42wofvx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#9FD9F6] transition-colors"><Palette size={18}/><span className="text-[11px] font-bold tracking-widest uppercase">Vivivit</span></a></li>
              </ul>
            </div>
            <div><h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Contact</h4><a href="mailto:lizych6668@gmail.com" className="flex items-center gap-4 hover:text-[#F59E0B] transition-colors"><Mail size={18}/><span className="text-[11px] font-bold tracking-widest uppercase">lizych6668@gmail.com</span></a></div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in duration-500">
            <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 p-3 bg-stone-100/80 backdrop-blur hover:bg-stone-200 rounded-sm transition-colors z-[60]"><X size={24} /></button>
            
            <div className="flex flex-col">
              {/* 封面图置顶：修正裁剪问题，使用 w-full h-auto */}
              <div className="w-full bg-stone-100 relative">
                <img src={selectedProject.img} alt="" className="w-full h-auto block" />
                {/* 标签固定在封面图右上角 */}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/95 backdrop-blur px-3 py-1 text-[8px] font-black tracking-widest uppercase text-slate-800 shadow-sm border border-stone-100">
                    {selectedProject.tag}
                  </span>
                </div>
              </div>

              {/* 内容区域 */}
              <div className="p-8 lg:p-16 bg-white">
                <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 tracking-tighter leading-tight">{selectedProject.title[lang]}</h2>
                <div className="w-12 h-1 bg-[#9FD9F6] mb-8"></div>
                
                <div className="space-y-10 mb-12">
                  {selectedProject.details?.[lang].map((item, idx) => (
                    <div key={idx} className="group">
                      <h4 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.4em] mb-3 group-hover:text-[#5BB2DF] transition-colors">{item.t}</h4>
                      <p className="text-slate-600 text-[13px] md:text-base leading-relaxed font-light whitespace-pre-line">{item.d}</p>
                      
                      {/* SoundShoes 特殊图组：功能特点板块 (修正后缀为 png) */}
                      {selectedProject.id === 1 && (item.t === "功能特点" || item.t === "特徴" || item.t === "Features") && (
                        <div className="mt-8 space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <img src="17.png" alt="Output 1" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                            <img src="19.png" alt="Output 2" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <img src="20.png" alt="Output 3" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                            <img src="22.png" alt="Output 4" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                          </div>
                        </div>
                      )}

                      {/* SoundShoes 特殊图组：制作过程 (修正后缀为 png) */}
                      {selectedProject.id === 1 && (item.t === "制作过程" || item.t === "プロセス" || item.t === "Process") && (
                        <div className="mt-8 grid grid-cols-2 gap-4">
                           <img src="asisjm.png" alt="User Analysis" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                           <img src="function tree.png" alt="Function Architecture" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                        </div>
                      )}

                      {/* FOREBIRD 特殊逻辑：功能特点下的图组 */}
                      {selectedProject.id === 3 && (item.t === "功能特点" || item.t === "特徴" || item.t === "Features") && (
                        <div className="mt-8 space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <img src="image 71.png" alt="Detail 1" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                            <img src="image 70.png" alt="Detail 2" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <img src="hud1.png" alt="HUD 1" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                            <img src="hud2.png" alt="HUD 2" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <img src="hud3.png" alt="HUD 3" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                            <img src="hud4.png" alt="HUD 4" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                          </div>
                        </div>
                      )}

                      {/* FOREBIRD 特殊逻辑：制作过程下的旅程地图 */}
                      {selectedProject.id === 3 && (item.t === "制作过程" || item.t === "プロセス" || item.t === "Process") && (
                        <div className="mt-8">
                          <img src="journeymap.png" alt="Journey Map" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                        </div>
                      )}

                      {/* 「文化官」工作坊 特殊逻辑：并列展示图片 */}
                      {selectedProject.id === 7 && (item.t === "成果" || item.t === "Results") && (
                        <div className="mt-8 grid grid-cols-2 gap-4">
                           <img src="workshop1.png" alt="Workshop System" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                           <img src="workshop2.png" alt="Workshop Flow" className="rounded-sm shadow-md border border-stone-100 w-full h-auto" />
                        </div>
                      )}

                      {/* Figma Embed (SoundShoes & 森林棋墙 专用) */}
                      {(item.t === "成果" || item.t === "Results") && selectedProject.figmaEmbedUrl && (
                        <div className="mt-8 rounded-sm overflow-hidden shadow-lg border border-stone-100">
                          <iframe style={{ border: "none" }} width="100%" height="500" src={selectedProject.figmaEmbedUrl} allowFullScreen title="Figma Embed"></iframe>
                        </div>
                      )}

                      {/* YouTube Embed */}
                      {(item.t === "成果" || item.t === "Results") && selectedProject.videoUrl && (
                        <div className="mt-8 aspect-video rounded-sm overflow-hidden shadow-lg border border-stone-100">
                          <iframe width="100%" height="100%" src={selectedProject.videoUrl} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                      )}
                      
                      {/* 立即体验链接 (驱散蚊子项目) */}
                      {(item.t === "成果" || item.t === "Results") && selectedProject.experienceUrl && (
                        <div className="mt-6">
                          <a href={selectedProject.experienceUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#9FD9F6]/20 text-[#5BB2DF] hover:bg-[#9FD9F6]/30 transition-all rounded-sm font-black text-sm uppercase tracking-widest group">
                            {t[lang].tryNow} 👉 {t[lang].experience} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-8 pt-8 border-t border-stone-100">
                  <h4 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.4em]">Links</h4>
                  <div className="flex flex-col gap-5">
                    {selectedProject.github && selectedProject.github !== "#" && (
                      <a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-900 hover:text-orange-500 transition-colors group">
                        <GithubIcon size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="font-black text-xs tracking-widest uppercase border-b border-stone-100 group-hover:border-orange-200">GitHub Source</span>
                      </a>
                    )}
                    {selectedProject.figma && selectedProject.figma !== "#" && (
                      <a href={selectedProject.figma} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-slate-900 hover:text-orange-500 transition-colors group">
                        <ExternalLink size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="font-black text-xs tracking-widest uppercase border-b border-stone-100 group-hover:border-orange-200">Figma Prototype</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;