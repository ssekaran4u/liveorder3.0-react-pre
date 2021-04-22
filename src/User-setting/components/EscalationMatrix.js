import React, { Component } from 'react'
import { Row, Col, Dropdown, Button, Form } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import "../../user-rights/components/prog-tracker.css";
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import InputBox from './InputBox'


class EscalationMatrix extends Component {
    constructor(props) {
        super(props)
        this.state = {
           
            tableDetails: [],
            header1: [],
            header2: [],
            bodySequence: [],
            showmodalsuc: false,
            tabledetais1 :[],
            reset: false,
           
        }
        this.getdesignation = this.getdesignation.bind(this)
        this.updateprice = this.updateprice.bind(this)
        this.onSave = this.onSave.bind(this)
        this.getInputVal = this.getInputVal.bind(this)
        this.onHide1 = this.onHide1.bind(this)
        this.OnCancel = this.OnCancel.bind(this)
       
        

    }
    onHide1() {
        this.setState({
            showmodalsuc: !this.state.showmodalsuc
        })
    }
    OnCancel(){
        this.setState({reset:true})
        let header1 = [];
        let header2 = [];
        let bodySequence = [];
        let hdng = []
        let headers = []
        let details = []

        var travelModes={"Index": "fsheirarchy",data:{}  }

        postToServer("LeaveApprovelSetup", travelModes).then((Result) => {
            
             console.log(Result.data.Status,"status")
            if (Result.data.Status == 'success') {

                
                hdng=Result.data.Data[0]['HEIR']
                 console.log(hdng,"result");
                headers=Result.data.Data[0]['HEIR'].split(",")
                 console.log(headers,'split  hdr')
        headers.map((res,index) => {
             console.log(res,'cccc')
            let subHeaders = res
            header1.push({
                values:'',
                id:res+index,
                name: res
            })
        })

        var travelModes={"Index": "LoadDataEscalationMatrix",data:{}  }

        postToServer("LeaveApprovelSetup", travelModes).then((Result) => {
            
            if (Result.data.Status == 'success') {
                details = Result.data.Data
                console.log(Result.data.Data,'sojan')
                this.setState({tableDetails: Result.data.Data})
            }
        })



        this.setState({
            header1: header1,
            header2: header2,
            bodySequence: bodySequence,
            // tableDetails: details
        })
        
            }
        })
    }
    onSave()
    {
        let data =''
        var cnt =0
        var table = document.querySelector("table tbody");
         var rows = table.children;
        // console.log(rows.length,'rows length')
        for (var i = 0; i < rows.length; i++) {
        var fields = rows[i].children;
        // console.log(fields.length,'filed lenght')
          for (var j = 0; j < fields.length; j++) {
//    console.log(fields[j].innerHTML.includes('Input'),'input')
            if(fields[j].innerHTML.includes('<div>')){

                if(cnt==0)
                {
                    if(data!='')
                    {
                    data =  data + fields[j].children[0].children[0].children[0].children[2].children[0].id +'|'
                    }
                    else{
                        data =   fields[j].children[0].children[0].children[0].children[2].children[0].id +'|'
                    }
                    cnt++
                }
                if(j==fields.length-1)
                {
                    data=  data + fields[j].children[0].children[0].children[0].children[2].children[0].value 
                }
                else
                {
                    // console.log('ddddddddddd')
                    data=  data + fields[j].children[0].children[0].children[0].children[2].children[0].value + '~'
                }
               
            }else{
                
            }
            
          }
           data= data.trimEnd("~") + '^'
          cnt=0;
          
         }
         console.log(data,'lll')

         var save = { "Index": "SaveEscalationMatrix",  data:{ "savedata":data}  }
            postToServer("LeaveApprovelSetup", save).then((response) => {
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({showmodalsuc:true, succmsg : 'Saved Successfully'})
                }
            }).catch((Error) => {
                this.setState({showmodalsuc:true, succmsg : 'Saved Failed'})
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })
         
    }
    updateprice(event,id)
    {
         
        
    }
    getdesignation()
    {

    }

    getInputVal( amtdet) {
        
        this.setState({reset:false})

    }
    componentDidMount() {
        let header1 = [];
        let header2 = [];
        let bodySequence = [];
        let hdng = []
        let headers = []
        let details = []

        var travelModes={"Index": "fsheirarchy",data:{}  }

        postToServer("LeaveApprovelSetup", travelModes).then((Result) => {
            
            // console.log(Result.data.Status,"status")
            if (Result.data.Status == 'success') {

                
                hdng=Result.data.Data[0]['HEIR']
                // console.log(hdng,"result");
                headers=Result.data.Data[0]['HEIR'].split(",")
                // console.log(headers,'split  hdr')
        headers.map((res,index) => {
            // console.log(res,'cccc')
            let subHeaders = res
            header1.push({
                values:'',
                id:res+index,
                name: res
            })
        })

        var travelModes={"Index": "LoadDataEscalationMatrix",data:{}  }

        postToServer("LeaveApprovelSetup", travelModes).then((Result) => {
            
            if (Result.data.Status == 'success') {
                details = Result.data.Data
                this.setState({tableDetails: Result.data.Data, tabledetais1 : Result.data.Data})
            }
        })



        this.setState({
            header1: header1,
            header2: header2,
            bodySequence: bodySequence,
            // tableDetails: details
        })
            }
        })

    }
    render() {
        return (
            <div>
                <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">
                                Escalation Matrix
                        </h4>
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                    <Breadcrumb.Item>
                                        <Link to="/dashboard">Dashboard </Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                    <Link to="/user-setting">
                                    Setup Module 
                                         </Link>
                            </Breadcrumb.Item>
                             <Breadcrumb.Item>
                                    <Link to="">
                                    Escalation Matrix 
                                         </Link>
                            </Breadcrumb.Item>
                                   {/* <Breadcrumb.Item active>
                                    Leave Approvel Setup 
                            </Breadcrumb.Item> */}
                                </Breadcrumb>
                            </div>
                        </div>
                <div className="sfa_report_table_con" style={{"padding-left": "50px"}}>
                <table>
                    <thead>
                        
                        <tr className="first_row_rep_tab">
                             <th className="lar_wid">NAME</th>
                            {this.state.header1.map((res, i) =>
                                <th key={i} className="bor_rows" >{res.name}</th>
                            )}
                            
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.tableDetails.map((res1, i) =>
                            <tr >
                            <td className="lar_wid">{res1['Name']}</td>
                            {this.state.header1.map((res, index) =>
                            
                                <td>
                                <div  className="user-heirarchy-field-containers ">
                                <InputBox  id={res1["n_srno"]} value={res1["fs"+(index+2)]} getInputVal={this.getInputVal} reset={this.state.reset} />
                                </div>
                                </td>
                            
                            )}
                                
                            </tr>
                    )}
                        
                    </tbody>
                </table>
            </div>

            
            <div><Button className="sfcAddBtn-loaditem" onClick={this.onSave}>SAVE</Button><Button className="sfcAddBtn-loaditem" onClick={this.OnCancel}>CANCEL</Button></div>

                    
                <StatusPopup
                    message={this.state.msg}
                    show={this.state.showmodal}
                    onClose={this.onHide}
                    success={false}
                />

                <StatusPopup
                    message={this.state.succmsg}
                    show={this.state.showmodalsuc}
                    onClose={this.onHide1}
                    success={true}
                />
            </div>
        )
    }
}
export default EscalationMatrix