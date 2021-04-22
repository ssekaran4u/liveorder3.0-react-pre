import React, { Component } from "react"
import Carttable from './cartTabl'
import Card from 'react-bootstrap/Card'
import Btngrp from './btngrpcartpage'
import Cartdeopdown from './cartpdropdown'
import Link from "react-router-dom"
import Orderconfirm from "./orderconfirmation"
import OrderConfirmed from './orderconfirmed'

class Ordersummary extends Component{
  constructor(props){
    super(props)
      this.state = {
      showModal: false,
      showModal1:false,
      open: false,

    }
    this.handleShowModal = this.handleShowModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
    this.handleCloseModal1 = this.handleCloseModal1.bind(this)
  }

 
  handleShowModal() {
    this.setState({
        showModal: true
    });
}

handleCloseModal(){
  this.setState({
    showModal:false,
     showModal1:true
  });
}

handleCloseModal1(){
  this.setState({
    showModal:false,
    showModal1:false,
  });
}

    render(){
        const header = [
           
            { prop: 'productname', title: 'PRODUCT NAME',filterable: true},
            { prop: 'batchno', title: 'BATCH NO.',filterable: true },
            { prop: 'orderqty', title: 'ORDER QUANTITY' ,filterable: true },
            { prop: 'scheme', title: 'SCHEME' ,filterable: true },
            { prop: 'price', title: 'PRICE PER UNIT' ,filterable: true },
            { prop: 'total', title: 'TOTALS' ,filterable: true },
            { prop: 'action', title: 'ACTION' ,filterable: true },
          ];
           
          const body = [
            { productname: 'Keracnyl Matifyer Cream 30 ml', batchno: 'abt008', orderqty: '1000', scheme: '10+2', price: '100.00', total: '1,00,000.00', action: 'btnimg' },
            { productname: 'Telpres 500 mg', batchno: 'abt098', orderqty: '500', scheme: '20+5', price: '50.00', total: '25,000.00', action: 'btnimg' },
            { productname: 'Anaphase Stimulating Shampoo 100ml', batchno: 'abt028', orderqty: '2000', scheme: '10+1', price: '90.00', total: '1,80,000.00', action: 'btnimg' },
            { productname: 'Esgipyrin Tab Plastic 50 mg', batchno: 'abt108', orderqty: '2000', scheme: '10+3', price: '20.00', total: '10,000.00', action: 'btnimg' },
             
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

       
        
        var deleteimg = <img className="deletebtn" src = "../public/assets/images/delete.png"/>

        body.map((item) => {
        var cartdropdown =  <span> <Cartdeopdown  batch= {item.batchno} /> </span>
        var btngroup = <Btngrp quaty={item.orderqty}/>

            if(item.orderqty != " " ){
                item.orderqty = btngroup
            }
            if(item.batchno != ""){
              item.batchno = cartdropdown
            }
            if(item.action == "btnimg"){
              item.action = deleteimg
            }
        })


        return (
          <div className="pullleft KamClaimTable">
            <div>
            <Card className="ordersummry-card">

            {/* <div className="distributorClaimList"> */}
              <div className="flex-row2">
                <div className="order-name">
                  <p className="mahaveer-medical">Mahaveer pharmaceuticals pvt ltd</p>
                  <p className="no-item">4 ITEMS</p>
                </div>
                <p className="order-sum">Order Summary</p>
              </div>

              <Carttable
                tableHeader={header}
                tableBody={body}
                keyName="userTable"
                tableClass="striped hover table-responsive"
                rowsPerPage={10}
                rowsPerPageOption={[10, 20, 50, 100, 200]}
                initialSort={{ prop: "username", isAscending: true }}
                labels={customLabels}
              />
            {/* </div> */}

            <div className="summary-rate">
              <div className="summary">
               {/* <div className="sumarry-total"> */}
                <div className="sub-subtotal">
                  <p className="sub-para">SUB TOTAL </p>
                  <p className="subtotal">10,000.00</p>
                </div>

                <div className="sub-subtotal">
                  <p className="sub-para">SHIPPING </p>
                  <p className="shipping">00.00</p>
                </div>

                <div className="sub-subtotal">
                  <p className="sub-para">TOTAL </p>
                  <p className="rs">RS. 3,15,000.00</p>
                </div>
                </div>
              </div>
              <div className="btn-save">
                
              <button onClick={this.handleShowModal} className="save-order">Save Order</button>
              {this.showModal = true ?
              <Orderconfirm 
              show={this.state.showModal}
              onHideconfirmation={this.handleCloseModal}
              onHidecancel={this.handleCloseModal1}
              onShoworderconfirm={this.handleShowModal}/>
              :null}
              </div>
              
              {this.state.showModal1 == true ?
                <OrderConfirmed  
                show={this.state.showModal1}
                onHide={this.handleCloseModal1}
                />  
                :null}

            {/* </div> */}

              </Card>
            </div>
                

            </div>
          
        );
    }
}

export default Ordersummary