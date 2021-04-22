
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


class MysfclistTable extends Datatable{

     constructor(props){
         super(props)
        //  this.state = {
        //      isFull: false,
        //  }
        this.NewSFC=this.NewSFC.bind(this)
     }


     NewSFC(){

        this.props.NewSFC()
// alert('kunal')
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
                            <div className="fullScreen-mysfcimage">
                                    {/* {this.state.isFull ? ( */}
                                        {/* <img className="colpimg" src="../public/assets/images/collapse-grey.svg" onClick={this.handleView} /> */}
                                        {/* ) : ( */}
                                            {/* <img className="fullpimg" src="../public/assets/images/fullscreen.svg" alt="" onClick={this.handleView} /> */}
                                            {/* )} */}
                                </div>
                                {/* <div className="newSfc flexDisplay">
                                    <div></div>
                                    <div>New SfC Entry</div>
                                </div> */}
                                 <div className="adashboardmenu">
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                <div className="newEntryBtn" onClick="">
                                    {/* <Link to="/newTourPlan" className="newEntryTpClass"> */}
                                        <img src="../public/assets/images/edit.svg" />
                                        <span  onClick={this.NewSFC}  className="kstatus">New SFC Entry</span>
                                    {/* </Link> */}
                                </div>
                                </Dropdown.Toggle>
                            </Dropdown>
                        </div>
                                <div className="other-ops">
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

                    <Col xs={12} className="datatable">
                        <div className="table-responsive materialTablePad">
                            
                            <Table  id="hidetable" className="table">
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

export default MysfclistTable