// Fisheries7bNoImpossibility.jsx
// Postnieks Impossibility Program — SAPM Companion Dashboard
// Bloomberg terminal aesthetic: JetBrains Mono + Newsreader, navy/gold/crimson/green
// Drop into Next.js: pages/dashboards/Fisheries7bNoImpossibility.jsx  (or app/dashboards/Fisheries7bNoImpossibility/page.jsx)
// Dependencies: none (pure React + inline styles)

import { useState } from 'react';
import SAPMNav from "./SAPMNav";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from 'recharts';

// ─── Data ─────────────────────────────────────────────────────────────────
const META = {
  title: "Fisheries: The Impossibility Frontier",
  subtitle: "§7b Why Global Fisheries Is Type II — And Where It Is Already Transitioning",
  beta: "4.77",
  ci: "3.57–6.30",
  pi: "$47.2B",
  psa: "-$222.8B/yr",
  mu: "0.2119 (21.2%)",
  kappa: "0.64",
  type: "Type II (Institutional PST) + External Forcing Sub-Impossibility (Coral Reef Tipping)",
  companion: "",
};

const CHANNELS = [
        { id:1, name:"Stock depletion / foregone rent", beta:"~2.5", value:"$80-100B/yr", weight:"dominant" },
        { id:2, name:"Bycatch and gear selectivity", beta:"~0.8", value:"$20-30B/yr", weight:"15%" },
        { id:3, name:"Benthic habitat (trawling)", beta:"~0.72", value:"$27B/yr", weight:"10%" },
        { id:4, name:"Coral reef tipping (ALREADY CROSSED)", beta:"~0.3+", value:"$2.3B/yr+", weight:"5%+" },
        { id:5, name:"Subsidy distortion ($22B/yr harmful)", beta:"~0.3", value:"$22B/yr", weight:"5%" },
        { id:6, name:"High-seas governance failure", beta:"~0.2", value:"$8-12B/yr", weight:"3%" },
];

const CROSS_DOMAIN = [
        { domain:"Algorithmic Pricing", beta:"5.28", type:"Institutional", pi:"$39.5B", key:"sapm-algorithmic-pricing" },
        { domain:"Arms Exports", beta:"2.54", type:"Institutional", pi:"$293B", key:"sapm-arms-exports" },
        { domain:"Aviation Emissions", beta:"4.91", type:"Institutional", pi:"$1.007T", key:"sapm-aviation-emissions" },
        { domain:"Big Tech Monopoly", beta:"9.60", type:"Institutional", pi:"$158B", key:"sapm-big-tech-platform-monopoly" },
        { domain:"Cement (Calcination Floor)", beta:"6.55", type:"Impossibility", pi:"$330B", key:"sapm-cement-calcination-floor" },
        { domain:"Coal Combustion", beta:"6.96", type:"Institutional", pi:"$990B", key:"sapm-coal" },
        { domain:"CRE Urban Hollowing", beta:"11.0", type:"Institutional", pi:"$13.5B", key:"sapm-cre-urban-hollowing" },
        { domain:"Deep-Sea Mining (Abyssal Floor)", beta:"8.45", type:"Impossibility", pi:"$4.8B", key:"sapm-dsm-abyssal-recovery-floor" },
        { domain:"Global Fisheries", beta:"4.77", type:"Institutional", pi:"$37.6B", key:"sapm-fisheries-no-impossibility" },
        { domain:"Gambling Industry", beta:"7.19", type:"Institutional", pi:"$44.2B", key:"sapm-gambling" },
        { domain:"Gene Drives (Ecological Ratchet)", beta:"42.5", type:"Impossibility", pi:"$2.8B", key:"sapm-gene-drives" },
        { domain:"Gig Economy", beta:"4.56", type:"Institutional", pi:"$62.0B", key:"sapm-gig-economy" },
        { domain:"Oil & Gas Extraction", beta:"6.58", type:"Institutional", pi:"$3.50T", key:"sapm-oil-gas" },
        { domain:"Opioid Industry", beta:"12.5", type:"Institutional", pi:"$24.0B", key:"sapm-opioids" },
        { domain:"Orbital Debris (Kessler Ceiling)", beta:"5,066", type:"Impossibility", pi:"$293B", key:"sapm-orbital-debris" },
        { domain:"Palm Oil Deforestation", beta:"8.86", type:"Institutional", pi:"$67B", key:"sapm-palm-oil" },
        { domain:"Pharmacy Benefit Managers", beta:"35.4", type:"Institutional", pi:"$27.6B", key:"sapm-pbm-rebate" },
        { domain:"POPs Beyond PFAS (Inheritance Floor)", beta:"6.08", type:"Impossibility", pi:"$70B", key:"sapm-pops-beyond-pfas" },
        { domain:"For-Profit Student Loans", beta:"4.80", type:"Institutional", pi:"$46.8B", key:"sapm-student-loans-forprofit" },
        { domain:"Tobacco Industry", beta:"6.80", type:"Institutional", pi:"$965B", key:"sapm-tobacco" },
        { domain:"Topsoil Erosion (Pedogenesis Floor)", beta:"5.52", type:"Impossibility", pi:"$380B", key:"sapm-topsoil-erosion" },
        { domain:"Ultra-Processed Food", beta:"6.11", type:"Institutional", pi:"$293B", key:"sapm-upf-full" },
        { domain:"Ultra-Processed Food (No Impossibility)", beta:"6.11", type:"Institutional", pi:"$293B", key:"sapm-upf-no-impossibility" },
        { domain:"Water Privatization", beta:"3.16", type:"Institutional", pi:"$246B", key:"sapm-water-privatization" },
        { domain:"WMD/LAWS (Capability Diffusion Ceiling)", beta:"79,512", type:"Impossibility", pi:"$85B", key:"sapm-wmd-capability-diffusion-ceiling" },
];

