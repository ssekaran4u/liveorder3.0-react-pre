/*
* This code will display the components for selected worktype 
* Request URL=url/GroupActivity
* Index=WorkType
* Request string={"Token":"","Index":"WorkType","Data":{"Tab":"2"}}
* Response string={
   code:0000003
   name:Campaign
}
*Response Error=null

*/
import React, { Component } from 'react'
import { Row, Col, Form, Tabs, Tab, InputGroup, Button } from 'react-bootstrap'
import { postToServer } from '../../lib/comm-utils'
import Dropdown from '../../BasicComponet/DropDown'
import CustomCheckbox from '../components/CustomCheckbox'
import StatusPopup from '../../lib/StatusPopup'
import { connect } from 'react-redux'
class Others extends Component {
    constructor(props) {
        super(props)
        this.state = {

            key: 'CAMPAIGN',
            location: [],
            id: '',
            Grouptype: [],
            wrkType: '',
            Error: false,
            wrkcode: '',
            selectedValue: {}
        }
        this.save = this.save.bind(this)
        this.selectedProduct = this.selectedProduct.bind(this)
        this.onHide = this.onHide.bind(this)
        this.getOtherData = this.getOtherData.bind(this)
        this.SelectedWorktye = this.SelectedWorktye.bind(this)

    }


    SelectedWorktye(key, event) {





        

        const kl = event.target.checked
        if (kl == true) {


            let selectedValue = {}
            selectedValue = this.state.selectedValue
            selectedValue[key] = true

            this.save(key)
            this.setState({ key: key, selectedValue: selectedValue })
        }
        else {
            let selectedValue = {}
            selectedValue = this.state.selectedValue
           delete selectedValue[key]

            this.Delete(key)
            this.setState({ key: key, selectedValue: selectedValue })
        }

    }

    componentDidMount() {
        this.getGroupActivity();
        const thisweek = parseInt(localStorage.getItem("week")) + 1 + ''
        const thisday = localStorage.getItem("day")
        let area = localStorage.getItem("subarea")
        let selectedValue = {}
        const data = {
            "index": "Selected_worktype",
            "Data": {
                "subarea": area,
                "week": thisweek,
                "day": thisday
            }
        }

        postToServer("TPT", data).then((Result) => {
            if (Result.data.Status == 'Success') {



                Result.data["Result"].map((a) => {
                    const k = a["c_work_type"].trim()
                    selectedValue[k] = true
                   
               

                })
                this.setState({ selectedValue: selectedValue })
            }
        }).catch((Error) => {

            console.log(Error, 'Errorkunal')
            this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
        })

    }
    getGroupActivity() {
        var data = { "Token": "", "Index": "WorkType", "Data": { "Tab": "3" } }
        postToServer("GroupActivity", data).then((result) => {
            if (result.data["Status"] == "Success") {
                let wrkType
                result.data.data.map((item) => {

                    wrkType = item.code

                })
                this.setState({ Grouptype: result.data.data, wrkType: wrkType })
            } else {
                this.setState({ Grouptype: [] })
            }
        }).catch((error) => {
            this.setState({ Grouptype: [] })
            //   console.log(error)
        })
    }
    selectedProduct(id, type, name) {
        this.setState({
            id: id,
            wrkcode: name
        })
    }
    onHide() {
        this.setState({
            Error: false
        })
    }
    getOtherData() {
        if (this.props.Info.code) {
            var data = { "index": "Doc_list", "Data": { "N_Type": "4", "week": (this.props.Info.week).toString(), "day": this.props.Info.day.toString(), "subarea": this.props.Info.code } }
            postToServer("TPT", data).then((Result) => {
                if (Result.data.Status == 'Success') {
                    let Selectedkey = {}
                    let lista = []
                    let SelectedStp = {}
                    let wrkType
                    if (Result.data.Grade_mst) {
                        Result.data.Grade_mst.map((item) => {
                            if (this.props.Info.week == item.week && this.props.Info.day == item.day) {
                                Selectedkey[item.c_cust_code] = "Added"
                                lista.push(item.c_cust_code)
                            }
                            wrkType = item.c_work_type
                        })
                    }
                    SelectedStp[this.props.Info.week] = {}
                    SelectedStp[this.props.Info.week][this.props.Info.day] = lista
                    this.setState({ areaval: Result.data.Grade_mst, Selectedkey: Selectedkey, SelectedStp: SelectedStp, work_type: wrkType })
                }
            }).catch((Error) => {
                console.log(Error, 'Error')
                this.setState({ Error: true, Errormsg: "App Error Please Contact Admin" })
            })
        }
    }



