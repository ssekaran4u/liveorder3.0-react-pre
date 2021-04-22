import React, { Component } from 'react';
import DetailedOnGoingOrdersCustomTable from './detailedOngoingOrdersCustomtable';
import { Link } from "react-router-dom";
import DetailedPastOrders from './detailedPastOrders';

class DetailedOnGoingOrders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 1
        }
        this.onTabChange = this.onTabChange.bind(this)
    }

    onTabChange(tab) {
        if (this.state.active !== tab) {
            this.setState({
                active: tab
            })
        }
    }

    render() {
        const header = [
            { prop: 'orderNumber', title: 'Order ID', filterable: true },
            { prop: 'orderedDate', title: 'Ordered Date', filterable: true },
            { prop: 'orderedQuantity', title: 'Order Quantity', filterable: true },
            { prop: 'valueIn', title: 'Order Value(In LAC)', filterable: true },
            { prop: 'orderStatus', title: 'Order Status', filterable: true },
            { prop: 'details', title: 'Details', filterable: true }

        ];

        const body = [
            {
                orderNumber: 'abt0025',
                orderedDate: '15-may-19',
                orderedQuantity: '300',
                valueIn: 2,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0027',
                orderedDate: '15-may-19',
                orderedQuantity: '500',
                valueIn: 4.12,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0028',
                orderedDate: '19-may-19',
                orderedQuantity: '200',
                valueIn: 5,
                orderStatus: 'Process',
                details: 'View'
            },
            {
                orderNumber: 'abt0029',
        
                orderedDate: '21-may-19',
                orderedQuantity: '1300',
                valueIn: 3,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0030',
                orderedDate: '27-may-19',
                orderedQuantity: '600',
                valueIn: 7,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0031',
                orderedDate: '02-june-19',
                orderedQuantity: '900',
                valueIn: 6,
                orderStatus: 'Process',
                details: 'View'
            },
            {
                orderNumber: 'abt0035',
                orderedDate: '23-june-19',
                orderedQuantity: '300',
                valueIn: 8,
                orderStatus: 'Process',
                details: 'View'
            },
            {
                orderNumber: 'abt0032',
                orderedDate: '04-june-19',
                orderedQuantity: '4300',
                valueIn: 12,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0033',
                orderedDate: '15-june-19',
                orderedQuantity: '1000',
                valueIn: 9,
                orderStatus: 'Process',
                details: 'View'
            },
            {
                orderNumber: 'abt0034',
                orderedDate: '15-june-19',
                orderedQuantity: '800',
                valueIn: 5,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0035',
                orderedDate: '23-june-19',
                orderedQuantity: '300',
                valueIn: 8,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0036',
                orderedDate: '30-june-19',
                orderedQuantity: '700',
                valueIn: 7,
                orderStatus: 'Process',
                details: 'View'
            },
            {
                orderNumber: 'abt0037',
                orderedDate: '08-july-19',
                orderedQuantity: '1500',
                valueIn: 6,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0038',
        
                orderedDate: '11-july-19',
                orderedQuantity: '1800',
                valueIn: 4,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0039',
                orderedDate: '14-july-19',
                orderedQuantity: '300',
                valueIn: 51,
                orderStatus: 'Process',
                details: 'View'
            },
            {
                orderNumber: 'abt0040',
                orderedDate: '26-july-19',
                orderedQuantity: '900',
                valueIn: 2,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0041',
                orderedDate: '26-july-19',
                orderedQuantity: '1000',
                valueIn: 11,
                orderStatus: 'Process',
                details: 'View'
            },
            {
                orderNumber: 'abt0042',
                orderedDate: '04-august-19',
                orderedQuantity: '2000',
                valueIn: 1.2,
                orderStatus: 'Process',
                details: 'View'
            },
            {
                orderNumber: 'abt0043',
                orderedDate: '11-august-19',
                orderedQuantity: '3000',
                valueIn: 5.2,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0044',
                orderedDate: '14-august-19',
                orderedQuantity: '6300',
                valueIn: 3.2,
                orderStatus: 'Received',
                details: 'View'
            },
            {
                orderNumber: 'abt0045',
                orderedDate: '15-august-19',
                orderedQuantity: '300',
                valueIn: 5,
                orderStatus: 'Process',
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
        var receivedButton = <button className="received-button">Received</button>
        var processButton = <button className="process-button">Process</button>

        body.map((item) => {
            if (item.details == "View") {

                item.details = detailButton
            }
        })

        body.map((status) => {
            if (status.orderStatus == "Received") {
                status.orderStatus = receivedButton
            }
            if (status.orderStatus == "Process") {
                status.orderStatus = processButton
            }
        })

        return (
            <React.Fragment>
                <div className="ongoing-orders-links">
                    <ul className="ul-link">
                        <li className="order-link">
                            <div className={this.state.active == 1 ? "active-li-link" : "li-link"} onClick={() => { this.onTabChange('1') }}>
                                Ongoing Orders
                            </div>
                        </li>
                        <li className="order-link">
                            <div className={this.state.active == 2 ? "active-li-link" : "li-link"} onClick={() => { this.onTabChange('2') }}>
                                Past Orders
                            </div>
                        </li>
                    </ul>
                </div>

                {this.state.active == 1 ? <div className="ongoing-orders">
                    <DetailedOnGoingOrdersCustomTable
                        tableHeader={header}
                        tableBody={body}
                        keyName="userTable"
                        tableClass="striped hover table-responsive"
                        rowsPerPage={5}
                        rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                        initialSort={{ prop: "username", isAscending: true, }}
                        labels={customLabels}
                    />
                </div> : null}

                {this.state.active == 2 ? <DetailedPastOrders/> : null}
            </React.Fragment>
        )
    }
}

export default DetailedOnGoingOrders;



