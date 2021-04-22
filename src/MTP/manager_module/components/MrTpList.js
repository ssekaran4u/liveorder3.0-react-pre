import React, { Component } from "react";
import { Link } from "react-router-dom";
import MrTPLISTBody from "./mrtplistbody";
import { Button, Col, Row, Form, InputGroup, Dropdown, } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Group1727 from "../../../../public/assets/images/Group1727.svg"
import Group1729 from "../../../../public/assets/images/Group1729.svg"
import collapse from "../../../../public/assets/images/collapse-grey.svg"
import fullscreen from "../../../../public/assets/images/fullscreen.svg"
// import CalendarContainer from "react-datepicker"


class MrTPList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            Date: new Date(),
            showcal:false,
        }
    this.handleView = this.handleView.bind(this)
    this.onCalender = this.onCalender.bind(this)
    // this.MyContainer = this.MyContainer.bind(this)
    this.reqdateChanged = this.reqdateChanged.bind(this)

}
handleView() {
    this.setState({
        isFull: !this.state.isFull
    })
}

reqdateChanged(date){
      this.setState({ Date: date})
  }

onCalender(){
    this.setState({showcal:!this.state.showcal})
    alert("calendar open")
}


//  MyContainer ({ className, children }) {
//     return (
//       <div style={{ padding: "16px", background: "#216ba5", color: "#fff" }}>
//         <CalendarContainer className={className}>
//           <div style={{ background: "#f0f0f0" }}>
//             What is your favorite day?
//           </div>
//           <div style={{ position: "relative" }}>{children}</div>
//         </CalendarContainer>
//       </div>
//     );
//   };

    render() {
console.log(this.state.showcal,"showcal")

        const header = [
            { prop: 'Action', title: 'Action', filterable: true },
            { prop: 'Workingwith', title: 'Working With', filterable: true },
            { prop: 'Date', title: 'Day/Week', sortable: true, filterable: true },
            { prop: 'DayWeek', title: 'Day/Week', sortable: true, filterable: true },
            { prop: 'Patches', title: 'Patches', sortable: true, filterable: true },
            { prop: 'Doctor', title: 'Doctor', filterable: true },
            { prop: 'Stockist', title: 'Stockist', filterable: true },
            { prop: 'Chemist', title: 'Chemist', filterable: true },
            { prop: 'Hospital', title: 'Hospital', filterable: true },
            { prop: 'Others', title: 'Others', filterable: true },

        ];

        const body = [
            {
                Action:"Calender",
                Workingwith:  <label className="table-checkbox-label">
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox"
                            checked={true}
                            // value={list["C_Code"]}
                            // onClick={this.props.onCheck}
                        />
                        <span className="table-checkbox-custom"></span>
                    </label>,
                Date: '01/01/2021',
                DayWeek: 'Monday - Week 1',
                Patches: 'K.D.A Hospital',
                Doctor: '02',
                Stockist: '02',
                Chemist: '02',
                Hospital: '02',
                Others: "02"
            },
            {
                Action:"Calender",
                Workingwith:  <label className="table-checkbox-label">
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox"
                            checked={true}
                            // value={list["C_Code"]}
                            // onClick={this.props.onCheck}
                        />
                        <span className="table-checkbox-custom"></span>
                    </label>,
                Date: '01/01/2021',
                DayWeek: 'Monday - Week 1',
                Patches: 'K.D.A Hospital',
                Doctor: '02',
                Stockist: '02',
                Chemist: '02',
                Hospital: '02',
                Others: "02"
            },
            {
                Action:"Calender",
                Workingwith:  <label className="table-checkbox-label">
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox"
                            checked={true}
                            // value={list["C_Code"]}
                            // onClick={this.props.onCheck}
                        />
                        <span className="table-checkbox-custom"></span>
                    </label>,
                Date: '01/01/2021',
                DayWeek: 'Monday - Week 1',
                Patches: 'K.D.A Hospital',
                Doctor: '02',
                Stockist: '02',
                Chemist: '02',
                Hospital: '02',
                Others: "02"
            },
            {
                Action:"Calender",
                Workingwith:  <label className="table-checkbox-label">
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox"
                            checked={true}
                            // value={list["C_Code"]}
                            // onClick={this.props.onCheck}
                        />
                        <span className="table-checkbox-custom"></span>
                    </label>,
                Date: '01/01/2021',
                DayWeek: 'Monday - Week 1',
                Patches: 'K.D.A Hospital',
                Doctor: '02',
                Stockist: '02',
                Chemist: '02',
                Hospital: '02',
                Others: "02"
            },
            {
                Action:"Calender",
                Workingwith:  <label className="table-checkbox-label">
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox"
                            checked={false}
                            // value={list["C_Code"]}
                            // onClick={this.props.onCheck}
                        />
                        <span className="table-checkbox-custom"></span>
                    </label>,
                Date: '01/01/2021',
                DayWeek: 'Monday - Week 1',
                Patches: 'K.D.A Hospital',
                Doctor: '02',
                Stockist: '02',
                Chemist: '02',
                Hospital: '02',
                Others: "02"
            },

            {
                Action: "Calender",
            //     {this.state.showcal == true ? 
            //     <div className="selectlocation">
            //   <InputGroup className="datepickerAligment controls text-right">
            //     <DatePicker
            //       selected={this.state.Date}
            //    //   onChange={this.reqdateChanged}
            //       dateFormat="dd/MM/yyyy"
            //       placeholderText="Select"
            //       readOnly/>
            //     <InputGroup.Append>
            //       <InputGroup.Text>
            //         <img src="../../public/assets/images/prpcalender.svg" alt="calendar" />
            //       </InputGroup.Text>
            //     </InputGroup.Append>
            //   </InputGroup>
            // </div>:null}
            

                Workingwith:  <label className="table-checkbox-label">
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox"
                            checked={true}
                            // value={list["C_Code"]}
                            // onClick={this.props.onCheck}
                        />
                        <span className="table-checkbox-custom"></span>
                    </label>,
                Date: '01/01/2021',
                DayWeek: 'Monday - Week 1',
                Patches: 'K.D.A Hospital',
                Doctor: '02',
                Stockist: '02',
                Chemist: '02',
                Hospital: '02',
                Others: "02"
            },

            {
                Action:"Calender",
                Workingwith:  <label className="table-checkbox-label">
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox"
                            checked={false}
                            // value={list["C_Code"]}
                            // onClick={this.props.onCheck}
                        />
                        <span className="table-checkbox-custom"></span>
                    </label>,
                Date: '01/01/2021',
                DayWeek: 'Monday - Week 1',
                Patches: 'K.D.A Hospital',
                Doctor: '02',
                Stockist: '02',
                Chemist: '02',
                Hospital: '02',
                Others: "02"
            },

            {
                Action:"Calender",

                Workingwith:  <label className="table-checkbox-label">
                        <input
                            readOnly
                            type="checkbox"
                            className="table-customized-checkbox"
                            checked={false}
                            // value={list["C_Code"]}
                            // onClick={this.props.onCheck}
                        />
                        <span className="table-checkbox-custom"></span>
                    </label>,
                Date: '01/01/2021',
                DayWeek: 'Monday - Week 1',
                Patches: 'K.D.A Hospital',
                Doctor: '02',
                Stockist: '02',
                Chemist: '02',
                Hospital: '02',
                Others: "02"
            },


        ];

        var Action =<div className="exp-view"><img onClick = {this.onCalender} src = {Group1727}/> 
             {this.state.showcal == true ? 
                 <div className="selectlocation">
               <InputGroup className="datepickerAligment controls text-right newcall">
                   
               <div>
                  <DatePicker
                   selected={this.state.Date}
                  onChange={this.reqdateChanged}
                   dateFormat="dd/MM/yyyy"
                   placeholderText="Select"
                   className="newcalendar"
                //    calendarContainer={this.MyContainer}
                   >  
                   {/* <div style={{ color: "red" }}>Don't forget to check the weather!</div>  */}
                 </DatePicker> 
                   
                 </div>
                  <InputGroup.Append>
                  <InputGroup.Text>
                     <img src="../../../../public/assets/images/prpcalender.svg" alt="calendar" />
                   </InputGroup.Text>
             </InputGroup.Append> 
             
               </InputGroup> 
             </div>
             :null}&nbsp;<img  src = {Group1729}/></div>
        body.map((item) => {
            if (item.Action == "Calender") {
                item.Action = Action
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
            <div className="dcr-list-sec">
                    <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first"}>

                <div className="fullimgmrtp">
                    <div className="mrtplistheader">Tour Plan For Januvary, 2021 of MR1 (C01004)</div>
                   
                    <div className="">
                        {this.state.isFull ?
                            <img src={collapse} onClick={this.handleView}></img>
                            :
                            <img src={fullscreen} onClick={this.handleView}></img>
                        }
                        {/* <img className="dashfullscreen" src="../public/assets/images/overflow.svg"></img> */}
                    </div>
                </div>
                <MrTPLISTBody
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels} />
            </div>
            </div>
        )
    }
}

export default MrTPList;