import React,{Component} from 'react'

class WeekComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            showActiveWeek:false
        }
        this.handleWeek = this.handleWeek.bind(this)
    }
    handleWeek(){
        this.setState({
            showActiveWeek:!this.state.showActiveWeek
        })
        
    }
    render(){
        return(
            <div>
                <div className={this.state.showActiveWeek ? "firtDay activeWeek weekpad" :"firtDay weekpad"} onClick={this.handleWeek} >{this.props.weekdata}</div>
            </div>
        )
    }
}
export default  WeekComponent