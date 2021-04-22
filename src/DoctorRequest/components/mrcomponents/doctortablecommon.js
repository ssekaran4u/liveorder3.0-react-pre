import React, { Component } from 'react';
import { Row, Col, Table ,Collapse,Dropdown, DropdownItem } from "react-bootstrap";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Filter from "react-bs-datatable/lib/Filter";
import Datatable from "react-bs-datatable";
import * as XLSX from 'xlsx';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {sortData,filterData,paginateData} from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Link } from 'react-router-dom';
// import PRPSortFilter from "../mrprpcomponents/prpsortfilter";
// import PRPSortFiltermonthyear from "../mrprpcomponents/prpsortfiltmonyear";
class Doctortablecommon extends Datatable {
constructor(props){
super(props);			
}
render() {
const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;
const { tableHeader,tableBody,onSort,onFilter,keyName,labels,rowsPerPageOption} = this.props;
const filteredData = filterData(tableHeader,filterText,onFilter,tableBody);   
const sortedData = sortData(sortedProp, onSort, filteredData);
const paginatedData = paginateData(rowsPerPage,currentPage,sortedData);
return (
<div className=" ">
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
      <Dropdown>
        <Dropdown.Toggle
          className="dcr-options"
          id="dropdown-basic">
          <img src="../public/assets/images/columns.svg" alt="export_img"/>
        <span>Column option</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="column-dropdown">
          <p>Columns</p>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown>
        <Dropdown.Toggle
          className="dcr-options"
          id="dropdown-basic">
          <img src="../public/assets/images/filter.svg" alt="export_img"/>
        <span>Filter</span>
        </Dropdown.Toggle>
        <Dropdown.Menu className="column-dropdown">
          <p>Columns</p>
        </Dropdown.Menu>
       </Dropdown>
      <div className="prpbodysearch">
        <Filter
            tableHeader={tableHeader}
            onChangeFilter={this.onChangeFilter}
            filterText={filterText}
            keyName={keyName}
            placeholder={labels.filterPlaceholder}/>
        </div>                              
    </div>
      </div>
    </Collapse>
    <Row>
      <Col xs={12} className="datatable">
        <div className="table-responsive materialTablePad">
            <Table id="table-to-xls-app">
              <TableHeader
                tableHeader={tableHeader}
                keyName={keyName}
                onSortChange={this.onSortChange}
                sortedProp={sortedProp}/>
                <TableBody
                  tableHeader={tableHeader}
                  keyName={keyName}
                  labels={labels}
                  paginatedData={paginatedData}/>
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
)(Doctortablecommon)
);