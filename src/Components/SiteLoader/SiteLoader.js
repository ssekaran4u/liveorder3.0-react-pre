import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import LogoAnimation from "../../Images/animated/Live-order-logo.json";
import "./SiteLoader.css";

function SiteLoader() {
  const [load, setLoad] = useState(false);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: LogoAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    body.style.overflow = "hidden";
    setTimeout(() => {
      setLoad(true);
    }, 5000);

    setTimeout(() => {
      body.style.setProperty("overflow", "auto", "important");
    }, 5750);
  }, []);

  // function finishLoading() {
  //   const body = document.getElementsByTagName("body")[0];

  //   setLoad(true);
  //   setTimeout(() => {
  //     body.style.setProperty("overflow", "auto", "important");
  //   }, 1000);
  // }

  return (
    <div className={`loaded ${load === true && "finish"}`}>
      <Lottie
        options={defaultOptions}
        width={window.screen.width * 0.3}
        height={window.screen.height * 0.3}
      />
      {/* <div id="loader-wrapper">
        <div id="loader"></div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div> */}
    </div>
  );
}

export default SiteLoader;
