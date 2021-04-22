import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'

import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'



class AcrHistoryDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }



    render() {
        // console.log(this.props.PreviousRemarks,"PreviousRemarks")

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
                                    </thead>
                                    {this.props.PreviousRemarks.length != "0" ? this.props.PreviousRemarks.map(res =>
                                        <tbody>
                                            <tr>
                                                <th className="trainingamt">{res.name}</th>
                                                <th className="trainingamt">{res.desig}</th>
                                                <th className="appr-c-rej">{res.stat}</th>
                                                <th className="trainingamt prpremarkwrap">{res.remarks ? res.remarks : "--"}</th>
                                                <th className="trainingamt">{res.dat}</th>

                                            </tr>

                                        </tbody>
                                    ) : <tbody> <tr><th className="trainingamt">Not Yet Approved</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th></th></tr></tbody>}



                                </table>

                            </div>

                        </div>

                    </div>

                </div>
            </React.Fragment>




        )
    }
}
export default AcrHistoryDetail;        