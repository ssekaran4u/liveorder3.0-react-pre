import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'

import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'



class PrpdetailExpesedet extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }



    render() {


        return (
            <React.Fragment>

                <div className="pullleft KamClaimTablesfc">
                    <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">


                        <div className="prpacount">
                            <div>
                                <div className="prpexpense-det">
                                    PRP Expense Details
                                </div>
                            </div>
                            <div className="locationsfa">
                                <div className="user-heirarchy-field-containers">
                                    <div className="distributorClaimListsfc">
                                        <p className="paralocation-prp">Total Cost Estimated For PRP(₹)<span className="colorRed">*</span> </p>
                                    </div>
                                    <div className="selectlocation">
                                        <div className="prp-det-expense-head">5,000.00</div>
                                    </div>
                                </div>
                            </div>


                            <div className=" prpacount-table" >

                                <table id="example" class="stripe row-border order-column"  >
                                    <thead>
                                        <tr>
                                            <th rowspan="1" colspan="1" className="acountname">Expense Name</th>
                                            <th rowspan="1" colspan="1" className="acountname">Estimated</th>
                                            <th rowspan="1" colspan="1" className="acountname">Approved Amt. By Manager</th>
                                            <th rowspan="1" colspan="1" className="acountname">Confirmed Amt. By Desk</th>
                                            <th rowspan="1" colspan="1" className="acountname">Final Advance</th>

                                        </tr>
                                        <tr>
                                            <th className="trainingamt">Food Charges</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                        </tr>
                                        <tr>
                                            <th className="trainingamt">Texi Charges</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">0.00</th>

                                        </tr>
                                        <tr>
                                            <th className="trainingamt">Audio Visual Charges</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>

                                        </tr>
                                        <tr>
                                            <th className="trainingamt">internet Connection Charges</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">0.00</th>

                                        </tr>
                                        <tr className="training-amt">
                                            <th className="trainingamt">Myotan</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">0.00</th>

                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr className="training-amt">
                                            <th></th>
                                            <th className="trainingamt-total">₹ 8,000.00</th>
                                            <th className="trainingamt-total">₹ 8,000.00</th>
                                            <th className="trainingamt-total">₹ 4,000.00</th>
                                            <th className="trainingamt-total">₹ 4,000.00</th>
                                        </tr>
                                    </tfoot>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>
            </React.Fragment>




        )
    }
}
export default PrpdetailExpesedet;        