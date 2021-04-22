import React from "react";
import { Row, Col, Table, Nav, Collapse, Dropdown, Form } from "react-bootstrap";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Datatable from "react-bs-datatable";
import { sortData, filterData, paginateData } from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import Filter from "react-bs-datatable/lib/Filter";
import Filters from "../../components/Filters"
import { withRouter } from "react-router";
import { connect } from "react-redux";

class AdminCustomTable extends Datatable {
    constructor(props) {
        super(props)
        this.getFilterData = this.getFilterData.bind(this)
        this.filterStatusText = this.filterStatusText.bind(this)
    }
    getFilterData(list) {
        this.props.getFilterData(list)
    }
    filterStatusText(list) {
        this.props.filterStatusText(list)
    }
    render() {
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;
        const {
            tableHeader,
            tableBody,
            onSort,
            onFilter,
            keyName,
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

        return (
            <React.Fragment>
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
                            </div>
                            <div className="other-ops">
                                <Dropdown className="myDropdown">
                                    <Dropdown.Toggle className="dcr-options" id="dropdown-basic" style={{ backgroundColor: "white", color: '#6c757d', border: "1px solid #dfdfdf", fontSize: "0.875em", borderRadius: "10px", padding: "8px 12px" }}>
                                        <img src="../public/assets/images/filtering.svg" />
                                        <span> Filter by Status</span>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="" >
                                            <div className="filterStatus-dropdown">
                                                {this.props.status ? this.props.status.map((item, index) => (
                                                    <div key={index} className="filter-status" onClick={() => this.filterStatusText(item.Code)} >
                                                        <span>{item.Name}</span>
                                                    </div>
                                                )) : null}
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
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
                    </Collapse>
                </div>
                <Row>
                    <Col xs={12} className="datatable table2">
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
                    <div className="warning-msg">Confirmation list is displaying last 3 months details only!</div>
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
const mapStateToProps = state => ({
    toggleHeader: state.DCRList.toggleHeader
});
export default withRouter(
    connect(
        mapStateToProps,
        null
    )(AdminCustomTable)
);

















