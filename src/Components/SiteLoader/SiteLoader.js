import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import LogoAnimation from "../../Images/animated/Live-order-logo.json";
import "./SiteLoader.css";

function SiteLoader(props) {
  const [load, setLoad] = useState(false);
  // const [load, setLoad] = useState(false);
  const [screenWidth, setScreenWidth] = useState(null);
  const [screenHeight, setScreenHeight] = useState(null);
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: LogoAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setScreenWidth(window.screen.width * 0.3);
    setScreenHeight(window.screen.height * 0.3);
  }, [window.screen.width, window.screen.height]);

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    body.style.overflow = "hidden";
    // setTimeout(() => {
    // }, 5000);
    if (props.showLoader === true) {
      setLoad(true);
      body.style.setProperty("overflow", "auto", "important");
    }

    console.log(props);
  }, [props.showLoader]);

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
        // width="192"
        // height={screenHeight}
        style={{
          width: "100%",
        }}
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
