import React, { useEffect, useState } from "react";
import {
  ArrowDown, ArrowLeft, ArrowRight, BookOpen, Check, ChevronLeft,
  ChevronRight, CircleDollarSign, Compass, GraduationCap, HeartHandshake,
  Landmark, Menu, ShieldCheck, Sparkles, Users, X
} from "lucide-react";
import "./public.css";

const slides = [
  {
    label: "01 / THE NEED",
    title: "Education should not come with a choice between progress and principle.",
    body: "Students can face tuition gaps, unexpected balances, or administrative holds at critical moments in their education.",
    note: "The need and its scale must be validated with students and university partners."
  },
  {
    label: "02 / THE PROPOSAL",
    title: "Coordinate support around the student—not just the balance.",
    body: "Junnah is exploring a university-integrated, Sharia-guided support model with clear verification, human review, and payment coordination.",
    note: "This is a product concept, not an available financing program."
  },
  {
    label: "03 / THE WORKFLOW",
    title: "A transparent path from a financial barrier to a clear next step.",
    body: "Student intake → university verification → human case review → documented decision → direct university payment if approved → ongoing support.",
    note: "Eligibility, agreements, funding, and operations remain to be designed and validated."
  },
  {
    label: "04 / THE FIRST TEST",
    title: "Start small, learn with a university, and measure what matters.",
    body: "The proposed first pilot would test the workflow with one New Jersey institution and approximately ten students over one semester.",
    note: "A pilot depends on a willing institution, available capital, legal and regulatory review, and qualified Sharia guidance."
  },
  {
    label: "05 / THE MODEL",
    title: "Keep operating-company economics separate from charitable capital.",
    body: "The proposed company could earn revenue for university software and administrative services. A charitable financing pool, if established, would be separately governed and accounted for.",
    note: "No revenue, investment terms, charitable pool, or financial return is currently established or guaranteed."
  },
  {
    label: "06 / THE PRINCIPLES",
    title: "Build trust into the structure—not just the story.",
    body: "Dignity, fairness, transparency, stewardship, privacy, and independent review should shape the product and every future financing decision.",
    note: "No Sharia-compliance claim is made. Any future structure requires qualified independent review."
  },
  {
    label: "07 / THE NEXT STEP",
    title: "Help validate the first responsible version of Junnah.",
    body: "We are seeking conversations with university partners, Muslim-focused early-stage funders, and qualified legal, financial, and Sharia advisors.",
    note: "This presentation is for discussion only—not an offer to invest, donate, or borrow."
  }
];

const workflow = [
  {
    number: "01",
    icon: GraduationCap,
    title: "Student shares a situation",
    description: "A student describes a tuition gap or verified university balance and identifies the deadline and support already available."
  },
  {
    number: "02",
    icon: Landmark,
    title: "University verifies the details",
    description: "With appropriate consent, the institution confirms the balance, eligible charges, enrollment status, and relevant deadline."
  },
  {
    number: "03",
    icon: Users,
    title: "A person reviews the case",
    description: "A proposed human-led review considers the student's circumstances, remaining aid, documentation, and available program rules."
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

function PublicHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <header className="public-header">
    <div className="public-header-inner">
      <Brand />
      <button className="public-menu-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(value => !value)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={`public-nav${menuOpen ? " public-nav-open" : ""}`} aria-label="Main navigation">
        <a href="#mission" onClick={() => setMenuOpen(false)}>Our mission</a>
        <a href="#workflow" onClick={() => setMenuOpen(false)}>Workflow</a>
        <a href="#demo" onClick={() => setMenuOpen(false)}>Product demo</a>
        <a href="#deck" onClick={() => setMenuOpen(false)}>Pitch deck</a>
        <a className="public-nav-cta" href="?view=demo">Explore the demo <ArrowRight size={15} /></a>
      </nav>
    </div>
  </header>;
}

function PublicFooter() {
  return <footer className="public-footer">
    <div className="public-footer-main">
      <div><Brand light /><p>Student support, rooted in dignity.</p></div>
      <div className="public-footer-links"><a href="#mission">Mission</a><a href="#workflow">Workflow</a><a href="?view=demo">Demo</a><a href="?view=deck">Pitch deck</a></div>
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
            <h1>Make room for students to move <em>forward.</em></h1>
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
    </main>
    <PublicFooter />
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
      <span className="deck-toolbar-label">CONCEPT DECK · {String(currentSlide + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</span>
    </header>
    <div className="deck-stage">
      <div className="deck-slide" key={currentSlide}>
        <div className="deck-slide-decoration" aria-hidden="true"><div /><div /><div /></div>
        <div className="deck-slide-content">
          <div className="public-kicker"><span /> {slide.label}</div>
          <h1>{slide.title}</h1>
          <p className="deck-slide-body">{slide.body}</p>
          <div className="deck-slide-note"><ShieldCheck size={16} /><p>{slide.note}</p></div>
          <div className="deck-slide-brand"><span>j</span> junnah<span className="brand-period">.</span></div>
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
  return view === "deck" ? <DeckPage /> : <HomePage />;
}
