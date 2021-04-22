import React, { Component } from 'react'

class SearchDoctor extends Component{
    
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
        this.props.getSearchData(value)
    }

    componentDidUpdate(oldprops,newstate){
        if (oldprops.clear!=this.props.clear) {
            this.setState({value:''})
        }
    }

    render(){
        return(
            <div className="searchBox">
                <input 
                    placeholder="Search for an identity (Chemist Name)"  
                    onChange={this.handleSearch} 
                    value={this.state.value} />
            </div>
        )
    }
}

export default SearchDoctor
