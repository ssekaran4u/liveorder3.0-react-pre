import React, { Component } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./LetsStartSection.css";
// import letsStartBGSVG from "../../Images/lets-start-bg.svg";
import letsStartBGSVG from "../../Images/lets start bg.svg";

class LetsStartSection extends Component {
  componentDidMount() {
    Aos.init({
      duration: 1000,
    });
    // let div = document.querySelector(".demo-card-btn");
    // const options = {
    //   threshold: 1,
    //   rootMargin: "-200px  0px 0px 0px",
    // };
    // let observer = new IntersectionObserver(function (entries, observer) {
    //   entries.forEach((entry) => console.log(entry));
    //   let parentDiv = document.querySelector(".LetsStartSection");
    //   let onScrollTimeout;
    //   if (entries[0].isIntersecting) {
    //     // onScrollTimeout = setTimeout(() => {
    //     parentDiv.classList.add("on_scroll");
    //     // }, 750);
    //     // options.rootMargin = "-100px 0px 0px 0px";
    //     // } else if (!entries[0].isIntersecting) {
    //     // parentDiv.classList.remove("on_scroll");
    //     // options.rootMargin = "-100px 0px 0px 0px";
    //     // clearTimeout(onScrollTimeout);
    //   }
    // }, options);
    // // console.log(observer);
    // observer.observe(div);
  }
  render() {
    return (
      <div className="LetsStartSection">
        <div
          className="LetsStartSectionCard position-relative text-center"
          data-aos="fade-up"
          data-aos-offset="300"
          data-aos-delay="0"
          data-aos-once="true"
        >
          <img src={letsStartBGSVG} alt="Kiwi standing on oval" />
          <h3
            className="h3 text-white"
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-delay="100"
            data-aos-once="true"
          >
            Let’s begin the journey!
          </h3>
          <p
            className="body-copy mb-5 text-white"
            data-aos="fade-up"
            data-aos-offset="150"
            data-aos-delay="100"
            data-aos-once="true"
          >
            Live Order & you, the dynamic duo.
          </p>
          <button
            type="submit"
            className="btn demo-card-btn"
            data-aos="fade-up"
            data-aos-offset="200"
            data-aos-delay="400"
            data-aos-once="true"
            onClick={() => this.props.schedulerModalHandler(true)}
          >
            Schedule A Demo
          </button>
          <div
            className="purple-blob2"
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-delay="400"
            data-aos-once="true"
          ></div>
          <div
            className="green-circle"
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-delay="200"
            data-aos-once="true"
          ></div>
          <div
            className="orange-circle"
            data-aos="fade-up"
            data-aos-offset="300"
            data-aos-delay="600"
            data-aos-once="true"
          ></div>
        </div>
      </div>
    );
  }
}

export default LetsStartSection;
