import React,{Component} from 'react'
import EndUserDetail from './EndUserDetail';

class CalanderProfileDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            enduser:false,
            selected:''
        }
        this.showEnduser = this.showEnduser.bind(this)
    }

    showEnduser() {


      let  name=this.props.name
        this.setState({
            enduser: !this.state.enduser,selected:name
        })
    }
    render(){ 
        return(
            <React.Fragment>
                <div className="desktopDocList">
                    <div  onMouseOver={this.showEnduser} onMouseOut={this.showEnduser}  className={this.props.profileColor} >{this.props.profile}
                            {this.state.enduser ? <div className="">{this.props.profileName ? <EndUserDetail   selected={this.state.selected}  user={this.props.profileName} color={this.props.profileColor} />:null}

                            </div> : ''}
                    </div>
                </div>
                <div className="mobileDocList">
                    <div  onClick={this.showEnduser}   className={this.props.profileColor} >{this.props.profile}
                            {this.state.enduser ? <div className="">{this.props.profileName ? <EndUserDetail   selected={this.state.selected}  user={this.props.profileName} color={this.props.profileColor} />:null}

                            </div> : ''}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default CalanderProfileDetails