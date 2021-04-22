import React, { Component } from "react";
import PrintTable from "./printTable";
import ReactToPrint from 'react-to-print';
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import "../../../public/assets/css/expenseDetails.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

class PrintExpenseDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            isChecked: false
        }
        this.oncheck = this.oncheck.bind(this)
    }
    oncheck(){
        this.setState({isChecked: !this.state.isChecked},()=>{this.props.onShowEntry(this.state.isChecked)})
    }
    
    render() {
        var subContent = <div className="expense-details-btn-grp">
            <div className="cancel-button-container">
                <Link to="/expenseclaimentry">
                    <Button className="cancel-button">
                        <div className="cancel-btn-text">Cancel</div>
                    </Button>
                </Link>
            </div>
            <ReactToPrint
                trigger={() => <Button className="submit-button">
                    <div className="submit-btn-text">Submit</div>
                </Button>}
                content={() => this.componentRef}
            />
        </div>
        return (
            <div className="dashboard-sec " >
                <div className="admindashboard">
                    <div className="content-spacing dashscroll expense-details-dashscroll">
                        <div className="print-expense-details">
                            <Breadcrumbs content="Expense Details for month of January, 2020" subContent={subContent} />
                            <PrintTable ref={result => (this.componentRef = result)} />
                            <div className="footer-btn-grp">
                                <div className="footer-button">
                                    <Button className="footer-btn">
                                        <div className="footer-btn-text">Import</div>
                                    </Button>
                                </div>
                                <div className="footer-button">
                                    <Button className="footer-btn">
                                        <div className="footer-btn-text">Save File</div>
                                    </Button>
                                </div>
                                <div className="attachments">
                                    <label className="checkbox-label">
                                        <input type="checkbox" className="customized-checkbox" onChange={this.oncheck} />
                                        <span className="checkbox-custom"></span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PrintExpenseDetails; 