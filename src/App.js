import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import HeroSection from "./Components/HeroSection/HeroSection";
import WhyLiveSection from "./Components/WhyLiveSection/WhyLiveSection";
// import VideoSection from './Components/VideoSection/VideoSection'
import PartnerSection from "./Components/PartnerSection/PartnerSection";
import LetsStartSection from "./Components/LetsStartSection/LetsStartSection";
import Testimonials from "./Components/Testimonials/Testimonials";
import TermsConditions from "./Components/TermsConditionsSection/TermsConditionsSection";
import CookiePolicy from "./Components/CookiePolicy/CookiePolicy";
import PrivacyPolicy from "./Components/PrivacyPolicy/PrivacyPolicy";
import NewVideo from "./Components/VideoSection/NewVideo";
import "../node_modules/react-modal-video/css/modal-video.min.css";
import Help from "./routes/Help";
import FooterPage from "./Components/Footer/Footer";
import SiteLoader from "./Components/SiteLoader/SiteLoader";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import ScheduleADemo from "./Components/ScheduleADemo/ScheduleADemo";
import SuccessModal from "./Components/SuccessModal/SuccessModal";

import { createBrowserHistory } from "history";
let history = createBrowserHistory();

function App() {
  const [showModal, setShowModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
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
    setSuccessModal(true);
    setTimeout(() => {
      setSuccessModal(false);
    }, 3000);
  }

  useEffect(() => {
    if (history.location.pathname === "/" && history.location.hash === "") {
      setTimeout(() => {
        setShowLoader(true);
      }, 5000);
    } else {
      setShowLoader(true);
    }
  }, [history.location.pathname]);

  function scheduleDataHandler(data) {
    setSchedulerData((prev) => ({ ...prev, data }));
  }

  return (
    <>
      <ScrollToTop />

      <ScheduleADemo
        scheduleDemoHandler={scheduleDemoHandler}
        scheduleDataHandler={scheduleDataHandler}
        isOpen={showModal}
        closeModal={() => setShowModal(false)}
      />

      <SuccessModal
        isOpen={successModal}
        closeModal={() => setSuccessModal(false)}
      />

      <Switch>
        <Route path="/help">
          <Navbar schedulerModalHandler={setShowModal} />
          <Help />
          <FooterPage schedulerModalHandler={setShowModal} />
        </Route>
        <Route path="/terms">
          <Navbar schedulerModalHandler={setShowModal} />
          <TermsConditions />
          <FooterPage schedulerModalHandler={setShowModal} />
        </Route>
        <Route path="/privacy">
          <Navbar schedulerModalHandler={setShowModal} />
          <PrivacyPolicy />
          <FooterPage schedulerModalHandler={setShowModal} />
        </Route>
        <Route path="/cookie">
          <Navbar schedulerModalHandler={setShowModal} />
          <CookiePolicy />
          <FooterPage schedulerModalHandler={setShowModal} />
        </Route>
        <Route path="/">
          {history.location.pathname === "/" &&
            history.location.hash === "" && (
              <SiteLoader showLoader={showLoader} />
            )}
          {showLoader === true && (
            <>
              <Navbar schedulerModalHandler={setShowModal} />
              <HeroSection />
              <WhyLiveSection schedulerModalHandler={setShowModal} />
              <NewVideo />
              <PartnerSection />
              <Testimonials />
              <LetsStartSection schedulerModalHandler={setShowModal} />
              <FooterPage schedulerModalHandler={setShowModal} />
            </>
          )}
        </Route>
      </Switch>
    </>
  );
}

export default App;
