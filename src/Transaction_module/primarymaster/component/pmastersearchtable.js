import React, { Component } from 'react';
import Pmastersearchbody from './pmastersearchbody';
// import Button from 'react-bootstrap/Button';
import { Button, Col, Row, Form } from 'react-bootstrap'
import { postToServer } from '../../../lib/comm-utils'
import { URL_SALES } from '../../../lib/constants'

class Pmastersearchtable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            salesearch: [],
            hidesearch: false
        }
        this.handleView = this.handleView.bind(this)
        this.onCheck = this.onCheck.bind(this)
        // this.onCloseSearchTable = this.onCloseSearchTable.bind(this)
    }
    // onCloseSearchTable(){
    //     this.setState({hidesearch:false})
    // }
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }

    componentDidMount() {
        let saleSearch = [];
        var salesearchdata = { "Index": "SalesSearch", "Data": {}, }
        postToServer(URL_SALES, salesearchdata)
            .then((response) => {
                if (response.status == 200) {
                    response.data.data.map((res) => {
                        saleSearch.push({
                            SRNO: res.SRNO,
                            SYEAR: res.SYEAR,
                            PREFIX: res.PREFIX,
                            DEPCODE: res.DEPCODE,
                            DEPNAME: res.DEPNAME,
                            CUSTNAME: res.CUSTNAME,
                            INVOICE: res.INVOICE,
                            isChecked: false,
                        })
                    })
                    this.setState({ salesearch: saleSearch })
                }

            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
            })


    }

    onCheck(event) {
        let salesearch = this.state.salesearch
        salesearch.forEach(res => {
            if (res.SRNO == event.target.value) {
                res.isChecked = event.target.checked
            }
        })
        this.setState({ salesearch: salesearch })

        let SalesSerial = ""
        let Salesdepot = ""
        let Salesyear = ""
        let Salesprefix = ""
        this.state.salesearch.map(res => {
            if (res.isChecked == true) {
                let srnum = res.SRNO
                let depcode = res.DEPCODE
                let year = res.SYEAR
                let prefix = res.PREFIX
                SalesSerial = srnum
                Salesdepot = depcode
                Salesyear = year
                Salesprefix = prefix
            }
        })
        var SalesSelectSearchdata = {
            "Index": "SalesSelectSearch",
            "Data": {
                "SrNo": SalesSerial,
                "depcode": Salesdepot,
                "year": Salesyear,
                "prefix": Salesprefix
            },
        }
        postToServer(URL_SALES, SalesSelectSearchdata)
            .then((response) => {
                if (response.status == 200) {
                    // this.setState({ SalesSelectSearch: response.data.data })
                    this.props.SaleSelectSearch(SalesSerial, response.data.data)
                    this.setState({ hidesearch: true })
                    this.props.salesValue(response.data.data[0].n_total)

                    // this.props.onLoaditems()
                }

            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in App At Primary Sale Target" })
            })
    }

    render() {
        const header = [
            {
                prop: 'checkbox',
                title: "Select",
                filterable: true
            },
            { prop: 'docno', title: 'Doc No', filterable: true },
            { prop: 'year', title: 'Year', filterable: true },
            { prop: 'prefix', title: 'Prefix', filterable: true },
            { prop: 'depotcode', title: 'Depot Code', filterable: true },
            { prop: 'depotname', title: 'Depot Name', filterable: true },
            { prop: 'stockiest', title: 'Stockiest', filterable: true },
            { prop: 'invoice', title: 'Invoice', filterable: true },


        ];

        var body = []
        {
            this.state.salesearch ? this.state.salesearch.map((list) => {
                body.push({
                    checkbox: <label className="table-checkbox-label">
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox"
                            checked={list["isChecked"]}
                            value={list["SRNO"]}
                            onClick={this.onCheck}
                        />
                        <span className="table-checkbox-custom"></span>
                    </label>,
                    docno: list.SRNO,
                    year: list.SYEAR,
                    prefix: list.PREFIX,
                    depotcode: list.DEPCODE,
                    depotname: list.DEPNAME,
                    stockiest: list.CUSTNAME,
                    invoice: list.INVOICE,
                })
            }) : null
        }


        // const body = [
        //     {
        //         checkbox: <label className="table-checkbox-label">
        //             <input
        //                 readOnly
        //                 type="checkbox"
        //                 className="table-customized-checkbox"
        //                 // onChange={this.onShowUncheckAlert}
        //                 onClick={this.props.onCheck}
        //             //   checked={list["isChecked"]}
        //             //   value={list["value"]}
        //             />
        //             <span className="table-checkbox-custom"></span>
        //         </label>,
        //         docno: 'dolo', year: '123', prefix: '10.00', depotcode: 'form', depotname: '10.00', prefix: '10.00', stockiest: 'form', invoice: '13456'
        //     },
        //     {
        //         checkbox: <label className="table-checkbox-label">
        //             <input
        //                 readOnly
        //                 type="checkbox"
        //                 className="table-customized-checkbox"

        //             />
        //             <span className="table-checkbox-custom"></span>
        //         </label>, docno: 'amcard', year: '123', prefix: '10.00', depotcode: 'form', depotname: '10.00', stockiest: 'form', invoice: '13456'
        //     },
        // ];


        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",
            entries: "items/page",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };

        if (this.state.hidesearch == false) {

            return (
                <React.Fragment>
                    <div className="pullleft KamClaimTablesfc">
                        <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
                            {/* <div className="alldropsfclocation">
                            <div className="locationsfa">
                                <div className="distributorClaimListsfc">
                                    <p className="paralocation">Doc No</p>
                                </div>
                                <div className="selectlocation">
                                    <div><Form.Control
                                        type="text"
                                        className="customized-input "
                                        placeholder=""
                                    // value={this.state.Textval} 
                                    // onChange={(event)=>this.handleDistance(event,"0")} 
                                    /></div>
                                </div>
                            </div>

                            <div className="locationsfa">
                                <div className="distributorClaimListsfc">
                                    <p className="paralocation">Year</p>
                                </div>
                                <div className="selectlocation">
                                    <div><Form.Control
                                        type="text"
                                        className="customized-input "
                                        placeholder=""

                                    /></div>
                                </div>
                            </div>

                            <div className="locationsfa">
                                <div className="distributorClaimListsfc">
                                    <p className="paralocation">Prefix</p>
                                </div>
                                <div className="selectlocation">
                                    <div><Form.Control
                                        type="text"
                                        className="customized-input "
                                        placeholder=""

                                    /></div>
                                </div>
                            </div>

                            <div className="locationsfa">
                                <div className="distributorClaimListsfc">
                                    <p className="paralocation">Depot Code</p>
                                </div>
                                <div className="selectlocation">
                                    <div><Form.Control
                                        type="text"
                                        className="customized-input "
                                        placeholder=""

                                    /></div>
                                </div>
                            </div>

                            <div className="locationsfa">
                                <div className="distributorClaimListsfc">
                                    <p className="paralocation">Depot Name</p>
                                </div>
                                <div className="selectlocation">
                                    <div><Form.Control
                                        type="text"
                                        className="customized-input "
                                        placeholder=""

                                    /></div>
                                </div>
                            </div>

                            <div className="locationsfa">
                                <div className="distributorClaimListsfc">
                                    <p className="paralocation">Stockiest</p>
                                </div>
                                <div className="selectlocation">
                                    <div><Form.Control
                                        type="text"
                                        className="customized-input "
                                        placeholder=""

                                    /></div>
                                </div>
                            </div>

                            <div className="locationsfa">
                                <div className="distributorClaimListsfc">
                                    <p className="paralocation">Invoice</p>
                                </div>
                                <div className="selectlocation">
                                    <div><Form.Control
                                        type="text"
                                        className="customized-input "
                                        placeholder=""

                                    /></div>
                                </div>
                            </div>
                            <Button className="sfcAddBtn-loaditem">Go</Button>
                            <Button className="sfcAddBtn-loaditem">Cancel</Button>

                        </div> */}
                            <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>

                                {/* <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt"> */}


                                <div className="sfc-head-edit">
                                    <div>
                                        <h5 className="sfc-list-sec-head">
                                            Item Details
                       </h5>
                                    </div>
                                    <div className="sfc-head-edit-options">
                                        {this.state.isFull ? (
                                            <img
                                                src="../public/assets/images/collapse-grey.svg"
                                                className="fullscreen_img1"
                                                alt="fullscreen_img"
                                                onClick={this.handleView}
                                            />) : (

                                                <img
                                                    src="../public/assets/images/fullscreen.svg"
                                                    className="fullscreen_img1"
                                                    alt="fullscreen_img"
                                                    onClick={this.handleView}
                                                />
                                            )}

                                    </div>
                                </div>

                                <Pmastersearchbody
                                    tableHeader={header}
                                    tableBody={body}
                                    keyName="userTable"
                                    tableClass="striped hover table-responsive"
                                    rowsPerPage={10}
                                    rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                                    initialSort={{ prop: "username", isAscending: true, }}
                                    labels={customLabels}
                                // onCloseSearchTable ={this.onCloseSearchTable}

                                />
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </React.Fragment>

            )
        } else return null
    }
}

export default Pmastersearchtable;