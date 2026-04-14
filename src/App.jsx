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
  Coffee
} from 'lucide-react';

/**
 * 最终修复版说明：
 * 1. 样式重置：通过内置 style 标签强制覆盖 Vite 的干扰样式，确保排版整齐。
 * 2. 姓名还原：CHEN FEIXUE 下方保留片假名读音。
 * 3. 职位还原：改回 "デザイナー"。
 * 4. 图片适配：全部使用 .png 后缀和相对路径（不带斜杠）。
 */

// --- 静态数据 ---
const educationData = [
  {
    year: "2019.09 - 2024.07",
    title: { zh: "华南理工大学 设计学院", jp: "華南理工大学 設計学院", en: "South China University of Technology, School of Design" },
    desc: { zh: "2021年9月，由机械类专业转入设计学院。学习工科逻辑与设计思维的融合。", jp: "2021年9月、機械系学部からデザイン学部へ転部。工学的思考とデザイン思考の融合を学ぶ。", en: "In September 2021, transferred from Engineering to Design." }
  },
  {
    year: "2023.10 - 2024.03",
    title: { zh: "九州大学 艺术工学部 (交换留学)", jp: "九州大学 芸術工学部 (交換留学)", en: "Kyushu University (Exchange Program)" },
    desc: { zh: "触及设计思维的本质，并决定在日本深造。", jp: "デザイン思考の本質に触れ、日本での進学を決意。", en: "Decided to pursue studies in Japan." }
  },
  {
    year: "2024.10 - 2025.03",
    title: { zh: "九州大学大学院 艺术工学府 研究生", jp: "九州大学大学院 芸術工学府 研究生", en: "Kyushu University (Research Student)" },
    desc: { zh: "改进修士研究方向，参加设计工作坊。", jp: "修士研究の方向性を改善し、デザインワークショップに参加。", en: "Refined research direction." }
  },
  {
    year: "2025.04 - Present",
    title: { zh: "九州大学大学院 艺术工学府 硕士课程", jp: "九州大学大学院 芸術工学府 修士課程", en: "Kyushu University (Master's Course)" },
    desc: { zh: "战略设计专攻。研究高龄者支援及医疗保健设计。", jp: "ストラテジックデザインコース在籍。高齢者支援やヘルスケアデザインを研究。", en: "Strategic Design Course." }
  }
];

const activities = [
  {
    year: "2023.07 - 09",
    title: { zh: "广州・平面设计长期实习", jp: "広州・グラフィックデザイン長期インターン", en: "Graphic Design Internship" },
    desc: { zh: "负责公园展示板及科普牌设计，成果已落地设置。", jp: "公園の看板や広報パネルのデザインを担当。実物が現地に設置された。", en: "Designed public information boards." }
  },
  {
    year: "2024.10",
    title: { zh: "Global Game Jam 工作坊", jp: "Global Game Jam Workshop", en: "Global Game Jam Workshop" },
    desc: { zh: "参与短期的游戏策划与原型开发。", jp: "短期間でのゲーム企画・プロトタイプ開発に参加。", en: "Game planning and prototyping." }
  },
  {
    year: "2025.08",
    title: { zh: "丰田汽车 UI/UX 实习", jp: "トヨタ UI/UX インターンシップ", en: "Toyota UI/UX Internship" },
    desc: { zh: "通过实地调研构建并发表全新服务企划。", jp: "現地調査から新規サービス企画面を構築。", en: "Service design based on fieldwork." }
  },
  {
    year: "2026.01",
    title: { zh: "TAKI CORPORATION UI/UX 实习", jp: "たきコーポレーション UI/UX インターン", en: "TAKI CORPORATION UI/UX Internship" },
    desc: { zh: "从调研到 UI 设计一站式制作 APP 提案。", jp: "調査からUI設計まで一貫してアプリ案を制作・発表。", en: "Produced app proposals from research to UI." }
  }
];