const HIGHLIGHTS = [
        "Global fisheries FAILS all three impossibility tests: no constitutive axiom, biological reversibility, institutional correction pathway populated.",
        "Magnuson-Stevens Act rebuilt 50 stocks. Iceland cod recovery. PNA Vessel Day Scheme: $64M → $500M annual revenue. Impossibility frontier is TRAVERSABLE here.",
        "UPDATE: Global Tipping Points Report (Oct 12, 2025) confirmed warm-water coral reefs have already crossed their climate tipping point at 1.4°C — 40 years ahead of original projections.",
        "84% of reefs globally impacted by 2023–2025 bleaching event. Even at 1.5°C, all warm-water coral reefs virtually certain to pass point of no return.",
        "Coral reef sub-domain reclassified: Type II → Type III (External Forcing Impossibility). Fisheries management instruments have zero leverage over ocean temperature.",
        "Net β_W effect: +0.1 to +0.3 above headline 4.72 from coral tipping. Classification unchanged but irreversible component growing.",
];

const PSF_PARAMS = {pi_c:8.5,pi_p:37.6,w_c:177.4,kappa:1.12};
const PSF_DATA = [{pi:0.85,w:163.67},{pi:2.45,w:168.81},{pi:4.05,w:172.75},{pi:5.65,w:175.49},{pi:7.25,w:177.03},{pi:8.86,w:177.37},{pi:10.46,w:176.5},{pi:12.06,w:174.43},{pi:13.66,w:171.15},{pi:15.26,w:166.68},{pi:16.86,w:161.0},{pi:18.46,w:154.12},{pi:20.06,w:146.05},{pi:21.66,w:136.77},{pi:23.26,w:126.28},{pi:24.87,w:114.52},{pi:26.47,w:101.63},{pi:28.07,w:87.54},{pi:29.67,w:72.25},{pi:31.27,w:55.75},{pi:32.87,w:38.05},{pi:34.47,w:19.16},{pi:36.07,w:-0.94},{pi:37.67,w:-22.25},{pi:39.27,w:-44.75},{pi:40.88,w:-68.6},{pi:42.48,w:-93.51},{pi:44.08,w:-119.63},{pi:45.68,w:-146.94},{pi:47.28,w:-175.46},{pi:48.88,w:-205.18}];

const MC_HIST = [{bin:"3.21",lo:3.2146,hi:3.2893,count:43},{bin:"3.29",lo:3.2893,hi:3.3640,count:65},{bin:"3.36",lo:3.3640,hi:3.4386,count:92},{bin:"3.44",lo:3.4386,hi:3.5133,count:133},{bin:"3.51",lo:3.5133,hi:3.5880,count:162},{bin:"3.59",lo:3.5880,hi:3.6627,count:174},{bin:"3.66",lo:3.6627,hi:3.7373,count:235},{bin:"3.74",lo:3.7373,hi:3.8120,count:283},{bin:"3.81",lo:3.8120,hi:3.8867,count:296},{bin:"3.89",lo:3.8867,hi:3.9614,count:326},{bin:"3.96",lo:3.9614,hi:4.0360,count:360},{bin:"4.04",lo:4.0360,hi:4.1107,count:378},{bin:"4.11",lo:4.1107,hi:4.1854,count:382},{bin:"4.19",lo:4.1854,hi:4.2601,count:329},{bin:"4.26",lo:4.2601,hi:4.3347,count:325},{bin:"4.33",lo:4.3347,hi:4.4094,count:323},{bin:"4.41",lo:4.4094,hi:4.4841,count:332},{bin:"4.48",lo:4.4841,hi:4.5588,count:314},{bin:"4.56",lo:4.5588,hi:4.6334,count:327},{bin:"4.63",lo:4.6334,hi:4.7081,count:270},{bin:"4.71",lo:4.7081,hi:4.7828,count:349},{bin:"4.78",lo:4.7828,hi:4.8575,count:281},{bin:"4.86",lo:4.8575,hi:4.9321,count:252},{bin:"4.93",lo:4.9321,hi:5.0068,count:273},{bin:"5.01",lo:5.0068,hi:5.0815,count:247},{bin:"5.08",lo:5.0815,hi:5.1562,count:240},{bin:"5.16",lo:5.1562,hi:5.2308,count:249},{bin:"5.23",lo:5.2308,hi:5.3055,count:219},{bin:"5.31",lo:5.3055,hi:5.3802,count:218},{bin:"5.38",lo:5.3802,hi:5.4549,count:206},{bin:"5.45",lo:5.4549,hi:5.5295,count:206},{bin:"5.53",lo:5.5295,hi:5.6042,count:194},{bin:"5.60",lo:5.6042,hi:5.6789,count:202},{bin:"5.68",lo:5.6789,hi:5.7536,count:170},{bin:"5.75",lo:5.7536,hi:5.8282,count:169},{bin:"5.83",lo:5.8282,hi:5.9029,count:167},{bin:"5.90",lo:5.9029,hi:5.9776,count:145},{bin:"5.98",lo:5.9776,hi:6.0523,count:125},{bin:"6.05",lo:6.0523,hi:6.1269,count:131},{bin:"6.13",lo:6.1269,hi:6.2016,count:111},{bin:"6.20",lo:6.2016,hi:6.2763,count:102},{bin:"6.28",lo:6.2763,hi:6.3510,count:106},{bin:"6.35",lo:6.3510,hi:6.4256,count:90},{bin:"6.43",lo:6.4256,hi:6.5003,count:59},{bin:"6.50",lo:6.5003,hi:6.5750,count:63},{bin:"6.57",lo:6.5750,hi:6.6497,count:52},{bin:"6.65",lo:6.6497,hi:6.7243,count:46},{bin:"6.72",lo:6.7243,hi:6.7990,count:29},{bin:"6.80",lo:6.7990,hi:6.8737,count:30},{bin:"6.87",lo:6.8737,hi:6.9484,count:20}];
const MC_STATS = {mean:4.7669,median:4.6515,ci_lo:3.5680,ci_hi:6.3043,pct_hw:100.0,pct_above_3:99.9,pct_above_5:36.7,min:2.8356,max:7.8549,n_draws:10000,seed:42};
const MC_CHANNELS = [{name:"Stock depletion",mean:79.69,p5:60.40,p50:80.35,p95:97.12,share:0.4514},{name:"Bycatch & discards",mean:15.01,p5:10.21,p50:15.05,p95:19.76,share:0.0850},{name:"Benthic habitat destruction",mean:28.07,p5:17.21,p50:27.81,p95:39.63,share:0.1590},{name:"IUU fishing",mean:16.99,p5:12.24,p50:17.01,p95:21.81,share:0.0962},{name:"Capacity-enhancing subsidies",mean:22.76,p5:19.45,p50:22.63,p95:26.33,share:0.1289},{name:"Governance & forced labor",mean:14.03,p5:6.84,p50:14.04,p95:21.18,share:0.0795}];
const MC_WELFARE = {mean:176.55,ci_lo:152.24,ci_hi:199.78};

