import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react'
import { Row, Col, Container, Form, InputGroup, FormControl } from 'react-bootstrap'
import { Breadcrumb } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import Text from '../components/Text'
import Checkbox from '../components/Checkbox'
import Radio from '../components/Radio'
import Label from '../components/Label'
import Togal from '../components/Toggle'
import Dropdown1 from '../components/Dropdown'
import Date_Control from '../components/Date_Control'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
import { connect } from 'react-redux'
import { match } from 'minimatch';
import swal from 'sweetalert';
import {Link} from 'react-router-dom';
//import StatusPopupnew from './index'
let Userchangevalue = {}
let Editchangevalue = {}
let deafultval = {}
let notRequiredToSave = []
let tblname = ''
const finallist = {}
class Mastercontrols extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updatepkey: false,
            meg: '',
            maxmunber: '',
            primarykey: '',
            controlVal: {},
            hasFetched: true,
            BackEndData: [],
            tableheader: '',
            listsate: false,
            current_child: '',
            tablename: '',
            Edit: {},
            show: false,
            handleclear: 0,
            handleclearupdate: 0,
            Editval: '1',
            lengthnew: '',
            Dropdownedit:'0',
            DropdownChangeval: '0'

            //  listsatenew:false


        };
        this.updatetable = this.updatetable.bind(this);
        this.Onuserchange = this.Onuserchange.bind(this);
        this.Onuserchangekey = this.Onuserchangekey.bind(this)
        this.setprimarykey = this.setprimarykey.bind(this);
        // this.savetable = this.savetable.bind(this);
        this.savetablenew = this.savetablenew.bind(this);
        this.setmaxcode = this.setmaxcode.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleclear = this.handleclear.bind(this);
        this.handleclearupdate = this.handleclearupdate.bind(this);
        this.loadlist = this.loadlist.bind(this);



    }
    handleClose() {
        this.setState({ show: false });
    }
    loadlist() {
        setTimeout(function () {
            window.location.reload();
        }, 1000);
    }

    handleclear() {

        const data = this.state.handleclear + 1
        this.setState({ handleclear: data })
        this.setState({ handleclear: data, Editval: '2' })
    }
    handleclearupdate() {
        const data = this.state.handleclearupdate + 1
        this.setState({ handleclearupdate: data, Editval: '2' })
    }


    //     updatetable() {
    //         var finallist = {}
    //         var temcol = {}

    //         alert(temcol[this.state.primarykey] = this.state.Edit[this.state.controlVal[this.state.primarykey]["dis_name"]])

    //         Object.keys(this.state.controlVal).map((k) => {
    //             if (this.state.controlVal[k]) {
    //                 if (Userchangevalue[this.state.controlVal[k]["dis_name"]]) {
    //                     finallist[k] = Userchangevalue[this.state.controlVal[k]["dis_name"]]
    //                 }
    //             }
    //         })

    // console.log(finallist)
    //         Object.keys(deafultval).map((k) => {
    //             finallist[k] = deafultval[k]
    //             delete temcol[k]
    //         })
    //         notRequiredToSave.map((k) => {
    //             delete finallist[k]
    //             delete temcol[k]
    //         })

    //         var data = {
    //             "Data": finallist,
    //             "Header": temcol,
    //             "Table": tblname,
    //             "Token": "Smstest|Kavitha Shetty|FS01|KNH0007|lzOBgZHekf2019-05-10T17:17:02+05:30"
    //         }
    //         console.log(data)

    //          postToServer("UpdateMaster", data).then((result) => {

    //             if (result.data["Status"]) {

    //                 this.setState({
    //                     show: true, meg: 'fail  ' + result.data["Data"]["Message"]
    //                 })

    //             } else {
    //                 const data = this.state.handleclearupdate + 1
    //                 this.setState({
    //                     show: true, meg: 'updated  successfully', handleclearupdate: data
    //                 //})
    //                 }, this.loadlist)
    //             }
    //         }).catch((Error) => {

    //             this.setState({
    //                 show: true, meg: 'Error In App'
    //             })

    //         })
    //     }



    // savetable() {
    //     var finallist = {}
    //     let validcheck = "0";

    //     Object.keys(this.state.controlVal).map((k) => {

    //         if (this.state.controlVal[k]["Mandatory"] == "true" && k != this.state.primarykey) {

    //             if (Editchangevalue[this.state.controlVal[k]["dis_name"]] == undefined) {
    //                 validcheck = "1";
    //                 this.setState({

    //                     show: true, meg: 'Please enter  ' + this.state.controlVal[k]["dis_name"]
    //                 })
    //             }
    //         }


    //         if (this.state.controlVal[k]) {

    //             finallist[k] = Editchangevalue[this.state.controlVal[k]["dis_name"]]

    //         }

    //     })

    //     Object.keys(deafultval).map((k) => {
    //         finallist[k] = deafultval[k]
    //     })

    //     notRequiredToSave.map((k) => {
    //         delete finallist[k]
    //     })
    //     console.log(finallist)
    //     finallist[this.state.primarykey] = this.state.maxmunber
    //     var data = {
    //         "Data": finallist,
    //         "Table": tblname,
    //         "Token": ""
    //     }


    //     if (validcheck == "0") {
    //         postToServer("SFA360MasterSave", data).then((result) => {
    //             if (result.data["Status"]) {
    //                 this.setState({
    //                     show: true, meg: 'fail  ' + result.data["Data"]["Message"]
    //                 })

    //             } else {

    //                 const data = this.state.handleclear + 1
    //                 this.setState({
    //                     show: true, meg: 'inserted  successfully', handleclear: data
    //                 })

    //                 //window.location.reload(); 
    //             }


    //         }).catch((Error) => {

    //             this.setState({
    //                 show: true, meg: 'Error In App'
    //             })
    //         })
    //     }
    // }



    updatetable() {
        var finallist = {}
        var temcol = {}
        this.lengthnew = "0"
        var validcheck = {}
        var Editdefaultval = {}
        temcol[this.state.primarykey] = this.state.Edit[this.state.controlVal[this.state.primarykey]["dis_name"]]
       
        Editdefaultval = this.state.Edit
        Object.keys(Editdefaultval).map((k) => {

            if (Userchangevalue[k] == undefined) {
                Userchangevalue[k] = Editdefaultval[k]
                delete Editdefaultval[k];

            }

        })

        Object.keys(this.state.controlVal).map((k) => {

            if (this.state.controlVal[k]["dis_name"] != "") {

                if (Userchangevalue[this.state.controlVal[k]["dis_name"]] != undefined && Userchangevalue[this.state.controlVal[k]["dis_name"]] != "") {

                    if (this.state.controlVal[k]["CodeLength"] != 0) {
                        if (Userchangevalue[this.state.controlVal[k]["dis_name"]].length > this.state.controlVal[k]["CodeLength"]) {
                            swal('Please enter valid length ' + this.state.controlVal[k]["dis_name"]);
                            this.lengthnew = "1";

                        }
                        else {
                            if (this.state.controlVal[k]["P_key"] == "false") {

                                if (this.state.Dropdownedit == "0") {
                                    if (this.state.controlVal[k]["type"] != "Dropdown") {
                                        this.state.DropdownChangeval = "1"
                                        finallist[k] = Userchangevalue[this.state.controlVal[k]["dis_name"]]
                                        temcol[this.state.primarykey] = Userchangevalue[this.state.controlVal[this.state.primarykey]["dis_name"]]
                                    }

                                }
                                // else {

                                //     finallist[k] = Userchangevalue[this.state.controlVal[k]["dis_name"]]
                                //     temcol[this.state.primarykey] = Userchangevalue[this.state.controlVal[this.state.primarykey]["dis_name"]]
                                // }

                                else {

                                    finallist[k] = Userchangevalue[this.state.controlVal[k]["dis_name"]]
                                    Object.keys(this.state.controlVal).map((k) => {

                                        if (this.state.controlVal[k]["P_key"] == "true") {
                                           // console.log(finallist, "ktt")
                                            if (this.state.controlVal[k]["ReadOnly"] == "true") {
        
                                                temcol[this.state.primarykey] = Userchangevalue[this.state.controlVal[this.state.primarykey]["dis_name"]]
                                       
                                            }
        
        
                                        }
                                    })
                                   
                                }
                            }
                        }
                    }

                }
            }
        })


        Object.keys(this.state.controlVal).map((k) => {
            if (this.state.controlVal[k]["Mandatory"] == "true" && k != this.state.primarykey && this.state.controlVal[k]["Visible"] == "true" && this.state.controlVal[k]["RequiredToSave"] == "true") {
                if (this.state.Dropdownedit == "0") {
                    if (this.state.controlVal[k]["type"] != "Dropdown") {
                        validcheck[k] = this.state.controlVal[k]["dis_name"]
                    }
                }
                else {
                    validcheck[k] = this.state.controlVal[k]["dis_name"]
                }

            }
        })

        this.ctrl_name = new Set()
        this.ctrl_nametwo = new Set()
        var test = Object.keys(validcheck)
        //console.log(test, "test")

        var testone = Object.keys(finallist)
       // console.log(testone, "testone")
        for (var ctrl of test) {
            this.ctrl_nametwo.add(ctrl)
            for (var ctrlone of testone) {
                if (ctrl == ctrlone) {
                    this.ctrl_name.add(ctrlone)
                }
            }

        }
        for (var ctrlthree of this.ctrl_name) {
            this.ctrl_nametwo.delete(ctrlthree)
        }

        for (var ctrlfour of this.ctrl_nametwo) {

            if (this.lengthnew == "1") {

                this.lengthnew = "0"


            }
            else {

                //if (this.state.Dropdownedit != "0" && this.state.DropdownChangeval != "1") {
                    swal('Please enter  ' + this.state.controlVal[ctrlfour]["dis_name"])
               // }
            }
            return
        }

        Object.keys(deafultval).map((k) => {
            finallist[k] = deafultval[k]
            delete temcol[k]
        })

        notRequiredToSave.map((k) => {
            delete finallist[k]
            delete temcol[k]
        })
        var data = {
            "Data": finallist,
            "Header": temcol,
            "Table": tblname,
            "Token": "Smstest|Kavitha Shetty|FS01|KNH0007|lzOBgZHekf2019-05-10T17:17:02+05:30"
        }
       
        //console.log(data, "dd")

        if (this.lengthnew == "0" || this.lengthnew == undefined || this.lengthnew == null) {
            if (ctrlfour == "" || ctrlfour == null) {
                
                var data = {
                    "Data": finallist,
                    "Header": temcol,
                    "Table": tblname,
                    "Token": "Smstest|Kavitha Shetty|FS01|KNH0007|lzOBgZHekf2019-05-10T17:17:02+05:30"
                }
                postToServer("UpdateMaster", data).then((result) => {

                    if (result.data["Status"]) {

                        this.setState({
                            show: true, meg: 'fail  ' + result.data["Data"]["Message"]
                        })

                    } else {
                        const data = this.state.handleclearupdate + 1
                        this.setState({
                            show: true, meg: 'updated  successfully', handleclearupdate: data
                        //})
                        },this.loadlist)
                       
                    }
                }).catch((Error) => {

                    this.setState({
                        show: true, meg: 'Error In App'
                    })

                })
            }
        }
    }



    savetablenew() {
        this.lengthnew = "0"
        var finallist = {}
        var validcheck = {}
        //console.log(this.setmaxcode)
        Object.keys(this.state.controlVal).map((k) => {
           
            if (this.state.controlVal[k]["dis_name"] != "") {

                if (Editchangevalue[this.state.controlVal[k]["dis_name"]] != undefined && Editchangevalue[this.state.controlVal[k]["dis_name"]] != "") {

                    console.log(this.state.controlVal[k]["CodeLength"])
                    if (this.state.controlVal[k]["CodeLength"] != 0) {
                        if (Editchangevalue[this.state.controlVal[k]["dis_name"]].length > this.state.controlVal[k]["CodeLength"]) {

                            swal('Please enter valid length ' + this.state.controlVal[k]["dis_name"])
                            this.lengthnew = "1";
                        }
                        // else {

                        //     finallist[k] = Editchangevalue[this.state.controlVal[k]["dis_name"]]
                        //     finallist[this.state.primarykey] = this.state.maxmunber
                        // }
                        else {

                            finallist[k] = Editchangevalue[this.state.controlVal[k]["dis_name"]]

                            Object.keys(this.state.controlVal).map((k) => {

                                if (this.state.controlVal[k]["P_key"] == "true") {
                                   // console.log(finallist, "ktt")
                                    if (this.state.controlVal[k]["ReadOnly"] == "true") {

                                        finallist[this.state.primarykey] = this.state.maxmunber
                                       // console.log(finallist, "kt")
                                    }


                                }
                            })

                        }
                    }

                }
            }
        })

        Object.keys(deafultval).map((k) => {
            finallist[k] = deafultval[k]
        })

        notRequiredToSave.map((k) => {
            delete finallist[k]
        })

        // Object.keys(this.state.controlVal).map((k) => {
        //     //console.log(this.state.controlVal[k]["dis_name"])
        //     if (this.state.controlVal[k]["Mandatory"] == "true" && k != this.state.primarykey && this.state.controlVal[k]["Visible"] == "true" && this.state.controlVal[k]["RequiredToSave"] == "true") {

        //         validcheck[k] = this.state.controlVal[k]["dis_name"]

        //     }
        // })
        Object.keys(this.state.controlVal).map((k) => {
          
            if(this.state.maxmunber =="" || this.state.maxmunber ==null)
            {
             if (this.state.controlVal[k]["Mandatory"] == "true" && this.state.controlVal[k]["Visible"] == "true" && this.state.controlVal[k]["RequiredToSave"] == "true") {
 
                 validcheck[k] = this.state.controlVal[k]["dis_name"]
             }
             
            }
            else{
             if (this.state.controlVal[k]["Mandatory"] == "true" && k != this.state.primarykey && this.state.controlVal[k]["Visible"] == "true" && this.state.controlVal[k]["RequiredToSave"] == "true") {
 
                 validcheck[k] = this.state.controlVal[k]["dis_name"]
 
             }
            }
            
            
         })
        this.ctrl_name = new Set()
        this.ctrl_nametwo = new Set()
        var test = Object.keys(validcheck)
        //console.log(test, "test")

        var testone = Object.keys(finallist)
        //console.log(testone, "testone")
        for (var ctrl of test) {
            this.ctrl_nametwo.add(ctrl)
            for (var ctrlone of testone) {
                if (ctrl == ctrlone) {
                    this.ctrl_name.add(ctrlone)
                }
            }

        }
        for (var ctrlthree of this.ctrl_name) {
            this.ctrl_nametwo.delete(ctrlthree)
        }

        for (var ctrlfour of this.ctrl_nametwo) {

            if (this.lengthnew == "1") {

                this.lengthnew = "0"
            }
            else {

                swal('Please enter  ' + this.state.controlVal[ctrlfour]["dis_name"])
            }
            return
        }

        if (this.lengthnew == "0" || this.lengthnew == undefined || this.lengthnew == null) {
            if (ctrlfour == "" || ctrlfour == null) {
                var data = {
                    "Data": finallist,
                    "Table": tblname,
                    "Token": ""
                }
                postToServer("SFA360MasterSave", data).then((result) => {
                    if (result.data["Status"]) {
                        if (result.data["Data"]["Message"].length == 153) {

                            swal("Code is exists")
                        }
                        else {
                            const data = this.state.handleclear + 1
                            this.setState({
                                show: true, meg: 'fail  ' + result.data["Data"]["Message"], handleclear: data
                            })
                        }
                     

                    }
                    else {

                        const data = this.state.handleclear + 1
                        this.setState({
                            show: true, meg: 'inserted  successfully', handleclear: data
                        })
                        //},this.loadlist)

                    }


                }).catch((Error) => {

                    this.setState({
                        show: true, meg: 'Error In App'
                    })
                })
            }
        }
    }



    Onuserchangekey(name, value) {
        if (this.state.Edit) {
            Userchangevalue[name] = value
        }
        else {
            Editchangevalue[name] = value
        }
    }
    Onuserchange(param, name) {
        if (this.state.Edit) {
           
            Userchangevalue[name] = param.target.value
        }
        else {
            //alert("1");
            Editchangevalue[name] = param.target.value
        }
 
        
    }

    setprimarykey(name) {
        this.setState({ primarykey: name })
    }
    setmaxcode(num) {
        this.setState({ maxmunber: num })
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.header !== nextProps.header)
            return { ...prevState, header: nextProps.header }
        if (prevState.Edit !== nextProps.Edit) {
            return { ...prevState, Edit: nextProps.Edit }
        }
        return null
    }

    // componentDidUpdate(prevProps, prevState) {


    //    if(this.state.listsate ==true)
    //    {
    //     this.setState({listsate:false})
    //     // if (this.props.match.params.id !== prevProps.match.params.id) {
    //     //     alert()
    //     //     this.setState({listsate:false})
    //     // }




    //    }

    // }


    componentDidUpdate(prevProps, prevState) {

        //alert("1")
        if (this.props.urlid !== prevProps.urlid) {
            //alert("2")
            this.componentDidMount()

        }
        //alert("3")
        //this.setState({listsate:false})

    }
    updateDropdownSelection(id, childId, childName, value, text) {
        if (this.state.Edit) {
            this.state.Dropdownedit="1";
            Userchangevalue[text] = value
           // alert( Userchangevalue[text])
            //console.log(Userchangevalue)

        }
        else {

            Editchangevalue[text] = value
        }
        if (childName != "0" && childName != "") {
            let { controlVal } = this.state
            let k = Object.keys(controlVal).find((key) => {
                return key == childName
            })
            var data = { "id": id, "priority": childId, "onload": "1", "control": "Dropdown", "index": "2", "result": value, "Token": "" }
            let _this = this
            postToServer("DynamicMasterQuery", data).then((result) => {
                let teamsFromApi = []
                result.data.map(data => {
                    teamsFromApi.push({
                        "key": data[Object.keys(data)[0]],
                        "text": data[Object.keys(data)[1]],
                        "value": data[Object.keys(data)[0]]
                    })
                }).catch((Error) => {
                    this.setState({
                        show: true, meg: 'Error In App'
                    })
                })
                //console.log("mastercontrol", teamsFromApi)
                controlVal[k]['data'] = teamsFromApi
                _this.setState({ controlVal })
            })
        }

    }


    componentDidMount() {

        let controlVal = {}
        let _this = this
        var data = { "index": "Master", "TableName": this.props.urlid, "Query": "", "Token": "Smstest|Kavitha Shetty|FS01|KNH0007|lzOBgZHekf2019-05-10T17:17:02+05:30", "ColumnName": "0", "Key_ID": "0" }
        postToServer("SfaApi", data).then(function (result) {
                if ((!result.data) || (result.data.length == 0)) {
                  
                    _this.setState({
                        show: true, meg: 'Fail \n ' + "NOT FOUND 404"
                    })
                    return
                    //TODO: Add error handling
                }

                if (result.data["Status"]=="Fail") {
                    _this.setState({
                        show: true, meg: 'fail  ' + result.data["Data"]["Message"]
                    })
                    return
                }


                _this.setState({ tablename: result.data["Header"].Header })
                _this.props.tablenamecallkey(result.data["Header"].Listdisplay)
                tblname = result.data["Header"]["TableName"]
                result.data.Header.Other.map((kk) => {
                    //DefaultValueEvent
                    if (kk.DefaultValueEvent != "") {
                        deafultval[kk.ColumnName] = kk.DefaultValue
                    }
                    if (kk.RequiredToSave == "false") {
                        notRequiredToSave.push(kk.ColumnName)
                    }
                    if (kk.DisplayType == "Dropdown" && kk.OnLoad == "true") {
                        var datakey = {
                            "id": kk.Id,
                            "Token": "", //"Smstest|Kavitha Shetty|FS01|KNH0007|lzOBgZHekf2019-05-10T17:17:02+05:30",
                            "priority": kk.Priority,
                            "onload": "1",
                            "control": "Dropdown",
                            "index": "1"
                        }
                        const teamsFromApi = []
                        postToServer("DynamicMasterQuery", datakey)
                            .then(function (resultcame) {
                                resultcame.data.map(data => {
                                    teamsFromApi.push({
                                        "key": data[Object.keys(data)[0]],
                                        "text": data[Object.keys(data)[1]],
                                        "value": data[Object.keys(data)[0]]
                                    })
                                })
                                let { controlVal } = _this.state
                                controlVal[kk.ColumnName] = {
                                    "type": kk.DisplayType,
                                    "query": kk.SqlQuery,
                                    "Priority": kk.Priority,
                                    "id": kk.Id,
                                    "child": kk.ControlID,
                                    "data": teamsFromApi,
                                    "onload": "true",
                                    "ReadOnly": kk.ReadOnly,
                                    "dis_name": kk.LabelDisplay,
                                    "Mandatory": kk.Mandatory,
                                    "RegularExpression": kk.RegularExpression,
                                    "DisplayName": kk.DisplayName,
                                    "Visible": kk.Visible,
                                    "CodeLength": kk.CodeLength,
                                    "RequiredToSave": kk.RequiredToSave,
                                    "P_key": kk.P_key
                                    
                                }
                                _this.setState({ controlVal })
                            }).catch((Error) => {
                                this.setState({
                                    show: true, meg: 'Error In App'
                                })
                            })
                    }
                    controlVal[kk.ColumnName] = {
                        "type": kk.DisplayType,
                        "Priority": kk.Priority,
                        "id": kk.Id,
                        "child": kk.ControlID,
                        "dis_name": kk.LabelDisplay,
                        "onload": "false",
                        "ReadOnly": kk.ReadOnly,
                        "Mandatory": kk.Mandatory,
                        "RegularExpression": kk.RegularExpression,
                        "DisplayName": kk.DisplayName,
                        "Visible": kk.Visible,
                        "CodeLength": kk.CodeLength,
                        "RequiredToSave": kk.RequiredToSave,
                        "P_key": kk.P_key,
                        "data": [{
                            key: "-1",
                            text: "select values",
                            value: "-1"
                        }]
                    }
                })
                _this.setState({ controlVal })
            }).catch((Error) => {


                _this.setState({
                    show: true, meg: 'Table Not Found 404'
                })

                //console.log(Error)
            })
    };
    render() {
        Editchangevalue = {}
        Userchangevalue = {}
        const updatekey = this.state.updatepkey

        if (!this.props.headkey) {
            return null
        }
        const { controlVal } = this.state
        let columns = Object.keys(controlVal).reduce((p, key, index) => {
            if (controlVal[key]["Visible"] == "true") {
                switch (controlVal[key]["type"]) {
                    case "date":
                    p.push(
                    <Col key={index/*controlVal[key]['id']*/} md={5} xl={3} className="masters">
                    <Date_Control Onclientchange={this.Onuserchangekey} DisplayName={controlVal[key]["DisplayName"]} Mandatory={controlVal[key]["Mandatory"]} Visible={controlVal[key]["Visible"]} CodeLength={controlVal[key]["CodeLength"]} RequiredToSave={controlVal[key]["RequiredToSave"]} displayname={controlVal[key]["dis_name"]} name={key} />
                    </Col>
                    )
                    break;
                    case "checkbox":
                    p.push(
                    <Col key={index/*controlVal[key]['id']*/} md={5} xl={3} className="masters">
                    <Checkbox Onclientchange={this.Onuserchangekey} DisplayName={controlVal[key]["DisplayName"]} Mandatory={controlVal[key]["Mandatory"]} Visible={controlVal[key]["Visible"]} CodeLength={controlVal[key]["CodeLength"]} RequiredToSave={controlVal[key]["RequiredToSave"]} displayname={controlVal[key]["dis_name"]} name={key} />
                    </Col>
                    )
                    break;
                    case "Text":
                    case "RichTextBox":
                        p.push(
                            <Col key={index/*//controlVal[key]['id']*/} md={5} xl={3} className="masters">
                                <Text RegularExpression={controlVal[key]["RegularExpression"]} setmax={this.setmaxcode} urlid={this.props.urlid} setprimarykey={this.setprimarykey} Onclientchange={this.Onuserchange} P_key={controlVal[key]["P_key"]} Mandatory={controlVal[key]["Mandatory"]} Visible={controlVal[key]["Visible"]} CodeLength={controlVal[key]["CodeLength"]} RequiredToSave={controlVal[key]["RequiredToSave"]} ReadOnly={controlVal[key]["ReadOnly"]} displayname={controlVal[key]["dis_name"]} name={key} Clear={this.state.handleclear} Clearnew={this.state.handleclearupdate} />
                            </Col>
                        )
                        break;
                    case "Dropdown":
                        p.push(
                            <Col key={index/*controlVal[key]['id']*/} md={5} xl={3} className="masters">
                                <Dropdown1
                                    send={''}
                                    callparent={''}
                                    child={controlVal[key]["child"]}
                                    id={controlVal[key]["id"]}
                                    Priority={controlVal[key]["Priority"]}
                                    dataotipn={controlVal[key]["data"]}
                                    name={key}
                                    displayname={controlVal[key]["dis_name"]}
                                    update={this.updateDropdownSelection.bind(this)}
                                    Mandatory={controlVal[key]["Mandatory"]}
                                    Visible={controlVal[key]["Visible"]}
                                    CodeLength={controlVal[key]["CodeLength"]}
                                    RequiredToSave={controlVal[key]["RequiredToSave"]}
                                    Dropdownval={this.state.Editval}

                                />
                            </Col>
                        )
                        break;
                    case "radio":
                        p.push(
                            <Col key={index/*controlVal[key]['id']*/} md={5} xl={3} className="masters">
                                <Radio Onclientchange={this.Onuserchangekey} DisplayName={controlVal[key]["DisplayName"]} Mandatory={controlVal[key]["Mandatory"]} Visible={controlVal[key]["Visible"]} CodeLength={controlVal[key]["CodeLength"]} RequiredToSave={controlVal[key]["RequiredToSave"]} displayname={controlVal[key]["dis_name"]} name={key} />
                            </Col>
                        )
                        break;
                    default:
                        break;
                }
            }
            return p
        }, [])
        return (

            <div className="content-spacing">
                <div className="dcr-head">
                    <div>
                        <h4 className="daily-call-report">{this.state.tablename}</h4>
                    </div>
                    <div>
                        <Breadcrumb className="dcr-breadcrumb">
                            <Breadcrumb.Item><Link to="/dashboard">Dashboard</Link></Breadcrumb.Item>
                            {/* <Breadcrumb.Item>Master</Breadcrumb.Item> */}
                            <Breadcrumb.Item active>{this.state.tablename}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="dcr-list-sec chemistTab p-3">
                    <div className={this.state.isFull ? "fullscreenView" : ''} >
                        <Row>
                            {
                                columns
                            }
                        </Row>
                    </div>
                    {this.state.Edit == null ?
                        <Row className="marginTop21">
                            <Col lg={6} md={6} sm={6} xs={12} className="colPad">
                                {/* <button onClick={this.savetable} className="primaryBtnPad  mb-2 ">Save</button> */}
                                <button onClick={this.savetablenew} className="primaryBtnPad  mb-2 ">Save</button>
                                <button onClick={this.handleclear} className="danger danger-outline mr-2 mb-2 padleft">Reset</button>
                            </Col>
                            <Col lg={3} md={3} sm={3} xs={3} className="colPad"></Col>
                            <Col lg={3} md={3} sm={3} xs={3} className="colPad"></Col>
                        </Row> :
                        <Row className="marginTop21">
                            <Col lg={6} md={6} sm={6} xs={12} className="colPad">
                                <button onClick={this.updatetable} className="primaryBtnPad  mb-2 ">update</button>
                                <button onClick={this.handleclearupdate} className="danger danger-outline mr-2 mb-2 padleft">Reset</button>
                            </Col>
                            <Col lg={3} md={3} sm={3} xs={3} className="colPad"></Col>
                            <Col lg={3} md={3} sm={3} xs={3} className="colPad"></Col>
                        </Row>
                    }
                </div>
                <StatusPopup
                    message={this.state.meg}
                    show={this.state.show}
                    onClose={this.handleClose}
                    success={true}
                />
                {/* <StatusPopupnew
list_satenew={this.state.listsatenew}
/> */}
            </div>
        )

    }

}
const mapStateToProps = state => ({
    data: state.MASTERList.data,
    header: state.MASTERList.header,
    Edit: state.MASTERList.Edit,
    // addkey:state.MASTERList.addkey

})
const mapDispatchToProps = dispatch => ({
    getMASTERLEdit: (data) => dispatch(getMASTERLEdit(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Mastercontrols)