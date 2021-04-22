import React,{Component} from 'react'

class SearchSource extends Component{
    constructor(props){
        super(props)
        this.state={
           value:''
        }
        this.handleSearch = this.handleSearch.bind(this)
        // this.searchKEY=this.searchKEY.bind(this)
        
    }

    // searchKEY(){
    //     alert('kunal')
    // }
    handleSearch(event){
        //console.log("data",event.target.value)
        const {value} = event.target
         this.setState({ value: value })
        this.props.getSearchDatas(value)

       
    }


    componentDidUpdate(oldprops,newstate){

        if(oldprops.clear!=this.props.clear){
            this.setState({value:''})
        }
    }
    render(){
        return(
                <div className="searchBox">
                    <input 
                        placeholder="Search for an identity (Ex. Doctor Name, chemist, Stockist, Hospital etc.)"  
                        onChange={this.handleSearch} 
                        // onFocus={this.searchKEY}
                        value={this.state.value} 
                    />
                </div>
                )
    }
    
}
export default SearchSource
