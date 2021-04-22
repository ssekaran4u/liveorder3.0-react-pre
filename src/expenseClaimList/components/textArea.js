import React, { Component } from "react";
import TextareaAutosize from 'react-textarea-autosize';

class InputArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value
        }
        this.onChange = this.onChange.bind(this)
    }
    onChange(e) {
        if (e.target.value.length < this.props.textLength) {
            this.setState({ value: e.target.value })
            this.props.onChange(e.target.value, this.props.category, this.props.id)
        }
    }

    render() {
        return (
            <React.Fragment>
                <TextareaAutosize
                    className="expense-text-area"
                    value={this.state.value}
                    onChange={this.onChange}
                    disabled={this.props.disabled ? true : false}
                />
            </React.Fragment>
        )
    }
}

export default InputArea;