const THRESHOLDS = [{domain:"WTO Fisheries Subsidies Agreement enforcement",year:2025,confidence:"High",status:"In force September 2025; estimated $5-8B of $22.2B harmful subsidies addressed",crossed:true},{domain:"BBNJ Treaty entry into force",year:2026,confidence:"High",status:"Ratification threshold met; entered force January 2026",crossed:true},{domain:"Global MSY compliance >50% of assessed stocks",year:2030,confidence:"Medium",status:"Currently ~37.7% overfished globally (FAO SOFIA 2024)",crossed:false},{domain:"Coral reef fisheries tipping point",year:2025,confidence:"High",status:"ALREADY CROSSED — GTPR 2025: warm-water reefs past thermal tipping at 1.4°C",crossed:true},{domain:"High-seas MPA 30% coverage",year:2030,confidence:"Medium",status:"30×30 target; BBNJ framework now provides mechanism",crossed:false}];

const AXIOMS = {type:"institutional",items:[{id:"I1",name:"Open-access commons depletion",description:"Without enforceable property rights over fish stocks, each vessel\'s rational response is to maximize current catch before competitors do, driving effort to the bioeconomic equilibrium where rent = 0."},{id:"I2",name:"Subsidy-overcapacity feedback",description:"$22.2B/year in capacity-enhancing subsidies sustain 2.5x more fleet than is sustainably necessary, creating a self-reinforcing loop: subsidies → overcapacity → depletion → subsidy dependency."},{id:"I3",name:"External forcing impossibility (coral sub-domain)",description:"Coral reef fisheries welfare destruction is now constitutively driven by ocean warming operating outside fisheries management\'s institutional reach — no ITQ or MPA can reduce sea surface temperature below the bleaching threshold."}]};

const METHODS_DATA = {
  welfare_function: "W computed as foregone economic rent from the World Bank Arnason bioeconomic model ($83B stock depletion) plus five additional channels using FAO SOFIA 2024 and peer-reviewed cost estimates.",
  cooperative_baseline: "Global fisheries operating at Maximum Economic Yield under full ITQ/MPA implementation, generating $552B/year in sustainable revenue — the World Bank bioeconomic projection after 44% effort reduction.",
  falsification: ["F1: Demonstrate that global ITQ implementation fails to rebuild overfished stocks, contradicting the 50-stock U.S. MSA rebuilding record since 2000.","F2: Show that eliminating $22.2B in capacity-enhancing subsidies increases rather than decreases the global fishing fleet through second-order market effects.","F3: Demonstrate that coral reef fisheries productivity can be maintained under continued 1.4°C+ warming without requiring sea surface temperature reduction."],
  key_sources: ["World Bank, Sunken Billions Revisited (2017)","FAO, State of World Fisheries and Aquaculture (2024)","Costello et al., Status and solutions for the world\'s unassessed fisheries (2012)","Global Tipping Points Report 2025 (Lenton et al.)"]
};

// ─── Color palette ───────────────────────────────────────────────────────────
const C = {
  bg:      '#0D0D0D',
  panel:   '#1A1A1A',
  border:  'rgba(255,255,255,0.08)',
  navy:    '#1A1A1A',
  gold:    '#F59E0B',
  crimson: '#EF4444',
  green:   '#22C55E',
  text:    '#F5F0E8',
  muted:   'rgba(255,255,255,0.4)',
  thead:   '#141414',
  mono:    "'JetBrains Mono', 'Fira Code', monospace",
  serif:   "'Newsreader', 'Georgia', serif",
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function Metric({ label, value, sub, color }) {
  return (
    <div style={{flex:1,minWidth:140,background:C.panel,border:`1px solid ${C.border}`,borderRadius:3,padding:'12px 16px'}}>
      <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:1,marginBottom:4}}>{label}</div>
      <div style={{fontFamily:C.mono,fontSize:28,fontWeight:700,color:color||C.gold,lineHeight:1}}>{value}</div>
      {sub && <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,marginTop:4}}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{fontFamily:C.mono,fontSize:12,color:C.muted,letterSpacing:2,borderBottom:`1px solid ${C.border}`,paddingBottom:6,marginBottom:12,marginTop:20,textTransform:'uppercase'}}>
      {children}
    </div>
  );
}

