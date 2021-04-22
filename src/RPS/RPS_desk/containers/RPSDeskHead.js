import React, { Component } from 'react';
import {Tabs,Tab,Breadcrumb} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RPSDeskRequestHeader from '../components/RPSDeskRequestHeader';
import RPSDeskListTable from "../components/RPSDeskListTable";
import ExpenseRequestHeader from "../components/ExpenseRequestHeader";
import ExpenseListTable from "../components/ExpenseListTable";
import { connect } from "react-redux";
import Footer from "../../../landing-page/components/Footer";


class RPSDeskHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: this.props.isFull
        }
    } 
     static getDerivedStateFromProps(nextState, prevState) {
        if (prevState.isFull !== nextState.isFull)
            return { isFull: nextState.isFull };
        return null;
    }
    render() {
       
        return (
            <React.Fragment>
          <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">RPS Desk Head</h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item href="#">
                                    <Link to='/mdashboard'>Dashboard</Link>
                                </Breadcrumb.Item>
                                  {/* <Breadcrumb.Item>
                                    Visit Related
                                </Breadcrumb.Item> */}
                                <Breadcrumb.Item active>
                                    RPS Desk Head
                                </Breadcrumb.Item>
                            </Breadcrumb>
                        </div>

                    </div>
                   <div>

                </div>  
                 <div className="">
                <div className={ this.state.isFull ? "fullscreenView" : "" }>
             
                 <Tabs
                        id="controlled-tab-example"
                        className="dcrtab"
                       >
                        <Tab eventKey="BL" title="RPS Request List">
                           <>      
                            <RPSDeskRequestHeader />
                           
                            </>
                        </Tab>
                        <Tab eventKey="HL" title="RPS Expense Requested List" >
                          
                           <ExpenseRequestHeader />
                          
                        </Tab>
                        
                    </Tabs> 
                    </div>  
                    <Footer />
                    </div>                 
            </div>
           
            </div>
           
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    isFull: state.DCRList.isFull
});

export default connect(
    mapStateToProps,
    null
)(RPSDeskHead);



//  //  <Link to={"/rps-expenseEntry"}>
                            //   <div className="add-new-dcr">
                            //     <img
                            //         src="../public/assets/images/add-icon.svg"
                            //         alt="add_icon"
                            //     />
                            //  </div>{" "}
                            // </Link>