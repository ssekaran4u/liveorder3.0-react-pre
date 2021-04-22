import React from 'react'
import { Row, Col, Table, Dropdown,Form } from 'react-bootstrap';
import Datatable from 'react-bs-datatable';
import { sortData, filterData, paginateData } from 'react-bs-datatable/lib/utils/ClassHelpers';
import Pagination from 'react-bs-datatable/lib/Pagination';
import PaginationOpts from 'react-bs-datatable/lib/PaginationOpts';
import TableHeader from 'react-bs-datatable/lib/TableHeader';
import TableBody from 'react-bs-datatable/lib/TableBody';


class ChemistMasterTable extends Datatable {
    render() {
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

        const { tableHeader, tableBody, onSort, onFilter, keyName, labels, rowsPerPageOption} = this.props;

        const filteredData = filterData(tableHeader, filterText, onFilter,tableBody);

        const sortedData = sortData(sortedProp, onSort, filteredData);

        const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);

        return (
            <div>
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
               
                </div>
                <Row>
                    <Col xs={12} className="datatable">
                        <div className="table-responsive">
                            <Table>
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
                        Showing {(currentPage - 1) * rowsPerPage + 1} to{" "} {(currentPage - 1) * rowsPerPage + paginatedData.length} of {filteredData.length} entries
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

export default ChemistMasterTable;