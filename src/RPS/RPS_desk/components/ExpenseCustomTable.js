import React from "react";
import { Row, Col, Table, Nav, Collapse, Dropdown, Form } from "react-bootstrap";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Datatable from "react-bs-datatable";
import { sortData,filterData,paginateData } from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import Filter from "react-bs-datatable/lib/Filter";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import SortFilter from '../../mrComponents/sortFilter';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import FilterOption from './FilterOption'
//import SortStatusFilter from './SortStatusFilter'


class ExpenseCustomTable extends Datatable {
    constructor(props) {
        super(props)
    }
    render() {
        console.log("this.props",this.props.month,this.props.monthFilter)
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;
        const {
            tableHeader,
            tableBody,
            onSort,
            onFilter,
            keyName,
            labels,
            rowsPerPageOption,
            show,
          month,
          year,
          monthFilter,
          yearFilter,
          getMonth,
          getYear,
          statusFilter,
          getStatus,
            headerColums =["All","Applied","Approved","Aprrover Rejected","Confirmed","Confirmer Rejected"]

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
            <React.Fragment>
                <div className="">
                <Collapse in={this.props.toggleHeader}>

                    <div className="dcr-table-options">
                        <div className="pagination-opts">
                            <PaginationOpts
                                labels={labels}
                                onRowsPerPageChange={this.onRowsPerPageChange}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOption={rowsPerPageOption}
                                keyName={keyName}
                            />
                        </div>

                            <div className="other-ops"> 
                            {this.props.sendReq == "confirmCancel" ?
                             <SortFilter option={statusFilter} defaultValue={this.props.status} getVal={getStatus} />
                            :''}
                            <Dropdown>
                           <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                               <img src="../public/assets/images/export.svg" alt="export_img" />
                               <span>Export</span>
                           </Dropdown.Toggle>
                           <Dropdown.Menu className="export-dropdown">
                               <div className="dcrlistexport export-ops">
                                   {/* <div className="text-center" onClick={this.handleExcel}>
                                       <img src="../public/assets/images/excel.svg" alt="excel"/>
                                       <p>Excel</p>
                                   </div> */}
                                   <div>
                                        <img src="../public/assets/images/excel.svg" alt="excel" />
                                        <ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            className="download-table-xls-button"
                                            table="table-to-xls"
                                            filename="tablexls"
                                            sheet="tablexls"
                                            buttonText="Excel"/>
                                   </div>
                                
                               </div>
                           </Dropdown.Menu>
                       </Dropdown>
                             <SortFilter option={monthFilter} defaultValue={month} getVal={getMonth} />
                             <SortFilter option={yearFilter} defaultValue={year} getVal={getYear} />
                                <Filter
                                    tableHeader={tableHeader}
                                    onChangeFilter={this.onChangeFilter}
                                    filterText={filterText}
                                    keyName={keyName}
                                    placeholder={labels.filterPlaceholder}
                                />
                            </div>
                    </div>
          </Collapse>

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

            </React.Fragment>
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
    )(ExpenseCustomTable)
);

















