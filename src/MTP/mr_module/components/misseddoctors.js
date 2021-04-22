import React, { Component } from 'react';
import { Tab, Nav,Card } from 'react-bootstrap';
import "../../../../public/assets/css/mtpResponsive.css"

class Misseddoctors extends Component {
  constructor(props){
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.myRef = React.createRef();
    this.state={
      showDrop : false,
      isOnDiv : true
    }
    this.showDropdown = this.showDropdown.bind(this)
    this.hidediv = this.hidediv.bind(this)
    this.detect = this.detect.bind(this)
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({showDrop:false})
    }
  }
  showDropdown(){
    this.setState({showDrop: !this.state.showDrop})
  }
  hidediv(){
    if (this.state.isOnDiv != true ) {
      this.setState({showDrop:false})
     } else {
      this.detect();
     }
  }
  detect(){
    this.setState({isOnDiv:false})
  }
  render() {
    return (
      <div className="misseddocmtp">
        {this.state.showDrop ?
          <Card className="missedcard" ref={this.setWrapperRef}>
            <Tab.Container>
                <div>
                  <div className='retrival-left leftdoctormtp'>
                    <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                      <Nav.Link eventKey="designation">
                        <img src="../public/assets/images/doctor-stethoscope-black.svg" alt="filter_img" />
                        <span>Doctors</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="statusdrop">
                      <Nav.Link eventKey="status">
                        <img src="../public/assets/images/checked.svg" alt="filter_img" />
                        <span>Patches</span>
                      </Nav.Link>
                    </Nav.Item>
                    </Nav>
                  </div>
                  <div className='retrival-right '>
                      <Tab.Content>
                          <Tab.Pane eventKey="designation">
                            <p className="missdochead">Missed Doctors <span className="patchcount">(10)</span></p>
                            <div  className="ulscrollbarcol">
                              <p>Appakudal (EX)</p>
                              <p>Nerul (HQ)</p> 
                              <p>Appakudal (EX)</p>
                              <p> Appakudal (EX)</p>
                              <p>Appakudal (EX)</p>
                              <p>Appakudal (EX)</p>
                              <p> Appakudal (EX)</p>
                              <p>Appakudal (EX)</p>
                              <p> Nerul (HQ)</p>
                              <p>Appakudal (EX)</p>
                              <p>Appakudal (EX)</p>
                              <p> Appakudal (EX)</p>
                              <p>Appakudal (EX)</p>
                              <p>Appakudal (EX)</p>
                              <p> Appakudal (EX)</p>
                              <p>Appakudal (EX)</p>
                              <p> Nerul (HQ)</p>
                              <p>Appakudal (EX)</p>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="status">
                          <p className="missdochead">Missed Patches <span className="patchcount">(05)</span></p>
                            <div  className="ulscrollbarcol">
                              <p>Appakudal (EX)</p>
                              <p>Nerul (HQ)</p> 
                              <p>Appakudal (EX)</p>
                              <p> Appakudal (EX)</p>
                              <p>Appakudal (EX)</p>
                              <p>Appakudal (EX)</p>
                              <p> Appakudal (EX)</p>
                              
                            </div>
                          </Tab.Pane>                         
                      </Tab.Content>
                  </div>                   
                </div> 
            </Tab.Container></Card>:null}
        <div className="misseddrpmenu" onClick={this.showDropdown}  tabindex="0">
          <img
              src="../public/assets/images/danger-white.svg"
              className="addPlanBtn"/>

        </div>  
      </div>
          )
  }
}
export default Misseddoctors;
