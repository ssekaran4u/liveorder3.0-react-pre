import React, { Component } from 'react'
import { Row, Col, Table, Nav,Collapse,Dropdown } from "react-bootstrap";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";

class Cartdeopdown extends Component{
    constructor(props){
        super(props)
    }
    render(){
        // console.log(this.props.batch)
        return(
            <div>
                  <div className="adashboardmenu">
                                 <Dropdown className="menuDrop">
                                     <Dropdown.Toggle className="languagedrop1" variant="success" id="dropdown-basic1">
                                         <div className="kfilterBtn1">
                                             <span className="statusText1">{this.props.batch}:</span>
                                         </div>
                                     </Dropdown.Toggle>
                                     <Dropdown.Menu>
                                         <Dropdown.Item href="#/action-1" >
                                             <div className="statusdropmenu2" >
                                             <div className="pipelinePad">abt009 &nbsp; <span className="pipelinePad">Exp: 20-Mar-2021</span> &nbsp;</div>
                                            <div className="pipelinePad">abt008 &nbsp; <span className="pipelinePad">Exp: 20-Mar-2021</span> &nbsp;</div>
                                            <div className="pipelinePad">abt878 &nbsp; <span className="pipelinePad" >Exp: 20-Mar-2021</span> &nbsp;</div>
                                            <div className="pipelinePad">abt009 &nbsp; <span className="pipelinePad">Exp: 20-Mar-2021</span> &nbsp;</div>
                                            <div className="pipelinePad">abt879 &nbsp; <span className="pipelinePad">Exp: 20-Mar-2021</span> &nbsp;</div>

                                             </div>
                                             
                                         </Dropdown.Item>
                                         
                                     </Dropdown.Menu>
                                 </Dropdown>
                                 
                             </div>

                             
            </div>
        )
    }
}

export default Cartdeopdown