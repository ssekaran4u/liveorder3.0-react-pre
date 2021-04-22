import React, { Component } from 'react'
import { Form } from 'react-bootstrap'


class DcotorListCheckbox extends Component {
   constructor(props) {
      super(props)
      this.handleChange = this.handleChange.bind(this)
   }
    
   handleChange() {
      const { name, id, checked } = event.target
      this.props.getDoctorList(id, name, checked, this.props.item)
      this.props.errorMsg("")
   }

   render() {
      let isAdded = "", disabled = false;
      if (this.props.item.visible == "True" && this.props.item.c_doccode != "" &&  this.props.item.checked == "True"  && this.props.item.n_srNo != "") {
          isAdded = "(Already Added)"
          disabled = true
      } 
      else if(this.props.item.visible == undefined && this.props.item.checked == "True" && this.props.item.c_doccode != "" && this.props.item.n_srNo != "" ){
         isAdded = "(Already Added)"
         disabled = true
      }
      if (this.props.item.disabled == true) {
         disabled = true
      }
      if (this.props.notetxtDisable == true) {
         disabled = true
      }
      if (this.props.approvalNoteDisable == true || this.props.confirmNoteDisable == true) {
         disabled = true
      }
      return (
         <Form className="col-sm-12 col-md-5 col-lg-4 col-xl-4 mt-10 text-capital">
            <Form.Check
               custom
               type="checkbox"
               checked={this.props.selection}
               id={this.props.id}
               label={this.props.item.DoctName.trim().toLowerCase() + "(" + this.props.item.DoctCode + ")" + isAdded}
               className="mb-2 jointCheck doctor-name"
               name={this.props.item.DoctName}
               disabled={disabled}
               onChange={this.handleChange}
            />
            <span className="designation">{this.props.item.C_Qualification}</span>
         </Form>
      )
   }
}
export default DcotorListCheckbox



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