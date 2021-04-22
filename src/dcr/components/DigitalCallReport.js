import React, { Component } from 'react'
import { Form, Dropdown, Row, Col, InputGroup, Button } from 'react-bootstrap'
import DatePicker from 'react-datepicker';
// import SubAreaDropdown from '../components/SubAreaDropdown';
import StatusPopup from '../../lib/StatusPopup'
import SearchDoctor from '../components/SearchDoctor';
import SearchDropdown from "../../BasicComponet/searchDropdown";
import DigitalCallReportList from './DigitalCallReportList';
import { postToServer } from '../../lib/comm-utils'
const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
]

class DigitalCallReport extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            Entry_Date: new Date(),
            time: new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, "0"),
            subAreaValue: "-1",
            Accordiondata: {},
            SearchData:[],
            selecteddr:{},
            subareaList:[],
            SelectDate:{}
        }
        this.getSubAreaValue = this.getSubAreaValue.bind(this)
        this.getSearchData=this.getSearchData.bind(this)
        this.oncheckeditem=this.oncheckeditem.bind(this)
        this.dateChanged=this.dateChanged.bind(this)
        this.onHide = this.onHide.bind(this)
    }
    onHide() {
        this.setState({ Error: false })
        // if (this.props.dataDoc["Type"] == "mcr") {
        //     if (this.state.mcrpopcontain.length > 0) {
        //         this.setState({ mcrshow: true })
        //     } else {
        //         // this.props.removeItem(this.props.dataDoc["DoctorCode"])
        //     }
        // } else {
        //     this.props.removeItem(this.props.dataDoc["DoctorCode"])
        // }
    }

    dateChanged(d){

   
        var day = d.getDate()
        var year = d.getFullYear()
        var month = d.getMonth() + 1
        const selecteddate = year + '-' + month + '-' + day
        // alert(selecteddate)
        const _this = this
        _this.setState({ date: d, SelectDate: selecteddate });
        var dd = d.getMonth() + 1
        //console.log(d,d.getDate() +'-'+d.getMonth()+'-'+d.getFullYear())
        var data = {
             "validate": "HolidayValidation"
            , "date": d.getDate() + '-' + dd + '-' + d.getFullYear()
        }
        
        postToServer("DCRValidation", data).then((result) => {
            
            if (result.data.length != 0) {  
                const validatedate = result.data[0]["validate"]
                if (result.data[0]["flag"] == "0") { 
                    //  AllowDCRError
                    // not  
                    if(!this.props.Editmode==undefined){
                    
                        this.setState({   selectedData: {}, Error: true, Errormsg: validatedate, AllowDCRError: false })
                
                    }else{
                        this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: false })
                    }
               
                }


                if (result.data[0]["flag"] == "1") { 
                    //  AllowDCRError
                    // not  

                    if(!this.props.Editmode==undefined){
                    this.setState({ selectedData: {}, Error: true, Errormsg: validatedate, AllowDCRError: false })
               
                    }else{
                        this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: false })
                    }
                }
                if (result.data[0]["flag"] == "2") {

                    if(!this.props.Editmode==undefined){
                    this.setState({ selectedData: {}, Error: true, Errormsg: validatedate + '    DCR Not Allowed  For  This Date', AllowDCRError: true })
             
                }else{
                    this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: true })
                }
                }
                if (result.data[0]["flag"] == "14") {
                    if(!this.props.Editmode==undefined){
                    this.setState({ selectedData: {}, Error: true, Errormsg: validatedate + '       DCR Not Allowed  For  This Date', AllowDCRError: true })
                }else{
                    this.setState({ Error: true, Errormsg: validatedate, AllowDCRError: true })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
                }   
                }

                // if (result.data[0]["flag"] == "132") {
                //     _this.setState({ selectedData: {}, Error: true, Errormsg: validatedate + '       DCR Not Allowed  For  This Date', AllowDCRError: true })
                // }
            } else                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              {//  _this.setState({ selectedData: data })

            if(!this.props.Editmode==undefined){
                _this.setState({  date:d ,Errormsg: '', AllowDCRError: false })
            }else{
                _this.setState({ date:d, Errormsg: '', AllowDCRError: false })
            }
              
            }
            //this.loadplantak()
        }).catch((Error) => {
            console.log(Error, 'Error')
            _this.setState({ Error: true, Errormsg: "Error in App" })
        })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
       
    }

    
    oncheckeditem(event,data){


        let   selecteddr=this.state.selecteddr
      
                if(event.target.checked==true){
                    selecteddr[event.target.value]=data

                }else{
                delete  selecteddr[event.target.value]
                }
                this.setState({ selecteddr:selecteddr})

    }

    getSearchData(values){



        if(this.state.subAreaValue=="-1"  || this.state.subAreaValue=='' ){
        this.setState({ Error: true, Errormsg: "Please Select Subarea" })
        return
        }

        if(this.state.AllowDCRError==true){
            this.setState({ Error: true, Errormsg: "DCR NOT ALLOWED" })
            return
        }
     let data={"index":"DCRSEARCH_subarea","Data":{"SearchKey":values, "fscode":"" , "subarea":this.state.subAreaValue},"Token":"KAPL360|VISHWAS SHAIWALE R|PSR013|A00137|je2020-10-31T23:25:28+05:30"}
     
     postToServer('DCRAPI', data).then((result) => {
        
        this.setState({ SearchData: result.data["data"]   })
    }).catch((Error) => {


    })

    }





    getSubAreaValue(value) {

          this.setState({ subAreaValue: value })
    }


    componentDidUpdate(oldprop,oldstate){



        if(this.props.Editmodedata != oldprop.Editmodedata){

            ///c_dis_call_option
            //c_dis_call_type
            //c_note


          // console.log(this.props.Editmodedata,'okokokokok')

            if(this.props.Editmodedata){

                if(this.props.Editmodedata["DWR"]){

                    this.props.Editmodedata["DWR"].map((sd)=>{
                         this.setState({ subAreaValue  : sd.C_Placeof_Work })
 
                        
                     })
                }
                if(this.props.Editmodedata["Dwrdetails"]){


                    let selecteddr=[]
                    this.props.Editmodedata["Dwrdetails"].map((s)=>{
                       //   this.setState({})

                       selecteddr.push( { DoctorCode:s.C_DSC_Code , Dr_Name :s.Dr_Name , DSCASubName:'' ,Area:''}  )
                    })
                    this.setState({selecteddr:selecteddr})
                }
            }
      
         //console.log(this.props.Editmodedata["Dwrdetails"],'llllll',oldstate,oldprop)
        }
      
  }

     componentDidMount(){



        // console.log(this.props.Editmodedata,'KUNAL SINHA')

       this.dateChanged(this.state.date)

       let date=this.state.date
       let year= date.getFullYear()
       let month=date.getMonth()+1
       let day=date.getDay()
        let data={"index":"getSubarea","Data":{ date: day+'/'+month+'/'+ year ,"fscode":""}}
     
        postToServer('DCRAPI', data).then((result) => {



             let mm=[]
            let  hh=result.data["Data"]
            hh.map( (oo)=>{
                mm.push(  { key: oo.C_CODE, value: oo.C_CODE ,text: oo.C_NAME})
            })
           
           this.setState({ subareaList:mm    })
       }).catch((Error) => {
   
   
       })
     }

    render() {
        return (
            <div className="digital_call_reporting">
                <div className="marginTop16 dcr-list-sec">
                    <div className="dcrboxhead">
                        Search below for An activity
                        </div>
                    <div className="dcrsearch">
                        <Row>
                            <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                                <Form.Label className="customized-label">Date <span className="colorRed">*</span></Form.Label>
                                <InputGroup className="datepickerAligment controls text-right">
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange={this.dateChanged}
                                        dateFormat="dd-MMM-yy"
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text>
                                            <img src="../public/assets/images/calendar.svg" alt="calendar" />
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                            <Col xl={4} lg={4} md={6} sm={12} xs={12}>
                                <div className="sub_area_drop_down">
                                    <SearchDropdown
                                        labelName="Sub Area"
                                        placeholder="Search or Select Sub Area"
                                        Selected={this.state.subAreaValue}
                                        dropdownList={this.state.subareaList}
                                        disabled
                                        getValue={this.getSubAreaValue}
                                    />
                                </div>
                            </Col>
                            {/* {localStorage.getItem("type") == 1 ? */}
                            <Col xl={4} lg={4} md={6} sm={12} xs={12} className=" ">
                                <Form.Label className="customized-label">Search <span className="colorRed">*</span></Form.Label>
                                <div className="productDetailDrop">
                                    <Dropdown className="multiple-dropdown marginBot10">
                                        <Dropdown.Toggle id="dropdown-basic">
                                            <img src="../public/assets/images/search_grey@2x.png" className="serachImg" />
                                            <SearchDoctor clear={this.state.clearsearch} getSearchData={this.getSearchData} />
                                        </Dropdown.Toggle>
                                   

                                        <Dropdown.Menu className="cal-scrollbar">
                                            <div className="Padding10 paddingTop searchData cal-scrollbar">



                                             { this.state.SearchData.map((q)=>

<React.Fragment>
<div  key={'maindivsearch'+q.DoctorCode} className='flex-row'>
            <Form.Check 
                custom
                type="checkbox"
              checked={ this.state.selecteddr[q.DoctorCode]?true:null }
                id={q.DoctorCode}
                key={q.DoctorCode}
                label={q.Dr_Name}
                className="mb-2  searchinline"
                name={q.Dr_Name}
                value={q.DoctorCode}
                onChange={ (event)=>{ this.oncheckeditem(event,q) }}
               
            />
            <span  key={'spamsearch'+q.DoctorCode} className='SearchResDiv'>{q.Area}( {q.DSCASubName }) </span>
            </div>
         <div  key={'divsearch'+q.DoctorCode} className="borderBottom"></div>
        </React.Fragment>
                                            
                                            
                                            
                                            )}
                                            </div>
                                      
                                        </Dropdown.Menu>
                                       
                                    </Dropdown>
                                </div>
                                <div className="selectedDiv">
                                  
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.onHide }
                        success={false}
                        onHide={this.onHide}
                    />

                 { Object.keys( this.state.selecteddr).map((a)=>
                <DigitalCallReportList  
                Editmode={this.props.Editmode}
                subarea={this.state.subAreaValue}     
                Editmodedata={this.props.Editmodedata}
                Mandatory={this.props.Mandatory}   date={this.state.date}  Otherdata={this.state.selecteddr[a]} data={a} />
                  ) }
            </div>
        )
    }
}

export default DigitalCallReport;
