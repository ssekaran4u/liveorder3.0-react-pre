import React, {Component} from 'react'
import {Breadcrumb,Row,Col,Dropdown,Form} from 'react-bootstrap'
import { injectIntl, defineMessages } from 'react-intl'

import ClinicAddress from './ClinicAddress'
import Converter from '../../currency_convertion/converter'
import "../../../public/assets/font-awesome/css/font-awesome.css"
import "../../../public/assets/css/bootstrap.min.css"
import "../../../public/assets/css/style.css" 
import "../../../public/assets/css/responsive.css"

const messages = defineMessages({
  businees:{
    id:'doctor_profile.container.bussinfo',
    defaultMessage:'BUSINEES  INFO'
  },
  paitents:{
    id:'doctor_profile.container.noofpatient',
    defaultMessage:'No. of patient per day'
  },
  cbusinees:{
    id:'doctor_profile.container.currentbusinees',
    defaultMessage:'Current Businees'
  },
  bpotential:{
    id:'doctor_profile.container.busineespotential',
    defaultMessage:'Business Potential'
  },
  dprescribing:{
    id:'doctor_profile.container.prescribing',
    defaultMessage:'Doctor Prescribing'
  },
  dpurchasing:{
    id:'doctor_profile.container.purchasing',
    defaultMessage:'Doctor Purchasing'
  },
  caddhead:{
    id:'doctor_profile.container.clinicaddressheading',
    defaultMessage:'CLINIC ADDRESS'
  },
  clinic:{
    id:'doctor_profile.container.clinicname',
    defaultMessage:'Clinic/Hospital Name'
  },
  carea:{
    id:'doctor_profile.container.clinicarea',
    defaultMessage:'Clinic Area'
  },
  csubarea:{
    id:'doctor_profile.container.clinicsubarea',
    defaultMessage:'Clinic Subarea'
  },
  cfulladress:{
    id:'doctor_profile.container.clinicfullarea',
    defaultMessage:'Address'
  },
  pcode:{
    id:'doctor_profile.container.cpincode',
    defaultMessage:'Pin Code'
  }
})

class BusinessInfo extends Component{
constructor(props){
  super(props);
  //console.log(props);
  this.getcomma = this.getcomma.bind(this)
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
    render(){
      const { intl } = this.props
        return(
            <Row className="custom-row">
              <Col xl={5} md={5} sm={12} xs={12} className="custom-column">
                <div className="secondrow-first">
                  <Row>
                  <Col xs={12}>
                    <div className="iconbar">
                      <img src="../public/assets/images/portfolio.svg" className="barimage"></img> 
                      {/* <div className="bartitle nomar0">{intl.formatMessage(messages.businees)}</div> */}
                      <div className="bartitle nomar0">BUSINESS</div>
                    </div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">{intl.formatMessage(messages.paitents)}</div>
                    <div className="value">{this.props.info.NoOfPatientsPerDay ? this.props.info.NoOfPatientsPerDay : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    {/* <div className="info">{intl.formatMessage(messages.cbusinees)}</div> */}
                    <div className="info">Current Business</div>
                    <div className="value"><span className="spanvalue">{this.props.info.CurrentBusiness ? <Converter number={this.props.info.CurrentBusiness}/> : <div><p className="dash"></p><p className="dash"></p></div>}</span>   
                      {/* <Dropdown className="valuedropstart">
                          <Dropdown.Toggle className="valuedrop" id="dropdown-basic">
                              <img className="dropimage" src="../public/assets/images/dropellipsis.svg"/>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="column-dropdown">
                              <h5 className="drop-head">Columns to be shown</h5>
                              
                          </Dropdown.Menu>
                      </Dropdown> */}
                    </div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">{intl.formatMessage(messages.bpotential)}</div>
                    <div className="value">{this.props.info.BusinessPotential ? <Converter number={this.props.info.BusinessPotential}/> : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">{intl.formatMessage(messages.dprescribing)}</div>
                    <div className="value">{this.props.info.DoctorPrescription ? this.props.info.DoctorPrescription : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                  </Col>
                  <Col xs={6} className="infobox nopad0">
                    <div className="info">{intl.formatMessage(messages.dpurchasing)}</div>
                    <div className="value">{this.props.info.DrPurschse ? this.props.info.DrPurschse : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                  </Col>
                  </Row>
                </div>
                <ClinicAddress />
              </Col>
              <Col xl={7} md={7} sm={12} xs={12} className="custom-column">
                <div className="secondrow-first">
                  <Row>
                    <Col xs={12} className="iconbar">
                    <img src="../public/assets/images/hospital.svg" className="barimage"></img> <div className="bartitle nomar0">{intl.formatMessage(messages.caddhead)}</div>
                    </Col>
                    <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">{intl.formatMessage(messages.clinic)}</div>
                    <div className="value"><span className="uppwelower">{this.props.info.ClinicName ? this.props.info.ClinicName : <div><p className="dash"></p><p className="dash"></p></div>}</span></div>
                    </Col>
                    <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">{intl.formatMessage(messages.carea)}</div>
                    {/* <div className="value"><span className="uppwelower">{this.props.info.AreaName ? this.props.info.AreaName : <div><p className="dash"></p><p className="dash"></p></div>}</span></div> */}
                    <div className="value"><span className="uppwelower">{this.props.info.ClinicArea ? this.props.info.ClinicArea : <div><p className="dash"></p><p className="dash"></p></div>}</span></div>
                    </Col>
                    <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">{intl.formatMessage(messages.csubarea)}</div>
                    <div className="value"><span className="uppwelower">{this.props.info.SubareName ? this.props.info.SubareName : <div><p className="dash"></p><p className="dash"></p></div>}</span></div>
                    </Col>
                    <Col xl={12} xs={12} className="infobox nopad0">
                    <div className="info">{intl.formatMessage(messages.cfulladress)}</div>
                    <div className="value">{this.props.info.Address2 ? 
                      // this.props.info.Address1+','
                      this.props.info.Address2+ this.getcomma(this.props.info.Address3) +this.props.info.Address3+ this.getcomma(this.props.info.Address4) +this.props.info.Address4 : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                    </Col>
                    <Col xl={4} xs={6} className="infobox nopad0">
                    <div className="info">{intl.formatMessage(messages.pcode)}</div>
                    <div className="value">{this.props.info.Pincode ? this.props.info.Pincode : <div><p className="dash"></p><p className="dash"></p></div>}</div>
                    </Col>
                    </Row>
                </div>
              </Col>
        </Row>
        )
    }
}
export default (injectIntl(BusinessInfo));