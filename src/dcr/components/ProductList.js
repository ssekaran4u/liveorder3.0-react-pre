import React,{Component} from 'react'
import { Dropdown } from 'semantic-ui-react'

class ProductList extends Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        let options=[{
            "key"   :"01",
            "text"  :"Product1",
            "value" :"1",
            
        },
        {
            "key"   :"02",
            "text"  :"Product2",
            "value" :"2",
            
        },
        {
            "key"   :"03",
            "text"  :"Product3",
            "value" :"3",
            
        }] 
        if(this.state.staydata)
            {
                options.push({
                    "key"   :"-1",
                    "text"  :"Please Select Stay At ",
                    "value" :"-1",
                    
                })
            this.state.staydata.map(data => {
            options.push({
                    "key"   :data[Object.keys(data)[0]],
                    "text"  :data[Object.keys(data)[1]],
                    "value" :data[Object.keys(data)[0]],
                    
                })
            })
        }
        return(
            <div className="singledropdown dcrStay userightDrop">
                <Dropdown placeholder='Select' 
                onChange={this.handleChange} 
                // value={this.props.stayAutoFlag == "1" ? this.props.defaultHq :this.state.defvalue} 
                value={this.state.hqvalue}
                search fluid selection options={options} />
            </div>
        )
    }
}

export default ProductList