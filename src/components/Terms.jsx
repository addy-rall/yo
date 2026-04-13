import { useEffect, useState } from "react";

const styles = {
  page: {
    backgroundColor: "#0a0a0a",
    minHeight: "100vh",
    fontFamily: "'DM Sans', sans-serif",
    color: "#f0f0f0",
    overflowX: "hidden",
  },

  // ── HERO ──
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

  // ── LAYOUT ──
  layout: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "72px 48px 120px",
    alignItems: "start",
  },

  // ── SIDEBAR ──
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

  // ── CONTENT ──
  content: {
    paddingLeft: "56px",
  },
  section: {
    marginBottom: "64px",
    scrollMarginTop: "100px",
  },
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
  sectionLine: {
    flex: 1,
    height: "1px",
    background: "#2a2a2a",
  },
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

  // ── HIGHLIGHT BOX ──
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

  // ── LIST ──
  list: {
    listStyle: "none",
    padding: 0,
    margin: "20px 0 0",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  listItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    fontSize: "0.86rem",
    color: "#888",
    lineHeight: 1.7,
  },
  listBullet: {
    marginTop: "8px",
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    backgroundColor: "#e62b1e",
    flexShrink: 0,
  },

  // ── CONTACT CARD ──
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
    top: 0,
    left: 0,
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
  contactValue: {
    fontSize: "0.88rem",
    color: "#f0f0f0",
    fontWeight: "500",
    lineHeight: 1.7,
  },
  contactLink: {
    color: "#e62b1e",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.88rem",
  },

  // ── FOOTER ──
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
  { id: "agreement",   num: "01", label: "Agreement to Terms" },
  { id: "ip",          num: "02", label: "Intellectual Property" },
  { id: "reps",        num: "03", label: "User Representations" },
  { id: "prohibited",  num: "04", label: "Prohibited Activities" },
  { id: "mods",        num: "05", label: "Modifications" },
  { id: "law",         num: "06", label: "Governing Law" },
  { id: "contact",     num: "07", label: "Contact Us" },
];

