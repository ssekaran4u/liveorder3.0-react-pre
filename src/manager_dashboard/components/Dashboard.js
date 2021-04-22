import React, { Component } from 'react'
import {Row,Col,Form} from 'react-bootstrap'
import { postToServer } from '../../lib/comm-utils'



class Dashboard extends Component {
    constructor(){
        super();
        this.state = {
            headdata: {},
        };
    }
    componentDidMount(){
        /* Getting header data*/
    let _this = this
    var data = {
        "index": "Basicinfo",
        "Result":"0",
       
        "TableName": "",
        "ColumnName": "",
        "Data": [
            {
            "doc":"",
            "year": "",
            "month": "",
            "Result":"1"
            }
        ]
    }
    postToServer("USerinfo", data)
        .then(function (result) {
        _this.setState({headdata:result.data[0]})
        }) 
    }
    
    render() {

        var months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var now       = new Date();
        var thisMonth = months[now.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
        const {progressbardata} = this.props
        let targetbar=0
        let tragerwidth=0
        if(progressbardata && progressbardata != undefined && progressbardata['Status'] != "Fail"){
            var x=progressbardata[0].total_primary;
             
            x=x.toString();
            var lastThree = x.substring(x.length-3);
            var otherNumbers = x.substring(0,x.length-3);
            if(otherNumbers != '')
                lastThree = ',' + lastThree;
            var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
            
            var y=progressbardata[0].primary_target;
             
            y=y.toString();
            var lastThreey = y.substring(y.length-3);
            var otherNumbersy = y.substring(0,y.length-3);
            if(otherNumbersy != '')
                lastThreey = ',' + lastThreey;
            var resy = otherNumbersy.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreey;

            if(progressbardata[0].primary_target != 0){
                targetbar=Math.round((x/progressbardata[0].primary_target)*100)
                if(targetbar>100){
                    tragerwidth=100+ '%'
                }
                else{
                    tragerwidth=targetbar+ '%'
                }
            }
            else{
                targetbar='0'
                tragerwidth=targetbar+ '%'
            }

        }
        // if(progressbardata && progressbardata != undefined && progressbardata[0].primary_target == 0){
        //     var targetbar =(progressbardata[0].total_primary/progressbardata[0].primary_target)*100;
        // }
        let name
        if(this.state.headdata["C_Name"]){
            let namestring = this.state.headdata["C_Name"]
            name=namestring.toLowerCase()
        }
     
        return (
            <div>
                <Row>
                    <Col xl={9} lg={9} md={9} sm={9} xs={12}><h4 className="dahboardheading">Welcome  <span className="userName">{name}</span>!</h4></Col>
                    <Col xl={3} lg={3} md={3} sm={3} xs={12} className="rowone" style={{display:'none'}}>
                        <Form className="manager_search serach-pad">
                            <input type="text" name="searchbar" id="searchbar" className="manager_dash_search" placeholder="Search here" />
                            <div className="manager_searchicon serach-pad">
                                <img src="../public/assets/images/inner_search.svg" className="manager_iconsearch" className=""/>
                            </div>
                        </Form>
                    </Col>
                </Row>
                <Row className="rowone">
                    <Col xl={6} xs={12} className="marginBot10 nopad0">
                        <div className="monthsummry ">
                            <div className="greencircle">
                                <img className="innercircledash" src="../../../public/assets/images/doctor-stethoscope.png"/>
                            </div>
                            <p className="greentext">Dr. Coverage ({thisMonth})</p>
                            {progressbardata && progressbardata != undefined && progressbardata['Status'] != "Fail" ? <p className="greennumber">{progressbardata[0].coverage}</p> : <p className="greennumber"> </p> }
                            <div className="greenprogress tooltipcustom">
                                <div className="greenprogress-bar" style={{width:progressbardata && progressbardata != undefined  ?  progressbardata[0].coverage:'0%'}}></div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={6} xs={12} className="marginBot10 nopadleft nopad0 responsivenopad">
                        <div className="monthsummry">
                            <div className="bluecircle">
                                <img className="innercircledash" src="../../../public/assets/images/money.png"/>
                            </div>
                            <p className="bluetext">Primary Sales (YTD)</p>
                            {progressbardata && progressbardata != undefined && progressbardata['Status'] != "Fail" ? <p className="bluenumber">{res}</p> : <p className="bluenumber"> </p> }
                            {/* <p className="bluenumber">20,00,000</p> */}
                            <div className="greenprogress tooltipcustom">
                                <div className="buleprogress-bar" style={{width:progressbardata && progressbardata != undefined  ? tragerwidth : '0%' }}>
                                    <div className="mr_tootltip tooltiptext">
                                        <div className="mr_tooltip_content">
                                            <div className="mr_tooltip_target">
                                                <div className="mr_targer_container">
                                                <p className="mr_target_head">Target</p>
                                                <p className="mr_achiv_value" style={{color:'#1b84e799','fontSize':'0.8em'}}>{progressbardata && progressbardata != undefined  ?  resy: null}</p>
                                                </div>
                                            </div>
                                            <div className="manager_tooltip_achiv">
                                                <div className="mr_achiv_container">
                                                    <p className="mr_achiv_head">Percentage Achieved </p>
                                                    <p className="manager_tooltip_achiv" style={{color:'#1b84e7','fontSize': '0.8em'}}>{progressbardata && progressbardata != undefined  ? targetbar +'%' : '0%' }</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    {/* <Col xl={4} xs={12} className="nopad0">
                        <div className="monthsummry">
                            <div className="redcircle">
                                <img className="innercircledash" src="../../../public/assets/images/claim.png"/>
                            </div>
                            <p className="redtext">Primary Sales Return (YTD)</p>
                            {progressbardata && progressbardata != undefined && progressbardata['Status'] != "Fail" ? <p className="rednumber">{progressbardata[0].claim}</p> : <p className="rednumber"> </p> }
                            {/* <p className="rednumber">14%</p> */}
                            {/* <div className="greenprogress tooltipcustom">
                                <div className="redprogress-bar" style={{width:progressbardata && progressbardata != undefined ? progressbardata[0].claim : '0%' }}></div>
                            </div>
                        </div> */}
                    {/* </Col> */} 
                </Row>
            </div>
        )
    }
}
export default Dashboard
