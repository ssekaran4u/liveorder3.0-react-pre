import React, { Component } from 'react'

import { Dropdown , Form} from 'react-bootstrap'

class MultipleSelectBox extends Component{
    constructor(props){
        super(props)
        this.state={
            selectedName:[]
        }
        this.onChangeFavorite = this.onChangeFavorite.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    onChangeFavorite(event){
      // console.log(event.target.checked, event.target.name);
    }
    handleChange(event) {
        const {name, value, type, checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
      //  console.log(event.target.checked, event.target.name);
        this.state.selectedName.push(event.target.name)
        
    }
    handleSubChange(event){
        const {name,type,checked} = event.target
        type === "checkbox" ? this.setState({[name]:checked}) : this.setState({[name]:value })
        
    }
    render(){
        return(
            <div>
                <Dropdown className="multiple-dropdown">
                    <Dropdown.Toggle id="dropdown-basic">
                        <input placeholder="search & select" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Form>
                            <div className="multiple-dropdown-item"> 
                                <Form.Check 
                                    custom
                                    type="checkbox"
                                    id="checkbox1"
                                    label="Atmax 500 mg"
                                    className="mb-2"
                                    name="Atmax 500 mg"
                                    onChange={this.handleChange} 
                                />
                                <ul>
                                    <li>
                                        <Form.Check 
                                            custom
                                            inline
                                            type="checkbox"
                                            id="checkbox2"
                                            label="Prescriber"
                                            className="mb-2"
                                            name="Prescriber"
                                            onChange={this.handleSubChange} 
                                        />
                                        <Form.Check 
                                            custom
                                            inline
                                            type="checkbox"
                                            id="checkbox3"
                                            label="Non prescriber"
                                            className="mb-2"
                                            name="Non Prescriber"
                                            onChange={this.handleSubChange} 
                                        />
                                    </li>
                                    <li>
                                        <Form.Check 
                                            custom
                                            inline
                                            type="checkbox"
                                            id="checkbox4"
                                            label="Convert"
                                            className="mb-2"
                                            name="Convert"
                                            onChange={this.handleSubChange} 
                                        />
                                        <Form.Check 
                                            custom
                                            inline
                                            type="checkbox"
                                            id="checkbox5"
                                            label="Others"
                                            className="mb-2"
                                            name="Others"
                                            onChange={this.handleSubChange} 
                                        />
                                    </li>
                                </ul>
                            </div>
                            <div className="multiple-dropdown-item"> 
                                <Form.Check 
                                    custom
                                    type="checkbox"
                                    id="checkbox6"
                                    label="Cmax 300 mg"
                                    className="mb-2"
                                    name="Cmax 300 mg"
                                    onChange={this.handleChange} 
                                />
                            </div>
                            <div className="multiple-dropdown-item"> 
                                <Form.Check 
                                    custom
                                    type="checkbox"
                                    id="checkbox7"
                                    label="Cmax 300 mg"
                                    className="mb-2"
                                    name="Cmax 300 mg"
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="multiple-dropdown-item"> 
                                <Form.Check 
                                    custom
                                    type="checkbox"
                                    id="checkbox8"
                                    label="Cmax 300 mg"
                                    className="mb-2"
                                    name="Cmax 300 mg"
                                    onChange={this.handleChange}
                                />
                            </div>
                        </Form>
                    </Dropdown.Menu>
                </Dropdown>
                <div className="selectedDiv">
                {this.state.selectedName.map((value) =>{return <span className="selectedDropdown">{value}<img src="../public/assets/images/close2.png" /></span>
          
        })}
                </div>
            </div>
        )
    }
}

export default MultipleSelectBox;