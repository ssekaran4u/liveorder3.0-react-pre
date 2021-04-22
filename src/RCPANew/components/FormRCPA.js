import React, { Component } from 'react'
import { withRouter } from "react-router";
import { Form, Dropdown, Row, Col, InputGroup } from 'react-bootstrap'
import { Accordion, Card } from 'react-bootstrap';
import { connect } from 'react-redux';

import { tick } from '../../lib/comm-utils'
import { postToServer } from '../../lib/comm-utils'

import { getserachData } from '../../actions/RCPA_API_Search'

import Alert from 'react-bootstrap/Alert'
import DatePicker from 'react-datepicker'

import StatusPopup from '../../lib/StatusPopup'
import PopupDelete from '../popups/PopupDelete'
import SearchDoctor from '../components/SearchDoctor'
import SearchDropdown from './SearchDropdown'
import DoctorDetailDCR from '../components/DoctorDetailDCR'

class FormRCPA extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            data: [],
            Worktype: [],
            plannedTask:[],
            selectedName: [],
            subList: false,
            selectedData: {},
            configurationData: {},
            removeData: null,
            filterdata: [],
            value: '',
            date: new Date(),
            Entry_Date: new Date(),
            time: new Date().getHours()+":"+String(new Date().getMinutes()).padStart(2, "0"),
            Errormsg: '',
            Error: false,
            SelectDate: '',
            AllowDCRError: false,
            searchkey:0,
            clearsearch:false,
            popupDelete:false,
            DocEdit:{},
            deleteoff:true,
            designation:'',
            SelectedDeg:'',
            SelectedFS:'',
            deleteDCR:'',
            StayAtLocation:'',
            defaultHq:'',
            stayFlag:'',
            stayAutoFlag:''
        }

        this.getData = this.getData.bind(this)
        this.removeItem = this.removeItem.bind(this)
        this.getserach = this.getserach.bind(this)
        this.Errorclose = this.Errorclose.bind(this)
        this.dateChanged = this.dateChanged.bind(this);
        this.getSearchData = this.getSearchData.bind(this)
        this.removeItemlocal=this.removeItemlocal.bind(this)
        this.save=this.save.bind(this)
        this.loadplantak=this.loadplantak.bind(this)
        this.deletedoc=this.deletedoc.bind(this)
        this.showPopup = this.showPopup.bind(this)
        this.closePopup = this.closePopup.bind(this)
        this.getDeg=this.getDeg.bind(this)
        this.getfsname=this.getfsname.bind(this)
        this.getStayAt = this.getStayAt.bind(this)
        this.getStayAtLoc = this.getStayAtLoc.bind(this)
        this.getStayLocation = this.getStayLocation.bind(this)
    }


    deletedoc(value) {
        const data={"index":"DWR_DELETE","Header":{ "Dcr_no":this.state.deleteDCR,"doc":value }}
        
        postToServer("DCRAPI", data).then((result) => { 
            this.removeItemlocal(value)
            if (result.data["data"][0]["validate"]) {
                const msgdis=result.data["data"][0]["validate"]
                this.setState( { Error: true, Errormsg:msgdis })
            } else {
                this.setState( { Error: true, Errormsg: 'DCR Deleted  For  '+ value })
            }
        }).catch( (Error)=> { 
            this.setState( { Error: true, Errormsg: 'DCR Delete not Allowed' })
        })
    }

    getfsname(fscode) {
        this.setState({ SelectedFS:fscode })
    }

    getStayAt() {

    }

    getDeg(deg) {
        if (deg=="-1") {
            this.setState({SelectedDeg:'',fscode:''})
        } else {
            this.setState({SelectedDeg:deg,fscode:''})
        }
    }

    loadplantak() {
        if (this.props.match.params.id==undefined) {
            if (this.state.plannedTask) {
                if (this.state.plannedTask==undefined) {
                    return
                }

                let k={}

                this.state.plannedTask.map( (l,index) => {
                    var today= this.state.date
                    var current=  new Date(l["PlannedDate"])

                    var Nowdate=  new Date()
                    var day2 = Nowdate.getDate()
                    var year2 = Nowdate.getFullYear()
                    var month2 = Nowdate.getMonth() 

                    var day = today.getDate()
                    var year = today.getFullYear()
                    var month = today.getMonth() 

                    var day1 = current.getDate()
                    var year1 = current.getFullYear()
                    var month1 = current.getMonth()

                    if (day2==day && year2==year && month2==month) {
                        if (day==day1 && year==year1 && month==month1) {
                            k[l["DSC Code"]]={"Area":"","DSCAName":l["DSCType"],"DSCASubName":"kkk","DoctorCode": l["DSC Code"],"Dr_Name": l["DSC Name"],"FsCode":"","FsName":"","N_Type":l["DSCType"],"Type":l["Type"]}
                        }
                    }
                })

                this.setState({selectedData: k})
            }
        }
    }

    Deletedoc(){

    }
    
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.data)
            return { ...prevState, data: nextProps.data }

        if (nextProps.plannedTask != prevState.plannedTask) {
            return { ...prevState, plannedTask: nextProps.plannedTask };
        }

        return prevState;
    }

    Errorclose() {
        this.setState({ Error: false })
    }

    componentDidMount() {
        this.intervalID = setInterval(() => tick(), 1000);

        var day = this.state.date.getDate()
        var year = this.state.date.getFullYear()
        var month = this.state.date.getMonth() + 1

        const selecteddate = year + '-' + month + '-' + day

        if (this.props.Editmodedata) {
            this.dateChanged(this.state.date)
        } else {
            this.dateChanged(this.state.date)
        }

        let _this = this;
        postToServer("RCPA_API", {"Index":"CompetitorSetup"}).then((result) => {
            if (result.data.Status == "Success") {
                _this.setState({
                    configurationData: result.data.CompetatorSetup[0]
                })
            }
        }).catch((Error) => {
            _this.setState({ Error: true, Errormsg: "Something went wrong!" })
        })
    }

    getStayLocation(){
        
    }

    dateChanged(d) {
        var day = d.getDate()
        var year = d.getFullYear()
        var month = d.getMonth() + 1

        const selecteddate = year + '-' + month + '-' + day
        const _this = this
        _this.setState({ date: d, SelectDate: selecteddate });
        // var dd = d.getMonth() + 1
        // var data = {
        //     "validate": "HolidayValidation", 
        //     "date": d.getDate() + '-' + dd + '-' + d.getFullYear()
        // }

        // postToServer("DCRValidation", data).then((result) => {
        //     if (result.data.length != 0) {  
        //         const validatedate = result.data[0]["validate"]
                
        //         if (result.data[0]["flag"] == "0") { 
        //             if (!this.props.match.params.id==undefined) {
        //                 _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate, AllowDCRError: false })
        //             } else {
        //                 _this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: false })
        //             }
        //         }

        //         if (result.data[0]["flag"] == "1") { 
        //             if (!this.props.match.params.id==undefined) {
        //                 _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate, AllowDCRError: false })
        //             } else {
        //                 _this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: false })
        //             }
        //         }

        //         if (result.data[0]["flag"] == "2") {
        //             if (!this.props.match.params.id==undefined) {
        //                 _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate + '    DCR Not Allowed  For  This Date', AllowDCRError: true })
        //             } else {
        //                 _this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: true })
        //             }
        //         }

        //         if (result.data[0]["flag"] == "14") {
        //             if (!this.props.match.params.id==undefined) {
        //                 _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate + '       DCR Not Allowed  For  This Date', AllowDCRError: true })
        //             } else {
        //                 _this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: true })
        //             }
        //         }
        //     } else {
        //         if (!this.props.match.params.id==undefined) {
        //             _this.setState({ Errormsg: '', AllowDCRError: false })
        //         } else {
        //             _this.setState({ Errormsg: '', AllowDCRError: false })
        //         }
        //     }

        //     this.loadplantak()
        // }).catch((Error) => {
        //     console.log(Error, 'Error')
        //     _this.setState({ Error: true, Errormsg: "Error in App" })
        // })
    }

    getData(id, name, checked, type, data) {
        let { selectedData } = this.state
        
        if (checked) {
            selectedData[data["DoctorCode"]] = data
        } else {
            delete selectedData[data["DoctorCode"]]
        }

        this.setState({
            selectedData: selectedData,
            type: type
        })
    }

    removeItem(id) {
        const _this = this
        const data = this.state.selectedData
        
        delete data[id]
        
        _this.setState({ selectedData: data })
        
        if (Object.keys(data).length==0) {
            this.props.history.push('/RCPAList');
        }
    }

    removeItemlocal(id) {
        const _this = this
        const data = this.state.selectedData

        delete data[id]

        _this.setState({  clearsearch:!this.state.clearsearch , selectedData: data })
    }

    save() {
        this.setState({ clearsearch: !this.state.clearsearch })
    }

    getserach(val) {
        if (val.length==1) {
            let data = {
                "index": "ChemistList",
                "Data": { "search": val }
            }

            const len=val.length
            
            this.setState({searchkey:len})
            this.props.getserachData(data)
        } else {
            if (val.length % 3==0) {
                let data = {
                    "index": "ChemistList",
                    "Data": { "search": val }
                }

                const len=val.length

                this.setState({searchkey:len})
                this.props.getserachData(data)
            }
        }
    }

    getSearchData(data) {
        if (this.state.AllowDCRError == true) {
            this.setState({ Error: true  })
        } else {
            this.getserach(data)
        }
    }

    componentDidUpdate(oldprops,newstate) {
        // if (newstate.plannedTask != this.state.plannedTask) {
        //     this.loadplantak()
        // }

        if (oldprops.Editmodedata != this.props.Editmodedata) {
            let dcrno=''
            let listdoc = {}
            if (this.props.Editmodedata["Header"]) {
                var d1 = new Date(this.props.rcpaDate) 
                var g1 = new Date(); 
                
                this.dateChanged(d1)

                dcrno = this.props.srNo

                this.dateChanged(d1)

                if (d1.getDate() != g1.getDate() || d1.getMonth()!= g1.getMonth() || d1.getFullYear()!= g1.getFullYear()) {
                    this.setState({date :d1, Entry_Date:d1 })
                } else {
                    this.setState({date :d1, Entry_Date:d1, deleteoff:false})
                }
            }

            if (this.props.Editmodedata["Header"][0]) {
                let k={}
                k=this.state.selectedData
                listdoc[this.props.Editmodedata["Header"][0]["chemist_code"]] = dcrno
                k[this.props.Editmodedata["Header"][0]["chemist_code"]]={"Area":"","DSCAName":"CHEMIST","DSCASubName":"kkk","DoctorCode":this.props.Editmodedata["Header"][0]["chemist_code"],"Dr_Name": this.props.Editmodedata["Header"][0]["chemist_name"],"FsCode":"","FsName":"","N_Type":this.props.Editmodedata["Header"][0]["n_type"],"Type":this.props.Editmodedata["Header"][0]["n_type"]}

                this.setState({selectedData: k, DocEdit:listdoc})
            }
        }
    }

    showPopup(val,DCR) {
        this.setState({
            popupDelete:!this.state.popupDelete,
            itemvalue:val,
            deleteDCR:DCR
        })
    }

    closePopup() {
        this.setState({
            popupDelete: false
        });
    }

    getStayAtLoc(location){ 
        this.setState({
            StayAtLocation:location
        })
    }
    
    render() {
        let items
        let itemChemist
        let itemStock
        let che_count
        let stock_count
        let doc_count
        let FilterList = {}
        const { data } = this.state
        
        if (data) {
            data.map((Onedata) => {
                let list = []
                if (FilterList[Onedata["DSCAName"]]) {
                    list = FilterList[Onedata["DSCAName"]]
                    list.push(Onedata)
                    FilterList[Onedata["DSCAName"]] = list
                } else {
                    list.push(Onedata)
                    FilterList[Onedata["DSCAName"]] = list;
                }
            })
        }

        const Accordiondata = this.state.selectedData
        const selections = Object.keys(Accordiondata).reduce((p, n, i) => {
            if (Accordiondata[n]) {
                p.push(
                    <div>
                        <div key={n} className="selectedDropdown"> {this.state.selectedData[n]["Dr_Name"].toLowerCase()}
                            <img src="../public/assets/images/cancel.png" className="closeImg"
                                onClick={this.removeItemlocal.bind(this, n)} />
                        </div>
                    </div>
                )
            }
            
            return p
        }, [])

        const serachRes = Object.keys(Accordiondata).reduce((p, n, i) => {
            p.push(
                <span data={this.state.selectedData[n]} key={n} className="doctorName"> {this.state.selectedData[n]["Dr_Name"].toLowerCase()}  </span>
            )
            
            return p
        }, [])

        const accordionCards = Object.keys(Accordiondata).map((value, index) => {
            return (
                <Card key={value}>
                    <Accordion.Toggle as={Card.Header} eventKey={value}>
                        <div className="pointer capitalizationName longtextWrap">{Accordiondata[value]["Dr_Name"].toLowerCase() + '(' + Accordiondata[value]["DSCAName"].toLowerCase() + ')'}  {this.state.DocEdit[value] ?   this.state.deleteoff ? null :  null /*<img  onClick={()=>this.showPopup(value, this.state.DocEdit[value])}  className="deleteimagedcr pull-right" src="../public/assets/images/delete.svg"></img>*/ : null} </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={value}>
                        <Card.Body>
                            <div>
                                <DoctorDetailDCR  
                                    Entry_Date={this.state.Entry_Date}  
                                    DCREDITActive={this.props.DCREDITActive}     
                                    doccode={value} 
                                    Searchdata={Accordiondata} 
                                    Selectdate={this.state.date} 
                                    Editmodedata={ this.state.DocEdit[value] ? this.props.Editmodedata : {} }
                                    srNo        = { this.props.srNo }
                                    dcrNo       = { this.props.dcrNo }
                                    rcpaDate    = { this.props.rcpaDate }
                                    isDcr       = { this.props.isDcr }
                                    removeItem={this.removeItem} 
                                    dcrallowstatus={this.state.AllowDCRError} 
                                    eventKey={value} 
                                    Executedate={this.state.SelectDate} 
                                    Mandatory={this.props.Mandatory} 
                                    dataDoc={Accordiondata[value]} 
                                    StayAtLocation={this.state.StayAtLocation}
                                    stayAutoFlag={this.state.stayAutoFlag}
                                    configurationData={this.state.configurationData}
                                    edit={this.props.match.params.id == undefined ? '' : 'edit'}
                                    isEditable={this.props.isEditable}
                                    enableDateForEdit={this.props.enableDateForEdit} />
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        })

        return (
            <React.Fragment>
                <div className="marginTop16 dcr-list-sec">
                    <div className="dcrsearch">
                        <Row>
                            <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                                <Form.Label className="customized-label">Date <span className="colorRed">*</span></Form.Label>
                                <InputGroup className="datepickerAligment controls text-right">
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.dateChanged}
                                        dateFormat="dd-MMM-yy"
                                        maxDate={new Date()}
                                        readOnly={this.props.isDateDisabled} />
                                    <InputGroup.Append>
                                        <InputGroup.Text>
                                            <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                            { localStorage.getItem("type") == 1 ?
                            <Col xl={8} lg={8} md={8} sm={12} xs={12} className=" ">
                                <Form.Label className="customized-label">Search <span className="colorRed">*</span></Form.Label>
                                <div className="productDetailDrop">
                                    <Dropdown className="multiple-dropdown marginBot10">
                                        <Dropdown.Toggle id="dropdown-basic">
                                            <img src="../public/assets/images/search_grey@2x.png" className="serachImg" />
                                            <SearchDoctor clear={this.state.clearsearch} getSearchData={this.getSearchData} />
                                        </Dropdown.Toggle>
                                        { data == undefined ? '' :
                                        <Dropdown.Menu className="cal-scrollbar">
                                            <div className="Padding10 paddingTop searchData cal-scrollbar">
                                                { this.state.searchkey > 0   ? data.length > 0 ?
                                                <Form>
                                                    <div>
                                                        { Object.keys(FilterList).map((list) => {
                                                            return <div>
                                                                <div id={list} className='searchDiv'>{list} </div>
                                                                { FilterList[list].map((array) => {
                                                                    return <div>
                                                                        <SearchDropdown
                                                                            data={array}
                                                                            key={array["DoctorCode"]}
                                                                            id={"SearchDropdown" + array["DoctorCode"]}
                                                                            getData={this.getData.bind(this)}
                                                                            selection={this.state.selectedData[array["DoctorCode"]] ? 'checked' : null}
                                                                            id={array["DoctorCode"]}
                                                                            item={array}
                                                                            type={"1"}/>
                                                                    </div>
                                                                })}
                                                            </div>
                                                        })}
                                                    </div>
                                                </Form> : '' : '' }
                                            </div>
                                            <Dropdown.Item eventKey={this.props.eventKey}>
                                                <button onClick={this.save} className="serachDoneBtn">DONE</button>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>}
                                    </Dropdown>
                                </div>
                                <div className="selectedDiv">
                                    { selections }
                                </div>
                            </Col>
                            : <Col xl={12} lg={12} md={12} sm={12} xs={8} className="pt10">
                                <Form.Label className="customized-label">Search <span className="colorRed">*</span></Form.Label>
                                <div className="productDetailDrop">
                                    <Dropdown className="multiple-dropdown marginBot10">
                                        <Dropdown.Toggle id="dropdown-basic">
                                            <img src="../public/assets/images/search_grey@2x.png" className="serachImg" />
                                            <SearchDoctor  clear={this.state.clearsearch} getSearchData={this.getSearchData} />
                                        </Dropdown.Toggle>
                                        { data == undefined ? '' :
                                        <Dropdown.Menu className="cal-scrollbar">
                                            <div className="Padding10 paddingTop searchData cal-scrollbar">
                                                { this.state.searchkey > 0   ? data.length > 0 ?
                                                <Form>
                                                    <div>
                                                        { Object.keys(FilterList).map((list) => {
                                                            return <div>
                                                                <div id={list} className='searchDiv'>{list} </div>
                                                                { FilterList[list].map((array) => {
                                                                    return <div>
                                                                        <SearchDropdown
                                                                            data={array}
                                                                            key={array["DoctorCode"]}
                                                                            id={"SearchDropdown" + array["DoctorCode"]}
                                                                            getData={this.getData.bind(this)}
                                                                            selection={this.state.selectedData[array["DoctorCode"]] ? 'checked' : null}
                                                                            id={array["DoctorCode"]}
                                                                            item={array}
                                                                            type={"1"}/>
                                                                    </div>
                                                                })}
                                                            </div>
                                                        })}
                                                    </div>
                                                </Form> : '' : ''}
                                            </div>
                                            <Dropdown.Item eventKey={this.props.eventKey}>
                                                <button onClick={this.save} className="serachDoneBtn">DONE</button>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>}
                                    </Dropdown>
                                </div>
                                <div className="selectedDiv">
                                    { selections }
                                </div>
                            </Col>  }
                        </Row>
                    </div>
                    <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.Errorclose}
                        success={false} />
                </div>
                { this.state.Errormsg != '' ?
                <div className="paddingTop">
                    <Alert variant={this.state.AllowDCRError == true ? "danger" : "warning"}>
                        { this.state.AllowDCRError == true ? <img className="dcralertimg" src="../public/assets/images/danger_alert.svg" /> : <img className="waringImg" src="../public/assets/images/danger.svg" width="25px" height="25px" /> }
                        { this.state.Errormsg }
                    </Alert>
                </div> : ''}
                { Accordiondata && (Object.keys(Accordiondata).length > 0) &&
                    <div className=" marginTop21">
                        <div className="marginBottom parentAccordian">
                            <Accordion>
                                {accordionCards}
                            </Accordion>
                        </div>
                    </div>
                }
                <PopupDelete 
                    show={this.state.popupDelete} 
                    closeModal={this.closePopup} 
                    deletedoc={()=>this.deletedoc(this.state.itemvalue)} 
                    id={this.state.itemvalue} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.DCRSEARCH.data,
    plannedTask: state.Calendar.plannedTask,
})

const mapDispatchToProps = (dispatch) => ({
    getserachData: (data) => dispatch(getserachData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)( withRouter(FormRCPA))
