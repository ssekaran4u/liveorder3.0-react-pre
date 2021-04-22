import React, { Component } from 'react'
import { Row, Col, Dropdown, Button, Form } from 'react-bootstrap'
import ReactDOM from 'react-dom'
// import "./custom.css";
// import "./skeleton.css"; 
import "../../user-rights/components/prog-tracker.css";
// import "./normalize.css"; 

import { postToServer } from '../../lib/comm-utils'
//import Multistep from 'react-multistep'
import Multistep from '../../../public/react-multistep'

import SfaSpinner from "../../BasicComponet/sfaSpinner";
import DropdownSearch from "../components/dropdownsearch"
import DropdownSearchBulk from "../components/dropdownsearchBulk"
import StatusPopup from '../../lib/StatusPopup'
import StatusPopupSucc from '../popup/StatusPopupSucc'
import Loder from  '../../lib/Loader'
import DCRLockHeader from './DCRLockHeader'
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";


class LeaveApprovelSetupSave extends Component {
    constructor(props) {
        super(props)
        this.state = {
           

            userlist: [],
            uservalue: "-1",
            usererror: "",
            usercode: "",
            userlist1: [],
            selecteduserData: {},
            filteruserlist1: [],
            showuser: false,
            spinner: false,
            showmodal: false,
            msg: '',
            succmsg: '',
            showmodalsuc: false,
            loader:false,
            mainmenus:[],
            selectedfs:'',
            Selectcheck:{},
            selectedMenu:[],
            nameaarayvalue :[],
            checkedalldatasave:'',
            
             menuname:'Individual Locak Setting',
            
            nofoselected:'',
            nofoselected1:'',

            designationdropdown:[],
            designation:'',
            indiv:false,

            txtsetupid:'',
            txtlockdays:'',
            txtlockdaysfs:'',
            checkeddefault:true,
           
        }
       
        this.getdesignation = this.getdesignation.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.onCheckAll = this.onCheckAll.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onHide = this.onHide.bind(this)
        this.onHide1 = this.onHide1.bind(this)

        this.getItem = this.getItem.bind(this)
        this.getAllItem=this.getAllItem.bind(this)



       
        this.getuser=this.getuser.bind(this)
        this.onCheckFstype=this.onCheckFstype.bind(this)
        this.handlesetupidchange = this.handlesetupidchange.bind(this)
        this.lockdayschange = this.lockdayschange.bind(this)
        this.handlelockdaysfschange = this.handlelockdaysfschange.bind(this)
        this.onsavefstype = this.onsavefstype.bind(this)
        

    }


    handlesetupidchange(id){

    }
    lockdayschange(lockdays){
        if (isNaN(lockdays.target.value.trim())) {
            alert('It is not a Number');
          } else {
            this.setState({ txtlockdays: lockdays.target.value.trim() })
          }
    }

    handlelockdaysfschange(lockdays1){
        if (isNaN(lockdays1.target.value.trim())) {
            alert('It is not a Number');
          } else {
            this.setState({ txtlockdaysfs: lockdays1.target.value.trim() })
          }
    }
    onCheckFstype(event) {
        this.setState({checkeddefault : event.target.checked}) 
        if(event.target.checked==true)
        {
            this.setState({ indiv: true , showuser : false})
        }
        else{
            this.setState({ indiv: false , showuser : false})
        }
            
        
    }

