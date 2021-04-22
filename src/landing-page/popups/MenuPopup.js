/* LOADING MENUS & SUBMENUS */
import { Accordion, AccordionItem } from 'react-light-accordion';
import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import { postToServer } from '../../lib/comm-utils'
import {Row,Col,Dropdown,Navbar,Nav,NavDropdown,Modal,Button,Spinner} from 'react-bootstrap';


import Childsite from  '../components/Childsite'
let globlesub={}


class MenuPopup extends Component{

    constructor(props, context) {
    super(props, context);
         this.state = {
            data:[],
            menudata:[],
            childmenu:[],
            activekey:'',
            Nameofmenu:'',
            activeName:'',
            activeclass1:''
         }
         this.displaySubMenu=this.displaySubMenu.bind(this)

    }
componentDidMount(){
    globlesub={}
}
     componentDidUpdate(prevProps, prevState){
        if(prevProps.main != this.props.main){
            this.props.childmenu.map( (child)=>{
               if(globlesub[child["n_menu_id"]]){
                   var list= globlesub[child["n_menu_id"]]
                   list.push({"id":child["n_id"],"url":child["c_url"] ,"name":child["c_name"],"old_url":child["old_url"] })
                   globlesub[child["n_menu_id"]]=list
               }else{
                   var list=[]
                   list.push({"id":child["n_id"],"url":child["c_url"] ,"name":child["c_name"] ,"old_url":child["old_url"] })
                   globlesub[child["n_menu_id"]]=list
               }
            })
        }
        if(this.props.itemId != prevProps.itemId){
            //alert(this.props.itemId)

            let iId = this.props.itemId.split("--");
            this.props.main.map((item) =>{
                if(iId[1]){
                if(item.n_id == iId[1]){
                   
                    this.setState({
                        activeclass1:item.n_id,
                        activeName:item.c_name
                    })
                }
            }
            })
        }
        
      //  alert( this.props.itemId)
    //let d='2'
   
    let d =this.props.itemId
        if (  prevProps.itemId!= this.props.itemId) {

           // if(this.state.activekey == ''){
            d= this.props.itemId.replace('key--','')
           // }
           
        this.setState({       
            activekey:d
        })
         }
     }

   
     componentDidCatch(error, info) {

       
        this.setState({ Error: true, Errormsg: 'Error in App' })
      }
      
    displaySubMenu(name){   
      
        let id = event.target.id
        const d= id.replace('klop','')
        this.setState({
            activeclass1:d,
            activekey:d,
            activeName:name
        })
    }


    render(){ 

         const Actkeyval=this.state.activekey;
        let iId =[]
        let aName 
        let activeclass
       
        // console.log(globlesub,'jack')
        // console.log("ll",this.props.main)
        if(this.props.itemId){ 
            if(this.props.itemId.search("key") == -1){ 
                this.props.main.map((item) =>{
                    if(this.props.itemId == item.n_id){
                        aName = item.c_name
                        activeclass = item.n_id
                    }
                })
            }else{
                this.props.main.map((item) =>{
                    if(this.props.itemId){
                        iId = this.props.itemId.split("--");
                            if(iId[1] == item.n_id){
                                aName = item.c_name
                                activeclass = item.n_id
                            }
                    }
                })
            }
        }
       
        if(this.state.activekey != activeclass){
            activeclass = this.state.activeclass1
        }
        else{
            activeclass =activeclass
        }
       

        let linkname
        if(this.state.activeName){
            linkname = this.state.activeName
        }else{
            linkname = aName
        }
        //if(this.props.itemId)
       
       
            if(globlesub[Actkeyval]==undefined)
            return null
        
        const menu = this.props.main.map((aa,index)=>

            <li   onClick={()=>this.displaySubMenu(aa.c_name) }  id={"klop"+ aa.n_id} name={aa.c_name} key={aa.n_id} className={ activeclass == aa.n_id  ? "firstNameCap cursur  activeUser" : "firstNameCap cursur"} > {aa.c_name}
                <i className="fa fa-angle-right siteangle float-right" aria-hidden="true"></i>
            </li>
        
        )
        let submenu=[]
    if(globlesub[Actkeyval]){
            submenu = globlesub[Actkeyval].map( (keyval,i)=>
            <li key={i}  className="" >
            <NavLink  onClick={this.props.onHide}  exact={true} to={ keyval["url"] !=''? keyval["url"]:'/IFrameurl/'+keyval["old_url"] } >
                    {keyval["name"]}
                </NavLink>
            </li>
    

   
        )
    }
    console.log("submenu",submenu)
return(<div className="menuModal custom-map-modal">
    {this.props.show ?
            <div   className="fullMenu" >
             <div className="masterpage padding20 responsivePad">
             <Row className="cloeBtn handCurser">
             <Col lg={12} md={12} className="closeModalButton" onClick={this.props.onHide}><img src="../public/assets/images/cancel_modal.svg" className="closeImgPad"/></Col>
             </Row>
            <Row >
                <Col lg={7} md={8} sm={10} xs={12} className="totalToppad">
                    <div className=' flex-row '>
                        <div className="first_child padding50">
                            <ul>
                                
                                {menu}
                            </ul>

                        </div>
                        <div className="second_child disable-scrollbars floatLeft">
                        {(submenu.length > 0) &&
                                        <ul className="listpadding">
                                               
                                                <div className="padding17 childSubMenu">
                                                <div className="listHead pt100" >{linkname}</div>
                                                {/* <div>{this.state.activeName}</div> */}
                                                 <div >{submenu}</div>
                                                </div>
                                        </ul>
                                    }
                        </div>



                    </div>
                </Col>
                <Col lg={5} md={4} sm={2} xs={12} className="rightImg ">
                    <div >
                        <img src='../public/assets/images/walk.svg' className="walkImg imgpaddingTop"/>
                    </div>
                </Col>
            </Row>
            </div>


                </div> :''}
            </div>
        )
    }
}



 export default MenuPopup