import React, { Component } from 'react';
import { Row, Col, Breadcrumb, Dropdown, Tab, Tabs } from "react-bootstrap";

import "../../../../public/assets/css/prpstyle.css";
import "../../../../public/assets/css/prpresponsive.css";
import avatar from "../../../../public/assets/images/avatar.png";

class TPMrNameTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'mr1',
        };
    }

    render() {
        return (
            <React.Fragment>

                {/* <div className="maineContent prptab">
        <div>
        <Tabs id="controlled-tab-example" className="dcrtab-req tabhead">
          <Tab eventKey="prp-request-list" title="MR1 NAME">
				  <div className="maineContent">
            tttt
          </div>
          </Tab>
          <Tab eventKey="prp-approved-list" title="MR2 NAME">
            <div className="maineContent">
            ddddddd
            </div>
         </Tab>
        </Tabs>
       </div>
      </div> */}
                <div className="content-spacing body-scroll">
                    <div className="min-height-100">
                        <div className="">
                            <Tabs
                                id="controlled-tab-example"
                                className="dcrtab-req tpmrtabhead"
                                activeKey={this.state.key}
                                onSelect={key => this.setState({ key })}
                            >
                                <Tab eventKey="mr1"  title = "MR1 Name"  >

                                    <div className="maineContent">
                                        tttt
                                     </div>
                                </Tab>
                                <Tab eventKey="mr2" title="MR2 Name">
                                    <div className="maineContent">
                                        eeee
                                     </div>
                                </Tab>

                            </Tabs>

                        </div>
                    </div>
        

                </div>
            </React.Fragment>

        )
    }
}

export default TPMrNameTabs