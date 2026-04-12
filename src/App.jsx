import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
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
import './App.css'

// Home Component: Includes all main landing sections
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}