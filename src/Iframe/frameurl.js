import React, { Component, PropTypes } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Loader from '../lib/Loader'


import ReactDOM from 'react-dom'
import Iframe from 'react-iframe'
import Footer from  '../landing-page/components/Footer'





class Frameurl extends Component {



    constructor(props) {

        // console.log(props.match.params.id, 'sinha')


        super(props);
        this.state = {
            isMenuOpen: true,
            loaderstate: true,
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
        const {showLoader} = this.state
        let id= this.props.match.params.id

      
        var com = sessionStorage.getItem("SFA_TOKEN").split('|')
        const tokenval = encodeURIComponent(sessionStorage.getItem("SFA_TOKEN"));
       var encoded = "https://gogreen.sfa360.in/sfalogin.aspx?compID=" + com[0] + "&token=" + tokenval + "&m="+id
         //var encoded = "http://www.pharmspa.net:84/sfalogin.aspx?compID=" + com[0] + "&token=" + tokenval + "&m="+id
        return (


            <div  className="iframepad300" >
            
 
               <Iframe url={encoded}
               sandbox='allow-scripts allow-modals  allow-scripts  allow-same-origin  allow-scripts  allow-forms    allow-scripts allow-downloads'
                //sandbox ="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts "
               // sandbox='allow-scripts allow-modals allow-same-origin allow-forms'  
               // sandbox=" allow-scripts allow-modals  allow-pointer-lock allow-modals  allow-forms allow-popups allow-scripts allow-same-origin"
                {...this.props}
                    id="iframe1"
                    width="120%"
                    height="1200px"
                   
                    position="static"
                    allowFullScreen /> 
  <Loader show={showLoader} />
                {/* <loader show={this.state.loaderstate} > </loader> */}

{/* <Footer></Footer> */}

            </div>
        )

    }



}

export default Frameurl;