import React, { Component } from 'react';
import OrderCustomTable from "./OrderCustomTable";

class OrderAnalysisList extends Component {
    constructor(props){
        super(props);
        this.state = {

        }

    }

    render() {
        const header = [
            { prop: 'srNumber', title: 'Sr. Name',filterable: true },
            { prop: 'distributorName', title: 'Distributor Name',filterable: true },
            { prop: 'lastOrderedDate', title: 'Last Ordered Date',filterable: true },
            { prop: 'status', title: 'Status',filterable: true },
            { prop: 'frequentlyOrderAverage', title: 'Frequently Order Average',filterable: true }
              
        ];
             
            const body = [
              { srNumber: '01.', distributorName: 'wellness pharmaceuticals pvt ltd', lastOrderedDate: '15-may-19', status: 'Active', frequentlyOrderAverage: '5 days' },
              { srNumber: '02.', distributorName: 'Mahaveer pharmaceuticals pvt ltd', lastOrderedDate: '24-may-19', status: 'Inactive', frequentlyOrderAverage: '7 days' },
              { srNumber: '03.', distributorName: 'Ganesh pharmaceuticals pvt ltd', lastOrderedDate: '27-may-19', status: 'Partially Active', frequentlyOrderAverage: '5 days' },
              { srNumber: '04.', distributorName: 'Maruthi pharmaceuticals pvt ltd', lastOrderedDate: '27-may-19', status: 'Active', frequentlyOrderAverage: '5 days' },
              { srNumber: '05.', distributorName: 'Ashwini pharmaceuticals pvt ltd', lastOrderedDate: '06-june-19', status: 'Active', frequentlyOrderAverage: '15 days' },
              { srNumber: '06.', distributorName: 'Om pharmaceuticals pvt ltd', lastOrderedDate: '11-june-19', status: 'Active', frequentlyOrderAverage: '5 days' },
              { srNumber: '07.', distributorName: 'wellness pharmaceuticals pvt ltd', lastOrderedDate: '11-june-19', status: 'Partially Active', frequentlyOrderAverage: '9 days' },
              { srNumber: '08.', distributorName: 'Dvived pharmaceuticals pvt ltd', lastOrderedDate: '17-june-19', status: 'Active', frequentlyOrderAverage: '6 days' },
              { srNumber: '09.', distributorName: 'Krishna pharmaceuticals pvt ltd', lastOrderedDate: '23-june-19', status: 'Inactive', frequentlyOrderAverage: '8 days' },
              { srNumber: '10.', distributorName: 'Mahaveer pharmaceuticals pvt ltd', lastOrderedDate: '23-june-19', status: 'Partially Active', frequentlyOrderAverage: '2 days' },
              { srNumber: '11.', distributorName: 'Dwaraka pharmaceuticals pvt ltd', lastOrderedDate: '02-july-19', status: 'Partially Active', frequentlyOrderAverage: '5 days' },
              { srNumber: '12.', distributorName: 'Ashwini pharmaceuticals pvt ltd', lastOrderedDate: '03-july-19', status: 'Active', frequentlyOrderAverage: '4 days' },
              { srNumber: '13.', distributorName: 'Om pharmaceuticals pvt ltd', lastOrderedDate: '12-july-19', status: 'Active', frequentlyOrderAverage: '7 days' },
              { srNumber: '14.', distributorName: 'Maruthi pharmaceuticals pvt ltd', lastOrderedDate: '15-july-19', status: 'Inactive', frequentlyOrderAverage: '12 days' },
              { srNumber: '15.', distributorName: 'Dvived pharmaceuticals pvt ltd', lastOrderedDate: '21-july-19', status: 'Active', frequentlyOrderAverage: '20 days' },
              { srNumber: '16.', distributorName: 'Mahaveer pharmaceuticals pvt ltd', lastOrderedDate: '01-august-19', status: 'Active', frequentlyOrderAverage: '6 days' },
              { srNumber: '17.', distributorName: 'Dwaraka pharmaceuticals pvt ltd', lastOrderedDate: '04-august-19', status: 'Partially Active', frequentlyOrderAverage: '5 days' },
              { srNumber: '18.', distributorName: 'Ganesh pharmaceuticals pvt ltd', lastOrderedDate: '09-august-19', status: 'Active', frequentlyOrderAverage: '15 days' },  
              { srNumber: '19.', distributorName: 'Krishna pharmaceuticals pvt ltd', lastOrderedDate: '11-august-19', status: 'Inactive', frequentlyOrderAverage: '4 days' },
              { srNumber: '20.', distributorName: 'Mahaveer pharmaceuticals pvt ltd', lastOrderedDate: '14-august-19', status: 'Partially Active', frequentlyOrderAverage: '2 days' }
              
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
        var activeText= <span className="activeTextGreen">Active</span>
        var inactiveText= <span className="inActiveTextRed">Inactive</span>
        var partiallyActiveText = <span className="partiallyActiveTextYellow">Partially Active</span>
        body.map((item) => {
            if(item.status == "Active" ){
                item.status = activeText
            }
            if(item.status == "Inactive" ){
                item.status = inactiveText
            }
            if(item.status == "Partially Active" ){
                item.status = partiallyActiveText
            }
        })
        return(
            <div className="">
                
                <OrderCustomTable
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
      
export default OrderAnalysisList;
	
	
	
