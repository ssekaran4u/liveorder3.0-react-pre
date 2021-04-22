import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
import "../../../../public/assets/css/prpstyle.css"

class MrmemberDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            membernum: "",
            memberdaata: [],
        }
        this.onNoChange = this.onNoChange.bind(this)
        this.onTxtChange = this.onTxtChange.bind(this)
    }
    onTxtChange(id, e) {
        let abc = this.state.memberdaata
        this.props.onTxtChange(id,e, abc)
    }
    onNoChange(e) {
        this.setState({ membernum: e.target.value })
        let memberdaata = []
        for (let i = 0; i <e.target.value; i++) {
            memberdaata.push({
                "id": i,
                "value": ""
            })
        }
        this.setState({ memberdaata: memberdaata })
    }
    removename(id) {
        const { memberdaata } = this.state;
        delete memberdaata[id];
        this.setState({
            memberdaata: memberdaata,
        })
      }
    render() {
        return (
            <div className="palletback pallet2 appdetails">
                <Row>
                    <Col xs={12}>
                        <div className="pbartitle">
                            <p>Member Details</p>
                        </div>
                    </Col>
                    <Col xl={12}>
                      {this.props.memberdataerr ?  <p className="daterror-msg">Please Enter Member Details </p> : null}
                      <div className="paralocation-prp team-mbr-meet">
                          No. of Team Member Attending Meeting
                        {/* <span className="colorRed">*</span> */}
                      </div>
                      <div className="value2 input-member-meeting">
                        <input type="number"
                          className="customized-input"
                          onChange={this.onNoChange}
                          disabled = {this.props.RequestCancel}
                          value={this.state.membernum}
                          placeholder="Enter Number"
                          min="0"
                          pattern="\d*"
                          maxLength="10"
                          onWheel={event => event.currentTarget.blur()} />
                      </div>
                    </Col>
                    {this.state.memberdaata.map(res =>
                      <Col xl={6}>
                        <div className="paralocation-prp team-mbr-meet">
                          Name {res.id+1}
                        </div>
                        <div className="value2" key={res.id}>
                          <input type="text"
                            className="customized-input"
                            onChange={(e) => this.onTxtChange(res.id, e)}
                            value={res.value}
                            min="0"
                            pattern="\d*"
                            disabled = {this.props.RequestCancel}
                            onWheel={event => event.currentTarget.blur()} />
                            {this.props.RequestCancel == true ?
                            <div></div>:
                              <img className="redcancelprp" src="../../public/assets/images/red_cancel.svg" onClick={this.removename.bind(this, res.id)}/>
                            	}
                          </div>
                        </Col>
                    )}
                	</Row>
            </div>
        );
    }
}
export default MrmemberDetails;