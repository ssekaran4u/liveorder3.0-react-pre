import React, { Component } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { connect } from 'react-redux';
import { tick } from '../../lib/comm-utils'
import { postToServer } from '../../lib/comm-utils'

// pop up component 
import StatusPopup from '../../lib/StatusPopup'
import DCRSave from '../popups/DcrCreatedPopup'
// import MCRSave from '../popups/FeedbackComp'
import Loader from '../../lib/Loader'
import DoctorRCPA from '../components/DoctorRCPA'

import { Accordion, Card } from 'react-bootstrap';

import AddRow from './AddRow'
// import MCRTimeComp from '../components/MCRTimeComp'
// import MCRWorkingWithComp from '../components/MCRWorkingWithComp'
import Alert from 'react-bootstrap/Alert'
import {setApiCallStatus} from '../../actions/MrDashboard'

class DoctorDetailDCR extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            time: new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0"),
            timeType: '',
            datakey: [],
            docInfo: [],
            docArea: [],
            Selectedproductdic: {},
            SelectedSampledic: {},
            Selectedpop: {},
            Selectednote: '',
            saveDcrstatus: false,
            poptxt: '',
            notetxt: '',
            jointdic: {},
            dcrNo: '',
            dcrmsg: '',
            tableData: [],
            WorkType: '',
            morningcomponetstatus: 'M',
            workwithstr: {},
            selfworkcomponetstate: '0',
            mcrshow: false,
            mcrpopcontain: [],
            Finalcompititordata: {},
            FinalproductwiseRCPA: {},
            Errormsg: '',
            Outstanding: '',
            Closingvalue: '',
            Sales: '',
            loader: false,
            clearAll: false,
            loadself: {},
            Mandatory: {},
            Editmode: false,
            srNo: '',
            DCRNO: '',
            nosample: false,
            nogift: false,
            stayLocation:'',
            SaveData: {},
            checkedvalues : [],
            isdelete : false,
        }
        
        this.onMCRHide = this.onMCRHide.bind(this)
        this.handleShowModal = this.handleShowModal.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.getDropdown = this.getDropdown.bind(this)
        this.sendtable = this.sendtable.bind(this)
        this.SelectedSample = this.SelectedSample.bind(this)
        this.popSelected = this.popSelected.bind(this)
        this.showSuccessPopup = this.showSuccessPopup.bind(this)
        this.onHide = this.onHide.bind(this)
        this.Errorclose = this.Errorclose.bind(this)
        this.poptTxtchange = this.poptTxtchange.bind(this)
        this.onNotechange = this.onNotechange.bind(this)
        this.Selected = this.Selected.bind(this)
        this.Morningfun = this.Morningfun.bind(this)
        this.selfworkcomponetfun = this.selfworkcomponetfun.bind(this)
        this.funRCPA = this.funRCPA.bind(this)
        this.funRCPARemove = this.funRCPARemove.bind(this)
        this.productRCPA = this.productRCPA.bind(this)
        this.productRCPARemove = this.productRCPARemove.bind(this)
        this.reset = this.reset.bind(this)
        this.salesChange = this.salesChange.bind(this)
        this.ClosingvalueChange = this.ClosingvalueChange.bind(this)
        this.OutstandingvalueChange = this.OutstandingvalueChange.bind(this)
        this.getStayAtLoc = this.getStayAtLoc.bind(this)
        this.saveData = this.saveData.bind(this)
        this.getcheckedvalue = this.getcheckedvalue.bind(this)
        this.setdelete = this.setdelete.bind(this)
        this.setcheckedvalues = this.setcheckedvalues.bind(this)
    }

    reset() {
        this.setState({
            poptxt: '',
            notetxt: '',
            Selectednote: '',
            poptxt: '',
            Selectedproductdic: {},
            SelectedSampledic: {},
            Selectedpop: {},
            Outstanding: '',
            Closingvalue: '',
            Sales: '',
            morningcomponetstatus: 'M',
            workwithstr: {},
            selfworkcomponetstate: '0',
            clearAll: !this.state.clearAll, tableData: [],
        })
    }

    selfworkcomponetfun(data) {
        if (data == true) {
            this.setState({ selfworkcomponetstate: '1' })
        } else {
            this.setState({ selfworkcomponetstate: '0' })
        }
    }

    Morningfun(data) {
        this.setState({ morningcomponetstatus: data })
    }

    componentDidUpdate(oldprops, oldstate) {
        if ( oldprops.Editmodedata!= this.props.Editmodedata) {
            if (this.props.Editmodedata['Header']) {
                const dcrno = this.props.srNo
                // const n_workedwithself=this.props.Editmodedata['DWR'][0]["n_workedwithself"]
                // this.setState({  selfworkcomponetstate:n_workedwithself, Editmode: true, DCRNO: dcrno })
                this.setState({ Editmode: true, DCRNO: dcrno })
            }
            // if (this.props.Editmodedata['Dwrdetails']) {
            //     this.props.Editmodedata['Dwrdetails'].map((s) => {
            //         if (s.C_DSC_Code == this.props.doccode) {
            //             this.setState({ Outstanding: s.N_Outstanding, Closingvalue: s.N_Closing, Sales: s.N_Sales_Value })
            //         }
            //     })
            // }
        }

        if (oldstate.loadself != this.state.loadself) {
            if (this.state.loadself == undefined) {
                return null
            }
            var data = {
                "n_type": this.state.loadself["N_Type"]
            }
            postToServer("DcrComponentAdd", data).then((result) => {
                const WorkType = result.data[0]["c_worktrype"]
                this.setState({ datakey: result.data, WorkType: WorkType })
            }).catch((Error) => {
                //
            })
        }
    }

    componentDidMount() {
        if (this.props.Editmodedata) {
            if (this.props.Editmodedata['Header']) {
                const dcrno = this.props.srNo
                // const n_workedwithself=this.props.Editmodedata['DWR'][0]["n_workedwithself"]
                // this.setState({  selfworkcomponetstate:n_workedwithself, Editmode: true, DCRNO: dcrno })
                this.setState({ Editmode: true, DCRNO: dcrno })
            }
            // if (this.props.Editmodedata['Dwrdetails']) {
            //     this.props.Editmodedata['Dwrdetails'].map((s) => {
            //         if (s.C_DSC_Code == this.props.doccode) {
            //             this.setState({ Outstanding: s.N_Outstanding, Closingvalue: s.N_Closing, Sales: s.N_Sales_Value })
            //         }
            //     })
            // }
        }

        var d = new Date(this.props.Selectdate)

        const month = d.getMonth() + 1
        const date = d.getFullYear() + '-' + month + '-' + d.getDate();
        const data = { "index": "DoctorApp", "Data": { "date": date, "doc": this.props.doccode } }

        postToServer("DCRAPI", data).then((result) => {
            const WorkType = result.data["Component"][0]["c_worktrype"]

            // if (result.data["Edit"]) {
            //     if (result.data["Edit"][0]) {
            //         if (result.data["Edit"][0]["N_Srno"]) {
            //             if (!this.props.Editmodedata['DWR']) {
            //                 // this.props.DCREDITActive(result.data["Edit"][0]["N_Srno"])
            //             }
            //         }
            //     }
            // }

            this.setState({
                loadself: result.data["data"][0],
                Mandatory: result.data["Validaion"][0],
                datakey: result.data["Component"],
                WorkType: WorkType
            })
        }).catch((Error) => { 
            // console.log(Error, 'man') 
        })
    }

    sendtable(datatable) {
        this.setState({
            tableData: datatable
        })
    }

    componentWillUnmount() {
        //clearInterval(this.intervalID);
    }

    getDropdown() {
        var data = {
            "n_type": this.props.dataDoc["N_Type"]
        }
        postToServer("DcrComponentAdd", data).then((result) => {
            const WorkType = result.data[0]["c_worktrype"]
            this.setState({ datakey: result.data, WorkType: WorkType })
        }).catch((Error) => {
            //
        })
    }

    handleShowModal() {
        this.setState({
            showModal: true
        });
    }

    handleClose() {
        this.setState({
            showModal: false
        })
    }

    Selectedproduct(id, name, item, status) {
        var procduct = {}
        procduct = this.state.Selectedproductdic
        if (procduct[item.c_item_code]) {
            delete procduct[item.c_item_code]
        }
        if (status == "1") {
            this.setState({
                Selectedproductdic: procduct,
                Errormsg: ''
            })
            return
        }
        procduct[item.c_item_code] = { "Type": "NONE", "disname": item["c_name"] }
        if (item["textval"] == undefined) {
            item["textval"] = '0'
        }
        if (name == "Prescriber") {
            procduct[item.c_item_code] = { "Type": "1", "textval": item["textval"], "disname": item["c_name"] }
        }
        if (name == "Non Prescriber") {
            procduct[item.c_item_code] = { "Type": "2", "textval": item["textval"], "disname": item["c_name"] }
        }
        if (name == "Convert") {
            procduct[item.c_item_code] = { "Type": "3", "textval": item["textval"], "disname": item["c_name"] }
        }
        if (name == "Others") {
            procduct[item.c_item_code] = { "Type": "4", "textval": item["textval"], "disname": item["c_name"] }
        }
        this.setState({
            Selectedproductdic: procduct,
            Errormsg: ''
        })
    }
    
    SelectedSample(SelectedSample, nosample, nogift) {
        this.setState({ nosample: nosample, nogift: nogift, Errormsg: '', SelectedSampledic: SelectedSample })
    }

    popSelected(Selectedpop) {
        this.setState({ Errormsg: '', Selectedpop: Selectedpop })
    }

    NoteSelected(Selectednote) {
        this.setState({ Errormsg: '', Selectednote: Selectednote })
    }

    showSuccessPopup(staylocation) {
        if (this.props.apiResultState) {
            if (this.props.apiResultState["callAvg"] == 1) {
                var apiRest = this.props.apiResultState['callAvg'];
                var apiRest = 0
                this.props.setApiCallStatus(apiRest)
            }
        }

        let Errorstate = false
        let RCPALIST = {}

        var str = ''
        var listResult = {}
        let RCPAproduct = this.state.FinalproductwiseRCPA
        let compititor = this.state.Finalcompititordata

        // console.log("Rashmi - RCPAproduct", RCPAproduct)
        // console.log("Rashmi - compititor", compititor)

        if (Object.keys(RCPAproduct).length != 0 && Object.keys(compititor).length != 0) {
            let RCPAProductArray = RCPAproduct[Object.keys(RCPAproduct)[0]]
            let CompititorArray = compititor[Object.keys(RCPAproduct)[0]]
            let RCPAProductArrayKeys = Object.keys(RCPAProductArray)
            let CompititorArrayKeys = Object.keys(CompititorArray)

            let isValidBrandCompetitor = true
            for (var i=0; i < RCPAProductArrayKeys.length; i++) {
                let brandToCheck = RCPAProductArrayKeys[i]
                if (isValidBrandCompetitor) {
                    isValidBrandCompetitor = CompititorArrayKeys.indexOf(brandToCheck) > -1
                }
            }

            if (isValidBrandCompetitor) {
                Object.keys(RCPAproduct).map((key) => {
                    if (compititor) {
                        if (Object.keys(compititor).length == 0 || compititor == undefined) {
                            this.setState({
                                Error: true,
                                Errormsg: 'Please Select Compititor'
                            })
                            Errorstate = true
                            return null
                        }
                    }
                    Object.keys(compititor[key]).map((compitior) => {
                        if (RCPAproduct[key][compitior] != undefined) {
                            const prrx = RCPAproduct[key][compitior]["rx"] == undefined || RCPAproduct[key][compitior]["rx"] == '' ? '0' : RCPAproduct[key][compitior]["rx"]
                            const prQuantity = RCPAproduct[key][compitior]["Quantity"] == undefined || RCPAproduct[key][compitior]["Quantity"] == '' ? '0' : RCPAproduct[key][compitior]["Quantity"]
                            const prValue = RCPAproduct[key][compitior]["Value"] == undefined || RCPAproduct[key][compitior]["Value"] == '' ? '0' : RCPAproduct[key][compitior]["Value"]
                            const prWeightage = RCPAproduct[key][compitior]["Weightage"] == undefined || RCPAproduct[key][compitior]["Weightage"] == '' ? '0' : RCPAproduct[key][compitior]["Weightage"]
                            str = str + compitior + '~' + 'A' + '~' + prrx + '~' + prQuantity + '~' + prValue + '~' + prWeightage + '#'
                            Object.keys(compititor[key][compitior]).map((onecomp) => {
                                const comrx = compititor[key][compitior][onecomp]["rx"] == '' ? '0' : compititor[key][compitior][onecomp]["rx"]
                                const comQuantity = compititor[key][compitior][onecomp]["Quantity"] == '' ? '0' : compititor[key][compitior][onecomp]["Quantity"]
                                const comValue = compititor[key][compitior][onecomp]["Value"] == '' ? '0' : compititor[key][compitior][onecomp]["Value"]
                                const comWeightage = compititor[key][compitior][onecomp]["Weightage"] == '' ? '0' : compititor[key][compitior][onecomp]["Weightage"]
                                str = str + onecomp + '~' + onecomp + '~' + comrx + '~' + comQuantity + '~' + comValue + '~' + comWeightage + '#'
                            })
                            str = str + '$'
                        }
                    })
                    listResult[key] = str
                    str = ''
                })
            } else {
                this.setState({
                    Error: true,
                    Errormsg: 'Please add competitor product for to proceed'
                })
                Errorstate = true
                return null
            }
        } else {
            if (Object.keys(RCPAproduct).length == 0) {
                this.setState({
                    Error: true,
                    Errormsg: 'Please add brand to proceed'
                })
                Errorstate = true
                return null
            } else if (Object.keys(compititor).length == 0) {
                this.setState({
                    Error: true,
                    Errormsg: 'Please add competitor product to proceed'
                })
                Errorstate = true
                return null
            }
        }

        RCPALIST = listResult

        // End RCPA
        if (this.props.dcrallowstatus == true) {
            this.setState({
                Error: true,
                Errormsg: 'DCR Not Allowed'
            })
            return null
        }

        if (this.state.Mandatory["PdtMan"] == "1") {
            if (Object.keys(this.state.Selectedproductdic).length == 0) {
                this.setState({
                    Error: true,
                    Errormsg: 'Please Select product'
                })
                return null
            }
        }

        let lacoalsample = false
        let localgift = false

        if (this.state.nosample) {
            lacoalsample = true
        }

        if (this.state.nogift) {
            localgift = true
        }

        if (this.state.Mandatory["SampleMan"] == "1") {
            if (Object.keys(this.state.SelectedSampledic).length == 0) {
                if (!this.state.nogift) {
                    this.setState({
                        Error: true,
                        Errormsg: 'Please Select Brand Reminder'
                    })

                    return null
                }

                if (!this.state.nosample || !this.state.nogift) {
                    this.setState({
                        Error: true,
                        Errormsg: 'Please Select Sample '
                    })

                    return null
                }
            } else {
                Object.keys(this.state.SelectedSampledic).map((lo) => {
                    if (!this.state.nosample) {
                        if (this.state.SelectedSampledic[lo]["type"] == "sample") {
                            lacoalsample = true
                        }
                    }
                    if (!this.state.nogift) {
                        if (this.state.SelectedSampledic[lo]["type"] == "gift") {
                            localgift = true
                        }
                    }
                })

                if (!lacoalsample) {
                    this.setState({
                        Error: true,
                        Errormsg: 'Please Select Sample'
                    })
                    return null
                }

                if (!localgift) {
                    this.setState({
                        Error: true,
                        Errormsg: 'Please Select Brand Reminder'
                    })
                    return null
                }
            }
        }

        if (this.state.Mandatory["NoteMan"] != 0) {
            if (this.state.notetxt.length == 0) {
                this.setState({
                    Error: true,
                    Errormsg: 'Please Enter Note'
                })
                return null
            }
        }

        let workstr = ''
        if (typeof this.state.workwithstr != "string") {
            Object.keys(this.state.workwithstr).map((d) => {
                workstr = workstr + d + ','
            })
        } else {
            workstr = this.state.workwithstr + ','
        }

        let product = ''
        Object.keys(this.state.Selectedproductdic).map((key) => {
            // procduct[item.c_item_code] = {  "Type":  name,"qty":item["textval"] }
            if (this.state.Selectedproductdic[key]["Type"] == 'NONE') {
                if (this.props.Mandatory["doctorrol"] == "1") {
                    var msg = "Doctor Roll Not Selected For  " + this.state.Selectedproductdic[key]["disname"] + '(' + key + ')'
                    this.setState({
                        Error: true,
                        Errormsg: msg
                    })
                    Errorstate = true
                } else {
                    product = product + key + '~' + '0' + '~' + '0' + '#'
                }
            } else {
                if (this.state.Selectedproductdic[key]["textval"] == undefined) {
                    product = product + key + '~' + this.state.Selectedproductdic[key]["Type"] + '~' + 0 + '#'
                } else {
                    product = product + key + '~' + this.state.Selectedproductdic[key]["Type"] + '~' + this.state.Selectedproductdic[key]["textval"] + '#'
                }
            }
        })

        if (Errorstate == true) {
            return null
        }

        let samplestr = ''
        Object.keys(this.state.SelectedSampledic).map((Samplekey) => {
            samplestr = samplestr + Samplekey + '~' + this.state.SelectedSampledic[Samplekey]["qty"] + '#'
        })

        let popdeatis = ''
        let lamsam = 0
        Object.keys(this.state.Selectedpop).map((k) => {
            popdeatis = popdeatis + k + '~' + this.state.Selectedpop[k]["name"] + '~' + this.state.Selectedpop[k]["rate"] + '#'
        })

        if (this.state.staylocation == "") {
            this.setState({
                Error: true,
                Errormsg: 'Please Select Stay At'
            })
            return null
        }

        this.setState({
            loader: true
        })

        let sample = ''
        let sampleqty = ''
        if (!this.state.Editmode) {
            var jsonObject = {
                "Index": "RCPASave",
                "DCRNO": "0",
                "SRNO": "0",
                "DSCCode": this.state.loadself["DoctorCode"],
                "DateReport": this.props.Executedate,
                "RCPA": RCPALIST,
                "Data": this.state.SaveData
            }
            
            this.setState({
                loader: true
            })

            postToServer("RCPA_API", jsonObject).then((result) => {
                if (result.data["Status"] == "Success") {
                    this.setState({
                        loader: false,
                        saveDcrstatus: true,
                        dcrmsg: "Success!"
                    })
                } else {
                    this.setState({
                        loader: false,
                        Error: true,
                        Errormsg: "Failure!"
                    })
                }
            }).catch((Error) => {
                this.setState({
                    loader: false,
                    Error: true,
                    Errormsg: ' Something went wrong. Please try again.'
                })
            })
        } else {
            var jsonObject = {
                "Index": "RCPASave",
                "DCRNO": "0", // TODO : ONCE DCR RCPA NEED TO BE EDITED THIS NO MIGHT BE DCR NO
                "SRNO": this.props.srNo,
                "DSCCode": this.state.loadself["DoctorCode"],
                "DateReport": this.props.Executedate,
                "RCPA": RCPALIST,
                "Data": this.state.SaveData
            }
            
            this.setState({
                loader: true
            })

            postToServer("RCPA_API", jsonObject).then((result) => {
                if (result.data["Status"] == "Success") {
                    this.setState({
                        loader: false,
                        saveDcrstatus: true,
                        dcrmsg: "Success!"
                    })
                } else {
                    this.setState({
                        loader: false,
                        Error: true,
                        Errormsg: "Failure!"
                    })
                }
            }).catch((Error) => {
                this.setState({
                    loader: false,
                    Error: true,
                    Errormsg: ' Something went wrong. Please try again.'
                })
            })
        }
    }

    onMCRHide() {
        this.setState({ mcrshow: false })
        this.props.removeItem(this.props.dataDoc["DoctorCode"])
    }
    
    onHide() {
        this.setState({ saveDcrstatus: false })
        if (this.props.dataDoc["Type"] == "mcr") {
            if (this.state.mcrpopcontain.length > 0) {
                this.setState({ mcrshow: true })
            } else {
                this.props.removeItem(this.props.dataDoc["DoctorCode"])
            }
        } else {
            this.props.removeItem(this.props.dataDoc["DoctorCode"])
        }
    }
    
    Errorclose() {
        this.setState({ Error: false })
    }

    poptTxtchange(poptxt) {
        this.setState({ Errormsg: '', poptxt: poptxt })
    }

    onNotechange(note) {
        this.setState({ Errormsg: '', notetxt: note })
    }

    Selected(data) {
        this.setState({ Errormsg: '', workwithstr: data })
    }

    funRCPA(oldData, Data, doctorcode) {
        // console.log("funRCPA", oldData, Data, doctorcode)
        let newInnerData = {}
        let oldInnerData = Data[Object.keys(Data)[0]]
        Object.keys(oldInnerData).map((key) => {
            if (oldData != key) {
                newInnerData[key] = oldInnerData[key]
            }
        })
        Data[Object.keys(Data)[0]] = newInnerData
        var Finalcompititordata = {}
        Finalcompititordata = this.state.Finalcompititordata
        Finalcompititordata[doctorcode] = Data
        this.setState({ Finalcompititordata: Finalcompititordata })
    }

    funRCPARemove(doctorCode, brandCode, oldData) {
        if (doctorCode != "" && doctorCode != undefined && 
            brandCode != "" && brandCode != undefined &&
            oldData != "" && oldData != undefined) {

            let Finalcompititordata = this.state.Finalcompititordata
            let newInnerData = {}
            let oldInnerData = Finalcompititordata[doctorCode][brandCode]
            Object.keys(oldInnerData).map((key) => {
                if (oldData != key) {
                    newInnerData[key] = oldInnerData[key]
                }
            })
            Finalcompititordata[doctorCode][brandCode] = newInnerData
            this.setState({ Finalcompititordata: Finalcompititordata })
        }
    }

    productRCPA(oldData, Data, doctorCode) {
        // console.log("productRCPA", oldData)
        if (doctorCode != "" && doctorCode != undefined && 
            oldData != "" && oldData != undefined) {
            
            // console.log("productRCPA", oldData)

            let Finalcompititordata = this.state.Finalcompititordata
            let newInnerData = {}
            let oldInnerData = {}
            if (Finalcompititordata[doctorCode] != undefined) {
                oldInnerData = Finalcompititordata[doctorCode]
            }
            
            Object.keys(oldInnerData).map((key) => {
                // console.log("productRCPACOMPARE", oldData, key)
                if (oldData != key) {
                    newInnerData[key] = oldInnerData[key]
                }
            })
            // console.log("productRCPA FINAL", newInnerData)
            Finalcompititordata[doctorCode] = newInnerData
            this.setState({ Finalcompititordata: Finalcompititordata })
            // console.log("productRCPA END", Finalcompititordata)
        }
        
        // console.log("productRCPA", Data)
        var FinalproductwiseRCPA = {}
        FinalproductwiseRCPA = this.state.FinalproductwiseRCPA
        FinalproductwiseRCPA = Data
        // console.log("productRCPA 2", FinalproductwiseRCPA)
        this.setState({ FinalproductwiseRCPA: FinalproductwiseRCPA })


        // console.log("productRCPA", oldData, Data, doctorcode)
        // let newFinalproductwiseRCPA = {}
        // var oldFinalproductwiseRCPA = {}
        // oldFinalproductwiseRCPA = this.state.FinalproductwiseRCPA
        // if (oldData != "") {
        //     Object.keys(oldFinalproductwiseRCPA).map((key) => {
        //         if (oldData != key) {
        //             newFinalproductwiseRCPA[key] = oldFinalproductwiseRCPA[key]
        //         }
        //     })
        // }
        // console.log(newFinalproductwiseRCPA)
        
        // let newInnerData = {}
        // let newItemKey = Object.keys(Data)[0]
        // let oldInnerData = Data[Object.keys(Data)[0]]
        // Object.keys(oldInnerData).map((key) => {
        //     newInnerData[key] = oldInnerData[key]
        // })
        // if (newFinalproductwiseRCPA[doctorcode] == undefined) {
        //     newFinalproductwiseRCPA[doctorcode] = {}
        // } 
        // newFinalproductwiseRCPA[doctorcode][newItemKey] = newInnerData
        // console.log(newFinalproductwiseRCPA)
        // this.setState({ FinalproductwiseRCPA: newFinalproductwiseRCPA })
    }

    productRCPARemove(doctorCode, brandCode, isRemoveAll) {
        if (doctorCode != "" && doctorCode != undefined && 
            brandCode != "" && brandCode != undefined) {

            if (isRemoveAll) {
                this.props.enableDateForEdit()
                this.setState({ FinalproductwiseRCPA: {}, Finalcompititordata: {}})
            } else {
                let productData = this.state.FinalproductwiseRCPA
                let newInnerProductData = {}
                let oldInnerProductData = productData[doctorCode]
                if (oldInnerProductData == undefined || oldInnerProductData == null) {
                    oldInnerProductData = {}
                }
                let array2 = this.state.checkedvalues
                Object.keys(oldInnerProductData).map((key) => {
                  array2.map((element) => {
											if(key != element){
													newInnerProductData[key] = oldInnerProductData[key]												
											}
											else{
												delete oldInnerProductData[key]
											}
									})
                })
                productData[doctorCode] = oldInnerProductData
    
                let compititorData = this.state.Finalcompititordata
                let newInnerCompData = {}
                let oldInnerCompData = compititorData[doctorCode]
                if (oldInnerCompData == undefined || oldInnerCompData == null) {
                    oldInnerCompData = {}
								}
								Object.keys(oldInnerCompData).map((key) => {
                  array2.map((element) => {
										if(key != element){
											newInnerCompData[key] = oldInnerCompData[key]
											
										}
										else{
											delete oldInnerCompData[key]
										}
									})
                })
                compititorData[doctorCode] = oldInnerCompData
    
                this.setState({ FinalproductwiseRCPA: productData, Finalcompititordata: compititorData, isdelete:true})
            }
        }
    }

    RCPASavecode() {
        var str = ''
        let count = 0
				var listResult = {}
        const product = this.state.FinalproductwiseRCPA
        const compititor = this.state.Finalcompititordata
        if (product != undefined) {
            Object.keys(product).map((key) => {
                if (compititor) {
                    if (Object.keys(compititor).length == 0 || compititor == undefined) {
                        this.setState({ Error: true, Errormsg: 'Please Select Compititor' })
                        return ''
                    }
								}
                Object.keys(compititor[key]).map((compitior) => {
                    const prrx = product[key][compitior]["rx"] == undefined ? '0' : product[key][compitior]["rx"]
                    const prQuantity = product[key][compitior]["Quantity"] == undefined ? '0' : product[key][compitior]["Quantity"]
                    const prValue = product[key][compitior]["Value"] == undefined ? '0' : product[key][compitior]["Value"]
                    const prWeightage = product[key][compitior]["Weightage"] == undefined ? '0' : product[key][compitior]["Weightage"]
                    str = str + compitior + '~' + 'A' + '~' + prrx + '~' + prQuantity + '~' + prValue + '~' + prWeightage + '#'
                    Object.keys(compititor[key][compitior]).map((onecomp) => {
                        const comrx = compititor[key][compitior][onecomp]["rx"] == '' ? '0' : compititor[key][compitior][onecomp]["rx"]
                        const comQuantity = compititor[key][compitior][onecomp]["Quantity"] == '' ? '0' : compititor[key][compitior][onecomp]["Quantity"]
                        const comValue = compititor[key][compitior][onecomp]["Value"] == '' ? '0' : compititor[key][compitior][onecomp]["Value"]
                        const comWeightage = compititor[key][compitior][onecomp]["Weightage"] == '' ? '0' : compititor[key][compitior][onecomp]["Weightage"]
                        str = str + onecomp + '~' + onecomp + '~' + comrx + '~' + comQuantity + '~' + comValue + '~' + comWeightage + '#'

                        count = count + 1
                    })
                    str = str + '$'
                })

                listResult[key] = str
                str = ''
            })
        }

        return listResult
    }

    salesChange(event) {
        const { value } = event.target
        const re = /^\d{1,}(\.\d{0,4})?$/;
        if (value.length == 0) {
            this.setState({ Sales: '' })
        }
        if (re.test(value)) {
            if (value.length < 10) {
                this.setState({ Sales: value })
            }
        }
    }
    
    OutstandingvalueChange(event) {
        const { value } = event.target;
        const re = /^\d{1,}(\.\d{0,4})?$/;
        if (value.length == 0) {
            this.setState({ Outstanding: '' })
        }
        if (re.test(value)) {
            if (value.length < 10) {
                this.setState({ Outstanding: value })
            }
        }
    }
    
    ClosingvalueChange(event) {
        const { value } = event.target
        const re = /^\d{1,}(\.\d{0,4})?$/;
        if (value.length == 0) {
            this.setState({ Closingvalue: '' })
        }
        if (re.test(value)) {
            if (value.length < 10) {
                this.setState({ Closingvalue: value })
            }
        }
    }

    getStayAtLoc(location){ 
        this.setState({
            stayLocation:location
        })
    }

    saveData(dataObject) {
        this.setState({SaveData: dataObject})
    }
    getcheckedvalue(brandcode){
			let checkedvalues = this.state.checkedvalues
			checkedvalues.push(brandcode)
			this.setState({checkedvalues:checkedvalues})
		}
    setdelete(getval){
        this.setState({isdelete:getval})
    }
    setcheckedvalues(){
			this.setState({checkedvalues : []})	
    }
    render() {
        const d = new Date()
        // let savehide = false

        // if (Object.keys(this.props.Editmodedata).length > 0) {
        //     const selectDate =this.props.Entry_Date
        //     const selectdateformat = selectDate.getFullYear() + '-' + (selectDate.getMonth() + 1) + "-" + selectDate.getDate()
        //     const tdate = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

        //     if (tdate != selectdateformat) {
        //         savehide=true
        //     }
        // }

        let dataDoc = {}

        if (this.state.loadself == undefined) {
            return null
        }
        
        dataDoc = this.state.loadself

        if (!dataDoc)
            return null

        const { datakey, tableData } = this.state
        const accordianItems = Object.keys(tableData).reduce((p, n, i) => {
            if (typeof (tableData[n]) === "string") {
                const name = n.split('$')[1]
                p.push(
                    <Card key={name}>
                        <Accordion.Toggle as={Card.Header} eventKey={name}>
                            {name}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={name}>
                            <Card.Body>
															{/* <AddRow saveData={this.saveData} configurationData={this.props.configurationData} Editmodedata={this.props.Editmodedata} 
																<AddRow saveData={this.saveData} configurationData={this.props.configurationData} Editmodedata={this.props.Editmodedata}  */}
															<AddRow saveData={this.saveData} configurationData={this.props.configurationData} Editmodedata={this.props.Editmodedata} 
															productRCPA={this.productRCPA} productRCPARemove={this.productRCPARemove} funRCPA={this.funRCPA} 
																productRCPA={this.productRCPA} productRCPARemove={this.productRCPARemove} funRCPA={this.funRCPA} 
															productRCPA={this.productRCPA} productRCPARemove={this.productRCPARemove} funRCPA={this.funRCPA} 
															funRCPARemove={this.funRCPARemove} name={name} data={n.split('$')[2]} getcheckedvalue={this.getcheckedvalue} checkedvalues={this.state.checkedvalues} isdelete={this.state.isdelete}
															FinalproductwiseRCPA={this.state.FinalproductwiseRCPA} setdelete={this.setdelete} setcheckedvalues={this.setcheckedvalues}/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                )
            }
            return p
        }, [])

        if (!datakey)
            return null
        
        return (
            <div className="DcrDropdown ">
                {/* <div className="mcrFlex">
                    <div className="timeSec">
                        <div className="timeIcon"><img src="../public/assets/images/time.svg" /></div>
                        <div className="currtime">{this.state.time}</div>
                        <div className="currtimeslot">{tick()}</div>
                    </div>
                    { dataDoc["Type"] == "mcr" ? <MCRWorkingWithComp   result={this.state.selfworkcomponetstate} Editmodedata={this.props.Editmodedata} id={dataDoc["Dr_Name"]} selfworkcomponetfun={this.selfworkcomponetfun} /> : '' }
                    <MCRTimeComp dsccode={dataDoc["DoctorCode"]} Editmodedata={this.props.Editmodedata} Morningfun={this.Morningfun} />
                </div> */}
                { this.state.Errormsg != '' ?
                <Alert variant="danger"  >
                    {this.state.Errormsg}
                </Alert> : ''}
                <div className="pad22">
                    <Row key={"row" + dataDoc["DoctorCode"]} >
                        { datakey.map((item, index) => {
                            if (item.c_name == "RCPA") {
                                return <Col lg={12} md={12} >
                                    <Form.Label className="customized-label">RCPA</Form.Label>
                                    <DoctorRCPA 
                                        Selectdate={this.props.date} 
                                        Editmodedata={this.props.Editmodedata} 
                                        srNo        = {this.props.srNo}
                                        dcrNo       = {this.props.dcrNo}
                                        rcpaDate    = {this.props.rcpaDate}
                                        isDcr       = {this.props.isDcr}
                                        clearAll={this.state.clearAll} 
                                        eventKey={this.props.eventKey} 
                                        sendtable={this.sendtable} 
                                        docid={dataDoc["DoctorCode"]} />
                                </Col>
                            }
                        })}
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col lg={12} md={12}>
                            {(accordianItems.length > 0) &&
                                <div className="rcpaAccor">
                                    <Accordion >
                                        {accordianItems}
                                    </Accordion>
                                </div>
                            }
                        </Col>
                    </Row>
                </div>
                <Row className="marginTop21 dcrBtnPad">
                    <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.Errorclose}
                        success={false} />
                    <Loader show={this.state.loader} ></Loader>
                    {/* <MCRSave doc={dataDoc["DoctorCode"]} dcrno={this.state.dcrNo} question={this.state.mcrpopcontain} onHide={this.onMCRHide} show={this.state.mcrshow} /> */}
                    <DCRSave 
                        onHide={this.onHide} 
                        dcrNo={this.state.dcrNo} 
                        dcrmsg={this.state.dcrmsg} 
                        show={this.state.saveDcrstatus} />
                    {this.props.isEditable == true ? 
                        <Col lg={6} md={12} sm={12} xs={12} className="product">
                            <button className="savedcrBtn  mb-2" onClick={()=>this.showSuccessPopup(this.state.stayLocation)}>Save</button>
                            <button onClick={this.reset} className="danger danger-outline mr-2 mb-2 padleft" >Reset</button>
                        </Col> 
                    : null }
                </Row>
            </div>
        );
    }
}

const mapStateToProps =(state)=>({
    apiResultState:state.MRDashboard.apiresult,
})

const mapDispatchToProps = (dispatch) =>({
    setApiCallStatus:data => dispatch(setApiCallStatus(data)),
})

export default  connect(mapStateToProps,mapDispatchToProps)(DoctorDetailDCR)
