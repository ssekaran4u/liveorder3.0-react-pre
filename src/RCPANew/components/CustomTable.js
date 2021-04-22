import React from "react";
import { Row, Col, Table, Dropdown, Collapse } from "react-bootstrap";
import Datatable from "react-bs-datatable";

import {
    sortData,
    filterData,
    paginateData
} from "react-bs-datatable/lib/utils/ClassHelpers";
import Pagination from "react-bs-datatable/lib/Pagination";
import PaginationOpts from "react-bs-datatable/lib/PaginationOpts";
import TableHeader from "react-bs-datatable/lib/TableHeader";
import TableBody from "react-bs-datatable/lib/TableBody";
import Filter from "react-bs-datatable/lib/Filter";

import ColumnOption from "./ColumnOption";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import "../../../public/assets/css/rcparesponsive.css"
class CustomTable extends Datatable {
    // constructor() {
    //     this.getUnselectedColumns = this.getUnselectedColumns.bind(this);
    // }
    // getUnselectedColumns(name) {
    //     console.log(name, "custom table");
    //     this.props.getUnselectedColumns();
    // }

    constructor(props) {
        super(props);

        //  this.state={
        //     sortedProp :null, filterText, rowsPerPage, currentPage
        //  }

      //  this.DcrEdit = this.DcrEdit.bind(this);
      this.handleExcel = this.handleExcel.bind(this)
    }

    // DcrEdit(data) {
    //     var editdata = [];
    //     const { header, Edit } = this.state;

    //     Object.keys(this.props.tableHeader).map(key => {
    //         if (this.props.tableHeader[key]["title"] == "ReportNo") { console.log("gg", data.target)
    //             this.props.history.push(
    //                 "/dcr-common/" +
    //                     data.target.parentElement.cells[key].innerHTML
    //             );
    //             //     render(

    //             //         return <Redirect to={'/dcr-common/'+data.target.parentElement.cells[key].innerHTML} />
    //             //     )
    //             //    // const ShowTheLocationWithRouter = withRouter('/dcr-common/'+data.target.parentElement.cells[key].innerHTML);
    //             //     window.location = '/dcr-common/'+data.target.parentElement.cells[key].innerHTML;
    //             //     //window.open('/dcr-common/'+data.target.parentElement.cells[key].innerHTML);
    //             //   <Redirect to={'/dcr-common/'+data.target.parentElement.cells[key].innerHTML} />
    //             // //     console.log(key,data.target.parentElement.cells[key].innerHTML,'<<<<')
    //         }
    //     });

    //     // console.log(data.target.parentElement.cells ,this.props.tableHeader,'vvvvv')
    //     //     // console.log(data.target,'vvvvv')
    //     //     var editdata_object={}
    //     //    for (var key in data.target.parentElement.cells) {

    //     //         if(data.target.parentElement.cells[key]!=undefined){
    //     //                 //console.log(data.target.parentElement.cells[key].innerHTML,key,'name kunal')
    //     //         }
    //     //     }

    //     //         var hj=header[key]

    //     //         if(header[key]!=undefined){
    //     //         if(hj["title"]!=undefined){
    //     //             var keyval=hj["title"]
    //     //             editdata_object[hj["title"]]=data.target.parentElement.cells[key].textContent
    //     //         //.log( hj["title"], header[key], data.target.parentElement.cells[key].textContent);
    //     //         //editdata.push( { [hj["title"]]: data.target.parentElement.cells[key].textContent    }  )
    //     //         }
    //     //         }
    //     //     }
    //     //     }

    //     //     this.props.getMASTERLEdit(editdata_object)
    //     //     const  _this=this
    //     //     if( _this.state.listsate){
    //     //         _this.setState( { listsate:false});}
    //     //  else{
    //     //     _this.setState( { listsate:true});}

    //     //     //console.log(this.state,'state object',Edit)
    //     //     // this.setState(  {edit_data:editdata})
    //     //     // data.tarKeyboardEventget.parentElement.cells.forEach(element => {

    //     //     //     console.log(element)

    //     // });
    // }
    handleExcel(){

        let k =[]
        if ( this.props.tempdata.length > 0) {


            this.props.tempdata.map((d)=> {
                delete d["Edit"]
                let dcrtype=<span className="dcrup">DCR</span>
                let mcrtype=<span className="dcrup">MCR</span>

                if(d["Type"].props["children"]=="DCR"){
                    d["Type"]="DCR"
                }
                else{
                    d["Type"]="MCR"
                }
                k.push(d)
            })


        

            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            const ws = XLSX.utils.json_to_sheet(k);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(data, "Report" + fileExtension);
        }else{
            alert ("No Data ....")
        } 
     
    }

    render() {
        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;

        const {
            tableHeader,
            tableBody,
            onSort,
            onFilter,
            keyName,
            keyName1,
            labels,
            rowsPerPageOption,
            headerColums
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
        const paginatedData1 = paginateData(this.props.tableBody.length, currentPage, sortedData);

        return (
            <div className="dcr-table">
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
                             <div className="hidetable">
                            <PaginationOpts
                                labels={labels}
                                onRowsPerPageChange={this.onRowsPerPageChange}
                                rowsPerPage={this.props.tableBody.length}
                                rowsPerPageOption={this.props.tableBody.length}
                                keyName={keyName1}
                            />
                        </div>
                        </div>
                        <div className="other-ops">
                            <Dropdown>
                                <Dropdown.Toggle
                                    className="dcr-options"
                                    id="dropdown-basic"
                                >
                                    <img
                                        src="../public/assets/images/columns.svg"
                                        alt="export_img"
                                    />
                                    <span>Column option</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="column-dropdown">
                                    <ColumnOption
                                        headerColums={headerColums}
                                        getUnselectedColumns={
                                            this.props.getUnselectedColumns
                                        }
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
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
                                   {/* <div className="line"></div>
                                   <div className="text-center" onClick={this.handlePdf}>
                                       <img src="../public/assets/images/pdf.svg" className="pdf" alt="excel"/>
                                       <p>PDF</p>
                                   </div>
                                   <div className="line"></div>
                                   <div className="text-center" onClick={this.handlePrint}>
                                       <img src="../public/assets/images/print.svg" alt="excel"/>
                                       <p>Print</p>
                                   </div> */}
                               </div>
                           </Dropdown.Menu>
                       </Dropdown>
                            {/* <Dropdown>
                                <Dropdown.Toggle
                                    className="dcr-options"
                                    id="dropdown-basic"
                                >
                                    <img
                                        src="../public/assets/images/filter.svg"
                                        alt="filter_img"
                                    />
                                    <span>Retrival Option</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="others-dropdown">
                                    <RetrivalOption />
                                </Dropdown.Menu>
                            </Dropdown> */}
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
                <Row>
                    <Col xs={12} className="datatable table2rcpa">
                        <div className="table-responsive dcrtableheight">
                            {/* <Table     
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
                            </Table> */}
                            <Table  id="table-to-xls" className="hidetable">
                                <TableHeader 
                                  tableHeader={tableHeader}
                                  keyName={keyName1}
                                  sortedProp={sortedProp}
                                  onSortChange={this.onSortChange}
                                />
                                <TableBody
                                tableHeader={tableHeader}
                                keyName={keyName1}
                                labels={labels}
                                paginatedData={paginatedData1}
                                />
                            </Table>
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
    )(CustomTable)
);
