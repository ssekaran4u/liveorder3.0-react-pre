 
import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import '../../../public/assets/css/materialRequest.css'
import Breadcrumbs from '../../BasicComponet/breadcrumbs';
import { Button, Col, Row, Form, InputGroup, } from 'react-bootstrap'
import OthetprpTypeexpense from "../mrprpcomponents/othertypexpensreq";

class PrpOtherExpenseViewcontainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render(){
        var subContent = <div className="sub-content">
            <Link to="/dashboard"><span>Dashboard</span></Link> / 
            {/* <Link to=""><span>Visited Related</span></Link> */}
              <Link to=""><span>/ PRP List</span></Link>/ PRP Expense View</div>
        return(
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                   
                    <Breadcrumbs content="PRP Other Type Expense Entry " subContent={subContent} />
                    <div className="requestTablePad">
                    <div className="dcr-list-sec">
                         
                    </div>
                    <OthetprpTypeexpense />
                    
                    {/* <Button className="sfcAddBtn-loaditem send-for-aprvl">Send For Approval</Button> */}
                    </div>
                <Footer />
                </div>
            </div>
        )
    }
}
 
export default PrpOtherExpenseViewcontainer
