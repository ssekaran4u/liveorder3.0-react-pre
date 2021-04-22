import React, {Component} from 'react';
import FilterOptions from './FilterOptions';
import TableComp from './TableComp'
import Loader from '../../lib/Loader'
import { URL_LIST_MASTER2 } from '../../lib/constants'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'


class MasterTable extends Component{
    
    constructor(props) {
        super(props)
        this.state = {
            rowsPerPage:10,
            page:0,
            displayedColumns:[],
            sortColumn:'',
            sortDown:true,
            showLoader:false,
            searchString:'',
            tmpSearchString:'',
            maxRows:0,
            popupShow:false,
            popupMessage:'',
            popupSuccess:true,
            data:[],
            
        }
        this.getFreshData = this.getFreshData.bind(this)
    }
    
    updateRowsPerPage(rows) {
        const { tableId } = this.props
        const { searchString, sortColumn, sortDown } = this.state
        rows = parseInt(rows)
        this.setState({rowsPerPage:rows})
        this.getFreshData(tableId, 1, rows, searchString, sortColumn, sortDown)
    }

    changeDisplayedColumns(displayedColumns) {
        this.setState({displayedColumns})
    }

    setSortColumn(name) {
        let {sortColumn, sortDown, searchString, rowsPerPage} = this.state
        const { tableId } = this.props
        if (sortColumn === name)
            sortDown = !sortDown
        else {
            sortColumn = name
            sortDown: true
        }
        this.getFreshData(tableId, 1, rowsPerPage, searchString, sortColumn, sortDown)
    }

    getFreshData(menuId, page, pageSize, searchString, sortColumn, sortDown) {
        let data = {
            //Token: "sfa360|MR1(Salem)|MR1|TNH0012|AIAaDdKtMMZSQSxbEwU2019-05-02T11:33:51+05:30",
            menuid:menuId.toString(),
            pageindex:page.toString(),
            pagesize:pageSize.toString(),
            searchparam:searchString?searchString:"",
        }
        if (sortColumn) {
            data.sort  = sortColumn
            data.order = sortDown ? "desc" : "asc"
        }
        this.setState({showLoader:true})
        postToServer(URL_LIST_MASTER2,data)
            .then((resp) => {
                if (resp.data && resp.data.data && (resp.data.data.length > 0)) {
                    const data = resp.data.data
                    let displayedColumns = Object.keys(data[0]).map(v => v)
                    let maxRows = resp.data.maxpage
                    //alert(displayedColumns)
                 
                    this.setState({
                        data,
                        displayedColumns,
                        maxRows,
                        sortColumn: sortColumn?sortColumn:'',
                        sortDown,
                        page,
                        searchString,
                        rowsPerPage:pageSize,
                        showLoader:false
                    })
               
                
                }
                else {
                  
                    // this.setState({
                    //     data:[],
                    //     displayedColumns:[],
                    //     maxRows,
                    //     sortColumn,
                    //     sortDown,
                    //     page,
                    //     searchString,
                    //     rowsPerPage:pageSize,
                    //     showLoader:false
                    // })
                   
                    this.setState({
                        showLoader:false
                    })
                    this.showFailure(`No Data`)
                   //this.componentDidMount()
                    //this. onSearch(event)
                   // this.showFailure(`failed API call with code: ${resp.data.statusCode}`)
                }
            }).catch((Error) => {
                this.setState({
                    show: true, meg: 'Error In App  Control load'
                })

            })  ;
    }

    goToNextPage() {
        const { tableId } = this.props
        const { rowsPerPage, page, searchString, sortColumn, sortDown } = this.state
        this.getFreshData(tableId, page+1, rowsPerPage, searchString, sortColumn, sortDown)
    }

    goToPrevPage() {
        const { tableId } = this.props
        const { rowsPerPage, page, searchString, sortColumn, sortDown } = this.state
        if (page > 1)
            this.getFreshData(tableId, page-1, rowsPerPage, searchString, sortColumn, sortDown)
    }

    goToPage(pg) {
        const { tableId } = this.props
        const { rowsPerPage, page, searchString, sortColumn, sortDown } = this.state
        if (pg && (pg !== page))
            this.getFreshData(tableId, pg, rowsPerPage, searchString, sortColumn, sortDown)
    }

    onSearch(event) {
      
        event.preventDefault();
        const { searchString, tmpSearchString, rowsPerPage } = this.state
       
        if (tmpSearchString !== searchString ) {
            const { tableId } = this.props
            this.getFreshData(tableId, 1, rowsPerPage, tmpSearchString)
        }
       
    }

