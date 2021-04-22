import React from "react";
import { Row, Col, Table, Nav,Collapse,Dropdown,Form } from "react-bootstrap";
//import Pagination from "react-bs-datatable/lib/Pagination";
//import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Datatable from "react-bs-datatable";
import Filter from "react-bs-datatable/lib/Filter";

import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
class DoctorNameTable extends Datatable {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         isFull : false
    //     }
    //     this.handleView = this.handleView.bind(this);
    // }
    //   handleView(){
    //     this.setState({
    //         isFull: !this.state.isFull
    //     }); 
    // }
    //  onRowClick(row) {
    //     alert(`You clicked on the row ${JSON.stringify(row)}`);
    //   }
      
    //   onPageNavigate(){
    //     alert('okoko')
    // }

//     componentDidUpdate(propss,olsstate){

//         if(propss.tableBody != this.props.tableBody){
//             alert('okoko changed')
//         }
       

    
//      console.log(olsstate,propss,this.state,this.props,'okoko')
      
//         if(this.state.currentPage != olsstate.currentPage)
//         {
//             alert(this.state.currentPage+'currentPage')
//             sessionStorage.setItem("currentPage",this.state.currentPage )
//   //alert("KUNAL SINHA")
//         }

//         if(this.state.rowsPerPage != olsstate.rowsPerPage)
//         {
//            alert('okok'+rowsPerPage)
           
//             // sessionStorage.setItem("rowsPerPage",this.state.rowsPerPage )
//         }
//         // console.log(this.state,'kunalsinha',olsstate)
//     }




    
componentDidMount(){

   // alert('okok')

    sessionStorage.setItem("rowsPerPage","10")
    sessionStorage.setItem("currentPage","1")
    //Hope you are doing well 
  // alert('kunal sinha')
}


    render() {
        const { sortedProp, filterText ,rowsPerPage,currentPage,nextPage,nextProp,onPaginate } = this.state;
    
        const {
            tableHeader,
            tableBody,
            onSort,
            onFilter,
            keyName,
            labels,
            rowsPerPageOption
         
           
        } = this.props;

        const filteredData = filterData(
            tableHeader,
            filterText,
            onFilter,
            tableBody
        );

        const sortedData = sortData(sortedProp, onSort, filteredData);

        const paginatedData = paginateData(
            rowsPerPage,
            currentPage,
            sortedData
        );
       // alert(currentPage +'row'+rowsPerPage )
        return (
            <React.Fragment>
                    <div className="dcr-table-options docheader">
                            {/* <div className="pagination-opts">
                                <PaginationOpts
                                    labels={labels}
                                    onRowsPerPageChange={this.onRowsPerPageChange}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOption={rowsPerPageOption}
                                     keyName={keyName}
                                   
                                     onRowsPerPageChange={(p)=>{ alert('ok') }}
                                     onPaginate={(p)=>{ alert('ok') }}
                                    //  onPaginate={(p)=>{ alert('ok') }}
                                     

                                     
                                    
                                /> 
                            </div>
                             */}
                            
                            <div className="other-ops pb24">
                                
                                <button  onClick={this.props.onclickData} className="submitPlanButton">SUBMIT PLAN</button>
                                <Filter
                                    tableHeader={tableHeader}
                                    onChangeFilter={this.onChangeFilter}
                                    filterText={filterText}
                                    keyName={keyName}
                                    placeholder={labels.filterPlaceholder}
                                   
                                />
                            </div>
                        </div>     
                        
                            
            
                    
                    
                    <Row>
                        <Col xs={12} className="datatable">
                            <div className="table-responsive analysistableheight">
                                <Table   
                                 
                                 paginationButton={false}
                               
                                  >
                                    <TableHeader
                                        tableHeader={tableHeader}
                                        keyName={keyName}
                                        onSortChange={this.onSortChange}
                                        sortedProp={sortedProp}
                                     
                                       
                                        // rowsPerPage={(ab)=>{ alert('ab') }}
                                       // paginationButton={false}

                                     




                                    />
                                    <TableBody
                                       paginationButton={false}
                                        tableHeader={tableHeader}
                                        keyName={keyName}
                                        labels={labels}
                                        paginatedData={paginatedData}
                                       
                                    
                                    />
                                </Table>
                            </div>
                            
                        </Col>
                    </Row> 
                    
                    <div className="pagination-sec">
                        <div className="current-entries">
                            Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                            {(currentPage - 1) * rowsPerPage + paginatedData.length}{" "}
                            of {filteredData.length} entries
                        </div>
                        {/* <Pagination
                            data={sortedData}
                            rowsPerPage={rowsPerPage}
                            keyName={keyName}
                            currentPage={currentPage}
                            onPageNavigate={this.onPageNavigate}
                            labels={labels}
                          
                        /> */}
                    </div>

                    
                 {/* </div>  */}
                
            
            </React.Fragment>
        );
    }
}

export default DoctorNameTable;
	
	
	
