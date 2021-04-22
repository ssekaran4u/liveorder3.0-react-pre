import React, { Component } from 'react'
import { Modal, Form, Row, Col } from 'react-bootstrap'

class ViewDetailsPopUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date,
      data: [],
      dwrno: '',
      feedback: '',
      expcode: '',
      expenseAmt: '',
      expDeatils: '',
      finalvalues: {},
      show: true,
      errorMsgState: false,
      subarray: [],
      dcrNo: '',
      msg: '',
      Editmodedata: [],
      subareaupdate: '',
      Butndisable: false,
      Requested: ""

    }


  }
  render() {
    //  console.log("fhfhfhfhfh",this.props)
    let subarea = "", subarea1 = ""
    if (this.props.viewDetailsData.Selected_Subarea != undefined) {
      let length = this.props.viewDetailsData.Selected_Subarea.length
      if (length == 1) {
        this.props.viewDetailsData.Selected_Subarea.map(ele => {
          subarea = subarea + ele.C_Name
        })
      } else {
        for (let i = 0; i < length - 1; i++) {
          subarea = subarea + this.props.viewDetailsData.Selected_Subarea[i].C_Name + ","
          subarea1 = this.props.viewDetailsData.Selected_Subarea[i + 1].C_Name
        }
      }
      //  console.log("subarea",subarea,subarea1)
    }

    return (
      <div className="otherActivityModal">
        <Modal centered size="lg" show={this.state.show} >
          <Form>
            <Modal.Header className="plan-this-task">
              <Modal.Title className="modalTitle">Campaign Request <span className="modalCancelBtn">
                <img src="../public/assets/images/cancel.png" onClick={this.props.onClose} /></span>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="otherAc">
              <div className="singledropdown mb-2">
                <Row className="padBottom20">
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <Form.Label className="customized-label">Requested By:</Form.Label>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <span className="details-input">{this.props.viewDetailsData.Headlist[0].RequestedBy}</span>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <Form.Label className="customized-label">Requested Date:</Form.Label>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <span className="details-input">{this.props.viewDetailsData.Headlist[0].ReqDate}</span>
                  </Col>
                </Row>
                <Row className="padBottom20">
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <Form.Label className="customized-label">Note:</Form.Label>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <span className="details-input">{this.props.viewDetailsData.Headlist[0].Note}</span>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <Form.Label className="customized-label">No.Of Doctors:</Form.Label>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <span className="details-input">{this.props.viewDetailsData.Headlist[0]["No-Doc"]}</span>
                  </Col>
                </Row>
                <Row className="padBottom20">
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <Form.Label className="customized-label">Status:</Form.Label>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <span className="details-input">{this.props.viewDetailsData.Headlist[0].status}</span>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <Form.Label className="customized-label">Approved By:</Form.Label>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <span className="details-input">{this.props.viewDetailsData.Headlist[0].Approver}</span>
                  </Col>
                </Row>
                <Row className="padBottom20">
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <Form.Label className="customized-label">Approved Date:</Form.Label>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <span className="details-input">{this.props.viewDetailsData.Headlist[0].AppDate}</span>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <Form.Label className="customized-label">Approved Note:</Form.Label>
                  </Col>
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <span className="details-input">{this.props.viewDetailsData.Headlist[0].appnote}</span>
                  </Col>
                </Row>
                <Row className="padBottom20 mt-10">
                  <Col lg={3} md={3} sm={12} xs={12}>
                    <Form.Label className="customized-label">Campaign<span className="colorRed">*</span></Form.Label>
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Form.Control type="text" className="customized-input" value={this.props.viewDetailsData.Head[0].CampaignName} />
                  </Col>
                </Row>
                <Row className="padBottom20 mt-10">
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <Form.Label className="customized-label">FS List<span className="colorRed">*</span></Form.Label>
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <Form.Control type="text" className="customized-input" value={this.props.viewDetailsData.Head[0].FsName} />
                  </Col>
                </Row>
                <Row className="padBottom20 mt-10">
                  <Col lg={3} md={3} sm={6} xs={6}>
                    <Form.Label className="customized-label">SubArea<span className="colorRed">*</span></Form.Label>
                  </Col>
                  <Col lg={6} md={6} sm={12} xs={12}>
                    <span className="details-input">{subarea + subarea1}</span>
                  </Col>
                </Row>
              </div>
            </Modal.Body>
          </Form>
        </Modal>
      </div>
    );
  }
}
export default ViewDetailsPopUp;

