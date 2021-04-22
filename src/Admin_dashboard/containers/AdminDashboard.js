import React, { Component } from 'react'
import ADashboard from "../components/ADashboard";

import "../../../public/assets/css/bootstrap.min.css"
import "../../../public/assets/css/style.css"
import "../../../public/assets/css/responsive.css"
import "../../../public/assets/css/circle.css"
import "../../dashboard/components/dashboard.css"
import Footer from '../../landing-page/components/Footer'

class AdminDashboard extends Component {
    
    render() {
        return (
           
            <div className="dashboard-sec ">
                <div className="admindashboard">
                    <div className="content-spacing dashscroll">
                        <div className="min-height-100">
                            <ADashboard />
                            <Footer />
                        </div>
                        
                    </div>
                </div>
                
            </div>
           
        )
    }
}
export default AdminDashboard