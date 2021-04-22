import React,{Component} from 'react'

class TotalCallsRow extends Component{
    constructor(props){
        super(props)
        this.state={
            ShowCallPopup:false
            
        }

        this.getDetails = this.getDetails.bind(this)
        this.hidePopup= this.hidePopup.bind(this)
    }

    getDetails(){
        this.setState({
            ShowCallPopup:!this.state.ShowCallPopup
        })
    }

    hidePopup(){
        this.setState({
            ShowCallPopup:false
        })
    }
  
    render(){

        let chemist =0
        let  doct=0
        let  Stockist=0
        let hospital=0
       // console.log( this.props.totalWeekCount,'kunal sinhaa')


        chemist=this.props.totalWeekCount[this.props.index2] ?  this.props.totalWeekCount[this.props.index2] ["CHEMIST"] ?  this.props.totalWeekCount[this.props.index2] ["CHEMIST"] :0:0
        doct=this.props.totalWeekCount[this.props.index2] ?  this.props.totalWeekCount[this.props.index2] ["DOCTOR"] ?  this.props.totalWeekCount[this.props.index2] ["DOCTOR"] :0:0 
       
        Stockist=this.props.totalWeekCount[this.props.index2] ?  this.props.totalWeekCount[this.props.index2] ["OTHERS"] ?  this.props.totalWeekCount[this.props.index2] ["OTHERS"] :0:0
        hospital=this.props.totalWeekCount[this.props.index2] ?  this.props.totalWeekCount[this.props.index2] ["STOCKIST"] ?  this.props.totalWeekCount[this.props.index2] ["STOCKIST"] :0:0 
       
        //  console.log(this.props.TotalIndexcount[this.props.index2] ?  this.props.TotalIndexcount[this.props.index2] :'NO DATA'  ,'kunal sinha')
        //  console.log(this.props.index2,'kunal sinha')

        //  if(this.props.TotalIndexcount[this.props.index2]){
  
        //     Object.keys(this.props.TotalIndexcount[this.props.index2]).map( (a)=> { 
               
               
        //         chemist = chemist + this.props.TotalIndexcount[this.props.index2][a]["CHEMIST"] ? this.props.TotalIndexcount[this.props.index2][a]["CHEMIST"] :0
        //         doct= doct + this.props.TotalIndexcount[this.props.index2][a]["DOCTOR"] ? this.props.TotalIndexcount[this.props.index2][a]["DOCTOR"] :0 
        //         console.log(  doct ,chemist ,'Yes')
        //     })

        //  }
        return(
            
                <th scope="col" >
                            <div onMouseOver={this.getDetails} onMouseLeave={this.hidePopup}> {this.props.callDetails ?  this.props.callDetails  : 0 } </div> 
                            {this.state.ShowCallPopup ?  
                                <div className="calldetails">
                                    <div className="totalCallsHeading">TOTAL CALLS</div>
                                    <div className="flex-row">
                                        <div className="flex-row" >
                                            <div className="flexDisplay">
                                                <div className="callsCircle circOrgColor"><img src="../public/assets/images/stethoscope.png" /></div>
                                                <div className="noOfcalls">{doct} calls</div>
                                            </div>
                                            {/* <div className="flexDisplay">
                                                <div className="callsCircle circBlueColor"><img src="../public/assets/images/hospital_sfc.png" /></div>
                                                <div className="noOfcalls">15 calls</div>
                                            </div> */}
                                        </div>
                                        <div className="flex-row" >
                                            <div className="flexDisplay">
                                                <div className="callsCircle circGreenColor"><img src="../public/assets/images/package.png" /></div>
                                                <div className="noOfcalls">{hospital} calls</div>
                                            </div>
                                            <div className="flexDisplay">
                                                <div className="callsCircle circSkyBlueColor"><img src="../public/assets/images/leaf_sfc.png" /></div>
                                                <div className="noOfcalls">{Stockist} calls</div>
                                            </div>
                                        </div>
                                        <div className="flex-row" >
                                            <div className="flexDisplay">
                                                <div className="callsCircle circSkyRedColor"><img src="../public/assets/images/drugs_sfc.png" /></div>
                                                <div className="noOfcalls">{chemist} calls</div>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                            : null}                
                </th>
            
        )
    }
}

export default TotalCallsRow