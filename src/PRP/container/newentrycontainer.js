 
import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import '../../../public/assets/css/materialRequest.css'
import Breadcrumbs from '../../BasicComponet/breadcrumbs';
import Newentry from "../mrprpcomponents/newprpentry";
import { Button, Col, Row, Form, InputGroup, } from 'react-bootstrap'


class Newentrycontainer extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render(){
        var subContent = <div className="sub-content">
            <Link to="/dashboard"><span>Dashboard</span></Link> / 
            {/* <Link to=""><span>Visited Related</span></Link>  */}
              <Link to="/mrprplist"><span> PRP List</span></Link>/ New PRP Entry</div>
        return(
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                   
                    <Breadcrumbs content="New PRP Entry" subContent={subContent} />
                    <div className="requestTablePad">
                    <div className="dcr-list-sec">
                         
                            
                           
                    </div>
                    <Newentry 
                    srnum = {this.props.match.params.id} 
                    type = {this.props.match.params.type}
                    hideshowbtn = {this.props.location.EditViewData ? this.props.location.EditViewData.showHideBtn : false}
                    />
                   
                    {/* <Button className="sfcAddBtn-loaditem send-for-aprvl">Send For Approval</Button> */}
                    </div>
                <Footer />
                </div>
            </div>
        )
    }
}
 
export default Newentrycontainer
