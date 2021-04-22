import React,{Component} from "react";
import { Row, Col } from "react-bootstrap";

class Addresses extends Component{
    constructor(props){
        super(props)
        this.state={}
        this.getcomma = this.getcomma.bind(this)
        
    }
    getcomma(data){
        let comma
        if(data){
          comma = ', ' 
        }else{
          comma = ''
        }
        return comma
      }
      
    render(){
    return (
        <div className="secondrow-firstchem">
            <div className="cbartitle nomar0">ADDRESSES</div>

            <div className="infochemist infobox2">Personal Address</div>
            <div className="valuechem">
               {this.props.data.Address1.toLowerCase() + this.getcomma(this.props.data.Address2) +
                 this.props.data.Address2.toLowerCase() + this.getcomma(this.props.data.Address3) + 
                 this.props.data.Address3.toLowerCase() + this.getcomma(this.props.data.AreaName) +
                 this.props.data.AreaName.toLowerCase() + this.getcomma(this.props.data.Address4) +
                 this.props.data.Address4.toLowerCase() + this.getcomma(this.props.data.Pincode) +
                  this.props.data.Pincode}
                
               
            </div>
            <Row>
                <Col xs={6} sm={3}>
                    <div className="infochemist infobox2">Longitude</div>
                    <div className="valuechem">
                        {this.props.data.Logitute ? (
                            <p>{this.props.data.Logitute}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
                <Col xs={6} sm={6}>
                    <div className="infochemist infobox2">Latitude</div>
                    <div className="valuechem">
                        {this.props.data.Latitude ? (
                            <p>{this.props.data.Latitude}</p>
                        ) : (
                            <div>
                                <p className="dash" />
                                <p className="dash" />
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    );
    }
}

export default Addresses;
