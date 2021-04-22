import React,  { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

function DoctorProfile(props) {
   
    const { docCode,docEmail,docphone,selectedDocName} = props;
    const [doc_email,setEmail] = useState()
    //const [docphone,setPhone] = useState()
    const [doc_phone,setDocPhone] = useState()
    const [docName,setDocName] = useState('')
    const [errorMsg,showMsg] = useState('')

    const handleEmail=()=>{
        const a = event.target.value
        setEmail(a)
    }
    const handlePhone=()=>{
      const re = /^[0-9\b]+$/;
     // if(localStorage.getItem("drphone_Mandatry") ==  "0"){
        const phno =  event.target.value
        if(phno === '' || re.test(phno)){
          if(phno.length > 10){
            // showSuccess(true)
            // getSuccess(false)
            showMsg("Please Enter 10 digit Number only")
            return
          }else{
            setDocPhone(phno)
            showMsg('')
          }
        
       
        // const a = event.target.value
        // setDocPhone(a)
    }
  }
    useEffect(()=>{ 
        let  doc_phone  =  docphone
        let  doc_email = docEmail;
        setDocName(selectedDocName)
       setDocPhone(doc_phone)
       setEmail(doc_email)
    },[docCode,docphone,docEmail,selectedDocName])
    //console.log("sweta",docCode)
    const updateProfile=(code,phone)=>{
      props.profileUpdate(code,phone)
    }
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="expentry-sec"
      >
        <Modal.Header closeButton>
          <Modal.Title className="expentry-headertitle" id="contained-modal-title-vcenter">
            Edit Doctor 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="body-scroll">
            <div className="expentry-body">
                <div>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label className="customized-label">Doc Code:</Form.Label>
                    <span className="docPro">{docCode}</span>
                    {/* <Form.Control 
                        type="text" 
                        className="customized-input"
                        placeholder="Enter Email" 
                        value={doc_email}
                        onChange={()=>handleEmail()}
                    /> */}
                    </Form.Group>
                </div>
                <div>
                  <Form.Group controlId="formBasicEmail">
                  <Form.Label className="customized-label">Doc Name:</Form.Label>
                  <span className="docPro">{docName}</span>
                  </Form.Group>
                </div>
                {/* <div>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label className="customized-label"> Doc Email</Form.Label>
                    <Form.Control 
                        type="text" 
                        className="customized-input" 
                        placeholder="Enter Email" 
                        value={doc_email}
                         onChange={()=>handleEmail()}
                    />
                    </Form.Group>
                </div> */}
                <div>
                    <Form.Group controlId="formBasicEmail">
                    <Form.Label className="customized-label">Doc Phone</Form.Label>
                    <Form.Control 
                        type="text" 
                        className="customized-input" 
                        placeholder="Enter HQ Name" 
                        value={doc_phone}
                         onChange={()=>handlePhone()}
                    />
                    </Form.Group>
                  <div className="MobileerrMsg">{errorMsg}</div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="expentry-btn" onClick={()=>updateProfile(docCode,doc_phone)}>Save</Button>
        </Modal.Footer>
      </Modal>
    );
}

export default DoctorProfile;
  