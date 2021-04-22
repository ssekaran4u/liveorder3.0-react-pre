import React, { Component } from "react";
import SSalesCustomTable from "./SSalesCustomTable";
import "../../../../../public/assets/css/campaignRequest.css";
import { postToServer } from '../../../../lib/comm-utils'

import { Link } from "react-router-dom";


class SSalesListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleHeader: this.props.toggleHeader,
      approvalList: []
    };

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data !== nextProps.data) {
      return { ...prevState, data: nextProps.data };
    }
    if (prevState.toggleHeader !== nextProps.toggleHeader)
      return { ...prevState, toggleHeader: nextProps.toggleHeader };
    return null;
  }
  componentDidMount() {
    var data = {
      "index": "SecSalesApprovalList",
      "Data": {},
      "Token": ""
    }
    postToServer("Sales", data).then((Result) => {
      if (Result.data.Status == 'Success') {
        this.setState({ approvalList: Result.data.data })
      }
    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: " Contact to admin" })
    })
  }
  render() {
    const header = [
      { prop: 'Srno', title: 'Sr.No', filterable: true },
      { prop: 'EnteredBy', title: 'Entered By', filterable: true, sortable: true },
      { prop: 'StockistName', title: 'Stockist Name', filterable: true, sortable: true },
      { prop: 'Month', title: 'Month', filterable: true, sortable: true },
      { prop: 'Year', title: 'Year', filterable: true },


    ];
    let body = []
    this.state.approvalList.length ?
      this.state.approvalList.map(res => {
        const srno = <Link to={{
          pathname: "/secondarysaleEdit/" + res.Srno
        }}>{res.Srno}</Link>
        body.push({
          Srno: srno,
          EnteredBy: res["Entered By"],
          StockistName: res["Stockist Name"],
          Month: res.Month,
          Year: res.Year
        })
      }) : null

    // const body  =[

    //     {Srno:srno, EnteredBy:'Prashanth',StockistName:'Akshay Agencies(MRPTA005)',Month:'January',Year:'2021'},
    //     {Srno:srno, EnteredBy:'Prashanth',StockistName:'Akshay Agencies(MRPTA005)',Month:'January',Year:'2021'},
    //     {Srno:srno, EnteredBy:'Prashanth',StockistName:'Akshay Agencies(MRPTA005)',Month:'January',Year:'2021'},
    //     {Srno:srno, EnteredBy:'Prashanth',StockistName:'Akshay Agencies(MRPTA005)',Month:'January',Year:'2021'},
    //     {Srno:srno, EnteredBy:'Prashanth',StockistName:'Akshay Agencies(MRPTA005)',Month:'January',Year:'2021'},
    //     {Srno:srno, EnteredBy:'Prashanth',StockistName:'Akshay Agencies(MRPTA005)',Month:'Feb',Year:'2020'},

    // ]

    const customLabels = {
      first: "<<",
      last: ">>",
      prev: "< Prev",
      next: "Next >",
      show: "Show",
      entries: "entries",
      filterPlaceholder: "Search",
      noResults: "There is no data to be displayed"
    };
    return (
      <div>

        <SSalesCustomTable
          tableHeader={header}
          tableBody={body}
          keyName="userTable"
          tableClass="striped hover table-responsive"
          rowsPerPage={10}
          rowsPerPageOption={[10, 20, 50, 100, 200]}
          initialSort={{ prop: "username", isAscending: true, }}
          labels={customLabels}
        />
      </div>


    );
  }
}
export default SSalesListTable;