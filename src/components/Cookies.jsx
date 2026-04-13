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

  // ── COOKIE TYPE CARDS ──
  cookieGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "8px",
  },
  cookieCard: {
    border: "1px solid #2a2a2a",
    background: "#111",
    padding: "20px 24px",
    position: "relative",
    overflow: "hidden",
  },
  cookieCardTag: {
    display: "inline-block",
    fontFamily: "monospace",
    fontSize: "0.55rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "#e62b1e",
    border: "1px solid rgba(230,43,30,0.3)",
    padding: "3px 8px",
    marginBottom: "10px",
  },
  cookieCardTitle: {
    fontSize: "0.9rem",
    fontWeight: "700",
    color: "#f0f0f0",
    marginBottom: "6px",
  },
  cookieCardDesc: {
    fontSize: "0.84rem",
    color: "#888",
    lineHeight: 1.75,
  },
  cookieCardDot: {
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#e62b1e",
    opacity: 0.5,
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
  { id: "what",    num: "01", label: "What Are Cookies?" },
  { id: "why",     num: "02", label: "Why We Use Cookies" },
  { id: "types",   num: "03", label: "Types of Cookies" },
  { id: "control", num: "04", label: "How to Control" },
  { id: "updates", num: "05", label: "Policy Updates" },
  { id: "contact", num: "06", label: "Contact Us" },
];

const cookieTypes = [
  {
    tag: "Essential",
    title: "Essential Website Cookies",
    desc: "Strictly necessary to provide you with services available through our website and to use some of its core features. These cannot be disabled.",
  },
  {
    tag: "Functional",
    title: "Performance & Functionality Cookies",
    desc: "Used to enhance the performance and functionality of our website. Non-essential, but disabling them may affect your experience.",
  },
  {
    tag: "Analytics",
    title: "Analytics & Customisation Cookies",
    desc: "Collect information in aggregate form to help us understand how our website is used and how effective our campaigns are, or to customise the site for you.",
  },
];

export default function CookiePolicy() {
  const [activeId, setActiveId] = useState("what");
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
          .cp-layout  { grid-template-columns: 1fr !important; padding: 48px 24px 80px !important; }
          .cp-sidebar { display: none !important; }
          .cp-content { padding-left: 0 !important; }
          .cp-hero    { padding: 80px 24px 56px !important; }
          .cp-meta    { flex-wrap: wrap; gap: 16px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div
        className="cp-hero"
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
          Cookie <span style={styles.heroTitleRed}>Policy</span>
        </h1>
        <p style={styles.heroSub}>
          How TEDxBBAU uses cookies and similar technologies on our website.
        </p>

        <div className="cp-meta" style={styles.heroMeta}>
          <div style={styles.heroMetaItem}>
            <span style={styles.heroMetaLabel}>Effective</span>
            <span style={styles.heroMetaValue}>2026</span>
          </div>
          <div style={styles.heroMetaDivider} />
          <div style={styles.heroMetaItem}>
            <span style={styles.heroMetaLabel}>Cookie Types</span>
            <span style={styles.heroMetaValue}>03</span>
          </div>
          <div style={styles.heroMetaDivider} />
          <div style={styles.heroMetaItem}>
            <span style={styles.heroMetaLabel}>Sections</span>
            <span style={styles.heroMetaValue}>06</span>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div
        className="cp-layout"
        style={{
          ...styles.layout,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.15s",
        }}
      >
        {/* SIDEBAR */}
        <aside className="cp-sidebar" style={styles.sidebar}>
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
        <main className="cp-content" style={styles.content}>

          {/* 01 What Are Cookies */}
          <section id="what" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>01</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>What Are Cookies?</h2>
            <p style={styles.sectionBody}>
              Cookies are small data files placed on your computer or mobile device when you
              visit a website. They are widely used by website owners to make their websites
              work, operate more efficiently, and to provide reporting information.
            </p>
            <div style={styles.highlightBox}>
              Cookies set by the website owner (in this case, TEDxBBAU) are called "first-party
              cookies." Cookies set by parties other than the website owner are called
              "third-party cookies."
            </div>
          </section>

          {/* 02 Why We Use */}
          <section id="why" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>02</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Why We Use Cookies</h2>
            <p style={styles.sectionBody}>
              We use first-party and third-party cookies for several reasons. Some cookies are
              required for technical reasons in order for our website to operate — we refer to
              these as "essential" or "strictly necessary" cookies.
            </p>
            <p style={styles.sectionBody}>
              Other cookies enable us to track and target the interests of our users to enhance
              the experience on our site. Third parties serve cookies through our website for
              advertising, analytics, and other purposes.
            </p>
          </section>

          {/* 03 Types */}
          <section id="types" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>03</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Types of Cookies We Use</h2>
            <p style={styles.sectionBody}>
              The specific types of first- and third-party cookies served through our website
              and the purposes they perform are described below:
            </p>
            <div style={styles.cookieGrid}>
              {cookieTypes.map(({ tag, title, desc }) => (
                <div key={tag} style={styles.cookieCard}>
                  <div style={styles.cookieCardDot} />
                  <span style={styles.cookieCardTag}>{tag}</span>
                  <p style={styles.cookieCardTitle}>{title}</p>
                  <p style={styles.cookieCardDesc}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 04 Control */}
          <section id="control" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>04</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>How to Control Cookies</h2>
            <p style={styles.sectionBody}>
              You have the right to decide whether to accept or reject cookies. You can exercise
              your cookie preferences by setting your browser controls to accept or refuse cookies.
            </p>
            <div style={styles.highlightBox}>
              If you choose to reject cookies, you may still use our website — however, your
              access to some functionality and areas may be restricted as a result.
            </div>
            <p style={styles.sectionBody}>
              Most browsers allow you to manage cookie settings through their preferences or
              settings menus. Refer to your browser's help documentation for specific instructions.
            </p>
          </section>

          {/* 05 Updates */}
          <section id="updates" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>05</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Updates to This Policy</h2>
            <p style={styles.sectionBody}>
              We may update this Cookie Policy from time to time to reflect changes to the
              cookies we use, or for other operational, legal, or regulatory reasons.
            </p>
            <p style={styles.sectionBody}>
              Please re-visit this Cookie Policy regularly to stay informed about our use of
              cookies and related technologies. The date at the top of this policy indicates
              when it was last updated.
            </p>
          </section>

          {/* 06 Contact */}
          <section id="contact" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>06</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Contact Us</h2>
            <p style={styles.sectionBody}>
              If you have any questions about our use of cookies or other technologies,
              please reach out to us:
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
                <p style={{ fontSize: "0.88rem", color: "#f0f0f0", fontWeight: "500", lineHeight: 1.7 }}>
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