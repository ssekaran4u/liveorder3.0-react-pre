import React, { Component } from 'react';
import './HeroSection.css'

class HeroSection extends Component {
  render() {
    return (
      <div className="HeroSection text-center">
        <div className="text-center">
          <h1 className="h1 HeroTitle mb-4">Always say <span>“YES”</span> to your Customers</h1>
          <h5 className="h5 HeroSubTitle">“Live Order” Pharma Eco-System Makes <br className="d-none d-md-block"/>your Business Future-Ready</h5>
          <div className="search-container d-flex align-items-center">
            <form className="w-100">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <i className="fa fa-search mr-2"></i>
                  <input type="text" placeholder="Search for products, Molecules , Sellers" name="search" />
                </div>
                <button type="submit" className="btn btn-primary search-btn text-white">Search</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default HeroSection;