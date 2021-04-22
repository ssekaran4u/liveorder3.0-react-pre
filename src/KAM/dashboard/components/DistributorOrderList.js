import React, { Component } from 'react';
import DistributorCustomTable from './DistributorCustomTable';
import { Link } from "react-router-dom";

class DistributorOrderList extends Component {
    render() {
        const header = [
            { prop: 'orderNumber', title: 'Order No.',filterable: true },
            { prop: 'distributorName', title: 'Distributor Name',filterable: true },
            { prop: 'region', title: 'Region',filterable: true },
            { prop: 'orderedDate', title: 'Ordered Date',filterable: true },
            { prop: 'valueIn', title: 'Value(In LAC)',filterable: true },
            { prop: 'details', title: 'Details',filterable: true }
              
        ];
             
            const body = [
              { orderNumber: 'abt0025', distributorName: 'wellness pharmaceuticals pvt ltd', region: 'Maharastra', orderedDate: '15-may-19', valueIn: 2,details: 'View' },
              { orderNumber: 'abt0027', distributorName: 'Mahaveer pharmaceuticals pvt ltd', region: 'Karnataka', orderedDate: '15-may-19', valueIn: 4.12, details: 'View' },
              { orderNumber: 'abt0028', distributorName: 'Ganesh pharmaceuticals pvt ltd', region: 'Telangana', orderedDate: '19-may-19', valueIn: 5, details: 'View' },
              { orderNumber: 'abt0029', distributorName: 'Ashwini pharmaceuticals pvt ltd', region: 'Tamilnadu', orderedDate: '21-may-19', valueIn: 3, details: 'View' },
              { orderNumber: 'abt0030', distributorName: 'Maruthi pharmaceuticals pvt ltd', region: 'Karnataka', orderedDate: '27-may-19', valueIn: 7, details: 'View' },
              { orderNumber: 'abt0031', distributorName: 'Om pharmaceuticals pvt ltd', region: 'Maharastra', orderedDate: '02-june-19', valueIn: 6, details: 'View' },
              { orderNumber: 'abt0032', distributorName: 'Mahaveer pharmaceuticals pvt ltd', region: 'Kerala', orderedDate: '04-june-19', valueIn: 12, details: 'View' },
              { orderNumber: 'abt0033', distributorName: 'Dvived pharmaceuticals pvt ltd', region: 'Tamilnadu', orderedDate: '15-june-19', valueIn: 9, details: 'View' },
              { orderNumber: 'abt0034', distributorName: 'vedanth pharmaceuticals pvt ltd', region: 'Karnataka', orderedDate: '15-june-19', valueIn: 5, details: 'View' },
              { orderNumber: 'abt0035', distributorName: 'Krishna pharmaceuticals pvt ltd', region: 'Telangana', orderedDate: '23-june-19', valueIn: 8, details: 'View' },
              { orderNumber: 'abt0036', distributorName: 'Ram pharmaceuticals pvt ltd', region: 'Maharastra', orderedDate: '30-june-19', valueIn: 7, details: 'View' },
              { orderNumber: 'abt0037', distributorName: 'Venkateshwar pharmaceuticals pvt ltd', region: 'Kerala', orderedDate: '08-july-19', valueIn: 6, details: 'View' },
              { orderNumber: 'abt0038', distributorName: 'Mahaveer pharmaceuticals pvt ltd', region: 'Karnataka', orderedDate: '11-july-19', valueIn: 4, details: 'View' },
              { orderNumber: 'abt0039', distributorName: 'Shrivasthav pharmaceuticals pvt ltd', region: 'Telangana', orderedDate: '14-july-19', valueIn: 51, details: 'View' },
              { orderNumber: 'abt0040', distributorName: 'Dwaraka pharmaceuticals pvt ltd', region: 'Tamilnadu', orderedDate: '26-july-19', valueIn: 2, details: 'View' },
              { orderNumber: 'abt0041', distributorName: 'wellness pharmaceuticals pvt ltd', region: 'Karnataka', orderedDate: '26-july-19', valueIn: 11, details: 'View' },
              { orderNumber: 'abt0042', distributorName: 'Banaras pharmaceuticals pvt ltd', region: 'Maharastra', orderedDate: '04-august-19', valueIn: 1.2, details: 'View' },
              { orderNumber: 'abt0043', distributorName: 'Mahaveer pharmaceuticals pvt ltd', region: 'Telangana', orderedDate: '11-august-19', valueIn: 5.2, details: 'View' },
              { orderNumber: 'abt0044', distributorName: 'Dwaraka pharmaceuticals pvt ltd', region: 'Tamilnadu', orderedDate: '14-august-19', valueIn: 3.2, details: 'View' },
              { orderNumber: 'abt0045', distributorName: 'Om pharmaceuticals pvt ltd', region: 'Maharastra', orderedDate: '15-august-19', valueIn: 5, details: 'View' },
              
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
        
        var detailButton = <Link to="/Order_details" className="viewBlueButton">View</Link>

        body.map((item) => {
            if(item.details == "View" ){
                
                item.details = detailButton
            }
        })

        return(
            <div className="">
                
                <DistributorCustomTable
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

export default DistributorOrderList;
	
	
	
