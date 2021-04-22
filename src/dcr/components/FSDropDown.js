import React,{Component} from 'react'
import {postToServer} from '../../lib/comm-utils'
import { Dropdown } from 'semantic-ui-react'
// const options = [
//     { key: 'angular', text: 'Angular', value: 'angular' },
//     { key: 'css', text: 'CSS', value: 'css' },
//     { key: 'design', text: 'Graphic Design', value: 'design' },
//     { key: 'ember', text: 'Ember', value: 'ember' },
//     { key: 'html', text: 'HTML', value: 'html' },
//     { key: 'ia', text: 'Information Architecture', value: 'ia' },
//     { key: 'javascript', text: 'Javascript', value: 'javascript' },
//     { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
//     { key: 'meteor', text: 'Meteor', value: 'meteor' },
//     { key: 'node', text: 'NodeJS', value: 'node' },
//     { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
//     { key: 'python', text: 'Python', value: 'python' },
//     { key: 'rails', text: 'Rails', value: 'rails' },
//     { key: 'react', text: 'React', value: 'react' },
//     { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
//     { key: 'ruby', text: 'Ruby', value: 'ruby' },
//     { key: 'ui', text: 'UI Design', value: 'ui' },
//     { key: 'ux', text: 'User Experience', value: 'ux' },
// ]
class FSDropDown extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e,data){ 
        const fsname = data.value

       // alert(fsname)
       if(fsname=="-1"){
        this.props.getfsname("")  
       }else{
        this.props.getfsname(fsname)
       }
      
    }



    componentDidUpdate(oldprops,oldstate){


       
        if(oldprops.data!=this.props.data){

            if(this.props.data!=""){


              
            this.getdivision(this.props.data)
            }
        }
    }

    componentDidMount() {
        this.getdivision("")
    }


    getdivision(Secdata){
      
        
        var data = {"index":"fs_mapped","Data":{"Division":"","Region":"","Desc": Secdata }} 
        postToServer("UserRight", data).then((result)=> { 
            if(result){ 
                this.setState({
                    data:result.data.Data
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
                    "key"   :"-1",
                    "text"  :"Please Select Downline ",
                    "value" :"-1",
                    
                })
        data.map(data => {
            options.push({
                    "key"   :data[Object.keys(data)[0]],
                    "text"  :data[Object.keys(data)[1]],
                    "value" :data[Object.keys(data)[0]],
                    
                })
            })
        }
        return(
            <div className="singledropdown dcrStay userightDrop">
                <Dropdown placeholder='Select' onChange={this.handleChange} text={this.state.defvalue} search fluid selection options={options} />
            </div>
        )
    }
}
export default FSDropDown