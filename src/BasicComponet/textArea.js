import React, { Component } from "react";
import TextareaAutosize from 'react-textarea-autosize';
import "../../public/assets/css/BasicComponents/sfaTextArea.css"

class InputArea extends Component {
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
            <div className="sfa360-textarea">
                {this.props.labelName &&
                    <div className="textarea-label">
                        {this.props.labelName}&nbsp;
                    {this.props.important && <span>*</span>}
                    </div>
                }
                <TextareaAutosize
                    placeholder={this.props.placeholder}
                    className={this.state.value == "" ? "sfa-text-area plac_holder" : "sfa-text-area"}
                    value={this.state.value}
                    onChange={this.onChange}
                    disabled={this.props.disabled == true ? true : false}
                />
                <div className="err-message">{this.props.errorMessage}</div>
            </div>
        )
    }
}

export default InputArea;