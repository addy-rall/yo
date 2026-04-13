import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CursorFX from './components/CursorFX'
import Hero from './components/Hero'
import WhatIsTedx from './components/WhatIsTedx'
import FeaturedSpeakers from './components/FeaturedSpeakers'
import PRHighlights from './components/PRHighlights'
import Footer from './components/Footer'
import Whyattend from './components/Whyattend'
import Contact from './components/Contact'
import ChiefSection from './components/ChiefSection'
import Theme from './components/Theme'
import Sponsors from './components/sponsors'
import Register from './components/Register'
import Privacy from './components/Privacy'
import Terms from './components/Terms'
import Refund from './components/Refund'
import Cookie from './components/Cookies'
import SpeakersPage from './components/Speaker'
import Team from './components/Team'
import './App.css'
import TEDx2025 from './components/Tedxbbau2025'

function Home() {
  return (
    <>
      <Hero />
      <WhatIsTedx />
      <Theme />
      <FeaturedSpeakers />
      <PRHighlights />
      <Whyattend />
      
      <ChiefSection />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <CursorFX />
        <Routes>
          <Route path="/" element={<Home />} />
         <Route path="/tedxbbau2025" element={<TEDx2025 />} />
          <Route path="/teamy" element={<Team/>} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/speakers" element={<SpeakersPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/cookie" element={<Cookie />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
