import React, { useEffect, useState } from "react";
import {
  ArrowDown, ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft, Download,
  ChevronRight, CircleDollarSign, Compass, GraduationCap, HeartHandshake,
  Landmark, Menu, ShieldCheck, Sparkles, Users, X
} from "lucide-react";
import "./public.css";
import slides from "./deck-content.json";

const workflow = [
  {
    number: "01",
    icon: GraduationCap,
    title: "Student submits a term request",
    description: "For an upcoming term, the student shares the school, requested support, deadline, and aid already applied for. All available eligible non-interest-bearing aid must be applied before any Junnah financing."
  },
  {
    number: "02",
    icon: Landmark,
    title: "University verifies the remaining gap",
    description: "With appropriate consent, the institution confirms all available eligible aid was applied, then verifies eligible charges, remaining balance, enrollment status, and deadline."
  },
  {
    number: "03",
    icon: Users,
    title: "A person reviews the case",
    description: "A proposed human-led review considers the remaining eligible tuition gap, the student's circumstances, documentation, and program rules."
  },
  {
    number: "04",
    icon: CircleDollarSign,
    title: "A clear decision is documented",
    description: "If a future program approves support, terms and responsibilities would be explained before any agreement is signed."
  },
  {
    number: "05",
    icon: ShieldCheck,
    title: "Payment and follow-up are coordinated",
    description: "The proposed model pays the institution directly, then provides transparent servicing and a path to discuss hardship."
  }
];

function Brand({ light = false }) {
  return <a className={`public-brand${light ? " public-brand-light" : ""}`} href="./" aria-label="Junnah home">
    <span className="public-brand-mark">j</span>
    <span>junnah<span className="brand-period">.</span></span>
  </a>;
}

