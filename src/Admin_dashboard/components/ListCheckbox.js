
import React,{Component} from 'react'
import { Form} from 'react-bootstrap'


class ListCheckbox extends Component{
    constructor(props){
        super(props)
       this.state={
           parent:false
           
       }
       this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(){ 
       
        const {name,id,checked,value} = event.target;
       
       
        if(checked == false){
            
            const itemid = event.target.id
           // const aid = itemid.split("$");
           // console.log("pid",this.props.Selectcheck)
        //    console.log("false",aid)
           
            Object.keys(this.props.Selectcheck).reduce((p,item,n)=>{
                this.props.Selectcheck[itemid] = false
            })
            
            this.props.getData(itemid, name, event.target.checked ,this.props.Selectcheck,value)
            //aid[0] = false
        }
        if(checked == true){
          //  console.log("true",event.target.checked)
        const itemid = event.target.id
       // const aid = itemid.split("$");
        // console.log("false",aid)
        this.props.getData(itemid, name, checked ,this.props.item,value)
        }
    }
    
    render(){ 
    
       
        return(
                <Form.Check 
                    custom
                    inline
                    type="checkbox"
                    className="unlockcheckbox"
                    checked={this.props.Selectcheck !=undefined ? this.props.Selectcheck[this.props.id]? 'checked' :'':''  }
                    id={this.props.id}
                    label={this.props.item.fscode }  
                    name={this.props.item.id}
                    value={this.props.item.DATE}
                    onChange={this.handleChange}
                    
                   
                />
        )
    }
}
export default ListCheckbox