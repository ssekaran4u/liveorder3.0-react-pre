/*
 creating table and adding row on click event

* Request URL=url/DCRAPI
* Index=RCPA_SetUp
* Request string={"index":"RCPA_SetUp","Token":""}
* Response string={
    N_AUDIT_FREQUENCY:4
    N_EDITDAYS:2
    N_QTYTYPE:30
    N_QTYTYPE_ACTIVE:1
    N_QTYTYPE_CHANGE:1
    N_RXTYPE:30
    N_RXTYPE_CHANGE:0
    N_RX_ACTIVE:1
    N_VALUETYPE:7
    N_VALUETYPE_ACTIVE:1
    N_VALUETYPE_CHANGE:0
    N_VALUE_IN:1
    N_WEIGHTAGETYPE:30
    N_WEIGHTAGETYPE_CHANGE:1
    N_WEIGHTAGE_ACTIVE:1
    n_SourceVisibility:0
}
* Response Error={}
 */
import React, { Component } from 'react'
import { Form, Table } from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getRCPA } from '../../actions/DCR'
import { postToServer } from '../../lib/comm-utils'
import RCPAPopup from '../popups/RCPAPopup';

import ProductTable from '../RCPA/ProductTable'


class Products extends React.Component {
    constructor(props) {
        super(props);
        //  this.state.products = [];
        this.state = {
            showComp: false,
            compitordetails: {},
            Finalcompititordata:{} ,// ginal generated data in doctor wise
            AllEnterproduct:{}
        };
        this.state.products = [
            {
                id: 1,
                name: '',
                rx: '',
                qty: 0,
                value: '',
                weight: '',
                RCPAdata: [],
                productdropdata: [],
                competitordropdata: {},
                SetupRCPA: {},
                Enterproduct:{},selectedProduct:''
               
            }
        ];
        this.loadsetupRCPA = this.loadsetupRCPA.bind(this)
        this.func_compitior_data = this.func_compitior_data.bind(this)
        this.funEnterproduct=this.funEnterproduct.bind(this) 
        this.getproduct=this.getproduct.bind(this)
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.RCPAdata !== nextProps.RCPAdata)
            return { ...prevState, RCPAdata: nextProps.RCPAdata }
        return null
    }




    func_compitior_data(data, brand) {
        if(brand=="-1"){
            this.props.funRCPA( {},this.props.data)
            return
        }
        var Finalcompititordata={}
        Finalcompititordata=this.state.Finalcompititordata
        let selectedProductcomptitor = this.state.compitordetails
        if (selectedProductcomptitor[brand]) {
            let temdata = selectedProductcomptitor[brand]
            const datakey = Object.keys(data)
            selectedProductcomptitor[brand][datakey] = data[datakey]
            Finalcompititordata[this.props.data]=selectedProductcomptitor
            this.setState({ compitordetails: selectedProductcomptitor ,Finalcompititordata:Finalcompititordata })
        } else {
            const datakey = Object.keys(data)
            selectedProductcomptitor[brand] = {}
            selectedProductcomptitor[brand][datakey] = data[datakey]
            Finalcompititordata[this.props.data]=selectedProductcomptitor
            this.setState({ compitordetails: selectedProductcomptitor ,Finalcompititordata:Finalcompititordata })
        }
        console.log(selectedProductcomptitor,this.props.name, this.props.data  )
     // console.log('Final compititor',Finalcompititordata)
        this.props.funRCPA( selectedProductcomptitor,this.props.data )
        
    }
    funEnterproduct(data){
       var Enterproduct={}
       if( this.state.Enterproduct!=undefined){
        Enterproduct =  this.state.Enterproduct
       }
       Enterproduct[Object.keys(data)[0]]=data[Object.keys(data)[0]]
       this.setState({ Enterproduct: Enterproduct })
       this.props.productRCPA(Enterproduct,this.props.data)
    }
    loadsetupRCPA() {
        const data = { "index": "RCPA_SetUp" }
        postToServer("DCRAPI", data).then((result) => {
            // console.log(result)
            if (result.data["Status"] == "success") {
                this.setState({ SetupRCPA: result.data["Data"][0] })
            }
        }).catch((Error) => {
            // Error need to handle 
          //  console.log('Error')
        })
    }

 getproduct(){

    
     
     const data = { "index": "RCPA_Product" }
     let  productName={}
    //  let pdroductarray=[]
    //  pdroductarray.push({ "id": '-1', "key": '-1', "text": 'Please Select  Brand  ', "value": '-1' })
     postToServer("DCRAPI", data).then((result) => {
         if (result.data["Status"] == "success") {
            // this.setState({ SetupRCPA: result.data["Data"][0] })
            // console.log(result.data.Data, "kumar coding1")
            // result.data.Data.map((temp)=>{
            //     pdroductarray.push({
            //         "id": temp[Object.keys(temp)[0]],
            //         "key": temp[Object.keys(temp)[0]],
            //         "text": temp[Object.keys(temp)[0]] + "(" +temp[Object.keys(temp)[1]] + ")",
            //         "value": temp[Object.keys(temp)[0]]
            //     })
            // },
            this.setState({productdropdata: result.data.Data})
             result.data["Data"].map( (temp)=>{
            //     if (!productName[temp["C_Code"]]) {
            //     pdroductarray.push({ id: temp["C_Code"], key: temp["C_Code"] , text: temp["C_Name"] + '(' + temp["C_Code"] + ')', value: temp["C_Code"]  })
                productName[temp["C_Code"]] = "Item Added"
            } 
             )
            // this.setState({productdropdata: pdroductarray}))
            

            // 
         }
         
     }).catch((Error) => {
        
      console.log('Error',Error)
     })
 }

    componentDidUpdate(oldprops,oldsatet){



        let count=0;
        if( oldprops.Editmodedata != this.props.Editmodedata)
        {
        

            if(this.props.Editmodedata["Rcpa"]){
                let products=[]
                this.props.Editmodedata["Rcpa"].map( (a)=>{
                    if(a.C_DOCTOR_CODE==this.props.data){
                    if( a.C_COMPETITOR_PR_NAME==''){
                  
                    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
                    var product = {
                        id: id,
                        selectedProduct:a.C_BRAND_CODE
                    }
                    products.push(product);
                }
           
            }
                } )
                if(count!=0){
                this.setState({products:products});
                }

          
            }
        }

        if(this.state.RCPAdata!=oldsatet.RCPAdata){
            var pdroductarray = []
            var dic_of_compitor = {}
            let productName = {}
            pdroductarray.push({ id: '-1', key: '-1', text: 'Please Select  Brand  ', value: '-1' }, )
            if (this.state.RCPAdata) {
                if (this.state.RCPAdata.Data) {
                    this.state.RCPAdata.Data.map((obj, i) => {
                        // At a time only one item will come 
                        // becuase table structure  giving multiple repeated values
                       
                         /*
                            Logic  created  compititor dropdown 
                            it is a list  of dropdown  that genrated with brand code  so 
                            it will give selected compitor   on select product 
                        */
                        var list_compititor = []
                        list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Compititor  ', value: '-1' }, )
                        if (dic_of_compitor[obj["C_BRAND_CODE"]]) {
                            list_compititor = dic_of_compitor[obj["C_BRAND_CODE"]]
                            list_compititor.push({ id: obj["C_PRODUCT_NAME"] + i, key: obj["C_PRODUCT_NAME"] + i, text: obj["C_PRODUCT_NAME"] + '(' + obj["C_MFAC_NAME"] + ')', value: obj["C_PRODUCT_NAME"] })
                        }
                        else {
                            list_compititor.push({ id: obj["C_PRODUCT_NAME"] + i, key: obj["C_PRODUCT_NAME"] + i, text: obj["C_PRODUCT_NAME"] + '(' + obj["C_MFAC_NAME"] + ')', value: obj["C_PRODUCT_NAME"] })
                        }
                        dic_of_compitor[obj["C_BRAND_CODE"]] = list_compititor
                    }, this.setState({ competitordropdata: dic_of_compitor }))
                }
            }
        }
    }
    componentDidMount() {

      
       // console.log(this.props.Editmodedata,'kunal RCPA')
       let count=0;

            if(this.props.Editmodedata)
            {

                if(this.props.Editmodedata["Rcpa"]){
                  
                    let products=[]
                    this.props.Editmodedata["Rcpa"].map( (a)=>{
                        if(a.C_DOCTOR_CODE==this.props.data){
                       
                        if( a.C_COMPETITOR_PR_NAME==''){
                            count=count+1
                        var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
                        var product = {
                            id: id, selectedProduct:a.C_BRAND_CODE
                        }
                        products.push(product);
                    }
                     
                }
                    } )

                    if(count!=0){
                    this.setState({products:products});
                    }
                   
               
            }
        }
      
      
        this.loadsetupRCPA()
        var pdroductarray = []
        var dic_of_compitor = {}
        let productName = {}
        pdroductarray.push({ id: '-1', key: '-1', text: 'Please Select  Brand  ', value: '-1' }, )
        if (this.state.RCPAdata) {
            if (this.state.RCPAdata.Data) {
                this.state.RCPAdata.Data.map((obj, i) => {
                    // At a time only one item will come 
                    // becuase table structure  giving multiple repeated values
                    // if (!productName[obj["C_BRAND_CODE"]]) {
                    //     pdroductarray.push({ id: obj["C_BRAND_CODE"], key: obj["C_BRAND_CODE"] + i, text: obj["C_Name"] + '(' + obj["C_BRAND_CODE"] + ')', value: obj["C_BRAND_CODE"] })
                    //     productName[obj["C_BRAND_CODE"]] = "Item Added"
                    // } 
                     /*
                        Logic  created  compititor dropdown 
                        it is a list  of dropdown  that genrated with brand code  so 
                        it will give selected compitor   on select product 
                    */
                    var list_compititor = []
                    list_compititor.push({ id: '-1', key: '-1', text: 'Please Select  Compititor  ', value: '-1' }, )
                    if (dic_of_compitor[obj["C_BRAND_CODE"]]) {
                        list_compititor = dic_of_compitor[obj["C_BRAND_CODE"]]
                        list_compititor.push({ id: obj["C_PRODUCT_NAME"] + i, key: obj["C_PRODUCT_NAME"] + i, text: obj["C_PRODUCT_NAME"] + '(' + obj["C_MFAC_NAME"] + ')', value: obj["C_PRODUCT_NAME"] })
                    }
                    else {
                        list_compititor.push({ id: obj["C_PRODUCT_NAME"] + i, key: obj["C_PRODUCT_NAME"] + i, text: obj["C_PRODUCT_NAME"] + '(' + obj["C_MFAC_NAME"] + ')', value: obj["C_PRODUCT_NAME"] })
                    }
                    dic_of_compitor[obj["C_BRAND_CODE"]] = list_compititor
                }, this.setState({ competitordropdata: dic_of_compitor, productdropdata: pdroductarray }))
            }
        }
        this.getproduct()
    }
    /* adding new product row on click*/
    handleAddEvent() {
        var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
        var product = {
            id: id,    selectedProduct:''
        }
        this.state.products.push(product);
        this.setState(this.state.products);
    }

             
    render() {
        let result = []
        result.push({ "id": '-1', "key": '-1', "text": 'Please Select  Brand  ', "value": '-1' })
        if(this.state.productdropdata != undefined){
        if(this.state.productdropdata.length>0){
            this.state.productdropdata.map(res=>{
                result.push({
                    "id": res.C_Code,
                    "key": res.C_Code,
                    "text": res.C_Code + "(" +res.C_Name + ")",
                    "value": res.C_Code
                })
            })
        } 
    }
        // console.log(this.state.SetupRCPA,"kumar coding lihdkihdih sdfsdfds")
        const data = this.state.productdropdata
        return (
            <div>
                <ProductTable  
                doccode={this.props.data}   
                Editmodedata={this.props.Editmodedata}  
                funEnterproduct={this.funEnterproduct} 
                loadRCP={this.state.SetupRCPA} 
                func_compitior_data={this.func_compitior_data} 
                competitordata={this.state.competitordropdata} 
                Productdrop={result} 
                showComp={this.state.showComp} 
                onRowAdd={this.handleAddEvent.bind(this)} 
                products={this.state.products} />
            </div>
        );
    }
}


const mapStateToProps = state => ({
    RCPAdata: state.DCR.RCPAdetailskey
})

const mapDispatchToProps = dispatch => ({
    getRCPA: (RCPAdata) => dispatch(getRCPA(RCPAdata))
})

export default connect(mapStateToProps, mapDispatchToProps)(Products)
