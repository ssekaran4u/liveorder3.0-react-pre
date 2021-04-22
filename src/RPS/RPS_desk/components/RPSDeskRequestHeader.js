import React, { Component } from "react";
import { toggleDcrHeader, goFullView } from "../../../actions/DCRList";
import { connect } from "react-redux";
import {  Modal, Button,Form,Row,Col,InputGroup,Tabs,Tab, } from 'react-bootstrap'
import RPSDeskListTable from './RPSDeskListTable'
import ConfirmationList from './ConfirmationList'


class RPSDeskRequestHeader extends Component {
    constructor(props){
        super(props)
        this.state ={
            toggleHeader:"",
            isFull:"",
            requestListBtn:true,
            statusBtn:false,
            accountSummaryBtn:false,
            refrenshFlag:'0'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.handleStatusBtn = this.handleStatusBtn.bind(this);
        this.handleAccsumBtn = this.handleAccsumBtn.bind(this);
        this.handlereqlistBtn = this.handlereqlistBtn.bind(this)
        this.refersh = this.refersh.bind(this)
    }
    handleChange() {
        this.props.toggleDcrHeader();
    }

    handleViewChange() {
        this.props.goFullView();
    }
    handleStatusBtn() {
      this.setState({
            requestListBtn:false,
            statusBtn:true,
            accountSummaryBtn:false
      })

    }
    handleAccsumBtn(){
      this.setState({
            requestListBtn:false,
            statusBtn:false,
            accountSummaryBtn:true
      })  
    }
    handlereqlistBtn(){
      this.setState({
            requestListBtn:true,
            statusBtn:false,
            accountSummaryBtn:false
      })    
    }
     static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.toggleHeader !== nextProps.toggleHeader)
            return { toggleHeader: nextProps.toggleHeader };
        if (prevState.isFull !== nextProps.isFull)
            return { isFull: nextProps.isFull };
        return null;
    }
    refersh(a){
        this.setState({
            refrenshFlag:a
        })
    }

    render() {
        return (
            <div className="tabRps ">
                <div>
                  <div className="">
                     
                           <Tabs
                        id="controlled-tab-example"
                        className="rpsSubTab"
                       >
                             <Tab eventKey="AL" title="Request List">
                           <>      
                           <RPSDeskListTable  refersh={this.refersh}/>
                            </>
                        </Tab>
                        <Tab eventKey="BL" title=" Confirmed/Forwarded/Reject/Hold List">
                          <ConfirmationList refrenshFlag={this.state.refrenshFlag} />
                        </Tab>
                      
                       </Tabs>
                    </div> 
                </div>
                {/* <div className="dcr-head-options">
                    {this.state.isFull ? (
                        <img
                            src="../public/assets/images/collapse-grey.svg"
                            className="fullscreen_img"
                            alt="fullscreen_img"
                            onClick={this.handleViewChange}
                        />
                    ) : (
                        <img
                            src="../public/assets/images/fullscreen.svg"
                            className="fullscreen_img"
                            alt="fullscreen_img"
                            onClick={this.handleViewChange}
                        />
                    )}
                </div> */}
            </div>

        );
        
    }
}
const mapStateToProps = state => ({
    toggleHeader: state.DCRList.toggleHeader,
    isFull: state.DCRList.isFull
});

const mapDispatchToProps = dispatch => ({
    toggleDcrHeader: () => dispatch(toggleDcrHeader()),
    goFullView: () => dispatch(goFullView())
});
export default connect(
    mapStateToProps,
    mapDispatchToProps)(RPSDeskRequestHeader)
