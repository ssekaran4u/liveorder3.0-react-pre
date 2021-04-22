/* creating component for adding textarea with character count */

import React,{Component} from 'react'
import { Form,Row,Col } from 'react-bootstrap'

class DCRNote extends Component{
        constructor(props){
        super(props)
        this.state={
            time:new Date().getHours()+":"+new Date().getMinutes(),
            chars_left:500,
            max_char:500,
            maxlengthText:'500',
             
        }
        this.handleWordCount = this.handleWordCount.bind(this)  
    }
        handleWordCount(event){
        const charCount = event.target.value.length;
        const maxChar = this.state.max_char;
        const charLength = maxChar - charCount;
        
        
        this.setState({
            showRemaing:false,
            maxlengthText:charLength
        })
        }
        render(){
            return(
                <Row>
                    <Col lg={5} md={5} sm={12} xs={12} >
                        <Form.Label className="customized-label">Note</Form.Label>
                        <span className="maxLength">Max <span className="maxlenColor">{this.state.maxlengthText}</span> Character</span>  
                        <Form.Control as="textarea" rows="3" placeholder='write here' onChange={this.handleWordCount} />
                    </Col>
                            
                </Row>
                )
        }
   
}
export default DCRNote


