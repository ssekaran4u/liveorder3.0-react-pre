// import React from "react";
// import { Row, Col, Table, Nav,Collapse,Dropdown,Form } from "react-bootstrap";
// import Pagination from "react-bs-datatable/lib/Pagination";
// import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
// import Datatable from "react-bs-datatable";
// import Filter from "react-bs-datatable/lib/Filter";

// import {
//     sortData,
//     filterData,
//     paginateData
// } from "react-bs-datatable/lib/utils/ClassHelpers";
// import TableHeader from "react-bs-datatable/lib/TableHeader";
// import TableBody from "react-bs-datatable/lib/TableBody";
// class DownlineTPData extends Datatable {

    
//     showPopUp(){
//         alert("hello")
//     }
//     render() {
      
//         const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

//         const {
//             tableHeader,
//             tableBody,
//             onSort,
//             onFilter,
//             keyName,
//             labels,
//             rowsPerPageOption
         
           
//         } = this.props;

//         const filteredData = filterData(
//             tableHeader,
//             filterText,
//             onFilter,
//             tableBody
//         );

//         const sortedData = sortData(sortedProp, onSort, filteredData);

//         const paginatedData = paginateData(
//             rowsPerPage,
//             currentPage,
//             sortedData
//         );

//         return (
//             <React.Fragment>
//                     <div className="doctorNameList">
//                         <div className="dcr-head">
//                             <div>
//                                 <h5 className="dcr-list-sec-head">
//                                     Week 1 - 1st Jan 2020, Monday
//                                 </h5>
//                             </div>
//                             <div className="dcr-head-options">
//                                 {this.state.isFull ? (
//                                     <img
//                                         src="../public/assets/images/collapse-grey.svg"
//                                         className="fullscreen_img"
//                                         alt="fullscreen_img"
//                                         onClick={this.handleViewChange}
//                                     />
//                                 ) : (
//                                     <img
//                                         src="../public/assets/images/fullscreen.svg"
//                                         className="fullscreen_img1"
//                                         alt="fullscreen_img"
//                                         onClick={this.handleViewChange}
//                                     />
//                                 )}
//                             </div>  
//                         </div> 
                        
//                         <div className="dcr-table-options">
//                             <div className="pagination-opts">
//                                 <PaginationOpts
//                                     labels={labels}
//                                     onRowsPerPageChange={this.onRowsPerPageChange}
//                                     rowsPerPage={rowsPerPage}
//                                     rowsPerPageOption={rowsPerPageOption}
//                                      keyName={keyName}
//                                 />
//                             </div>
//                             <div className="other-ops">
//                                 <button className="submitPlanButton" style={{borderRadius: "8px", padding: ".5em", letterSpacing: "0.01em",minWidth: "10.5em",outline: "none",borderStyle: "none"}}>Approve</button>
//                                 {/* <div className="buttons">
//                                     <button className="approval-button01">Approve</button>
//                                 </div> */}
//                                 <div className="buttons">
//                                     <button className="del-btn01" > Reject</button>
//                                 </div>
//                                 <Filter
//                                     tableHeader={tableHeader}
//                                     onChangeFilter={this.onChangeFilter}
//                                     filterText={filterText}
//                                     keyName={keyName}
//                                     placeholder={labels.filterPlaceholder}
//                                 />
//                             </div>
//                         </div>     
                        
                            
            
//                     </div>
                    
//                     <Row>
//                         <Col xs={12} className="datatable">
//                             <div className="table-responsive analysistableheight">
//                                 <Table>
//                                     <TableHeader
//                                         tableHeader={tableHeader}
//                                         keyName={keyName}
//                                         onSortChange={this.onSortChange}
//                                         sortedProp={sortedProp}
                                    
//                                     />
//                                     <TableBody
//                                         tableHeader={tableHeader}
//                                         keyName={keyName}
//                                         labels={labels}
//                                         paginatedData={paginatedData}
//                                     />
//                                 </Table>
//                             </div>
                            
//                         </Col>
//                     </Row>
                    
//                     <div className="pagination-sec">
//                         <div className="current-entries">
//                             Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
//                             {(currentPage - 1) * rowsPerPage + paginatedData.length}{" "}
//                             of {filteredData.length} entries
//                         </div>
//                         <Pagination
//                             data={sortedData}
//                             rowsPerPage={rowsPerPage}
//                             keyName={keyName}
//                             currentPage={currentPage}
//                             onPageNavigate={this.onPageNavigate}
//                             labels={labels}
//                         />
//                     </div>

                    
//                  {/* </div>  */}
                
            
//             </React.Fragment>
//         );
//     }
// }

// export default DownlineTPData;