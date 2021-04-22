import React, { Component } from 'react';
import {Dropdown} from 'react-bootstrap';
import ClaimTable from '../components/ClaimTable';
import {Link} from 'react-router-dom'

class DistributorClaimList extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFull : false
        }
        this.handleView = this.handleView.bind(this)
    }
    handleView(){
        this.setState({
            isFull: !this.state.isFull
        }); 
    }
    render() {
        const header = [
           
            { title: 'Distributor Name', prop: 'username',filterable: true},
            { title: 'Total Sales', prop: 'realname',filterable: true },
            { title: 'Total Claim', prop: 'realnameuppercase' ,filterable: true },
            { title: 'Claim%', prop: 'realnameuppercase' ,filterable: true },
            { title: 'Settled', prop: 'realnameuppercase' ,filterable: true },
            { title: 'Pending', prop: 'pending' ,filterable: true },
            
          ];
           
          const body = [
            {
              srno: '01.',
              username: 'Wellness Pharmaceuticals pvt ltd',
              realnameuppercase: '20.00',
              secondraysales: '20.00',
              freq:'2 Days',
              pending:'0.7 Lakh'
            },
            {
              srno: '02.',
              username: 'Mahaveer Pharmaceuticals pvt ltd',
              realnameuppercase: '10.00',
              secondraysales: '20.00',
              freq:'2 Days',
              pending:'1.3 Lakh'
            },
            {
              srno: '03.',
              username: 'Vardhman Pharmaceuticals pvt ltd',
                realnameuppercase: '30.00',
                secondraysales: '20.00',
                freq:'6 Days',
                pending:'0.1 Lakh'
              },
              {
                srno: '04.',
                username: 'Balaji Pharma',
                realnameuppercase: '10.00',
                secondraysales: '20.00',
                freq:'2 Days',
                pending:'0.5 Lakh'
              },
              {
                srno: '05.',
                username: '1 mg Pharmaceuticals pvt ltd',
                realnameuppercase: '40.00',
                secondraysales: '20.00',
                freq:'4 Days',
                pending:'0.5 Lakh'
              },
              {
                srno: '06.',
                username: '1 mg Pharmaceuticals pvt ltd',
                realnameuppercase: '20.00',
                secondraysales: '20.00',
                freq:'5 Days',
                pending:'0.3 Lakh'
              }
          
          ];
          body.map((item)=>{
            var last = item.pending.split(" ");;
              let pendingred = <span className="red-clr">{item.pending}</span>
              let pendingyellow = <span className="yellow-clr">{item.pending}</span>
              let pendingblue = <span className="blue-clr">{item.pending}</span>

              if(last[0] < 0.3){
                  item.pending = pendingblue                                                                                                                                             
              }else if(last[0] <= 0.5){
                item.pending = pendingyellow
              }else{
                item.pending = pendingred
              }
              if(item.username){
              item.username = <Link to='/kamstokiest_profile'><span className="distrubutrName">{item.username}</span></Link>
              }
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
            <React.Fragment>
                <div className="pullleft KamClaimTable">
                <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>
                <div className="distributorClaimList">
                    
                    <ClaimTable 
                         tableHeader={header}
                         tableBody={body}
                         keyName="userTable"
                         tableClass="striped hover table-responsive"
                         rowsPerPage={10}
                         rowsPerPageOption={[10, 20, 50, 100, 200]}
                         initialSort={{ prop: "username", isAscending: true, }}
                         labels={customLabels}
                         months={this.props.months}
                    />                
                </div>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default DistributorClaimList;