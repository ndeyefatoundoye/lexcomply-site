import { useState, useEffect, useRef } from "react";

const NAVY = "#0B1D33";
const NAVY2 = "#0E2440";
const GOLD = "#C8A15A";
const GOLD_L = "#E2BC78";
const GOLD_D = "#9A7530";
const IVORY = "#F6F2E9";
const SLATE = "#48515A";
const WHITE = "#FFFFFF";

// fonts + FA loaded via @import inside style tag below

const css = document.createElement("style");
css.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  .lc-site { font-family: 'Jost', sans-serif; color: ${NAVY}; background: ${WHITE}; }
  .lc-site a { text-decoration: none; color: inherit; }
  .serif { font-family: 'Cormorant Garamond', serif; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes shimmer { 0%,100% { opacity:0.6; } 50% { opacity:1; } }
  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .gold-line { width:48px; height:2px; background:${GOLD}; }
  .gold-line-full { height:1px; background:linear-gradient(to right, transparent, ${GOLD}, transparent); }
  .nav-link { font-size:13px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,0.8); cursor:pointer; transition:color 0.2s; }
  .nav-link:hover { color:${GOLD}; }
  .btn-gold { background:${GOLD}; color:${NAVY}; border:none; padding:14px 32px; font-family:'Jost',sans-serif; font-size:12px; font-weight:600; letter-spacing:2.5px; text-transform:uppercase; cursor:pointer; transition:all 0.3s; }
  .btn-gold:hover { background:${GOLD_L}; transform:translateY(-1px); }
  .btn-outline { background:transparent; color:${GOLD}; border:1px solid ${GOLD}; padding:13px 32px; font-family:'Jost',sans-serif; font-size:12px; font-weight:500; letter-spacing:2.5px; text-transform:uppercase; cursor:pointer; transition:all 0.3s; }
  .btn-outline:hover { background:${GOLD}; color:${NAVY}; }
  .service-card {
    background: ${WHITE};
    border: 1px solid rgba(200,161,90,0.14);
    border-radius: 18px;
    padding: 38px 30px;
    transition: all 0.35s ease;
    cursor: default;
    box-shadow: 0 2px 4px rgba(11,29,51,0.03), 0 6px 20px rgba(11,29,51,0.07), 0 1px 0 rgba(200,161,90,0.08) inset;
  }
  .service-card:hover {
    border-color: ${GOLD};
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(11,29,51,0.06), 0 24px 56px rgba(11,29,51,0.13), 0 1px 0 rgba(200,161,90,0.2) inset;
  }
  .section-tag { font-family:'Jost',sans-serif; font-size:10px; font-weight:600; letter-spacing:4px; text-transform:uppercase; color:${GOLD}; }
  .section-title { font-family:'Cormorant Garamond',serif; font-size:clamp(36px,4vw,52px); font-weight:600; color:${NAVY}; line-height:1.15; }
  .section-title-light { font-family:'Cormorant Garamond',serif; font-size:clamp(36px,4vw,52px); font-weight:600; color:${WHITE}; line-height:1.15; }
  .value-item { display:flex; align-items:flex-start; gap:16px; padding:20px 0; border-bottom:0.5px solid rgba(200,161,90,0.15); }
  .team-card { background:${IVORY}; padding:0; overflow:hidden; }
  .stat-num { font-family:'Cormorant Garamond',serif; font-size:56px; font-weight:700; color:${GOLD}; line-height:1; }
  .expertise-pill { display:inline-block; padding:6px 16px; border:0.5px solid ${GOLD}; border-radius:4px; font-size:11px; letter-spacing:1.5px; text-transform:uppercase; color:${GOLD}; margin:4px; }
  .contact-input { width:100%; background:rgba(255,255,255,0.05); border:0.5px solid rgba(200,161,90,0.3); padding:14px 18px; font-family:'Jost',sans-serif; font-size:14px; color:${WHITE}; outline:none; transition:border 0.2s; }
  .contact-input:focus { border-color:${GOLD}; }
  .contact-input::placeholder { color:rgba(255,255,255,0.35); }