    setSearchString(event) {
       
        const { value } = event.target
        this.setState({tmpSearchString:value})
    }

    showFailure(message) {
        this.showStatusPopup(message, false)
    }

    showStatusPopup(message, success) {
        this.setState({
            popupShow: true,
            popupMessage:message,
            popupSuccess:success,
        });
    }

    closeStatusPopup() {
        this.setState({
            popupShow: false,
            popupMessage:''
        });
    }

    componentDidMount() {
        //alert("h")
        const { tableId } = this.props
        const { rowsPerPage } = this.state
        if (tableId > 0)
            this.getFreshData(tableId, 1, rowsPerPage)
    }
    
    editRow(row) {

         this.props.clickrow(row)

      //  console.log("row:", row)
    }

    componentDidUpdate(prevProps, prevState) {
        const { tableId } = this.props
        const { rowsPerPage } = this.state
        const oldTableId = prevProps.tableId
        if ((tableId !== oldTableId) && (tableId > 0))
            this.getFreshData(tableId, 1, rowsPerPage)
    }
    
    render(){
        const { rowsPerPage, displayedColumns, data, sortColumn, sortDown, showLoader, maxRows, page } = this.state
        const { tmpSearchString, popupShow, popupMessage, popupSuccess } = this.state
        const { rowsPerPageOption, showHeader } = this.props
        if (data.length == 0)
            return (null)
        const header = Object.keys(data[0])
        const startRow = (page-1)*rowsPerPage+1
        let endRow = startRow+rowsPerPage-1
        if (endRow > maxRows)
            endRow = maxRows
        const maxPage = Math.ceil(maxRows/rowsPerPage)
        const pg1 = page <= 2 ? 1 : page - 1
        const pg2 = pg1 + 1 <= maxPage ? pg1 + 1:false
        const pg3 = pg2 ? (pg2 + 1 <= maxPage ? pg2 + 1:false) : false
        return(
            <div>
                {showHeader &&
                <FilterOptions
                   data={data}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOption={rowsPerPageOption}
                    updateRowsPerPage={this.updateRowsPerPage.bind(this)}
                    displayedColumns={displayedColumns}
                    changeDisplayedColumns={this.changeDisplayedColumns.bind(this)}
                    header={header}
                    onSearch={this.onSearch.bind(this)}
                    setSearchString={this.setSearchString.bind(this)}
                    searchString={tmpSearchString}
                    urlid={this.props.tableId}
                />
                }
                <div className="msttable">
                 <div className="table-responsive dcrtableheight">
                <TableComp
                    displayedColumns={displayedColumns}
                    data={data}
                    setSortColumn={this.setSortColumn.bind(this)}
                    sortColumn={sortColumn}
                    sortDown={sortDown}
                    editRow={this.editRow.bind(this)}
                    
                />
                </div>
                </div>
                <div className="pagination-sec new">
                    <div className="current-entries">
                        Showing {startRow} to {endRow} of {maxRows} entries
                    </div>
                    <div className="btn-group-page-nav btn-group">
                        {/* {(page > 1) && */}
                        <button onClick={this.goToPrevPage.bind(this)} disabled={page > 1 ? false : true} type="button" className="btn btn-default">&lt;
                            Prev</button>
                        {/* } */}
                        <button onClick={this.goToPage.bind(this, pg1)} type="button" className={`btn btn-default ${pg1 == page ? 'active': ''}`}>{pg1}</button>
                        <button onClick={this.goToPage.bind(this, pg2)} type="button" className={`btn btn-default ${pg2 == page ? 'active': ''}`}>{pg2}</button>
                        <button onClick={this.goToPage.bind(this, pg3)} type="button" className={`btn btn-default ${pg3 == page ? 'active': ''}`}>{pg3}</button>
                        {/* {(page < maxPage) && */}
                        <button onClick={this.goToNextPage.bind(this)} disabled={page < maxPage ? false : true} type="button" className="btn btn-default">
                            Next&gt;</button>
                        {/* } */}
                    </div>
                </div>
                <Loader show={showLoader} />
                <StatusPopup
                    message={popupMessage}
                    show={popupShow}
                    onClose={this.closeStatusPopup.bind(this)}
                    success={popupSuccess}
                />
            </div>
        )
    }
}

export default MasterTable;
