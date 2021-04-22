import React, { Component } from "react";

class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
        this.onChange = this.onChange.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
    }

    handleFocus(e) {
        e.target.select();
    }

    onChange(e) {
        if (e.target.value.length < this.props.textLength) {
            this.setState({ value: e.target.value })
            if (this.props.inputType == "number") {
                if (e.target.value == "") {
                    this.props.onChange("0", this.props.category, this.props.id)
                }
                else {
                    this.props.onChange(e.target.value, this.props.category, this.props.id)
                }
            }
            else {
                this.props.onChange(e.target.value, this.props.category, this.props.id)
            }
        }
    }

    render() {
        return (
            <div className="expense-input-field">
                <input
                    type={this.props.inputType}
                    value={this.state.value}
                    onChange={this.onChange}
                    onWheel={event => event.currentTarget.blur()}
                    min="0"
                    step={this.props.step ? this.props.step : "0"}
                    onFocus={this.handleFocus}
                />
            </div>
        )
    }
}

export default InputField;