import React, { Component } from "react";
import { Tabs, Tab, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import Newentry from "../components/Newentry";
import Demolisttable from "../components/Demolisttable";
import {
    header,
    body,
    customLabels,
    options
} from "../components/Demobody";
import Footer from "../../landing-page/components/Footer";

class Demolistcontainer extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: "ChemistList"
        };
    }
    render() {
        return (
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                    <div className="dcr-head">
                        <div>
                            <h4 className="daily-call-report">
                                Employee Details
                            </h4>
                        </div>
                        
                    </div>
                    <div className="dcr-list-sec chemistTab">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={this.state.key}
                            onSelect={key => this.setState({ key })}
                        >
                            <Tab
                                eventKey="ChemistList"
                                title="List"
                            >
                                <div className="marginTop">
                                    <Demolisttable
                                        tableHeader={header}
                                        tableBody={body}
                                        keyName="userTable"
                                        tableClass="striped hover table-responsive"
                                        rowsPerPage={10}
                                        rowsPerPageOption={[10, 15, 20]}
                                        initialSort={{
                                            prop: "username",
                                            isAscending: true
                                        }}
                                        labels={customLabels}
                                    />
                                </div>
                            </Tab>
                            <Tab eventKey="add new" title="new entry">
                                <Newentry />
                            </Tab>
                        </Tabs>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
export default Demolistcontainer;