const projectData = [
  { id: 1, title: { zh: "SoundShoes", jp: "SoundShoes", en: "SoundShoes" }, tag: "Healthcare", img: "1078123059.png", summary: { zh: "利用脚步声反馈辅助帕金森患者康复训练。", jp: "足音のフィードバックを用いたパーキンソン病患者の歩行リハビリ支援。", en: "Gait rehab support." }, github: "https://github.com/Lizypeco", figma: "https://figma.com/file/soundshoes-proto" },
  { id: 2, title: { zh: "驱散『力』", jp: "カを追い払う", en: "Drive Away 'CHIKARA'" }, tag: "AI Art", img: "24.png", summary: { zh: "基于AI辅助的视听交互装置。", jp: "AIを活用したVibe Codingによる視聴覚インスタレーション。", en: "Audio-visual installation." }, github: "https://github.com/Lizypeco", figma: "#" },
  { id: 3, title: { zh: "FOREBIRD", jp: "FOREBIRD", en: "FOREBIRD" }, tag: "Mobility", img: "28.png", summary: { zh: "面向观鸟初学者的体验型载具设计。", jp: "バードウォッチング初心者向けの体験用車両。", en: "Vehicle for birdwatching." }, github: "#", figma: "#" },
  { id: 4, title: { zh: "GENBU", jp: "けんぶ", en: "GENBU" }, tag: "Rescue IoT", img: "38.png", summary: { zh: "自动检测并救助溺水者的智能平台。", jp: "溺水者を自動検知し、救助するインテリジェント救助プラットフォーム。", en: "Intelligent rescue platform." }, github: "#", figma: "https://figma.com/file/genbu-proto" },
  { id: 5, title: { zh: "森のチェスウォール", jp: "森のチェスウォール", en: "Forest Chess Wall" }, tag: "Interior", img: "46.png", summary: { zh: "通过下棋交互与环境对话的装置。", jp: "チェスを通じて森林環境と対話する壁面装置。", en: "Interactive wall device." }, github: "#", figma: "#" },
  { id: 6, title: { zh: "Kaavo", jp: "Kaavo", en: "Kaavo" }, tag: "Service", img: "56.png", summary: { zh: "以CO2为资源的宠物食品订阅服务。", jp: "CO2を資源とする未来型ペットフード・サブスクリプションサービス。", en: "Pet food subscription using CO2." }, github: "#", figma: "https://figma.com/file/kaavo-proto" },
  { id: 7, title: { zh: "「文化官」工作坊", jp: "文化官", en: "Cultural Officer" }, tag: "Social", img: "65.png", summary: { zh: "连接留学生与日本社会的服务提案。", jp: "留学生と日本社会の未来をつなぐ service 提案。", en: "Service connecting students with society." }, github: "#", figma: "#" }
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
  { name: "Watercolor", desc: "Observing life's vitality." },
  { name: "Animal Observation", desc: "Inspiration from nature." },
  { name: "Language", desc: "Increasing clarity of the world." }
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

  const navSections = ['profile', 'education', 'projects', 'research', 'hobbies'];
  const allSubSections = ['profile', 'education', 'projects', 'other', 'showcase', 'research', 'hobbies'];

  useEffect(() => {
    document.title = "feixue's ptfl";
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const currentSub = allSubSections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });
      if (currentSub) {
        if (['projects', 'other', 'showcase'].includes(currentSub)) setActiveSection('projects');
        else setActiveSection(currentSub);
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
      name: "陈 霏雪", nameEn: "CHEN FEIXUE", nameKana: "チェン　フェイシュエ", role: "デザイナー / UX与战略研究员",
      intro: "以好奇心为原动力洞察结构，并将其重构为体验。追求实现可能性的诚实与多维度表达，心怀对社会的责任与作为设计师的喜悦，去实现有价值的体验。",
      nav: ["个人简介", "经历", "项目作品", "修士研究", "个人兴趣"],
      eduTitle: "经历", actTitle: "学外活动・实习・获奖记录",
      projectTitle: "项目作品", otherWorksTitle: "其它", showcaseTitle: "作品集文件", researchTitle: "修士研究", hobbiesTitle: "个人兴趣", methodsTitle: "STEPS", theoryTitle: "核心理论",
      researchSubject: "基于烹饪疗法及回想疗法的面向高龄者的回忆食谱生成方法研究",
      researchSummary: "该研究利用融合了回想疗法与烹饪疗法的对话型AI，从高龄者的“饮食记忆”中生成回忆食谱。",
      steps: [
        { t: "文献调查 (已完成)", d: "确认回想与烹饪疗法结合的有效性。" },
        { t: "访谈调查 (已完成)", d: "分析饮食记忆中的季节性重要性。" },
        { t: "原型设计 (迭代中)", d: "开发对话Web应用，独创3阶段对话逻辑。" },
        { t: "认知建模 (计划中)", d: "居家厨房陌材料理测试变量。" },
        { t: "专家评估 (计划中)", d: "落实大画面、动作原子化UI策略。" },
        { t: "用户验证 (计划中)", d: "验证系统显著提升料理意愿。" }
      ],
      theories: [
        { t: "回想疗法", d: "通过唤起生活记忆提升认知功能。" },
        { t: "烹饪疗法", d: "利用烹饪过程作为康复手段。" }
      ]
    },
    jp: {
      name: "陳 霏雪", nameEn: "CHEN FEIXUE", nameKana: "チェン　フェイシュエ", role: "デザイナー / UXとストラテジック研究者",
      intro: "好奇心を原動力に構造を捉え、体験として再構築する。実現可能性への诚実さと多角的な表現を追求し、社会への責任とデザイナーとしての喜びを胸に、価値ある体験を実装します。",
      nav: ["プロフィール", "経歴", "プロジェクト", "修士研究", "趣味"],
      eduTitle: "経歴", actTitle: "学外活動・インターン・受賞実績",
      projectTitle: "プロジェクト", otherWorksTitle: "その他", showcaseTitle: "ポートフォリオファイル", researchTitle: "修士研究", hobbiesTitle: "個人趣味", methodsTitle: "STEPS", theoryTitle: "核心理論",
      researchSubject: "料理療法および回想療法に基づく高齢者の思い出レシピ生成手法の研究",
      researchSummary: "回想療法と料理療法を融合した对话型AIを用いて、高齢者の『食の記憶』から思い出のレシピを生成し支援する研究です。",
      steps: [
        { t: "文献調査 (完了)", d: "回想法と料理療法の有効性を確認。" },
        { t: "質的調査 (完了)", d: "季節性の重要性を解明し、DPを策定。" },
        { t: "プロトタイプ1 (反復中)", d: "3段階の对话ロジックを実装。" },
        { t: "认知モデル (計画中)", d: "自宅で未知の料理を用いた测试を実施。" },
        { t: "専門家評価 (计划中)", d: "画面大型化・手順原子化を反映。" },
        { t: "最終検証 (计划中)", d: "実際の动线で検証。料理意欲向上を実证。" }
      ],
      theories: [
        { t: "回想療法", d: "過去の記憶を呼び起こす心理療法。" },
        { t: "料理療法", d: "調理工程をリハビリとして活用。" }
      ]
    },
    en: {
      name: "Chen Feixue", nameEn: "CHEN FEIXUE", nameKana: "CHEN FEIXUE", role: "Designer / UX & Strategic Researcher",
      intro: "Driven by curiosity, I decode structures into experiences.",
      nav: ["Profile", "Experience", "Projects", "Research", "Hobbies"],
      eduTitle: "Experience History", actTitle: "Extracurricular & Awards",
      projectTitle: "Projects", otherWorksTitle: "Other", showcaseTitle: "Portfolio File", researchTitle: "Master's Research", hobbiesTitle: "Interests", methodsTitle: "STEPS", theoryTitle: "Core Theories",
      researchSubject: "Generating Nostalgic Recipes for Older Adults.",
      researchSummary: "Integrating reminiscence and culinary therapy.",
      steps: [
        { t: "Literature (Done)", d: "Confirmed fusion therapy efficacy." },
        { t: "Interview (Done)", d: "Identified festive context insights." },
        { t: "Prototype (Iterating)", d: "Developed 3-stage dialogue logic." },
        { t: "Modeling (Planned)", d: "Mapped cognitive models." },
        { t: "Expert Review (Planned)", d: "Applied UI atomization." },
        { t: "User Validation (Planned)", d: "Verified boosts in self-efficacy." }
      ],
      theories: [
        { t: "Reminiscence", d: "Boosting cognitive function." },
        { t: "Culinary", d: "Physical and social rehab." }
      ]
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.textMain} font-sans selection:bg-[#9FD9F6]/30`}>
      {/* 强制覆盖 Vite 全局样式的 CSS */}
      <style>{`
        #root { width: 100% !important; max-width: none !important; margin: 0 !important; padding: 0 !important; text-align: left !important; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-fade { mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }
      `}</style>

      {/* Nav */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
          <span className={`text-xl font-bold tracking-tighter ${theme.primaryText}`}>FEIXUE.C</span>
          <div className="hidden md:flex items-center space-x-10">
            {navSections.map((sec, i) => (
              <a key={sec} href={`#${sec}`} className={`relative flex flex-col items-center group transition-all duration-300 uppercase tracking-[0.2em] text-[10px] ${activeSection === sec ? 'text-slate-900 font-black' : 'text-slate-400 hover:text-slate-600'}`}>
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
      <section id="profile" className="min-h-screen flex items-center px-8 pt-20 relative overflow-hidden bg-white">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none text-[18vw] font-black text-stone-100 tracking-tighter uppercase whitespace-nowrap opacity-20">PORTFOLIO</div>
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-start justify-between gap-16 md:gap-24 relative z-10">
          <div className="md:w-5/12">
            <div className={`inline-block px-4 py-1.5 mb-10 ${theme.primaryBg} text-slate-800 rounded-sm text-[10px] font-black tracking-[0.3em] uppercase`}>Experience & Design Strategy</div>
            <div className="mb-10">
              <h1 className="text-5xl md:text-6xl font-black mb-2 tracking-tighter text-slate-900 leading-none whitespace-nowrap">{t[lang].name}</h1>
              <p className="text-[11px] md:text-[13px] font-bold tracking-[0.3em] text-slate-400 uppercase leading-relaxed">{t[lang].nameEn}</p>
              <p className="text-[10px] md:text-[11px] font-medium tracking-[0.2em] text-slate-300">{t[lang].nameKana}</p>
            </div>
            <p className={`text-sm md:text-base ${theme.textMuted} font-bold tracking-[0.2em] uppercase`}>{t[lang].role}</p>
          </div>
          <div className="md:w-6/12 mt-12 md:mt-0">
            <p className="text-lg md:text-2xl text-slate-700 font-light tracking-[0.05em] leading-[2.8] whitespace-pre-line border-l border-stone-200 pl-8 md:pl-12">{t[lang].intro}</p>
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-32 bg-white border-y border-stone-100 w-full">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex items-center space-x-6 mb-20"><GraduationCap className={theme.primaryText} size={40} /><h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].eduTitle}</h2></div>
          <div className="space-y-20">
            {educationData.map((item, i) => (
              <div key={i} className="flex flex-col md:flex-row md:space-x-20 group">
                <div className="md:w-1/4 text-stone-300 font-mono text-sm pt-2 mb-4 md:mb-0 tracking-[0.2em] font-bold">{item.year}</div>
                <div className={`md:w-3/4 border-l-4 border-stone-50 pl-12 pb-4 transition-all group-hover:border-[#9FD9F6]`}>
                  <h3 className="text-3xl font-black mb-4 group-hover:text-slate-900 transition-colors leading-tight">{item.title[lang]}</h3>
                  <p className="text-slate-500 text-lg leading-relaxed font-light">{item.desc[lang]}</p>
                </div>
              </div>
            ))}
          </div>

          <div id="activities" className="mt-24 border-t border-stone-100 pt-16">
            <button onClick={() => setShowActivities(!showActivities)} className={`flex items-center space-x-6 ${theme.primaryText} font-black hover:text-[#F59E0B] transition-colors uppercase tracking-[0.3em] text-sm`}>
              <Briefcase size={24} /><span>{t[lang].actTitle}</span><ChevronDown className={`transition-transform duration-500 ${showActivities ? 'rotate-180' : ''}`} size={24} />
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
      <section id="projects" className="py-32 px-8 bg-stone-50 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-6 mb-20"><Palette className={theme.primaryText} size={40} /><h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].projectTitle}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {projectData.map((project) => (
              <div key={project.id} className="group bg-white rounded-sm shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden border border-stone-100" onClick={() => setSelectedProject(project)}>
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                  <img src={project.img} alt="" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-[1.5s]" />
                  <div className="absolute top-4 left-4"><span className="bg-white/95 backdrop-blur px-3 py-1 text-[8px] font-black tracking-widest uppercase text-slate-800 shadow-sm border border-stone-100">{project.tag}</span></div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black mb-2 flex justify-between items-center text-slate-900 group-hover:text-[#5BB2DF] transition-colors leading-tight">{project.title[lang]}<ChevronRight size={18} className="text-stone-300" /></h3>
                  <p className="text-slate-500 text-[12px] leading-relaxed font-light line-clamp-2">{project.summary[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Works */}
      <section id="other" className="py-32 px-8 bg-white overflow-hidden border-t border-stone-100">
        <div className="max-w-7xl mx-auto mb-16"><h2 className="text-4xl font-black tracking-tighter uppercase mb-2">{t[lang].otherWorksTitle}</h2><div className="w-20 h-1 bg-[#9FD9F6]"></div></div>
        <div className="relative group/container" onMouseMove={handleMouseMove} onMouseLeave={stopScrolling}>
          <div ref={scrollRef} onScroll={handleScrollProgress} className="flex space-x-8 overflow-x-auto pb-10 scrollbar-hide px-4 mask-fade relative z-10 cursor-ew-resize">
            {otherWorks.map((img, i) => (
              <div key={i} className="flex-none h-64 md:h-80"><img src={img} alt={`Work ${i}`} className="h-full w-auto object-contain bg-stone-50 group-hover:scale-105 transition-transform duration-700" /></div>
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

      {/* Master's Research */}
      <section id="research" className="py-32 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#9FD9F6]/5 pointer-events-none skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex items-center space-x-6 mb-20"><BookOpen className="text-[#9FD9F6]" size={40} /><h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].researchTitle}</h2></div>
          
          <div className="mb-20">
            <h3 className="text-xl md:text-2xl font-black mb-8 leading-relaxed text-white tracking-tight border-l-4 border-[#9FD9F6] pl-8 max-w-4xl">{t[lang].researchSubject}</h3>
            <p className="text-slate-300 leading-[2.2] text-lg font-light italic max-w-3xl">{t[lang].researchSummary}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8">
              <h4 className="text-xs font-black uppercase tracking-[0.4em] mb-12 text-[#9FD9F6] border-b border-white/10 pb-4 inline-block">{t[lang].methodsTitle}</h4>
              <ul className="space-y-10 text-sm relative">
                <div className="absolute left-[9px] top-4 bottom-4 w-0.5 bg-white/5"></div>
                {t[lang].steps.map((step, i) => (
                  <li key={i} className={`group relative pl-12 ${i === 2 ? 'cursor-pointer' : ''}`}>
                    <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-slate-900 border-2 border-[#9FD9F6] z-10 group-hover:bg-[#9FD9F6] transition-colors"></div>
                    <div className="mb-4">
                      {i === 2 ? (
                        <a href="https://gemini.google.com/share/6c123f0d0e8f" target="_blank" rel="noopener noreferrer" className="block">
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-[#9FD9F6] font-mono font-black text-xs uppercase tracking-widest whitespace-nowrap">Stage 0{i+1}</span>
                            <div className="font-black text-white text-base uppercase tracking-wider leading-tight flex items-center gap-2">{step.t} <ExternalLink size={14} className="text-[#F59E0B]" /></div>
                          </div>
                          <div className="text-[13px] text-slate-400 font-light leading-relaxed max-w-2xl">{step.d}</div>
                          <div className="rounded-sm overflow-hidden border border-white/10 shadow-2xl mt-4 max-w-lg opacity-80 hover:opacity-100 transition-opacity"><img src="recipe.png" alt="" className="w-full h-auto" /></div>
                        </a>
                      ) : (
                        <>
                          <div className="flex items-center gap-4 mb-2"><span className="text-[#9FD9F6] font-mono font-black text-xs uppercase tracking-widest whitespace-nowrap">Stage 0{i+1}</span><div className="font-black text-white text-base uppercase tracking-wider leading-tight">{step.t}</div></div>
                          <div className="text-[13px] text-slate-400 font-light leading-relaxed max-w-2xl">{step.d}</div>
                          {i === 3 && <div className="rounded-sm overflow-hidden border border-white/10 shadow-2xl mt-4 max-w-lg opacity-80"><img src="recipe-image.png" alt="" className="w-full h-auto" /></div>}
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
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
                  { icon: <Target size={24}/>, label: lang === 'jp' ? 'ミッション' : 'Mission', val: lang === 'jp' ? 'エイジング・イン・プレイス' : 'Aging-in-Place' },
                  { icon: <Sparkles size={24}/>, label: lang === 'jp' ? 'テクノロジー' : 'Tech', val: lang === 'jp' ? '对话型AI' : 'Dialogue AI' },
                  { icon: <Users size={24}/>, label: lang === 'jp' ? '核心' : lang === 'zh' ? '核心' : 'Core', val: lang === 'jp' ? '食の記憶' : 'Food Memory' }
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

      {/* Interests */}
      <section id="hobbies" className="py-32 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center space-x-6 mb-20"><Heart className={theme.accent} size={40} /><h2 className="text-4xl font-black tracking-tighter uppercase">{t[lang].hobbiesTitle}</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {getHobbiesList(lang).map((hobby, i) => (
              <div key={i} className="p-12 bg-stone-50 border border-transparent hover:border-[#9FD9F6] transition-all group rounded-sm shadow-sm hover:shadow-2xl">
                <div className={`w-16 h-16 bg-white text-slate-400 rounded-sm flex items-center justify-center mb-10 group-hover:bg-[#9FD9F6] group-hover:text-white transition-all shadow-sm`}>{i === 0 ? <Palette size={32} /> : i === 1 ? <Camera size={32} /> : <Languages size={32} />}</div>
                <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{hobby.name}</h3>
                <p className="text-slate-500 text-base leading-[2] font-light italic">{hobby.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          <div className="relative bg-white w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl animate-in duration-500">
            <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 p-3 bg-stone-100 hover:bg-stone-200 rounded-sm transition-colors z-10"><X size={24} /></button>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-7/12 bg-stone-100"><img src={selectedProject.img} alt="" className="w-full h-full object-contain lg:object-cover min-h-[500px]" /></div>
              <div className="lg:w-5/12 p-12 lg:p-20">
                <span className="text-[11px] font-black text-[#F59E0B] uppercase tracking-[0.3em] block mb-6">{selectedProject.tag}</span>
                <h2 className="text-4xl md:text-5xl font-black mb-10 text-slate-900 tracking-tighter leading-tight">{selectedProject.title[lang]}</h2>
                <div className="w-16 h-1.5 bg-[#9FD9F6] mb-10"></div>
                <p className="text-slate-600 leading-[2.2] mb-12 text-xl font-light italic">{selectedProject.summary[lang]}</p>
                <div className="space-y-10">
                  <h4 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.5em] border-b border-stone-100 pb-4">Links</h4>
                  <div className="flex flex-col space-y-6">
                    {selectedProject.github && selectedProject.github !== "#" && (<a href={selectedProject.github} target="_blank" rel="noreferrer" className="flex items-center space-x-6 text-slate-900 hover:text-orange-500 transition-colors group"><GithubIcon size={28} className="group-hover:scale-110 transition-transform" /><span className="font-black text-sm tracking-widest uppercase border-b-2 border-stone-100 group-hover:border-orange-200">GitHub Source</span></a>)}
                    {selectedProject.figma && selectedProject.figma !== "#" && (<a href={selectedProject.figma} target="_blank" rel="noreferrer" className="flex items-center space-x-6 text-slate-900 hover:text-orange-500 transition-colors group"><ExternalLink size={28} className="group-hover:scale-110 transition-transform" /><span className="font-black text-sm tracking-widest uppercase border-b-2 border-stone-100 group-hover:border-orange-200">Figma Prototype</span></a>)}
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