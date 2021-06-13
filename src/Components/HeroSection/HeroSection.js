import React, { Component } from "react";
import "./HeroSection.css";
import SearchIconSVG from "../../Images/Search icon.svg";

class HeroSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(searchTerm) {
    this.setState({
      searchTerm,
    });
  }
  render() {
    return (
      <div className="HeroSection text-center">
        <div className="text-center">
          <h1 className="h1 HeroTitle mb-4">
            Always say <span>“YES”</span> to your Customers
          </h1>
          <h5 className="h5 HeroSubTitle">
            “Live Order” Pharma Eco-System Makes{" "}
            <br className="d-none d-md-block" />
            your Business Future-Ready
          </h5>
          <div className="search-container d-flex align-items-center">
            <form className="w-100">
              <div className="d-flex justify-content-between">
                <div className="d-flex justify-content-center align-items-center w-100">
                  {/* <i className="fa fa-search mr-2"></i> */}
                  <img
                    src={SearchIconSVG}
                    alt="search icon"
                    height="15.4px"
                    width="15.2px"
                  />
                  <input
                    type="text"
                    placeholder="Search for products, Molecules , Sellers"
                    name="search"
                    onChange={(e) => this.handleSearchChange(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary search-btn text-white"
                >
                  Search
                </button>
              </div>
            </form>
            {this.state.searchTerm !== "" && (
              <div className="search-results">
                <li>Search 1</li>
                <li>Search 2</li>
                <li>Search 3</li>
                <li>Search 4</li>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default HeroSection;
