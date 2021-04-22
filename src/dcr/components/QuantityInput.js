import React,{Component} from 'react'
import { Dropdown , Form,Button,Row,Col} from 'react-bootstrap'

class QuantityInput extends Component{
    constructor(props){
        super(props)
        this.state={
            value:0,
            curentpop:{}
        }
        this.valChange = this.valChange.bind(this)
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log(nextProps,prevState,'kunal sinha')
    // }

    // componentWillReceiveProps(nextProps){


    //     // if(this.state.value){
    //     // console.log('-----------------------------------------------------------------------')
    //     // console.log( "next",nextProps.currentpop,this.props.currentpop,'sinha final yry')
    //     // console.log('-----------------------------------------------------------------------')
    //     // }
    //     // if(nextProps.someValue!==this.props.someValue){
    //     //   //Perform some operation
    //     //   this.setState({someState: someValue });
    //     //   this.classMethod();
    //     // }
    //   }

    componentDidUpdate(oldprops,oldsatate)
    {
       if(oldprops.clearAll!=this.props.clearAll)
       {
        this.setState({value:''})
       }
    }
     

    componentWillReceiveProps(nextProps) {


        //console.log(nextProps.currentpop[this.props.id])
        if(!this.props.currentpop[this.props.id])
        {

            //console.log("deletd")
            this.setState({value:0})
        }
        // for (const index in nextProps) {
        //     console.log(nextProps[index] )
        //   if (nextProps[index] !== this.props[index]) {
        //     console.log(index, this.props[index], '-->', nextProps[index]);
        //   }
        // }
      }


      componentDidMount(){
          if(this.props.loadtextvalue){
        if(this.props.loadtextvalue[this.props.id]){
            const val=this.props.loadtextvalue[this.props.id]
            this.setState({value:val})
            this.props.updatedpop( this.props.id,val ,this.props.data.nm,this.props.data.rate)
           }
     }
    }
    // componentDidUpdate(prevProps,prevState) {
    //     if(this.props.data){

    //          console.log(this.props.currentpop, this.state.curentpop,'kunal sinha ---<>', prevState.curentpop ) 
    //     // if(!this.props.currentpop[this.props.data.nm]){
    //     //     //console.log('came -->>',this.props.data.nm,this.state.value,this.state.value)
    //     //     // if(this.state.value>0){
    //     //     // console.log(this.props.data.nm,'jack')
    //     //     // this.setState({value:0})
    //     //     // }
    //     // }
    // }
    //     //  console.log('-------------------------------------------------------------------------------------')
    //     //  console.log(prevProps,this.props,'kunal sinha')
    //     //  console.log('-------------------------------------------------------------------------------------')
    //     // if (this.props.currentpop[prevState.data.nm] != prevProps[this.props.data.nm]) {
            

    //     //     alert('vvv')
    //     //     //this.setState({listsate:false})
    //     // }
    // }
    valChange(event){ 

     //
        var data=/^[0-9]*$/
         const {value}= event.target

         if(sessionStorage.getItem("ActiveDCR")=="null"){
            sessionStorage.setItem("ActiveDCR",this.props.docid)
           }
         if(value.length<6){
         if(data.test(value)){
             const v=this.props.currentpop
         this.setState({ value: 1 * value ,curentpop:v})
         this.props.updatedpop( this.props.id,value , this.props.data.nm,this.props.data.rate)
         }
        }
     // this.props.update(this.props.data,Qty,id)
    }


    
    render(){ 
        let total = parseFloat(this.state.value) *  parseFloat(this.props.data.rate)
        if(total != 0){
            total = total.toFixed(2)
        }

        
        return(


            <div   className="pobDiv">
            <div className="borderBot">
                <div className="productNameSec">{this.props.data.nm.toLowerCase()}</div>
                    <div className=" padding15 productDetSec">
                        <Row>
                            <Col lg={3} md={3} sm={6} xs={12} >
                                <div className="flexrows">
                                    <div>Price:{ this.props.data.rate}</div>
                                </div>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={12} >
                                <div className="flexrows">
                                <Row>
                                    <Col lg={8} md={8} sm={8} xs={6} >
                                    <div>Quantity:</div>
                                    </Col>
                                    <Col lg={4} md={4} sm={4} xs={6}  >
                                        <span className="qtyinput">
                                            <Form.Control 
                                                type="text" 
                                                id={this.props.id}
                                                className="qtyValue" 
                                                value={  this.state.value  } 
                                                name={this.props.id}
                                              onChange={this.valChange}             
                                            /> 
                                        </span>
                                    </Col>
                                                    </Row>
                                                    </div>
                                                </Col>
                                                <Col lg={3} md={3} sm={6} xs={6} >
                                                    <div className="flexrows totalRow">
                                                        <div>Total:&nbsp;
                                                            {/* {this.state.value == undefined ?  //Math.round( */}
                                                            <span>{total}</span>
                                                            {/* <span>{Math.round(this.props.data.nqty * this.props.data.rate)}.00</span>} */}
                                                        </div>
                                                    </div>
                                                </Col>
                                                
                                            </Row>
                                        </div>
                                </div>
                            </div>
                
        )
    }
}
export default QuantityInput
