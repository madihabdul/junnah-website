import React, { useMemo, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowLeft, ArrowRight, BadgeCheck, Bell, BookOpen,
  BriefcaseBusiness, Building2, CalendarClock, Check, CheckCircle2,
  ChevronDown, CircleDollarSign, ClipboardCheck, Clock3, FileCheck2,
  FileText, GraduationCap, HandCoins, HeartHandshake, HelpCircle,
  LayoutDashboard, LifeBuoy, LockKeyhole, Menu, MoreHorizontal,
  Search, ShieldCheck, Sparkles, Wallet, X
} from "lucide-react";

const money = (n) => new Intl.NumberFormat("en-US", {
  style: "currency", currency: "USD", maximumFractionDigits: 0
}).format(n);

const illustrativeApplicationFee = 25;

const initialCases = [
  {
    id: "JUN-2026-0142", name: "Amira Hassan", initials: "AH",
    university: "Garden State University", major: "Computer Science",
    year: "Senior · Final semester", scenario: "Employed, lives with family",
    applicationType: "existing-balance",
    reason: "Registration hold", balance: 4000, requested: 4000,
    deadline: "Oct 28, 2026", status: "Under review", verified: true,
    income: 1850, expenses: 1120, aid: 1500,
    description: "A verified tuition balance is preventing registration for the upcoming semester.",
    notes: "University balance verified. Review disposable income and confirm remaining aid before decision.",
    timeline: [
      ["Oct 16", "Application submitted", "complete"],
      ["Oct 17", "University balance verified", "complete"],
      ["Oct 18", "Financial review in progress", "current"],
      ["—", "Decision and agreement", "upcoming"],
      ["—", "University payment", "upcoming"]
    ]
  },
  {
    id: "JUN-2026-0143", name: "Yusuf Rahman", initials: "YR",
    university: "Garden State University", major: "Biology",
    year: "Senior · Graduation eligible", scenario: "No financial support",
    applicationType: "existing-balance",
    reason: "Graduation clearance", balance: 2750, requested: 2750,
    deadline: "Nov 05, 2026", status: "Submitted", verified: false,
    income: 0, expenses: 620, aid: 0,
    description: "Academic requirements are complete; the student reports an outstanding balance blocking graduation clearance.",
    notes: "Obtain university confirmation of graduation eligibility and verify the balance is the relevant financial barrier.",
    timeline: [
      ["Oct 18", "Application submitted", "complete"],
      ["—", "University graduation status verification", "current"],
      ["—", "Financial review", "upcoming"],
      ["—", "Decision and agreement", "upcoming"],
      ["—", "University payment", "upcoming"]
    ]
  },
  {
    id: "JUN-2026-0144", name: "Sara Malik", initials: "SM",
    university: "River University", major: "Nursing",
    year: "Junior", scenario: "Required on-campus housing",
    applicationType: "existing-balance",
    reason: "Registration hold", balance: 5200, requested: 4700,
    deadline: "Nov 02, 2026", status: "Information requested", verified: true,
    income: 900, expenses: 840, aid: 2200,
    description: "Student requests assistance with an outstanding balance and reports that campus housing is required by the program.",
    notes: "Verify qualifying charges separately. Required housing exception needs institutional documentation.",
    timeline: [
      ["Oct 14", "Application submitted", "complete"],
      ["Oct 15", "Balance verified", "complete"],
      ["Oct 16", "Additional documentation requested", "current"],
      ["—", "Financial review", "upcoming"],
      ["—", "Decision", "upcoming"]
    ]
  },
  {
    id: "JUN-2026-0145", name: "Malik Johnson", initials: "MJ",
    university: "River University", major: "Public Health",
    year: "Senior · Final semester", scenario: "Employed, lives independently",
    applicationType: "existing-balance",
    reason: "Final-semester shortfall", balance: 3150, requested: 3150,
    deadline: "Nov 12, 2026", status: "Under review", verified: true,
    income: 2100, expenses: 1725, aid: 900,
    description: "A remaining tuition balance is creating a barrier to completing the student's final semester.",
    notes: "Synthetic River University example. Confirm the final-semester balance, remaining aid, and deadline.",
    timeline: [
      ["Oct 18", "Application submitted", "complete"],
      ["Oct 19", "University balance verified", "complete"],
      ["—", "Financial review", "current"],
      ["—", "Decision and agreement", "upcoming"],
      ["—", "University payment", "upcoming"]
    ]
  },
  {
    id: "JUN-2026-0146", name: "Nina Patel", initials: "NP",
    university: "Garden State Community College", major: "Liberal Arts",
    year: "Associate degree · Graduation eligible", scenario: "Family may contribute, no job",
    applicationType: "existing-balance",
    reason: "Graduation clearance", balance: 1850, requested: 1850,
    deadline: "Nov 18, 2026", status: "Submitted", verified: false,
    income: 0, expenses: 680, aid: 650,
    description: "The student reports a remaining college balance that may block graduation clearance after completing academic requirements.",
    notes: "Synthetic community college example. Confirm associate-degree completion, graduation eligibility, and whether the balance blocks clearance.",
    timeline: [
      ["Oct 19", "Application submitted", "complete"],
      ["—", "Graduation eligibility and balance verification", "current"],
      ["—", "Financial review", "upcoming"],
      ["—", "Decision and agreement", "upcoming"],
      ["—", "University payment", "upcoming"]
    ]
  }
];

const universityProfiles = [
  {
    name: "Garden State University",
    type: "Illustrative university",
    description: "A university example with registration and graduation-clearance referrals."
  },
  {
    name: "River University",
    type: "Illustrative university",
    description: "A university example focused on a verified final-semester tuition shortfall."
  },
  {
    name: "Garden State Community College",
    type: "Community college example",
    description: "A two-year college example with an associate-degree graduation-clearance referral."
  }
];

const navGroups = [
  { label: "WORKSPACE", items: [
    { id: "student", label: "Student portal", icon: GraduationCap },
    { id: "case", label: "Case management", icon: ClipboardCheck },
    { id: "university", label: "University portal", icon: Building2 }
  ]},
  { label: "PREVIEW", items: [
    { id: "investor", label: "Capital overview", icon: Activity },
    { id: "donor", label: "Donor impact", icon: HeartHandshake },
    { id: "website", label: "University offering", icon: BookOpen }
  ]},
  { label: "AUDIENCE PAGES", items: [
    { id: "audience-student", label: "For students", icon: GraduationCap },
    { id: "audience-university", label: "For universities", icon: Building2 },
    { id: "audience-donor", label: "For donors", icon: HeartHandshake },
    { id: "audience-investor", label: "For investors", icon: Activity }
  ]}
];

function Pill({ children, tone = "neutral" }) {
  return <span className={`pill pill-${tone}`}><span className="pill-dot" />{children}</span>;
}

function Button({ children, variant = "primary", ...props }) {
  return <button className={`btn btn-${variant}`} {...props}>{children}</button>;
}

function Metric({ label, value, note, icon: Icon, trend }) {
  return <div className="metric card">
    <div className="metric-top"><span>{label}</span><span className="metric-icon"><Icon size={17}/></span></div>
    <div className="metric-value">{value}</div>
    <div className="metric-note">{trend && <span className="trend"><ArrowDownRight size={13}/>{trend}</span>}{note}</div>
  </div>;
}

function PageHeader({ eyebrow, title, subtitle, action }) {
  return <div className="page-header">
    <div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{subtitle}</p></div>
    {action}
  </div>;
}

