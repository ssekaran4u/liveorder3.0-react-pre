import React, { Component } from "react";
import "./Testimonials.css";
import { TestimonialContent } from "./TestimonialContent";
// import WellNess from "../../Images/Wellness.png";
// import Mahaveer from "../../Images/mahaveer.png";
// import Tesmed from "../../Images/Tasmed.png";
// import Netmeds from "../../Images/netmeds.png";
// import FrankRoss from "../../Images/FrankRoss.png";
// import Paras from "../../Images/Paras.png";
// import Zenwick from "../../Images/zenwick.png";
// import Rajsons from "../../Images/Rajsons.png";

let companyObject = {
  icon: "",
  left: "",
  top: "",
  description: "",
  width: "41px",
  height: "41px",
};

// let arrayOfCompanies = [
//   {
//     icon: "",
//     left: "",
//     top: "",
//     description: "",
//     width: "41px",
//     height: "41px",
//   },
// ];

class Testimonials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyData: [],
      activeCompany: {
        icon: "",
        name: "",
        description: [],
      },
      indexState: 0,
      // stylesArray: [
      //   { top: "8px", left: "15%", width: "41px", height: "41px" },
      //   { bottom: "8px", left: "25px", width: "115px", height: "114px" },
      //   { top: "25%", left: "20%", width: "96px", height: "96px" },
      //   {
      //     top: "8px",
      //     left: "50%",
      //     transform: "translateX(-50%)",
      //     width: "106px",
      //     height: "106px",
      //   },
      //   { top: "8px", right: "23%", width: "76px", height: "76px" },
      //   { top: "70%", right: "21%", width: "53px", height: "53px" },
      //   { bottom: "71%", right: "1%", width: "81px", height: "81px" },
      //   { top: "44%", right: "5%", width: "81px", height: "81px" },
      // ],
      stylesArray_1280: [
        {
          width: "115px",
          height: "114px",
          transform: " translate3d(-550px, 150px, 0px)",
          animation: "transformTime1280 1.5s linear reverse",
        },
        {
          width: "41px",
          height: "41px",
          transform: "translate3d(-450px, -175px, 0px)",
        },
        {
          width: "96px",
          height: "96px",
          transform: "translate3d(-375px, -50px, 0px)",
        },
        {
          width: "106px",
          height: "106px",
          transform: "translate3D(0px, -140px, 0px)",
        },
        {
          width: "76px",
          height: "76px",
          transform: "translate3d(275px, -170px, 0px)",
        },
        {
          width: "53px",
          height: "53px",
          transform: "translate3d(370px, 135px, 0px)",
        },
        {
          width: "81px",
          height: "81px",
          transform: "translate3d(575px, -135px, 0px)",
        },
        {
          width: "81px",
          height: "81px",
          transform: "translate3d(530px, 70px, 0px)",
        },
      ],
      stylesArray_1440: [
        {
          width: "115px",
          height: "114px",
          transform: " translate3d(-650px, 150px, 0px)",
          animation: "transformTime1440 1.5s linear reverse",
        },
        {
          width: "41px",
          height: "41px",
          transform: "translate3d(-550px, -175px, 0px)",
        },
        {
          width: "96px",
          height: "96px",
          transform: "translate3d(-375px, -50px, 0px)",
        },
        {
          width: "106px",
          height: "106px",
          transform: "translate3D(0px, -140px, 0px)",
        },
        {
          width: "76px",
          height: "76px",
          transform: "translate3d(275px, -170px, 0px)",
        },
        {
          width: "53px",
          height: "53px",
          transform: "translate3d(400px, 135px, 0px)",
        },
        {
          width: "81px",
          height: "81px",
          transform: "translate3d(625px, -135px, 0px)",
        },
        {
          width: "81px",
          height: "81px",
          transform: "translate3d(600px, 70px, 0px)",
        },
      ],
      stylesArray_1920: [
        {
          width: "115px",
          height: "114px",
          transform: " translate3d(-875px, 150px, 0px)",
          animation: "transformTime1920 1.5s linear reverse",
        },
        {
          width: "41px",
          height: "41px",
          transform: "translate3d(-700px, -175px, 0px)",
        },
        {
          width: "96px",
          height: "96px",
          transform: "translate3d(-575px, -50px, 0px)",
        },
        {
          width: "106px",
          height: "106px",
          transform: "translate3D(0px, -140px, 0px)",
        },
        {
          width: "76px",
          height: "76px",
          transform: "translate3d(275px, -170px, 0px)",
        },
        {
          width: "53px",
          height: "53px",
          transform: "translate3d(500px, 135px, 0px)",
        },
        {
          width: "81px",
          height: "81px",
          transform: "translate3d(875px, -135px, 0px)",
        },
        {
          width: "81px",
          height: "81px",
          transform: "translate3d(800px, 70px, 0px)",
        },
      ],
      styleArray: "",
      activeStylesArray: [],
    };
  }

  componentDidMount() {
    let arrayOfCompanies = [];
    TestimonialContent.map((test, testIndex) => {
      return arrayOfCompanies.push({
        icon: test.Companyimage,
        name: test.CompanyName,
        description: test.CompanyText,
        width: "41px",
        height: "41px",
      });
    });

    window.addEventListener("resize", this.resizeFunction);

    this.setState(
      {
        companyData: arrayOfCompanies,
        activeCompany: {
          icon: TestimonialContent[3].Companyimage,
          name: TestimonialContent[3].CompanyName,
          description: TestimonialContent[3].CompanyText.split("<br />"),
        },
        indexState: arrayOfCompanies.length / 2 - 1,
      },
      () => {
        this.resizeFunction();
        setInterval(() => {
          this.changeTestimonialHandler(-1);
        }, 10000);
      }
    );
  }

  resizeFunction = () => {
    this.setState({ activeStylesArray: [] });
    if (window.innerWidth >= 1280 && window.innerWidth < 1440) {
      this.setState((prev) => ({
        styleArray: "stylesArray_1280",
        activeStylesArray: prev.stylesArray_1280,
      }));
    } else if (window.innerWidth >= 1440 && window.innerWidth < 1920) {
      this.setState((prev) => ({
        styleArray: "stylesArray_1440",
        activeStylesArray: prev.stylesArray_1440,
      }));
    } else if (window.innerWidth >= 1920) {
      this.setState((prev) => ({
        styleArray: "stylesArray_1920",
        activeStylesArray: prev.stylesArray_1920,
      }));
    }
  };

  changeTestimonialHandler = (index) => {
    let newIndexState = 0;
    const {
      stylesArray_1280,
      stylesArray_1440,
      stylesArray_1920,
      companyData,
      indexState,
    } = this.state;

    if (index === -1) {
      let companyRemoved = stylesArray_1280.shift();
      stylesArray_1280.push(companyRemoved);

      let companyRemoved2 = stylesArray_1440.shift();
      stylesArray_1440.push(companyRemoved2);
      let companyRemoved3 = stylesArray_1920.shift();
      stylesArray_1920.push(companyRemoved3);

      if (indexState + index >= 0) {
        newIndexState = indexState + index;
      } else {
        newIndexState = companyData.length - 1;
      }
    } else if (index === 1) {
      let companyRemoved = stylesArray_1280.pop();
      stylesArray_1280.unshift(companyRemoved);

      let companyRemoved2 = stylesArray_1440.pop();
      stylesArray_1440.unshift(companyRemoved2);
      let companyRemoved3 = stylesArray_1920.pop();
      stylesArray_1920.unshift(companyRemoved3);

      if (indexState + index <= companyData.length - 1) {
        newIndexState = indexState + index;
      } else {
        newIndexState = 0;
      }
    }

    this.setState((prev) => ({
      stylesArray_1280,
      stylesArray_1440,
      stylesArray_1920,
      activeCompany: {
        ...companyData[newIndexState],
        description: companyData[newIndexState].description.split("<br />"),
      },
      indexState: newIndexState,
    }));
  };

  showTestimonial = (e, sourceLogo) => {
    e.preventDefault();
    for (var i = 0; i < TestimonialContent.length; i++) {
      if (TestimonialContent[i].CompanyName === sourceLogo) {
        document.getElementById("TestimonialText").innerHTML =
          TestimonialContent[i].CompanyText;
      }
    }
  };

  render() {
    return (
      <div className="Testimonials text-center">
        <h2 className="h2 mb-3">Testimonials</h2>
        <h4 className="h4 grey-subtitle mb-5">Hear from our happy customers</h4>
        <div className="TestimonialBg d-flex align-items-center justify-content-center">
          {/* <span id="before" onClick={() => this.changeTestimonialHandler(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chevron-left"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2e3e6a"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </span>
          <span id="after" onClick={() => this.changeTestimonialHandler(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-chevron-right"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#2e3e6a"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </span> */}
          <div className="TestimonialContent text-center">
            <p id="TestimonialText">
              <span className="font-weight-bold">
                {this.state.activeCompany.name}
              </span>
              , {this.state.activeCompany.description[0]} <br />{" "}
              {this.state.activeCompany.description[1]} <br />{" "}
              {this.state.activeCompany.description[2]}
            </p>
          </div>
          {this.state.styleArray !== "" &&
            this.state.companyData.map((compData, compIndex) => {
              return (
                <p
                  key={compIndex}
                  href="#"
                  className={`clientLogos ${compData.name}Logo`}
                  style={{
                    ...this.state[this.state.styleArray][compIndex],
                    height: "auto",
                    width: "auto",
                  }}
                >
                  <img
                    src={compData.icon}
                    height={this.state[this.state.styleArray][compIndex].height}
                    // height={this.state.activeStylesArray[compIndex].height}
                    width={this.state[this.state.styleArray][compIndex].width}
                    // width={this.state.activeStylesArray[compIndex].width}
                    alt="Wellness Forever"
                  />
                </p>
              );
            })}

          {/* <a
            href="clientLogo"
            onClick={(e) => this.showTestimonial(e, "Wellness")}
            className="clientLogos WellNessLogo"
          >
            <img src={WellNess} alt="Wellness Forever" />
          </a>
          <a
            href="clientLogo"
            onClick={(e) => this.showTestimonial(e, "Mahaveer")}
            className="clientLogos MahaveerLogo"
          >
            <img src={Mahaveer} alt="Mahaveer" />
          </a>
          <a
            href="clientLogo"
            onClick={(e) => this.showTestimonial(e, "Tesmed")}
            className="clientLogos TesmedLogo"
          >
            <img src={Tesmed} alt="Tesmed" height="40px" width="40px" />
          </a>
          <a
            href="clientLogo"
            onClick={(e) => this.showTestimonial(e, "Netmeds")}
            className="clientLogos NetmedsLogo"
          >
            <img src={Netmeds} alt="Netmeds" />
          </a>
          <a
            href="clientLogo"
            onClick={(e) => this.showTestimonial(e, "FrankRoss")}
            className="clientLogos FrankRosslogo"
          >
            <img src={FrankRoss} alt="Frank Ross" />
          </a>
          <a
            href="clientLogo"
            onClick={(e) => this.showTestimonial(e, "Paras")}
            className="clientLogos ParasLogo"
          >
            <img src={Paras} alt="Paras Pharma" />
          </a>
          <a
            href="clientLogo"
            onClick={(e) => this.showTestimonial(e, "Zenwick")}
            className="clientLogos ZenwickLogo"
          >
            <img src={Zenwick} alt="Zenwick" />
          </a>
          <a
            href="clientLogo"
            onClick={(e) => this.showTestimonial(e, "Rajsons")}
            className="clientLogos RajsonsLogo"
          >
            <img src={Rajsons} alt="Rajsons" />
          </a> */}
        </div>
      </div>
    );
  }
}

export default Testimonials;
