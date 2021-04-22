import React, { Component, PropTypes } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Loader from '../lib/Loader'
import ReactDOM from 'react-dom'
import Iframe from 'react-iframe'





class IFrame extends Component {



    constructor(props) {

        // console.log(props.match.params.id, 'sinha')


        super(props);
        this.state = {
            isMenuOpen: true,
            showLoader: true

        };
        this.onLoad=this.onLoad.bind(this)
    }
    onLoad(event){
        this.setState({showLoader:false})
     }
 




    componentDidMount() {
        let element = document.getElementById("iframe1")
        if (element)
            element.onload = this.onLoad
        //window.scrollTo(0, 0)
      //  let iframe = ReactDOM.findDOMNode(this.refs.iframe)
       // iframe.onload = () => this.props.onLoad
    }

    render() {
        var com = sessionStorage.getItem("SFA_TOKEN").split('|')
        // alert(com[0])
        const tokenval = encodeURIComponent(sessionStorage.getItem("SFA_TOKEN"));

        //alert(tokenval)
        var encoded=''
        const k= localStorage.getItem("type")
        if(k=="1"){
        encoded = "https://gogreen.sfa360.in/sfalogin.aspx?compID=" + com[0] + "&token=" + tokenval + "&m=37"
        // encoded = "http://www.pharmspa.net:84/sfalogin.aspx?compID=" + com[0] + "&token=" + tokenval + "&m=37"
        }else{
//           encoded = "http://www.pharmspa.net:84/sfalogin.aspx?compID=" + com[0] + "&token=" + tokenval + "&m=458"

        encoded = "https://gogreen.sfa360.in/sfalogin.aspx?compID=" + com[0] + "&token=" + tokenval + "&m=458"
        }



        const {showLoader} = this.state


        return (


            <div className="iframepad"  >



            

                <Iframe url={encoded}
                  ///  sandbox ="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts "
                  
                  sandbox='allow-scripts allow-modals  allow-scripts  allow-same-origin  allow-scripts  allow-forms  allow-scripts  allow-downloads'
                  
                  id="iframe1"
                    // ref="iframe"
                    {...this.props}
                   // onLoad={this.onLoad}
                    width="120%"
                    height="1200px"
                    position="static"
                    allowFullScreen />

                <Loader show={showLoader} />

                


            </div>
        )

    }



}

export default IFrame;