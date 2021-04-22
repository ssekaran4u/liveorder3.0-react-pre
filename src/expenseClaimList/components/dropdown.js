import React, { Component } from "react";

class ExpenseDropdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            value: this.props.selected,
        }
        this.onHandleClick = this.onHandleClick.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
    }

    onHandleClick() {
        if (!this.state.show) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }
        this.setState(prevState => ({
            show: !prevState.show,
        }));
    }

    handleOutsideClick(e) {
        if (this.node.contains(e.target)) {
            return;
        }
        this.onHandleClick();
    }

    onMenuClick(value){
        this.setState({value: value})
        this.props.onChange(value, this.props.category, this.props.id)
        this.onHandleClick();
    }

    render() {
        return (
            <div className="expense-claim-dropdown single-selection" ref={node => { this.node = node; }}>
                <div className="main-container" onClick={this.onHandleClick}>
                    <div className="text-place">{this.state.value}</div>
                    <div className="dropdown-symbol"><i className="priceBtn"></i></div>
                </div>
                {this.state.show &&
                    <div className="exp-menu-list">
                        {this.props.options.length?this.props.options.map(res=>
                        <div className="exp-menu-item" key={res.Code} onClick={()=>this.onMenuClick(res.Name)}>{res.Name}</div>
                        ):null}
                    </div>}
            </div>
        )
    }
}

export default ExpenseDropdown;