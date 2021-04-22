import React,{Component} from 'react'
import UserListPopup from './UserListPopup'

class UserDetailsList extends Component{
    constructor(props){
        super(props)
        this.state={
            showList:false
        }
        this.showUseDet = this.showUseDet.bind(this)
    }

    showUseDet(){
        this.setState({
            showList:!this.state.showList
        })
    }
    render(){ 
        return(
            <React.Fragment>
                 {this.props.usercount ?
                    <div onMouseOver={this.showUseDet} onMouseOut={this.showUseDet} className={this.props.color}>{this.props.usercount }
                        {this.state.showList ? <UserListPopup name={this.props.name} data={this.props.data}/> : null}
                    </div>
                : null}
            </React.Fragment>
        )
    }
}

export default UserDetailsList