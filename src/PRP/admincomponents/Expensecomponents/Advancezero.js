import React from 'react';
import { Component } from 'react';
// import SearchDropdown from "../../../BasicComponet/searchDropdown";
import '../../../../public/assets/css/sfcstyle.css'
import '../../../../public/assets/css/transactionmodule.css'
import { Button, Col, Row, Form, InputGroup, Dropdown } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import ExpenseBrandetail from "./AdvanceBrands";
import AdvanceDet from "./AdvanceDet";
import Advmember from "./Advmember";
// import AcrHistoryDetail from "./acrhistorydetail";
import MrmemberDetails from "./Memberdet";
import { postToServer } from '../../../lib/comm-utils'
import { URL_PRP } from '../../../lib/constants'
import { dateFormat } from "dateformat"
import SubareDoctocheckbox from "../../mrprpcomponents/subaredoctorcheckbox"
import HistoryDet from "../../managercomponents/HistoryDet"
import SfaModal from "../../../BasicComponet/sfaModal";
import { Link } from 'react-router-dom'
import Loader from '../../../lib/Loader'
class Advancezero extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: "-1",
			Date: new Date(),
			prpDate: "",
			prpDaterr: "",
			RequestedDate: "",
			expenprpname: "",
			expenprpheader: "",
			prptopicname: "",
			Venue: "",
			Venuerr: "",
			docattend: "",
			docattenderr: "",
			invitedspkr: "",
			invitedspkrerr: "",
			doctorattend: "",
			subarea: [],
			filterdata: [],
			selectedData: {},
			subAreaSelected: [],
			doctordata: [],
			doctorfilterdata: [],
			doctorselectedata: {},
			doctorselecetd: [],
			selectedDataerr: "",
			doctorselectedataerr: "",
			emptydoctorerr: "",
			Brands: [],
			brandsselectedata: {},
			brandsselectedataerr: "",
			Accountheads: [],
			ErrorMessageState: false,
			DisableBtn: false,
			brandselecetd: [],
			memberdaata: [],
			PreviousRemarks: [],
			remarks: "",
			Description_error: false,
			EmptyError: "",
		//	memberdataerr: false,
			Details: [],
			disablefields: false,
			RequestCancel: "",
			reason: "",
			Cancelreq: 0,
			cancelledremarks: "",
			cancelremarkerr: "",
			delete1: [],
			delete2: {},
			doctorselecetddel: [],
			doctorselectedatadel: {},
			Photoid: [],
			Billid: [],
			SavedBrands: [],
			one: [],
			two: {},
			showSuccess: false,
			sendfordata: "",
			showupload : true,
			minattend : "",
			minattenderr: "",
			checkfordata : "",
			n_Balance : "",
			showLoader : true
		}
		this.handlePrpDate = this.handlePrpDate.bind(this)
		this.getsubarea = this.getsubarea.bind(this)
		this.getdoctordata = this.getdoctordata.bind(this)
		this.doctorNum = this.doctorNum.bind(this)
		this.GetAdvanceConfirm = this.GetAdvanceConfirm.bind(this)
		this.getBrandsdataAd = this.getBrandsdataAd.bind(this)
		this.removeSelectedItem = this.removeSelectedItem.bind(this)
		this.removeSelectedBrand = this.removeSelectedBrand.bind(this)
		this.onTxtChange = this.onTxtChange.bind(this)
		this.Getremarks = this.Getremarks.bind(this)
		this.onRequestCancel = this.onRequestCancel.bind(this)
		this.onUploadBill = this.onUploadBill.bind(this)
		this.onUploadDoc = this.onUploadDoc.bind(this)
		this.onPrpExpense = this.onPrpExpense.bind(this)
		this.Getcancelreason = this.Getcancelreason.bind(this)
		this.getsubareadel = this.getsubareadel.bind(this)
		this.getdoctordatadel = this.getdoctordatadel.bind(this)
		this.getbrandsdatadel = this.getbrandsdatadel.bind(this)
		this.onSuccess = this.onSuccess.bind(this)
		this.onMinmumChange = this.onMinmumChange.bind(this)
		this.balchanged = this.balchanged.bind(this)
	}
	onMinmumChange(event) {
    const { name, value } = event.target;
    if (name === "minimum" || event.target.value.length < 9) {
      // console.log(value);
      this.setState({ minattend: value })
      var fi = /^[0-9\b]*$/;
      if (fi.test(value)) {
        this.setState({ minattenderr: "" })
      } else {
        this.setState({ minattenderr: "*Please enter Numeric only!" });
      }
    } else {
      alert("Please Enter Upto 8 digit")
    }
  }
	handlePrpDate(date) {
		let dateforamt = new Date(date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2))
		var requestdate = new Date(this.state.RequestedDate.split("/").reverse().join("-"))
		this.setState({ prpDate: date })
		if (dateforamt >= requestdate) {
			this.setState({ prpDaterr: "" })
		}
		else {
			this.setState({ prpDaterr: "PRP Date  should not be Lesser than Requested Date!" })
		}
	}
	doctorNum() {
		if (Object.keys(this.state.selectedData).length == 0) {
			this.setState({ selectedDataerr: "Please Select Sub Area" })
		}
	}
	componentDidMount() {
		var subareadata = { "Index": "SubareaBind", "Data": { "Srno": "" }, }
		postToServer(URL_PRP, subareadata)
			.then((response) => {
				if (response.status == 200 && response.statusText == "OK") {

					this.setState({ subarea: response.data.data })
				}
			}).catch((Error) => {
				this.setState({ Error: true, Errormsg: "Error in App At MRPRP" })
			})
		var data = { "Index": "MRExpenseSrnoClick", "Data": { "srno": this.props.srnum }, }
		let arealistselected = []
		let doctorrselected = []
		postToServer(URL_PRP, data)
			.then((response) => {
				if (response.status == 200 && response.statusText == "OK") {
					response.data.SubareDet.map(ele => {
						arealistselected.push({
							key: ele.c_code,
							text: ele.c_name,
							value: ele.c_name.toLowerCase()
						})
					})
					arealistselected.map(item => {
						const id = item.key + "$" + item.text + "$" + item.value;
						this.getsubarea(id, item.value, true, item)
					})
					response.data.DoctorDet.map(ele => {
						doctorrselected.push({
							key: ele.DocCode,
							text: ele.C_Name,
							value: ele.C_Name.toLowerCase()
						})
					})
					doctorrselected.map(item => {
						const id = item.key + "$" + item.text + "$" + item.value;
						this.getdoctordata(id, item.value, true, item)
					})
					let d = response.data.Details[0].PrpDate
					let dd = response.data.Details[0].PrpDate.split('/')
					let pdate = dd[1] + '/' + dd[0] + '/' + dd[2]
					this.setState({
						expenprpname: response.data.Details[0].prpname,
						expenprpheader: response.data.Details[0].PrpHeadName,
						prpDate: new Date(pdate),
						prptopicname: response.data.Details[0].topicName,
						Venue: response.data.Details[0].Venue,
						RequestedDate: response.data.Details[0].RequestedDate,
						invitedspkr: response.data.Details[0].c_Speaker,
						Brands: response.data.Brands,
						Accountheads: response.data.Accountheads,
						PreviousRemarks: response.data.PreviousRemarks,
						Details: response.data.Details,
						SavedBrands: response.data.SavedBrands,
						minattend: response.data.Details[0].MinimumAttendance,
						checkfordata : response.data.Accountheads.reduce((item, currentvalue) => 
					item + ((currentvalue.AdvanceRequested - currentvalue.n_AdvanceAmount)),0),
						n_Balance : response.data.Details[0].n_Balance
					})
				}
			}).catch((Error) => {
				this.setState({ Error: true, Errormsg: "Error in App At MRPRP" })
			})
	}
	getsubarea(id, name, checked, item) {
		let selectedSubAreatemp = {}
		selectedSubAreatemp = this.state.subAreaSelected
		let { selectedData } = this.state
		if (checked) {
			selectedData[id] = item.key
			selectedSubAreatemp[item.key] = item.value
			this.setState({ selectedDataerr: "" })
		} else if (selectedData[id] == item.key) {
			selectedData[id] = false
			delete selectedSubAreatemp[item.key]
		} else {
			delete selectedData[id]
		}
		this.setState({
			selectedData: selectedData,
			subAreaSelected: selectedSubAreatemp
		})
		let subAreaCode = ""
		Object.values(this.state.selectedData).map(ele => {
			subAreaCode = subAreaCode + ele + ","
		})
		var docodata = { "Index": "DoctorsExpected", "Data": { "Subarea": subAreaCode }, }
		postToServer(URL_PRP, docodata)
			.then((response) => {
				if (response.status == 200 && response.statusText == "OK") {
					if (response.data.data.length == 0) {
						this.setState({ emptydoctorerr: "There is no data for this Sub Area !" })
					} else {
						this.setState({ emptydoctorerr: "" })
					}
					this.setState({ doctordata: response.data.data, showLoader: false })
				}
			}).catch((Error) => {
				this.setState({ Error: true, Errormsg: "Error in App At MRPRP",showLoader: false })
			})
	}
	removeSelectedItem(id) {
		const { selectedData } = this.state;
		delete selectedData[id];
		this.setState({
			selectedData: selectedData
		})
	}
	getdoctordata(id, name, checked, item) {
		let selectedDoctor = {}
		selectedDoctor = this.state.doctorselecetd
		let { doctorselectedata } = this.state
		if (checked) {
			doctorselectedata[id] = item.key
			selectedDoctor[item.key] = item.value
			this.setState({ doctorselectedataerr: "" })
		} else if (doctorselectedata[id] == item.key) {
			doctorselectedata[id] = false
			delete selectedDoctor[item.key]
		} else {
			delete doctorselectedata[id]
		}
		this.setState({
			doctorselectedata: doctorselectedata,
			doctorselecetd: selectedDoctor
		})
	}
	removedoctorSelectedItem(id) {
		const { doctorselectedata } = this.state;
		delete doctorselectedata[id];
		this.setState({
			doctorselectedata: doctorselectedata
		})
	}
	GetAdvanceConfirm(event, ExpCode, Estimated, n_Conf_AdvanceAmount) {
		let elementsIndex
		elementsIndex = this.state.Accountheads.findIndex(element => element.ExpCode == ExpCode)
		let newArray = [...this.state.Accountheads]
		newArray[elementsIndex] = { ...newArray[elementsIndex], n_Conf_AdvanceAmount: event.target.value }
		if (parseInt(newArray[elementsIndex].n_Conf_AdvanceAmount) > parseInt(newArray[elementsIndex].Estimated)) {
			// this.setState({DisableBtn : true})
			this.setState({ ErrorMessageState: true })
		} else {
			//  this.setState({DisableBtn : false})
			this.setState({ ErrorMessageState: false })
			this.setState({ Accountheads: newArray })
		}
	}
	getBrandsdataAd(id, name, checked, item, brandselectedd) {
		let selectedBbrand = {}
		selectedBbrand = this.state.brandselecetd
		let { brandsselectedata } = this.state
		if (checked) {
			brandsselectedata[id] = item.key
			selectedBbrand[item.key] = item.value
			this.setState({ brandsselectedataerr: "" })
		} else if (brandsselectedata[id] == item.key) {
			brandsselectedata[id] = false
			delete selectedBbrand[item.key]
		} else {
			delete brandsselectedata[id]
		}
		this.setState({
			brandsselectedata: brandsselectedata,
			brandselecetd: selectedBbrand
		})
	}
	getbrandsdatadel(id, name, checked, item, brandselectedd) {
		let selectedBbrand = {}
		selectedBbrand = this.state.one
		let { two } = this.state
		if (checked) {
			two[id] = item.key
			selectedBbrand[item.key] = item.value
			this.setState({ oneerr: "" })
		} else if (two[id] == item.key) {
			two[id] = false
			delete selectedBbrand[item.key]
		} else {
			delete two[id]
		}
		this.setState({
			brandsselectedata: two,
			brandselecetd: selectedBbrand
		})
	}
	SendApproval(e) {
		let ChkEmpty = this.state.Accountheads.filter(item => item.n_Conf_AdvanceAmount == "")
		if (this.state.prpDate == "" || this.state.invitedspkr == "" || this.state.Venue == "" ||
			Object.keys(this.state.selectedData).length == 0 || Object.keys(this.state.doctorselectedata).length == 0 ||
			Object.keys(this.state.brandsselectedata).length == 0 || ChkEmpty.length != 0  || this.state.Cancelreq == 1) {
			if (this.state.prpDate == "") {
				this.setState({ prpDaterr: "Please enter PRP Date !" })
			}
			if (this.state.invitedspkr == "") {
				this.setState({ invitedspkrerr: "Please enter Invited Speaker Name !" })
			}
			if (this.state.Venue == "") {
				this.setState({ Venuerr: "Please enter Venue !" })
			}
			if (Object.keys(this.state.selectedData).length == 0) {
				this.setState({ selectedDataerr: "Please Select Sub Area !" })
			}
			if (Object.keys(this.state.doctorselectedata).length == 0) {
				this.setState({ doctorselectedataerr: "Please Select Doctors Expected To Attend !" })
			}
			if (Object.keys(this.state.brandsselectedata).length == 0) {
				this.setState({ brandsselectedataerr: "Please Select Brands !" })
			}
			if (ChkEmpty.length != 0) {
				this.setState({ EmptyError: true })
			}
			// if (this.state.memberdaata.length <= 0) {
			// 	this.setState({ memberdataerr: true })
			// }
		}
		else if (this.state.prpDaterr == "" && this.state.invitedspkrerr == "" && this.state.Venuerr == "" &&
			this.state.selectedDataerr == "" && this.state.doctorselectedataerr == "" && this.state.brandsselectedataerr == "") {
			if (ChkEmpty.length != 0) {
				this.setState({ EmptyError: true })
			}
			else {
				this.setState({ EmptyError: false })
			}
			this.updateList(e)
		}
		else {
		}
	}
	updateList(e) {
		if (this.state.Cancelreq == 1 && this.state.cancelledremarks == "") {
			this.setState({ cancelremarkerr: "Please enter remark to cancel" })
		}
		else {
			if(this.state.Cancelreq == 1){
				var ExpenseActualAdvamt = this.state.Accountheads.reduce((item, currentValue) =>
				item + (currentValue.ExpCode + "|" + currentValue.AdvanceRequested + "|" + "0" + "|" +
					currentValue.n_AdvanceAmount + "^"), "")
			}
			else{
				var ExpenseActualAdvamt = this.state.Accountheads.reduce((item, currentValue) =>
				item + (currentValue.ExpCode + "|" + currentValue.AdvanceRequested + "|" + currentValue.n_Conf_AdvanceAmount + "|" +
					currentValue.n_AdvanceAmount + "^"), "")
			}
			var Details_data = this.state.Details[0]
			let prpsend = ("0" + new Date(this.state.prpDate).getDate()).slice(-2) + "/" + ("0" + (new Date(this.state.prpDate).getMonth() + 1)).slice(-2) + "/" + new Date(this.state.prpDate).getFullYear();
			let brandcode = ""
			Object.values(this.state.brandsselectedata).map(ele => {
				brandcode = brandcode + ele + "|"
			})
			let subAreaCode = ""
			Object.values(this.state.selectedData).map(ele => {
				subAreaCode = subAreaCode + ele + "|"
			})
			let doctorcode = ""
			Object.values(this.state.doctorselectedata).map(ele => {
				doctorcode = doctorcode + ele + "|"
			})
			let APPorReject = ''
			{ e.target.innerText == "Confirm" ? APPorReject = "2" : e.target.innerText == "Reject" ? APPorReject = "3" : e.target.innerText == "" ? APPorReject = "2" : null }
			let EstimatedTotal = this.state.Accountheads.reduce((item, currentvalue) =>
				item + parseFloat(currentvalue.Estimated), 0)
			let AdvanceRequestedtotal = this.state.Accountheads.reduce((item, currentvalue) =>
				item + parseFloat(currentvalue.AdvanceRequested), 0)
			let Balance = this.state.checkfordata.toString()
			let TeamMembersList = this.state.memberdaata.reduce((item, currentValue) =>
				(item + currentValue.value + "|"), "")
			// var ExpenseActualAdvamt = this.state.Accountheads.reduce((item, currentValue) =>
			// 	item + (currentValue.ExpCode + "|" + currentValue.AdvanceRequested + "|" + currentValue.n_Conf_AdvanceAmount + "|" +
			// 		currentValue.n_AdvanceAmount + "^"), "")
			let Photolist = this.state.Photoid.reduce((item, currentValue) =>
				(item + currentValue.ImgFilename + "|"), "")
			let Billlist = this.state.Billid.reduce((item, currentValue) =>
				(item + currentValue.ImgFilename + "|"), "")
			var send_data = {
				"Index": "ConfirmationExpenseSaveRequest",
				"Data": {
					"srno": this.props.srnum,
					"prpcode": Details_data["c_PrpCodeMst"],
					"venue": this.state.Venue,
					"speaker": this.state.invitedspkr,
					"MinimumAttendance": this.state.minattend,
					"reqdate": Details_data["RequestedDate"],
					"prpdate": prpsend,
					"topic": Details_data["c_TopicCode"],
					"Subarea": subAreaCode,
					"doctors": doctorcode,
					"TCEs": Details_data["TotCostEstForPrp"],
					"EstimatedTotal": EstimatedTotal.toString(),
					"AdvanceRequestedtotal": AdvanceRequestedtotal.toString(),
					"Balance": Balance.toString(),
					"NoTeamMembers": this.state.memberdaata.length.toString(),
					"TeamMembers": TeamMembersList,
					"ExpenseActualAdvamt": ExpenseActualAdvamt,
					"brands": brandcode,
					"APPorReject": APPorReject,
					"remarks": this.state.remarks,
					"Cancelreq": this.state.Cancelreq.toString(),
					"cancelledremarks": this.state.cancelledremarks,
					"Photoid": Photolist,
					"Billid": Billlist,
					"AdvChkVal" : "1"
				},
				"Token": ""
			}
			postToServer("Prp", send_data).then((Result) => {
				if (Result.data.Status == "Success") {
					this.setState({ sendfordata: Result.data.data[0].Result })
					this.setState({ showSuccess: true })
				}
			}).catch((Error) => {
				this.setState({ Error: true })
			})
		}
	}
	removeSelectedBrand(id) {
		let { brandsselectedata } = this.state;
		delete brandsselectedata[id];
		this.setState({
			brandsselectedata: brandsselectedata
		})
	}
	onTxtChange(id, e, abc) {
		abc.map(res => {
			if (res.id == id) {
				res.value = e.target.value
			}
		})
		this.setState({ memberdaata: abc, memberdataerr: false })
	}
	Getremarks(event) {
		this.setState({ remarks: event.target.value })
		this.setState({ Description_error: false })
	}
	onRequestCancel(RequestCancel, e) {
		// console.log(RequestCancel,"RequestCancel")
		this.setState({ RequestCancel: RequestCancel, showupload : false })
		if (RequestCancel == true) {
			this.componentDidMount()

			var subareadata = { "Index": "SubareaBind", "Data": { "Srno": "" }, }
			postToServer(URL_PRP, subareadata)
				.then((response) => {
					// console.log(response.data.data, "subareadata")
					if (response.status == 200 && response.statusText == "OK") {

						this.setState({ subarea: response.data.data })
					}

				}).catch((Error) => {
					this.setState({ Error: true, Errormsg: "Error in App At MRPRP" })
				})

			var data = { "Index": "MRExpenseSrnoClick", "Data": { "srno": this.props.srnum }, }
			let arealistselected = []
			let doctorrselected = []
			let TeamMembers = []
			let brandselectedd = []
			postToServer(URL_PRP, data)
				.then((response) => {
					// console.log(response, data, "data")
					if (response.status == 200 && response.statusText == "OK") {
						response.data.SubareDet.map(ele => {
							//  console.log(response.data,"data")
							arealistselected.push({
								key: ele.c_code,
								text: ele.c_name,
								value: ele.c_name.toLowerCase()

							})
						})
						//  console.log(arealistselected,"arealistselected")

						arealistselected.map(item => {
							// console.log(item,"subareaitem")
							const id = item.key + "$" + item.text + "$" + item.value;
							//  subAreaCode = subAreaCode + item.key + ","
							this.getsubareadel(id, item.value, true, item)
						})
						// console.log(response.data.DoctorDet,"doctordet")

						response.data.DoctorDet.map(ele => {
							//  console.log(response.data,"data")
							doctorrselected.push({
								key: ele.DocCode,
								text: ele.C_Name,
								value: ele.C_Name.toLowerCase()

							})
						})

						//  console.log(doctorrselected,"doctorrselected")

						doctorrselected.map(item => {
							const id = item.key + "$" + item.text + "$" + item.value;
							this.getdoctordatadel(id, item.value, true, item)
						})
						response.data.SavedBrands.map(ele => {
							brandselectedd.push({
								key: ele.BCode,
								text: ele.Name,
								value: ele.Name.toLowerCase()
							})
						})
						brandselectedd.map(item => {
							const id = item.key + "$" + item.text + "$" + item.value;
							this.getbrandsdatadel(id, item.value, true, item, brandselectedd)
						})
						let d = response.data.Details[0].PrpDate
						let dd = response.data.Details[0].PrpDate.split('/')
						let pdate = dd[1] + '/' + dd[0] + '/' + dd[2]

						let req = response.data.Details[0].RequestedDate
						let Rdate = response.data.Details[0].RequestedDate.split('/')
						let requserdate = Rdate[1] + '/' + Rdate[0] + '/' + Rdate[2]

						// let dateFormat = require('dateformat');
						this.setState({
							expenprpname: response.data.Details[0].prpname,
							expenprpheader: response.data.Details[0].PrpHeadName,
							prpDate: new Date(pdate),
							prptopicname: response.data.Details[0].topicName,
							venue: response.data.Details[0].Venue,
							// RequestedDate:  new Date(requserdate),
							RequestedDate: response.data.Details[0].RequestedDate,
							invitedspkr: response.data.Details[0].c_Speaker,
							Brands: response.data.Brands,
							Accountheads: response.data.Accountheads,
							PreviousRemarks: response.data.PreviousRemarks,
							// TeamMembers: response.data.TeamMembers,
							minattend: response.data.Details[0].MinimumAttendance,
							prpcode: response.data.Details[0].c_PrpCodeMst,
							topicode: response.data.Details[0].c_TopicCode,
							SubareDet: response.data.SubareDet,
							memberdaata: response.data.TeamMembers,
							SavedBrands: response.data.SavedBrands
						})
					}
				//	this.setState({ Billid: [], Photoid: [] })
				}).catch((Error) => {
					this.setState({ Error: true, Errormsg: "Error in App At MRPRP" })
				})
			this.setState({ disablefields: true, Cancelreq: 1 })
			// this.updateList(e)
		} else {
			this.setState({ disablefields: false })
		}
	}
	onUploadDoc(doc, savedoc, reason, photoId) {
		// var letsaved = doc.map(item => item.ImgFilename)
		// this.setState({ Photoid: reason })

		if (reason == undefined) {
      this.setState({ Photoid: doc })
    } else {
      this.setState({ Photoid: reason })
    }
   // this.setState({ savedoc: savedoc })
	}
	onUploadBill(bill, savebill, reason) {
		if(savebill == undefined){
			this.setState({ Billid: bill })
		}
		else{
			this.setState({ Billid: savebill })
		}
	}
	onPrpExpense(AccountheadsList) {
		this.setState({ Accountheads: AccountheadsList })
	}
	Getcancelreason(e) {
		this.setState({ cancelledremarks: e.target.value })
		this.setState({ cancelremarkerr: "" })
	}
	getsubareadel(id, name, checked, item) {
		let selectedSubAreatemp = {}
		selectedSubAreatemp = this.state.delete1
		let { delete2 } = this.state
		if (checked) {
			delete2[id] = item.key
			selectedSubAreatemp[item.key] = item.value
			this.setState({ selectedDataerr: "" })
		} else if (delete2[id] == item.key) {
			delete2[id] = false
			delete selectedSubAreatemp[item.key]
		} else {
			delete delete2[id]
		}
		this.setState({
			selectedData: delete2,
			subAreaSelected: selectedSubAreatemp
		})
		let subAreaCode = ""
		Object.values(this.state.selectedData).map(ele => {
			subAreaCode = subAreaCode + ele + ","
		})
	}
	getdoctordatadel(id, name, checked, item) {
		let selectedDoctor = {}
		selectedDoctor = this.state.doctorselecetddel
		let { doctorselectedatadel } = this.state
		if (checked) {
			doctorselectedatadel[id] = item.key
			selectedDoctor[item.key] = item.value
			this.setState({ doctorselectedataerr: "" })
		} else if (doctorselectedatadel[id] == item.key) {
			doctorselectedatadel[id] = false
			delete selectedDoctor[item.key]
		} else {
			delete doctorselectedatadel[id]
		}
		this.setState({
			doctorselectedata: doctorselectedatadel,
			doctorselecetd: selectedDoctor
		})
	}
	onSuccess() {
		this.setState({ showSuccess: true })
	}
	balchanged(event){
		if(event.target.value != ""){
			this.setState({checkfordata : this.state.Accountheads.reduce((item, currentvalue) => 
				item + ((currentvalue.AdvanceRequested - currentvalue.n_Conf_AdvanceAmount)),0)})
		}
	}
	render() {
		var successText = <div className="expense-success-msg">{this.state.sendfordata} !</div>
		var OK = <Link to="/ConfirmationList"><div className="prpok"><button className="btnnok">OK</button></div></Link>
		let subareadropdown = []
		let doctordatadropdown = []
		if (this.state.subarea.length > 0) {
			this.state.subarea.map((item) => {
				subareadropdown.push({
					"key": item.c_code,
					"text": item.C_Name,
					"value": item.C_Name.toLowerCase()
				})
			})
		}
		if (this.state.doctordata.length > 0) {
			this.state.doctordata.map((item) => {
				doctordatadropdown.push({
					"key": item.c_code,
					"text": item.c_name,
					"value": item.c_name.toLowerCase()
				})
			})
		}
		const { filterdata, selectedData } = this.state
		const items = subareadropdown.reduce((prev, item, index) => {
			const id = item.key + "$" + item.text + "$" + item.value;
			const selection = selectedData[id] ? selectedData[id] : false
			prev.push(
				<SubareDoctocheckbox
					key={index}
					selection={selection}
					getsubarea={this.getsubarea.bind(this)}
					id={id}
					item={item}
				/>
			)
			return prev
		}, [])
		const selections = Object.keys(selectedData).reduce((p, n, i) => {
			if (typeof (selectedData[n]) === "string") {
				const name = n.split('$')[0];
				const desg = n.split('$')[1]
				p.push(
					<div>
						<div key={n} className="subareaselectedDropdown"><div>{desg} </div>
							{this.state.RequestCancel == true ? <div></div> :
								<img src="../../public/assets/images/cancel.svg" className="closeImg"
									onClick={this.removeSelectedItem.bind(this, n)}
								/>}
						</div>
					</div>
				)
			}
			return p
		}, [])
		const { doctorfilterdata, doctorselectedata } = this.state
		const doctorlist = doctordatadropdown.reduce((prev, item, index) => {
			const id = item.key + "$" + item.text + "$" + item.value;
			const selection = doctorselectedata[id] ? doctorselectedata[id] : false
			prev.push(
				<SubareDoctocheckbox
					key={index}
					selection={selection}
					getsubarea={this.getdoctordata.bind(this)}
					id={id}
					item={item}
				/>
			)
			return prev
		}, [])
		const doctorselections = Object.keys(doctorselectedata).reduce((p, n, i) => {
			if (typeof (doctorselectedata[n]) === "string") {
				const name = n.split('$')[0];
				const desg = n.split('$')[1]
				p.push(
					<div>
						<div key={n} className="subareaselectedDropdown"><div>{desg} </div>
							{this.state.RequestCancel == true ? <div></div> :
								<img src="../../public/assets/images/cancel.svg" className="closeImg"
									onClick={this.removedoctorSelectedItem.bind(this, n)}
								/>}
						</div>
					</div>
				)
			}
			return p
		}, [])
		return (
			<React.Fragment>
				<div className="pullleft KamClaimTablesfc newentryprp">
					<div>
						<SfaModal
							show={this.state.showSuccess}
							imagePath={"../../../public/assets/images/submitplan.svg"}
							onHide={this.onSuccess}
							subDiv={successText}
							buttonGroup={OK}
							size="sm" />
						<div className="prptype-req">
							{this.state.expenprpheader}
						</div>
					</div>
					<div className="alldropsfclocation">
						<div className="locationsfa">
							<div className="user-heirarchy-field-containers">
								<div className="distributorClaimListsfc">
									<p className="paralocation-prp">PRP No. </p>
								</div>
								<div className="selectlocation">
									<div className="prp-det-expense">{this.props.srnum}</div>
								</div>
							</div>
						</div>
						<div className="locationsfa">
							<div className="user-heirarchy-field-containers">
								<div className="distributorClaimListsfc">
									<p className="paralocation-prp">PRP Name <span className="colorRed">*</span> </p>
								</div>
								<div className="selectlocation">
									<div className="prp-det-expense">{this.state.expenprpname}</div>
								</div>
							</div>
						</div>
						<div className="locationsfa">
							<div className="user-heirarchy-field-containers">
								<div className="distributorClaimListsfc">
									<p className="paralocation-prp">Requested Date<span className="colorRed">*</span>  </p>
								</div>
								<div className="selectlocation">
									<div className="prp-det-expense">{this.state.RequestedDate}</div>
								</div>
							</div>
						</div>
						<div className="locationsfa">
							<div className="user-heirarchy-field-containers">
								<div className="distributorClaimListsfc">
									<p className="paralocation-prp">PRP Date <span className="colorRed">*</span> </p>
								</div>
								<div className="selectlocation">
									<InputGroup className="datepickerAligment controls text-right">
										<DatePicker
											selected={this.state.prpDate}
											onChange={this.handlePrpDate}
											dateFormat="dd-MM-yy"
											placeholderText="DD-MM-YYYY"
											disableCalendar={this.state.disablefields}
											disabled={this.state.disablefields}
										/>
										<InputGroup.Append>
											<InputGroup.Text>
												<img src="../public/assets/images/prpcalender.svg" alt="calendar" />
											</InputGroup.Text>
										</InputGroup.Append>
									</InputGroup>
								</div>
								<div className="daterror-msg"> {this.state.prpDaterr} </div>
							</div>
						</div>
				
					{/* <Row className="pallet2">
						<Col xl={3} xs={12}>
							<div className="locationsfa appdetails">
								<div className="paralocation-prp">
									Topic
        </div>
								<div className="valu2">
									<p className="typereq">{this.state.prptopicname}</p>
								</div>
							</div>
						</Col>
						<Col xl={3}>
							<div>
								<div className="productDetailDrop">
									<div className="sfa-search-dropdown .search-dropdown-label subareaLable">SubArea<span className="colorRed">*</span></div>
									<Dropdown className="multiple-dropdown marginBot10">
										<Dropdown.Toggle id="dropdown-basic">
											<div className="dcrInput">
												<input className="prp-subarea-text" placeholder="Select SubArea" disabled={this.state.disablefields} />
											</div>
										</Dropdown.Toggle>
										{this.state.RequestCancel == true ? <div></div> :
											<Dropdown.Menu>
												<div className="Padding10 paddingTop jointData cal-scrollbar">
													<div className="mt-30">
														{items}
													</div>
												</div>
											</Dropdown.Menu>}
									</Dropdown>
								</div>
								<div className="daterror-msg"> {this.state.selectedDataerr} </div>
								<div className="selectedDiv">
									{selections}
								</div>
							</div>
						</Col>
						<Col xl={6}>
							<div className="productDetailDrop">
								<div className="sfa-search-dropdown .search-dropdown-label subareaLable">Doctors Expected To Attend<span className="colorRed">*</span></div>
								<Dropdown className="multiple-dropdown marginBot10" onClick={this.doctorNum}>
									<Dropdown.Toggle id="dropdown-basic">
										<div className="dcrInput">
											<input className="prp-subarea-text" placeholder="Select Doctors" disabled={this.state.disablefields} />
										</div>
									</Dropdown.Toggle>
									{this.state.RequestCancel == true ? <div></div> :
										<Dropdown.Menu>
											<div className="Padding10 paddingTop jointData cal-scrollbar">
												<div className="mt-30">
													<div className="daterror-msg"> {this.state.emptydoctorerr} </div>
													{doctorlist}
												</div>
											</div>
										</Dropdown.Menu>}
								</Dropdown>
							</div>
							<div className="daterror-msg"> {this.state.doctorselectedataerr} </div>
							<div className="selectedDiv">
								{doctorselections}
							</div>
						</Col>
						<Col xl={3}>
							<div className="locationsfa">
								<div className="user-heirarchy-field-containers">
									<div className="distributorClaimListsfc">
										<p className="paralocation-prp">Venue <span className="colorRed">*</span>  </p>
									</div>
									<div className="selectlocation">
										<div><input
											type="text"
											className="customized-input"
											onChange={(e) => { this.setState({ Venue: e.target.value, Venuerr: "" }) }}
											value={this.state.Venue}
											placeholder="Enter here"
											min="0"
											onWheel={event => event.currentTarget.blur()}
											disabled={this.state.disablefields}
										/></div>
									</div>
									<div className="daterror-msg"> {this.state.Venuerr} </div>
								</div>
							</div>
						</Col>
						<Col xl={3}>
							<div className="locationsfa">
								<div className="user-heirarchy-field-containers">
									<div className="distributorClaimListsfc">
										<p className="paralocation-prp">Invited Speaker Name <span className="colorRed">*</span>  </p>
									</div>
									<div className="selectlocation">
										<div><input
											type="text"
											className="customized-input"
											onChange={(e) => { this.setState({ invitedspkr: e.target.value, invitedspkrerr: "" }) }}
											value={this.state.invitedspkr}
											placeholder="Enter here"
											min="0"
											onWheel={event => event.currentTarget.blur()}
											disabled={this.state.disablefields}
										/></div>
									</div>
									<div className="daterror-msg"> {this.state.invitedspkrerr} </div>
								</div>
							</div>
						</Col>
					</Row> */}
					<div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Topic <span className="colorRed">*</span>  </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">
									{this.state.prptopicname}
									</div>
                </div>
              </div>
            </div>
						<div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="productDetailDrop">
                  <div className="sfa-search-dropdown .search-dropdown-label subareaLable">SubArea<span className="colorRed">*</span></div>
                  <Dropdown className="multiple-dropdown marginBot10">
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="dcrInput">
                        <input className="prp-subarea-text" placeholder="Select SubArea" disabled={this.state.RequestCancel} />
                      </div>
                    </Dropdown.Toggle>

                    {this.state.RequestCancel == true ? <div></div> :
                      <Dropdown.Menu>
                        <div className="Padding10 paddingTop jointData cal-scrollbar">
                          <div className="mt-30">
                            {items}
                          </div>
                        </div>
                      </Dropdown.Menu>}

                  </Dropdown>
                </div>
                <div className="daterror-msg"> {this.state.selectedDataerr} </div>
                <div className="selectedDiv">
                  {selections}

                </div>

              </div>
            </div>
						<div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="productDetailDrop">
                  <div className="sfa-search-dropdown .search-dropdown-label subareaLable">Doctors Expected To Attend<span className="colorRed">*</span></div>
                  <Dropdown className="multiple-dropdown marginBot10" onClick={this.doctorNum}>
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="dcrInput">
                        <input className="prp-subarea-text" placeholder="Select Doctors" disabled={this.state.RequestCancel} />
                      </div>
                    </Dropdown.Toggle>

                    {this.state.RequestCancel == true ? <div></div> :
                      <Dropdown.Menu>
                        <div className="Padding10 paddingTop jointData cal-scrollbar">

                          <div className="mt-30">
                            <div className="daterror-msg"> {this.state.emptydoctorerr} </div>
                            {doctorlist}
                          </div>
                        </div>

                      </Dropdown.Menu>}

                  </Dropdown>
                </div>
                <div className="daterror-msg"> {this.state.doctorselectedataerr} </div>
                <div className="selectedDiv">
                  {doctorselections}

                </div>

              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Venue <span className="colorRed">*</span> </p>
                </div>
								<div className="selectlocation">
										<div><input
											type="text"
											className="customized-input"
											onChange={(e) => { this.setState({ Venue: e.target.value, Venuerr: "" }) }}
											value={this.state.Venue}
											placeholder="Enter here"
											min="0"
											onWheel={event => event.currentTarget.blur()}
											disabled={this.state.disablefields}
										/></div>
									</div>
									<div className="daterror-msg"> {this.state.Venuerr} </div>
              </div>
            </div>
						<div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Invited Speaker Name <span className="colorRed">*</span>  </p>
                </div>
                <div className="selectlocation">
                  <div><input
                    type="text"
                    className="customized-input"
                    name="invitedspk"
                    onChange={(e) => { this.setState({ invitedspkr: e.target.value, invitedspkrerr: "" }) }}
                    // onChange ={(event) => this.invitedSpkchnage(event)}
                    value={this.state.invitedspkr}
                    placeholder="Enter here"
                    disabled={this.state.RequestCancel}
                    min="0"
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.invitedspkrerr} </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers ">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">No Of Dr's Attended <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation ">
                  <div><input
                    type="text"
                    className="customized-input"
                    name="minimum"
                    // onChange={(e) => { this.setState({ minattend: e.target.value, minattenderr: "" }) }}
                    onChange={(event) => this.onMinmumChange(event)}

                    value={this.state.minattend}
                    placeholder="Enter here"
                    pattern="\d*"
                    maxlength="10"
                    min="0"
                    disabled={this.state.RequestCancel}
                    onWheel={event => event.currentTarget.blur()}

                  /></div>
                </div>
                <div className="daterror-msg"> {this.state.minattenderr} </div>
              </div>
            </div>
					</div>
				</div>
				<ExpenseBrandetail Brands={this.state.Brands} srnum={this.props.srnum} getBrandsdataAd={this.getBrandsdataAd} brandsselectedata={this.state.brandsselectedata}
					brandselecetd={this.state.brandselecetd} removeSelectedBrand={this.removeSelectedBrand} RequestCancel={this.state.RequestCancel}
					brandsselectedataerr={this.state.brandsselectedataerr} SavedBrands={this.state.SavedBrands} />
				<AdvanceDet Accountheads={this.state.Accountheads} srnum={this.props.srnum} onPrpExpense={this.onPrpExpense}
					GetAdvanceConfirm={this.GetAdvanceConfirm} ErrorMessageState={this.state.ErrorMessageState} EmptyError={this.state.EmptyError} RequestCancel={this.state.RequestCancel} 
					Details={this.state.Details} checkfordata={this.state.checkfordata} balchanged={this.balchanged} n_Balance={this.state.n_Balance}/>
				<Row className="custom-row">
					<Col xl={7} md={7} sm={12} xs={12} className="custom-column">
						<Advmember onRequestCancel={this.onRequestCancel} srnum={this.props.srnum} onUploadBill={this.onUploadBill} onUploadDoc={this.onUploadDoc} Getcancelreason={this.Getcancelreason}
							cancelremarkerr={this.state.cancelremarkerr} showupload={this.state.showupload}/>
					</Col>
					<Col xl={5} md={5} sm={12} xs={12} className="custom-column">
						<MrmemberDetails onTxtChange={this.onTxtChange} memberdataerr={this.state.memberdataerr} RequestCancel={this.state.RequestCancel} />
					</Col>
				</Row>
				<div className="palletback pallet2 appdetails">
					<Row>
						<Col xs={12}>
							<div className="pbartitle">
								Remarks
                      </div>
						</Col>
						<Col xl={6}>
							<div className="paralocation-prp">
								Description
                    </div>
							{this.state.Description_error ?
								<div className="expense-note-det appdetails">
									<span className="prpexpnote">Please enter  description</span>
								</div> : null}
							<div className="value2">
								<div>
									<textarea className="form-control" rows="2" placeholder="Enter Here" ref={this.input} onChange={(event) => this.Getremarks(event)}></textarea>
								</div>
							</div>
						</Col>
					</Row>
				</div>
				<HistoryDet PreviousRemarks={this.state.PreviousRemarks} />
				{this.state.disablefields ? <Button className="sfcAddBtn-loaditem send-for-aprvl" disabled={this.state.DisableBtn} onClick={(e) => this.updateList(e)}>Confirm</Button>
					: <div>
						<Button className="sfcAddBtn-loaditem send-for-aprvl" disabled={this.state.DisableBtn} onClick={(e) => this.SendApproval(e)}>Confirm</Button>
						<Button className="rejectBtn" disabled={this.state.disablefields} onClick={(e) => this.SendApproval(e)}>Reject</Button>
					</div>}
					<Loader show={this.state.showLoader} />
			</React.Fragment>
		)
	}
}
export default Advancezero;