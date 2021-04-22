import React from "react";
import { Row, Col } from "react-bootstrap";

import CircularListView from "./CircularListView";
import CircularContentView from "./CircularContentView";

class CircularDividedView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name:''
        };
        this.getfilename=this.getfilename.bind(this)
    }

 getfilename(name){

this.setState({  name:name })

 }

    componentDidUpdate(prevProps, prevState) {
        
    }

    render() {
        return (
            <div>
                <Row>
                    <Col sm={3}>
                        <h5 className="text-center">Circular List</h5>
                        <hr/>
                        <CircularListView   getfilename={this.getfilename}  />
                    </Col>
                    <Col sm={9}>
                        <h5 className="text-center">Circular View</h5>
                        <hr/>
                        <CircularContentView  filename={this.state.name} />
                    </Col>
                </Row>
            </div>
        );
    }
}
export default CircularDividedView;
