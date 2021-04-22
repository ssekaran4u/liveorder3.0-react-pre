import React,{Component} from 'react'
import {Row,Col,InputGroup,Form,Dropdown,Accordion, Card, Button} from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { getserachData } from '../../actions/DCRSearch'
import { connect } from 'react-redux';
import SearchDropdown from '../../dcr/components/SearchDropdown'
import SearchDoctor from '../../dcr/components/SearchDoctor'
import AccordianDetails from './AccordianDetails'

 class RCPAEntryDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            SelectedFS:'',
            searchkey:'0',
            clearsearch:false,
            data:'',
            date: new Date(),
            selectedData: {},
        }
        this.getserach = this.getserach.bind(this)
        this.getSearchData = this.getSearchData.bind(this)
    }

     getSearchData(data){
        this.getserach(data)
    }
    getserach(val) {

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
        const selections = Object.keys(Accordiondata).reduce((p, n, i) => {
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
        const accordionCards = Object.keys(Accordiondata).map((value, index) => {
            return (
                <Card key={value}>
                    <Accordion.Toggle   as={Card.Header}  eventKey={value}>
                <div className="pointer capitalizationName longtextWrap blueColor">sweta</div>
                    </Accordion.Toggle>
                    <Accordion.Collapse    eventKey={  value }>
                        <Card.Body>
                            <div>
                                <AccordianDetails />
                            </div>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            )
        })
        return(
            <div className="user-rcpa">
                <div className="dcr-list-sec rcpa_pad24  dcrsearch">
                <Row>
                    <Col xl={4} lg={4} md={4} sm={12} xs={12}>
                                <Form.Label className="customized-label">Date <span className="colorRed">*</span></Form.Label>
                                <InputGroup className="datepickerAligment controls text-right">
                                    <DatePicker
                                        selected={this.state.date}
                                        onChange=""
                                        dateFormat="dd-MMM-yy"
                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text>
                                            <img src="../public/assets/images/prpcalender.svg" alt="calendar" />
                                        </InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>
                            </Col>
                            <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                            
                                <Form.Label className="customized-label">Search <span className="colorRed">*</span></Form.Label>
                                <div className="productDetailDrop ">
                                <Dropdown     className="multiple-dropdown marginBot10">
                                    
                                    <Dropdown.Toggle  id="dropdown-basic">
                                        <img src="../public/assets/images/search_grey@2x.png" className="serachImg" />
                                        <SearchDoctor  clear={this.state.clearsearch} getSearchData={this.getSearchData} />
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
                                                          
                                                                                <SearchDropdown
                                                                                   data={array}
                                                                                   key={array["DoctorCode"]}
                                                                                   id={"SearchDropdown" + array["DoctorCode"]}
                                                                                   getData={this.getData.bind(this)}
                                                                                   selection={this.state.selectedData[array["DoctorCode"]] ? 'checked' : null}
                                                                                   id={array["DoctorCode"]}
                                                                                   item={array}
                                                                                   type={"1"}
                                                                                />  </div>
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
                                </div>
                                <div className="selectedDiv">
                                    {selections}
                                </div>
                            
                            </Col>
                        </Row>
                        </div>
                        {Accordiondata && (Object.keys(Accordiondata).length > 0) &&
                    <div className=" marginTop21">
                        <div className="marginBottom parentAccordian">
                            <Accordion   activeKey={this.state.Activedcr} >
                                {accordionCards}
                            </Accordion>
                        </div>
                    </div>
                }
                
                <div>
                {Accordiondata && (Object.keys(Accordiondata).length > 0) &&
                    <button onClick={this.save} className="CompBtn">Complete</button>
                }
                </div>
                
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

 export default connect(mapStateToProps, mapDispatchToProps)(RCPAEntryDetails)