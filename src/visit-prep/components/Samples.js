/*
* This code display samples inside fieldworkdwr
* RequestURL=url/DCRValidation
* Index=getSamplePromotionGiftlist
* Request string={"Token":"","validate":"getSamplePromotionGiftlist","fscode":"","date":"05/05/2019","dcrno":"","drcode":"D026266","ntype":"1"}
* Response string={
    DcrItemSamples:""	
    N_desc:sample
    Stock Balance:-20
    balsumqty:-20
    c_code:PLAPF099
    c_name:APIFEAST SYP
    n_type:2
    qty:""
}
Response Error=null

*/



import React , { Component } from 'react' 
import {Row, Col, Form} from 'react-bootstrap'
import { postToServer } from '../../lib/comm-utils'
import { connect } from "react-redux";

class Samples extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            sampleArray:[]
        }
        this.handleChange = this.handleChange.bind(this)
        this.samplecustome=this.samplecustome.bind(this)
    }
    componentDidMount(){
        
        this.getSamples(this.props.dcode)
    }


    samplecustome(item,type){
        

        this.state.sampleArray.push({
            itemname:item.c_name,
            itemid:item.c_code,
            doc_code:this.props.dcode,
            item:item,
            type:type
        })
        this.props.getSampleValues(this.state.sampleArray)
    }

    getSamples(code){
        var data = {
            "Token": ""
            ,"validate":"getSamplePromotionGiftlist"
            ,"fscode":this.props.fscode
            ,"date":"05/05/2019"// Api change  consider by kunal
            ,"dcrno":""
            ,"drcode":code
            ,"ntype":"1"
        }
     //   this.props.getPramotions(data)

     postToServer('DCRValidation',data).then(  (result )=> { console.log("res",result)
           this.setState({ data:result.data })
         }).catch( (error)=>{
            this.setState({ Error: true, Errormsg: "Error in App" })
     })
     
    }
    handleChange(e){ 
        const  value  = e.target.value
        const id = e.target.id
         const type1=e.target.type1
         //console.log(e.target.attributes[0],e.target)
        
        this.state.sampleArray.push({
            itemname:value,
            itemid:id,
            doc_code:this.props.dcode
        })
        this.props.getSampleValues(this.state.sampleArray)
    }

    render(){
        // return(
        //     <div className="visit-container">
        //         <h3 className="container-head">SAMPLES TO BE GIVEN</h3>
        //         <Row>
        //             {this.state.data.map((item,index) => (
        //                 <Col xl={6}>
        //                     <Form.Check 
        //                         custom
        //                         type="checkbox"
        //                         id={item.c_code}
        //                         label={item.c_name}
        //                         value={item.c_name}
        //                         className="sampleCheckbox"
        //                         onChange={this.handleChange}
        //                     />
        //                 </Col>
        //             ))}
                    
        //         </Row>
        //     </div>
        // )
        const sampleArr = this.state.data.filter(item =>
            item.N_desc == "sample"
        )
        const promotionArr = this.state.data.filter(item =>
            item.N_desc == "Promotional"
        )
        const giftArr = this.state.data.filter(item => 
            item.N_desc == "gift"
        )

        const sampleItems = sampleArr.reduce((prev, item) => { 
                     
                prev.push(
                    <Form.Check 
                   
                                        custom
                                        type="checkbox"
                                        id={item.c_code}
                                        label={item.c_name}
                                        value={item.c_name}
                                        className="sampleCheckbox"
                                        onChange={ ()=>( this.samplecustome(item,"sample") ) }
                                        //onChange={this.handleChange}
                                        type1="sample"
                                    />
                )
            return prev
        }, [])  
        const promotionItems = promotionArr.reduce((prev, item) => { 
           
                prev.push(
                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        id={item.c_code}
                                        label={item.c_name}
                                        value={item.c_name}
                                        className="sampleCheckbox"
                                        onChange={ ()=>( this.samplecustome(item,"promotion") ) }
                                       // onChange={this.handleChange}
                                        type1="promotion"
                                    />
                )
            return prev
        }, [])  

        const giftItems = giftArr.reduce((prev, item) => { 
            
                prev.push(
                    <Form.Check 
                                        custom
                                        type="checkbox"
                                        id={item.c_code}
                                        label={item.c_name}
                                        value={item.c_name}
                                        className="sampleCheckbox"
                                        onChange={ ()=>( this.samplecustome(item,"gift") ) } 
                                     //   onChange={this.handleChange}
                                        type1="gift"
                                    />
                )
            return prev
        }, [])  

        return(
            <div className="visit-container sampleCon">
                <h3 className="container-head">SAMPLES TO BE GIVEN</h3>
                <Row className="sampleCon">
                   
                        
                {/* {this.state.data.map((item,index) => (
                        <Col xl={6}>
                            <Form.Check 
                                custom
                                type="checkbox"
                                id={item.c_code}
                                label={item.c_name}
                                value={item.c_name}
                                className="sampleCheckbox"
                                onChange={this.handleChange}
                            />
                        </Col>
                    ))} */}
                                      <Col xl={6}>
                                        {sampleItems ? 
                                        
                                            <div>
                                                <div className="samples-titlebar">Samples</div>
                                                {sampleItems}
                                            </div>
                                        
                                        : null }
                                        </Col>
                                        <Col xl={6}>
                                        {promotionItems ? 
                                        
                                            <div>
                                                <div className="samples-titlebar">promotions</div>
                                                {promotionItems}
                                            </div>
                                            
                                        : null }
                                        {giftItems ? 
                                        
                                        <div>
                                            <div className="samples-titlebar">Brand Reminder</div>
                                            {giftItems}
                                        </div>
                                    
                                    : null }
                                        </Col>
                                        
                            
                        
                    
                </Row>
           </div>
        )
    }
}


export default Samples