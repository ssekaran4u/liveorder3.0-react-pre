import React, { Component } from "react"

import { Form } from 'react-bootstrap'

import { Dropdown } from "semantic-ui-react"

const options = [
    { key: 'angular', text: 'Angular', value: 'angular' },
    { key: 'css', text: 'CSS', value: 'css' },
    { key: 'design', text: 'Graphic Design', value: 'design' },
    { key: 'ember', text: 'Ember', value: 'ember' },
    { key: 'html', text: 'HTML', value: 'html' },
    { key: 'ia', text: 'Information Architecture', value: 'ia' },
    { key: 'javascript', text: 'Javascript', value: 'javascript' },
    { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
    { key: 'meteor', text: 'Meteor', value: 'meteor' },
    { key: 'node', text: 'NodeJS', value: 'node' },
    { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
    { key: 'python', text: 'Python', value: 'python' },
    { key: 'rails', text: 'Rails', value: 'rails' },
    { key: 'react', text: 'React', value: 'react' },
    { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
    { key: 'ruby', text: 'Ruby', value: 'ruby' },
    { key: 'ui', text: 'UI Design', value: 'ui' },
    { key: 'ux', text: 'User Experience', value: 'ux' },
]


class DivisionDropdown extends Component{
    render(){
        return(
            <div>
                <h5 className="drop-head">
                    Retrive By Division
                    <span className="pull-right"><img src="../public/assets/images/refresh.svg" alt="refresh_img" /></span> 
                </h5>
                <Form>
                    <div className="singledropdown">
                        <Form.Label className="customized-label">Division</Form.Label>
                        <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
                    </div>
                </Form>
            </div>
        )
    }
}

export default DivisionDropdown