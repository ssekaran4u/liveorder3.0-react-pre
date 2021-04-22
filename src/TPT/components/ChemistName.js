import React, { Component } from 'react';
import ChemistNameTable from './ChemistNameTable';
import NextPlan from './NextPlan';

class ChemistName extends Component {
    constructor(props){
        super(props);
        this.state = {

        }

    }
    render() {
        const header = [
            { prop: 'box', title: 'Checkbox', filterable: true},
            { prop: 'srNumber', title: 'Sr. No.',filterable: true },
            { prop: 'chemistCode', title: 'Chemist Code',filterable: true },
            { prop: 'chemistName', title: 'Chemist Name',filterable: true, sortable:true },
            { prop: 'locality', title: 'Locality', filterable: true, sortable:true },
            { prop: 'target', title: 'Target', filterable: true},
            { prop: 'planned', title: 'Planned', filterable: true},
            { prop: 'status', title: 'Status',filterable: true,sortable:true }
              
        ];
             
            const body = [
              { box: 'Box', srNumber: '01.', chemistCode: 'C001', chemistName: 'Viswas Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '02.', chemistCode: 'C002', chemistName: 'Kumar Medical', locality: 'Bhimavaram',target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '03.', chemistCode: 'C003', chemistName: 'Rahul Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },
              { box: 'Box', srNumber: '04.', chemistCode: 'C004', chemistName: 'Viswas Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '05.', chemistCode: 'C005', chemistName: 'Rahul Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '06.', chemistCode: 'C006', chemistName: 'Viswas Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '07.', chemistCode: 'C007', chemistName: 'Renu Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '08.', chemistCode: 'C008', chemistName: 'Viswas Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },
              { box: 'Box', srNumber: '09.', chemistCode: 'C009', chemistName: 'Prafful Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '10.', chemistCode: 'C010', chemistName: 'Anil Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },
              { box: 'Box', srNumber: '11.', chemistCode: 'C011', chemistName: 'Ganesh Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '12.', chemistCode: 'C012', chemistName: 'Ajay Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '13.', chemistCode: 'C013', chemistName: 'Shweta Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '14.', chemistCode: 'C014', chemistName: 'Viswas Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '15.', chemistCode: 'C015', chemistName: 'Viswas Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '16.', chemistCode: 'C016', chemistName: 'Viswas Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '17.', chemistCode: 'C017', chemistName: 'Viswas Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '18.', chemistCode: 'C018', chemistName: 'Viswas Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },  
              { box: 'Box', srNumber: '19.', chemistCode: 'C019', chemistName: 'Viswas Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '20.', chemistCode: 'C020', chemistName: 'Viswas Medical', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' }
              
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
                 <ChemistNameTable
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

export default ChemistName;