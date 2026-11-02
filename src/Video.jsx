import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

const GOLD = "#d7b46a";
const WHITE = "#f4f0e8";
const MUTED = "#aaa49a";

const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
  * { box-sizing: border-box; }
`;

const Grain = () => (
  <div style={{
    position: "absolute", inset: 0, opacity: 0.12, pointerEvents: "none",
    backgroundImage: "radial-gradient(#ffffff 0.55px, transparent 0.55px)",
    backgroundSize: "5px 5px", mixBlendMode: "soft-light"
  }} />
);

const Base = ({ children, accent = GOLD }) => (
  <AbsoluteFill style={{
    background: "radial-gradient(ellipse at 50% 42%, #242321 0%, #101010 48%, #050505 100%)",
    color: WHITE, fontFamily: "Cairo, Arial, sans-serif", overflow: "hidden",
    direction: "rtl"
  }}>
    <div style={{position:"absolute", width:760, height:760, borderRadius:"50%",
      border:`1px solid ${accent}22`, left:"50%", top:"43%",
      transform:"translate(-50%,-50%)"}} />
    <div style={{position:"absolute", width:560, height:560, borderRadius:"50%",
      border:`1px solid ${accent}18`, left:"50%", top:"43%",
      transform:"translate(-50%,-50%)"}} />
    <Grain />
    {children}
  </AbsoluteFill>
);

const Reveal = ({ children, start = 0, size = 58, color = WHITE, weight = 800, width = "88%" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: Math.max(0, frame - start), fps, config: { damping: 18, stiffness: 90 } });
  const opacity = interpolate(frame, [start, start + 10], [0, 1], {extrapolateRight:"clamp"});
  return <div style={{
    width, margin:"0 auto", textAlign:"center", color, fontSize:size, lineHeight:1.55,
    fontWeight:weight, opacity, transform:`translateY(${(1-p)*38}px)`,
    textShadow:"0 8px 35px #000"
  }}>{children}</div>;
};

const TopLabel = ({ children }) => (
  <div style={{position:"absolute", top:72, width:"100%", textAlign:"center",
    color:GOLD, fontSize:22, letterSpacing:4, fontWeight:700}}>{children}</div>
);

const GoldLine = ({ delay=0 }) => {
  const f = useCurrentFrame();
  const w = interpolate(f, [delay, delay+24], [0, 250], {extrapolateLeft:"clamp", extrapolateRight:"clamp"});
  return <div style={{height:3, width:w, background:GOLD, margin:"28px auto", boxShadow:`0 0 24px ${GOLD}88`}} />;
};

const Silhouette = () => (
  <svg width="440" height="570" viewBox="0 0 440 570" style={{position:"absolute", bottom:90, left:"50%", transform:"translateX(-50%)"}}>
    <defs>
      <linearGradient id="person" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#d7b46a" stopOpacity=".55"/>
        <stop offset="1" stopColor="#75603a" stopOpacity=".08"/>
      </linearGradient>
    </defs>
    <ellipse cx="220" cy="535" rx="175" ry="18" fill="#d7b46a" opacity=".18"/>
    <path d="M165 170 Q130 190 105 270 L65 510 Q220 555 375 510 L335 270 Q310 190 275 170Z" fill="url(#person)" stroke="#d7b46a" strokeOpacity=".38" strokeWidth="2"/>
    <path d="M160 175 Q135 95 220 65 Q305 95 280 175 Q260 220 220 222 Q180 220 160 175Z" fill="#171614" stroke="#d7b46a" strokeOpacity=".5" strokeWidth="3"/>
    <path d="M152 154 Q125 40 220 28 Q315 40 288 154 Q275 90 220 85 Q165 90 152 154Z" fill="#090909"/>
    <path d="M220 222 L220 520" stroke="#d7b46a" strokeOpacity=".16" strokeWidth="2"/>
  </svg>
);

const Intro = () => {
  const f = useCurrentFrame();
  const pulse = interpolate(Math.sin(f/13), [-1,1], [0.18,0.5]);
  return <Base>
    <TopLabel>وثائقي قصير</TopLabel>
    <div style={{position:"absolute", inset:0, background:`radial-gradient(ellipse at 50% 65%, rgba(215,180,106,${pulse}) 0%, transparent 43%)`}}/>
    <Silhouette />
    <div style={{position:"absolute", top:220, width:"100%"}}>
      <Reveal start={5} size={52}>حين تُطرح كلمة</Reveal>
      <Reveal start={17} size={88} color={GOLD}>المساواة</Reveal>
      <GoldLine delay={28}/>
      <Reveal start={36} size={43}>يظهر سؤال مهم…</Reveal>
    </div>
    <div style={{position:"absolute", bottom:42, width:"100%", textAlign:"center", color:MUTED, fontSize:20}}>النسوية والإسلام: أين يبدأ الخلاف؟</div>
  </Base>;
};

const Question = () => (
  <Base>
    <TopLabel>السؤال المحوري</TopLabel>
    <div style={{position:"absolute", top:280, width:"100%"}}>
      <Reveal start={4} size={55}>هل كل مطالبة بحقوق المرأة</Reveal>
      <Reveal start={20} size={72} color={GOLD}>تعني مواجهة الدين؟</Reveal>
      <GoldLine delay={38}/>
      <Reveal start={48} size={35} color={MUTED} weight={600}>أم أن المسألة أكثر تعقيدًا؟</Reveal>
    </div>
    <div style={{position:"absolute", bottom:150, left:"12%", right:"12%", height:1, background:"linear-gradient(90deg,transparent,#d7b46a88,transparent)"}}/>
  </Base>
);

const Definition = () => (
  <Base>
    <TopLabel>أولًا — ما النسوية؟</TopLabel>
    <div style={{position:"absolute", top:245, width:"100%"}}>
      <Reveal start={2} size={48}>ليست النسوية تيارًا واحدًا</Reveal>
      <GoldLine delay={16}/>
      <Reveal start={28} size={39} color={GOLD}>اتجاهات متعددة</Reveal>
      <Reveal start={43} size={34} weight={600}>تختلف في أهدافها ومواقفها</Reveal>
      <Reveal start={62} size={31} color={MUTED} weight={600}>من الحقوق القانونية والاجتماعية</Reveal>
      <Reveal start={79} size={31} color={MUTED} weight={600}>إلى نقد الأدوار والتقاليد والدين</Reveal>
    </div>
    <div style={{position:"absolute", bottom:105, width:"100%", display:"flex", justifyContent:"center", gap:20}}>
      {["الحقوق","المجتمع","الأفكار"].map((x,i)=><div key={x} style={{border:`1px solid ${GOLD}66`,padding:"12px 25px",borderRadius:30,color:GOLD,fontSize:23}}>{x}</div>)}
    </div>
  </Base>
);

const Conflict = () => (
  <Base>
    <TopLabel>ثانيًا — أين يبدأ الخلاف؟</TopLabel>
    <div style={{position:"absolute", top:250, width:"100%"}}>
      <Reveal start={3} size={48}>هناك فرق بين أمرين</Reveal>
      <div style={{display:"flex", justifyContent:"center", gap:18, marginTop:50}}>
        <div style={{width:290, border:`1px solid ${GOLD}88`, borderRadius:18, padding:22, background:"#d7b46a0d"}}>
          <div style={{color:GOLD,fontSize:31,fontWeight:900,textAlign:"center"}}>١</div>
          <div style={{fontSize:30,fontWeight:800,textAlign:"center"}}>رفض الظلم</div>
          <div style={{fontSize:22,color:MUTED,textAlign:"center",marginTop:12}}>ومواجهة العادات الجائرة</div>
        </div>
        <div style={{width:290, border:"1px solid #ffffff44", borderRadius:18, padding:22, background:"#ffffff08"}}>
          <div style={{color:WHITE,fontSize:31,fontWeight:900,textAlign:"center"}}>٢</div>
          <div style={{fontSize:30,fontWeight:800,textAlign:"center"}}>رفض التشريع</div>
          <div style={{fontSize:22,color:MUTED,textAlign:"center",marginTop:12}}>والاعتراض على أحكام دينية</div>
        </div>
      </div>
      <Reveal start={45} size={32} color={GOLD}>لا ينبغي الخلط بينهما</Reveal>
    </div>
  </Base>
);

const Balance = () => (
  <Base>
    <TopLabel>ثالثًا — ميزان الإنصاف</TopLabel>
    <div style={{position:"absolute", top:250, width:"100%"}}>
      <Reveal start={2} size={49}>لا نعمّم الأحكام على الجميع</Reveal>
      <GoldLine delay={18}/>
      <Reveal start={30} size={39}>ليس كل من تدافع عن المرأة</Reveal>
      <Reveal start={44} size={39} color={GOLD}>ترفض الدين</Reveal>
      <Reveal start={62} size={36}>وليس كل نقد اجتماعي</Reveal>
      <Reveal start={76} size={36} color={GOLD}>نقدًا للإسلام</Reveal>
    </div>
    <div style={{position:"absolute", bottom:115, width:"100%", textAlign:"center", color:MUTED, fontSize:22}}>الإنصاف يبدأ بالتفريق بين الأفكار وأصحابها</div>
  </Base>
);

const Ending = () => (
  <Base>
    <TopLabel>الخلاصة</TopLabel>
    <div style={{position:"absolute", top:285, width:"100%"}}>
      <Reveal start={2} size={46}>افهم الفكرة قبل أن تحكم</Reveal>
      <Reveal start={20} size={58} color={GOLD}>وابحث عن الدليل</Reveal>
      <GoldLine delay={38}/>
      <Reveal start={50} size={37}>فالحوار المنصف لا يبدأ بالاتهام</Reveal>
      <Reveal start={67} size={39} color={GOLD}>بل بالعلم والعدل</Reveal>
    </div>
    <div style={{position:"absolute", bottom:75, width:"100%", textAlign:"center", fontSize:22, color:MUTED}}>النسوية والإسلام: أين يبدأ الخلاف؟</div>
  </Base>
);

export const Video = () => {
  const { fps } = useVideoConfig();
  const scenes = [
    {C:Intro, d:15}, {C:Question, d:15}, {C:Definition, d:20},
    {C:Conflict, d:20}, {C:Balance, d:10}, {C:Ending, d:10},
  ];
  let from = 0;
  return <>
    <style>{globalCss}</style>
    {scenes.map(({C,d},i)=>{
      const start = from; from += d*fps;
      return <Sequence key={i} from={start} durationInFrames={d*fps}><C /></Sequence>;
    })}
  </>;
};
