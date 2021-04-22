import React,{Component} from 'react'
import CalanderProfileDetails from '../components/CalanderPfroleDetails';

class ProfilePopup extends Component{
    constructor(props){
        super(props)
        this.state={
            enduser:false
        }


    }



    render(){
        return(
            <div>
                <div className="">
                     <div className="calanderWeeklyDetail">
                         {/* <div  onMouseOver={this.showEnduser} onMouseOut={this.showEnduser}  className="doctorYellow">{this.props.countdoc}
                         {this.state.enduser ? <div className=""><EndUserDetail /></div> : ''}
                         </div> */}
                       {this.props.countdoc > 0 ?  <CalanderProfileDetails   name="doc" profile={this.props.countdoc} profileColor="doctorYellow" profileName={this.props.profileDet} /> :null}

                         {/* <div  onMouseOver={this.showEnduser}   onMouseOut={this.showEnduser} className="stockistGreen">{this.props.countSTOCKIST}
                         {this.state.enduser ? <div className="endpopup"><EndUserDetail /></div> : ''}
                         </div> */}
                      { this.props.countSTOCKIST >0 ? <CalanderProfileDetails name="stock" profile={this.props.countSTOCKIST} profileColor="stockistGreen" profileName={this.props.profileDet} /> :null}

                      { this.props.countCHEMIST > 0 ?  <CalanderProfileDetails  name="Che" profile={this.props.countCHEMIST} profileColor="chemistRed" profileName={this.props.profileDet} /> :null}
                         {/* <div  onMouseOver={this.showEnduser}   onMouseOut={this.showEnduser} className="hospitalPurple">{this.props.countHOSPITAL}
                         {this.state.enduser ? <div className="endpopup"><EndUserDetail /></div> : ''}
                         </div> */}
                       {this.props.countHOSPITAL >0 ?  <CalanderProfileDetails  name="Hos" profile={this.props.countHOSPITAL} profileColor="hospitalPurple" profileName={this.props.profileDet} /> :null}

                         {/* <div   onMouseOut={this.showEnduser} onMouseOver={this.showEnduser} className="otherBlue">{this.props.countOTHERS}
                         {this.state.enduser ? <div className="endpopup"><EndUserDetail /></div> : ''}
                         </div> */}
                        { this.props.countOTHERS>0 ?  <CalanderProfileDetails  name="other" profile={this.props.countOTHERS} profileColor="otherBlue" profileName={this.props.profileDet} /> :null}

                         {/* <div   onMouseOut={this.showEnduserche} className="chemistRed"  onMouseOver={this.showEnduserche} >{this.props.countCHEMIST}
                        {this.state.enduser ? <div className="endpopup"><EndUserDetail /></div> : ''} */}

                             {/* <ReactHover
                                 options={options1}>
                                 <ReactHover.Trigger type='trigger'>
                                     <span> 04 </span>
                                 </ReactHover.Trigger>
                                 <ReactHover.Hover type='hover'>
                                     <EndUserDetail />
                                 </ReactHover.Hover>
                             </ReactHover> */}

                         {/* </div> */}
                      
                     </div>
                 </div>
            </div>
        )
    }
}

export default ProfilePopup