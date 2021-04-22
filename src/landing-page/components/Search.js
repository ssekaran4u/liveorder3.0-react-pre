import React, {Component} from 'react'
import { postToServer } from '../../lib/comm-utils'
import { NavLink } from "react-router-dom";
import {Row,Col,Dropdown,Navbar,Nav,NavDropdown,Modal,Button,Spinner, Tabs, Tab} from 'react-bootstrap';
class Search extends Component{
    constructor(){
        super();
        this.state = {
            key: 'Popular_Searches',
            List:[]
        }
    }





componentDidUpdate(prevprops,prevstate){

    const _this=this
    if(prevprops.Gsearch != _this.props.Gsearch){


        // console.log(prevprops,'lop',prevstate)
        
        var data = {"index":"Menuseasrch360", "Data":{ "Search": _this.props.Gsearch } }
        postToServer("DashBoardPage", data).then(function (result) {
            _this.setState({ key:"Popular_Searches", List:result.data["data"] })   
        }).catch(Error => {
                     console.log(Error, "Error in side Landing",'kunal');
        });
    }
}



    render(){
        return(
            <div>
              
                    <div className="search-tabs">
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={this.state.key}
                            onSelect={key => this.setState({ key })}
                        >
                            <Tab eventKey="Popular_Searches" title="Menu">
                                <div className="title-bar"></div>
                                <ul className="m-0 p-0">
                                {this.state.List.map( (a)=>  
                                    <li  id={"G"+a.itemid} className="popular-history">
                                         <NavLink
                                                       activeClassName="is-active"
                                                       className="sumeet"
                                                       exact={true}
                                                        to= {"/IFrameurl/"+a.itemid}
                                                   >
                                        {/* <div className="search">
                                            <img src="../../../public/assets/images/search_grey.png" />
                                        </div> */}
                                        <div className="history-text">
                                <p>{a.Menu }</p>
                                        </div>
                                        </NavLink>
                                    </li>
                                )


                                    /* <li className="popular-history">
                                        <div className="search">
                                            <img src="../../../public/assets/images/search_grey.png" />
                                        </div>
                                        <div className="history-text">
                                            <Dropdown.Item href="#"><p>operational</p></Dropdown.Item>
                                        </div>
                                    </li>
                                    <li className="popular-history">
                                        <div className="search">
                                            <img src="../../../public/assets/images/search_grey.png" />
                                        </div>
                                        <div className="history-text">
                                            <Dropdown.Item href="#"><p>customer list</p></Dropdown.Item>
                                        </div>
                                    </li>
                                    <li className="popular-history">
                                        <div className="search">
                                            <img src="../../../public/assets/images/search_grey.png" />
                                        </div>
                                        <div className="history-text">
                                            <Dropdown.Item href="#"><p>analytical report</p></Dropdown.Item>
                                        </div>
                                    </li>
                                    <li className="popular-history">
                                        <div className="search">
                                            <img src="../../../public/assets/images/search_grey.png" />
                                        </div>
                                        <div className="history-text">
                                            <Dropdown.Item href="#"><p>HR module</p></Dropdown.Item>
                                        </div>
                                    </li> */}
                                </ul>
                            </Tab>
                            {/* <Tab eventKey="History" title="History">
                                <ul className="m-0 p-0">
                                    <li className="popular-history">
                                        <div className="search">
                                            <img src="../../../public/assets/images/search_grey.png" />
                                        </div>
                                        <div className="search-doctor-info">
                                            
                                            <p>Dr. amit singh</p>
                                            <p className="search-doctor-desi">cardiologist</p>
                                        </div>
                                        <div className="search-location-info">
                                            <p>jayanagar</p>
                                        </div>
                                    </li>
                                    <li className="popular-history">
                                        <div className="search">
                                            <img src="../../../public/assets/images/search_grey.png" />
                                        </div>
                                        <div className="search-doctor-info">
                                            <p>Dr. amit singh</p>
                                            <p className="search-doctor-desi">cardiologist</p>
                                        </div>
                                        <div className="search-location-info">
                                            <p>jayanagar</p>
                                        </div>
                                    </li>
                                    <li className="popular-history">
                                        <div className="search">
                                            <img src="../../../public/assets/images/search_grey.png" />
                                        </div>
                                        <div className="search-doctor-info">
                                            <p>Dr. amit singh</p>
                                            <p className="search-doctor-desi">cardiologist</p>
                                        </div>
                                        <div className="search-location-info">
                                            <p>jayanagar</p>
                                        </div>
                                    </li>
                                    <li className="popular-history">
                                        <div className="search">
                                            <img src="../../../public/assets/images/search_grey.png" />
                                        </div>
                                        <div className="search-doctor-info">
                                            <p>Dr. amit singh</p>
                                            <p className="search-doctor-desi">cardiologist</p>
                                        </div>
                                        <div className="search-location-info">
                                            <p>jayanagar</p>
                                        </div>
                                    </li>
                                </ul>
                            </Tab> */}
                        </Tabs>
                    </div>
             
                {/* {this.props.showSearch ? 
                    <div>
                        <div className="title-bar">doctor</div>
                        <ul className="m-0 p-0">
                            <li className="popular-history">
                                <div className="search">
                                    <img src="../../../public/assets/images/search_grey.png" />
                                </div>
                                <div className="search-doctor-info">
                                    <p>Dr. amit singh</p>
                                    <p className="search-doctor-desi">cardiologist</p>
                                </div>
                                <div className="search-location-info">
                                    <p>jayanagar</p>
                                </div>
                            </li>
                            <li className="popular-history">
                                <div className="search">
                                    <img src="../../../public/assets/images/search_grey.png" />
                                </div>
                                <div className="search-doctor-info">
                                    <p>Dr. amit singh</p>
                                    <p className="search-doctor-desi">cardiologist</p>
                                </div>
                                <div className="search-location-info">
                                    <p>jayanagar</p>
                                </div>
                            </li>
                        </ul>
                        <div className="title-bar">stockist</div>
                        <ul className="m-0 p-0">
                            <li className="popular-history">
                                <div className="search">
                                    <img src="../../../public/assets/images/search_grey.png" />
                                </div>
                                <div className="search-doctor-info">
                                    <p>Dr. amit singh</p>
                                    <p className="search-doctor-desi">cardiologist</p>
                                </div>
                                <div className="search-location-info">
                                    <p>jayanagar</p>
                                </div>
                            </li>
                            <li className="popular-history">
                                <div className="search">
                                    <img src="../../../public/assets/images/search_grey.png" />
                                </div>
                                <div className="search-doctor-info">
                                    <p>Dr. amit singh</p>
                                    <p className="search-doctor-desi">cardiologist</p>
                                </div>
                                <div className="search-location-info">
                                    <p>jayanagar</p>
                                </div>
                            </li>
                        </ul>
                        <div className="title-bar">chemist</div>
                        <ul className="m-0 p-0">
                            <li className="popular-history">
                                <div className="search">
                                    <img src="../../../public/assets/images/search_grey.png" />
                                </div>
                                <div className="search-doctor-info">
                                    <p>Dr. amit singh</p>
                                    <p className="search-doctor-desi">cardiologist</p>
                                </div>
                                <div className="search-location-info">
                                    <p>jayanagar</p>
                                </div>
                            </li>
                            <li className="popular-history">
                                <div className="search">
                                    <img src="../../../public/assets/images/search_grey.png" />
                                </div>
                                <div className="search-doctor-info">
                                    <p>Dr. amit singh</p>
                                    <p className="search-doctor-desi">cardiologist</p>
                                </div>
                                <div className="search-location-info">
                                    <p>jayanagar</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                : null } */}
            </div>
        )
    }
}

export default Search