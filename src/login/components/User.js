import React, { Component } from "react";
import { Form } from "react-bootstrap";

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            COMPANY: "",
            Username: "",
            Password: "",
            chekstate: null,
            passwordeye:true,
            loading: false,

        };
        this.change_COMPANY = this.change_COMPANY.bind(this);
        this.change_mobile = this.change_mobile.bind(this);
        this.change_pass = this.change_pass.bind(this);
        this.Userfuncall = this.Userfuncall.bind(this);
        this.Rember = this.Rember.bind(this);
        this.genrate_otp = this.genrate_otp.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    Userfuncall() {
        //console.log(this.state.Username,this.state.Password,this.state.Username,'kunal')
        this.props.Userfun(
            this.state.COMPANY,
            this.state.Username,
            this.state.Password
        );
    }

    change_COMPANY(param) {
        this.setState({ COMPANY: param.target.value });
    }

    change_mobile(param) {
        this.setState({ Username: param.target.value });
    }

    change_pass(param) {
        this.setState({ Password: param.target.value });
    }

    /**********************************************************************************
     * On click  Remmber  we store user infomation in local storage and when
     * it page Will open it will take userId and another Details from that
     * we not  going to store password
     * -----------------------------------Developer Information----------------------
     * Name :Ranjita
     * Team :SFA360
     ******************************************************************************/

    Rember(event) {
        const { checked } = event.target;

        //console.log(checked);
        if (checked) {
            const Username = this.state.Username;
            const COMPANY = this.state.COMPANY;
            if (COMPANY == "") {
                alert("Please Enter Company id");
                this.setState({ chekstate: null });
                return;
            }

            if (Username == "") {
                alert("Please Enter User Name");
                this.setState({ chekstate: null });
                return;
            }

            localStorage.setItem("Com", COMPANY);

            localStorage.setItem("mob", Username);
            this.setState({ chekstate: true });
        } else {
            localStorage.clear();
            this.setState({ Username: "", COMPANY: "", chekstate: null });
        }
    }

    componentDidMount() {
        const Username = localStorage.getItem("mob");
        const COMPANY = localStorage.getItem("Com");
        if (COMPANY != null) {
            this.setState({
                Username: Username,
                COMPANY: COMPANY,
                chekstate: true
            });
        }
    }
    genrate_otp(){
        this.setState({
            showOtpMode:!this.state.showOtpMode
        })
        this.props.genrateotp(this.state.showOtpMode)
    }
    handleClick(){
        this.setState({
            passwordeye:!this.state.passwordeye
        })
    }

    render() { 
        const { loading } = this.state;

        return (
            <div>
                <Form.Group
                    controlId="formBasicEmail"
                    className="login-form-group"
                >
                    <Form.Label className="login-label">
                        COMPANY NAME <span className="red-clr">*</span>
                    </Form.Label>
                    <Form.Control
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                this.Userfuncall();
                            }
                        }}
                        autoComplete="off"
                        onChange={this.change_COMPANY}
                        value={this.state.COMPANY}
                        className="login-form-control"
                        placeholder="Enter Your Company"
                    />
                </Form.Group>

                <Form.Group
                    controlId="formBasicEmail"
                    className="login-form-group"
                >
                    <Form.Label className="login-label">
                        USERNAME <span className="red-clr">*</span>
                    </Form.Label>
                    <Form.Control
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                this.Userfuncall();
                            }
                        }}
                        autoComplete="off"
                        value={this.state.Username}
                        onChange={this.change_mobile}
                        className="login-form-control"
                        placeholder="Enter Your User Name"
                    />
                </Form.Group>
                <Form.Group
                    controlId="formBasicEmail"
                    className="login-form-group"
                >
                    <Form.Label className="login-label">
                        PASSWORD <span className="red-clr">*</span>
                    </Form.Label>
                    <Form.Control
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                this.Userfuncall();
                            }
                        }}
                        autoComplete="off"
                        type={this.state.passwordeye ? "password" : "text"}
                        value={this.state.Password}
                        onChange={this.change_pass}
                        className="login-form-control"
                        placeholder="Enter Password "
                    />
                    <img src={this.state.passwordeye ? "../public/assets/images/eyeslash.svg" : "../public/assets/images/eye.svg"} className="loginpasseye" id="password" onClick={this.handleClick}></img>
                </Form.Group>
                {/* {
                    this.props.msg.length!=0    ?
                        <Form.Group className="login-form-group">
                            <label className="login-label"><span className="red-clr">{ this.props.msg}</span></label>
                        </Form.Group> : <div></div>
                } */}
               
                <div className="error-msg red-clr">
                    {this.props.msg?this.props.msg.length != 0 ? (
                        <span>{this.props.msg}</span>
                    ) : null:null}
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
                    className="generate-otp">
                        Forgot Password ?
                    </a>
                </div>

                <button onClick={this.Userfuncall}  className="solid-blue-btn">
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
                        LOGIN WITH MOBILE
                    </button>
                </div>
            </div>
        );
    }
}

export default User;
