/*This code will display selected Doctor for RCPA
* Request URL=url/DCRAPI
* Index=RCPA_MST
* Request string={"Token":"","index":"RCPA_MST"}
* Response string={
    C_BRAND_CODE:B00000001
    C_MFAC_NAME:76
    C_Name	BRAND:1
    C_PRODUCT_NAME:10
    N_CREATION_TYPE:2
    N_PRIORITY:0
* Response Error={}

*/
import React,{Component} from 'react'
import { Dropdown , Form,Button} from 'react-bootstrap'
import DoctorRCPACheckbox from './DoctorRCPACheckbox'
import { connect } from 'react-redux';
import { getDcotorRCPA,getRCPA } from '../../actions/DCR'
import RcpaSearchDoctor from '../components/RcpaDoctorSearch'
import { postToServer } from '../../lib/comm-utils'

class DoctorRCPA extends Component{
    constructor(props){
        super(props)
        this.state={
             data: [],
             RCPAdata:[],
             selectedItems:[],
             selectedData: {},
             productdetail:[],
             filterdata:[],
             serachlist:[],
             searchdata:[]
        }
        this.getDocRCPA = this.getDocRCPA.bind(this)
        this.LoadRCPAdetails=this.LoadRCPAdetails.bind(this)
        this.update = this.update.bind(this)
        this.getSearchDoc= this.getSearchDoc.bind(this)
        this.getDataEDIT=this.getDataEDIT.bind(this)
        this.getData=this.getData.bind(this)
    }


    getDataEDIT(id, name, checked){ 

        
        
        let {selectedData} = this.state
        if(checked){ 
            selectedData[id] = name
        }else if(selectedData[id] == name){
            selectedData[id] = false
        }
        this.setState({
            selectedData:selectedData
        })

       
        this.props.sendtable(selectedData)
        
    }
    LoadRCPAdetails(){
          let  product=[]
          let  compitor={}
       const   data={"index":"RCPA_MST"}
        postToServer("DCRAPI",data).then( (kl)=>  { 
            if(kl.data["Status"]=="success"){
            kl.data.Data.map(  (array) =>{
                // product.push(  { "key": array["C_BRAND_CODE"] +array["C_MFAC_NAME"]+  array["C_Name"], "text": array["C_Name"] +'('+ array["C_PRODUCT_NAME"] +')' , "value": array["C_BRAND_CODE"] }  )
                // //{ key: 'angular', text: 'Angular', value: 'angular' },
            // console.log(array,'ok')
                 
            })
        }
        
        
        } ).catch( (Error)=> { console.log(Error)} )
       
     }

     componentDidUpdate(oldprops,oldsatate)
     {
        if(oldprops.clearAll!=this.props.clearAll)
        {
         this.setState({ selectedItems:[],
            selectedData: {}
            })
        }
     }
    
