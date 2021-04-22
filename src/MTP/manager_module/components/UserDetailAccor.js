import React,{Component} from 'react'
import { Accordion,Form,Button } from 'react-bootstrap';
import DetailAction from './DetailAction'
import {postToServer} from '../../../lib/comm-utils'
import StatusPopup from '../../../lib/StatusPopup'
import Card from "react-bootstrap/Card"


class UserDetailAccor extends Component{
    constructor(props){
        super(props)
        this.state={
            proList:[],
            showStatusModal:false,
            selectedDoc:{},
            downlineDoc:[]
        }
        //this.getDetails = this.getDetails.bind(this)
        this.saveWorkingWith = this.saveWorkingWith.bind(this)
        this.hideStatusModal = this.hideStatusModal.bind(this)
        this.loadOldWorkwith=this.loadOldWorkwith.bind(this)
    }


    loadOldWorkwith(){
        var data ={"Data": {
            "Month": this.props.month,
            "FSCode": this.props.fscode,
            "Year": this.props.year,
            "day":this.props.day,
            "subarea":localStorage.getItem("areaCode"),
            
        },
        "index": "MTP_Workwith_details_doc",
        "Token": "",
        "menuid": "38"
    }
    postToServer("MTP_Manager",data).then( (Result)=>{ 
        console.log(Result,'okok')
        let selectedDoc={}
        Result.data.map((a)=>{

            if (a.c_work_with!=null){
            selectedDoc[a.C_Doc_Code]=true
            }
           
        })
         this.setState({selectedDoc:selectedDoc})
    }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })
    }


componentDidUpdate(propsold,stateold){
   

    //console.log( this.props.downlineDoc ,' this.props.downlineDoc')

    if (this.props.downlineDoc!=propsold.downlineDoc){
    let m={}
    this.props.downlineDoc.filter(x => x.c_work_with !='' ).map((a)=>{
        m[a.C_Doc_Code]=true
       // alert('ddd')

    })
    this.setState({ selectedDoc:m })
    }


}


