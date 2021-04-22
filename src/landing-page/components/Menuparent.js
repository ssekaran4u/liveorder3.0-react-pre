import { Accordion, AccordionItem } from 'react-light-accordion';
import {Container,Row,Col,Dropdown,Navbar,Nav,NavDropdown,OverlayTrigger,Button,Tooltip} from 'react-bootstrap';
import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'


class Menuparent extends Component{
    constructor(props, context) {
       super(props, context);
        this.state = {active: false,
           show: false,
           searchbar:"",
           password:true,
           newpassword:true,
           update:true,
           updatespan:false,
           updated:false,

       };


    }
       render(){
     const name= this.props.name.split(' ');//console.log(this.props.name);
     console.log(this.props.id, "kumar madhu ")
        return(

            <div className="menuIconPad">
                <OverlayTrigger  overlay={(<Tooltip  className="">{this.props.name}</Tooltip>)} placement="right">
                    <NavLink activeClassName='is-active' className="sumeet" exact={true} to={'/IFrameurl/'+ this.props.id } onClick={this.props.showIcon}>
                        <img src= {"../public/assets/images/"+ this.props.item["icon"] } />
                            <span    id={name[0]} className="menuIconText">{name[0] +' ' } {name[1] ? name[1] +' ':'' } {  name[2] ? '  ...' :''  }</span>
                    </NavLink>
                </OverlayTrigger>
            </div>
    //     <AccordionItem title=<div className="menuIconPad collspaseDiv collspaseDiv2" onClick={()=>rotate('hrArrow')}>
    //         <img src="../public/assets/images/hr.png" />
    //         <span className="menuIconText">{this.props.name}
    //             <img src="../public/assets/images/right-arrow.png" className="arrowimgpad" id="hrArrow" />
    //         </span>
    //     </div>
    //     >
    //     <div className="menuIconPad">
    //         <div className="menuIconPad2 sumeet">
    //         <NavLink activeClassName='is-active' exact={true} to='/'>
    //             <span className="menuIconText2">Leave</span>
    //         </NavLink>
    //         </div>
    //         <div className="menuIconPad2 sumeet">
    //             <NavLink activeClassName='is-active' exact={true} to='/'>
    //                 <span className="menuIconText2">Resignation</span>
    //             </NavLink>
    //         </div>
    //         <div className="menuIconPad2 sumeet">
    //             <NavLink activeClassName='is-active' exact={true} to='/'>
    //                 <span className="menuIconText2">Recruitment</span>
    //             </NavLink>
    //         </div>
    //         <div className="menuIconPad2 sumeet">
    //             <NavLink activeClassName='is-active' exact={true} to='/'>
    //                 <span className="menuIconText2">Holiday</span>
    //             </NavLink>
    //         </div>
    //     </div>
    // </AccordionItem>

)
        }
       
    }
    export default Menuparent