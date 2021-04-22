import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
class OtherDetails extends Component {
  constructor(props){
    super(props);
      this.state={
      }
  }
  render () {    
    const {
      Details,
      DesignationDet
  } = this.props
    return(
      <div className="palletback pallet2">
        <Row>
          <Col xs={12}>
            {this.props.Details ? this.props.Details.map((item,index) => (
              <div key={index} className="pbartitle">
                <p>Other PRP Type Request({item.prpName})</p>
              </div>
              )) : null}
            </Col>
            <Col xl={3} xs={12}>
              <div className="paralocation-prp">
                PRP Number
              </div>
              <div className="valu2">   
                <div className="typereq">                            
                <span>{this.props.srNo}</span> 
                </div>                                           
              </div>
            </Col>
            <Col xl={3} xs={12}>
              <div className="paralocation-prp">
                Other Type Name
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
                Request Date
              </div>
              <div className="valu2">
              {this.props.Details ? this.props.Details.map((item,index)=>(
                <div key={index} className="typereq">                            
                  <span>{item.d_PostedDate}</span>
                </div>
                )): null}
              </div>
              </Col>
              <Col xl={3} xs={12}>
                <div className="paralocation-prp">
                  Requested By
                </div>
                <div className="valu2">
                {this.props.Details.map ((item,index) => (
                  <div  key={index} className="typereq">
                    {item.fsname ? <span>{item.fsname}</span>
                    : <span>{item.fsname}</span>}
                  </div>
                ))}
                </div>
                </Col>
              <Col xl={3} xs={12}>
                <div className="paralocation-prp">
                  Event Date
                </div>
                <div className="valu2">
                  {this.props.Details ? this.props.Details.map((item,index)=>(
                    <div key={index} className="typereq">                            
                      <span>{item.d_PrpDate}</span>
                    </div>
                    )): null}
                </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Other Topic Name
                  </div>
                  <div className="valu2">
                    {this.props.Details ? this.props.Details.map((item,index)=>(
                      <div key={index} className="typereq">                            
                        <span>{item.c_TopicCode}</span>
                      </div>
                    )): null}
                  </div>
                </Col>
                {/* <Col xl={4} xs={12}>
                    <div className="paralocation-prp">
                        Minimum Attendance
                      <span className="colorRed">*</span>
                    </div>
                    <div className="valu2">
                    {this.props.Details ? this.props.Details.map((item,index)=>(
                      <div key={index} className="typereq">                            
                        <span>{item.MinimumAttendance}</span>
                      </div>
                        )): null}
                    </div>
                  </Col> */}
                  <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Place
                  </div>
                  <div className="valu2">
                    {this.props.Details.map ((item,index) => (
                    <div  key={index} className="typereq">
                      {item.otherPlace ? <span>{item.otherPlace}</span>
                      : <span>{item.otherPlace}</span>}
                    </div>
                    ))}
                  </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Hotel Name
                  </div>
                  <div className="valu2">
                    {this.props.Details.map ((item,index) => (
                    <div  key={index} className="typereq">
                      {item.hotel ? <span>{item.hotel}</span>
                      : <span>{item.hotel}</span>}
                    </div>
                    ))}
                  </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    No Of Attendees In Meeting
                  </div>
                  <div className="valu2">
                    {this.props.Details ? this.props.Details.map((item, index) => (
                      <div key={index} className="typereq">
                        <span>{item.MinimumAttendance}</span>
                      </div>
                    )): null}
                  </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Designation
                  </div>
                  <div className="valu2">
                    {this.props.Details ? this.props.Details.map((item, index) => (
                      <div key={index} className="typereq">
                        <span>{item.designation}</span>
                      </div>
                    )): null}
                  </div>
                </Col>
                </Row>
      </div>
    )  
  }
}
export default OtherDetails;