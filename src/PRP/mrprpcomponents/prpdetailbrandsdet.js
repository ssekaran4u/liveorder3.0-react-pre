import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'

import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'



class PrpdetailBrandsdetail extends Component {

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


                        <div className=" prpacount">
                            <div>
                                <div className="acount-detailsprp">
                                    Brands Details
                                </div>
                            </div>



                            <div className=" prpacount-table" >
                                <table id="example" class="stripe row-border order-column"  >
                                    <thead>
                                        <tr>
                                            <th rowspan="1" colspan="1" className="acountname">Brand Name</th>
                                            <th rowspan="1" colspan="1" className="acountname">Current Business(₹)</th>
                                            <th rowspan="1" colspan="1" className="acountname">Expected Business(₹)</th>
                                        </tr>
                                        <tr>
                                            <th className="trainingamt">Cilacar TC</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>

                                        </tr>
                                        <tr>
                                            <th className="trainingamt">Cilacar TC</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>

                                        </tr>
                                        <tr>
                                            <th className="trainingamt">Cilacar TC</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>

                                        </tr>
                                        <tr>
                                            <th className="trainingamt">Cilacar TC</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>

                                        </tr>
                                        <tr className="training-amt">
                                            <th className="trainingamt">Myotan</th>
                                            <th className="trngexpenamt">1,000.00</th>
                                            <th className="trngexpenamt">1,000.00</th>

                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr className="training-amt">
                                            <th></th>
                                            <th className="trainingamt-total">₹ 50,000.00</th>
                                            <th className="trainingamt-total">₹ 1,00,000.00</th>
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
export default PrpdetailBrandsdetail;        