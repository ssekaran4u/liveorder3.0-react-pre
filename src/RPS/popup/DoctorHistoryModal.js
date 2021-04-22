import React,  { useState, useEffect } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import DOcHistoryTable from '../popup/DOcHistoryTable'

function DoctorHistoryModal(props) {
   
   const {docHistoryData} = props
   const [header, setHeader] = useState([])
   const [body, setBody] = useState([])
   const[doc_name,setDocName] = useState('')
   const[doc_quali,setQuali] = useState('')
   const[doc_grade,setGrade] = useState('')
   
   useEffect(() => {
    let header = []
    let body = []

    if(docHistoryData.length >0){
       // docHistoryData.map((item)=>{
           let docname = docHistoryData[0].DoctorName
           let quali = docHistoryData[0].Qualification
           let grade = docHistoryData[0].Grade
           setDocName(docname)
           setQuali(quali)
           setGrade(grade)
       // })
      if(docHistoryData[0]){
     // if(docHistoryData[0]["VisitingMR"]){
        header.push({ prop: "Date", title: "Visit Date", filterable: true})
        header.push({ prop: "VisitingMR", title: "VisitingMR", filterable: true})
        header.push({ prop: "workedwith", title: "workedwith", filterable: true})
     // }
      
      }
      docHistoryData.map(item => {
        
        body.push(item)
      })
    }  
    
    setHeader(header);
    setBody(body)
  }, [docHistoryData])
   const customLabels = {
    first: "<<",
    last: ">>",
    prev: "< Prev",
    next: "Next >",
    show: "Show",
    entries: "items/page",
    filterPlaceholder: "Search Anything",
    noResults: "There is no data to be displayed"
  };
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="expentry-sec"
      >
        <Modal.Header closeButton onClick={props.onHide}>
          <Modal.Title className="expentry-headertitle" id="contained-modal-title-vcenter">
             Doctor  Visit History
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="body-scroll">
            <div className=" ">
                <div className="">
                    {/* <div style={{"margin-bottom":"10px"}}>
                        <div>
                            <span style={{"font-weight":"bold"}}>Doctor Name: </span>
                            <span style={{"font-size":"13px"}}>{doc_name}</span>
                        </div>
                        <div>
                            <span style={{"font-weight":"bold"}}>Doctor Qualification: </span>
                            <span style={{"font-size":"13px"}}>{doc_quali}</span>
                        </div>
                        <div>
                            <span style={{"font-weight":"bold"}}>Doctor Grade: </span>
                            <span style={{"font-size":"13px"}}>{doc_grade}</span>
                        </div>
                    </div> */}
                    <Row style={{"margin-bottom":"10px"}} className="expentry-body">
                        <Col lg={6} md={6} sm={12} xs={12} style={{"margin-bottom":"5px"}}>
                            <div style={{"font-weight":"bold"}}>Doctor Name: </div>
                            <div style={{"font-size":"13px"}}>{doc_name}</div>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <div style={{"font-weight":"bold"}}>Doctor Qualification: </div>
                            <div style={{"font-size":"13px"}}>{doc_quali}</div>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <div style={{"font-weight":"bold"}}>Doctor Grade: </div>
                            <div style={{"font-size":"13px"}}>{doc_grade}</div>
                        </Col>
                    </Row>
                
                 <DOcHistoryTable
                    tableHeader={header}
                    tableBody={body}
                    keyName="RPSListTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={body.length}
                    rowsPerPageOption={[]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels=""
                   
                />
                </div>
            </div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button className="expentry-btn" onClick={()=>updateProfile(docCode,doc_phone)}>Save</Button>
        </Modal.Footer> */}
      </Modal>
    );
}

export default DoctorHistoryModal;
  