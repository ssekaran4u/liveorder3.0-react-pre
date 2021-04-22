import React,{Component} from 'react'
import {Row,Col} from 'react-bootstrap';
import {NavLink} from 'react-router-dom'
class  SiteMap extends Component{
    constructor(props) {
       super(props);
        this.state = {
          

       };
    }
    handleMaster(){
       // console.log(this.props.childmenu)
    }
    
    render(){
        return(
            <div className="sitedropmenu ">
                <div className='masterDiv'>
                    <Row >
                        <Col lg={4} md={4}>
                            <NavLink  exact={true} to='/MasterList'>
                                <div  className="headMenuImg"><img src="../public/assets/images/mastericon.svg" onClick={this.handleMaster.bind(this)} /></div>
                                <div className="headmenuIconText">All Master</div>
                            </NavLink>
                        </Col>
                        <Col lg={4} md={4}>
                            <NavLink  exact={true} to='/MasterList'>
                                <div  className="headMenuImg"><img src="../public/assets/images/customer_list.png" /></div>
                                <div className="headmenuIconText width100">Customer Lists</div>
                            </NavLink>
                        </Col>
                        <Col lg={4} md={4}>
                            <NavLink  exact={true} to='/MasterList'>
                                <div  className="headMenuImg"><img src="../public/assets/images/visit_related.svg" /></div>
                                <div className="headmenuIconText width100">Visit Related</div>
                            </NavLink>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4} md={4}>
                            <NavLink  exact={true} to='/MasterList'>
                                <div className="headMenuImg"><img src="../public/assets/images/Operational_menu.svg" /></div>
                                <div className="headmenuIconText">Operational</div>
                            </NavLink>
                        </Col>
                        <Col lg={4} md={4}>
                            <NavLink  exact={true} to='/MasterList'>
                                <div  className="headMenuImg"> <img src="../public/assets/images/analysis.svg" /></div>
                                <div className="headmenuIconText">Reports</div>
                            </NavLink>
                        </Col>
                        <Col lg={4} md={4}>
                            <NavLink  exact={true} to='/MasterList'>
                                <div  className="headMenuImg"><img src="../public/assets/images/young-man-with-tie.svg" /></div>
                                <div className="headmenuIconText">HR Module</div>
                            </NavLink>
                        </Col>
                    </Row>
                    <Row >
                            <Col lg={4} md={4}>
                                <NavLink  exact={true} to='/MasterList'>
                                    <div className="headMenuImg"><img src="../public/assets/images/charts.svg" /></div>
                                    <div className="headmenuIconText width100">Sales Report</div>
                                </NavLink>
                        </Col>
                        <Col lg={4} md={4}>
                            <NavLink  exact={true} to='/MasterList'>
                                <div  className="headMenuImg"><img src="../public/assets/images/cogwheels.svg" /></div>
                                <div className="headmenuIconText">Utility</div>
                            </NavLink>
                        </Col>
                        
                    </Row>
                </div>
                <div>
                    <button className='viewAllBtn'>View All</button>
                </div>
            </div>
            );
        }
    
}
export default  SiteMap


