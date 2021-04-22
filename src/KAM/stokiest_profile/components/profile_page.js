import React, { Component } from "react";
import { Card, Row, Col } from 'react-bootstrap';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     myprofile: []
        // }
    }

    // componentDidMount(){
    //     var data={
    //         "Index":"StockistProfile",

    //         "Data":{"stockist":"APPTB002"},
    //     }
    //     postToServer("KMDashBoardPage",data).then( (Result)=>{
    //     if(Result.data.Status == 'Success'){
    //     console.log( Result.data.data[0] ,"kumar")
    //         this.setState({ myprofile: Result.data.data[0] })
    //     }
    //     }).catch(  (Error)=> {  
    //         this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
    //      }  )
    // }

    // componentDidMount(){
    //     if(this.props.myprofile!==undefined){
    //         this.setState({myprofile: this.props.myprofile})
    //     }
    // }

    render() {
        // console.log(this.props.myprofile);


        var myprofile=this.props.myprofile;
        // {this.props.myprofile!=undefined? myprofile = this.props.myprofile:null}
        return (
            <div className="stokiest-profile-page">
                <Row >
                    <Col className="stokiest-profile-col" xl={6} lg={12} md={12} sm={12} xs={12}>
                        <Card className="profile-card">
                            <div className="stokiest-profile-image">
                                <div className="stokiest-profile-dot" />
                                <div className="hexagaon-image"><div className="image-text">A</div></div>
                                <img src="../public/assets/images/about-img@3x.png" />
                            </div>
                            <div className="profile-text">
                                <div className="distributor-name">
                                    {/* Mahaveer pharmaceuticals */}
                                    {myprofile.stockist!==undefined?myprofile.stockist.toLowerCase():null}
                                </div>
                                <div className="year-of-start">Distributor Since 2011 With <span>CSQUARE Labs</span></div>
                                <div className="distributor-code">Code: {myprofile.code}</div>
                                <div className="distributor-location">{myprofile.Area.toLowerCase()}&nbsp;({myprofile.Subarea.toLowerCase()})</div>
                                <div className="distributor-address">
                                    {myprofile.C_Add_1!=""?myprofile.C_Add_1.charAt(myprofile.C_Add_1.length-1)!=","?myprofile.C_Add_1.toLowerCase()+","+" ":myprofile.C_Add_1.toLowerCase()+" ":null}
                                    {myprofile.C_Add_2!=""?myprofile.C_Add_2.charAt(myprofile.C_Add_2.length-1)!=","?myprofile.C_Add_2.toLowerCase()+","+" ":myprofile.C_Add_2.toLowerCase()+" ":null}
                                    {myprofile.C_Add_3!=""?myprofile.C_Add_3.charAt(myprofile.C_Add_3.length-1)!=","?myprofile.C_Add_3.toLowerCase()+","+" ":myprofile.C_Add_3.toLowerCase()+" ":null}
                                    {myprofile.C_Add_4!=""?myprofile.C_Add_4.charAt(myprofile.C_Add_4.length-1)!=","?myprofile.C_Add_4.toLowerCase()+","+" ":myprofile.C_Add_4.toLowerCase()+" ":null}
                                    {myprofile.Subarea!=""?myprofile.Subarea.charAt(myprofile.Subarea.length-1)!=","?myprofile.Subarea.toLowerCase()+","+" ":myprofile.Subarea.toLowerCase()+" ":null}
                                    {myprofile.Area!=""?myprofile.Area.charAt(myprofile.Area.length-1)!=","?myprofile.Area.toLowerCase()+","+" ":myprofile.Area.toLowerCase()+" ":null}
                                    <div>{myprofile.State.toLowerCase()}&nbsp;{myprofile.C_Pin}</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col className="stokiest-profile-col" xl={6} lg={12} md={12} sm={12} xs={12}>
                        <Card className="profile-card number2">
                            <div className="stokiest-contact-and-info">
                                <div className="contact-and-info-head">CONTACT & OFFICIAL INFO</div>
                                <div className="stokiest-details-to-contact">
                                    <div className="stokiest-columns">
                                        <div className="stokiest-heading">Mobile Number</div>
                                        <div className="stokiest-detail">+91- 9087676540</div>
                                    </div>
                                    <div className="stokiest-columns">
                                        <div className="stokiest-heading">E-mail Address</div>
                                        <div className="stokiest-detail">{myprofile.C_Email_ID!=""?myprofile.C_Email_ID:"vinod.j@gmail.com"}</div>
                                    </div>
                                </div>
                                <div className="stokiest-details-to-contact">
                                    <div className="stokiest-columns">
                                        <div className="stokiest-heading">Owner Name</div>
                                        <div className="stokiest-detail">Kavitha Shetty</div>
                                    </div>
                                    <div className="stokiest-columns">
                                        <div className="stokiest-heading">Date Of Birth</div>
                                        <div className="stokiest-detail">{myprofile.D_DOB!=""?myprofile.D_DOB:"01/08/1997"}</div>
                                    </div>
                                </div>
                                <div className="stokiest-columns">
                                    <div className="stokiest-heading">FAX Number</div>
                                    <div className="stokiest-detail">+1 323 555 1234</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default ProfilePage;