import React, { Component } from 'react';
import { Row, Col, Table, Button, Nav,Collapse,Dropdown } from "react-bootstrap";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Filter from "react-bs-datatable/lib/Filter";
import Datatable from "react-bs-datatable";
import { DateRange } from 'react-date-range';
import { Link } from 'react-router-dom';
import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import {withRouter} from 'react-router-dom'

class MtpTable extends Datatable {
    redirectMtp(mtpdate){
        localStorage.setItem("mtpdate",mtpdate)
        this.props.history.push('/newTourPlan')
    }
    render() {console.log("ddd",this.props.mtpdate)
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

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
        return (
            <div>
                
               
                <div className="flex-row pt20">
                    <div className="pl32">
                        <div className="pagination-opts">
                            <PaginationOpts
                                labels={labels}
                                onRowsPerPageChange={this.onRowsPerPageChange}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOption={rowsPerPageOption}
                                keyName={keyName}
                            />
                        </div>
                    </div>
                    <div className="flexDisplay requestDropList ">
                   
                    <div className="informationIndicators">
                            <div><img src="../public/assets/images/pendingCircle.svg" /><span>Pending</span></div>
                            <div><img src="../public/assets/images/approvedCircle.svg" /><span>Approved</span></div>
                            <div><img src="../public/assets/images/rejectedCircle.svg" /><span>Rejected</span></div>
                        </div>
                        <div className="adashboardmenu">
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                <div className="newEntryBtn" onClick={()=>this.redirectMtp(this.props.mtpDate)}>
                                    {/* <Link to="/newTourPlan" className="newEntryTpClass"> */}
                                        <img src="../public/assets/images/edit.svg" />
                                        <span className="kstatus">New TP Entry</span>
                                    {/* </Link> */}
                                </div>
                                </Dropdown.Toggle>
                            </Dropdown>
                        </div>
                        <div className="other-ops mr10">
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
                  
                <Row>
                    <Col xs={12} className="datatable">
                        <div className="table-responsive analysistableheight">
                            <Table>
                                <TableHeader
                                    tableHeader={tableHeader}
                                    keyName={keyName}
                                    onSortChange={this.onSortChange}
                                    sortedProp={sortedProp}
                                   
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

export default withRouter(MtpTable)