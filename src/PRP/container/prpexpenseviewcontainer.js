 
import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import '../../../public/assets/css/materialRequest.css'
import Breadcrumbs from '../../BasicComponet/breadcrumbs';
import { Button, Col, Row, Form, InputGroup, } from 'react-bootstrap'
import Prpexpensetypereq from "../mrprpcomponents/prpexpensetypereq";
import OthetprpTypeexpense from "../mrprpcomponents/othertypexpensreq";


class PrpExpenseViewcontainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render(){
        // console.log(this.props.match.params.id, this.props.match.params.type,this.props.location.EditViewData.showHideBtn,"id")
        // console.log( this.props.match.params.status,"status")
        var subContent = <div className="sub-content">
            <Link to="/dashboard"><span>Dashboard</span></Link> / 
            {/* <Link to=""><span>Visited Related</span></Link> /   */}
            <Link to="/mrprplist"><span> PRP List</span></Link>/ PRP Expense View</div>
        return(
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                   
                    <Breadcrumbs content="PRP Expense View" subContent={subContent} />
                    <div className="requestTablePad">
                    <div className="dcr-list-sec">
                         
                    </div>
                    {this.props.match.params.type == "Prp Type"  ?
                    <div>
                    <Prpexpensetypereq 
                    srnum={this.props.match.params.id} 
                    showHideBtn = {this.props.location.EditViewData ? this.props.location.EditViewData.showHideBtn : false}
                    status = {this.props.match.params.status}/></div>:null}

                    {this.props.match.params.type == "Other Type" ?
                    <div>
                      <OthetprpTypeexpense 
                      srnum={this.props.match.params.id} 
                      showHideBtn = {this.props.location.EditViewData ? this.props.location.EditViewData.showHideBtn : false}/></div>:null}
                    
                    {/* <Button className="sfcAddBtn-loaditem send-for-aprvl">Send For Approval</Button> */}
                    </div>
                <Footer />
                </div>
            </div>
        )
    }
}
 
export default PrpExpenseViewcontainer
