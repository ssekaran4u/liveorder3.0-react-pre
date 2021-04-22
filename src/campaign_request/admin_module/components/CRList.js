import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { postToServer } from '../../../lib/comm-utils'
import { URL_CAMPAIGN } from '../../../lib/constants'
import CampaignRequestList from '../../containers/campaignRequestList'
import MaterialRequestList from '../../containers/materialRequestList'
import AdminConfirmationList from "../../admin_module/containers/AdminConfirmationList"


class CRList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showTab: false,
             activeTab: "confirmationList",
        }
    this.onTabChange = this.onTabChange.bind(this)

    }
    onTabChange(tab) {
        this.setState({ activeTab: tab })
        sessionStorage.setItem("approvalTab", tab)
    }
    componentDidMount() {
         if (sessionStorage.getItem("approvalTab") != null) {
            this.setState({ activeTab: sessionStorage.getItem("approvalTab") })
        }
        else {
            this.setState({ activeTab: "confirmationList" })
        }
        //admin can approve request show one more tab
        var data = {
            "Index": "Admin_Approve"
        }
        postToServer(URL_CAMPAIGN, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                if (Result.data.data[0].id == 0) {
                    this.setState({ showTab: false })
                } else if (Result.data.data[0].id == 1) {
                    this.setState({ showTab: true })
                }

            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in sending request" })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div >
                    <Tabs
                        id="controlled-tab-example"
                        className="dcrtab"
                        activeKey={this.state.activeTab}
                        onSelect={(e) => this.onTabChange(e)}
                    >
                {this.state.showTab && localStorage.getItem("type") == '3' ?

                     <Tab eventKey="DownlineList" title="My Downline Approval List" >
                             <MaterialRequestList showApproveTabinAdmin={this.state.showTab} />
                            </Tab> 
                            :""}
                     { localStorage.getItem("type") == '3' ?
                        <Tab eventKey="confirmationList" title="My Confirmation List" >
                            <AdminConfirmationList  />
                        </Tab>
                     :"" }
                           
                        
                    </Tabs>
                </div>
            </React.Fragment>
        );
    }
}
export default CRList;