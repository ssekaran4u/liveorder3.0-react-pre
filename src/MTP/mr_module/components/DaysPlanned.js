import React, { Component } from 'react';
import DaysPlannedList from './DaysPlannedList';
// import {getplanDays} from '../../actions/STP'


class DaysPlanned extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleTable : false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        // var data= {"index":"Days_Planned","Token":""}
        // this.props.getplanDays(data)
    }

    handleChange() {
        this.setState({
            toggleTable : !this.state.toggleTable
        })
    }

    render() { 
    const header = [{prop:'Category',title:'Visit Type'}]
    let body = []
    let dayplan ={}
    let sum = 0
    dayplan["Category"] = <div className="boldV">Days</div>
    {this.props.plandays ? this.props.plandays.map((item) =>{

        header.push({
            prop:item.name,
            title:item.name
        })
        dayplan[item.name] = item.Num
        sum = parseInt(sum) + parseInt(item.Num)
    }):null}
    body.push(dayplan)
        return (
            <React.Fragment>
                    <div className="target-planned">
                        <div className="dcr-head">
                            <div>
                                <h5>
                                    <div className="touplanhead">Days Planned ({sum} Days)</div>
                                </h5>
                            </div>
                            <div className="dcr-head-options tourShowButton">
                                <button
                                    onClick={this.handleChange}
                                    className="hide-tablehead-btn10"
                                >
                                    {this.state.toggleTable ? "Hide" : "Show"}{" "}
                                    <span className="hide-mobile">Table Content</span>
                                </button>
                            </div>
                        </div>
                        <div className="targetPlannedList">
                        { this.state.toggleTable ?<DaysPlannedList header={header} body={body} /> : null }
                        </div>
                    </div>
            </React.Fragment>
        );
    }
}



export default DaysPlanned;