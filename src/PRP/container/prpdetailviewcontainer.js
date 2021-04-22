
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../landing-page/components/Footer';
import '../../../public/assets/css/materialRequest.css'
import Breadcrumbs from '../../BasicComponet/breadcrumbs';
import { Button, Col, Row, Form, InputGroup, } from 'react-bootstrap'
import Prpdetailtypereq from "../mrprpcomponents/prpdetailtperequest"
import ReactToPrint from 'react-to-print';


class PrpDetailViewcontainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        var subContent = <div className="sub-content">
            <ReactToPrint
                trigger={() => <Button className="PrintBtn">
                    <img src="../../../public/assets/images/print-white.svg" className="printmargin"></img>Print
                </Button>}
                content={() => this.componentRef} />
            <Link to="/dashboard"><span>Dashboard</span></Link> /
            {/* <Link to=""><span>Visited Related</span></Link>  */}
             <Link to="/mrprplist"><span> PRP List</span></Link>/ PRP Detail View</div>
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">

                    <Breadcrumbs content="PRP Details View(13651)" subContent={subContent} />
                    <div className="requestTablePad">
                        <div className="dcr-list-sec">

                        </div>
                        <div ref={result => (this.componentRef = result)}>
                            <Prpdetailtypereq srnum={this.props.match.params.id}/>
                            <Button className="sfcAddBtn-loaditem send-for-aprvl">Send For Approval</Button>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default PrpDetailViewcontainer
