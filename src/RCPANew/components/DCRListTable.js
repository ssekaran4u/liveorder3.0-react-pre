import React, { Component } from "react";

import CustomTable from "./CustomTable";

import { connect } from "react-redux";
import { getDCRList } from "../../actions/RCPA_API_LIST";
import { withRouter } from "react-router";
import DashLoader from "../../lib/DashboardLoader";

class DCRListTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            toggleHeader: this.props.toggleHeader,
            unslectedColumns: [],
            reportdate:[],
            count: 0,
            repodate:true,
            entrydate:true
        };
        
        this.dcrList = this.dcrList.bind(this);
        this.getUnselectedColumns = this.getUnselectedColumns.bind(this);
        this.DcrEdit = this.DcrEdit.bind(this);
        this.sortDate = this.sortDate.bind(this)
        this.sortEntryDate = this.sortEntryDate.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.data) {
            return { ...prevState, data: nextProps.data };
        }
        if (prevState.toggleHeader !== nextProps.toggleHeader)
            return { ...prevState, toggleHeader: nextProps.toggleHeader };
        return null;
    }

    componentDidMount() {
        const demodata = this.props.data
        this.setState({
            demo:demodata
        })
        this.dcrList();
    }

    dcrList() {
        var data = {
            Index: "RCPA_List"
        };
        this.props.getDCRList(data);
    }

    getUnselectedColumns(unslectedColumns) {
        this.setState({
            unslectedColumns
        });
    }

    DcrEdit(e, head) {
        let jsonObj = JSON.parse(e.target.id)
        let date = jsonObj.date
        this.props.history.push(
            "/CreateRCPA/" + encodeURIComponent(jsonObj.srNo + "," + jsonObj.dcrNo + "," + date + "," + jsonObj.isDcr + "," + jsonObj.isEditable)
        );
    }

    sortDate(){ 
        let sorteddates 
    
        if(this.state.repodate == true){
             sorteddates = this.state.data.sort((a, b) => new Date(...a.ReportDate.split('/').reverse()) - new Date(...b.ReportDate.split('/').reverse()));
        }else{ 
            sorteddates = this.state.data.sort((a, b) => new Date(...b.ReportDate.split('/').reverse()) - new Date(...a.ReportDate.split('/').reverse()))
        }
        this.setState({
            data:sorteddates,
            count:this.state.count+1,
            repodate:!this.state.repodate
        })
    }

    sortEntryDate(){
        let sortedEntrydates
        if (this.state.entrydate == true) {
            this.state.data.sort((a, b) => new Date(...a.EntryDate.split('/').reverse()) - new Date(...b.EntryDate.split('/').reverse()));
        } else {
            this.state.data.sort((a, b) => new Date(...b.EntryDate.split('/').reverse()) - new Date(...a.EntryDate.split('/').reverse()));
        }
      
        this.setState({
            data:sortedEntrydates,
            entrydate:!this.state.entrydate
        })
    }

    render() { 
        const tempdata=this.state.data
        const {  data, toggleHeader, unslectedColumns } = this.state;
        let header = [];
        let displayedColumns = [];
        let headerColums = [];

        if (data) {
            headerColums = ["Edit", "Date", "Doctor Code", "Doctor Name", "SubArea", "Chemist Count", "Product Count"];
            if (unslectedColumns.length == 0) {
                displayedColumns = headerColums;
            } else {
                displayedColumns = headerColums;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                unslectedColumns.map(unslectedColumn => {                                                   
                    displayedColumns = displayedColumns.filter(columnName => {
                        return columnName != unslectedColumn;
                    });
                });
            }
            displayedColumns.map(item => {
                let headerList = {
                    title: item,
                    prop: item,
                    sortable: true,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                    filterable: true
                };
                header.push(headerList);
            });
        }

        let d = new Date()
        // let monthvar

        // if(){
        //     monthvar = '0'+(d.getMonth()+1)
        // }else{
        //     monthvar = monthvar+1
        // }
        // month = new Date().getMonth()+1
        const mon= d.getMonth()+1 <= 9 ? '0'+(d.getMonth()+1) :d.getMonth()+1 ;
        const dateloc=new Date().getDate() <= 9  ? '0'+new Date().getDate() :new Date().getDate();
        const todaydate = dateloc+"/"+ mon +"/"+new Date().getFullYear();

        if(header){
            header.map((item) =>{
                if(item.title == "Edit"){
                    item.title =""
                    item.sortable = false
                }
                // if(item.title == "ReportDate"){
                //     item.title =<span onClick={() =>this.sortDate(this.state.count)}>ReportDate<i className="fa fa-sort fa-fw" aria-hidden="false"></i></span>
                //     item.sortable = false
                // }
                // if(item.title == "EntryDate"){
                //     item.title =<span onClick={this.sortEntryDate}>EntryDate<i className="fa fa-sort fa-fw" aria-hidden="false"></i></span>
                //     item.sortable = false
                // }
                // if(item.ReportNo){
                //     item.ReportNo = Number(item.ReportNo)
                // }
            })
        }
    
        let reportdate = []
        let dcrtype=<span className="dcrup">DCR</span>
        let mcrtype=<span className="dcrup">MCR</span>
        
        if (data) {
            data.map((item) => {
                if (item.dcr_flg == "1") {
                    item.edit_flg = "0"
                    item["Doctor Name"] = item["Doctor Name"] + " (DCR)"
                }
                let dataStr = '{"srNo":"'+item.n_srno+'","dcrNo":"'+item.dcr_no+'","date":"'+item.Date+'","isDcr":"'+item.dcr_flg+'","isEditable":"'+item.edit_flg+'"}';
                if (item.edit_flg == 1) {
                    item.Edit=<img src="../public/assets/images/edit_icon.svg" className="dcrimg" id={dataStr} onClick={(e) => this.DcrEdit(e, header)}/>
                } else {
                    item.Edit=<img src="../public/assets/images/eye.svg" className="dcrimg" id={dataStr} onClick={(e) => this.DcrEdit(e, header)}/>
                }
                // if (item.Type == 'DCR') {
                //     item.Type = dcrtype
                // } else if(item.Type == 'MCR') {
                //     item.Type = mcrtype
                // }
                // if (item.ReportNo) {
                //     item.ReportNo = Number(item.ReportNo)
                // }
            })
        }

        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            entries: "items/page",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };

        // if (!data && data == undefined) return null;
        // else {
        return (
            <div>
            {!this.props.data ?
                <div className="">
                <DashLoader></DashLoader></div>
                :
            <CustomTable
                tempdata={this.state.data}
                tableHeader={header}
                tableBody={data}
                keyName="userTable"
                tableClass="striped hover table-responsive"
                rowsPerPage={10}
                rowsPerPageOption={[10, 20, 50, 100, 200]}
                initialSort={{ prop: "username", isAscending: true, }}
                labels={customLabels}
                headerColums={headerColums}
                getUnselectedColumns={this.getUnselectedColumns}
            />}
            </div>
        );
        //  }
    }
}

const mapStateToProps = state => ({
    data: state.DCRList.data
    // toggleHeader: state.DCRList.toggleHeader
});

const mapDispatchToProps = dispatch => ({
    getDCRList: data => dispatch(getDCRList(data))
});

export default  withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(DCRListTable));