    getuser(){
        if(this.state.designation==''){
            alert('Please Select The Designation')
        }
        else
        {
        let userli = []
        this.setState({ spinner:true })
        var user = { "Index": "GetFsforEdit", "Token": "", "Data":{ "id":this.state.txtsetupid,"Type":this.state.designation } }

        postToServer("LeaveApprovelSetup", user).then((response) => {

            if (response.status == 200 && response.statusText == "OK") {

                response.data.Data.map((res, i) => {
                    userli.push({
                        fcode: res.fs_code,
                        fname: res.fsname,
                        isChecked: false
                    })
                })
                this.setState({ userlist1: userli })
                this.setState({ spinner: false })
                this.setState({ showuser:true })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
            this.setState({ spinner: false })

        })
    }
    }
   

    onHide() {
        this.setState({
            showmodal: !this.state.showmodal,
        })
    }
    getAllItem(chkddta)
    {
        this.setState({checkedalldatasave:chkddta})
    }

    onHide1() {
        this.setState({
            showmodalsuc: !this.state.showmodalsuc
        })
    }

    getItem(name){
        this.setState({
            cname:name
        })
        
                 
               
     }

    // Mainchange(id){
    //     let lc=this.state.Selectcheck
    //     delete lc[id]
    //     this.setState({ Selectcheck:lc   })
    //     }
        




    getdesignation(designationlist) {
        this.setState({ designation: designationlist })

                this.setState({ userlist1: [] })
                this.setState({ showuser:false,nofoselected1:'',nofoselected:'',txtlockdaysfs:'' })

    }

 
    componentDidMount() {
        let savedntype=''
        let savedfstypecheck=''
        // alert(this.props.location.EditViewData.id)
        if(this.props.location.EditViewData.id=='new')
        {
            this.setState({checkeddefault:false})
            var data = {"Index":"GetId","Token":""}
        
            postToServer("LeaveApprovelSetup", data).then( (result)=> { 
                if(result){ 
                    
                    this.setState({
                        txtsetupid : result.data.Data[0]['Id']
                    })
                }
    
            }).catch((Error)=> {
                this.setState({ Error: true, Errormsg: Error })
            }  )

            var designation = { "Index": "GetDesignation", "Token": "", "Data": {"Id":''} }
       postToServer("LeaveApprovelSetup", designation).then((response) => {
           if (response.status == 200 && response.statusText == "OK") {
               this.setState({ designationdropdown: response.data.Data })
           }
       }).catch((Error) => {
           this.setState({ Error: true, Errormsg: "Error in Copy option" })
       })
    
        }
        else
        {
                this.setState({txtsetupid:this.props.location.EditViewData.id})
            let cnt=0
        let userlist1 = this.state.userlist1
            var    travelModes={ "Index": "SavedSetup",  data:{"Id":this.props.location.EditViewData.id}}
        postToServer("LeaveApprovelSetup", travelModes).then((Result) => {
            if (Result.data.Status == 'Success') {  
               
                this.setState({designation:Result.data.data[0]['N_Type']})
                savedntype=Result.data.data[0]['N_Type']
                savedfstypecheck = Result.data.data[0]['n_fstype']
                // console.log(Result.data.data[0]['n_fstype'],'savedfstype')


                                if(Result.data.data[0]['n_fstype'] != '1')
                                {
                                    this.setState({txtlockdaysfs:Result.data.data[0]['n_lock_days']})
                                                let userli = []
                                        this.setState({ spinner:true })
                                        var user = { "Index": "GetFsforEdit", "Token": "", "Data": { "id":this.props.location.EditViewData.id,"Type":Result.data.data[0]['N_Type'] } }
                                        postToServer("LeaveApprovelSetup", user).then((response) => {

                                            if (response.status == 200 && response.statusText == "OK") {

                                                response.data.Data.map((res, i) => {
                                                    if(res.matched!='')
                                                    {
                                                    userli.push({
                                                        fcode: res.fs_code,
                                                        fname: res.fsname,
                                                        isChecked: true
                                                        
                                                    })
                                                    cnt++
                                                }
                                                else{
                                                    userli.push({
                                                        fcode: res.fs_code,
                                                        fname: res.fsname,
                                                        isChecked: false
                                                    })
                                                    
                                                }
                                                })
                                                this.setState({ userlist1: userli })
                                                this.setState({ spinner: false })
                                                this.setState({ showuser:true })
                                                this.setState({checkeddefault:false})
                                                this.setState({ nofoselected:cnt+' Selected',nofoselected1:cnt })
                                            }
                                        }).catch((Error) => {
                                            this.setState({ Error: true, Errormsg: "Error in Copy option" })
                                            this.setState({ spinner: false })

                                        })

                                    }
                                    else{
                                        // alert()
                                        this.setState({checkeddefault:true, txtlockdays:Result.data.data[0]['n_lock_days']})
                                        this.setState({ showuser:false , indiv : true })
                                    }
                                                
            }
        })

        


       var designation = { "Index": "GetDesignation", "Token": "", "Data": {"Id":this.props.location.EditViewData.id} }
       postToServer("LeaveApprovelSetup", designation).then((response) => {
           if (response.status == 200 && response.statusText == "OK") {
               this.setState({ designationdropdown: response.data.Data })
           }
       }).catch((Error) => {
           this.setState({ Error: true, Errormsg: "Error in Copy option" })
       })
    

        }

        // var data = {"index":"Menudetails","Token":""}
        
        // postToServer("UserRight", data).then( (result)=> { 
        //     if(result){ 
                
        //         this.setState({
        //             mainmenus:result.data.submenu,
        //             submenus:result.data.Menu,
        //         })
        //     }

        // }).catch((Error)=> {
        //     this.setState({ Error: true, Errormsg: Error })
        // }  )

       


        
    }

    onCheck(event) {
        let cnt=this.state.nofoselected1
        let userlist1 = this.state.userlist1
        userlist1.forEach(res => {
            if (res.fcode == event.target.value) {
                
                res.isChecked = event.target.checked
                if( res.isChecked)
                {
                    cnt++;
                }
                else{
                    cnt--;
                }
            }
        })
        this.setState({ userlist1: userlist1,nofoselected:cnt+' Selected',nofoselected1:cnt })
    }
    onCheckAll(event) {
        let cnt=0
        let userlist1 = this.state.userlist1
        if (this.state.userlist1.length > 0) {
            userlist1.forEach(res => {
                res.isChecked = event.target.checked
                if( res.isChecked)
                {
                    cnt++;
                }
            })
            this.setState({ userlist1: userlist1,nofoselected:cnt+' Selected',nofoselected1:cnt })
        }
    }

    onsavefstype()
    {
        // console.log(this.state.txtsetupid,'set id')
        // console.log(this.state.designation,'design')
        // console.log(this.state.txtlockdays,'days')

        
        if(this.state.txtlockdays=='')
        {
            alert('Please enter the Lock Days')
        }
        else
        {
            var save = { "index": "SaveSetup",  data:{ "Id":this.state.txtsetupid,"Type":this.state.designation, "Fscode":'',
            "Lockdays":this.state.txtlockdays,"Fstype":'1'}  }
        //    console.log(save,'save api')
            postToServer("LeaveApprovelSetup", save).then((response) => {
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({showmodalsuc:true, succmsg : 'Saved Successfully'})
                }
            }).catch((Error) => {
                this.setState({showmodalsuc:true, succmsg : 'Saved Failed'})
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })

        }

    }

