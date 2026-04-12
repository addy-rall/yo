import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const styles = {
  page: {
    backgroundColor: "#0a0a0a",
    minHeight: "100vh",
    fontFamily: "'Georgia', serif",
    color: "#fff",
    margin: 0,
    padding: 0,
  },
  hero: {
    textAlign: "center",
    padding: "72px 48px 56px",
  },
  heroTitle: {
    fontSize: "clamp(48px, 6vw, 76px)",
    fontWeight: "700",
    color: "#e62b1e",
    margin: "0 0 16px",
    fontFamily: "'Arial Black', sans-serif",
    letterSpacing: "-1px",
    lineHeight: 1.05,
  },
  heroSub: {
    fontSize: "17px",
    color: "rgba(255,255,255,0.55)",
    margin: 0,
    fontFamily: "'Arial', sans-serif",
    fontWeight: "400",
    letterSpacing: "0.2px",
  },
  grid: {
    display: "flex",
    gap: "48px",
    padding: "0 64px 80px",
    maxWidth: "1200px",
    margin: "0 auto",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  mapWrapper: {
    flex: "1 1 500px",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.1)",
    position: "relative",
    minHeight: "440px",
    background: "#111",
  },
  openMapsBtn: {
    position: "absolute",
    top: "12px",
    left: "12px",
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    fontFamily: "'Arial', sans-serif",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    transition: "background 0.2s",
  },
  mapIframe: {
    width: "100%",
    height: "440px",
    border: "none",
    display: "block",
  },
  rightPanel: {
    flex: "1 1 400px",
    display: "flex",
    flexDirection: "column",
    gap: "0px",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 24px",
    fontFamily: "'Arial Black', sans-serif",
    letterSpacing: "0.2px",
  },
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    marginBottom: "40px",
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  iconCircle: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    backgroundColor: "rgba(230,43,30,0.15)",
    border: "1px solid rgba(230,43,30,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  contactLabel: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 4px",
    fontFamily: "'Arial', sans-serif",
  },
  contactValue: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.65)",
    margin: 0,
    fontFamily: "'Arial', sans-serif",
    lineHeight: 1.5,
  },
  venueHighlight: {
    color: "#e62b1e",
    fontWeight: "700",
    fontSize: "15px",
  },
  divider: {
    borderColor: "rgba(255,255,255,0.1)",
    margin: "0 0 32px",
    width: "100%",
  },
  followTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
    margin: "0 0 20px",
    fontFamily: "'Arial Black', sans-serif",
  },
  socialRow: {
    display: "flex",
    gap: "16px",
    marginBottom: "40px",
  },
  socialIcon: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    backgroundColor: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background 0.2s, border-color 0.2s",
    color: "rgba(255,255,255,0.75)",
    textDecoration: "none",
  },
  quickLinksBar: {
    borderTop: "1px solid rgba(255,255,255,0.1)",
    paddingTop: "28px",
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  quickLink: {
    color: "#e62b1e",
    fontSize: "14px",
    fontFamily: "'Arial', sans-serif",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
    letterSpacing: "0.2px",
  },
  quickDot: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "14px",
  },
  footer: {
    textAlign: "center",
    padding: "24px 48px",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    fontSize: "13px",
    color: "rgba(255,255,255,0.3)",
    fontFamily: "'Arial', sans-serif",
    letterSpacing: "0.3px",
  },
};

const EmailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e62b1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e62b1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 9.1a16 16 0 0 0 5.91 5.92l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
  </svg>
);

const PinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e62b1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0a0a0a" />
  </svg>
);

