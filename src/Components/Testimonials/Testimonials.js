import React, { Component } from 'react';
import './Testimonials.css'
import { TestimonialContent } from './TestimonialContent'
import WellNess from '../../Images/Wellness.png'
import Mahaveer from '../../Images/mahaveer.png'
import Tesmed from '../../Images/Tasmed.png'
import Netmeds from '../../Images/netmeds.png'
import FrankRoss from '../../Images/FrankRoss.png'
import Paras from '../../Images/Paras.png'
import Zenwick from '../../Images/zenwick.png'
import Rajsons from '../../Images/Rajsons.png'

class Testimonials extends Component {
  showTestimonial = (e, sourceLogo) => {
    e.preventDefault();
    console.log(sourceLogo, TestimonialContent);
    for (var i=0; i < TestimonialContent.length; i++) {
      if(TestimonialContent[i].CompanyName === sourceLogo) {
        document.getElementById("TestimonialText").innerHTML = TestimonialContent[i].CompanyText
      }
    }
  }
  render() {
    return (
      <div className="Testimonials text-center">
        <h2 className="h2 mb-4">Testimonials</h2>
        <h4 className="h4 grey-subtitle mb-5">Hear from our happy customers</h4>
        <div className="TestimonialBg d-flex align-items-center justify-content-center">
          <div className="TestimonialContent text-center">
            <p id="TestimonialText">As online is an emerging space, C-Square all in one <br />
          solution for online space allowed us to tweak <br />
          our business model & try different things in market.</p>
          </div>
          <a href="clientLogo" onClick={(e) => this.showTestimonial(e,"Wellness")} className="clientLogos WellNessLogo">
            <img src={WellNess} alt="Wellness Forever"/>
          </a>
          <a href="clientLogo" onClick={(e) => this.showTestimonial(e,"Mahaveer")} className="clientLogos MahaveerLogo">
            <img src={Mahaveer} alt="Mahaveer"/>
          </a>
          <a href="clientLogo" onClick={(e) => this.showTestimonial(e,"Tesmed")} className="clientLogos TesmedLogo">
            <img src={Tesmed} alt="Tesmed" height="40px" width="40px" />
          </a>
          <a href="clientLogo" onClick={(e) => this.showTestimonial(e,"Netmeds")} className="clientLogos NetmedsLogo">
            <img src={Netmeds} alt="Netmeds"/>
          </a>
          <a href="clientLogo" onClick={(e) => this.showTestimonial(e,"FrankRoss")} className="clientLogos FrankRosslogo">
            <img src={FrankRoss} alt="Frank Ross"/>
          </a>
          <a href="clientLogo" onClick={(e) => this.showTestimonial(e,"Paras")} className="clientLogos ParasLogo">
            <img src={Paras} alt="Paras Pharma"/>
          </a>
          <a href="clientLogo" onClick={(e) => this.showTestimonial(e,"Zenwick")} className="clientLogos ZenwickLogo">
            <img src={Zenwick} alt="Zenwick"/>
          </a>
          <a href="clientLogo" onClick={(e) => this.showTestimonial(e,"Rajsons")} className="clientLogos RajsonsLogo">
            <img src={Rajsons} alt="Rajsons"/>
          </a>
        </div>
      </div>
    );
  }
}

export default Testimonials;