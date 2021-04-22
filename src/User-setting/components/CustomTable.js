import React from "react";
import { Row, Col, Table, Dropdown, Collapse } from "react-bootstrap";
import Datatable from "react-bs-datatable";

import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import Filter from "react-bs-datatable/lib/Filter";

// import ColumnOption from "./ColumnOption";
// import ExportDropdown from "./ExportDropdown";
// import RetrivalOption from "./RetrivalOption";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
class CustomTable extends Datatable {
    constructor(props) {
        super(props);

    }

    render() {
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

        const {
            tableHeader,
            tableBody,
            onSort,
            onFilter,
            keyName,
            keyName1,
            labels,
            rowsPerPageOption,
            headerColums
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
        const paginatedData1 = paginateData(this.props.tableBody.length, currentPage, sortedData);

        return (
            <div className="dcr-table">
                <Collapse in={this.props.toggleHeader}>
                    <div className="dcr-table-options">
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
                        <div className="other-ops">
                            {this.props.type == "activation" ?
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="dcr-options"
                                    id="dropdown-basic"
                                >
                                    <img
                                        src="../public/assets/images/columns.svg"
                                        alt="export_img"
                                    />
                                    <span>Column option</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="column-dropdown">
                                    {/* <ColumnOption
                                        headerColums={headerColums}
                                        getUnselectedColumns={
                                            this.props.getUnselectedColumns
                                        }
                                    /> */}
                                </Dropdown.Menu>
                            </Dropdown>:''}
                            {this.props.type == "activation" ?
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="dcr-options"
                                    id="dropdown-basic"
                                >
                                    <img
                                        src="../public/assets/images/filter.svg"
                                        alt="filter_img"
                                    />
                                    <span>Filter Option</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="others-dropdown">
                                    {/* <RetrivalOption /> */}
                                </Dropdown.Menu>
                            </Dropdown>:''}
                            <Filter
                                tableHeader={tableHeader}
                                onChangeFilter={this.onChangeFilter}
                                filterText={filterText}
                                keyName={keyName}
                                placeholder={labels.filterPlaceholder}
                            />
                        </div>
                    </div>
                </Collapse>
                <Row>
                    <Col xs={12} className="datatable">
                        <div className="table-responsive dcrtableheight">
                            {/* <Table     
                            // onDoubleClick={this.DcrEdit}
                              >
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
                                  tableHeader={tableHeader}
                                  keyName={keyName1}
                                  sortedProp={sortedProp}
                                  onSortChange={this.onSortChange}
                                />
                                <TableBody
                                tableHeader={tableHeader}
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

const mapStateToProps = state => ({
    toggleHeader: state.DCRList.toggleHeader
});

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(CustomTable)
);
