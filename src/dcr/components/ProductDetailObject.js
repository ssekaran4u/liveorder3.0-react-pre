import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Dropdown, Form, Row, Col } from 'react-bootstrap'


class ProductDetailObject extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Prescriber: false,
            Other: false,
            convert: false,
            unPrescriber: false,
            prescriberText: '',
            nonprescriberText: '',
            convertText: '',
            OthersText: '',
            selectionvalid:false

        }
        this.setSelection = this.setSelection.bind(this)
        this.mouseOut=this.mouseOut.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.EdithandleChange=this.EdithandleChange.bind(this)
    }


    EdithandleChange(id,value) {
        const re = /^[0-9]*$/;


        if (re.test(value)) {
            if (id == 'Prescriber') {
                this.setState({ prescriberText: value ,selectionvalid:false  })
            } else if (id == 'Non Prescriber') {
                this.setState({ nonprescriberText: value ,selectionvalid:false  })
            } else if (id == 'Convert') {
                this.setState({ convertText: value ,selectionvalid:false  })
            } else if (id == 'Others') {
                this.setState({ OthersText: value,selectionvalid:false })
            }
            this.props.item["textval"] = value

        }
        this.props.setSelection(this.props.id, id, true, this.props.item, this.state.prescriberText)




    }


    componentDidMount() {
        
        if (this.props.Editmodedata) {
           
             
            if (this.props.Editmodedata['DWR_sub_DETAILS']) {
                let m = {}
                const loc = this.state.Selectedprojectdetails
                Object.keys(this.props.Editmodedata['DWR_sub_DETAILS']).map((next) => {
                    if (this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Doc_Code"] == this.props.docode) {
                        if (this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_ITEM_EXP"].trim() == this.props.item["c_item_code"].trim() ) {
                            

                            if(this.props.Editmodedata['DWR_sub_DETAILS'][next]["c_pref_code"].trim()=="1"){
                               this.EdithandleChange("Prescriber",this.props.Editmodedata['DWR_sub_DETAILS'][next]["n_pref_qty"].trim())
                            }

                            if(this.props.Editmodedata['DWR_sub_DETAILS'][next]["c_pref_code"].trim()=="2"){
                                this.EdithandleChange("Non Prescriber",this.props.Editmodedata['DWR_sub_DETAILS'][next]["n_pref_qty"].trim())
                            }

                            if(this.props.Editmodedata['DWR_sub_DETAILS'][next]["c_pref_code"].trim()=="3"){
                                this.EdithandleChange("Convert",this.props.Editmodedata['DWR_sub_DETAILS'][next]["n_pref_qty"].trim())
                            }

                            if(this.props.Editmodedata['DWR_sub_DETAILS'][next]["c_pref_code"].trim()=="4"){
                                this.EdithandleChange("Others",this.props.Editmodedata['DWR_sub_DETAILS'][next]["n_pref_qty"].trim())
                            }
                        }
                        //selectedData[id] = checked
                    }
                })

                this.setState({ selectedData: m, Selectedprojectdetails: loc })

                //this.props.id + '$' + item.c_name + '$' + item.c_doc_code+index ;
                //

            }

        }
       
    }


    mouseOut(){
        if (this.props.selection  == true ){
        this.setState({selectionvalid:true})
        }else{
            this.setState({selectionvalid:false})
        }
    }
    handleChange(event) {
        const re = /^[0-9]*$/;
        const { value, id } = event.target;

        if (re.test(value)) {
            if (id == 'Prescriber') {
                this.setState({ prescriberText: value ,selectionvalid:false  })
            } else if (id == 'Non Prescriber') {
                this.setState({ nonprescriberText: value ,selectionvalid:false  })
            } else if (id == 'Convert') {
                this.setState({ convertText: value ,selectionvalid:false  })
            } else if (id == 'Others') {
                this.setState({ OthersText: value,selectionvalid:false })
            }
            this.props.item["textval"] = value

        }
        this.props.setSelection(this.props.id, id, true, this.props.item, this.state.prescriberText)

    }

    setSelection(event) {
        //alert('kunal SINHA')


        if(sessionStorage.getItem("ActiveDCR")=="null"){
            sessionStorage.setItem("ActiveDCR",this.props.docode)
           }
        const { checked, name } = event.target

        if (this.props.item["textval"]) {
            delete this.props.item["textval"]
        }
        if(checked==true){
            this.setState({ selectionvalid:false  })
           
        }else{
            this.setState({ selectionvalid:true  })
        }

        //   const a = this.setvalue()
        this.props.setSelection(this.props.id, name, checked, this.props.item, this.state.prescriberText)

    }


    render() {

        if (!this.props.item.c_name)
            return null

        const selection = this.props.selection




        return (






            <div   onMouseLeave={this.mouseOut} className="productback">

                <Form.Check
                    custom
                    inline
                    checked={selection}
                    type="checkbox"
                    id={ "productback"+this.props.id}
                    label={this.props.item.c_name.toLowerCase()}
                    className={this.props.item.n_priority == null || this.props.item.n_priority < 0 ? 'mb-2' : 'mb-2 coreColor'}
                    name={this.props.id}
                    onChange={this.setSelection}
                />

                    {/* { this.state.selectionvalid==true? 
               <div>
                <div className="doctorError" > Please select Doctor Role</div> </div>
                :null} */}
                {selection &&
                    <div className="productsubCheckbox">
                        <Row>
                            <Col lg={5} md={5} sm={5} xs={5} >
                                <div className="flexDisplay">
                                    <div >
                                        <Form.Check
                                            custom
                                            inline
                                            checked={selection === 'Prescriber'}
                                            type="checkbox"
                                            id={this.props.id + "Prescriber"}
                                            label={"Prescriber"}
                                            className="mb-2"
                                            name={"Prescriber"}
                                            onChange={this.setSelection}
                                        />
                                    </div>
                                    <div >
                                        {selection === 'Prescriber' ?
                                            <div className="productInput">
                                                <Form.Control
                                                    type='text'
                                                    value={this.state.prescriberText}
                                                    id="Prescriber"
                                                     MaxLength="2"
                                                    onChange={this.handleChange.bind(this)}
                                                />
                                            </div> : ''}
                                    </div>
                                </div>
                            </Col>
                            <Col lg={7} md={7} sm={7} xs={7}>
                                <div className="flex-row">
                                    <div>
                                        <Form.Check
                                            custom
                                            inline
                                            checked={selection === 'Non Prescriber'}
                                            type="checkbox"
                                            id={this.props.id + "PrescriberNot"}
                                            label={"Non Prescriber"}
                                            className="mb-2"
                                            name={"Non Prescriber"}
                                            onChange={this.setSelection}
                                        />
                                    </div>
                                    
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={5} md={5} sm={5} xs={5}>
                                <div className="flex-row">
                                    <div lg={7} md={7} sm={7} xs={7}>
                                        <Form.Check
                                            custom
                                            inline
                                            checked={selection === 'Convert'}
                                            id={this.props.id + "Prescriberconvert"}
                                            type="checkbox"
                                            label={"Convert"}
                                            className="mb-2"
                                            name={"Convert"}
                                            onChange={this.setSelection}
                                        />
                                    </div>
                                    
                                </div>
                            </Col>
                            <Col lg={7} md={7} sm={7} xs={7}>
                                <div className="flex-row">
                                    <div lg={7} md={7} sm={7} xs={7}>
                                        <Form.Check
                                            custom
                                            id={this.props.id + "Prescriberother"}
                                            checked={selection === 'Others'}
                                            inline
                                            type="checkbox"
                                            label={"Others"}
                                            className="mb-2"
                                            name={"Others"}
                                            onChange={this.setSelection}
                                        />
                                    </div>
                                   
                                </div>
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}
// const mapStateToProps = state => ({
//     data: state.DCR.data
// })

// const mapDispatchToProps = dispatch => ({
//     getProductDetail: (data) => dispatch(getProductDetail(data))
// })



export default ProductDetailObject;