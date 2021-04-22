import React from 'react'
import { connect } from 'react-redux';
import { getRCPA } from '../../actions/DCR'
import { postToServer } from '../../lib/comm-utils'
import ProductTable from '../RCPA/ProductTable'

class Products extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showComp: false,
            compitordetails: {},
            Finalcompititordata:{},
            Enterproduct: {},
            AllEnterproduct:{},
            SaveData:{
                valuetype: "",
                rxtype: "",
                qtytype: "",
                wtgtype: ""
            },
            isLoading: true,
            isdisable : '',
            isdis : '',
            selectedvales : [],
            previousval : ""
        };

        this.state.products = [
            {
                id: 1,
                name: '',
                rx: '',
                qty: '',
                value: '',
                weight: '',
                RCPAdata: [],
                productdropdata: [],
                competitordropdata: {},
                SetupRCPA: {},
                Enterproduct:{},
                selectedProduct:''
               
            }
        ];

        this.loadsetupRCPA = this.loadsetupRCPA.bind(this)
        this.func_compitior_data = this.func_compitior_data.bind(this)
        this.funEnterproduct=this.funEnterproduct.bind(this) 
        this.getproduct=this.getproduct.bind(this)
        this.onAutoselectDropdownChange = this.onAutoselectDropdownChange.bind(this)
        this.removeCompetitor = this.removeCompetitor.bind(this)
        this.removeBrand = this.removeBrand.bind(this)
        this.uncheckdisabled= this.uncheckdisabled.bind(this)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.RCPAdata !== nextProps.RCPAdata)
            return { ...prevState, RCPAdata: nextProps.RCPAdata }
        return null
    }

    removeCompetitor(brandCode, oldData) {
        this.props.funRCPARemove(this.props.data, brandCode, oldData)
    }

    func_compitior_data(oldData, data, brand, previousval) {
        if(brand=="-1"){
            this.props.funRCPA("", {}, this.props.data)
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
        this.props.funRCPA(oldData, selectedProductcomptitor, this.props.data)
        let selectedvales = this.state.selectedvales
        selectedvales.push(oldData)
        this.setState({isdis:oldData,selectedvales:selectedvales,previousval:previousval})
    }

    removeBrand(brandCode, isRemoveAll) {
        if (isRemoveAll) {
            this.setState({ compitordetails: {}, Finalcompititordata: {}, Enterproduct: {} })
        }
        this.props.productRCPARemove(this.props.data, brandCode, isRemoveAll)
    }

    funEnterproduct(oldData, Data){
        if(oldData != ''){
            // let array1 = this.state.productdropdata
            // array1.map((item)=>{
            //     if(item['ouritemcode'] == oldData){
            //     item['disabled'] = true
            //     }
            //   })
            //   this.setState({array1:this.state.productdropdata})
            this.setState({isdisable:oldData})
        }
        // var Enterproduct={}
        // if( this.state.Enterproduct!=undefined){
        //     Enterproduct = this.state.Enterproduct
        // }
        // Enterproduct[Object.keys(data)[0]]=data[Object.keys(data)[0]]
        // this.setState({ Enterproduct: Enterproduct })
        // this.props.productRCPA(oldData, Enterproduct, this.props.data)

        if (this.props.data != "" && this.props.data != undefined && 
            oldData != "" && oldData != undefined) {
            
            // console.log("AddRow", oldData)

            let Finalcompititordata = this.state.Finalcompititordata
            let newInnerData = {}
            let oldInnerData = {}
            if (Finalcompititordata[this.props.data] != undefined) {
                oldInnerData = Finalcompititordata[this.props.data]
            }
            
            Object.keys(oldInnerData).map((key) => {
                // console.log("AddRowCOMPARE", oldData, key)
                if (oldData != key) {
                    newInnerData[key] = oldInnerData[key]
                }
            })
            // console.log("AddRow FINAL", newInnerData)
            Finalcompititordata[this.props.data] = newInnerData
            this.setState({ Finalcompititordata: Finalcompititordata })
            // console.log("AddRow END ", this.state.Finalcompititordata)
        }

        let oldOuterObject = {}
        if( this.state.Enterproduct!=undefined){
            oldOuterObject = this.state.Enterproduct
        }

        let newInnerObject = {}
        let oldInnerObject = {}
        if (oldOuterObject[this.props.data]) {
            oldInnerObject = oldOuterObject[this.props.data]
        }
        Object.keys(oldInnerObject).map((key) => {
            if (oldData != key) {
                newInnerObject[key] = oldInnerObject[key]
            }
        })
        oldOuterObject[this.props.data] = newInnerObject
        let newFinalproductwiseRCPA = oldOuterObject
        let newInnerData = {}
        let newItemKey = Object.keys(Data)[0]
        let oldInnerData = Data[Object.keys(Data)[0]]
        Object.keys(oldInnerData).map((key) => {
            newInnerData[key] = oldInnerData[key]
        })
        if (newFinalproductwiseRCPA[this.props.data] == undefined) {
            newFinalproductwiseRCPA[this.props.data] = {}
        } 
        newFinalproductwiseRCPA[this.props.data][newItemKey] = newInnerData
        // console.log(newFinalproductwiseRCPA)
        this.setState({ Enterproduct: newFinalproductwiseRCPA })
        this.props.productRCPA(oldData, newFinalproductwiseRCPA, this.props.data)
    }

    loadsetupRCPA() {
        const data = { "index": "RCPA_SetUp" }
        postToServer("DCRAPI", data).then((result) => {
            if (result.data["Status"] == "success") {
                this.setState({ SetupRCPA: result.data["Data"][0] })
            }
        }).catch((Error) => {
            //
        })
    }

    getproduct(){
        let  productName={}
        // const data = { "index": "RCPA_Product" }
        // postToServer("DCRAPI", data).then((result) => {
        //     if (result.data["Status"] == "success") {
        //         this.setState({productdropdata: result.data.Data})
        //             result.data["Data"].map( (temp)=>{
        //             productName[temp["C_Code"]] = "Item Added"
        //         }) 
        //     }
        // }).catch((Error) => {
        //     console.log('Error',Error)
        // })
        const data = { "Index": "BrandList" }
        postToServer("RCPA_API", data).then((result) => {
            if (result.data["Status"] == "Success") {
                this.setState({productdropdata: result.data.Result})
                result.data.Result.map((temp) => {
                    productName[temp["ouritemname"]] = "Item Added"
                })
            }
            this.setState({ isLoading: false })
        }).catch((Error) => {
            // console.log('Error',Error)
        })
    }

    componentDidUpdate(oldprops,oldsatet){



        let count=0;
        if( oldprops.Editmodedata != this.props.Editmodedata)
        {
        

            if(this.props.Editmodedata["Result"]){
                let products=[]
                this.props.Editmodedata["Result"].map( (a)=>{
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
       if(oldprops.isdelete != this.props.isdelete && this.props.isdelete == true)
    // if(this.props.checkedvalues != '' && this.props.isdelete == true)
       {
           //this.uncheckdisabled()
            // let productdropdata = this.state.productdropdata
            // let array2 = this.props.checkedvalues
            // array2.map((element) => {
            //     productdropdata.map((item)=>{
            //         if(item['ouritemcode'] == element){
            //         item['disabled'] = false
            //         }
            //       })
            // })
            //   this.setState({productdropdata:productdropdata})
            // this.setState({productdropdata:array1}) 
       }
    }
    uncheckdisabled(val){ 
        let productdropdata = this.state.productdropdata
            let array2 = this.props.checkedvalues
            array2.map((element) => {
                productdropdata.map((item)=>{
                    if(item['ouritemcode'] == element){
                    item['disabled'] = false
                    }
                  })
            })
             this.setState({productdropdata:productdropdata})
    }
    componentDidMount() {
        let count=0;

        if (this.props.Editmodedata) {

            if (this.props.Editmodedata["Result"]) {
                let products=[]
                this.props.Editmodedata["Result"].map((a) => {
                    if (a.C_DOCTOR_CODE==this.props.data) {
                        if ( a.C_COMPETITOR_PR_NAME=='') {
                            count=count+1
                            var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
                            var product = {
                                id: id, selectedProduct:a.C_BRAND_CODE
                            }
                            products.push(product);
                        }
                    }
                })

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
        if(this.state.isdisable != ''){
					if(this.props.checkedvalues == ''){
						let array1 = this.state.productdropdata
        		array1.map((item)=>{
                if(item['ouritemcode'] == this.state.isdisable){
                item['disabled'] = true
                }
            })
        		this.setState({productdropdata:array1})
					}
					else{
						this.props.setcheckedvalues()
						// let array1 = this.state.productdropdata
						// let array2
        		// array1.map((item)=>{
            //     if(item['ouritemcode'] == this.state.isdisable){
            //     item['disabled'] = true
            //     }
            // })
        		// this.setState({productdropdata:array1})
					}
        }
        if(this.state.products[0].selectedProduct !=''){
            let array1 = this.state.productdropdata
            let array2 = this.state.products
            array2.map((elememt) => {
                array1.map((item)=>{
                    if(item['ouritemcode'] == elememt.selectedProduct){
                    item['disabled'] = true
                    }
                  })
            })
            this.setState({productdropdata:array1})
        }
    }

    onAutoselectDropdownChange(jsonKey, jsonValue) {
        let saveData = this.state.SaveData
        if (jsonKey == "rxtype") {
            saveData.rxtype = jsonValue
        } else if (jsonKey == "qtytype") {
            saveData.qtytype = jsonValue
        } else if (jsonKey == "valuetype") {
            saveData.valuetype = jsonValue
        } else if (jsonKey == "wtgtype") {
            saveData.wtgtype = jsonValue
        }
        this.setState({SaveData: saveData})
        this.props.saveData(saveData)
    }
    
    render() {
        let result = []
        result.push({ "id": '-1', "key": '-1', "text": 'Please Select  Brand  ', "value": '-1' })
        if(this.state.productdropdata != undefined){
            if(this.state.productdropdata.length>0){
                this.state.productdropdata.map( res => {
                    result.push({
                        "id": res.ouritemcode,
                        "key": res.ouritemcode,
                        "text": res.ouritemname + " (" +res.ouritemcode + ")",
                        "value": res.ouritemcode,
                        "unitPrice": res.n_rate,
                        disabled : res.disabled
                    })
                })
            } 
        }
        
        const data = this.state.productdropdata
        return (
            <div>
                {this.state.isLoading ?  '' : (<ProductTable  
                    doccode={this.props.data}   
                    Editmodedata={this.props.Editmodedata}  
                    funEnterproduct={this.funEnterproduct} 
                    loadRCP={this.state.SetupRCPA} 
                    func_compitior_data={this.func_compitior_data} 
                    competitordata={this.state.competitordropdata} 
                    Productdrop={result} 
                    on_auto_change={this.onAutoselectDropdownChange}
                    showComp={this.state.showComp} 
                    onRowAdd={this.handleAddEvent.bind(this)} 
                    products={this.state.products}
                    unmountMe={this.handleChildUnmount}
                    configurationData={this.props.configurationData}
                    funRCPARemove={this.removeCompetitor}
                    productRCPARemove={this.removeBrand}  
                    isdisable={this.state.isdis}
                    selectedvales={this.state.selectedvales}
                    getcheckedvalue={this.props.getcheckedvalue}
                    checkedvalues={this.props.checkedvalues} 
                    isdelete={this.props.isdelete}
                    productdropdata={this.state.productdropdata}
                    previousval={this.state.previousval}
                    FinalproductwiseRCPA={this.props.FinalproductwiseRCPA}
                    setdelete={this.props.setdelete}
                    uncheckdisabled={this.uncheckdisabled}/>)}
                    
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
