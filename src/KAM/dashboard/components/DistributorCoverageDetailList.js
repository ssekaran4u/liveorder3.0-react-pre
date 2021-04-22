import React,{Component} from 'react'
import DistributorCoverageTable from './DistributorCoverageTable'

class DistributorCoverageDetailList extends Component{

    render(){
        const header = [
           
            { title: 'Distributor Name', prop: 'srno',filterable: true},
            { title: 'Planned  Date', prop: 'realname',filterable: true },
            { title: 'Covered Date', prop: 'realnameuppercase' ,filterable: true },
           
          ];
           
          const body = [
            {
              srno: 'Mahaveer Medi-sales',
              realname: '18-11-19',
              realnameuppercase: '18-11-19',
             
            },
            {
              srno: 'Wellness Pharma',
              realname: '18-11-19',
              realnameuppercase: '18-11-19',
             
            },
            {
              srno: 'Vardhman Pharma',
                realname: '18-11-19',
                realnameuppercase: '18-11-19',
               
              },
              {
                srno: 'Balaji Pharma',
                realname:'18-11-19',
                realnameuppercase:'18-11-19',
               
              },
              {
                srno: 'Vardhman Pharma',
                  realname: '18-11-19',
                  realnameuppercase: '18-11-19',
                 
                },
              
          ];
         
         
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
            <div className="covragetable">
                 <DistributorCoverageTable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    months={this.props.months}
                    // toggleHeader={toggleHeader}
                    // headerColums={headerColums}
                    // getUnselectedColumns={this.getUnselectedColumns}
                />
            </div>
        )
    }
}
export default DistributorCoverageDetailList