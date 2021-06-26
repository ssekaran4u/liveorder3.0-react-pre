import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import WhyLiveSection from "./Components/WhyLiveSection/WhyLiveSection";
// import VideoSection from './Components/VideoSection/VideoSection'
import PartnerSection from "./Components/PartnerSection/PartnerSection";
import LetsStartSection from "./Components/LetsStartSection/LetsStartSection";
import Testimonials from "./Components/Testimonials/Testimonials";
import TermsConditions from "./Components/TermsConditionsSection/TermsConditionsSection";
import NewVideo from "./Components/VideoSection/NewVideo";
import "../node_modules/react-modal-video/css/modal-video.min.css";
import Help from "./routes/Help";
import FooterPage from "./Components/Footer/Footer";
import SiteLoader from "./Components/SiteLoader/SiteLoader";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import ScheduleADemo from "./Components/ScheduleADemo/ScheduleADemo";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [_, setSchedulerData] = useState({
    firmName: "",
    ownerName: "",
    phone: "",
    pinCode: "",
    description: "",
    isSeller: false,
  });

  function scheduleDemoHandler() {
    setShowModal((prev) => !prev);
    setSchedulerData({
      firmName: "",
      ownerName: "",
      phone: "",
      pinCode: "",
      description: "",
      isSeller: false,
    });
  }

  // useEffect(() => {
  //   console.log(window.location);
  // }, [window.location]);

  function scheduleDataHandler(data) {
    setSchedulerData((prev) => ({ ...prev, data }));
  }

  return (
    <Router>
      <ScrollToTop />
      <ScheduleADemo
        scheduleDemoHandler={scheduleDemoHandler}
        scheduleDataHandler={scheduleDataHandler}
        isOpen={showModal}
      />
      <Navbar schedulerModalHandler={setShowModal} />
      <Switch>
        <Route path="/help">
          {/* <Navbar schedulerModalHandler={setShowModal} /> */}
          <Help />
          {/* <FooterPage /> */}
        </Route>
        <Route path="/terms">
          {/* <Navbar/> */}
          <TermsConditions />
          {/* <FooterPage /> */}
        </Route>
        <Route path="/">
          {console.log(window.location.hash)}
          {window.location.hash === "" && <SiteLoader />}
          {/* <Navbar /> */}
          <HeroSection />
          <WhyLiveSection schedulerModalHandler={setShowModal} />
          <NewVideo />
          <PartnerSection />
          <Testimonials />
          <LetsStartSection schedulerModalHandler={setShowModal} />
          {/* <FooterPage /> */}
        </Route>
      </Switch>
      <FooterPage schedulerModalHandler={setShowModal} />
    </Router>
  );
}

export default App;
