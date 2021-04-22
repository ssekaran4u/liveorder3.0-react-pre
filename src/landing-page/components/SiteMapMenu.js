import React,{Component} from 'react'
import {Row,Col} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
import MenuPopup from '../popups/MenuPopup'

class  SiteMapMenu extends Component{
    constructor(props) {
       super(props);
        this.state = {
          showModal:false,
          hideModal:false,
          id:''
          
       };
       this.handleMaster = this.handleMaster.bind(this)
    }
    handleMaster(event){ 
         const {id} = event.target
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
    render(){
        return(
            <div className="sitedropmenu ">
                
                <div className='masterDiv'>
                    <Row >
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
                    <Row >
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
                    <button className='viewAllBtn' onClick={this.handleMaster.bind(this)}>View All</button>
                </div>
                <MenuPopup show={this.state.showModal} itemId={this.state.id} onHide={this.closeSuccessPopup.bind(this)} />
            </div>
            );
        }
    
}
export default  SiteMapMenu


