import React, { Component } from 'react'
import { Form } from 'react-bootstrap'


class SubAreaCheckbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
        const { name, id, checked } = event.target
        if (name == "All") {
            this.props.getsubarea(id, name, true, this.props.item)
        }
        this.props.getsubarea(id, name, checked, this.props.item)
    }

    render() {
        return (
            <div className="text-capital">
                <Form.Check
                    custom
                    type="checkbox"
                    checked={this.props.selection}
                    id={this.props.id}
                    label={this.props.item.C_Name.toLowerCase()}
                    className="mb-2 jointCheck"
                    name={this.props.item.C_Name}
                    onChange={this.handleChange}
                />
            </div>
        )
    }
}
export default SubAreaCheckbox



 // <div className ="row">
 //                  <Col>
 //                   <Form.Check 
 //                    custom
 //                    type="checkbox"
 //                    checked={selection}
 //                    label={item.DoctName + "(" + item.DoctCode + ")"}  
 //                    className="mb-2 jointCheck"
 //                    name={item.DoctName}
 //                   onChange={this.handleChange} 
 //            />
 //             <span className = "designation">{item.C_Qualification}</span>
 //             </Col>
 //              </div>