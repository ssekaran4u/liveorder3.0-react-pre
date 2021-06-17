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
    setTimeout(() => [setLoad(true)], 5000);
  }, []);
  return (
    <div className={`loaded ${load === true && "finish"}`}>
      <Lottie options={defaultOptions} />
      {/* <div id="loader-wrapper">
        <div id="loader"></div>
        <div className="loader-section section-left"></div>
        <div className="loader-section section-right"></div>
      </div> */}
      <div className="mouse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-mouse"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#674cf3"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          onClick={() => setLoad(true)}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <rect x="6" y="3" width="12" height="18" rx="4" />
          <line x1="12" y1="7" x2="12" y2="11" />
        </svg>
      </div>
    </div>
  );
}

export default SiteLoader;
