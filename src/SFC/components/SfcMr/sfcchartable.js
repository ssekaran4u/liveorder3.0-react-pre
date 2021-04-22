
import React from 'react'
import { Row, Col, Table,Dropdown } from "react-bootstrap";
import Datatable from "react-bs-datatable";

import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Pagination from "react-bs-datatable/lib/Pagination";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import Filter from "react-bs-datatable/lib/Filter";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import StatusPopup from './../../../lib/StatusPopup'
class Sfchartable extends Datatable{

    showsubmit(data2){
        debugger
        this.props.showsubmit(data2)
    }
    componentDidUpdate(oldprops,oldstate){ //console.log("props",oldprops.currentPage,oldstate.currentPage)
    if(oldprops.rowsPerPage != this.state.rowsPerPage){
        this.props.showpage(this.state.rowsPerPage)
    }
    // if(oldstate.currentPage != this.props.currentPage){ console.log("numbers",this.props.currentPage,oldstate.currentPage)
    //     this.props.showCurrentpage(oldstate.currentPage)
    // }
       
    }
    
    render() { 
        
         
        const { sortedProp, filterText, rowsPerPage,currentPage } = this.state;

        const {
            tableHeader,
            tableBody,
            onSort,
            onFilter,
            keyName,
            keyName1,
            labels,
            rowsPerPageOption,
            tableHeader1,
            tableBody1,
            tableHeader2
        } = this.props;

        const filteredData = filterData(
            tableHeader,
            filterText,
            onFilter,
            tableBody
        );
        const filteredData1 = filterData(
            tableHeader,
            filterText,
            onFilter,
            tableBody1
        );

        const sortedData = sortData(sortedProp, onSort, filteredData);
        const sortedData1 = sortData(sortedProp, onSort, filteredData1);


        const paginatedData = paginateData(
            rowsPerPage,
            currentPage,
            sortedData
        );

        // const paginatedData1 = paginateData(
        //     rowsPerPage,
        //     currentPage,
        //     sortedData1
        // );
        const paginatedData1 = paginateData(this.props.tableBody.length, currentPage, sortedData);
        
            //console.log("status",this.props.exportStatus)
        return (
            <div className="dcr-table">
                    <div className="dcr-table-optionsfc">
                    <div className="pagination-opts">
                            <PaginationOpts
                                labels={labels}
                                onRowsPerPageChange={this.onRowsPerPageChange}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOption={rowsPerPageOption}
                                keyName={keyName}
                            />
                             <div className="hidetable">
                            <PaginationOpts
                                labels={labels}
                                onRowsPerPageChange={this.onRowsPerPageChange}
                                rowsPerPage={this.props.tableBody.length}
                                rowsPerPageOption={this.props.tableBody.length}
                                keyName={keyName1}
                            />
                        </div>
                        </div>

                        <div className="sfcfullimg">
                            {this.props.SFCLOCKED==false ?  <div className="submitchart"><button onClick={()=>this.showsubmit(true)}className="submitchartbtn">Submit Chart</button></div> :null}
                               {/* <div><button className="exportbtn"><img className="exportimage" src="../public/assets/images/export.png"/>Export</button></div>  */}
                                    <div className="other-ops">
                                       
                                        <Dropdown>
                                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                                <img src="../public/assets/images/export.svg" alt="export_img" />
                                                <span>Export</span>
                                            </Dropdown.Toggle>
                                            {this.props.exportStatus == true ? 
                                                <Dropdown.Menu className="export-dropdown">
                                                    <div className="red-clr error-msg errorPad">You can't export in edit mode</div>
                                                </Dropdown.Menu>
                                            :  this.props.tableBody != "" ?  
                                                <Dropdown.Menu className="export-dropdown">
                                                    <div className="dcrlistexport export-ops">
                                                        <div>
                                                            <img src="../public/assets/images/excel.svg" alt="excel" />
                                                            <ReactHTMLTableToExcel
                                                                id="test-table-xls-button"
                                                                className="download-table-xls-button"
                                                                table="table-to-xls"
                                                                filename="tablexls"
                                                                sheet="tablexls"
                                                                buttonText="Excel"
                                                            />
                                                        </div>
                                                    </div>
                                                </Dropdown.Menu>:
                                                  <Dropdown.Menu className="export-dropdown">
                                                  <div className="red-clr error-msg errorPad">No Data</div>
                                              </Dropdown.Menu>}
                                            
                                        </Dropdown>
                                        <Filter
                                            tableHeader={tableHeader}
                                            onChangeFilter={this.onChangeFilter}
                                            filterText={filterText}
                                            keyName={keyName}
                                            placeholder={labels.filterPlaceholder}
                                        />
                                </div>
                        </div>
                        
                        </div>
                          
                          <div className="datadropdowntable">
                          <Row>
                         <Col xs={12} className="datatablesfc">
                        <div className="table-responsive dcrtableheight">
                            
                            {/* <Table  id="hidetable">
                                <TableHeader 
                                  tableHeader={tableHeader}
                                  keyName={keyName}
                                  sortedProp={sortedProp}
                                  onSortChange={this.onSortChange}
                                />
                                <TableBody
                                tableHeader={tableHeader}
                                keyName={keyName}
                                labels={labels}
                                paginatedData={paginatedData}
                                />
                            </Table> */}
                            <Table  id="table-to-xls" className="hidetable">
                                <TableHeader 
                                  tableHeader={tableHeader2}
                                  keyName={keyName1}
                                  sortedProp={sortedProp}
                                  onSortChange={this.onSortChange}
                                />
                                <TableBody
                                tableHeader={tableHeader2}
                                keyName={keyName1}
                                labels={labels}
                                paginatedData={paginatedData1}
                                />
                            </Table>
                            <Table  id="hidetable">
                                <TableHeader 
                                  tableHeader={tableHeader}
                                  keyName={keyName}
                                  sortedProp={sortedProp}
                                  onSortChange={this.onSortChange}
                                />
                                <TableBody
                                tableHeader={tableHeader}
                                keyName={keyName}
                                labels={labels}
                                paginatedData={paginatedData}
                                />
                            </Table>
                        </div>
                    </Col>
                </Row>
                          </div>
            
                <div className="pagination-sec">
                    <div className="current-entries">
                        Showing {(currentPage - 1) * rowsPerPage + 1} to{" "}
                        {(currentPage - 1) * rowsPerPage + paginatedData.length}{" "}
                        of {filteredData.length} entries
                    </div>
                    <Pagination
                        data={sortedData}
                        rowsPerPage={rowsPerPage}
                        keyName={keyName}
                        currentPage={currentPage}
                        onPageNavigate={this.onPageNavigate}
                        labels={labels}
                    />
                </div>
            </div>
        );
    }
}

export default Sfchartable