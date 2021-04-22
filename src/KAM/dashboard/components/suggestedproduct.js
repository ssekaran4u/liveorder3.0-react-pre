import React, { Component } from "react"
import Carttable from './cartTabl'
import Card from 'react-bootstrap/Card'
import Suggestedtable from './suggestedcarttable'
import Btngrp from './btngrpcartpage'
import Cartdeopdown from './cartpdropdown'

class Suggestedpro extends Component{
    render(){
        const header = [
           
            { prop: 'productname', title: 'PRODUCT NAME',filterable: true},
            { prop: 'batchno', title: 'BATCH NO.',filterable: true },
            { prop: 'orderqty', title: 'SUGGESTED QUANTITY' ,filterable: true },
            { prop: 'scheme', title: 'SCHEME' ,filterable: true },
            { prop: 'price', title: 'PRICE PER UNIT' ,filterable: true },
            { prop: 'action', title: 'ACTION' ,filterable: true },
          ];
           
          const body = [
            { productname: 'Keracnyl Matifyer Cream 30 ml', batchno: 'abt008', orderqty: '100', scheme: '100+30', price: '100.00', action: 'btnimg' },
            { productname: 'Telpres 500 mg', batchno: 'abt008', orderqty: '100', scheme: '100+20', price: '40.00', action: 'btnimg' },
            { productname: 'Telpres 40 ml injection', batchno: 'abt008', orderqty: '100', scheme: '100+50', price: '63.00', action: 'btnimg' },
            { productname: 'Telpres 200 mg tablet', batchno: 'abt008', orderqty: '100', scheme: '10+2', price: '21.00', action: 'btnimg' },
             
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
          
        var deleteimg = <button className="addtocart">Add To Cart</button>

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
            <div className="distributorClaimList">
            <Card className="ordersummry-card">

            <div className="flex-row2">
                <p className="order-sum">Suggested Products</p>
              </div>

              <Suggestedtable
                tableHeader={header}
                tableBody={body}
                keyName="userTable"
                tableClass="striped hover table-responsive"
                rowsPerPage={10}
                rowsPerPageOption={[10, 20, 50, 100, 200]}
                initialSort={{ prop: "username", isAscending: true }}
                labels={customLabels}
              />
            </Card>

            </div>

            
          </div>
        );
    }
}

export default Suggestedpro