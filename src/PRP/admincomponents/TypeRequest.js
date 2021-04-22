import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

class TypeRequest extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
    render() {
      const {
      Details,
      DoctorDet
  } = this.props
        return (
            <div className="palletback pallet2">
                <Row>
                    <Col xs={12}>
                      <div className="pbartitle">
                        {this.props.Details ? this.props.Details.map((item,index) => (
                         <p key={index}>{item.PrpHeadName}</p>
                       )): null}
                      </div>
                    </Col>
                    <Col xl={3} xs={12}>
                      <div className="paralocation-prp">
                        PRP Number
                      </div>
                      <div className="valu2">
                        <p className="typereq">{this.props.srNo}</p>
                      </div>
                    </Col>
                    <Col xl={3} xs={12}>
                      <div className="paralocation-prp">
                        PRP Name
                      </div>
                      <div className="valu2">
                      {this.props.Details ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.prpname}</p>
                       )): null}
                      </div>
                    </Col>
                    <Col xl={3} xs={12}>
                      <div className="paralocation-prp">
                      Requested Date
                      </div>
                      <div className="valu2">
                      {this.props.Details ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.d_PostedDate}</p>
                       )): null}
                      </div>
                    </Col>
                    <Col xl={3} xs={12}>
                      <div className="paralocation-prp">
                        PRP Date
                      </div>
                      <div className="valu2">
                      {this.props.MandatoryVisiblesetup[0].prpdatevisiblity == '1' ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.d_PrpDate}</p>
                       )): "--"}
                      </div>
                    </Col>
                </Row>
                <Row>
                  <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Topic
                    <span className="colorRed">*</span>
                  </div>
                  <div className="valu2">
                  {this.props.Details ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.topicName}</p>
                       )): null}
                  </div>
                  </Col>
                  <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Subarea <span className="colorRed">*</span>
                  </div>
                  <div className="valu2">
                  {this.props.Details ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.Subarea}</p>
                       )): null}
                  </div>
                  </Col>
                  <Col xl={6} xs={12}>
                  <div className="paralocation-prp">
                    Doctors Attended <span className="colorRed">*</span>
                  </div>
                  <div className="valu2 flexwrap">
                    {this.props.DoctorDet ? this.props.DoctorDet.map((item, index) => (
                      <span key={index} className="selectedDropdown">{item.C_Name}
                      </span>
                    ))
                    : null}
                  </div>
                  </Col>
                </Row>
                <Row>
                  <Col xl={3} xs={12}>
                    <div className="paralocation-prp">
                      Venue
                      {/* <span className="colorRed">*</span> */}
                    </div>
                    <div className="valu2">
                    {this.props.Details[0].venue ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.c_venue}</p>
                       )): "--"}
                    </div>
                  </Col>
                  <Col xl={3} xs={12}>
                    <div className="paralocation-prp">
                      Total Expected No Of Doctors
                      {this.props.MandatoryVisiblesetup[0].attendeesvisiblity == '1' && this.props.MandatoryVisiblesetup[0].attendeesMan == '1' ?
                      <span className="colorRed">*</span> : null}
                    </div>
                    <div className="valu2">
                    {this.props.Details ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.TotexpnoofDoctors}</p>
                       )): null}
                    </div>
                  </Col>
                  <Col xl={3} xs={12}>
                    <div className="paralocation-prp">
                      Category Of Dr. Going To Attend PRP
                      <span className="colorRed">*</span>
                    </div>
                    <div className="valu2">
                    {this.props.Details ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.Categoryofdoc}</p>
                       )): null}
                    </div>
                  </Col>
                  <Col xl={3} xs={12}>
                    <div className="paralocation-prp">
                        Minimum Attendance
                        {this.props.MandatoryVisiblesetup[0].attendeesvisiblity == '1' && this.props.MandatoryVisiblesetup[0].attendeesMan == '1'?
                        <span className="colorRed">*</span> : null}
                    </div>
                    <div className="valu2">
                    {this.props.MandatoryVisiblesetup[0].attendeesvisiblity == '1' ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.MinimumAttendance}</p>
                       )): "--"}
                    </div>
                  </Col>
                </Row>
                <Row>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                      Invited Speaker Name
                      {this.props.MandatoryVisiblesetup[0].speakervisiblity == '1' && this.props.MandatoryVisiblesetup[0].speakerMan == '1' ? 
                      <span className="colorRed">*</span> : null}
                  </div>
                  <div className="valu2">
                  {this.props.MandatoryVisiblesetup[0].speakervisiblity == '1' ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.InvitedSpeakername}</p>
                       )): "--"}
                  </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Doctors Expected To Attend 
                    {this.props.MandatoryVisiblesetup[0].attendeesvisiblity == '1' && this.props.MandatoryVisiblesetup[0].attendeesMan == '1' ?
                      <span className="colorRed">*</span> : null}
                    {/* <span className="colorRed">*</span> */}
                  </div>
                  <div className="valu2">
                  {this.props.MandatoryVisiblesetup[0].attendeesvisiblity == '1' ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.TotexpnoofDoctors}</p>
                       )): "--"}
                  </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                      Location
                      {this.props.MandatoryVisiblesetup[0].locationvisiblity == '1' && this.props.MandatoryVisiblesetup[0].locationMan == '1' ?
                      <span className="colorRed">*</span> : null}                   
                  </div>
                  <div className="valu2">
                  {this.props.MandatoryVisiblesetup[0].locationvisiblity == '1'  ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.location}</p>
                       )): "--"}
                  </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                      HQ
                    <span className="colorRed">*</span>
                  </div>
                  <div className="valu2">
                  {this.props.Details ? this.props.Details.map((item,index) => (
                        <p key={index} className="typereq">{item.areaname}</p>
                       )): null}
                  </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                      Division
                    <span className="colorRed">*</span>
                  </div>
                  <div className="valu2">
                  {this.props.Details ? this.props.Details.map((item,index) => (
                    <p key={index} className="typereq">{item.division}</p>
                  )): null}
                  </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Requested FS
                    {/* <span className="colorRed">*</span> */}
                  </div>
                  <div className="valu2">
                  {this.props.Details ? this.props.Details.map((item,index) => (
                    <p key={index} className="typereq">{item.fsname}</p>
                  )): null}
                  </div>
                </Col>
              </Row>
            </div>
        );
    }
}
export default TypeRequest;