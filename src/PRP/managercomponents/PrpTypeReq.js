import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
class prpTypeReq extends Component {
  constructor(props){
    super(props);
      this.state={
      }
  }
    render() {
      const {
        Details,
        DoctorList      
    } = this.props
        return (
            <div className="palletback pallet2">
                <Row>
                    <Col xs={12}>
                      {this.props.Details ? this.props.Details.map((item,index) => (
                        <div key={index} className="pbartitle">
                        <p>PRP Type Request({item.prpName})</p>
                      </div>
                      )) : null}
                    </Col>
                    <Col xl={3} xs={12}>
                        <div className="paralocation-prp">
                          PRP Number
                        </div>
                        <div className="valu2">                        
                           {this.props.Details ? this.props.Details.map((item,index)=>(
                            <div key={index} className="typereq">                            
                              <span>{item.n_Srno}</span>
                            </div>
                            )): null}                       
                        </div>
                    </Col>
                    <Col xl={3} xs={12}>
                        <div className="paralocation-prp">
                          PRP Name
                        </div>
                        <div className="valu2">
                          {this.props.Details ? this.props.Details.map((item,index)=>(
                            <div key={index} className="typereq">                            
                              <span>{item.prpName}</span>
                            </div>
                            )): null}
                        </div>
                    </Col>
                    <Col xl={3} xs={12}>
                        <div className="paralocation-prp">
                        Requested Date
                        </div>
                        <div className="valu2">
                          {this.props.Details ? this.props.Details.map((item,index)=>(
                            <div key={index} className="typereq">                            
                              <span>{item.Requesteddate}</span>
                            </div>
                            )): null}
                        </div>
                    </Col>
                    <Col xl={3} xs={12}>
                        <div className="paralocation-prp">
                          PRP Date
                        </div>
                        <div className="valu2">
                          {this.props.MandatoryVisiblesetup[0].prpdatevisiblity == '1' ? this.props.Details.map((item,index)=>(
                            <div key={index} className="typereq">                            
                              <span>{item.PrpDate}</span>
                            </div>
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
                    {this.props.Details ? this.props.Details.map((item,index)=>(
                      <div key={index} className="typereq">                            
                        <span>{item.topicName}</span>
                      </div>
                      )): null}
                  </div>
                  </Col>
                  <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Subarea <span className="colorRed">*</span>
                  </div>
                  <div className="valu2">
                    {this.props.Details ? this.props.Details.map((item,index)=>(
                      <div key={index} className="typereq">                            
                        <span>{item.Subarea}</span>
                      </div>
                    )): null}
                  </div>
                  </Col>
                  <Col xl={6} xs={12}>
                  <div className="paralocation-prp">
                    Doctors Attended <span className="colorRed">*</span>
                  </div>
                  <div className="value2 flexwrap">
                    {this.props.DoctorList ? this.props.DoctorList.map((item, index) => (
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
                    {this.props.Details[0].venue ? this.props.Details.map((item,index)=>(
                      <div key={index} className="typereq">                            
                        <span>{item.venue}</span>
                      </div>
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
                     {this.props.Details ? this.props.Details.map((item,index)=>(
                        <div key={index} className="typereq">                            
                          <span>{item.TotexpnoofDoctors}</span>
                        </div>
                        )): null}
                    </div>
                  </Col>
                  <Col xl={3} xs={12}>
                    <div className="paralocation-prp">
                      Category Of Dr. Going To Attend PRP 
                      <span className="colorRed">*</span>
                    </div>
                    <div className="valu2">
                    {this.props.Details ? this.props.Details.map((item,index)=>(
                      <div key={index}  className="typereq">                            
                        <span>{item.Categoryofdoc}</span>
                      </div>
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
                    {this.props.MandatoryVisiblesetup[0].attendeesvisiblity == '1' ? this.props.Details.map((item,index)=>(
                      <div key={index} className="typereq">                            
                        <span>{item.MinimumAttendance}</span>
                      </div>
                        )): "--"}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Invited Speaker Name
                    {this.props.MandatoryVisiblesetup[0].speakervisiblity == '1' && this.props.MandatoryVisiblesetup[0].speakerMan == '1' ? 
                    <span className="colorRed">*</span> : null }
                  </div>
                  <div className="valu2">
                    <div className="typereq">
                      <div className="typereq">{this.props.MandatoryVisiblesetup[0].speakervisiblity == '1' ? this.props.Details.map((item,index)=>(
                      <div key={index}>                            
                        <span>{item.InvitedSpeakername}</span>
                      </div>
                        )): "--"}</div>
                      </div>
                  </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Doctors Expected To Attend 
                    {this.props.MandatoryVisiblesetup[0].attendeesvisiblity == '1' && this.props.MandatoryVisiblesetup[0].attendeesMan == '1' ?
                    <span className="colorRed">*</span> : null}
                  </div>
                  <div className="valu2">
                    {this.props.MandatoryVisiblesetup[0].attendeesvisiblity == '1' ? this.props.Details.map((item,index)=>(
                      <div key={index} className="typereq">                            
                        <span>{item.TotexpnoofDoctors}</span>
                      </div>
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
                    <div className="typereq">
                      <div className="typereq">{this.props.MandatoryVisiblesetup[0].locationvisiblity == '1' ? this.props.Details.map((item,index)=>(
                        <div key={index}>                            
                          <span>{item.location}</span>
                        </div>
                        )): "--"}
                        </div>
                    </div>
                  </div>
                </Col>
                <Col xl={3} xs={12}>
                <div className="paralocation-prp">
                Requested By
                </div>
                <div className="valu2">
                  {this.props.Details ? this.props.Details.map((item,index)=>(
                    <div key={index} className="typereq">                            
                      <span>{item.c_name}</span>
                    </div>
                    )): null}
                </div>
              </Col>
              </Row>
              <Row>
              {this.props.Details[0].d_acc_date ? 
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                      Accountable Date
                    <span className="colorRed">*</span>
                  </div>
                  <div className="valu2">
                    <div className="typereq">
                      <div className="typereq">{this.props.Details ? this.props.Details.map((item,index)=>(
                        <div key={index}>                            
                          <span>{item.d_acc_date}</span>
                        </div>
                        )): null}
                        </div>
                    </div>
                  </div>
                </Col>
                : null}
              </Row>
            </div>
        );
    }
}
export default prpTypeReq;