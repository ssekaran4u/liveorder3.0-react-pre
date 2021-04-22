import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopRetailersTable from "./top_retailers_table";
import { postToServer } from '../../../lib/comm-utils';
import { connect } from 'react-redux';

class TopRetailers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topRetailers: [],
            topRetailersDropdown: []
        }
    }

    componentDidMount() {
        var data = {
            "Index": "Top10Retailers",
            "Data": { "stockist": "APPTB002" },
        }
        postToServer("KMDashBoardPage", data).then((Result) => {
            if (Result.data.Status == 'Success') {
                // console.log(Result.data.data, "kumar")
                this.setState({ topRetailers: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in App At KAM Stockist Profile Top Retailers API " })
        })
    }

    render() {
        const header = [
            { prop: 'serialNumber', title: 'Serial No.', filterable: true },
            { prop: 'retailerName', title: 'Retailer Name', filterable: true },
            { prop: 'region', title: 'Region', filterable: true },
            { prop: 'city', title: 'City', filterable: true },
            { prop: 'area', title: 'Area', filterable: true },
            { prop: 'salesIn', title: 'Sales (Lakh)', filterable: true },
            { prop: 'details', title: 'Details', filterable: true }

        ];
        var body = []
        this.state.topRetailers.map((topRetailers) => {
            body.push({
                serialNumber: topRetailers["Serial No"],
                retailerName: topRetailers["Retailer Name"].toLowerCase(),
                region: topRetailers.Region.toLowerCase(),
                city: topRetailers.City.toLowerCase(),
                area: topRetailers.Area.toLowerCase(),
                salesIn: topRetailers.sales,
                details: 'View',
            })
            // console.log(mysfcdata, "soun")
        })
        // const body = [
        //     { serialNumber: '01.', retailerName: 'Om Medicals Store', region: 'Maharastra', city: 'Mumbai', area: 'Jayanagar', salesIn: 2, details: 'View' },
        //     { serialNumber: '02.', retailerName: 'Ram Medicals Store', region: 'Rajasthan', city: 'Haryana', area: 'J.P.Nagar', salesIn: 4.12, details: 'View' },
        //     { serialNumber: '03.', retailerName: 'Maruthi Medicals', region: 'Karnataka', city: 'Bangalore', area: 'Vijayanagar', salesIn: 5, details: 'View' },
        //     { serialNumber: '04.', retailerName: 'Ramdev Medicals', region: 'Maharastra', city: 'Mumbai', area: 'Srinagar', salesIn: 3, details: 'View' },
        //     { serialNumber: '05.', retailerName: 'Medicana Store ', region: 'Rajasthan', city: 'Haryana', area: 'K.R.Market', salesIn: 7, details: 'View' },
        //     { serialNumber: '06.', retailerName: 'Apolo Medicals', region: 'Karnataka', city: 'Bidar', area: 'Bellandur', salesIn: 6, details: 'View' },
        //     { serialNumber: '07.', retailerName: 'Ramdev Medicals', region: 'Maharastra', city: 'Haryana', area: 'Doddballapur', salesIn: 12, details: 'View' },
        //     { serialNumber: '08.', retailerName: 'Om Medicals Store', region: 'Rajasthan', city: 'Mumbai', area: 'Vijaynagar', salesIn: 9, details: 'View' },
        //     { serialNumber: '09.', retailerName: 'Raj Shree Medicals', region: 'Maharastra', city: 'Bangalore', area: 'Basavanagudi', salesIn: 5, details: 'View' },
        //     { serialNumber: '10.', retailerName: 'Medicana Store ', region: 'Karnataka', city: 'Mandya', area: 'Hanumanthnagar', salesIn: 8, details: 'View' },
        //     { serialNumber: '11.', retailerName: 'Apolo Medicals', region: 'Maharastra', city: 'Mysore', area: 'Bhanashankari', salesIn: 7, details: 'View' },
        //     { serialNumber: '12.', retailerName: 'Ram Medicals Store', region: 'Rajasthan', city: 'Chennai', area: 'Koramangala', salesIn: 6, details: 'View' },
        //     { serialNumber: '13.', retailerName: 'Maruthi Medicals', region: 'Rajasthan', city: 'Ballari', area: 'Tavarekere', salesIn: 4, details: 'View' },
        //     { serialNumber: '14.', retailerName: 'Om Medicals Store', region: 'Maharastra', city: 'Ramanagara', area: 'BTM', salesIn: 51, details: 'View' },
        //     { serialNumber: '15.', retailerName: 'Apolo Medicals', region: 'Maharastra', city: 'Chitradurga', area: 'Binnamangala', salesIn: 2, details: 'View' },
        //     { serialNumber: '16.', retailerName: 'Ramdev Medicals', region: 'Karnataka', city: 'Shivamogga', area: 'Srinagar', salesIn: 11, details: 'View' },
        //     { serialNumber: '17.', retailerName: 'Ram Medicals Store', region: 'Maharastra', city: 'Koppala', area: 'Sunkadakatte', salesIn: 1.2, details: 'View' },
        //     { serialNumber: '18.', retailerName: 'Raj Shree Medicals', region: 'Karnataka', city: 'Ranibennuru', area: 'Vijayanagar', salesIn: 5.2, details: 'View' },
        //     { serialNumber: '19.', retailerName: 'Om Medicals Store', region: 'Rajasthan', city: 'Mumbai', area: 'Bhanashankari', salesIn: 3.2, details: 'View' },
        //     { serialNumber: '20.', retailerName: 'Medicana Store ', region: 'Maharastra', city: 'Bangalore', area: 'Koramangala', salesIn: 5, details: 'View' },
        // ];
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
        var detailButton = <Link to="/productsale" className="viewBlueButton">View</Link>

        body.map((item) => {
            if (item.details == "View") {

                item.details = detailButton
            }
        })

        // const minRows = (rowsPerPage.length<7)?7:rowsPerPage;

        return (
            <div>
                <TopRetailersTable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={7}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    topRetailersDropdown={this.props.retailerStatus}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    retailerStatus: state.KAMDashboard.retailer_status,
})

export default connect(mapStateToProps)(TopRetailers);