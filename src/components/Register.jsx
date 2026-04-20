import { useEffect, useState } from "react";

const Register = () => {
  const targetDate = new Date("May 4, 2026 00:00:00").getTime();

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const timer = setInterval(() => setTimeLeft(getTimeRemaining()), 1000);
    return () => clearInterval(timer);
  }, []);

  const styles = {
    container: {
      textAlign: "center",
      padding: "60px 20px",
      backgroundColor: "#0b0b0b",
      minHeight: "100vh",
      fontFamily: "'Poppins', sans-serif",
      color: "white",
    },
    title: {
      fontSize: "3rem",
      color: "#ff1e1e",
      margin: 0,
    },
    subtitle: {
      color: "#aaa",
      marginBottom: "40px",
    },
    countdownBox: {
      background: "#1a0000",
      padding: "20px",
      borderRadius: "10px",
      margin: "20px auto",
      maxWidth: "1000px",
      border: "1px solid #ff1e1e",
    },
    timer: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "15px",
    },
    timerDiv: {
      textAlign: "center",
    },
    timerSpan: {
      fontSize: "2rem",
      color: "#ff1e1e",
      display: "block",
    },
    sectionTitle: {
      marginTop: "50px",
      fontSize: "2rem",
    },
    tickets: {
      display: "flex",
      gap: "20px",
      justifyContent: "center",
      marginTop: "30px",
      flexWrap: "wrap",
    },
    card: {
      background: "#111",
      border: "1px solid #333",
      padding: "25px",
      borderRadius: "12px",
      width: "300px",
      textAlign: "left",
      transition: "0.3s",
    },
    cardH3: {
      color: "#ff1e1e",
      margin: "0 0 10px 0",
    },
    price: {
      fontSize: "1.5rem",
      margin: "10px 0",
    },
    priceStrike: {
      textDecoration: "line-through",
      color: "#888",
      marginLeft: "10px",
      fontSize: "1rem",
    },
    ul: {
      padding: 0,
      listStyle: "none",
      margin: "10px 0",
    },
    li: {
      margin: "8px 0",
    },
    buyBtn: {
      display: "block",
      textAlign: "center",
      marginTop: "20px",
      padding: "12px",
      background: "#ff1e1e",
      color: "white",
      textDecoration: "none",
      borderRadius: "6px",
      transition: "0.3s",
      cursor: "pointer",
    },
  };

  const tickets = [
    {
      title: "General Pass",
      price: "₹149",
      original: "₹199",
      perks: ["Full Day Access", "Access to All Talks", "TEDx Official Certificate", "High-quality GSM Certificate"],
      url: "https://in.bookmyshow.com/events/tedxbbau/ET00494884",
    },
    {
      title: "Double Pass (2 Tickets)",
      price: "₹249",
      original: "₹349",
      perks: ["Full Day Access", "Access to All Talks", "Certificate Included"],
      url: "https://in.bookmyshow.com/events/tedxbbau/ET00494884",
    },
    {
      title: "Premium Pass",
      price: "₹299",
      original: "₹349",
      perks: ["Full Day Access", "Access to All Talks", "Goodies", "Certificate Included"],
      url: "https://in.bookmyshow.com/events/tedxbbau/ET00494884",
    },
    {
      title: "VIP Pass",
      price: "₹549",
      original: "₹599",
      perks: ["Full Day Access", "Access to All Talks", "Lunch", "Goodies + Certificate Included", "Exclusive Meet and Greet"],
      url: "https://in.bookmyshow.com/events/tedxbbau/ET00494884",
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Join Us at TEDxBBAU</h1>
      <p style={styles.subtitle}>
        Be part of an unforgettable experience filled with inspiration and ideas.
      </p>

      <div style={styles.countdownBox}>
        <h3>⚡ Buy the Tickets Now</h3>
        <div style={styles.timer}>
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} style={styles.timerDiv}>
              <span style={styles.timerSpan}>{timeLeft[unit]}</span>
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </div>
          ))}
        </div>
      </div>

      <h2 style={styles.sectionTitle}>Ticket Information</h2>

      <div style={styles.tickets}>
        {tickets.map((ticket) => (
          <div
            key={ticket.title}
            style={styles.card}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.borderColor = "#ff1e1e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "#333";
            }}
          >
            <h3 style={styles.cardH3}>{ticket.title}</h3>
            <p style={styles.price}>
              {ticket.price}
              <span style={styles.priceStrike}>{ticket.original}</span>
            </p>
            <ul style={styles.ul}>
              {ticket.perks.map((perk) => (
                <li key={perk} style={styles.li}>✔ {perk}</li>
              ))}
            </ul>
            
             <a href={ticket.url}
              style={styles.buyBtn}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={(e) => (e.currentTarget.style.background = "#cc0000")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#ff1e1e")}
            >
              Buy Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Register;
