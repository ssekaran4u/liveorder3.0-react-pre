import React, { Component } from 'react';

class EndUserDetail extends Component {
    constructor(props){

        super(props)
        this.state={
            SelectedName:'',
            UserView:null
        }
    }


      componentDidMount(){

        //Che

        if(this.props.selected=='Che'){ 

            this.setState({SelectedName:'CHEMIST'})
            // console.log(this.props.user,'kunal')


            let UserView=[]
            
            if(this.props.user["CHEMIST"])
            {
               this.props.user["CHEMIST"].map( (a)=>{



                   //console.log(Object.keys(a))

                   UserView.push( <div className="meetingUsersTow">
                   <div className="flexDisplay">
                       {/* <img src="../../public/assets/images/clientprofile.png"
                       className={this.props.color == "stockistGreen" ? "greenPicBorder" :
                       this.props.color == "doctorYellow" ? "yellowPicBorder" :
                       this.props.color == "hospitalPurple" ? "purplePicBorder":
                       this.props.color == "otherBlue" ? "bluePicBorder":
                       this.props.color == "chemistRed" ? "chemistPicBorder":
                       ''}
                       /> */}
                        <div className={this.props.color == "stockistGreen" ? "userNameCircle greenPicBorder" :
                        this.props.color == "doctorYellow" ? "userNameCircle yellowPicBorder" :
                        this.props.color == "hospitalPurple" ? "userNameCircle purplePicBorder":
                        this.props.color == "otherBlue" ? "userNameCircle bluePicBorder":
                        this.props.color == "chemistRed" ? "userNameCircle chemistPicBorder":
                        ''}>{ Object.keys(a)[0] ?  a[Object.keys(a)[0]]["C_Name"].charAt(0):null }</div>
                       <div>
                            <div className="tptUserName">{ Object.keys(a)[0] ?  a[Object.keys(a)[0]]["C_Name"]:null }</div>
                       </div>
                    </div>
               </div>)


               })
               this.setState({UserView:UserView})
            }


        }
          if(this.props.selected=='doc'){
            this.setState({SelectedName:'Doctor'})
             //console.log(this.props.user,'kunal')


             let UserView=[]
             if(this.props.user["DOCTOR"])
             {
                this.props.user["DOCTOR"].map( (a)=>{



                    //console.log(Object.keys(a))

                    UserView.push( <div className="meetingUsersTow">
                    <div className="flexDisplay">
                        {/* <img src="../../public/assets/images/clientprofile.png"
                        className={this.props.color == "stockistGreen" ? "greenPicBorder" :
                        this.props.color == "doctorYellow" ? "yellowPicBorder" :
                        this.props.color == "hospitalPurple" ? "purplePicBorder":
                        this.props.color == "otherBlue" ? "bluePicBorder":
                        this.props.color == "chemistRed" ? "chemistPicBorder":
                        ''}
                        /> */}
                        <div className={this.props.color == "stockistGreen" ? "userNameCircle greenPicBorder" :
                        this.props.color == "doctorYellow" ? "userNameCircle yellowPicBorder" :
                        this.props.color == "hospitalPurple" ? "userNameCircle purplePicBorder":
                        this.props.color == "otherBlue" ? "userNameCircle bluePicBorder":
                        this.props.color == "chemistRed" ? "userNameCircle chemistPicBorder":
                        ''}>{ Object.keys(a)[0] ?  a[Object.keys(a)[0]]["C_Name"].charAt(0):null }</div>
                        {/* <span>{ Object.keys(a)[0] ?  a[Object.keys(a)[0]]["C_Name"]:null }</span> */}
                        <div className="fullnameView">
                            <div className="tptUserName">{ Object.keys(a)[0] ?  a[Object.keys(a)[0]]["C_Name"]:null }</div>
                       </div>
                    </div>
                </div>)


                })
                this.setState({UserView:UserView})
             }

          }
          if(this.props.selected=='stock'){ 

            this.setState({SelectedName:'STOCKIST'})
            // console.log(this.props.user,'kunal')


            let UserView=[]
            
            if(this.props.user["STOCKIST"])
            {
               this.props.user["STOCKIST"].map( (a)=>{



                   //console.log(Object.keys(a))

                   UserView.push( <div className="meetingUsersTow">
                   <div className="flexDisplay">
                       {/* <img src="../../public/assets/images/clientprofile.png"
                       className={this.props.color == "stockistGreen" ? "greenPicBorder" :
                       this.props.color == "doctorYellow" ? "yellowPicBorder" :
                       this.props.color == "hospitalPurple" ? "purplePicBorder":
                       this.props.color == "otherBlue" ? "bluePicBorder":
                       this.props.color == "chemistRed" ? "chemistPicBorder":
                       ''}
                       /> */}
                        <div className={this.props.color == "stockistGreen" ? "userNameCircle greenPicBorder" :
                        this.props.color == "doctorYellow" ? "userNameCircle yellowPicBorder" :
                        this.props.color == "hospitalPurple" ? "userNameCircle purplePicBorder":
                        this.props.color == "otherBlue" ? "userNameCircle bluePicBorder":
                        this.props.color == "chemistRed" ? "userNameCircle chemistPicBorder":
                        ''}>{ Object.keys(a)[0] ?  a[Object.keys(a)[0]]["C_Name"].charAt(0):null }</div>
                       <div>
                            <div className="tptUserName">{ Object.keys(a)[0] ?  a[Object.keys(a)[0]]["C_Name"]:null }</div>
                       </div>
                    </div>
               </div>)


               })
               this.setState({UserView:UserView})
            }


        }
        if(this.props.selected=='other'){ 

            this.setState({SelectedName:'OTHERS'})
            // console.log(this.props.user,'kunal')


            let UserView=[]
            
            if(this.props.user["OTHERS"])
            {
               this.props.user["OTHERS"].map( (a)=>{



                   //console.log(Object.keys(a))

                   UserView.push( <div className="meetingUsersTow">
                   <div className="flexDisplay">
                       {/* <img src="../../public/assets/images/clientprofile.png"
                       className={this.props.color == "stockistGreen" ? "greenPicBorder" :
                       this.props.color == "doctorYellow" ? "yellowPicBorder" :
                       this.props.color == "hospitalPurple" ? "purplePicBorder":
                       this.props.color == "otherBlue" ? "bluePicBorder":
                       this.props.color == "chemistRed" ? "chemistPicBorder":
                       ''}
                       /> */}
                        <div className={this.props.color == "stockistGreen" ? "userNameCircle greenPicBorder" :
                        this.props.color == "doctorYellow" ? "userNameCircle yellowPicBorder" :
                        this.props.color == "hospitalPurple" ? "userNameCircle purplePicBorder":
                        this.props.color == "otherBlue" ? "userNameCircle bluePicBorder":
                        this.props.color == "chemistRed" ? "userNameCircle chemistPicBorder":
                        ''}>{ Object.keys(a)[0] ?  a[Object.keys(a)[0]]["C_Name"].charAt(0):null }</div>
                       <div>
                            <div className="tptUserName">{ Object.keys(a)[0] ?  a[Object.keys(a)[0]]["C_Name"]:null }</div>
                       </div>
                    </div>
               </div>)


               })
               this.setState({UserView:UserView})
            }


        }
      }

    render() {
        //const key = Object.keys(this.props.user)
        let test =[]
        //test = this.props.user[key]
     //   const key1 = Object.keys(test)

        //let test1 =[]
        //test1 = test[key1]
        return (
            <React.Fragment>

                <div className={this.props.color == "stockistGreen" ? "endUserDetails greenBorder" :
                                this.props.color == "doctorYellow" ? "endUserDetails yellowBorder" :
                                this.props.color == "hospitalPurple" ? "endUserDetails purpleBorder":
                                this.props.color == "otherBlue" ? "endUserDetails blueBorder":
                                this.props.color == "chemistRed" ? "endUserDetails redBorder":
                                'endUserDetails'} >

                <div className="totalCalls">{this.state.SelectedName}</div>
                    <div>

                           {this.state.UserView}


                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default EndUserDetail;
