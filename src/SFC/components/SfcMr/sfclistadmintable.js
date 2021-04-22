
import React from 'react'
import { Row, Col, Table,Dropdown } from "react-bootstrap";
import Datatable from "react-bs-datatable";

import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Pagination from "react-bs-datatable/lib/Pagination";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import Filter from "react-bs-datatable/lib/Filter";
import Filteroptionadmin from './filteroptioninadmin'
let dval = ''
let sval =''

class Sfclistadmintable extends Datatable{
    
     
    getFilterData(desg,status){
        dval = desg
        sval = status
      
    }
    filterDataval(desg,status){
        this.props.filterDesignation(desg,status)
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

        return (
            <div className="dcr-table">
                    <div className="dcr-table-optionsfc">
                        <div className="pagination-opts">
                             
                            <PaginationOpts
                                labels={labels}
                                onRowsPerPageChange={this.onRowsPerPageChange}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOption={rowsPerPageOption}
                                keyName={keyName}
                            />
                        </div>

                        <div className="sfcfullimg">
                                <div className="other-ops">
                       <Dropdown>
                           <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                               <img src="../public/assets/images/filter.svg" alt="filter_img" />
                               <span> Filter Option</span>
                           </Dropdown.Toggle>
                           <Dropdown.Menu className="Repothers-dropdownapply">
                               <Filteroptionadmin 
                                    getFilterData={this.getFilterData} 
                                   
                                />
                               <Dropdown.Item eventKey="1">
                                    <button className="gradient-btn " onClick={()=>this.filterDataval(dval,sval)}>Apply</button>
                                </Dropdown.Item>
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
                        
                        </div>
                          
                <Row>
                    <Col xs={12} className="datatablesfc">
                        <div className="table-responsive dcrtableheight">
                            
                            <Table  id="hidetable">
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

export default Sfclistadmintable