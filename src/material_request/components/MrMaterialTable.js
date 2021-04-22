import React, { Component } from 'react';
import { Row, Col, Table ,Collapse,Dropdown} from "react-bootstrap";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Filter from "react-bs-datatable/lib/Filter";
import Datatable from "react-bs-datatable";
import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import { connect } from "react-redux";
import { withRouter } from "react-router";

class MrMaterialTable extends Datatable {

    selectMonth(month){
        this.props.filterMonth(month)
    }
    selectedYear(year){
        this.props.filterYear(year)
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
            rowsPerPageOption
         
           
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
        var month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];
        let d = new Date()
        let c_Year = d.getFullYear()
        let mon = d.getMonth()
        let c_month = month[this.props.sMonth-1]
        return (
            <div className=" ">
                {/* <div className="dcr-head">
                    <div>
                        <h5 className="dcr-list-sec-head" style={{color: '#6c757d'}}>
                            Material Reques tList
                        </h5>
                    </div>
                </div> */}
                <Collapse in={this.props.toggleHeader}>
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
                        
                        <div className="other-ops">
                            <div className="flexDisplay">
                                <Dropdown className="menuDrop ">
                                    <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                        <div className=" materialFilter">
                                            <img src="../public/assets/images/calendar_gray.svg" />
                                            <span className="statusText">{c_month}</span>
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1" >
                                            <div className="materialFilterDrop ">
                                                {this.props.monthList ? this.props.monthList.map((item,index)=>(
                                                    <div key={index} className={item.Name == c_month ? " activeMonth ":"matrialFilterpad" } onClick={()=>this.selectMonth(item.Code)}>
                                                    {/* <span className="mimgpad"><img src="../public/assets/images/right_check_gray.svg" /></span> */}
                                                    <span className={item.Name == c_month ? "activeMonthCol" : ""}>{item.Name}</span>
                                                </div>
                                                  )): null}
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="flexDisplay">
                                <Dropdown className="menuDrop">
                                    <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                        <div className=" materialFilter" >
                                            <img src="../public/assets/images/calendar_gray.svg" />
                                                <span className="statusText">{this.props.sYear}</span>
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1" >
                                        <div className="materialFilterDrop" >
                                            {this.props.yearList ? this.props.yearList.map((item,index)=>(
                                                    <div key={index} className="matrialFilterpad" onClick={()=>this.selectedYear(item.Code)}>
                                                    {/* <span className="mimgpad"><img src="../public/assets/images/right_check_gray.svg" /></span> */}
                                                    <span>{item.Name}</span>
                                                </div>
                                                  )): null}
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="materialSearchPad">
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
                </Collapse>
                <Row>
                    <Col xs={12} className="datatable">
                        <div className="table-responsive materialTablePad">
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
const mapStateToProps = state => ({
    toggleHeader: state.DCRList.toggleHeader
});

export default withRouter(
    connect(
        mapStateToProps,
        null
    )(MrMaterialTable)
);
