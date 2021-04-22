import React, { Component } from "react";
import { Row, Col, Form } from "react-bootstrap";
// import MemberTextbox from "./membertextbox";
import { postToServer } from '../../lib/comm-utils'
import { URL_PRP } from '../../lib/constants'

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
        abc.map(res => {
            if (res.id == id) {
                res.MemberName = e.target.value
            }
        })
        // this.props.onteamErr("")
        this.setState({ memberdaata: abc })
        this.props.teamDetail(memberdaata)
    }

    onNoChange(e) {
        // console.log(e.target.value, "e.target.value")
        this.setState({ membernum: e.target.value })
        let memberdaata = []
        for (let i = 0; i <e.target.value; i++) {
            // console.log(e.target.value, "e.target.value")

            memberdaata.push({
                "id": i,
                "MemberName": ""
            })
        }
        // this.props.onteamErr("")
        this.setState({ memberdaata: memberdaata })
        this.props.teamDetail(memberdaata)
    }

    removename(id) {
        const { memberdaata } = this.state;
        // console.log(id, "deletee")
    
        delete memberdaata[id];
    
        this.setState({
            memberdaata: memberdaata,
           membernum:this.state.membernum-1
        })
        // console.log(memberdaata,"delete")
        this.props.teamDetail(memberdaata)
      }

      componentDidMount(){
        var data = { "Index": "MRExpenseSrnoClick", "Data": { "srno":this.props.srnum}, }
        let TeamMembers = []
        postToServer(URL_PRP, data)
          .then((response) => {
            // console.log(response, data, "data")
            if (response.status == 200 && response.statusText == "OK") {
              response.data.TeamMembers.map((res,i) => {
                TeamMembers.push({
                  MemberName : res.MemberName,
                  id : i,
                })
              })
            //   console.log(TeamMembers,"TeamMembers")
              this.setState({memberdaata:TeamMembers})
              this.setState({membernum:TeamMembers.length})
              this.props.teamDetail(TeamMembers)
      }
    })
}


    render() {
        // console.log(this.props.TeamMembers,this.props.teamDetail,"TeamMembers")
        // console.log(this.state.membernum, "membrnum")
        // console.log(this.state.memberdaata, "memberdaata")

        // let membrdata = []
        // if (this.state.membernum != 0) {
        //     for (let i = 1; i <= this.state.membernum; i++) {
        //         console.log(i, "membrnum")
        //         membrdata.push (
        //             <div>
        //                 <Col xl={6}>
        //                     <div className="paralocation-prp team-mbr-meet">
        //                         Name {i}
        //            </div>
        //                     <div className="value2" key={i}>
        //                         <input type="text"
        //                             className="customized-input"
        //                             // value={res.MemberName}
        //                             // placeholder={res.MemberName}
        //                             // value="02"
        //                             onChange={(e) => { this.setState({ memberdaata: e.target.value })  }}
        //                             value={this.state.memberdaata}
        //                             min="0"
        //                             pattern="\d*"
        //                             // maxlength="10"
        //                             // disabled={true}
        //                             onWheel={event => event.currentTarget.blur()} />
        //                     </div>
        //                 </Col>
        //             </div>)
        //     }

        // }


        return (
            <div className="palletback pallet2 appdetails">
                <Row>
                    <Col xs={12}>
                        <div className="pbartitle">
                            <p>Member Details</p>
                        </div>
                    </Col>

                    <Col xl={12}>
                        <div className="paralocation-prp team-mbr-meet">
                            No. of Team Member Attending Meeting
                          <span className="colorRed">*</span>
                        </div>
                        <div className="value2 input-member-meeting">
                            <input type="number"
                                className="customized-input"
                                onChange={this.onNoChange}
                                disabled = {this.props.RequestCancel}
                                // value={this.props.TeamMembers.length}
                                value={this.state.membernum }
                                placeholder="Enter Number"
                                min="0"
                                pattern="\d*"
                                maxlength="10"
                                onWheel={event => event.currentTarget.blur()} />
                        </div>
                    </Col>

                    {/* {this.props.TeamMembers.length ? this.props.TeamMembers.map((res,i) => */}
                    {/* {membrdata} */}
                    {/* ):null}  */}

                    {this.state.memberdaata.map(res =>
                        <Col xl={6}>
                            <div className="paralocation-prp team-mbr-meet">
                                Name {res.id+1}
                            </div>
                            <div className="value2" key={res.id}>
                                <input type="text"
                                    className="customized-input"
                                    // value={res.MemberName}
                                    // placeholder={res.MemberName}
                                    // value="02"
                                    // onChange={(e) => { this.setState({ memberdaata: e.target.value })  }}
                                    onChange={(e) => this.onTxtChange(res.id, e)}
                                    value={res.MemberName}
                                    // value={this.state.memberdaata}
                                    min="0"
                                    pattern="\d*"
                                    disabled = {this.props.RequestCancel}
                                    // maxlength="10"
                                    // disabled={true}
                                    onWheel={event => event.currentTarget.blur()} />
                                    {this.props.RequestCancel == true ?
                                    <div></div>:
                                    <img className="redcancelprp" src="../../../public/assets/images/red_cancel.svg" onClick={this.removename.bind(this, res.id)}/>
                                    }
                            </div>
                            {/* <div className="daterror-msg">{this.props.teamDetailerr}</div> */}
                        </Col>
                    )}

                </Row>
            </div>
        );
    }
}
export default MrmemberDetails;