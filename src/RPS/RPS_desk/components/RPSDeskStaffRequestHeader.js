import React, { Component } from "react";
import { toggleDcrHeader, goFullView } from "../../../actions/DCRList";
import { connect } from "react-redux";


class RPSDeskStaffRequestHeader extends Component {
    constructor(props){
        super(props)
        this.state ={
            toggleHeader:"",
            isFull:""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
    }
    handleChange() {
        this.props.toggleDcrHeader();
    }

    handleViewChange() {
        this.props.goFullView();
    }
     static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.toggleHeader !== nextProps.toggleHeader)
            return { toggleHeader: nextProps.toggleHeader };
        if (prevState.isFull !== nextProps.isFull)
            return { isFull: nextProps.isFull };
        return null;
    }

    render() {
        return (
            <div className="dcr-head">
                <div>
                  
                </div>
                <div className="dcr-head-options">
                    {this.state.isFull ? (
                        <img
                            src="../public/assets/images/collapse-grey.svg"
                            className="fullscreen_img"
                            alt="fullscreen_img"
                            onClick={this.handleViewChange}
                        />
                    ) : (
                        <img
                            src="../public/assets/images/fullscreen.svg"
                            className="fullscreen_img"
                            alt="fullscreen_img"
                            onClick={this.handleViewChange}
                        />
                    )}
                </div>
            </div>

        );
        
    }
}
const mapStateToProps = state => ({
    toggleHeader: state.DCRList.toggleHeader,
    isFull: state.DCRList.isFull
});

const mapDispatchToProps = dispatch => ({
    toggleDcrHeader: () => dispatch(toggleDcrHeader()),
    goFullView: () => dispatch(goFullView())
});
export default connect(
    mapStateToProps,
    mapDispatchToProps)(RPSDeskStaffRequestHeader)
