import React,{Component} from 'react'

class DayComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            showActiveDay:false,
            nextplan:{},
            week:''
        }
        this.handleDay = this.handleDay.bind(this)
    }
    handleDay(){ 
    
    if(this.props.weekend == "weekend"){
        this.setState({
                showActiveDay:!this.state.showActiveDay,
               
            })
        this.props.getWeek(this.props.week)
    }
    if(this.props.day == "day"){ 
        this.setState({
            showActiveDay:!this.state.showActiveDay,
           
        })
        this.state.nextplan[this.props.w] = this.props.value;
        this.props.getDay(this.state.nextplan)
    }
    }
    render(){ 
        return(
            <div>
                <div className={this.state.showActiveDay ? "firtDay activeWeek weekpad":"firtDay weekpad"} onClick={this.handleDay} >{this.props.daydata}</div>
            </div>
        )
    }
}
export default  DayComponent