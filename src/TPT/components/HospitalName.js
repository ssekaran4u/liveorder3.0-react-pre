import React, { Component } from 'react';
import DoctorNameTable from './DoctorNameTable';
import NextPlan from './NextPlan';
import HospitalNameTable from './HospitalNameTable'

class HospitalName extends Component {
    constructor(props){
        super(props);
        this.state = {

        }

    }
    render() {
        const header = [
            { prop: 'box', title: 'Checkbox', filterable: true},
            { prop: 'srNumber', title: 'Sr. No.',filterable: true },
            { prop: 'hospitalCode', title: 'Hospital Code',filterable: true },
            { prop: 'hospitalName', title: 'Hospital Name',filterable: true,sortable:true },
            { prop: 'locality', title: 'Locality', filterable: true,sortable:true },
            { prop: 'target', title: 'Target', filterable: true},
            { prop: 'planned', title: 'Planned', filterable: true},
            { prop: 'status', title: 'Status',filterable: true,sortable:true }
              
        ];
             
            const body = [
              { box: 'Box', srNumber: '01.', hospitalCode: 'H001', hospitalName: 'Viswas Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '02.', hospitalCode: 'H002', hospitalName: 'Kumar Hospital', locality: 'Bhimavaram',target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '03.', hospitalCode: 'H003', hospitalName: 'Rahul Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },
              { box: 'Box', srNumber: '04.', hospitalCode: 'H004', hospitalName: 'Viswas Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '05.', hospitalCode: 'H005', hospitalName: 'Rahul Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '06.', hospitalCode: 'H006', hospitalName: 'Viswas Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '07.', hospitalCode: 'H007', hospitalName: 'Renu Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '08.', hospitalCode: 'H008', hospitalName: 'Viswas Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },
              { box: 'Box', srNumber: '09.', hospitalCode: 'H009', hospitalName: 'Prafful Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '10.', hospitalCode: 'H010', hospitalName: 'Anil Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },
              { box: 'Box', srNumber: '11.', hospitalCode: 'H011', hospitalName: 'Ganesh Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '12.', hospitalCode: 'H012', hospitalName: 'Ajay Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '13.', hospitalCode: 'H013', hospitalName: 'Shweta Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '14.', hospitalCode: 'H014', hospitalName: 'Viswas Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '15.', hospitalCode: 'H015', hospitalName: 'Viswas Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '16.', hospitalCode: 'H016', hospitalName: 'Viswas Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' },
              { box: 'Box', srNumber: '17.', hospitalCode: 'H017', hospitalName: 'Viswas Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '18.', hospitalCode: 'V018', hospitalName: 'Viswas Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Next Plan' },  
              { box: 'Box', srNumber: '19.', hospitalCode: 'H019', hospitalName: 'Viswas Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Completed' },
              { box: 'Box', srNumber: '20.', hospitalCode: 'H020', hospitalName: 'Viswas Hospital', locality: 'Bhimavaram', target: '02', planned: '03', status: 'Excess' }
              
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
                 <HospitalNameTable
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

export default HospitalName;