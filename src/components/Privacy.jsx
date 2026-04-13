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
    width: "600px",
    height: "300px",
    background: "radial-gradient(ellipse at center, rgba(230,43,30,0.12) 0%, transparent 70%)",
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
    fontSize: "clamp(52px, 8vw, 96px)",
    lineHeight: 1,
    letterSpacing: "2px",
    color: "#f0f0f0",
    margin: "0 0 20px",
  },
  heroTitleRed: { color: "#e62b1e" },
  heroSub: {
    fontSize: "0.95rem",
    color: "#888",
    maxWidth: "480px",
    margin: "0 auto",
    lineHeight: 1.7,
  },
  heroDivider: {
    width: "40px",
    height: "2px",
    background: "#e62b1e",
    margin: "28px auto 0",
  },

  // ── LAYOUT ──
  layout: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    gap: "0",
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
    fontSize: "0.78rem",
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
    marginTop: "7px",
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
  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "10px",
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
    fontSize: "0.75rem",
    color: "#444",
    fontFamily: "monospace",
    letterSpacing: "0.1em",
  },
};

const sections = [
  { id: "intro", num: "01", label: "Introduction" },
  { id: "collect", num: "02", label: "Information We Collect" },
  { id: "use", num: "03", label: "How We Use It" },
  { id: "share", num: "04", label: "Sharing Your Info" },
  { id: "contact", num: "05", label: "Contact Us" },
];

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState("intro");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [visible]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;500;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width: 768px) {
          .pp-layout { grid-template-columns: 1fr !important; padding: 48px 24px 80px !important; }
          .pp-sidebar { display: none !important; }
          .pp-content { padding-left: 0 !important; }
          .pp-hero { padding: 80px 24px 56px !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <div
        className="pp-hero"
        style={{
          ...styles.hero,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        <div style={styles.heroGlow} />
        <div style={styles.heroEyebrow}>
          <span style={styles.eyebrowDot} />
          Legal Document
          <span style={styles.eyebrowDot} />
        </div>
        <h1 style={styles.heroTitle}>
          Privacy <span style={styles.heroTitleRed}>Policy</span>
        </h1>
        <p style={styles.heroSub}>
          How we handle your data and protect your privacy at TEDxBBAU.
        </p>
        <div style={styles.heroDivider} />
      </div>

      {/* ── BODY LAYOUT ── */}
      <div
        className="pp-layout"
        style={{
          ...styles.layout,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.15s",
        }}
      >
        {/* SIDEBAR */}
        <aside className="pp-sidebar" style={styles.sidebar}>
          <p style={styles.sidebarLabel}>Contents</p>
          <ul style={styles.sidebarList}>
            {sections.map(({ id, num, label }) => (
              <li
                key={id}
                style={styles.sidebarItem(activeId === id)}
                onClick={() => scrollTo(id)}
              >
                <span style={{ color: "#e62b1e", marginRight: "6px", fontFamily: "monospace", fontSize: "0.65rem" }}>{num}</span>
                {label}
              </li>
            ))}
          </ul>
        </aside>

        {/* CONTENT */}
        <main className="pp-content" style={styles.content}>

          {/* 01 Introduction */}
          <section id="intro" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>01</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Introduction</h2>
            <p style={styles.sectionBody}>
              Welcome to TEDxBBAU. We are committed to protecting your personal information
              and your right to privacy. TEDxBBAU is an independently organised TED event
              held at Babasaheb Bhimrao Ambedkar University, Lucknow.
            </p>
            <p style={styles.sectionBody}>
              If you have any questions or concerns about this policy, or our practices with
              regards to your personal information, please contact us at the details provided
              in Section 6.
            </p>
          </section>

          {/* 02 Information We Collect */}
          <section id="collect" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>02</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Information We Collect</h2>
            <p style={styles.sectionBody}>
              We collect personal information that you voluntarily provide when expressing
              interest in our event, registering, or otherwise contacting us.
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <span style={styles.listBullet} />
                <span><strong style={{ color: "#f0f0f0" }}>Personal Data:</strong> Name, email address, phone number, and similar identifiers collected when you register for the event.</span>
              </li>
              <li style={styles.listItem}>
                <span style={styles.listBullet} />
                <span><strong style={{ color: "#f0f0f0" }}>Derivative Data:</strong> Information our servers automatically collect when you access the site — including your IP address, browser type, operating system, access times, and pages viewed.</span>
              </li>
            </ul>
          </section>

          {/* 03 How We Use */}
          <section id="use" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>03</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>How We Use Your Information</h2>
            <p style={styles.sectionBody}>
              We use personal information collected via our website for the following
              purposes, in reliance on our legitimate business interests, contractual
              necessity, your consent, and legal obligations.
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <span style={styles.listBullet} />
                <span>To send you administrative information, updates, and event-related communications.</span>
              </li>
              <li style={styles.listItem}>
                <span style={styles.listBullet} />
                <span>To fulfill and manage your event registrations and orders.</span>
              </li>
              <li style={styles.listItem}>
                <span style={styles.listBullet} />
                <span>To respond to legal requests, enforce our terms, and prevent harm.</span>
              </li>
            </ul>
          </section>

          {/* 04 Sharing */}
          <section id="share" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>04</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Sharing Your Information</h2>
            <p style={styles.sectionBody}>
              We only share your information in the following limited circumstances:
            </p>
            <ul style={styles.list}>
              <li style={styles.listItem}><span style={styles.listBullet} /><span>With your explicit consent.</span></li>
              <li style={styles.listItem}><span style={styles.listBullet} /><span>To comply with applicable laws or legal processes.</span></li>
              <li style={styles.listItem}><span style={styles.listBullet} /><span>To provide you with requested services or event access.</span></li>
              <li style={styles.listItem}><span style={styles.listBullet} /><span>To protect your rights or the rights of others.</span></li>
              <li style={styles.listItem}><span style={styles.listBullet} /><span>To fulfill necessary business obligations.</span></li>
            </ul>
          </section>

          {/* 05 Contact */}
          <section id="contact" style={styles.section}>
            <div style={styles.sectionHeader}>
              <span style={styles.sectionNum}>05</span>
              <div style={styles.sectionLine} />
            </div>
            <h2 style={styles.sectionTitle}>Contact Us</h2>
            <p style={styles.sectionBody}>
              If you have questions or comments about this policy, you may reach us through
              any of the following:
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