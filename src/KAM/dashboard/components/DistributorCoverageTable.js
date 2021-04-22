import React from "react";
import { Row, Col, Table,Dropdown } from "react-bootstrap";
import Datatable from "react-bs-datatable";

import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import Pagination from "react-bs-datatable/lib/Pagination";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import Filter from 'react-bs-datatable/lib/Filter';
import DistributorCoverage from "./DistributorCoverage";

class DistributorCoverageTable extends Datatable {
 
   
    render() { 
        
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

        const {
            tableHeader,
            tableBody,
            onSort,
            onFilter,
            keyName,
            labels,
         
           
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

        const months = this.props.months
        // console.log(months)

        return (
            <div>
                <div className="flex-row distributorBlock">
                <div className="mainhead_content_one bartitle">Distributor Coverage</div>
                    <div className="flexDisplay disCovred">
                        <div className="unlockmenu invenMonth">
                            <Dropdown>
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                    <div className="distrubutorFilter">
                                        <span className="unloackStatusText">August</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>    
                                        <Dropdown.Item href="#/action-1" >
                                            <div className="statusdropmenu" >
                                                {months.length>0?months.map((months)=>
                                                <div className="pipelinePad" key={months.Code}>{months.Name}</div>
                                                ):null}
                                            </div>
                                        </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="admin_component_head_icon">
                            <div className="headicon_position">
                                {this.state.isFull ? (
                                    <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleView} />
                                ) : (
                                    <img src="../public/assets/images/fullscreen.svg" onClick={this.handleView} />
                                )}
                                <img
                                    className="dashfullscreen"
                                    src="../public/assets/images/overflow.svg"
                                />
                            </div>
                        </div>
                    </div>
                </div>  
                <div className="stockLine covragePad">Covered</div>
                <Row>
                    <Col xs={12} className="datatable">
                        <div className="table-responsive cov-table">
                            <Table     
                            // onDoubleClick={this.DcrEdit}
                              >
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
                
            </div>
        );
    }
}


export default DistributorCoverageTable

