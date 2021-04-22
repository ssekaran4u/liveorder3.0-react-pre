import React, { Component } from 'react'

import { Form } from  'react-bootstrap'

class DesignationDropdown extends Component{
    render(){
        return(
            <div>
                <h5 className="drop-head">
                    Retrive By Destination
                    <span className="pull-right"><img src="../public/assets/images/refresh.svg" alt="refresh_img" /></span> 
                </h5>
                <Form>
                    <Form.Check 
                        custom
                        type="checkbox"
                        id="checkbox1"
                        label="Medical Representative"
                        className="designation-label"
                    />
                    <Form.Check 
                        custom
                        type="checkbox"
                        id="checkbox2"
                        label="Area Manager"
                        className="designation-label"
                    />
                    <Form.Check 
                        custom
                        type="checkbox"
                        id="checkbox3"
                        label="Regional Manager"
                        className="designation-label"
                    />
                    <Form.Check 
                        custom
                        type="checkbox"
                        id="checkbox4"
                        label="Zonal Manager"
                        className="designation-label"
                    />
                    <Form.Check 
                        custom
                        type="checkbox"
                        id="checkbox5"
                        label="National Sales Head"
                        className="designation-label"
                    />
                    <Form.Check 
                        custom
                        type="checkbox"
                        id="checkbox6"
                        label="Director"
                        className="designation-label"
                    />
                </Form>
            </div>
        )
    }
} 

export default DesignationDropdown