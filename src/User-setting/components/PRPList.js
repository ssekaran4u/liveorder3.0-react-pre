import React, { Component } from "react";
import { Link } from "react-router-dom";
import PrplistTablebody from "./PRPListtablebody"
import { postToServer } from '../../lib/comm-utils'
import {  PRP_SETUP } from '../../lib/constants'
import SfaModal from "../../BasicComponet/sfaModal"

class PRPList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner : false,
            prplistdata : [],
            srnum:"",
            deletecode:"",
            deletedata:"",
            showSuccessdelete:false,
        }
        this.onDelete = this.onDelete.bind(this)
        this.onSuccessdelete = this.onSuccessdelete.bind(this)
        this.onHidee = this.onHidee.bind(this)
}

onSuccessdelete() {
    this.setState({ showSuccessdelete: true })
}

onHidee(){
    this.setState({ showSuccessdelete: false })
}

componentDidMount(){

    this.setState({ spinner: true})
    var prpdata = {
        "index": "PrpReportList", 
        
    }
    postToServer( PRP_SETUP, prpdata)
        .then((response) => {
            // console.log(response,"response")
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({prplistdata : response.data.Data})
                this.setState({ spinner: false})
            }

        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Api At PRPSETUP page" })
        })
 
}



onDelete(deletecode) {
    console.log(deletecode,"deletecode")
    this.state.prplistdata.length ? this.state.prplistdata.map(res => {
        if (res.Srno == deletecode) {
            var deletedata = {
            "Index": "PrpReportDelete", //"PrpExist", 
            "Data":{"SRNO":deletecode}
        }
            postToServer(PRP_SETUP, deletedata).then((response) => {
              console.log(response, deletedata,"deletedata")
              if (response.status == 200) {
                this.setState({ deletedata: response.data.Data[0].msg,  })
                this.setState({ showSuccessdelete: true })
              }
            }).catch((Error) => {
              this.setState({ Error: true, Errormsg: "Error in Api At PRPSETUP page" })
            })
        }
        this.componentDidMount()
    }) : null
}
 
 

    render() {
        console.log(this.state.prplistdata, this.state.srnum, "prplistdata")

        const header = [
            { prop: 'Action', title: 'Action', filterable: true },
            { prop: 'sinum', title: 'SI. NO.', sortable: true, filterable: true },
            { prop: 'prpreport', title: 'PRP Report Name', sortable: true, filterable: true },
            // { prop: 'reportcreate', title: 'Report Created Date', sortable: true, filterable: true },
        ];

        

        var body = []
        {
            this.state.prplistdata.length  > 0 ? this.state.prplistdata.map((res) =>{
                body.push({
                    Action:"action",
                    sinum: res.Srno,
                    prpreport:  res.Name,
                    reportcreate:"",

                })

            }): null
        }

         
        body.map((item) => {

            var Action = <div>
      <Link to={{ pathname: "/prp-add/" + item.sinum  }} > <img src="../public/assets/images/edit_icon.svg" className="hcursur user-pr10"  /></Link> 
        <img onClick = { () => this.onDelete(item.sinum)} src="../public/assets/images/delete.svg" className="hcursur"  />
    </div>
            if (item.Action == "action") {
                item.Action = Action
            }
        })
              
          

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

        var successTextdelete = <div className="expense-success-msg">{this.state.deletedata} </div>
        var OK = <div className="prpok"><button onClick = {this.onHidee} className="btnnok">OK</button></div>

        return (
            <div >
               <SfaModal
                        show={this.state.showSuccessdelete}
                        imagePath={"../../../public/assets/images/submitplan.svg"}
                        onHide={this.onSuccessdelete}
                        subDiv={successTextdelete}
                        buttonGroup={OK}
                        size="sm"
                    />
                <PrplistTablebody
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels} />
            </div>
        )
    }
}

export default PRPList;