import React from "react";
import { Row, Col, Table, Nav, Collapse, Dropdown } from "react-bootstrap";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
// import Filter from "react-bs-datatable/lib/Filter";
import Datatable from "react-bs-datatable";

import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";


class DetailedOnGoingOrdersCustomTable extends Datatable {
    render() {
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
            <React.Fragment>
                <div className="table-order-row">
                    <div className="order-pagination">
                        <PaginationOpts
                            labels={labels}
                            onRowsPerPageChange={this.onRowsPerPageChange}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOption={rowsPerPageOption}
                            keyName={keyName}
                        />
                    </div>
                    <div className="order-history-dropdowns">
                        <div className="order-history-dd">
                            <Dropdown className="retailer-month">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="order-history-status-btn">
                                    <span>Distributor:</span> wellness pharmaceuticals pvt ltd&nbsp;&nbsp;
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <div className="search-box">
                                        <input className="order-search-box" type="text" placeholder="Search Distributor" />
                                    </div>
                                    <Dropdown.Item href="#/action-1">
                                        &nbsp;&nbsp;&nbsp;<img className="tick-img" src="../public/assets/images/right check.svg" alt="" />&nbsp;
                                        vardhmaan pharma
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">
                                        &nbsp;&nbsp;&nbsp;<img className="tick-img" src="../public/assets/images/right check.svg" alt="" />&nbsp;
                                        dm pharmaceuticals
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                        &nbsp;&nbsp;&nbsp;<img className="tick-img" src="../public/assets/images/right check.svg" alt="" />&nbsp;
                                        mahaveer medi-sales
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                        &nbsp;&nbsp;&nbsp;<img className="tick-img" src="../public/assets/images/right check.svg" alt="" />&nbsp;
                                        vardhmaan pharma
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="order-history-dd">
                            <Dropdown className="retailer-month">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="order-history-status-btn">
                                    <img src="../public/assets/images/Path_2093.svg" />&nbsp;
                                    All Status&nbsp;&nbsp;
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">
                                        &nbsp;&nbsp;&nbsp;<img className="tick-img" src="../public/assets/images/right check.svg" alt="" />&nbsp;
                                        All
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">
                                        &nbsp;&nbsp;&nbsp;<img className="tick-img" src="../public/assets/images/right check.svg" alt="" />&nbsp;
                                        Received
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">
                                        &nbsp;&nbsp;&nbsp;<img className="tick-img" src="../public/assets/images/right check.svg" alt="" />&nbsp;
                                        Process
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
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
            </React.Fragment>
        );
    }
}


export default DetailedOnGoingOrdersCustomTable;



