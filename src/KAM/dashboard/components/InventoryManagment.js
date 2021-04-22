import React, { Component } from 'react';
import { Row,Col,Dropdown,Tab,Nav } from 'react-bootstrap';
import InventoryTable from '../components/InventoryTable'
import Collapsible from 'react-collapsible';
import DistributorInventory from '../components/DistributorInventory'
import CompanyInventory from '../components/ComanyInventory'
import { connect } from 'react-redux';

class InventoryManagment extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFull : false,
            activeTab:1,
            status: []
           
        }
        this.addclass = this.addclass.bind(this)
        this.showTable = this.showTable.bind(this)
       
    }

    addclass(tab){
      if(this.state.activeTab !== tab){
        this.setState({
          activeTab:tab
        })
      }
    }
    showTable(index){
       this.setState({
         showsubtable:true
       })
    }
   
    render() {
      const status = this.props.inventory_filter;
      // console.log(status)
         const header = [
              { title: 'image', prop: 'image'},
              { title: 'SKU', prop: 'username'},
              { title: 'Product Name', prop: 'realname' },
              { title: 'Packing', prop: 'realnameuppercase' },
              { title: 'Btach No.', prop: 'realnameuppercase' },
              { title: 'Scheme Qt.', prop: 'realnameuppercase'  },
              { title: 'Expire Date.', prop: 'realnameuppercase' },
              { title: 'Qty.(In box)', prop: 'realnameuppercase'  },
              { title: 'Price(Per Box)', prop: 'pricebox'  },
            ];
             
            const body = [
              {
                index:"1",
                username: 'i-am-billy',
                realname: 'Billy',
                location: 'Mars',
                date:'' ,
                image:'',
                pricebox:'600.04'
              },
              {
                index:"2",
                username: 'john-nhoj',
                realname: 'John',
                location: 'Saturn',
                date:'' ,
                image:'',
                pricebox:'600.04'
              },
              {
                  index:"3",
                  username: 'i-am-billy',
                  realname: 'Billy',
                  location: 'Mars',
                  date:'' ,
                  image:'',
                  pricebox:'600.04'
                },
                {
                  index:"4",
                  username: 'john-nhoj',
                  realname: 'John',
                  location: 'Saturn',
                  date:'' ,
                  image:'',
                  pricebox:'600.04'

                }
               
            ];
          const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >", 
            show: "Show",
            entries: "items/page",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };
       
        header.map((item) =>{
          if(item.title == "image"){
            item.title =""
          }
        })
        body.map((item) =>{
          item.image = <img src="../public/assets/images/product.png" className="proimg" />
        item.pricebox = <p >{item.pricebox}<span className="priceborder"><i className="priceBtn" ></i></span></p>
         
        })
        return (
            <React.Fragment>
            
              {this.state.activeTab == 1 ?
              <div className="inventoryManagment pullInventroy ">
                <CompanyInventory months={this.props.months} status={status}/>
              </div>: 
              <div className="inventoryManagment pullInventroy">
                <DistributorInventory months={this.props.months} status={status}/>
            </div>}
                    <div className="AdashboardTable">
                      <ul className="nav nav-pills listborderTop" id="pills-tab" role="tablist">
                        <li className={this.state.activeTab == 1 ?  'nav-item elementcontainer kamActivebar':  'nav-item elementcontainer activelink1' } onClick={() => { this.addclass('1'); }}>
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="linkcontainer">
                                    <p className="dashtabhead">C-Square Inventory</p>
                                    <p  className="dashtabsubhead">Check Stock Availability </p>
                                </Nav.Link>
                            </Nav.Item>
                        </li>
                        <li className={this.state.activeTab == 2 ?  'nav-item elementcontainer kamActivebar':  'nav-item elementcontainer activelink2' } onClick={() => { this.addclass('2'); }}>
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="linkcontainer">
                                    <p className="dashtabhead">Distributors Inventory</p>
                                    <p  className="dashtabsubhead">Check Stock Availability</p>
                                </Nav.Link>
                            </Nav.Item>
                        </li>
                              
                      </ul>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
  months: state.KAMDashboard.months,
  inventory_filter: state.KAMDashboard.inventory_filter
})

export default connect(mapStateToProps)(InventoryManagment);