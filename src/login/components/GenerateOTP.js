import React,{Component} from 'react'
import { Form } from "react-bootstrap";
import { doWithOtpLogin, ErrorLogin } from "../../actions/login";
import { connect } from "react-redux";

class GenerateOTP extends Component{
    constructor(props){
        super(props)
        this.state={
            showSend:false,
            mobile:this.props.mobno,
            otpVal:'',
            newPass:'',
            cnfPass:'',
            seconds: '60', 
            minutes: '',
            showPass:false
        }
        this.secondsRemaining; 
        this.intervalHandle;
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.changeOtp = this.changeOtp.bind(this)
        this.changeNewPass = this.changeNewPass.bind(this)
        this.confirmPass = this.confirmPass.bind(this)
        this.sendOtp = this.sendOtp.bind(this)
        this.genOtpLogin = this.genOtpLogin.bind(this)
        this.startCountDown = this.startCountDown.bind(this)
        this.tick = this.tick.bind(this)
        this.handleClick = this.handleClick.bind(this)
        
    }
    handleKeyPress(param){
        var requr = /^[0-9]*$/;
        if (requr.test(param.target.value)) {
        this.setState({
            mobile:param.target.value
        })
        }
        if (this.state.mobile.length == 10 || param.target.value.length == 10) {
            if (requr.test(param.target.value)) {
                this.setState({ 
                    showSend: true,
                    seconds:"60"
                });
                clearInterval(this.intervalHandle)
                
            } 
            
        }else{
            this.setState({ 
                showSend: false,
            }); 
        }
    }
    changeOtp(e){
        const re = /^[0-9]*$/;
        const otp = re.test(e.target.value);
        if(otp){
        this.setState({
            otpVal:e.target.value
        })
    }
    }
    changeNewPass(e){
        const newpass = e.target.value
        this.setState({
            newPass:newpass
        })
    }
    confirmPass(e){
        const cnfPass= e.target.value
        this.setState({
            cnfPass:cnfPass
        })
    }
    sendOtp(){
       
    }
    genOtpLogin(){ 
        const mobile = this.state.mobile
        const otp = this.state.otpVal
        const newPass = this.state.newPass
        const cnfPass = this.state.cnfPass
        this.props.genOtpLogin(mobile,otp,newPass,cnfPass)
    }
    static getDerivedStateFromProps(nextProps, prevState) { 
        
    //     if (prevState.otp !== nextProps.otp)
    //    //console.log("completed", nextProps.otp)
    //     return {...prevState, otp:nextProps.otp}

        if (prevState.Result !== nextProps.Result)
        //console.log("completed", nextProps.otp)
         return {...prevState, Result:nextProps.Result}

    return null
    }
    tick() {
        var min = Math.floor(this.secondsRemaining / 60);
        var sec = this.secondsRemaining - (min * 60);
        this.setState({
          minutes: min,
          seconds: sec
        })
        
          this.setState({
            seconds: "0:" + this.state.seconds,
          })
       
        if (this.state.seconds == '0:1') {
             this.setState({seconds:"0:1"})
            return null
            console.log("sec",sec)
            //clearInterval(this.intervalHandle);
        }
        
        
        this.secondsRemaining--
        }
        startCountDown() { 
            const mob = this.state.mobile
            const data = {
                index: "login",
                Token: "",
                Data: {
                    mobile: mob,
                    },
                Header: {}
            };
            
            this.props.doWithOtpLogin(data);
            this.intervalHandle = setInterval(this.tick, 500);
            let time = this.state.minutes;
            this.secondsRemaining = time * 60;
            
        }
        handleClick(){
            this.setState({
                showPass : !this.state.showPass
            })
        }
        
        
    render(){ 
       
        
        return(
            <div>
                
                {this.state.showSend || this.state.mobile ?
                <div  className="loginMarginTop">
                    {this.state.seconds == "60" ?
                    <div className="sendOtpBtn" onClick={this.startCountDown}>Send</div>
                    :this.state.seconds == "0:1" ?
                    <div className="sendOtpBtn" onClick={this.startCountDown}>Resend</div>:
                    <div className="sendOtpBtn">{this.state.seconds}</div>
                    }
                </div> : '' }
                <Form.Group
                    controlId="formBasicEmail"
                    className="login-form-group"
                >
                   
                    <Form.Label className="login-label">
                        MOBILE NO <span className="red-clr">*</span>
                    </Form.Label>
                    <Form.Control
                        maxLength="10"
                        autoComplete="off"
                        value={this.state.mobile}
                        className="login-form-control"
                        placeholder="Enter Your Mobile"
                        onChange={this.handleKeyPress}
                        
                    />
                </Form.Group>
                
                <Form.Group
                    controlId="formBasicEmail"
                    className="login-form-group"
                >
                    <Form.Label className="login-label">
                        ENTER OTP <span className="red-clr">*</span>
                    </Form.Label>
                    <Form.Control
                        
                        autoComplete="off"
                        onChange={this.changeOtp}
                        value={this.state.otpVal}
                        className="login-form-control"
                        placeholder="Enter OTP"
                    />
                </Form.Group>
                <Form.Group
                    controlId="formBasicEmail"
                    className="login-form-group"
                >
                    <Form.Label className="login-label">
                        SET NEW PASSWORD <span className="red-clr">*</span>
                    </Form.Label>
                    {this.state.showPass ? 
                    <Form.Control
                        type="text"
                        autoComplete="off"
                        onChange={this.changeNewPass}
                        value={this.state.newPass}
                        className="login-form-control"
                        placeholder="Enter New Password"
                    />:<Form.Control
                    type="password"
                    autoComplete="off"
                    onChange={this.changeNewPass}
                    value={this.state.newPass}
                    className="login-form-control"
                    placeholder="Enter New Password"
                />}
                    <img src={this.state.showPass ? "../public/assets/images/eye.svg" : "../public/assets/images/eyeslash.svg"} className="Otpeye" id="password" onClick={this.handleClick}></img>
                </Form.Group>
                <Form.Group
                    controlId="formBasicEmail"
                    className="login-form-group"
                >
                    <Form.Label className="login-label">
                        CONFIRM PASSWORD <span className="red-clr">*</span>
                    </Form.Label>
                    <Form.Control
                        type="password"
                        autoComplete="off"
                        onChange={this.confirmPass}
                        value={this.state.cnfPass}
                        className="login-form-control"
                        placeholder="Confirm Password"
                    />
                </Form.Group>
                <div className="error-msg red-clr">
                    {this.props.msg.length != 0 ? (
                        <span>{this.props.msg}</span>
                    ) : null}
                </div>
                <div className="error-msg red-clr">
                    {this.state.Result == 0 ? (
                        <span>User Invalid</span>
                    ) : null}
                </div>
                <div className="padTop50">
                    <button onClick={this.genOtpLogin} className="solid-blue-btn">
                        I'AM IN
                    </button>
                </div>
                <p className="or">OR</p>
                <div>
                    <button
                        onClick={() => this.props.change("a")}
                        className="ouline-grey-btn"
                    >
                        Back
                    </button>
                </div>
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
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // otp: state.login.otp,
    Result: state.login.Result,
    errorMsg: state.login.error
});

const mapDispatchToProps = dispatch => ({
    doWithOtpLogin: data => dispatch(doWithOtpLogin(data)),
    ErrorLogin: data => dispatch(ErrorLogin(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(GenerateOTP)