// import React, { Component } from 'react';
// import DownlineTPData from './DownlineTPData';


// class DoctorName extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
            
//         }
//     }

//     render() {
        
//         const header = [
//             { prop: 'date', title: 'Date', filterable: true, sortable:true },
//             { prop: 'day', title: 'Day/Week',filterable: true, sortable:true },
//             { prop: 'patches', title: 'Patches',filterable: true, sortable:true},
//             { prop: 'doctor', title: 'Doctor',filterable: true },
//             { prop: 'stockist', title: 'Stockist', filterable: true },
//             { prop: 'chemist', title: 'Chemist', filterable: true },
//             { prop: 'hospital', title: 'Hospital', filterable: true },
//             { prop: 'others', title: 'Others',filterable: true },
//             { prop: 'workingwith', title: 'Working With',filterable: true },
//             { prop: 'action', title: 'action', filterable: true}
              
//         ];
             
//             const body = [
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '02', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '03', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '10', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 2', patches: 'Airoli', doctor: '02', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '04', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '02', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '01', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '02', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '08', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '07', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '06', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '05', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '04', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '02', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '02', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '02', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '02', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '02', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },  
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '02', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' },
//               { date: '01/01/2020', day: 'Monday-Week 1', patches: 'Airoli', doctor: '02', stockist: '02', chemist: '03', hospital: '01', others: '04', workingwith: 'Manager', action: 'action' }
              
//             ];
//           const customLabels = {
//             first: "<<",
//             last: ">>",
//             prev: "< Prev",
//             next: "Next >", 
//             show: "Show",
//             entries: "items/page",
//             filterPlaceholder: "Search",
//             noResults: "There is no data to be displayed"
//         };
//         body.map((item) => {
//             if(item.action == "action" ){
//                 item.action = <img src="../public/assets/images/act.svg" />
//             }
//         })

//         return (
//             <React.Fragment>
//                  <DownlineTPData
//                     tableHeader={header}
//                     tableBody={body}
//                     keyName="userTable"
//                     tableClass="striped hover table-responsive"
//                     rowsPerPage={10}
//                     rowsPerPageOption={[10, 20, 50, 100, 200]}
//                     initialSort={{ prop: "username", isAscending: true, }}
//                     labels={customLabels}
//                 />
//             </React.Fragment>
//         );
//     }
// }

// export default DoctorName;