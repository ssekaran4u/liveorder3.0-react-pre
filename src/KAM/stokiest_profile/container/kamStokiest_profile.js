import React, { Component } from "react";
import MainHeading from "../components/main_heading";
import ProfilePage from "../components/profile_page";
import StokiestProfileGraph from "../components/stokiest_profile_graph";
import TopRetailers from "../components/top_retailers";
import Footer from '../../../landing-page/components/Footer';
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import "../../../../public/assets/css/kamStyle.css";
import { postToServer } from '../../../lib/comm-utils';
import { connect } from 'react-redux';
import { getRetailersStatus } from "../../../actions/KAMactions/kamDashboardActions";

class KamStockiestProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myprofile: []
        }
    }

    componentDidMount() {
        var data = {
            "Index": "StockistProfile",
            "Data": { "stockist": "APPTB002" },
        }
        postToServer("KMDashBoardPage", data).then((Result) => {
            if (Result.data.Status == 'Success') {
                // console.log( Result.data.data[0] ,"kumar")
                this.setState({ myprofile: Result.data.data[0] })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At KAM Stockist Profile API " })
        })
        if (this.props.retailerStatus == undefined) {
            var status = {
                "Index": "Retailers"
            }
            this.props.displayRetailerStatus(status)
        }

    }
    render() {
        return (
            <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                            <div className="kam-stockiest-profile">
                                {this.state.myprofile !== undefined && this.state.myprofile != "" ? <MainHeading myprofile={this.state.myprofile} /> : null}
                                {this.state.myprofile !== undefined && this.state.myprofile != "" ? <ProfilePage myprofile={this.state.myprofile} /> : null}
                                <StokiestProfileGraph />
                                <TopRetailers />
                                <Footer />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    retailerStatus: state.KAMDashboard.retailer_status,
})

const mapDispatchToProps = dispatch => ({
    displayRetailerStatus: data => dispatch(getRetailersStatus(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(KamStockiestProfile);