// static getDerivedStateFromProps(props, state){
//     console.log(this.props.Datakey,'kunal')
// }

    componentDidMount(){


        
        let m={}
        this.props.downlineDoc.filter(x => x.c_work_with !='' ).map((a)=>{
            m[a.C_Doc_Code]=true
            // alert('ddd')

        })
        this.setState({ selectedDoc:m })


         //const kk=this.props.Datakey
         //this.setState({selectedDoc:kk})

         

        

    //     var data = {"Data": {
    //         "Month": this.props.month,
    //         "FSCode": this.props.fscode,
    //         "Year": this.props.year,
    //         "day":this.props.day
    //     },
    //     "index": "MTP_Downline_details",
    //     "menuid": "38"
    //  }
    // postToServer("MTP_Manager",data).then( (Result)=>{ 
    //     //if(Result.data.Status == 'Success'){ 
    //       if(Result.data == null){
    //         this.setState({ 
    //             downlineDoc:[]
    //         })
    //       }else{
    //         this.setState({ 
    //             downlineDoc: Result.data 
    //         })
    //       }
           
    //   //  }
    // }).catch(  (Error)=> {  
    //     this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    // })
       // this.loadOldWorkwith();
        //     var data ={"Data": {
        //         "Month": this.props.month,
        //         "FSCode": this.props.fscode,
        //         "Year": this.props.year,
        //         "day":this.props.day
        //     },
        //     "index": "MTP_Downline_Product_Details",
        //     "Token": "",
        //     "menuid": "38"
        // }
        // postToServer("MTP_Manager",data).then( (Result)=>{ 
        // // if(Result.data.Status == 'Success'){ 
            
        //        this.setState({ proList: Result.data })
        //  //   }
        // }).catch(  (Error)=> {  
        //     this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
        // })
    }
    saveWorkingWith( Doc,event){
       


       // console.log(this.state.selectedDoc,Doc,'kunal sinha')
if(sessionStorage.getItem("MTP_M_Action")=="LOCK"){
  
    this.setState({
        msg:"Tp Alredy Approved",
        showStatusModal:!this.state.showStatusModal,
        success:true
    })
    return
}

        const checked=event.target.checked
        if(checked==true){
        let selectedDoc={}
        selectedDoc=this.state.selectedDoc
        selectedDoc[Doc]=true
        this.setState({
            selectedDoc:selectedDoc
        })
        var data ={"Data": {
            "Month": this.props.month,
            "FSCode": this.props.fscode,
            "Year": this.props.year,
            "day":this.props.day,
            "doc":Doc,
            "Type":this.props.N_Type

        },
        "index": "MTP_Workwith_doc",
        "Token": "",
        "menuid": "38"
    }
    postToServer("MTP_Manager",data).then( (Result)=>{ 
        this.setState({
            msg:Result.data[0].Result,
            showStatusModal:!this.state.showStatusModal,
            success:true
        })
    }).catch(  (Error)=> {  
        this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
    })
}else{
    let selectedDoc={}
    selectedDoc=this.state.selectedDoc
    delete selectedDoc[Doc]
    this.setState({
        selectedDoc:selectedDoc
    })
    var data ={"Data": {
        "Month": this.props.month,
        "FSCode": this.props.fscode,
        "Year": this.props.year,
        "day":this.props.day,
        "doc":Doc
    },
    "index": "MTP_Workwith_Delete_doc",
    "Token": "",
    "menuid": "38"
}
postToServer("MTP_Manager",data).then( (Result)=>{ 
    this.setState({
        msg:Result.data[0].Result,
        showStatusModal:!this.state.showStatusModal,
        success:true
    })
}).catch(  (Error)=> {  
    this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
})



}
    }
    hideStatusModal(){
        this.setState({
            showStatusModal:!this.state.showStatusModal
        })
    }
    render(){


        
        let m=[]
        { this.props.downlineDoc.filter(x => x.N_Type == this.props.N_Type).map((a)=>m.push(a))}
        return(
            <div>
                <div className=" marginTop21">
                    {/* <div className="marginBottom parentAccordian"> 
                        <Accordion>
                            {this.props.downlineDoc ? this.props.downlineDoc.map((item,index)=>(
                                <Card key={index} onClick={this.getDetails}>
                                    <Accordion.Toggle as={Card.Header} eventKey={item.C_Doc_Code} >
                                        <div className="pointer capitalizationName longtextWrap">
                                            <div className="flexDisplay"><div><Form.Check
                                custom
                                type="checkbox"
                                id="day1"
                                label="Working With"
                                name=""
                                onChange={this.saveWorkingWith}
                            /></div><div>{item.C_Name}</div></div>
                                        </div>
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey={item.C_Doc_Code}>
                                        <Card.Body>
                                            <div>
                                                <DetailAction 
                                                    date={this.props.date}
                                                    month={this.props.month}
                                                    year={this.props.year}
                                                    day={this.props.day}
                                                    fscode={this.props.fscode}
                                                    proList={this.state.proList}
                                                />
                                            </div>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            )): null}
                           
                        </Accordion>
                    </div> */}
                    
                    {m.map((item,index)=>(
                        <div className="mb20">
                        <Card className="">
                        <div className="flexDisplay card_doctor"><div><Form.Check
                                custom
                                type="checkbox"
                                id={item.C_Doc_Code}
                                label="Working With"
                                name=""
                                //checked={true}
                                checked= {this.state.selectedDoc[item.C_Doc_Code] == true ?  true : false }
                                className="workingCheck"
                                onChange={ (event)=>{ this.saveWorkingWith(item.C_Doc_Code,event) }}
                            /></div>&nbsp;&nbsp;<div className="carddocName">{item.C_Name}</div></div>
                            {/* <div className="card_doctor">{item.C_Name}</div> */}
                           {this.props.N_Type== "1"  ?<DetailAction 
                                item={item}
                                date={this.props.date}
                                month={this.props.month}
                                year={this.props.year}
                                day={this.props.day}
                                fscode={this.props.fscode}
                                proList={this.props.proList}
                                dId={item.C_Doc_Code}
                                
                            /> :null}




{this.props.N_Type== "2" ? <DetailAction 
                                item={item}
                                date={this.props.date}
                                month={this.props.month}
                                year={this.props.year}
                                day={this.props.day}
                                fscode={this.props.fscode}
                                proList={this.props.proList}
                                dId={item.C_Doc_Code}
                                
                            /> :null}



{this.props.N_Type== "3" ? <DetailAction 
                                item={item}
                                date={this.props.date}
                                month={this.props.month}
                                year={this.props.year}
                                day={this.props.day}
                                fscode={this.props.fscode}
                                proList={this.props.proList}
                                dId={item.C_Doc_Code}
                                
                            /> :null}
                        </Card></div>
                    )) }
                   
                </div>
                {/* {this.props.status == "A" || m.length == 0 ? null :
                <div>
                   <div className="actionButtons">
                            <Button
                                variant="secondary"
                                onClick={this.closeModal}
                                className="cancelBtn"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="planBtn"
                                id="saveBtn"
                                onClick={this.handleSubmit}
                            >
                                Save
                            </Button>         
                        </div>
                        </div>} */}
                <StatusPopup
                    message={this.state.msg}
                    show={this.state.showStatusModal}
                    onClose={this.hideStatusModal}
                    success={this.state.success}
                />
            </div>
        )
    }
}

export default UserDetailAccor