import React, { Component } from 'react';
import { Row, Col, Table, Collapse, Dropdown, DropdownItem } from "react-bootstrap";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import Filter from "react-bs-datatable/lib/Filter";
import Datatable from "react-bs-datatable";
import * as XLSX from 'xlsx';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {
	sortData,
	filterData,
	paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import PRPSortFilter from "../mrprpcomponents/prpsortfilter"
import PRPSortFiltermonthyear from "../mrprpcomponents/prpsortfiltmonyear"
class PrpReqTable extends Datatable {
	constructor(props) {
		super(props);
	}
	selectMonth(month) {
		if (month == '00') {
			this.props.filterMonth("1,2,3,4,5,6,7,8,9,10,11,12")
		}
		else {
			this.props.filterMonth(month)
		}
	}
	selectedYear(year) {
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
		var month = ["January", "February", "March", "April", "May", "June", "July",
			"August", "September", "October", "November", "December"];
		let d = new Date()
		let c_Year = d.getFullYear()
		let mon = d.getMonth()
		if (this.props.sMonth == "1,2,3,4,5,6,7,8,9,10,11,12") {
			var c_month = "All"
		}
		else {
			var c_month = month[this.props.sMonth - 1]
		}
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
							{/* <div className="flexDisplay">
												<Dropdown>
												<Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
													<div className=" materialFilter" >
														<img src="../public/assets/images/calendar_gray.svg" />
														<span className="statusText">{c_month}</span>
													</div>
												</Dropdown.Toggle>
													<Dropdown.Menu className="manager_sales_filter_column-dropdown">
														<div className="month-padding columns-height cal-scrollbar">
															{this.props.monthList && this.props.monthList != undefined ?
															this.props.monthList.map((item,index) => (
															<DropdownItem 
																key={index}
																onClick={()=> this.selectMonth(item.Code)} 
																className="manager_sales_filter_month" >{item.Name}
															</DropdownItem>
															)):null}
															</div>
														</Dropdown.Menu>
														</Dropdown>
       										 </div>
                            <div className="flexDisplay">
														<Dropdown>
														<Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
															<div className=" materialFilter" >
																<img src="../public/assets/images/calendar_gray.svg" />
																<span className="statusText">{this.props.sYear}</span>
															</div>
														</Dropdown.Toggle>
															<Dropdown.Menu className="manager_sales_filter_column-dropdown">
																<div className="month-padding columns-height cal-scrollbar">
																	{this.props.yearList && this.props.yearList != undefined ?
																	this.props.yearList.map((item,index) => (
																	<DropdownItem 
																		key={index}
																		onClick={()=>this.selectedYear(item.Code)} 
																		className="manager_sales_filter_month" >{item.Name}
																	</DropdownItem>
																	)):null}
																	</div>
																</Dropdown.Menu>
																</Dropdown>
														</div> */}
							<PRPSortFiltermonthyear
								option={this.props.monthFilter}
								defaultValue={this.props.sMonth}
								getVal={this.props.filterMonth} />

							<PRPSortFiltermonthyear
								option={this.props.yearFilter}
								defaultValue={this.props.sYear}
								getVal={this.props.filterYear} />
								<Dropdown>
								<Dropdown.Toggle className="dcr-options" id="dropdown-basic">
									<img src="../public/assets/images/export.svg" alt="export_img" />
									<span>Export</span>
								</Dropdown.Toggle>
								<Dropdown.Menu className="export-dropdown">
									<div className="dcrlistexport export-ops">
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
							<div className="prpbodysearch">
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
							<Table id="table-to-xls">
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
	)(PrpReqTable)
);
