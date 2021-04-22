import React,{Component} from 'react'
import {Table} from 'react-bootstrap'
import Collapsible from 'react-collapsible';
import {postToServer} from '../../lib/comm-utils'

class RCPA extends Component{
    constructor(props){
        super(props)
        this.state = {
            rcpadata:[],
            company:[],
            compititor:[]
            
        }
        this.getRcpa = this.getRcpa.bind(this)
        this.loadDetails=this.loadDetails.bind(this)
    }
    loadDetails(data1){ 

        this.setState({ company:[] ,compititor :[]})
        
        var data={"index":"RCPA_calender_details","Data":{"doc":data1[0].C_DOCTOR_CODE , "che":data1[0].C_SOURCE_CODE }}


        postToServer("Calender",data).then( (Result)=>{ 
            if(Result.data.Status == 'Fail'){
               this.setState({ rcpadata: [] })
            }else{
              
               this.setState({ company: Result.data["Company"] ,compititor :Result.data["Competator"]})
            }
           }).catch(  (Error)=> {  
               this.setState({ Error: true, Errormsg: "Error in App At RCPA API " })
            }  )


    }
    componentDidMount(){
        this.getRcpa()
    }
    getRcpa(){
        var data={"index":"RCPA_calender",
                  
                    "Data":{"doc":this.props.dcode }}
        postToServer("Calender",data).then( (Result)=>{ 
         if(Result.data.Status == 'Fail'){
            this.setState({ rcpadata: [] })
         }else{
           
            this.setState({ rcpadata: Result.data })
         }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At RCPA API " })
         }  )
    }
    render(){

        
        let rcpadic={}
        if(this.state.rcpadata != ""){
        this.state.rcpadata.map((item) =>{



             if(rcpadic[item.C_Name]){
                var list =[]
                list=rcpadic[item.C_Name]
                list.push(item)
                rcpadic[item.C_Name]=list
             }else{
              var list =[]
              list.push(item)
              rcpadic[item.C_Name]=list
             }
            
            
        })
    }

    
        
        if(!this.state.rcpadata){
            return null
        }
        // Object.keys(rcpadic).map((item, index) =>
        //     console.log("heheeh",item)
        // )
        // {Object.keys(rcpadic).map((item, index) => 
        //     console.log("ji",item)

        // }
       
        
        return(
            // C_BRAND_CODE: "BR001"
            // C_DOCTOR_CODE: "D033430"
            // C_Name: "BRAND1"
            // C_SOURCE_CODE: "01"
            // docName: "B V KINIKAR  "
            
            <div>
                <div className="dcrPopupPad">
                {Object.keys(rcpadic).map((item, index) =>
                    <div className="productInfo"> 
                        <Collapsible onOpen={  ()=>(this.loadDetails(rcpadic[item]) ) } trigger={
                            <div className="product-sec">
                                <div className="product-img">
                                    <img src="../public/assets/images/medicine-img.svg" />
                                </div>
                                <div className="product-details">
                                    <div className="productName">{item}(  For Dr { rcpadic[item][0] ? rcpadic[item][0]["docName"] ?  rcpadic[item][0]["docName"]:null:null })</div>
                                    <div className="productSubTxt">Analysis based on chemist report </div>
                                </div>
                                <div className="toggle-img"><img src="../public/assets/images/arrow-grey@2x.png"/></div>
                            </div>}
                            >
                            {this.state.company.map((index,val) => {
                             return <div className="product-detail-list">
                                
                                  <div>
                                      
                                <ul>
                                    <li>prescribed:{index.N_RX}</li> 
                                    <li>value:{index.N_VALUE}</li>
                                    <li>competitive Brand: <span className="playImgPad"><img src="../public/assets/images/play-button.svg"/></span></li>
                                </ul> 
                                </div>
                                
                            </div>
                            })}
                           
                            <div className="tableBox">
                                <Table responsive width="336px">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Prescribed</th>
                                            <th>Value</th>
                                            <th>Qt.</th>
                                            {/* <th>%</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.compititor.map((index,val) => { return index.C_COMPETITOR_PR_NAME==""?null:
                                        <tr>
                                            <td>{index.C_COMPETITOR_PR_NAME}</td>
                                            <td>{index.N_RX}</td>
                                            <td>{index.N_VALUE}</td>
                                            <td>{index.N_QTY}</td>
                                            {/* <td>23%</td> */}
                                        </tr>
                                    })}
                                       
                                    </tbody>
                                </Table>
                            </div>
                        </Collapsible>
                    </div>
                    )}
                    
                </div>
            </div>
        )
    }
}
export default RCPA