export default function Contact() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [mapBtnHover, setMapBtnHover] = useState(false);
  const [visible, setVisible] = useState(false);

  // Scroll to top when Contact page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Working Google Maps embed for BBAU, Lucknow
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.4332994464165!2d80.9231454752174!3d26.76246477673574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bf0280f76903d%3A0xc3f8372671994e1e!2sBabasaheb%20Bhimrao%20Ambedkar%20University!5e0!3m2!1sen!2sin!4v1712950000000!5m2!1sen!2sin";

  const quickLinks = ["About TEDxBBAU", "Our Speakers", "Meet the Team", "Our Sponsors", "Register Now"];
  const socials = [
    { icon: <LinkedInIcon />, href: "#", label: "LinkedIn" },
    { icon: <InstagramIcon />, href: "#", label: "Instagram" },
    { icon: <FacebookIcon />, href: "#", label: "Facebook" },
    { icon: <YoutubeIcon />, href: "#", label: "YouTube" },
  ];

  return (
    <div style={styles.page}>
      {/* ── HERO ── */}
      <div
        style={{
          ...styles.hero,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.55s ease, transform 0.55s ease",
        }}
      >
        <h1 style={styles.heroTitle}>Contact Us</h1>
        <p style={styles.heroSub}>
          Have a question or want to get involved? We'd love to hear from you.
        </p>
      </div>

      {/* ── MAIN GRID ── */}
      <div
        style={{
          ...styles.grid,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s",
        }}
      >
        {/* MAP */}
        <div style={styles.mapWrapper}>
          <button
            style={{
              ...styles.openMapsBtn,
              ...(mapBtnHover ? { backgroundColor: "rgba(255,255,255,0.2)" } : {}),
            }}
            onMouseEnter={() => setMapBtnHover(true)}
            onMouseLeave={() => setMapBtnHover(false)}
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Babasaheb+Bhimrao+Ambedkar+University/@26.7624648,80.9231455,17z",
                "_blank"
              )
            }
          >
            Open in Maps <ExternalLinkIcon />
          </button>
          <iframe
            title="BBAU Location"
            src={mapSrc}
            style={styles.mapIframe}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* RIGHT PANEL */}
        <div style={styles.rightPanel}>
          <h2 style={styles.sectionTitle}>Contact Information</h2>

          <div style={styles.contactList}>
            <div style={styles.contactItem}>
              <div style={styles.iconCircle}><EmailIcon /></div>
              <div>
                <p style={styles.contactLabel}>Email</p>
                <p style={styles.contactValue}>info@tedxbbau.in</p>
              </div>
            </div>

            <div style={styles.contactItem}>
              <div style={styles.iconCircle}><PhoneIcon /></div>
              <div>
                <p style={styles.contactLabel}>WhatsApp Only</p>
                <p style={styles.contactValue}>+91 XXXXX XXXXX</p>
              </div>
            </div>

            <div style={styles.contactItem}>
              <div style={styles.iconCircle}><PinIcon /></div>
              <div>
                <p style={styles.contactLabel}>Venue</p>
                <p style={styles.venueHighlight}>Convention Hall, BBAU</p>
                <p style={styles.contactValue}>
                  Babasaheb Bhimrao Ambedkar University,<br />
                  Vidya Vihar, Raebareli Rd, Lucknow,<br />
                  Uttar Pradesh 226025, India
                </p>
              </div>
            </div>
          </div>

          <hr style={styles.divider} />

          <h2 style={styles.followTitle}>Follow Us</h2>
          <div style={styles.socialRow}>
            {socials.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={styles.socialIcon}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(230,43,30,0.2)";
                  e.currentTarget.style.borderColor = "rgba(230,43,30,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.07)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                }}
              >
                {icon}
              </a>
            ))}
          </div>

          <div style={styles.quickLinksBar}>
            {quickLinks.map((link, i) => (
              <span key={link} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <a
                  href="#"
                  style={{
                    ...styles.quickLink,
                    ...(hoveredLink === link ? { textDecoration: "underline" } : {}),
                  }}
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                >
                  {link}
                </a>
                {i < quickLinks.length - 1 && (
                  <span style={styles.quickDot}>•</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <footer style={styles.footer}>
        © 2026 TEDxBBAU. Independently organised TED event. All rights reserved.
      </footer>
    </div>
  );
}