export default function TermsAndConditions() {
  const [activeId, setActiveId] = useState("agreement");
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
          .tc-layout  { grid-template-columns: 1fr !important; padding: 48px 24px 80px !important; }
          .tc-sidebar { display: none !important; }
          .tc-content { padding-left: 0 !important; }
          .tc-hero    { padding: 80px 24px 56px !important; }
          .tc-meta    { flex-wrap: wrap; gap: 16px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div
        className="tc-hero"
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
          Terms &amp; <span style={styles.heroTitleRed}>Conditions</span>
        </h1>
        <p style={styles.heroSub}>
          Please read these terms carefully before using our website or attending TEDxBBAU.
        </p>

        <div className="tc-meta" style={styles.heroMeta}>
          <div style={styles.heroMetaItem}>
            <span style={styles.heroMetaLabel}>Effective</span>
            <span style={styles.heroMetaValue}>2026</span>
          </div>
          <div style={styles.heroMetaDivider} />
          <div style={styles.heroMetaItem}>
            <span style={styles.heroMetaLabel}>Jurisdiction</span>
            <span style={styles.heroMetaValue}>India</span>
          </div>
          <div style={styles.heroMetaDivider} />
          <div style={styles.heroMetaItem}>
            <span style={styles.heroMetaLabel}>Sections</span>
            <span style={styles.heroMetaValue}>07</span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div
        className="tc-layout"
        style={{
          ...styles.layout,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.15s",
        }}
      >
        {/* SIDEBAR */}
        <aside className="tc-sidebar" style={styles.sidebar}>
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
        <main className="tc-content" style={styles.content}>

          {/* 01 Agreement */}
          <section id="agreement" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>01</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Agreement to Terms</h2>
            <div style={styles.highlightBox}>
              By accessing or using this site, you agree to be bound by these Terms and Conditions.
              If you disagree with any part, you may not access the site.
            </div>
            <p style={styles.sectionBody}>
              These Terms and Conditions constitute a legally binding agreement between you —
              whether personally or on behalf of an entity — and TEDxBBAU ("we," "us," or "our"),
              concerning your access to and use of our website as well as any other media form,
              channel, mobile website, or application related or connected thereto (collectively,
              the "Site").
            </p>
          </section>

          {/* 02 IP */}
          <section id="ip" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>02</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Intellectual Property Rights</h2>
            <p style={styles.sectionBody}>
              Unless otherwise indicated, the Site is our proprietary property. All source code,
              databases, functionality, software, website designs, audio, video, text, photographs,
              and graphics on the Site (collectively, the "Content"), and the trademarks, service
              marks, and logos contained therein (the "Marks") are owned or controlled by us or
              licensed to us.
            </p>
            <p style={styles.sectionBody}>
              All Content and Marks are protected by copyright and trademark laws. They are provided
              on the Site for your information and personal use only. No part of the Site or Content
              may be copied, reproduced, aggregated, republished, or exploited for any commercial
              purpose without our express prior written permission.
            </p>
          </section>

          {/* 03 User Reps */}
          <section id="reps" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>03</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>User Representations</h2>
            <p style={styles.sectionBody}>
              By using the Site, you represent and warrant that:
            </p>
            <ul style={styles.list}>
              {[
                "All registration information you submit will be true, accurate, current, and complete.",
                "You will maintain the accuracy of such information and promptly update it as necessary.",
                "You have the legal capacity and agree to comply with these Terms and Conditions.",
                "You are not a minor in the jurisdiction in which you reside.",
              ].map((item, i) => (
                <li key={i} style={styles.listItem}>
                  <span style={styles.listBullet} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 04 Prohibited */}
          <section id="prohibited" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>04</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Prohibited Activities</h2>
            <p style={styles.sectionBody}>
              You may not access or use the Site for any purpose other than that for which we make
              it available. The Site may not be used in connection with any commercial endeavors
              except those specifically endorsed or approved by us. Prohibited activities include
              but are not limited to:
            </p>
            <ul style={styles.list}>
              {[
                "Systematically retrieving data or content to create a collection or database without written permission.",
                "Tricking, defrauding, or misleading us or other users.",
                "Circumventing, disabling, or otherwise interfering with security-related features of the Site.",
                "Using the Site to advertise or offer to sell goods and services.",
                "Engaging in unauthorized framing of or linking to the Site.",
              ].map((item, i) => (
                <li key={i} style={styles.listItem}>
                  <span style={styles.listBullet} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 05 Modifications */}
          <section id="mods" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>05</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Modifications & Interruptions</h2>
            <p style={styles.sectionBody}>
              We reserve the right to change, modify, or remove the contents of the Site at any
              time or for any reason at our sole discretion without notice. We have no obligation
              to update any information on the Site.
            </p>
            <p style={styles.sectionBody}>
              We also reserve the right to modify or discontinue all or part of the Site without
              notice at any time. We will not be liable to you or any third party for any
              modification, suspension, or discontinuance of the Site.
            </p>
          </section>

          {/* 06 Governing Law */}
          <section id="law" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>06</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Governing Law</h2>
            <p style={styles.sectionBody}>
              These Terms and Conditions and your use of the Site are governed by and construed
              in accordance with the laws of India applicable to agreements made and to be entirely
              performed within India, without regard to its conflict of law principles.
            </p>
            <div style={styles.highlightBox}>
              Any disputes arising under these Terms shall be subject to the exclusive jurisdiction
              of the courts located in Lucknow, Uttar Pradesh, India.
            </div>
          </section>

          {/* 07 Contact */}
          <section id="contact" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>07</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Contact Us</h2>
            <p style={styles.sectionBody}>
              To resolve a complaint regarding the Site or to receive further information
              regarding use of the Site, please contact us:
            </p>
            <div style={styles.contactCard}>
              <div style={styles.contactCardAccent} />
              <div style={{ marginBottom: "20px" }}>
                <p style={styles.contactLabel}>Email</p>
                <a href="mailto:info@tedxbbau.in" style={styles.contactLink}>
                  info@tedxbbau.in
                </a>
              </div>
              <div>
                <p style={styles.contactLabel}>Postal Address</p>
                <p style={styles.contactValue}>
                  TEDxBBAU, Babasaheb Bhimrao Ambedkar University,<br />
                  Vidya Vihar, Raebareli Road,<br />
                  Lucknow, Uttar Pradesh — 226025, India
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