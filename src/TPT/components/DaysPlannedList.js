import React, { Component } from 'react';
import DaysPlannedTable from './DaysPlannedTable';
// import "../../../public/assets/css/tptStyle.css";

class DaysPlannedList extends Component {
    render() {
        // const header = [
        //     { prop: 'category', title: 'Category',filterable: true },
        //     { prop: 'headquarters', title: 'Headquarters (HQ)',filterable: true },
        //     { prop: 'exstation', title: 'Ex-Station (EX.)',filterable: true },
        //     { prop: 'outstation', title: 'outstation (OS)',filterable: true },
        //     { prop: 'others', title: 'Others (OT)',filterable: true }
            
              
        // ];
        // const header = [{prop:'Category',title:'Category'}]
        // let body = []
        // let dayplan ={}
        // dayplan["Category"] = <div className="boldV">Days</div>
        // {this.props.days ? this.props.days.map((item) =>{

        //     header.push({
        //         prop:item.Type,
        //         title:item.Type
        //     })
        //     dayplan[item.Type] = item.Visit
        // }):null}
        // body.push(dayplan)  
        
      
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
        

        return(
            <div className="">
                
                <DaysPlannedTable
                    tableHeader={this.props.header}
                    tableBody={this.props.body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                />
            </div>
        )
    }
}


export default DaysPlannedList;