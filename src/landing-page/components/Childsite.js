
import { Accordion, AccordionItem } from 'react-light-accordion';
import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { postToServer } from '../../lib/comm-utils'
import {Row,Col,Dropdown,Navbar,Nav,NavDropdown,Modal,Button,Spinner} from 'react-bootstrap';

class Childsie extends Component{

    constructor(props, context) {
		super(props, context);
         this.state = {
            data:null,
            width100:false,
            deatails:false
         }
         this.widthincress = this.widthincress.bind(this)
         this.withdecress = this.withdecress.bind(this)
         this.setdetails = this.setdetails.bind(this)
        }

        setdetails(){
            setTimeout(function(){
                this.setState({
                   deatails:true
                })
            }.bind(this),200);
        }
        widthincress(){
            //alert("ok");
            this.setState({
                width100:true
            }, () => {
                this.setdetails();
            })
        }
        withdecress(){
            this.setState({
                width100:false,
                deatails:false
            })
        };

    componentDidMount(){
       
       


        const  _this=this
        var data = {"index":"Dashbord","Token":"","Data":_this.props.id,"Header":null}
        postToServer("Menu360", data)
    
            .then(function (result) {

              
                 _this.setState( {data:result.data} )

                
            })
    }

    render(){ 
        if(!this.state.data){return null}
        return(

            <div className={this.state.width100 ? 'sitedropmenu width50':'sitedropmenu'}>
            <div className="first_child">
                <ul>
                    <li onMouseEnter={this.widthincress} >Masters 
                        <i className="fa fa-angle-right siteangle float-right" aria-hidden="true"></i>
                    </li>                       
                </ul>
            </div>
            <div className="second_child">
                {this.state.deatails ? 
                <ul>
                    <h5 className="dropsiteheading">Sales Reports</h5>
                    <li>FS Wise Primary/Secondary Sales Vs Target Consolidated Report</li>
                    <li>Area Wise Primary/Secondary Sales Vs Target</li>
                    <li>Division Wise Primary/Secondary Sales Vs Targe</li>
                    <li>Pool Wise Primary/Secondary Sales Vs Target Report</li>
                    <li>Secondary Sales Consolidated Report</li>
                    <li>Product wise Sales Target Analysis-Consolidated Report</li>
                    <li>Value Wise Sales Analysis-Consolidated Report</li>
                    <li>Stockistwise FSwise Primary Sales</li>
                    <li>Brandwise Itemwise Primary Sales</li>
                    <li>Depot wise Secondary Sales</li>
                </ul>
                :
                null
                }
            </div>

        </div>
)
    }

}
export default Childsie