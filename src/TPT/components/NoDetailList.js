import React, { Component } from 'react';
import { Row, Col, Form ,Button} from 'react-bootstrap';
import InputBox from '../components/InputBox'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
import {withRouter} from 'react-router-dom'
class NoDetailList extends Component {
    constructor(props){
        super(props)
        this.state={
            totaldata:{},
            Messagetype:true,
            
        }
        this.getValue = this.getValue.bind(this)
     this.getData=this.getData.bind(this)
     this.handleClose=this.handleClose.bind(this)
     this.onHide = this.onHide.bind(this)
     this.btnAction=this.btnAction.bind(this)
    }
    btnAction(ok){


      
    //    }).catch(  (Error)=> {
           
    //     console.log(Error)
    //     //this.setState({  Messagetype:false, Error: true, Errormsg: "STP Not Get Saved " })
    //    })

        
    }

    handleClose() {
        this.setState({
            showModal: false
        })
    }



    onHide() {
        this.setState({
            Error: false
        })
        
    }

    getData (event) { 
//console.log("kk",)

        let  doc= ''
        let  che =''
        let  stock=''
        let   other=''



        che= this.props.selectedData.CHEMIST
        doc = this.props.selectedData.DOCTOR
        other= this.props.selectedData.OTHERS
        stock = this.props.selectedData.STOCKIST

        
        // if(this.state.totaldata["DOCTOR"] == undefined) {
        //     this.setState({ Error: true, Errormsg: 'Please Enter Doctor count' })
        //      return null
        
        // }
        // if(this.state.totaldata["STOCKIST"] == undefined){
        //     this.setState({ Error: true, Errormsg: 'Please Enter Stockist count' })
        //      return
        // }
        // if(this.state.totaldata["CHEMIST"] == undefined){
        //     this.setState({ Error: true, Errormsg: 'Please Enter Chemist count' })
        //      return
        // }
        
          if(this.state.totaldata["DOCTOR"]){
            doc=this.state.totaldata["DOCTOR"]
          } 
          if(this.state.totaldata["CHEMIST"]){
            che=this.state.totaldata["CHEMIST"]
        }
        if(this.state.totaldata["STOCKIST"]){
            stock=this.state.totaldata["STOCKIST"]
        }

        if(this.state.totaldata["OTHERS"]){
            other=this.state.totaldata["OTHERS"]
        }

        //    const week= this.props.Info["week"] + 1
           const week= this.props.Info["week"]
           const day=this.props.Info["day"]
           const subarea=this.props.Info["code"]

           if (doc== undefined){
            doc='0'
           }
           if (che== undefined){
               che='0'
               
        }
        if (stock== undefined){
               stock='0'
        }
        if (other== undefined){
            other='0'   
        }
           



        // var data = {"index":"Save_no_details",
        // "Data":{ "subarea":subarea,"year":"2020","month":"1" , 
        // "week":week.toString(),"no_day":day.toString(),"N_DocVst":doc.toString(),"N_StkVst":stock.toString(),"N_ChemVst":che.toString()} ,
        // }
        if(che || stock || doc || other){
        var data = {"index":"Save_no_details",
        "Data":{"subarea":subarea,"month":"1","week":week.toString(),"no_day":day.toString(),"N_DocVst":doc.toString(),"N_StkVst":stock.toString(),"N_ChemVst":che.toString(),"N_OtherVst":other.toString()}, }
        postToServer("TPT",data).then( (Result)=>{ 
            if(Result.data.Status == "Success"){
                if(Result.data.Result != ""){ 
                    this.setState({ Error: true, Errormsg: Result.data.Result[0].result ,Messagetype:true})
                }else{
                    this.setState({ Error: true, Errormsg: "Saved" ,Messagetype:true})
                }
                
                }
            }).catch(  (Error)=> {  
                this.setState({ Error: true, Errormsg: "Something wrong" })
            })
        }

        
        //console.log(this.props.Info,'kunal')
       // event.preventDefault();
      }
    getValue(name,dataV){
        // console.log("ata",data)
        // data['data']:data
        this.props.data.map((item) =>{
            this.state.totaldata[name] = dataV
            
        })
       // console.log("pp",this.state.totaldata)
    }




    componentDidMount(){
        // let chemist = this.props.selectedData.CHEMIST
        // let doctor = this.props.selectedData.DOCTOR
        // let other = this.props.selectedData.OTHERS
        // let stock = this.props.selectedData.STOCKIST
        // this.setState({
            
        // })
    }

    render() { 
    

    
        let chemist = this.props.selectedData.CHEMIST
        let doctor = this.props.selectedData.DOCTOR
        let other = this.props.selectedData.OTHERS
        let stock = this.props.selectedData.STOCKIST
    
        return (
            <React.Fragment>
                 <div className="noDetailList">
                    <Form > 
                        <Row> 
                        { this.props.data.map((item) =>(
                                <Col sm={12} md={6} xl={3} className="mb-3">
                                    
                                    <Form.Group controlId="formBasicEmail">
                                        
                                        <InputBox 
                                            name={item.C_Name} 
                                            getValue={this.getValue} 
                                            inputVal={
                                                item.C_Name == 'DOCTOR' ? doctor :
                                                item.C_Name == 'CHEMIST' ? chemist:
                                                item.C_Name == 'OTHERS' ? other:
                                                item.C_Name == 'STOCKIST' ? stock:''
                                            } 
                                        />
                                    </Form.Group>
                                </Col>
                            ))}
                             <Col sm={12} md={3} xl={3} className="mb-3">
                                <Button   onClick={this.getData}    className="primary mr-2 mb-2">SUBMIT</Button>
                            </Col>
                            {/* <Col sm={12} md={3} xl={3} className="mb-3">
                            <Button   onClick={this.btnAction}    className="danger mr-2 mb-2">Delete</Button>
                            </Col> */}
                        </Row>
                           
                    </Form>  
                    <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.onHide}
                            
                        success={this.state.Messagetype}
                    />      
                 </div>
            </React.Fragment>
        );
    }
}

export default withRouter( NoDetailList);