import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

class Mobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: "",
            Password: "",
            checkstate: null,
            showOtpMode:true,
            passwordeye:true,
            loading: false,
        };

        this.change_mobile = this.change_mobile.bind(this);
        this.change_pass = this.change_pass.bind(this);
        this.Mobilefun = this.Mobilefun.bind(this);
        this.Rember = this.Rember.bind(this);
        this.genrate_otp= this.genrate_otp.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }


    Mobilefun(mob, pass) {
        this.props.Mobilefun(this.state.Username, this.state.Password);
      
    }
    
   
    onEnter() {
        this.props.Mobilefun(this.state.Username, this.state.Password);
    }
    change_mobile(param) {
        var requr = /^[0-9]*$/;

        if (this.state.Username.length < 10 || param.target.value.length < 10) {
            if (requr.test(param.target.value)) {
                this.setState({ Username: param.target.value });
            } else {
                var data = this.state.Username;
                this.setState({ Username: data });
            }
        }
    }

    change_pass(param) {
        this.setState({ Password: param.target.value });
    }

    Rember(event) {
        const { checked } = event.target;

     //   console.log(checked);
        if (checked == true) {
            const Username = this.state.Username;

            if (Username == "") {
                alert("Please Enter User Name");
                this.setState({ chekstate: null });
                return;
            }

            this.setState({ chekstate: true });

            localStorage.setItem("User", Username);
        } else {
            localStorage.clear();
            this.setState({ Username: "", chekstate: null });
        }
    }

    componentDidMount() {
        const Username = localStorage.getItem("User");

        if (Username != null) {
            this.setState({ Username: Username, chekstate: true });
        }
    }
    genrate_otp(){
        this.setState({
            showOtpMode:!this.state.showOtpMode
        })
        this.props.genrateotp(this.state.showOtpMode,this.state.Username)
    }
    handleClick(){
        this.setState({
            passwordeye:!this.state.passwordeye
        })
    }

    render() { 

        console.log(this.props.load)
        const { loading } = this.state;

        return (
            <div>
                <Form.Group
                    controlId="formBasicEmail"
                    className="login-form-group"
                >
                    <Form.Label className="login-label">
                        MOBILE NO. <span className="red-clr">*</span>
                    </Form.Label>
                    <Form.Control
                        onChange={this.change_mobile}
                        value={this.state.Username}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                this.onEnter();
                            }
                        }}
                        autoComplete="off"
                        className="login-form-control"
                        placeholder="Enter Your Number"
                    />
                </Form.Group>
                <Form.Group
                    controlId="formBasicEmail"
                    className="login-form-group"
                >
                    <Form.Label className="login-label">
                        PASSWORD/OTP <span className="red-clr">*</span>
                    </Form.Label>
                    <Form.Control
                        type={this.state.passwordeye ? "password" : "text"}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                this.onEnter();
                            }
                        }}
                        autoComplete="off"
                        onChange={this.change_pass}
                        value={this.state.Password}
                        className="login-form-control"
                        placeholder="Enter Password / OTP"
                    />
                <img src={this.state.passwordeye ? "../public/assets/images/eyeslash.svg" : "../public/assets/images/eye.svg"} className="loginpasseye" id="password" onClick={this.handleClick}></img>
                </Form.Group>
                {/* <Form controlId="formBasicEmail" className="login-form-group">
               
                {
                    this.props.msg.length!=0  ?
                        <div className="login-label"><span className="red-clr">{ this.props.msg}</span></div>
                       : <div></div>
                }
                </Form> */}
                
                 
                <div className="error-msg red-clr">
                    {this.props.msg ? this.props.msg.length != 0 ? (
                        <span>{this.props.msg}</span>
                    ) : null :null}
                </div> 
                <div className="flex-row">
                    <div className="remember">
                        <Form.Check
                            custom
                            type="checkbox"
                            id="checkbox1"
                            label="Remember"
                            className=""
                            checked={
                                this.state.chekstate == null ? "" : "checked"
                            }
                            onChange={this.Rember}
                        />
                    </div>
                    <a
                        href="#"
                        onClick={this.genrate_otp}
                        className="generate-otp"
                    >
                        Generate OTP
                    </a>
                </div>

                
                
                
                <button  onClick={this.Mobilefun} disabled={loading} className="solid-blue-btn">
                     { this.props.load  == false || this.props.load == undefined  ? 
                    `I'AM IN` :
                     <i
                  className="fa fa-refresh fa-spin"
                  style={{ marginRight: "5px" }}
                  />
                   } 
                </button>
                 
                
                <p className="or">OR</p>
                <div>
                    <button
                        onClick={this.props.change}
                        className="ouline-grey-btn"
                    >
                        LOGIN WITH USERNAME
                    </button>
                </div>
            </div>
        );
    }
}

export default Mobile;
