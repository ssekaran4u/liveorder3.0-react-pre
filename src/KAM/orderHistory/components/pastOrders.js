import React, { Component } from 'react';
import PastOrdersCustomTable from './pastOrdersCustomTable';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

class PastOrders extends Component {
    constructor(props){
        super(props)
    }
    
    render() {
        const header = [
            { prop: 'orderNumber', title: 'Order ID', filterable: true },
            { prop: 'distributorName', title: 'Distributor Name', filterable: true },
            { prop: 'orderedDate', title: 'Ordered Date', filterable: true },
            { prop: 'orderedQuantity', title: 'Order Quantity', filterable: true },
            { prop: 'valueIn', title: 'Order Value(In LAC)', filterable: true },
            { prop: 'orderStatus', title: 'Order Status', filterable: true },
            { prop: 'details', title: 'Details', filterable: true }

        ];

        const body = [
            {
                orderNumber: 'abt0025',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/wellness-forever-chemist-and-lifestyle-store-panjim-goa-chemists-qgf2k@3x.jpg" alt="" />&nbsp;&nbsp;   wellness pharmaceuticals pvt ltd</React.Fragment>,
                orderedDate: '15-may-19',
                orderedQuantity: '300',
                valueIn: 2,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0027',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/about-img@3x.jpg" alt="" />&nbsp;&nbsp;   Mahaveer Medi-Sales</React.Fragment>,
                orderedDate: '15-may-19', 
                orderedQuantity: '500',
                valueIn: 4.12,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0028',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/vardhman-pharma-distributors-pvt-ltd-wilson-garden-bangalore-pharmaceutical-product-distributors-7z1zny@3x.jpg" alt="" />&nbsp;&nbsp;   Vardhmaan Pharma</React.Fragment>,
                orderedDate: '19-may-19',
                orderedQuantity: '200',
                valueIn: 5,
                orderStatus: 'Rejected',
                details: 'View'
            },
            {
                orderNumber: 'abt0029',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/maxresdefault@3x.jpg" alt="" />&nbsp;&nbsp;   DM Pharmaceuticals</React.Fragment>,
                orderedDate: '21-may-19',
                orderedQuantity: '1300',
                valueIn: 3,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0030',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/bb9ee9f3c277e01dfd8b65e95161ee95@3x.jpg" alt="" />&nbsp;&nbsp;   Medicana Pharmaceuticals</React.Fragment>,
                orderedDate: '27-may-19',
                orderedQuantity: '600',
                valueIn: 7,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0031',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/wellness-forever-chemist-and-lifestyle-store-panjim-goa-chemists-qgf2k@3x.jpg" alt="" />&nbsp;&nbsp;   wellness pharmaceuticals pvt ltd</React.Fragment>,
                orderedDate: '02-june-19',
                orderedQuantity: '900',
                valueIn: 6,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0035',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/about-img@3x.jpg" alt="" />&nbsp;&nbsp;   Mahaveer Medi-Sales</React.Fragment>,
                orderedDate: '23-june-19',
                orderedQuantity: '300',
                valueIn: 8,
                orderStatus: 'Rejected',
                details: 'View'
            },
            {
                orderNumber: 'abt0032',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/vardhman-pharma-distributors-pvt-ltd-wilson-garden-bangalore-pharmaceutical-product-distributors-7z1zny@3x.jpg" alt="" />&nbsp;&nbsp;   Vardhmaan Pharma</React.Fragment>,
                orderedDate: '04-june-19',
                orderedQuantity: '4300',
                valueIn: 12,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0033',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/maxresdefault@3x.jpg" alt="" />&nbsp;&nbsp;   DM Pharmaceuticals</React.Fragment>,
                orderedDate: '15-june-19',
                orderedQuantity: '1000',
                valueIn: 9,
                orderStatus: 'Rejected',
                details: 'View'
            },
            {
                orderNumber: 'abt0034',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/bb9ee9f3c277e01dfd8b65e95161ee95@3x.jpg" alt="" />&nbsp;&nbsp;   Medicana Pharmaceuticals</React.Fragment>,
                orderedDate: '15-june-19',
                orderedQuantity: '800',
                valueIn: 5,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0035',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/wellness-forever-chemist-and-lifestyle-store-panjim-goa-chemists-qgf2k@3x.jpg" alt="" />&nbsp;&nbsp;   wellness pharmaceuticals pvt ltd</React.Fragment>,
                orderedDate: '23-june-19',
                orderedQuantity: '300',
                valueIn: 8,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0036',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/about-img@3x.jpg" alt="" />&nbsp;&nbsp;   Mahaveer Medi-Sales</React.Fragment>,
                orderedDate: '30-june-19',
                orderedQuantity: '700',
                valueIn: 7,
                orderStatus: 'Rejected',
                details: 'View'
            },
            {
                orderNumber: 'abt0037',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/vardhman-pharma-distributors-pvt-ltd-wilson-garden-bangalore-pharmaceutical-product-distributors-7z1zny@3x.jpg" alt="" />&nbsp;&nbsp;   Vardhmaan Pharma</React.Fragment>,
                orderedDate: '08-july-19',
                orderedQuantity: '1500',
                valueIn: 6,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0038',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/maxresdefault@3x.jpg" alt="" />&nbsp;&nbsp;   DM Pharmaceuticals</React.Fragment>,
                orderedDate: '11-july-19',
                orderedQuantity: '1800',
                valueIn: 4,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0039',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/bb9ee9f3c277e01dfd8b65e95161ee95@3x.jpg" alt="" />&nbsp;&nbsp;   Medicana Pharmaceuticals</React.Fragment>,
                orderedDate: '14-july-19',
                orderedQuantity: '300',
                valueIn: 51,
                orderStatus: 'Rejected',
                details: 'View'
            },
            {
                orderNumber: 'abt0040',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/wellness-forever-chemist-and-lifestyle-store-panjim-goa-chemists-qgf2k@3x.jpg" alt="" />&nbsp;&nbsp;   wellness pharmaceuticals pvt ltd</React.Fragment>,
                orderedDate: '26-july-19',
                orderedQuantity: '900',
                valueIn: 2,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0041',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/about-img@3x.jpg" alt="" />&nbsp;&nbsp;   Mahaveer Medi-Sales</React.Fragment>, 
                orderedDate: '26-july-19',
                orderedQuantity: '1000',
                valueIn: 11,
                orderStatus: 'Rejected',
                details: 'View'
            },
            {
                orderNumber: 'abt0042',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/vardhman-pharma-distributors-pvt-ltd-wilson-garden-bangalore-pharmaceutical-product-distributors-7z1zny@3x.jpg" alt="" />&nbsp;&nbsp;   Vardhmaan Pharma</React.Fragment>, 
                orderedDate: '04-august-19',
                orderedQuantity: '2000',
                valueIn: 1.2,
                orderStatus: 'Rejected',
                details: 'View'
            },
            {
                orderNumber: 'abt0043',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/maxresdefault@3x.jpg" alt="" />&nbsp;&nbsp;   DM Pharmaceuticals</React.Fragment>,
                orderedDate: '11-august-19',
                orderedQuantity: '3000',
                valueIn: 5.2,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0044',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/bb9ee9f3c277e01dfd8b65e95161ee95@3x.jpg" alt="" />&nbsp;&nbsp;   Medicana Pharmaceuticals</React.Fragment>,
                orderedDate: '14-august-19',
                orderedQuantity: '6300',
                valueIn: 3.2,
                orderStatus: 'Completed',
                details: 'View'
            },
            {
                orderNumber: 'abt0045',
                distributorName: <React.Fragment><img className="order-history-images" src="../public/assets/images/wellness-forever-chemist-and-lifestyle-store-panjim-goa-chemists-qgf2k@3x.jpg" alt="" />&nbsp;&nbsp;   wellness pharmaceuticals pvt ltd</React.Fragment>,
                orderedDate: '15-august-19',
                orderedQuantity: '300',
                valueIn: 5,
                orderStatus: 'Rejected',
                details: 'View'
            },

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

        var detailButton = <Link to="/orderdetailpage" className="viewBlueButton">View</Link>
        var completedButton = <button className="completed-button">Completed</button>
        var rejectedButton = <button className="rejected-button">Rejected</button>

        body.map((item) => {
            if (item.details == "View") {

                item.details = detailButton
            }
        })

        body.map((status) => {
            if(status.orderStatus == "Completed"){
                status.orderStatus = completedButton
            }
            if(status.orderStatus == "Rejected"){
                status.orderStatus = rejectedButton
            }
        })

        return (
            <div className="ongoing-orders">
                <PastOrdersCustomTable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={5}
                    rowsPerPageOption={[5,10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    status={this.props.pastOrderStatus}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    pastOrderStatus: state.KAMDashboard.past_order_status
})

export default connect(mapStateToProps)(PastOrders);