`;
document.head.appendChild(css);

function Shield({ size = 48 }) {
  const w = size, h = size * 1.22;
  return (
    <svg width={w} height={h} viewBox="0 0 100 122" fill="none">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="122" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0E2040" />
          <stop offset="100%" stopColor={NAVY} />
        </linearGradient>
        <linearGradient id="gg" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={GOLD_D} />
          <stop offset="45%" stopColor={GOLD_L} />
          <stop offset="100%" stopColor={GOLD_D} />
        </linearGradient>
      </defs>
      <path d="M6 5 L94 5 Q98 5 98 9 L98 70 Q98 110 50 120 Q2 110 2 70 L2 9 Q2 5 6 5 Z" fill="url(#sg)" />
      <path d="M6 5 L94 5 Q98 5 98 9 L98 70 Q98 110 50 120 Q2 110 2 70 L2 9 Q2 5 6 5 Z" fill="none" stroke="url(#gg)" strokeWidth="2.5" />
      <path d="M13 13 L87 13 L87 68 Q87 104 50 116 Q13 104 13 68 Z" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.3" />
      <line x1="13" y1="26" x2="87" y2="26" stroke={GOLD} strokeWidth="0.6" opacity="0.3" />
      <rect x="20" y="34" width="7" height="54" fill="url(#gg)" rx="1" />
      <rect x="20" y="80" width="28" height="7" fill="url(#gg)" rx="1" />
      <path d="M82 38 Q56 38 56 61 Q56 84 82 84" fill="none" stroke="url(#gg)" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
};

function Diamond() {
  return <div style={{ width:8, height:8, background:GOLD, transform:"rotate(45deg)", flexShrink:0 }} />;
}

function Nav({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Accueil",   id: "accueil" },
    { label: "Services",  id: "services" },
    { label: "À propos",  id: "apropos" },
    { label: "Expertise", id: "expertise" },
    { label: "Contact",   id: "contact" },
  ];

  const scrollToSection = (id) => {
    scrollTo(id);
    setActive(id);
  };

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:100,
      background: scrolled ? `rgba(11,29,51,0.97)` : "transparent",
      borderBottom: scrolled ? `1px solid rgba(200,161,90,0.15)` : "none",
      padding:"0 60px",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      height:72,
      transition:"all 0.4s ease",
      backdropFilter: scrolled ? "blur(12px)" : "none",
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:14, cursor:"pointer" }} onClick={() => scrollToSection("accueil")}>
        <Shield size={36} />
        <div>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:700, color:WHITE, letterSpacing:"-0.5px", lineHeight:1 }}>
            LEX<span style={{ color:GOLD }}>COMPLY</span>
          </div>
          <div style={{ fontFamily:"'Jost',sans-serif", fontSize:7, letterSpacing:"3px", color:"rgba(255,255,255,0.5)", textTransform:"uppercase" }}>Where Law Meets Strategy</div>
        </div>
      </div>
      <div style={{ display:"flex", gap:36, alignItems:"center" }}>
        {links.map(l => (
          <span key={l.id} className="nav-link" onClick={() => scrollToSection(l.id)}
            style={{ color: active===l.id ? GOLD : "rgba(255,255,255,0.8)", borderBottom: active===l.id ? `1px solid ${GOLD}` : "none", paddingBottom:2 }}>
            {l.label}
          </span>
        ))}
        <button className="btn-gold" style={{ padding:"10px 22px", fontSize:11 }} onClick={() => scrollToSection("contact")}>Consultation</button>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="accueil" style={{
      minHeight:"100vh", background:NAVY,
      display:"flex", flexDirection:"column",
      justifyContent:"center", alignItems:"center",
      textAlign:"center", padding:"120px 60px 80px",
      position:"relative", overflow:"hidden",
    }}>
      {/* Background pattern */}
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.04 }} preserveAspectRatio="none" viewBox="0 0 800 600">
        {[0,1,2,3,4,5,6,7].map(i => (
          <path key={i} d={`M${i*100} 0 L${i*100+50} 300 L${i*100} 600`} fill="none" stroke={GOLD} strokeWidth="0.8" />
        ))}
        {[0,1,2,3].map(i => (
          <ellipse key={i} cx={200+i*150} cy={300} rx={80+i*40} ry={80+i*40} fill="none" stroke={GOLD} strokeWidth="0.5" />
        ))}
      </svg>

      <div style={{ position:"relative", zIndex:2, maxWidth:800, animation:"fadeUp 0.8s ease forwards" }}>
        <div style={{ height:8 }} />
        <div className="section-tag" style={{ color:GOLD }}>Cabinet de conseil juridique & compliance</div>
        <div style={{ height:20 }} />
        <h1 className="serif" style={{ fontSize:"clamp(48px,6vw,82px)", fontWeight:600, color:WHITE, lineHeight:1.08, letterSpacing:"-1px" }}>
          Où le Droit<br />
          <span style={{ color:GOLD, fontStyle:"italic" }}>rencontre</span> la Stratégie
        </h1>
        <div style={{ height:24 }} />
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
          <div style={{ flex:1, maxWidth:120, height:1, background:`linear-gradient(to right, transparent, ${GOLD})` }} />
          <Diamond />
          <div style={{ flex:1, maxWidth:120, height:1, background:`linear-gradient(to left, transparent, ${GOLD})` }} />
        </div>
        <div style={{ height:24 }} />
        <p style={{ fontFamily:"'Jost',sans-serif", fontSize:17, fontWeight:300, color:"rgba(255,255,255,0.7)", lineHeight:1.8, maxWidth:560, margin:"0 auto" }}>
          Ingénierie juridique, conformité et conseil stratégique pour les PME, multinationales et institutions dans l'espace OHADA, UEMOA & CEDEAO.
        </p>
        <div style={{ height:40 }} />
        <div style={{ display:"flex", gap:16, justifyContent:"center" }}>
          <button className="btn-gold" onClick={() => scrollTo("services")}>Nos services</button>
          <button className="btn-outline" onClick={() => scrollTo("contact")}>Prendre rendez-vous</button>
        </div>
        <div style={{ height:64 }} />
        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, maxWidth:560, margin:"0 auto", background:`rgba(200,161,90,0.15)` }}>
          {[
            { n:"OHADA", l:"Droit applicable" },
            { n:"UEMOA", l:"Zone d'expertise" },
            { n:"9", l:"Domaines de pratique" },
          ].map((s,i) => (
            <div key={i} style={{ background:NAVY, padding:"20px 16px", textAlign:"center" }}>
              <div className="serif" style={{ fontSize:28, fontWeight:700, color:GOLD }}>{s.n}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"2px", textTransform:"uppercase", color:"rgba(255,255,255,0.5)", marginTop:4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, opacity:0.5 }}>
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:9, letterSpacing:"3px", textTransform:"uppercase", color:WHITE }}>Découvrir</div>
        <div style={{ width:1, height:40, background:`linear-gradient(to bottom, ${GOLD}, transparent)`, animation:"shimmer 2s ease infinite" }} />
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { icon:"fa-solid fa-scale-balanced",      title:"Conseil & Assistance Juridiques",     desc:"Rédaction et négociation de contrats, secrétariat juridique, formalités d'entreprise, opérations sociétaires, M&A et restructurations.", tags:["Contrats","M&A","OHADA"] },
    { icon:"fa-solid fa-shield-halved",        title:"Conformité & Intégrité",              desc:"Dispositifs anticorruption, LBC/FT, cartographies des risques, due diligence KYC/KYS, protection des données personnelles.", tags:["LBC/FT","KYC","RGPD"] },
    { icon:"fa-solid fa-earth-africa",         title:"Accompagnement à l'Investissement",   desc:"Conseil pour l'implantation d'entreprises étrangères au Sénégal et en Afrique de l'Ouest, structuration juridique des projets.", tags:["Investissement","Implantation","Structuration"] },
    { icon:"fa-solid fa-magnifying-glass-chart",title:"Audits & Due Diligence",             desc:"Audits juridiques et de conformité, évaluation et maîtrise des risques dans le cadre d'opérations spécifiques.", tags:["Audit","Risques","Évaluation"] },
    { icon:"fa-solid fa-laptop-code",          title:"Digitalisation Juridique",            desc:"Conseil en digitalisation des processus juridiques et de conformité, gestion électronique des contrats et procédures.", tags:["LegalTech","Contrats digitaux","Process"] },
    { icon:"fa-solid fa-graduation-cap",       title:"Formation & Veille",                  desc:"Conception de formations en droit OHADA, compliance et gestion des risques. Veille législative et plans de mise en conformité.", tags:["Formation","Veille","OHADA"] },
  ];
  return (
    <section id="services" style={{ padding:"100px 60px", background:IVORY }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div className="section-tag">Ce que nous faisons</div>
          <div style={{ height:16 }} />
          <h2 className="section-title">Nos domaines<br /><span style={{ color:GOLD }}>d'expertise</span></h2>
          <div style={{ height:20 }} />
          <div style={{ display:"flex", justifyContent:"center" }}><div className="gold-line" /></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, background:"transparent" }}>
          {services.map((s,i) => (
            <div key={i} className="service-card">
              <div style={{ width:44, height:2, background:GOLD, marginBottom:22 }} />
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:500, color:NAVY, lineHeight:1.25, marginBottom:14, letterSpacing:"-0.3px" }}>{s.title}</h3>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:300, color:SLATE, lineHeight:1.8, marginBottom:20 }}>{s.desc}</p>
              <div>
                {s.tags.map(t => <span key={t} className="expertise-pill">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const values = [
    { title:"Excellence", desc:"Un service de haute qualité adapté aux exigences des clients les plus exigeants." },
    { title:"Intégrité", desc:"Une éthique irréprochable au service de vos intérêts dans le respect de la loi." },
    { title:"Confidentialité", desc:"La discrétion absolue comme pilier fondamental de notre relation client." },
    { title:"Expertise Africaine", desc:"Une connaissance approfondie du droit OHADA et des réalités économiques de la sous-région." },
  ];
  return (
    <section id="apropos" style={{ padding:"100px 60px", background:WHITE }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
        <div>
          <div className="section-tag">Qui sommes-nous</div>
          <div style={{ height:16 }} />
          <h2 className="section-title">Un cabinet pensé<br /><span style={{ color:GOLD }}>pour l'Afrique</span></h2>
          <div style={{ height:24 }} />
          <div className="gold-line" />
          <div style={{ height:24 }} />
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:300, color:SLATE, lineHeight:1.9 }}>
            LexComply est un cabinet de conseil juridique et compliance fondé au Sénégal, avec une vision résolument tournée vers l'espace OHADA, UEMOA et CEDEAO.
          </p>
          <div style={{ height:16 }} />
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:300, color:SLATE, lineHeight:1.9 }}>
            Notre approche allie rigueur juridique, compréhension des enjeux business et maîtrise des réalités locales pour offrir un accompagnement stratégique à la hauteur des ambitions de nos clients.
          </p>
          <div style={{ height:32 }} />
          <div>
            {values.map((v,i) => (
              <div key={i} className="value-item">
                <Diamond />
                <div>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:600, color:NAVY, marginBottom:4 }}>{v.title}</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, fontWeight:300, color:SLATE, lineHeight:1.7 }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position:"relative" }}>
          {/* Abstract visual */}
          <div style={{ background:NAVY, padding:"48px", position:"relative", overflow:"hidden" }}>
            <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.07 }} viewBox="0 0 400 400">
              {[0,1,2,3,4].map(i => <circle key={i} cx="200" cy="200" r={40+i*40} fill="none" stroke={GOLD} strokeWidth="0.8" />)}
              {[0,1,2,3].map(i => { const a=i*45; return <line key={i} x1={200+180*Math.cos(a*Math.PI/180)} y1={200+180*Math.sin(a*Math.PI/180)} x2={200-180*Math.cos(a*Math.PI/180)} y2={200-180*Math.sin(a*Math.PI/180)} stroke={GOLD} strokeWidth="0.5" />; })}
            </svg>
            <div style={{ position:"relative", zIndex:2, textAlign:"center" }}>
              <Shield size={80} />
              <div style={{ height:32 }} />
              <div className="serif" style={{ fontSize:42, fontWeight:700, color:GOLD, lineHeight:1 }}>LexComply</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"5px", color:"rgba(255,255,255,0.5)", textTransform:"uppercase", marginTop:8 }}>SUARL</div>
              <div style={{ height:32 }} />
              <div className="gold-line-full" />
              <div style={{ height:32 }} />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:1, background:`rgba(200,161,90,0.1)` }}>
                {[
                  ["Sénégal","Siège"],
                  ["OHADA","Droit applicable"],
                  ["UEMOA","Zone d'opération"],
                  ["CEDEAO","Rayonnement"],
                ].map(([v,l],i) => (
                  <div key={i} style={{ background:NAVY2, padding:"16px 12px", textAlign:"center" }}>
                    <div className="serif" style={{ fontSize:16, fontWeight:600, color:GOLD }}>{v}</div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:8, letterSpacing:"1.5px", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", marginTop:4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Gold accent corner */}
          <div style={{ position:"absolute", bottom:-16, right:-16, width:80, height:80, border:`2px solid ${GOLD}`, zIndex:0 }} />
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const stats = [
    { n:"9", l:"Domaines de pratique" },
    { n:"3", l:"Espaces juridiques couverts" },
    { n:"360°", l:"Approche globale" },
    { n:"100%", l:"Confidentialité garantie" },
  ];
  return (
    <section id="expertise" style={{ padding:"100px 60px", background:NAVY, position:"relative", overflow:"hidden" }}>
      <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.04 }} viewBox="0 0 1200 500" preserveAspectRatio="none">
        {[0,1,2,3,4,5].map(i => (
          <path key={i} d={`M${i*200} 0 L${i*200+100} 500`} fill="none" stroke={GOLD} strokeWidth="1" />
        ))}
      </svg>
      <div style={{ maxWidth:1100, margin:"0 auto", position:"relative", zIndex:2 }}>
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div className="section-tag">Pourquoi nous choisir</div>
          <div style={{ height:16 }} />
          <h2 className="section-title-light">L'expertise qui fait<br /><span style={{ color:GOLD }}>la différence</span></h2>
          <div style={{ height:20 }} />
          <div style={{ display:"flex", justifyContent:"center" }}><div className="gold-line" /></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:1, background:`rgba(200,161,90,0.1)`, marginBottom:64 }}>
          {stats.map((s,i) => (
            <div key={i} style={{ background:NAVY2, padding:"36px 24px", textAlign:"center" }}>
              <div className="stat-num">{s.n}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"2px", textTransform:"uppercase", color:"rgba(255,255,255,0.5)", marginTop:8 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:32 }}>
          {[
            { title:"Ancrage local, vision internationale", desc:"Basés à Dakar, nous combinons une expertise du terrain africain avec les standards internationaux de la conformité et du droit des affaires." },
            { title:"Approche pluridisciplinaire", desc:"Droit, compliance, fiscalité, digitalisation : nous couvrons l'intégralité de vos besoins juridiques et réglementaires en un seul cabinet." },
            { title:"Accompagnement sur mesure", desc:"Chaque client est unique. Nos solutions sont pensées et adaptées à votre secteur, votre taille et vos objectifs stratégiques." },
          ].map((item,i) => (
            <div key={i} style={{ borderTop:`1px solid rgba(200,161,90,0.3)`, paddingTop:28 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                <Diamond />
                <h3 className="serif" style={{ fontSize:22, fontWeight:600, color:WHITE }}>{item.title}</h3>
              </div>
              <p style={{ fontFamily:"'Jost',sans-serif", fontSize:14, fontWeight:300, color:"rgba(255,255,255,0.6)", lineHeight:1.8 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding:"100px 60px", background:NAVY2 }}>
      <div style={{ maxWidth:800, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:56 }}>
          <div className="section-tag">Nous contacter</div>
          <div style={{ height:16 }} />
          <h2 className="section-title-light">Parlons de votre<br /><span style={{ color:GOLD }}>projet</span></h2>
          <div style={{ height:20 }} />
          <div style={{ display:"flex", justifyContent:"center" }}><div className="gold-line" /></div>
          <div style={{ height:20 }} />
          <p style={{ fontFamily:"'Jost',sans-serif", fontSize:15, fontWeight:300, color:"rgba(255,255,255,0.6)", lineHeight:1.8 }}>
            Première consultation offerte. Nous vous répondons sous 24h.
          </p>
        </div>
        <div style={{ display:"grid", gap:16 }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
            <input className="contact-input" placeholder="Votre nom" />
            <input className="contact-input" placeholder="Votre email" />
          </div>
          <input className="contact-input" placeholder="Votre société / Organisation" />
          <select className="contact-input" style={{ cursor:"pointer" }}>
            <option value="" style={{ background:NAVY }}>Objet de votre demande</option>
            <option style={{ background:NAVY }}>Conseil juridique</option>
            <option style={{ background:NAVY }}>Conformité & Compliance</option>
            <option style={{ background:NAVY }}>Accompagnement à l'investissement</option>
            <option style={{ background:NAVY }}>Formation</option>
            <option style={{ background:NAVY }}>Autre</option>
          </select>
          <textarea className="contact-input" placeholder="Décrivez votre besoin..." rows={5} style={{ resize:"vertical" }} />
          <button className="btn-gold" style={{ width:"100%", padding:"18px", fontSize:13 }}
            onClick={() => alert("Merci pour votre message ! Nous vous répondons sous 24h.")}>
            Envoyer ma demande
          </button>
        </div>
        <div style={{ height:48 }} />
        <div className="gold-line-full" />
        <div style={{ height:32 }} />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, textAlign:"center" }}>
          {[
            { icon:"📍", label:"Dakar, Sénégal", sub:"Siège social", href:null },
            { icon:"📧", label:"contact@lexcomplyconsulting.com", sub:"Email professionnel", href:"mailto:contact@lexcomplyconsulting.com" },
            { icon:"📱", label:"+221 XX XXX XX XX", sub:"WhatsApp / Téléphone", href:"https://wa.me/221XXXXXXXX" },
          ].map((c,i) => (
            <div key={i} style={{ cursor: c.href ? "pointer" : "default" }}
              onClick={() => c.href && window.open(c.href, "_blank")}>
              <div style={{ fontSize:24, marginBottom:8 }}>{c.icon}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:GOLD }}>{c.label}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,0.4)", letterSpacing:"1.5px", textTransform:"uppercase", marginTop:4 }}>{c.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background:NAVY, borderTop:`1px solid rgba(200,161,90,0.2)`, padding:"32px 60px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:16 }}>
        <div style={{ display:"flex", alignItems:"center", gap:12 }}>
          <Shield size={28} />
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:18, fontWeight:700, color:WHITE }}>
            LEX<span style={{ color:GOLD }}>COMPLY</span>
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:9, fontWeight:400, letterSpacing:"2px", color:"rgba(255,255,255,0.35)", marginLeft:10 }}>SUARL</span>
          </div>
        </div>
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, letterSpacing:"2px", color:GOLD, textAlign:"center" }}>
          Établi au Sénégal · Espace OHADA · UEMOA · CEDEAO
        </div>
        <div style={{ fontFamily:"'Jost',sans-serif", fontSize:10, color:"rgba(255,255,255,0.3)" }}>
          © 2025 LexComply SUARL — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}

export default function LexComplyWebsite() {
  const [active, setActive] = useState("accueil");
  return (
    <div className="lc-site">
      <Nav active={active} setActive={setActive} />
      <Hero />
      <Services />
      <About />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}

