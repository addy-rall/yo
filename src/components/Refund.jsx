import { useEffect, useState } from "react";

const styles = {
  page: {
    backgroundColor: "#0a0a0a",
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
    color: "#f0f0f0",
    overflowX: "hidden",
  },

  hero: {
    position: "relative",
    padding: "100px 48px 72px",
    textAlign: "center",
    borderBottom: "1px solid #2a2a2a",
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    top: "-60px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "700px",
    height: "320px",
    background: "radial-gradient(ellipse at center, rgba(230,43,30,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  heroGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    pointerEvents: "none",
  },
  heroEyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
    fontFamily: "monospace",
    fontSize: "0.65rem",
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    color: "#e62b1e",
    position: "relative",
  },
  eyebrowDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "#e62b1e",
    animation: "pulse 2s infinite",
  },
  heroTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(48px, 7.5vw, 92px)",
    lineHeight: 1,
    letterSpacing: "2px",
    color: "#f0f0f0",
    margin: "0 0 20px",
    position: "relative",
  },
  heroTitleRed: { color: "#e62b1e" },
  heroSub: {
    fontSize: "0.92rem",
    color: "#888",
    maxWidth: "500px",
    margin: "0 auto",
    lineHeight: 1.75,
    position: "relative",
  },
  heroMeta: {
    display: "flex",
    justifyContent: "center",
    gap: "32px",
    marginTop: "36px",
    position: "relative",
  },
  heroMetaItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },
  heroMetaLabel: {
    fontFamily: "monospace",
    fontSize: "0.55rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#888",
  },
  heroMetaValue: {
    fontFamily: "monospace",
    fontSize: "0.72rem",
    color: "#f0f0f0",
    letterSpacing: "0.06em",
  },
  heroMetaDivider: {
    width: "1px",
    background: "#2a2a2a",
    alignSelf: "stretch",
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "72px 48px 120px",
    alignItems: "start",
  },

  sidebar: {
    position: "sticky",
    top: "88px",
    paddingRight: "40px",
    borderRight: "1px solid #2a2a2a",
  },
  sidebarLabel: {
    fontFamily: "monospace",
    fontSize: "0.58rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "#888",
    marginBottom: "16px",
  },
  sidebarList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  sidebarItem: (active) => ({
    fontSize: "0.76rem",
    fontWeight: active ? "700" : "400",
    color: active ? "#f0f0f0" : "#888",
    cursor: "pointer",
    padding: "7px 12px",
    borderLeft: active ? "2px solid #e62b1e" : "2px solid transparent",
    transition: "all 0.2s",
    lineHeight: 1.4,
  }),

  content: { paddingLeft: "56px" },
  section: { marginBottom: "64px", scrollMarginTop: "100px" },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  sectionNum: {
    fontFamily: "monospace",
    fontSize: "0.6rem",
    letterSpacing: "0.18em",
    color: "#e62b1e",
    minWidth: "28px",
  },
  sectionLine: { flex: 1, height: "1px", background: "#2a2a2a" },
  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
    letterSpacing: "1px",
    color: "#f0f0f0",
    margin: "0 0 16px",
    lineHeight: 1.1,
  },
  sectionBody: {
    fontSize: "0.88rem",
    color: "#888",
    lineHeight: 1.85,
    marginBottom: "16px",
  },

  // ── REFUND TIMELINE ──
  timeline: {
    display: "flex",
    flexDirection: "column",
    gap: "0",
    margin: "8px 0 20px",
    borderLeft: "1px solid #2a2a2a",
    paddingLeft: "24px",
  },
  timelineItem: (type) => ({
    position: "relative",
    padding: "18px 20px",
    marginBottom: "8px",
    border: "1px solid #2a2a2a",
    background: "#111",
    borderLeft: type === "full"
      ? "3px solid #2a7a3b"
      : type === "none"
      ? "3px solid #e62b1e"
      : "3px solid #888",
  }),
  timelineDot: (type) => ({
    position: "absolute",
    left: "-32px",
    top: "50%",
    transform: "translateY(-50%)",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: type === "full" ? "#2a7a3b" : type === "none" ? "#e62b1e" : "#888",
    border: "2px solid #0a0a0a",
  }),
  timelineTag: (type) => ({
    display: "inline-block",
    fontFamily: "monospace",
    fontSize: "0.55rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    padding: "3px 8px",
    marginBottom: "6px",
    color: type === "full" ? "#2a7a3b" : type === "none" ? "#e62b1e" : "#888",
    border: `1px solid ${type === "full" ? "rgba(42,122,59,0.35)" : type === "none" ? "rgba(230,43,30,0.35)" : "rgba(136,136,136,0.35)"}`,
  }),
  timelineTitle: {
    fontSize: "0.88rem",
    fontWeight: "700",
    color: "#f0f0f0",
    marginBottom: "4px",
  },
  timelineDesc: {
    fontSize: "0.82rem",
    color: "#888",
    lineHeight: 1.6,
  },

  highlightBox: {
    border: "1px solid #2a2a2a",
    borderLeft: "3px solid #e62b1e",
    background: "#111",
    padding: "20px 24px",
    marginBottom: "20px",
    fontSize: "0.86rem",
    color: "#888",
    lineHeight: 1.75,
  },

  // ── STEPS ──
  steps: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "8px",
  },
  step: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    padding: "18px 20px",
    border: "1px solid #2a2a2a",
    background: "#111",
  },
  stepNum: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.8rem",
    color: "#e62b1e",
    lineHeight: 1,
    minWidth: "32px",
    opacity: 0.6,
  },
  stepBody: { flex: 1 },
  stepTitle: {
    fontSize: "0.88rem",
    fontWeight: "700",
    color: "#f0f0f0",
    marginBottom: "4px",
  },
  stepDesc: {
    fontSize: "0.82rem",
    color: "#888",
    lineHeight: 1.65,
  },

  contactCard: {
    marginTop: "24px",
    padding: "28px 32px",
    border: "1px solid #2a2a2a",
    background: "#111",
    position: "relative",
    overflow: "hidden",
  },
  contactCardAccent: {
    position: "absolute",
    top: 0, left: 0,
    width: "3px",
    height: "100%",
    background: "#e62b1e",
  },
  contactLabel: {
    fontFamily: "monospace",
    fontSize: "0.58rem",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: "#888",
    marginBottom: "4px",
  },
  contactLink: {
    color: "#e62b1e",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.88rem",
  },
  contactValue: {
    fontSize: "0.88rem",
    color: "#f0f0f0",
    fontWeight: "500",
    lineHeight: 1.7,
  },

  footer: {
    textAlign: "center",
    padding: "24px 48px",
    borderTop: "1px solid #2a2a2a",
    fontSize: "0.72rem",
    color: "#444",
    fontFamily: "monospace",
    letterSpacing: "0.1em",
  },
};

