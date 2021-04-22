import React from "react";
import { Row, Col, Table,Dropdown } from "react-bootstrap";
import Datatable from 'react-bs-datatable';
import { sortData, filterData, paginateData } from 'react-bs-datatable/lib/utils/ClassHelpers';
import Pagination from 'react-bs-datatable/lib/Pagination';
import PaginationOpts from 'react-bs-datatable/lib/PaginationOpts';
import TableHeader from 'react-bs-datatable/lib/TableHeader';
import TableBody from 'react-bs-datatable/lib/TableBody';
import Filter from 'react-bs-datatable/lib/Filter';
import { DateRange } from 'react-date-range';
import {convert} from '../../../lib/comm-utils'
class LeaveStatusCustomTable extends Datatable {

    handleSelect(range){ 
        const startdate = convert(range.startDate._d);
        const enddate = convert(range.endDate._d);
        this.props.getDates(startdate,enddate)
    }
   
    handlerequestStatus(e,code){ 
      
        this.props.getreqTypeFilter(code)
      
     }
    render() {

        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

        const { tableHeader, tableBody, onSort, onFilter, keyName, labels, rowsPerPageOption} = this.props


        const filteredData = filterData(tableHeader, filterText, onFilter, tableBody);

        const sortedData = sortData(sortedProp, onSort, filteredData);

        const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);


        // ===============================================================================================================
      

        return (
            <div>
                <div className="flex-row">
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
                    <div className="flexDisplay requestDropList">
                        <div className="adashboardmenu">
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                <div className="kstatusBtn">
                                    <img src="../public/assets/images/Path_2093.svg" />
                                    <span className="kstatus">All Status</span>
                                </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" >
                                            {/* <div className="pipelinePad">Approved</div>
                                            <div className="pipelinePad">Rejected</div>
                                            <div className="pipelinePad">Pending</div> */}
                                            {this.props.leaveStatus ? this.props.leaveStatus.map((item,index)=>(
                                                <div key={index} className="pipelinePad" onClick={((e) => this.handlerequestStatus(e,item.Code)).bind(this)}>{item.Name}</div>
                                            )) : ''}
                                        
                                        </div>
                                        
                                    </Dropdown.Item>
                                    
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div>
                            <Dropdown className="menuDrop ">
                                <Dropdown.Toggle className="datepickerDrop" variant="success" id="dropdown-basic">
                                    <div className="dashboardfiltersBtn1">
                                        <img src="../public/assets/images/calendar_gray.svg" alt="column_img" className="dateimgPad"/>
                                        <span>dd/mm/yyyy To dd/mm/yyyy</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    
                                    <div>
                                        <div className="datepickerDropMenu datedropdownRange" >
                                        
                                            <DateRange
                                                onChange={this.handleSelect.bind(this)}
                                            />
                                        
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
{/* ===================================================================================================================================== */}
                           
                 
                        </div>
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

export default LeaveStatusCustomTable;
	
	
	
