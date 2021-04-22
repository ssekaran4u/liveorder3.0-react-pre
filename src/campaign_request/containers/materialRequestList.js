import React, { Component } from "react";
import "../../../public/assets/font-awesome/css/font-awesome.css";
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";
import MaterialRequestHeader from "../components/materailRequestHeader";
import MaterailListTable from "../components/materialListTable";
import Footer from "../../landing-page/components/Footer";
import { connect } from "react-redux";

class materialRequestList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: this.props.isFull
        };
    }

    static getDerivedStateFromProps(nextState, prevState) {
        if (prevState.isFull !== nextState.isFull)
            return { isFull: nextState.isFull };
        return null;
    }

    render() {
        return (
            <div className={localStorage.getItem("type") == '2' || localStorage.getItem("type") == '3' ? "padTop" : "content-spacing body-scroll"}>
                <div className="min-height-100">
                    <div className="requestTablePad">

                        <div className="dcr-list-sec">
                            <div
                                className={
                                    this.state.isFull ? "fullscreenView" : ""
                                }
                            >
                                <MaterialRequestHeader />
                                <MaterailListTable showApproveTabinAdmin= {this.props.showApproveTabinAdmin} />
                            </div>
                        </div>
                    </div>
                      <Footer />
                </div>
              
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isFull: state.DCRList.isFull
});

export default connect(
    mapStateToProps,
    null
)(materialRequestList);

///above footer and div if required need to add
 //        <Link 
                  //  to = {{
                  //   pathname:"/campaignRequestEntry/" + " ",
                  //    EditViewData:{
                  //   showHideBtn: true
                  // }
                  //  }}> 

                  //   <div className="add-new-dcr">
                  //       <img
                  //           src="../public/assets/images/add-icon.svg"
                  //           alt="add_icon"
                  //       />
                  //   </div>{" "}
                  //   </Link>