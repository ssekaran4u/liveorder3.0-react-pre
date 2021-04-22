import React, { Component } from 'react';
import { Row, Col, Table, Button, Dropdown,Form } from 'react-bootstrap';
import classNames from 'classnames';
import Datatable from 'react-bs-datatable';

import { sortData, filterData, paginateData } from 'react-bs-datatable/lib/utils/ClassHelpers';
import Pagination from 'react-bs-datatable/lib/Pagination';
import PaginationOpts from 'react-bs-datatable/lib/PaginationOpts';
import TableHeader from 'react-bs-datatable/lib/TableHeader';
import TableBody from 'react-bs-datatable/lib/TableBody';
import Filter from 'react-bs-datatable/lib/Filter';
import { DateRange } from 'react-date-range';
import {convert} from '../../lib/comm-utils'

class RequestManagerSelfTable extends Datatable {
    
    handleStatus(status){
        
       this.props.filterRequestList(status)
     
    }
    handleType(filter){
        
        this.props.filterTypetList(filter)
      
     }
    handleSelect(range){ 
       const startdate = convert(range.startDate._d);
        const enddate = convert(range.endDate._d);
    //    // this.props.filterDate(startdate,enddate)
        this.props.filterRequestDateList(startdate,enddate)
    }
    render() {
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

        const { tableHeader, tableBody, onSort, onFilter, keyName, labels, rowsPerPageOption} = this.props;

        const filteredData = filterData(tableHeader, filterText, onFilter,tableBody);

        const sortedData = sortData(sortedProp, onSort, filteredData);

        const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);

        const tableClass = classNames({
            'table-datatable': true,
        });
        return (
            <div className="managerReq">
                <div className=" showTab">
           
                <div className="flex-row">   
                    <div>
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
                   
                   <div>
                   <Dropdown className="menuDrop">
                    <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                    <div className="filtersBtn">
                        <img src="../public/assets/images/Path_2093.svg" />
                        <span className="statusText">Status</span>
                    </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                       <Dropdown.Item href="#/action-1" >
                          <div className="statusdropmenu" >
                           
                             {this.props.requestdata ? this.props.requestdata.map((item,index) => (
                               <div key={index} className="statussubmenu" onClick={(() => this.handleStatus(item.Code)).bind(this)} >{item.Name}</div>
                               )): ''}
                          </div>
                       </Dropdown.Item>

                     </Dropdown.Menu>
                   </Dropdown>
               </div>
               <div>
               <Dropdown className="menuDrop">
                    <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                    <div className="filtersBtn">
                        <img src="../public/assets/images/Path_2093.svg" />
                        <span className="statusText">Request Type</span>
                    </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                       <Dropdown.Item href="#/action-1" >
                           <div className="statusdropmenu" >
                               {this.props.requestTypeList ? this.props.requestTypeList.map((item,index)=>(
                                 <div key={index} className="statussubmenu" onClick={() => this.handleType(item.Code).bind(this)} >{item.Name}</div>    
                               )):''}
                               
                           </div>
                       </Dropdown.Item>

                     </Dropdown.Menu>
                 </Dropdown>
               </div>
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
                             <DateRange
                               
                               onChange={this.handleSelect.bind(this)}
                           />
                               
                          </div>
                          
                       </div>
                     </Dropdown.Menu>
                 </Dropdown>
                
               </div>
               </div>
               </div>
               </div>
                <Row className="requestTable">
                    <Col xs={12} className="datatable dashboard_datable">
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
                <div className="requestPage pagination-sec">
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

export default RequestManagerSelfTable;