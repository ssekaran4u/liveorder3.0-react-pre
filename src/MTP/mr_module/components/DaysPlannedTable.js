import React from "react";
import { Row, Col, Table } from "react-bootstrap";
import Datatable from "react-bs-datatable";
// import "../../../public/assets/css/tptStyle.css";

import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
class TargetVsPlannedTable extends Datatable {
    
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
            <div>
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
            </div>
        );
    }
}

export default TargetVsPlannedTable;