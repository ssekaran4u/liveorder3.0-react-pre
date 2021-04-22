import React from 'react'
import { Row, Col, Table, Dropdown,Form } from 'react-bootstrap';
import Datatable from 'react-bs-datatable';
import { sortData, filterData, paginateData } from 'react-bs-datatable/lib/utils/ClassHelpers';
import Pagination from 'react-bs-datatable/lib/Pagination';
import PaginationOpts from 'react-bs-datatable/lib/PaginationOpts';
import TableHeader from 'react-bs-datatable/lib/TableHeader';
import TableBody from 'react-bs-datatable/lib/TableBody';
import Filter from 'react-bs-datatable/lib/Filter';
import SRRetrivalOption from './SRRetrivalOption'
import { postToServer } from '../../lib/comm-utils'
import { URL_REPORT } from '../../lib/constants'
import Loder from  '../../lib/Loader'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

class SRReportTable extends Datatable {
    constructor(props) {
        super(props)
        this.state = {
            ...this.state,
            displayedColumns:[],
            reportLabel:'',
            reportData:[],
            reportHeader:[],
            control_data:[],
            displayctrl:[],
            controllName:[],
            report_parameter:'',
            loader:false,
            reportHeaderdata:[],
            displayedColumnsheader:[],
            columnlist:[]
        }
        
        this.updateFormData=this.updateFormData.bind(this)
        this.updateData=this.updateData.bind(this)
        this.changeDisplayedColumns=this.changeDisplayedColumns.bind(this)
        this.data_view=this.data_view.bind(this)
        this.report_view_data=this.report_view_data.bind(this)
        this.report_view_API_data=this.report_view_API_data.bind(this)
        this.handleExcel=this.handleExcel.bind(this)
        this.datareport_header=this.datareport_header.bind(this)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.report_id !== prevProps.report_id) {
            this.setState({reportData:[], reportHeader:[], displayedColumns:[], controllName:'', control_data:[], displayctrl:[], displayedColumnsheader:[]})
            this.forceUpdate()
        }
    }
    
    updateFormData(control_data, displayctl) {
        this.setState({control_data:control_data, displayctrl:displayctl})
    }
    
    updateData(controllName,report_query_parameter) {
        this.setState({controllName:controllName, report_parameter:report_query_parameter})
    }

    handleExcel() {
        //
    }

    handlePdf() {
        //
    }

    handlePrint() {
        //
    }
    
    changeDisplayedColumns(e) {
        const { name, checked } = e.target
        let { displayedColumns } = this.state
        if (checked)
            displayedColumns.push(name)
        else
            displayedColumns = displayedColumns.filter((n) => n !== name )
        this.setState({displayedColumns})
    }

    datareport_header() {
        var headerText = this.props.reportheader_detail.toString();
        for (var pram of this.props.reportheader_param.split(",")) {
            for (var ctrl of this.state.controllName) {
                if (pram == ctrl) {
                    if (this.state.displayctrl[ctrl] != undefined) {
                        headerText = headerText.replace(ctrl," " + this.state.displayctrl[ctrl]
                        );
                    }
                }
            }
        }
        
        this.props.updatechild(headerText)
    }
    
    data_view() {
        let isDateCheckRequired = false;
        var fromdt='';
        var todt='';
        //console.log("CTRL NAME", this.state.controllName)
        for (var ctrl of this.state.controllName) {
            // if (ctrl == "RXType" || ctrl == "QuantityType" || ctrl == "ValueType") {

            // } else {
                if (this.state.control_data[ctrl] == undefined) {
                    alert(ctrl + " - Value not Selected ............")
                    return;
                }
                if (ctrl=="DateFrom") {
                    isDateCheckRequired = true;
                    fromdt=this.state.control_data[ctrl];
                }
                if (ctrl=="DateTo") {
                    isDateCheckRequired = true;
                    todt=this.state.control_data[ctrl];
                }
            // }
        }
        
        if (isDateCheckRequired) {
            if (fromdt != "" && fromdt != "Invalid date" && todt != "" && todt != "Invalid date") {
                var from = fromdt.split("/")
                var dt1 = new Date(from[2], from[1] - 1, from[0]).getTime()
                var to = todt.split("/")
                var dt2 = new Date(to[2], to[1] - 1, to[0]).getTime()

                if (dt1 > dt2) {
                    alert("From Date Should Be Less Than To Date...");
                    return;
                }
            } else {
                alert("Please select dates to continue...");
                return;
            }
        }
        
        this.datareport_header();
        var datalist ='';
        var mainvalue='';   
        var arrayvalue='';

        //console.log("PARAMS NAME", this.state.report_parameter)
        if (this.props.query_type=="proc") {
            for (var pram of this.state.report_parameter.split(',')) { 
                mainvalue=pram + ",";
                for (var ctrl of this.state.controllName) {
                    if (pram==ctrl) {
                        if (this.state.control_data[ctrl]!=undefined) {
                            datalist=  this.state.control_data[ctrl] + ",";
                        } else {
                            datalist= "' ',";
                        }
                        mainvalue=datalist; 
                    }
                }
                arrayvalue=arrayvalue + mainvalue;   
            }

            arrayvalue= arrayvalue.substring(0, arrayvalue.length - 1);
            //console.log("XXX request body", arrayvalue)
            this.report_view_data(arrayvalue);
        } else {
            for (var pram of this.state.report_parameter.split(',')) { 
                mainvalue=pram + ",";
                for (var ctrl of this.state.controllName) {
                    if (pram==ctrl) {
                        if (this.state.control_data[ctrl]!=undefined) {
                            datalist="\"" + ctrl+ "\":" +"\"" + this.state.control_data[ctrl] + "\"" + ",";
                        } else {
                            datalist= "' ',";
                        }
                        mainvalue=datalist; 
                    }
                }
                arrayvalue = arrayvalue + mainvalue;
            }

            arrayvalue= arrayvalue.substring(0, arrayvalue.length - 1);
            arrayvalue= "{"+ arrayvalue + "}";
            //console.log("XXX request body", arrayvalue)
            this.report_view_API_data(arrayvalue)
        }
    }

    report_view_API_data(api_parameter) {
        this.setState({ loader:true, reportData: [], reportHeader:[] })
        const { report_id } = this.props
        let requestData = api_parameter;
        requestData = requestData.replace("Division", "DivisionCode");
        requestData = requestData.replace("Region", "RegionCode");
        requestData = requestData.replace("HQ", "AreaCode");
        if (!requestData.includes("AreaCode")) {
            requestData = requestData.replace("Area", "AreaCode");
        }
        requestData = requestData.replace("FS", "FsCode");
        requestData = requestData.replace("Category", "Category");
        requestData = requestData.replace("RXType", "Rx");
        requestData = requestData.replace("QuantityType", "Qty");
        requestData = requestData.replace("ValueType", "Val");
        requestData = requestData.replace("Brand", "Products");
        requestData = requestData.replace("DateFrom", "Datefrom");
        requestData = requestData.replace("DateTo", "Dateto");

        let requestJSON = JSON.parse(requestData)
        var data1 = {
            Index: this.props.exe_query_index, 
            Data: requestJSON
        }

        const _this = this;

        postToServer(_this.props.exe_query, data1)
            .then((result) => {
                if (result.data ) {
                    _this.setState({  loader:false, reportLabel:" There is no data to be displayed ................... "  })

                    let reportType = _this.props.exe_query;
                    let specialConfiguration = _this.props.reportparameter.specialConfiguration

                    let responseData;
                    let customColumnList = [];
                    let customColumnConfig = {}
                    if (reportType == "CompetitorProducts") {
                        customColumnConfig.isRxActive = false;
                        customColumnConfig.isQuantityActive = false;
                        customColumnConfig.isValueActive = false;

                        if (specialConfiguration[0].activeStatus == "1") {
                            customColumnConfig.isRxActive = true;
                        }
                        if (specialConfiguration[1].activeStatus == "1") {
                            customColumnConfig.isQuantityActive = true;
                        }
                        if (specialConfiguration[2].activeStatus == "1") {
                            customColumnConfig.isValueActive = true;
                        }

                        responseData = result.data.data;
                        // customColumnList = ["FS NAME", "DOCTOR CODE", "DOCTOR NAME", "CATEGORY", "DOCTOR GRADE", "BRAND NAME", "RX", "QUANTITY", "VALUE", "COMPETITOR PRODUCT", "C RX", "C QUANTITY", "C VALUE"];
                        customColumnList.push("FS NAME");
                        customColumnList.push("DOCTOR CODE");
                        customColumnList.push("DOCTOR NAME");
                        customColumnList.push("CATEGORY");
                        customColumnList.push("DOCTOR GRADE");
                        customColumnList.push("BRAND NAME");
                        if (customColumnConfig.isRxActive) {
                            customColumnList.push("RX");
                        }
                        if (customColumnConfig.isQuantityActive) {
                            customColumnList.push("QUANTITY");
                        }
                        if (customColumnConfig.isValueActive) {
                            customColumnList.push("VALUE");
                        }
                        customColumnList.push("COMPETITOR PRODUCT");
                        if (customColumnConfig.isRxActive) {
                            customColumnList.push("C RX");
                        }
                        if (customColumnConfig.isQuantityActive) {
                            customColumnList.push("C QUANTITY");
                        }
                        if (customColumnConfig.isValueActive) {
                            customColumnList.push("C VALUE");
                        }
                    } else if (reportType == "CWCompProds") {
                        customColumnConfig.isRxActive = false;
                        customColumnConfig.isQuantityActive = false;
                        customColumnConfig.isValueActive = false;

                        if (specialConfiguration[0].activeStatus == "1") {
                            customColumnConfig.isRxActive = true;
                        }
                        if (specialConfiguration[1].activeStatus == "1") {
                            customColumnConfig.isQuantityActive = true;
                        }
                        if (specialConfiguration[2].activeStatus == "1") {
                            customColumnConfig.isValueActive = true;
                        }

                        responseData = result.data.data;
                        // customColumnList = ["FS NAME", "DOCTOR CODE", "DOCTOR NAME", "CATEGORY", "DOCTOR GRADE", "CHEMIST NAME", "BRAND NAME", "RX", "QUANTITY", "VALUE", "COMPETITOR PRODUCT", "C RX", "C QUANTITY", "C VALUE"];
                        customColumnList.push("FS NAME");
                        customColumnList.push("DOCTOR CODE");
                        customColumnList.push("DOCTOR NAME");
                        customColumnList.push("CATEGORY");
                        customColumnList.push("DOCTOR GRADE");
                        customColumnList.push("CHEMIST NAME");
                        customColumnList.push("BRAND NAME");
                        if (customColumnConfig.isRxActive) {
                            customColumnList.push("RX");
                        }
                        if (customColumnConfig.isQuantityActive) {
                            customColumnList.push("QUANTITY");
                        }
                        if (customColumnConfig.isValueActive) {
                            customColumnList.push("VALUE");
                        }
                        customColumnList.push("COMPETITOR PRODUCT");
                        if (customColumnConfig.isRxActive) {
                            customColumnList.push("C RX");
                        }
                        if (customColumnConfig.isQuantityActive) {
                            customColumnList.push("C QUANTITY");
                        }
                        if (customColumnConfig.isValueActive) {
                            customColumnList.push("C VALUE");
                        }
                    } else if (reportType == "PrpDetailsRpt") {
                        responseData = result.data.data[0];
                        customColumnList = ["DIVISION NAME", "REGION NAME", "PRP NO", "PRP NAME", "REQUESTED DATE", "REQUESTED FS", "PRP DATE", "PLACE", "TOPIC NAME", "BRAND FOR PRP", "ESTIMATED PRP", "APPROVE/CONFIRMED TOTAL PRP", "PRP ADVANCE", "TOTAL BTC", "EXPECTED AUDIENCE", "TOTAL EXPECTED NO. OF DR ATTENDED", "NO. OF DR ATTENDED", "KOL ATTENDED", "PRP CONFIRMED DATE", "TOTAL COST FOR PRP", "TOTAL COST FOR BTC EXPENSE", "EXPENSE AGAINST ADVANCE", "EXPENSE CONFIRMATORY REMARKS", "EXPENSE CONFIRMED DATE"];
                    } else if (reportType == "RPSConsolrpt") {
                        responseData = result.data.data[0];
                        customColumnList = ["BTC ESTIMATED ", "BTC EXPENSE", "CANCELLATION REASON", "CONFIRMATOR REMARK", "DIVISION", "ESTIMATED RPS AMOUNT", "EXPENSE CONFIRMATORY REMARKS", "EXPENSE CONFIRMED DATE", "EXPENSE DESK CONFIRMATORY REMARKS", "EXPENSE DESK CONFIRMED DATE", "EXPENSE SUBMITTED DATE", "FS HQ", "FS REGION", "PENDING FOR APPROVAL", "PENDING FOR CONFIRMATION", "PENDING FOR DESK CONFIRMATION", "REQUEST DATE", "REQUESTED FS", "RPS ADVANCE RECEIVED", "RPS BRAND", "RPS DATE", "RPS EXPENSE AGAINST ADV", "RPS NO", "RPS TYPE", "SUBMITTED EXPENSE"];
                    }
                    let customReportHeader = customColumnList.map((key) =>
                        ({"title": key, "prop": key, "filterable": true})
                    )
                    let customDisplayColumns = customReportHeader.map(v => v.title);
                    
                    let customReportData = new Map();
                    let customBodyData = [];

                    if (reportType == "CompetitorProducts") {
                        responseData.map((a) => {
                            if (customReportData.get(a["FS NAME"]) != undefined) {
                                // console.log("FS NAME FOUND")
                                let doctorsMap = customReportData.get(a["FS NAME"])["DOCTOR_MAP"];
    
                                if (doctorsMap.get(a["DOCTOR CODE"]) != undefined) {
                                    // console.log("DOCTOR FOUND")
                                    let brandsMap = doctorsMap.get(a["DOCTOR CODE"])["BRAND_MAP"];
    
                                    if (brandsMap.get(a["BRAND NAME"]) != undefined) {
                                        // console.log("BRAND FOUND")
                                        let competitorProductMap = brandsMap.get(a["BRAND NAME"])["COMPETITOR_PRODUCT_MAP"];
    
                                        if (competitorProductMap.get(a["COMPETITOR PRODUCT"]) != undefined) {
                                            // console.log("COMP FOUND")
                                        } else {
                                            // console.log("COMP NOT FOUND")
                                            competitorProductMap.set(a["COMPETITOR PRODUCT"], {
                                                "COMPETITOR PRODUCT": a["COMPETITOR PRODUCT"],
                                                "C RX": a["CRX"],
                                                "C QUANTITY": a["C QUANTITY"],
                                                "C VALUE": a["C VALUE"]
                                            })
                                        }
                                    } else {
                                        // console.log("BRAND NOT FOUND")
                                        let competitorProductMap = new Map()
                                        competitorProductMap.set(a["COMPETITOR PRODUCT"], {
                                            "COMPETITOR PRODUCT": a["COMPETITOR PRODUCT"],
                                            "C RX": a["CRX"],
                                            "C QUANTITY": a["C QUANTITY"],
                                            "C VALUE": a["C VALUE"]
                                        })
                                        brandsMap.set(a["BRAND NAME"], {
                                            "BRAND NAME": a["BRAND NAME"], 
                                            "RX": a["#RX"],
                                            "QUANTITY": a["QUANTITY"], 
                                            "VALUE": a["VALUE"],
                                            "COMPETITOR_PRODUCT_MAP": competitorProductMap
                                        })
                                    }
                                } else {
                                    // console.log("DOCTOR NOT FOUND")
                                    let competitorProductMap = new Map()
                                    competitorProductMap.set(a["COMPETITOR PRODUCT"], {
                                        "COMPETITOR PRODUCT": a["COMPETITOR PRODUCT"],
                                        "C RX": a["CRX"],
                                        "C QUANTITY": a["C QUANTITY"],
                                        "C VALUE": a["C VALUE"]
                                    })
                                    let brandsMap = new Map()
                                    brandsMap.set(a["BRAND NAME"], {
                                        "BRAND NAME": a["BRAND NAME"], 
                                        "RX": a["#RX"],
                                        "QUANTITY": a["QUANTITY"], 
                                        "VALUE": a["VALUE"],
                                        "COMPETITOR_PRODUCT_MAP": competitorProductMap
                                    })
                                    doctorsMap.set(a["DOCTOR CODE"], {
                                        "DOCTOR CODE": a["DOCTOR CODE"],
                                        "DOCTOR NAME": a["DOCTOR NAME"],
                                        "CATEGORY": a["CATEGORY"],
                                        "DOCTOR GRADE": a["DOCTOR GRADE"],
                                        "BRAND_MAP": brandsMap
                                    })
                                }
                            } else {
                                // console.log("FS NAME NOT FOUND")
                                let competitorProductMap = new Map()
                                competitorProductMap.set(a["COMPETITOR PRODUCT"], {
                                    "COMPETITOR PRODUCT": a["COMPETITOR PRODUCT"],
                                    "C RX": a["CRX"],
                                    "C QUANTITY": a["C QUANTITY"],
                                    "C VALUE": a["C VALUE"]
                                })
                                let brandsMap = new Map()
                                brandsMap.set(a["BRAND NAME"], {
                                    "BRAND NAME": a["BRAND NAME"],
                                    "RX": a["#RX"],
                                    "QUANTITY": a["QUANTITY"], 
                                    "VALUE": a["VALUE"],
                                    "COMPETITOR_PRODUCT_MAP": competitorProductMap
                                })
                                let doctorMap = new Map()
                                doctorMap.set(a["DOCTOR CODE"], {
                                    "DOCTOR CODE": a["DOCTOR CODE"],
                                    "DOCTOR NAME": a["DOCTOR NAME"],
                                    "CATEGORY": a["CATEGORY"],
                                    "DOCTOR GRADE": a["DOCTOR GRADE"],
                                    "BRAND_MAP": brandsMap
                                })
                                customReportData.set(a["FS NAME"], {
                                    "FS NAME": a["FS NAME"],
                                    "DOCTOR_MAP": doctorMap
                                })
                            }
                        })
                    } else if (reportType == "CWCompProds") {
                        responseData.map((a) => {
                            if (customReportData.get(a["FS NAME"]) != undefined) {
                                // console.log("FS NAME FOUND")
                                let doctorsMap = customReportData.get(a["FS NAME"])["DOCTOR_MAP"];
    
                                if (doctorsMap.get(a["DOCTOR CODE"]) != undefined) {
                                    // console.log("DOCTOR FOUND")

                                    let chemistsMap = doctorsMap.get(a["DOCTOR CODE"])["CHEMIST_MAP"];

                                    if (chemistsMap.get(a["CHEMIST NAME"]) != undefined) {
                                        // console.log("CHEMIST FOUND")
                                        
                                        let brandsMap = chemistsMap.get(a["CHEMIST NAME"])["BRAND_MAP"];
    
                                        if (brandsMap.get(a["BRAND NAME"]) != undefined) {
                                            // console.log("BRAND FOUND")
                                            let competitorProductMap = brandsMap.get(a["BRAND NAME"])["COMPETITOR_PRODUCT_MAP"];
        
                                            if (competitorProductMap.get(a["COMPETITOR PRODUCT"]) != undefined) {
                                                // console.log("COMP FOUND")
                                                // SKIP
                                            } else {
                                                // console.log("COMP NOT FOUND")
                                                competitorProductMap.set(a["COMPETITOR PRODUCT"], {
                                                    "COMPETITOR PRODUCT": a["COMPETITOR PRODUCT"],
                                                    "C RX": a["C RX"],
                                                    "C QUANTITY": a["C QUANTITY"],
                                                    "C VALUE": a["C VALUE"]
                                                })
                                            }
                                        } else {
                                            // console.log("BRAND NOT FOUND")
                                            let competitorProductMap = new Map()
                                            competitorProductMap.set(a["COMPETITOR PRODUCT"], {
                                                "COMPETITOR PRODUCT": a["COMPETITOR PRODUCT"],
                                                "C RX": a["C RX"],
                                                "C QUANTITY": a["C QUANTITY"],
                                                "C VALUE": a["C VALUE"]
                                            })
                                            brandsMap.set(a["BRAND NAME"], {
                                                "BRAND NAME": a["BRAND NAME"], 
                                                "RX": a["#RX"],
                                                "QUANTITY": a["QUANTITY"], 
                                                "VALUE": a["VALUE"],
                                                "COMPETITOR_PRODUCT_MAP": competitorProductMap
                                            })
                                        }
                                    } else {
                                        // console.log("CHEMIST NOT FOUND")
                                        let competitorProductMap = new Map()
                                        competitorProductMap.set(a["COMPETITOR PRODUCT"], {
                                            "COMPETITOR PRODUCT": a["COMPETITOR PRODUCT"],
                                            "C RX": a["C RX"],
                                            "C QUANTITY": a["C QUANTITY"],
                                            "C VALUE": a["C VALUE"]
                                        })
                                        let brandsMap = new Map()
                                        brandsMap.set(a["BRAND NAME"], {
                                            "BRAND NAME": a["BRAND NAME"], 
                                            "RX": a["#RX"],
                                            "QUANTITY": a["QUANTITY"], 
                                            "VALUE": a["VALUE"],
                                            "COMPETITOR_PRODUCT_MAP": competitorProductMap
                                        })
                                        chemistsMap.set(a["CHEMIST NAME"], {
                                            "CHEMIST NAME": a["CHEMIST NAME"],
                                            "BRAND_MAP": brandsMap
                                        })
                                    }
                                } else {
                                    // console.log("DOCTOR NOT FOUND")
                                    let competitorProductMap = new Map()
                                    competitorProductMap.set(a["COMPETITOR PRODUCT"], {
                                        "COMPETITOR PRODUCT": a["COMPETITOR PRODUCT"],
                                        "C RX": a["C RX"],
                                        "C QUANTITY": a["C QUANTITY"],
                                        "C VALUE": a["C VALUE"]
                                    })
                                    let brandsMap = new Map()
                                    brandsMap.set(a["BRAND NAME"], {
                                        "BRAND NAME": a["BRAND NAME"], 
                                        "RX": a["#RX"],
                                        "QUANTITY": a["QUANTITY"], 
                                        "VALUE": a["VALUE"],
                                        "COMPETITOR_PRODUCT_MAP": competitorProductMap
                                    })
                                    let chemistsMap = new Map()
                                    chemistsMap.set(a["CHEMIST NAME"], {
                                        "CHEMIST NAME": a["CHEMIST NAME"],
                                        "BRAND_MAP": brandsMap
                                    })
                                    doctorsMap.set(a["DOCTOR CODE"], {
                                        "DOCTOR CODE": a["DOCTOR CODE"],
                                        "DOCTOR NAME": a["DOCTOR NAME"],
                                        "CATEGORY": a["CATEGORY"],
                                        "DOCTOR GRADE": a["GRADE"],
                                        "CHEMIST_MAP": chemistsMap
                                    })
                                }
                            } else {
                                // console.log("FS NAME NOT FOUND")
                                let competitorProductMap = new Map()
                                competitorProductMap.set(a["COMPETITOR PRODUCT"], {
                                    "COMPETITOR PRODUCT": a["COMPETITOR PRODUCT"],
                                    "C RX": a["C RX"],
                                    "C QUANTITY": a["C QUANTITY"],
                                    "C VALUE": a["C VALUE"]
                                })
                                let brandsMap = new Map()
                                brandsMap.set(a["BRAND NAME"], {
                                    "BRAND NAME": a["BRAND NAME"], 
                                    "RX": a["#RX"],
                                    "QUANTITY": a["QUANTITY"], 
                                    "VALUE": a["VALUE"],
                                    "COMPETITOR_PRODUCT_MAP": competitorProductMap
                                })
                                let chemistsMap = new Map()
                                chemistsMap.set(a["CHEMIST NAME"], {
                                    "CHEMIST NAME": a["CHEMIST NAME"],
                                    "BRAND_MAP": brandsMap
                                })
                                let doctorMap = new Map()
                                doctorMap.set(a["DOCTOR CODE"], {
                                    "DOCTOR CODE": a["DOCTOR CODE"],
                                    "DOCTOR NAME": a["DOCTOR NAME"],
                                    "CATEGORY": a["CATEGORY"],
                                    "DOCTOR GRADE": a["GRADE"],
                                    "CHEMIST_MAP": chemistsMap
                                })
                                customReportData.set(a["FS NAME"], {
                                    "FS NAME": a["FS NAME"],
                                    "DOCTOR_MAP": doctorMap
                                })
                            }
                        })
                    } else if (reportType == "PrpDetailsRpt" || reportType == "RPSConsolrpt") {
                        responseData.map((a) => {
                            let row = {}
                            customColumnList.map((b) => {
                                row[b] = a[b]
                            })
                            customBodyData.push(row)
                        })
                    }

                    // console.log("THE-END", customReportData)
                    // TODO: ABOVE CODE CAN BE OPTIMIZED WITH FUNCTIONS

                    let finalTotalRx =0
                    let finalTotalQuantity = 0
                    let finalTotalValue = 0
                    let finalTotalCompetitorRx = 0
                    let finalTotalCompetitorQuantity = 0
                    let finalTotalCompetitorValue = 0

                    let totalRx = 0
                    let totalQuantity = 0
                    let totalValue = 0
                    let totalCompetitorRx = 0
                    let totalCompetitorQuantity = 0
                    let totalCompetitorValue = 0

                    let isFirstItemOverForTotal = false;

                    let isAtleastOneRowAvailable = false;

                    if (reportType == "CompetitorProducts") {
                        customReportData.forEach(function(data, key) {
                            isAtleastOneRowAvailable = true;
    
                            let isFsNameDone = false;
                            let isFsNameDoctorDone = false;
                            let isFsNameDoctorBrandDone = false;
    
                            let fsName = data["FS NAME"];
                            let doctorMap = data["DOCTOR_MAP"];
                            
                            doctorMap.forEach(function(doctorData, key) {
                                let isDoctorDone = false;
                                let isDoctorBrandDone = false;
        
                                if (isFsNameDone) {
                                    isFsNameDoctorDone = true;
                                }
    
                                if (isFirstItemOverForTotal) {
                                    let rowObject = {
                                        "FS NAME": "",
                                        "DOCTOR CODE": "",
                                        "DOCTOR NAME": "",
                                        "CATEGORY": "",
                                        "DOCTOR GRADE": "",
                                        "BRAND NAME": "TOTAL",
                                        "RX": totalRx.toFixed(2),
                                        "QUANTITY": totalQuantity.toFixed(2),
                                        "VALUE": totalValue.toFixed(2),
                                        "COMPETITOR PRODUCT": "",
                                        "C RX": totalCompetitorRx.toFixed(2),
                                        "C QUANTITY": totalCompetitorQuantity.toFixed(2),
                                        "C VALUE": totalCompetitorValue.toFixed(2)
                                    }
    
                                    customBodyData.push(rowObject);
    
                                    totalRx = 0
                                    totalQuantity = 0
                                    totalValue = 0
                                    totalCompetitorRx = 0
                                    totalCompetitorQuantity = 0
                                    totalCompetitorValue = 0
                                } else {
                                    isFirstItemOverForTotal = true
                                }
    
                                let doctorCode = doctorData["DOCTOR CODE"];
                                let doctorName = doctorData["DOCTOR NAME"];
                                let doctorCategory = doctorData["CATEGORY"];
                                let doctorGrade = doctorData["DOCTOR GRADE"];
                                let brandMap = doctorData["BRAND_MAP"];
    
                                brandMap.forEach(function(brandData, key) {
                                    let isBrandDone = false;
    
                                    if (isDoctorDone) {
                                        isDoctorBrandDone = true;
                                    }

                                    if (isFsNameDone) {
                                        isFsNameDoctorBrandDone = true;
                                    }
    
                                    let brandName = brandData["BRAND NAME"];
                                    let brandRx = brandData["RX"];
                                    let brandQuantity = brandData["QUANTITY"];
                                    let brandValue = brandData["VALUE"];
                                    let competitorProductMap = brandData["COMPETITOR_PRODUCT_MAP"];
    
                                    totalRx += Number(brandRx);
                                    totalQuantity += Number(brandQuantity);
                                    totalValue += Number(brandValue);
    
                                    finalTotalRx += Number(brandRx);
                                    finalTotalQuantity += Number(brandQuantity);
                                    finalTotalValue += Number(brandValue);
    
                                    competitorProductMap.forEach(function(competitorProductData, key) {
                                        let competitorProduct = competitorProductData["COMPETITOR PRODUCT"];
                                        let competitorProductRx = competitorProductData["C RX"];
                                        let competitorProductQuantity = competitorProductData["C QUANTITY"];
                                        let competitorProductValue = competitorProductData["C VALUE"];
                                        
                                        totalCompetitorRx += Number(competitorProductRx);
                                        totalCompetitorQuantity += Number(competitorProductQuantity);
                                        totalCompetitorValue += Number(competitorProductValue);
    
                                        finalTotalCompetitorRx += Number(competitorProductRx);
                                        finalTotalCompetitorQuantity += Number(competitorProductQuantity);
                                        finalTotalCompetitorValue += Number(competitorProductValue);
    
                                        if (!isFsNameDone) {
                                            isFsNameDone = true;
    
                                            let rowObject = {
                                                "FS NAME": fsName,
                                                "DOCTOR CODE": doctorCode,
                                                "DOCTOR NAME": doctorName,
                                                "CATEGORY": doctorCategory,
                                                "DOCTOR GRADE": doctorGrade,
                                                "BRAND NAME": brandName,
                                                "RX": brandRx,
                                                "QUANTITY": brandQuantity,
                                                "VALUE": brandValue,
                                                "COMPETITOR PRODUCT": competitorProduct,
                                                "C RX": competitorProductRx,
                                                "C QUANTITY": competitorProductQuantity,
                                                "C VALUE": competitorProductValue
                                            }
    
                                            // console.log("1");
                                            customBodyData.push(rowObject);
                                        } else {
                                            fsName = ""

                                            if (!isFsNameDoctorBrandDone && !isFsNameDoctorDone && !isDoctorDone) {
                                                let rowObject = {
                                                    "FS NAME": fsName,
                                                    "DOCTOR CODE": "",
                                                    "DOCTOR NAME": "",
                                                    "CATEGORY": "",
                                                    "DOCTOR GRADE": "",
                                                    "BRAND NAME": "",
                                                    "RX": "",
                                                    "QUANTITY": "",
                                                    "VALUE": "",
                                                    "COMPETITOR PRODUCT": competitorProduct,
                                                    "C RX": competitorProductRx,
                                                    "C QUANTITY": competitorProductQuantity,
                                                    "C VALUE": competitorProductValue
                                                }
    
                                                // console.log("2");
                                                customBodyData.push(rowObject);
                                            } else if (isFsNameDoctorBrandDone && !isFsNameDoctorDone && !isDoctorDone) {
                                                isDoctorDone = true;
                                                
                                                let rowObject = {
                                                    "FS NAME": fsName,
                                                    "DOCTOR CODE": "",
                                                    "DOCTOR NAME": "",
                                                    "CATEGORY": "",
                                                    "DOCTOR GRADE": "",
                                                    "BRAND NAME": brandName,
                                                    "RX": brandRx,
                                                    "QUANTITY": brandQuantity,
                                                    "VALUE": brandValue,
                                                    "COMPETITOR PRODUCT": competitorProduct,
                                                    "C RX": competitorProductRx,
                                                    "C QUANTITY": competitorProductQuantity,
                                                    "C VALUE": competitorProductValue
                                                }
            
                                                // console.log("3");
                                                customBodyData.push(rowObject);
                                            } else if (isFsNameDoctorBrandDone && isFsNameDoctorDone && !isDoctorDone) {
                                                isDoctorDone = true;
            
                                                let rowObject = {
                                                    "FS NAME": fsName,
                                                    "DOCTOR CODE": doctorCode,
                                                    "DOCTOR NAME": doctorName,
                                                    "CATEGORY": doctorCategory,
                                                    "DOCTOR GRADE": doctorGrade,
                                                    "BRAND NAME": brandName,
                                                    "RX": brandRx,
                                                    "QUANTITY": brandQuantity,
                                                    "VALUE": brandValue,
                                                    "COMPETITOR PRODUCT": competitorProduct,
                                                    "C RX": competitorProductRx,
                                                    "C QUANTITY": competitorProductQuantity,
                                                    "C VALUE": competitorProductValue
                                                }
            
                                                // console.log("4");
                                                customBodyData.push(rowObject);
                                            } else {
                                                doctorCode = "";
                                                doctorName = "";
                                                doctorCategory = "";
                                                doctorGrade = "";

                                                if (!isDoctorBrandDone && !isBrandDone) {
                                                    let rowObject = {
                                                        "FS NAME": fsName,
                                                        "DOCTOR CODE": doctorCode,
                                                        "DOCTOR NAME": doctorName,
                                                        "CATEGORY": doctorCategory,
                                                        "DOCTOR GRADE": doctorGrade,
                                                        "BRAND NAME": "",
                                                        "RX": "",
                                                        "QUANTITY": "",
                                                        "VALUE": "",
                                                        "COMPETITOR PRODUCT": competitorProduct,
                                                        "C RX": competitorProductRx,
                                                        "C QUANTITY": competitorProductQuantity,
                                                        "C VALUE": competitorProductValue
                                                    }
                
                                                    // console.log("5");
                                                    customBodyData.push(rowObject);
                                                } else if (isDoctorBrandDone && !isBrandDone) {
                                                    isBrandDone = true;
            
                                                    let rowObject = {
                                                        "FS NAME": fsName,
                                                        "DOCTOR CODE": doctorCode,
                                                        "DOCTOR NAME": doctorName,
                                                        "CATEGORY": doctorCategory,
                                                        "DOCTOR GRADE": doctorGrade,
                                                        "BRAND NAME": brandName,
                                                        "RX": brandRx,
                                                        "QUANTITY": brandQuantity,
                                                        "VALUE": brandValue,
                                                        "COMPETITOR PRODUCT": competitorProduct,
                                                        "C RX": competitorProductRx,
                                                        "C QUANTITY": competitorProductQuantity,
                                                        "C VALUE": competitorProductValue
                                                    }
                
                                                    // console.log("6");
                                                    customBodyData.push(rowObject);
                                                } else {
                                                    brandName = "";
                                                    brandRx = "";
                                                    brandQuantity = "";
                                                    brandValue = "";
    
                                                    let rowObject = {
                                                        "FS NAME": fsName,
                                                        "DOCTOR CODE": doctorCode,
                                                        "DOCTOR NAME": doctorName,
                                                        "CATEGORY": doctorCategory,
                                                        "DOCTOR GRADE": doctorGrade,
                                                        "BRAND NAME": brandName,
                                                        "RX": brandRx,
                                                        "QUANTITY": brandQuantity,
                                                        "VALUE": brandValue,
                                                        "COMPETITOR PRODUCT": competitorProduct,
                                                        "C RX": competitorProductRx,
                                                        "C QUANTITY": competitorProductQuantity,
                                                        "C VALUE": competitorProductValue
                                                    }
                
                                                    // console.log("7");
                                                    customBodyData.push(rowObject);
                                                }
                                            }
                                        }
                                    });
                                });
                            });
                        });
    
                        if (isAtleastOneRowAvailable) {
                            let rowObject = {
                                "FS NAME": "",
                                "DOCTOR CODE": "",
                                "DOCTOR NAME": "",
                                "CATEGORY": "",
                                "DOCTOR GRADE": "",
                                "BRAND NAME": "TOTAL",
                                "RX": totalRx.toFixed(2),
                                "QUANTITY": totalQuantity.toFixed(2),
                                "VALUE": totalValue.toFixed(2),
                                "COMPETITOR PRODUCT": "",
                                "C RX": totalCompetitorRx.toFixed(2),
                                "C QUANTITY": totalCompetitorQuantity.toFixed(2),
                                "C VALUE": totalCompetitorValue.toFixed(2)
                            }
        
                            customBodyData.push(rowObject);
        
                            let rowObjectNew = {
                                "FS NAME": "",
                                "DOCTOR CODE": "",
                                "DOCTOR NAME": "",
                                "CATEGORY": "",
                                "DOCTOR GRADE": "",
                                "BRAND NAME": "ALL TOTAL",
                                "RX": finalTotalRx.toFixed(2),
                                "QUANTITY": finalTotalQuantity.toFixed(2),
                                "VALUE": finalTotalValue.toFixed(2),
                                "COMPETITOR PRODUCT": "",
                                "C RX": finalTotalCompetitorRx.toFixed(2),
                                "C QUANTITY": finalTotalCompetitorQuantity.toFixed(2),
                                "C VALUE": finalTotalCompetitorValue.toFixed(2)
                            }
        
                            customBodyData.push(rowObjectNew);
                        }
                    } else if (reportType == "CWCompProds") {
                        customReportData.forEach(function(data, key) {
                            // console.log("LoopFS");

                            isAtleastOneRowAvailable = true;
    
                            let isFsNameDone = false;
                            let isFsNameDoctorDone = false;
                            let isFsNameDoctorChemistDone = false;
                            let isFsNameDoctorChemistBrandDone = false;
    
                            let fsName = data["FS NAME"];
                            let doctorMap = data["DOCTOR_MAP"];
                            
                            doctorMap.forEach(function(doctorData, key) {
                                // console.log("LoopDoctor");

                                let isDoctorDone = false;
                                let isDoctorChemistDone = false;
                                let isDoctorChemistBrandDone = false;
        
                                if (isFsNameDone) {
                                    isFsNameDoctorDone = true;
                                }
    
                                if (isFirstItemOverForTotal) {
                                    let rowObject = {
                                        "FS NAME": "",
                                        "DOCTOR CODE": "",
                                        "DOCTOR NAME": "",
                                        "CATEGORY": "",
                                        "DOCTOR GRADE": "",
                                        "CHEMIST NAME": "",
                                        "BRAND NAME": "TOTAL",
                                        "RX": totalRx.toFixed(2),
                                        "QUANTITY": totalQuantity.toFixed(2),
                                        "VALUE": totalValue.toFixed(2),
                                        "COMPETITOR PRODUCT": "",
                                        "C RX": totalCompetitorRx.toFixed(2),
                                        "C QUANTITY": totalCompetitorQuantity.toFixed(2),
                                        "C VALUE": totalCompetitorValue.toFixed(2)
                                    }
    
                                    customBodyData.push(rowObject);
    
                                    totalRx = 0
                                    totalQuantity = 0
                                    totalValue = 0
                                    totalCompetitorRx = 0
                                    totalCompetitorQuantity = 0
                                    totalCompetitorValue = 0
                                } else {
                                    isFirstItemOverForTotal = true
                                }
    
                                let doctorCode = doctorData["DOCTOR CODE"];
                                let doctorName = doctorData["DOCTOR NAME"];
                                let doctorCategory = doctorData["CATEGORY"];
                                let doctorGrade = doctorData["DOCTOR GRADE"];
                                let chemistMap = doctorData["CHEMIST_MAP"];
    
                                chemistMap.forEach(function(chemistData, key) {
                                    // console.log("LoopChemist");

                                    let isChemistDone = false;
                                    let isChemistBrandDone = false;

                                    if (isDoctorDone) {
                                        isDoctorChemistDone = true;
                                    }

                                    if (isFsNameDone) {
                                        isFsNameDoctorChemistDone = true;
                                    }

                                    let chemistName = chemistData["CHEMIST NAME"];
                                    let brandMap = chemistData["BRAND_MAP"];
        
                                    brandMap.forEach(function(brandData, key) {
                                        // console.log("LoopBrand");

                                        let isBrandDone = false;
        
                                        if (isChemistDone) {
                                            isChemistBrandDone = true;
                                        }

                                        if (isDoctorDone) {
                                            isDoctorChemistBrandDone = true;
                                        }

                                        if (isFsNameDone) {
                                            isFsNameDoctorChemistBrandDone = true;
                                        }
        
                                        let brandName = brandData["BRAND NAME"];
                                        let brandRx = brandData["RX"];
                                        let brandQuantity = brandData["QUANTITY"];
                                        let brandValue = brandData["VALUE"];
                                        let competitorProductMap = brandData["COMPETITOR_PRODUCT_MAP"];

                                        totalRx += Number(brandRx);
                                        totalQuantity += Number(brandQuantity);
                                        totalValue += Number(brandValue);
        
                                        finalTotalRx += Number(brandRx);
                                        finalTotalQuantity += Number(brandQuantity);
                                        finalTotalValue += Number(brandValue);
        
                                        competitorProductMap.forEach(function(competitorProductData, key) {
                                            // console.log("LoopCompetitor");

                                            let competitorProduct = competitorProductData["COMPETITOR PRODUCT"];
                                            let competitorProductRx = competitorProductData["C RX"];
                                            let competitorProductQuantity = competitorProductData["C QUANTITY"];
                                            let competitorProductValue = competitorProductData["C VALUE"];

                                            totalCompetitorRx += Number(competitorProductRx);
                                            totalCompetitorQuantity += Number(competitorProductQuantity);
                                            totalCompetitorValue += Number(competitorProductValue);
        
                                            finalTotalCompetitorRx += Number(competitorProductRx);
                                            finalTotalCompetitorQuantity += Number(competitorProductQuantity);
                                            finalTotalCompetitorValue += Number(competitorProductValue);
        
                                            if (!isFsNameDone) {
                                                isFsNameDone = true;
        
                                                let rowObject = {
                                                    "FS NAME": fsName,
                                                    "DOCTOR CODE": doctorCode,
                                                    "DOCTOR NAME": doctorName,
                                                    "CATEGORY": doctorCategory,
                                                    "DOCTOR GRADE": doctorGrade,
                                                    "CHEMIST NAME": chemistName,
                                                    "BRAND NAME": brandName,
                                                    "RX": brandRx,
                                                    "QUANTITY": brandQuantity,
                                                    "VALUE": brandValue,
                                                    "COMPETITOR PRODUCT": competitorProduct,
                                                    "C RX": competitorProductRx,
                                                    "C QUANTITY": competitorProductQuantity,
                                                    "C VALUE": competitorProductValue
                                                }

                                                // console.log("1");
                                                customBodyData.push(rowObject);
                                            } else {
                                                fsName = ""
                                                
                                                if (!isFsNameDoctorChemistBrandDone && !isFsNameDoctorChemistDone && !isFsNameDoctorDone && !isDoctorDone) {
                                                    let rowObject = {
                                                        "FS NAME": fsName,
                                                        "DOCTOR CODE": "",
                                                        "DOCTOR NAME": "",
                                                        "CATEGORY": "",
                                                        "DOCTOR GRADE": "",
                                                        "CHEMIST NAME": "",
                                                        "BRAND NAME": "",
                                                        "RX": "",
                                                        "QUANTITY": "",
                                                        "VALUE": "",
                                                        "COMPETITOR PRODUCT": competitorProduct,
                                                        "C RX": competitorProductRx,
                                                        "C QUANTITY": competitorProductQuantity,
                                                        "C VALUE": competitorProductValue
                                                    }
        
                                                    // console.log("2");
                                                    customBodyData.push(rowObject);
                                                } else if (isFsNameDoctorChemistBrandDone && !isFsNameDoctorChemistDone && !isFsNameDoctorDone && !isDoctorDone) {
                                                    isDoctorDone = true;
            
                                                    let rowObject = {
                                                        "FS NAME": fsName,
                                                        "DOCTOR CODE": "",
                                                        "DOCTOR NAME": "",
                                                        "CATEGORY": "",
                                                        "DOCTOR GRADE": "",
                                                        "CHEMIST NAME": "",
                                                        "BRAND NAME": brandName,
                                                        "RX": brandRx,
                                                        "QUANTITY": brandQuantity,
                                                        "VALUE": brandValue,
                                                        "COMPETITOR PRODUCT": competitorProduct,
                                                        "C RX": competitorProductRx,
                                                        "C QUANTITY": competitorProductQuantity,
                                                        "C VALUE": competitorProductValue
                                                    }
                
                                                    // console.log("3");
                                                    customBodyData.push(rowObject);
                                                } else if (isFsNameDoctorChemistBrandDone && isFsNameDoctorChemistDone && !isFsNameDoctorDone && !isDoctorDone) {
                                                    isDoctorDone = true;
            
                                                    let rowObject = {
                                                        "FS NAME": fsName,
                                                        "DOCTOR CODE": "",
                                                        "DOCTOR NAME": "",
                                                        "CATEGORY": "",
                                                        "DOCTOR GRADE": "",
                                                        "CHEMIST NAME": chemistName,
                                                        "BRAND NAME": brandName,
                                                        "RX": brandRx,
                                                        "QUANTITY": brandQuantity,
                                                        "VALUE": brandValue,
                                                        "COMPETITOR PRODUCT": competitorProduct,
                                                        "C RX": competitorProductRx,
                                                        "C QUANTITY": competitorProductQuantity,
                                                        "C VALUE": competitorProductValue
                                                    }
                
                                                    // console.log("4");
                                                    customBodyData.push(rowObject);
                                                } else if (isFsNameDoctorChemistBrandDone && isFsNameDoctorChemistDone && isFsNameDoctorDone && !isDoctorDone) {
                                                    isDoctorDone = true;
            
                                                    let rowObject = {
                                                        "FS NAME": fsName,
                                                        "DOCTOR CODE": doctorCode,
                                                        "DOCTOR NAME": doctorName,
                                                        "CATEGORY": doctorCategory,
                                                        "DOCTOR GRADE": doctorGrade,
                                                        "CHEMIST NAME": chemistName,
                                                        "BRAND NAME": brandName,
                                                        "RX": brandRx,
                                                        "QUANTITY": brandQuantity,
                                                        "VALUE": brandValue,
                                                        "COMPETITOR PRODUCT": competitorProduct,
                                                        "C RX": competitorProductRx,
                                                        "C QUANTITY": competitorProductQuantity,
                                                        "C VALUE": competitorProductValue
                                                    }
                
                                                    // console.log("5");
                                                    customBodyData.push(rowObject);
                                                } else {
                                                    doctorCode = "";
                                                    doctorName = "";
                                                    doctorCategory = "";
                                                    doctorGrade = "";
        
                                                    if (!isDoctorChemistBrandDone && !isDoctorChemistDone && !isChemistDone) {
                                                        let rowObject = {
                                                            "FS NAME": fsName,
                                                            "DOCTOR CODE": doctorCode,
                                                            "DOCTOR NAME": doctorName,
                                                            "CATEGORY": doctorCategory,
                                                            "DOCTOR GRADE": doctorGrade,
                                                            "CHEMIST NAME": "",
                                                            "BRAND NAME": "",
                                                            "RX": "",
                                                            "QUANTITY": "",
                                                            "VALUE": "",
                                                            "COMPETITOR PRODUCT": competitorProduct,
                                                            "C RX": competitorProductRx,
                                                            "C QUANTITY": competitorProductQuantity,
                                                            "C VALUE": competitorProductValue
                                                        }
                    
                                                        // console.log("6");
                                                        customBodyData.push(rowObject);
                                                    } else if (isDoctorChemistBrandDone && !isDoctorChemistDone && !isChemistDone) {
                                                        isChemistDone = true;
                    
                                                        let rowObject = {
                                                            "FS NAME": fsName,
                                                            "DOCTOR CODE": "",
                                                            "DOCTOR NAME": "",
                                                            "CATEGORY": "",
                                                            "DOCTOR GRADE": "",
                                                            "CHEMIST NAME": "",
                                                            "BRAND NAME": brandName,
                                                            "RX": brandRx,
                                                            "QUANTITY": brandQuantity,
                                                            "VALUE": brandValue,
                                                            "COMPETITOR PRODUCT": competitorProduct,
                                                            "C RX": competitorProductRx,
                                                            "C QUANTITY": competitorProductQuantity,
                                                            "C VALUE": competitorProductValue
                                                        }
                    
                                                        // console.log("7");
                                                        customBodyData.push(rowObject);
                                                    } else if (isDoctorChemistBrandDone && isDoctorChemistDone && !isChemistDone) {
                                                        isChemistDone = true;
                    
                                                        let rowObject = {
                                                            "FS NAME": fsName,
                                                            "DOCTOR CODE": "",
                                                            "DOCTOR NAME": "",
                                                            "CATEGORY": "",
                                                            "DOCTOR GRADE": "",
                                                            "CHEMIST NAME": chemistName,
                                                            "BRAND NAME": brandName,
                                                            "RX": brandRx,
                                                            "QUANTITY": brandQuantity,
                                                            "VALUE": brandValue,
                                                            "COMPETITOR PRODUCT": competitorProduct,
                                                            "C RX": competitorProductRx,
                                                            "C QUANTITY": competitorProductQuantity,
                                                            "C VALUE": competitorProductValue
                                                        }
                    
                                                        // console.log("8");
                                                        customBodyData.push(rowObject);
                                                    } else {
                                                        chemistName = "";

                                                        if (!isChemistBrandDone && !isBrandDone) {
                                                            let rowObject = {
                                                                "FS NAME": fsName,
                                                                "DOCTOR CODE": doctorCode,
                                                                "DOCTOR NAME": doctorName,
                                                                "CATEGORY": doctorCategory,
                                                                "DOCTOR GRADE": doctorGrade,
                                                                "CHEMIST NAME": chemistName,
                                                                "BRAND NAME": "",
                                                                "RX": "",
                                                                "QUANTITY": "",
                                                                "VALUE": "",
                                                                "COMPETITOR PRODUCT": competitorProduct,
                                                                "C RX": competitorProductRx,
                                                                "C QUANTITY": competitorProductQuantity,
                                                                "C VALUE": competitorProductValue
                                                            }
                        
                                                            // console.log("9");
                                                            customBodyData.push(rowObject);
                                                        } else if (isChemistBrandDone && !isBrandDone) {
                                                            isBrandDone = true;
                    
                                                            let rowObject = {
                                                                "FS NAME": fsName,
                                                                "DOCTOR CODE": doctorCode,
                                                                "DOCTOR NAME": doctorName,
                                                                "CATEGORY": doctorCategory,
                                                                "DOCTOR GRADE": doctorGrade,
                                                                "CHEMIST NAME": chemistName,
                                                                "BRAND NAME": brandName,
                                                                "RX": brandRx,
                                                                "QUANTITY": brandQuantity,
                                                                "VALUE": brandValue,
                                                                "COMPETITOR PRODUCT": competitorProduct,
                                                                "C RX": competitorProductRx,
                                                                "C QUANTITY": competitorProductQuantity,
                                                                "C VALUE": competitorProductValue
                                                            }
                        
                                                            // console.log("10");
                                                            customBodyData.push(rowObject);
                                                        } else {
                                                            brandName = "";
                                                            brandRx = "";
                                                            brandQuantity = "";
                                                            brandValue = "";
            
                                                            let rowObject = {
                                                                "FS NAME": fsName,
                                                                "DOCTOR CODE": doctorCode,
                                                                "DOCTOR NAME": doctorName,
                                                                "CATEGORY": doctorCategory,
                                                                "DOCTOR GRADE": doctorGrade,
                                                                "CHEMIST NAME": chemistName,
                                                                "BRAND NAME": brandName,
                                                                "RX": brandRx,
                                                                "QUANTITY": brandQuantity,
                                                                "VALUE": brandValue,
                                                                "COMPETITOR PRODUCT": competitorProduct,
                                                                "C RX": competitorProductRx,
                                                                "C QUANTITY": competitorProductQuantity,
                                                                "C VALUE": competitorProductValue
                                                            }
                        
                                                            // console.log("11");
                                                            customBodyData.push(rowObject);
                                                        }
                                                    }
                                                }
                                            }
                                        });
                                    });
                                })
                            });
                        });
    
                        if (isAtleastOneRowAvailable) {
                            let rowObject = {
                                "FS NAME": "",
                                "DOCTOR CODE": "",
                                "DOCTOR NAME": "",
                                "CATEGORY": "",
                                "DOCTOR GRADE": "",
                                "CHEMIST NAME": "",
                                "BRAND NAME": "TOTAL",
                                "RX": totalRx.toFixed(2),
                                "QUANTITY": totalQuantity.toFixed(2),
                                "VALUE": totalValue.toFixed(2),
                                "COMPETITOR PRODUCT": "",
                                "C RX": totalCompetitorRx.toFixed(2),
                                "C QUANTITY": totalCompetitorQuantity.toFixed(2),
                                "C VALUE": totalCompetitorValue.toFixed(2)
                            }
        
                            customBodyData.push(rowObject);
        
                            let rowObjectNew = {
                                "FS NAME": "",
                                "DOCTOR CODE": "",
                                "DOCTOR NAME": "",
                                "CATEGORY": "",
                                "DOCTOR GRADE": "",
                                "CHEMIST NAME": "",
                                "BRAND NAME": "GRAND TOTAL",
                                "RX": finalTotalRx.toFixed(2),
                                "QUANTITY": finalTotalQuantity.toFixed(2),
                                "VALUE": finalTotalValue.toFixed(2),
                                "COMPETITOR PRODUCT": "",
                                "C RX": finalTotalCompetitorRx.toFixed(2),
                                "C QUANTITY": finalTotalCompetitorQuantity.toFixed(2),
                                "C VALUE": finalTotalCompetitorValue.toFixed(2)
                            }
        
                            customBodyData.push(rowObjectNew);
                        }
                    }

                    //console.log("XFINAL", customColumnList, customBodyData, customReportHeader, customDisplayColumns);

                    _this.setState({ columnlist: customColumnList, reportData: customBodyData, reportHeader: customReportHeader, displayedColumns: customDisplayColumns, loader: false})
                } else {
                    this.setState({  loader:false,reportLabel:" There is no data to be displayed ................... "  })
                }
            })
    }

    report_view_data(report_parameter) {
        this.setState({ loader:true,reportData: [], reportHeader:[] })
        const { report_id } = this.props
        var data1 = {
            id: report_id, 
            index: "3",
            parameter: report_parameter
        }

        postToServer(URL_REPORT, data1)
            .then((result) => {
                if (result.data ) {
                    let data = result.data["Data"]
                    let data2 = result.data["Columns"]
                    let columns = result.data["Columns"].map((key) =>
                        ({"title": key, "prop": key, "filterable": true})
                    )
                    let displayedColumns = columns.map(v => v.title)
                    let Newbody=[]
                    
                    data.map((a)=> {
                        let test = {}
                        
                        data2.map((b)=> {
                            test[b] = a[b]
                        })
                        
                        Newbody.push(test)
                    })

                    this.setState({columnlist: data2, reportData: Newbody, reportHeader: columns, displayedColumns,loader:false })
                    //console.log(" working ")
                } else {
                    this.setState({  loader:false,reportLabel:" There is no data to be displayed ................... "  })
                }
            })
    }

    render() {
        const { reportData, reportHeader, displayedColumns,displayedColumnsheader,reportHeaderdata } = this.state
        this.state.rowsPerPage = 100
        const { sortedProp, filterText, currentPage, rowsPerPage } = this.state;
        const { onSort, onFilter, keyName,keyName1, labels,  reportparameter, report_id } = this.props;
        let useHeader = reportHeader.filter((v) => {
            return displayedColumns.find(n => n==v.title)
        })
        const filteredData = filterData(useHeader, filterText, onFilter,reportData);
        const sortedData = sortData(sortedProp, onSort, filteredData);
        const paginatedData = paginateData(rowsPerPage, currentPage, sortedData);
        const paginatedData1 = paginateData(reportData.length, currentPage, sortedData);
        const rowsPerPageOption=[10, 15, 20, reportData.length ]
        
        let checkBoxes = null
        if (this.state.columnlist.length > 0)       
            checkBoxes = this.state.columnlist.map((n) => {
            n = n.charAt(0).toUpperCase() + n.slice(1)
            let checked =displayedColumns.find(v => v == n)
            return(
                <Form.Check
                    id={ "checkbox" + n }
                    key={ n }
                    name={ n }
                    type="checkbox"
                    label={ n }
                    checked = { !!checked }
                    className="column-label"
                    onChange={ this.changeDisplayedColumns.bind(this)  }
                    custom
                />
            )
        })
        return (
            <div>
                <Loder show={this.state.loader}></Loder>
                <div className="dcr-table-options">
                    {/* <div className="pagination-opts">
                        <PaginationOpts
                            labels={labels.noResults=this.state.reportLabel}
                            onRowsPerPageChange={this.onRowsPerPageChange}
                            rowsPerPage={rowsPerPage}
                            rowsPerPageOption={rowsPerPageOption}
                            keyName={keyName}
                        />
                        <div className="hidetable">
                        <PaginationOpts
                            labels={labels.noResults=this.state.reportLabel}
                            onRowsPerPageChange={this.onRowsPerPageChange}
                            rowsPerPage={reportData.length}
                            rowsPerPageOption={reportData.length}
                            keyName={keyName1}
                        />
                        </div>
                    </div> */}
                    <div className="other-ops">
                        <Dropdown>
                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                <img src="../public/assets/images/columns.svg" alt="column_img" />
                                <span>Column Option</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="column-dropdown">
                                <div className="topPad">
                                    <p className="column-head">Columns to be shown</p>
                                </div>
                                <div className="pad10 repoCol">
                                    {checkBoxes}
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown className="reportExport">
                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                <img src="../public/assets/images/export.svg" alt="export_img" />
                                <span>Export</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="export-dropdown">
                                <div className="export-ops">
                                    <div>
                                        <img src="../public/assets/images/excel.svg" alt="excel" />
                                        <ReactHTMLTableToExcel
                                            id="test-table-xls-button"
                                            className="download-table-xls-button"
                                            table="table-to-xls"
                                            filename="tablexls.csv"
                                            sheet="tablexls.csv"
                                            buttonText="Excel"/>
                                   </div>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic">
                                <img src="../public/assets/images/filter.svg" alt="filter_img" />
                                <span>Retrieval Option</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="Repothers-dropdown">
                                <SRRetrivalOption
                                    updateData={this.updateData.bind(this)}
                                    reportparameter={reportparameter}
                                    report_id={report_id}
                                    updateFormData={this.updateFormData.bind(this)}
                                />
                                <Dropdown.Item eventKey="1">
                                    <button className="gradient-btn "  onClick={() => this.data_view()}>Apply</button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Filter 
                            tableHeader={useHeader} 
                            onChangeFilter={this.onChangeFilter} 
                            filterText={filterText} 
                            keyName={keyName} 
                            placeholder={labels.filterPlaceholder}
                        />
                    </div>
                </div>
                <Row>
                    <Col xs={12} className="datatable">
                        <div className="table-responsive dcrtableheight">
                            <Table  id="table-to-xls" className="hidetable">
                                <TableHeader 
                                    tableHeader={useHeader}
                                    keyName={keyName1}
                                    sortedProp={sortedProp}
                                    onSortChange={this.onSortChange}
                                />
                                <TableBody
                                    tableHeader={useHeader}
                                    keyName={keyName1}
                                    labels={labels}
                                    paginatedData={paginatedData1}
                                />
                            </Table>
                            <Table  id="hidetable">
                                <TableHeader 
                                    tableHeader={useHeader}
                                    keyName={keyName}
                                    sortedProp={sortedProp}
                                    onSortChange={this.onSortChange}
                                />
                                <TableBody
                                    tableHeader={useHeader}
                                    keyName={keyName}
                                    labels={labels}
                                    paginatedData={paginatedData}
                                />
                            </Table>    
                        </div>
                    </Col>
                </Row>
                <div className="pagination-sec">
                    <div className="current-entries">
                        {/* {(sortedData.length > 0) &&
                        <div>
                            {`Showing ${(currentPage - 1) * rowsPerPage + 1}
                            to ${(currentPage - 1) * rowsPerPage + paginatedData.length} of ${filteredData.length} entries`}
                        </div>
                        } */}
                    </div>
                    <Pagination
                        data={sortedData}
                        rowsPerPage={rowsPerPage}
                        keyName={keyName}
                        currentPage={currentPage}
                        onPageNavigate={this.onPageNavigate}
                        labels={labels}
                    />
                </div>
            </div>
        );
    }
}

export default SRReportTable;