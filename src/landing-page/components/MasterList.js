/* LOADING MENUS & SUBMENUS */
import { Accordion, AccordionItem } from 'react-light-accordion';
import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import { postToServer } from '../../lib/comm-utils'
import {Row,Col,Dropdown,Navbar,Nav,NavDropdown,Modal,Button,Spinner} from 'react-bootstrap';


import Childsite from  './Childsite'

class MasterList extends Component{

    constructor(props, context) {
		super(props, context);
         this.state = {
            data:[],
            menudata:[],
            childmenu:[],
            
         }
          this.handleLoad = this.handleLoad.bind(this);
    }
    
    componentDidMount() {
            this.loadsitemapmenu();
             window.addEventListener('load', this.handleLoad);
           
        }
       
        loadsitemapmenu(){
            const _this=this
            var data = {
                "index": "Menusite",
                "Result":"0",
                "Token": "sfa360|MR1(Salem)|MR1|TNH0012|UX2019-05-02T09:05:36+05:30",
                "TableName": "",
                "ColumnName": "",
                "Data": [
                  {
                    "year": "2018",
                    "month": "7",
                    "Result": "1"
                }
            ]
        }
        postToServer("Temp", data)
            .then(function (result) {
                _this.setState({ menudata: result.data["Parent"], childmenu: result.data["Child"] })
            })
    }
    displaySubMenu(event){
        let data
        let id = event.target.id
        if (!id)
            return
        id = id.replace('submenu:','')
       
         data = this.state.childmenu.reduce((p, data)=>{
            if(data.n_menu_id==id){
                p.push({ "name":data.C_name ,"itemid":data.n_item_id ,"n_menu_id":data.n_menu_id })
            }
            return p
        },[])
        
        
        this.setState({data})
    }
    handleLoad(){ 
        let datas
    
        datas = this.state.childmenu.reduce((p, data)=>{ 
            if(data.n_menu_id==1){
                p.push({ "name":data.C_name ,"itemid":data.n_item_id ,"n_menu_id":data.n_menu_id })
            }
            return p
        },[])
         this.setState({datas})
    }

    render(){
        // console.log("data",this.state.datas)

        const kk=this.state.menudata
        if (kk==undefined)
            return null

        const { data,datas } = this.state

        const menu = kk.map(aa=>
        
            <li   onMouseOver={this.displaySubMenu.bind(this) }  id={"submenu:"+aa.n_id} key={aa.n_id} className="firstNameCap"> {aa.c_name}
                <i className="fa fa-angle-right siteangle float-right" aria-hidden="true"></i>
            </li>
        )

        const submenu = data.map( (keyval,i)=>{
          
        if(keyval["n_menu_id"]=="1"){
            return <li key={i} >

               
                <NavLink  exact={true} to={'/MainMasterkey/'+keyval["itemid"] } >
                    {keyval["name"]}
                </NavLink>
            </li>
        
    }
     if(keyval["n_menu_id"]=="5"){
        
        return  <li key={i} >

               
        <NavLink  exact={true} to={'/report/'+keyval["itemid"] } >
                       {keyval["name"]}
                   </NavLink>
               </li>
           
     }
          }  )
          
     
    let filteredMaster = data.filter(
                master => master.n_menu_id == '1'
        )
    let filteredReport = data.filter(
                report => report.n_menu_id == '5'
        )

        return(
            <Row className="masterpage">   
                <Col lg={8} md={8}>
                    <div className=' flex-row'>
                        <div className="first_child">
                            <ul>
                                {menu}
                            </ul>
                        </div>
                       {/* {(data.length > 0) &&  */}
                        <div className="second_child cal-scrollbar">
                            
                            {/*{this.displaySubMenu.bind(this)}
                                {filteredMaster.length > 0 ?
                                    <div>
                                        <div className="listHead">Masters</div>
                                        {submenu}
                                    </div>
                                    : '' }
                                
                                {filteredReport.length > 0 ?
                                    <div>
                                    <div className="listHead">Reports</div>
                                        {submenu}
                                    </div>
                                    : '' }*/}
                                    {(data.length > 0) &&
                                        <ul>
                                            {filteredMaster.length > 0 ?
                                                <div>
                                                    <div className="listHead">Masters</div>
                                                    {submenu}
                                                </div>
                                                : '' }

                                                {filteredReport.length > 0 ?
                                                <div>
                                                <div className="listHead">Reports</div>
                                                    {submenu}
                                                </div>
                                            : '' }
                                        </ul> 
                                        
                                    }
                                    {datas == undefined ? '' :
                                    <ul>
                                        <div className="listHead">Masters</div>
                                            {datas.map((item,index) => (
                                        <div>
                    
                                        <li>{item.name}</li>
                                        </div>
                                            ))}
                                    </ul>}
                     
                        </div>
                
                     {/*   } */}
                        
                    </div>
                </Col>
                <Col lg={4} md={4} className="rightImg">
                    <div>
                        <img src='../public/assets/images/walk.svg' />
                    </div>
                </Col>
            </Row>
        )
    }
}

  

 export default MasterList