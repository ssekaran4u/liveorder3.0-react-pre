import React, { Component } from 'react';
import DownlineTable from './DownlineTable';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router-dom'


class DownlineList extends Component {
    constructor(props){
        super(props)
        this.state={ok:false}
        this.getFilterData = this.getFilterData.bind(this)
        this.redirectDownline = this.redirectDownline.bind(this)
    }
    getFilterData(month,year,fsname,status){
        this.props.getFilterData(month,year,fsname,status)
    }

    componentDidUpdate(pr,st){
        if(st.ok!=this.state.ok){
            
        }
    }
    redirectDownline(code,name,status,month,year,N_Srno){ 


        let cMonth = month < 10 ? '0'+month : month
        let date = cMonth+"/"+"01/"+year
        localStorage.setItem("downMonth",month)
        localStorage.setItem("downYear",year)
        localStorage.setItem("downlineCode",code)
      
        localStorage.setItem("downlineName",name)
       
        localStorage.setItem("downlineStatus",status)
        localStorage.setItem("LDate",date)

        this.setState({ok:!this.state.ok})

      
        this.props.history.push('/downlineview/'+N_Srno +'/'+code+'/'+month +'/'+year)
          
      
    }
    render() {
        const header = [
            { prop: 'action', title: 'Action',filterable: true },
            { prop: 'c_fs_code', title: 'FS Code',filterable: true },
            { prop: 'C_Name', title: 'FS Name',filterable: true,sortable:true },
            { prop: 'N_Srno', title: 'Tour Plan No.',filterable: true,sortable:true },
            { prop: 'mon', title: 'Month',filterable: true },
            { prop: 'N_Year', title: 'Year',filterable: true },
            { prop: 'status', title: 'Status',filterable: true, sortable:true },
              
        ];
        var approvedText= <span className="approvedText">Approved</span>
        var rejectedText= <span className="rejectedText">Rejected</span>
        var pendingText = <span className="pendingText">Pending</span>
        var submittedText = <span className="pendingText">Send For Approval</span>
        var allmonth= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

        this.props.downlianetp ? this.props.downlianetp.map((item) => {
            if(item.N_Month ){
                item.mon = allmonth[item.N_Month-1]
            }
            if(item.c_approved == "A"){
                item.status = approvedText
               // item.action = <Link to={"/downlineview/"+item.c_fs_code}><img src="../public/assets/images/viewRow.svg" /></Link>
                item.action = <img 
                                className="hcursur" 
                                src="../public/assets/images/viewRow.svg" 
                                onClick={()=>this.redirectDownline(item.c_fs_code,item.C_Name,item.c_approved,item.N_Month,item.N_Year,item.N_Srno)}
                            />
            }
            if(   item.c_approved == "E" || item.c_approved == "s" || item.c_approved == "S"){
                item.status = pendingText
                item.action = <img 
                                className="hcursur" 
                                src="../public/assets/images/edit_icon.svg" 
                                onClick={()=>this.redirectDownline(item.c_fs_code,item.C_Name,item.c_approved,item.N_Month,item.N_Year,item.N_Srno)}
                            />
            }

            if(item.c_approved == "r" || item.c_approved == "R" ){
                item.status = rejectedText
                item.action = <img 
                className="hcursur" 
                src="../public/assets/images/viewRow.svg" 
                onClick={()=>this.redirectDownline(item.c_fs_code,item.C_Name,item.c_approved,item.N_Month,item.N_Year,item.N_Srno)}
            />
            }
      
        }): null

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
        return (
            <div className="mtpList">
                <DownlineTable
                    tableHeader={header}
                    tableBody={this.props.downlianetp}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5,10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    getFilterData={this.getFilterData}
                />
            </div>
        );
    }
}

export default withRouter(DownlineList)