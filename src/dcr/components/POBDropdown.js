/*
* This code will display POBdropdown which includes quantity and price for product 
* Request URL=url/Android
* Index=downloadDocItemRateMst
* Request string={"Header":[{"fsc":""}],"idx":"downloadDocItemRateMst","data":"04-08-2018","Token":""}
* Response string={
     cd:FR05J10
     nm	ANZEN:2.5 MG
     rate:83.37
     type:1
}
Response Error={}

*/

import React, { Component } from 'react'
import { Dropdown, Form, Button, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux';
import { getPobDetails } from '../../actions/DCRPob'
import QuantityInput from './QuantityInput'
import SearchInput from './SearchInput'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
class POBDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            value: 0,
            totalval: 0,
            nqty: 0,
            totalArray: [],
            subtotal: 0,
            itemnameArray: [],
            showData: [],
            isButtonDisabled: true,
            filterdata: [],
            popjson: {},
            Showpop:{},
            Allpop:{},
            Total:0,
            loadtextvalue:{},
            Errormsg:'',
            Error:false

        }
        this.getPob = this.getPob.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.subTotal = this.subTotal.bind(this)
        this.save = this.save.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
        this.deleteTotal = this.deleteTotal.bind(this)
        this.Total = this.Total.bind(this)
        this.update = this.update.bind(this)

        this.popSelectedval = this.popSelectedval.bind(this)
        this.Errorclose=this.Errorclose.bind(this)
    }
    Errorclose() {
        this.setState({ Error: false })
    }

    componentDidUpdate(oldprops,oldsatate)
    {
       if(oldprops.clearAll!=this.props.clearAll)
       {
        this.setState({popjson:{},Showpop:{}})
       }
    }

    popSelectedval(name, val,pname, rate) {

        if(this.props.notallowed==true){
            this.setState({ Errormsg:'EDIT NOT Allowed', Error:true })
            
            //message={this.state.Errormsg}
            //show={this.state.Error}
            // this.removeItem(name)
                    return
                   }
        //console.log(pname,rate * val)
        let pop = {}
        pop = this.state.popjson
        pop[name] =  {"name":val,"rate":rate}
        let popdis={}
        popdis=this.state.Showpop
        popdis[pname]={"rate" : rate * val , "Qty" : val}
        

    let currenttotal=  this.state.Total + rate * val

         let allpop={}
        allpop=this.state.Allpop
        allpop[pname]=name

        if(val==0){
            delete popdis[pname]
            delete pop[name]
        }
        this.setState({ popjson: pop ,Showpop:popdis,Allpop:allpop ,Total:currenttotal })
        this.props.popSelected(pop)

        let totalsum=0
     Object.keys(pop).map( (oneobect)=>{
        totalsum=totalsum + parseFloat( pop[oneobect]["name"] ) *    parseFloat(  pop[oneobect]["rate"])
     })
    this.setState({Total:totalsum})
    }

    componentDidMount() {
        this.getPob();
        if(this.props.Editmodedata)
        {

          
            if( this.props.Editmodedata['DoctorPOB_FMCG_HDR']){
                let m={}
                let Allpop={}
                let showlocal={}
                let olddata={}
                let loadtextvalue={}
                Object.keys(this.props.Editmodedata['DoctorPOB_FMCG_HDR']).map( (next)=>{   
                    const k=this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["C_Name"].trim()
                    m[k]={   "name":k ,  "rate":  parseFloat(  this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["n_Rate"].trim()  ) *  parseFloat( this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["n_qty"].trim()) , Qty: this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["n_qty"].trim()}
                    showlocal[this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["C_Name"].trim()]={ "rate": parseFloat(  this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["n_Rate"].trim() ),"Qty": parseFloat( this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["n_qty"].trim()) }
                    olddata[this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["C_Code"].trim() ]={   "name": this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["n_qty"].trim(),  "rate":  parseFloat(  this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["n_Rate"].trim()  ) *  parseFloat( this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["n_qty"].trim()) , Qty: this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["n_qty"].trim()}
                    loadtextvalue[this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["C_Code"].trim()]=this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["n_qty"].trim()
                    Allpop[this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["C_Name"].trim()]=this.props.Editmodedata['DoctorPOB_FMCG_HDR'][next]["C_Code"].trim()
                })
                this.setState({ Allpop:Allpop, popjson:m,Showpop:showlocal,popjson:olddata,loadtextvalue:loadtextvalue})
                this.props.popSelected(olddata)
        }
           
        }
    }
    getPob() {

        var data = {"validate":"getPOB_orderentry","date":"04/06/2019","drcode":this.props.docid  }

        postToServer("DCRValidation", data).then((result) => {
            if( result.data["Status"]=="Fail"){
                this.setState({ Error: true, Errormsg: " NO POP Data" })
                return
            }else{
                if(result.data["Status"]=="Success"){
               this.setState({ data: result.data["data"] })
                }
            }
        }).catch( (Error)=>{
            this.setState({ Error: true, Errormsg: "Error in App" })
        })
        // var data = {
        //     Header: [
        //         {
        //             "fsc": "",
        //         }
        //     ],
        //     idx: "downloadDocItemRateMst",
        //     data: "04-08-2018"
        // }
       // this.props.getPobDetails(data)
    }
    handleChange(index, qty, id) {

        //  alert('kunal sinha')
        if (this.state.isButtonDisabled == true) {
            this.setState({
                isButtonDisabled: !this.state.isButtonDisabled
            })
        }
        const totalArray = this.state.data;
        totalArray[index].nqty = qty;
        this.setState({
            data: totalArray,
        })
        this.subTotal()
        ////console.log(totalArray)
    }
    subTotal() {
        let subTotal = 0;
        this.state.data.map((item, index) => {
            if (item.nqty != undefined) {
                subTotal = subTotal + parseFloat(item.rate * item.nqty)
            } else {
                subTotal = subTotal + parseFloat(item.rate * this.state.nqty)
            }
        },this.setState({Total:subTotal}))
    }
    save(e) {
        if (this.state.isButtonDisabled == false) {
            this.setState({
                isButtonDisabled: !this.state.isButtonDisabled
            });
        }
        this.state.data.map((item, index) => {
            this.setState({
                itemnameArray: []
            })
            if (item.nqty != undefined && item.nqty != 0) {
                this.state.itemnameArray.push({
                    itemid: item.cd,
                    itemname: item.nm,
                    itemqty: item.nqty,
                    itemrate: item.rate
                })
            }
        })
        this.setState({
            showData: this.state.itemnameArray
        })
    }
    deleteItem(e) {
      let showdeletepop =this.state.Showpop
      let deletekey =this.state.popjson
     delete deletekey[this.state.Allpop[e.target.id]]//="Delete"
     delete showdeletepop[e.target.id]
    this.setState({popjson:deletekey,Showpop:showdeletepop})
   
    this.props.popSelected(deletekey)



    let totalsum=0
    Object.keys(deletekey).map( (oneobect)=>{
       totalsum=totalsum + parseFloat( deletekey[oneobect]["name"] ) *    parseFloat(  deletekey[oneobect]["rate"])
    })
   this.setState({Total:totalsum})

    }
    deleteTotal(id) {
        this.state.data.map((item, index) => {
            if (item.cd == id) {
                this.setState({ data: dataval })
            }
        })
    }
    Total(iqty, irate) {
        return parseFloat(iqty * irate)
    }
    update(dataArray) {
        this.setState({
            filterdata: dataArray
        })
    }
    render() { //console.log(this.state.Showpop)
        const { data, filterdata,Total,loadtextvalue } = this.state
        if (!data)
            return null
        return (
            <div className="pobDrop jointDropdown">
                  <StatusPopup
                                message={this.state.Errormsg}
                                show={this.state.Error}
                                onClose={this.Errorclose}
                                success={false}
                            />
                <Dropdown className="multiple-dropdown marginBot10">
                    <Dropdown.Toggle id="dropdown-basic-pob">
                        <SearchInput compVal="POB" data={data} update={this.update} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <div>
                            {filterdata == '' ?
                                <div className="pobmenu cal-scrollbar">
                                    {data.map((item, index) => (

                                        <QuantityInput
                                        clearAll={this.props.clearAll}
                                        loadtextvalue={loadtextvalue}
                                            currentpop={this.state.popjson}
                                            updatedpop={this.popSelectedval}
                                            data={item}
                                            ind={index}
                                            id={item.cd}
                                            key={item.cd}
                                            value={item.nqty}
                                            rate={item.rate}
                                            update={this.handleChange}
                                        />

                                    ))}
                                    <div className="pobDiv">
                                        <Row>
                                            <Col lg={3} md={3} sm={3} xs={3} ></Col>
                                            <Col lg={4} md={4} sm={4} xs={4} ></Col>
                                            <Col lg={5} md={5} sm={5} xs={5} >
                                                <div className="flexrows">
                                                    <div>Total:&nbsp;&nbsp;</div>
                                                    <div>{Total}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div> :
                                <div className="pobmenu  cal-scrollbar">
                                    {filterdata.map((item, index) => (
                                        
                                            <QuantityInput
                                            loadtextvalue={loadtextvalue}
                                            currentpop={this.state.popjson}
                                            updatedpop={this.popSelectedval}
                                            data={item}
                                            ind={index}
                                            id={item.cd}
                                            key={item.cd}
                                            value={item.nqty}
                                            rate={item.rate}
                                            update={this.handleChange}
                                        />
                                       
                                    ))}
                                     <div className="pobDiv">
                                        <Row>
                                            <Col lg={3} md={3} sm={3} xs={3} ></Col>
                                            <Col lg={4} md={4} sm={4} xs={4} ></Col>
                                            <Col lg={5} md={5} sm={5} xs={5} >
                                                <div className="flexrows">
                                                    <div>Total:&nbsp;&nbsp;</div>
                                                    <div>{this.state.Total}</div>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>}
                        </div>
                        <Dropdown.Item eventKey={this.props.eventKey}>
                            <button onClick={this.save} className="pobBtn">DONE</button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className="selectedDiv cal-scrollbar">
                    { Object.keys(this.state.Showpop).map((data,index) => {
                        return <div key={index} className="selectedDropdown">{data.toLowerCase() + "(Qty." + this.state.Showpop[data]['Qty']+ ")" + "(Rs." + this.state.Showpop[data]['rate'] + ")"}<img src="../public/assets/images/cancel.png" className="closeImg"  value={data} onClick={this.deleteItem} id={data} /></div>
                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    data: state.DCRPob.data
})
const mapDispatchToProps = dispatch => ({
    getPobDetails: (data) => dispatch(getPobDetails(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(POBDropdown)
