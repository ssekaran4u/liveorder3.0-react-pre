import React, {Component} from 'react'
import {Row,Col} from 'react-bootstrap'
class MrProgress extends Component{
    render(){
        const { data } = this.props
        var months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var now       = new Date();
        var thisMonth = months[now.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
        let targetpercent=0
        let tragerwidth=0
        let maxtragerwidth 
        if(data && data != undefined && data['Status'] != "Fail"){
            var x=data[0].total_primary;
            // var x="1037512";
            
            x=x.toString();
            var lastThree = x.substring(x.length-3);
            var otherNumbers = x.substring(0,x.length-3);
            if(otherNumbers != '')
                lastThree = ',' + lastThree;
            var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

            var y=data[0].primary_target;
            // var y="1037512";
            y=y.toString();
            var lastThreey = y.substring(y.length-3);
            var otherNumbersy = y.substring(0,y.length-3);
            if(otherNumbersy != '')
                lastThreey = ',' + lastThreey;
            var resy = otherNumbersy.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThreey;
            
            if(data[0].primary_target != 0){
                targetpercent=(data[0].total_primary/data[0].primary_target)*100 
                tragerwidth=targetpercent+ '%'
            }
            else{
                targetpercent=100
                tragerwidth=targetpercent+ '%'
            }
            if(targetpercent > 100){
                maxtragerwidth = '100%'
            }else{
                maxtragerwidth = tragerwidth
            }
            
        }
        return(
            <div>
                <Row className="rowone">
                    <Col xl={4} xs={12} className="marginBot10 nopad0">
                        <div className="monthsummry ">
                            <div className="greencircle">
                                
                                <img className="innercircledash" src="../../../public/assets/images/doctor-stethoscope.png"/>
                            </div>
                            <p className="greentext">Dr. Coverage ({thisMonth != undefined ? thisMonth : null})</p>
                            {data && data != undefined && data['Status'] != "Fail" ? <p className="greennumber">{data[0].coverage}</p> : <p className="greennumber"> </p> }
                            <div className="greenprogress tooltipcustom">
                                <div className="greenprogress-bar" style={{width:data && data != undefined  ?  data[0].coverage:'0%' }}></div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={4} xs={12} className="marginBot10 nopadmob0">
                        <div className="monthsummry">
                            <div className="bluecircle">
                                <img className="innercircledash" src="../../../public/assets/images/money.png"/>
                            </div>
                            <p className="bluetext">Primary Sales (YTD)</p>
                            {data && data != undefined ? <p className="bluenumber">{res}</p> : <p className="bluenumber"> </p> }
                            <div className="greenprogress tooltipcustom">
                                <div className="buleprogress-bar" style={{width:data && data != undefined ?  maxtragerwidth :'0%' }}>
                                    <div className="mr_tootltip tooltiptext">
                                        <div className="mr_tooltip_content">
                                            <div className="mr_tooltip_target">
                                                <div className="mr_targer_container">
                                                <p className="mr_target_head">Target</p>
                                                <p className="mr_achiv_value" style={{color:'#1b84e799'}}>{data && data != undefined  ?  resy: null}</p>
                                                </div>
                                            </div>
                                            <div className="manager_tooltip_achiv">
                                                <div className="mr_achiv_container">
                                                    <p className="mr_achiv_head">Achive Percentage</p>
                                                    <p className="manager_tooltip_achiv_dash">{data && data != undefined  ? Math.round(targetpercent)+'%' : '0%' }</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xl={4} xs={12} className="nopad0">
                        <div className="monthsummry">
                            <div className="redcircle">
                                <img className="innercircledash" src="../../../public/assets/images/claim.png"/>
                            </div>
                            <p className="redtext">Primary Sales Returns (YTD)</p>
                            {data && data != undefined ? <p className="rednumber">{data[0].claim}</p> : <p className="rednumber"> </p> }
                            <div className="greenprogress tooltipcustom">
                                <div className="redprogress-bar" style={{width:data && data != undefined  ?  data[0].claim:'0%' }}></div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default MrProgress