import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
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
  Coffee
} from 'lucide-react';

/**
 * 本地部署核心提醒：
 * 1. 所有图片文件（.jpg/.png）必须放在本地项目的 /public 文件夹下。
 * 2. 代码中的 "/文件名" 路径会自动指向 /public 目录。
 */

const App = () => {
  const [lang, setLang] = useState('jp');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');
  
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollInterval = useRef(null);

  const sections = ['profile', 'education', 'projects', 'other', 'showcase', 'research', 'hobbies'];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 180 && rect.bottom >= 180;
        }
        return false;
      });
      if (current) setActiveSection(current);
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
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += direction * 8;
      }
    }, 16);
  };

  const stopScrolling = () => {
    if (scrollInterval.current) {
      clearInterval(scrollInterval.current);
      scrollInterval.current = null;
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const threshold = 150; 

    if (x < threshold) {
      startScrolling(-1);
    } else if (x > rect.width - threshold) {
      startScrolling(1);
    } else {
      stopScrolling();
    }
  };

  const theme = {
    primaryText: "text-[#5BB2DF]", 
    primaryBg: "bg-[#9FD9F6]",
    accent: "text-[#F59E0B]",
    accentBg: "bg-[#F59E0B]",
    lightAccent: "bg-orange-50 text-orange-700",
    lightPrimary: "bg-[#9FD9F6]/20 text-[#5BB2DF]",
    border: "border-[#9FD9F6]/30",
    bg: "bg-stone-50",
    card: "bg-white",
    textMain: "text-slate-800",
    textMuted: "text-slate-500"
  };

  const t = {
    zh: {
      name: "陈 霏雪",
      nameEn: "CHEN FEIXUE",
      nameKana: "チェンフェイシュエ",
      role: "设计师 / UX与战略研究员",
      intro: "以好奇心为原动力洞察结构，并将其重构为体验。追求实现可能性的诚实与多维度的表达，心怀对社会的责任与作为设计师的喜悦，去实现有价值的体验。",
      nav: ["个人简介", "教育经历", "主要作品", "其它作品", "作品集展", "修士研究", "个人兴趣"],
      eduTitle: "教育经历",
      actTitle: "学外活动・实习・获奖",
      projectTitle: "主要作品",
      otherWorksTitle: "其它作品",
      researchTitle: "修士研究",
      hobbiesTitle: "个人兴趣",
      links: "外部链接",
      methodsTitle: "STEPS",
      theoryTitle: "核心理论",
      researchSubject: "基于烹饪疗法及回想疗法的面向高龄者的回忆食谱生成方法研究",
      researchSummary: "该研究利用融合了回想疗法与烹饪疗法的对话型AI，从高龄者的“饮食记忆”中生成回忆食谱，旨在支持其居家独立生活（Aging-in-Place）并提升生活意欲。",
      theories: [
        { t: "回想疗法", d: "通过唤起过去的生活经验与记忆，提升患者的认知功能与幸福感。" },
        { t: "烹饪疗法", d: "利用备餐与烹饪过程作为康复手段，促进身体机能与社会化参与。" }
      ],
      coreLabels: ["使命", "技术", "核心"],
      coreValues: ["居家养老", "对话型AI", "饮食记忆"],
      steps: [
        { t: "文献调查与主题确立 (已完成)", d: "确认回想与烹饪疗法结合的有效性，针对现有工具缺乏情感关怀的痛点确立方向。" },
        { t: "访谈与设计原则确立 (已完成)", d: "收集饮食记忆叙事，揭示季节性重要性。确立重现历史文脉与餐桌风景的设计原则。" },
        { t: "初代原型设计与开发 (迭代中)", d: "开发对话Web应用，独创“3阶段对话逻辑”。增加对共餐者、餐具等周边元素的唤醒提问。" },
        { t: "二次调查与认知建模 (计划中)", d: "在居家厨房通过陌材料理测试变量。产出高龄者新菜习得认知地图与痛点映射。" },
        { t: "原型整合与专家评估 (计划中)", d: "落实“大画面、动作原子化”UI策略。通过启发式评估提前排查系统隐患。" },
        { t: "用户测试与效能验证 (计划中)", d: "在真实动线中验证系统能否显著提升老年人的自我效能感与料理意愿。" }
      ]
    },
    jp: {
      name: "陳 霏雪",
      nameEn: "CHEN FEIXUE",
      nameKana: "チェンフェイシュエ",
      role: "デザイナー / UXとストラテジック研究者",
      intro: "好奇心を原動力に構造を捉え、体験として再構築する。実現可能性への誠実さと多角的な表現を追求し、社会への責任とデザイナーとしての喜びを胸に、価値ある体験を実装します。",
      nav: ["プロフィール", "学歴", "主要作品", "その他作品", "作品集", "修士研究", "趣味"],
      eduTitle: "学歴",
      actTitle: "学外活動・インターン・受賞",
      projectTitle: "主要作品",
      otherWorksTitle: "その他作品",
      researchTitle: "修士研究",
      hobbiesTitle: "個人趣味",
      links: "外部リンク",
      methodsTitle: "STEPS",
      theoryTitle: "核心理論",
      researchSubject: "料理療法および回想療法に基づく高齢者の思い出レシピ生成手法の研究",
      researchSummary: "回想療法と料理療法を融合した対話型AIを用いて、高齢者の『食の記憶』から思い出のレシピを生成し、在宅での自立生活（エイジング-イン-プレイス）と意欲向上を支援する研究です。",
      theories: [
        { t: "回想療法", d: "過去の経験や記憶を呼び起こすことで、認知機能の維持や幸福感を高める心理療法。" },
        { t: "料理療法", d: "調理工程をリハビリとして活用し、身体機能や社会性の向上を目指す支援手法。" }
      ],
      coreLabels: ["ミッション", "テクノロジー", "核心"],
      coreValues: ["エイジング・イン・プレイス", "対話型AI", "食の記憶"],
      steps: [
        { t: "文献調査とテーマ確立 (完了)", d: "回想法と料理療法の有効性を確認。既存ツールの情緒配慮不足を解決する方向性を確定。" },
        { t: "質的調査とDP策定 (完了)", d: "調理・交流を軸にインタビュー。季節性の重要性を解明し、食卓風景の再現などDPを策定。" },
        { t: "プロトタイプ1開発 (反復中)", d: "3段階の対話ロジックを実装。食材だけでなく、共食者や行事など周辺要素への質問を統合。" },
        { t: "第2回調査と認知モデル (計画中)", d: "自宅で未知の料理を用いた変数制御テストを実施。新メニュー習得の認知マップと痛点を可視化。" },
        { t: "全機能統合と専門家評価 (計画中)", d: "画面大型化・手順原子化をUIに反映。ヒューリスティック評価によりシステム排查を実施。" },
        { t: "最終ユーザーテスト (計画中)", d: "実際の動線で検証。システム介入が高齢者の自己効能感と料理意欲を向上させるかを実証。" }
      ]
    },
    en: {
      name: "Chen Feixue",
      nameEn: "CHEN FEIXUE",
      nameKana: "チェンフェイシュエ",
      role: "Designer / UX & Strategic Researcher",
      intro: "Driven by curiosity, I decode structures to reconstruct them into experiences. Balancing technical feasibility with multifaceted expression, I implement valuable experiences with social responsibility and the joy of design.",
      nav: ["Profile", "Education", "Projects", "Other", "Showcase", "Research", "Hobbies"],
      eduTitle: "Education History",
      actTitle: "Extracurricular Activities & Awards",
      projectTitle: "Key Projects",
      otherWorksTitle: "Other Works",
      researchTitle: "Master's Research",
      hobbiesTitle: "Personal Interests",
      links: "External Links",
      methodsTitle: "STEPS",
      theoryTitle: "Core Theories",
      researchSubject: "Research on a Method for Generating Nostalgic Recipes for Older Adults Based on Culinary Therapy and Reminiscence Therapy",
      researchSummary: "Using an interactive AI that integrates reminiscence and culinary therapy to generate nostalgic recipes from the 'food memories' of older adults, supporting Aging-in-Place and enhancing motivation for independent living.",
      theories: [
        { t: "Reminiscence Therapy", d: "A process of recalling past life experiences to boost cognitive function and well-being." },
        { t: "Culinary Therapy", d: "Using meal preparation as a therapeutic tool for physical and social rehabilitation." }
      ],
      coreLabels: ["Mission", "Tech", "Core"],
      coreValues: ["Aging-in-Place", "Dialogue AI", "Food Memory"],
      steps: [
        { t: "Literature & Theme (Done)", d: "Confirmed the efficacy of therapy fusion. Aimed at emotional care lacking in current AI tools." },
        { t: "Interview & DP (Done)", d: "Identified festive context insights. Established Design Principles for historical context." },
        { t: "Prototype 1 (Iterating)", d: "Developed a 3-stage dialogue logic. Integrated companion and utensil cues for memory triggering." },
        { t: "Fieldwork 2 & Modeling (Planned)", d: "Tested learning modes with unfamiliar recipes in real kitchens. Mapped cognitive maps and pain-points." },
        { t: "Integration & Expert Review (Planned)", d: "Applied UI atomization strategies. Conducted heuristic evaluations to preempt system risks." },
        { t: "User Test & Validation (Planned)", d: "Verified results in real kitchen flows to confirm boosts in self-efficacy and cooking intent." }
      ]
    }
  };

  const educationData = [
    {
      year: "2019.09 - 2024.07",
      title: { zh: "华南理工大学 设计学院", jp: "華南理工大学 設計学院", en: "South China University of Technology, School of Design" },
      desc: { zh: "2021年9月，由机械类专业转入设计学院。学习工科逻辑与设计思维的融合。", jp: "2021年9月、機械系学部からデザイン学部へ転部。工学的思考とデザイン思考の融合を学ぶ。", en: "In September 2021, transferred from Engineering to Design. Learned to merge engineering logic with design thinking." }
    },
    {
      year: "2023.10 - 2024.03",
      title: { zh: "九州大学 艺术工学部 (交换留学)", jp: "九州大学 芸術工学部 (交換留学)", en: "Kyushu University (Exchange Program)" },
      desc: { zh: "触及设计思维的本质，并决定在日本深造。", jp: "デザイン思考の本質に触れ、日本での進学を決意。", en: "Experienced the depth of design thinking and decided to pursue further studies in Japan." }
    },
    {
      year: "2024.04 - Present",
      title: { zh: "九州大学大学院 艺术工学府 硕士课程", jp: "九州大学大学院 芸術工学府 修士課程", en: "Kyushu University Graduate School of Design (Master)" },
      desc: { zh: "战略设计专攻。研究高龄者支援及医疗保健设计。", jp: "ストラテジックデザインコース在籍。高齢者支援やヘルスケアデザインを研究。", en: "Strategic Design Course. Researching elderly support and healthcare design." }
    }
  ];

  const activities = [
    {
      year: "2023.07 - 09",
      title: { zh: "广州・平面设计长期实习", jp: "広州・グラフィックデザイン長期インターン", en: "Graphic Design Internship in Guangzhou" },
      desc: { zh: "负责公园展示板及科普牌设计，成果已在当地落地设置。", jp: "公園の看板や広報パネルのデザインを担当。実物が現地に設置された。", en: "Designed public park information boards and panels (deployed)." }
    },
    {
      year: "2024.10",
      title: { zh: "Global Game Jam (GGJ) 工作坊", jp: "Global Game Jam Workshop", en: "Global Game Jam Workshop" },
      desc: { zh: "参与短期的游戏策划与原型开发。", jp: "短期間での游戏企画・プロトタイプ開発に参加。", en: "Participated in rapid game planning and prototyping." }
    },
    {
      year: "2025.08",
      title: { zh: "丰田汽车 UI/UX 实习", jp: "トヨタ UI/UX インターンシップ", en: "Toyota UI/UX Internship" },
      desc: { zh: "通过实地调研在短时间内构建并发表全新服务企划。", jp: "現地調査から新規サービス企画面を短期間で構築。", en: "Developed new service concepts based on field research." }
    },
    {
      year: "2026.01",
      title: { zh: "TAKI CORPORATION UI/UX 实习", jp: "たきコーポレーション UI/UX インターン", en: "TAKI CORPORATION UI/UX Internship" },
      desc: { zh: "从调研分析到UI设计，一站式制作并发表APP提案。", jp: "調査からUI設計まで一貫してアプリ案を制作・発表。", en: "Produced and presented app proposals from research to UI design." }
    }
  ];

  const projects = [
    {
      id: 1,
      title: { zh: "SoundShoes", jp: "SoundShoes", en: "SoundShoes" },
      tag: "UI/UX / Healthcare",
      img: "/1078123059.jpg",
      summary: { zh: "利用脚步声反馈辅助帕金森患者进行步行康复训练。", jp: "足音のフィードバックを用いたパーキンソン病患者の歩行リハビリ支援。", en: "Gait rehabilitation support for Parkinson's patients using auditory feedback." },
      details: { zh: "以“穿上声音”为概念，将枯燥的康复训练重新设计为趣味性的体验。在降低认知负荷的同时，提供与空间认知相结合的自然线索。", jp: "「音を履く」をコンセプトに、单调なリハビリを楽しい体验へと再設計。認知負荷を抑えつつ、空間认知と結びつく自然な手がかりを提供します。", en: "Re-designed monotonous rehab into an engaging experience under the concept 'Wear the Sound'. Provides natural spatial cues while minimizing cognitive load." },
      github: "https://github.com/Lizypeco",
      figma: "https://figma.com/file/soundshoes-proto"
    },
    {
      id: 2,
      title: { zh: "玄武 (GENBU)", jp: "玄武 (GENBU)", en: "GENBU" },
      tag: "Product Design / IoT",
      img: "/38.jpg",
      summary: { zh: "自动检测溺水者并进行夹取托举的智能救助平台。", jp: "溺水者を自動検知し、夾んで托挙するインテリジェント救助プラットフォーム。", en: "Intelligent rescue platform that detects and lifts drowning victims." },
      details: { zh: "结合图像识别与路径优化算法，即使对移动中的溺水者也能以最短时间到达。采用可拆解结构，安全托举溺水者。", jp: "画像認識と経路最適化アルゴリズムを組み合わせ、動く溺水者に対しても最短時間で到達。可解体構造で溺水者を安全に托挙します。", en: "Combines image recognition and path optimization. Features a decomposable structure to securely lift drowning victims from both sides." },
      github: "#",
      figma: "https://figma.com/file/genbu-proto"
    },
    {
      id: 3,
      title: { zh: "Kaavo", jp: "Kaavo", en: "Kaavo" },
      tag: "Service Design / Ecology",
      img: "/56.jpg",
      summary: { zh: "以CO2为资源的未来型宠物食品订阅服务。", jp: "CO2を資源とする未来型ペットフード・サブスクリプション服务。", en: "Future pet food subscription service using CO2 as a resource." },
      details: { zh: "通过专用牵引绳在散步时回收CO2。提议将回收的CO2在社区驿站转化为生物蛋白的生态系统。", jp: "専用リードで散歩中にCO2を回収。回収されたCO2を地域のステーションでタンパク源へ変換するエコシステムを提案。", en: "Captures CO2 during walks using a specialized leash. Proposed an ecosystem where captured CO2 is exchanged for bio-protein at local stations." },
      github: "#",
      figma: "https://figma.com/file/kaavo-proto"
    }
  ];

  const otherWorks = [
    "/01.jpg", "/02.jpg", "/03.png", "/04.jpg", "/05.png", 
    "/06.jpg", "/07.jpg", "/08.jpg", "/09.jpg", "/10.png",
    "/11.jpg", "/12.png", "/13.jpg", "/14.jpg", "/15.jpg"
  ];

  const getHobbiesList = (l) => l === 'zh' ? [
    { name: "水彩画", desc: "观察生命的律动，通过解读与表达记录时光。" },
    { name: "动物观察", desc: "从日常潜伏的生命微小动作中汲取灵感。" },
    { name: "语言学习", desc: "为了提高对新世界认知清晰度的挑战。" }
  ] : (l === 'jp' ? [
    { name: "水彩画", desc: "生命の躍動を観察し、解釈して表現する時間。" },
    { name: "動物観察", desc: "日常に潜む生命の細かな動きからインスピレーションを得る。" },
    { name: "言語学習", desc: "新しい世界の解像度を高めるための挑戦。" }
  ] : [
    { name: "Watercolor", desc: "Observing, interpreting, and expressing the vitality of life." },
    { name: "Animal Observation", desc: "Finding inspiration in the subtle movements of daily life." },
    { name: "Language Learning", desc: "A challenge to increase the resolution of a new world." }
  ]);

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.textMain} font-sans selection:bg-[#9FD9F6]/30`}>
      {/* Navigation with Scroll Dot */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <span className={`text-xl font-bold tracking-tighter ${theme.primaryText}`}>FEIXUE.C</span>
          <div className="hidden md:flex items-center space-x-10">
            {t[lang].nav.map((item, i) => (
              <a 
                key={i} 
                href={`#${sections[i]}`} 
                className={`relative flex flex-col items-center group transition-all duration-300 uppercase tracking-[0.2em] text-[10px] ${activeSection === sections[i] ? 'text-slate-900 font-black' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <span>{item}</span>
                <div className={`mt-1.5 w-1 h-1 rounded-full transition-all duration-300 ${activeSection === sections[i] ? 'bg-[#F59E0B] scale-150 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-transparent group-hover:bg-slate-300'}`}></div>
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-3 bg-stone-100/80 px-4 py-2 rounded-full border border-stone-200/50">
            <Languages size={14} className="text-stone-400" />
            <div className="flex items-center gap-3 text-[10px] font-black tracking-widest">
              <button onClick={() => setLang('en')} className={`${lang === 'en' ? theme.accent : 'text-stone-400'} hover:text-slate-900 transition-colors uppercase`}>EN</button>
              <span className="text-stone-200">|</span>
              <button onClick={() => setLang('zh')} className={`${lang === 'zh' ? theme.accent : 'text-stone-400'} hover:text-slate-900 transition-colors`}>中</button>
              <span className="text-stone-200">|</span>
              <button onClick={() => setLang('jp')} className={`${lang === 'jp' ? theme.accent : 'text-stone-400'} hover:text-slate-900 transition-colors`}>日</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="profile" className="min-h-screen flex items-center px-8 pt-20 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none">
          <span className="text-[18vw] font-black text-stone-200/40 tracking-tighter uppercase whitespace-nowrap">PORTFOLIO</span>
        </div>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start justify-between gap-16 md:gap-24 relative z-10">
          <div className="md:w-5/12">
            <div className={`inline-block px-4 py-1.5 mb-10 ${theme.primaryBg} text-slate-800 rounded-sm text-[10px] font-black tracking-[0.3em] uppercase`}>Design Strategy & Experience</div>
            <div className="mb-10">
              <h1 className="text-5xl md:text-6xl font-black mb-2 tracking-tighter text-slate-900 leading-none whitespace-nowrap">{t[lang].name}</h1>
              <p className="text-[11px] md:text-[13px] font-bold tracking-[0.3em] text-slate-400 uppercase leading-relaxed">{t[lang].nameEn}</p>
              <p className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-slate-300">{t[lang].nameKana}</p>
            </div>
            <p className={`text-sm md:text-base ${theme.textMuted} font-bold tracking-[0.2em] uppercase`}>{t[lang].role}</p>
          </div>
          <div className="md:w-6/12 mt-12 md:mt-0">
            <p className="text-lg md:text-2xl text-slate-700 font-light tracking-[0.05em] leading-[2.8] whitespace-pre-line border-l border-stone-200 pl-8 md:pl-12">{t[lang].intro}</p>
            <div className="mt-16 flex flex-col items-start gap-4 animate-bounce opacity-40">
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-slate-400">Scroll Down</span>
              <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex justify-center p-1"><div className="w-1 h-2 bg-slate-300 rounded-full"></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-32 bg-white border-y border-stone-100">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex items-center space-x-6 mb-20">
            <GraduationCap className={theme.primaryText} size={40} />
            <h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].eduTitle}</h2>
          </div>
          <div className="space-y-20">
            {educationData.map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row md:space-x-20 group">
                <div className="md:w-1/4 text-stone-300 font-mono text-sm pt-2 mb-4 md:mb-0 tracking-[0.2em] font-bold">{item.year}</div>
                <div className={`md:w-3/4 border-l-4 border-stone-50 pl-12 pb-4 group-last:border-transparent transition-all group-hover:border-[#9FD9F6]`}>
                  <h3 className="text-3xl font-black mb-4 group-hover:text-slate-900 transition-colors leading-tight">{item.title[lang]}</h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-light">{item.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>
          <div id="activities" className="mt-24 border-t border-stone-100 pt-16">
            <button onClick={() => setShowActivities(!showActivities)} className={`flex items-center space-x-6 ${theme.primaryText} font-black hover:text-[#F59E0B] transition-colors uppercase tracking-[0.3em] text-sm`}>
              <Briefcase size={24} /><span>{t[lang].actTitle}</span>
              <div className={`transition-transform duration-500 ${showActivities ? 'rotate-180' : ''}`}><ChevronDown size={24} /></div>
            </button>
            <div className={`overflow-hidden transition-all duration-700 ${showActivities ? 'max-h-[1500px] opacity-100 mt-16' : 'max-h-0 opacity-0'}`}>
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

      {/* Projects */}
      <section id="projects" className="py-32 px-8 bg-stone-100/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-6 mb-20">
            <Palette className={theme.primaryText} size={40} />
            <h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].projectTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-sm shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden border border-stone-100" onClick={() => setSelectedProject(project)}>
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                  <img src={project.img} alt="" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-[1.5s]" />
                  <div className="absolute top-6 left-6"><span className="bg-white/95 backdrop-blur px-4 py-1.5 text-[10px] font-black tracking-widest uppercase text-slate-800 shadow-sm border border-stone-100">{project.tag}</span></div>
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-black mb-4 flex justify-between items-center text-slate-900 group-hover:text-[#5BB2DF] transition-colors leading-tight">{project.title[lang]}<ChevronRight size={24} className="text-stone-300 group-hover:text-[#F59E0B] transform group-hover:translate-x-2 transition-all" /></h3>
                  <p className="text-slate-500 text-sm leading-relaxed font-light line-clamp-2">{project.summary[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Works Section with Slider Progress */}
      <section id="other" className="py-32 px-8 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-4xl font-black tracking-tighter uppercase mb-2">{t[lang].otherWorksTitle}</h2>
          <div className="w-20 h-1 bg-[#9FD9F6]"></div>
        </div>
        <div className="relative group/container" onMouseMove={handleMouseMove} onMouseLeave={stopScrolling}>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none opacity-0 group-hover/container:opacity-100 transition-opacity flex items-center justify-start pl-4 text-stone-300">
            <ChevronRight className="rotate-180" size={32} />
          </div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none opacity-0 group-hover/container:opacity-100 transition-opacity flex items-center justify-end pr-4 text-stone-300">
            <ChevronRight size={32} />
          </div>
          <div ref={scrollRef} onScroll={handleScrollProgress} className="flex space-x-8 overflow-x-auto pb-10 scrollbar-hide px-4 mask-fade relative z-10 cursor-ew-resize">
            {otherWorks.map((img, i) => (
              <div key={i} className="flex-none group relative overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-all duration-500 h-64 md:h-80">
                <img src={img} alt={`Work ${i}`} className="h-full w-auto object-contain bg-stone-50 group-hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
          <div className="max-w-xl mx-auto mt-6 bg-stone-100 h-0.5 relative rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full bg-[#9FD9F6] transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }}></div>
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section id="showcase" className="py-32 px-8 bg-stone-50 border-y border-stone-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-6 mb-20">
            <Target className={theme.primaryText} size={40} />
            <h2 className="text-4xl font-black tracking-tighter uppercase">Portfolio Showcase</h2>
          </div>
          <div className="relative aspect-video w-full rounded-sm overflow-hidden shadow-2xl border border-stone-200">
            <iframe style={{ border: "none", width: "100%", height: "100%" }} src="https://embed.figma.com/proto/rvu2cxmbU4f7lg8rewR6s1/PF-for-website?node-id=1-2529&p=f&viewport=252%2C-746%2C0.11&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#9FD9F6]/5 pointer-events-none skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex items-center space-x-6 mb-20">
            <BookOpen className="text-[#9FD9F6]" size={40} />
            <h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].researchTitle}</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <h3 className="text-xl md:text-2xl font-black mb-10 leading-relaxed text-white tracking-tight border-l-4 border-[#9FD9F6] pl-8 max-w-3xl">{t[lang].researchSubject}</h3>
              <p className="text-slate-300 leading-[2.2] text-lg mb-16 font-light italic">{t[lang].researchSummary}</p>
              <div className="mt-10">
                <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-12 text-[#9FD9F6] border-b border-white/10 pb-4 inline-block">{t[lang].methodsTitle}</h4>
                <ul className="space-y-12 text-sm relative">
                  <div className="absolute left-[9px] top-4 bottom-4 w-0.5 bg-white/5"></div>
                  {t[lang].steps.map((step, i) => (
                    <li key={i} className={`group relative pl-12 ${i === 2 ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}>
                      {i === 2 ? (
                        <a href="https://gemini.google.com/share/6c123f0d0e8f" target="_blank" rel="noopener noreferrer" className="block">
                          <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-[#9FD9F6] z-10 group-hover:bg-[#9FD9F6] transition-colors"></div>
                          <div className="mb-4">
                            <div className="flex items-center gap-4 mb-2">
                              <span className="text-[#9FD9F6] font-mono font-black text-xs uppercase tracking-widest whitespace-nowrap">Stage 0{i+1}</span>
                              <div className="font-black text-white text-base uppercase tracking-wider leading-tight flex items-center gap-2">{step.t} <ExternalLink size={14} className="text-[#F59E0B]" /></div>
                            </div>
                            <div className="text-[13px] text-slate-400 font-light leading-relaxed max-w-2xl">{step.d}</div>
                          </div>
                          <div className="rounded-sm overflow-hidden border border-white/10 shadow-2xl mt-4 max-w-lg group-hover:border-[#9FD9F6]/30 transition-colors">
                            <img src="/recipe.png" alt="Dialogue System" className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </a>
                      ) : (
                        <>
                          <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-[#9FD9F6] z-10 group-hover:bg-[#9FD9F6] transition-colors"></div>
                          <div className="mb-4">
                            <div className="flex items-center gap-4 mb-2">
                              <span className="text-[#9FD9F6] font-mono font-black text-xs uppercase tracking-widest whitespace-nowrap">Stage 0{i+1}</span>
                              <div className="font-black text-white text-base uppercase tracking-wider leading-tight">{step.t}</div>
                            </div>
                            <div className="text-[13px] text-slate-400 font-light leading-relaxed max-w-2xl">{step.d}</div>
                          </div>
                          {i === 3 && (
                            <div className="rounded-sm overflow-hidden border border-white/10 shadow-2xl mt-4 max-w-lg group-hover:border-[#9FD9F6]/30 transition-colors">
                              <img src="/recipe-image.png" alt="UI Flow" className="w-full h-auto opacity-80 group-hover:opacity-100 transition-opacity" />
                            </div>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-4 space-y-6 sticky top-32">
              <div className="space-y-4 mb-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-2 mb-4">{t[lang].theoryTitle}</h4>
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
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 ml-2 mb-4">Selling Points</h4>
                {[
                  { icon: <Target size={24}/>, label: t[lang].coreLabels[0], val: t[lang].coreValues[0] },
                  { icon: <Sparkles size={24}/>, label: t[lang].coreLabels[1], val: t[lang].coreValues[1] },
                  { icon: <Users size={24}/>, label: t[lang].coreLabels[2], val: t[lang].coreValues[2] }
                ].map((item, i) => (
                  <div key={i} className="bg-[#9FD9F6]/5 border border-[#9FD9F6]/10 p-8 rounded-sm hover:bg-[#9FD9F6]/10 transition-all group shadow-xl">
                    <div className="text-[#F59E0B] mb-4 group-hover:scale-110 transition-transform origin-left">{item.icon}</div>
                    <div className="text-[10px] uppercase font-black text-[#9FD9F6] tracking-[0.3em] mb-2">{item.label}</div>
                    <div className="text-xl font-black text-white leading-tight tracking-tighter">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="hobbies" className="py-32 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center space-x-6 mb-20">
            <Heart className={theme.accent} size={40} />
            <h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].hobbiesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {getHobbiesList(lang).map((hobby, i) => (
              <div key={i} className="p-12 bg-stone-50 border border-transparent hover:border-[#9FD9F6] transition-all group rounded-sm shadow-sm hover:shadow-2xl">
                <div className={`w-16 h-16 bg-white text-slate-400 rounded-sm flex items-center justify-center mb-10 group-hover:bg-[#9FD9F6] group-hover:text-white transition-all shadow-sm`}>
                  {i === 0 ? <Palette size={32} /> : i === 1 ? <Camera size={32} /> : <Languages size={32} />}
                </div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{hobby.name}</h3>
                <p className="text-slate-500 text-base leading-[2] font-light italic">{hobby.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-24 bg-stone-900 text-stone-400">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10">
            <div className="col-span-1">
              <span className="text-2xl font-black tracking-tighter text-stone-200 block mb-6">FEIXUE.C</span>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-stone-500">© 2026 Portfolio / Strategic Design</p>
            </div>
            <div>
              <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Connect</h4>
              <ul className="space-y-6">
                <li><a href="https://github.com/Lizypeco" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#9FD9F6] transition-colors"><Github size={18}/><span className="text-[11px] font-bold tracking-widest uppercase">Github</span></a></li>
                <li><a href="https://student.redesigner.jp/students/45f6dc8985985cc5851f7bc0f624aba1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#9FD9F6] transition-colors"><LinkIcon size={18}/><span className="text-[11px] font-bold tracking-widest uppercase">ReDesigner</span></a></li>
                <li><a href="https://www.vivivit.com/zswphcto4kcqd42wofvx" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 hover:text-[#9FD9F6] transition-colors"><Palette size={18}/><span className="text-[11px] font-bold tracking-widest uppercase">Vivivit</span></a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8">Contact</h4>
              <a href="mailto:lizych6668@gmail.com" className="flex items-center gap-4 hover:text-[#F59E0B] transition-colors"><Mail size={18}/><span className="text-[11px] font-bold tracking-widest uppercase">lizych6668@gmail.com</span></a>
            </div>
          </div>
        </div>
      </footer>

      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in fade-in zoom-in duration-500">
            <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 p-3 bg-stone-100 hover:bg-stone-200 rounded-sm transition-colors z-10"><X size={24} /></button>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-7/12 bg-stone-100"><img src={selectedProject.img} alt="" className="w-full h-full object-contain lg:object-cover min-h-[500px]" /></div>
              <div className="lg:w-5/12 p-12 lg:p-20">
                <span className="text-[11px] font-black text-[#F59E0B] uppercase tracking-[0.3em] block mb-6">{selectedProject.tag}</span>
                <h2 className="text-4xl md:text-5xl font-black mb-10 text-slate-900 tracking-tighter leading-tight">{selectedProject.title[lang]}</h2>
                <div className="w-16 h-1.5 bg-[#9FD9F6] mb-10"></div>
                <p className="text-slate-600 leading-[2.2] mb-12 text-xl font-light italic">{selectedProject.details[lang]}</p>
                <div className="space-y-10">
                  <h4 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.5em] border-b border-stone-100 pb-4">{t[lang].links}</h4>
                  <div className="flex flex-col space-y-6">
                    {selectedProject.github !== "#" && (<a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center space-x-6 text-slate-900 hover:text-orange-500 transition-colors group"><Github size={28} className="group-hover:scale-110 transition-transform" /><span className="font-black text-sm tracking-widest uppercase border-b-2 border-stone-100 group-hover:border-orange-200">GitHub Source</span></a>)}
                    {selectedProject.figma !== "#" && (<a href={selectedProject.figma} target="_blank" rel="noreferrer" className="flex items-center space-x-4 text-slate-800 hover:text-orange-500 transition-colors group"><ExternalLink size={28} className="group-hover:scale-110 transition-transform" /><span className="font-black text-sm tracking-widest uppercase border-b-2 border-stone-100 group-hover:border-orange-200">Figma Prototype</span></a>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade { mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }
      `}</style>
    </div>
  );
};

export default App;