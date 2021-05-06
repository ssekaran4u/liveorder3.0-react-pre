import React from 'react';
import Navbar from './Components/Navbar/Navbar'
import HeroSection from './Components/HeroSection/HeroSection'
import WhyLiveSection from './Components/WhyLiveSection/WhyLiveSection'
import VideoSection from './Components/VideoSection/VideoSection'
import PartnerSection from './Components/PartnerSection/PartnerSection'
import LetsStartSection from './Components/LetsStartSection/LetsStartSection'
import Testimonials from './Components/Testimonials/Testimonials'

function App() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <WhyLiveSection />
      <VideoSection />
      <PartnerSection />
      <Testimonials />
      <LetsStartSection />
    </div>
  );
}

export default App;