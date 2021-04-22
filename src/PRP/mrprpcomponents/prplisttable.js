import React from 'react'
import { Component } from 'react';
import '../../../public/assets/css/prpstyle.css';
import '../../../public/assets/css/prpresponsive.css';
import PrplistBody from "./prplistbody";
import { Link } from 'react-router-dom'
import { postToServer } from '../../lib/comm-utils'
import { URL_PRP } from '../../lib/constants'
import DashLoader from "../../lib/DashboardLoader";
import { dateFormat } from "dateformat"
import Loader from '../../lib/Loader'
class PrplistTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PRPRequestList: [],
            monthList: [],
            month: new Date().getMonth() + 1,
            yearList: [],
            year: new Date().getFullYear(),
            text: "-",
            icon: "",
            Statusss:"status",
            statusfilter: "0",
            statusDescription: "Requested",
            statusdata:"All",
            statusdropdown: [
                // {
                //     "statuscode": "All",
                //     "statustext": "All Requests"
                // },
                {
                    "statuscode": "0",
                    "statustext": "Requested"
                },
                {
                    "statuscode": "1",
                    "statustext": "Approved"
                },
                {
                    "statuscode": "2",
                    "statustext": "Confirmed"
                },
                {
                    "statuscode": "3",
                    "statustext": "Hold"
                },
                {
                    "statuscode": "4",
                    "statustext": "Rejected"
                },
                {
                    "statuscode": "5",
                    "statustext": "Expense Submitted"
                },
                {
                    "statuscode": "6",
                    "statustext": "Expense Approved"
                },
                {
                    "statuscode": "7",
                    "statustext": "Expense Confirmed"
                },
                {
                    "statuscode": "8",
                    "statustext": "Expense Pending"
                },
                {
                    "statuscode": "9",
                    "statustext": "Expense Cancel Con."
                },
            ],
            showLoader : true
        }
        this.getStatuslist = this.getStatuslist.bind(this)
        this.filterStatus = this.filterStatus.bind(this);
        this.getMonths = this.getMonths.bind(this);
        this.filterMonth = this.filterMonth.bind(this);
        this.getYears = this.getYears.bind(this);
        this.filterYear = this.filterYear.bind(this);
    }

    componentDidMount() {
        this.setState({showLoader: true})
        this.getMonths()
        this.getYears()
        this.getStatuslist()
    }


    getStatuslist(month, year,statuscode) {
        this.setState({showLoader: true})
        // let c_month = month ? month : this.state.month
        // let c_month = month == "00" ? "1,2,3,4,5,6,7,8,9,10,11,12" : month
        let months = ""
    if(month == "00"){
      months = "1,2,3,4,5,6,7,8,9,10,11,12"
    }else{
      months = month
    }
    let c_month = months ? months : this.state.month


        let c_year = year ? year : this.state.year


        let statuss = ""
        if(statuscode == "All"){
            statuss = "All"
        }else{
            statuss = statuscode
        }
        let c_status = statuss ? statuss : this.state.statusdata

        // let status1 = statuscode == "All" ? "All" : statuscode

        let status_Filter = this.state.statusfilter
        // console.log(status_Filter,"status_Filter")
        var listdata = {
            "Index": "PRPRequestList",
            "Data": {
                "statusfilter": c_status,
                // "statusfilter": status_Filter,
                "month": c_month.toString(),
                "year": c_year.toString()
            },
        }
        postToServer(URL_PRP, listdata)
            .then((response) => {
                if (response.status == 200 && response.statusText == "OK") {

                    this.setState({ PRPRequestList: response.data.data , showLoader: false })
                }

            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error In App At MRPRP", showLoader: false })
            })
    }

    filterStatus(statuscode) {
				this.getStatuslist(this.state.month, this.state.year,statuscode)
				this.setState({showLoader: true})
        // if (statuscode === "All") {
        //     this.setState({ statusfilter: "All", statusDescription: "All " ,   }, () => {
        //         this.getStatuslist(this.state.month, this.state.year,this.state.statusfilter)
        //     });

        // }
        // if (statuscode === "0") {
        //     this.setState({ statusfilter: "0", statusDescription: "Requested", }, () => {
        //         this.getStatuslist(this.state.month, this.state.year, this.state.statusfilter)
        //     });

        // } if (statuscode === "1") {
        //     this.setState({ statusfilter: "1", statusDescription: "Approved", }, () => {
        //         this.getStatuslist(this.state.month, this.state.year, this.state.statusfilter)
        //     });

        // } if (statuscode === "2") {
        //     this.setState({ statusfilter: "2", statusDescription: "Confirmed", }, () => {
        //         this.getStatuslist(this.state.month, this.state.year, this.state.statusfilter)
        //     });

        // } if (statuscode === "3") {
        //     this.setState({ statusfilter: "3", statusDescription: "Hold", }, () => {
        //         this.getStatuslist(this.state.month, this.state.year, this.state.statusfilter)
        //     });

        // } if (statuscode === "4") {
        //     this.setState({ statusfilter: "4", statusDescription: "Rejected", }, () => {
        //         this.getStatuslist(this.state.month, this.state.year, this.state.statusfilter)
        //     });

        // } if (statuscode === "5") {
        //     this.setState({ statusfilter: "5", statusDescription: "Expense Submitted", }, () => {
        //         this.getStatuslist(this.state.month, this.state.year, this.state.statusfilter)
        //     });

        // }
        // if (statuscode === "6") {
        //     this.setState({ statusfilter: "6", statusDescription: "Expense Approved", }, () => {
        //         this.getStatuslist(this.state.month, this.state.year, this.state.statusfilter)
        //     });
        // }
        // if (statuscode === "7") {
        //     this.setState({ statusfilter: "7", statusDescription: "Expense Confirmed", }, () => {
        //         this.getStatuslist(this.state.month, this.state.year, this.state.statusfilter)
        //     });
        // }
        // if (statuscode === "8") {
        //     this.setState({ statusfilter: "8", statusDescription: "Expense Pending", }, () => {
        //         this.getStatuslist(this.state.month, this.state.year, this.state.statusfilter)
        //     });
        // }
        // if (statuscode === "9") {
        //     this.setState({ statusfilter: "9", statusDescription: "Expense Cancel Con.", }, () => {
        //         this.getStatuslist(this.state.month, this.state.year, this.state.statusfilter)
        //     });
        // }
    }

    getMonths() {
        var monthdata = { "Index": "GetMonth", }
        postToServer(URL_PRP, monthdata)
            .then((response) => {
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({ monthList: response.data })
                }

            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error In App At MRPRP" })
            })
    }

    

    filterMonth(month) {
        this.setState({ month: month, showLoader : true })
        this.getStatuslist(month, this.state.year,this.state.statuscode)
    }

    getYears() {
        var yeardata = { "Index": "GetYear", "Token": "" }

        postToServer(URL_PRP, yeardata)
            .then((response) => {
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({ yearList: response.data.reverse()})
                }

            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error In App At MRPRP"})
            })
    }

    filterYear(year) {
        this.setState({ year: year, showLoader : true })
        this.getStatuslist(this.state.month, year,this.state.statuscode)
    }

    render() {

        const monthFilter = []
  
         this.state.monthList.map((item,index)=>{
        //   monthFilter.push({
        //     key: '1,2,3,4,5,6,7,8,9,10,11,12',
        //     value:'1,2,3,4,5,6,7,8,9,10,11,12',
        //     text: 'All',
        //     image: { avatar: true, src: '../public/assets/images/right.svg' },
        //   })
          monthFilter.push({
            key: parseInt(item.Code),
            value: parseInt(item.Code),
            text: item.Name,
            image: { avatar: true, src: '../public/assets/images/right.svg' },
          })
         
        })

        const yearFilter=[]
        this.state.yearList.map((item,index)=>{
         
            yearFilter.push({
                key: parseInt(item.Code),
                value: parseInt(item.Code),
                text: item.Name,
                image: { avatar: true, src: '../public/assets/images/right.svg' },
              })
        })

        const statusFilter = [
            {
              key: 'All',
              text: 'All',
              value: 'All',
              image: { avatar: true, src: '../public/assets/images/right.svg' },
            },
      
            {
              key: '0',
              text: 'Requested',
              value: '0',
              image: { avatar: true, src: '../public/assets/images/right.svg' },
            },
            {
              key: '1',
              text: 'Approved',
              value: '1',
              image: { avatar: true, src: '../public/assets/images/right.svg' },
            },
            {
              key: '2',
              text: 'Confirmed',
              value: '2',
              image: { avatar: true, src: '../public/assets/images/right.svg' },
            },
             {
              key: '3',
              text: 'Hold',
              value: '3',
              image: { avatar: true, src: '../public/assets/images/right.svg' },
            },
            {
                key: '4',
                text: 'Rejected',
                value: '4',
                image: { avatar: true, src: '../public/assets/images/right.svg' },
              },
              {
                key: '5',
                text: 'Expense Submitted',
                value: '5',
                image: { avatar: true, src: '../public/assets/images/right.svg' },
              },
              {
                key: '6',
                text: 'Expense Approved',
                value: '6',
                image: { avatar: true, src: '../public/assets/images/right.svg' },
              },
              {
                key: '7',
                text: 'Expense Confirmed',
                value: '7',
                image: { avatar: true, src: '../public/assets/images/right.svg' },
              },
              {
                key: '8',
                text: 'Expense Pending',
                value: '8',
                image: { avatar: true, src: '../public/assets/images/right.svg' },
              },
              {
                key: '9',
                text: "Expense Cancel Con.",
                value: '9',
                image: { avatar: true, src: '../public/assets/images/right.svg' },
              },
          ]

          const statuss = [
            {
                key: 'Status :',
                text: 'Status :',
                value: 'Status :',
              },
          ]
        var header
        // if (this.state.statusfilter == "All" || this.state.statusfilter == "5" || this.state.statusfilter == "6" || this.state.statusfilter == "7" || this.state.statusfilter == "8" || this.state.statusfilter == "9") {
            header = [
                { prop: 'ReqNo', title: 'Req. No.', sortable: true, filterable: true },
                { prop: 'entry', title: 'Exp. Entry', filterable: true },
                { prop: 'prpname', title: 'PRP Name', sortable: true, filterable: true },
                { prop: 'prptopic', title: 'PRP Topic', sortable: true, filterable: true },
                // { prop: 'place', title: 'Place', sortable: true, filterable: true },
                { prop: 'location', title: 'Location', sortable: true, filterable: true },
                { prop: 'prpdate', title: 'PRP Date', sortable: true, filterable: true },
                { prop: 'reqdate', title: 'Requested Date', sortable: true, filterable: true },
                { prop: 'apprdate', title: 'Approved Date', sortable: true, filterable: true },
                { prop: 'rejdate', title: 'Rejected Date', sortable: true, filterable: true },
                { prop: 'confdate', title: 'Confirmed Date', sortable: true, filterable: true },
            ];
        // }
        // else if (this.state.statusfilter == "0" || this.state.statusfilter == "1" || this.state.statusfilter == "2" || this.state.statusfilter == "3" || this.state.statusfilter == "4") {
        //     header = [
        //         { prop: 'ReqNo', title: 'Req. No.', sortable: true, filterable: true },
        //         { prop: '', filterable: true },
        //         { prop: 'prpname', title: 'PRP Name', sortable: true, filterable: true },
        //         { prop: 'prptopic', title: 'PRP Topic', sortable: true, filterable: true },
        //         { prop: 'place', title: 'Place', sortable: true, filterable: true },
        //         { prop: 'location', title: 'Location', sortable: true, filterable: true },
        //         { prop: 'prpdate', title: 'PRP Date', sortable: true, filterable: true },
        //         { prop: 'reqdate', title: 'Requested Date', sortable: true, filterable: true },
        //         { prop: 'apprdate', title: 'Approved Date', sortable: true, filterable: true },
        //         { prop: 'rejdate', title: 'Rejected Date', sortable: true, filterable: true },
        //         { prop: 'confdate', title: 'Confirmed Date', sortable: true, filterable: true },

        //     ];
        // }


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

        // const body = [
        //     {
        //         ReqNo: 'editimg',
        //         // entry: "View",
        //         // entry: "Edit",
        //         entry: "Enter",
        //         prpname: 'soun(Other Type)',
        //         prptopic: 'Cilacar Webcast',
        //         place: 'K.D.A Hospital',
        //         location: 'Bangalore',
        //         prpdate: '28-Jun-2019',
        //         reqdate: '28-Jun-2019',
        //         apprdate: '28-Jun-2019'
        //     },

        // ];

        var body = []


        {
            this.state.PRPRequestList.length > 0 ? this.state.PRPRequestList.map((list) => {
                let dateFormat = require('dateformat');
                // console.log(list.Pstatus ,"Pstatus")
                // console.log(list.AdvanceRequestedAmount,"Pstatus")

                // const data = <Link to = {"/mrnewentry/" + list.Srno}><div className="prpicon">{this.state.icon} &nbsp; &nbsp;{list.Srno}</div></Link>
                let type = list.Type != "" ? list.Type : " "
                let status = list.Pstatus == "" ? "e" : list.Pstatus
                const text = list.Statusno == "5" || list.Statusno == "9" ? <Link to={{ pathname: "/mrprpexpenseview/" + list.Srno + "/" + type + "/" + status,  EditViewData: { showHideBtn: true } }} ><div>Edit</div></Link> : list.Statusno == "8" &&  list.AdvanceRequestedAmount != "0.00" ? <Link to={{ pathname: "/mrprpexpenseview/" + list.Srno + "/" + type + "/" + status, EditViewData: { showHideBtn: false } }}><div>Enter</div></Link> : list.Statusno == "2" || list.Statusno == "6" || list.Statusno == "7"  ? <Link to={{ pathname: "/ExpenseDeatils/" + list.Srno  }} ><div>View</div></Link> : "-"
                // const icon = list.Statusno == "1"|| list.Statusno == "2"|| list.Statusno == "3"||list.Statusno == "4" || list.Statusno == "5"|| list.Statusno == "6"|| list.Statusno == "7"|| list.Statusno == "8" || list.Statusno == "9" ? <div> <Link to = {{ pathname:"/PrpReqDetails/" + list.Srno }} ><img src="../public/assets/images/blue_eye.svg" /></Link> &nbsp; &nbsp; {list.Srno} </div> : list.Statusno == "0"? <div><Link to = {{ pathname:"/mrnewentry/" + list.Srno + "/" + type, EditViewData:{ showHideBtn: true } }} ><img src="../public/assets/images/editRow.svg" /></Link> &nbsp; &nbsp; {list.Srno}</div>:""
                const icon = list.Statusno == "1" || list.Statusno == "3" ? <div> <Link to={{ pathname: "/PrpReqDetails/" + list.Srno + "/" + type }} ><img src="../public/assets/images/blue_eye.svg" /></Link> &nbsp; &nbsp; {list.Srno} </div> : list.Statusno == "0" ? <div><Link to={{ pathname: "/mrnewentry/" + list.Srno + "/" + type, EditViewData: { showHideBtn: true } }} ><img src="../public/assets/images/editRow.svg" /></Link> &nbsp; &nbsp; {list.Srno}</div> : list.Statusno == "2" || list.Statusno == "4" || list.Statusno == "5" || list.Statusno == "6" || list.Statusno == "7" || list.Statusno == "8" || list.Statusno == "9" ? <div> <Link to={{ pathname: "/PrpReqDetails/" + list.Srno + "/" + type }} ><img src="../public/assets/images/blue_eye.svg" /></Link> &nbsp; &nbsp; {list.Srno} </div> : ""
                // let PRPDate = list.PRPDate == "" ? "" : `${dateFormat(list.PRPDate , "dd-mmm-yyyy")}`
                // let RequestedDate = list.RequestedDate == "" ? "" : `${dateFormat(list.RequestedDate , "dd-mmm-yyyy")}`
                // let ApprovedDate = list.ApprovedDate == "" ? "" : `${dateFormat(list.ApprovedDate , "dd-mmm-yyyy")}`

                body.push({

                    ReqNo: icon,
                    // entry: "View",
                    entry: text,
                    // entry: "Enter",
                    prpname: list.PRPName,
                    prptopic: list.Topic,
                    place: list.Place,
                    location: list.Location ? list.Location : "-",
                    prpdate: <div className="prpreqapprdate">{list.PRPDate ? list.PRPDate : "--"}</div>,
                    reqdate: <div className="prpreqapprdate">{list.RequestedDate}</div>,
                    apprdate: <div className="prpreqapprdate">{list.ApprovedDate ? list.ApprovedDate : "--"}</div>,
                    rejdate: <div className="prpreqapprdate">{list.RejectedDate ? list.RejectedDate : "--"}</div>,
                    confdate: <div className="prpreqapprdate">{list.ConfirmedDate ? list.ConfirmedDate : "--"}</div>,
                })
            }) : null
        }

        // this.state.PRPRequestList.map((item) => {
        //     console.log(item,"item")
        // var ReqNo = <div> <img src="../public/assets/images/editRow.svg" /> &nbsp; &nbsp; {item.Srno} </div>

        //     if (item.ReqNo == "editimg") {
        //         item.ReqNo = ReqNo
        //     }
        // })

        // var View = <Link to=""><div className="exp-view">View</div></Link>
        // body.map((item) => {
        //     if (item.entry == "View") {
        //         item.entry = View
        //     }
        // })

        // var Edit = <Link to=""><div className="exp-view">Edit</div></Link>
        // body.map((item) => {
        //     if (item.entry == "Edit") {
        //         item.entry = Edit
        //     }
        // })

        var Enter = <Link to=""><div className="exp-view">Enter</div></Link>
        body.map((item) => {
            if (item.entry == "Enter") {
                item.entry = Enter
            }
        })



        //     var ReqNo = <div> <img src="../public/assets/images/blue_eye.svg" /> &nbsp; &nbsp; 3564</div>
        //     body.map((item)=>{
        //        if(item.ReqNo == "editimg"){
        //            item.ReqNo = ReqNo
        //        }
        //    })

        return (
            <div>
                {/* {!this.state.PRPRequestList.length ?
                    <div className="">
                        <DashLoader></DashLoader></div>
                    : */}
                    <PrplistBody
                        tableHeader={header}
                        tableBody={body}
                        keyName="userTable"
                        tableClass="striped hover table-responsive"
                        rowsPerPage={10}
                        rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                        initialSort={{ prop: "username", isAscending: true, }}
                        labels={customLabels}
                        PRPRequestList={this.state.PRPRequestList}
                        statusfilter={this.state.statusfilter}
                        filterStatus={this.filterStatus}
                        statusdropdown={this.state.statusdropdown}
                        statusDescription={this.state.statusDescription}
                        monthList={this.state.monthList}
                        filterMonth={this.filterMonth}
                        yearList={this.state.yearList}
                        filterYear={this.filterYear}
                        sYear={this.state.year}
                        sMonth={this.state.month}
                        monthFilter={monthFilter}
                        yearFilter={yearFilter}
                        statusFilter={statusFilter}
                        statusdata= {this.state.statusdata}
                        statuss={statuss}

                    />
                    <Loader show={this.state.showLoader} />
                {/* } */}
            </div>
        )
    }

}

export default PrplistTable