import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import {postToServer} from '../../lib/comm-utils';
class Otherdetail extends Component {
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
          {this.props.Details.map ((item,index) => (
            <div  key={index} className="pbartitle">
              {item.Requesteddate ? <p>Other PRP Type Request({item.prpName})</p>
              : <p>Other PRP Type Request({item.prpname})</p>}
            </div>
          ))}
            </Col>
            <Col xl={3} xs={12}>
              <div className="paralocation-prp">
                PRP Number
              </div>
              <div className="valu2">
                {this.props.Details.map ((item,index) => (
                  <div  key={index} className="typereq">
                    {item.n_Srno ? <span>{item.n_Srno}</span>
                    : item.n_srno ? <span>{item.n_srno}</span> :
                    <span>{item.c_PrpCode}</span>}
                  </div>
                ))}
              </div>
            </Col>
            <Col xl={3} xs={12}>
              <div className="paralocation-prp">
                Requested Date
              </div>
              <div className="valu2">
                {this.props.Details.map ((item,index) => (
                  <div  key={index} className="typereq">
                    {item.Requesteddate ? <span>{item.Requesteddate}</span>
                    : <span>{item.RequestedDate}</span>}
                  </div>
                ))}
              </div>
              </Col>
              <Col xl={3} xs={12}>
                <div className="paralocation-prp">
                  Requested By
                </div>
                <div className="valu2">
                {this.props.Details.map ((item,index) => (
                  <div  key={index} className="typereq">
                    {item.c_name ? <span>{item.c_name}</span>
                    : <span>{item.RequestedFsname}</span>}
                  </div>
                ))}
                </div>
                </Col>
              <Col xl={3} xs={12}>
                <div className="paralocation-prp">
                  Event Date
                </div>
                <div className="valu2">
                {this.props.Details.map ((item,index) => (
                  <div  key={index} className="typereq">
                    {item.Eventdate ? <span>{item.Eventdate}</span>
                    : <span>{item.PrpDate}</span>}
                  </div>
                ))}
                </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                  Designation
                  </div>
                  <div className="valu2">
                {this.props.Details.map ((item,index) => (
                  <div  key={index} className="typereq">
                   <span>{item.designation}</span>
                  </div>
                ))}
                </div>
                </Col>
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Other Type Name
                  </div>
                  <div className="valu2">
                    {this.props.Details.map ((item,index) => (
                    <div  key={index} className="typereq">
                      {item.prpName ? <span>{item.prpName}</span>
                      : <span>{item.prpname}</span>}
                    </div>
                    ))}
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
                <Col xl={3} xs={12}>
                  <div className="paralocation-prp">
                    Place
                  </div>
                  <div className="valu2">
                    {this.props.Details.map ((item,index) => (
                    <div  key={index} className="typereq">
                      {item.otherPlace ? <span>{item.otherPlace}</span>
                      : <span>{item.OtherPlace}</span>}
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
                      : <span>{item.c_hotel}</span>}
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
                </Row>
      </div>
    )  
  }
}
export default Otherdetail;