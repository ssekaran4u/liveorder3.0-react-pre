import React, { Component } from "react";
import Breadcrumbs from "../../BasicComponet/breadcrumbs";
import Card from "react-bootstrap/Card";
import { postToServer } from "../.././lib/comm-utils";
import { URL_EXPENSE_CLAIM } from "../.././lib/constants";
import { withRouter } from "react-router-dom";
import "../../../public/assets/css/expenseDcrList.css";
import { Link } from "react-router-dom";

class ExpenseMcrList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
        this.onPlus = this.onPlus.bind(this)
        this.onBack = this.onBack.bind(this)
    }

    onBack() {
        this.props.history.goBack()
    }

    onPlus(no) {
        let li = this.state.list;
        li.map(res => {
            if (res.dcrNo == no) {
                res.action = (!res.action)
            }
        })
        this.setState({ list: li })
    }

    componentDidMount() {
        let dte = this.props.match.params.date.split("-").reverse().join("-");
        let data = {
            "Index": "DcrWorkwith",
            "Data": { "fscode": this.props.match.params.fscode, "date": dte }
        }
        postToServer(URL_EXPENSE_CLAIM, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                let array = [];
                if (Result.data.data.length) {
                    Result.data.data.map(res => {
                        let chemist = [];
                        let doc = [];
                        let stk = [];
                        if (res.Chemist != "") {
                            chemist = res.Chemist.split(",")
                        }
                        if (res.Doctor != "") {
                            doc = res.Doctor.split(",")
                        }
                        if (res.Stockist != "") {
                            stk = res.Stockist.split(",")
                        }
                        array.push({
                            action: true,
                            dcrNo: res["DCR No"],
                            place: res["Place of Work"] == "" ? "--" : res["Place of Work"],
                            workWith: res["Worked With"] == "" ? "--" : res["Worked With"],
                            stay: res["Place of Stay"] == "" ? "--" : res["Place of Stay"],
                            workType: res["Work Type"] == "" ? "--" : res["Work Type"],
                            doc: doc,
                            che: chemist,
                            stk: stk
                        })
                    })
                }
                this.setState({ list: array })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in dcr list api" })
        })
    }

    render() {
        var subContent = <div className="sub-content">
            <Link
                to={localStorage.getItem("type") == 1 ?
                    "/dashboard" : localStorage.getItem("type") == 2 ? "/mdashboard"
                        : localStorage.getItem('type') == 3 ? "/adashboard" : null}
            ><span>Dashboard</span></Link>&nbsp;
        <Link to="/expenseclaimlist"><span>
                /&nbsp;
            {this.props.match.params.entryType == "approval" ?
                    "Expense Downline Approval List" : this.props.match.params.entryType == "confirmation" ?
                        "Expense Confirmation List" : this.props.match.params.entryType == "reconfirmation" ?
                            "Expense Reconfirmation List" : "Expense Claim List"}
            </span></Link>&nbsp;
                <span className="link_list">/</span>&nbsp;<span onClick={this.onBack} className="link_list hover">
                {this.props.match.params.entryType == "approval" ?
                    "Expense Claim Approval" : this.props.match.params.entryType == "confirmation" ?
                        "Expense Claim Confirmation" : this.props.match.params.entryType == "reconfirmation" ?
                            "Expense Claim Reconfirmation" : "Expense Claim Entry"}&nbsp;</span>
            /&nbsp;MCR List
        </div>
        return (
            <div className="dashboard-sec " >
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="expense_dcr_list">
                            <Breadcrumbs content="Expense Claim Entry Template - MCR Details" subContent={subContent} />
                            <Card className="expense_dcr_list_card">
                                <div className="expense_dcr_table_heading">
                                    MCR Details of {this.props.match.params.name} for {this.props.match.params.date}.
                                </div>
                                <div className="expense_dcr_list_table">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="action_head">
                                                    <div className="header-txt">Action</div>
                                                </th>
                                                <th className="dcr_head">
                                                    <div className="header-txt">DCR No.</div>
                                                </th>
                                                <th className="place_head">
                                                    <div className="header-txt">Place of Work</div>
                                                </th>
                                                <th className="worked_head">
                                                    <div className="header-txt">Worked With</div>
                                                </th>
                                                <th className="stay_head">
                                                    <div className="header-txt">Place of Stay</div>
                                                </th>
                                                <th className="type_head">
                                                    <div className="header-txt">Work Type</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.list.map(res =>
                                                <React.Fragment>
                                                    <tr key={res.dcrNo}>
                                                        <td>
                                                            <div className="body_txt center_aligned">
                                                                {res.action != true ?
                                                                    <img
                                                                        className="plus_img"
                                                                        src="../../../public/assets/images/plus_blue.svg"
                                                                        alt="img"
                                                                        onClick={() => this.onPlus(res.dcrNo)}
                                                                    /> :
                                                                    <img
                                                                        className="plus_img"
                                                                        src="../../../public/assets/images/manager_minus.svg"
                                                                        alt="img"
                                                                        onClick={() => this.onPlus(res.dcrNo)}
                                                                    />}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="body_txt">{res.dcrNo}</div>
                                                        </td>
                                                        <td>
                                                            <div className="body_txt">{res.place}</div>
                                                        </td>
                                                        <td>
                                                            <div className="body_txt">{res.workWith}</div>
                                                        </td>
                                                        <td>
                                                            <div className="body_txt">{res.stay}</div>
                                                        </td>
                                                        <td>
                                                            <div className="body_txt">{res.workType}</div>
                                                        </td>
                                                    </tr>
                                                    {res.action == true ?
                                                        <React.Fragment>
                                                            {res.doc.length && res.che.length && res.stk.length ?
                                                                <React.Fragment>
                                                                    <tr className="sub_row">
                                                                        <td colspan="6">
                                                                            <div className="name_list_container">
                                                                                <div className="doc-list-container">
                                                                                    <img src="../../../public/assets/images/expDoc.svg" alt="img" className="doc-sym" />
                                                                                    <div className="doc-heading">Doctors</div>
                                                                                </div>
                                                                                <div className="list_container">
                                                                                    {res.doc.map(li => <div className="doc_name">
                                                                                        <div className="yellow_circle"></div>
                                                                                        <div className="doc_name_txt">{li}</div>
                                                                                    </div>)}
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="sub_row">
                                                                        <td colspan="6">
                                                                            <div className="name_list_container">
                                                                                <div className="doc-list-container che">
                                                                                    <img src="../../../public/assets/images/expChe.svg" alt="img" className="doc-sym" />
                                                                                    <div className="doc-heading">Chemist</div>
                                                                                </div>
                                                                                <div className="list_container">
                                                                                    {res.che.map(li => <div className="doc_name">
                                                                                        <div className="yellow_circle red"></div>
                                                                                        <div className="doc_name_txt">{li}</div>
                                                                                    </div>)}
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                    <tr className="sub_row">
                                                                        <td colspan="6">
                                                                            <div className="name_list_container">
                                                                                <div className="doc-list-container stk">
                                                                                    <img src="../../../public/assets/images/expStk.svg" alt="img" className="doc-sym" />
                                                                                    <div className="doc-heading">Stockist</div>
                                                                                </div>
                                                                                <div className="list_container">
                                                                                    {res.stk.map(li => <div className="doc_name">
                                                                                        <div className="yellow_circle green"></div>
                                                                                        <div className="doc_name_txt">{li}</div>
                                                                                    </div>)}
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                    </tr>
                                                                </React.Fragment>
                                                                : res.doc.length && res.che.length ?
                                                                    <React.Fragment>
                                                                        <tr className="sub_row">
                                                                            <td colspan="6">
                                                                                <div className="name_list_container">
                                                                                    <div className="doc-list-container">
                                                                                        <img src="../../../public/assets/images/expDoc.svg" alt="img" className="doc-sym" />
                                                                                        <div className="doc-heading">Doctors</div>
                                                                                    </div>
                                                                                    <div className="list_container">
                                                                                        {res.doc.map(li => <div className="doc_name">
                                                                                            <div className="yellow_circle"></div>
                                                                                            <div className="doc_name_txt">{li}</div>
                                                                                        </div>)}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr className="sub_row">
                                                                            <td colspan="6">
                                                                                <div className="name_list_container">
                                                                                    <div className="doc-list-container che">
                                                                                        <img src="../../../public/assets/images/expChe.svg" alt="img" className="doc-sym" />
                                                                                        <div className="doc-heading">Chemist</div>
                                                                                    </div>
                                                                                    <div className="list_container">
                                                                                        {res.che.map(li => <div className="doc_name">
                                                                                            <div className="yellow_circle red"></div>
                                                                                            <div className="doc_name_txt">{li}</div>
                                                                                        </div>)}
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </React.Fragment>
                                                                    : res.doc.length && res.stk.length ?
                                                                        <React.Fragment>
                                                                            <tr className="sub_row">
                                                                                <td colspan="6">
                                                                                    <div className="name_list_container">
                                                                                        <div className="doc-list-container">
                                                                                            <img src="../../../public/assets/images/expDoc.svg" alt="img" className="doc-sym" />
                                                                                            <div className="doc-heading">Doctors</div>
                                                                                        </div>
                                                                                        <div className="list_container">
                                                                                            {res.doc.map(li => <div className="doc_name">
                                                                                                <div className="yellow_circle"></div>
                                                                                                <div className="doc_name_txt">{li}</div>
                                                                                            </div>)}
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                            <tr className="sub_row">
                                                                                <td colspan="6">
                                                                                    <div className="name_list_container">
                                                                                        <div className="doc-list-container stk">
                                                                                            <img src="../../../public/assets/images/expStk.svg" alt="img" className="doc-sym" />
                                                                                            <div className="doc-heading">Stockist</div>
                                                                                        </div>
                                                                                        <div className="list_container">
                                                                                            {res.stk.map(li => <div className="doc_name">
                                                                                                <div className="yellow_circle green"></div>
                                                                                                <div className="doc_name_txt">{li}</div>
                                                                                            </div>)}
                                                                                        </div>
                                                                                    </div>
                                                                                </td>
                                                                            </tr>
                                                                        </React.Fragment> :
                                                                        res.che.length && res.stk.length ?
                                                                            <React.Fragment>
                                                                                <tr className="sub_row">
                                                                                    <td colspan="6">
                                                                                        <div className="name_list_container">
                                                                                            <div className="doc-list-container che">
                                                                                                <img src="../../../public/assets/images/expChe.svg" alt="img" className="doc-sym" />
                                                                                                <div className="doc-heading">Chemist</div>
                                                                                            </div>
                                                                                            <div className="list_container">
                                                                                                {res.che.map(li => <div className="doc_name">
                                                                                                    <div className="yellow_circle red"></div>
                                                                                                    <div className="doc_name_txt">{li}</div>
                                                                                                </div>)}
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr className="sub_row">
                                                                                    <td colspan="6">
                                                                                        <div className="name_list_container">
                                                                                            <div className="doc-list-container stk">
                                                                                                <img src="../../../public/assets/images/expStk.svg" alt="img" className="doc-sym" />
                                                                                                <div className="doc-heading">Stockist</div>
                                                                                            </div>
                                                                                            <div className="list_container">
                                                                                                {res.stk.map(li => <div className="doc_name">
                                                                                                    <div className="yellow_circle green"></div>
                                                                                                    <div className="doc_name_txt">{li}</div>
                                                                                                </div>)}
                                                                                            </div>
                                                                                        </div>
                                                                                    </td>
                                                                                </tr>
                                                                            </React.Fragment> :
                                                                            res.doc.length ?
                                                                                <React.Fragment>
                                                                                    <tr className="sub_row">
                                                                                        <td colspan="6">
                                                                                            <div className="name_list_container">
                                                                                                <div className="doc-list-container">
                                                                                                    <img src="../../../public/assets/images/expDoc.svg" alt="img" className="doc-sym" />
                                                                                                    <div className="doc-heading">Doctors</div>
                                                                                                </div>
                                                                                                <div className="list_container">
                                                                                                    {res.doc.map(li => <div className="doc_name">
                                                                                                        <div className="yellow_circle"></div>
                                                                                                        <div className="doc_name_txt">{li}</div>
                                                                                                    </div>)}
                                                                                                </div>
                                                                                            </div>
                                                                                        </td>
                                                                                    </tr>
                                                                                </React.Fragment>
                                                                                :
                                                                                res.che.length ?
                                                                                    <React.Fragment>
                                                                                        <tr className="sub_row">
                                                                                            <td colspan="6">
                                                                                                <div className="name_list_container">
                                                                                                    <div className="doc-list-container che">
                                                                                                        <img src="../../../public/assets/images/expChe.svg" alt="img" className="doc-sym" />
                                                                                                        <div className="doc-heading">Chemist</div>
                                                                                                    </div>
                                                                                                    <div className="list_container">
                                                                                                        {res.che.map(li => <div className="doc_name">
                                                                                                            <div className="yellow_circle red"></div>
                                                                                                            <div className="doc_name_txt">{li}</div>
                                                                                                        </div>)}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </React.Fragment> :
                                                                                    res.che.length ?
                                                                                        <React.Fragment>
                                                                                            <tr className="sub_row">
                                                                                                <td colspan="6">
                                                                                                    <div className="name_list_container">
                                                                                                        <div className="doc-list-container stk">
                                                                                                            <img src="../../../public/assets/images/expStk.svg" alt="img" className="doc-sym" />
                                                                                                            <div className="doc-heading">Stockist</div>
                                                                                                        </div>
                                                                                                        <div className="list_container">
                                                                                                            {res.stk.map(li => <div className="doc_name">
                                                                                                                <div className="yellow_circle green"></div>
                                                                                                                <div className="doc_name_txt">{li}</div>
                                                                                                            </div>)}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </React.Fragment>
                                                                                        : null}
                                                        </React.Fragment>
                                                        : null}
                                                </React.Fragment>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ExpenseMcrList);
