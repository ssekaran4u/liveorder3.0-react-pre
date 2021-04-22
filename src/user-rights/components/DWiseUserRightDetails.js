import React,{Component} from 'react'
import {Row,Col, Form} from 'react-bootstrap'
import ReactDOM from 'react-dom'
// import "./custom.css";
// import "./skeleton.css"; 
import "./prog-tracker.css"; 
// import "./normalize.css"; 
import Designation from './Designation'

import {postToServer} from '../../lib/comm-utils'
//import Multistep from 'react-multistep'
import Multistep from '../../../public/react-multistep'

import  Step1  from './Step2'



class DWiseUserRightDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            mainmenus:[],
            sub_menus:[],
            Division:'',
            Region:'',
            Designation:''
        }
        this.getdivision = this.getdivision.bind(this)
        this.getdesignation = this.getdesignation.bind(this)
        this.getregion = this.getregion.bind(this)
        
    }
    componentDidMount(){
        var data = {"index":"Menudetails","Token":""}
        
        postToServer("UserRight", data).then( (result)=> {
            
            if(result){ 
                
                this.setState({
                    mainmenus:result.data.submenu,
                    submenus:result.data.Menu,
                    division:result.data.Divsion,
                    designation:result.data.Deg,
                    region:result.data.Region
                })
            }

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )
    }
    getdivision(data){

        this.setState({Division:data }) 
 
     }
 
     getregion(data){
 
         this.setState({Region:data }) 
 
     }
 
     getdesignation(data){
 
         this.setState({Designation:data }) 
 
     }
    
    
    render(){
       
       const nameaaray =[]


       if(this.state.mainmenus.length==0)
       return null

       let lastItem = this.state.mainmenus.slice(-1)[0];
      
       this.state.mainmenus.map((item) =>{
        nameaaray.push({name: [<img key={item.n_id} src={'../public/assets/images/' + item.c_image}  />, <span> { item.c_name }</span>], component: <Step1   Designation={this.state.Designation} Division={this.state.Division}  Region={this.state.Region} code="dswise" iconval={this.state.submenus} id ={item.n_id}   mainmenu={item.c_name} lastitem={lastItem.c_name} />})
      
       })


        return(
            <div>
                <div className="userRight dwiseUser mb-20">
                    <Row className="userpadd">
                        <Col lg={3} md={3} sm={6} xs={12}>
                            <Form.Label className="customized-label">Division<span className="colorRed">*</span></Form.Label>
                            <Designation data={this.state.division} getValue={this.getdivision}  />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12}>
                            <Form.Label className="customized-label">Region<span className="colorRed">*</span></Form.Label>
                            <Designation data={this.state.region} getValue={this.getregion} passcode="region" />
                        </Col>
                        <Col lg={3} md={3} sm={6} xs={12}>
                            <Form.Label className="customized-label">Designation<span className="colorRed">*</span></Form.Label>
                            <Designation data={this.state.designation} getValue={this.getdesignation} />
                        </Col>
                    </Row>
                </div>
                <div className="userRight pd-bottom ">
                    
                       <Multistep steps={nameaaray}  />
                   
                </div>
            </div>
        )
    }
}
export default DWiseUserRightDetails