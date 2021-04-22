import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDropEC from '../components/FilterOptionDropEC'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
import MultiSelectAll from '../components/MulitSelectAll'

class FilterOptionsEC extends Component {
  constructor(props) {
    super(props)
    this.state = {
      year: '',
      fsname: '',
      status: '',
      fname: [],
      msgStatus: '',
      success: false,
      smsg: '',
      showStatusModal: false,

      Division: [],
      Region: [],
      Month: [],
      Year: [],
      Brand: [],
      FSName: [],
      Designation: [],
      Activity: [],
      Division2: '',
      Region2: '',
      Designation2: '',
      FsName2: '',
      Type2: '',
      Month2: '',
      Year2: '',
      Activity2: '',
      DrName2: '',
      Range2: '',
      message: "",
      apply: ""
    }
    // this.getMonth = this.getMonth.bind(this)
    // this.getyear= this.getyear.bind(this)
    // this.getRpsname = this.getRpsname.bind(this)
    // this.getBrand = this.getBrand.bind(this)
    this.filterApply = this.filterApply.bind(this)
    // this.getDivision=this.getDivision.bind(this)
    this.getRegion = this.getRegion.bind(this)
    this.getDesignation = this.getDesignation.bind(this)
    this.getType = this.getType.bind(this)
    this.getDivision1 = this.getDivision1.bind(this)
    //this.filterApply= this.filterApply.bind(this)
    //  this.getDivision=this.getDivision.bind(this)
    //  this.getRegion=this.getRegion.bind(this)
    // this.getFSname=this.getFSname.bind(this)
    //  this.getArea=this.getArea.bind(this)
    this.getMonth = this.getMonth.bind(this)
    this.getYear = this.getYear.bind(this)
    this.getActivity = this.getActivity.bind(this)
    this.getRange = this.getRange.bind(this)
    this.getFSName = this.getFSName.bind(this)
    this.getDrName = this.getDrName.bind(this)
    //this.getType=this.getType.bind(this)

    // this.getDivision=this.getDivision.bind(this)
    // this.getDivision=this.getDivision.bind(this)
    // this.getRegion=this.getRegion.bind(this)



  }
  //filter of division
  callbackFunction(childData) {
    // console.log(childData.rvalue, "callback")
    //   console.log(childData.name, "name")
    if (childData.name == "Division") {
      // console.log(childData.name,"Division chage call")



      //rpsname filter
      var reg = ''
      if (Region == "")
        reg = "All"
      else
        reg = Region
      var brnd = { "index": "ListFsUnderDivRegDesig", data: { "DivisionCode": childData.rvalue, "RegionCode": reg, "DesignationCode": "1" } }

      let FSName = []

      postToServer("RptEceptionalrpsprp", brnd).then((Result) => {
        // console.log(Result.status,"/////")
        if (Result.data.Status == 'Success') {
          Result.data.data.map((item4) => {
            FSName.push(
              {
                "key": item4.c_code,
                "text": item4.c_name,
                "value": item4.c_code,

              }
            )
          })

          this.setState({ RPSname: RPSname })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })
    }
    else
    //if(childData.name=="Region")
    {
      //console.log(childData.name,"Region chage call")
      //rpsname filter
      var reg = ''
      if (Region == "")
        reg = "All"
      else
        reg = childData.rvalue
      var brnd = { "index": "ListFsUnderDivRegDesig", data: { "DivisionCode": Division, "RegionCode": reg } }

      let FSName = []

      postToServer("RptEceptionalrpsprp", brnd).then((Result) => {
        if (Result.data.Status == 'Success') {
          Result.data.data.map((item4) => {
            FSName.push(
              {
                "key": item4.c_code,
                "text": item4.c_name,
                "value": item4.c_code,

              }
            )
          })

          this.setState({ FSName: FSName })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
      })
    }

  }



  hideStatusModal() {
    this.setState({
      showStatusModal: !this.state.showStatusModal,
    })

  }


  // getDivision(status){
  //  this.props.funcprops(status)
  //}

  getDivision1(div,text1) {
    // alert(div+"division")
    this.setState({ Division2: div });
    let returArray = { "name": "Division", "rvalue": div,"textval":text1 };

    this.props.funcprops(returArray)




    var regsel1 = ""
    if ((this.state.Region2 == "") || (this.state.Region2 == "All"))
      regsel1 = "All"
    else
      regsel1 = this.state.Region2



    var divi1 = ""
    if ((div == "") || (div == "-999"))
      divi1 = ""
    else
      divi1 = div

    var dessel1 = ""
    if ((this.state.Designation2 == "") || (this.state.Designation2 == "All"))
      dessel1 = ""
    else
      dessel1 = this.state.Designation2


    var divpara = { "index": "ListFsUnderDivRegDesig", data: { "DivisionCode": divi1, "RegionCode": regsel1, "DesignationCode": dessel1 } }
    //console.log(design)
    let FS = []

    postToServer("RptEceptionalrpsprp", divpara).then((Result) => {
      //console.log(Result.status,"stat")
      //console.log(Result,"full")
      if (Result.status == '200') {
        //console.log(Result,"full")


        Result.data.data.map((item18) => {
          FS.push(
            {
              "key": item18.c_code,
              "text": item18.c_name,
              "value": item18.c_code,

            }
          )
        })

        this.setState({ FSName: FS })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })




    //  console.log(status,"Division value")
    //set designcode as -999

  }




  getYear(yr,text1) {
    let returArray = { "name": "Year", "rvalue": yr,"textval":text1 };
    this.setState({ Year2: yr });
    this.props.funcprops(returArray)


    //dr name binding
    var fst4 = ''
    if ((this.state.FsName2 == "") || (this.state.FsName2 == "All"))
      fst4 = "All"
    else
      fst4 = this.state.FsName2
    var mont2 = ""
    if (this.state.Month2 == "")
      mont2 = ""
    else
      mont2 = this.state.Month2
    var Year2 = ''
    if (yr == "")
      Year2 = ""
    else
      Year2 = yr
    var type6 = ""
    if (this.state.Type2 == "")
      type6 = ""
    else
      type6 = this.state.Type2

    //console.log(mont,"month")
    var typebind = { "index": "ListDoctorName", data: { "Type": type6, "FsName": fst4, "Month": mont2.toString(), "Year": Year2 } }
    let Dr = []
    //console.log(typebind,"variable")
    postToServer("RptEceptionalrpsprp", typebind).then((Result) => {
      if (Result.data.Status == 'Success') {
        //console.log(Result.status,"drstatus")
        Result.data.data.map((item12) => {
          // console.log(Result,"drstatus")
          Dr.push(
            {
              "key": item12.c_code,
              "text": item12.c_name,
              "value": item12.c_code,

            }
          )
        })

        this.setState({ DrName: Dr })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })





  }

  getActivity(act,text1) {
    let returArray = { "name": "Activity", "rvalue": act,"textval":text1 };
    this.setState({ Activity2: act });
    this.props.funcprops(returArray)
  }


  getDrName(dr,text1) {
    let returArray = { "name": "DrName", "rvalue": dr,"textval":text1 };
    this.setState({ DrName2: dr });
    this.props.funcprops(returArray)
  }

  getRange(ran,text1) {
    //debugger;
    let returArray = { "name": "Range", "rvalue": ran,"textval":text1 };
    this.setState({ Range2: ran });
    this.props.funcprops(returArray)
  }


  getFSName(fs,text1) {
    let returArray = { "name": "FS Name", "rvalue": fs,"textval":text1 };
    this.setState({ FsName2: fs });
    this.props.funcprops(returArray)

    //dr name binding
    var fst5 = ''
    if ((fs == "") || (fs == "All"))
      fst5 = "All"
    else
      fst5 = fs
    var mont3 = ""
    if (this.state.Month2 == "")
      mont3 = ""
    else
      mont3 = this.state.Month2
    var Year3 = ''
    if (this.state.Year2 == "")
      Year3 = ""
    else
      Year3 = this.state.Year2
    var type6 = ""
    if (this.state.Type2 == "")
      type6 = ""
    else
      type6 = this.state.Type2
//debugger;
    //console.log(mont,"month")
    var typebind = { "index": "ListDoctorName", data: { "Type": type6, "FsName": fst5, "Month": mont3.toString(), "Year": Year3 } }
    let Dr = []
    console.log(typebind,"month")
    postToServer("RptEceptionalrpsprp", typebind).then((Result) => {
      if (Result.data.Status == 'Success') {
        //console.log(Result.status,"drstatus")
        Result.data.data.map((item12) => {
          //console.log(Result,"drstatus")
          Dr.push(
            {
              "key": item12.c_code,
              "text": item12.c_name,
              "value": item12.c_code,

            }
          )
        })

        this.setState({ DrName: Dr })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })




  }

  getMonth(mnth,text1) {
    let returArray={"name":"Month","rvalue":mnth,"textval":text1};
    this.setState({Month2:mnth});
    this.props.funcprops(returArray)
    //console.log(returArray,"mnarray")
   



    //dr name binding
    var fst3 = ''
    if ((this.state.FsName2 == "") || (this.state.FsName2 == "All"))
      fst3 = "All"
    else
      fst3 = this.state.FsName2
    
    // if (mnth == "")
    //   mont1 = ""
    // else
    //   mont1 = mnth
    var yre1 = ''
    if (this.state.Year2 == "")
      yre1 = ""
    else
      yre1 = this.state.Year2
    var type5 = ""
    if (this.state.Type2 == "")
      type5 = ""
    else
      type5 = this.state.Type2


     // debugger;
      let ddd='';
      let dd='';
      let mont1 = ''
      // alert(returArray.rvalue[0].label);
      if(returArray.rvalue[0].label=="All")
      {
      mont1='1,2,3,4,5,6,7,8,9,10,11,12';
      }
      else{
        mnth.map((test1,index) => {
          console.log(test1.id,"each month")
          if(test1.id=="undefined" || test1.label=="All")
          {
            mont1='1,2,3,4,5,6,7,8,9,10,11,12'
          }
          else{
            mont1+=','+test1.id;
          }
          if(test1.id==",undefined")
                {
                  mont1='1,2,3,4,5,6,7,8,9,10,11,12'
                }
                else
                {      
                    mont1+=','+test1.id;
                }
          
          // if(ddd==",undefined")
          // {
          //   mont1='1,2,3,4,5,6,,7,8,9,10,11,12'
          // }
      })
    }
    this.setState({ Month2: mont1 });
    

    console.log(mont1,"selected month")
    var typebind = { "index": "ListDoctorName", data: { "Type": type5, "FsName": fst3, "Month":mont1 , "Year": yre1 } }
    let Dr = []
    
    postToServer("RptEceptionalrpsprp", typebind).then((Result) => {
      if (Result.data.Status == 'Success') {
        //console.log(Result.status,"drstatus")
        Result.data.data.map((item12) => {
          //console.log(Result,"drstatus")
          Dr.push(
            {
              "key": item12.c_code,
              "text": item12.c_name,
              "value": item12.c_code,

            }
          )
        })

        this.setState({ DrName: Dr })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })



  }
  //getDesignation(stat)




  // fs bind in designation change
  getDesignation(desig,text1) {
    //alert(this.state.Division2)
    //debugger;
    let returArray = { "name": "Designation", "rvalue": desig,"textval":text1 };
    this.setState({ Designation2: desig });
    this.props.funcprops(returArray)

    var regsel = ''
    if ((this.state.Region2 == "") || (this.state.Region2 == "All"))
      regsel = "All"
    else
      regsel = this.state.Region2



    var divi = ''
    if ((this.state.Division2 == "") || (this.state.Division2 == "-999"))
      divi = ""
    else
      divi = this.state.Division2

    var dessel = ''
    if ((desig == "") || (desig == "All"))
      dessel = ""
    else
      dessel = dessel
    // alert(this.state.Region2)

    // alert(desig)

    var design = { "index": "ListFsUnderDivRegDesig", data: { "DivisionCode": divi, "RegionCode": regsel, "DesignationCode": desig } }
    //console.log(design)
    let FS = []

    postToServer("RptEceptionalrpsprp", design).then((Result) => {
      //console.log(Result.status,"stat")
      //console.log(Result,"full")
      if (Result.status == '200') {
        //console.log(Result,"full")


        Result.data.data.map((item18) => {
          FS.push(
            {
              "key": item18.c_code,
              "text": item18.c_name,
              "value": item18.c_code,

            }
          )
        })

        this.setState({ FSName: FS })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })

  }
  //fs bind in region change
  getRegion(reg,text1) {
    let returArray = { "name": "Region", "rvalue": reg,"textval":text1 };
    this.setState({ Region2: reg });
    this.props.funcprops(returArray)




    var regsel = ""
    if ((reg == "") || (reg == "All"))
      regsel = "All"
    else
      regsel = reg


    var divi = ""
    if ((this.state.Division2 == "") || (this.state.Division2 == "-999"))
      divi = ""
    else
      divi = this.state.Division2

    var des = ""
    if ((this.state.Designation2 == "") || (this.state.Designation2 == "All"))
      des = ""
    else
      des = this.state.Designation2





    var brnd = { "index": "ListFsUnderDivRegDesig", data: { "DivisionCode": divi, "RegionCode": regsel, "DesignationCode": des } }
    console.log(brnd, "region change ")
    let FS = []

    postToServer("RptEceptionalrpsprp", brnd).then((Result) => {
      if (Result.data.Status == 'Success') {

        Result.data.data.map((item14) => {
          // console.log(Result,"fsnew")
          FS.push(
            {
              "key": item14.c_code,
              "text": item14.c_name,
              "value": item14.c_code,

            }
          )
        })

        this.setState({ FSName: FS })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })
  }
  //Activity bind in type change


  getType(type1,text1) {
    let returArray = { "name": "Type", "rvalue": type1,"textval":text1 };
    this.setState({ Type2: type1 });
    this.props.funcprops(returArray)


    var tyepsel = ""
    if (type1 == "")
      tyepsel = ""
    else
      tyepsel = type1
    //console.log(tyepsel,"sel");
//debugger;
    var typebind = { "index": "ListActivity", data: { "Type": tyepsel } }

    let Act1 = []
   //console.log(typebind,"tyre")
    postToServer("RptEceptionalrpsprp", typebind).then((Result) => {
      if (Result.data.Status == 'Success') {
        //console.log(Result,"tyre")
        Result.data.data.map((item24) => {
          // console.log(Result,"tyst")
          Act1.push(
            {
              "key": item24.c_code,
              "text": item24.c_name,
              "value": item24.c_code,

            }
          )
        })

        this.setState({ Activity: Act1 })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })


    //dr name binding
    //console.log(this.state.Month2, "type change il month value");
    var fst = ''
    if ((this.state.FsName2 == "") || (this.state.FsName2 == "All"))
      fst = "All"
    else
      fst = this.state.FsName2
    var mont=''
    if(this.state.Month2=="")
    mont=''
    else
    mont=this.state.Month2
    var yre = ''
    if (this.state.Year2 == "")
      yre = ""
    else
      yre = this.state.Year2
//debugger;

    var typebind = { "index": "ListDoctorName", data: { "Type": tyepsel, "FsName": fst, "Month": mont.toString(), "Year": yre } }
    let Dr = []
  console.log(typebind,"dr")
    postToServer("RptEceptionalrpsprp", typebind).then((Result) => {
      if (Result.data.Status == 'Success') {
        //console.log(Result.status,"drstatus")
        Result.data.data.map((item12) => {

          Dr.push(
            {
              "key": item12.c_code,
              "text": item12.c_name,
              "value": item12.c_code,

            }
          )
        })

        this.setState({ DrName: Dr })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })


  }





  // getRegion(status){
  //     this.props.funcprops(status)
  // }

  filterApply() {

    this.props.filterapply("apply");


  }


  componentDidUpdate(olsprops, oldstate) {
    if (olsprops.selecteddiv != this.props.selecteddiv) {

    }
  }

  componentDidMount() {
    var travelModes = { "index": "ListDivision", data: {} }

    let Division = []

    postToServer("RptEceptionalrpsprp", travelModes).then((Result) => {
      if (Result.data.Status == 'Success') {
        ;
        Result.data.data.map((item1) => {

          Division.push(
            {
              "key": item1.c_code,
              "text": item1.c_name,
              "value": item1.c_code,
            }
          )
        })

        this.setState({ Division: Division })
      }

    }).catch((Error) => {

      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })

    this.setState({Region2:"All"});
    var regdet = { "index": "ListRegion", data: {} }

    let Region = []

    postToServer("RptEceptionalrpsprp", regdet).then((Result) => {
      if (Result.data.Status == 'Success') {
        Result.data.data.map((item2) => {

          Region.push(
            {
              "key": item2.c_code,
              "text": item2.c_name,
              "value": item2.c_code,
            }
          )
        })

        this.setState({ Region: Region })
      }

    }).catch((Error) => {

      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })


//     var mnth = { "index": "MonthType", data: {} }
//     let date = new Date();
// let currentMonth = date.getMonth();
//     let Month = [{
//       key: "1",
//       text: "January",
//       value: "1"
//     },
//     {
//       key: "2",
//       text: "February",
//       value: "2"
//     },
//     {
//       key: "3",
//       text: "March",
//       value: "3"
//     }, {
//       key: "4",
//       text: "April",
//       value: "4"
//     }, {
//       key: "5",
//       text: "May",
//       value: "5"
//     }, {
//       key: "6",
//       text: "June",
//       value: "6"
//     }, {
//       key: "7",
//       text: "July",
//       value: "7"
//     }, {
//       key: "8",
//       text: "August",
//       value: "8"
//     }, {
//       key: "9",
//       text: "September",
//       value: "9"
//     }, {
//       key: "10",
//       text: "October",
//       value: "10"
//     }, {
//       key: "11",
//       text: "November",
//       value: "11"
//     }, {
//       key: "12",
//       text: "December",
//       value: "12"
//     }]

//     let returArray = { "name": "Month", "rvalue":  Month[currentMonth].value };
//     this.props.funcprops(returArray)


//     this.setState({Month: Month, Month2: Month[currentMonth].value})

    // postToServer("RptEceptionalrpsprp", mnth).then((Result) => {
    //   if (Result.status == "200") { 
    //     Result.data.map((item3) => {
    //         Month.push(
    //         {
    //           "key": item3.Code,
    //           "text": item3.Name,
    //           "value": item3.Code,

    //         }
    //       )
    //     })

    //     this.setState({ Month: Month })
    //   }

    // }).catch((Error) => {

    //   this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    // })



    var yr = { "index": "TargetYear", data: {} }
//debugger;
   let Year1 = []
    let date1 = new Date();
    let currentYear = date1.getFullYear();
        let abc = [{
          key: "1",
          text: "2015",
          value: "2015"
        },
        {
          key: "2",
          text: "2016",
          value: "2016"
        },
        {
          key: "3",
          text: "2017",
          value: "2017"
        }, {
          key: "4",
          text: "2018",
          value: "2018"
        }, {
          key: "5",
          text: "2019",
          value: "2019"
        }, {
          key: "6",
          text: "2020",
          value: "2020"
        }, {
          key: "7",
          text: "2021",
          value: "2021"
        }, {
          key: "8",
          text: "2022",
          value: "2022"
        }, {
          key: "9",
          text: "2023",
          value: "2023"
        }, {
          key: "10",
          text: "2024",
          value: "2024"
        }]
        let returArray1 = { "name": "Year", "rvalue": currentYear.toString()};
    this.setState({Year: abc, Year2: currentYear.toString()});
    this.props.funcprops(returArray1)
        // debugger;
   // console.log(currentyear,"yearval")
        // let returArra = { "name": "Year", "rvalue": currentYear};
        // this.props.funcprops(returArra)
    
      //  console.log(returArray1,"Year2")
        // this.setState({Year: Year, Year2:currentYear})
    //     let returArray = { "name": "Year", "rvalue": yr };
    // this.setState({ Year2: yr });
    // this.props.funcprops(returArray)
       // console.log(Year2,"Year2")
    // postToServer("RptEceptionalrpsprp", yr).then((Result) => {
      // console.log(Result,"fulldata")
      // if (Result.status == "200") {

    //     Result.data.map((item4) => {
    //       Year.push(
    //         {
    //           "key": item4.Code,
    //           "text": item4.Name,
    //           "value": item4.Code,

    //         }
    //       )
    //     })

    //     this.setState({ Year: Year })
    //   }

    // }).catch((Error) => {
    //   this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    // })

    //designation binding
    var desig = { "index": "ListDesignattion", data: {} }

    let Designation = []

    postToServer("RptEceptionalrpsprp", desig).then((Result) => {
      if (Result.data.Status == 'Success') {
        // console.log( Result.data);
        Result.data.data.map((item6) => {
          // console.log( Result.data.data);
          Designation.push(
            {
              "key": item6.n_type,
              "text": item6.c_name,
              "value": item6.n_type,
            }
          )
        })

        this.setState({ Designation: Designation })
      }

    }).catch((Error) => {

      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })


    // fsname binding
    this.setState({FsName2:"All"});
    var di = ''
    if (Division == "")
      di = ""
    else
      di = Division
    var des = ''
    if ((this.state.Designation2 == "") || (this.state.Designation2 == "-999"))
      des = ""
    else
      des = this.state.Designation2

    var brnd = { "index": "ListFsUnderDivRegDesig", data: { "DivisionCode": di, "RegionCode": "All", "DesignationCode": des } }

    let FsName = []

    postToServer("RptEceptionalrpsprp", brnd).then((Result) => {
      // console.log(Result.status,"/////");
      if (Result.status == '200') {

        Result.data.data.map((item5) => {
          // alert(item4['c_code']);
          //console.log(item5,"llll")
          FsName.push(
            {
              "key": item5.c_code,
              "text": item5.c_name,
              "value": item5.c_code,

            }
          )
        })

        this.setState({ FSName: FsName })
      }

    }).catch((Error) => {
      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })


    //type binding
    this.setState({Type2:"1"});
    var typeprp = { "index": "Type", data: {} }

    let Type = []

  // let val="1";
  //   let Type = [{
  //     key: "1",
  //     text: "PRP",
  //     value: "1"
  //   },
  //   {
  //     key: "2",
  //     text: "RPS",
  //     value: "2"
  //   }]

  //   let returArray2 = { "name": "Type", "rvalue": val };
  //   this.props.funcprops(returArray2)


  //   this.setState({Type: Type, Type2: val})
    postToServer("RptEceptionalrpsprp", typeprp).then((Result) => {
     
      if (Result.status == '200') {
        
        Result.data.map((item8) => {

          Type.push(
            {
              "key": item8.Code,
              "text": item8.Name,
              "value": item8.Code,
            }
          )
        })

        this.setState({ Type: Type })
      }

    }).catch((Error) => {

      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })


    //drname binding
   // this.setState({DrName2:"All"});
   let date = new Date();
let currentMonth = date.getMonth()+1;
this.setState({Month2:currentMonth});
    var typdr = ""
    if (this.state.Type2 == "")
      typdr = ""
    else
      typdr = this.state.Type2

    var fst1 = ''
    if ((this.state.FsName2 == "") || (this.state.FsName2 == "All"))
      fst1 = "All"
    else
      fst1 = this.state.FsName2
    var mont1 = ""
    if (this.state.Month2 == "")
      mont1 =currentMonth
    else
      mont1 = this.state.Month2
    var yre1 = ''
    if (this.state.Year2 == "")
      yre1 = ""
    else
      yre1 = this.state.Year2



     this.setState({DrName2:"All"});
    var doc = { "index": "ListDoctorName", data: { "Type": "1", "FsName": "All", "Month":mont1.toString(), "Year": currentYear.toString() } }

    let DrName = []
    console.log( doc,"///");
    postToServer("RptEceptionalrpsprp", doc).then((Result) => {
      
      // console.log( Result,"fulldata");
      if (Result.status == '200') {

        Result.data.data.map((item11) => {
          // console.log( Result.data.data);
          DrName.push(
            {
              "key": item11.c_code,
              "text": item11.c_name,
              "value": item11.c_code,
            }
          )
        })

        this.setState({ DrName: DrName })
      }

    }).catch((Error) => {

      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })



    //activitybinding
    this.setState({Activity2:"All"});
    var ty = ""
    if (this.state.Type2 == "")
      ty = ""
    else
      ty = this.state.Type2
    var activ = { "index": "ListActivity", data: { "Type": "1" } }

    let Activity = []
//console.log(activ,"act")
    postToServer("RptEceptionalrpsprp", activ).then((Result) => {
      if (Result.data.Status == 'Success') {
       // console.log( Result,"actda");
        // console.log( Result.data);
        Result.data.data.map((item7) => {

          Activity.push(
            {
              "key": item7.c_code,
              "text": item7.c_name,
              "value": item7.c_code,
            }
          )
        })

        this.setState({ Activity: Activity })
      }

    }).catch((Error) => {

      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })

    //Range binding
    //debugger;
    this.setState({Range2:"99"});
    var ra = { "index": "ListRange", data: {} }

    let Range = []

    postToServer("RptEceptionalrpsprp", ra).then((Result) => {
      //console.log( Result.status,"///");
      if (Result.status == "200") {
        //console.log(Result.data.data,"fulldata")
        Result.data.map((item9) => {
          // console.log( Result.data.data);
          Range.push(
            {
              "key": item9.Code,
              "text": item9.Name,
              "value": item9.Code,
            }
          )
        })

        this.setState({ Range: Range })
      }

    }).catch((Error) => {

      this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
    })



  }

  render() {


    let months = []
    let years = []



    let status = [

    ]
    let fname = []
    this.state.fname.map((item) => {
      fname.push({
        'key': item.FSCODE,
        'text': item.FSNAME,
        'value': item.FSCODE,
      })
    })
    const { Division, Region, Month, Year, FSName, Designation, Activity, Range, Type, DrName } = this.state;
    return (
      <div>
        <Dropdown className="myDropdown">
          <Dropdown.Toggle className="dcr-options" id="dropdown-basic" style={{ backgroundColor: "white", color: '#6c757d', border: "1px solid #dfdfdf", fontSize: "0.875em", borderRadius: "10px", padding: "8px 12px" }}>
            <img src="../public/assets/images/filtering.svg" />
            <span> Filter Option</span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="Repothers-dropdown1">
            <Tab.Container id="left-tabs-example">
              <div>
                <div className='retrival-left'>
                  <Nav variant="pills" className="flex-column">

                    <Nav.Item>
                      <Nav.Link eventKey="Division">
                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                        <span>Division</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Region">
                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                        <span>Region</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Designation">
                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                        <span>Designation</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="FSName">
                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                        <span>FSName</span>
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link eventKey="Month">
                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                        <span>Month</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Year">
                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                        <span>Year</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Type">
                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                        <span>Type</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="DrName">
                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                        <span>Dr Name</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Activity">
                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                        <span>Activity</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="Range">
                        <img src="../public/assets/images/avatar.svg" alt="filter_img" />
                        <span>Range</span>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </div>

                <div className='retrival-right '>
                  <Tab.Content>
                    <Tab.Pane eventKey="Division">
                      <FilterOptionDropEC
                        name="Division"
                        options={Division}
                        getData={this.getDivision1}
                      //parentCallback={this.callbackFunction}
                      // update={this.props.update}


                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Region">
                      <FilterOptionDropEC
                        name="Region"
                        options={Region}
                        getData={this.getRegion}
                        value1={this.state.Region2}
                      //parentCallback={this.callbackFunction}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Designation">
                      <FilterOptionDropEC
                        name="Designation"
                        options={Designation}
                        getData={this.getDesignation}
                      //parentCallback={this.callbackFunction}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="FSName">
                      <FilterOptionDropEC
                        name="FS Name"
                        options={FSName}
                        getData={this.getFSName}
                        value1={this.state.FsName2}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Activity">
                      <FilterOptionDropEC
                        name="Activity"
                        options={Activity}
                        getData={this.getActivity}
                        value1={this.state.Activity2}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="DrName">
                      <FilterOptionDropEC
                        name="DrName"
                        options={DrName}
                        getData={this.getDrName}
                        value1={this.state.DrName2}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Type">
                      <FilterOptionDropEC
                        name="Type"
                        options={Type}
                        getData={this.getType}
                        value1={this.state.Type2}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Month">
                      {/* <FilterOptionDropEC
                        name="Month"
                        options={Month}
                        getData={this.getMonth}
                        value1={this.state.Month2}
                      /> */}
                      <MultiSelectAll 
                          getData={this.getMonth}
                       />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Year">
                      <FilterOptionDropEC
                        name="Year"
                        options={Year}
                        getData={this.getYear}
                        value1={this.state.Year2}
                      />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Range">
                      <FilterOptionDropEC
                        name="Range"
                        options={Range}
                        getData={this.getRange}
                        value1={this.state.Range2}
                      />
                    </Tab.Pane>

                  </Tab.Content>
                </div>

              </div>
            </Tab.Container>
            <span style={{ "color": "red" }} >{this.state.msgStatus} </span>
            <Dropdown.Item eventKey="1">
              <button className="gradient-btn " onClick={this.filterApply}>Apply</button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <StatusPopup
          message={this.state.smsg}
          show={this.state.showStatusModal}
          onClose={this.hideStatusModal}
          success={this.state.success}
        />
      </div>
    );
  }
}

export default FilterOptionsEC