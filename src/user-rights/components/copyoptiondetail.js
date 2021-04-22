import React, { Component } from 'react'
import { Row, Col, Dropdown, Button, Form } from 'react-bootstrap'
import ReactDOM from 'react-dom'
// import "./custom.css";
// import "./skeleton.css"; 
import "./prog-tracker.css";
// import "./normalize.css"; 
import Designation from './Designation'

import { postToServer } from '../../lib/comm-utils'
//import Multistep from 'react-multistep'
import Multistep from '../../../public/react-multistep'

import Step1 from './Step3'
import MenuCheckbox from '../components/MenuCheckbox'
import { URL_COPYOPTION } from '../../lib/constants'
import SfaSpinner from "../../BasicComponet/sfaSpinner";
import DropdownSearch from "./dropdownsearch"
import StatusPopup from '../../lib/StatusPopup'
import Loder from  '../../lib/Loader'


class CopyoptionDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            divisionlist: [],
            divisionvalue: "-All-",
            divisionerror: "",
            divcode: "-999",
            divisionlist1: [],
            divisionvalue1: "-999",
            divisionerror1: "",
            divcode1: "-999",
            designationlist: [],
            designationvalue: "All",
            designationerror: "",
            designationcode: "-999",
            designationlist1: [],
            designationvalue1: "-1",
            designationerror1: "",
            designationcode1: "-999",
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

            resetflag:false,
        }
        this.getDivisonValue = this.getDivisonValue.bind(this)
        this.getDesignationvalue = this.getDesignationvalue.bind(this)
        this.getUserValue = this.getUserValue.bind(this)
        this.getDivisonValue1 = this.getDivisonValue1.bind(this)
        this.getDesignationvalue1 = this.getDesignationvalue1.bind(this)
        this.onClickUser = this.onClickUser.bind(this)
        this.onClickUserId=this.onClickUserId.bind(this)
        this.onCheck = this.onCheck.bind(this)
        this.onCheckAll = this.onCheckAll.bind(this)
        this.onReset = this.onReset.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.onSave = this.onSave.bind(this)
        this.onClickdesignation = this.onClickdesignation.bind(this)
        this.onHide = this.onHide.bind(this)
        this.onHide1 = this.onHide1.bind(this)

        this.getItem = this.getItem.bind(this)
        this.Mainchange=this.Mainchange.bind(this)
        this.getAllItem=this.getAllItem.bind(this)
        this.getUseridValue=this.getUseridValue.bind(this)
        this.onSaveDataRefresh=this.onSaveDataRefresh.bind(this)

    }

    onHide() {
        this.setState({
            showmodal: !this.state.showmodal,
        })
    }
    getAllItem(chkddta)
    {
        // console.log(chkddta,'for the samepage');
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
        onClickUserId(){
            // alert(this.state.uservalue)
            // alert(this.state.designationvalue)
            if(this.state.uservalue == '-1')
            {
            alert('Please Select Copy From User')
            }
            
        }

    onClickUser() {
       
        if (this.state.divisionvalue == "-1") {
            this.setState({ divisionerror: "Please Select The Division" })
        }
        else if (this.state.designationvalue == "-1") {
            this.setState({ designationerror: "Please Select The Designation" })
        }


        else if (this.state.divisionerror == "" && this.state.designationerror == "") {
            if(this.state.userlist.length == 0){
                // this.setState({ spinner: true })
            }
            
            // console.log(this.state.divcode, this.state.designationcode, "code")
            // var user = { "Index": "ListUser", "Token": "", "Data": { "DivisionCode": this.state.divcode, "DesignationCode": this.state.designationcode } }
            // postToServer("CopyOption", user).then((response) => {
            //     // console.log(response,user, "user")
            //     if (response.status == 200 && response.statusText == "OK") {
            //         this.setState({ userlist: response.data.data,spinner: false })
            //     }
            // }).catch((Error) => {
            //     this.setState({ Error: true, Errormsg: "Error in Copy option" })
            // })
        }
    }

    getDivisonValue(divisionlist) {
        // console.log(divisionlist, "divisionlist")
        let ddd='';
        let desig=''
        this.setState({ divisionvalue: divisionlist })
        if (divisionlist != "") {
            this.setState({ divisionerror: "" })
        }
        this.state.divisionlist.map((item) => {
            if (item.c_name == divisionlist) {
                this.setState({ divcode: item.c_code })
                ddd=item.c_code;
            }
        })
        if(this.state.designationvalue=="All")
        {
            desig='-999'
        }
        else{
            desig=this.state.designationvalue
        }

        console.log(ddd,desig, "code1111")
            var user = { "Index": "ListUser", "Token": "", "Data": { "DivisionCode": ddd, "DesignationCode": desig } }
            postToServer("CopyOption", user).then((response) => {
                // console.log(response,user, "user")
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({ userlist: response.data.data,spinner: false })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })
        // debugger;
        // console.log(this.state.divcode, this.state.designationcode, "code")
        // var user = { "Index": "ListUser", "Token": "", "Data": { "DivisionCode": this.state.divcode, "DesignationCode": this.state.designationcode } }
        // postToServer(URL_COPYOPTION, user).then((response) => {
        //     // console.log(response,user, "user")
        //     if (response.status == 200 && response.statusText == "OK") {
        //         console.log('listuse1')
        //         this.setState({ userlist: response.data.data })
        //         this.setState({ loader:false })
        //     }
        // }).catch((Error) => {
        //     this.setState({ Error: true, Errormsg: "Error in Copy option" })
        //     this.setState({ loader:false })
        // })
        this.setState({useridvalue:''})
        this.setState({useriddropdown:[]})
    }

    getDesignationvalue(designationlist) {
        this.setState({ designationvalue: designationlist })
        let dd='-999'
        // console.log(designationlist, "oo")
        if (designationlist != "") {
            this.setState({ designationerror: "" })
        }
        this.state.designationlist.map((item) => {
            if (item.c_name == designationlist) {
                this.setState({ designationcode: item.usertype })
                dd=item.usertype;
            }
        })
        // if(this.state.divcode=="" || this.state.divcode=="-999")
        // {
        //     dd='-999'
        // }
        // else{
        //     dd=dd;
        // }

         console.log(dd, designationlist, "code123")
            var user = { "Index": "ListUser", "Token": "", "Data": { "DivisionCode": this.state.divcode, "DesignationCode": dd } }
            postToServer("CopyOption", user).then((response) => {
                // console.log(response,user, "user")
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({ userlist: response.data.data,spinner: false })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })

            this.setState({useridvalue:''})
            this.setState({useriddropdown:[]})

        // debugger;
        // console.log(this.state.divcode, this.state.designationcode, "code")
        // var user = { "Index": "ListUser", "Token": "", "Data": { "DivisionCode": this.state.divcode, "DesignationCode": this.state.designationcode } }
        // postToServer(URL_COPYOPTION, user).then((response) => {
        //     // console.log(response,user, "user")
        //     if (response.status == 200 && response.statusText == "OK") {
        //         console.log('listuse1')
        //         this.setState({ userlist: response.data.data })
        //         this.setState({ loader:false })
        //     }
        // }).catch((Error) => {
        //     this.setState({ Error: true, Errormsg: "Error in Copy option" })
        //     this.setState({ loader:false })
        // })
    }
//     handleSubmit(){ 
//         debugger;
//        if(this.state.designationval == ""){
//         this.setState({
//             showmodal:true,
//             msg:"Please Select Designation"
//         })
//        }else{
//         var k=this.state.fsname
//         if(k == ""){
//             this.setState({
//                 showmodal:true,
//                 msg:"Please Select Field Staff Name"
//             })
//         }else{
//            this.setState({selectedfs:k})
//         }
//     }
// }

    getUserValue(userlist) {
         var t=''
        this.setState({ uservalue: userlist })
        // console.log(userlist, "oo")
        if (userlist != "") {
            this.setState({ usererror: "" })
        }

        this.state.userlist.map((item) => {
            if (item.fsname == userlist) {
                this.setState({ usercode: item.fs_code })
                this.setState({selectedfs:item.fs_code})
                t=item.fs_code;
            }
        })
        
  let useriddropdown= []
//   [ {
   
//     "key":"-1",

//     "value": "-1",
//     "text": "Please Select User Id",
// } ]

        var user = { "Index": "FsCode", "Token": "", "Data": { "selectedfs": t } }
        postToServer("CopyOption", user).then((response) => {
            //   console.log(response.data, "user")
            if (response.data.Status == "Success") {
                //  console.log(response.data.data,'sojan')
                    response.data.data.map((item) => {
                        useriddropdown.push({
                            "key": item.c_code,
                            "text": item.name,
                            "value": item.c_code
                        })
                    })
                // }
                this.setState({ useriddropdown: useriddropdown,spinner: false })


                // console.log( response.data.data,'<<kunal')
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })
        this.setState({useridvalue:''})
        
        // handleSubmit();
    }

    getUseridValue(useridlist) {
        this.setState({ usercode: useridlist })
        this.setState({useridvalue:useridlist})
        // this.setState({ uservalue: useridlist })
        // console.log(useridlist, "oo")
        // if (useridlist != "") {
        //     this.setState({ usererror: "" })
        // }

        // this.state.userlist.map((item) => {
        //     if (item.fsname == useridlist) {
        //         this.setState({ usercode: item.fs_code })
        //         this.setState({useridvalue:item.fs_code})
        //     }
        // })
        
        // handleSubmit();
    }
    

    getDivisonValue1(divisionlist1) {
        // console.log(divisionlist1, "divisionlist1")
        this.setState({ divisionvalue1: divisionlist1 })
        if (divisionlist1 != "") {
            this.setState({ divisionerror1: "", showuser: false })
        }

        this.state.divisionlist1.map((item) => {
            if (item.c_name == divisionlist1) {
                this.setState({ divcode1: item.c_code })
            }
        })
    }

    getDesignationvalue1(designationlist1) {
        
        if(designationlist1 != "-1")
        {
        this.setState({ designationvalue1: designationlist1 })
        this.setState({ spinner: true })
        // console.log(designationlist1, "oo")
        if (designationlist1 != "") {
            this.setState({ designationerror1: "", showuser: true })
        } else {
            this.setState({ showuser: false })
        }
        this.state.designationlist1.map((item) => {
            if (item.c_name == designationlist1) {
                this.setState({ designationcode1: item.usertype })
            }
        })

        if (this.state.designationlist1.length > 0) {
            let userli = []
            this.state.designationlist1.map((item) => {
                if (item.c_name == designationlist1) {
                    if(this.state.useridvalue=="-1" || this.state.useridvalue=="")
                    {
                        alert('Please select the Copy From User and Id')
                        this.setState({ spinner: false })
                        this.setState({ designationvalue1: "-1" })
                        this.setState({ showuser: false })
                    }
                    else{
                            //  console.log(this.state.divcode1, this.state.designationcode1,this.state.useridvalue, "code")
                            console.log(item.usertype, this.state.useridvalue);
                            var user = { "Index": "ListUsertocopy", "Token": "", "Data": { "DesignationCode": item.usertype, "user":this.state.useridvalue } }
                            postToServer("CopyOption", user).then((response) => {
                                //  console.log(response, user, "user")
                                if (response.status == 200 && response.statusText == "OK") {
                                    // this.setState({ userlist: response.data.data })
                                    // console.log('listuse2')
                                    // if(response.data.data>0)
                                    // {
                                    response.data.data.map((res, i) => {
                                        userli.push({
                                            fcode: res.fs_code,
                                            fname: res.fsname,
                                            isChecked: true
                                        })
                                    })
                                    this.setState({ userlist1: userli })
                                    this.setState({ spinner: false })
                                // }
                                // else{
                                //     alert('No User in the Selected Designation.')
                                //     this.setState({ spinner: false })
                                //     showuser: false
                                // }
                                }
                            }).catch((Error) => {
                                this.setState({ showuser: false })
                                this.setState({ spinner: false })
                                this.setState({ Error: true, Errormsg: "Error in Copy option" })
                            })
                        }
                }
            })

        }
    }
    else{
        alert('Please Select Designation for the To User')
    }
    }

    onClickdesignation() {
         if (this.state.divisionerror1 == "") {
            var designation1 = { "Index": "ListDesignationTouser", "Token": "", "Data": {} }
            postToServer("CopyOption", designation1).then((response) => {
                // console.log(response,"designation")
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({ designationlist1: response.data.data })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })
        }
    }
 onSaveDataRefresh() {

    var data = {"index":"Menudetails","Token":""}
    
    postToServer("UserRight", data).then( (result)=> { 
        //  console.log(result,"result")   
        if(result){ 
            
            this.setState({
                mainmenus:result.data.submenu,
                submenus:result.data.Menu,
                division:result.data.Divsion,
                designation:result.data.Deg,
                region:result.data.Region
            })
        }

    }).catch((Error)=> {
        this.setState({ Error: true, Errormsg: Error })
       // console.log(result)
    }  )

    
    var division = { "Index": "ListDivision", "Token": "", "Data": {} }
    postToServer("CopyOption", division).then((response) => {
        //  console.log(response,"division")
        if (response.status == 200 && response.statusText == "OK") {
            this.setState({ divisionlist: response.data.data })
        }
    }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in Copy option" })
    })


    var designation = { "Index": "ListDesignation", "Token": "", "Data": {} }
    postToServer("CopyOption", designation).then((response) => {
        // console.log(response,"designation")
        if (response.status == 200 && response.statusText == "OK") {
            this.setState({ designationlist: response.data.data })
        }
    }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in Copy option" })
    })



    var division1 = { "Index": "ListDivision", "Token": "", "Data": {} }
    postToServer("CopyOption", division1).then((response) => {
        // console.log(response,"division")
        if (response.status == 200 && response.statusText == "OK") {
            this.setState({ divisionlist1: response.data.data })
        }
    }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in Copy option" })
    })

    // var designation1 = { "Index": "ListDesignation", "Token": "", "Data": {} }
    // postToServer(URL_COPYOPTION, designation1).then((response) => {
    //     // console.log(response,"designation")
    //     if (response.status == 200 && response.statusText == "OK") {
    //         this.setState({ designationlist1: response.data.data })
    //     }
    // }).catch((Error) => {
    //     this.setState({ Error: true, Errormsg: "Error in Copy option" })
    // })
    var user = { "Index": "ListUser", "Token": "", "Data": { "DivisionCode": '-999', "DesignationCode": '-999' } }
        postToServer("CopyOption", user).then((response) => {
            // console.log(response,user, "user")
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ userlist: response.data.data,spinner: false })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })
        // this.setState({useriddropdown:[]})

}

    componentDidMount() {

        var data = {"index":"Menudetails","Token":""}
        
        postToServer("UserRight", data).then( (result)=> { 
            //  console.log(result,"result")   
            if(result){ 
                
                this.setState({
                    mainmenus:result.data.submenu,
                    submenus:result.data.Menu,
                    division:result.data.Divsion,
                    designation:result.data.Deg,
                    region:result.data.Region
                })
            }

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )

        
        var division = { "Index": "ListDivision", "Token": "", "Data": {} }
        postToServer("CopyOption", division).then((response) => {
            //  console.log(response,"division")
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ divisionlist: response.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })


        var designation = { "Index": "ListDesignation", "Token": "", "Data": {} }
        postToServer("CopyOption", designation).then((response) => {
            // console.log(response,"designation")
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ designationlist: response.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })



        var division1 = { "Index": "ListDivision", "Token": "", "Data": {} }
        postToServer("CopyOption", division1).then((response) => {
            // console.log(response,"division")
            if (response.status == 200 && response.statusText == "OK") {
                this.setState({ divisionlist1: response.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Copy option" })
        })

        // var designation1 = { "Index": "ListDesignation", "Token": "", "Data": {} }
        // postToServer(URL_COPYOPTION, designation1).then((response) => {
        //     // console.log(response,"designation")
        //     if (response.status == 200 && response.statusText == "OK") {
        //         this.setState({ designationlist1: response.data.data })
        //     }
        // }).catch((Error) => {
        //     this.setState({ Error: true, Errormsg: "Error in Copy option" })
        // })
        var user = { "Index": "ListUser", "Token": "", "Data": { "DivisionCode": '-999', "DesignationCode": '-999' } }
            postToServer("CopyOption", user).then((response) => {
                // console.log(response,user, "user")
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({ userlist: response.data.data,spinner: false })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })

    }

    onCheck(event) {
        let userlist1 = this.state.userlist1
        userlist1.forEach(res => {
            if (res.fcode == event.target.value) {
                res.isChecked = event.target.checked
            }
        })
        // console.log(userlist1, "userlist1")
        this.setState({ userlist1: userlist1 })
    }
    onCheckAll(event) {
        let userlist1 = this.state.userlist1
        if (this.state.userlist1.length > 0) {
            userlist1.forEach(res => {
                res.isChecked = event.target.checked
            })
            this.setState({ userlist1: userlist1 })
        }
    }

    onReset() {
        let userli = []
        this.state.userlist1.map((res) => {
            userli.push({
                fcode: res.fcode,
                fname: res.fname,
                isChecked: true
            })
        })
        this.setState({
            userlist1: userli,
            divisionvalue1: "-1",
            // designationvalue1: "-1",
            // divisionvalue: "-1",
            // designationvalue: "-1",
            // uservalue: "-1",
            showuser: true
        })

    }

    onSave() {
        var ttt=this.state.checkedalldatasave
        // console.log(ttt,'all checked data for save');
            if(this.state.checkedalldatasave!='')
            {

            }
            else
            {
                    this.state.usercode
            }

        let datacheck = this.state.userlist1.filter(item => item.isChecked == true)
        var data = ""
        this.state.userlist1.map((res) => {
            if (res.isChecked == true) {
                // console.log(res.isChecked, res.fcode, this.state.usercode, "tt")
                data = data + res.fcode + ","
            }
        })
        // console.log(datacheck, datacheck.length, "datacheck")
        if (this.state.uservalue == "-1") {
            this.setState({ usererror: "Please Select User" })
            this.setState({
                showmodal: true,
                msg: "Please Select User and Id"
            })
        }

        else if (datacheck.length == 0) {
            this.setState({
                showmodal: true,
                msg: "Please Check user "
            })

            
        }
        else if(this.state.useridvalue=="")
            {
                this.setState({
                    showmodal: true,
                    msg: 'Please Select Copy From User Id'
                })
            }
        else {
            // debugger;
            if(this.state.checkedalldatasave!='')
            {               
                // console.log(data, "dataa")
                // var brnd = { "index": "ListRPSName",  data:{ "DivisionCode":Division,"RegionCode":reg}  }
                var save = { "index": "CopyUserWithMenu", 
                data: { "mainid": this.state.checkedalldatasave, "subids": data } }
                // data: { "mainid": this.state.usercode, "subids": this.state.checkedalldatasave } }
                  console.log(save,'saved api call with menu')
                postToServer("CopyOption", save).then((response) => {
                    //  console.log(response, save, "save")
                    if (response.status == 200 && response.statusText == "OK") {
                        this.setState({
                            showmodalsuc: true,
                            succmsg: response.data.data[0].msg
                        })
                        this.setState({
                            divisionvalue1: "-1",
                            designationvalue1: "-1",
                            divisionvalue: "-All-",
                            designationvalue: "All",
                            // divisionvalue: "-1",
                            // designationvalue: "-1",
                            // uservalue: "-1",
                            showuser: false,
                            useridvalue:'',
                            uservalue: "-1",
                        })
                    }
    
                }).catch((Error) => {
                    this.setState({ Error: true, Errormsg: "Error in Copy option" })
                })
            }
            else
            {
            // console.log(data, "dataa")
            // var brnd = { "index": "ListRPSName",  data:{ "DivisionCode":Division,"RegionCode":reg}  }
            var save = { "Index": "CopyUser", Data: { "mainid": this.state.useridvalue, "subids": data } }
              console.log(save,'saved api call')
            postToServer("CopyOption", save).then((response) => {
                //  console.log(response, save, "save")
                if (response.status == 200 && response.statusText == "OK") {
                    this.setState({
                        showmodalsuc: true,
                        succmsg: response.data.data[0].msg
                    })
                    this.setState({
                        divisionvalue1: "-1",
                        designationvalue1: "-1",
                        divisionvalue: "-All-",
                        designationvalue: "All",
                        // divisionvalue: "-1",
                        // designationvalue: "-1",
                        // uservalue: "-1",
                        showuser: false,
                        useridvalue:'',
                        uservalue: "-1",
                    })
                }

            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })
            }
            
        }
       this.onSaveDataRefresh();

    }

    handleSearch(e) {
        let value = e.target.value;
        if (this.state.userlist1.length > 0) {
            const newData = this.state.userlist1.filter(item => {
                const itemData = `${item.fname}`;
                const textData = value;
                return itemData.indexOf(textData) > -1;
            });
            // console.log(newData, "newdadta")
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
                // <div>
                //     <label className="table-checkbox-label mt-checkbox doctor-name">
                //         <input
                //             readOnly
                //             type="checkbox"
                //             className="table-customized-checkbox doctor-name"
                //             checked={item["isChecked"]}
                //             value={item["fcode"]}
                //             onClick={this.onCheck}
                //         />
                //         <span className="table-checkbox-custom mt-checkbox doctor-name"></span>
                //         <span className="checkbox-label1">{item["fname"]}</span>
                //     </label>
                // </div>
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
                // <div>
                //     <label className="table-checkbox-label mt-checkbox doctor-name">
                //         <input
                //             readOnly
                //             type="checkbox"
                //             className="table-customized-checkbox doctor-name"
                //             checked={item["isChecked"]}
                //             value={item["fcode"]}
                //             onClick={this.onCheck}
                //         />
                //         <span className="table-checkbox-custom mt-checkbox doctor-name"></span>
                //         <span className="checkbox-label1">{item["fname"]}</span>
                //     </label>
                // </div>

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


        // console.log(this.state.divisionlist, this.state.designationlist, "divisionlist")

        

        let divisiondropdown = []
        let desinaiondropdown = []
        let userdropdown = []
        let divisiondropdown1 = []
        let desinaiondropdown1 = []
        let userdropdown1 = []
        // let useriddropdown =[]

        if (this.state.divisionlist.length > 0) {
            this.state.divisionlist.map((item) => {
                divisiondropdown.push({
                    "key": item.c_code,
                    "text": item.c_name,
                    // "value": item.c_name
                    "value": item.c_name
                })
            })
        }

        if (this.state.designationlist.length > 0) {
            this.state.designationlist.map((item) => {
                desinaiondropdown.push({
                    "key": item.usertype,
                    "text": item.c_name,
                    // "value": item.c_name
                    "value": item.c_name
                })
            })
        }

        if (this.state.userlist.length > 0) {
            this.state.userlist.map((item) => {
                userdropdown.push({
                    "key": item.fs_code,
                    "text": item.fsname,
                    "value": item.fsname
                })
            })
        }

        if (this.state.divisionlist1.length > 0) {
            this.state.divisionlist1.map((item) => {
                divisiondropdown1.push({
                    "key": item.c_code,
                    "text": item.c_name,
                    "value": item.c_name
                })
            })
        }

        if (this.state.designationlist1.length > 0) {
            this.state.designationlist1.map((item) => {
                desinaiondropdown1.push({
                    "key": item.usertype,
                    "text": item.c_name,
                    "value": item.c_name
                })
            })
        }


        if (this.state.userlist1.length > 0) {
            this.state.userlist1.map((item) => {
                userdropdown1.push({
                    "key": item.fcode,
                    "text": item.fname,
                    "value": item.fname
                })
            })
        }


        const nameaaray =[]


        if(this.state.mainmenus.length==0 || !this.state.selectedMenu)
        return null
 
        let lastItem = this.state.mainmenus.slice(-1)[0];
      
        this.state.mainmenus.map((item) =>{
           
           const cc=this.Mainchange
        nameaaray.push({name: [<img key={item.n_id} src={'../public/assets/images/' + item.c_image}  />
        ,
         <span> { item.c_name }</span>
    ]
         , 
         component: <Step1 code="fswise" resetflag={this.state.resetflag} fscode={this.state.useridvalue} getItem={this.getItem} 
         Selectcheck={this.state.Selectcheck}  iconval={this.state.submenus} id ={item.n_id} Mainchange={cc}   
         mainmenu={item.c_name} lastitem={lastItem.c_name} getalldata={this.getAllItem} />
        })
       
        })
        // this.setState({nameaarayvalue:nameaaray})

       
        return (
            <div>
                {this.state.spinner == true &&
                    <SfaSpinner />
                }
                <div className="userRight dwiseUser mb-20">
                <div className="drname">Copy From User</div> 
                    <div className="alldropsfclocation">
                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearch
                                    className="Divison"
                                    labelName="Division"
                                    errorMessage={this.state.divisionerror}
                                    // disabled={true}
                                    important={true}
                                    // placeholder="Select"
                                    Selected={this.state.divisionvalue}
                                    dropdownList={divisiondropdown}
                                    getValue={this.getDivisonValue}
                                />
                            </div>
                        </div>

                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearch
                                    className="Designation"
                                    labelName="Designation"
                                    errorMessage={this.state.designationerror}
                                    // disabled={true}
                                    important={true}
                                    //  placeholder=" Select"
                                    Selected={this.state.designationvalue}
                                    dropdownList={desinaiondropdown}
                                    getValue={this.getDesignationvalue}
                                />
                            </div>
                        </div>


                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearch
                                    className="User"
                                    labelName="Copy from User"
                                    errorMessage={this.state.usererror}
                                    // disabled={true}
                                    important={true}
                                     placeholder=" Select"
                                    Selected={this.state.uservalue}
                                    dropdownList={userdropdown}
                                    getValue={this.getUserValue}
                                    onClickDropdown={this.onClickUser}
                                />
                            </div>
                        </div>


                        <div className="singledropdown dcrStay userightDrop">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearch
                                    className="UserId"
                                    labelName="User Id"
                                    // errorMessage={this.state.usererror}
                                    // disabled={true}
                                    important={true}
                                     placeholder=" Select"
                                    Selected={this.state.useridvalue}
                                    dropdownList={this.state.useriddropdown}
                                    getValue={this.getUseridValue}
                                     onClickDropdown={this.onClickUserId}
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="userRight dwiseUser mb-20">
                <div className="drname">Copy To User</div> 
                    <div className="alldropsfclocation">
                        {/* <div className="locationsfa">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearch
                                    className="Divison"
                                    labelName="Division"
                                    errorMessage={this.state.divisionerror1}
                                    // disabled={true}
                                    important={true}
                                    placeholder=" Select"
                                    Selected={this.state.divisionvalue1}
                                    dropdownList={divisiondropdown1}
                                    getValue={this.getDivisonValue1}
                                />
                            </div>
                        </div> */}

                        <div className=" userightDrop">
                            <div className="user-heirarchy-field-containers ">
                                <DropdownSearch
                                    className="Designation"
                                    labelName="Designation"
                                    errorMessage={this.state.designationerror1}
                                    // disabled={true}
                                    important={true}
                                    placeholder=" Select"
                                    Selected={this.state.designationvalue1}
                                    dropdownList={desinaiondropdown1}
                                    getValue={this.getDesignationvalue1}
                                    onClickDropdown={this.onClickdesignation}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showuser == true ?
                    <div>
                        <div className="mainBoxDiv">
                            <div className="bBorder flex-row">
                                <div className="mainMenu">Copy To User &nbsp;<span className="colorRed">*</span></div>
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

                
                

                        <div>
                            <Button className="sfcAddBtn-loaditem onreset" onClick={this.onReset}>Reset</Button>
                            <Button className="sfcAddBtn-loaditem" onClick={this.onSave}>Save</Button></div>
                    </div> : null}

                    <div className="userRight pd-bottom">
                    {this.state.cname ? <div className="drname">{this.state.cname}</div> : '' }
                    <Multistep steps={nameaaray}   />
                   
                </div>
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
export default CopyoptionDetails