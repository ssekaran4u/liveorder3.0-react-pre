import React,{Component} from 'react'
import { Tabs,Tab } from 'react-bootstrap'
import Footer from '../../landing-page/components/Footer';
import '../../../public/assets/css/materialRequest.css'
import {Link} from 'react-router-dom'
import MrMaterialList from '../components/MrMaterialList'
import DownlineApprovalList from '../components/DownlineApprovalList'
import CommonHeader from '../../lib/CommonHeader'
import { withRouter } from "react-router";
import { connect } from "react-redux";
import ConfirmationList from '../components/ConfirmationList'
import Breadcrumbs from '../../BasicComponet/breadcrumbs'
import {postToServer} from '../../lib/comm-utils'


class Manager_material extends Component{
    constructor(props) {
        super(props);
        this.state = {
            key: 'requests',
            isFull: this.props.isFull,
            loginUser:'3',
            user:'',
            yearlist:[],
            monthlist:[]
        };
        this.redirect = this.redirect.bind(this)
     
    }
    static getDerivedStateFromProps(nextState, prevState) {
        if (prevState.isFull !== nextState.isFull)
            return { isFull: nextState.isFull };
        return null;
    }
    redirect(){
        localStorage.setItem("type","")
        localStorage.setItem("visitingFlag","")
        localStorage.setItem("edit","")
        this.props.history.push('/add_material/add')
    }
    componentDidMount(){
        var data = {"Index":"IsAdmin", "Token":""}
        postToServer("MaterialRequestApi",data).then( (Result)=>{ 
    
            this.setState({ user: Result.data.data[0]['is_admin']})
      
         }).catch(  (Error)=> {  
         this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
         })

         var months = {"Index":"GetMonth", "Token":""}   
         postToServer("MaterialRequestApi",months).then( (Result)=>{ 

          //   setMonths(Result.data)
            this.setState({
                monthlist:Result.data
            })

         }).catch(  (Error)=> {  
       //  this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
         })

         var year = {"Index":"GetYear", "Token":""}  
         postToServer("MaterialRequestApi",year).then( (Result)=>{ 
            // setYears(Result.data)
            this.setState({
                yearlist:Result.data
            })
 
         }).catch(  (Error)=> {  
        // this.setState({ Error: true, Errormsg: "Error in App docotor list API " })
         })
    }
    
    render(){console.log("user",this.state.user)
        var subContent = <div className="sub-content"><Link to="/dashboard"><span>Dashboard</span></Link> / 
        <Link to="/"><span>Operational</span></Link> / Material Request List</div>
        return(
            <div className="content-spacing body-scroll">
                <div className="min-height-100">
                   
                     <Breadcrumbs content="Material Request" subContent={subContent} />
                    <div >
                    {this.state.user == "1" ? 
                        <div className="adminMaterial">
                            <CommonHeader heading="Material Downline Request List" />
                            <ConfirmationList monthlist={this.state.monthlist} yearlist={this.state.yearlist}/>
                            
                        </div>
                    :
                        <Tabs
                            id="controlled-tab-example"
                            className="dcrtab"
                            activeKey={this.state.key}
                            onSelect={key => this.setState({ key })}
                        >
                            <Tab eventKey="requests" title="My Request List">
                                <div className="maineContent">
                                    <CommonHeader heading="Material Request List" />
                                    <MrMaterialList />
                                    <div className="add-new-dcr" onClick={this.redirect}>
                            <img
                                src="../public/assets/images/add-icon.svg"
                                alt="add_icon"
                                
                            />
                        </div>{" "}
                                </div>
                            </Tab>
                       
                            <Tab eventKey="approvals" title="My Downline Approval List" >
                                <div className="maineContent">
                                    <CommonHeader heading="Material Approval List" />
                                    <DownlineApprovalList monthlist={this.state.monthlist} yearlist={this.state.yearlist}/>
                                </div>
                            </Tab>
                            
                        </Tabs>}
                    </div>
                    {/* <Link to={"/add_material"}> */}
                      
                    {/* </Link> */}
                    <Footer />
                    </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isFull: state.DCRList.isFull
});

export default connect(
    mapStateToProps,
    null
)(withRouter(Manager_material));