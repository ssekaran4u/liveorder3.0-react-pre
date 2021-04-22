import React, { Component } from "react";
import { Row, Col , Dropdown, DropdownItem} from "react-bootstrap";
import {
    ResponsiveContainer,
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Scatter
} from "recharts";
import CustomBar from "./CustomBar";
import CustomTooltip from "./CustomTooltip";
import DashLoader from "../../lib/DashboardLoader";
import YearDropDown from '../../lib/YearDropDown'
import { exportDefaultSpecifier } from '@babel/types';

class SecondarySales extends Component {
    constructor() {
        super();
        this.state = {
            isFull: false,
            activeTab: "1",
            selectedYear:''
        };
        this.handleView = this.handleView.bind(this);
        this.addclass = this.addclass.bind(this);
        this.getYearlyData = this.getYearlyData.bind(this)
        this.handleScroll = this.handleScroll.bind(this)
        this.visibilityRef = React.createRef()
    }
    // componentDidUpdate(oldprops,oldsate){



    //     if( oldprops.data != this.props.data){

    //          const k=this.props.data

    //         this.setState({graphdata:k})



    //     }
    // }
    /* component full screen view function*/
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }
    addclass(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    handleScroll() { 
   
        const { data } = this.props
        if (data && (data.length > 0))
            return
        const el = this.visibilityRef.current;
        if(el != null){ 
        const bounds = el.getBoundingClientRect();
         //console.log(bounds,"bounds")
            if ((bounds.top < 0 ) || (bounds.bottom < window.screen.height)) {
                // console.log(bounds,"bounds")
                //console.log("call",this.props.secondryCall)
                if(this.props.secondryCall == false){
                     this.props.getSecondryGraph()
                }
            }
        } 
    }
    componentDidMount() {
       
        window.addEventListener('scroll', this.handleScroll, true);
        
    }

    componentWillUnmount() {
       // window.removeEventListener('scroll', this.handleScroll);
    }
    getYearlyData(year){
        this.setState({
            selectedYear:year
        })
        this.props.yearWiseData(year)
    }
    render() { 
          const { data } = this.props
        // let usedata = null
        // if (data) {
        //     usedata = [...data]
        // }
        // if (usedata && (usedata.length == 1) && (usedata[0] == 'loading'))
        //     usedata = null
        let td = []
        let currentYear
        let list =[]
        let years
        // console.log(data,"sssssuuummeettt")
        let tempmax = []
        let minmax = [0,]
        currentYear = new Date().getFullYear();
            years = currentYear-1
            for (var i= currentYear ; i > currentYear-3 ;i--) {
            list.push(i);
            }
            
        if (data) {
            td = data.map((localdata) => {

                /*Conevrting target,primary,secondary data to roundup value*/
                var round_target = Math.round(localdata["targetdata"]);
                var round_primary = Math.round(localdata["primarydata"]);
                var round_secondary = Math.round(localdata["secdata"]);
                let d = { ...localdata }
                if (round_target > 1 || round_target < 1) {
                    var convert_target = (round_target / 100000);
                    var convert_target_twodigit = convert_target.toFixed(2);
                    d.targetdata = convert_target_twodigit;

                }
                else {

                }
                if (round_primary > 1 || round_primary < 1) {
                    var convert_primary = (round_primary / 100000);
                    var convert_primary_twodigit = convert_primary.toFixed(2);
                    d.primarydata = convert_primary_twodigit;

                }
                else {

                }
                if (round_secondary > 1 || round_secondary < 1) {
                    var convert_secondary = (round_secondary / 100000);
                    var convert_secondary_twodigit = convert_secondary.toFixed(2);
                    d.secdata = convert_secondary_twodigit;

                }
                else {

                }
                return d
            })
            var maxtarget = Math.max.apply(null,
                Object.keys(td).map(function (e) {
                    return td[e]['targetdata'];
                }));
            var maxprimary = Math.max.apply(null,
                Object.keys(td).map(function (e) {
                    return td[e]['primarydata'];
                }));
            var maxsecdata = Math.max.apply(null,
                Object.keys(td).map(function (e) {
                    return td[e]['secdata'];
                }));
            tempmax.push(Number(maxtarget))
            tempmax.push(Number(maxprimary))
            tempmax.push(Number(maxsecdata))

            var finalmax = Math.max.apply(null, tempmax);
            //to generate the minimum and mnaximum value of y axis if no data is there.
            // var roundfinalmax = Math.round((finalmax / 10) * 10)
            if(finalmax == 0){
                minmax.push(1)
            }else{
                minmax.push(Number(finalmax))
            }
           
            // console.log(finalmax,roundfinalmax,minmax,"final and round final max")

            
        }
        else {
            <span>No Data Found </span>
        }

        return (
            <Row className="rowone">
                <Col xl={12} md={12} sm={12} xs={12} className="nopad0">
                    <div ref={this.visibilityRef}
                        className={
                            this.state.isFull
                                ? "fullscreenView"
                                : "ucdoctorsecondrow-first"
                        }
                    >
                        <Row className="ucdocheading">
                            <div className="nopad3 component_heading">
                                <div className="iconbar">
                                    <div className="bartitle nomar0 dashtitle">
                                        Sales & Target Report
                                        <span className="smallheading">
                                            {" "}
                                            (In Lakh)
                                        </span>
                                    </div>
                                </div>
                                <div className="saleslink flex-row">
                                   
                                    <div className="indication2">
                                        <div className="yellowcircle" />Sec.
                                        Sales
                                    </div>
                                    <div className="indication3">
                                        <div className="bluecircledash" />
                                        Primary Sales
                                    </div>
                                    <div className="indication3">
                                        <div className="lightbluecircledash" />
                                        Primary Target
                                    </div>
                                    <YearDropDown getYearlyData={this.getYearlyData} yearDropVal={this.props.yearSecDrop} />
                                </div>
                            </div>
                            <div className="viewicon">
                                <div>
                                    {this.state.isFull ? (
                                        <img
                                            src="../public/assets/images/collapse-grey.svg"
                                            onClick={this.handleView}
                                        />
                                    ) : (
                                            <img
                                                src="../public/assets/images/fullscreen.svg"
                                                onClick={this.handleView}
                                            />
                                        )}
                                    {/* <img
                                        className="dashfullscreen"
                                        src="../public/assets/images/overflow.svg"
                                    /> */}
                                </div>
                            </div>
                        </Row>
                        <div className="secondarysalesgraph_container">
                            <div className="listcontainer">
                                <Row className="uncoverlist">

                                    <div style={{ width: "100%", height: 300 }}>
                                        {!data  ?

                                            <DashLoader></DashLoader>
                                            :
                                            data.length == 0 ? <DashLoader></DashLoader>
                                            :
                                            <ResponsiveContainer>
                                                <ComposedChart
                                                    style={{ "padding": "10px 5px 7px 8px" }}
                                                    width={500}
                                                    height={400}
                                                    data={td}
                                                >
                                                    <CartesianGrid
                                                        stroke="#adafb121"
                                                        strokeDasharray="3 3"
                                                    />
                                                    <XAxis dataKey="disp" />
                                                    <YAxis domain={minmax} />
                                                    <Tooltip content={<CustomTooltip />} />
                                                    <Legend />
                                                    <Area
                                                        className="backwave"
                                                        type="monotone"
                                                        dataKey="primarydata"
                                                        fill="rgba(27, 132, 231,0.5)"
                                                        stroke="none"
                                                    />
                                                    <Bar
                                                        dataKey="targetdata"
                                                        barSize={10}
                                                        fill="#1b84e7"
                                                        className="barg"
                                                        radius={[10, 10, 0, 0]}
                                                    />
                                                    <Bar
                                                        dataKey="primarydata"
                                                        barSize={10}
                                                        fill="#1b84e7"
                                                        radius={[10, 10, 0, 0]}
                                                    />

                                                    <Line

                                                        dataKey="secdata"
                                                        stroke="#ff7300"
                                                        strokeWidth={3}
                                                        activeDot={{ r: 3 }}
                                                    />
                                                </ComposedChart>
                                            </ResponsiveContainer>
                                        }
                                    </div>
                                </Row>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
}
export default SecondarySales;
