import React, { Component } from "react";
import RPSDetailsCustomTable from "./RPSDetailsCustomTable";
import "../../../../public/assets/css/campaignRequest.css";
import Form from "react-bootstrap/Form";
// import SearchDropdown from "../../../BasicComponet/searchDropdown";
import { Dropdown } from 'semantic-ui-react'
import {postToServer} from '../../../lib/comm-utils'
import ForwordPopup from '../popup/ForwordPopup'
import RPSNote from './RPSNote'

class RPSDetailsDeskHead extends Component {
    constructor(props) {
        super(props);
        this.state = {
          assignList:[],
          note:''
        };
        this.showForword = this.showForword.bind(this)
        this.getNote = this.getNote.bind(this)
    }

    componentDidMount(){
      var data =  {"index":"RPSDeskAssignTo","Data":{},"Token":""}
      postToServer("RPSDEskApi",data).then( (Result)=>{ 
        let AssignTo =[]
        if(Result.data.data){
          Result.data.data.map((item)=>{
            AssignTo.push({
              key: '1',
              text: 'MR1',
              value: 'MR1',
            })
          })
        }
      this.setState({
        assignList:Result.data.data
      })
      }).catch({
      })
    }

    showForword(reqno,status){
      this.props.requestFrwed(reqno,status,this.state.note)
    }
    getNote(note){
      this.setState({
        note:note
      })
    }
      
    render() { 
      const header = [
            { prop: 'rpsName', title: 'RPS Name' },
            { prop: 'n_amount', title: 'Amount', filterable: true },
            { prop: 'Status', title: 'Status', filterable: true },
            { prop: 'AssignTo', title: 'Assign To', filterable: true },
            { prop: 'Note', title: 'Note', filterable: true },
            { prop: 'Comment', title: 'Comment', filterable: true },
 
        ];
        let assignTo =
        <div className ="user-heirarchy-field-containers1">
           <Dropdown
              placeholder='Select'
              className="dcr-options rps-options"
              fluid
              selection
              options={assignto}
              onChange={(event, value) => handleChange(event, value)}
              // defaultValue={props.defaultValue}
          />
        </div>
        let note = <RPSNote getNote={this.getNote} />
        
        if(this.props.reqList.length > 0){
          this.props.reqList.map((item)=>{
            // let editRpsName = <div className="flexDisplay">
            //                     <div><img src="../public/assets/images/overflow.svg"/></div>
            //                     <div className="pl10">{item.RPSNAME}</div>
            //                   </div>
            let editRpsName = <ForwordPopup showForword={this.showForword} rpsname={item.RPSNAME} srno={item.Id} status={item.Status} />
            item.Status = 'To be Assigned'
            item.AssignTo = assignTo
            item.Note = note
            item.rpsName = editRpsName
          })
        }
         let assignto =[
            {
              key: '1',
              text: 'MR1',
              value: 'MR1',
            },
            {
              key: '2',
              text: 'MR2',
              value: 'MR2',
            },
            {
              key: '3',
              text: 'MR3',
              value: 'MR3',
            },
          ]
          return (
            <div className="bottomBor">
              <RPSDetailsCustomTable
                    tableHeader={header}
                    tableBody={this.props.reqList}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    
              />
            </div>
            );
        }
      }


export default  RPSDetailsDeskHead;



