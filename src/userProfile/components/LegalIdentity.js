import React,{Component} from 'react'
import {Row,Col} from 'react-bootstrap'

import { injectIntl, defineMessages } from 'react-intl'

const messages = defineMessages({
    ltitle: {
        id: 'user_profile.container.legaltitle',
        defaultMessage:'LEGAL IDENTITIES'
    },
    pan: {
        id: 'user_profile.container.pannumber',
        defaultMessage:'PAN Number'
    },
    adnumber: {
        id: 'user_profile.container.adharnumber',
        defaultMessage:'Aadhar Number'
    },
    acnumber: {
        id: 'user_profile.container.accountnumber',
        defaultMessage:'Account Number'
    },
    
    branch: {
        id: 'user_profile.container.branchname',
        defaultMessage:'Branch Name'
    },
    esi: {
        id: 'user_profile.container.esinumber',
        defaultMessage:'ESI Number'
    },
    rtgs: {
        id: 'user_profile.container.rtgsnumber',
        defaultMessage:'RTGS Number'
    },
    
  })

class LegalIdentity extends Component
{
    render(){
        
        const{intl} = this.props

        return(
            <div className="palletback pallet2">
                <Row>
                    <Col xs={12}>
                        <div className="pbartitle">{intl.formatMessage(messages.ltitle)}</div>
                    </Col>
                    <Col xl={4} xs={6}>
                        <div className="pbartitle2">{intl.formatMessage(messages.pan)}</div>
                        <div className="value2">{this.props.userinfo["PanNumber"]?this.props.userinfo["PanNumber"]:<div><p className="dash"></p><p className="dash"></p></div>}</div>
                    </Col>
                    <Col xl={4} xs={6}>
                        <div className="pbartitle2">{intl.formatMessage(messages.adnumber)}</div>
                        <div className="value2">{this.props.userinfo["Aadhar"]?this.props.userinfo["Aadhar"]:<div><p className="dash"></p><p className="dash"></p></div>}</div>
                    </Col>
                    <Col xl={4} xs={6}>
                        <div className="pbartitle2">{intl.formatMessage(messages.acnumber)}</div>
                        <div className="value2">{this.props.userinfo["AccountNumber"]?this.props.userinfo["AccountNumber"]:<div><p className="dash"></p><p className="dash"></p></div>}</div>
                    </Col>
                    <Col xl={4} xs={6}>
                        <div className="pbartitle2">{intl.formatMessage(messages.branch)}</div>
                        <div className="value2">{this.props.userinfo["c_branch_name"]?this.props.userinfo["c_branch_name"]:<div><p className="dash"></p><p className="dash"></p></div>}</div>
                    </Col>
                    <Col xl={4} xs={6}>
                        <div className="pbartitle2">{intl.formatMessage(messages.esi)}</div>
                        <div className="value2">{this.props.userinfo["C_ESI_NO"]?this.props.userinfo["C_ESI_NO"]:<div><p className="dash"></p><p className="dash"></p></div>}</div>
                    </Col>
                    <Col xl={4} xs={6}>
                        <div className="pbartitle2">{intl.formatMessage(messages.rtgs)}</div>
                        <div className="value2">{this.props.userinfo["RTGSNumber"]?this.props.userinfo["RTGSNumber"]:<div><p className="dash"></p><p className="dash"></p></div>}</div>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default (injectIntl(LegalIdentity));