    onSave() {
        let datacheck = this.state.userlist1.filter(item => item.isChecked == true)
        var data = ""
        this.state.userlist1.map((res) => {
            if (res.isChecked == true) {
                data = data + res.fcode + ","
            }
        })
        // console.log(this.state.txtsetupid,'set id')
        // console.log(this.state.designation,'design')
        // console.log(this.state.txtlockdaysfs,'days')
        // console.log(data,'checked')

        if(data=='')
        {
            alert('Please Select the FS')
        }
        else if(this.state.txtlockdaysfs=='')
        {
            alert('Please enter the Lock Days')
        }
        else
        {
            
            var save = { "index": "SaveSetup",  data:{ "Id":this.state.txtsetupid,"Type":this.state.designation, "Fscode":data,
            "Lockdays":this.state.txtlockdaysfs,"Fstype":'0'}  }
        //    console.log(save,'save api')
            postToServer("LeaveApprovelSetup", save).then((response) => {
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({showmodalsuc:true, succmsg : 'Saved Successfully'})
                }
            }).catch((Error) => {
                this.setState({showmodalsuc:true, succmsg : 'Saved Failed'})
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })

        }

    }

    handleSearch(e) {
        let value = e.target.value;
        if (this.state.userlist1.length > 0) {
            const newData = this.state.userlist1.filter(item => {
                const itemData = `${item.fname}`;
                const textData = value;
                return itemData.indexOf(textData) > -1;
            });
            this.setState({
                filteruserlist1: newData
            })
        }
    }

    render() {

        const { userlist1, selecteduserData, filteruserlist1 } = this.state
        const items = userlist1.reduce((prev, item, index) => {
            const id = item.fcode + "#" + item.fname;
            const selection = selecteduserData[id] ? selecteduserData[id] : false
            prev.push(
               
                <Col lg={3} md={3} sm={6} xs={12} key={index}>
                    <div className="user-checkbox" >
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox doctor-name"
                            checked={item["isChecked"]}
                            value={item["fcode"]}
                            onClick={this.onCheck}
                        />
                        <span className="table-checkbox-custom mt-checkbox doctor-name"></span>
                        <span className="checkbox-label1">{item["fname"]}</span>
                    </div>
                </Col>
            )
            return prev
        }, [])

        const userdata = filteruserlist1.reduce((prev, item, index) => {
            const id = item.fcode + "#" + item.fname;
            prev.push(
               

                <Col lg={3} md={3} sm={6} xs={12} key={index}>
                    <div className="user-checkbox" >
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox doctor-name"
                            checked={item["isChecked"]}
                            value={item["fcode"]}
                            onClick={this.onCheck}
                        />
                        <span className="table-checkbox-custom mt-checkbox doctor-name"></span>
                        <span className="checkbox-label1">{item["fname"]}</span>
                    </div>
                </Col>
            )
            return prev
        }, [])



        

        
        let designationdropdown = []
        let userdropdown1 = []

        
        if (this.state.designationdropdown.length > 0) {
            this.state.designationdropdown.map((item) => {
                designationdropdown.push({
                    "key": item.usertype,
                    "text": item.c_name,
                    "value": item.usertype
                })
            })
        }

        if (this.state.userlist1.length > 0) {
            this.state.userlist1.map((item) => {
                userdropdown1.push({
                    "key": item.fs_code,
                    "text": item.fsname,
                    "value": item.fsname
                })
            })
        }
       
        return (
            <div>
                <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">
                                Leave Approvel Setup  
                        </h4>
                            </div>
                            <div>
                                <Breadcrumb className="dcr-breadcrumb">
                                    <Breadcrumb.Item>
                                        <Link to="/dashboard">Dashboard </Link>
                                    </Breadcrumb.Item>
                                    <Breadcrumb.Item>
                                    <Link to="/user-setting">
                                        Leave Approvel Setup
                                         </Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                    <Link to="/leaveapprovelsetup">
                                        Leave Approvel Setup List
                                         </Link>
                            </Breadcrumb.Item>
                                    <Breadcrumb.Item active>
                                    Leave Approvel Setup 
                            </Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                        </div>
                {this.state.spinner == true &&
                    <SfaSpinner />
                }
                <div className="userRight dwiseUser mb-20">
            <div className="drname">{this.state.menuname}
            </div> 
                    <div className="alldropsfclocation">
                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label className="customized-label">Setup ID</Form.Label>
                            <Form.Control type="text"
                                id="outlined-size-small"
                                value={this.state.txtsetupid}
                                onChange={this.handlesetupidchange}
                                disabled = {true} />
                                </Form.Group>
                            </div>
                        </div>

                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                            <DropdownSearchBulk
                                    className="Designation"
                                    labelName="Designation"
                                    Selected={this.state.designation}
                                    dropdownList={designationdropdown}
                                    getValue={this.getdesignation}
                                />
                            </div>
                        </div>
                        <div className="singledropdown dcrStay userightDrop">
                        <div className="user-heirarchy-field-containers ">
                                        <div>
                                            <input
                                                labelName=""
                                                readOnly
                                                type="checkbox"
                                                className="Designation"
                                                onClick={this.onCheckFstype}
                                                checked={this.state.checkeddefault}
                                            />
                                            <label className="checkselectall">F.S. Type (All Names)</label>
                                        </div>

                                    </div>
                                    </div>
                                    {this.state.indiv == true ?
                                    <div>
                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label className="customized-label">Lock Days</Form.Label>
                            <Form.Control type="text"
                                id="outlined-size-small"
                                value={this.state.txtlockdays}
                                onChange={this.lockdayschange} />
                                </Form.Group>
                            
                            </div>
                        </div>
                        
                    </div>: null}
                    {this.state.indiv == true ?
                    <div>
                            <Button className="sfcAddBtn-loaditem onreset" onClick={this.onsavefstype}>SAVE</Button>
                           
                    </div> : null}
                    {this.state.indiv == false ?
                    <div>
                            <Button className="sfcAddBtn-loaditem onreset" onClick={this.getuser}>Load</Button>
                           
                    </div>: null}
                        

                    </div>
                </div>

            
                {this.state.showuser == true ?
                    <div>
                        <div className="mainBoxDiv">
                            <div className="bBorder flex-row">
                                <div className="mainMenu">List of Field Staff({this.state.nofoselected}) </div>
                                <div className="flexDisplay">
                                    <div className="selectall flexDisplay">
                                        <div>
                                            <input
                                                readOnly
                                                type="checkbox"
                                                className="table-customized-checkbox"
                                                checked1={userdropdown1["isChecked"]}
                                                value={userdropdown1["fcode"]}
                                                onClick={this.onCheckAll}
                                                //  defaultChecked= {this.state.checked}
                                            />
                                            <label className="checkselectall">Select All</label>
                                        </div>

                                    </div>
                                    <div>
                                        <input
                                            className="searchuser"
                                            placeholder="Search"
                                            onChange={this.handleSearch}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="alldropsfclocation copydata cal-scrollbar">
                                <div className="pd-25 ">
                                    <Row>
                                        {userdata.length > 0 ? userdata : items}

                                    </Row>
                                </div>
                            </div>

                        </div>
                    </div> : null}
                    {this.state.showuser == true ?<div className="singledropdown dcrStay userightDrop">
                        <div  className="user-heirarchy-field-containers ">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label className="customized-label">Lock Days</Form.Label>
                            <Form.Control
                                type="text"
                                id="outlined-size-small"
                                value={this.state.txtlockdaysfs}
                                onChange={this.handlelockdaysfschange}
                            />
                            </Form.Group>
                            </div>
                                
                            </div>: null}
                            {this.state.showuser == true ?
                            <div><Button className="sfcAddBtn-loaditem" onClick={this.onSave}>save</Button></div>: null}

                    
                <StatusPopup
                    message={this.state.msg}
                    show={this.state.showmodal}
                    onClose={this.onHide}
                    success={false}
                />

                <StatusPopupSucc
                    message={this.state.succmsg}
                    show={this.state.showmodalsuc}
                    onClose={this.onHide1}
                    success={true}
                />
            </div>
        )
    }
}
export default LeaveApprovelSetupSave