/*
* This code will display login page which includes login with mobile and login with username
* Request URL=url/SFA360RECT
* index=login
* Request string={"index":"login","Token":"","Data":{"usr":"mr1","pas":"w6n2i1tZtaw4Xle1Z3lYcg==","com":"sfa360"},"Header":{}}
* Response string={
  Status:Success
  Status_Message:000
}
* Response Error=null


*/



import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Encerypt } from "../../lib/comm-utils";
import User from "./User";
import Mobile from "./Mobile";

import { connect } from "react-redux";
import { doLogin, ErrorLogin,doWithOtpLogin } from "../../actions/login";
import GenerateOTP from '../components/GenerateOTP'

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loginWithUserName: false,
            token: false,
            errorMsg: "",
            otp:false,
            loginWithOtp:false,
            mob:'',
            load:false,
        };

        this.toggleLoginMode = this.toggleLoginMode.bind(this);
        this.loginUserWithMobile = this.loginUserWithMobile.bind(this);
        this.loginUserWithUserName = this.loginUserWithUserName.bind(this);
        this.generateOTP = this.generateOTP.bind(this)
        this.loginUserWithOtp = this.loginUserWithOtp.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let state = {};
        if (prevState.token !== nextProps.token) state.token = nextProps.token;
        if (prevState.errorMsg !== nextProps.errorMsg)
            state.errorMsg = nextProps.errorMsg;
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                return state;
            }
        }
        return null;
    }

    /**
     * this function logs in the user with mobile information
     * @param mob
     * @param pass
     */
    loginUserWithMobile(mob, pass) {
        
        if(this.state.load==true){
            return
        }
        
        if (mob == "") {
            this.props.ErrorLogin("Please Enter mobile number");
            return;
        }
        if (pass == "") {
            this.props.ErrorLogin("Please Enter  password");
            return;
        }
        this.props.ErrorLogin("");
        this.setState({
            load:true
        })
        
   //const key= Encerypt(pass).then(  (l)=>{ 
        const data = {
            index: "login",
            Token: "",
            Data: {
                mob: mob,
                pas: pass
            },
            Header: {}
        };
        this.props.doLogin(data);
        

    // }).catch( (Error)=> {
    //     this.props.ErrorLogin("Contact to Admin Or  Check Internet");
    // })
    }

    /**
     * This function logs in the user with username and password
     * @param com
     * @param user
     * @param pass
     */
    loginUserWithUserName(com, user, pass) {
        
        if(this.state.load==true){
            return
        }

        if (com == "") {
            this.props.ErrorLogin("Please Enter Company Id");
            return;
        }

        if (user == "") {
            this.props.ErrorLogin("Please Enter  User Name");
            return;
        }

        if (pass == "") {
            this.props.ErrorLogin("Please Enter  password");
            return;
        }

        this.props.ErrorLogin("");
        this.setState({
            load:true
        })

//  const key= Encerypt(pass).then(  (l)=>{ 
             const data = {
            index: "login",
            Token: "",
            Data: { usr: user, pas:pass
                , com: com },
            Header: {}
        };
        this.props.doLogin(data);
    // }
       // )
        // .catch( (Error)=> {
        //     this.props.ErrorLogin("Contact to Admin Or  Check Internet");
        // })

        // const data = {
        //     index: "login",
        //     Token: "",
        //     Data: { usr: user, pas: pass, com: com },
        //     Header: {}
        // };
        // this.props.doLogin(data);
    }

    /**
     * This function generates the OTP
     */
    // generateOTP() {
    //     // alert('generate otp')
    // }

    /**
     * Toggles the login view on the login screen. Show either login with mobile or with username
     */
    toggleLoginMode(data) { 
    // if(this.state.otp == true){
        this.props.ErrorLogin("");
        
        if(data == "a"){
            if(this.state.otp == undefined){ 
                this.setState({
                    otp:false,
                    loginWithUserName:true
                })
            }else{
                this.setState({
                    otp:!this.state.otp,
                })
            }
            
        }else{
            this.setState({ 
                // otp:false,
                loginWithUserName: !this.state.loginWithUserName 
            });
        }
       
    // }
        
    }

    redirectToDashboard() {

       const k= localStorage.getItem("type")
       const KM= localStorage.getItem("KM")

       if(KM=="0"){
       if(k=="1"){
        return <Redirect to="/dashboard" />;
       }
       if(k=="2"){
        return <Redirect to="/mdashboard" />;
       }
       if(k=="3"){
        return <Redirect to="/adashboard" />;
       }
       
       if(k=="0"){
        return <Redirect to="/DefaultDashboard"/>
       
    }else{
        return <Redirect to="/DefaultDashboard"/>
    }
}

    
    
    if(KM=="1"){
        return <Redirect to="/Kdashboard" />;
    }else{
        return <Redirect to="/DefaultDashboard"/>
    }

    }
    generateOTP(otp,mob) {
        this.setState({
            otp:otp,
            mob:mob
        })
    
    }

     componentDidUpdate(oldprop,oldstate){
         if(oldstate.errorMsg!=this.state.errorMsg){
            //console.log(oldstate.errorMsg , this.state.errorMsg ,"kunal")
            if(this.state.errorMsg!=""){
                this.setState({ load:false })
            }
         }

       //console.log(oldstate.errorMsg , this.state.errorMsg ,"soundarya")
     }

     

    loginUserWithOtp(mobile,otp,newPass,cnfPass){ 
        if (mobile == "") {
            this.props.ErrorLogin("Please Enter Mobile Number");
            return;
        }

        if (otp == "") {
            this.props.ErrorLogin("Please Enter OTP");
            return;
        }
         if (newPass == "") {
            this.props.ErrorLogin("Please Enter New password");
            return;
        }
        if (cnfPass == "") {
            this.props.ErrorLogin("Please Enter Confirm password");
            return;
        }
        if(newPass != cnfPass){
            this.props.ErrorLogin("Your New password and Confirmation password do not match");
            return;
        }


      //  const key= Encerypt(newPass).then(  (l)=>{

            const data = {
                index: "login",
                Token: "",
                Data: {
                    mob: mobile,
                    pass: newPass,
                    cnfpass:cnfPass,
                    otp:otp
                },
                Header: {}
            };
            this.props.doLogin(data);
        // })  
    }
    
    render() {  
        // console.log(this.props.check,"kumar madhu T M")
        const { token } = this.state;
        if (token) return this.redirectToDashboard();
        return (
            <div className="login-form">
                <h2 className="login">LOGIN</h2>
                {this.state.otp == false ?
                <div>
                {this.state.loginWithUserName && (
                    <User
                        load={this.state.load}
                        genrateotp={this.generateOTP}
                        msg={this.state.errorMsg}
                        Userfun={this.loginUserWithUserName}
                        change={this.toggleLoginMode}
                        
                    />
                )}
                {!this.state.loginWithUserName && (
                    <Mobile
                        load={this.state.load}
                        genrateotp={this.generateOTP}
                        msg={this.state.errorMsg}
                        msgmob={this.state.errorMsg}
                        Mobilefun={this.loginUserWithMobile}
                        change={this.toggleLoginMode}
                       
                        
                    />
                )}
                {/* <div className="flex-row">
                    <a href="#" className="static-links">
                        Terms & Conditions
                    </a>
                    <a href="#" className="static-links">
                        Need Help?
                    </a>
                </div> */}
                <div className="text-center">
                    <p className="powered-by">
                        Powered by{" "}
                        <a
                            target="_Blank"
                            href="http://www.csquare.in/"
                            className="link"
                        >
                            C-Square
                        </a>
                    </p>
                </div>
                </div> : 
                <GenerateOTP
                    showOtp={this.state.otp}
                    msg={this.state.errorMsg}
                    genOtpLogin={this.loginUserWithOtp}
                    change={this.toggleLoginMode}
                     mobno={this.state.mob}
                 />
            }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.login.token,
    errorMsg: state.login.error,
    otp:state.login.otp,
    // check: state
});

const mapDispatchToProps = dispatch => ({
    doLogin: data => dispatch(doLogin(data)),
    ErrorLogin: data => dispatch(ErrorLogin(data)),
    doWithOtpLogin: data => dispatch(doWithOtpLogin(data))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
