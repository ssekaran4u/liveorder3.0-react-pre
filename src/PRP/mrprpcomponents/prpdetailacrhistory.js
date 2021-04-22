import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'

import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'



class PrpDetailAcrHistory extends Component {

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
                                    Approved/Confirmed/Rejected History Details
                                </div>
                            </div>

                            <div className=" prpacount-table" >

                                <table id="example" class="stripe row-border order-column"  >
                                    <thead>
                                        <tr>
                                            <th rowspan="1" colspan="1" className="acountname"> Name</th>
                                            <th rowspan="1" colspan="1" className="acountname">Designation</th>
                                            <th rowspan="1" colspan="1" className="acountname">Status</th>
                                            <th rowspan="1" colspan="1" className="acountname">Remark</th>
                                            <th rowspan="1" colspan="1" className="acountname">Date</th>

                                        </tr>
                                        <tr>
                                            <th className="trainingamt">Abhijeet Dayanand Sagar</th>
                                            <th className="trainingamt">RSM</th>
                                            <th className="appr-c-rej">Approved</th>
                                            <th className="trainingamt">Expense approved</th>
                                            <th className="trainingamt">08-May-2020</th>

                                        </tr>
                                        <tr>
                                            <th className="trainingamt">Vishnu Kumar Jha</th>
                                            <th className="trainingamt">DSM</th>
                                            <th className="appr-c-rej">Approved</th>
                                            <th className="trainingamt">Expense approved</th>
                                            <th className="trainingamt">08-May-2020</th>
                                        </tr>
                                    </thead>

                                </table>

                            </div>

                        </div>

                    </div>

                </div>
            </React.Fragment>




        )
    }
}
export default PrpDetailAcrHistory;        