/*
* This file display sidebars inside landing page
* Request URL=url/Temp
* index=Menu
* Request string={"index":"Menu","Result":"0","Token":"","TableName":"","ColumnName":"","Data":[{"year":"2018","month":"7","Result":"1"}]}
* Response string={
      Activty Name:Expense Category Master
      Date:2019-03-01T00:10:02.27Z
      Day:1
      FSCode:MR1
      FSName:MR1
      Time:00:10:02:270
      UserID:mr1
      n_menuid:30
}
* Response Error=null



*/
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Dropdown,
    Navbar,
    Nav,
    NavDropdown,
    OverlayTrigger,
    Tooltip,
    Avatar
} from "react-bootstrap";
import { Accordion, AccordionItem } from "react-light-accordion";
import Collapsible from "react-collapsible";

import Parent from "./Menuparent";
import { postToServer } from "../../lib/comm-utils";
import "../../../public/assets/css/bootstrap.min.css";
import "../../../public/assets/css/style.css";
import "../../../public/assets/css/responsive.css";
import "react-light-accordion/demo/css/index.css";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: true,
            parentlist: [],
            List: []
        };

        this.showIcon = this.showIcon.bind(this);

        this.showIconTop = this.showIconTop.bind(this);
    }

    componentDidMount() {
        const _this = this
        var data = { "index": "Menuside360" }
        postToServer("DashBoardPage", data).then(function (result) {


            _this.setState({ List: result.data["data"] })

            try{


                result.data["data"].map((a)=>{

                   if( a.Menu=="Old DCR"){
                       sessionStorage.setItem('DCRMENU',"1")
                   }
                })
            }catch(error){

            }

            console.log(result, 'jackspe')

        }).catch(Error => {
            console.log(Error, "Error in side Landing", 'kunal');
        });
        //         //console.log(result.data["Parent"],'sinha')


        //         if (result) {
        //             if (result.data) {
        //                 _this.setState({ parentlist: result.data });
        //             } else {
        //                 _this.setState({ parentlist: [] });
        //             }
        //         }
        //         else {
        //             _this.setState({ parentlist: [] });
        //         }

        //         //             result.data["Parent"].map((kk)=>{
        //         // console.log(kk,'sinha')

        //         //             })
        //     })
        //     .catch(Error => {
        //         console.log(Error, "Error in side map");
        //     });
    }




    showIcon() {

        var element = document.getElementById("app");

        //alert(this.state.active)
        if (this.state.active == true) {


            if (element.classList.value == '') {

                element.classList.toggle("hideMenu");
            }
            // var element = document.getElementById("app");
            ///element.classList.toggle("hideMenu");
            this.setState({
                active: !this.state.active
            });
        } else {

            if (element.classList.value == '') {

                element.classList.toggle("hideMenu");
            }
            this.setState({
                active: !this.state.active
            });
        }



    }



    showIconTop() {


        var element = document.getElementById("app");

        element.classList.toggle("hideMenu");

    }

    // showIcon() {
    //     var element = document.getElementById("app");
    //     element.classList.toggle("hideMenu");

    //     this.setState({
    //         active: !this.state.active
    //     });
    // }

    render() {



        const menu = this.state.parentlist;

        if (!menu) return null;
        // const showIcon = () => {
        //     var element = document.getElementById("app");
        //     element.classList.toggle("hideMenu");
        // };
        const rotate = id => {
            var img = document.getElementById(id);
            img.classList.add("rotateImg");
        };
        //var classes = this.state.active ? 'hideMenu' : ''

        return (
            <div>
                <div className="sidebar">
                    <div className="sidebarlogo">
                        <div className="logo">
                            <img
                                src="../public/assets/images/logo.png"
                                className="companylogo"
                            />
                        </div>
                        <div className="menuImg toggle-left-nav-btn inline-block pull-left">
                            <img
                                src="../public/assets/images/Hamburger-menu.svg"
                                onClick={this.showIconTop}
                            />
                        </div>
                    </div>
                    <div className="scrollbar">
                        <div className="underscroll">
                            <div className="titlehead_drop">

                                {menu.length ? null :
                                    <Accordion atomic="true">
                                        <div className="menuIconPad">
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip
                                                        className={
                                                            this.state.active
                                                                ? ""
                                                                : "hideTooltip"
                                                        }
                                                    >
                                                        Dashboard
                                                </Tooltip>
                                                }
                                                placement="right"
                                            >


                                                <NavLink
                                                    activeClassName="is-active"
                                                    className="sumeet"
                                                    exact={true}
                                                    onClick={this.showIcon}
                                                    to="/dashboard"
                                                    to={localStorage.getItem("KM") == "1" ? "/kdashboard" : localStorage.getItem("type") == '1' ? "/dashboard" : localStorage.getItem("type") == '2' ? "/mdashboard" : "/adashboard"}
                                                >
                                                    <img src="../public/assets/images/dashboard-icon.svg" />
                                                    <span className="menuIconText">
                                                        Dashboard
                                                </span>
                                                </NavLink>
                                            </OverlayTrigger>
                                        </div>




                                        {this.state.List.map((a) => {





                                            return (

                                                <div>


                                                    {a.Menu == "Old DCR" ? <div className="menuIconPad">
                                                        <OverlayTrigger
                                                            overlay={
                                                                <Tooltip
                                                                    className={
                                                                        this.state.active
                                                                            ? ""
                                                                            : "hideTooltip"
                                                                    }
                                                                >
                                                                    {"DCR"}
                                                                </Tooltip>
                                                            }
                                                            placement="right"
                                                        >
                                                            <NavLink
                                                                activeClassName="is-active"
                                                                className="sumeet"
                                                                exact={true}
                                                                onClick={this.showIcon}
                                                                to="/dcr-list"
                                                            >
                                                                <img src="../public/assets/images/dcr.svg" />
                                                                <span className="menuIconText">
                                                                    {"DCR"}
                                                                </span>
                                                            </NavLink>
                                                        </OverlayTrigger>
                                                    </div> : null}




                                                    <div className="menuIconPad">
                                                        <OverlayTrigger
                                                            overlay={
                                                                <Tooltip
                                                                    className={
                                                                        this.state.active
                                                                            ? ""
                                                                            : "hideTooltip"
                                                                    }
                                                                >
                                                                    {a.Menu}
                                                                </Tooltip>
                                                            }
                                                            placement="right"
                                                        >
                                                            <NavLink
                                                                activeClassName="is-active"
                                                                className="sumeet"
                                                                exact={true}
                                                                onClick={this.showIcon}
                                                                to={"/IFrameurl/" + a.itemid}
                                                            >
                                                                <img src="../public/assets/images/dcr.svg" />
                                                                <span className="menuIconText">
                                                                    {a.Menu}
                                                                </span>
                                                            </NavLink>
                                                        </OverlayTrigger>
                                                    </div>  </div>)
                                        }
                                        )}







                                        {localStorage.getItem("KM") == "1" || localStorage.getItem("loginUser") == "MKT" ? <div></div> : <div>





                                            {/*                                        
                                        <div className="menuIconPad">
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip
                                                        className={
                                                            this.state.active
                                                                ? ""
                                                                : "hideTooltip"
                                                        }
                                                    >
                                                        DWR
                                                </Tooltip>
                                                }
                                                placement="right"
                                            >
                                                <NavLink
                                                    activeClassName="is-active"
                                                    className="sumeet"
                                                    exact={true}
                                                    onClick={this.showIcon}
                                                    to="/dcr-list"
                                                >
                                                    <img src="../public/assets/images/dcr.svg" />
                                                    <span className="menuIconText">
                                                        DWR
                                                </span>
                                                </NavLink>
                                            </OverlayTrigger>
                                        </div>

                                        <div className="menuIconPad">
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip
                                                        className={
                                                            this.state.active
                                                                ? ""
                                                                : "hideTooltip"
                                                        }
                                                    >
                                                       Old Dwr
                                                </Tooltip>
                                                }
                                                placement="right"
                                            >
                                                <NavLink
                                                    activeClassName="is-active"
                                                    className="sumeet"
                                                    exact={true}
                                                    onClick={this.showIcon}
                                                    to="/IFrameurl/38"
                                                >
                                                    <img src="../public/assets/images/dcr.svg" />
                                                    <span className="menuIconText">
                                                        Old Dwr
                                                </span>
                                                </NavLink>
                                            </OverlayTrigger>
                                        </div>


                                        <div className="menuIconPad"> 
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip
                                                        className={
                                                            this.state.active
                                                                ? ""
                                                                : "hideTooltip"
                                                        }
                                                    >
                                                        MTP
                                                </Tooltip>
                                                }
                                                placement="right"
                                            >
                                                <NavLink
                                                    activeClassName="is-active"
                                                    className="sumeet"
                                                    exact={true}
                                                    onClick={this.showIcon}
                                                    to="/IFrame"
                                                >
                                                    <img src="../public/assets/images/mtp-icon.svg" />
                                                    <span className="menuIconText">
                                                        MTP
                                                </span>
                                                </NavLink>
                                            </OverlayTrigger>
                                        </div>
                                        <div className="menuIconPad">
                                            <OverlayTrigger
                                                overlay={
                                                    <Tooltip
                                                        className={
                                                            this.state.active
                                                                ? ""
                                                                : "hideTooltip"
                                                        }
                                                    >
                                                        FS-Wise Day-Wise Call Average
                                                </Tooltip>
                                                }
                                                placement="right"
                                            >
                                                <NavLink
                                                    activeClassName="is-active"
                                                    className="sumeet"
                                                    exact={true}
                                                    onClick={this.showIcon}
                                                    to="/report/16"
                                                >
                                                    <img src="../public/assets/images/reports.svg" />
                                                    <span className="menuIconText">
                                                        FS-Wise Day-Wise Call Average
                                                </span>
                                                </NavLink>
                                            </OverlayTrigger>
                                        </div>

*/}

                                            <div className="menuIconPad">
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip
                                                            className={
                                                                this.state.active
                                                                    ? ""
                                                                    : "hideTooltip"
                                                            }
                                                        >
                                                            Expense
                                                </Tooltip>
                                                    }
                                                    placement="right"
                                                >
                                                    <NavLink
                                                        activeClassName="is-active"
                                                        className="sumeet"
                                                        exact={true}
                                                        onClick={this.showIcon}
                                                        to="/expenseclaimlist"
                                                    >
                                                        <img src="../public/assets/images/reports.svg" />
                                                        <span className="menuIconText">
                                                            Expense
                                                </span>
                                                    </NavLink>
                                                </OverlayTrigger>
                                            </div>


                                            <div className="menuIconPad">
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip
                                                            className={
                                                                this.state.active
                                                                    ? ""
                                                                    : "hideTooltip"
                                                            }
                                                        >
                                                            Day Wise Status
                                                </Tooltip>
                                                    }
                                                    placement="right"
                                                >
                                                    <NavLink
                                                        activeClassName="is-active"
                                                        className="sumeet"
                                                        exact={true}
                                                        onClick={this.showIcon}
                                                        to="/report/17"
                                                    >
                                                        <img src="../public/assets/images/reports.svg" />
                                                        <span className="menuIconText">
                                                            Day Wise Status
                                                </span>
                                                    </NavLink>
                                                </OverlayTrigger>
                                            </div>



                                            <div className="menuIconPad">
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip
                                                            className={
                                                                this.state.active
                                                                    ? ""
                                                                    : "hideTooltip"
                                                            }
                                                        >
                                                            MTP Monthly  Reports
                                                </Tooltip>
                                                    }
                                                    placement="right"
                                                >
                                                    <NavLink
                                                        activeClassName="is-active"
                                                        className="sumeet"
                                                        exact={true}
                                                        onClick={this.showIcon}
                                                        to="/report/18"
                                                    >
                                                        <img src="../public/assets/images/reports.svg" />
                                                        <span className="menuIconText">
                                                            MTP Monthly  Reports
                                                </span>
                                                    </NavLink>
                                                </OverlayTrigger>
                                            </div>






                                            {localStorage.getItem('type') != "1" ?
                                                <div className="menuIconPad">
                                                    <OverlayTrigger
                                                        overlay={
                                                            <Tooltip
                                                                className={
                                                                    this.state.active
                                                                        ? ""
                                                                        : "hideTooltip"
                                                                }
                                                            >
                                                                Manager Call Summary Report
                                                </Tooltip>
                                                        }
                                                        placement="right"
                                                    >
                                                        <NavLink
                                                            activeClassName="is-active"
                                                            className="sumeet"
                                                            exact={true}
                                                            onClick={this.showIcon}
                                                            to="/report/19"
                                                        >
                                                            <img src="../public/assets/images/reports.svg" />
                                                            <span className="menuIconText">
                                                                Manager Call Summary Report
                                                </span>
                                                        </NavLink>
                                                    </OverlayTrigger>
                                                </div> : <div></div>}




                                            <div className="menuIconPad">
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip
                                                            className={
                                                                this.state.active
                                                                    ? ""
                                                                    : "hideTooltip"
                                                            }
                                                        >
                                                            DWR Summary Report
                                                </Tooltip>
                                                    }
                                                    placement="right"
                                                >
                                                    <NavLink
                                                        activeClassName="is-active"
                                                        className="sumeet"
                                                        exact={true}
                                                        onClick={this.showIcon}
                                                        to="/report/20"
                                                    >
                                                        <img src="../public/assets/images/reports.svg" />
                                                        <span className="menuIconText">
                                                            DWR Summary Report
                                                </span>
                                                    </NavLink>
                                                </OverlayTrigger>
                                            </div>


                                            <div className="menuIconPad">
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip
                                                            className={
                                                                this.state.active
                                                                    ? ""
                                                                    : "hideTooltip"
                                                            }
                                                        >
                                                            Doctor Call Report
                                                </Tooltip>
                                                    }
                                                    placement="right"
                                                >
                                                    <NavLink
                                                        activeClassName="is-active"
                                                        className="sumeet"
                                                        exact={true}
                                                        onClick={this.showIcon}
                                                        to="/report/21"
                                                    >
                                                        <img src="../public/assets/images/reports.svg" />
                                                        <span className="menuIconText">
                                                            Doctor Call Report
                                                </span>
                                                    </NavLink>
                                                </OverlayTrigger>
                                            </div>


                                            <div className="menuIconPad">
                                                <OverlayTrigger
                                                    overlay={
                                                        <Tooltip
                                                            className={
                                                                this.state.active
                                                                    ? ""
                                                                    : "hideTooltip"
                                                            }
                                                        >
                                                            Doctor Visit Status
                                                </Tooltip>
                                                    }
                                                    placement="right"
                                                >
                                                    <NavLink
                                                        activeClassName="is-active"
                                                        className="sumeet"
                                                        exact={true}
                                                        onClick={this.showIcon}
                                                        to="/report/22"
                                                    >
                                                        <img src="../public/assets/images/reports.svg" />
                                                        <span className="menuIconText">
                                                            Doctor Visit Status
                                                </span>
                                                    </NavLink>
                                                </OverlayTrigger>
                                            </div>


                                        </div>}

                                        {menu.map(l => (
                                            <Parent
                                                key={l["Activty Name"]}
                                                name={l["Activty Name"]}
                                                id={l["n_menuid"]}
                                                item={l}
                                                showIcon={this.showIcon}
                                            />
                                        ))}
                                    </Accordion>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
