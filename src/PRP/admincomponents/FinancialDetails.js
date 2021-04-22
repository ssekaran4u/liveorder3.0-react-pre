import React, { Component } from "react";
import { Row, Col, InputGroup } from "react-bootstrap";
import DatePicker from "react-datepicker";
class FinancialDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "-1",
      StartDate: "",
      Acc_startDate : new Date(),
      Date: new Date(),
      Daterr:"",
    }
    this.handleSelect = this.handleSelect.bind(this)
    this.handleAccSelect = this.handleAccSelect.bind(this)
  }
  ChangeAcNo(C_Accno){
    this.props.ChangeAcNo(C_Accno)
  }
  ChangeFID(e){
    this.props.ChangeFID(e.target.value)
  }
  handleSelect(date){
    let seletdate = new Date(date);
    let dateforamt = seletdate.getDate() + "/" + (seletdate.getMonth() + 1) + "/" + seletdate.getFullYear();
    this.setState({StartDate : date})
    this.InstrucmentDate(dateforamt)
  }
  InstrucmentDate(dateforamt){
    this.props.updateInstrucmentDate(dateforamt)
  }
  handleAccSelect(date){
    let seleteddate = new Date(date);
    this.setState({Acc_startDate : date})
    let year1 = date.getFullYear()
    let year2 = this.state.Date.getFullYear()

    let month1 = date.getMonth()
    let month2 = this.state.Date.getMonth()

    let date1 = date.getDate()
    let date2 = this.state.Date.getDate()
    if(year1 == year2 ){
      if(month1 > month2){
        this.setState({ Daterr: "" })
        this.props.getaccdateerr(false)
      }
      else if(month1 == month2){
        if(date1 >= date2){
          this.setState({ Daterr: "" })
          this.props.getaccdateerr(false)
       }
       else{
        this.setState({ Daterr: "Accountable Date Should Not Be Past Date!" })
        this.props.getaccdateerr(true)
       }
      }
      else{
        this.setState({ Daterr: "Accountable Date Should Not Be Past Date!" })
        this.props.getaccdateerr(true)
      }
    }
    else if(year1 > year2){
      this.setState({ Daterr: "" })
      this.props.getaccdateerr(false)
    }
    else{
      this.setState({ Daterr: "Accountable Date Should Not Be Past Date!" })
      this.props.getaccdateerr(true)
    }
    let dateFormat = require('dateformat');

    
    let editformat = seleteddate.getDate() + "/" + (seleteddate.getMonth() + 1) + "/" + seleteddate.getFullYear();
    

    // if (`${dateFormat(date, "dd")}` >= `${dateFormat(this.state.Date, "dd")}`) {
    //   this.setState({ Daterr: "" })
    // }
    // else {
    //   this.setState({ Daterr: "Accountable Date Should Not Be Past Date!" })
    // }
    this.AccDate(editformat)
  }
  AccDate(editformat){
    this.props.EditAccDate(editformat)
  }
  ChangeBankName(e){
    this.props.ChangeBankName(e.target.value)
  }
    render() {
      const { C_Accno,n_status,c_FID,Details, d_InstrumentDate,d_acc_date,c_Bank } = this.props;
        return (
          <div className="palletback pallet2 appdetails">
            <Row>
              <Col xs={12}>
                <div className="pbartitle">
                  <p>Financial Details</p>
                </div>
              </Col>
              <Col xl={3} xs={12}>
                <div className="user-heirarchy-field-containers">
                  <div className="distributorClaimListsfc">
                    <p className="paralocation-prp">Financial Instrument Details</p>
                  </div>
                  <div className="selectlocation">
                    {this.props.n_status == 1 || this.props.n_status == 3 ? <div><input
                      type="text"
                      className="customized-input"
                      placeholder="Enter"
                      min="0"
                      onWheel={event => event.currentTarget.blur()}
                      defaultValue={this.props.c_FID}
                      ref={this.input}
                      onChange={(e) => this.ChangeFID(e)}
                      /></div> : <p>{this.props.c_FID}</p>}
                  </div>
                </div>
              </Col>
              <Col xl={3} xs={12}>
                <div className="user-heirarchy-field-containers">
                  <div className="distributorClaimListsfc">
                    <p className="paralocation-prp">Instrument Date</p>
                  </div>
                  <div className="selectlocation">
                    {this.props.n_status == 1 || this.props.n_status == 3 ? 
                      <InputGroup className="datepickerAligment controls text-right">
                        <DatePicker
                           selected={this.state.StartDate}
                           dateFormat="dd/MM/yyyy"
                           placeholderText="Select"
                           onSelect={this.handleSelect}
                         />
                         <InputGroup.Append>
                           <InputGroup.Text>
                             <img src="../public/assets/images/prpcalender.svg" alt="calendar" />
                             </InputGroup.Text>
                           </InputGroup.Append>
                       </InputGroup>
                         : <p>{this.props.d_InstrumentDate}</p>}
                  </div>
                </div>
              </Col>
              <Col xl={3} xs={12}>
                <div className="user-heirarchy-field-containers">
                  <div className="distributorClaimListsfc">
                    <p className="paralocation-prp">Bank Name</p>
                  </div>
                  <div className="selectlocation">
                    {this.props.n_status == 1 || this.props.n_status == 3 ? <div><input
                      type="text"
                      className="customized-input"
                      placeholder="Enter"
                      min="0"
                      onWheel={event => event.currentTarget.blur()}
                      defaultValue={this.props.c_Bank}
                      ref={this.input}
                      onChange={(e) => this.ChangeBankName(e)}
                      /></div> : <p>{this.props.c_Bank}</p>}
                  </div>
                </div>
              </Col>
              <Col xl={3} xs={12}>
                <div className="user-heirarchy-field-containers">
                  <div className="distributorClaimListsfc">
                    <p className="paralocation-prp">Bank A/C No</p>
                  </div>
                  <div className="selectlocation">
                    {this.props.n_status == 1 || this.props.n_status == 3 ? <div><input
                      type="text"
                      className="customized-input"
                      placeholder="Enter"
                      min="0"
                      onWheel={event => event.currentTarget.blur()}
                      defaultValue={this.props.C_Accno}
                      ref={this.input}
                      onChange={() => this.ChangeAcNo(C_Accno)}
                      /></div> : <p>{this.props.C_Accno}</p>}
                  </div>
                </div>
              </Col>
              <Col xl={3} xs={12}>
                <div className="user-heirarchy-field-containers">
                  <div className="distributorClaimListsfc">
                    <p className="paralocation-prp">Accountable Date</p>
                  </div>
                  <div className="selectlocation">
                    {this.props.n_status == 1 || this.props.n_status == 3 ? 
                      <InputGroup className="datepickerAligment controls text-right">
                        <DatePicker
                           selected={this.state.Acc_startDate}
                           dateFormat="dd/MM/yyyy"
                           placeholderText="Select"
                           onSelect={this.handleAccSelect}
                         />
                         <InputGroup.Append>
                           <InputGroup.Text>
                             <img src="../public/assets/images/prpcalender.svg" alt="calendar" />
                             </InputGroup.Text>
                           </InputGroup.Append>
                        </InputGroup>
                        
                         : <p>{this.props.d_acc_date}</p>}
                    </div>
                <div className="daterror-msg"> {this.state.Daterr} </div>

                  </div>
                </Col>
              </Row>
            </div>
        );
    }
}
export default FinancialDetails;