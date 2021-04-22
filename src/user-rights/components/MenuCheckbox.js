
import React,{Component} from 'react'
import { Form} from 'react-bootstrap'


class MenuCheckbox extends Component{
    constructor(props){
        super(props)
       this.state={
           parent:false
           
       }
       this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(){ 
       
        const {name,id,checked} = event.target;
       
       
        if(checked == false){
            
            const itemid = event.target.id
            const aid = itemid.split("$");
           // console.log("pid",this.props.Selectcheck)
        //    console.log("false",aid)
           
            Object.keys(this.props.Selectcheck).reduce((p,item,n)=>{
                this.props.Selectcheck[aid[0]] = false
            })
            
            this.props.getData(aid[0], name, event.target.checked ,this.props.Selectcheck,this.props.dData)
            //aid[0] = false
        }
        if(checked == true){
          //  console.log("true",event.target.checked)
        const itemid = event.target.id
        const aid = itemid.split("$");
        // console.log("false",aid)
        this.props.getData(aid[0], name, checked ,this.props.item,this.props.dData)
        }
    }
    
    render(){ 
    
       
        return(
                <Form.Check 
                    custom
                    inline
                    type="checkbox"
                    className="menutext"
                    checked={this.props.Selectcheck !=undefined ? this.props.Selectcheck[this.props.uid]? 'checked' :'':''  }
                    id={this.props.id}
                    label={this.props.item.name }  
                    name={this.props.item.uid}
                    onChange={this.handleChange}
                    
                   
                />
        )
    }
}
export default MenuCheckbox