function App() {
  const [page, setPage] = useState("student");
  const [audience, setAudience] = useState("student");
  const [cases, setCases] = useState(initialCases);
  const [selectedId, setSelectedId] = useState("JUN-2026-0142");
  const [showApply, setShowApply] = useState(false);
  const [scenario, setScenario] = useState("employed-family");
  const [applicationType, setApplicationType] = useState("next-semester");
  const [applicationAmount, setApplicationAmount] = useState("4000");
  const [applicationUniversity, setApplicationUniversity] = useState("Garden State University");
  const [balanceReason, setBalanceReason] = useState("registration");
  const [applicationTerm, setApplicationTerm] = useState("Spring 2027");
  const [notice, setNotice] = useState("");
  const [paymentRecorded, setPaymentRecorded] = useState(false);
  const [monthly, setMonthly] = useState(150);
  const [mobileNav, setMobileNav] = useState(false);

  const selected = cases.find(c => c.id === selectedId) || cases[0];
  const approvedTotal = cases.filter(c => ["Approved", "Payment confirmed"].includes(c.status)).reduce((s,c) => s+c.requested,0);
  const activeCount = cases.filter(c => !["Declined", "Payment confirmed"].includes(c.status)).length;
  const remaining = selected.requested;
  const months = Math.ceil(remaining / Math.max(1, monthly));

  const updateCase = (id, patch, message) => {
    setCases(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));
    if (message) setNotice(message);
  };

  const submitApplication = (e) => {
    e.preventDefault();
    const amount = Number(applicationAmount);
    if (!Number.isFinite(amount) || amount <= 0) {
      showNotice("Enter a positive demo amount to continue.");
      return;
    }
    const profileMap = {
      "no-support": { name: "Layla Ahmed", initials: "LA", scenario: "No financial support", income: 0, expenses: 540 },
      "employed-family": { name: "Amira Hassan", initials: "AH", scenario: "Employed, lives with family", income: 1850, expenses: 1120 },
      "employed-independent": { name: "Omar Farooq", initials: "OF", scenario: "Employed, lives independently", income: 2600, expenses: 2050 },
      "family-help": { name: "Mariam Ali", initials: "MA", scenario: "Family may contribute, no job", income: 0, expenses: 700 },
      "optional-dorm": { name: "Zayd Karim", initials: "ZK", scenario: "Optional on-campus housing", income: 700, expenses: 550 },
      "required-dorm": { name: "Sara Malik", initials: "SM", scenario: "Required on-campus housing", income: 900, expenses: 840 }
    };
    const profile = profileMap[scenario];
    const applicationDetails = {
      "starting-school": {
        label: "Starting school · enrollment gap",
        reason: `Starting school · ${applicationTerm}`,
        timeline: [["Oct 19","Application started","complete"],["—","Enrollment and cost verification","current"],["—","Financial review","upcoming"],["—","Decision and agreement","upcoming"],["—","University payment","upcoming"]]
      },
      "next-semester": {
        label: "Upcoming semester · tuition gap",
        reason: `Upcoming semester · ${applicationTerm}`,
        timeline: [["Oct 19","Application submitted","complete"],["—","University balance verification","current"],["—","Financial review","upcoming"],["—","Decision and agreement","upcoming"],["—","University payment","upcoming"]]
      },
      "existing-balance": {
        label: "Existing university balance",
        reason: balanceReason === "graduation" ? "Graduation clearance" : balanceReason === "final" ? "Final-semester shortfall" : "Registration hold",
        timeline: [["Oct 19","Application submitted","complete"],["—","University balance verification","current"],["—","Financial review","upcoming"],["—","Decision and agreement","upcoming"],["—","University payment","upcoming"]]
      },
      refinance: {
        label: "Existing education financing · future concept",
        reason: "Explore creditor refinancing concept",
        timeline: [["Oct 19","Concept inquiry recorded","complete"],["—","Creditor partnership required","current"],["—","Legal, regulatory, and Sharia review","upcoming"]]
      }
    }[applicationType];
    const isRefinance = applicationType === "refinance";
    const fresh = {
      ...initialCases[0], ...profile, id: `JUN-2026-${String(145 + cases.length - 3).padStart(4,"0")}`,
      applicationType,
      university: applicationUniversity, major: "Computer Science", year: "Senior",
      reason: applicationDetails.reason, balance: amount, requested: amount,
      balanceLabel: isRefinance ? "Existing principal balance" : "University balance",
      deadline: isRefinance ? "Not applicable" : "Nov 06, 2026",
      status: isRefinance ? "Future concept" : "Submitted", verified: false,
      aid: 1200, description: "New synthetic application submitted in demo mode.",
      notes: isRefinance
        ? "Concept only. Creditor/servicer partnership and legal, regulatory, and qualified Sharia review are prerequisites; no refinancing is offered."
        : "New application. Verify university balance, aid, deadline, and qualifying expenses.",
      timeline: applicationDetails.timeline
    };
    setCases(prev => [fresh, ...prev]);
    setSelectedId(fresh.id);
    setShowApply(false);
    setPage("student");
    setNotice(isRefinance
      ? "Future-concept inquiry recorded. No refinancing offer or creditor payment is available."
      : "Demo application submitted. The case is now visible in the shared workspace.");
  };

  const showNotice = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 4500);
  };

  const currentTitle = {
    student: ["STUDENT EXPERIENCE", "Your education, with a plan", "Track your application, understand your options, and see your next steps."],
    case: ["OPERATIONS", "Case management", "A consistent review process for each student's circumstances."],
    university: ["INSTITUTION PARTNER", "University workspace", "Coordinate verified balances, referrals, and payment status in one place."],
    investor: ["CAPITAL & OPERATIONS", "Capital overview", "A transparent view of illustrative pool activity and operating-company economics."],
    donor: ["CHARITABLE IMPACT", "Giving that keeps moving", "See how a proposed revolving charitable pool could support students over time."],
    website: ["PARTNER WITH JUNNAH", "Resolve tuition gaps earlier", "A university-integrated approach to financial barriers that can disrupt student progress."],
    "audience-student": ["FOR STUDENTS", "A clearer next step", "Explore the proposed student support model and try a synthetic application in the demo."],
    "audience-university": ["FOR UNIVERSITIES", "A coordinated workflow", "Explore referrals, balance verification, payment coordination, and a proposed pilot."],
    "audience-donor": ["FOR DONORS", "Giving with transparency", "Explore the proposed charitable pool, impact reporting, and clear expectations."],
    "audience-investor": ["FOR INVESTORS", "Invest in the infrastructure", "Explore Junnah's proposed operating model and the separation of capital."]
  }[page];

  return <div className="app-shell">
    <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
      <div className="brand-lockup">
        <div className="brand-mark"><span>j</span></div>
        <div><div className="brand-name">junnah<span>.</span></div><div className="brand-caption">STUDENT FINANCIAL SUPPORT</div></div>
        <button className="mobile-close" onClick={() => setMobileNav(false)}><X size={18}/></button>
      </div>
      <div className="demo-chip"><span className="live-dot"/> INTERACTIVE DEMO <span className="demo-tag">SYNTHETIC DATA</span></div>
      <a className="back-to-site" href="./"><ArrowLeft size={14} /> Back to the Junnah website</a>
      <div className="workspace-switch"><div className="workspace-avatar">J</div><div className="workspace-text"><strong>Junnah workspace</strong><span>Prototype environment</span></div><ChevronDown size={15}/></div>
      <nav className="nav">
        {navGroups.map(group => <div className="nav-group" key={group.label}>
          <div className="nav-label">{group.label}</div>
          {group.items.map(item => {
            const Icon = item.icon;
            return <button key={item.id} className={`nav-item ${page === item.id ? "active" : ""}`} onClick={() => {setPage(item.id);if(item.id.startsWith("audience-"))setAudience(item.id.slice("audience-".length));setMobileNav(false);}}>
              <Icon size={17}/><span>{item.label}</span>{page === item.id && <span className="nav-active-mark"/>}
            </button>;
          })}
        </div>)}
      </nav>
      <div className="sidebar-bottom">
        <div className="help-card"><div className="help-icon"><LifeBuoy size={17}/></div><strong>Building Junnah</strong><p>This is a demonstration using fictional students and simulated transactions.</p><button onClick={() => showNotice("Demo data only. No real financing decisions or payments are made.")}>About this demo <ArrowRight size={13}/></button></div>
        <div className="profile-row"><div className="profile-avatar">JF</div><div className="profile-info"><strong>Junnah Founder</strong><span>Demo administrator</span></div><MoreHorizontal size={19}/></div>
      </div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMobileNav(true)}><Menu size={20}/></button>
        <div className="breadcrumbs"><span>Junnah</span><span className="crumb-slash">/</span><strong>{navGroups.flatMap(g=>g.items).find(i=>i.id===page)?.label || "Overview"}</strong></div>
        <div className="topbar-right"><span className="topbar-status"><span className="live-dot"/> Demo environment</span><button className="icon-button" onClick={() => showNotice("You're all caught up in this demo.")}><Bell size={18}/><i/></button><div className="topbar-avatar">JF</div></div>
      </header>

      <div className="content">
        <PageHeader eyebrow={currentTitle[0]} title={currentTitle[1]} subtitle={currentTitle[2]}
          action={page === "student" ? <Button onClick={() => setShowApply(true)}><span>+</span> New application</Button> : page === "case" ? <Button variant="secondary" onClick={() => showNotice("Export is simulated in this prototype.")}><FileText size={16}/> Export cases</Button> : null}
        />

        {notice && <div className="toast"><CheckCircle2 size={17}/><span>{notice}</span><button onClick={() => setNotice("")}><X size={15}/></button></div>}

        {page === "student" && <StudentPage cases={cases} selected={selected} setSelectedId={setSelectedId} setShowApply={setShowApply} monthly={monthly} setMonthly={setMonthly} months={months} updateCase={updateCase} showNotice={showNotice} />}
        {page === "case" && <CasePage cases={cases} selected={selected} setSelectedId={setSelectedId} updateCase={updateCase} showNotice={showNotice} />}
        {page === "university" && <UniversityPage cases={cases} selected={selected} setSelectedId={setSelectedId} updateCase={updateCase} showNotice={showNotice} />}
        {page === "investor" && <InvestorPage cases={cases} approvedTotal={approvedTotal} activeCount={activeCount} />}
        {page === "donor" && <DonorPage cases={cases} approvedTotal={approvedTotal} />}
        {page === "website" && <WebsitePage showNotice={showNotice} />}
        {page.startsWith("audience-") && <AudiencePage audience={audience} setAudience={id => {setAudience(id);setPage(`audience-${id}`);}} setPage={setPage} setShowApply={setShowApply} />}
      </div>
      <footer className="footer"><span>© 2026 Junnah · Product concept</span><span><LockKeyhole size={12}/> Demo only · No real financial data</span></footer>
    </main>

    {showApply && <div className="modal-backdrop" onClick={() => setShowApply(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head"><div><div className="eyebrow">STUDENT APPLICATION</div><h2>Where are you in your education journey?</h2><p>Choose a sample pathway to see how Junnah could support students at different stages.</p></div><button className="icon-button" onClick={() => setShowApply(false)}><X size={19}/></button></div>
        <form onSubmit={submitApplication} className="application-form">
          <div className="application-path-grid" role="group" aria-label="Education financing pathway">
            {[
              ["starting-school", GraduationCap, "Starting school", "Explore help with an upcoming first term."],
              ["next-semester", CalendarClock, "Returning next semester", "Plan for a new semester's tuition gap."],
              ["existing-balance", CircleDollarSign, "Resolve a school balance", "Address a verified balance or graduation hold."],
              ["refinance", HandCoins, "Explore loan refinancing", "Future concept; requires creditor partners."]
            ].map(([id, Icon, title, description]) => <button key={id} type="button" className={`application-path ${applicationType === id ? "selected" : ""}`} aria-pressed={applicationType === id} onClick={() => setApplicationType(id)}>
              <Icon size={18}/><strong>{title}</strong><span>{description}</span>
            </button>)}
          </div>
          <div className="form-grid"><label>Choose a fictional student situation<select value={scenario} onChange={e => setScenario(e.target.value)}>
            <option value="no-support">A · Student with no financial support</option>
            <option value="employed-family">B · Employed, living with family</option>
            <option value="employed-independent">C · Employed, living independently</option>
            <option value="family-help">D · No job, family may contribute</option>
            <option value="optional-dorm">E · Optional on-campus housing</option>
            <option value="required-dorm">F · Required on-campus housing</option>
          </select></label><label>{applicationType === "refinance" ? "Illustrative existing principal" : applicationType === "existing-balance" ? "Illustrative balance amount" : "Illustrative funding gap"}<input type="number" min="1" step="100" value={applicationAmount} onChange={e => setApplicationAmount(e.target.value)} required /></label></div>
          {applicationType !== "refinance" && <div className="form-grid"><label>University<select value={applicationUniversity} onChange={e => setApplicationUniversity(e.target.value)}>{universityProfiles.map(institution=><option key={institution.name}>{institution.name}</option>)}</select></label><label>{applicationType === "existing-balance" ? "What is the barrier?" : "Academic term"}{applicationType === "existing-balance" ? <select value={balanceReason} onChange={e => setBalanceReason(e.target.value)}><option value="registration">Registration hold</option><option value="graduation">Graduation clearance</option><option value="final">Final-semester shortfall</option></select> : <select value={applicationTerm} onChange={e => setApplicationTerm(e.target.value)}><option>Spring 2027</option><option>Fall 2027</option><option>Summer 2027</option></select>}</label></div>}
          {applicationType === "refinance" && <div className="notice-box future-concept"><ShieldCheck size={18}/><span>Future concept only—not a current Junnah service or offer. A principal-only refinancing pathway would require creditor/servicer partnerships, legal and regulatory review, and qualified Sharia review. No creditor account numbers or real financial data should be entered.</span></div>}
          {applicationType !== "refinance" && <div className="application-fee-summary"><div><span>Proposed one-time application administration fee</span><strong>{money(illustrativeApplicationFee)} <small>illustrative</small></strong></div><p>Due separately only if an application is approved. No fee to submit, and it is not added to the tuition financing amount or repayment principal. No payment is collected in this demo. Amount and structure require cost validation and legal, regulatory, and qualified Sharia review.</p></div>}
          {applicationType !== "refinance" && <div className="notice-box"><ShieldCheck size={18}/><span>This prototype uses fictional records. Submitting creates a demo application for university verification and human review; it is not a financing decision or offer.</span></div>}
          <div className="modal-actions"><Button variant="secondary" type="button" onClick={() => setShowApply(false)}>Cancel</Button><Button type="submit">{applicationType === "refinance" ? "Record concept inquiry" : "Submit demo application"} <ArrowRight size={16}/></Button></div>
        </form>
      </div>
    </div>}
  </div>;
}

function StudentPage({cases, selected, setSelectedId, setShowApply, monthly, setMonthly, months, updateCase, showNotice}) {
  const statusTone = selected.status === "Approved" || selected.status === "Payment confirmed" ? "success" : selected.status === "Declined" ? "danger" : "warning";
  return <>
    <div className="welcome-banner">
      <div className="welcome-copy"><div className="welcome-kicker"><Sparkles size={14}/> YOUR STUDENT OVERVIEW</div><h2>Progress starts with a clearer picture.</h2><p>Keep track of your application, university deadlines, and potential next steps—all in one place.</p><button className="banner-link" onClick={() => showNotice("Your personalized planning experience is a planned feature.")}>Explore your financial plan <ArrowRight size={15}/></button></div>
      <div className="welcome-art"><div className="art-circle art-circle-one"/><div className="art-circle art-circle-two"/><div className="art-card"><div className="art-card-icon"><GraduationCap size={19}/></div><div className="art-line long"/><div className="art-line short"/><div className="art-progress"><span/></div><div className="art-check"><Check size={14}/></div></div><div className="art-spark">✳</div></div>
    </div>
    <div className="metric-grid">
      <Metric label="Requested support" value={money(selected.requested)} note="Illustrative application" icon={Wallet}/>
      <Metric label="Tuition balance" value={money(selected.balance)} note="University verification status below" icon={CircleDollarSign}/>
      <Metric label="Application status" value={selected.status} note="See your next steps" icon={FileCheck2}/>
      <Metric label="Next deadline" value={selected.deadline} note={selected.reason} icon={CalendarClock}/>
    </div>
    <div className="section-heading"><div><h2>Your application</h2><p>Select a fictional application to explore its status.</p></div><button className="text-button" onClick={() => setShowApply(true)}>Start another <ArrowRight size={14}/></button></div>
    <div className="two-col">
      <div className="card application-card">
        <div className="card-head"><div className="student-identity"><div className="person-avatar">{selected.initials}</div><div><h3>{selected.name}</h3><p>{selected.id} · {selected.major}</p></div></div><Pill tone={statusTone}>{selected.status}</Pill></div>
        <div className="application-summary"><div><span>University</span><strong>{selected.university}</strong></div><div><span>Application type</span><strong>{selected.reason}</strong></div><div><span>Deadline</span><strong>{selected.deadline}</strong></div><div><span>Financial profile</span><strong>{selected.scenario}</strong></div></div>
        {selected.applicationType !== "refinance" && <div className="application-fee-summary"><div><span>One-time administration fee if approved</span><strong>{money(illustrativeApplicationFee)} <small>illustrative</small></strong></div><p>Proposed cost-recovery fee, due separately only after approval. Not part of your financing principal; no fee is collected in this demo. Subject to cost validation and legal, regulatory, and qualified Sharia review.</p></div>}
        <div className="progress-head"><strong>Application journey</strong><span>{selected.timeline.filter(t=>t[2]==="complete").length} of {selected.timeline.length} steps</span></div>
        <div className="timeline">{selected.timeline.map((item,i)=><div className={`timeline-item ${item[2]}`} key={i}><div className="timeline-marker">{item[2]==="complete"?<Check size={12}/>:item[2]==="current"?<span/>:<span className="marker-empty"/>}</div><div className="timeline-text"><strong>{item[1]}</strong><span>{item[0]}</span></div>{item[2]==="current"&&<Pill tone="warning">In progress</Pill>}</div>)}</div>
        <div className="card-foot-note"><ShieldCheck size={16}/><span>Funding is subject to verification, review, an agreed financing agreement, and available capital. This demo is not an offer of financing.</span></div>
      </div>
      <div className="stack">
        <div className="card balance-card"><div className="card-head"><div><h3>Repayment explorer</h3><p>Illustrative principal-only scenario</p></div><div className="soft-icon"><Wallet size={17}/></div></div><div className="balance-amount">{money(selected.requested)}</div><div className="muted-label">Illustrative principal amount</div><div className="slider-label"><span>Monthly payment</span><strong>{money(monthly)}</strong></div><input className="range" type="range" min="50" max="500" step="25" value={monthly} onChange={e=>setMonthly(Number(e.target.value))}/><div className="range-ends"><span>$50 / month</span><span>$500 / month</span></div><div className="payoff-box"><div><span>Estimated payoff time</span><strong>{Math.floor(months/12)>0?`${Math.floor(months/12)} yr `:""}{months%12?`${months%12} mo`:""}</strong></div><div><span>Total principal repaid</span><strong>{money(selected.requested)}</strong></div></div><p className="fine-print">This calculation shows principal only. The illustrative application administration fee is separate, due only if approved, and is not included in the financed amount or repayment schedule.</p></div>
        <div className="card support-card"><div className="support-icon"><LifeBuoy size={18}/></div><div><h3>Need to update your situation?</h3><p>A future Junnah workflow would let you request a hardship review or report a material change in circumstances.</p><button className="text-button" onClick={()=>showNotice("Hardship review is simulated. No real request was sent.")}>Explore support options <ArrowRight size={14}/></button></div></div>
      </div>
    </div>
    <div className="section-heading"><div><h2>Demo applications</h2><p>Switch records to explore different student circumstances.</p></div><span className="count-label">{cases.length} fictional cases</span></div>
    <div className="card table-card"><table><thead><tr><th>STUDENT</th><th>APPLICATION TYPE</th><th>AMOUNT</th><th>STATUS</th><th></th></tr></thead><tbody>{cases.map(c=><tr key={c.id} className={selected.id===c.id?"selected-row":""}><td><button className="table-person" onClick={()=>setSelectedId(c.id)}><span className="mini-avatar">{c.initials}</span><span><strong>{c.name}</strong><small>{c.id}</small></span></button></td><td>{c.reason}</td><td className="amount-cell">{money(c.requested)}</td><td><Pill tone={c.status==="Approved"||c.status==="Payment confirmed"?"success":c.status==="Declined"?"danger":"warning"}>{c.status}</Pill></td><td><button className="row-action" onClick={()=>setSelectedId(c.id)}>View <ArrowRight size={13}/></button></td></tr>)}</tbody></table></div>
  </>;
}

function CasePage({cases, selected, setSelectedId, updateCase, showNotice}) {
  const [tab,setTab] = useState("all");
  const filtered = cases.filter(c=>tab==="all" || c.status===tab);
  const [notes,setNotes] = useState(selected.notes);
  React.useEffect(()=>setNotes(selected.notes),[selected.id]);
  return <>
    <div className="metric-grid three"><Metric label="Open applications" value={cases.filter(c=>!["Declined","Payment confirmed"].includes(c.status)).length} note="Across demo cases" icon={ClipboardCheck}/><Metric label="Awaiting verification" value={cases.filter(c=>!c.verified).length} note="University confirmation needed" icon={FileCheck2}/><Metric label="Urgent deadlines" value={cases.length} note="Synthetic deadline flags" icon={Clock3}/></div>
    <div className="section-heading"><div><h2>Application queue</h2><p>Review each student's verified need and documented circumstances.</p></div><div className="filter-tabs">{["all","Submitted","Under review","Information requested","Approved","Declined","Payment confirmed"].map(t=><button key={t} className={tab===t?"selected":""} onClick={()=>setTab(t)}>{t==="all"?"All cases":t}</button>)}</div></div>
    <div className="case-layout">
      <div className="card queue-card"><div className="queue-search"><Search size={16}/><span>Search applications</span><kbd>⌘ K</kbd></div><div className="queue-list">{filtered.map(c=><button className={`queue-item ${selected.id===c.id?"active":""}`} key={c.id} onClick={()=>setSelectedId(c.id)}><div className="queue-item-top"><span className="mini-avatar">{c.initials}</span><Pill tone={c.status==="Approved"||c.status==="Payment confirmed"?"success":c.status==="Declined"?"danger":"warning"}>{c.status}</Pill></div><strong>{c.name}</strong><span className="queue-id">{c.id}</span><div className="queue-item-bottom"><span>{c.reason}</span><strong>{money(c.requested)}</strong></div></button>)}{filtered.length===0&&<div className="empty-state">No cases in this status.</div>}</div></div>
      <div className="card review-card">
        <div className="review-head"><div><div className="eyebrow">CASE REVIEW · {selected.id}</div><h2>{selected.name}</h2><p>{selected.university} · {selected.major}</p></div><Pill tone={selected.status==="Approved"||selected.status==="Payment confirmed"?"success":"warning"}>{selected.status}</Pill></div>
        <div className="review-alert"><CalendarClock size={17}/><div><strong>{selected.reason}</strong><span>Deadline: {selected.deadline}. Verify timing and balance before any final decision.</span></div></div>
        <div className="review-section"><h3>Financial snapshot</h3><div className="review-stats"><div><span>Tuition balance</span><strong>{money(selected.balance)}</strong><small>{selected.verified?"University verification marked complete":"Verification required"}</small></div><div><span>Requested</span><strong>{money(selected.requested)}</strong><small>Student requested amount</small></div><div><span>Monthly income</span><strong>{money(selected.income)}</strong><small>Synthetic self-reported value</small></div><div><span>Essential expenses</span><strong>{money(selected.expenses)}</strong><small>Requires proportionate review</small></div></div></div>
        {selected.applicationType !== "refinance" && <div className="review-alert application-fee-review"><CircleDollarSign size={17}/><div><strong>Proposed application administration fee: {money(illustrativeApplicationFee)} (illustrative)</strong><span>Cost-recovery fee payable separately by the student only if approved. It is not part of the requested financing principal and is not collected in this demo. Validate actual costs and obtain legal, regulatory, and qualified Sharia review before offering a fee.</span></div></div>}
        <div className="review-section"><h3>Verification checklist</h3><div className="checklist-row"><span className={selected.verified?"check-round done":"check-round"}>{selected.verified?<Check size={12}/>:<span/>}</span><div><strong>University balance</strong><p>{selected.verified?"Marked verified in this demo":"Confirm exact amount and deadline with university"}</p></div><button className="text-button small" onClick={()=>updateCase(selected.id,{verified:!selected.verified},"Verification status updated in demo.")}>{selected.verified?"Undo":"Mark verified"}</button></div><div className="checklist-row"><span className="check-round"><span/></span><div><strong>Non-debt aid and eligible expenses</strong><p>Confirm grants, scholarships, and qualifying charges.</p></div><Pill>Review</Pill></div><div className="checklist-row"><span className="check-round"><span/></span><div><strong>Affordability and household circumstances</strong><p>Consider income, essential expenses, and actual family support.</p></div><Pill>Review</Pill></div></div>
        <div className="review-section"><h3>Case notes</h3><textarea className="notes-input" value={notes} onChange={e=>setNotes(e.target.value)} /><Button variant="secondary" onClick={()=>{updateCase(selected.id,{notes},"Case notes saved in demo.");}}>Save notes</Button></div>
        <div className="decision-actions"><Button variant="secondary" onClick={()=>updateCase(selected.id,{status:"Information requested"},"Student status updated: additional information requested.")}><FileText size={15}/> Request information</Button><Button variant="secondary" onClick={()=>updateCase(selected.id,{status:"Declined"},"Demo case marked declined. No real decision was made.")}>Decline</Button><Button onClick={()=>{if(!selected.verified){showNotice("Verify the university balance before approving this demo case.");return;}updateCase(selected.id,{status:"Approved"},"Demo case approved. Next step: simulate university payment.");}}><CheckCircle2 size={15}/> Approve demo case</Button></div>
        <div className="fine-print bottom-note">Demonstration only. These controls do not determine real eligibility or constitute a financing offer.</div>
      </div>
    </div>
  </>;
}

function UniversityPage({cases, selected, setSelectedId, updateCase, showNotice}) {
  const [activeTab,setActiveTab] = useState("all");
  const [activeInstitution,setActiveInstitution] = useState("Garden State University");
  const institutionViews = [
    {name:"All institutions",type:"Combined demo view",description:"See the synthetic referral examples together."},
    ...universityProfiles
  ];
  const institutionCases = activeInstitution === "All institutions"
    ? cases
    : cases.filter(c=>c.university===activeInstitution);
  const visibleCases = institutionCases.filter(c=>activeTab==="all"||(activeTab==="graduation"&&c.reason==="Graduation clearance")||(activeTab==="registration"&&c.reason!=="Graduation clearance"));
  const pending = institutionCases.filter(c=>!["Payment confirmed","Declined"].includes(c.status));
  const selectedReferral = institutionCases.find(c=>c.id===selected.id)||institutionCases[0]||selected;
  const chooseInstitution = (name) => {
    setActiveInstitution(name);
    if(name!=="All institutions"){
      const firstReferral=cases.find(c=>c.university===name);
      if(firstReferral)setSelectedId(firstReferral.id);
    }
  };
  return <>
    <div className="welcome-banner university-banner"><div className="welcome-copy"><div className="welcome-kicker"><Building2 size={14}/> UNIVERSITY PARTNERSHIP</div><h2>Resolve financial barriers before they derail progress.</h2><p>Coordinate referrals, verify eligible balances, and track payment status through one consistent workflow.</p><button className="banner-link" onClick={()=>showNotice("University pilot inquiry captured in this demo only.")}>Explore the pilot model <ArrowRight size={15}/></button></div><div className="university-banner-art"><div className="uni-building"><Building2 size={65}/><div className="uni-columns"><i/><i/><i/><i/></div></div></div></div>
    <div className="section-heading institution-heading"><div><h2>Choose an institution</h2><p>Each campus has its own example referrals and totals.</p></div><Pill>Illustrative demo · No confirmed partners</Pill></div>
    <div className="institution-grid">{institutionViews.map(institution=>{
      const institutionRecords=institution.name==="All institutions"?cases:cases.filter(c=>c.university===institution.name);
      const balanceTotal=institutionRecords.reduce((sum,c)=>sum+c.balance,0);
      return <button key={institution.name} className={`institution-card ${activeInstitution===institution.name?"selected":""}`} aria-pressed={activeInstitution===institution.name} onClick={()=>chooseInstitution(institution.name)}>
        <span className="institution-card-top"><span className="institution-icon"><Building2 size={17}/></span>{activeInstitution===institution.name&&<span className="institution-active"><Check size={12}/> Viewing</span>}</span>
        <strong>{institution.name}</strong><span className="institution-type">{institution.type}</span><span className="institution-description">{institution.description}</span>
        <span className="institution-stats"><span><strong>{institutionRecords.length}</strong> {institutionRecords.length===1?"referral":"referrals"}</span><span><strong>{money(balanceTotal)}</strong> balances</span></span>
      </button>;
    })}</div>
    <div className="metric-grid"><Metric label="Student referrals" value={institutionCases.length} note={activeInstitution==="All institutions"?"Across all illustrative campuses":"For selected institution"} icon={GraduationCap}/><Metric label="Awaiting action" value={pending.length} note="Verification or case processing" icon={Clock3}/><Metric label="Balances referred" value={money(institutionCases.reduce((s,c)=>s+c.balance,0))} note="Not equivalent to approved funding" icon={CircleDollarSign}/><Metric label="Payments confirmed" value={money(institutionCases.filter(c=>c.status==="Payment confirmed").reduce((s,c)=>s+c.requested,0))} note="Simulated transactions only" icon={CheckCircle2}/></div>
    <div className="section-heading"><div><h2>Referral and balance queue</h2><p>University staff can verify a balance and monitor the referral lifecycle.</p></div><Button variant="secondary" onClick={()=>showNotice("New referral form is represented by the demo application workflow.")}>+ New referral</Button></div>
    <div className="card table-card"><div className="table-toolbar"><div className="filter-tabs">{[{id:"all",label:"All referrals"},{id:"registration",label:"Registration"},{id:"graduation",label:"Graduation"}].map(t=><button key={t.id} className={activeTab===t.id?"selected":""} onClick={()=>setActiveTab(t.id)}>{t.label}</button>)}</div><span className="count-label">{visibleCases.length} {visibleCases.length===1?"record":"records"} · {activeInstitution}</span></div><table><thead><tr><th>STUDENT</th><th>INSTITUTION</th><th>REFERRAL TYPE</th><th>DEADLINE</th><th>BALANCE</th><th>VERIFICATION</th><th>STATUS</th><th></th></tr></thead><tbody>{visibleCases.map(c=><tr key={c.id}><td><button className="table-person" onClick={()=>setSelectedId(c.id)}><span className="mini-avatar">{c.initials}</span><span><strong>{c.name}</strong><small>{c.id}</small></span></button></td><td>{c.university}</td><td>{c.reason}</td><td>{c.deadline}</td><td className="amount-cell">{money(c.balance)}</td><td><Pill tone={c.verified?"success":"warning"}>{c.verified?"Verified":"Needs review"}</Pill></td><td><Pill tone={c.status==="Payment confirmed"?"success":"warning"}>{c.status}</Pill></td><td><button className="row-action" onClick={()=>setSelectedId(c.id)}>Open <ArrowRight size={13}/></button></td></tr>)}</tbody></table>{visibleCases.length===0&&<div className="empty-state">No referrals match this filter for the selected institution.</div>}</div>
    <div className="section-heading"><div><h2>Selected referral</h2><p>Review the selected case and simulate institutional actions.</p></div><select className="compact-select" value={selectedReferral.id} onChange={e=>setSelectedId(e.target.value)}>{institutionCases.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
    <div className="two-col"><div className="card pad-card"><div className="card-head"><div><h3>{selectedReferral.name}</h3><p>{selectedReferral.university} · {selectedReferral.major}</p></div><Pill tone={selectedReferral.verified?"success":"warning"}>{selectedReferral.verified?"Balance verified":"Verification needed"}</Pill></div><div className="application-summary"><div><span>Referral pathway</span><strong>{selectedReferral.reason}</strong></div><div><span>Outstanding balance</span><strong>{money(selectedReferral.balance)}</strong></div><div><span>Requested support</span><strong>{money(selectedReferral.requested)}</strong></div><div><span>Deadline</span><strong>{selectedReferral.deadline}</strong></div></div><div className="review-alert"><HelpCircle size={17}/><div><strong>Graduation pathway reminder</strong><span>For graduation-clearance referrals, confirm academic completion, graduation eligibility, the exact balance, and whether payment resolves the financial barrier.</span></div></div><Button variant="secondary" onClick={()=>updateCase(selectedReferral.id,{verified:true},"University balance marked verified in demo.")}><BadgeCheck size={16}/> Confirm balance</Button></div>
      <div className="card pad-card"><h3>Payment coordination</h3><p className="card-subtitle">Only simulate payment after the case has been approved.</p><div className="payment-summary"><span>Current status</span><Pill tone={selectedReferral.status==="Payment confirmed"?"success":selectedReferral.status==="Approved"?"warning":"neutral"}>{selectedReferral.status}</Pill></div><div className="payment-summary"><span>Proposed payment</span><strong>{money(selectedReferral.requested)}</strong></div><div className="payment-summary"><span>Recipient</span><strong>{selectedReferral.university}</strong></div><Button block disabled={selectedReferral.status!=="Approved"&&selectedReferral.status!=="Payment confirmed"} onClick={()=>{updateCase(selectedReferral.id,{status:"Payment confirmed"},"Simulated university payment confirmed. Investor and student views reflect the status.");}}><CheckCircle2 size={16}/> {selectedReferral.status==="Payment confirmed"?"Payment confirmed":"Simulate payment confirmation"}</Button><p className="fine-print">No real money is moved. This action updates synthetic demo records only.</p></div></div>
    <div className="section-heading"><div><h2>Potential institutional benefits</h2><p>Benefits to test during a pilot—not yet proven outcomes.</p></div></div><div className="benefit-grid"><div className="benefit-card"><CalendarClock/><h3>Earlier intervention</h3><p>Flag verified balances before registration or graduation deadlines.</p></div><div className="benefit-card"><Wallet/><h3>Direct payment</h3><p>Approved balances are paid to the institution under the agreed process.</p></div><div className="benefit-card"><Activity/><h3>Clear reporting</h3><p>Track referral volume, decision times, payments, and student outcomes.</p></div></div>
  </>;
}

function InvestorPage({cases, approvedTotal, activeCount}) {
  const paid = cases.filter(c=>c.status==="Payment confirmed").reduce((s,c)=>s+c.requested,0);
  const approved = cases.filter(c=>c.status==="Approved").reduce((s,c)=>s+c.requested,0);
  const recovered = 1250;
  const poolStart = 75000;
  const outstanding = Math.max(0,paid+approved-recovered);
  const available = Math.max(0,poolStart-paid-approved+recovered);
  return <>
    <div className="capital-hero"><div><div className="welcome-kicker"><Activity size={14}/> ILLUSTRATIVE CAPITAL MODEL</div><h2>Capital with a clear purpose.</h2><p>Understand how principal is deployed, recovered, and recycled—separately from Junnah's operating revenue.</p></div><div className="capital-hero-mark"><CircleDollarSign size={46}/><span>QARD HASAN</span></div></div>
    <div className="metric-grid"><Metric label="Illustrative pool capital" value={money(poolStart)} note="Planning assumption only" icon={Wallet}/><Metric label="Principal deployed" value={money(paid+approved)} note="Approved and confirmed demo cases" icon={ArrowDownRight}/><Metric label="Principal recovered" value={money(recovered)} note="Synthetic example" icon={ArrowRight}/><Metric label="Available pool liquidity" value={money(available)} note="Simplified illustration" icon={Activity}/></div>
    <div className="two-col"><div className="card pad-card"><div className="card-head"><div><h3>Financing pool activity</h3><p>Illustrative allocation of capital</p></div><Pill tone="success">Demo data</Pill></div><div className="capital-bars"><div className="capital-bar-row"><div><span>Available liquidity</span><strong>{money(available)}</strong></div><div className="bar-track"><span style={{width:`${Math.min(100,available/poolStart*100)}%`}}/></div></div><div className="capital-bar-row"><div><span>Principal deployed / approved</span><strong>{money(paid+approved)}</strong></div><div className="bar-track"><span className="bar-gold" style={{width:`${Math.min(100,(paid+approved)/poolStart*100)}%`}}/></div></div><div className="capital-bar-row"><div><span>Principal recovered</span><strong>{money(recovered)}</strong></div><div className="bar-track"><span className="bar-blue" style={{width:`${Math.min(100,recovered/poolStart*100)}%`}}/></div></div></div><div className="info-callout"><ShieldCheck size={17}/><p>Pool capital may be depleted by defaults, approved forgiveness, and unrecovered balances. This illustrative dashboard does not guarantee principal preservation or investment returns.</p></div></div>
      <div className="card pad-card"><div className="card-head"><div><h3>Operating company</h3><p>Separate from student financing capital</p></div><div className="soft-icon"><BriefcaseBusiness size={17}/></div></div><div className="ledger-list"><div><span>University SaaS revenue</span><strong>$0</strong></div><div><span>Implementation revenue</span><strong>$0</strong></div><div><span>Operating expenses</span><strong>$0</strong></div><div><span>Investor commitments</span><strong>$0</strong></div><div className="ledger-total"><span>Operating status</span><Pill>Pre-revenue concept</Pill></div></div><p className="fine-print">No contracts, funding commitments, or actual transactions are represented. Values are placeholders for product demonstration.</p></div></div>
    <div className="section-heading"><div><h2>Portfolio cases</h2><p>Illustrative case activity that feeds this dashboard.</p></div><span className="count-label">{cases.length} records</span></div><div className="card table-card"><table><thead><tr><th>APPLICATION</th><th>STATUS</th><th>REQUESTED</th><th>POOL EFFECT</th></tr></thead><tbody>{cases.map(c=><tr key={c.id}><td><strong>{c.id}</strong><small className="table-sub">{c.name}</small></td><td><Pill tone={c.status==="Payment confirmed"?"success":"warning"}>{c.status}</Pill></td><td className="amount-cell">{money(c.requested)}</td><td>{c.status==="Payment confirmed"?"Principal disbursed":c.status==="Approved"?"Potential commitment":"No disbursement recorded"}</td></tr>)}</tbody></table></div>
  </>;
}

function DonorPage({cases, approvedTotal}) {
  const deployed = cases.filter(c=>c.status==="Payment confirmed").reduce((s,c)=>s+c.requested,0);
  const returned = 1250;
  const contributed = 75000;
  return <>
    <div className="donor-hero"><div className="donor-illustration"><div className="donor-sun"/><div className="donor-book"><BookOpen size={31}/></div><div className="donor-sprout">✳</div></div><div className="donor-hero-copy"><div className="welcome-kicker"><HeartHandshake size={14}/> CHARITABLE REVOLVING POOL</div><h2>Help open a door. Help open the next one.</h2><p>In the proposed model, donated capital can help students resolve eligible education balances. As principal is repaid, it may be recycled to support future students.</p><span className="demo-inline">Illustrative model · No real donations accepted</span></div></div>
    <div className="metric-grid"><Metric label="Illustrative contributions" value={money(contributed)} note="Not actual donations" icon={HeartHandshake}/><Metric label="Capital deployed" value={money(deployed)} note="Synthetic confirmed payments" icon={Wallet}/><Metric label="Principal returned" value={money(returned)} note="Illustrative repayment activity" icon={ArrowRight}/><Metric label="Students supported" value={cases.filter(c=>c.status==="Payment confirmed").length} note="Based on demo payment status" icon={GraduationCap}/></div>
    <div className="two-col"><div className="card pad-card"><div className="card-head"><div><h3>How the revolving pool works</h3><p>Proposed capital lifecycle</p></div></div><div className="pool-steps"><div className="pool-step"><span className="pool-step-num">01</span><div><strong>Contribute</strong><p>Donations enter a properly governed charitable pool under defined restrictions.</p></div></div><div className="pool-step"><span className="pool-step-num">02</span><div><strong>Support a student</strong><p>Eligible education expenses are paid directly to the university after approval.</p></div></div><div className="pool-step"><span className="pool-step-num">03</span><div><strong>Recover principal</strong><p>Students repay under agreed principal-only terms, subject to documented hardship policy.</p></div></div><div className="pool-step"><span className="pool-step-num">04</span><div><strong>Recycle responsibly</strong><p>Recovered principal can support future students, subject to pool availability and restrictions.</p></div></div></div></div>
      <div className="card pad-card"><h3>Impact and accountability</h3><p className="card-subtitle">A responsible donor report should show both progress and limitations.</p><div className="impact-list"><div><CheckCircle2/><span>Verified eligible expenses funded</span></div><div><CheckCircle2/><span>Principal returned and recycled</span></div><div><CheckCircle2/><span>Aggregate student milestones, where measurable</span></div><div><CheckCircle2/><span>Available liquidity and outstanding principal</span></div><div><CheckCircle2/><span>Approved forgiveness and unrecovered balances</span></div></div><div className="info-callout"><ShieldCheck size={17}/><p>Donations are not investments. Principal may be reduced by defaults, approved forgiveness, or unrecovered balances; future outcomes are not guaranteed.</p></div><Button variant="secondary" block onClick={()=>window.print()}><FileText size={16}/> Print demo impact summary</Button></div></div>
  </>;
}

function WebsitePage({showNotice}) {
  return <>
    <div className="public-hero"><div className="public-copy"><div className="welcome-kicker"><Sparkles size={14}/> FINANCIAL SUPPORT THROUGH THE STUDENT JOURNEY</div><h2>Tuition shortfalls shouldn't decide who gets to keep going.</h2><p>Junnah is developing a university-integrated, Sharia-guided approach to eligible education financing—designed to help students navigate financial barriers from enrollment through graduation.</p><div className="public-actions"><Button onClick={()=>showNotice("University pilot interest is simulated in this prototype.")}>Explore university partnership <ArrowRight size={16}/></Button><button className="banner-link" onClick={()=>showNotice("Student application entry point is available in the Student portal.")}>Explore student experience <ArrowRight size={15}/></button></div><div className="public-trust"><span><CheckCircle2 size={15}/> Principal-only model proposed</span><span><ShieldCheck size={15}/> Human-reviewed applications</span></div></div><div className="public-visual"><div className="visual-orbit orbit-a"/><div className="visual-orbit orbit-b"/><div className="visual-core"><GraduationCap size={43}/><span>JUNNAH</span></div><div className="floating-note note-one"><CheckCircle2 size={16}/><span><strong>Clear next steps</strong><small>Student journey</small></span></div><div className="floating-note note-two"><Wallet size={16}/><span><strong>Direct payment</strong><small>When approved</small></span></div></div></div>
    <div className="public-section-head"><div className="eyebrow">HOW IT WORKS</div><h2>A clearer path through a difficult moment.</h2><p>One coordinated workflow for students, university teams, and financing operations.</p></div>
    <div className="public-feature-grid"><div className="public-feature"><div className="feature-icon"><FileText/></div><h3>Understand the shortfall</h3><p>Verify the tuition balance, deadline, eligible aid, and student's circumstances.</p></div><div className="public-feature"><div className="feature-icon"><ClipboardCheck/></div><h3>Review the situation</h3><p>Use consistent criteria, proportionate documentation, and documented human review.</p></div><div className="public-feature"><div className="feature-icon"><Building2/></div><h3>Coordinate with campus</h3><p>Work with authorized university staff to confirm balances and payment status.</p></div><div className="public-feature"><div className="feature-icon"><Activity/></div><h3>Plan beyond today</h3><p>Give students clear repayment visibility and a path to review changing circumstances.</p></div></div>
    <div className="public-callout"><div><div className="eyebrow">INITIAL PILOT FOCUS</div><h2>Start with urgent barriers. Build for the whole journey.</h2><p>The proposed pilot focuses on verified tuition shortfalls that threaten registration or block the graduation process for academically eligible students. The long-term vision is semester-by-semester support through graduation.</p></div><Button onClick={()=>showNotice("Pilot inquiry is simulated. No message was sent.")}>Discuss a pilot <ArrowRight size={16}/></Button></div>
    <div className="fine-print public-disclaimer">Junnah is a product concept in development. No financing is currently offered through this website. Any future program is subject to legal, regulatory, university, and Sharia review.</div>
  </>;
}

const audiencePages = {
  student: {
    label: "For students",
    icon: GraduationCap,
    eyebrow: "STUDENT SUPPORT",
    title: "A clearer next step when tuition gets in the way.",
    description: "Junnah is developing a university-connected way to help students understand and address eligible tuition shortfalls—with clear steps, human review, and proposed interest-free financing.",
    action: "Explore the student demo",
    features: [
      ["Start with a specific barrier", "The proposed first pilot focuses on verified final-semester shortfalls, registration holds, and graduation-clearance balances."],
      ["Be reviewed as a person", "A proposed review considers the student's circumstances, available aid, and relevant evidence—not a credit score alone."],
      ["Understand every proposed cost", "The demo shows a $25 illustrative one-time administration fee due separately only if approved—not at submission or as part of financed principal. The amount and fee structure require validation and qualified review."]
    ],
    actionNote: "A sample application uses fictional information only. Junnah is not accepting applications or offering financing."
  },
  university: {
    label: "For universities",
    icon: Building2,
    eyebrow: "UNIVERSITY PARTNERSHIPS",
    title: "A coordinated workflow for tuition barriers.",
    description: "Junnah is exploring a university-integrated process for student referrals, balance verification, documented review, payment coordination, and outcome reporting.",
    action: "Explore the university workflow",
    features: [
      ["Refer with context", "Give students a clearer path to raise an eligible financial barrier before a registration or graduation-processing deadline."],
      ["Verify and coordinate", "Authorized staff can confirm the relevant balance and deadline, then follow case status and simulated payment coordination."],
      ["Measure before making claims", "A proposed small pilot would test the workflow and outcomes; retention gains, savings, and willingness to pay are not yet proven."]
    ],
    actionNote: "A first pilot is a proposal—not an existing partnership, commitment, or active financing program."
  },
  donor: {
    label: "For donors",
    icon: HeartHandshake,
    eyebrow: "CHARITABLE IMPACT",
    title: "Help a student move forward—and show what happens next.",
    description: "In the proposed model, charitable contributions support a separately governed pool for eligible student balances. Repaid principal may be recycled to help future students, subject to the program's rules and available funds.",
    action: "View the illustrative donor dashboard",
    features: [
      ["Support a defined purpose", "The proposed pool would help address verified education-related balances, with payments coordinated directly with a university when approved."],
      ["See a fuller impact picture", "Reporting could show aggregate support, principal returned and recycled, available liquidity, and unrecovered balances—without exposing student identities."],
      ["Give with clear expectations", "Donations are not investments or refundable. Pool principal may be reduced by defaults, approved forgiveness, or other permitted losses."]
    ],
    actionNote: "No donations are accepted in this demo. Any charitable structure, restrictions, and Sharia framing require qualified review."
  },
  investor: {
    label: "For investors",
    icon: Activity,
    eyebrow: "OPERATING-COMPANY INVESTMENT",
    title: "Build the infrastructure around student support.",
    description: "Junnah's proposed company model is built around university software and administration services—not taking a share of charitable donations or student principal repayments.",
    action: "View the illustrative capital overview",
    features: [
      ["Fund company operations", "Operating-company capital could support product development, security, legal and compliance work, university implementation, and operations."],
      ["Separate the financial ledgers", "Charitable pool capital, company investment, and university contract revenue have distinct purposes and should be accounted for separately."],
      ["Keep returns tied to real results", "Any investor rights or eligible profit distributions would depend on definitive agreements and legal, tax, regulatory, and Sharia review. Returns are not guaranteed."]
    ],
    actionNote: "This is not an investment offer. No fundraising, commitments, contracts, or operating revenue are represented as confirmed."
  }
};

function AudiencePage({audience, setAudience, setPage, setShowApply}) {
  const page = audiencePages[audience];
  const Icon = page.icon;
  const demoPage = audience === "student" ? "student" : audience;
  const scrollToDetails = () => document.getElementById("audience-details")?.scrollIntoView({behavior: "smooth", block: "start"});

  return <>
    <div className="audience-switcher" role="group" aria-label="Choose an audience">
      {Object.entries(audiencePages).map(([id, item]) => {
        const AudienceIcon = item.icon;
        return <button key={id} className={`audience-option ${audience === id ? "selected" : ""}`} aria-pressed={audience === id} onClick={() => setAudience(id)}>
          <AudienceIcon size={17}/><span>{item.label}</span><ArrowRight size={14} className="audience-option-arrow"/>
        </button>;
      })}
    </div>
    <section className={`audience-hero audience-hero-${audience}`}>
      <div className="audience-hero-copy">
        <div className="welcome-kicker"><Icon size={15}/>{page.eyebrow}</div>
        <h2>{page.title}</h2>
        <p>{page.description}</p>
        <div className="audience-actions">
          <Button onClick={() => setPage(demoPage)}>{page.action}<ArrowRight size={16}/></Button>
          {audience === "student"
            ? <button className="banner-link" onClick={() => setShowApply(true)}>Try a sample application <ArrowRight size={15}/></button>
            : <button className="banner-link" onClick={scrollToDetails}>See how it works <ArrowRight size={15}/></button>}
        </div>
        <div className="audience-proof"><ShieldCheck size={15}/><span>Proposed model · Demo only · Synthetic data</span></div>
      </div>
      <div className="audience-hero-art" aria-hidden="true">
        <div className="audience-orbit audience-orbit-outer"/>
        <div className="audience-orbit audience-orbit-inner"/>
        <div className="audience-icon-tile"><Icon size={43}/></div>
        <div className="audience-floating-card"><CheckCircle2 size={16}/><span><strong>Clear next steps</strong><small>Built around the student journey</small></span></div>
      </div>
    </section>
    <section className="audience-details" id="audience-details">
      <div className="public-section-head">
        <div className="eyebrow">A PROPOSED APPROACH</div>
        <h2>What Junnah is building for {audience === "student" ? "you" : page.label.toLowerCase().replace("for ", "")}.</h2>
        <p>Designed around a focused first pilot, with transparent roles, responsible review, and outcomes to validate.</p>
      </div>
      <div className="audience-feature-grid">
        {page.features.map(([title, description], index) => <article className="audience-feature" key={title}>
          <div className="audience-feature-number">0{index + 1}</div>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>)}
      </div>
    </section>
    <div className="audience-bottom">
      <div><div className="eyebrow">THE NEXT STEP</div><h2>See the idea in action.</h2><p>{page.actionNote}</p></div>
      <Button variant="secondary" onClick={() => setPage(demoPage)}>Open {audience === "student" ? "student" : audience} demo<ArrowRight size={15}/></Button>
    </div>
    <p className="audience-disclaimer">Junnah is a pre-validation product concept. No financing, donation, or investment is being offered here. Any future program depends on appropriate legal, regulatory, university, financial, privacy, and qualified Sharia review.</p>
  </>;
}

export default App;
