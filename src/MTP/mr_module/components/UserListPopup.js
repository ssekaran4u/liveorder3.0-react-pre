import React,{Component} from 'react'

class UserListPopup extends Component{
    constructor(props){
        super(props)
        this.state={
            UserView:''
        }
    }
    componentDidMount(){
        let UserView=[]
       // if(this.props.name == 'chemist'){
            if(this.props.data){
            
              this.props.data.map((item) =>{
                  if(this.props.name == 'others'){
                      
                  }
                
                var a = Object.keys(item)
                //  console.log("item",item[a]['C_Name'])
                    UserView.push(
                        <div>
                            <div className="flexDisplay profilePad">
                                <div className={this.props.name == 'chemist' ? 'userPicRed' :
                                            this.props.name == 'doctor' ? "userPicOrange" :
                                            this.props.name == 'stock' ? "userPicGreen" :
                                            this.props.name == 'others' ? "userPicBlue" : 
                                            this.props.name == 'other_work' ? "userPicPurple" :
                                            this.props.name == 'HOSPITAL' ? "userPicPurple" 
                                            : null}>{item[a]['C_Name'].charAt(0)}</div>
                                <div className="usernametext">{item[a]['C_Name']}</div>
                            </div>
                        </div>
                    )
              })

                this.setState({
                    UserView:UserView
                })
            }
      //  }
       
    }
    render(){
        return(
            <div className={this.props.name == 'chemist' ? 'userpopup chemistBorder' :
                            this.props.name == 'doctor' ? 'userpopup docBorder' :
                            this.props.name == 'stock' ? 'userpopup stockBorder' :
                            this.props.name == 'others' ? 'userpopup otherBorder' :
                            this.props.name == 'other_work' ? 'userpopup otherWorkkBorder' :null}>
                <div className="popupHead">
                    {this.props.name == 'chemist' ? 'CHEMIST' :
                    this.props.name == 'doctor' ? 'DOCTOR' :
                    this.props.name == 'stock' ? 'STOCKIST' :
                    this.props.name == 'others' ? 'OTHERS' :
                    this.props.name == 'other_work' ? 'OTHER WORK TYPE' :null}
                </div>
                <div>{this.state.UserView}</div>
               
            </div>
        )
    }
}

export default UserListPopup