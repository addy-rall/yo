import React, { useEffect, useState } from "react";
import "./Register.css";

const Register = () => {
  const targetDate = new Date("May 4, 2026 00:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    let time = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return time;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="register-container">
      {/* Header */}
      <h1 className="title">Join Us at TEDxBBAU</h1>
      <p className="subtitle">
        Be part of an unforgettable experience filled with inspiration and ideas.
      </p>

      {/* Countdown */}
      <div className="countdown-box">
        <h3>⚡Buy the Tickets Now</h3>
        <div className="timer">
          <div><span>{timeLeft.days}</span>Days</div>
          <div><span>{timeLeft.hours}</span>Hours</div>
          <div><span>{timeLeft.minutes}</span>Minutes</div>
          <div><span>{timeLeft.seconds}</span>Seconds</div>
        </div>
      </div>

      {/* Tickets */}
      <h2 className="section-title">Ticket Information</h2>

      <div className="tickets">
        {/* General */}
        <div className="card">
          <h3>General Pass</h3>
          <p className="price">₹149 <span>₹199</span></p>

          <ul>
            <li>✔ Full Day Access</li>
            <li>✔ Access to All Talks</li>
            <li>✔ TEDx Official Certificate </li>
            <li>✔ High-quality GSM Certificate </li>
          </ul>

          <a href="https://in.bookmyshow.com/events/tedxbbau/ET00494884" className="buy-btn">
            Buy Now
          </a>
        </div>
        
        <div className="card">
          <h3>Double Pass (2 Tickets)</h3>
          <p className="price">₹299 <span>₹349</span></p>

          <ul>
            <li>✔ Full Day Access</li>
            <li>✔ Access to All Talks</li>
            <li>✔ Goodies</li>
            <li>✔ Certificate Included</li>
          </ul>

          <a href="https://in.bookmyshow.com/events/tedxbbau/ET00494884/ticket/BUAL/10001" className="buy-btn">
            Buy Now
          </a>
        </div>

        {/* Premium Pass */}
        <div className="card">
          <h3>Premium Pass</h3>
          <p className="price">₹299 <span>₹349</span></p>

          <ul>
            <li>✔ Full Day Access</li>
            <li>✔ Access to All Talks</li>
            <li>✔ Goodies</li>
            <li>✔ Certificate Included</li>
          </ul>

          <a href="https://in.bookmyshow.com/events/tedxbbau/ET00494884/ticket/BUAL/10001" className="buy-btn">
            Buy Now
          </a>
        </div>

        {/* VIP */}
        <div className="card">
          <h3>VIP Pass</h3>
          <p className="price">₹549 <span>₹599</span></p>

          <ul>
            <li>✔ Full Day Access</li>
            <li>✔ Access to All Talks</li>
            <li>✔ Lunch</li>
            <li>✔ Goodies + Certificate Included</li>
            <li>✔ Exclusive Meet and Greet</li>
          </ul>

          <a href="https://in.bookmyshow.com/events/tedxbbau/ET00494884/ticket/BUAL/10001" className="buy-btn">
            Buy Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;