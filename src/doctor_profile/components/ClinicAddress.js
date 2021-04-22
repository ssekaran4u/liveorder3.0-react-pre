import React, { Component } from 'react'
import {Row,Col} from 'react-bootstrap'
import { connect } from 'react-redux';
import { injectIntl, defineMessages } from 'react-intl'

import "../../../public/assets/font-awesome/css/font-awesome.css"
import "../../../public/assets/css/bootstrap.min.css"
import "../../../public/assets/css/style.css" 
import "../../../public/assets/css/responsive.css"

const messages = defineMessages({
  raddress: {
      id: 'doctor_profile.container.resaddress',
      defaultMessage:'RESIDENTIAL ADDRESS'
  },
  hname: {
      id: 'doctor_profile.container.housename',
      defaultMessage:'House/Building Name'
  },
  rarea: {
      id: 'doctor_profile.container.docarea',
      defaultMessage:'Clinic Area'
  },
  docfulladd: {
      id: 'doctor_profile.container.docfulladd',
      defaultMessage:'Address'
  },
  docpincode: {
      id: 'doctor_profile.container.docrespincode',
      defaultMessage:'Code PIN'
  },
}) 

class ClinicAddress extends Component {
   constructor(props){
     super(props);
     this.state = {
      data: ''
    }
    this.getcomma = this.getcomma.bind(this)
    //console.log(data);
   }
   static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.data !== nextProps.data)
        //console.log("completed", nextProps.data)
        return {...prevState, data:nextProps.data}
    return null
  }
  getcomma(data){
    let comma
    if(data){
      comma = ','
    }else{
      comma = ''
    }
    return comma
  }
  render() {
    const { intl, data } = this.props
   
    if(!data) 
            return null
    return (
          <div className="secondrow-first">
              {this.state.data ? (
                this.state.data.map((event, index) => (
                <Row key={index}>
                <Col xs={12} className="iconbar">
                  <img src="../public/assets/images/hospital12.svg" className="barimage"></img> <div className="bartitle nomar0">{intl.formatMessage(messages.raddress)}</div>
                </Col>
                <Col xs={6} className="infobox nopad0">
                  <div className="info">{intl.formatMessage(messages.hname)}</div>
                 
                  <div className="value"><span className="uppwelower">{event.Residential_BuildingName ? event.Residential_BuildingName : <div><p className="dash"></p><p className="dash"></p></div>}</span></div>
                </Col>
                <Col xs={6} className="infobox nopad0">
                  <div className="info">{intl.formatMessage(messages.rarea)}</div>
                  <div className="value"><span className="uppwelower">{event.AreaName ? event.AreaName : <div><p className="dash"></p><p className="dash"></p></div>}</span></div>
                </Col>
                <Col xs={12} className="infobox nopad0">
                  <div className="info">{intl.formatMessage(messages.docfulladd)}</div>
                  <div className="value">{event.Residential_Area ? event.Residential_Area+ this.getcomma(event.Residential_Street) +event.Residential_Street+ this.getcomma(event.Residential_city) +event.Residential_city : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                </Col>
                <Col xs={6} className="infobox nopad0">
                  <div className="info">{intl.formatMessage(messages.docpincode)}</div>
                  <div className="value">{event.Residential_pin ? event.Residential_pin : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                </Col>
                </Row>
              ))
              ) : null}
          </div>
    )
  }
}
const mapStateToProps = state =>({ 
  data:state.DOCTOR.data
})
export default injectIntl(connect(mapStateToProps)(ClinicAddress));
//export default 
