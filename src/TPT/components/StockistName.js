import React, { Component } from 'react';
import StockistNameTable from './StockistNameTable';
import NextPlan from './NextPlan';

class StockistName extends Component {
    constructor(props){
        super(props);
        this.state = {

        }

    }
    render() {
        const header = [
            { prop: 'box', title: 'Checkbox', filterable: true},
            { prop: 'srNumber', title: 'Sr. No.',filterable: true },
            { prop: 'stockistCode', title: 'Stockist Code',filterable: true },
            { prop: 'stockistName', title: 'Stockist Name',filterable: true,sortable:true },
            { prop: 'locality', title: 'Locality', filterable: true,sortable:true },
            { prop: 'target', title: 'Target', filterable: true},
            { prop: 'planned', title: 'Planned', filterable: true},
            { prop: 'status', title: 'Status',filterable: true,sortable:true }
              
        ];
             
            const body = [
              { box: 'Box', srNumber: '01.', stockistCode: 'S001', stockistName: 'Viswas Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '02.', stockistCode: 'S002', stockistName: 'Kumar Pharma', locality: 'Bhimavaram',target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '03.', stockistCode: 'S003', stockistName: 'Rahul Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },
              { box: 'Box', srNumber: '04.', stockistCode: 'S004', stockistName: 'Viswas Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '05.', stockistCode: 'S005', stockistName: 'Rahul Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '06.', stockistCode: 'S006', stockistName: 'Viswas Pharmaha', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '07.', stockistCode: 'S007', stockistName: 'Renu Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '08.', stockistCode: 'S008', stockistName: 'Viswas Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },
              { box: 'Box', srNumber: '09.', stockistCode: 'S009', stockistName: 'Prafful Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '10.', stockistCode: 'S010', stockistName: 'Anil Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },
              { box: 'Box', srNumber: '11.', stockistCode: 'S011', stockistName: 'Ganesh Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '12.', stockistCode: 'S012', stockistName: 'Ajay Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '13.', stockistCode: 'S013', stockistName: 'Shweta Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '14.', stockistCode: 'S014', stockistName: 'Viswas Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '15.', stockistCode: 'S015', stockistName: 'Viswas Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '16.', stockistCode: 'S016', stockistName: 'Viswas Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '17.', stockistCode: 'S017', stockistName: 'Viswas Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '18.', stockistCode: 'S018', stockistName: 'Viswas Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },  
              { box: 'Box', srNumber: '19.', stockistCode: 'S019', stockistName: 'Viswas Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '20.', stockistCode: 'S020', stockistName: 'Viswas Pharma', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' }
              
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
        var activeText= <span className="activeTextGreen">Completed</span>
        var inactiveText= <span className="inActiveTextRed">Excess</span>
        var partiallyActiveText = <NextPlan />
        var checkBoxButton = <input type="checkbox" className="customCheckBox"></input>
        body.map((item) => {
            if(item.status == "Completed" ){
                item.status = activeText
            }
            if(item.status == "Excess" ){
                item.status = inactiveText
            }
            if(item.status == "Next Plan" ){
                item.status = partiallyActiveText
            }
            if(item.box == "Box"){
                item.box = checkBoxButton
            }
        })
        header.map((item) => {
            if(item.title == "Checkbox"){
                item.title = checkBoxButton
            }
        })
        return (
            <React.Fragment>
                 <StockistNameTable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                />
            </React.Fragment>
        );
    }
}

export default StockistName;