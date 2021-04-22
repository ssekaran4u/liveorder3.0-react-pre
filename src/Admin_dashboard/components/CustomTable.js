
import React from "react";
import { Row, Col, Table, Dropdown, Collapse } from "react-bootstrap";
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
import Filter from "react-bs-datatable/lib/Filter";
import { DateRange } from 'react-date-range';
import {convert} from '../../lib/comm-utils'
 
class CustomTable extends Datatable {

    handleStatus(e,code){ 

        this.props.typeselection(code)
    }
    handlerequestStatus(e,code){ 
      
       this.props.getreqTypeFilter(code)
     
    }
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
        if(this.state.isFull != "undefined"){ 
            if(this.state.isFull == true){
                let view = "fullview";
                this.props.getfullview(view)
            }
        }
            
       
    }
    handleSelect(range){ 
        const startdate = convert(range.startDate._d);
        const enddate = convert(range.endDate._d);
    //    // this.props.filterDate(startdate,enddate)
        this.props.getDates(startdate,enddate)
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
    } = this.props;
 
    const filteredData = filterData(tableHeader, filterText, onFilter, tableBody);
    const sortedData = sortData(sortedProp, onSort, filteredData);
 
    const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);
 
    return (
        <div className="" >
            <div className={this.state.isFull ? "fullscreenView" : "admindashboard-first smallPipecomponent"}>
            <div className="flex-row AdashboardTable padtablehead"  >   
                <div className="Mypipeline  bartitle">My Pipeline(TO DO)</div>
                    <div className="flexDisplay requestDropList todolist">
                        <div className="adashboardmenu">
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                <div className="dashboardfiltersBtn responsiveSubdrop">
                                    <span className="statusText">All Request</span>
                                </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>    
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" >
                                            {this.props.requestType ? this.props.requestType.map((item,index)=>(
                                                <div key={index} className="pipelinePad" onClick={((e) => this.handlerequestStatus(e,item.Code)).bind(this)}>{item.Name}</div>
                                            )) : ''}
                                        </div>
                                        
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>                
                        </div>
                        <div className="adashboardmenu">
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                    <div className="dashboardfiltersBtn responsiveSubdrop">
                                        <span className="statusText">All Status</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" >
                                        {this.props.allstatus ? this.props.allstatus.map((item,index)=>(
                                                <div key={index} className="pipelinePad" onClick={((e) => this.handleStatus(e,item.Code)).bind(this)}>{item.Name}</div>
                                            )) : ''}
                                          
                                        </div>
                                        
                                    </Dropdown.Item>
                                    
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div>
                            <Dropdown className="menuDrop ">
                                <Dropdown.Toggle className="datepickerDrop" variant="success" id="dropdown-basic">
                                    <div className="dashboardfiltersBtn">
                                        <img src="../public/assets/images/calendar_gray.svg" alt="column_img" className="dateimgPad"/>
                                        <span>dd/mm/yyyy To dd/mm/yyyy</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    
                                    <div >
                                        <div className="datepickerDropMenu datedropdownRange" >
                                        {/* <Dropdown.Item href="#/action-1" > */}
                                            <DateRange 
                                                onChange={this.handleSelect.bind(this)}
                                            />
                                        {/* </Dropdown.Item> */}
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                 
                        </div>
                        <div className="manager_component_head_icon">
                            <div className="headicon_position">
                            {this.state.isFull ? (
                                <img
                                    src="../public/assets/images/collapse-grey.svg"
                                    onClick={this.handleView.bind(this)}
                                />
                            ) : (
                                <img
                                    src="../public/assets/images/fullscreen.svg"
                                    onClick={this.handleView.bind(this)}
                                />
                            )}
                            {/* <img
                                className="dashfullscreen"
                                src="../public/assets/images/overflow.svg"
                            /> */}
                            </div>
                        </div>
                </div>
               </div>
              
        <Row>
            <Col xs={12} className="datatable piplelineDiv" >
                <div className="table-responsive tooltipOverflow pendingtablescroll" >
                    <Table  className="AdashboardTable sweta">
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
        <div className="AdashboardTable">
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
            <div className="flexDisplay ">
                <div className="flexDisplay pendingCirclerow">
                    <div className="lightOrange"></div>
                    <div className="newpendingcircle">Newly Pending</div>
                </div>
                <div className="flexDisplay pendingCirclerow">
                    <div className="darkOrange"></div>
                    <div className="newpendingcircle">Pending from Last 1 week</div>
                </div>
                <div className="flexDisplay pendingCirclerow">
                    <div className="redCir"></div>
                    <div className="newpendingcircle">Pending from Last 2 Week</div>
                </div>
            </div>
        </div>
        
        </div>
    </div>
    );
  }
}
export default CustomTable