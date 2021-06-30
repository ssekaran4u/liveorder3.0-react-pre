import React, { Component } from "react";
import "./LetsStartSection.css";
// import letsStartBGSVG from "../../Images/lets-start-bg.svg";
import letsStartBGSVG from "../../Images/lets start bg.svg";

class LetsStartSection extends Component {
  componentDidMount() {
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
        <div className="LetsStartSectionCard position-relative text-center">
          <img src={letsStartBGSVG} alt="Kiwi standing on oval" />
          <h3 className="h3 text-white">Let’s begin the journey!</h3>
          <p className="body-copy mb-5 text-white">
            Live Order & you, the dynamic duo.
          </p>
          <button
            type="submit"
            className="btn demo-card-btn"
            onClick={() => this.props.schedulerModalHandler(true)}
          >
            Schedule A Demo
          </button>
          <div className="purple-blob2"></div>
          <div className="green-circle"></div>
          <div className="orange-circle"></div>
        </div>
      </div>
    );
  }
}

export default LetsStartSection;
