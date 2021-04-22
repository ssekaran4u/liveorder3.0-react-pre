import React from "react";
import { Row, Col, Table, Nav, Collapse, Dropdown, Form } from "react-bootstrap";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Datatable from "react-bs-datatable";
import { sortData, filterData, paginateData } from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import Filter from "react-bs-datatable/lib/Filter";
import { withRouter } from "react-router";
import { connect } from "react-redux";


class SSalesCustomTable extends Datatable {
    constructor(props) {
        super(props)
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
    )(SSalesCustomTable)
);

















