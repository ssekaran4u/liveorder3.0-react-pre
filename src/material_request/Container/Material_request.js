import React,{Component} from 'react'
import { Breadcrumb } from "react-bootstrap";
import {Link} from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import '../../../public/assets/css/materialRequest.css'
import MrMaterialList from '../components/MrMaterialList'
import CommonHeader from '../../lib/CommonHeader'
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Breadcrumbs from '../../BasicComponet/breadcrumbs'

class Material_request extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isFull: this.props.isFull
        };
        this.redirect = this.redirect.bind(this)
    }

    static getDerivedStateFromProps(nextState, prevState) {
        if (prevState.isFull !== nextState.isFull)
            return { isFull: nextState.isFull };
        return null;
    }
    redirect(){
        localStorage.setItem("type","mr")
        localStorage.setItem("visitingFlag","")
        localStorage.setItem("edit","")
        this.props.history.push('/add_material/add')
    }

    render(){
        var subContent = <div className="sub-content"><Link to="/dashboard"><span>Dashboard</span></Link> / 
        <Link to="/"><span>Operational</span></Link> / Material Request List</div>
        return(
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                   
                    <Breadcrumbs content="Material Request" subContent={subContent} />
                    <div className="requestTablePad">
                    <div className="dcr-list-sec">
                        <div
                            className={
                                this.state.isFull ? "fullscreenView" : ""
                            }
                        >
                            <CommonHeader heading="Material Request List" />
                            <MrMaterialList />
                        </div>
                    </div>

                    {/* <Link to={"/add_material"}> */}
                        <div className="add-new-dcr"  onClick={this.redirect}>
                            <img
                                src="../public/assets/images/add-icon.svg"
                                alt="add_icon"
                               
                            />
                        </div>{" "}
                    {/* </Link> */}
                     
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
)(withRouter(Material_request));
