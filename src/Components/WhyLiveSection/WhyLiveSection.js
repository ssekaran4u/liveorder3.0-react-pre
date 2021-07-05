import React, { Component } from "react";
import Lottie from "react-lottie";
import Aos from "aos";
import "aos/dist/aos.css";
import QMarkAnimated from "../../Images/animated/Why-live-order.json";

import "./WhyLiveSection.css";

class WhyLiveSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isIntersecting: false,
      defaultOptions: {
        loop: false,
        autoplay: false,
        animationData: QMarkAnimated,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      },
    };
    // this.handleIntersection = this.handleIntersection.bind(this);
  }

  componentDidMount() {
    Aos.init({ duration: 1000 });

    let div = document.querySelector(".whyLiveSectionTitle");

    let observer = new IntersectionObserver(
      (entries, observer) => {
        this.setState((prev) => ({
          isIntersecting: entries[0].isIntersecting,
          defaultOptions: {
            ...prev,
            autoplay: entries[0].isIntersecting,
          },
        }));

        // console.log(entries[0]);
      },
      { threshold: 1 }
    );

    observer.observe(div);

    if (window.location.hash === "#whyLive") {
      let elm = document.querySelector(window.location.hash);

      setTimeout(() => elm.scrollIntoView(), 500);
    }
  }

  render() {
    return (
      <div className="WhyLiveSection d-lg-flex MainContainer py-4" id="whyLive">
        <div className="d-flex align-items-center">
          <div className="whyLiveSectionTitle mb-4 mb-lg-0 d-flex flex-column align-items-start">
            {/* <img src={QMarkImg} alt="Why Live Order" className="mb-3" /> */}
            <span
              data-aos="fade-up"
              data-aos-delay="1250"
              data-aos-offset="-100"
            >
              <Lottie
                options={this.state.defaultOptions}
                style={{
                  width: "94px",
                  height: "auto",
                  overflow: "hidden",
                  margin: "0px 0",
                  outline: "none",
                  marginLeft: "-24px",
                  marginBottom: "-20px",
                }}
              />
            </span>
            <h3 data-aos="fade-up" data-aos-delay="250" className="h3 mb-3">
              Why Live Order ?
            </h3>
            <p
              data-aos="fade-up"
              data-aos-delay="500"
              className="body-copy mb-4"
            >
              B2B online ordering platform connecting Buyers & sellers which
              gives over all solution to “Buyers” in turn increasing the
              business of “Sellers.”
            </p>
            <button
              data-aos="flip-left"
              data-aos-delay="750"
              type="button"
              className="btn btn-primary demo-btn"
              onClick={() => this.props.schedulerModalHandler(true)}
            >
              Schedule A Demo
            </button>
          </div>
        </div>
        <div className="SellerTrackingCardSection section-1 mr-0 mr-lg-4">
          <div
            className="card mb-4 right-seller"
            data-aos="fade-up"
            data-aos-delay="1500"
          >
            <div className="card-body p-0">
              <div className="CardIconHolder SellerImg d-flex align-items-center justify-content-center mb-4">
                {/* <img src={SellerImg} alt="Find The Right Sellers" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="33.064"
                  viewBox="0 0 32 33.064"
                >
                  <g id="Seller" transform="translate(-654 -667)">
                    <g id="detective" transform="translate(661.522 675.586)">
                      <g id="Group_37207" opacity="0.3">
                        <path
                          id="Path_39072"
                          d="M28.313 44.542l-1.545 1.442 3.276 3.276 1.442-1.545a10.022 10.022 0 0 1-3.173-3.173z"
                          className="cls-2"
                          transform="translate(-21.633 -29.918)"
                        />
                        <path
                          id="Path_39073"
                          d="M17.974 51.8a2.6 2.6 0 1 0 3.67 3.67l3.187-3.53-3.331-3.332z"
                          className="cls-2"
                          transform="translate(-17.148 -31.813)"
                        />
                        <circle
                          id="Ellipse_2151"
                          cx="5.956"
                          cy="5.956"
                          r="5.956"
                          className="cls-2"
                          transform="translate(9.362 3.203)"
                        />
                        <path
                          id="Path_39074"
                          d="M37.845 17.148A9.159 9.159 0 1 0 47 26.307a9.159 9.159 0 0 0-9.155-9.159zm0 16.183a7.024 7.024 0 1 1 7.024-7.024 7.024 7.024 0 0 1-7.024 7.024z"
                          className="cls-2"
                          transform="translate(-22.527 -17.148)"
                        />
                      </g>
                    </g>
                    <g id="farmer" opacity="0.8" transform="translate(654 667)">
                      <path
                        id="Path_39078"
                        d="M15.922 17.016H15.9a5.838 5.838 0 0 0 3.18-5.216v-1.778a2.674 2.674 0 0 0 2.135-2.615.534.534 0 0 0-.534-.534H18.5l-.37-4.07A1.973 1.973 0 0 0 16.159 1a3.12 3.12 0 0 0-1.217.334 4.645 4.645 0 0 1-3.463 0A3.112 3.112 0 0 0 10.263 1a1.973 1.973 0 0 0-1.975 1.8l-.37 4.07H5.737a.534.534 0 0 0-.534.534 2.674 2.674 0 0 0 2.135 2.615V11.8a5.838 5.838 0 0 0 3.18 5.216H10.5a10.135 10.135 0 0 0-3.21.521A7.729 7.729 0 0 0 2 24.878v2.28a.534.534 0 0 0 .534.534h21.354a.534.534 0 0 0 .534-.534v-2.28c0-4.245-3.34-7.862-8.5-7.862zm-5.915 5.872a.534.534 0 0 1-.534-.534v-4.206q.291-.033.585-.047a3.206 3.206 0 0 0 2.618 2.6v2.184zm5.271-4.8a2.135 2.135 0 0 1-4.135 0zM13.745 20.7a3.206 3.206 0 0 0 2.618-2.6q.294.014.585.047v4.206a.534.534 0 0 1-.534.534h-2.669zM10.263 2.068a2.365 2.365 0 0 1 .821.258 5.7 5.7 0 0 0 4.255 0 2.365 2.365 0 0 1 .821-.258.91.91 0 0 1 .911.832l.129 1.445H9.22L9.352 2.9a.91.91 0 0 1 .911-.832zm-1.14 3.345H17.3l.133 1.459H8.991zM6.362 7.94h13.7a1.6 1.6 0 0 1-1.51 1.068H7.872a1.6 1.6 0 0 1-1.51-1.068zm2.044 3.86v-1.724h9.609V11.8a4.8 4.8 0 1 1-9.609 0zm0 6.531v4.023a1.6 1.6 0 0 0 1.6 1.6h6.406a1.6 1.6 0 0 0 1.6-1.6v-4.023a6.787 6.787 0 0 1 1.068.328v7.966H7.339v-7.966a6.575 6.575 0 0 1 1.068-.328zm-5.338 6.547a6.661 6.661 0 0 1 3.2-5.7v7.444h-3.2zm20.286 1.746h-3.2v-7.443a6.661 6.661 0 0 1 3.2 5.7z"
                        className="cls-2"
                        transform="translate(-2 -1)"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <h6 className="h6 CardSubtitle mb-4">Find The Right Sellers</h6>
              <p className="body-copy">
                We help Buyers find the right Sellers offering the best prices,
                within their geography
              </p>
            </div>
          </div>
          <div
            className="card mb-4 mb-lg-0 centralized-tracking"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="card-body p-0">
              <div className="CardIconHolder TrackingImg d-flex align-items-center justify-content-center mb-4">
                {/* <img src={TrackingImg} alt="Centralised Tracking" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32.005"
                  viewBox="0 0 32 32.005"
                >
                  <defs></defs>
                  <g id="tracking" transform="translate(-.999 -.99)">
                    <path
                      id="Path_39090"
                      // fill="#4c7bff"
                      d="M48.865 19H38.548A1.549 1.549 0 0 0 37 20.548v19.6a1.549 1.549 0 0 0 1.548 1.552h10.317a1.549 1.549 0 0 0 1.548-1.548v-19.6A1.549 1.549 0 0 0 48.865 19zm.516 21.15a.516.516 0 0 1-.516.516H38.548a.516.516 0 0 1-.516-.516v-.516h11.349zm-3.126-13.182c-1.113-1-3.5-.751-3.524-.749a.516.516 0 1 1-.113-1.025c.116-.014 2.865-.3 4.324 1a2.68 2.68 0 0 1 .891 2.088c0 1.952-2.053 2.169-3.864 2.361-2.09.221-3.358.45-3.358 1.766a1.776 1.776 0 0 0 .571 1.417 4.375 4.375 0 0 0 2.976.65.516.516 0 0 1 .128 1.024 5.184 5.184 0 0 1-3.786-.9 2.787 2.787 0 0 1-.92-2.19c0-2.339 2.374-2.59 4.281-2.792 2-.212 2.941-.412 2.941-1.335a1.669 1.669 0 0 0-.546-1.318zm2.094 8.024a1.548 1.548 0 1 1-1.549-1.548 1.548 1.548 0 0 1 1.548 1.548zM42.1 23.874l-1.032 2.063a.516.516 0 0 1-.923 0l-1.032-2.063a.516.516 0 0 1 .461-.747h2.063a.516.516 0 0 1 .461.747zm7.277-2.81H38.032v-.516a.516.516 0 0 1 .516-.516h10.317a.516.516 0 0 1 .516.516z"
                      opacity="0.303"
                      transform="translate(-17.413 -8.703)"
                    />
                    <path
                      id="Path_39091"
                      d="M35.579 24a2.579 2.579 0 1 0 2.579 2.579A2.579 2.579 0 0 0 35.579 24zm0 4.127a1.548 1.548 0 1 1 1.548-1.548 1.548 1.548 0 0 1-1.548 1.548z"
                      className="cls-2"
                      transform="translate(-15.483 -11.133)"
                    />
                    <path
                      id="Path_39092"
                      d="M20.087 8.733a6.7 6.7 0 0 0-3.035 12.68l2.444 4.344H3.837a1.806 1.806 0 1 1 0-3.611h6.19a2.837 2.837 0 1 0 0-5.675H3.063a1.032 1.032 0 1 1 0-2.063h3.1a.534.534 0 0 0 .449-.263l1.92-3.414a5.159 5.159 0 1 0-4.74 0l1.488 2.645H3.063a2.063 2.063 0 0 0 0 4.127h6.964a1.806 1.806 0 1 1 0 3.611h-6.19a2.837 2.837 0 0 0 0 5.675h16.25a.516.516 0 0 0 .516-.516.5.5 0 0 0-.075-.252l2.594-4.608a6.7 6.7 0 0 0-3.035-12.68zM4.383 9.875a4.127 4.127 0 1 1 3.551 0 .515.515 0 0 0-.227.213L6.158 12.84 4.61 10.087a.515.515 0 0 0-.227-.213zm18.145 10.68a.518.518 0 0 0-.227.213L20.087 24.7l-2.214-3.937a.518.518 0 0 0-.227-.213 5.675 5.675 0 1 1 4.883 0z"
                      className="cls-2"
                    />
                    <path
                      id="Path_39093"
                      d="M11.127 9.063a2.063 2.063 0 1 0-2.063 2.063 2.063 2.063 0 0 0 2.063-2.063zm-3.1 0A1.032 1.032 0 1 1 9.063 10.1a1.032 1.032 0 0 1-1.031-1.037z"
                      className="cls-2"
                      transform="translate(-2.905 -2.91)"
                    />
                  </g>
                </svg>
              </div>
              <h6 className="h6 CardSubtitle mb-4">Centralised Tracking</h6>
              <p className="body-copy">
                End-to-end tracking starting from order placement to delivery of
                product.
              </p>
            </div>
          </div>
        </div>
        <div className="SellerTrackingCardSection section-2">
          <div
            className="card mb-4 GradientCard bill-to-bill"
            data-aos="fade-up"
            data-aos-delay="1500"
            data-aos-offset="-100"
          >
            <div className="card-body p-0">
              <div className="CardIconHolder ReconciliatonImg d-flex align-items-center justify-content-center mb-4">
                {/* <img
                  src={ReconciliationImg}
                  alt="Bill To Bill Reconciliation"
                /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32.1"
                  height="32.1"
                  viewBox="0 0 32.1 32.1"
                >
                  <defs></defs>
                  <g id="Reconciliation" transform="translate(-.9 -.9)">
                    <text
                      id="_"
                      // fill="#674cf3"
                      fontFamily="Quicksand-Medium, Quicksand"
                      fontSize="10px"
                      fontWeight="500"
                      opacity="0.3"
                      transform="translate(20 25)"
                    >
                      <tspan x="0" y="0">
                        ₹
                      </tspan>
                    </text>
                    <path
                      id="Path_39080"
                      // fill="#674cf3"
                      d="M44.329 21.178l-9.3-4.134a.516.516 0 0 0-.42 0l-9.3 4.134a.517.517 0 0 0-.307.472v4.29a16.193 16.193 0 0 0 9.608 14.785.518.518 0 0 0 .42 0 16.193 16.193 0 0 0 9.608-14.785v-4.29a.516.516 0 0 0-.309-.472zm-9.511 12.874a5.684 5.684 0 1 1 5.682-5.684 5.684 5.684 0 0 1-5.684 5.684z"
                      opacity="0.27"
                      transform="translate(-11.636 -7.769)"
                    />
                    <g
                      id="Group_37208"
                      opacity="0.896"
                      transform="translate(1 1)"
                    >
                      <path
                        id="Path_39081"
                        d="M21.152 1H6.684a1.552 1.552 0 0 0-1.55 1.55v2.584H2.55A1.552 1.552 0 0 0 1 6.684v18.6a1.552 1.552 0 0 0 1.55 1.55h14.469a1.552 1.552 0 0 0 1.55-1.55V22.7h2.584a1.552 1.552 0 0 0 1.55-1.55V2.55A1.552 1.552 0 0 0 21.152 1zm-3.617 24.286a.517.517 0 0 1-.517.517H2.55a.517.517 0 0 1-.517-.517V6.684a.517.517 0 0 1 .517-.517h10.335v3.1a1.55 1.55 0 0 0 1.55 1.55h3.1zm-3.617-18.9l3.319 3.39h-2.8a.517.517 0 0 1-.517-.517zm7.751 14.763a.517.517 0 0 1-.517.517h-2.583V10.3a1.543 1.543 0 0 0-.442-1.083L14.591 5.6a1.56 1.56 0 0 0-1.108-.466H6.167V2.55a.517.517 0 0 1 .517-.517h14.468a.517.517 0 0 1 .517.517z"
                        className="cls-4"
                        transform="translate(-1 -1)"
                      />
                      <path
                        id="Path_39082"
                        d="M5.517 18.033h7.751a.517.517 0 0 0 0-1.033H5.517a.517.517 0 1 0 0 1.033z"
                        className="cls-4"
                        transform="translate(-2.933 -8.732)"
                      />
                      <path
                        id="Path_39083"
                        d="M17.918 25H5.517a.517.517 0 0 0 0 1.033h12.4a.517.517 0 0 0 0-1.033z"
                        className="cls-4"
                        transform="translate(-2.933 -12.599)"
                      />
                      <path
                        id="Path_39084"
                        d="M17.918 33H5.517a.517.517 0 0 0 0 1.033h12.4a.517.517 0 0 0 0-1.033z"
                        className="cls-4"
                        transform="translate(-2.933 -16.465)"
                      />
                      <path
                        id="Path_39085"
                        d="M23.717 41h-6.2a.517.517 0 1 0 0 1.033h6.2a.517.517 0 0 0 0-1.033z"
                        className="cls-4"
                        transform="translate(-8.732 -20.331)"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <h6 className="h6 CardSubtitle mb-4">
                Bill To Bill Reconciliation
              </h6>
              <p className="body-copy">
                Invoice reconciliation is important for keeping accounting
                records updated & avoid fraud
              </p>
            </div>
          </div>
          <div
            className="card manage-team"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="card-body p-0">
              <div className="CardIconHolder ManageTeamImg d-flex align-items-center justify-content-center mb-4">
                {/* <img src={ManageTeamImg} alt="Manage Your Entire Team" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="30.97"
                  viewBox="0 0 32 30.97"
                >
                  <defs></defs>
                  <g id="manage_team" transform="translate(-1 -1.997)">
                    <path
                      id="Path_39086"
                      d="M50.66 42.226a3.089 3.089 0 0 0-2.6-.559 9.7 9.7 0 0 0 .209-9.056L40 37.776v8.937a9.762 9.762 0 0 0 5.681-2.213 3.094 3.094 0 1 0 4.979-2.279z"
                      className="cls-1"
                      transform="translate(-18.865 -14.805)"
                    />
                    <path
                      id="Path_39087"
                      d="M33.276 17.377a3.1 3.1 0 1 0-4.151 0 9.832 9.832 0 0 0-6.232 4.4l8.249 5.155 8.334-5.209a9.831 9.831 0 0 0-6.2-4.346z"
                      className="cls-1"
                      transform="translate(-10.582 -4.831)"
                    />
                    <path
                      id="Path_39088"
                      d="M17.575 36.992A9.706 9.706 0 0 0 18.8 41.72a3.095 3.095 0 1 0 2.374 2.838 9.762 9.762 0 0 0 5.681 2.209V37.9l-8.292-5.182a9.723 9.723 0 0 0-.988 4.274z"
                      className="cls-1"
                      transform="translate(-6.77 -14.859)"
                    />
                    <path
                      id="Path_39089"
                      // fill="#ffbe0b"
                      d="M26.789 10.767a3.611 3.611 0 1 0-4.126 3.569v3.376l-2.133 1.422a6.708 6.708 0 0 0-6.119-5.762v-2.12a4.642 4.642 0 1 0-1.032 0v2.12a6.708 6.708 0 0 0-6.119 5.762l-2.134-1.422v-3.376a3.611 3.611 0 1 0-1.032 0v3.652a.516.516 0 0 0 .23.429l2.876 1.92a6.7 6.7 0 0 0 13.382 0l2.88-1.92a.516.516 0 0 0 .23-.429v-3.652a3.613 3.613 0 0 0 3.095-3.569zm-24.758 0a2.579 2.579 0 1 1 2.579 2.579 2.579 2.579 0 0 1-2.579-2.579zm9.893-1.1a2.053 2.053 0 0 1 3.94 0 3.591 3.591 0 0 1-3.94 0zm.938-3.538a1.032 1.032 0 1 1 1.032 1.032 1.032 1.032 0 0 1-1.032-1.032zm-2.579.516a3.611 3.611 0 1 1 6.4 2.291 3.1 3.1 0 0 0-1.3-1.388 2.063 2.063 0 1 0-2.98 0 3.1 3.1 0 0 0-1.3 1.388 3.594 3.594 0 0 1-.823-2.291zm.017 17.79a3.606 3.606 0 0 1 7.195 0 5.661 5.661 0 0 1-7.195 0zm2.05-5.931a1.547 1.547 0 1 1 1.547 1.547 1.547 1.547 0 0 1-1.55-1.551zm6.032 5.01a4.657 4.657 0 0 0-2.743-3.12 2.579 2.579 0 1 0-3.484 0 4.657 4.657 0 0 0-2.743 3.12 5.674 5.674 0 1 1 8.969 0zm4.8-10.168a2.579 2.579 0 1 1 2.579-2.579 2.579 2.579 0 0 1-2.579 2.579z"
                    />
                  </g>
                </svg>
              </div>
              <h6 className="h6 CardSubtitle mb-4">Manage Your Entire Team</h6>
              <p className="body-copy">
                Team management solution. Option to create teams & branches and
                manage user rights.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WhyLiveSection;
