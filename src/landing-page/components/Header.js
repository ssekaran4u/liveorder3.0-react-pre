import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Dropdown, Navbar, Nav, NavDropdown, Modal, Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { postToServer } from '../../lib/comm-utils'
import { NavLink } from 'react-router-dom'
import { deleteToken } from '../../actions/login'
import { gotnotifications, onLogout } from '../../actions/Header'
import { deleteCommToken } from '../../lib/comm-utils'
import '../../../public/assets/css/bootstrap.min.css'
import '../../../public/assets/css/style.css'
import '../../../public/assets/css/responsive.css'
import '../../../public/assets/css/KamResponsive.css'
import { Encerypt } from "../../lib/comm-utils";
import { Redirect } from 'react-router-dom'
import SiteMapmenu from './SiteMapMenu'
// import Sitemap from './Sitemap'
import Mobilesite from './MobileSite'
import { withRouter } from "react-router";

import Search from './Search'
import { injectIntl, defineMessages } from 'react-intl'

import { isThisISOWeek } from 'date-fns';
import MenuPopup from '../popups/MenuPopup'
import {Link} from 'react-router-dom'
import StatusPopup from '../../lib/StatusPopup'
import Circular from './Circular'

import {URL_BASE} from '../../lib/constants'
const messages = defineMessages({
    newNotifications: {
        id: 'landing-page.components.header',
        defaultMessage: 'You have {messageCount} new notifications'
    }
})

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            active: false,
            show: false,
            data: {},
            searchbar: "",
            password: true,
            newpassword: true,
            update: true,
            updatespan: false,
            updated: false,
            newpas: '',
            pas: '',
            repas: '',
            showStatic: true,
            showSearch: false,
            sitemap:false,
            dropshow:false,
            menudata:[],
            childmenu:[],
            accordian:false,
            langname:'English',
            fullsearch:false,
            notedata:[],
            showModal:false,
            topmenu: [],
            topchild: [],
            displayImage:false,
            erroMsg:'',
            showChangeModal: false,
            AllViewid:'',Gsearch:'',imaggedata:'',imageshow:false,
            pdfdata:'',
            logourl:'../public/assets/images/csq_logo.svg'
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickNew = this.handleClickNew.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.Oncurrentpass = this.Oncurrentpass.bind(this);
        this.Onnewpass = this.Onnewpass.bind(this);
        this.Onrepass = this.Onrepass.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.showsite = this.showsite.bind(this);
        this.hidesite = this.hidesite.bind(this);
        this.loadsitemapmenu = this.loadsitemapmenu.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.drophandle = this.drophandle.bind(this);
        this.mobilesitemap = this.mobilesitemap.bind(this);
        this.fullserach = this.fullserach.bind(this);
        this.hidefullserach = this.hidefullserach.bind(this);
        this.showIcon = this.showIcon.bind(this);
        this.hidedrop = this.hidedrop.bind(this);
        this.notificationfun=this.notificationfun.bind(this)
        this.handleMaster = this.handleMaster.bind(this);
        this.handleRequests = this.handleRequests.bind(this)
        this.Hide = this.Hide.bind(this)
        this.goHome= this.goHome.bind(this)
        this.gloableSearch=this.gloableSearch.bind(this)
        this.LoadCirculer=this.LoadCirculer.bind(this)
        this.LMS=this.LMS.bind(this)
        this.Loadurlcomapany=this.Loadurlcomapany.bind(this)
        var count = 0;
        if (count == 0) {
            const width = screen.width;
            if (width > 2 && count == 0) {
                var element = document.getElementById("app");
                element.classList.add("hideMenu");
            }
            count++;
        }
     }

     LMS(){

          var data = {"Index":"LMS_LINK"}
        
        postToServer("LMS", data)
            .then(function (result) {
            //this.setState({imaggedata:result})
          
            if(result.data["data"][0]["flag"]=="1"){
               const ll=  result.data["data"][0]["c_MoodleLMSLink"]

               if(ll!=''){
                window.open(ll,"_blank"); 
              } 
            }
            })

     }

     Loadurlcomapany(){
const _this2=this
        var data = {"Index":"Company"}
        
        postToServer("Company", data)
            .then(function (result) { 
            


                if(result.data["Data"]){
                        if(result.data["Data"][0]){
                            if(result.data["Data"][0]["c_url"]){
                            const url=URL_BASE+result.data["Data"][0]["c_url"]
                            // this.setState({}) 
                            _this2.setState({logourl: url })

                            // alert(url)
                            }
                        }

                     }
              //  console.log(result.data["Data"][0]["c_url"])

                

            })




     }

     LoadCirculer(){
       

         if (sessionStorage.getItem("Circular")==null ||  sessionStorage.getItem("Circular")== undefined){  
         const _this=this
        var data = {"Index":"Circular"}
        
        postToServer("Circular", data)
            .then(function (result) {
            //this.setState({imaggedata:result})
            sessionStorage.setItem("Circular","false")

            var l =[]

            l=result.data.split('|')
            if(l.length > 1){



               
                var datatype= l[1].split('.')
                if  (datatype[1]){


                    if  (datatype[1]=="jpg" || datatype[1]=="png"   ){
                    _this.setState({imaggedata:l[0],imageshow:true })
                    }

                    if  (datatype[1]=="pdf"  ){
                       
                        var objbuilder = '';
                        objbuilder += ('<object width="100%" height="100%"      data="data:application/pdf;base64,');
                        objbuilder += (l[0]);
                        objbuilder += ('" type="application/pdf" class="internal">');
                        objbuilder += ('<embed src="data:application/pdf;base64,');
                        objbuilder += (l[0]);
                        objbuilder += ('" type="application/pdf" />');
                        objbuilder += ('</object>');

                        var win = window.open("","_blank","titlebar=yes");
                        win.document.title = "Circular";
                        win.document.write('<html><body>');
                        win.document.write(objbuilder);
                        win.document.write('</body></html>');
                        layer = jQuery(win.document);


                        }
                        if  (datatype[1]=="mp4"  ){

                            var objbuilder = '';
                            objbuilder += ('<video   autoplay controls width="100%" height="100%"  src="data:video/mp4;base64,');
                            objbuilder += (l[0]);
                            objbuilder += ('"  > Your browser does not support HTML5 video </video> ');
                            
                            var win = window.open("","_blank","titlebar=yes");
                            win.document.title = "Circular";
                            win.document.write('<html><body>');
                            win.document.write(objbuilder);
                            win.document.write('</body></html>');
                            layer = jQuery(win.document);
                        }
                        //mp4

                        //alert(datatype[1])
                }


               
                
            }
           
            })

        }

     }

     gloableSearch(e){
        var value = e.target.value;
       // alert(value)
     }

      notificationfun(){
        var note={
            "save": "get_notification",
             "Token":""
        }
        this.props.getnotifications(note)
      }

        componentDidUpdate(prevpro,prevstate){

            //  if(prevstate.notedata!=this.state.notedata){
            //      this.forceUpdate()
            //  }

        }

      componentDidMount() {
            this.notificationfun()
            this.loadsitemapmenu();
            this.LoadCirculer()
            this.Loadurlcomapany()
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
                _this.setState({data:result.data[0]})
                })



            this.setNavbarToggler('block')
        }

        static getDerivedStateFromProps(nextProps, prevState) {
        if ((prevState.notedata !== nextProps.data) && (Array.isArray(nextProps.data)))
            //console.log("sweta",nextProps.data)
            return {...prevState, notedata:nextProps.data}
        return null
        }

        loadsitemapmenu() { 
            const _this = this
            var data = { "index": "Menu360" }
            postToServer("DashBoardPage", data)
                .then(function (result) { 


                if( result.data){
                    if( result.data["data"]){
                       
                        if(result.data["data"]["main"]){
                            _this.setState({ topmenu: result.data["data"]["main"], topchild: result.data["data"]["submain"] })
                            if(result.data["data"]["main"][0]){
                                if(result.data["data"]["main"][0]["n_id"]){
                                  //  console.log("kkk", result.data["data"]["main"][0]["n_id"])
                                    const k=result.data["data"]["main"][0]["n_id"]
                                     _this.setState({ AllViewid:k}) 
                                }
                            }
                        }
                    }
                }
                   
                }).catch((Error) => {  console.log(Error, '') })
        }
        Hide() {
            this.setState({
                showChangeModal: false,imageshow:false
            });
        }
    handleUpdate() {
        if(this.state.newpas == ""){
            this.setState({
                 erroMsg:"please enter old password"
            })
            return
         }
        if(this.state.pas == ""){
           this.setState({
                erroMsg:"please enter new password"
           })
           return
        }
        if(this.state.repas == ""){
            this.setState({
                 erroMsg:"please re-enter password"
            })
            return
         }
        
        if(this.state.pas != this.state.repas){
            this.setState({
                erroMsg:"New password and Confirm Password are not same"
           })
            return
        }

        //   if(this.state.newpas == this.state.pas){
        //     this.setState({
        //          erroMsg:"Cureent password and New Password are not same"
        //     })
        //     return
        //  }

      //  const keyf= Encerypt( this.state.newpas).then(  (n)=>{ 
       // const key= Encerypt(this.state.pas).then(  (p)=>{
        var data = {
            "index": "Passwordchange",
            "Result": "0",
          
            "TableName": "",
            "ColumnName": "",
            "Data":
            {
                "New_pas":  this.state.pas,
                "Old_pas": this.state.newpas,
            }
        }
        const _this=this
        postToServer("USerinfo", data)
            .then(function (result) {
               console.log(result.data.Result.Result, 'out put')
                if(result.data.Result.Result >0 ){ 
                    _this.setState({
                        show:false,
                        showChangeModal:true,
                        msgshow:"msg",
                        errmsg:"Password Updated"
                    })
                    
                 
                }else{
                    _this.setState({
                        show:false,
                        showChangeModal:true,
                        msgshow:"",
                        errmsg:"Password Not Updated"
                    })
                }

              
            })
        _this.setState({
            update: false,
            updatespan: true
        });
        setTimeout(function () {
            _this.setState({
                updatespan: false,
                updated: true,
            }), setTimeout(function () {
                
                _this.setState({
                    updatespan: false,
                    updated: false,
                    update: true,
                })
                _this.handleClose();
            }.bind(_this), 1000)
        }.bind(_this), 2000,
        );
 //   })
    

//})
  
    }
    mobilesitemap() {
        this.setState({
            accordian: !this.state.accordian
        })
    }
    changeLanguage(event) {
        const selectedLang = document.getElementById(event.target.id).getAttribute('value');
        this.setState({
            langname: selectedLang
        })
        this.props.changeLocale(event.target.id)
    }
    showsite() {
        this.setState({
            sitemap: true
        })
    }
    hidesite() {
        this.setState({
            sitemap: false
        })
    }
    drophandle() {
        this.setState({
            dropshow: !this.state.dropshow
        })
    }
    handleLogout() {
        this.setState({
            dropshow: !this.state.dropshow
        })
        deleteCommToken()
        this.props.deleteToken()
        this.props.logout()
    }
    handleSearch(e) {
        var value = e.target.value;


       
        if (value.length > 0) {
            this.setState({
                showStatic: false,
                showSearch: true,
                Gsearch:value
            })
        }
        if (value.length == 0) {
            this.setState({
                showStatic: true,
                showSearch: false,
                Gsearch:value
            })
        }
    }
    Oncurrentpass(event) {
        this.setState({ newpas: event.target.value })
    }
    Onnewpass() {
        this.setState({ pas: event.target.value })
    }
    Onrepass() {
        this.setState({ repas: event.target.value })
    }
    handleClose() {
        this.setState({ show: false });
    }
    handleShow() {
        this.setState({ show: true, dropshow: !this.state.dropshow });
    }
    handleClick() {
        this.setState({ password: !this.state.password });
    }
    handleClickNew() {
        this.setState({ newpassword: !this.state.newpassword });
    }
    setNavbarToggler(displayType) {
        let elements = document.getElementsByClassName("navbar-toggler");
        if (elements && (elements.length > 0))
            elements[0].style.display = displayType;
    }
    fullserach() {
        this.setNavbarToggler('none')
        this.setState({
            fullsearch: true
        })
    }
    hidefullserach() {
        this.setNavbarToggler('block')
        this.setState({
            fullsearch: false
        })
    }
    showIcon() {
        let element = document.getElementById("app");
        element.classList.toggle("hideMenu");
    }
    hidedrop() {
        this.setState({
            dropshow: false
        })
    }
     handleMaster(event){
        const {id} = event.target
        // console.log(event.target,id , "menu id")
        this.setState({
            showModal:true,
            id:id
        })

    }
     closeSuccessPopup(){
        this.setState({
            showModal:false
        })
    }
    handleRequests(){
        const k= localStorage.getItem("type")
        if(k == 1){
            this.props.history.push('/mr_request_approval');
        }else if(k == 2){
            this.props.history.push('/manager_request_approval');
        }
    }
    goHome(){
        this.props.history.push('/')
    }
    render() { 
        const { intl } = this.props
        const { notedata } = this.state
        let totalnotifications = this.state.notedata.length

        const renderTooltip = props => (
            <div
              {...props}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                padding: '2px 10px',
                color: 'white',
                borderRadius: 3,
                ...props.style,
              }}
            >
              Simple tooltip
            </div>
          );
          const leaveList = []
        //   notedata.map((item) =>{
        //       if(item.C_type == "Leave"){
                  
        //           leaveList.push(item)
        //       }
              
        //   })
        
      //   console.log(this.state.notedata,'kunal error')
    //   console.log(this.props.stpchecking, "kumar madhu")
          
        return(
            <div className="header">
                {/* {notedata.map((noted)=>
                    <div>{noted.Notification}</div>
                )} */}
                
                <Navbar collapseOnSelect className="custnav" expand="lg"  bg="light" variant="light">
                    <Navbar.Brand href="#home">
                        <div className="mobileshow">
                            <img src="../public/assets/images/Hamburger-menu.svg" className="hambergerimage" onClick={this.showIcon} />
                        </div>
                       
                       
                     
                        <img src={this.state.logourl} onClick={this.goHome} id="clientlogo" className={this.state.fullsearch ? 'clientimage searchhide' : 'clientimage'} />
                        
                        
                        
                        <div className="sitemapcontainer">
                            <img src="../public/assets/images/menu.svg" className="mobsitemap" onClick={this.mobilesitemap} />
                        </div>
                        <div className="form-group has-search mobilesearch">
                            <img src="../public/assets/images/search_grey.png" id="iconsearch" className={this.state.fullsearch ? 'searchhide pull-right' : 'searchicon pull-right'} onClick={this.fullserach} />
                            <input autoComplete="off" type="text" name="searchbar" id="searchbar" onClick={this.gloableSearch}  className={this.state.fullsearch ? 'Rectangle-685 showsearch' : 'Rectangle-685 searchhide'} placeholder="Search here" />
                        </div>

                        <img src="../public/assets/images/close.png" id="closesearch" className={this.state.fullsearch ? 'searchhide2 float-right searchclose' : 'searchhide searchhide2 float-right'} onClick={this.hidefullserach} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse className="lefticons" id="responsive-navbar-nav">

                        <Nav className="mobilenav">
                            <div className="rightcomponents">
                                <Dropdown>
                                    <Dropdown.Toggle className="languagedrop p-0" variant="success" id="dropdown-basic">
                                        <div className="form-group has-search">
                                            <img src="../public/assets/images/search_grey.png" id="iconsearch" className="searchicon nodisplay" onClick={() => showsearch()} />
                                            <input type="text"   name="searchbar" id="searchbar" className="Rectangle-685 searchhide" onChange={this.handleSearch} placeholder="Search Menu" />
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="search-dropdown cal-scrollbar">
                                        <Search   Gsearch={this.state.Gsearch} showStatic={this.state.showStatic} showSearch={this.state.showSearch} />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Nav>
                        {/*   <div className="sitemap-sec sitedrophead " onMouseEnter={this.showsite} onMouseLeave={this.hidesite}>
                            <img src="../public/assets/images/menu.svg" title="Site Map" className="menuPad" />
                            {this.state.sitemap ?

                                <div className="sitedropmenu" >

                                        <div>
                                            <div className='masterDiv'>
                                                <Row>
                                                    <Col lg={4} md={4}>
                                                        <div  className="headMenuImg"><img src="../public/assets/images/mastericon.svg" id="1"  onClick={this.handleMaster.bind(this)} /></div>
                                                        <div className="headmenuIconText">All Master</div>
                                                    </Col>
                                                    <Col lg={4} md={4}>
                                                        <div  className="headMenuImg"><img src="../public/assets/images/customer_list.png"  id="2" onClick={this.handleMaster.bind(this)} /></div>
                                                        <div className="headmenuIconText width100">Customer Lists</div>
                                                    </Col>
                                                    <Col lg={4} md={4}>
                                                        <div  className="headMenuImg"><img src="../public/assets/images/visit_related.svg" id="3" onClick={this.handleMaster.bind(this)} /></div>
                                                        <div className="headmenuIconText width100">Visit Related</div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={4} md={4}>
                                                        <div className="headMenuImg"><img src="../public/assets/images/Operational_menu.svg" id="4" onClick={this.handleMaster.bind(this)} /></div>
                                                        <div className="headmenuIconText">Operational</div>
                                                    </Col>
                                                    <Col lg={4} md={4}>
                                                        <div  className="headMenuImg"> <img src="../public/assets/images/analysis.svg" id="5" onClick={this.handleMaster.bind(this)} /></div>
                                                        <div className="headmenuIconText">Reports</div>
                                                    </Col>
                                                    <Col lg={4} md={4}>
                                                        <div  className="headMenuImg"><img src="../public/assets/images/young-man-with-tie.svg" onClick={this.handleMaster.bind(this)} /></div>
                                                        <div className="headmenuIconText">HR Module</div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg={4} md={4}>
                                                        <div className="headMenuImg"><img src="../public/assets/images/charts.svg" onClick={this.handleMaster.bind(this)} /></div>
                                                        <div className="headmenuIconText width100">Sales Report</div>
                                                    </Col>
                                                    <Col lg={4} md={4}>
                                                        <div  className="headMenuImg"><img src="../public/assets/images/cogwheels.svg" /></div>
                                                        <div className="headmenuIconText">Utility</div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        <div>
                                            <button className='viewAllBtn' id="1" onClick={this.handleMaster.bind(this)}>View All</button>
                                        </div>
                                        </div>
                                        <MenuPopup show={this.state.showModal} itemId={this.state.id} onHide={this.closeSuccessPopup.bind(this)} />
                                    </div>:
                                null
                            }
                        </div>*/}
                       <Dropdown className="menuDrop site_Map">
                            <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                <OverlayTrigger
                                    overlay={<Tooltip id="tooltip-right">Site Map</Tooltip>}
                                    placement="right"
                                >
                                    <img src="../public/assets/images/menu.svg" alt="Site Map" className="padding_2 " />
                               </OverlayTrigger>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>

                                        <div className="sitedropmenu" >

                                        <div>
                                        {/* <Dropdown.Item href="#/action-1" > */}
                                            <div className='masterDiv'>
                                                <Row>




                                                      {this.state.topmenu != undefined ? this.state.topmenu.map((menukey) => {
                                                    return (<Col onClick={this.handleMaster.bind(this)  } key={menukey["n_id"]} id={ "key--"+ menukey["n_id"]} xs={4} lg={4} md={4}>
                                                        <div id={ "key--"+menukey["n_id"]} className="handCurser" >
                                                            <div className="headMenuImg"><img id={  "key--"+menukey["n_id"]} src={'../public/assets/images/' + menukey["c_image"]}  ></img></div>
                                                            <div className="headmenuIconText" id={  "key--"+menukey["n_id"]}>{menukey["c_name"]} </div>
                                                        </div>
                                                    </Col>)
                                                })
                                                    : <p>loading ...</p>
                                                }
                                               
                                                </Row>
                                            </div>
                                        <div>
                                            <button className='viewAllBtn' id={this.state.AllViewid} onClick={this.handleMaster.bind(this)}>View All</button>
                                        </div>
                                        {/* </Dropdown.Item> */}
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                            <MenuPopup show={this.state.showModal}   main={this.state.topmenu} actId={this.state.AllViewid} childmenu={this.state.topchild} itemId={this.state.id} onHide={this.closeSuccessPopup.bind(this)} />
                        <div className="rightcomponents">

                            <div className="dotbox">
                                {totalnotifications >0 ?
                                <div className="ellipse-181 new"></div> : ''}
                                <Dropdown>
                                    <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                        <img src="../public/assets/images/notificatio_bell-grey.png" className="padding_2 pad6" />
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-right cal-scrollbar notification_box">
                                      {totalnotifications > 0 ?
                                        <Dropdown.Item href="#/action-1" className="notification_child">
                                            <div className="notifi-sec">
                                                <div className="notifications_head">
                                                    <p>{intl.formatMessage(messages.newNotifications, { messageCount: totalnotifications })}</p>
                                                </div>
                                                <Link to='/all_notifications'>
                                                    <div className="Rectangle-805">
                                                        View All
                                                    </div>
                                                </Link>
                                            </div>
                                        </Dropdown.Item>:
                                        <Dropdown.Item href="#/action-1" className="notification_child">
                                            <Row>
                                                <Col className="col-sm-12 col-12 ">
                                                  <p>No Data Available</p>
                                                </Col>

                                            </Row>
                                        </Dropdown.Item>
                                        }
                                         { notedata ? notedata.map((item,index) => ( 
                                        <Dropdown.Item href="#/action-2" className="notification_child" key={index}>
                                            <div className="notifi-text-sec">
                                                <div className="spa-right">
                                                {item.C_type == "Leave" ? 
                                                    item.leavestatus == "Approved" ?
                                                            <img src="../public/assets/images/Approval.svg" className="notificationImg" /> 
                                                        :item.leavestatus == "Cancel"  || item.leavestatus == "Rejected" ||  
                                                        item.leavestatus == "Pending Leave Rejected" || item.leavestatus == "Request for cancellation is rejected"  ?
                                                            <img src="../public/assets/images/rejectimg.svg" className="notificationImg" />
                                                        :item.leavestatus == "Submitted" || item.leavestatus == "Pending" ?
                                                            <img src="../public/assets/images/Pending.svg" className="notificationImg" />
                                                        :item.leavestatus == "Request for cancelling" ?
                                                            <img className="innerimage2" src="../public/assets/images/cancellingrequest.svg"  />
                                                    :''
                                                    :item.birthday == "Birthday" ?
                                                        <img src="../public/assets/images/Approval.svg" className="notificationImg" />
                                                    :item.C_type == "Expense" ?
                                                    <div >
                                                        <img src="../public/assets/images/expense.svg" className="notificationImg" />
                                                    </div> 
                                                    :item.C_type == "Campaign" ?
                                                    <div >
                                                        <img src="../public/assets/images/campaign_status.svg" className="notificationImg" />
                                                    </div> 
                                                    :item.C_type == "Doctor Status" ?
                                                    <div >
                                                            <img src="../public/assets/images/doctor_status_icon.svg" className="notificationImg" />
                                                    </div> 
                                                    :item.C_type == "Material Request" ?
                                                    <div >
                                                        <img src="../public/assets/images/materialrequest.svg" className="notificationImg" />
                                                    </div>
                                                    :item.C_type == "PRP" ?
                                                    <img src="../public/assets/images/expense.svg" className="leaveImg" />
                                                    :''}
                                                </div>
                                            <div>
                                                <p className="status">{item.leavestatus}</p>
                                                    {/* {item.C_type  == "Leave" ? 
                                                        item.leavestatus == "Approved" ? item.C_Name == "Me" ?
                                                            <p className="status-summry">
                                                                Your leave request {item.Notification} needs to approve by <span className="namehighlight">{item.Approved_By}</span></p>:
                                                            <p className="status-summry">
                                                                {item.C_Name} leave request {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By} </span></p>:
                                                        item.leavestatus == "Submitted" ? item.C_Name == "Me" ?  
                                                            <p className="status-summry">
                                                                your Leave request {item.Notification} has been  submitted</p>:
                                                            <p className="status-summry">
                                                                {item.C_Name} Leave request {item.Notification} has been submitted</p>:
                                                        item.leavestatus == "Cancel" ? item.C_Name == "Me" ?
                                                            <p className="status-summry">
                                                                Your leave request {item.Notification} has been cancelled by <span className="namehighlight">{item.Approved_By}</span></p>:
                                                            <p className="status-summry">
                                                                {item.C_Name} Leave request {item.Notification} has been Cancelled by <span className="namehighlight">You</span> </p>:
                                                        item.leavestatus == "Request for cancelling" ? item.C_Name == "Me" ?
                                                            <p className="status-summry">
                                                                Your cancel request {item.Notification}  has been  rejected by <span className="namehighlight">{item.Approved_By}</span></p>:
                                                            <p className="status-summry">
                                                                {item.C_Name} Cancel request {item.Notification}  has been  rejected by <span className="namehighlight">You</span> </p>:
                                                        item.leavestatus == "Rejected" ? item.C_Name == "Me" ?
                                                        <p className="status-summry">
                                                        Your leave request {item.Notification} has been rejected by <span className="namehighlight">{item.Approved_By}</span></p>:
                                                        <p className="status-summry">{item.C_Name} Leave request {item.Notification} has been rejected by <span className="namehighlight">You</span> </p>
                                                        :'':
                                                    item.C_type == "Expense" ? item.leavestatus == "Submitted" ? item.C_Name == "Me" ?  
                                                        <p className="status-summry">
                                                            Your expense Rs.{item.AMT} {item.Notification} has been  submitted</p>:
                                                        <p className="status-summry">
                                                            {item.C_Name} expense Rs.{item.AMT} {item.Notification} has been  submitted</p>:
                                                        item.C_Name == "Me" ? 
                                                            <p className="status-summry">
                                                                Your expense Rs.{item.AMT}{item.Notification} has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                                            <p className="status-summry">
                                                                {item.C_Name} expense Rs.{item.AMT} {item.Notification} has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                                    item.C_type == "Campaign" ?  item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                                        <p className="status-summry">
                                                            Your  campaign with  {item.Notification} has been  submitted</p>:
                                                        <p className="status-summry">
                                                        {item.C_Name}  campaign with  {item.Notification} has been  submitted</p>:
                                                        item.C_Name == "Me" ?  
                                                            <p className="status-summry">
                                                                Your  campaign with  {item.Notification} has been  approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                                            <p className="status-summry">{item.C_Name}  campaign with {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                                    item.C_type == "Doctor Status" ? item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                                        <p className="status-summry">
                                                           your request to add  doctor({item.Notification}) has been submitted</p>:
                                                        <p className="status-summry">{item.C_Name} request to add  doctor({item.Notification}) has been submitted</p>:
                                                        item.C_Name == "Me" ? <p className="status-summry"> your request to add  doctor({item.Notification}) has been approved by <span className="namehighlight">{item.Approved_By}</span></p>: 
                                                        <p className="status-summry"> {item.C_Name} request to add  doctor({item.Notification}) has been approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                                        item.C_type == "Material Request" ? item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                                        <p className="status-summry">
                                                            Your {item.Notification}    has been submitted</p>:
                                                            <p className="status-summry">
                                                                {item.C_Name} {item.Notification}   has been submitted</p>:
                                                            item.C_Name == "Me" ? <p className="status-summry">your {item.Notification}   has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                                            <p className="status-summry">{item.C_Name} {item.Notification}  has been  approved by <span className="namehighlight">{item.Approved_By}</span> </p>:
                                                    item.C_type == "PRP" ? item.leavestatus == "Submitted" ? item.C_Name == "Me" ?
                                                            <p className="status-summry">
                                                                your request Rs.{item.AMT} for {item.Notification} has been submitted</p>:
                                                            <p className="status-summry">{item.C_Name} request Rs.{item.AMT} for {item.Notification} has been submitted</p>:
                                                            item.C_Name == "Me" ? <p className="status-summry"> your request Rs.{item.AMT} for {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By}</span></p>: 
                                                            <p className="status-summry"> {item.C_Name} Rs.{item.AMT} for {item.Notification} has been approved by <span className="namehighlight">{item.Approved_By}</span></p>:
                                                        ''
                                                } */}
                                                <p className="notificationArea">{item.Notification}</p>
                                                    {/* <p className="status-summry"></p> */}
                                                    {/* <p className="status-time">just now</p> */}
                                                </div>
                                            </div>

                                        </Dropdown.Item>
                                        )) :'' }

                                       {/* <Dropdown.Item href="#/action-2" className="notification_child">
                                            <Row>
                                                <div className="col-sm-2 col-2">
                                                    <div className="Ellipse-birthday">
                                                        <img className="innerimage" src="../public/assets/images/birthday-cake.svg"></img>
                                                    </div>
                                                </div>
                                                <div className="col-sm-10 col-10">
                                                    <p className="status">Birthday</p>
                                                    <p className="status-summry">YDr. Vijay Kumar(jayanagar) has birthday today.
                                                wish him &amp; celebrate his birthday.</p>
                                                    <p className="status-time">Just Now</p>
                                                </div>
                                            </Row>
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-2" className="notification_child">
                                            <Row>
                                                <div className="col-sm-2 col-2">
                                                    <div className="Ellipse-reject">
                                                        <img className="innerimage2" src="../public/assets/images/reject.svg"></img>
                                                    </div>
                                                </div>
                                                <div className="col-sm-10 col-10">
                                                    <p className="status">Request Rejected</p>
                                                    <p className="status-summry">Your leave request has been rejected by Mr. Rajesh
                                                Jha (Manager).</p>
                                                    <p className="status-time">Just Now</p>
                                                </div>
                                            </Row>
                                        </Dropdown.Item>*/}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                        {/* <div className="rightcomponents">
                            <div className="dotbox2">
                                <Dropdown> */}
                                    {/* <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                        <img src="../public/assets/images/globe.png" className="img-responsive mobileglobe" />
                                        <span className="nodisplay">{this.state.langname}</span>  */}
                                         {/* <img src="../public/assets/images/arrow-grey.png" className="img-responsive upimage nodisplay" /> */}
                                    {/* </Dropdown.Toggle> */}
                                    {/* <Dropdown.Menu className="language dropdown-menu-right">
                                        <Dropdown.Item value="French" className="update-language" id="fr" onClick={this.changeLanguage}><img src="../public/assets/images/frenchflag.png" className="img-responsive flag" /> French</Dropdown.Item>
                                        <Dropdown.Item value="Russian" className="update-language" id="ru" onClick={this.changeLanguage}><img src="../public/assets/images/russianflag.png" className="img-responsive flag" /> Russian</Dropdown.Item>
                                        <Dropdown.Item value="English" className="update-language" id="en" onClick={this.changeLanguage}><img src="../public/assets/images/englishflag.png" className="img-responsive flag" /> English</Dropdown.Item>
                                        <Dropdown.Item value="Hindi" className="update-language" id="hi" onClick={this.changeLanguage}><img src="../public/assets/images/indiaflag.png" className="img-responsive flag" /> Hindi</Dropdown.Item>
                                    </Dropdown.Menu> */}
                                {/* </Dropdown>
                            </div>
                        </div> */}
                        <div className="rightcomponents ml10" onMouseLeave={this.hidedrop}>
                            <div className="profileimage">
                                <div className="dropdowncustom">
                                { this.state.displayImage ?
                                        <div className="userdrop" variant="success" id="dropdown-basic" onClick={this.drophandle}>
                                        <img src="../public/assets/images/client_profile.png" className="img-responsive imsgeprofile" />
                                        <div className="username"><span className="nodisplay ">{this.state.data ? this.state.data["C_Name"] : ''}</span>
                                            <img src="../public/assets/images/arrow-grey.png" className="img-responsive dropimage nodisplay" /><br />
                                            <p className="designation nodisplay">{this.state.data ? this.state.data["deg"] : ''}</p>
                                        </div>
                                    </div>
                                        :
                                        <div className="userdrop" variant="success" id="dropdown-basic" onClick={this.drophandle}>
                                            <div className="headscoreboard">
                                                <div className="headuncoverednametext">{this.state.data["C_Name"] ? this.state.data["C_Name"].charAt(0) : ''}</div>
                                            </div>  
                                            <div className="headusername"><span className="nodisplay ">{this.state.data ? this.state.data["C_Name"] : ''}</span>
                                            <img src="../public/assets/images/arrow-grey.png" className="img-responsive dropimage nodisplay" /><br />
                                            <p className="designation nodisplay">{this.state.data ? this.state.data["deg"] : ''}</p>
                                        </div> 
                                        </div>
                                    }
                                    
                                    {this.state.dropshow ?
                                        <div className="newclass dropdown-menu-right dropdown-menu show">
                                            <NavLink className="update-profile dropdown-item" to='/userProfile' onClick={this.drophandle}><span><img src="../public/assets/images/userprofile.svg" className="updatepro" /></span>My Profile</NavLink>
                                            <div className="update-profile dropdown-item"  onClick={this.handleShow}><span><img src="../public/assets/images/password.svg" className="updatepro" /></span>Change Password</div>
                                            <div className="update-profile dropdown-item"  onClick={this.LMS}  ><span><img src="../public/assets/images/signout.svg" className="updatepro" /></span>LMS</div>
                                          
                                            {/* <NavLink className="update-profile dropdown-item" to='/help' onClick={this.drophandle}><span><img src="../public/assets/images/info.svg" className="updatepro" /></span>Help</NavLink> */}
                                            {/*<NavLink className="update-profile dropdown-item" onClick={this.drophandle}>Dashboard Setting</NavLink>*/}
                                            {/*<NavLink className="update-profile dropdown-item" onClick={this.drophandle}>Menu Setting</NavLink>*/}
                                            {(localStorage.getItem("type") == 1 || localStorage.getItem("type") == 2) ?
                                            <div className="update-profile dropdown-item" onClick={this.handleRequests}><span><img src="../public/assets/images/testing.svg" className="updatepro" /></span>Request & Approval</div>:''}
                                            <div className="update-profile dropdown-item" onClick={this.handleLogout}><span><img src="../public/assets/images/signout.svg" className="updatepro" /></span>Logout</div>
                                        </div>
                                        : null}
                                </div>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
                {this.state.accordian ?
                    <Mobilesite mobilesitemap={this.mobilesitemap} />
                    :
                    null
                }
                
                  { this.state.show &&
                  
                <Modal  className="headmodal" show={this.state.show} onHide={this.handleClose}>
                    <div>
                    <Modal.Header>
                        <img src="../public/assets/images/cross.svg" className="crossbutton" onClick={this.handleClose} />
                    </Modal.Header>
                    <Modal.Body >
                        
                        <div className="form-group passwordmodal padd36">
                            <label className="passlabel">Current Password <span className="astrikred">*</span></label>
                            <input onChange={this.Oncurrentpass} placeholder="Enter current password" name="password" id="currentpassword" className={this.state.password ? "form-control input-field passwordfield": "form-control input-field showpassField"}
                                type={this.state.password ? "password" : "text"} />
                            <img src={this.state.password ? "../public/assets/images/eyeslash.svg" : "../public/assets/images/eye.svg"} className="passeye" id="password" onClick={this.handleClick}></img>
                        </div>
                        <div className="form-group passwordmodal padd36">
                            <label className="passlabel">Set New Password <span className="astrikred">*</span></label>
                            <input placeholder="Enter password"
                                name="newpassword"
                                id="newpassword"
                                onChange={this.Onnewpass}
                                className={this.state.newpassword ? "form-control input-field passwordfield": "form-control input-field showpassField"}
                                type={this.state.newpassword ? "password" : "text"}
                            />
                            <img src={this.state.newpassword ? "../public/assets/images/eyeslash.svg" : "../public/assets/images/eye.svg"} className="passeye" id="password" onClick={this.handleClickNew}></img>
                        </div>
                        <div className="form-group passwordmodal padd36">
                            <label className="passlabel">Re-Enter Password <span className="astrikred">*</span></label>
                            <input onChange={this.Onrepass} placeholder="Enter password" name="reenetrpassword" id="reenetrpassword" className="form-control input-field passwordfield"
                                type="password" />
                        </div>
                        <div className="padd36 errrState">{this.state.erroMsg}</div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="Rectangle-96" variant="secondary" onClick={this.handleUpdate}>
                            {this.state.update ? "Update" : ""}
                            {this.state.updatespan ? <Spinner animation="border" variant="light" /> : ""}
                            {this.state.updated ? "Updated" : ""}
                        </Button>
                    </Modal.Footer>
                    </div>
                </Modal>}
                <StatusPopup onClose={this.Hide} success={this.state.msgshow} message={this.state.errmsg} show={this.state.showChangeModal} />
                <Circular onClose={this.Hide} data={this.state.imaggedata} success={this.state.msgshow} message={this.state.errmsg} show={this.state.imageshow} />
            
            </div>
        )
    }
}
const mapStateToProps = state =>({
    data:state.HEADER.data,
  })

const mapDispatchToProps = (dispatch) => ({
    deleteToken: () =>  dispatch(deleteToken()),
    getnotifications:(note) => dispatch(gotnotifications(note)),
    logout: () => dispatch(onLogout())

})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(withRouter(Header)))
