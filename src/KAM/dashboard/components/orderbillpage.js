import React, { Component } from "react"
import Carttable from './cartTabl'
import Card from 'react-bootstrap/Card'
import OrderbillTable from "./orderbilltable"
 
class Orderbill extends Component{
  


    render(){
        const header = [
           
            { prop: 'productname', title: 'PRODUCT NAME',filterable: true},
            { prop: 'purchase', title: 'PURCHASE QUANTITY.',filterable: true },
            { prop: 'price', title: 'PRICE PER UNIT' ,filterable: true },
            { prop: 'total', title: 'TOTALS' ,filterable: true },
            
          ];
           
          const body = [
            { productname: 'Keracnyl Matifyer Cream 30 ml',   purchase: '1000',  price: '100.00', total: '1,00,000.00',},
            { productname: 'Telpres 500 mg',   purchase: '500',   price: '50.00', total: '25,000.00',},
            { productname: 'Anaphase Stimulating Shampoo 100ml',   purchase: '2000',   price: '90.00', total: '1,80,000.00',},
            { productname: 'Esgipyrin Tab Plastic 50 mg',   purchase: '2000',   price: '20.00', total: '10,000.00',},
             
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
         
        return (
          <div className="pullleft KamClaimTable">
            <div>
            <Card className="ordersummry-card">

              <div className="flex-row2">
                <div className="order-name">
                  <p className="mahaveer-medical">Welness pharmaceuticals pvt ltd</p>
                  <div className="export-order">
                    <button className="export-btn"><img className="export-img" src="../public/assets/images/Path 2093.png"/>Export</button>
                  <p className="no-item">Order #Abt00098787</p>                    
                  </div>
                </div>
                <div className="bittTo">
                    <div className="bill-address">
                    <p className="billed-to">Billed To: </p>
                <p className = "distrubtr-name">Wellness pharmaceuticals</p>
                <p className="distr-address">Level 3, Vasant Square Mall,
                 </p>
                <p className="distr-address"> 
                Pocket V, Sector B, Vasant Kunj,
                </p>
                <p className="distr-address"> 
                New Delhi-110070</p>
                    </div>
                    <div className="billorderdate">
                    <p className="billorder-date">order date</p>
                    <p className="billorder-time">Sep 22,2019 11:23 AM</p>
                    </div>
                 
                </div>
                
                <p className="order-sum">Order Summary</p>
              </div>
             
              <OrderbillTable
                tableHeader={header}
                tableBody={body}
                keyName="userTable"
                tableClass="striped hover table-responsive"
                rowsPerPage={10}
                rowsPerPageOption={[10, 20, 50, 100, 200]}
                initialSort={{ prop: "username", isAscending: true }}
                labels={customLabels}
              />

             <div className="summary-rate">
              <div className="summary">
               {/* <div className="sumarry-total"> */}
                <div className="sub-subtotal">
                  <p className="sub-para1">SUB TOTAL </p>
                  <p className="shipping1">3,15,000.00</p>
                </div>

                <div className="sub-subtotal">
                  <p className="sub-para1">SHIPPING </p>
                  <p className="shipping1">1000.00</p>
                </div>
                 
                <div className="sub-subtotal">
                  <p className="sub-para1">SGST </p>
                  <p className="shipping1">1000.00</p>
                </div>

                <div className="sub-subtotal">
                  <p className="sub-para1">CGST </p>
                  <p className="shipping1">1000.00</p>
                </div>

                <div className="sub-subtotal">
                  <p className="sub-para-rs1">TOTAL </p>
                  <p className="rs1">RS. 3,18,000.00</p>
                </div>

                
                 
                </div>
              </div>
              
 
              </Card>
            </div>
                

            </div>
          
        );
    }
}

export default Orderbill