import React,{Component} from 'react'
import { Link, withRouter } from 'react-router-dom';
import EndUserDetail from './EndUserDetail';
import ReactHover from 'react-hover';
import ProfilePopup from '../components/ProfilePopup'
import {getweekDetails} from '../../actions/STP'
import {connect} from 'react-redux'
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
let total={}
let total1 = {}
class TPTDayWise extends Component{
    constructor(props){
        super(props)
        this.state={
            showActiveWeek:false,
            htmldata:null,
            enduser: false,
            cheenduser: false,
            totalcalls: false,
            totalcall1: false,
            show:false,
            hideAlert:false
        }
        this.showEnduserche=this.showEnduserche.bind(this)
        this.getWeeklyInfo= this.getWeeklyInfo.bind(this)
        this.showTotalCalls = this.showTotalCalls.bind(this)
        this.showTotalCalls1 = this.showTotalCalls1.bind(this)
        this.getWeekly=this.getWeekly.bind(this)
        this.onClose=this.onClose.bind(this)
        this.onHide=this.onHide.bind(this)
        this.closeModal=this.closeModal.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }

    handleSubmit(){
        this.props.history.push('/daywise')
    }

    onClose(){
        this.setState({
            show:false,hideAlert:false
        }) 
     }
     onHide(){
         this.setState({
             Error:false
         })
     }
     closeModal(){

        const _this=this 
        _this.setState({show:false, hideAlert:false})
        // this.props.history.push('/tpt/')

        //console.log(this.state.show,this.state.hideAlert,'kunal sinha ')
     }

