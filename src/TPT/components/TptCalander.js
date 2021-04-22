import React, { Component } from 'react';
import YearCalander from './YearCalander';
import { Row,Col,Dropdown,Tab,Nav,Form,button } from 'react-bootstrap';
import Filter from "react-bs-datatable/lib/Filter";
import MultipleSelectBox from '../../design-controls/components/MultipleSelectBox'
import SearchInput from '../../dcr/components/SearchInput'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
// import Drop from '../../BasicComponet/DropDown'
import {withRouter} from 'react-router-dom'
import SingleDropDown from '../../BasicComponet/SingleDropdown';
class TptCalander extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFull: false,
            filteredSuggestions:[],
            totalVal:0,
            areaname:"",
            plan:'',
            taget:''
        }
        this.handleView= this.handleView.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.onHide = this.onHide.bind(this)
        this.selectedProduct = this.selectedProduct.bind(this)
       this.total = this.total.bind(this)

       this.loadplan=this.loadplan.bind(this)
    } 


    loadplan(){

        this.setState({

            plan: 0,
            target: 0

        })
        var data = {"index":"STP_PLANDED"}
        postToServer("TPT",data).then( (Result)=>{ 
            if(Result.data.Status == "Success"){
           

                this.setState({

                    plan: Result.data.count[0]["count"],
                    target:  Result.data.target[0]["VISIT"]

                })

          // console.log(Result.data)
           //console.log()
                //this.setState({ Error: true, Errormsg: Result.data.Result[0].result ,Messagetype:true})
            
            }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Something wrong" })
        })
    }
    handleView() {
        this.setState({
            isFull: !this.state.isFull
        });
    }   
    handleSearch(){
        let filteredSuggestions = []
        const value = event.target.value.toLowerCase()
        
        filteredSuggestions = this.props.patches.filter(
            suggestion => suggestion.Name.toLowerCase().indexOf(value) > -1
        );
        
        this.setState({
            filteredSuggestions:filteredSuggestions
        })
    }    
    handleChange(){
        var data = {"index":"RecreateNew"}
        postToServer("TPT",data).then( (Result)=>{ 
            if(Result.data.Status == "Success"){
            this.setState({ Error: true, Errormsg: Result.data.Result[0].result ,Messagetype:true})
            this.loadplan()
            this.props.load()
            }
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Something wrong" })
        })

    }
    onHide(){
        this.setState({
            Error: false,
            subarea:''
        })
        //this.props.history.push('/tpt')
        //this.props.clearData()
       
    }
    selectedProduct(id,type,name,areaname){ alert(areaname)
       const code=id
        this.setState({
            subarea:code,
            areaname:areaname,
        })
    }
    componentDidMount(){
        this.loadplan()
    }
    componentDidUpdate(oldProps,oldstate){
        if(oldstate.totalVal != this.state.totalVal){
            // this.setState({
            //     totalVal: 
            // })
        }
    }
    total(total){
   
    this.setState({
        totalVal:total
    })
    }
    render() { 
        var currentYear = new Date().getFullYear()
        var currentMonth = new Date().getMonth()+1;
        var financialYear
        var ll=1 +  parseInt(currentYear )
        var mm=parseInt (currentYear)-1
        if(currentMonth > 3){
            financialYear = currentYear + "-" +  ll
        }else{
            financialYear = mm +"-"+  currentYear
        }
        let patches = []
        if(this.props.patches){
        this.props.patches.map((item) => { 
            let a = item.code
            let b = item.Name+"("+item.Type+")"
            patches.push({
              "key": a,
              "text": b,
              "value": item.code,
            })
          })
         
        }
        return (
            <React.Fragment>
                <div className="targetHeader tableShadow">
                    <div className={this.state.isFull ? "fullscreenView" : "dwrsubmit-first  "}>
                        {/* <div className="dcr-head">
                            <div>
                                <h5 className="dcr-list-sec-head">
                                    <span>Tour Plan Template for the year 2019-2020</span>
                                </h5>
                            </div>
                            <div className="invenSearch">
                                 <div className="other-ops ">
                                    <Form.Control type="text" className="customized-input" placeholder="Search for Patches" />
                                 </div>
                             </div>
                        </div> */}
                        
                        <div className="dcr-head">
                            <div>
                                <h5 >
                                    <div className="touplanhead">Tour Plan Template for the year {financialYear}</div>
                                </h5>
                            </div>
                            <div className="dcr-head-options toutTableResponse flexDisplay">
                            <div className="mt20 ">
                            <button
                                onClick={this.handleChange}
                                className="hide-tablehead-btn10"
                            >
                            Recreate New
                            </button>
                            </div>
                            <div className="mt20">
                            {this.state.isFull ? (
                            <img
                            src="../public/assets/images/collapse-grey.svg"
                            className="fullscreen_img"
                            alt="fullscreen_img"
                            onClick={this.handleView}
                            />
                            ) : (
                            <img
                            src="../public/assets/images/fullscreen.svg"
                            className="fullscreen_img"
                            alt="fullscreen_img"
                            onClick={this.handleView}
                            />
                            )}
                            </div>
                            <div className="myFormSearch desktopView">
                            <Form.Control type="text" className="patchInput mt24" placeholder="Search for Patches" onChange={this.handleSearch} />
                            <img src="../../public/assets/images/search_grey.png" className="serachPatch" />
                            </div>
                           
                            </div>
                            
                        </div>
                        <div className="flex-row ">
                            <div className="callPlannedDetails">You have planned for <b>{this.state.plan}</b> calls from <b>{this.state.target}</b> calls</div>
                                <div className="flexDisplay iconResponsivePad">
                                    <div className="iconDenotion"><img src="../public/assets/images/doctorIcon.svg" className="DenotionIcon" />Doctor</div>
                                    <div className="iconDenotion"><img src="../public/assets/images/stockistIcon.svg" className="DenotionIcon" />Stockist</div>
                                    <div className="iconDenotion"><img src="../public/assets/images/chemistIcon.svg" className="DenotionIcon" />Chemist</div>
                                    {/* <div className="iconDenotion"><img src="../public/assets/images/hospitalIcon.svg" className="DenotionIcon" />Hospital</div> */}
                                    {/* <div className="iconDenotion"><img src="../public/assets/images/otherIcon.svg" className="DenotionIcon" />Others</div> */}
                                    <div className="iconDenotion flex-row"><div className="workType"></div><div>Other Work Type</div></div>
                                </div>
                            
                            </div>
                        <div className="targetPlannedList">
                            <div className="patchWidth MobileView " >
                                
                                <SingleDropDown   Type={1}    Selected={-1} selectedProduct={this.selectedProduct} data={patches} />
                            </div>
                            <YearCalander patches={this.props.patches} serachItem={this.state.filteredSuggestions} loadData={this.state.subarea} showPatches={this.getPatches} coltotal={this.state.coltotal} total={this.total} areaname={this.state.areaname}/>
                            
                            </div>
                        </div>
                    </div>
                    <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.onHide}
                        success={this.state.Messagetype}
                    />   
            </React.Fragment>
        );
    }
}

export default withRouter(TptCalander);