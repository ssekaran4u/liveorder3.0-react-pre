import React, { Component } from "react";
import { Tabs, Tab } from 'react-bootstrap';
import Others from "./others"
import UserProfile from "./UserProfile";
import {postToServer} from '../../../lib/comm-utils'

class TourPlanMrmodule extends Component {
    constructor(props){
        super(props)
        this.state={
            wrkType:[],
            key: "1",
            data:[],
            selectedKey:{},
            selectedValue:[]
        }
        this.getAllData = this.getAllData.bind(this)
        this.getMandatoryFlag = this.getMandatoryFlag.bind(this)
    }

   
    getAllData(list){ 
        this.setState({
            selectedValue:list
        })
    }
    getMandatoryFlag(data){
        this.props.getDocMandory(data)
    }
    render() { 
        return (
            <React.Fragment>
                <div className="mr-module-doctor-profile">
                <Tabs
                        id="controlled-tab-example"
                        className="dcrtab stptab"
                        activeKey={this.state.key}
                        onSelect={  key =>  this.setState({ key })  } 
                    >
                    {this.props.wrkType.map((typekey, index) => (
                            <Tab
                                key={index}
                                eventKey={typekey.N_Type}
                                title={typekey.C_Name == "Worktype OTHERS"  ? "Other Work Type" :typekey.C_Name.toLowerCase()}
                            >
                               {typekey.C_Name == "Worktype OTHERS" ?  
                                    <Others  
                                        monthCode={this.props.monthCode} 
                                        year={this.props.year}
                                        day={this.props.day}
                                        areaCode={this.props.areaCode}
                                        mtpLock={this.props.mtpLock}
                                       
                                    /> 
                                :typekey.N_Type ==this.state.key ? 
                                    <UserProfile  
                                        n_type={typekey.N_Type} 
                                        day={this.props.day}
                                        month={this.props.month} 
                                        year={this.props.year} 
                                        area={this.props.area}
                                        type={this.props.type}
                                        monthCode={this.props.monthCode}
                                        areaCode={this.props.areaCode}
                                        getAllData={this.getAllData}
                                        selectedValue={this.state.selectedValue}
                                        mtpLock={this.props.mtpLock}
                                        getMandatoryFlag={this.getMandatoryFlag}
                                        mtpType={this.props.mtpType}
                                        CName={typekey.C_Name}
                                        weekday={this.props.weekday}
                                        weekNo={this.props.weekNo}
                                    />
                                :null}
                            </Tab>
                            
                        ))}
                       
                    </Tabs>
                </div>
            </React.Fragment>
        )
    }
}

export default TourPlanMrmodule;