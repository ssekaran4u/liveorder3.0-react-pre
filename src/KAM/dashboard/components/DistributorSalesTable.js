import React from "react";
import { Row, Col, Table, Dropdown } from "react-bootstrap";
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

class DistributorSalesTable extends Datatable {

    render() {

        const lastOrderDate = this.props.lastOrderDate
        const months = this.props.months

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
                    <div className="dwrSubHeading mainhead_content_one bartitle">Primary & Secondary Sales<span className="avgsalesspan"> (Value in lakh)</span></div>
                    <div className="flex-row">

                        <div className="adashboardmenu unlockmenu distributorList">
                            <Dropdown className="menuDrop">
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                    <div className="kfilterBtn topdistResponsivepad">
                                        <img src="../../../../public/assets/images/Path_2093.svg" />
                                        <span className="distributorStatusText">Last Order Date(All) </span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" >
                                            {lastOrderDate!=undefined && lastOrderDate.length > 0 ? lastOrderDate.map((status) => (
                                                <div className="distributorListpad" key={status.Code}><img src="../public/assets/images/right check.svg" className="imgrightpad" />{status.Name} </div>
                                            )) : null}
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="topdistResponsivepad">
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
                        <div className="unlockmenu  invenMonth ">
                            <Dropdown>
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                    <div className="distrubutorFilter">
                                        <span className="unloackStatusText">August</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" >
                                            {months!=undefined && months.length>0 ? months.map((months)=>(
                                            <div className="pipelinePad" key={months.Code}>{months.Name}</div>)):null}
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="manager_component_head_icon topdistResponsivepad">
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
                <Row>
                    <Col xs={12} className="datatable">
                        <div className="table-responsive dcrtableheight">
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


export default DistributorSalesTable

