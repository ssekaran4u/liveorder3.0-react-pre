import React from "react";
import { Button } from "react-bootstrap";
import { postToServer } from '../../lib/comm-utils'
class CircularDividedView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listItems: []
        };

        // let items = []
        // for (let i=0; i<100; i++) {
        //     let listItemName = "List Item "+i

        //     items.push({
        //         "id": i,
        //         "title": listItemName
        //     })
        // }
        // this.state.listItems = items

       this.getCircularList=this.getCircularList.bind(this)
    }



 getCircularList(){
    
    var data = {"Index":"List"}
        postToServer("Circular", data).then((result) => {
            // console.log(result)
            if (result.data["Status"] == "Sucess") {
                this.setState({ listItems: result.data["data"]})
            }
        }).catch((Error) => {
            // Error need to handle 
          //  console.log('Error')
        })
    

 }

  componentDidMount(){



    
    this.getCircularList()
  }

    componentDidUpdate(prevProps, prevState) {
        //
    }

    showContent(id, type) {
        console.log("XXX View", id, type)


        this.props.getfilename(id)
    }

    deleteContent(id) {
        
   
        var data = {"Index":"Delete",data:{"c_filename":id } }
        postToServer("Circular", data).then((result) => {
            this.getCircularList()
            // if (result.data["Status"] == "Sucess") {
            //     this.setState({ listItems: result.data["data"]})
            // }
        }).catch((Error) => {
            // Error need to handle 
          //  console.log('Error')
        })
        this.getCircularList()
    }

    render() {
        return (
            <div style={{height: 512, overflow: 'auto'}}>
                <ul className="list-group">
                    {
                        this.state.listItems.map( (listItem,INDEX) => (
                            <li className="list-group-item list-group-item-default">
                                <div style={{display: 'flex'}}>
                                    <div style={{paddingRight:"5px"}}>{INDEX + 1 }</div>
                                    <Button variant="outline-primary" size="sm" style={{marginLeft: "" }} 
                                        onClick = {(e) =>
                                            this.showContent(listItem.c_filename, "IMG")
                                        }>{listItem.c_subject}</Button>
                                    {/* <Button variant="outline-primary" size="sm" style={{marginLeft: 4 }} 
                                        onClick = {(e) =>
                                            this.showContent(listItem.id, "IMG")
                                        }>VID</Button>
                                    <Button variant="outline-primary" size="sm" style={{marginLeft: 4 }} 
                                        onClick = {(e) =>
                                            this.showContent(listItem.id, "PDF")
                                        }>PDF</Button> */}
                                    <Button variant="outline-danger" size="sm" style={{marginLeft: 4}}
                                        onClick = {(e) =>
                                            this.deleteContent(listItem.C_Code)
                                        }>DEL</Button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}
export default CircularDividedView;