function BetaBar({ beta, max }) {
  const pct = Math.min(100, (parseFloat(beta)||0) / (max||15) * 100);
  const color = pct > 80 ? C.crimson : pct > 50 ? '#D97706' : C.gold;
  return (
    <div style={{background:'rgba(255,255,255,0.04)',borderRadius:2,height:8,flex:1,margin:'0 8px'}}>
      <div style={{width:`${pct}%`,height:'100%',background:color,borderRadius:2,transition:'width 0.4s'}} />
    </div>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      fontFamily:C.mono, fontSize:12, letterSpacing:1,
      padding:'6px 14px', border:'none', cursor:'pointer',
      background: active ? C.gold : 'transparent',
      color: active ? '#000' : C.muted,
      borderBottom: active ? `2px solid ${C.gold}` : '2px solid transparent',
      textTransform:'uppercase',
    }}>{label}</button>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Fisheries7bNoImpossibilityDashboard() {
  const [tab, setTab] = useState('overview');
  const maxBeta = Math.max(...CROSS_DOMAIN.map(d => parseFloat(d.beta)||0), parseFloat(META.beta)||0, 10);

  return (
    <div style={{background:C.bg,minHeight:'100vh',padding:'0',fontFamily:C.mono,color:C.text}}>

      {/* Header */}
      <div style={{background:C.panel,borderBottom:`2px solid ${C.gold}`,padding:'14px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div>
          <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:2,marginBottom:4}}>POSTNIEKS IMPOSSIBILITY PROGRAM · SAPM</div>
          <div style={{fontFamily:C.serif,fontSize:24,fontWeight:700,color:C.text}}>{META.title}</div>
          {META.subtitle && <div style={{fontFamily:C.serif,fontSize:15,color:C.muted,marginTop:2,fontStyle:'italic'}}>{META.subtitle}</div>}
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,letterSpacing:1}}>SYSTEM BETA</div>
          <div style={{fontFamily:C.mono,fontSize:36,fontWeight:700,color:C.gold,lineHeight:1}}>β_W = {META.beta}</div>
          {META.ci && <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>90% CI [{META.ci}]</div>}
        </div>
      </div>

      {/* PST badge + type */}
      <div style={{background:'rgba(245,158,11,0.06)',padding:'8px 24px',display:'flex',gap:10,alignItems:'center',borderBottom:`1px solid ${C.border}`}}>
        <span style={{background:'rgba(34,197,94,0.15)',color:'#22C55E',fontSize:12,padding:'4px 10px',borderRadius:2,fontFamily:'JetBrains Mono,monospace',letterSpacing:0.5}}>INSTITUTIONAL PST</span>
        <span style={{fontFamily:C.mono,fontSize:12,color:C.muted}}>{META.type}</span>
        {META.companion && <a href={META.companion} target="_blank" rel="noreferrer" style={{marginLeft:'auto',fontFamily:C.mono,fontSize:11,color:C.gold,textDecoration:'none'}}>↗ Companion Dashboard</a>}
      </div>

      {/* Tab bar */}
      <div style={{background:C.panel,borderBottom:`1px solid ${C.border}`,padding:'0 24px',display:'flex',gap:4}}>
        {['overview','channels','psf','monte-carlo','thresholds','cross-domain','methods','highlights'].map(t => (
          <Tab key={t} label={t} active={tab===t} onClick={()=>setTab(t)} />
        ))}
      </div>

      <div style={{padding:'20px 24px',maxWidth:1100}}>

        {/* OVERVIEW TAB */}
        {tab === 'overview' && (
          <div>
            {/* Key metrics row */}
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
              <Metric label="β_W  (System Beta)" value={META.beta} sub={META.ci ? `90% CI [${META.ci}]` : 'Headline estimate'} color={C.gold} />
              {META.pi && <Metric label="Private Payoff Π" value={META.pi+'/yr'} sub="Private sector capture" color={C.text} />}
              {META.psa && <Metric label="System-Adj. Payoff Π_SA" value={META.psa} sub="β_W · Π − W" color={C.crimson} />}
              {META.mu && <Metric label="Break-Even μ*" value={META.mu} sub="Welfare neutrality threshold" color={'#22C55E'} />}
              {META.kappa && <Metric label="PSF Curvature κ" value={META.kappa} sub="Pareto shortfall index" color={C.muted} />}
            </div>

            
      {/* Theorem Statement */}
      <div style={{background:'#1A1A1A',border:'2px solid #F59E0B',borderRadius:4,padding:'16px 20px',marginBottom:16}}>
        <div style={{fontFamily:'Newsreader,serif',fontSize:11,color:'#aabbcc',marginBottom:6,letterSpacing:1}}>THEOREM STATEMENT</div>
        <div style={{fontFamily:'Newsreader,serif',fontSize:14,color:'#e8e8e8',fontStyle:'italic',lineHeight:1.6}}>External Forcing Impossibility (new category): Welfare destruction constitutively generated by an external forcing (ocean warming) that operates outside the domain\'s institutional reach. W_reef(T*+ε) → W_reef_floor > 0 for all H(t), regardless of fisheries management. No impossibility theorem governs global fisheries as a whole. (Postnieks, 2026)</div>
      </div>

            {/* Channel waterfall */}
            {CHANNELS.length > 0 && (
              <div>
                <SectionTitle>Channel Decomposition — Welfare Cost Waterfall</SectionTitle>
                {CHANNELS.map((ch,i) => (
                  <div key={i} style={{display:'flex',alignItems:'center',marginBottom:8,gap:8}}>
                    <div style={{fontFamily:C.mono,fontSize:12,color:C.muted,width:22,textAlign:'right'}}>{ch.id}</div>
                    <div style={{fontFamily:C.serif,fontSize:15,color:C.text,width:300,flexShrink:0}}>{ch.name}</div>
                    <BetaBar beta={ch.beta} max={parseFloat(META.beta)||15} />
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.gold,width:55,textAlign:'right'}}>{ch.beta}</div>
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.text,width:110,textAlign:'right'}}>{ch.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CHANNELS TAB */}
        {tab === 'channels' && (
          <div>
            <SectionTitle>Channel-by-Channel Breakdown</SectionTitle>
            <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
              <thead>
                <tr style={{background:C.thead}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>#</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Channel</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>β_W(i)</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>δ_i ($/yr)</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Weight</th>
                </tr>
              </thead>
              <tbody>
                {CHANNELS.map((ch,i) => (
                  <tr key={i} style={{background: i%2===0 ? C.panel : C.bg}}>
                    <td style={{padding:'8px 12px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{ch.id}</td>
                    <td style={{padding:'8px 12px',color:C.text,fontFamily:C.serif,fontSize:14,borderBottom:`1px solid ${C.border}`}}>{ch.name}</td>
                    <td style={{padding:'8px 12px',color:C.gold,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.beta}</td>
                    <td style={{padding:'8px 12px',color:C.text,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.value}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{ch.weight}</td>
                  </tr>
                ))}
                <tr style={{background:C.thead}}>
                  <td colSpan={2} style={{padding:'10px 12px',color:C.gold,fontWeight:700,fontSize:14}}>AGGREGATE β_W</td>
                  <td colSpan={3} style={{padding:'10px 12px',color:C.gold,fontWeight:700,fontSize:16,textAlign:'right'}}>{META.beta}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* CROSS-DOMAIN TAB */}
        {tab === 'cross-domain' && (
          <div>
            <SectionTitle>Cross-Domain SAPM Registry</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={Math.min(500, CROSS_DOMAIN.filter(d => parseFloat(d.beta) > 0 && parseFloat(d.beta) <= 50).length * 28 + 60)}>
                <BarChart data={[...CROSS_DOMAIN].filter(d => parseFloat(d.beta) > 0 && parseFloat(d.beta) <= 50).sort((a,b) => parseFloat(a.beta) - parseFloat(b.beta)).map(d => ({...d, betaNum: parseFloat(d.beta)}))} layout="vertical" margin={{top:10,right:30,left:200,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis type="number" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} />
                  <YAxis type="category" dataKey="domain" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} width={190} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <ReferenceLine x={1} stroke={C.crimson} strokeDasharray="3 3" label={{value:"β=1",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                  <Bar dataKey="betaNum" fill={C.gold} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
              <thead>
                <tr style={{background:C.thead}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Domain</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>β_W</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold,borderBottom:`1px solid ${C.border}`}}>PST Type</th>
                  <th style={{padding:'8px 12px',textAlign:'right',color:C.gold,borderBottom:`1px solid ${C.border}`}}>Π ($/yr)</th>
                </tr>
              </thead>
              <tbody>
                {[...CROSS_DOMAIN].sort((a,b) => (parseFloat(b.beta)||0) - (parseFloat(a.beta)||0)).map((d,i) => (
                  <tr key={i} style={{background: d.key==='sapm-fisheries-no-impossibility' ? 'rgba(34,197,94,0.08)' : i%2===0 ? C.panel : C.bg}}>
                    <td style={{padding:'8px 12px',color: d.key==='sapm-fisheries-no-impossibility' ? '#22C55E' : C.text,fontFamily:C.serif,fontSize:14,borderBottom:`1px solid ${C.border}`}}>
                      {d.key==='sapm-fisheries-no-impossibility' ? '▶ ' : ''}{d.domain}
                    </td>
                    <td style={{padding:'8px 12px',color: parseFloat(d.beta)>10 ? C.crimson : C.gold,textAlign:'right',fontWeight:700,borderBottom:`1px solid ${C.border}`}}>{d.beta}</td>
                    <td style={{padding:'8px 12px',color:C.muted,borderBottom:`1px solid ${C.border}`}}>{d.type}</td>
                    <td style={{padding:'8px 12px',color:C.text,textAlign:'right',borderBottom:`1px solid ${C.border}`}}>{d.pi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


        {/* PSF TAB */}
        {tab === 'psf' && (
          <div>
            <SectionTitle>Private-Systemic Frontier</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={PSF_DATA} margin={{top:10,right:30,left:20,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="pi" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"Π (Private Payoff)",position:"bottom",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <YAxis stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"W (System Welfare)",angle:-90,position:"insideLeft",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <Area type="monotone" dataKey="w" stroke={C.gold} fill="rgba(245,158,11,0.15)" strokeWidth={2} />
                  <ReferenceLine x={PSF_PARAMS.pi_c} stroke={C.green} strokeDasharray="5 5" label={{value:"Π_C",fill:C.green,fontFamily:C.mono,fontSize:11}} />
                  <ReferenceLine x={PSF_PARAMS.pi_p} stroke={C.crimson} strokeDasharray="5 5" label={{value:"Current",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
              <Metric label="COOPERATIVE PAYOFF Π_C" value={'$'+PSF_PARAMS.pi_c+'B'} sub="Welfare-maximizing extraction" color={C.green} />
              <Metric label="CURRENT PAYOFF Π_P" value={'$'+PSF_PARAMS.pi_p+'B'} sub="Actual private extraction" color={C.crimson} />
              <Metric label="OVER-EXTRACTION" value={'$'+(PSF_PARAMS.pi_p - PSF_PARAMS.pi_c)+'B'} sub="Gap driving welfare loss" color={C.gold} />
            </div>
            <div style={{marginTop:16,padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4}}>
              <div style={{fontFamily:C.mono,fontSize:12,color:C.gold,marginBottom:8}}>SAPM ↔ CAPM CORRESPONDENCE</div>
              <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
                <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold}}>SAPM CONSTRUCT</th>
                  <th style={{padding:'8px 12px',textAlign:'left',color:C.gold}}>CAPM ANALOGUE</th>
                </tr></thead>
                <tbody>
                  {[['β_W (System Beta)','β (Market Beta)'],['PSF (Private-Systemic Frontier)','SML (Security Market Line)'],['μ* (Shadow Price)','r_f (Risk-Free Rate)'],['Πˢᵃ (System-Adjusted Payoff)','α (Jensen\'s Alpha)'],['W (System Welfare)','No equivalent — structurally invisible'],['𝒮_W (Welfare Efficiency)','Sharpe Ratio']].map(([s,c],i) => (
                    <tr key={i} style={{borderBottom:`1px solid rgba(255,255,255,0.04)`}}>
                      <td style={{padding:'8px 12px',color:C.text}}>{s}</td>
                      <td style={{padding:'8px 12px',color:C.muted,fontFamily:C.serif}}>{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* MONTE CARLO TAB */}
        {tab === 'monte-carlo' && (
          <div>
            <SectionTitle>Monte Carlo Simulation — {MC_STATS.n_draws.toLocaleString()} Draws (seed={MC_STATS.seed})</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={MC_HIST} margin={{top:10,right:30,left:20,bottom:30}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="bin" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:9}} angle={-45} textAnchor="end" interval={4} />
                  <YAxis stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} formatter={(v)=>[v,'Draws']} />
                  <Bar dataKey="count" fill={C.gold} />
                  <ReferenceLine x={MC_STATS.mean.toFixed(2)} stroke={C.crimson} strokeWidth={2} strokeDasharray="5 5" label={{value:'μ='+MC_STATS.mean.toFixed(2),fill:C.crimson,fontFamily:C.mono,fontSize:11,position:'top'}} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
              <Metric label="MEAN β_W" value={MC_STATS.mean.toFixed(2)} sub={'Median: '+MC_STATS.median.toFixed(2)} color={C.gold} />
              <Metric label="90% CI" value={'['+MC_STATS.ci_lo.toFixed(2)+', '+MC_STATS.ci_hi.toFixed(2)+']'} sub={'Range: '+MC_STATS.min.toFixed(2)+'–'+MC_STATS.max.toFixed(2)} color={C.muted} />
              <Metric label="% HOLLOW WIN" value={MC_STATS.pct_hw.toFixed(1)+'%'} sub={'β_W > 1 in all draws'} color={MC_STATS.pct_hw > 95 ? C.crimson : C.gold} />
              <Metric label="% β_W > 3" value={MC_STATS.pct_above_3.toFixed(1)+'%'} color={MC_STATS.pct_above_3 > 90 ? C.crimson : C.gold} />
              <Metric label="% β_W > 5" value={MC_STATS.pct_above_5.toFixed(1)+'%'} color={MC_STATS.pct_above_5 > 50 ? '#D97706' : C.gold} />
            </div>
            <SectionTitle>Channel Welfare Contributions</SectionTitle>
            <table style={{width:'100%',borderCollapse:'collapse',fontFamily:C.mono,fontSize:13}}>
              <thead><tr style={{borderBottom:`1px solid ${C.border}`}}>
                <th style={{padding:'8px 12px',textAlign:'left',color:C.gold}}>CHANNEL</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>MEAN $B</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>P5</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>P50</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>P95</th>
                <th style={{padding:'8px 12px',textAlign:'right',color:C.gold}}>SHARE</th>
              </tr></thead>
              <tbody>
                {MC_CHANNELS.map((ch,i) => (
                  <tr key={i} style={{borderBottom:`1px solid rgba(255,255,255,0.04)`,background:i%2===0?C.panel:C.bg}}>
                    <td style={{padding:'8px 12px',color:C.text,fontFamily:C.serif,fontSize:14}}>{ch.name}</td>
                    <td style={{padding:'8px 12px',color:C.gold,textAlign:'right',fontWeight:600}}>{ch.mean.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{ch.p5.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{ch.p50.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{ch.p95.toFixed(1)}</td>
                    <td style={{padding:'8px 12px',color:C.muted,textAlign:'right'}}>{(ch.share*100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{marginTop:16,padding:12,background:'rgba(245,158,11,0.06)',border:`1px solid rgba(245,158,11,0.15)`,borderRadius:4}}>
              <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>Total welfare cost: <span style={{color:C.gold}}>${MC_WELFARE.mean.toFixed(1)}B</span> (90% CI: ${MC_WELFARE.ci_lo.toFixed(1)}B – ${MC_WELFARE.ci_hi.toFixed(1)}B) · Source: sapm_monte_carlo.py (seed=42)</div>
            </div>
          </div>
        )}

        {/* THRESHOLDS TAB */}
        {tab === 'thresholds' && (
          <div>
            <SectionTitle>Critical Thresholds & Predicted Crossover</SectionTitle>
            <div style={{background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,padding:16,marginBottom:16}}>
              <ResponsiveContainer width="100%" height={Math.max(200, THRESHOLDS.length * 44)}>
                <BarChart data={THRESHOLDS.map(t=>({...t,yearsFromNow:t.year-2026}))} layout="vertical" margin={{top:10,right:30,left:180,bottom:10}}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis type="number" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} label={{value:"Years from 2026",position:"bottom",fill:C.muted,fontFamily:C.mono,fontSize:11}} />
                  <YAxis type="category" dataKey="domain" stroke={C.muted} tick={{fontFamily:C.mono,fontSize:11}} width={170} />
                  <Tooltip contentStyle={{background:C.panel,border:`1px solid ${C.border}`,fontFamily:C.mono,fontSize:12,color:C.text}} />
                  <ReferenceLine x={0} stroke={C.crimson} strokeDasharray="3 3" label={{value:"NOW",fill:C.crimson,fontFamily:C.mono,fontSize:11}} />
                  <Bar dataKey="yearsFromNow" fill={C.gold} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{display:'grid',gap:12}}>
              {THRESHOLDS.map((t,i) => (
                <div key={i} style={{display:'flex',alignItems:'center',gap:16,padding:'12px 16px',background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,borderLeft:`3px solid ${t.crossed ? C.crimson : C.gold}`}}>
                  <div style={{fontFamily:C.mono,fontSize:14,color:t.crossed ? C.crimson : C.gold,fontWeight:700,minWidth:50}}>{t.year}</div>
                  <div style={{flex:1}}>
                    <div style={{fontFamily:C.mono,fontSize:13,color:C.text}}>{t.domain}</div>
                    <div style={{fontFamily:C.serif,fontSize:13,color:C.muted,marginTop:2}}>{t.status}</div>
                  </div>
                  <div style={{fontFamily:C.mono,fontSize:11,color:C.muted,padding:'2px 8px',border:`1px solid ${C.border}`,borderRadius:2}}>{t.confidence}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* METHODS TAB */}
        {tab === 'methods' && (
          <div>
            <SectionTitle>{AXIOMS.type === 'impossibility' ? 'Impossibility Axioms' : 'Institutional Failure Mechanisms'}</SectionTitle>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:12,marginBottom:20}}>
              {AXIOMS.items.map((a,i) => (
                <div key={i} style={{padding:16,background:C.panel,border:`1px solid ${AXIOMS.type === 'impossibility' ? 'rgba(239,68,68,0.2)' : C.border}`,borderRadius:4}}>
                  <div style={{fontFamily:C.mono,fontSize:12,color:AXIOMS.type === 'impossibility' ? C.crimson : C.gold,letterSpacing:1,marginBottom:6}}>{a.id}</div>
                  <div style={{fontFamily:C.serif,fontSize:15,color:C.text,fontWeight:600,marginBottom:6}}>{a.name}</div>
                  <div style={{fontFamily:C.serif,fontSize:14,color:C.muted,lineHeight:1.6}}>{a.description}</div>
                </div>
              ))}
            </div>

            <SectionTitle>System Welfare Function</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{METHODS_DATA.welfare_function}</div>
            </div>

            <SectionTitle>Cooperative Baseline</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{METHODS_DATA.cooperative_baseline}</div>
            </div>

            <SectionTitle>Falsification Criteria</SectionTitle>
            <div style={{display:'grid',gap:8,marginBottom:20}}>
              {METHODS_DATA.falsification.map((f,i) => (
                <div key={i} style={{padding:'10px 16px',background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,fontFamily:C.serif,fontSize:14,color:C.text,lineHeight:1.6}}>{f}</div>
              ))}
            </div>

            <SectionTitle>Key Sources</SectionTitle>
            <div style={{padding:16,background:C.panel,border:`1px solid ${C.border}`,borderRadius:4,marginBottom:20}}>
              {METHODS_DATA.key_sources.map((s,i) => (
                <div key={i} style={{fontFamily:C.mono,fontSize:12,color:C.muted,padding:'4px 0',borderBottom:`1px solid rgba(255,255,255,0.04)`}}>{s}</div>
              ))}
            </div>

            <div style={{padding:16,background:'rgba(245,158,11,0.06)',border:`1px solid rgba(245,158,11,0.15)`,borderRadius:4}}>
              <div style={{fontFamily:C.mono,fontSize:12,color:C.gold,marginBottom:8}}>CITATION</div>
              <div style={{fontFamily:C.serif,fontSize:14,color:C.text,lineHeight:1.6}}>
                Postnieks, E. (2026). System Asset Pricing Model: {META.title}. SAPM Working Paper. Wooster LLC.
              </div>
            </div>
          </div>
        )}

        {/* HIGHLIGHTS TAB */}
        {tab === 'highlights' && (
          <div>
            <SectionTitle>Key Findings</SectionTitle>
            {HIGHLIGHTS.map((h,i) => (
              <div key={i} style={{display:'flex',gap:12,marginBottom:12,background:C.panel,border:`1px solid ${C.border}`,borderRadius:3,padding:'12px 16px'}}>
                <div style={{fontFamily:C.mono,fontSize:16,color:C.gold,flexShrink:0}}>▸</div>
                <div style={{fontFamily:C.serif,fontSize:15,color:C.text,lineHeight:1.7}}>{h}</div>
              </div>
            ))}
          </div>
        )}

      </div>

      
      {/* 𝒮_W WELFARE EFFICIENCY RATIO */}
      <div style={{padding:"24px",background:C.panel,border:"2px solid #D9770640",borderRadius:4,margin:"24px 0"}}>
        <div style={{fontFamily:C.mono,fontSize:12,color:"#D97706",letterSpacing:2,marginBottom:16}}>WELFARE EFFICIENCY RATIO</div>
        <div style={{display:"flex",alignItems:"baseline",gap:12,marginBottom:12}}>
          <span style={{fontFamily:C.mono,fontSize:42,fontWeight:700,color:"#D97706"}}>𝒮_W = 0.21</span>
        </div>
        <div style={{fontFamily:C.mono,fontSize:13,color:C.muted,marginBottom:16}}>
          S&P 500 long-run Sharpe ≈ 0.40 &nbsp;|&nbsp; Acceptable ≥ 0.30 &nbsp;|&nbsp; Poor &lt; 0.10
        </div>
        <div style={{fontFamily:C.serif,fontSize:16,color:"#D97706",lineHeight:1.7,fontStyle:"italic"}}>
          A Sharpe ratio this low would cause any fund manager to liquidate the position immediately.
        </div>
      </div>

      {/* GREEK SYMBOL GLOSSARY */}
      <details style={{margin:"24px 0"}}>
        <summary style={{fontFamily:C.mono,fontSize:13,color:C.gold,cursor:"pointer",padding:"12px 16px",background:C.panel,border:"1px solid rgba(245,158,11,0.15)",borderRadius:4,letterSpacing:1,listStyle:"none",display:"flex",alignItems:"center",gap:8}}>
          <span style={{color:C.gold,fontSize:14}}>▸</span> WHAT THESE SYMBOLS MEAN — AND WHY THEY MATTER
        </summary>
        <div style={{background:C.panel,border:"1px solid rgba(245,158,11,0.15)",borderTop:"none",borderRadius:"0 0 4px 4px",padding:"16px",overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontFamily:C.mono,fontSize:13}}>
            <thead>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>SYMBOL</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>PRONOUNCED</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>WHAT IT MEASURES</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>CAPM EQUIVALENT</th>
                <th style={{textAlign:"left",padding:"8px 10px",color:C.gold,fontSize:12,letterSpacing:1}}>WHY IT MATTERS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>β_W</td>
                <td style={{padding:"10px",color:C.text}}>beta-W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>How much social welfare this sector destroys per dollar of private gain. β_W = 5.0 means $5 of welfare destroyed per $1 earned.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>β (market beta) — measures how much an asset moves with the market</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>In CAPM, high beta means high financial risk. In SAPM, high β_W means high welfare destruction per dollar of revenue.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>𝒮_W</td>
                <td style={{padding:"10px",color:C.text}}>S-W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Private gain per dollar of system welfare cost. Higher is better — but in PST domains it is always low.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Sharpe Ratio — return per unit of risk</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>S&P 500 long-run Sharpe ≈ 0.40. A Sharpe of 0.10 is poor. VW Dieselgate: 𝒮_W = 0.12. LIBOR: 𝒮_W ≈ 0. ERCOT: 𝒮_W = 0.0005. These are welfare efficiency ratios of industries that GDP calls productive.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>T*</td>
                <td style={{padding:"10px",color:C.text}}>T-star</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The predicted time until a Hollow Win collapses into outright failure.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to duration or time-to-default in credit analysis</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: T* = 6.1 years predicted, ~6 years observed. LIBOR: T* ≤ 0 — the system was failing from day one. Seven years of concealment, not surplus.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>μ*</td>
                <td style={{padding:"10px",color:C.text}}>mu-star</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The efficient price of system welfare — what it would cost to make the deal system-preserving. μ* = 1/β_W. Derived from frontier geometry, not assigned by an analyst.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to the risk-free rate as a floor price for risk</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>β_W = 7.4 → μ* ≈ 0.135. β_W = 35.2 → μ* ≈ 0.028. Lower μ* means cheaper welfare preservation in theory — PST means it never happens without intervention.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>Πˢᵃ</td>
                <td style={{padding:"10px",color:C.text}}>pi-SA</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The deal's true value after subtracting welfare cost. Πˢᵃ = Π − μ* · ΔW. If negative, the deal destroys more welfare than it creates.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Jensen's alpha — return above what risk justifies</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>A deal that looks like +$2.3M joint gain may be −$2.4M system-adjusted. Every GDSS deployed today shows only the first number.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>W</td>
                <td style={{padding:"10px",color:C.text}}>W</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The health of the shared system both parties are embedded in. Not A's welfare. Not B's welfare. The system's.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No CAPM equivalent — this is the variable CAPM cannot see</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>The Private Pareto Theorem proves W cannot be computed from bilateral payoffs. It is structurally outside the payoff space. This is the impossibility.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>δ</td>
                <td style={{padding:"10px",color:C.text}}>delta</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Total accumulated welfare cost at crossover — the damage done before the Hollow Win collapses.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No direct equivalent</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: δ ≈ $3.7 billion in accumulated emissions damage before EPA notice of violation.</td>
              </tr>
              <tr style={{borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>η</td>
                <td style={{padding:"10px",color:C.text}}>eta</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>How quickly system damage feeds back into private costs. Low η means the Hollow Win persists longer before collapsing.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Closest to mean reversion speed in financial models</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>VW: η ≈ 0.3. ERCOT: η ≈ 0 — no feedback until catastrophic failure.</td>
              </tr>
              <tr>
                <td style={{padding:"10px",color:C.gold,fontWeight:600}}>λ</td>
                <td style={{padding:"10px",color:C.text}}>lambda</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Rate of welfare cost accumulation per unit of private gain. Combined with η and δ determines T*.</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>No direct equivalent</td>
                <td style={{padding:"10px",color:C.muted,fontFamily:C.serif}}>Higher λ means faster damage accumulation.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>

      {/* Footer */}
      <div style={{background:C.panel,borderTop:`1px solid ${C.border}`,padding:'10px 24px',display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:40}}>
        <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>Erik Postnieks · Wooster LLC · Postnieks Impossibility Program</div>
        <div style={{fontFamily:C.mono,fontSize:11,color:C.muted}}>SAPM Working Paper · 2026</div>
      </div>
    <SAPMNav />
      </div>
  );
}
