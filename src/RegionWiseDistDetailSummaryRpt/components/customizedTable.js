import React, { Component } from "react";
import "../../../public/assets/css/reportCustomizedTable.css";

class CustomizedTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableDetails: [],
            header1: [],
            header2: [],
            bodySequence: [],
        }
    }

    componentDidMount() {
        let header1 = [];
        let header2 = [];
        let bodySequence = [];
        let header = {
            "Heading": [{
                "Heading": "update1$Total,test2$chhhhhhh,test3$update23$Total,test4$Total,mad$Total,mmm$Total,mm$Total,madhurisipi$Total,Madhuri$Total,asdfgh$Total,qwertyui$Total,okokokok$Total,check122$Total"
            }],
            "ReportData": [
                {
                    "Category": "C00001",
                    "Division": "DIVISION1",
                    "Madhuri$Total": { drs: "5", calls: "20" },
                    "Month": "November",
                    "NO OF DRS IN LIST": "10",
                    "REGION": "ANDHRA PRADESH",
                    "asdfgh$Total": { drs: "40", calls: "70" },
                    "c_fs_code": "",
                    "cat": "",
                    "check122$Total": { drs: "15", calls: "50" },
                    "mad$Total": { drs: "35", calls: "100" },
                    "madhurisipi$Total": { drs: "60", calls: "200" },
                    "mm$Total": { drs: "80", calls: "150" },
                    "mmm$Total": { drs: "30", calls: "90" },
                    "month": "",
                    "okokokok$Total": { drs: "80", calls: "200" },
                    "qwertyui$Total": { drs: "120", calls: "240" },
                    "test2$chhhhhhh": { drs: "70", calls: "380" },
                    "test3$Total": { drs: "65", calls: "230" },
                    "test3$update23": { drs: "200", calls: "320" },
                    "test4$Total": { drs: "150", calls: "280" },
                    "update1$Total": { drs: "20", calls: "60" },
                    "name": "Kumar",
                    "hq": "Bangalore",
                    "emp_code": "EC001"
                },
                {
                    "Category": "C00001",
                    "Division": "DIVISION1",
                    "Madhuri$Total": { drs: "10", calls: "30" },
                    "Month": "November",
                    "NO OF DRS IN LIST": "10",
                    "REGION": "ANDHRA PRADESH",
                    "asdfgh$Total": { drs: "80", calls: "120" },
                    "c_fs_code": "",
                    "cat": "",
                    "check122$Total": { drs: "25", calls: "80" },
                    "mad$Total": { drs: "35", calls: "100" },
                    "madhurisipi$Total": { drs: "80", calls: "200" },
                    "mm$Total": { drs: "30", calls: "120" },
                    "mmm$Total": { drs: "60", calls: "90" },
                    "month": "",
                    "okokokok$Total": { drs: "20", calls: "30" },
                    "qwertyui$Total": { drs: "5", calls: "20" },
                    "test2$chhhhhhh": { drs: "70", calls: "380" },
                    "test3$Total": { drs: "65", calls: "230" },
                    "test3$update23": { drs: "50", calls: "30" },
                    "test4$Total": { drs: "160", calls: "280" },
                    "update1$Total": { drs: "200", calls: "650" },
                    "name": "Madhu",
                    "hq": "Chennai",
                    "emp_code": "EC048"
                }
            ]
        }
        let headers = header.Heading[0].Heading.split(",")
        headers.map(res => {
            let subHeaders = res.split("$")
            header1.push({
                space: (subHeaders.length - 1) * 2,
                name: subHeaders[0]
            })
            for (let i = 1; i < subHeaders.length; i++) {
                header2.push(subHeaders[i])
            }
            if (subHeaders.length > 2) {
                for (let j = 1; j < subHeaders.length; j++) {
                    bodySequence.push(subHeaders[0] + "$" + subHeaders[j])
                }
            }
            else {
                bodySequence.push(res)
            }
        })
        this.setState({
            header1: header1,
            header2: header2,
            bodySequence: bodySequence,
            tableDetails: header.ReportData
        })
    }

    render() {
        return (
            <div className="sfa_report_table_con">
                <table>
                    <thead>
                        <tr className="first_row_rep_tab">
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            {this.state.header1.map((res, i) =>
                                <th key={i} className="bor_rows" colSpan={res.space}>{res.name}</th>
                            )}
                            {/* <th className="bor_rows" colSpan="2">REMOTE DETAILING</th>
                            <th className="bor_rows" colSpan="4">DIGITAL CME</th> */}
                            <th></th>
                            <th></th>
                        </tr>
                        <tr className="sec_row_rep_tab">
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            {this.state.header2.map((res, i) =>
                                <th key={i} className="bor_rows" colSpan="2">{res}</th>
                            )}
                            {/* <th className="bor_rows" colSpan="2">RADIO TALK</th>
                            <th className="bor_rows" colSpan="2">DR SMS ACTIVITY</th>
                            <th className="bor_rows" colSpan="2">TOTAL</th>
                            <th className="bor_rows" colSpan="2">CILACAR WEBCAST</th>
                            <th className="bor_rows" colSpan="2">MYOTAN WEBINAR</th> */}
                            <th></th>
                            <th></th>
                        </tr>
                        <tr className="third_row_rep_tab">
                            <th className="lar_wid">DIVISION</th>
                            <th className="lar_wid">NAME</th>
                            <th className="med_wid">HQ</th>
                            <th className="lar_wid">REGION</th>
                            <th className="med_wid">MONTH</th>
                            <th className="lar_wid">CATEGORY</th>
                            <th className="drs_li">NO OF DRS IN LIST</th>
                            {this.state.header2.map((res, i) =>
                                <React.Fragment key={i}>
                                    <th className="drs_eng">NO OF DRS ENGAGED</th>
                                    <th className="no_call">NO OF CALLS</th>
                                </React.Fragment>
                            )}
                            {/* <th className="drs_eng">NO OF DRS ENGAGED</th>
                            <th className="no_call">NO OF CALLS</th>
                            <th className="drs_eng">NO OF DRS ENGAGED</th>
                            <th className="no_call">NO OF CALLS</th>
                            <th className="drs_eng">NO OF DRS ENGAGED</th>
                            <th className="no_call">NO OF CALLS</th>
                            <th className="drs_eng">NO OF DRS ENGAGED</th>
                            <th className="no_call">NO OF CALLS</th>
                            <th className="drs_eng">NO OF DRS ENGAGED</th>
                            <th className="no_call">NO OF CALLS</th> */}
                            <th className="lar_wid">FS CODE</th>
                            <th className="xl_wid">EMPLOYEE CODE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tableDetails.map((res, i) =>
                            <tr key={i}>
                                <td>{res.Division == "" ? "--" : res.Division}</td>
                                <td>{res.name == "" ? "--" : res.name}</td>
                                <td>{res.hq == "" ? "--" : res.hq}</td>
                                <td>{res.REGION == "" ? "--" : res.REGION}</td>
                                <td>{res.Month == "" ? "--" : res.Month}</td>
                                <td>{res.Category == "" ? "--" : res.Category}</td>
                                <td>{res["NO OF DRS IN LIST"] == "" ? "--" : res["NO OF DRS IN LIST"]}</td>
                                {this.state.bodySequence.map((li, index) =>
                                    <React.Fragment key={index}>
                                        <td>{res[li].drs==""?"--":res[li].drs}</td>
                                        <td>{res[li].calls==""?"--":res[li].calls}</td>
                                    </React.Fragment>
                                )}
                                <td>{res.c_fs_code==""?"--":res.c_fs_code}</td>
                                <td>{res.emp_code==""?"--":res.emp_code}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default CustomizedTable;