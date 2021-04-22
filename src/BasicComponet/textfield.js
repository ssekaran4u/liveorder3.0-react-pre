import React, { Component } from "react";
import "../../public/assets/css/BasicComponents/sfaTextfield.css"

class Textfield extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        if (this.props.maxLength) {
            if (e.target.value.length < this.props.maxLength) {
                this.setState({ value: e.target.value })
                this.props.onChange(e.target.value)
            }
        }
        else {
            this.setState({ value: e.target.value })
            this.props.onChange(e.target.value)
        }
    }

    componentDidUpdate(prevState, prevProps){
        if(prevProps.value != this.props.value){
            this.setState({value: this.props.value})
        }
    }

    render() {
        return (
            <div className="sfa360-textfield">
                {this.props.labelName &&
                    <div className="textfield-label">
                        {this.props.labelName}&nbsp;
                    {this.props.important && <span>*</span>}
                    </div>
                }
                <input
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                    className={this.state.value == "" ? "sfa-text-field plac_holder" : "sfa-text-field"}
                    value={this.state.value}
                    onChange={this.onChange}
                    disabled={this.props.disabled == true ? true : false}
                    onWheel={event => event.currentTarget.blur()}
                    min="0"
                    step={this.props.step ? this.props.step : "0"}
                    onFocus={this.handleFocus}
                />
                <div className="err-message">{this.props.errorMessage}</div>
            </div>
        )
    }
}

export default Textfield;