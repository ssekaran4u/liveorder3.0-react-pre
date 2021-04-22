import React, { Component } from 'react'
import { Row, Col, Table, Button, Dropdown,Form } from 'react-bootstrap';
import classNames from 'classnames';
import Datatable from 'react-bs-datatable';

import { sortData, filterData, paginateData } from 'react-bs-datatable/lib/utils/ClassHelpers';
import Pagination from 'react-bs-datatable/lib/Pagination';
import PaginationOpts from 'react-bs-datatable/lib/PaginationOpts';
import TableHeader from 'react-bs-datatable/lib/TableHeader';
import TableBody from 'react-bs-datatable/lib/TableBody';
import Filter from 'react-bs-datatable/lib/Filter';

 class DashboardManagerCustomTable extends Datatable {
    constructor(props){
        super(props)
        this.handleChecked = this.handleChecked.bind(this)
        this.state.doctorGradeFilter=[]
    }
    handleChecked(e){
        const {id,checked} = e.target
        let { doctorGradeFilter } = this.state
        if (checked)
            doctorGradeFilter.push(id)
        else
            doctorGradeFilter = doctorGradeFilter.filter(v => v !== id)
        this.setState({
            doctorGradeFilter
        })
    }
    render() {
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

        const { tableHeader, tableBody, onSort, onFilter, keyName, labels, rowsPerPageOption} = this.props;

        const { doctorGradeFilter } = this.state

        const preFilteredData =
            doctorGradeFilter.length == 0 ? tableBody : tableBody.filter((v) => doctorGradeFilter.indexOf(v['DR.Grade']) >= 0)

        const filteredData = filterData(tableHeader, filterText, onFilter, preFilteredData);

        const sortedData = sortData(sortedProp, onSort, filteredData);

        const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);

        const tableClass = classNames({
            'table-datatable': true,
        });
        let filtergrad={}
            if( this.props.tableBody && this.props.tableBody!=undefined){
                this.props.tableBody.map((item, index) => {
                filtergrad[item["DR.Grade"]]=item["DR.Grade"]
            })
        }
        return (
            <div>
                <div className="dcr-table-options mrdashboard singlerow2">
                    <div className="pagination-opts">
                        <PaginationOpts
                            labels={labels}
                            onRowsPerPageChange={this.onRowsPerPageChange}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOption={rowsPerPageOption}
                            keyName={keyName}
                        />
                    </div>
                    <div className="other-ops dashops">
                        <Dropdown>
                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                <img src="../public/assets/images/filter.svg" alt="column_img" />
                                <span>Grade</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="column-dropdown">
                                <div className="pad10 columns-height cal-scrollbar">
                                    <h5 class="drop-head">Grade</h5>
                                    <Form>
                                        {filtergrad && filtergrad != undefined ?
                                          Object.keys (filtergrad).map ((l, i)=> 
                                            <Form.Check 
                                                key={i}
                                                custom
                                                type="checkbox"
                                                id= {l}
                                                label={filtergrad[l]}
                                                className="column-label"
                                                onChange={this.handleChecked}
                                            />
                                        ) 
                                        : 
                                        null 
                                        }
                                </Form>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Filter
                            tableHeader={tableHeader}
                            onChangeFilter={this.onChangeFilter}
                            filterText={filterText}
                            keyName={keyName}
                            placeholder="Search"
                        />
                    </div>
                </div>
                <Row className="dashboard_table callavgatb listcontainer2">
                    <Col xs={12} className="datatable dashboard_datable ">
                        <div className="table-responsive listcontainer listOverflow ">
                            <Table>
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
                            <div className="AdashboardTable">
                            <div className="pagination-sec paginationPad">
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
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DashboardManagerCustomTable