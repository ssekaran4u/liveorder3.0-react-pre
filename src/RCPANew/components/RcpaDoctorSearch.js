import React,{Component} from 'react'
import {postToServer} from '../../lib/comm-utils'

class RcpaSearchDoctor extends Component{

    constructor(props){
        super(props)

        this.state={
           value:''
        }

        this.handleSearch = this.handleSearch.bind(this)
    }

    handleSearch(event){
        const {value} = event.target
        this.setState({ value: value })

        var serachdata = {
            "Token":"",
            "save":"DoctorsForRCPA",
            "SearchKey": value
        }
        
        postToServer("DWRSave",serachdata).then( (Result)=>{  
            if(Result.data)
                this.props.getSearchDoc(Result.data)
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App  Docotr Search api" })
        })
    }
    
    componentDidUpdate(oldprops, newstate){
        if(oldprops.clear != this.props.clear){
            this.setState({value:''})
        }
    }

    render(){
        return(
            <div className="dcrInput">
                <input 
                    placeholder="Select Doctor"
                    onChange={this.handleSearch} 
                    value={this.state.value} 
                />
            </div>
        )
    }
}

export default RcpaSearchDoctor