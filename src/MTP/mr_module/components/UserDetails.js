import React,{Component} from 'react'
import UserDetailsList from '../components/UserDetailList'

class UserDetails extends Component{
    constructor(props){
        super(props)
    }
    
    render(){ 
      //  console.log("dd",this.props.item,this.props.tempdata)
      
        let doccount
        let chemistcount
        let stockistcount
        let othercount
        let docdata
        let chemdata
        let stockdata
        let otherdata
        let nchemistcount
       let otherWcount
       let otherWdata
       let HOSPITAL
         if(this.props.tempdata){ 
       // Object.keys(this.props.tempdata).map((item)=>{
            if(Array.isArray(this.props.tempdata['DOCTOR'])){
                if(this.props.tempdata['DOCTOR']){
                    doccount = this.props.tempdata['DOCTOR'].length
                    docdata = this.props.tempdata['DOCTOR']
                }
            }else{
                if(this.props.tempdata['DOCTOR']){
                    doccount = this.props.tempdata['DOCTOR']
                   // docdata = this.props.tempdata['DOCTOR']
                }
            }
            if(Array.isArray(this.props.tempdata['CHEMIST'])){
                if(this.props.tempdata['CHEMIST']){
                    chemistcount = this.props.tempdata['CHEMIST'].length
                    chemdata = this.props.tempdata['CHEMIST']
                }
            }else{
                if(this.props.tempdata['CHEMIST']){
                    chemistcount = this.props.tempdata['CHEMIST']
                   // docdata = this.props.tempdata['DOCTOR']
                }
            }
            if(Array.isArray(this.props.tempdata['STOCKIEST'])){
                if(this.props.tempdata['STOCKIEST']){
                    stockistcount = this.props.tempdata['STOCKIEST'].length
                    stockdata = this.props.tempdata['STOCKIEST']
                }
            }else{
                if(this.props.tempdata['STOCKIEST']){
                    stockistcount = this.props.tempdata['STOCKIEST']
                   // docdata = this.props.tempdata['DOCTOR']
                }
            }
            if(Array.isArray(this.props.tempdata['OTHER'])){
                if(this.props.tempdata['OTHER']){
                    othercount = this.props.tempdata['OTHER'].length
                    otherdata = this.props.tempdata['OTHER']
                }
            }else{
                if(this.props.tempdata['OTHERS']){
                    othercount = this.props.tempdata['OTHERS']
                   // docdata = this.props.tempdata['DOCTOR']
                }
            }
            if(Array.isArray(this.props.tempdata['OTHER_Work'])){
                if(this.props.tempdata['OTHER_Work']){
                    otherWcount = this.props.tempdata['OTHER_Work'].length
                    otherWdata = this.props.tempdata['OTHER_Work']
                }
            }else{
                if(this.props.tempdata['OTHER_Work']){
                    otherWcount = this.props.tempdata['OTHER_Work']
                   // docdata = this.props.tempdata['DOCTOR']
                }
            }



            if(Array.isArray(this.props.tempdata['HOSPITAL'])){
                if(this.props.tempdata['HOSPITAL']){
                    HOSPITAL = this.props.tempdata['HOSPITAL'].length
                    HOSPITAL = this.props.tempdata['HOSPITAL']
                }
            }else{
                if(this.props.tempdata['HOSPITAL']){
                    HOSPITAL = this.props.tempdata['HOSPITAL']
                   // docdata = this.props.tempdata['DOCTOR']
                }
            }
            if(Array.isArray(this.props.tempdata['hospital'])){
                if(this.props.tempdata['hospital']){
                    HOSPITAL = this.props.tempdata['hospital'].length
                    HOSPITAL = this.props.tempdata['hospital']
                }
            }else{
                if(this.props.tempdata['hospital']){
                    HOSPITAL = this.props.tempdata['hospital']
                   // docdata = this.props.tempdata['DOCTOR']
                }
            }
      //  })
      
    }
        
    // }
   
        return(
            
            <div>
                <div className="flexDisplay rightToLeft">
                    <UserDetailsList color="userCircleYellow" name="doctor" usercount={doccount} data={docdata? docdata: null}/>
                   <UserDetailsList color="userCircleGreen" name="stock" usercount={stockistcount} data={stockdata ?stockdata:null}/>
                   <UserDetailsList color="userCircleRed" name="chemist" usercount={chemistcount} data={chemdata?chemdata:null}/>
                {/* </div> */}
                {/* <div className="flexDisplay"> */}
                    <UserDetailsList color="userCirclePurple" name="other_work" usercount={otherWcount} data={otherWdata ?otherWdata:null}/>
                    <UserDetailsList color="userCircleBlue" name="others" usercount={othercount} data={otherdata ?otherdata:null}/>
                    <UserDetailsList color="userCircleBlue" name="HOSPITAL" usercount={HOSPITAL} data={null} />
                </div>
            </div>
        )
    }
}
export default UserDetails