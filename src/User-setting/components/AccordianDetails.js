import React,{Component} from 'react'
import {Form,Row,Col,Dropdown,Accordion,Card} from 'react-bootstrap'
import Drop from '../../BasicComponet/DropDown'
import SearchSource from './SearchSource'
import SearchSourceDropdown from './SearchSourceDropdown'
import { getserachData } from '../../actions/DCRSearch'
import { connect } from 'react-redux';
import SourceAccordianDetails from './SourceAccordianDetails'

class AccordianDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            selectedData:{},
            clearsearch:false,
            searchkey:'0',
            SelectedFS:''
        }
        this.getSearchDatas = this.getSearchDatas.bind(this)
        this.getserachs = this.getserachs.bind(this)
    }

    getSearchDatas(data){
        this.getserachs(data)
    }
    getserachs(val) {

        if(val.length==1){
        let data = {
         
            "index": "DCRSEARCH",
            "Data": { "SearchKey": val,"fscode":this.state.SelectedFS  == undefined ?'':this.state.SelectedFS }
        }
        const len=val.length
       
         this.setState({searchkey:len})
        
        this.props.getserachData(data)
    }else{
        if(val.length % 3==0){
            let data = {
                "index": "DCRSEARCH",
                "Data": { "SearchKey": val, "fscode":this.state.SelectedFS  == undefined ?'':this.state.SelectedFS  }
            }
            const len=val.length
           
             this.setState({searchkey:len})
            
            this.props.getserachData(data)
        }
        
    }
        
    }
    getData(id, name, checked, type, data) {
        let { selectedData } = this.state
      
        if (checked) {
            selectedData[data["DoctorCode"]] = data
        } else {
            delete selectedData[data["DoctorCode"]]
        }
        this.setState({
            selectedData: selectedData,
            type: type
        })
    }
    removeItemlocal(id) {

        //alert(id)

        if(sessionStorage.getItem("ActiveDCR") == id ){
            sessionStorage.setItem("ActiveDCR",null)
        }else{
            if(Object.keys(this.state.selectedData).length==1){
                sessionStorage.setItem("ActiveDCR",null)
            }
        }

        const _this = this
        const data = this.state.selectedData
        delete data[id]
        _this.setState({  clearsearch:!this.state.clearsearch , selectedData: data })

    }
    render(){
        let FilterList = {}
        // console.log(this.props.data,' call me')
         const { data } = this.state
         
         if (this.props.data) {
             this.props.data.map((Onedata) => {
                 let list = []
                 if (FilterList[Onedata["DSCAName"]]) {
                     list = FilterList[Onedata["DSCAName"]]
                     list.push(Onedata)
                     FilterList[Onedata["DSCAName"]] = list
                 } else {
                     list.push(Onedata)
                     FilterList[Onedata["DSCAName"]] = list;
                 }
             })
         }
         const Accordiondata = this.state.selectedData
         const selectionsdiv = Object.keys(Accordiondata).reduce((p, n, i) => {
             if (Accordiondata[n]) {
                 p.push(
                     <div>
                         <div key={n} className="selectedDropdown"> {this.state.selectedData[n]["Dr_Name"].toLowerCase()}
                             <img src="../public/assets/images/cancel.png" className="closeImg"
                                 onClick={this.removeItemlocal.bind(this, n)} />
                         </div>
                     </div>
                 )
             }
             return p
         }, [])
         
    return(
        <div className="rpad20">
            <Row className=" use_doc_pad">
                <Col lg={3} md={3} sm={6} xs={12} className="">
                    <Form.Label className="customized-label">RX Type</Form.Label>
                    <div className="selectlocation rpsDrop ">
                        <Drop name={"fromarea"} Type={1}  placeholder="Day" />
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12} className="">
                    <Form.Label className="customized-label">Qty Type</Form.Label>
                    <div className="selectlocation rpsDrop ">
                        <Drop name={"fromarea"} Type={1}  placeholder="Day" />
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12} className="">
                    <Form.Label className="customized-label">Value Type</Form.Label>
                    <div className="selectlocation rpsDrop ">
                        <Drop name={"fromarea"} Type={1}  placeholder="Day" />
                    </div>
                </Col>
                <Col lg={3} md={3} sm={6} xs={12} className="">
                    <Form.Label className="customized-label">Weightage Type</Form.Label>
                    <div className="selectlocation rpsDrop ">
                        <Drop name={"fromarea"} Type={1}  placeholder="Day" />
                    </div>
                </Col>
            </Row>
            <div className="sourceHeading">Add Source</div>
            <Row className=" use_doc_pad">
                
              
                <Col lg={3} md={3} sm={6} xs={12} >
                    <Form.Label className="customized-label">Source Type</Form.Label>
                    <div className="selectlocation rpsDrop ">
                        <Drop name={"fromarea"} Type={1}  placeholder="Day" />
                    </div>
                </Col>
                <Col lg={9} md={9} sm={6} xs={12} >
                    <Form.Label className="customized-label">Search <span className="colorRed">*</span></Form.Label>
                    <Form.Control type="text" className="customized-input" placeholder="" />
                                {/* <div className="productDetailDrop">
                                <Dropdown     className="multiple-dropdown marginBot10">
                                    
                                    <Dropdown.Toggle  id="dropdown-basic">
                                        <img src="../public/assets/images/search_grey@2x.png" className="serachImg" />
                                        <SearchSource  clear={this.state.clearsearch} getSearchDatas={this.getSearchDatas} />
                                    </Dropdown.Toggle>

                                        <Dropdown.Menu toggle={true}  className="cal-scrollbar">
                                            <div className="Padding10 paddingTop searchData cal-scrollbar">
                                               
                                                    <Form>
                                                        <div>
                                                        {
                                                                Object.keys(FilterList).map((list) => {
                                                                    return <div>
                                                                        <div id={list} className='searchDiv'>DOCTOR SELECT </div>
                                                                        {FilterList[list].map((array) => {
                                                                            return <div>
                                                          
                                                                                <SearchSourceDropdown
                                                                                   data={array}
                                                                                   key={array["DoctorCode"]}
                                                                                   id={"SearchDropdown" + array["DoctorCode"]}
                                                                                   getData={this.getData.bind(this)}
                                                                                   selection={this.state.selectedData[array["DoctorCode"]] ? 'checked' : null}
                                                                                   id={array["DoctorCode"]}
                                                                                   item={array}
                                                                                   type={"1"}
                                                                                />  
                                                                                </div>
                                                                            })
                                                                            }
                                                                        </div>
                                                                    })
                                                                } 
                                                                     
                                                           
                                                        </div>
                                                    </Form> 
                                            </div>
                                            <Dropdown.Item eventKey="11">
                                                <button onClick="" className="serachDoneBtn">DONE</button>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                </Dropdown>
                                </div> */}
                                {/* <div className="selectedDiv">
                                    {selectionsdiv}
                                </div> */}
                        
                </Col>
                
           
            </Row>
            <Row>
                    <Col lg={12} md={12} sm={12}>
                    <div className=" marginTop21">
                        <div className="marginBottom parentAccordian">
                            <Accordion   activeKey={this.state.Activedcr} >
                            <Card key={12}>
                                <Accordion.Toggle   as={Card.Header}  eventKey={12}>
                                <div className="pointer capitalizationName longtextWrap blueColor">Maruti Medicals</div>
                                </Accordion.Toggle>
                                <Accordion.Collapse    eventKey={  12 }>
                                    <Card.Body>
                                        <div>
                                            <SourceAccordianDetails />
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion>
                        </div>
                    </div>
                    </Col>
                </Row>
        </div>
    )
                                                            }
}
const mapStateToProps = (state) => ({
    data: state.DCRSEARCH.data,
})

const mapDispatchToProps = (dispatch) => ({
    getserachData: (data) => dispatch(getserachData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccordianDetails)