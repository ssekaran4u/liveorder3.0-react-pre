import React, { Component } from 'react';
import { Row, Col, Table, Collapse,Button, Dropdown } from "react-bootstrap";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Filter from "react-bs-datatable/lib/Filter";
import Datatable from "react-bs-datatable";
import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";


class DaywiseTourPlanBody extends Datatable {

    

    render() {
        
        const { sortedProp, filterText, rowsPerPage, currentPage ,} = this.state;

        const {
            tableHeader,
            tableBody,
            onSort,
            onFilter,
            keyName,
            labels,
            rowsPerPageOption,



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
                 <div className="dcr-table"> 
                 {/* <div>
                        <h5 className="dcr-list-sec-head" style={{color: '#343A40'}}>
                           Tour Plan For Januvary, 2021 of MR1 (C01004)
                        </h5>
                    </div> */}
                
                    <div className="flex-row">
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

                        

                        <div className="other-ops">
                            <div className="editp-search">
                            <div>
                            <div className="adashboardmenu">
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                <div className="newEntryBtn" >
                                    {/* <Link to="/newTourPlan" className="newEntryTpClass"> */}
                                        <img src="../public/assets/images/edit.svg" />
                                        <span className="kstatus">Edit TP </span>
                                    {/* </Link> */}
                                </div>
                                </Dropdown.Toggle>
                            </Dropdown>
                        </div>
                            </div>
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
                    <Col xs={12} className="datatable table2prp">
                        <div className="table-responsive materialTablePad">
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


export default DaywiseTourPlanBody ;