     componentDidMount(){
        this.getDocRCPA()
         //  this.LoadRCPAdetails()
      const data={"Token":"","index":"RCPA_MST"}
      this.props.getRCPA(data)
      
        
        if(this.props.Editmodedata)
        {
            if( this.props.Editmodedata['Rcpa']){
                let m={}
                Object.keys(this.props.Editmodedata['Rcpa']).map( (next)=>
                { 

                    if(this.props.Editmodedata['Rcpa'][next]["C_CHEMIST_CODE"].trim()==this.props.docid){
                 
                   
                  
                  this.getDataEDIT( this.props.Editmodedata['Rcpa'][next]["C_CHEMIST_CODE"].trim() +'$'+this.props.Editmodedata['Rcpa'][next]["C_FName"].trim() +'$' + this.props.Editmodedata['Rcpa'][next]["C_Code"].trim(), this.props.Editmodedata['Rcpa'][next]["C_FName"].trim(),true) 
                    }
             })
          
        }
           
        }
        
      
        
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.data) 
            return {...prevState, data:nextProps.data}
        //RCPAdata
        if (prevState.RCPAdata !== nextProps.RCPAdata) 
          return {...prevState, RCPAdata:nextProps.RCPAdata}
        return null
    }
    getData(id, name, checked){ 

        if(sessionStorage.getItem("ActiveDCR")=="null"){
            sessionStorage.setItem("ActiveDCR",this.props.docid)
           }
        
        let {selectedData} = this.state
        if(checked){ 
            selectedData[id] = name
        }else if(selectedData[id] == name){
            selectedData[id] = false
        }
        this.setState({
            selectedData:selectedData
        })

       
        this.props.sendtable(selectedData)
        
    }
    getDocRCPA(){
        var data={"Token": "",
                    "save":"DoctorsForRCPA"
                }
        this.props.getDcotorRCPA(data)
    }
    removeItem(id){
        let { selectedData } = this.state
        selectedData[id] = false
        this.setState({selectedData})
        this.props.sendtable(selectedData)
    }
    update(dataArray) {
        this.setState({
            filterdata: dataArray
        })
    }
    getSearchDoc(data){
     
      this.setState({
          searchdata:data
      })
    }
    getSearch(key){
        
    }
    render(){ 
         
        const {data, selectedData,RCPAdata,filterdata,searchdata} = this.state
     
        if (!data)
           return null
        const items = data.reduce((prev, item, index) => { 
            const id = this.props.docid.trim() +"$"+item.C_Name.trim()+"$"+item.C_Code.trim();
            const selection = selectedData[id] ? selectedData[id] : false
                prev.push(
                    <DoctorRCPACheckbox
                        key={index}
                        getData={this.getData.bind(this)}
                        selection={selection}
                        id={id}
                        item={item}
                    />
                )
            return prev
        }, [])  
        
        const searchitems = searchdata.reduce((prev, item, index) => {
            const id = this.props.docid +"$"+item.C_Name+"$"+item.C_Code;
            const selection = selectedData[id] ? selectedData[id] : false
            //  if (index <= 2)
            prev.push(
                <DoctorRCPACheckbox
                key={index}
                getData={this.getData.bind(this)}
                selection={selection}
                id={id}
                item={item}
            />
            )
            return prev
        }, [])
    
       const selections = Object.keys(selectedData).reduce((p, n, i) => { 
            if (typeof(selectedData[n]) === "string") { 
                const name = n.split('$')[1];
                p.push(
                        <div key={n} className="selectedDropdown"> {name.toLowerCase()}
                            <img src="../public/assets/images/cancel.png" className="closeImg"
                                onClick={this.removeItem.bind(this, n)}/>
                        </div>
                )
            }
            return p
        }, [])
       
        return (
         
            <React.Fragment>
            
                <div className="productDetailDrop">
                    <Dropdown className="multiple-dropdown marginBot10">
                        <Dropdown.Toggle id="dropdown-basic">
                            <RcpaSearchDoctor  compVal="RCPA"  getSearchDoc={this.getSearchDoc} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu >
                            <div className="cal-scrollbar product_menu">
                                <Form>
                                {searchdata == '' ? items : searchitems}
                                </Form> 
                            </div>
                            <Dropdown.Item eventKey={this.props.eventKey}>
                                <button  className="doneBtn">DONE</button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="selectedDiv cal-scrollbar">
                    {selections}
                              
                </div>
                     
            </React.Fragment>
        )
    }
}

const mapStateToProps = state =>({ 
    data:state.DCR.dataRCPA,
    RCPAdata:state.DCR.RCPAdetailskey
} )

const mapDispatchToProps = dispatch => ({
    getDcotorRCPA:(data) => dispatch(getDcotorRCPA(data)),
    getRCPA:(RCPAdata) => dispatch(getRCPA(RCPAdata))
})

export default connect(mapStateToProps, mapDispatchToProps)(DoctorRCPA)
