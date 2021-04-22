import React, { Component } from "react";
import ExpenseRequestedTable from './ExpenseRequestedTable';
import {postToServer} from '../../../lib/comm-utils';
import {withRouter} from 'react-router-dom';
import Loader from '../../../lib/Loader'
class ExpenseRequestedList extends Component {
  constructor(props) {
    super(props);
    this.state= {
      monthList:[],
      yearList:[],
      month:new Date().getMonth()+1,
      year:new Date().getFullYear(),
      requestList : [],
      Error : " ",
      showLoader:true,
      }
      this.getMonths = this.getMonths.bind(this)
      this.filterMonth = this.filterMonth.bind(this)
      this.filterYear = this.filterYear.bind(this)
      this.getYears = this.getYears.bind(this)
      this.GetrequestList = this.GetrequestList.bind(this)
      this.viewDetails = this.viewDetails.bind(this)
      this.viewReq = this.viewReq.bind(this)
    }
  componentDidMount() {
    this.GetrequestList()
    this.getMonths()
		this.getYears()
  }
  GetrequestList(month,year){
    let c_month = month ? month : this.state.month
			let c_year = year ? year : this.state.year
			var data = {"Index":"ConfirmationExpenseRequestList",
			"Data":{
				"month":c_month.toString(),
				"year": c_year.toString()
			},
			"Token":""}
			postToServer("Prp",data).then( (Result)=>{ 
					if(Result.data.Status == "Success"){ 
							this.setState({ requestList: Result.data.data, showLoader: false })
					}
				
			}).catch(  (Error)=> {  
			this.setState({ Error: true, Errormsg: "Error in App PRP list API ", showLoader: false })
			})
  }
  getMonths(){
    var months = {"Index":"GetMonth", "Token":""}
    postToServer("Prp",months).then( (Result)=>{ 

       this.setState({ monthList: Result.data })
 
    }).catch(  (Error)=> {  
    this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
    })
}
getYears(){
  var year = {"Index":"GetYear", "Token":""}  
  postToServer("Prp",year).then( (Result)=>{ 

     this.setState({ yearList: Result.data })

  }).catch(  (Error)=> {  
  this.setState({ Error: true, Errormsg: "Error in App PRP list API " })
  })
}
filterMonth(month){ 
  this.setState({
      month:month,
      showLoader : true
  })
  this.GetrequestList(month,this.state.year)
}
filterYear(year){ 
  this.setState({
    year:year,
    showLoader : true
  })
  this.GetrequestList(this.state.month,year)
}
viewDetails(Srno){
  const id = event.target.innerText 
	localStorage.setItem("edit","edit")
  this.props.history.push('/ReqDetails/'+id)
}
viewReq(Srno, Adv, Pstatus){
  if(Adv == 0){
    this.props.history.push('/AdminExpDetail/' +Srno+'?'+Adv)
  }
  else if(Pstatus == "P"){
    this.props.history.push('/AdminExpDetail/' +Srno+'?'+Pstatus)
  }
  else {
    this.props.history.push('/AdminExpDetail/' +Srno)
  }
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
    const header = [
      { prop: 'Srno', title: 'Req.No.', filterable: true, "sortable": true },
      { prop : 'confirmstat', title : 'Exp. Entry', filterable : true, "sortable" : true},
      { prop: 'PrpName', title: 'PRP Name', filterable: true, "sortable": true},
      { prop: 'Topic', title: 'PRP Topic', filterable: true, "sortable": true},
      // { prop: 'Place', title: 'Place', filterable: true , "sortable": true},
      { prop: 'Location', title: 'Location', filterable: true, "sortable": true },
      { prop: 'PRP Date', title: 'PRP Date', filterable: true, "sortable": true },
      { prop: 'Request Date', title: 'Requested Date', filterable: true, "sortable": true },
      { prop: 'Requested By', title: 'Requested By', filterable: true, "sortable": true },
      { prop: 'Status', title: 'Status', filterable: true, "sortable": true },          
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
        this.state.requestList ? 	this.state.requestList.map((item,index) => {
					item.Srno = 
					<span onClick={()=> this.viewDetails(item.Srno)} className="srcDetails">
					  {item.Srno}
					</span>
        item.confirmstat = <span className="srcDetails" onClick={()=> this.viewReq(item.Srno.props.children,item["Advance Requested Amount"], item.Pstatus)}> View/Action</span>
          }) : null
            return (
                <div>        
                <ExpenseRequestedTable
                    tableHeader={header}
                    tableBody={this.state.requestList}
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
                    monthFilter={monthFilter}
                    yearFilter={yearFilter}
                />
                <Loader show={this.state.showLoader} />
                </div>
            );
     
    }
}


export default  withRouter(ExpenseRequestedList);