
import React from "react";
import { Row, Col, Table, Dropdown, Nav } from "react-bootstrap";
import Datatable from 'react-bs-datatable';
import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import Filter from 'react-bs-datatable/lib/Filter';
import { DateRange } from 'react-date-range';
 
class DWRPendingUnlockTable extends Datatable {

    
    render() { 
    const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;
    const {
      tableHeader,
      tableBody,
      onSort,
      onFilter,
      tableClass: customClass,
      keyName,
      labels,
      rowsPerPageOption,
      activeTab
    } = this.props;
 
    const filteredData = filterData(tableHeader, filterText, onFilter, tableBody);
    const sortedData = sortData(sortedProp, onSort, filteredData);
    const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);
    
    
    return (
        <div>
            
              
        <Row>
            <Col xs={12} className="datatable  ">
                <div className="table-responsive pendingtablescroll unlocktableheight">
                    <Table  className="AdashboardTable">
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
        <div className="unlockListPad">
            <div className="pagination-sec paginationPad">
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
        </div>
   
    );
  }
}
export default DWRPendingUnlockTable