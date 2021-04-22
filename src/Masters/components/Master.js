import React,{Component} from 'react'
import {Tabs, Tab,Breadcrumb} from 'react-bootstrap'
import { Link } from "react-router-dom";
// import AddNewChemist from '../components/AddNewChemist'
import MainMaster from './MainMaster'
// import ChemistMasterList from '../components/ChemistMasterList'

class Master extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            key: 'ChemistList',
        };
    }
    render(){
        return(
             
            <div className="content-spacing">
                <div className="dcr-head">
                    <div>
                        <h4 className="daily-call-report">Chemist Master</h4>
                    </div>
                    <div>
                    <Breadcrumb className="dcr-breadcrumb">
                        <Breadcrumb.Item>
                            <Link to="/dashboard">Dashboard</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="#">Master</Breadcrumb.Item>
                        <Breadcrumb.Item active>Chemist Master</Breadcrumb.Item>
                    </Breadcrumb>
                    </div>
                </div>
                <div className="dcr-list-sec chemistTab">
                    <Tabs
                    id="controlled-tab-example"
                    
                    activeKey={this.state.key}
                    onSelect={key => this.setState({ key })}
                >
                    <Tab eventKey="ChemistList" title="Chemist Master List">
                        <div className="marginTop">
                            {/* <ChemistMasterList /> */}
                        </div>
                        
                    </Tab>
                    <Tab eventKey="add new" title="Create New Master">
                        <MainMaster />
                    </Tab>
                </Tabs>
                </div>
            </div>
            
                );
    }
}
export default Master