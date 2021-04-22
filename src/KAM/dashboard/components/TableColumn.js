import React,{Component} from 'react'

class TableColumn extends Component{
    constructor(props){
        super(props)
        this.state={
            showSubdiv:false
        }
        this.showRowTable = this.showRowTable.bind(this)
    }
    showRowTable(id){
        this.setState({
            showSubdiv:!this.state.showSubdiv
        })
        this.props.showRow(id,this.state.showSubdiv)
    }
    render(){
        return(
            <td>{this.props.price}<span className="priceborder" onClick={()=>this.showRowTable(this.props.id)}><i className={this.state.showSubdiv ? "activepriceBtn" : "priceBtn" } ></i></span></td>		
        )
    }
}
export default TableColumn