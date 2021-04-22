import React from 'react'
import { Component } from 'react'
import { Breadcrumb,Tab, Tabs, Row, Col, Form, InputGroup, Table, Button } from "react-bootstrap";
import { Dropdown } from 'semantic-ui-react'
import { options } from '../../../testdata/missedreport'
import DatePicker from "react-datepicker";
import Appointment from './appointment'

 class Additionalinformation extends Component {
   constructor(props){
    super(props);
    this.state={
      Date : new Date(),
      fromTime:'',
      addday : 0,
      rows : [{"value":""}],
      count : "1",
      showprofile : false
    }
    this.textInput = React.createRef();
    this.addday = this.addday.bind(this)
    this.getprofilephoto= this.getprofilephoto.bind(this)
   }
     addday(){
      this.setState({count : parseInt(this.state.count)+1})
      let len = this.state.rows.length;
      const item = {
        value: this.state.count.toString()
      };
      this.setState({rows: ([...this.state.rows, item])})
  };
  getprofilephoto(){
    debugger
    this.setState({showprofile:true})
  }
  componentDidMount() {
    debugger
    this.textInput.current.focus();
  }
   render(){
     return (
      <div>
      <div className="newdoctorformrow2">
        <Row>
          <Col xl={7} md={7} sm={12}>
            <p className="mandatdetails"> Additional Information </p>
          </Col>
          <Col xl={5} md={5} sm={12}>
            <input type="text"   name="searchbar" id="searchbar" className="Rectangle-685 searchhide"  placeholder="Search for any Information" />
            <div className="btn-group-page-nav btn-group paginationrow">
              <button type="button" className="btn btn-default active  activepagination">2</button>
               <span className="marginof"> &nbsp; of &nbsp;</span>
              <button type="button" className="btn btn-defaul defaultpagination">2</button>       
            </div>
          </Col>
        </Row>
      </div>
      <div className="marginem">
        <p className="mandatdetails"> Personal Information </p>
      </div>
      <div className="doctorformmargin">
        {/* <p className="mandatdetails docrowseparation marginem"> Other Information</p> */}
        <Row className="docrowseparation">
          <Col xl={3} md={3} sm={12}>
            <div className="doctorphoto">
              {this.state.showprofile == false ?
              <div onClick={this.getprofilephoto}>
              <img src="../public/assets/images/manager_plus.svg" className="doctorplus"/>
              <p className="doctoraddphoto">Add photo</p>
            </div> : <div>
                <img src="../public/assets/images/1box.svg"/>
              </div>}
            </div>
          </Col>
          <Col xl={9} md={9} sm={12}>
            <Row>
              <Col sm={12} xl={4} md={4}>
                <div className="singledropdown">
                  <Form.Label className="customized-label chemistlabel">Spouse Name <span className="colorRed"> </span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1" ref={this.textInput}/>
                </div>
              </Col>
              <Col sm={12} xl={4} md={4}>
                <div className="singledropdown">
                  <Form.Label className="customized-label chemistlabel">Spouse Date of birth (DOB) <span className="colorRed"> </span></Form.Label>
                  <InputGroup className="datepickerAligment controls text-right">
                    <DatePicker
                      selected={this.state.Date}
                      // onChange={this.handlePrpDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD-MM-YYYY"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Col>
              <Col sm={12} xl={4} md={4}>
                <div className="singledropdown">
                  <Form.Label className="customized-label chemistlabel">Date of Wedding <span className="colorRed"> </span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
                </div>
              </Col>
            </Row>
            <Row className="docrowseparation">
              <Col sm={12} xl={4} md={4}>
                <div className="singledropdown">
                  <Form.Label className="customized-label chemistlabel">First Child Name <span className="colorRed"></span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
                </div>
              </Col>
              <Col sm={12} xl={4} md={4}>
                <div className="singledropdown">
                  <Form.Label className="customized-label chemistlabel">First Child DOB<span className="colorRed"></span></Form.Label>
                  <InputGroup className="datepickerAligment controls text-right">
                    <DatePicker
                      selected={this.state.Date}
                      // onChange={this.handlePrpDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD-MM-YYYY"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Col>
              <Col sm={12} xl={4} md={4}>
                <div className="singledropdown">
                  <Form.Label className="customized-label chemistlabel">Second Child Name<span className="colorRed"></span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
                </div>
              </Col>
            </Row>
            <Row className="docrowseparation">
              <Col sm={12} xl={4} md={4}>
                <div className="singledropdown">
                  <Form.Label className="customized-label chemistlabel">Second Child DOB <span className="colorRed"></span></Form.Label>
                  <InputGroup className="datepickerAligment controls text-right">
                    <DatePicker
                      selected={this.state.Date}
                      // onChange={this.handlePrpDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD-MM-YYYY"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Col>
              <Col sm={12} xl={4} md={4}>
                <div className="singledropdown">
                  <Form.Label className="customized-label chemistlabel">Third Child Name<span className="colorRed"></span></Form.Label>
                  <Form.Control type="text" className="customized-input" placeholder="Enter Doctor Name" value="Criteria 1"/>
                </div>
              </Col>
              <Col sm={12} xl={4} md={4}>
                <div className="singledropdown">
                  <Form.Label className="customized-label chemistlabel">Third Child DOB<span className="colorRed"></span></Form.Label>
                  <InputGroup className="datepickerAligment controls text-right">
                    <DatePicker
                      selected={this.state.Date}
                      // onChange={this.handlePrpDate}
                      dateFormat="dd/MM/yyyy"
                      placeholderText="DD-MM-YYYY"
                    />
                    <InputGroup.Append>
                      <InputGroup.Text>
                        <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
                      </InputGroup.Text>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="visitrow">
        <p className="businessheading"> Clinic or Hospital Address</p>
      </div>
      <div className="docproductrow">
          <Col xl={3} md={3} xs={6} className="marginem">
            <div className="singledropdown">
            <Form.Label className="customized-label chemistlabel">Division <span className="colorRed"></span></Form.Label>
              <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
            </div>
          </Col>
          <Row className="docproductrowpad">
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 1<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 2<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={3} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 3<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
          </Row>
          <Row className="docproductrowpad">
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 4<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 5<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={3} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 6<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
          </Row>
          <Row className="docproductrowpad">
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 7<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={4} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 8<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
            <Col xl={4} md={3} xs={12} className="marginem">
              <div className="singledropdown">
                <Form.Label className="customized-label chemistlabel">Product 9<span className="colorRed"></span></Form.Label>
                <Dropdown placeholder='Select' className="customized-input" fluid selection options={options} />
              </div>
            </Col>
          </Row>
        </div>
    </div>
     )
   }
 } 
export default Additionalinformation