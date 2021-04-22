import React, { Component } from 'react';
import QMarkImg from '../../Images/QMarkImg.png'
import SellerImg from '../../Images/SellerImg.png'
import TrackingImg from '../../Images/TrackingImg.png'
import ReconciliationImg from '../../Images/ReconciliationImg.png'
import ManageTeamImg from '../../Images/ManageTeamImg.png'
import './WhyLiveSection.css'


class WhyLiveSection extends Component {
  render() {
    return (
      <div className="WhyLiveSection d-lg-flex MainContainer py-4">
        <div className="d-flex align-items-center">
          <div className="whyLiveSectionTitle mr-0 mr-lg-4 mb-4 mb-lg-0">
            <img src={QMarkImg} alt="Why Live Order"className="mb-3" />
            <h3 className="h3 mb-3">Why Live Order ?</h3>
            <p className="body-copy mb-4">
              B2B online ordering platform connecting Buyers & sellers which gives over all solution to “Buyers” in turn increasing the business of “Sellers.”
            </p>
            <button type="button" className="btn btn-primary demo-btn">Schedule A Demo</button>
          </div>
        </div>
        <div className="SellerTrackingCardSection mr-0 mr-lg-4">
          <div className="card mb-4">
            <div className="card-body p-0">
              <div className="CardIconHolder SellerImg d-flex align-items-center justify-content-center mb-4">
                <img src={SellerImg} alt="Find The Right Sellers" />
              </div>
              <h6 className="h6 CardSubtitle mb-4">Find The Right Sellers</h6>
              <p className="body-copy">We help Buyers find the right Sellers offering the best prices, within their geography</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body p-0">
              <div className="CardIconHolder TrackingImg d-flex align-items-center justify-content-center mb-4">
                <img src={TrackingImg} alt="Centralised Tracking" />
              </div>
              <h6 className="h6 CardSubtitle mb-4">Centralised Tracking</h6>
              <p className="body-copy">We provide end-to-end tracking  starting from order placement to delivery of product</p>
            </div>
          </div>
        </div>
        <div className="SellerTrackingCardSection">
          <div className="card mb-4 GradientCard">
            <div className="card-body p-0">
              <div className="CardIconHolder ReconciliatonImg d-flex align-items-center justify-content-center mb-4">
                <img src={ReconciliationImg} alt="Bill To Bill Reconciliation" />
              </div>
              <h6 className="h6 CardSubtitle mb-4 text-white">Bill To Bill Reconciliation</h6>
              <p className="body-copy text-white">Invoice reconciliation is important for keeping accounting records updated & avoid fraud</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body p-0">
              <div className="CardIconHolder ManageTeamImg d-flex align-items-center justify-content-center mb-4">
                <img src={ManageTeamImg} alt="Manage Your Entire Team" />
              </div>
              <h6 className="h6 CardSubtitle mb-4">Manage Your Entire Team</h6>
              <p className="body-copy">Team management solution. Option to create teams & branches and manage user rights.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WhyLiveSection;