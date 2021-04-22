import React from "react";
import { Table, Row, Col, Card } from "react-bootstrap";
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
import Filter from 'react-bs-datatable/lib/Filter';
import "../../public/assets/css/BasicComponents/datatable.css"
import "../../public/assets/css/BasicComponents/basicComponentsResponsive.css"

class SfaDatatable extends Datatable {
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

        // console.log(filteredData.length)

        return (
            <div className={this.props.isFull ? "fullscreenView" : "dwrlocked-first "}>
                <Card className="sfa-common-datatable-card">
                    <div className="sfa-common-datatable">
                        {this.props.mainHeading == true ? <div className="datatable-heading">
                            <div className="text">{this.props.heading}</div>
                            <div className="fullScreen-image">
                                {this.props.isFull ? (
                                    <img src="../public/assets/images/collapse-grey.svg" onClick={this.props.handleView} />) : (
                                        <img src="../public/assets/images/fullscreen.svg" alt="" onClick={this.props.handleView} />)}
                            </div>
                        </div> : null}
                        <div className="sfa-table-order-row">
                            {this.props.pagination == true ?
                                <div className="table-pagination">
                                    <PaginationOpts
                                        labels={labels}
                                        onRowsPerPageChange={this.onRowsPerPageChange}
                                        rowsPerPage={rowsPerPage}
                                        rowsPerPageOption={rowsPerPageOption}
                                        keyName={keyName}
                                    />
                                </div> : null}
                            <div className="table-buttons">
                                <div className="table-options">{this.props.filterOptions}</div>
                                {this.props.searchlist == true ?
                                    <div className="search-bar">
                                        <Filter
                                            tableHeader={tableHeader}
                                            onChangeFilter={this.onChangeFilter}
                                            filterText={filterText}
                                            keyName={keyName}
                                            placeholder={labels.filterPlaceholder}
                                        />
                                    </div> : null}
                            </div>
                        </div>
                        <Row>
                            <Col xs={12} className="datatable">
                                <div className="common-table-responsive">
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
                </Card>
            </div>
        )
    }
}

export default SfaDatatable;