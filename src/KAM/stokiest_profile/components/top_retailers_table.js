import React, { Component } from "react";
import { Row, Col, Table, Nav, Collapse, Dropdown, Card } from "react-bootstrap";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Datatable from "react-bs-datatable";
import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";

class TopRetailersTable extends Datatable {
    render() {
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

        const {
            tableHeader,
            tableBody,
            onSort,
            onFilter,
            keyName,
            labels,
            // rowsPerPageOption
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

        const topRetailersDropdown = this.props.topRetailersDropdown;

        return (
            <div className="top-retailers-table">
                <Card className="top-retailers-table-card">
                    <div className="top-retailers-table-header">
                        <div className="top-retailers-table-heading">TOP 10 RETAILERS OF MAHAVEER MEDI-SALES</div>
                        <div className="top-retailers-table-dropdown">
                            <div className="top-retailers-dd">
                                <Dropdown className="retailer-numbers">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="retailer-numbers-btn">
                                        Retailer: <span>Top 10</span>
                                </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {topRetailersDropdown!=undefined && topRetailersDropdown.length>0?topRetailersDropdown.map((topRetailersDropdown)=>(
                                        <Dropdown.Item href="#/action-1" key={topRetailersDropdown.Code}>{topRetailersDropdown.Name}</Dropdown.Item>
                                        )):null}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="top-retailers-dd">
                                <Dropdown className="retailer-month">
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="retailer-month-btn">
                                        <span>August</span>
                                </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">May</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">June</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">July</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive analysistableheight">
                    <div className="top-retailers-table-columns">
                        <Table className="tr-table">
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
                                defaultPageSize={7}
                            />
                        </Table>
                    </div>
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
                </Card>
            </div>
        )
    }
}

export default TopRetailersTable;