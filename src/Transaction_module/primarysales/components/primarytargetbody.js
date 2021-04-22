import React from "react";
import { Row, Col, Table, Nav, Collapse, Dropdown, Form } from "react-bootstrap";
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
import Filter from "react-bs-datatable/lib/Filter";



class Primarytargetbody extends Datatable {

    componentDidUpdate(oldprops, oldstate) {
        // console.log("props",oldprops.currentPage,oldstate.currentPage)
        if (oldprops.rowsPerPage != this.state.rowsPerPage) {
            this.props.showpage(this.state.rowsPerPage)
        }
    }

    render() {

        // console.log(this.props.getGrandqty, "getGrandqty")
        // console.log(this.props.getGrandvalue, "getGrandvalue")
        // console.log(this.state.rowsPerPage ,"rowsPerPage")

        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

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
            <React.Fragment>
                <div className="dcr-table">

                    {/* <div className="pl32"> */}
                    <div className="dcr-table-options prmrynotemsg">
                        {/* <div className="pagination-opts">
                            <PaginationOpts
                                labels={labels}
                                onRowsPerPageChange={this.onRowsPerPageChange}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOption={rowsPerPageOption}
                                keyName={keyName}
                            />
                        </div> */}

                        {/* <div className="primary-note-msg"> */}
                        <div className="expense-note-det"> <span  className="prpexpnote">Note:</span>&nbsp;Quantity should not be greater than 4 digits</div>
<div>
                            <div className="other-ops">
                            {this.props.loaditems.length > 0 ?
                                        <button className="remarksubmit" onClick={() => this.props.onClicksave()} >Save</button> : null}
                                <Filter
                                    tableHeader={tableHeader}
                                    onChangeFilter={this.onChangeFilter}
                                    filterText={filterText}
                                    keyName={keyName}
                                    placeholder={labels.filterPlaceholder}
                                />
                                {/* <div className="note-msg">Quantity should not be greater than 9999</div> */}
                            </div>
                            </div>
                        {/* </div> */}
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
                {/* <div className="grand">
                 <div className="grandone">
                <p className="grandtotal">Grand Total</p>
                <p className="grandqty">20</p>
                <p className="grandvalue">100</p></div>
                </div> */}

                <div className="grand">
                    <div className="grand-summary">
                        <div className="grand-summary-rate">
                            <div className="sum-subtotal">
                                <div className="sub-para">Grand Total </div>
                                <div className="rs">{this.props.getGrandqty}</div>
                                <div className="rs">{this.props.getGrandvalue}</div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <div className="pagination-sec">
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
                </div> */}

            </React.Fragment>
        );
    }
}


export default Primarytargetbody;



