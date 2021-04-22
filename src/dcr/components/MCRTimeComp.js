import React,{Component} from 'react'
import {Form} from 'react-bootstrap'



class  MCRTimeComp extends Component{
   
    constructor(props){
      
        super(props)
        this.state={
            morActive:true,
            eveActive:false
        }
        this.handleMorning = this.handleMorning.bind(this)
        this.handleEvng = this.handleEvng.bind(this)
    }
    
    handleMorning(){ 
        
        this.setState({
            morActive:!this.state.morActive,
            eveActive:!this.state.eveActive
            
        })
        this.props.Morningfun('M')
    }
    handleEvng(){
        this.setState({
            morActive:!this.state.morActive,
            eveActive:!this.state.eveActive
        })
        this.props.Morningfun('E')
    }


     componentDidUpdate(olsprops,oldstate){
        if(olsprops.dsccode!=this.props.dsccode || olsprops.Editmodedata != this.props.Editmodedata ){
            if(this.props.Editmodedata){
                if( this.props.Editmodedata['Dwrdetails']){
    
                    Object.keys(this.props.Editmodedata['Dwrdetails']).map( (next)=>{
    
                       if(!this.props.dsccode)
                       return
                        if(this.props.dsccode.trim() == this.props.Editmodedata['Dwrdetails'][next]["C_DSC_Code"].trim() ){
                            const val=this.props.Editmodedata['Dwrdetails'][next]["c_moreve"].trim()
                           
                           
                            if(val=='M'){
                            this.props.Morningfun('M')
                            this.setState( {morActive:true,eveActive:false})
                            }
                            else{
                                this.setState( { morActive:false, eveActive:true})
                                this.props.Morningfun('E')
                            }
                        }
                    })
                }
              
            } 
        }
     }
    // componentDidMount(){
    //     if(this.props.Editmodedata){
    //         if( this.props.Editmodedata['Dwrdetails']){

    //             Object.keys(this.props.Editmodedata['Dwrdetails']).map( (next)=>{

    //                if(!this.props.dsccode)
    //                return
    //                 if(this.props.dsccode.trim() == this.props.Editmodedata['Dwrdetails'][next]["C_DSC_Code"].trim() ){
    //                     const val=this.props.Editmodedata['Dwrdetails'][next]["c_moreve"].trim()
                       
                       
    //                     if(val=='M'){
    //                     this.props.Morningfun('M')
    //                     this.setState( {morActive:true,eveActive:false})
    //                     }
    //                     else{
    //                         this.setState( { morActive:false, eveActive:true})
    //                         this.props.Morningfun('E')
    //                     }
    //                 }
    //             })
    //         }
          
    //     }
    // }
    
    
    render(){
        return(
            <div className="mcrFlex timeSlot">
                
                <div className="timeSpan" onClick={this.handleMorning}>
                    <span className={this.state.morActive ? ' activeImg' : ""}>Morning</span> 
                    {this.state.morActive ? <img src="../public/assets/images/morning_active.png" className="morImg"/> : <img src="../public/assets/images/morning_inactive.png" className="morImg"/> }
                </div>
                <div className="timeSpan padding3" onClick={this.handleEvng}>
                    <span className={this.state.eveActive ? ' activeImg' : " "}>Evening</span>
                    {this.state.eveActive ? <img src="../public/assets/images/night_active.png" className="morImg" /> : <img src="../public/assets/images/night_inactive.png" className="morImg" /> }
                    
                </div>
            </div>
            )
    }
}
export default MCRTimeComp

