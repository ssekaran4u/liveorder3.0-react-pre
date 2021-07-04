import React, { Component } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./PartnerSection.css";
import GSKImg from "../../Images/GSKImg.png";
import AbbottImg from "../../Images/AbottImg.png";
import AlkemImg from "../../Images/AlkemImg.png";
import PractoImg from "../../Images/practo.png";
import BlueMedix from "../../Images/BlueMatrix.png";
import DrBLal from "../../Images/DrBLal.png";
import Medlife from "../../Images/medlife.png";
import Tasmed from "../../Images/tesmed.png";

class PartnerSection extends Component {
  componentDidMount() {
    Aos.init({
      duration: 1000,
    });
  }
  render() {
    return (
      <div className="PartnerSection text-center py-5 mt-4">
        <h2 className="h2 mb-4" data-aos="fade-up">
          Join the Online Revolution
        </h2>
        <div className="DataCountsContainer mb-5 d-flex justify-content-center flex-column flex-md-row">
          <div
            className="mobile-break-section d-flex justify-content-center mb-4 mb-md-0"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="DataCount">
              <h4 className="h4 mb-2">10K+</h4>
              <h6 className="h6-small">Trusted Customers</h6>
            </div>
            <div className="DataCount">
              <h4 className="h4 mb-2">4Lakh+</h4>
              <h6 className="h6-small">Products</h6>
            </div>
          </div>
          <div
            className="mobile-break-section d-flex justify-content-center mr-0"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            <div className="DataCount">
              <h4 className="h4 mb-2">1k+</h4>
              <h6 className="h6-small">Sellers</h6>
            </div>
            <div className="DataCount">
              <h4 className="h4 mb-2">4Lakh+</h4>
              <h6 className="h6-small">Buyers</h6>
            </div>
          </div>
        </div>
        <div className="PartnerLogoRow d-lg-flex justify-content-center">
          <div
            className="PartnerLogoContainer mr-0 mr-lg-4"
            data-aos="fade-right"
            data-aos-delay="1000"
          >
            <div className="PartnerLogoBox GSKImg mb-4 mr-4 mr-lg-0">
              <img src={GSKImg} alt="GSK" />
            </div>
            <div className="PartnerLogoBox PractoImg mb-4">
              <img src={PractoImg} alt="Practo" />
            </div>
          </div>
          <div
            className="PartnerLogoContainer mr-0 mr-lg-4 mt-0 mt-lg-5"
            data-aos="fade-right"
            data-aos-delay="750"
          >
            <div className="PartnerLogoBox AbbottImg mb-4 mr-4 mr-lg-0">
              <img src={AbbottImg} alt="Abbott" />
            </div>
            <div className="PartnerLogoBox BlueMedixImg mb-4">
              <img src={BlueMedix} alt="BlueMedix" />
            </div>
          </div>
          <div
            className="PartnerLogoContainer mr-0 mr-lg-4"
            data-aos="fade-left"
            data-aos-delay="750"
          >
            <div className="PartnerLogoBox DrBLalImg mb-4 mr-4 mr-lg-0">
              <img src={DrBLal} alt="DrBLal" />
            </div>
            <div className="PartnerLogoBox TasMedImg mb-4">
              <img src={Tasmed} alt="TasMed" />
            </div>
          </div>
          <div
            className="PartnerLogoContainer mr-0 mr-lg-4 mt-0 mt-lg-5"
            data-aos="fade-left"
            data-aos-delay="1000"
          >
            <div className="PartnerLogoBox AlkemImg mb-4 mr-4 mr-lg-0">
              <img src={AlkemImg} alt="Alkem" />
            </div>
            <div className="PartnerLogoBox MedlifeImg mb-4">
              <img src={Medlife} alt="Medlife" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PartnerSection;
