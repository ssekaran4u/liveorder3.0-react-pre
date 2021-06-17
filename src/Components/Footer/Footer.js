import React, { useState } from "react";
import "./Footer.css";
import { Container, Row, Col } from "reactstrap";
// import Grid from "@material-ui/core/Grid";
// import { Link } from "react-router-dom";
import FooterImg1 from "../../Images/Value driven.svg";
import FooterImg2 from "../../Images/Cost-effective .svg";
import FooterImg3 from "../../Images/Secure-Payments.svg";
import siteLogoWhite from "../../Images/main logo footer.svg";

// import Container from "@material-ui/core/Container";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
// import Tooltip from "@material-ui/core/Tooltip";
// import Zoom from "@material-ui/core/Zoom";
// import { FooterReducerEntity, LandingListEntity, LandingPageListEntity } from "../../../common/model";

function FooterPage(props) {
  //   const {landingPageResult ,footerSubscribe , footerSubscribeResult} = props
  //   const [email, setEMail] = useState("");

  const handleSubscribe = (e) => {
    //call api
    // footerSubscribe(email)
  };
  const handleInputChange = (event) => {
    //   setEMail(event.target.value);
  };
  return (
    <div>
      {/* <div className="footer-above-sec">
        <Container fixed className="footer-above-sec-container">
          <div className="display-flex">
            <div className="footer-above-text">Stay Updated</div>
            <div className="footer-search-sec">
            <form>
              <TextField
                name="name"
                autoComplete="off"
                margin="normal"
                variant="outlined"
                placeholder="Your E-mail Address"
                className="auth-input footer-input"
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        color="secondary"
                        className="web-footer-searchbtn"
                        onClick ={handleSubscribe}
                      >
                        Subscribe
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
            </form>
          </div>
          </div>
          <div>
            <div className="footer-social-sec">
            <a href =
            // {typeof(landingPageResult.payload) === "object"  ?
            //           String(new Map(Object.entries(landingPageResult.payload)).get('c_facebook_link'))
            //     : "" }
            { Array.isArray(landingPageResult) && landingPageResult.length > 0 ? landingPageResult[0].c_facebook_link : ""}   
                target="_blank">
            <Tooltip title="Facebook"TransitionComponent={Zoom} className="capital-tooltip">
              <div className="social-sec facebook">
                <svg viewBox="0 0 24 24">
                  <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
                </svg>
              </div>
              </Tooltip>
              </a>
              <a href =
              // {typeof(landingPageResult.payload) === "object"  ?
              //         String(new Map(Object.entries(landingPageResult.payload)).get('c_twitter_link'))
              //   : "" } 
              { Array.isArray(landingPageResult) && landingPageResult.length > 0 ? String(landingPageResult[0].c_twitter_link) : ""}
                 target="_blank">

              <Tooltip title="Twitter"TransitionComponent={Zoom} className="capital-tooltip">
              <div className="social-sec twitter">
                <svg viewBox="0 0 24 24">
                  <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                </svg>
              </div>
              </Tooltip>
              </a>
              <a href =
               { Array.isArray(landingPageResult) && landingPageResult.length > 0 ? String(landingPageResult[0].c_linkedIn_link) : ""}
              // {typeof(landingPageResult.payload) === "object"  ?
              //         String(new Map(Object.entries(landingPageResult.payload)).get('c_linkedIn_link'))
              //   : "" } 
                
                target="_blank">

              <Tooltip title="Linkedin"TransitionComponent={Zoom} className="capital-tooltip">
              <div className="social-sec linkedin">
                <svg viewBox="0 0 24 24">
                  <path d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z" />
                </svg>
              </div>
              </Tooltip>
              </a>  
            </div>
          </div>
        </Container>
      </div> */}
      <div className="footer">
        <Container fixed>
          <Row container className="top-bottom-space footer-top-row">
            <Col item xs={3}>
              <img src={siteLogoWhite} alt="site_img" className="footerImg" />
            </Col>
            {/* <Col item xs={9}> */}
            <Col item xs={2} className="space">
              <h3 className="footer-title">Know Us</h3>
              <ul className="footer-list">
                <li>
                  <a to="/">Why Live Order</a>
                </li>
                <li>
                  <a to="/">Case Study</a>
                </li>
                <li>
                  <a to="/">Schedule A Demo</a>
                </li>
              </ul>
            </Col>
            <Col item xs={2} className="space">
              <h3 className="footer-title">Our Policies </h3>
              <ul className="footer-list">
                <li>
                  <a href="/privacy-and-policy">Privacy policy</a>
                </li>
                <li>
                  <a href="/terms-and-condition">Terms and Conditions</a>
                </li>
                <li>
                  <a to="/">Cookies Policy</a>
                </li>
              </ul>
            </Col>
            <Col item xs={2} className="space">
              <h3 className="footer-title"> Our Services</h3>
              <ul className="footer-list">
                <li>
                  <a to="/">Sell on Live Order</a>
                </li>
                <li>
                  <a to="/">Help</a>
                </li>
              </ul>
            </Col>
            <Col item xs={2} className="space">
              <h3 className="footer-title">Need Help</h3>
              <ul className="footer-list">
                <li>
                  <a to="/">Support@c2info.com</a>
                </li>
                <li>
                  <a to="/">+91 908 765 6789</a>
                </li>
              </ul>
            </Col>
            {/* </Col> */}
            {/* </Col> */}
          </Row>
          <div className="footer-dashed-line"></div>

          <div className="footer-about-us">
            <div className="footer-about-us-sec">
              <div>
                <div className="footer-about-us-eachsec">
                  <div className="footer-about-us-eachsec-left">
                    <img src={FooterImg1} alt="FooterImg1" />
                  </div>
                  <div className="footer-about-us-eachsec-right">
                    <h3>Values-Driven</h3>
                    <h4>
                      Stronger and more concentrated buyers, intense competition
                      and genericization of products.
                    </h4>
                  </div>
                </div>
              </div>
              <div>
                <div className="footer-about-us-eachsec">
                  <div className="footer-about-us-eachsec-left">
                    <img src={FooterImg2} alt="FooterImg2" />
                  </div>
                  <div className="footer-about-us-eachsec-right">
                    <h3>Cost-effective</h3>
                    <h4>
                      Stronger and more concentrated buyers, intense competition
                      and genericization of products.
                    </h4>
                  </div>
                </div>
              </div>
              <div>
                <div className="footer-about-us-eachsec">
                  <div className="footer-about-us-eachsec-left">
                    <img src={FooterImg3} alt="FooterImg3" />
                  </div>
                  <div className="footer-about-us-eachsec-right">
                    <h3>Secure-Payments</h3>
                    <h4>
                      More Secure Payments with Jio Payment Gateway, and our pay
                      later options you can shop carefree.
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-copyright">
            <p className="terms-text">
              {/* 2019© Powered by C-Square Info Solutions Pvt. Ltd. Terms &
              Conditions | Privacy Policy */}
              Copyright © 2021 C-Square Info Solutions Pvt. Ltd.. All rights
              reserved.
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default FooterPage;
