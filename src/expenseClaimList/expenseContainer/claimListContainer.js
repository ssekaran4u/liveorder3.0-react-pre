import React, { Component } from "react";
import "../../../public/assets/css/expenseClaimList.css";
import ClaimList from "../components/claimList";

class ClaimListContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: " "
        }
    }
    componentDidMount() {
        const k = localStorage.getItem("type")
        if(k==1){
            this.setState({user: "mr"})
        }
        else if(k==2){
            this.setState({user: "manager"})
        }
        else if(k==3){
            this.setState({user: "admin"})
        }
    }

    render() {
        return (
            <div className="dashboard-sec " >
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="manager-claim-list">
                            <ClaimList profile={this.state.user} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClaimListContainer;