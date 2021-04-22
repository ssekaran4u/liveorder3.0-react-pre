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
import Loder from  '../../lib/Loader'
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";


class TransactionLogSetting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reporttype:[],
            reporttypevalue:'-1',
            reporttypedropdown:[],

            typevalue:'-1',
            typedropdown:[],

            nravalue:'-1',
            nradropdown:[],

            txtdcr:'',
            txtleave:'',


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
             useriddropdown :[],
             useridvalue:'-1',
             menuname:'Individual Locak Setting',
             showbulk:false,
             indiv:true,
             btnanme:'Bulk Update',
             Regionvalue:'All',
             typebulkdropdown:[],
             Region:[],
             typevaluebulk:'-1',
             designationdropdown:[],
             designation:'-999',
             divisiondropdown:[],
             divisionvalue:'-999',
            resetflag:false,
            nofoselected:'',
            nofoselected1:'',
            txtdcrbul:'',
            txtleavebulk:'',
            btnname:'SAVE',
        }
        this.getDivison = this.getDivison.bind(this)
        this.getdesignation = this.getdesignation.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.onCheckAll = this.onCheckAll.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onHide = this.onHide.bind(this)
        this.onHide1 = this.onHide1.bind(this)

        this.getItem = this.getItem.bind(this)
        this.Mainchange=this.Mainchange.bind(this)
        this.getAllItem=this.getAllItem.bind(this)


        this.onName=this.onName.bind(this);
        this.getreporttype=this.getreporttype.bind(this)
        this.getTypevalue=this.getTypevalue.bind(this)
        this.getnraValue=this.getnraValue.bind(this)
        this.handledcrChange=this.handledcrChange.bind(this)
        this.handleleaveChange=this.handleleaveChange.bind(this)

        this.getRegion=this.getRegion.bind(this)
        this.gettypebulk=this.gettypebulk.bind(this)
        this.getuser=this.getuser.bind(this)
        this.handledcrbulkChange=this.handledcrbulkChange.bind(this)
        this.handleleavebulkChange=this.handleleavebulkChange.bind(this)

    }
    handledcrbulkChange(bulkdcr)
    {
        if (isNaN(bulkdcr.target.value.trim())) {
            alert('It is not a Number');
          } else {
            this.setState({
                txtdcrbul: bulkdcr.target.value.trim()
            })
          }
        
    }
    handleleavebulkChange(bulkleave){
        if (isNaN(bulkleave.target.value.trim())) {
            alert('It is not a Number');
          } else {
            this.setState({
                txtleavebulk: bulkleave.target.value.trim()
            })
          }
        
    }

    getuser(){
        let userli = []
        this.setState({ spinner:true })
        var user = { "Index": "ListUser", "Token": "", "Data": { "division": this.state.divisionvalue, "desig": this.state.designation,"region":this.state.Regionvalue } }

        postToServer("TransactionLockSetting", user).then((response) => {

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

        })
    }
    getRegion(region){
        this.setState({
            Regionvalue: region
        })
        this.setState({ userlist1: [] })
        this.setState({ showuser:false, nofoselected1:'',nofoselected:'' })
    }

    gettypebulk(typebulk){
        this.setState({
            typevaluebulk: typebulk
        })
    }
    handledcrChange(dcr){
        
        if (isNaN(dcr.target.value.trim())) {
            alert('It is not a Number');
          } else {
            this.setState({
                txtdcr: dcr.target.value.trim()
            })
          }

        
    
    }
    handleleaveChange(Leave){
        if (isNaN(Leave.target.value.trim())) {
            alert('It is not a Number');
          } else {
            this.setState({
                txtleave: Leave.target.value.trim()
                })
          }
    
    }
    onName()
    {
        if(this.state.menuname=='Individual Locak Setting')
        {
            this.setState({
                menuname: 'Bulk Update',
                showbulk:true,
                indiv:false,
                btnanme:'Individual Locak Setting',
                userlist1:[],
                divisionvalue:'-999',
                Regionvalue:'All',
                typevaluebulk:'-1',
                designation:'-999',
                btnname:'UPDATE',
            })
        }
        else{
            this.setState({
                menuname: 'Individual Locak Setting',
                showbulk:false,
                indiv:true,
                btnanme:'Bulk Update',
                showuser:false,
                userlist1:[],
                typevalue:'-1',
                reporttypevalue:'-1',
                txtdcr:'',
                txtleave:'',
                nravalue:'-1',
                btnname:'SAVE',
            })
        }
        
    }
    getreporttype(reporttype){
        this.setState({
            reporttypevalue: reporttype
        })
        if(reporttype!='-1')
        {
                var type = { "Index": "MCRDCRType", "Token": "", "Data": {"ReportType":reporttype} }
                postToServer("TransactionLockSetting", type).then((response) => {
                    if (response.status == 200 && response.statusText == "OK") {
                        this.setState({ typedropdown: response.data.Data })
                    }
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Copy option" })
                })
        }
        else if(reporttype == '-1'){
            this.setState({ typedropdown: [] })
            var type = { "Index": "DefaultType", "Token": "", "Data": {} }
            postToServer("TransactionLockSetting", type).then((response) => {
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({ typedropdown: response.data })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })
    }
    this.setState({ nradropdown: [],nravalue:'-1',txtdcr:'',txtleave:'' })
        

    }

    getTypevalue(typevalue){
        this.setState({
            typevalue: typevalue
        })
        if(typevalue!='-1')
        {
        var type = { "Index": "FSAREAREGION", "Token": "", "Data": {"ReportType":this.state.reporttypevalue,"Type":typevalue} }
        postToServer("TransactionLockSetting", type).then((response) => {
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ nradropdown: response.data.Data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })
    }
    else if(typevalue=='-1'){
        this.setState({ nradropdown: [],nravalue:'-1',txtdcr:'',txtleave:'',typevalue:'-1' })
    }


    }
    getnraValue(nravalue){
        this.setState({
            nravalue: nravalue
        })
        this.setState({ txtdcr: '' })
        this.setState({ txtleave: '' })
        var type = { "Index": "BtnLoad", "Token": "", "Data": {"ReportType":this.state.reporttypevalue,"far":nravalue} }
        postToServer("TransactionLockSetting", type).then((response) => {
            if (response.status == 200 && response.statusText == "OK") {
                
               
                this.setState({ txtdcr: response.data.Data[0]["n_days"] })
                this.setState({ txtleave: response.data.Data[0]["n_leave_days"] })
                
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })

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

    Mainchange(id){
        let lc=this.state.Selectcheck
        delete lc[id]
        this.setState({ Selectcheck:lc   })
        }
        



    getDivison(divisionlist) {
        let ddd='';
        let desig=''
        this.setState({ divisionvalue: divisionlist })
        this.setState({ userlist1: [] })
        this.setState({ showuser:false, nofoselected1:'',nofoselected:'' })
        
    }

    getdesignation(designationlist) {
        this.setState({ designation: designationlist })

                this.setState({ userlist1: [] })
                this.setState({ showuser:false,nofoselected1:'',nofoselected:'' })
    }

 
    componentDidMount() {

        var data = {"index":"Menudetails","Token":""}
        
        postToServer("UserRight", data).then( (result)=> { 
            if(result){ 
                
                this.setState({
                    mainmenus:result.data.submenu,
                    submenus:result.data.Menu,
                })
            }

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
        }  )

        
        var reporttype = { "Index": "ReportType", "Token": "", "Data": {} }
        postToServer("TransactionLockSetting", reporttype).then((response) => {
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ reporttypedropdown: response.data,typebulkdropdown:response.data })
                // 
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })

        var type = { "Index": "DefaultType", "Token": "", "Data": {} }
        postToServer("TransactionLockSetting", type).then((response) => {
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ typedropdown: response.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })


        var fsarearegion = { "Index": "FSAREAREGION", "Token": "", "Data": {} }
        postToServer("TransactionLockSetting", fsarearegion).then((response) => {
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ nradropdown: response.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })



        var division = { "Index": "ListDivision", "Token": "", "Data": {} }
        postToServer("TransactionLockSetting", division).then((response) => {
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ divisiondropdown: response.data.Data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })

        var region = { "Index": "ListRegion", "Token": "", "Data": {} }
        postToServer("TransactionLockSetting", region).then((response) => {
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ Region: response.data.Data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })
        var designation = { "Index": "ListDesignation", "Token": "", "Data": {} }
        postToServer("TransactionLockSetting", designation).then((response) => {
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ designationdropdown: response.data.Data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })


        
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

    

    onSave() {
        if(this.state.menuname=="Bulk Update")
        {               

        let datacheck = this.state.userlist1.filter(item => item.isChecked == true)
        var data = ""
        this.state.userlist1.map((res) => {
            if (res.isChecked == true) {
                data = data + res.fcode + ","
            }
        })
                if(this.state.typevaluebulk=='-1')
                {
                    alert('Please Select the Type')
                }
                else if(this.state.txtdcrbul=='')
                {
                    alert('Enter the DCR days')
                }
                else if(this.state.txtleavebulk=='')
                {
                    alert('Enter the Leave days')
                }               
                else if (datacheck.length == 0) {
                    alert('Please Select the user')
                }
                else
                {
                    var save = { "index": "BulkSave",  data:{ "type":this.state.typevaluebulk,"fscode":data, "dcrdays":this.state.txtdcrbul,"leave":this.state.txtleavebulk}  }
           
             postToServer("TransactionLockSetting", save).then((response) => {
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({ typevaluebulk:'-1',txtdcrbul:'',txtleavebulk:'',showuser:false,designation:'-999',divisionvalue:'-999',Regionvalue:'All' })
                }

            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })
        }
        
        }
        else
        {
        if(this.state.reporttypevalue=='-1')
        {
            alert('Please Select Report Type')
        }
        else if(this.state.typevalue=='-1')
        {
            alert('Please Select Type')
        }
        else if(this.state.nravalue=='')
        {
            alert('Please Select Name/Region/Area')
        }
        else if(this.state.txtdcr=='')
        {
            alert('Enter the DCR days')
        }
        else if(this.state.txtleave=='')
        {
            alert('Enter the Leave Days')
        }
        else{
           
            var save = { "index": "IndivSave",  data:{ "type":this.state.typevalue,"reporttype":this.state.reporttypevalue, "cmbchange":this.state.nravalue,"dcrdays":this.state.txtdcr,"leave":this.state.txtleave}  }
           
            postToServer("TransactionLockSetting", save).then((response) => {
                if (response.status == 200 && response.statusText == "OK") {
                    


                    this.setState({ nradropdown: [],reporttypedropdown:[] ,typedropdown:[]
                        ,reporttypevalue:'-1',txtdcr:'',txtleave:''})
                    var reporttype = { "Index": "ReportType", "Token": "", "Data": {} }
        postToServer("TransactionLockSetting", reporttype).then((response) => {
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ reporttypedropdown: response.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })

        var type = { "Index": "DefaultType", "Token": "", "Data": {} }
        postToServer("TransactionLockSetting", type).then((response) => {
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ typedropdown: response.data,typevalue:'-1' })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })
             }

            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })
        }
          
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



        

        
        let divisiondropdown = []
        let designationdropdown = []
        let Region =[]
        let typebulkdropdown = []
         let reporttypedropdown =[]
         let typedropdown=[]
         let nradropdown=[]
         let userdropdown1 = []

         if (this.state.reporttypedropdown.length > 0) {
            this.state.reporttypedropdown.map((item) => {
                reporttypedropdown.push({
                    "key": item.Code,
                    "text": item.Name,
                    // "value": item.c_name
                    "value": item.Code
                })
            })
        }

        if (this.state.typedropdown.length > 0) {
            this.state.typedropdown.map((item) => {
                typedropdown.push({
                    "key": item.Code,
                    "text": item.Name,
                    // "value": item.c_name
                    "value": item.Code
                })
            })
        }

        if (this.state.nradropdown.length > 0) {
            this.state.nradropdown.map((item) => {
                nradropdown.push({
                    "key": item.c_code,
                    "text": item.c_name,
                    // "value": item.c_name
                    "value": item.Code
                })
            })
        }

        if (this.state.divisiondropdown.length > 0) {
            this.state.divisiondropdown.map((item) => {
                divisiondropdown.push({
                    "key": item.c_code,
                    "text": item.c_name,
                    // "value": item.c_name
                    "value": item.c_code
                })
            })
        }
        if (this.state.Region.length > 0) {
            this.state.Region.map((item) => {
                Region.push({
                    "key": item.c_code,
                    "text": item.c_name,
                    // "value": item.c_name
                    "value": item.c_code
                })
            })
        }
        if (this.state.typebulkdropdown.length > 0) {
            this.state.typebulkdropdown.map((item) => {
                typebulkdropdown.push({
                    "key": item.Code,
                    "text": item.Name,
                    // "value": item.c_name
                    "value": item.Code
                })
            })
        }
        if (this.state.designationdropdown.length > 0) {
            this.state.designationdropdown.map((item) => {
                designationdropdown.push({
                    "key": item.usertype,
                    "text": item.c_name,
                    // "value": item.c_name
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
       



        // this.setState({nameaarayvalue:nameaaray})

       
        return (
            <div>
                <div className="dcr-head">
                            <div>
                                <h4 className="daily-call-report">
                                Transaction Lock Settings 
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
                                    Transaction Lock Settings 
                                         </Link>
                            </Breadcrumb.Item>
                                   {/* <Breadcrumb.Item active>
                                    Leave Approvel Setup 
                            </Breadcrumb.Item> */}
                                </Breadcrumb>
                            </div>
                        </div>
                {this.state.spinner == true &&
                    <SfaSpinner />
                }
                <div className="userRight dwiseUser mb-20">
            <div className="drname">{this.state.menuname}
            <Button className="sfcAddBtn-loaditem" onClick={this.onName}>{this.state.btnanme}</Button></div> 
            {this.state.indiv == true ?
                    <div className="alldropsfclocation">
                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearch
                                    className="ReportType"
                                    labelName="Repor Type"
                                    errorMessage={this.state.divisionerror}
                                    // disabled={true}
                                    important={true}
                                    // placeholder="Select"
                                    Selected={this.state.reporttypevalue}
                                    dropdownList={reporttypedropdown}
                                    getValue={this.getreporttype}
                                />
                            </div>
                        </div>

                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearch
                                    className="Type"
                                    labelName="Type"
                                    // disabled={true}
                                    important={true}
                                    //  placeholder=" Select"
                                    Selected={this.state.typevalue}
                                    dropdownList={typedropdown}
                                    getValue={this.getTypevalue}
                                />
                            </div>
                        </div>


                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearch
                                    className="NameRegAre"
                                    labelName="Name/Region/Area"
                                    errorMessage={this.state.usererror}
                                    // disabled={true}
                                    important={true}
                                     placeholder=" Select"
                                    Selected={this.state.nravalue}
                                    dropdownList={nradropdown}
                                    getValue={this.getnraValue}
                                    // onClickDropdown={this.onClickUser}
                                />
                            </div>
                        </div>


                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label className="customized-label">DCR Days</Form.Label>
                            <Form.Control type="text"
                                id="outlined-size-small"
                                value={this.state.txtdcr}
                                placeholder="Enter No DCR Days"
                                onChange={this.handledcrChange} />
                        </Form.Group>
                            
                            </div>
                        </div>

                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label className="customized-label">Leave Application Days</Form.Label>
                            <Form.Control
                                type="text"
                                id="outlined-size-small"
                                value={this.state.txtleave}
                                placeholder="Enter No Leave Days"
                                onChange={this.handleleaveChange}/>
                                </Form.Group>
                            </div>
                        </div>

                    </div> : null}


            {/* // bulk button */}
            {this.state.showbulk == true ?
            <div className="alldropsfclocation">
                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearchBulk
                                    className="Division"
                                    labelName="Division"
                                    errorMessage={this.state.divisionerror}
                                    // disabled={true}
                                    important={true}
                                    // placeholder="Select"
                                    Selected={this.state.divisionvalue}
                                    dropdownList={divisiondropdown}
                                    getValue={this.getDivison}
                                />
                            </div>
                        </div>

                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearchBulk
                                    className="Region"
                                    labelName="Region"
                                    Selected={this.state.Regionvalue}
                                    dropdownList={Region}
                                    getValue={this.getRegion}
                                />
                            </div>
                        </div>


                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearch
                                    className="Type"
                                    labelName="Type"
                                    errorMessage={this.state.usererror}
                                    Selected={this.state.typevaluebulk}
                                    dropdownList={typebulkdropdown}
                                    getValue={this.gettypebulk}
                                />
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
                        <div>
                            <Button className="sfcAddBtn-loaditem onreset" onClick={this.getuser}>Go</Button>
                           
                    </div>
                    </div> 
                    
                    : null}

                </div>

            
                {this.state.showuser == true ?
                    <div>
                        <div className="mainBoxDiv">
                            <div className="bBorder flex-row">
                                <div className="mainMenu">Select the person/s in the list to save the settings({this.state.nofoselected}) </div>
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
                                            />
                                            <label className="checkselectall">Select All</label>
                                        </div>

                                    </div>
                                    <div>
                                        <input
                                            className="searchuser"
                                            placeholder="Search"
                                            onChange={this.handleSearch}
                                        // value='Search'
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
                            <Form.Label className="customized-label">DCR Days</Form.Label>
                            <Form.Control
                                type="text"
                                id="outlined-size-small"
                                value={this.state.txtdcrbul}
                                placeholder="Enter No DCR Days"
                                onChange={this.handledcrbulkChange}
                            />
                            </Form.Group>
                            </div>
                                {/* </Form.Group>
                            
                                <Form.Group controlId="formBasicEmail"> */}
                            <div  className="user-heirarchy-field-containers ">
                            <Form.Group controlId="formBasicEmail">
                            <Form.Label className="customized-label">Leave Application Days</Form.Label>
                            <Form.Control
                                type="text"
                                id="outlined-size-small"
                                placeholder="Enter No of Leave Days"
                                value={this.state.txtleavebulk}
                                onChange={this.handleleavebulkChange}
                                />
                                </Form.Group>
                                </div>
                            </div>: null}
                            <div><Button className="sfcAddBtn-loaditem" onClick={this.onSave}>{this.state.btnname}</Button></div>

                    
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
export default TransactionLogSetting