 
import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import '../../../public/assets/css/materialRequest.css'
import CommonHeader from '../../lib/CommonHeader'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Breadcrumbs from '../../BasicComponet/breadcrumbs';
import PrplistTable from "../mrprpcomponents/prplisttable";

class prplistcontainer extends Component{
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
    

    render(){
        var subContent = <div className="sub-content">
            <Link to="/dashboard"><span>Dashboard</span></Link> / 
            {/* <Link to=""><span>Visited Related</span></Link> */}
               PRP List</div>
        return(
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                   
                    <Breadcrumbs content="PRP List" subContent={subContent} />
                    <div className="requestTablePad">
                    <div className="dcr-list-sec">
                        <div
                            className={
                                this.state.isFull ? "fullscreenView" : ""
                            }
                        >
                            <CommonHeader heading="PRP Request List" />
                            <PrplistTable/>
                        </div>
                    </div>

                    <Link to = {{
                    pathname:"/mrnewentry/" + " " + "/" + " ",
                     EditViewData:{
                    showHideBtn: false
                  }
                   }} >
                    
                        <div className="add-new-dcr">
                            <img
                                src="../public/assets/images/add-icon.svg"
                                alt="add_icon"
                               
                            />
                        </div>{" "}
                        </Link>
                     
                    </div>
                <Footer />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isFull: state.DCRList.isFull
});

export default connect(
    mapStateToProps,
    null
)(withRouter(prplistcontainer));
