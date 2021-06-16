import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import WhyLiveSection from "./Components/WhyLiveSection/WhyLiveSection";
// import VideoSection from './Components/VideoSection/VideoSection'
import PartnerSection from "./Components/PartnerSection/PartnerSection";
import LetsStartSection from "./Components/LetsStartSection/LetsStartSection";
import Testimonials from "./Components/Testimonials/Testimonials";
import NewVideo from "./Components/VideoSection/NewVideo";
import "../node_modules/react-modal-video/css/modal-video.min.css";
import Help from "./routes/Help";
import FooterPage from "./Components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      {window.location.pathname === "/" && (
        <>
          <HeroSection />
          <WhyLiveSection />
          <NewVideo />
          <PartnerSection />
          <Testimonials />
          <LetsStartSection />
        </>
      )}
      {window.location.pathname === "/help" && (
        <>
          <Help />
        </>
      )}
      <FooterPage />
    </>
  );
}

export default App;
