import React,{Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import {postToServer} from '../../lib/comm-utils'

class Designation extends Component{
    constructor(props){
        super(props)
        this.state={
            defvalue:'Select',
            data:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.getdesignation=this.getdesignation.bind(this)
    }

    handleChange(e,data){ 
        const droptype = data.value
        const dropvalue  = data.options.text
        this.setState({defvalue:dropvalue});
        this.props.getDeg(droptype)
    }

    componentDidMount() {
        this.getdesignation()
    }


    getdesignation(){
        let desc
      
        var data = {"index":"Menudetails"}
        
        postToServer("UserRight", data).then((result)=> { 
            
            if(result){ 
                this.setState({
                    data:result.data.Deg,
                })
                
            }

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )
        
    }
   
    render(){
        const { data } = this.state
        let options=[] 
        if(data)
           {


            options.push({
                "key"   :'-1',
                "text"  :'Please Select Designation',
                "value" :'-1',
                
            })
            // data.map(data => {
              
            //     })
        
        data.map(data => {
            options.push({
                    "key"   :data[Object.keys(data)[1]],
                    "text"  :data[Object.keys(data)[1]],
                    "value" :data[Object.keys(data)[0]],
                    
                })
            })
        }
       
        return(
            <div className="singledropdown dcrStay userightDrop">
                <Dropdown placeholder='Select' onChange={this.handleChange} text={this.state.defvalue} fluid selection options={options} />
            </div>
        )
    }
}
export default Designation