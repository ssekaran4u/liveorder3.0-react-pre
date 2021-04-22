import React, { Component } from 'react'
import { Form, Col } from 'react-bootstrap'


class SubareDoctocheckbox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parent: false

        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange() {
        const { name, id, checked } = event.target
        // console.log(id,name,checked,this.props.item,"cccccccc")
        if (name == "All") {
            this.props.getsubarea(id, name, true, this.props.item)

        }
        this.props.getsubarea(id, name, checked, this.props.item)
    }

    render() {
        // console.log(this.props, "props")
        return (

            <div className="text-capital">
                <Form.Check
                    custom
                    type="checkbox"
                    checked={this.props.selection}
                    id={this.props.id}
                    label={this.props.item.value.toLowerCase()}
                    className="mb-2 jointCheck"
                    name={this.props.item.value}
                    onChange={this.handleChange}

                />
            </div>
        )
    }
}
export default SubareDoctocheckbox



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