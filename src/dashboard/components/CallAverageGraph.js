import React, { Component } from 'react'
import {Tab} from 'react-bootstrap'

import MrcustomTooltipCallAverage from './MrcustomTooltipCallAverage'
import {ResponsiveContainer,ComposedChart, AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend,} from 'recharts';
import DashLoader from "../../lib/DashboardLoader";

class CallAverageGraph extends Component {
  render() {
    const {graphdata} = this.props
    const {totalcalls} = this.props
    var newtotal_calls=''
    if(totalcalls && totalcalls != undefined && totalcalls['Status'] != "Fail"){
      newtotal_calls = totalcalls[0].No_of_calls
    }
    //console.log(totalcalls,"total")
        var months    = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        var now       = new Date();
        var thisMonth = months[now.getMonth()]; // getMonth method returns the month of the date (0-January :: 11-December)
        
        var shortmonths    = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var forheading       = new Date();
        var compairmonth = shortmonths[forheading.getMonth()];
        var average_call=''
        
        if(graphdata && graphdata != undefined){
          graphdata.map( (localdata)=>{
            if(localdata["disp"] == compairmonth){
              average_call=localdata["CallAverage"];
            }
            var round_average=Math.round(localdata["CallAverage"]);
            localdata.CallAverage=round_average;
          })
        }
        return (
      <Tab.Pane eventKey="first" className="rmoveborder">
        <p className="totalno_of_calls">No. Of Calls To Be Made: {totalcalls && totalcalls != undefined && totalcalls['Status'] != "Fail" ? totalcalls[0].No_of_calls : null}</p>
        <p className="totalno_average">Call Average Of {thisMonth != undefined ? thisMonth : null} <span className="color_orage"> {average_call}</span></p>
        <div className="linegraphcontainer">
            <div style={{ width: '100%', height: 400 }}>
            {!graphdata ?
                        <DashLoader></DashLoader>
                        :graphdata.length == 0 ?
                        <DashLoader></DashLoader>:
                <ResponsiveContainer>
                    <ComposedChart width={400} height={400} data={graphdata} strokeWidth={3} activeDot={{r: 3}}>
                    <CartesianGrid stroke='#f5f5f5' strokeDasharray="3 3"/>
                    <XAxis dataKey="disp"/>
                    <YAxis />
                    <Tooltip content={<MrcustomTooltipCallAverage/>}/>
                    <Legend/>
                    <Area type='monotone' dataKey='CallAverage' fill="#e5ebf8" stroke='#8884d8'/>
                    <Line type='monotone' dataKey='CallAverage' stroke='#1515af' strokeWidth={3} activeDot={{r: 4}} />
                    </ComposedChart>
                </ResponsiveContainer>
            }
            </div>
        </div>
      </Tab.Pane>
        )
    }
}
export default CallAverageGraph