import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import "../../../public/assets/css/prpstyle.css"
class ExpDetails extends Component {
    render() {
      const {
        Details,
        DoctorDet      
    } = this.props
        return (
            <div className="palletback pallet2">
                <Row>
                    <Col xs={12}>
                      {this.props.Details ? this.props.Details.map((item,index) => (
                        <div key={index} className="pbartitle">
                        <p>PRP Type Request({item.prpname})</p>
                      </div>
                      )) : null}
                    </Col>
                    <Col xl={3} xs={12}>
                        <div className="paralocation-prp">
                          PRP Number
                        </div>
                        <div className="valu2">  
                        {this.props.Details.map ((item,index) => (
                            <div  key={index} className="typereq">
                              {item.n_srno ? <span>{item.n_srno}</span>
                              : item.c_PrpCode ? <span>{item.c_PrpCode}</span> :
                              null}
                            </div>
                          ))}                      
                           {/* {this.props.Details ? this.props.Details.map((item,index)=>(
                            <div key={index} className="typereq">                            
                              <span>{item.n_srno}</span>
                            </div>
                            )): null}                        */}
                        </div>
                    </Col>
                    <Col xl={3} xs={12}>
                        <div className="paralocation-prp">
                          PRP Name
                        </div>
                        <div className="valu2">
                          {this.props.Details ? this.props.Details.map((item,index)=>(
                            <div key={index} className="typereq">                            
                              <span>{item.prpname}</span>
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
                            <span>{item.RequestedDate}</span>
                          </div>
                          )): null}
                      </div>
                    </Col>
                    <Col xl={3} xs={12}>
                        <div className="paralocation-prp">
                          PRP Date
                        </div>
                        <div className="valu2">
                          {this.props.Details ? this.props.Details.map((item,index)=>(
                            <div key={index} className="typereq">                            
                              <span>{item.PrpDate}</span>
                            </div>
                            )): null}
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
                      <div key={index}>                            
                        <span className="SubArea">{item.SubareaName}</span>
                      </div>
                    )): null}
                  </div>
                  </Col>
                  <Col xl={6} xs={12}>
                  <div className="paralocation-prp">
                    Doctors Attended <span className="colorRed">*</span>
                  </div>
                  <div className="value2 flexwrap">
                    {this.props.DoctorDet ? this.props.DoctorDet.map((item, index) => (
                      <span key={index} className="selectedDropdown">{item.DrName}
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
                      {this.props.Details ? this.props.Details.map((item,index)=>(
                        <div key={index} className="typereq">                            
                          <span>{item.Venue}</span>
                        </div>
                        )): null}
                    </div>
                  </Col>
                  <Col xl={3} xs={12}>
                    <div className="paralocation-prp">
                        No Of Dr's Attended
                      <span className="colorRed">*</span>
                    </div>
                    <div className="valu2">
                    {this.props.Details ? this.props.Details.map((item,index)=>(
                      <div key={index} className="typereq">                            
                        <span>{item.MinimumAttendance}</span>
                      </div>
                        )): null}
                    </div>
                  </Col>
                  <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                      Speaker Name
                    <span className="colorRed">*</span>
                  </div>
                  <div className="valu2">
                    <div className="typereq">
                      <div className="typereq">{this.props.Details ? this.props.Details.map((item,index)=>(
                      <div key={index}>                            
                        <span>{item.c_Speaker}</span>
                      </div>
                        )): null}</div>
                      </div>
                  </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                  Requested By
                    {/* <span className="colorRed">*</span> */}
                  </div>
                  <div className="valu2">
                    <div className="typereq">
                      <div className="typereq">{this.props.Details ? this.props.Details.map((item,index)=>(
                      <div key={index}>                            
                        <span>{item.RequestedFsname}</span>
                      </div>
                        )): null}</div>
                      </div>
                  </div>
                </Col>
                </Row>
            </div>
        );
    }
}
export default ExpDetails;