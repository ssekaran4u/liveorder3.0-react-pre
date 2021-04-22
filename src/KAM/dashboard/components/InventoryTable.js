import React from "react";
import { Row, Col, Table,Dropdown } from "react-bootstrap";
import Datatable from "react-bs-datatable";
import TablePopup from '../components/TablePopup'

import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import Pagination from "react-bs-datatable/lib/Pagination";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import Filter from 'react-bs-datatable/lib/Filter';

class InventoryTable extends Datatable {
    
    handleView(){
        this.setState({
            isFull: !this.state.isFull
        }); 
    }
    
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

        return (
            <div>
                 <div className="flex-row">
                     
                    <div className="dwrSubHeading mainhead_content_one bartitle">Inventory Managment</div>
                        <div className="flex-row">
                            <div className="adashboardmenu">
                                <Dropdown className="menuDrop">
                                    <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                        <div className="kfilterBtn">
                                            <span className="statusText">Category: Cardiology</span>
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1" >
                                            <div className="statusdropmenu" >
                                            
                                            </div>
                                            
                                        </Dropdown.Item>
                                        
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="adashboardmenu">
                                <Dropdown className="menuDrop">
                                    <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                        <div className="kfilterBtn">
                                            <span className="statusText">Brand:Telpress</span>
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1" >
                                            <div className="statusdropmenu" >
                                            
                                            </div>
                                            
                                        </Dropdown.Item>
                                        
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="invenSearch">
                                <div className="other-ops ">
                                    <Filter
                                        tableHeader={tableHeader}
                                        onChangeFilter={this.onChangeFilter}
                                        filterText={filterText}
                                        keyName={keyName}
                                        placeholder={labels.filterPlaceholder}
                                    />
                                </div>
                            </div>
                        
                        <div className="manager_component_head_icon">
                            {this.state.isFull ? (
                                <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleView.bind(this)} />
                            ) : (
                                <img src="../public/assets/images/fullscreen.svg" onClick={this.handleView.bind(this)} />
                            )}
                            <img
                                className="dashfullscreen"
                                src="../public/assets/images/overflow.svg"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex-row">
                     <div className="stockLine">In Stock</div>
                     <div className="expiry flexDisplay"><div className="kredcircle"></div>Near By Expiry</div>
                </div>  
                
                <Row>
                    <Col xs={12} className="datatable">
                        <div className="table-responsive dcrtableheight">
                        {this.props.showsubtable ? 
                                    <TablePopup /> :''}
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


export default InventoryTable

