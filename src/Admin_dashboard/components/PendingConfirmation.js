import React,{Component} from 'react'
import { OverlayTrigger,Tooltip} from 'react-bootstrap'
import PendingCustomTable from '../components/PendingCustomTable'
import {Form,Nav} from 'react-bootstrap'
import PendingMaterialList from '../components/PendingMaterialList'
import ShowApprovalDrop from '../components/ShowApprovalDrop'
import PendingDoctorList from '../components/PendingDoctorList'
import {getConfirmList} from '../../actions/AdminDashboard'
import { connect } from 'react-redux'


class PendingConfirmation extends Component{
  constructor() {
    super();
    this.state = {
       
        activeTab: '1',
        isFull:false
        
    }
    this.addclass = this.addclass.bind(this)
    this.handleView = this.handleView.bind(this)
    this.getstatusselection = this.getstatusselection.bind(this)
    this.getdoctorlist = this.getdoctorlist.bind(this)
}

  componentDidMount(){
    var data = {"Token":"","Header":{"Color":"","AllRequest":"","Fromdt":"","Todt":""},"Index":"PendingConfirmationLists" }
    this.props.getConfirmList(data)
  }
  addclass(tab){ 
  if (this.props.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  getstatusselection(fdate,tdate){ 
    var data = {"Token":"","Header":{"Color":"","AllRequest":"","Fromdt":fdate,"Todt":tdate},"Index":"PendingConfirmationLists" }
    this.props.getConfirmList(data)

  }
  getdoctorlist(fdate,tdate){ 
   this.props.getdocdata(fdate,tdate)

  }
  handleView() {
    this.setState({
        isFull: !this.state.isFull
    });
}
    render(){ 
      let expenseList = []
      let materialList = []
      let doctorlist =[]
      let Description1
      if(this.props.confirmlist){
       this.props.confirmlist.map((item) => {
          if(item.RequstType == '1'){
            expenseList.push(item);
          }
      })
    
    
      this.props.confirmlist.map((item) => {
         if(item.RequstType == '2'){
          materialList.push(item)
         }
     })
     this.props.confirmlist.map((item) => {
      if(item.RequstType == '3'){
        doctorlist.push(item)
      }
    })
   
    this.props.confirmlist.map((item) => { 
     
      if(item.Description){
        item.Description1 =  <OverlayTrigger
        overlay={
            <Tooltip
              
            >
              <div style={{"white-space":"initial","line-height":"1.5em" }}>{item.Description}</div>
            </Tooltip>
        }
        placement="right"
    ><div className="descriptionlist">{item.Description}</div></OverlayTrigger>
                      
      }
      item.Action=<ShowApprovalDrop  
                    requestAction={item.Req_Action} 
                    srno={item.Srno}
                    url={item.url} 
                    requestType={item.ReqType} 
                    getAction={this.getAction}
                    RequstType={item.RequstType}
                  /> 
    })
  }
  // if(this.props.docdata){
  //   let Description2
  //   this.props.docdata.map((item) => {  
     
  //     if(item.Description){
  //       item.Description2 =  <OverlayTrigger
  //       overlay={
  //           <Tooltip
              
  //           >
  //             <div style={{"white-space":"initial","line-height":"1.5em" }}>{item.Description}</div>
  //           </Tooltip>
  //       }
  //       placement="right"
  //   ><div className="descriptionlist">{item.Description}</div></OverlayTrigger>
                      
  //     }
  //     item.Action=<ShowApprovalDrop  requestAction={item.Req_Action} srno={item.Srno} url={item.url} requestType={item.ReqType} getAction={this.getAction}/> 
  //   })
  // }
          const header = [
              { title: 'Request Type', prop: 'ReqType',filterable: true},
              { title: 'Description', prop: 'Description1',filterable: true },
              { title: 'Req. Date', prop: 'ReqDate',sortable: true ,filterable: true },
              { title: 'Req. F.S Name', prop: 'Person Name',filterable: true  },
              { title: 'Approved Date', prop: 'ApprovedDate',sortable: true,filterable: true },
              { title: 'From Date', prop: 'DateFrom',sortable: true,filterable: true },
              { title: 'To Date', prop: 'DateTo',sortable: true,filterable: true },
              { title: 'Approved By', prop: 'ApprovedBy',sortable: true,filterable: true },
              { title: 'Action', prop: 'Action'},
            ];
            const headerdoc= [
              { title: 'Request Type', prop: 'ReqType',filterable: true},
              { title: 'Description', prop: 'Description',filterable: true },
              { title: 'Req. Date', prop: 'ReqDate',sortable: true ,filterable: true },
              { title: 'Req. F.S Name', prop: 'Person Name',filterable: true  },
              { title: 'Approved Date', prop: 'ApprovedDate',sortable: true,filterable: true },
              { title: 'From Date', prop: 'DateFrom',sortable: true,filterable: true },
              { title: 'To Date', prop: 'DateTo',sortable: true,filterable: true },
              { title: 'Approved By', prop: 'ApprovedBy',sortable: true,filterable: true },
              { title: 'Action', prop: 'Action'},
            ];
         
            const headerMaterial = [
             
                { title: 'Material Type', prop: 'ReqType',filterable: true},
                { title: 'Description', prop: 'Description',filterable: true },
                { title: 'Req. Date', prop: 'ReqDate',sortable: true,filterable: true  },
                { title: 'Req. F.S Name', prop: 'Person Name' ,filterable: true },
                { title: 'Approved Date', prop: 'ApprovedDate',sortable: true,filterable: true },
                // { title: 'From Date', prop: 'DateFrom',sortable: true,filterable: true },
                // { title: 'To Date', prop: 'DateTo',sortable: true,filterable: true },
                { title: 'Approved By', prop: 'ApprovedBy',sortable: true,filterable: true },
                { title: 'Action', prop: 'Action'},
              ];
           
       
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
      //   if(body){ 
      //     body.map( (localdata)=>{ 
          
      //         localdata.Checkbox=<Form.Check  
      //                              custom inline 
      //                              type="checkbox" 
      //                              id="custom-checkbox1" 
      //                              label="" />
      //         localdata.Action=<ShowApprovalDrop />
       
      //      })
      //  }
       
        return(
            <div className=" pendingtable AdashboardTable">
              <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
              <div className="flex-row"> 
                    <div className="pendingList mainhead_content_one bartitle">Pending Confirmation Lists</div>
                    <div className="manager_component_head_icon">
                            <div className="headicon_position">
                            {this.state.isFull ? (
                                <img
                                    src="../public/assets/images/collapse-grey.svg"
                                    onClick={this.handleView}
                                />
                            ) : (
                                <img
                                    src="../public/assets/images/fullscreen.svg"
                                    onClick={this.handleView}
                                />
                            )}
                            {/* <img
                                className="dashfullscreen"
                                src="../public/assets/images/overflow.svg"
                            /> */}
                            </div>
                        </div>
                    </div>
              {this.state.activeTab == 1 ?
              
                  <PendingCustomTable
                    tableHeader={header}
                    tableBody={expenseList}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={5}
                    rowsPerPageOption={[5, 15, 20, 25, 30]}
                    initialSort={{ prop: "username", isAscending: true }}
                    labels={customLabels}
                    activeTab={this.state.activeTab}
                    typeselection={this.getstatusselection}
                  />
                :this.state.activeTab == 2 ?
                  <PendingMaterialList
                    tableHeader={headerMaterial}
                    tableBody={materialList}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={5}
                    rowsPerPageOption={[5, 15, 20, 25, 30]}
                    initialSort={{ prop: "username", isAscending: true }}
                    labels={customLabels}
                    activeTab={this.state.activeTab}
                    typeselection={this.getstatusselection}
                  />
                :
                this.state.activeTab == 3 ?
                  <PendingDoctorList
                    tableHeader={headerdoc}
                    tableBody={doctorlist}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={5}
                    rowsPerPageOption={[5, 15, 20, 25, 30]}
                    initialSort={{ prop: "username", isAscending: true }}
                    labels={customLabels}
                    activeTab={this.state.activeTab}
                    typeselection={this.getstatusselection}
                  />:''}
                </div>
                <div className="AdashboardTable">
                  <ul className="nav nav-pills listborderTop" id="pills-tab" role="tablist">
                        
                          <li className={this.state.activeTab == 1 ?  'nav-item elementcontainer activePendingCall':  'nav-item elementcontainer activelink1' } onClick={() => { this.addclass('1'); }}>
                              <Nav.Item>
                                  <Nav.Link eventKey="first" className="linkcontainer">
                                      <p className="dashtabhead">Pending Expense List</p>
                                      <p  className="dashtabsubhead">Till Current Month</p>
                                  </Nav.Link>
                              </Nav.Item>
                          </li>
                          <li className={this.state.activeTab == 2 ?  'nav-item elementcontainer activePendingCall':  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('2'); }}>
                              <Nav.Item>
                                  <Nav.Link eventKey="first" className="linkcontainer">
                                      <p className="dashtabhead">Pending Material Request List</p>
                                      <p  className="dashtabsubhead">Till Current Month</p>
                                  </Nav.Link>
                              </Nav.Item>
                          </li>
                          <li className={this.state.activeTab == 3 ?  'nav-item elementcontainer activePendingCall':  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('3'); }}>
                              <Nav.Item>
                                  <Nav.Link eventKey="first" className="linkcontainer">
                                      <p className="dashtabhead">Doctor Addition & deletion List</p>
                                      <p  className="dashtabsubhead">Till Current Month</p>
                                  </Nav.Link>
                              </Nav.Item>
                          </li>
                  </ul>
                </div>
                
            </div>
        )
    }
}
const mapStateToProps =state =>({
  confirmlist:state.AdminDashboard.confirmlist,
})
const mapDispatchToProps = dispatch =>({
  getConfirmList:data => dispatch(getConfirmList(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(PendingConfirmation)