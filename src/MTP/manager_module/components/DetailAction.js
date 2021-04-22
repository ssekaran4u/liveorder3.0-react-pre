import React, { Component } from 'react';
import { Breadcrumb,Button,Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AppointmentDetailTable from './AppointmentDetailTable';
import ProductDetailTable from './ProductDetailTable';
import {postToServer} from '../../../lib/comm-utils'

class DetailAction extends Component {
    constructor(props){
        super(props)
        this.state={
            proList:[]
        }
       
    }
   
    render() { 

        var actionButtons = <div><img src="../public/assets/images/editRow.svg"  /><img src="../public/assets/images/deletetpd.svg" style={{ paddingLeft : "25px"}} /></div>

        const appointmentHeader = [
            { prop: 'slno', title: 'Sl. No.' },
            // { prop: 'action', title: 'Action'},
            { prop: 'date1', title: 'Date'},
            { prop: 'time', title: 'Time'},
            { prop: 'dayweek', title: 'Day/Week' },
           
            { prop: 'workingwith', title: 'Working With'}
        ]

        const appointmentBody = [
            { slno : '01', date : '01-01-2020', time : '01:00 PM TO 01:30 PM', dayweek : 'Monday-Week 1', action : 'Action', workingwith : 'MR1'},
            { slno : '02', date : '02-01-2020', time : '01:00 PM TO 01:30 PM', dayweek : 'Monday-Week 3', action : 'Action', workingwith : 'MR1'},
            { slno : '03', date : '03-01-2020', time : '01:00 PM TO 01:30 PM', dayweek : 'Monday-Week 2', action : 'Action', workingwith : 'MR1'}
        ]
        var headerCheckBox = <div className=""><Form.Check
        custom
        type="checkbox"
        id="day1"
        label=""
        name=""
        onChange=""
    /></div>
        
        appointmentBody.map((item) => {
            if(item.action == "Action"){
                item.action = actionButtons
            }
            item.workingwith = headerCheckBox
        }) 

        const productHeader = [
            // { prop: 'action', title: 'Action' },
            { prop: 'srno', title: 'Sl No.' },
            { prop: 'date1', title: 'Date'},
            { prop: 'product', title: 'Product'},
            { prop: 'sample', title: 'Sample' },
            { prop: 'promotionalItem', title: 'Pramotional Items' },
            { prop: 'brandReminders', title: 'Brand Reminders' },
            { prop: 'quntity', title: 'Quantity' },
           
            
            
            
        ]

        const productBody = [
            { slno : '01', date : '01-01-2020', product : 'Dermadew Soap', sample : 'Bromogen 2.5', promotionalItem : 'Anocream', brandReminders: 'Pink Care Hand',  action : 'Action' },
            { slno : '02', date : '01-01-2020', product : 'Dermadew Soap', sample : 'Bromogen 2.5', promotionalItem : 'Anocream', brandReminders: 'Pink Care Hand',  action : 'Action' },
            { slno : '03', date : '01-01-2020', product : 'Dermadew Soap', sample : 'Bromogen 2.5', promotionalItem : 'Anocream', brandReminders: 'Pink Care Hand',  action : 'Action' }
        ]
        let itemp =[]
        let m=[]
        { this.props.proList.filter(x => x.C_Doc_Code.trim() == this.props.dId.trim() ).map((a)=>{
            m.push(a)
        }
            
          //  
          //console.log(a,this.props.dId,'kunal sinha')  
            
            )}
        m ? m.map((item,index) => {
           
            if(item.action == "Action"){
                item.action = actionButtons
            }
           if(item.Type == "Product"  ){
                 item.product = item.C_Name
                 item.quntity='-'
            // }else{
            //     item.product = "-"
           // itemp.push(item.C_Name)
            }
            if(item.Type == "sample"     ){
                item.sample = item.C_Name  // +'('+ item.quntity +')'
            }
           //promotionalItem
           if( item.Type ==   "Promational" ){
            item.promotionalItem = item.C_Name // +'('+ item.quntity +')'
        }




        if( item.Type ==   "GIFT" ){
            item.brandReminders = item.C_Name  //+'('+ item.quntity +')'
        }
            item.srno = index+1
            let m 
            let d
            if(this.props.month < 10){
                m='0'+this.props.month
            }else{
                m=this.props.month
            }
            if(this.props.date < 10){
                d = '0'+this.props.date
            }else{
                d =this.props.date
            }
            item.date1 = d+"/"+m+"/"+this.props.year
            itemp.map((ip)=>{
                item.product = ip
            })
        }) : null
    //    M.map((q)=>{})

       //  console.log(m,'kunal sinha', this.props.proList,this.props.dId)
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
       
        return (
            <React.Fragment>
                <div className="cardspacing">
                    <div className="">
                        {/* <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">MR1 TP STATUS</h4>
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                    <Breadcrumb.Item href="#">
                                        <Link to='#'>Dashboard</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                    <Link to='/manager-mtp'>TPT Template</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                        <Link to="/dayWisetp">Day Wise TP Template</Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                        Appointments and Product Details
                                    </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div> */}
                        {/* <div className="mtpList1">
                        <AppointmentDetailTable
                            tableHeader={appointmentHeader}
                            tableBody={appointmentBody}
                            keyName="userTable"
                            tableClass="striped hover table-responsive"
                            rowsPerPage={10}
                            rowsPerPageOption={[5,10, 20, 50, 100, 200]}
                            initialSort={{ prop: "username", isAscending: true, }}
                            labels={customLabels}
                        />
                        </div> */}
                        <div className="mtpList1">
                        <ProductDetailTable
                            tableHeader={productHeader}
                            tableBody={m}
                            keyName="userTable"
                            tableClass="striped hover table-responsive"
                            //rowsPerPage={10}
                            rowsPerPageOption={[5,10, 20, 50, 100, 200]}
                            initialSort={{ prop: "username", isAscending: true, }}
                            labels={customLabels}
                            item={this.props.item}
                        />
                        </div>
                        {/* <div className="actionButtons">
                            <Button
                                variant="secondary"
                                onClick={this.closeModal}
                                className="cancelBtn"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="planBtn"
                                id="saveBtn"
                                onClick={this.handleSubmit}
                            >
                                Save
                            </Button>         
                        </div> */}
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DetailAction;