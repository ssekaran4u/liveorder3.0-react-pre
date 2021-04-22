import React from 'react'
import { Row, Col, Table, Button, Dropdown,Form } from 'react-bootstrap';
import classNames from 'classnames';
import Datatable from 'react-bs-datatable';
import { sortData, filterData, paginateData } from 'react-bs-datatable/lib/utils/ClassHelpers';
import Pagination from 'react-bs-datatable/lib/Pagination';
import PaginationOpts from 'react-bs-datatable/lib/PaginationOpts';
import TableHeader from 'react-bs-datatable/lib/TableHeader';
import TableBody from 'react-bs-datatable/lib/TableBody';
import Filter from 'react-bs-datatable/lib/Filter';

class MissedMasterTable extends Datatable {
    render() {
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

        const { tableHeader, tableBody, onSort, onFilter, keyName, labels, rowsPerPageOption} = this.props;

        const filteredData = filterData(tableHeader, filterText, onFilter,tableBody);

        const sortedData = sortData(sortedProp, onSort, filteredData);

        const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);

        const tableClass = classNames({
            'table-datatable': true,
            // [`${customClass}`]: true,
        });

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
                       <div className="other-ops">
                        <Dropdown>
                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                <img src="../public/assets/images/export.svg" alt="export_img" />
                                <span>Export</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="export-dropdown">
                                <div className="export-ops">
                                    <div className="text-center">
                                        <img src="../public/assets/images/excel.svg" alt="excel"/>
                                        <p>Excel</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="text-center">
                                        <img src="../public/assets/images/pdf.svg" className="pdf" alt="excel"/>
                                        <p>PDF</p>
                                    </div>
                                    <div className="line"></div>
                                    <div className="text-center">
                                        <img src="../public/assets/images/print.svg" alt="excel"/>
                                        <p>Print</p>
                                    </div>
                                </div>
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

export default MissedMasterTable;