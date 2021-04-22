
import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Breadcrumb, Row, Col, Form } from 'react-bootstrap'
class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Edit: {},
            checkboxval: null,
            isload: false,
            isOn: 'Active',
            isOff: 'Inactive',
        };
        if (this.props.mandatory == "1" || this.props.mandatory == "true") {
            this.state.isload = true
        } else {
            this.state.isload = false
        }
        // alert (this.props.name)
        var param = this.props.DisplayName.split(',')
        this.state.isOn = param[0]
        this.state.isOff = param[1]


        this.chanegradio = this.chanegradio.bind(this)
    }

    chanegradio(param) {

        const { name, value, checked } = param.target

        if (checked == true) {

            this.setState({ checkboxval: 'checked' })
        } else {

            this.setState({ checkboxval: 'unchecked' })
        }
        //console.log(value,checked,'<--')

        if (checked == true) {

            this.props.Onclientchange(name, '1')
        } else {

            this.props.Onclientchange(name, '0')
        }


    }


    static getDerivedStateFromProps(nextProps, prevState) {

        if (prevState.Edit !== nextProps.Edit) {
            return { ...prevState, Edit: nextProps.Edit }
        }
        return null
    }

    componentDidMount() {
        // alert()


    }
    render() {
        const { Edit } = this.state
        let radiostatus = this.state.checkboxval
        if (Edit) {


            if (Edit[[this.props.displayname]] == "1"|| Edit[[this.props.displayname]]=="true") {

                if (radiostatus == null) {
                    radiostatus = 'checked'
                } else {
                    if (radiostatus == 'unchecked') {
                        radiostatus = null
                    } else {
                        radiostatus = 'checked'
                    }
                }

            } else {

                if (radiostatus == null) {
                    radiostatus = null
                } else {

                    if (radiostatus == "unchecked") {
                        radiostatus = null
                    } else {
                        radiostatus = 'checked'
                    }
                }
            }

        }

        else {
            if (radiostatus == null) {
                radiostatus = 'checked'
            } else {
                if (radiostatus == 'unchecked') {
                    radiostatus = null
                } else {
                    radiostatus = 'checked'
                }
            }
        }
        return (

            <div>

                <Col lg={6} md={3} sm={6} xs={12} className="colPad toggleSwitch">

                    {this.state.isload ?
                        <Form.Label className="customized-label chemistlabel">{this.props.displayname}<span className="colorRed">*</span></Form.Label> :
                        <Form.Label className="customized-label chemistlabel">{this.props.displayname} {this.props.Mandatory == "true" ? <span className="colorRed"> *</span> : ''}  </Form.Label>}

                    {/* <Form.Label className="customized-label chemistlabel">{this.props.displayname}{ this.props.Mandatory=="true"? <span className="colorRed"> *</span> :'' }</Form.Label> */}
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12} className="paddTop8">
                            <label class="switch">
                                <input checked={radiostatus} name={this.props.displayname} onChange={this.chanegradio} type="checkbox" id="togBtn" />
                                <div class="slider round">
                                    <span class="on">{this.state.isOn}</span>
                                    <span class="off">{this.state.isOff}</span>
                                </div>
                            </label>
                        </Col>

                    </Row>
                </Col>

            </div>
        )
    }

}


const mapStateToProps = state => ({
    data: state.MASTERList.data,
    header: state.MASTERList.header,
    Edit: state.MASTERList.Edit
})

const mapDispatchToProps = dispatch => ({
    getMASTERLEdit: (data) => dispatch(getMASTERLEdit(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Radio);