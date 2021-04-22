import React, { Component } from 'react';
import { Dropdown, Nav, Tab } from "react-bootstrap";
import FilterOptionDrop from '../components/FilterOptionDrop'
import FilterbyStatus from "../components/FilterbyStatus"
import FilterByFSName from "../components/FilterByFSName"
import { postToServer } from '../../lib/comm-utils'
import { URL_CAMPAIGN } from "../.././lib/constants";
import SfaDateRangePicker from "../../BasicComponet/sfaDateRangePicker";

class Filters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            month: '',
            year: '',
            fsname: '',
            status: '',
            date: '',
            subarea: [],
            mr: '',
            subAreaList: [],
            statusList: [],
            mrList: [],
            selectedData: {},
            filterDataSelected: {},
            filterSelected: [],
            searchKey: "",
            statusFilter: [],
            campaignRequestListFilter: [],
            date: ["", ""],
            todate: "",
            fromdate: "",
            statusCode: "",
            filterData: [],
            mrFilteredData: [],
            subareaFilteredData:[],
            mrSelectedData: {},
            mrfilterSelected: [],
            mrfilterDataSelected: {},
            fscode: "",
            filterMRNameStatus:false,
            fscodeOnClick:true,
            subareacode:"",
            filtersubAreaCodeOnClick:true

        }
        this.filterApply = this.filterApply.bind(this)
        this.getData = this.getData.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.getFilterData = this.getFilterData.bind(this)
        this.onDateChange = this.onDateChange.bind(this)
        this.resetStatusFilter = this.resetStatusFilter.bind(this)
        this.getStatus = this.getStatus.bind(this)
        this.resetSubAreaFilter = this.resetSubAreaFilter.bind(this)
        this.handleMrSearch = this.handleMrSearch.bind(this)
        this.handleSubareaSearch = this.handleSubareaSearch.bind(this)
        this.getDataByFSName = this.getDataByFSName.bind(this)
        this.filterFSCode = this.filterFSCode.bind(this)
        this.filtersubAreaCode = this.filtersubAreaCode.bind(this)

    }

    getData(id, name, checked, item) {
        let filterData = {}
        filterData = this.state.filterDataSelected
        let { selectedData } = this.state
        if (checked) {
            selectedData[id] = item.key
            filterData[item.text] = name
        } else if (selectedData[id] == name) {
            selectedData[id] = false
            delete filterData[item.text]
        } else {
            delete selectedData[id]
        }
        this.setState({
            selectedData: selectedData,
            filterSelected: filterData
        })
    }
    getDataByFSName(id, name, checked, item) {
        let mrfilterData = {}
        mrfilterData = this.state.mrfilterDataSelected
        let { mrSelectedData } = this.state
        if (checked) {
            mrSelectedData[id] = item.key
            mrfilterData[item.text] = name
        } else if (mrSelectedData[id] == name) {
            mrSelectedData[id] = false
            delete mrfilterData[item.text]
        } else {
            delete mrSelectedData[id]
        }
        this.setState({
            mrSelectedData: mrSelectedData,
            mrfilterSelected: mrfilterData
        })
    }

    resetStatusFilter() {
        let selectedData = {}
        this.setState({
            selectedData: selectedData
        })
    }
    getStatus(status) {
        let statusArray = [], statusKey = ""
        this.state.statusList.map(ele => {
            statusArray.push({
                'key': ele["Code"],
                'text': ele["Name"] == "-ALL-" ? "All" : ele["Name"],
                'value': ele["Name"] == "-ALL-" ? "All" : ele["Name"]
            })

        })
        statusArray.map(item => {
            if (item.value == status) {
                statusKey = item.key
            }
        })
        this.setState({
            statusCode: statusKey
        })

    }
    filterFSCode(fscode,b,c) {

        if(c == true){
            this.setState({
            fscode: fscode,
            fscodeOnClick:!c
         
        }) 


        } else{
                this.setState({
            fscode: "",
                        fscodeOnClick:!c

         
        }) 
 
            } 
        
        
       
    }
    filtersubAreaCode(subareacode,b,c){
        if(c == true){
            this.setState({
            subareacode: subareacode,
            filtersubAreaCodeOnClick:!c
         
        }) 


        } else{
                this.setState({
            subareacode: "",
                        filtersubAreaCodeOnClick:!c

         
        }) 
 
            } 
        
    }
    filterApply() {
      

        postToServer(URL_CAMPAIGN, data).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.props.getFilterData(Result.data.data)

                this.setState({ campaignRequestListFilter: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in Filtering " })
        })
    }
    getFilterData() {
    }
    componentDidMount() {
        let fscode = ""
        var data1 = {
            "Index": "CampaignRequestStatus",
        }
        postToServer(URL_CAMPAIGN, data1).then((Result) => {
            if (Result.data.Status == 'Success') {
                this.setState({ statusList: Result.data.data })
            }
        }).catch((Error) => {
            this.setState({ Error: true, Errormsg: "Error in campaign status List" })
        })
        if (localStorage.getItem("type") == '1') {
            var data = {
                "Index": "SubArea",
            }
            postToServer(URL_CAMPAIGN, data).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({ subAreaList: Result.data.data })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in campaign subarea list" })
            })

        } else if (localStorage.getItem("type") == '2' || localStorage.getItem("type") == '3') {
            var data1 = {
                "Index": "M_List_FsWise"
            }
            postToServer(URL_CAMPAIGN, data1).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({ mrList: Result.data.data })
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in campaign mr list" })
            })
            var data2 = {
                "Index": "ManagerListSubarea"
            }
            postToServer(URL_CAMPAIGN, data2).then((Result) => {
                if (Result.data.Status == 'Success') {
                    this.setState({subAreaList:Result.data.data})
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in campaign mr list" })
            })

        }

    }

    onDateChange(date) {
        let dateFormat = require('dateformat');
        this.setState({ date: date });
        this.setState({
            fromdate: `${dateFormat(date[0], "isoDate")}`,
            todate: `${dateFormat(date[1], "isoDate")}`
        })
    }
    handleMrSearch(e) {
        if (this.state.mrList != undefined) {
            let value = e.target.value
            const newData = this.state.mrList.filter(item => {
                const itemData = `${item.C_Name.toLowerCase()}`;
                const textData = value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            let mr = []
            newData.map(item => {
                mr.push({
                    key: item.C_Code,
                    text: item.C_Name,
                    value: item.C_Name

                })
            })

            this.setState({
                mrFilteredData: newData
            })
        }

    }
     handleSubareaSearch(e) {
        if (this.state.subAreaList != undefined) {
            let value = e.target.value
            const newData = this.state.subAreaList.filter(item => {
                const itemData = `${item.C_Name.toLowerCase()}`;
                const textData = value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            });
            let mr = []
            newData.map(item => {
                mr.push({
                    key: item.C_Code,
                    text: item.C_Name,
                    value: item.C_Name

                })
            })

            this.setState({
                subareaFilteredData: newData
            })
        }

    }
    handleSearch(e) {
        let value = e.target.value;
        if (this.state.subAreaList != undefined) {
            if (localStorage.getItem("type") == '1') {
                const newData = this.state.subAreaList.filter(item => {
                    const itemData = `${item.C_Name.toLowerCase()}`;
                    const textData = value.toLowerCase();
                    return itemData.indexOf(textData) > -1;
                });
                let SubArea = []
                newData.map(item => {
                    SubArea.push({
                        key: item.C_Code,
                        text: item.C_Name,
                        value: item.C_Name

                    })
                })
                this.setState({
                    filterData: SubArea
                })
            } else if (localStorage.getItem("type") == '2') {
                const newData = this.state.subAreaList.filter(item => {
                    const itemData = `${item.C_NAME.toLowerCase()}`;
                    const textData = value.toLowerCase();
                    return itemData.indexOf(textData) > -1;
                });
                let SubArea = []
                newData.map(item => {
                    SubArea.push({
                        key: item.C_CODE,
                        text: item.C_NAME,
                        value: item.C_NAME
                    })
                })
                this.setState({
                    filterData: SubArea
                })

            }
        }
    }

    resetSubAreaFilter() {
        this.setState({
            selectedData: {}
        })
    }



    render() {
        const { filterData, mrFilteredData, mrSelectedData, selectedData, statusFilter } = this.state
        let status = [], subarea = [], mr = []
        if (localStorage.getItem("type") == '1') {
            this.state.subAreaList.map(ele => {
                subarea.push({
                    'key': ele["C_Code"],
                    'text': ele["C_Name"],
                    'value': ele["C_Name"]
                })
            })
        } else if (localStorage.getItem("type") == '2' || localStorage.getItem("type") == '3') {
            if (this.state.mrFilteredData.length == 0) {
                this.state.mrList.map(ele => {
                    mr.push({
                        'key': ele["C_Code"],
                        'text': ele["C_Name"].toLowerCase(),
                        'value': ele["C_Name"].toLowerCase()
                    })
                })
            }
            else if (this.state.mrFilteredData.length > 0) {
                this.state.mrFilteredData.map(ele => {
                    mr.push({
                        'key': ele["C_Code"],
                        'text': ele["C_Name"].toLowerCase(),
                        'value': ele["C_Name"].toLowerCase()
                    })
                })
            }
            if(this.state.subareaFilteredData.length == 0){

            this.state.subAreaList.map(ele => {
                subarea.push({
                    'key': ele["Code"],
                    'text': ele["C_Name"].toLowerCase(),
                    'value': ele["C_Name"].toLowerCase()
                })
            })
        }else if (this.state.subareaFilteredData.length > 0) {
                this.state.subareaFilteredData.map(ele => {
                    subarea.push({
                        'key': ele["C_Code"],
                        'text': ele["C_Name"].toLowerCase(),
                        'value': ele["C_Name"].toLowerCase()
                    })
                })
            }
        }

        this.state.statusList.map(ele => {
            status.push({
                'key': ele["Code"],
                'text': ele["Name"] == "-ALL-" ? "All" : ele["Name"],
                'value': ele["Name"] == "-ALL-" ? "All" : ele["Name"]
            })

        })

        const subAreaItems = subarea.reduce((prev, item, index) => {
            const id = item.key + "$" + item.text + "$" + item.value;
            const selection = selectedData[id] ? selectedData[id] : false
            prev.push(
                <FilterOptionDrop
                    key={index}
                    selection={selection}
                    options={item}
                    id={id}
                    getData={this.getData}
                />

            )
            return prev
        }, [])
        const searchSubArea = filterData.reduce((prev, item, index) => {
            const id = item.key + "$" + item.text + "$" + item.value;
            const selection = selectedData[id] ? selectedData[id] : false
            prev.push(
                <FilterOptionDrop
                    key={index}
                    selection={selection}
                    options={item}
                    id={id}
                    getData={this.getData}
                />
            )
            return prev
        }, [])
        const mrItems = mr.reduce((prev, item, index) => {
            const id = item.key + "$" + item.text + "$" + item.value;
            const selection = mrSelectedData[id] ? mrSelectedData[id] : false
            prev.push(
                <FilterByFSName
                    key={index}
                    selection={selection}
                    options={item}
                    id={id}
                    getDataByFSName={this.getDataByFSName}
                />
            )
            return prev
        }, [])
        const SearchmrItems = mrFilteredData.reduce((prev, item, index) => {
            const id = item.key + "$" + item.text + "$" + item.value;
            const selection = mrSelectedData[id] ? mrSelectedData[id] : false
            prev.push(
                <FilterByFSName
                    key={index}
                    selection={selection}
                    options={item}
                    id={id}
                    getDataByFSName={this.getDataByFSName}
                />
            )
            return prev
        }, [])
        return (
            <div>
                {
                    localStorage.getItem("type") == '2' || localStorage.getItem("type") == '3' ?
                        <Dropdown className="myDropdown">
                            <Dropdown.Toggle className="dcr-options" id="dropdown-basic" style={{ backgroundColor: "white", color: '#6c757d', border: "1px solid #dfdfdf", fontSize: "0.875em", borderRadius: "10px", padding: "8px 12px" }}>
                                <img src="../public/assets/images/filtering.svg" />
                                <span> Filter</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="Repothers-dropdown1">
                                <Tab.Container id="left-tabs-example">
                                    <div>
                                        <div className='retrival-left'>
                                            <Nav variant="pills" className="flex-column">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="mr">
                                                        <img src="../public/assets/images/avatar.svg" alt="avatar_img" />
                                                        <span>MR Name</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="subarea">
                                                        <img src="../public/assets/images/subarea.png" alt="subarea_img" />
                                                        <span>Sub Area</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="date">
                                                        <img src="../public/assets/images/date.png" alt="date_img" />
                                                        <span>Date</span>
                                                    </Nav.Link>
                                                </Nav.Item>
                                            </Nav>
                                        </div>
                                        <div className='retrival-right1'>
                                            <Tab.Content>
                                                <Tab.Pane eventKey="mr">
                                                    <div>
                                                        <h5 className="drop-head">
                                                            Select the MR Name
                                                    <span className="pull-right">
                                                            </span>
                                                            <input type="text" name="searchbar" className="Rectangle-doctor mt-20" placeholder="Search" onChange={this.handleMrSearch} />
                                                        </h5>
                                                        <div className="Padding10 paddingTop mr-subareaData cal-scrollbar">
                                                            {mr ? mr.map((item, index) => (
                                                                <div key={index} className={item.key == this.state.fscode  ? "filter-status-active" : "filter-status"} onClick={() => this.filterFSCode(item.key,index,this.state.fscodeOnClick)}>{item.value}
                                                                </div>
                                                            )) : null}
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="subarea">
                                                    <div>
                                                        <h5 className="drop-head">
                                                            Select the Sub Area
                                                    <span className="pull-right"></span>
                                                            <input type="text" name="searchbar" className="Rectangle-doctor mt-20" placeholder="Search" onChange={this.handleSubareaSearch} />
                                                        </h5>
                                                          <div className="Padding10 paddingTop mr-subareaData cal-scrollbar">
                                                            {subarea ? subarea.map((item, index) => (
                                                                <div key={index} className={item.key == this.state.subareacode  ? "filter-status-active" : "filter-status"} onClick={() => this.filtersubAreaCode(item.key,index,this.state.filtersubAreaCodeOnClick)}>{item.value}
                                                                </div>
                                                            )) : null}
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                                <Tab.Pane eventKey="date">
                                                    <p className="filterbydes">Select From-to Date</p>
                                                    <SfaDateRangePicker
                                                        onChange={this.onDateChange}
                                                        dateRange={this.state.date}
                                                        errorMessage={this.state.dateErr}
                                                    />
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </div>
                                    </div>
                                </Tab.Container>
                                <Dropdown.Item eventKey="1">
                                    <button className="gradient-btn " onClick={this.filterApply}>Apply</button>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        :
                        <div>
                            <Dropdown className="myDropdown">
                                <Dropdown.Toggle className="dcr-options" id="dropdown-basic" style={{ backgroundColor: "white", color: '#6c757d', border: "1px solid #dfdfdf", fontSize: "0.875em", borderRadius: "10px", padding: "8px 12px" }}>
                                    <img src="../public/assets/images/filtering.svg" />
                                    <span> Filter by Status</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="column-dropdown">
                                    <FilterbyStatus
                                        name="Status"
                                        options={status}
                                        getStatus={this.getStatus}
                                    />
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>}
            </div>
        );
    }
}

export default Filters;








      ///<Dropdown className="menuDrop">
                                                   //      <Dropdown.Toggle className="datepickerDrop" variant="success" id="dropdown-basic">
                                                   //      <div className="filtersBtn1">
                                                   //        <span className="pad-10">dd/mm/yyyy To dd/mm/yyyy</span>
                                                   //         <img src="../public/assets/images/calendar_gray.svg" alt="column_img" className="dateimgPad"/>
                                                   //      </div>
                                                   //      </Dropdown.Toggle>
                                                   //      <Dropdown.Menu>
                                                   //         <div>
                                                   //            <div className="datepickerDropMenu" >
                                                   //               <DateRange    
                                                   //                 onChange={this.handleSelect.bind(this)}
                                                   //             />

                                                   //            </div>

                                                   //         </div>
                                                   //       </Dropdown.Menu>
                                                   //   </Dropdown>

                                                     // <div className="Padding10 paddingTop mr-subareaData cal-scrollbar">
                                                 //  { mrFilteredData == "" ? mrItems:SearchmrItems}
                                                 //  </div>
                                                 // <div className="Padding10 paddingTop mr-subareaData cal-scrollbar">
                                                 //            {filterData == "" ? subAreaItems : searchSubArea}
                                                 //        </div>