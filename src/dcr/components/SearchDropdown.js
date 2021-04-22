import React, {Component} from 'react';
import { Form} from 'react-bootstrap'
//import SearchSubComp from './SearchSubComp'

class SearchDropdown extends Component{
    constructor(props) {
        super(props);
        this.state={
            parent:false
        }
     this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {    
        


      //  console.log(event.target.checked,' i am kunal ')
        const {name,id,checked,value} = event.target
        this.props.getData(id, name, checked,value,this.props.data )
    }
    
   
    render(){ 


       
      return(
            <React.Fragment>
    <div  key={'maindivsearch'+this.props.id} className='flex-row'>
                <Form.Check 
                    custom
                    type="checkbox"
                    checked={ this.props.selection }
                    id={this.props.id}
                    key={this.props.id}
                    label={this.props.item.Dr_Name}
                    className="mb-2  searchinline"
                    name={this.props.item.Dr_Name}
                    value={this.props.type}
                    onChange={this.handleChange}
                   
                />
                <span  key={'spamsearch'+this.props.id} className='SearchResDiv'>{this.props.item.Area}( {this.props.item.DSCASubName }) </span>
                </div>
             <div  key={'divsearch'+this.props.id} className="borderBottom"></div>
            </React.Fragment>
            );
        }
    }
 export default SearchDropdown;