    getWeekly() {
        this.props.history.push('/daywise/'+this.props.subarea)
    }
    showEnduserche() {
        this.setState({
            cheenduser: !this.state.cheenduser
        })
    }
    showTotalCalls() {
        this.setState({
            totalcalls: !totalcalls
        })
    }
    showTotalCalls1() {
        this.setState({
            totalcall1: !totalcall1
        })
    }
    getWeeklyInfo(data,index2,index1){
        data['week'] = index1+1
        data['day']=  index2 
        this.props.getweekDetails(data)
        localStorage.setItem("week",index1)
        localStorage.setItem("day",index2)
        localStorage.setItem("subarea",this.props.subarea)
        localStorage.setItem("subareaType",this.props.areaType)

         
if(index2=="7"){
   
     this.setState({show:!this.state.show ,hideAlert:true })
     return

}
         

        
        if(this.props.subarea){
            this.props.history.push('/daywise')
        }
       
    }
    componentDidUpdate(oldpr,oldst){
        let countdoc=0;
        let countSTOCKIST=0
        let countHOSPITAL=0
        let countCHEMIST=0
        let countOTHERS=0

        if(oldpr.Loaddata!=this.props.Loaddata){

            //STOCKIST
            //CHEMIST
            //HOSPITAL
            //OTHERS

            if(this.props.subarea!=oldpr.subarea){
                total={}
            }
            if(this.props.Loaddata ){ 
   
   
				let varweek=this.props.index1+1
				let varday=  this.props.index2;  
                if( typeof(this.props.Loaddata)=="object"){
                    this.setState({htmldata:null})
                    //total
                    if(this.props.Loaddata[varweek] && this.props.Loaddata[varweek][varday] ){
                        if(this.props.basecount[varweek] && this.props.basecount[varweek][varday] ){
                            if(this.props.basecount[varweek][varday]["DOCTOR"]){
                              
                                countdoc= this.props.basecount[varweek][varday]["DOCTOR"]
                                if(total[varday]){
                                    total[varday]=countdoc+ total[varday]
                                }else{
                                    total[varday]=countdoc
                                }
                            }
                            if(this.props.basecount[varweek][varday]["OTHERS"]){
                                countOTHERS=this.props.basecount[varweek][varday]["OTHERS"]
                                if(total[varday]){
                                    total[varday]=countOTHERS+ total[varday]
                                }else{
                                total[varday]=countOTHERS
                                }
                            }
                            if(this.props.basecount[varweek][varday]["STOCKIST"]){
                                countSTOCKIST=this.props.basecount[varweek][varday]["STOCKIST"]
                                if(total[varday]){
                                    total[varday]=countSTOCKIST+ total[varday]
                                }else{
                                    total[varday]=countSTOCKIST
                                }
                            }
                            if(this.props.basecount[varweek][varday]["CHEMIST"]){
                                countCHEMIST=this.props.basecount[varweek][varday]["CHEMIST"]
                                if(total[varday]){
                                    total[varday]=countCHEMIST+ total[varday]
                                }else{
                                total[varday]=countCHEMIST
                                }
                                this.setState({total:total})
                            }
                            if(this.props.Loaddata[varweek][varday]["HOSPITAL"]){
                                countHOSPITAL=Object.keys(this.props.Loaddata[varweek][varday]["HOSPITAL"]).length
                                if(total[varday]){
                                    total[varday]=countHOSPITAL+ total[varday]
                                }else{
                                    total[varday]=countHOSPITAL
                                }
                            }
                        }
                    let  htmldata= <ProfilePopup
                        countdoc={countdoc}
                        countOTHERS={countOTHERS}
                        countSTOCKIST={countSTOCKIST}
                        countCHEMIST={countCHEMIST}
                        countHOSPITAL={countHOSPITAL}
                        profileDet={this.props.Loaddata[varweek][varday]}
                    />
                    this.setState({htmldata:htmldata})
                    }else{
                        if(this.props.basecount[varweek]){
                            if(this.props.basecount[varweek][varday]){
                                if(this.props.basecount[varweek][varday]){ 
                                    countCHEMIST=this.props.basecount[varweek][varday]["CHEMIST"]
                                    countSTOCKIST=this.props.basecount[varweek][varday]["STOCKIST"]
                                    countdoc=this.props.basecount[varweek][varday]["DOCTOR"]
                                    countOTHERS=this.props.basecount[varweek][varday]["OTHERS"]
                                   
                                  // total1[varweek] = parseInt(countCHEMIST)+parseInt(countSTOCKIST)+parseInt(countdoc)+parseInt(countOTHERS);console.log("00",total1)
                                let  htmldata= <ProfilePopup
                                    countdoc={countdoc}
                                    countOTHERS={countOTHERS}
                                    countSTOCKIST={countSTOCKIST}
                                    countCHEMIST={countCHEMIST}
                                    countHOSPITAL={0}
                                    profileDet=""
                                />

                                this.setState({htmldata:htmldata})
                                }
                            }
                        }
                    }

                }
            }

        }
       

    }

    render(){
       
        return(
           
           this.props.index2 !='8'?
         <td className={this.props.index2 == '7' ? "sweta":''} onClick={()=>this.getWeeklyInfo(this.props.selecteditem,this.props.index2,this.props.index1)}>     {this.state.htmldata}   
            
         <Modal centered className="alert" show={this.state.show} onHide={this.onClose}>
                <Modal.Body className="text-center">
                <div className="alertImgPad" ><img src="../public/assets/images/danger.svg" /></div>
                    <div className="alertText">Are You Sure ?</div>
                    <div className="alertSubTextCancel">You want Work On Sunday</div>
                    <div className="alertBtns">
                        <Button className=" cancelDelete" onClick={()=>this.closeModal()}>Cancel</Button>
                        <Button className=" okDelete" onClick={this.handleSubmit}>OK</Button>
                    </div>
                </Modal.Body>
            </Modal>  
            </td>
            : <td className="align-middle  week desktopView"   >    Week{parseInt(this.props.index1)+1} ({this.props.rowtotal ?this.props.rowtotal :'0'   }) </td>
        
    
        
           
        
            )

       
    }
}
const mapDispatchToProps = dispatch => ({
    getweekDetails:data => dispatch(getweekDetails(data))
})

export default  connect('',mapDispatchToProps)(withRouter(TPTDayWise))
