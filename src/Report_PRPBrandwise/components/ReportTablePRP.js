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
import "../../../public/assets/css/campaignRequest.css";
//import SortFilter from './SortStatusFilter';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import FilterOptionsPRP from './FilterOptionsPRP'
import ColumnOption from '../../Report_RPSINVEST/components/ColumnOption'



class ReportTablePRP extends Datatable {
   constructor(props){
    super(props)
    this.state = {
        ...this.state,
        displayedColumns:[],
        columnlist : []
    }
   
    this.getFilterData = this.getFilterData.bind(this);
   // created new
    this.updateState = this.updateState.bind(this);
    this.getFuncprops = this.getFuncprops.bind(this);
    this.getfunApply = this.getfunApply.bind(this);
    this.handleExcel = this.handleExcel.bind(this)
    this.changeDisplayedColumns = this.changeDisplayedColumns.bind(this)
    
   }
     getFilterData(month,year,fsname,status){
    }

    changeDisplayedColumns(e) {
        const { name, checked } = e.target
        let { displayedColumns } = this.state
        if (checked)
            displayedColumns.push(name)
        else
            displayedColumns = displayedColumns.filter((n) => n !== name )
          this.setState({displayedColumns})
    }

   
    //created new
    updateState(who) {
        this.setState({data: `Data updated from ${who}`})
      }
    getFuncprops(status){
       this.props.DivisionDropdown(status)
     }

     getfunApply(name){
      this.props.applyFilter(name,"test sojan success")
      }


      componentDidMount(){
        this.setState({displayedColumns : ['Division',
        'Region',
        'FS Name',
        'HQ',
        'PRP No',
        'PRP Name',
        'PRP Requested Date',
        'PRP Date',
        'Brand',
        'Estimated PRP',
        'Approve/Confirmed Total PRP',
        'Total BTC',
        'PRP Advance',
        'Invited Speaker Name',
        'No Of Drs Expected',
        'Current Business',
        'Expected Business',         
        'Doctors Expected To Attend',
        'Total Cost For PRP',
        'Total Cost For BTC Expense',
        'Expense Against Advance',
        'Expense Confirmatory Remarks',
        'Expense Confirmed Date']
        })
        this.setState({columnlist : ['Division',
        'Region',
        'FS Name',
        'HQ',
        'PRP No',
        'PRP Name',
        'PRP Requested Date',
        'PRP Date',
        'Brand',
        'Estimated PRP',
        'Approve/Confirmed Total PRP',
        'Total BTC',
        'PRP Advance',
        'Invited Speaker Name',
        'No Of Drs Expected',
        'Current Business',
        'Expected Business',         
        'Doctors Expected To Attend',
        'Total Cost For PRP',
        'Total Cost For BTC Expense',
        'Expense Against Advance',
        'Expense Confirmatory Remarks',
        'Expense Confirmed Date']
        })
    }


      handleExcel(){

        let k =[{"1":"test value"}]
        // if ( this.props.tempdata.length > 0) {


        //     this.props.tempdata.map((d)=> {
        //         delete d["Edit"]
        //         console.log(d)
        //         let dcrtype=<span className="dcrup">DCR</span>
        //         let mcrtype=<span className="dcrup">MCR</span>

        //         if(d["Type"].props["children"]=="DCR"){
        //             d["Type"]="DCR"
        //         }
        //         else{
        //             d["Type"]="MCR"
        //         }
        //         k.push(d)
        //        // console.log(d)
        //     })


        

            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            const ws = XLSX.utils.json_to_sheet(k);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(data, "Report" + fileExtension);
        // }else{
        //     alert ("No Data ....")
        // } 
     
    }

    render() {

        const { sortedProp, filterText, rowsPerPage, currentPage } = this.state;
        const { mainHead} = this.props;
        const {expdata} = this.props;
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
            headerColums = ['Division',
            'Region',
            'FS Name',
            'HQ',
            'PRP No',
            'PRP Name',
            'PRP Requested Date',
            'PRP Date',
            'Brand',
            'Estimated PRP',
            'Approve/Confirmed Total PRP',
            'Total BTC',
            'PRP Advance',
            'Invited Speaker Name',
            'No Of Drs Expected',
            'Current Business',
            'Expected Business',         
            'Doctors Expected To Attend',
            'Total Cost For PRP',
            'Total Cost For BTC Expense',
            'Expense Against Advance',
            'Expense Confirmatory Remarks',
            'Expense Confirmed Date']

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


        let checkBoxes = null
        if (this.state.columnlist.length > 0)
        {
            //Object.keys(reportData[0])
       
            checkBoxes = this.state.columnlist.map((n) => {

              
                n = n.charAt(0).toUpperCase() + n.slice(1)
                // reportData[0][n.trim()]  //
                let checked =this.state.displayedColumns.find(v => v == n)
             
                return(
                    <Form.Check
                        id={ "checkbox" + n }
                        key={ n }
                        name={ n }
                        type="checkbox"
                        label={ n }
                        checked = { !!checked }
                        className="column-label"
                        onChange={ this.changeDisplayedColumns.bind(this)  }
                        custom
                   
                    />
                )
        })}


        return (
            <React.Fragment>
                {this.props.open==true &&
               <div className="flex-row pt20">
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
                    <div className="flexDisplay requestDropList ">
                        <div className="other-ops mr10">
                        <Dropdown>
                           <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                               <img src="../public/assets/images/columns.svg" alt="column_img" />
                               <span>Column Option</span>
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
                                            table="all-report-table1"
                                            filename="PRP Brand wise Activity Report"
                                            sheet="PRP Brand wise Activity Report"
                                            buttonText="Excel"/>
                                   </div>
                                
                               </div>
                           </Dropdown.Menu>
                       </Dropdown>
                       </div>
                        <FilterOptionsPRP filterapply={this.getfunApply}  update={this.updateState}  selecteddiv={this.props.selecteddiv} funcprops={this.getFuncprops} getFilterData={this.getFilterData.bind(this)} />
                        <div className="other-ops mr10">
                            <Filter
                                tableHeader={tableHeader}
                                onChangeFilter={this.onChangeFilter}
                                filterText={filterText}
                                keyName={keyName}
                                placeholder={labels.filterPlaceholder}
                            />
                        </div>
                        
                    </div>
                </div>}
                <Row>
                    <Col xs={12} className="datatable">
                        <div className="table-responsive text-tansform-report analysistableheight" style={{maxHeight: '100%'}}>
                            <Table id="all-report-table ">
                            <thead>
                                <tr>
                                    <th  colSpan="23"><div className="reporttable-head"> {mainHead} </div></th>
                                </tr>
                                </thead>
                            {/* {this.props.open==true&&} */}
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
                <div style={{display:'none'}}>
                <Row>
                    <Col xs={12} className="datatable .text-tansform-report">
                        <div className="table-responsive analysistableheight" style={{maxHeight: '100%'}}>
                            <Table id="all-report-table1">
                            <thead>
                                <tr>
                                <th  colSpan="26"><div className="reporttable-head"> {mainHead} </div></th>
                                </tr>
                                </thead>
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
                                     paginatedData={expdata}
                                />
                            </Table>
                        </div>

                    </Col>
                </Row>
                </div>
                <div className="pagination-sec">
                    <div className="current-entries">
                        {(sortedData.length > 0) &&
                        <div>
                            {`Showing ${(currentPage - 1) * rowsPerPage + 1}
                            to ${(currentPage - 1) * rowsPerPage + paginatedData.length} of ${filteredData.length} entries`}
                        </div>
                        }
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
    )(ReportTablePRP)
);

