    Delete(key) {

        let week = this.props.Info.week.toString()
        let day = this.props.Info.day.toString()
        var data = {
            "index": "Save_MtpStpOther_delete",
            "Data": { "worktype":key, "week": week, "no_day": day, "subarea": this.props.Info.code }

        }

        postToServer("TPT", data).then((Result) => {
            if (Result.data.Status == "Success") {
                this.setState({ Error: true, Errormsg: Result.data.Result[0].result, Messagetype: true })

            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Something wrong" })
        })
    }






    save(key) {

        let week = this.props.Info.week.toString()
        let day = this.props.Info.day.toString()
        var data = {
            "index": "Save_MtpStpOther",
            "Data": { "worktype":key, "week": week, "no_day": day, "subarea": this.props.Info.code }

        }

        postToServer("TPT", data).then((Result) => {
            if (Result.data.Status == "Success") {
                this.setState({ Error: true, Errormsg: Result.data.Result[0].result, Messagetype: true })

            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Something wrong" })
        })
    }
    render() {


        console.log(this.state.selectedValue, 'tpt1')
        const { Grouptype } = this.state
        let areacode
        if (this.state.areaval) {
            this.state.areaval.map((item) => {
                areacode = item.code
            })
        }
        let locasub = []
        if (this.props.patches) {
            locasub.push(
                {
                    "key": '-1',
                    "text": 'Search & Select',
                    "value": '-1',
                }
            )
            this.props.patches.map((item) => {
                locasub[item.code] = item.Name
                locasub.push(
                    {
                        "key": item.code,
                        "text": item.Name,
                        "value": item.code,
                    })
            })
        }

        return (
            <React.Fragment>
                <div className="OtherTab">
                    <div className="marginTop16 dcrworkPanel ">
                        <div className="dcrboxhead">
                            Select Type Of Work Given Below
                        </div>


                        <div className="flexDisplay ">
                            {Grouptype ? Grouptype.map((typekey, index) =>
                                <div className="weekheadCheck pr20 pb20">
                                    <Form.Check
                                        custom
                                        type="checkbox"
                                        checked={this.state.selectedValue[typekey.code.trim()] ? true : false}
                                        id={typekey.code.trim()}
                                        label={typekey.name}
                                        name=""
                                        onChange={(event) => { this.SelectedWorktye(typekey.code.trim(), event) }}
                                    />
                                </div>
                            ) : ''}
                        </div>


                        {/* <Tabs
                            id="controlled-tab-example"
                            className="dcrWork"
                            activeKey={this.state.key}
                            onSelect={ ((key) =>{
                               this.SelectedWorktye(key)
                            })}
                            //SelectedWorktye
                            //key => this.setState({ key })
                        > */}
                        {/* {   Grouptype ? Grouptype.map(  (typekey,index)=>
                        <Tab  key={index}
                                eventKey={typekey.code}
                                title={<div><div className='otherWorkCampImg '><img src='../public/assets/images/CAMP.svg' className="campImg" /><div className='otherTypeCamp'>{typekey.name}</div></div></div>}>
                            <div className='dcr-list-sec meetingDiv marginPullTop'>
                                <div className='grpactivity margin25 paddRight100'>
                                    <Row className="marginTop41">
                                        
                                        <Col lg={4} md={4} sm={12} xs={12} className="product marginTop mt20 tptSave">
                                            <Button className="savedcrBtn  mb-2" onClick={this.save} >Save</Button>
                                            
                                        </Col>
                                        <Col lg={4} md={4} sm={12} xs={12} className="product marginTop mt20">
                                           
                                        </Col>
                                    </Row>
                                </div>
                            </div>    
                        </Tab>
                            
                        ) :''} 
                </Tabs>*/}
                    </div>
                </div>
                <StatusPopup
                    message={this.state.Errormsg}
                    show={this.state.Error}
                    onClose={this.onHide}
                    success={this.state.Messagetype}
                />
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({
    patches: state.STP.data

})

export default connect(mapStateToProps, null)(Others)

