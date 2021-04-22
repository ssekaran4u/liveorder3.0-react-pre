import React,{Component} from 'react'
import {Modal,Form,Row,Col,Button} from 'react-bootstrap';

class NotePopup extends Component{
    constructor(props){
        super(props)
        this.state={
            show:true,
            Areanote:''
        }
        this.btnResponse = this.btnResponse.bind(this)
        this.Savearea = this.Savearea.bind(this)
        this.areachange = this.areachange.bind(this)
    }
    componentDidUpdate(oldprop,oldstate){
        if(oldprop.Areanote != this.props.Areanote){
            this.setState({
                Areanote:this.props.Areanote
            })
        }
    }
  
    btnResponse(res){
        this.props.btnResponse(res)
    }
    Savearea(){
        this.props.Savearea()
    }
    areachange(){
        let a = event.target.value
        this.setState({
            Areanote:a
        })
        this.props.areachange(a)
    }
    
    render(){
        return(
                <Modal centered className="alert" show={this.props.show} onHide={this.props.onClose}>
                     <Modal.Header closeButton>
                            <Modal.Title className="expentry-headertitle" id="contained-modal-title-vcenter">
                            MTP Note
                    </Modal.Title>
        </Modal.Header>
                    <Modal.Body className="">
                    {/* <div className="alertImgPad" ><img src="../public/assets/images/danger.svg" /></div>
                        <div className="alertText">Are You Sure ?</div> */}
                        {/* <div className="alertSubText f14">{this.props.msg}</div> */}
                        <div style={{"margin":"10px 20px"}}>
                        <Form.Label className="customized-label" placeholder="Password">Note</Form.Label>
                                                <Form.Control
                                                    required
                                                    as="textarea"
                                                    rows="3"
                                                    maxLength="300"
                                                    placeholder="Add message here"
                                                    className="popup-textbox"
                                                    value={this.state.Areanote}
                                                    onChange={this.areachange}
                                                />
                        </div>
                        
                        <div className="saveBtns">
                            <Row>
                                <Col lg={4} md={4} xs={4}></Col>
                                {/* <Col lg={4} md={4} xs={4}>
                                    <div className="cancel hcursur" onClick={()=>this.btnResponse('no')}>No</div>
                                </Col> */}
                                <Col lg={4} md={4} xs={4}>
                                    <div className="ok hcursur" onClick={()=>this.Savearea()}>Save</div>
                                </Col>
                                <Col lg={4} md={4} xs={4}></Col>
                            </Row>
                            {/* <Button variant="primary"  onClick={this.Savearea} className="no-detail-button" >Save</Button> */}
                        </div>
                    </Modal.Body>
                </Modal>
                )
    }
    
}
export default NotePopup 

