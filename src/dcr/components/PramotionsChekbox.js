import React,{Component} from 'react'
import {Form,Row,Col} from 'react-bootstrap'
import StatusPopup from '../../lib/StatusPopup'
import QtyCounter from './QtyCounter'

class PramotionsCheckbox extends Component{
    //static totalmout:{};
    constructor(props){
        super(props)
      
        this.state={
           qtyCounter: 1,
           localQty:'1',
           colorcode:'black',
           Errormsg:'',
           Error:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.decrement = this.decrement.bind(this)
        this.increment = this.increment.bind(this)
        this.Errorclose=this.Errorclose.bind(this)
        this.totalmout={};
    }
    
    componentDidUpdate(oldprops,oldstate){
        if(this.props.selection != oldprops.selection){

     if (this.props.selection==false){
      if(this.totalmout[this.props.item.c_code]){
      //  this.totalmout[this.props.item.c_code]=0
      console.log(this.totalmout[this.props.item.c_code] , parseInt( this.state.qtyCounter),'SINHA')
      this.totalmout[this.props.item.c_code]= this.totalmout[this.props.item.c_code] + parseInt( this.state.qtyCounter)
        this.setState({qtyCounter: 1,
            localQty:'1'})

           
      }else{
        this.totalmout[this.props.item.c_code]= this.totalmout[this.props.item.c_code]+ parseInt( this.state.qtyCounter)

        this.setState({qtyCounter: 1,
            localQty:'1'})
      }

      
     }
       
        
    
    
    }
    }

    Errorclose() {
        this.setState({ Error: false })
    }
    handleChange(){  

        // alert('ok')
    const {name,id,checked}= event.target
    if(sessionStorage.getItem("ActiveDCR")=="null"){
        sessionStorage.setItem("ActiveDCR",this.props.dsccode)
       }


    
                if ( ( this.props.dcrtype=="mcr" &&  sessionStorage.getItem("n_balqtyvalidateMCR")=="1"  ) || ( this.props.dcrtype=="dcr" &&  sessionStorage.getItem("n_balqtyvalidateDCR")=="1" )  ){
                        
                    
                      if(this.props.item.balsumqty < 1){
                        this.setState({Error:true, Errormsg:"You Don't Have  Enough  Quantity" })
                      }else{


                        if(!this.totalmout[this.props.item.c_code]){
                            if (this.totalmout[this.props.item.c_code]!="0"){
                            if(checked==true){
                            this.totalmout[this.props.item.c_code]=this.props.item.balsumqty-1
                            }else{
                            // this.totalmout[this.props.item.c_code]=this.props.item.balsumqty+  parseInt( this.state.qtyCounter)
                            }
                        }
    
                         }else{
                            if(checked==true){
                              this.totalmout[this.props.item.c_code]= this.totalmout[this.props.item.c_code]-1
                            }else{
                               //this.totalmout[this.props.item.c_code]= this.totalmout[this.props.item.c_code]+ parseInt( this.state.qtyCounter)
                            }
                               
                         }

                        this.props.getData(id,name, checked, this.state.qtyCounter,this.props.item,this.props.type)
                      }
                }else{


                    this.props.getData(id,name, checked, this.state.qtyCounter,this.props.item,this.props.type)
                   
                }
    }
    componentDidMount(){
        if(this.props.editQty){

     const val= this.props.editQty[this.props.item.c_name]  ==undefined ||  this.props.editQty[this.props.item.c_name] ==''  ? '1':   this.props.editQty[this.props.item.c_name]

        this.setState({
            localQty:val
        })
    }
    }
    
    increment(){ 
        const {c_name} = this.props.item


         console.log(this.totalmout)
      
      //  this.setState({colorcode:'red'})
       
        if(this.props.editQty){

            // this.props.dcrtype,sessionStorage.getItem("n_Balanceqtydisplay_mcr")=="1"

            if (     ( this.props.dcrtype=="mcr" &&  sessionStorage.getItem("n_balqtyvalidateMCR")=="1"  ) || ( this.props.dcrtype=="dcr" &&  sessionStorage.getItem("n_balqtyvalidateDCR")=="1" )   ){
            



                if(!this.totalmout[this.props.item.c_code]){

                    if( this.totalmout[this.props.item.c_code]==0){
                        this.setState({Error:true, Errormsg:"You Don't Have  Enough  Quantity" })
                        return
                    }else{
                   
                   this.totalmout[this.props.item.c_code]=this.props.item.balsumqty-1
                    }
                    

                }
                
                if( this.totalmout[this.props.item.c_code] < 1){
                    this.setState({Error:true, Errormsg:"You Don't Have  Enough  Quantity" })
                    return
                }
               
                if(this.props.item.balsumqty >= this.state.localQty+1    && this.state.localQty+1 >0){
                    this.setState({
                        localQty: ++this.state.localQty                  
                    });
                    this.totalmout[this.props.item.c_code]= this.totalmout[this.props.item.c_code]-1
                    
                    this.props.getData(c_name, c_name, true, this.state.localQty,this.props.item,this.props.type)
                
                }else{
                    this.setState({Error:true, Errormsg:"You Don't Have  Enough  Quantity" })
                }


             }else{


                this.setState({
                    localQty: ++this.state.localQty                  
                });
            
                this.props.getData(c_name, c_name, true, this.state.localQty,this.props.item,this.props.type)
                 
             }
        }else{
            if (     ( this.props.dcrtype=="mcr" &&  sessionStorage.getItem("n_balqtyvalidateMCR")=="1"  ) || ( this.props.dcrtype=="dcr" &&  sessionStorage.getItem("n_balqtyvalidateDCR")=="1" )  ){
               


                if(! this.totalmout[this.props.item.c_code]){


                    if( this.totalmout[this.props.item.c_code]==0){
                        this.setState({Error:true, Errormsg:"You Don't Have  Enough  Quantity" })
                        return
                    }else{
                   
                   this.totalmout[this.props.item.c_code]=this.props.item.balsumqty-1
                    }
                    

                }

                if( this.totalmout[this.props.item.c_code] < 1){
                    this.setState({Error:true, Errormsg:"You Don't Have  Enough  Quantity" })
                    return
                }
       if(this.props.item.balsumqty >= this.state.qtyCounter+1  &&  this.state.qtyCounter+1 > 0){
        this.setState({
            qtyCounter: ++this.state.qtyCounter,
        });
      
        this.totalmout[this.props.item.c_code]= this.totalmout[this.props.item.c_code]-1
        this.props.getData(c_name, c_name, true, this.state.qtyCounter,this.props.item,this.props.type)
       }else{
        this.setState({Error:true, Errormsg:"You Don't Have  Enough  Quantity" })
       }
       
               // console.log(this.props.item.balsumqty , this.state.qtyCounter+1 , this.state.qtyCounter+1 , 0)
             
    }else{

        this.setState({
            qtyCounter: ++this.state.qtyCounter,
        });
    
        this.props.getData(c_name, c_name, true, this.state.qtyCounter,this.props.item,this.props.type)
          //console.log(this.props.item.qtyCounter , this.state.qtyCounter+1 , this.state.qtyCounter+1 , 0)
        //alert('oko')
       
    }
        }
    }
  
    decrement(){
        const {c_name} = this.props.item
      //  let localqty = this.props.editQty[this.props.item.c_name]


     
        if(this.props.editQty){

            if(   ( this.props.dcrtype=="mcr" &&  sessionStorage.getItem("n_balqtyvalidateMCR")=="1"  ) || ( this.props.dcrtype=="dcr" &&  sessionStorage.getItem("n_balqtyvalidateDCR")=="1"  )){
           
          

                if(!this.totalmout[this.props.item.c_code]){

                   
                  this.totalmout[this.props.item.c_code]=this.props.item.balsumqty
                    

                }
           if(this.props.item.balsumqty >=this.state.localQty-1  && this.state.localQty-1 >0){
                this.setState({
                localQty: --this.state.localQty                  
            });
           this.totalmout[this.props.item.c_code]= this.totalmout[this.props.item.c_code]+1
            this.props.getData(c_name, c_name, true, this.state.localQty,this.props.item,this.props.type)
        }
        }else{
            this.setState({
                localQty: --this.state.localQty                  
            });
            this.props.getData(c_name, c_name, true, this.state.localQty,this.props.item,this.props.type)
        }

        }else{
            if(  ( this.props.dcrtype=="mcr" &&  sessionStorage.getItem("n_balqtyvalidateMCR")=="1"  ) || ( this.props.dcrtype=="dcr" &&  sessionStorage.getItem("n_balqtyvalidateDCR")=="1" )  ){
               
                if(this.props.item.balsumqty >=this.state.qtyCounter-1  && this.state.qtyCounter-1 > 0){
                
                if(this.state.qtyCounter > 1){
                        this.setState({
                            qtyCounter: --this.state.qtyCounter                  
                        });
                    }
                    this.setState({
                        qtyCounter: this.state.qtyCounter
                    });
                   this.totalmout[this.props.item.c_code]=this.totalmout[this.props.item.c_code]+1
                    this.props.getData(c_name, c_name, true, this.state.qtyCounter,this.props.item,this.props.type)
                }
        }else{
            if(this.state.qtyCounter > 1){
                this.setState({
                    qtyCounter: --this.state.qtyCounter                  
                });
            }
            this.setState({
                qtyCounter: this.state.qtyCounter
            });

this.props.getData(c_name, c_name, true, this.state.qtyCounter,this.props.item,this.props.type)
        }
    }
    }

    render(){ 
       


        //console.log( this.props.dcrtype,sessionStorage.getItem("n_Balanceqtydisplay_mcr")=="1" , this.props.dcrtype , "dcr" ,  sessionStorage.getItem("n_Balanceqtydisplay_dcr")  )
        return(
            <div className=" samples-item">
                <Row>
                    <Col lg={6} md={6} sm={6}>
                        <Form.Check 
                            custom
                            type="checkbox"
                            checked={ this.props.selection }
                            id={  "checkboxid"+this.props.dsccode + this.props.item.c_code + this.props.id }
                            label={this.props.item.c_name.toLowerCase()}
                            className="mb-2 jointCheck"
                            data-tag={this.props.item}
                            key={  "checkbox"+this.props.dsccode + this.props.item.c_code + this.props.id }
                            name={this.props.item.c_name}
                            onChange={this.handleChange}
                            className="m-0"
                        />
                    </Col>
                  {   ( this.props.dcrtype=="mcr" &&  sessionStorage.getItem("n_Balanceqtydisplay_mcr")=="0"  ) || ( this.props.dcrtype=="dcr" &&  sessionStorage.getItem("n_Balanceqtydisplay_dcr")=="0" )  ? <Col lg={3} md={6} sm={3}>
                        <span  className="balQty" >  Bal Qty  ( {   this.totalmout[this.props.item.c_code]  ||  this.totalmout[this.props.item.c_code]=="0" ?  this.totalmout[this.props.item.c_code] :  this.props.item.balsumqty})</span>
                        
                    </Col> :null
                    }
                    <Col lg={3} md={6} sm={3}>
                        <div className="flex-row">
                        {this.props.selection ? <QtyCounter  balsumqty={this.props.item.balsumqty}   qtyCounter={this.state.qtyCounter} localincreQty={this.increment} localdecQty={this.decrement} editQty={this.props.editQty  ? this.state.localQty :'edit'} increment={this.increment} decrement={this.decrement} /> : null}
            
                        </div>
                   
                    </Col>
                </Row>
                
               
                <StatusPopup
                                message={this.state.Errormsg}
                                show={this.state.Error}
                                onClose={this.Errorclose}
                                success={false}
                            />
            
            </div>
        )
    }
}
export default PramotionsCheckbox