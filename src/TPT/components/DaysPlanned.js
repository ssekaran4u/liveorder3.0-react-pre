import React, { Component } from 'react';
import DaysPlannedList from './DaysPlannedList';
// import {getplanDays} from '../../actions/STP'
import {connect} from 'react-redux'

class TargetVsPlanned extends Component {
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
    const header = [{prop:'Category',title:'Category'}]
    let body = []
    let dayplan ={}
    let sum = 0
    dayplan["Category"] = <div className="boldV">Days</div>
    {this.props.days ? this.props.days.map((item) =>{

        header.push({
            prop:item.Type,
            title:item.Type
        })
        dayplan[item.Type] = item.Visit
        sum = parseInt(sum) + parseInt(item.Visit)
    }):null}
    body.push(dayplan)
        return (
            <React.Fragment>
                    <div className="targetHeader">
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

const mapStateToProps = state =>({
    // days:state.STP.days
})

const mapDispatchToProps = dispatch =>({
    // getplanDays:data => dispatch(getplanDays(data))
})

export default connect(mapStateToProps,mapDispatchToProps)(TargetVsPlanned);