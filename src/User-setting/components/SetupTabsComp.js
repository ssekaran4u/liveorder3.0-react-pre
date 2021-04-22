import React from 'react'
import { Tabs, Tab, Row, Col, Nav } from 'react-bootstrap';
import TransactionLogSetting from '../components/TransactionLogSetting'
import { NavLink } from "react-router-dom";
import {Link} from 'react-router-dom'

const SetupTabsComp=(props)=>{

    return(
        <div className="setupBar">
             <Tab.Container defaultActiveKey="home">
              <Row>
                <Col  lg={3} md={3} sm={3} xs={12} className="rightBor setup-scrollbar ">

                  <Nav variant="pills" className="flex-column pad20">

                    <Nav.Item>
                        <Nav.Link eventKey="home" >
                          <div className="customization_text">
                            <img src="../public/assets/images/control_setup.png" className="imgSize setpImg_pad" />Controls
                          </div>
                          </Nav.Link>
                        </Nav.Item>

                    <Nav.Item>
                        <Nav.Link eventKey="profile">
                          <img src="../public/assets/images/rps_setup.png" className="setpImg_pad" />
                          DCR Block and release
                        </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link eventKey="rcpa">
                          <img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/>
                          RCPA Module
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="rps">
                            <img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/>
                            RPS Module
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="prp">
                            <img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/>
                            PRP Module
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="leave">
                            <img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/>
                            Leave Module
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="mtp">
                            <img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/>
                            Auto MTP Module
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="stp">
                            <img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/>
                            Auto STP Module
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="doctor">
                            <img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/>
                            Update Doctor Request Module
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="expense">
                            <img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/>
                            Expense Module
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="product">
                            <img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/>
                            Products Mandatory
                        </Nav.Link>
                    </Nav.Item>
                    {/* <Nav.Item>
                      <Nav.Link eventKey="TransactionLockSetting"><img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/>Transaction Lock Setting</Nav.Link>
                    </Nav.Item> */}
                  </Nav>

                </Col>
                <Col lg={9} md={9} sm={9} xs={12}>
                  <Tab.Content className="pt20">

                    <Tab.Pane eventKey="home">
                        <div className="conModHead">Controls Setup Module</div>
                        <div className="modulePanel flexDisplay">
                            <div className="moduleDetails">
                                <NavLink to='/control-panel-setting' exact={true}>
                                <div className="panelBox">
                                    <div className="panelImg"><img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/></div>
                                    <div className="panelText">Control Panel Setting</div>
                                </div>
                                </NavLink>
                            </div>
                            {/* <div className="moduleDetails">
                                <div className="panelBox">
                                    <div className="panelImg"><img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/></div>
                                    <div className="panelText">Control Panel Setting</div>
                                </div>
                            </div> */}
                        </div>
                       
                    </Tab.Pane>

                    <Tab.Pane eventKey="profile">
                    <div className="conModHead">DCR Block and Release</div>
                        <div className="modulePanel flexDisplay">
                            <div className="moduleDetails">
                            <NavLink to='/TransactionLogSetting' exact={true}>
                                <div className="panelBox">
                                    <div className="panelImg"><img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/></div>
                                    <div className="panelText">Transaction Lock Setting</div>
                                </div>
                                </NavLink>
                            </div>
                            <div className="moduleDetails">
                                <NavLink to='/dcr-activation' exact={true}>
                                <div className="panelBox">
                                    <div className="panelImg"><img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/></div>
                                    <div className="panelText">DCR Lock Activation</div>
                                </div>
                                </NavLink>
                            </div>
                            <div className="moduleDetails">
                                <NavLink to='/dcr-release' exact={true}>
                                <div className="panelBox">
                                    <div className="panelImg"><img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/></div>
                                    <div className="panelText">DCR Lock Release Option</div>
                                </div>
                                </NavLink>
                            </div>
                        </div>
                    </Tab.Pane>

                    <Tab.Pane eventKey="rcpa">
                        <div className="conModHead">RCPA Module</div>
                        <div className="modulePanel flexDisplay">
                            <div className="moduleDetails">
                                <NavLink to='/rcpa-setup-entry' exact={true}>
                                    <div className="panelBox">
                                        <div className="panelImg"><img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/></div>
                                        <div className="panelText">Comptetior Product Setup</div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="rps">
                        <div className="conModHead">RPS Module</div>
                        <div className="modulePanel flexDisplay">
                            <div className="moduleDetails">
                                <NavLink to='/rps-setting' exact={true}>
                                    <div className="panelBox">
                                        <div className="panelImg"><img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/></div>
                                        <div className="panelText">Setup List Page</div>
                                    </div>
                                </NavLink>
                            </div>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="prp">
                        <div className="conModHead">PRP Module</div>
                        <div className="modulePanel flexDisplay">
                            <div className="moduleDetails">
                            <NavLink to='/prp-setting' exact={true}>
                                <div className="panelBox">
                                    <div className="panelImg"><img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/></div>
                                    <div className="panelText">PRP Report Format</div>
                                </div>
                                </NavLink>
                            </div>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="leave">
                    <div className="conModHead">Leave Module</div>
                        <div className="modulePanel flexDisplay">
                            <div className="moduleDetails">
                            <NavLink to='/leaveapprovelsetup' exact={true}>
                                <div className="panelBox">
                                    <div className="panelImg"><img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/></div>
                                    <div className="panelText">Leave Approval Setup</div>
                                </div>
                                </NavLink>
                            </div>
                            <div className="moduleDetails">
                            <NavLink to='/EscalationMatrix' exact={true}>
                                <div className="panelBox">
                                    <div className="panelImg"><img src="../public/assets/images/rps_setup.png"  className="setpImg_pad"/></div>
                                    <div className="panelText">Escalation Matrix</div>
                                </div>
                                </NavLink>
                            </div>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="mtp">
                      <h5>Contact Info</h5>
                      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="stp">
                      <h5>Contact Info</h5>
                      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="doctor">
                      <h5>Contact Info</h5>
                      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="expense">
                      <h5>Contact Info</h5>
                      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="product">
                      <h5>Contact Info</h5>
                      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                    </Tab.Pane>

                    {/* <Tab.Pane eventKey="TransactionLockSetting">
                      {/* <h5>Contact Infosojan</h5>
                      <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.</p> */}
                      {/* <TransactionLogSetting/>
                    </Tab.Pane> */} 

                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
        </div>
    )
}

export default SetupTabsComp