function PublicHeader({ currentView = "home" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const homeAnchor = id => currentView === "home" ? `#${id}` : `./#${id}`;
  return <header className="public-header">
    <div className="public-header-inner">
      <Brand />
      <button className="public-menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={`public-nav${menuOpen ? " public-nav-open" : ""}`} aria-label="Main navigation">
        <a href={homeAnchor("mission")} onClick={() => setMenuOpen(false)}>Our mission</a>
        <a href={homeAnchor("workflow")} onClick={() => setMenuOpen(false)}>Workflow</a>
        <a href="?view=stories" onClick={() => setMenuOpen(false)}>Student stories</a>
        <a href={homeAnchor("demo")} onClick={() => setMenuOpen(false)}>Product demo</a>
        <a href={homeAnchor("deck")} onClick={() => setMenuOpen(false)}>Pitch deck</a>
        <a className="public-nav-cta" href="?view=demo">Explore the demo <ArrowRight size={15} /></a>
      </nav>
    </div>
  </header>;
}

function PublicFooter({ currentView = "home" }) {
  const homeAnchor = id => currentView === "home" ? `#${id}` : `./#${id}`;
  return <footer className="public-footer">
    <div className="public-footer-main">
      <div><Brand light /><p>Student support, rooted in dignity.</p></div>
      <div className="public-footer-links"><a href={homeAnchor("mission")}>Mission</a><a href={homeAnchor("workflow")}>Workflow</a><a href="?view=stories">Student stories</a><a href="?view=demo">Demo</a><a href="?view=deck">Pitch deck</a></div>
    </div>
    <div className="public-footer-note">Junnah is a pre-validation product concept. No financing, donations, or investments are offered. Any future program depends on appropriate university, legal, regulatory, financial, privacy, and qualified Sharia review.</div>
  </footer>;
}

function HomePage() {
  return <div className="public-site">
    <PublicHeader />
    <main>
      <section className="public-hero">
        <div className="public-hero-grain" aria-hidden="true" />
        <div className="public-container public-hero-inner">
          <div className="public-hero-copy">
            <div className="public-kicker"><span /> A STUDENT SUPPORT CONCEPT</div>
            <h1>Your future shouldn't cost you <em>your principles</em></h1>
            <p className="public-hero-lede">Junnah is exploring a university-integrated, Sharia-guided approach to help students navigate education costs—with clarity, dignity, and care.</p>
            <div className="public-hero-actions">
              <a className="public-button public-button-light" href="#workflow">See the proposed workflow <ArrowRight size={17} /></a>
              <a className="public-text-link" href="?view=demo">Explore the interactive demo <ArrowRight size={16} /></a>
            </div>
            <p className="public-stage"><span /> Early concept · Seeking pilot partners</p>
          </div>
          <div className="public-hero-art" aria-hidden="true">
            <div className="hero-arch hero-arch-back" />
            <div className="hero-arch hero-arch-front">
              <div className="hero-art-sun" />
              <div className="hero-art-ground" />
              <div className="hero-art-path" />
            </div>
            <div className="hero-note hero-note-top"><Sparkles size={15} /><span>Built around people</span></div>
            <div className="hero-note hero-note-bottom"><HeartHandshake size={17} /><span>Rooted in responsibility</span></div>
          </div>
          <a className="hero-scroll" href="#mission"><ArrowDown size={14} /> Scroll to explore</a>
        </div>
      </section>

      <section className="mission-section public-container" id="mission">
        <div className="mission-symbol"><HeartHandshake size={28} /></div>
        <div className="mission-copy">
          <div className="public-eyebrow">OUR ISLAMIC MISSION</div>
          <h2>Education, with dignity.<br /><em>Support, with integrity.</em></h2>
          <p>Inspired by Islamic values of compassion, justice, transparency, and stewardship, Junnah aims to help students pursue knowledge without treating interest-bearing debt as their only path. We are exploring a Sharia-guided model with humility: no structure is described as Sharia-compliant until it has been reviewed by qualified, independent scholars.</p>
        </div>
        <div className="mission-values">
          <span><Check size={15} /> Dignity before judgment</span>
          <span><Check size={15} /> Clarity at every step</span>
          <span><Check size={15} /> Accountability in stewardship</span>
        </div>
      </section>

      <section className="workflow-section" id="workflow">
        <div className="public-container">
          <div className="public-section-heading">
            <div><div className="public-eyebrow">HOW IT COULD WORK</div><h2>A thoughtful process.<br /><em>One clear next step at a time.</em></h2></div>
            <p>A proposed, university-connected workflow designed to make the situation visible, verify the facts, and give the student a clear path forward.</p>
          </div>
          <div className="workflow-grid">
            {workflow.map(({ number, icon: Icon, title, description }) => <article className="workflow-card" key={number}>
              <div className="workflow-card-top"><span>{number}</span><div><Icon size={19} /></div></div>
              <h3>{title}</h3><p>{description}</p>
            </article>)}
          </div>
          <p className="section-caveat"><ShieldCheck size={15} /> Proposed workflow only. Eligibility, agreements, capital, and servicing are not yet established.</p>
        </div>
      </section>

      <section className="demo-section public-container" id="demo">
        <div className="demo-panel">
          <div className="demo-copy">
            <div className="public-eyebrow">THE PRODUCT DEMO</div>
            <h2>Take a closer look<br /><em>at the proposed experience.</em></h2>
            <p>The interactive prototype shows how student intake, case review, university coordination, and illustrative funding dashboards could fit together. The demo is one part of the story—not the whole website.</p>
            <a className="public-button public-button-dark" href="?view=demo">Enter the interactive demo <ArrowRight size={17} /></a>
            <span className="demo-disclosure"><ShieldCheck size={14} /> Fictional profiles and simulated transactions. No real applications or payments.</span>
          </div>
          <div className="demo-preview" aria-hidden="true">
            <div className="preview-topbar"><div className="preview-brand-dot">j</div><span>Student support workspace</span><span className="preview-badge">DEMO</span></div>
            <div className="preview-content">
              <div className="preview-intro"><span>STUDENT OVERVIEW</span><strong>A clearer path forward.</strong><i /></div>
              <div className="preview-progress"><span>Application steps</span><div><i /><i /><i /><i /></div><small>2 of 4 complete</small></div>
              <div className="preview-task"><div><Check size={14} /></div><span><b>Balance verification</b><small>University confirmation in progress</small></span><ArrowRight size={15} /></div>
              <div className="preview-task"><div className="preview-task-pending"><BookOpen size={14} /></div><span><b>Understand your next steps</b><small>Review the proposed process</small></span><ArrowRight size={15} /></div>
            </div>
            <div className="preview-stamp"><ShieldCheck size={13} /> Synthetic demo environment</div>
          </div>
        </div>
      </section>

      <section className="deck-section" id="deck">
        <div className="public-container deck-section-inner">
          <div className="deck-copy">
            <div className="public-eyebrow">THE PITCH DECK</div>
            <h2>A concise introduction<br /><em>to the opportunity.</em></h2>
            <p>Explore the need, proposed workflow, first validation step, operating model, and principles—all in a separate, presentation-style deck.</p>
            <a className="public-button public-button-light" href="?view=deck">Open the pitch deck <ArrowRight size={17} /></a>
            <span className="deck-note">Discussion material · No investment offer</span>
          </div>
          <a className="deck-cover" href="?view=deck" aria-label="Open the Junnah pitch deck">
            <div className="deck-cover-label">JUNNAH · CONCEPT OVERVIEW</div>
            <div className="deck-cover-mark">ج</div>
            <div className="deck-cover-title">Student support,<br /><em>with purpose.</em></div>
            <div className="deck-cover-foot"><span>PRE-VALIDATION</span><ArrowRight size={16} /></div>
          </a>
        </div>
      </section>

      <section className="validation-section public-container">
        <div className="validation-icon"><Compass size={23} /></div>
        <div><div className="public-eyebrow">WHAT COMES NEXT</div><h2>Validate before we scale.</h2><p>The proposed first test is a small pilot with one New Jersey institution and approximately ten students over one semester. First, we need a willing university partner, appropriate advisors, and a responsible path to funding and evaluation.</p></div>
        <div className="validation-badge">PROPOSED<br />PILOT</div>
      </section>

      <section className="founder-section public-container" id="founder">
        <div className="founder-note">
          <div className="public-eyebrow">A NOTE FROM THE FOUNDER</div>
          <h2><em>Mission before personal gain.</em></h2>
          <p>I'm committed to building Junnah into a sustainable organization that can serve students for generations. Our resources and decisions will be guided by that mission, with responsible financial stewardship and transparency at the center of how we operate.</p>
        </div>
      </section>
    </main>
    <PublicFooter />
  </div>;
}

const studentProfiles = [
  {
    title: "One Semester Away from Graduation",
    story: [
      "Throughout college, this student was their family's primary financial provider while working toward their degree. They accepted subsidized and unsubsidized federal student loans, working to pay off the unsubsidized portion as quickly as possible to minimize interest.",
      "When their final semester arrived, their remaining tuition balance was not covered by their loans. Despite working and supporting their family, they struggled to pay the balance on time, incurring additional late fees. The delay also held up the issuance of their diploma. One month after graduation, the university sold the unpaid balance to a collections agency without the student knowing. They spent years trying to repay it, prolonging the consequences of a financial shortfall well beyond graduation."
    ],
    help: "If a tuition gap remains after a student applies for all available eligible non-interest-bearing aid, Junnah aims to help address that verified gap through proposed interest-free financing."
  },
  {
    title: "A Dream of Medicine. A Conflict of Conviction.",
    story: [
      "This student completed their undergraduate degree while taking on student loans. Now accepted into medical school, they are pursuing a career they've worked toward for years — without financial support from family.",
      "Medical school brings years of additional education expenses. Without family support, interest-bearing loans may be the only financing option available to them, leaving them facing debt they may be unable to repay for years.",
      "For a student whose faith prohibits interest, the decision becomes more than financial. They must weigh the future they've worked toward against a financing system that conflicts with their deeply held beliefs."
    ],
    help: "After a student applies for all available eligible non-interest-bearing aid, Junnah aims to assess any remaining eligible tuition gap for proposed interest-free financing."
  },
  {
    title: "A Family That Can Afford College — Just Not All at Once",
    story: [
      "In a working middle-class household, multiple siblings are pursuing higher education at the same time. Their family can manage monthly education expenses, but the tuition balances remaining after financial aid are too large to pay upfront.",
      "University payment plans offer limited relief. Their repayment schedules can require balances to be paid in full before the semester ends, creating overlapping and aggressive payment obligations when several children are enrolled simultaneously.",
      "The family must make difficult choices. Siblings may attend different colleges based on affordability rather than academic fit, while others may forgo higher education rather than rely on interest-bearing financing that conflicts with their religious principles."
    ],
    help: "If an eligible tuition gap remains after all available eligible non-interest-bearing aid is applied, Junnah aims to offer a more manageable proposed payment schedule for that gap."
  },
  {
    title: "Working to Stay in School",
    story: [
      "For this student, staying in college means working throughout the semester to cover tuition and living expenses. Balancing work with coursework leaves less time and energy for academics, campus clubs, internships, and the personal and professional relationships that can shape a student's future.",
      "Living on campus may be financially out of reach, further limiting their ability to participate in university life. When working enough hours still isn't sufficient to cover the next semester's costs, the student may have to take time away from school to earn enough to return.",
      "What begins as a way to finance an education can become a cycle of working, stopping out, and trying to return — extending the time it takes to graduate and making academic progress more difficult."
    ],
    help: "After students apply for all available eligible non-interest-bearing aid, Junnah aims to assess any remaining eligible tuition gap and reduce the payment pressure that can interrupt their studies."
  }
];

function StudentStoriesPage() {
  return <div className="public-site">
    <PublicHeader currentView="stories" />
    <main>
      <section className="stories-hero">
        <div className="public-container stories-hero-inner">
          <div className="public-kicker"><span /> STUDENT EXPERIENCES</div>
          <h1>Real lives.<br /><em>Real barriers to education.</em></h1>
          <p>Behind every tuition balance is a student trying to keep their education and future within reach.</p>
        </div>
      </section>
      <section className="stories-intro public-container">
        <div className="public-eyebrow">WHY THIS MATTERS</div>
        <h2>Financial pressure can shape a student's whole path.</h2>
        <p>These profiles are based on real experiences of students attending college in New Jersey between 2019 and 2025. They are shared without identifying details.</p>
        <div className="stories-disclaimer"><ShieldCheck size={16} /><p>Junnah is a pre-validation concept, not a currently available financing program. The ways Junnah aims to help below describe a proposed model that would need funding, institutional partnership, and appropriate legal, regulatory, financial, privacy, and qualified Sharia review.</p></div>
      </section>
      <section className="stories-list public-container" aria-label="Student profiles">
        {studentProfiles.map(({ title, story, help }, index) => <article className="student-story" key={title}>
          <div className="student-story-number">{String(index + 1).padStart(2, "0")}</div>
          <div className="student-story-content">
            <h2>{title}</h2>
            {story.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
            <div className="student-story-help">
              <div className="public-eyebrow">HOW JUNNAH AIMS TO HELP</div>
              <p>{help}</p>
            </div>
          </div>
        </article>)}
      </section>
      <section className="stories-next public-container">
        <div><div className="public-eyebrow">A PROPOSED PATH FORWARD</div><h2>Support should fit the student's real circumstances.</h2></div>
        <a className="public-button public-button-dark" href="./#workflow">See the proposed workflow <ArrowRight size={16} /></a>
      </section>
      <p className="stories-attribution public-container">Two profiles are drawn from the lived experiences of the founder and her brother.</p>
    </main>
    <PublicFooter currentView="stories" />
  </div>;
}

function GrowthModelSlide({ slide }) {
  const maximumRevenue = Math.max(...slide.chart.scenarios.map(({ revenue }) => revenue));
  const formatMoney = value => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);

  return <div className="deck-growth">
    <div className="deck-growth-flow" aria-label="Proposed growth flywheel">
      {slide.flow.map(({ title, body }, index) => <React.Fragment key={title}>
        <article className="deck-growth-step">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h2>{title}</h2>
          <p>{body}</p>
        </article>
        {index < slide.flow.length - 1 && <ArrowRight className="deck-growth-arrow" size={17} aria-hidden="true" />}
      </React.Fragment>)}
    </div>
    <div className="deck-growth-details">
      <section className="deck-revenue-model">
        <div className="deck-growth-eyebrow">REVENUE MODEL · PROPOSED</div>
        {slide.revenueStreams.map(({ title, body, emphasis }) => <article className={`deck-revenue-stream${emphasis ? " emphasized" : ""}`} key={title}>
          <h3>{title}</h3><p>{body}</p>
        </article>)}
      </section>
      <section className="deck-growth-chart">
        <div className="deck-growth-eyebrow">ILLUSTRATIVE UNIVERSITY REVENUE · NOT A PROJECTION</div>
        <strong className="deck-growth-formula">{slide.chart.formula}</strong>
        <div className="deck-growth-assumptions">{slide.chart.assumptions}</div>
        <div className="deck-scenario-list">
          {slide.chart.scenarios.map(({ universities, students, revenue }) => <div className="deck-scenario" key={universities}>
            <span className="deck-scenario-label">{universities} {universities === 1 ? "university" : "universities"}<small>{students.toLocaleString()} students</small></span>
            <span className="deck-scenario-track"><i style={{ width: `${revenue / maximumRevenue * 100}%` }} /></span>
            <strong>{formatMoney(revenue)}</strong>
          </div>)}
        </div>
        <small className="deck-growth-definitions">{slide.chart.definitions}</small>
      </section>
    </div>
    <div className="deck-growth-funding">
      <strong>Funding availability</strong>
      <span>{slide.fundingNote}</span>
    </div>
    <div className="deck-growth-takeaway">{slide.takeaway}</div>
    <p className="deck-growth-disclaimer">{slide.note}</p>
  </div>;
}

function DeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = slides[currentSlide];
  const go = direction => setCurrentSlide(index => (index + direction + slides.length) % slides.length);

  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "Escape") window.location.href = "./#deck";
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return <main className="deck-view">
    <header className="deck-toolbar">
      <a className="deck-back" href="./#deck"><ArrowLeft size={16} /> Back to Junnah</a>
      <Brand />
      <div className="deck-toolbar-actions">
        <a className="deck-download" href="./Junnah_Deck_Redesigned.pdf" download><Download size={15} /> Download deck</a>
        <span className="deck-toolbar-label">CONCEPT DECK · {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
      </div>
    </header>
    <div className="deck-stage">
      <div className="deck-slide" key={currentSlide}>
        <div className="deck-slide-decoration" aria-hidden="true" />
        <div className="deck-slide-content">
          <div className="public-kicker"><span /> {slide.label}</div>
          {slide.cover ? <>
            <div className="deck-cover-content">
              <h1>{slide.title}</h1>
              <p>{slide.subtitle}</p>
              <span>{slide.note}</span>
            </div>
            <div className="deck-slide-brand"><span>j</span> junnah<span className="brand-period">.</span></div>
          </> : slide.type === "growth-model" ? <>
            <h1>{slide.title}</h1>
            <p className="deck-slide-body">{slide.subtitle}</p>
            <GrowthModelSlide slide={slide} />
            <div className="deck-slide-brand"><span>j</span> junnah<span className="brand-period">.</span></div>
          </> : <>
            <h1>{slide.title}</h1>
            {slide.subtitle && <p className="deck-slide-body">{slide.subtitle}</p>}
            <div className={`deck-cards deck-cards-${slide.cards.length}`}>
              {slide.cards.map((card, index) => <article className="deck-card" key={card.title}>
                <span className="deck-card-number">{String(index + 1).padStart(2, "0")}</span>
                <h2>{card.title}</h2>
                {card.body && <p>{card.body}</p>}
                {card.note && <small>{card.note}</small>}
              </article>)}
            </div>
            {slide.note && <div className="deck-slide-note"><ShieldCheck size={16} /><p>{slide.note}</p></div>}
            <div className="deck-slide-brand"><span>j</span> junnah<span className="brand-period">.</span></div>
          </>}
        </div>
      </div>
    </div>
    <div className="deck-controls">
      <button className="deck-control-button" onClick={() => go(-1)} aria-label="Previous slide"><ChevronLeft size={20} /></button>
      <div className="deck-progress" aria-label={`Slide ${currentSlide + 1} of ${slides.length}`}>
        {slides.map((item, index) => <button key={item.label} className={index === currentSlide ? "active" : ""} onClick={() => setCurrentSlide(index)} aria-label={`Go to slide ${index + 1}`} aria-current={index === currentSlide ? "step" : undefined} />)}
      </div>
      <button className="deck-control-button" onClick={() => go(1)} aria-label="Next slide"><ChevronRight size={20} /></button>
    </div>
    <p className="deck-key-hint">Use ← and → to navigate · Esc to return</p>
  </main>;
}

export default function PublicSite() {
  const view = new URLSearchParams(window.location.search).get("view");
  if (view === "deck") return <DeckPage />;
  if (view === "stories") return <StudentStoriesPage />;
  return <HomePage />;
}
