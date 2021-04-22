import React from 'react'
import { Row, Col, Table, Dropdown,Form } from 'react-bootstrap';
import Datatable from 'react-bs-datatable';
import { sortData, filterData, paginateData } from 'react-bs-datatable/lib/utils/ClassHelpers';
import Pagination from 'react-bs-datatable/lib/Pagination';
import PaginationOpts from 'react-bs-datatable/lib/PaginationOpts';
import TableHeader from 'react-bs-datatable/lib/TableHeader';
import TableBody from 'react-bs-datatable/lib/TableBody';
import Filter from 'react-bs-datatable/lib/Filter';
import Cust_Check from './Col_Option_checkbox'
import RetrivalOption from './RetrivalOption'
import { postToServer } from '../../lib/comm-utils'
import { URL_REPORT } from '../../lib/constants'
import Loder from  '../../lib/Loader'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
class ReportTable extends Datatable {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            displayedColumns:[],
            reportLabel:'',
            reportData:[],
            reportHeader:[],
            control_data:[],
            displayctrl:[],
            controllName:[],
            report_parameter:'',
            loader:false,
            reportHeaderdata:[],
            displayedColumnsheader:[],
            columnlist:[]
        }
        this.updateFormData=this.updateFormData.bind(this)
        this.updateData=this.updateData.bind(this)
        this.changeDisplayedColumns=this.changeDisplayedColumns.bind(this)
        this.data_view=this.data_view.bind(this)
        this.report_view_data=this.report_view_data.bind(this)
        this.report_view_API_data=this.report_view_API_data.bind(this)
        this.handleExcel=this.handleExcel.bind(this)
        this.datareport_header=this.datareport_header.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.report_id !== prevProps.report_id) {
          this.setState({reportData:[],reportHeader:[], displayedColumns:[],controllName:'', control_data:[],displayctrl:[],displayedColumnsheader:[]})
            this.forceUpdate()
        }
    }
    
    updateFormData(control_data,displayctl){
        this.setState({control_data:control_data,displayctrl:displayctl})
    }
    updateData(controllName,report_query_parameter ){
        this.setState({controllName:controllName, report_parameter:report_query_parameter})
    }
    handleExcel(){

// let newdate=[]
// this.state.reportData.map( (d)=> {

//     let k={}

  

    
//     this.state.columnlist.map( (a)=>{
// k[a]=d[a]
//     })

// newdate.push(k)
// })
//       console.log(newdate)   
      

//         if ( this.state.reportData.length > 0) {
//             const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//             const fileExtension = '.xlsx';
//             const ws = XLSX.utils.json_to_sheet(newdate);
//             const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
//             const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
//             const data = new Blob([excelBuffer], {type: fileType});
//             FileSaver.saveAs(data, "Report" + fileExtension);
//         }else{
//             alert ("No Data ....")
//         } 
     
    }

    handlePdf(){
        //alert("print pdf")
    }
    handlePrint(){
        //alert("print")
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

    datareport_header() {
        var headerText = this.props.reportheader_detail.toString();
        for (var pram of this.props.reportheader_param.split(",")) {
            for (var ctrl of this.state.controllName) {
                if (pram == ctrl) {
                    if (this.state.displayctrl[ctrl] != undefined) {
                        headerText = headerText.replace(ctrl," " + this.state.displayctrl[ctrl]
                        );
                    }
                }
            }
        }
                this.props.updatechild(headerText)
        //alert(headerText)
    }
    //////////////////  Apply Button Click 
    data_view(){
        var fromdt='';
        var todt='';
        for (var ctrl of this.state.controllName) {
            if (this.state.control_data[ctrl]==undefined){
            alert(ctrl + " - Value not Selected ............")
            return;
            }
            if (ctrl=="DateFrom"){
                fromdt=this.state.control_data[ctrl];
            }
            if (ctrl=="DateTo"){
                todt=this.state.control_data[ctrl];
            }
        }
        
        if (fromdt !="" && todt !=""){
          let  dt1 = new Date(fromdt).getTime();
          let  dt2 = new Date(todt).getTime();
          let diff =(dt2-dt1)/ (1000 * 60 * 60 * 24)
            if (diff<0){
                alert("From Date Should Be Less Than To Date .....");
                return;
            }
            if (diff>366){
                alert("Report Show only  One Year Data .....");
                return;
            }
        }
        /// Header Name Add
        this.datareport_header();
        var datalist ='';
        var mainvalue='';   
        var arrayvalue='';

        ////////   report view   Parameter Checking ................
        if (this.props.query_type=="proc"){
            for (var pram of this.state.report_parameter.split(',')){ 
                mainvalue=pram + ",";
                for (var ctrl of this.state.controllName) {
                        if (pram==ctrl) {
                            if (this.state.control_data[ctrl]!=undefined){
                            datalist=  this.state.control_data[ctrl] + ",";
                            }else {
                            datalist= "' ',";
                            }
                            mainvalue=datalist; 
                        }
                }
                arrayvalue=arrayvalue + mainvalue;   
            }
            arrayvalue= arrayvalue.substring(0, arrayvalue.length - 1);
          //  console.log (arrayvalue,' :report passing Parameter Value  ')
            this.report_view_data(arrayvalue);

        }else{
            for (var pram of this.state.report_parameter.split(',')){ 
                mainvalue=pram + ",";
                for (var ctrl of this.state.controllName) {
                        if (pram==ctrl) {
                            if (this.state.control_data[ctrl]!=undefined){
                            datalist="\"" + ctrl+ "\":" +"\"" + this.state.control_data[ctrl] + "\"" + ",";
                            }else {
                            datalist= "' ',";
                            }
                            mainvalue=datalist; 
                        }
                }
                arrayvalue=   arrayvalue  + mainvalue;   
            }
            arrayvalue= arrayvalue.substring(0, arrayvalue.length - 1);
            arrayvalue= "{"+ arrayvalue + "}";
           // console.log (arrayvalue   ,' :report passing Parameter Value ')
            this.report_view_API_data(arrayvalue)
        }
    }
    report_view_API_data(api_parameter){
        this.setState({ loader:true, reportData: [], reportHeader:[] })
        const { report_id } = this.props
        var data1 = {
            Index:this.props.exe_query, 
            Data  : JSON.parse(api_parameter)
        }
        postToServer("SFAReport", data1)
            .then((result) => {
                if (result.data ) {
                    let data = result.data["Data"]
                   
                                let data2 = result.data["Columns"]
                                let columns = result.data["Columns"].map((key)=>
                                    ({"title": key, "prop": key, "filterable": true})
                                )
                                let displayedColumns = columns.map(v => v.title)
                                let Newbody=[]
                
                data.map((a)=> {
                        let test ={}
                            data2.map((b)=>{ test[b]=a[b] } )
                        Newbody.push(test)
                     
                            })
                       
                          this.setState({ columnlist: data2,  reportData: Newbody, reportHeader: columns,
                          displayedColumns,loader:false
                        })
                      //  console.log("Not  working ")
                }
                else {
                    this.setState({  loader:false,reportLabel:" There is no data to be displayed ................... "  })
                }
            })
    }

    report_view_data(report_parameter){
        this.setState({ loader:true,reportData: [], reportHeader:[] })
        const { report_id } = this.props
        var data1 = { id:report_id,index:"3", parameter:report_parameter, 
         }
        postToServer(URL_REPORT, data1)
            .then((result) => {
                if (result.data ) {
                    let data = result.data["Data"]
                    let data2 = result.data["Columns"]
                    let columns = result.data["Columns"].map((key)=>
                        ({"title": key, "prop": key, "filterable": true})
                    )
                    let displayedColumns = columns.map(v => v.title)
                    let Newbody=[]
                data.map((a)=> {
                        let test ={}
                            data2.map((b)=>{
                                // console.log("sweta",b['header'],a[b['header']],"testsingreport",b)
                                test[b]=a[b]
                            })
                        Newbody.push(test)
                        // this.setState({reportData: Newbody, })
                            })

                        this.setState({columnlist: data2,  reportData: Newbody, reportHeader: columns,
                            displayedColumns,loader:false
                             
                        } )
                        console.log(" working ")
                }
                else {
                    this.setState({  loader:false,reportLabel:" There is no data to be displayed ................... "  })
                }
            })

           
    }
    render() {
       
        const { reportData, reportHeader, displayedColumns,displayedColumnsheader,reportHeaderdata } = this.state
       
        const { sortedProp, filterText, currentPage, rowsPerPage } = this.state;
        const { onSort, onFilter, keyName,keyName1, labels,  reportparameter, report_id } = this.props;
        let useHeader = reportHeader.filter((v) => {
            return displayedColumns.find(n => n==v.title)
        })
         
        const filteredData = filterData(useHeader, filterText, onFilter,reportData);
        const sortedData = sortData(sortedProp, onSort, filteredData);
        const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);
        const paginatedData1 = paginateData(reportData.length, currentPage, sortedData);
        
        //downloaddata=filteredData
        const rowsPerPageOption=[10, 15, 20, reportData.length ]
        let checkBoxes = null

       
       
        if (this.state.columnlist.length > 0)
        //Object.keys(reportData[0])
       
            checkBoxes = this.state.columnlist.map((n) => {

              
                n = n.charAt(0).toUpperCase() + n.slice(1)
                // reportData[0][n.trim()]  //
                let checked =displayedColumns.find(v => v == n)
             
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
        })
        return (
            <div>
                  <Loder   show={this.state.loader} ></Loder>
                <div className="dcr-table-options">
                    <div className="pagination-opts">
                        <PaginationOpts
                            labels={labels.noResults=this.state.reportLabel}
                            onRowsPerPageChange={this.onRowsPerPageChange}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOption={rowsPerPageOption}
                            keyName={keyName}
                        />
                        <div className="hidetable">
                        <PaginationOpts
                            labels={labels.noResults=this.state.reportLabel}
                            onRowsPerPageChange={this.onRowsPerPageChange}
                            rowsPerPage={reportData.length}
                            rowsPerPageOption={reportData.length}
                            keyName={keyName1}
                        />
                        </div>
                    </div>
                   <div className="other-ops">
                       <Dropdown>
                           <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                               <img src="../public/assets/images/columns.svg" alt="column_img" />
                               <span>Column Option</span>
                           </Dropdown.Toggle>
                           <Dropdown.Menu className="column-dropdown">
                               <div className="topPad">
                                    <p className="column-head">Columns to be shown</p>
                               </div>
                           
                               <div className="pad10 repoCol">
                               
                               {checkBoxes}
                               </div>
                           </Dropdown.Menu>
                       </Dropdown>
                       <Dropdown className="reportExport">
                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                <img src="../public/assets/images/export.svg" alt="export_img" />
                                <span>Export</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="export-dropdown">
                                <div className="export-ops">
                                    {/* <div className="text-center" onClick={this.handleExcel}>
                                        <img src="../public/assets/images/excel.svg" alt="excel" />
                                        <p>Excel</p>
                                    </div> */}
                                    <div>
                                        <img src="../public/assets/images/excel.svg" alt="excel" />
                                        <ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            className="download-table-xls-button"
                                            table="table-to-xls"
                                            filename="tablexls.csv"
                                            sheet="tablexls.csv"
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
                       <Dropdown>
                           <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                               <img src="../public/assets/images/filter.svg" alt="filter_img" />
                               <span> Retrieval Option</span>
                           </Dropdown.Toggle>
                           <Dropdown.Menu className="Repothers-dropdown">
                               <RetrivalOption
                                   updateData={this.updateData.bind(this)}
                                   reportparameter={reportparameter}
                                   report_id={report_id}
                                   updateFormData={this.updateFormData.bind(this)}
                               />
                               <Dropdown.Item eventKey="1">
                                    <button className="gradient-btn "  onClick={() => this.data_view()}>Apply</button>
                                </Dropdown.Item>
                           </Dropdown.Menu>
                       </Dropdown>
                       <Filter 
                           tableHeader={useHeader} 
                           onChangeFilter={this.onChangeFilter} 
                           filterText={filterText} 
                           keyName={keyName} 
                           placeholder={labels.filterPlaceholder}
                       />
                   </div>
                </div>
                <Row>
                    <Col xs={12} className="datatable">
                        <div className="table-responsive dcrtableheight">
                        <Table  id="table-to-xls" className="hidetable">
                                <TableHeader 
                                  tableHeader={useHeader}
                                  keyName={keyName1}
                                  sortedProp={sortedProp}
                                  onSortChange={this.onSortChange}
                                />
                                <TableBody
                                tableHeader={useHeader}
                                keyName={keyName1}
                                labels={labels}
                                paginatedData={paginatedData1}
                                />
                            </Table>
                            <Table  id="hidetable">
                                <TableHeader 
                                  tableHeader={useHeader}
                                  keyName={keyName}
                                  sortedProp={sortedProp}
                                  onSortChange={this.onSortChange}
                                />
                                <TableBody
                                tableHeader={useHeader}
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
            </div>
        );
    }
}

export default ReportTable;