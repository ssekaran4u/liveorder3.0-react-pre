import React, { Component } from "react";
import { Tabs, Tab, Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddNewChemist from "../components/AddNewChemist";
import ChemistMasterTable from "../components/ChemistMasterTable";
import {
    header,
    body,
    customLabels,
    options
} from "../../testdata/missedreport";
import Footer from "../../landing-page/components/Footer";

class ChemistMaster extends Component {
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
                                Chemist Master
                            </h4>
                        </div>
                        <div>
                            <Breadcrumb className="dcr-breadcrumb">
                                <Breadcrumb.Item>
                                    <Link to="/dashboard">Dashboard</Link>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item href="#">
                                    Master
                                </Breadcrumb.Item>
                                <Breadcrumb.Item active>
                                    Chemist Master
                                </Breadcrumb.Item>
                            </Breadcrumb>
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
                                title="Chemist Master List"
                            >
                                <div className="marginTop">
                                    <ChemistMasterTable
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
                            <Tab eventKey="add new" title="Create New Master">
                                <AddNewChemist />
                            </Tab>
                        </Tabs>
                    </div>
                    <Footer />
                </div>
            </div>
        );
    }
}
export default ChemistMaster;
