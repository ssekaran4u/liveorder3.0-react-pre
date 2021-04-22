import React, { Component } from 'react'
import DistributorSalesTable from '../components/DistributorSalesTable';
import { Link } from 'react-router-dom';
import { postToServer } from '../../../lib/comm-utils';
import { connect } from 'react-redux';

class DistributorSalesList extends Component {

  constructor(props) {
    super(props)
    // this.state = {
    //   lastOrderDate: [],
    //   months: []
    // }
  }

  // componentDidMount() {
  //   // console.log("executing")
  //   var data = {
  //     "Index": "LastOrderDate"
  //   }
  //   postToServer("KMDashBoardPage", data).then((Result) => {
  //     if (Result.data.Status == 'Success') {
  //       // console.log( Result.data.data ,"kumar")
  //       this.setState({ lastOrderDate: Result.data.data })
  //     }
  //   }).catch((Error) => {
  //     this.setState({ Error: true, Errormsg: "Error in App At KAM Dashboard Graph Last Order Date API " })
  //   })
   
  // }

  render() {
    const header = [
      { title: 'Serial No', prop: 'srno', filterable: true },
      { title: 'Distributor Name', prop: 'realname', filterable: true },
      { title: 'Primary Sales(Lakh)', prop: 'realnameuppercase', filterable: true },
      { title: 'Secondary Sales(Lakh)', prop: 'secondraysales', filterable: true },
      { title: 'Frequently Order Average', prop: 'freq', filterable: true },
      { title: 'Order History', prop: 'history', filterable: true },
    ];

    const body = [
      {
        srno: '01.',
        realname: 'Wellness Pharmaceuticals pvt ltd',
        realnameuppercase: '20.00',
        secondraysales: '20.00',
        freq: '2 Days',
        history: 'View'
      },
      {
        srno: '02.',
        realname: 'Mahaveer Pharmaceuticals pvt ltd',
        realnameuppercase: '10.00',
        secondraysales: '20.00',
        freq: '2 Days',
        history: 'View'
      },
      {
        srno: '03.',
        realname: 'Vardhman Pharmaceuticals pvt ltd',
        realnameuppercase: '30.00',
        secondraysales: '20.00',
        freq: '6 Days',
        history: 'View'
      },
      {
        srno: '04.',
        realname: 'Balaji Pharma',
        realnameuppercase: '10.00',
        secondraysales: '20.00',
        freq: '2 Days',
        history: 'View'
      },
      {
        srno: '05.',
        realname: '1 mg Pharmaceuticals pvt ltd',
        realnameuppercase: '40.00',
        secondraysales: '20.00',
        freq: '4 Days',
        history: 'View'
      },
      {
        srno: '06.',
        realname: '1 mg Pharmaceuticals pvt ltd',
        realnameuppercase: '20.00',
        secondraysales: '20.00',
        freq: '5 Days',
        history: 'View'
      }
    ];

    body.map((item) => {

      item.realname = <span><img src="../../../../public/assets/images/kview.svg" className="viewimg" /> <Link to='/kamstokiest_profile'><span className="distrubutrName">{item.realname}</span></Link></span>
      item.history = <Link to='/orderdetails'><span className="activeView">View</span></Link>
    })
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
      <div className="KamTable">

        <DistributorSalesTable
          tableHeader={header}
          tableBody={body}
          keyName="userTable"
          tableClass="striped hover table-responsive"
          rowsPerPage={10}
          rowsPerPageOption={[10, 20, 50, 100, 200]}
          initialSort={{ prop: "username", isAscending: true, }}
          labels={customLabels}
          lastOrderDate={this.props.lastOrderDate}
          months={this.props.months}
        // toggleHeader={toggleHeader}
        // headerColums={headerColums}
        // getUnselectedColumns={this.getUnselectedColumns}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
   months: state.KAMDashboard.months,
   lastOrderDate: state.KAMDashboard.last_order_date
})

export default connect(mapStateToProps)(DistributorSalesList);