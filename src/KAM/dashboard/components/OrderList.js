import React, { Component } from 'react';
import OrderListCustomTable from './orderListCustomTable';
import { Link } from "react-router-dom";

class OrderList extends Component {
    render() {
        const header = [
            { prop: 'srNumber', title: 'Sr. Number',filterable: true },
            { prop: 'productName', title: 'Product Name',filterable: true },
            { prop: 'orderedDate', title: 'Ordered Date',filterable: true },
            { prop: 'purchaseQty', title: 'Purchase Qty.',filterable: true },
            { prop: 'salesValue', title: 'Sales Value',filterable: true }
            
              
        ];
             
            const body = [
              { srNumber: '01.', productName: 'Telpres 50 mg', orderedDate: '15-may-19', purchaseQty: 1000.00, salesValue: 2 },
              { srNumber: '02.', productName: 'Telpres 100 mg', orderedDate: '19-may-19', purchaseQty: 500.00, salesValue: 4.12  },
              { srNumber: '03.', productName: 'Telpres 100 mg', orderedDate: '15-may-19', purchaseQty: 620.00, salesValue: 5 },
              { srNumber: '04.', productName: 'Telpres 150 mg', orderedDate: '27-may-19', purchaseQty: 1000.00, salesValue: 3 },
              { srNumber: '05.', productName: 'Telpres 250 mg', orderedDate: '02-june-19', purchaseQty: 900.00, salesValue: 7 },
              { srNumber: '06.', productName: 'Telpres 50 mg', orderedDate: '02-june-19', purchaseQty: 1000.00, salesValue: 6 },
              { srNumber: '07',  productName: 'Telpres 150 mg', orderedDate: '11-june-19', purchaseQty: 1700.00, salesValue: 12 },
              { srNumber: '08.', productName: 'Telpres 50 mg', orderedDate: '14-june-19', purchaseQty: 550.00, salesValue: 9 },
              { srNumber: '09.', productName: 'Telpres 250 mg', orderedDate: '17-june-19', purchaseQty: 1900.00, salesValue: 5 },
              { srNumber: '10.', productName: 'Telpres 100 mg', orderedDate: '23-june-19', purchaseQty: 1750.00, salesValue: 8 },
              { srNumber: '11.', productName: 'Telpres 150 mg', orderedDate: '23-june-19', purchaseQty: 1000.00, salesValue: 7 },
              { srNumber: '12.', productName: 'Telpres 200 mg', orderedDate: '30-june-19', purchaseQty: 1000.00, salesValue: 6 },
              { srNumber: '13.', productName: 'Telpres 50 mg', orderedDate: '07-july-19', purchaseQty: 800.00, salesValue: 4 },
              { srNumber: '14.', productName: 'Telpres 50 mg', orderedDate: '15-july-19', purchaseQty: 1000.00, salesValue: 51 },
              { srNumber: '15.', productName: 'Telpres 300 mg', orderedDate: '26-july-19', purchaseQty: 900.00, salesValue: 2 },
              { srNumber: '16.', productName: 'Telpres 150 mg', orderedDate: '27-july-19', purchaseQty: 1000.00, salesValue: 11 },
              { srNumber: '17.', productName: 'Telpres 250 mg', orderedDate: '01-august-19', purchaseQty: 950.00, salesValue: 1.2 },
              { srNumber: '18.', productName: 'Telpres 50 mg', orderedDate: '06-august-19', purchaseQty: 1000.00, salesValue: 5.2 },
              { srNumber: '19.', productName: 'Telpres 100 mg', orderedDate: '09-august-19', purchaseQty: 5600.00, salesValue: 3.2 },
              { srNumber: '20.', productName: 'Telpres 50 mg', orderedDate: '11-august-19', purchaseQty: 3000.00, salesValue: 5 }
              
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
        

        return(
            <div className="">
                
                <OrderListCustomTable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                />
            </div>
        )
    }
}

export default OrderList;