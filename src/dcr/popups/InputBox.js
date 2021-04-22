import React, { Component } from 'react'
import {Form,Modal,Button} from 'react-bootstrap'

class InputBox extends Component {
    
    constructor(props){
        super(props)
        this.state={
          disp:false,
          limit:'Enter Amount Not More than',
          amtVal:'',
          expcode:''
      }
      this.handlechange = this.handlechange.bind(this);
      this.getDetails = this.getDetails.bind(this)
    }

     componentDidUpdate(old,news){

      if(this.props.dwr_no!=old.dwr_no){

        this.setState({
          disp:false,
          amtVal:'',
          expcode:this.props.act.expcd,
          amtDetails:''

        })
      }

      if(this.props.Editmodedata!=old.Editmodedata){
      


      // alert('okoko')
       if(this.props.Editmodedata)
       {

      //   this.state={
      //     disp:false,
      //     limit:'Enter Amount Not More than',
      //     amtVal:'0',
      //     expcode:this.props.act.expcd,
      //     amtDetails:'0'
      // }
         this.props.Editmodedata.map( (sd)=> {



        
          if(sd["C_Name"].trim()==this.props.act.expnm.trim()){

          const textval= sd["n_Amount"].trim()
           const amtDetails=sd["C_Note"].trim()
            this.setState({
              disp:true,
              amtVal:textval,
              expcode:this.props.act.expcd,
              amtDetails:amtDetails
  
            })
          }
         })
       }
      
      }
     }

    componentDidMount() {


    
    }

    handlechange(event,amt){ 


    
      

 if(parseFloat( event.target.value)>0){

      if ( parseFloat( event.target.value) <=    parseFloat(amt)){
      if(event.target.value==""){
        this.setState({
        disp:false
        })
      }
     
        const textval = event.target.value;
          this.setState({
            disp:true,
            amtVal:textval,
            expcode:this.props.act.expcd

          })
        //  this.props.getInputVal(textval,this.props.act.expcd,'')
      
        this.props.getInputVal(textval,this.state.amtDetails,this.state.expcode)
      
    }else{

       if (event.target.value==''){
      const textval = '0'
      this.setState({
        disp:false,
        amtVal:'',
        expcode:this.props.act.expcd

      })
      this.props.getInputVal(textval,this.state.amtDetails,this.state.expcode)
    }
    }
  }else{
    if (event.target.value==''){
      const textval = '0'
      this.setState({
        disp:false,
        amtVal:'',
        expcode:this.props.act.expcd

      })
      this.props.getInputVal(textval,this.state.amtDetails,this.state.expcode)
  }
}
  }
  getDetails(e){
    const amtDetails = e.target.value
   // this.props.getInputVal(this.state.amtVal,this.state.expcode,amtDetails)
   this.setState({ amtDetails:amtDetails })

   this.props.getInputVal(this.state.amtVal,amtDetails,this.state.expcode)
  }

  render() {
    return (
      <div>
        <div className="expencebox">
              <Form.Label className="customized-label chemistlabel">{this.props.act.expnm}</Form.Label>
              <Form.Label className="maxLength float-right">{this.props.act.lmt}</Form.Label>
              <Form.Control 
                  type="number" 
                  id="1"
                  value={this.state.amtVal}
                  className="customized-input amount" 
                  name={this.props.act.expnm}
                  placeholder={this.state.limit+' '+this.props.act.lmt} 
                  onChange={ (event)=> {this.handlechange(event, this.props.act.lmt  ) } }
              />
              {this.state.disp && 
              <div>
                  {/* <InputBox /> */}
                  <Form.Control 
                      type="text" 
                      value={this.state.amtDetails}
                      className="customized-input" 
                      name={this.props.act.expnm}
                      placeholder="Enter Detail Of Expence" 
                      onChange={this.getDetails}
                      />
              </div>
              }
          </div>            
      </div>
    )
  }
}


export default InputBox