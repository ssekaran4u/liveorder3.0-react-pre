import React from "react";
import { Row, Col, Table, InputGroup, FormControl } from "react-bootstrap";
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



class DoctorsProfileTable extends Datatable {

    constructor(props){
        super(props);
        
        
        this.submitPlan = this.submitPlan.bind(this);
    }
    submitPlan(){
        this.props.submitPlan('A')
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


      
        return (
            <React.Fragment>
                <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
                    <div className="table-order-row">
                        <div className="order-pagination mr-module-pagination">
                            {/* <div className="pagination-diff">
                                <PaginationOpts
                                    labels={labels}
                                    onRowsPerPageChange={this.onRowsPerPageChange}
                                    rowsPerPage={rowsPerPage}
                                    rowsPerPageOption={rowsPerPageOption}
                                    keyName={keyName}
                                />
                            </div> */}
                            <div className="mr-module-doctor-profile-pagination other-ops pr20">
                              
                                {/* <div className="search-field">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text ><img src="public/assets/images/search_grey.png" alt="" /></InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="Search "
                                        />
                                    </InputGroup>
                                </div> */}
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
                            <div className="table-responsive analysistableheight">
                                <Table
                                  paginationButton={false}
                                >
                                    <TableHeader
                                        tableHeader={tableHeader}
                                        keyName={keyName}
                                        onSortChange={this.onSortChange}
                                        sortedProp={sortedProp}
                                        paginationButton={false}
                                    />
                                    <TableBody
                                        tableHeader={tableHeader}
                                        keyName={keyName}
                                        labels={labels}
                                        paginatedData={paginatedData}
                                        paginationButton={false}
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
                        {/* <Pagination
                            data={sortedData}
                            rowsPerPage={rowsPerPage}
                            keyName={keyName}
                            currentPage={currentPage}
                            onPageNavigate={this.onPageNavigate}
                            labels={labels}
                        /> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


export default DoctorsProfileTable;



