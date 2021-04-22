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
class UserIdDropdown1 extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e,data){ 
        const fsname = data.value
        this.props.getuserid1(fsname)
    }
    render(){ 
        const { data } = this.props
        
        if(!data)
            return null
         let options=[]
         options.push({
            "key"   :'-999',
            "text"  :'Select',
            "value" :'-999',
            
        })
        data.map(data => {
            options.push({
                    "key"   :data[Object.keys(data)[0]],
                    "text"  :data[Object.keys(data)[1]],
                    "value" :data[Object.keys(data)[0]],
                    
                })
            })
        return(
            <div className="sfa-search-dropdown">
                <Dropdown placeholder='Select' onChange={this.handleChange} 
                placeholder=" Select"
                text={this.state.defvalue} search fluid selection options={options} />
            </div>
        )
    }
}
export default UserIdDropdown1