import React,{Component} from 'react'

class DCRSearch extends Component{
    constructor(props){
        super(props)
        this.state={
           value:''
        }
        this.handleSearch = this.handleSearch.bind(this)
        
    }
    handleSearch(event){ 
           let filteredSuggestions
          const values=event.target.value
          this.setState({ value: values })       
          this.props.update(filteredSuggestions,event.target.value)
    }
    
    
    render(){
        return(
                <div>
                    <input 
                        placeholder="search for an identity"  
                        onChange={this.handleSearch} 
                        value={this.state.value} 
                       
                    />
                </div>
                )
    }
}
export default DCRSearch
