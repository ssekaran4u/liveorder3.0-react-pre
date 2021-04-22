
import React from 'react'
import { Row, Col, Table,Dropdown, Button } from "react-bootstrap";
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


class Sfcadminapprvrejectable extends Datatable{

      
    showRejectmodal(data){
        this.props.showRejectmodal(data)
    }

    showApprovemodal(data1){
        this.props.showApprovemodal(data1,'')
    }
    getExpense(){
        this.props.getExpense()
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
                        {       this.props.sfcStatus == "Pending" || this.props.sfcStatus == 'Approved' ? 
                            <div className="fullScreen-mysfcimage">
                                <button onClick={()=>this.showApprovemodal("C")} className="partiallyActiveTextYellowapproved1" >Confirm</button>
                                {/* <button  onClick={()=>this.showRejectmodal("R")}  className= "activeTextGreenpending1">Reject</button> */}
                                </div>:null}
        <div className="expenseBtn sml20" onClick={this.getExpense.bind(this)} >  Expense</div>
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
                    <div className="apprvby-date">
                        <p className="apprvby">Approved By : <span className="managerby">{this.props.adminApproveBy} </span> , Date : <span className="managerby"> {this.props.adminApproveDate}.</span></p>
                        {this.props.ConfirmedDate ? <p className="apprvby">Confirmed By : <span className="managerby">{this.props.Confirmer} </span> , Date : <span className="managerby"> {this.props.ConfirmedDate}.</span></p>: null}
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

export default Sfcadminapprvrejectable