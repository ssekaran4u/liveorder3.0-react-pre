import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDrop from '../components/FilterOptionDrop'
import {postToServer} from '../../../lib/comm-utils'
import StatusPopup from '../../../lib/StatusPopup'
class DownlineFilterOption extends Component {
    constructor(props){
        super(props)
        this.state={
            month:'',
            year:'',
            fsname:'',
            status:'',
            fname:[],
            msgStatus:'',
            success:false,
            smsg:'',
            showStatusModal:false
        }
        this.getMonth = this.getMonth.bind(this)
        this.getyear= this.getyear.bind(this)
        this.getFsname = this.getFsname.bind(this)
        this.getStatus = this.getStatus.bind(this)
        this.filterApply= this.filterApply.bind(this)
        this.downfs= this.downfs.bind(this)
    }

    downfs(){
        var data ={"index":"Down_FS","menuid":"38","Token":""}
        postToServer("MTP_Manager", data).then((result) => {
            // const message=result.data[0]["Result"]
            //  this.setState({
            //     fname:result.data
            //  })
             if(result.data == null){
                this.setState({ 
                    fname:[]
                })
              }else{
                this.setState({ 
                    fname: result.data 
                })
              }
         }).catch( (Error)=>{
             console.log(Error)
             this.setState({ showStatusModal:true ,Error: true, smsg: "Error in App" })
         })
    }

    hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal,
        })
        
    }

    getMonth(month){
        this.setState({
            month:month
        })
        
    }
    getyear(year){
        this.setState({
            year:year
        })
    }
    getFsname(fsname){
        this.setState({
            fsname:fsname
        })
    }
    getStatus(status){
        this.setState({
            status:status
        })
    }
    filterApply(){
        if(this.state.month=='')
        {
            this.setState({ smsg:'Please Select Month',
            showStatusModal:true  })
            return
        }
        if(this.state.year=='')
        {
            this.setState({ smsg:'Please Select Year',
            showStatusModal:true  }) 
            return
        }

        if(this.state.fsname=='')
        {

            this.setState({ smsg:'Please Select FS Name',
            showStatusModal:true  })
            return
        }

        if(this.state.status=='')
        {
            this.setState({ smsg:'Please Select Status',
            showStatusModal:true  })
            return   
        }

        this.setState({msgStatus:''})
        this.props.getFilterData(this.state.month,this.state.year,this.state.fsname,this.state.status)
    }
    componentDidMount(){

        this.downfs();
        // var data ={"index":"MTP_downline_details","menuid":"38","Token":""}
        // postToServer("MTP_Manager", data).then((result) => {
        //     // const message=result.data[0]["Result"]
        //     //  this.setState({
        //     //     fname:result.data
        //     //  })
        //      if(Result.data == null){
        //         this.setState({ 
        //             fname:[]
        //         })
        //       }else{
        //         this.setState({ 
        //             fname: Result.data 
        //         })
        //       }
        //  }).catch( (Error)=>{
        //      console.log(Error)
        //      this.setState({ Error: true, Errormsg: "Error in App" })
        //  })

    }
    render() {
        let months =  [
            {
                'key':'m0',
                'text':'select',
                'value':'0',
            },
            {
                'key':'m1',
                'text':'January',
                'value':'1',
            },
            {
                'key':'m2',
                'text':'February',
                'value':'2',
            },
            {
                'key':'m3',
                'text':'March',
                'value':'3',
            },
            {
                'key':'m4',
                'text':'April',
                'value':'4',
            },
            {
                'key':'m5',
                'text':'May',
                'value':'5',
            },
            {
                'key':'m6',
                'text':'June',
                'value':'6',
            },
            {
                'key':'m7',
                'text':'July',
                'value':'7',
            },
            {
                'key':'m8',
                'text':'August',
                'value':'8',
            },
            {
                'key':'m9',
                'text':'September',
                'value':'9',
            },
            {
                'key':'m10',
                'text':'October',
                'value':'10',
            },
            {
                'key':'m11',
                'text':'November',
                'value':'11',
            },
            {
                'key':'m12',
                'text':'December',
                'value':'12',
            }
        ]
        let years = []
       
        let currentYear = new Date().getFullYear()
        let futureYear = parseInt(currentYear)+4
        let pastyear = parseInt(currentYear)-4
        let lastYear = parseInt(currentYear)-1
        let currentMonth =  new Date().getMonth()+1
      
        for (var i= lastYear ; i > pastyear ;i--) {
            years.push(
                {
                    'key':'year'+i,
                    'text':i,
                    'value':i,
                }
            );
            
        }
        years.push(
            {
                'key':'year-1',
                'text':'select',
                'value':'0',
            },
        ) 
        years.reverse();
      
        for (var i= currentYear ; i < futureYear ;i++) {
            years.push(
                {
                    'key':'year'+i,
                    'text':i,
                    'value':i,
                }
            );
           
        }
       // console.log("year",years)
        let status =[
            {
                'key':'0',
                'text':'Select',
                'value':'0',
            },
            {
                'key':'1',
                'text':'Approved',
                'value':'A',
            },
            {
                'key':'2',
                'text':'Pending',
                'value':'E',
            }
        ]
        let fname = []
        fname.push({
            'key':'0',
            'text':'select',
            'value':'0',
        })
        this.state.fname.map((item)=>{
            fname.push({
                'key':item.FSCODE,
                'text':item.FSNAME,
                'value':item.FSCODE,
            })
        })

        return (
            <div>
                <Dropdown className="myDropdown">
                    <Dropdown.Toggle className="dcr-options" id="dropdown-basic" style={{backgroundColor:"white", color: '#6c757d', border:"1px solid #dfdfdf", fontSize:"0.875em", borderRadius:"10px", padding:"8px 12px"}}>
                            <img src="../public/assets/images/filtering.svg" />
                            <span> Filter Option</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="Repothers-dropdown1">
                                <Tab.Container id="left-tabs-example">
                                    <div>
                                        <div className='retrival-left'>
                                            <Nav variant="pills" className="flex-column">
                                                
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Month">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Month</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Year">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Year</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="fsname">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>FS Name</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Status">
                                                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                                                        <span>Status</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>

                                        <div className='retrival-right '>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="Month">
                                                    <FilterOptionDrop 
                                                        name="Month" 
                                                        options={months} 
                                                        getData={this.getMonth}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Year">
                                                    <FilterOptionDrop 
                                                        name="Year" 
                                                        options={years} 
                                                        getData={this.getyear}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="fsname">
                                                    <FilterOptionDrop 
                                                        name="Fsname" 
                                                        options={fname} 
                                                        getData={this.getFsname}
                                                    />
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="Status">
                                                    <FilterOptionDrop 
                                                        name="Status"
                                                        options={status} 
                                                        getData={this.getStatus} 
                                                    />
                                                </Tab.Pane>
                                        
                                            </Tab.Content>
                                        </div>
                                        
                                    </div> 
                            </Tab.Container> 
                            <span  style={ {"color":"red" } } >{this.state.msgStatus} </span>       
                            <Dropdown.Item eventKey="1">
                                    <button className="gradient-btn " onClick={this.filterApply}>Apply</button>
                            </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <StatusPopup
                    message={this.state.smsg}
                    show={this.state.showStatusModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
                />
            </div>
        );
    }
}

export default DownlineFilterOption;