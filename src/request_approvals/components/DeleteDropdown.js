import React,{Component} from 'react'

class DeleteDropdown extends Component{
    constructor(props){
        super(props)
        this.state={
            showDrop:this.props.showDrop
        }
        
        this.handleClick = this.handleClick.bind(this)
        this.showsite = this.showsite.bind(this)
        this.hidesite = this.hidesite.bind(this)
        this.delete = this.delete.bind(this)
        this.cancelItem = this.cancelItem.bind(this)
    }
    handleClick(){
        this.setState({
            showDrop:!this.state.showDrop
        })
    }
    showsite() {
        this.setState({
            showDrop:!this.state.showDrop,
            sitemap: true
        })
    }
    hidesite() {
        this.setState({
            showDrop:!this.state.showDrop,
            sitemap: false
        })
    }
    delete(e,srno,retype,fs){
       this.setState({
            showDrop:!this.state.showDrop,
            
        }) 
        this.props.deleteItem("D",srno,retype,fs)
    }
    cancelItem(e,srno,retype,fs){ 
        this.setState({
            showDrop:!this.state.showDrop,
            
        }) 
        this.props.deleteItem("C",srno,retype,fs)
    }
    
    render(){
        return(
                <div className="tdPosiion" 
                   
                    key={this.props.value}>
                        <div>{this.state.showDrop ? 
                            <div className="menuShow">
                            <div className="delText" onClick={((e) => this.delete(e,this.props.srno,this.props.ReqType,this.props.FS))}>Delete</div>
                            <div className="delText" onClick={((e) => this.cancelItem(e,this.props.srno,this.props.ReqType,this.props.FS))} >Cancel Leave</div></div> : '' }
                                   
                        </div>
                </div>
                )
    }
}
export default DeleteDropdown

