import React,{Component} from 'react'

class SearchInput extends Component{
    constructor(props){
        super(props)
        this.state={
           value:''
        }
        this.handleSearch = this.handleSearch.bind(this)
        
    }
    handleSearch(event){ 
        let filteredSuggestions
        const {value } = event.target
        this.setState({ value: event.target.value })
        if(this.props.compVal == "productDetail" || this.props.compVal == "samples"){ 
        filteredSuggestions = this.props.data.filter(
                                                suggestion => suggestion.c_name.toLowerCase().indexOf(value.toLowerCase()) > -1
                                    );
        }else if(this.props.compVal == "POB"){
           filteredSuggestions = this.props.data.filter(
                                                suggestion => suggestion.nm.toLowerCase().indexOf(value.toLowerCase()) > -1
                                    ); 
        }else if(this.props.compVal == "joint"){ 
            filteredSuggestions = this.props.data.filter(
                                                suggestion => suggestion.desg.toLowerCase().indexOf(value.toLowerCase()) > -1
                                    );
        }else if(this.props.compVal == "camp"){
            filteredSuggestions = this.props.data.filter(
                                                suggestion => suggestion.C_Name.toLowerCase().indexOf(value.toLowerCase()) > -1
                                    );
                        }
        else if(this.props.compVal == "group"){
            filteredSuggestions = this.props.data.filter(
                                                suggestion => suggestion.C_Name.toLowerCase().indexOf(value.toLowerCase()) > -1
                                    );
                        }
        else if(this.props.compVal == "groupactive"){
            filteredSuggestions = this.props.data.filter(
                                                suggestion => suggestion.NAME.toLowerCase().indexOf(value.toLowerCase()) > -1
                                    );
                        }
        this.setState({

        },this.props.update(filteredSuggestions))
    }
    
    
    render(){ 
        return(
                <div className="dcrInput">
        {this.props.compVal == "joint" ? 
            <input 
                placeholder="Select worked With"  
                onChange={this.handleSearch} 
                value={this.state.value} 
                       
            /> :
            this.props.compVal == "RCPA" ? 
             <input 
                placeholder="Select or Search"  
                onChange={this.handleSearch} 
                value={this.state.value} 

            />:
            this.props.compVal == 'group' ?
            <input 
                placeholder="Select or Search Doctors"  
                onChange={this.handleSearch} 
                value={this.state.value} 

            />:
            this.props.compVal == 'groupactive' ?
            <input 
                placeholder="Select"  
                onChange={this.handleSearch} 
                value={this.state.value} 

            />:
            this.props.compVal == 'report' ?
            <input 
                placeholder="Select Month"  
                onChange={this.handleSearch} 
                value={this.state.value} 

            />:
            this.props.compVal == 'expense' ?
            <input 
            placeholder="Enter Other expense amount in list"  
            onChange={this.handleSearch} 
            value={this.state.value} 

            />:
            <input 
                placeholder="Search & Select products"  
                onChange={this.handleSearch} 
                value={this.state.value} 

            />}
                </div>
                )
    }
}
export default SearchInput