const sections = [
  { id: "ticket",     num: "01", label: "Ticket Refunds" },
  { id: "attendee",   num: "02", label: "Cancellation by Attendee" },
  { id: "organizer",  num: "03", label: "Cancellation by TEDxBBAU" },
  { id: "howto",      num: "04", label: "How to Request a Refund" },
  { id: "fees",       num: "05", label: "Processing Fees" },
];

const timeline = [
  {
    type: "full",
    tag: "Full Refund",
    title: "More than 7 days before the event",
    desc: "100% refund issued, minus any third-party processing fees.",
  },
  {
    type: "none",
    tag: "No Refund",
    title: "Less than 2 days before the event",
    desc: "No refunds will be issued for cancellations made within 2 days of the event.",
  },
];

export default function RefundPolicy() {
  const [activeId, setActiveId] = useState("ticket");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [visible]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @media (max-width: 768px) {
          .rp-layout  { grid-template-columns: 1fr !important; padding: 48px 24px 80px !important; }
          .rp-sidebar { display: none !important; }
          .rp-content { padding-left: 0 !important; }
          .rp-hero    { padding: 80px 24px 56px !important; }
          .rp-meta    { flex-wrap: wrap; gap: 16px !important; }
        }
      `}</style>

      {/* HERO */}
      <div
        className="rp-hero"
        style={{
          ...styles.hero,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        <div style={styles.heroGlow} />
        <div style={styles.heroGrid} />
        <div style={styles.heroEyebrow}>
          <span style={styles.eyebrowDot} />
          Legal Document
          <span style={styles.eyebrowDot} />
        </div>
        <h1 style={styles.heroTitle}>
          Refund <span style={styles.heroTitleRed}>Policy</span>
        </h1>
        <p style={styles.heroSub}>
          Our policies regarding ticket cancellations and refunds for TEDxBBAU events.
        </p>
        <div className="rp-meta" style={styles.heroMeta}>
          <div style={styles.heroMetaItem}>
            <span style={styles.heroMetaLabel}>Effective</span>
            <span style={styles.heroMetaValue}>2026</span>
          </div>
          <div style={styles.heroMetaDivider} />
          <div style={styles.heroMetaItem}>
            <span style={styles.heroMetaLabel}>Processing Time</span>
            <span style={styles.heroMetaValue}>14 Business Days</span>
          </div>
          <div style={styles.heroMetaDivider} />
          <div style={styles.heroMetaItem}>
            <span style={styles.heroMetaLabel}>Sections</span>
            <span style={styles.heroMetaValue}>05</span>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div
        className="rp-layout"
        style={{
          ...styles.layout,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.15s",
        }}
      >
        {/* SIDEBAR */}
        <aside className="rp-sidebar" style={styles.sidebar}>
          <p style={styles.sidebarLabel}>Contents</p>
          <ul style={styles.sidebarList}>
            {sections.map(({ id, num, label }) => (
              <li key={id} style={styles.sidebarItem(activeId === id)} onClick={() => scrollTo(id)}>
                <span style={{ color: "#e62b1e", marginRight: "6px", fontFamily: "monospace", fontSize: "0.65rem" }}>
                  {num}
                </span>
                {label}
              </li>
            ))}
          </ul>
        </aside>

        {/* CONTENT */}
        <main className="rp-content" style={styles.content}>

          {/* 01 Ticket Refunds */}
          <section id="ticket" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>01</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Ticket Refunds</h2>
            <p style={styles.sectionBody}>
              All ticket sales for TEDxBBAU events are generally final. However, we understand
              that unforeseen circumstances may arise and have outlined our refund policy below.
            </p>
            <div style={styles.highlightBox}>
              Please review the cancellation window carefully before purchasing your ticket.
              Refund eligibility is strictly determined by when the cancellation request is received.
            </div>
          </section>

          {/* 02 Cancellation by Attendee */}
          <section id="attendee" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>02</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Cancellation by Attendee</h2>
            <p style={styles.sectionBody}>
              If you are unable to attend the event, you may request a cancellation.
              Refund eligibility differs based on when the cancellation is requested:
            </p>

            <div style={styles.timeline}>
              {timeline.map(({ type, tag, title, desc }) => (
                <div key={tag} style={styles.timelineItem(type)}>
                  <div style={styles.timelineDot(type)} />
                  <span style={styles.timelineTag(type)}>{tag}</span>
                  <p style={styles.timelineTitle}>{title}</p>
                  <p style={styles.timelineDesc}>{desc}</p>
                </div>
              ))}
            </div>

            <p style={styles.sectionBody}>
              Alternatively, you may transfer your ticket to another person up to 2 days before
              the event by contacting our support team.
            </p>
          </section>

          {/* 03 Cancellation by Organizer */}
          <section id="organizer" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>03</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Cancellation by TEDxBBAU</h2>
            <p style={styles.sectionBody}>
              In the unlikely event that the TEDxBBAU event is cancelled, postponed, or
              rescheduled by the organizers, you will be offered a full refund of the ticket
              price or the option to transfer your ticket to the rescheduled event.
            </p>
            <div style={styles.highlightBox}>
              Please note that we are not responsible for any personal expenses incurred —
              such as travel or accommodation costs — in the event of a cancellation or
              rescheduling.
            </div>
          </section>

          {/* 04 How to Request */}
          <section id="howto" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>04</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>How to Request a Refund</h2>
            <p style={styles.sectionBody}>
              To request a refund or ticket transfer, follow the steps below:
            </p>
            <div style={styles.steps}>
              {[
                { title: "Email Us", desc: "Contact us at contact@tedxamu.in with your booking details and the reason for your request." },
                { title: "Wait for Review", desc: "Our team will review your request and verify your eligibility based on the cancellation window." },
                { title: "Refund Processed", desc: "Eligible refunds will be processed within 14 business days of approval." },
              ].map(({ title, desc }, i) => (
                <div key={i} style={styles.step}>
                  <span style={styles.stepNum}>0{i + 1}</span>
                  <div style={styles.stepBody}>
                    <p style={styles.stepTitle}>{title}</p>
                    <p style={styles.stepDesc}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 05 Processing Fees */}
          <section id="fees" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>05</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Processing Fees</h2>
            <p style={styles.sectionBody}>
              Please note that third-party processing fees or platform fees incurred during
              ticket purchase may be non-refundable depending on the payment provider's policies.
            </p>
            <div style={styles.contactCard}>
              <div style={styles.contactCardAccent} />
              <div style={{ marginBottom: "20px" }}>
                <p style={styles.contactLabel}>Refund Enquiries</p>
                <a href="mailto:contact@tedxamu.in" style={styles.contactLink}>
                  contact@tedxamu.in
                </a>
              </div>
              <div>
                <p style={styles.contactLabel}>Address</p>
                <p style={styles.contactValue}>
                  Aligarh Muslim University,<br />
                  Aligarh, Uttar Pradesh, India
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>

      <footer style={styles.footer}>
        © 2026 TEDxBBAU — Independently organised TED event. All rights reserved.
      </footer>
    </div>
  );
}