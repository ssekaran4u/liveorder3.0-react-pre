import React, { Component } from "react";
import ConfirmedTable from './ConfirmedTable'
import {postToServer} from '../../lib/comm-utils';
import {withRouter} from 'react-router-dom';
import Loader from '../../lib/Loader'
class ConfirmedList extends Component {
    constructor(props) {
      super(props);
        this.state={
          monthList:[],
          yearList:[],
          month:new Date().getMonth()+1,
					year:new Date().getFullYear(),
					approvedList : [],
					Error : " ",
          statusfilter : "0",
						statusdata:"0",
          statusdropdown : [
            {
              "statuscode" : "1",
              "statustext" : "Confirmed"
            },
            {
              "statuscode" : "2",
              "statustext" : "Rejected"
						},
						{
							"statuscode" : "3",
							"statustext" : "Hold"
            },
            // {
						// 	"statuscode" : "0",
						// 	"statustext" : "All"
						// }
        	],
        statusDescription : "Confirmed",
        showLoader:true,
				}
				this.getapprovedList = this.getapprovedList.bind(this);
        this.getMonths = this.getMonths.bind(this);
        this.filterMonth = this.filterMonth.bind(this);
        this.getYears = this.getYears.bind(this);
	    	this.filterYear = this.filterYear.bind(this);
				this.filterStatus = this.filterStatus.bind(this);
				this.viewRequest = this.viewRequest.bind(this)
    }
    componentDidMount(){
        this.getMonths()
        this.getYears()
       this.getapprovedList()
    }
    getapprovedList(month, year, statuscode ){
      let c_month = month ? month : this.state.month
      let c_year = year ? year : this.state.year
      let status_Filter = this.state.statusfilter
      let statuss = ""
			if(statuscode == "0"){
					statuss = "0"
			}else{
					statuss = statuscode
			}
			let c_status = statuss ? statuss : this.state.statusdata
      let data = {
           "Index":"AdminConfirmedorRejectdorHold",
           "Data":{"month": c_month.toString(),
                    "year": c_year.toString(),
                    "statusfilter": c_status
                   },
                  "Token":""
        					}
        postToServer("Prp", data).then((Result) => {
           if(Result.data.Status == "Success"){
               this.setState({approvedList:Result.data.data, showLoader: false })
           }
        }).catch( (Error) => {
           this.setState({ Error: true, Errormsg: "Error in App Prp List API",showLoader: false  })
        })
    }
    getMonths(){
      var months = {"Index":"GetMonth", "Token":""}
      postToServer("Prp", months).then((Result) =>{
          this.setState({monthList: Result.data})
      }).catch( (Error) => {
          this.setState({Error : true, Errormsg : "Error in App Prp List API"})
        })
      }
      getYears(){
        var years = {"Index":"GetYear", "Token":""}
          postToServer("Prp", years).then((Result) =>{
              this.setState({yearList: Result.data})
           }).catch( (Error) => {
               this.setState({Error : true, Errormsg : "Error in App Prp List API"})
           })
        }
      filterMonth(month){
        this.setState({
          month:month,
          showLoader : true
        })
        this.getapprovedList(month,this.state.year)
   			}
   filterYear(year){ 
       this.setState({
          year:year,
          showLoader : true
       })
       this.getapprovedList(this.state.month,year)
   			}
   filterStatus(statuscode){
     this.setState({ showLoader : true})
    this.getapprovedList(this.state.month, this.state.year,statuscode)
//        if(statuscode ===  "1") {
//            this.setState({ statusfilter: "1", statusDescription : "Confirmed"}, () => {
//                this.getapprovedList(this.state.month, this.state.year, this.state.statusfilter)
//         });
//    		}
//    if(statuscode ===  "2") {
//        this.setState({ statusfilter: "2", statusDescription : "Rejected"}, () => {
//            this.getapprovedList(this.state.month, this.state.year, this.state.statusfilter)
//     });
// 		}
// if(statuscode ===  "3") {
// 	this.setState({ statusfilter: "3", statusDescription : "Hold"}, () => {
// 			this.getapprovedList(this.state.month, this.state.year, this.state.statusfilter)
// 		});
//   }
//   if(statuscode ===  "0") {
//     this.setState({ statusfilter: "0", statusDescription : "All"}, () => {
//         this.getapprovedList(this.state.month, this.state.year, this.state.statusfilter)
//       });
//     }
}
viewRequest(Srno){
   const id = event.target.innerText 
   localStorage.setItem("edit","edit")
   this.props.history.push('/ReqDetails/'+id)
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
        key: '0',
        text: 'All',
        value: '0',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
        key: '1',
        text: 'Confirmed',
        value: '1',
        image: { avatar: true, src: '../public/assets/images/right.svg' },
      },
      {
          key: '2',
          text: 'Rejected',
          value: '2',
          image: { avatar: true, src: '../public/assets/images/right.svg' },
        },
        {
         key: '3',
         text: 'Hold',
         value: '3',
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
       const header = [
            { prop: 'Srno', title: 'Req.No.', filterable: true, sortable: true },
            { prop: 'PRP NAME', title: 'PRP Name', filterable: true, sortable: true},
            { prop: 'Topic', title: 'PRP Topic', filterable: true, sortable: true},
            // { prop: 'Place', title: 'Place', filterable: true , sortable: true},
            { prop: 'Location', title: 'Location', filterable: true, sortable: true },
            { prop: 'PRP Date', title: 'PRP Date', filterable: true, sortable: true },
						{ prop: 'Request Date', title: 'Requested Date', filterable: true, sortable: true },
            { prop: 'Requested By', title: 'Requested By', filterable: true, sortable: true },
            {prop : 'Approved Date' , title : 'Approved Date' , filterable: true, sortable : true},
            {prop : 'Approver Name' , title : 'Approver Name' , filterable: true, sortable : true},
            // {prop : 'Division' , title : 'Division' , filterable: true, sortable : true},
            {prop : 'FS HQ' , title : 'FS HQ' , filterable: true, sortable : true},
            {prop : 'Region' , title : 'Region' , filterable: true, sortable : true},
            {prop : 'Status' , title : 'Status' , filterable: true, sortable : true}, 
        ];
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
				this.state.approvedList ? 	this.state.approvedList.map((item,index) => {
					item.Srno = <div>
					<span onClick={()=> this.viewRequest(item.Srno)} className="srcDetails">
					  {item.Srno}
					</span>
				</div>
					}) : null
            return (
                <div>        
                <ConfirmedTable
                    tableHeader={header}
                    tableBody={this.state.approvedList}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    monthList={this.state.monthList}
                    yearList={this.state.yearList}
                    filterMonth={this.filterMonth}
										filterYear={this.filterYear}
										sYear={this.state.year}
										sMonth={this.state.month}
										statusfilter = {this.state.statusfilter}
										filterStatus={this.filterStatus}
										statusdropdown = {this.state.statusdropdown}
                    statusDescription = {this.state.statusDescription}
                    monthFilter={monthFilter}
                    yearFilter={yearFilter}
                    statusFilter={statusFilter}
                    statusdata= {this.state.statusdata}
                    statuss={statuss}
                />
                <Loader show={this.state.showLoader} />
                </div>
            );    
    }
}
export default 	withRouter(ConfirmedList);