import React, { Component } from "react";
import Accounttable from './accountable';
import {postToServer} from '../../../lib/comm-utils';
import Loader from '../../../lib/Loader'
class AccountList extends Component {
    constructor(props) {
        super(props);
        this.state={
            monthList:[],
            yearList:[],
            month:new Date().getMonth()+1,
						year:new Date().getFullYear(),
            AccountList : [],
            showLoader:true,
				}
				this.GetAccountList = this.GetAccountList.bind(this)
				this.getMonths = this.getMonths.bind(this)
				this.filterMonth = this.filterMonth.bind(this)
				this.filterYear = this.filterYear.bind(this)
				this.getYears = this.getYears.bind(this)
    }
    componentDidMount(){
			this.GetAccountList()
			this.getMonths()
			this.getYears()
		}
		GetAccountList(month,year){
			let c_month = month ? month : this.state.month
				let c_year = year ? year : this.state.year
				var data = {"Index":"ConfirmationAccountDetList",
				"Data":{
					"month":c_month.toString(),
					"year": c_year.toString()
				},
				"Token":""}
				postToServer("Prp",data).then( (Result)=>{ 
						if(Result.data.Status == "Success"){ 
								this.setState({ AccountList: Result.data.data, showLoader: false })
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
        showLoader :true
		})
		this.GetAccountList(month,this.state.year)
	}
	filterYear(year){ 
		this.setState({
      year:year,
      showLoader :true
		})
		this.GetAccountList(this.state.month,year)
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
            { prop: 'reqid', title: 'Req.No.', filterable: true, sortable: true },
            {prop: 'fsname', title: 'F.S Name', filterable: true, sortable : true},
            { prop: 'region', title: 'Region', filterable: true, sortable: true},
            // { prop: 'Division', title: 'Division', filterable: true, sortable: true},
            { prop: 'reqamount', title: 'Request(₹)', filterable: true , sortable: true},
            { prop: 'approveamount', title: 'Approve(₹)', filterable: true, sortable: true },
            { prop: 'confirmamount', title: 'Confirm(₹)', filterable: true, sortable: true },
            { prop: 'confirmer', title: 'Confirmator Name', filterable: true, sortable: true },         
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
            return (
                <div>        
                <Accounttable
                    tableHeader={header}
                    tableBody={this.state.AccountList}
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


export default  AccountList;