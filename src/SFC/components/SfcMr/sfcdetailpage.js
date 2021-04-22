import React, { Component } from "react";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";
import '../../../../public/assets/css/sfcstyle.css'
import { Row, Col, Table,Dropdown } from "react-bootstrap";

import Sfcdetailtable from './sfcdetailtable'
import { postToServer } from '../../../lib/comm-utils'
 


class Sfcdetailpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isFull: false,
        sfclistview:[]
    }
     
    this.handleView = this.handleView.bind(this)
}

componentDidMount(){
  var data={
      "Index":"SFC_detail",
      "Data":{ "SFCcode":""} ,
  }
  postToServer("SFC",data).then( (Result)=>{
  if(Result.data.Status == 'Success'){
  // console.log( Result.data.Result ,"soundarya")


      this.setState({ sfclistview: Result.data.Result })
  }
  }).catch(  (Error)=> {  
      this.setState({ Error: true, Errormsg: "Error in App At SFC API " })
   }  )
}


handleView() {
  this.setState({
      isFull: !this.state.isFull
  });
}
   

render() {

  var body = []
    this.state.sfclistview.map((sfclistviewdata,index)=>{
        body.push({ ot: '200', 
         sinum: index+1, 
         locationfrom: sfclistviewdata.From,
          locationto: sfclistviewdata.TO,
           type: sfclistviewdata.C_a_type, 
            distance: sfclistviewdata.Distance, 
            mode: 'Bus',
             ta: sfclistviewdata.TA,
              da:'200',})
        // console.log(sfclistviewdata, "soun")
    })


  const header = [
    { prop: 'sinum', title: 'SI. No',  filterable: true},
    { prop: 'locationfrom', title: 'Location (From)',filterable: true },
    { prop: 'locationto', title: 'Location (To)' , filterable: true },
    { prop: 'type', title: 'Type ' , sortable: true, filterable: true },
    { prop: 'distance', title: 'Distance (Kms)' , filterable: true },
    { prop: 'mode', title: 'Mode of Travel' , filterable: true },
    { prop: 'ta', title: 'TA (in Rupees)' , filterable: true },
    { prop: 'da', title: 'DA (in Rupees)' , filterable: true },
    { prop: 'ot', title: 'Other Expenses', filterable:true},

   
  ];
   
  // const body = [
  //   {  ot: '200',  sinum: '01', locationfrom: 'Bangalore', locationto: 'Tumkur', type: 'EX',  distance: '70', mode: 'Bus', ta: '140', da:'200',  },
  //   {  ot: '200', sinum: '02', locationfrom: 'Bangalore', locationto: 'Tumkur', type: 'EX',  distance: '70', mode: 'Bus', ta: '140', da:'200', },
  //   {  ot: '200', sinum: '03', locationfrom: 'Bangalore', locationto: 'Tumkur', type: 'EX',  distance: '70', mode: 'Bus', ta: '140', da:'200',  },
  //   {  ot: '200', sinum: '04', locationfrom: 'Bangalore', locationto: 'Tumkur', type: 'OS',  distance: '70', mode: 'Bus', ta: '140', da:'200', },
  //   {  ot: '200', sinum: '05', locationfrom: 'Bangalore', locationto: 'Tumkur', type: 'OS',  distance: '70', mode: 'Bus', ta: '140', da:'200',  },
  //   {  ot: '200', sinum: '06', locationfrom: 'Bangalore', locationto: 'Tumkur', type: 'OS',  distance: '70', mode: 'Bus', ta: '140', da:'200', },
  //   {  ot: '200', sinum: '07', locationfrom: 'Bangalore', locationto: 'Tumkur', type: 'OS',  distance: '70', mode: 'Bus', ta: '140', da:'200',  },
  //   {  ot: '200', sinum: '08', locationfrom: 'Bangalore', locationto: 'Tumkur', type: 'OS',  distance: '70', mode: 'Bus', ta: '140', da:'200', },
  //   {  ot: '200', sinum: '09', locationfrom: 'Bangalore', locationto: 'Tumkur', type: 'OS',  distance: '70', mode: 'Bus', ta: '140', da:'200',  },
  //   {  ot: '200', sinum: '10', locationfrom: 'Bangalore', locationto: 'Tumkur', type: 'OS',  distance: '70', mode: 'Bus', ta: '140', da:'200', },
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


var infoicon = <div className="sfclist">    
                           <Dropdown>200
                           <Dropdown.Toggle className="dcr-opti" id="dropdown-basic">
                             <img className="infoblue-icon" src = "../public/assets/images/infoblue.svg" alt="filter_img" />
                           </Dropdown.Toggle>
                           <Dropdown.Menu className="Repothers-dropdownapplyy">
                               <p className="otherexpara">Other Expenses</p>
                               <p className="infoblue-list">Auto Fare - ₹500</p>
                               <p className="infoblue-list">Printout - ₹500</p>
                               <p className="infoblue-list">Telephone Bill - ₹500</p>
                               <p className="infoblue-list">Miscelleneous - ₹500</p>
                               {/* <Dropdown.Item eventKey="1">
                                    <button className="gradient-btn ">Apply</button>
                                </Dropdown.Item> */}
                           </Dropdown.Menu>
                       </Dropdown>  
                       </div>

body.map((item) => {
  if(item.ot == "200" ){
      item.ot = infoicon
  }

})

 

    return (
        <React.Fragment>
            <div className={this.state.isFull ? "fullscreenView" : "dwrlocked-first "}>

            <div className="ongoing-orders-sfc">
               
            <div className="sfc-head-edit">
                <div>
                    <h5 className="sfc-list-sec-head">
                    SFC No - 5409
                    </h5>
                </div>
                <div className="sfc-head-edit-options">
                {this.state.isFull ? (
                        <img
                            src="../public/assets/images/collapse-grey.svg"
                            className="fullscreen_img1"
                            alt="fullscreen_img"
                            onClick={this.handleView}
                        />) : (
                    
                        <img
                            src="../public/assets/images/fullscreen.svg"
                            className="fullscreen_img1"
                            alt="fullscreen_img"
                            onClick={this.handleView}
                        />
                        )}

                </div>
            </div>
                <Sfcdetailtable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[5, 10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                />
                </div>
              </div>
        </React.Fragment>
    )
}
}

export default Sfcdetailpage;


