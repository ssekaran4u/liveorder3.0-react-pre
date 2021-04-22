
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
import {convert} from '../../lib/comm-utils'
class PendingDoctorList extends Datatable {
    constructor(props) {
        super(props);
        
    }
    handleSelect(range){ 
        const startdate = convert(range.startDate._d);
        const enddate = convert(range.endDate._d);
    //    // this.props.filterDate(startdate,enddate)
        this.props.typeselection(startdate,enddate)
    }
   
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
 
    const paginatedData = paginateData(tableHeader.length, currentPage, sortedData);
  
    return (
        <div>
            <div className=" ">  
                <div></div>
                    <div className="flex-row requestDropList">
                        {/* <div className="padleft24">
                            <div className="pagination-opts">
                                <PaginationOpts
                                    labels={labels}
                                    onRowsPerPageChange={this.onRowsPerPageChange}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOption={rowsPerPageOption}
                                    keyName={keyName}
                                />
                            </div>
                        </div> */}
                        <div className="pl32">
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
                        <div className="flexDisplay">
                        {/* <div>
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                <div className="confirmSelectBtn">
                                    <span className="confirmText">Confirm All Selected</span>
                                </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>    
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" ></div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>                
                        </div> */}
                        
                        <div>
                            <Dropdown className="menuDrop ">
                                <Dropdown.Toggle className="datepickerDrop" variant="success" id="dropdown-basic">
                                    <div className="filtersBtn">
                                        <img src="../public/assets/images/calendar_gray.svg" alt="column_img" className="dateimgPad"/>
                                        <span>dd/mm/yyyy To dd/mm/yyyy</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <div>
                                        <div className="datepickerDropMenu" >
                                            <DateRange onChange={this.handleSelect.bind(this)} />
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                 
                        </div>
                        <div className="other-ops admindas">
                            <Filter
                                tableHeader={tableHeader}
                                onChangeFilter={this.onChangeFilter}
                                filterText={filterText}
                                keyName={keyName}
                                placeholder={labels.filterPlaceholder}
                            />
                        </div>
                        
                        </div>
                    </div>
               </div>
                
               <Row>
                    <Col xs={12} className="datatable pendingTableScroll">
                        <div className="table-responsive tooltipOverflow fixedheader">
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
export default PendingDoctorList