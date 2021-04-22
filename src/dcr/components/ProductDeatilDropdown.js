/*
* This code will display productdetailing and doctor role which includes prescriber,non prescriber,convert and others inside fieldworkdwr when doctorsearch is given
* Request URL=url/Android
* Index=downloadDcrPdt
* Request string={"Header":[{"fsc":"","fscode":"mr1","area":"TNH0012","search":"","cd":""}],"idx":"downloadDcrPdt","Token":""}
* Response string={
    c_doc_code:D060883
    c_fs_code:PSR010
    c_item_code:BR001
    c_name:Brand1
    d_date_to:2029-08-24
    d_from_date:2018-01-01
    n_priority:1
}
* Response Error={}

*/




import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getProductDetail } from '../../actions/DCR'
import SearchInput from './SearchInput'
import { Dropdown, Form, Row, Col } from 'react-bootstrap'
import ProductDetailObject from './ProductDetailObject';
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
import { getProducts } from '../../actions/DCR'

class ProductDeatilDropdown extends Component {
    constructor(props) {
        super(props)
        this.state = {
            datakey: [],
            popjson: {},
            selectedData: {},
            filterdata: [],
            Errormsg: '',
            Error: false,
            Selectedprojectdetails:{}
        }
        this.getProduct = this.getProduct.bind(this)
        this.update = this.update.bind(this)
        this.Errorclose=this.Errorclose.bind(this)
        // this.popSelectedval=this.popSelectedval.bind(this)
    }


    componentDidUpdate(oldprops,oldsatate)
    {
       if(oldprops.clearAll!=this.props.clearAll)
       {
          this.setState({selectedData:{}})
       }
    }
    static getDerivedStateFromProps(nextProps, prevState) { 
       

        if (prevState.productdata !== nextProps.productdata){
          //  console.log("sweta",nextProps)
            return { ...prevState, productdata:nextProps.productdata };
        }
        
            
        return null;
    }
    componentDidMount() {
        this.getProduct()
        if(this.props.Editmodedata)
        {
            if( this.props.Editmodedata['DWR_sub_DETAILS']){
                let m={}
                const loc=this.state.Selectedprojectdetails
                Object.keys(this.props.Editmodedata['DWR_sub_DETAILS']).map( (next)=>{   

                    if(this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Doc_Code"]==this.props.docode){ 
                if(this.props.Editmodedata['DWR_sub_DETAILS'][next]["TYPE"].trim()=='Product'){      
                    const k=this.props.id+'$'+this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Name"].trim()+'$'+ + '$'  + this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_ITEM_EXP"].trim()+ '$' + this.props.docode ;
                    let xx={"c_item_code": this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_ITEM_EXP"].trim(),"c_name":this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Name"].trim(),"textval":"",}
                    this.props.getSelectProduct('', "None",xx,'0')
                    //this.props.id +'$'+item.c_name +'$'+ + '$'  + item.c_item_code + '$' + item.c_doc_code ;
                   
                    loc[k]={"name":this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Name"].trim(), "item":xx}
                    
                    //+this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Doc_Code"].trim() ;
                   // console.log(k,'klkl')
                  
                if (this.props.Editmodedata['DWR_sub_DETAILS'][next]["c_pref_code"].trim() == "1") {
                    m[k] = 'Prescriber'
                }

                if (this.props.Editmodedata['DWR_sub_DETAILS'][next]["c_pref_code"].trim() == "2") {
                    m[k] = 'Non Prescriber'
                }
                if (this.props.Editmodedata['DWR_sub_DETAILS'][next]["c_pref_code"].trim() == "3") {
                    m[k] = 'Convert'
                }
                if (this.props.Editmodedata['DWR_sub_DETAILS'][next]["c_pref_code"].trim() == "4") {
                    m[k] = 'Others'
                }

                if (this.props.Editmodedata['DWR_sub_DETAILS'][next]["c_pref_code"].trim() == "") {
                    m[k] = 'NONE'
                }
                
                    }
                    //selectedData[id] = checked
                }
                })
               
                this.setState({selectedData:m,Selectedprojectdetails:loc})
                
//this.props.id + '$' + item.c_name + '$' + item.c_doc_code+index ;
//
          
        }
           
        }
        if(this.state.productdata){ 
            let firstdic = {}


            firstdic=this.state.selectedData
            this.state.productdata.map((item) => { 
            if(item['doc_code'] == this.props.docode){
               const t = item['itemname'];
               const k=this.props.id +'$'+item.name +'$'+ + '$'  + item.itemvalue + '$' +this.props.docode ;  
               let xx={"c_item_code":item['itemvalue'].trim(),"c_name": item['name'].trim(),"textval":"",}
               this.props.getSelectProduct('', "Prescriber",xx,'0')
               firstdic[k]='Prescriber'
                

            }

            }, this.setState({selectedData:firstdic}) )
           
        }
    }
    Errorclose() {
        this.setState({ Error: false })
    }
    getProduct() {

        var day=''
        var  year=''
        var  month=''
         if(this.props.Selectdate !=undefined){
       day=  this.props.Selectdate.getDate() 
       year= this.props.Selectdate.getFullYear()
       month= this.props.Selectdate.getMonth()+1
         }else{
            var d = new Date();
            month=d.getMonth()+1
            year=d.getFullYear()
            day=d.getDate()

         }

    //   alert(day)
    //   alert(year)
    //   alert(month)
        //'30/06/2019'  ---dd/MM/yyyy format
        const date =day+"/"+ month + "/"+year  
        var data = {
            "Data":{"doc": this.props.docode, date:date , "Fscode":this.props.loadself["FsCode"]  },
            "index": "downloadDcrPdt",
            "Token": ""
        }
        //  this.props.getProductDetail(data)
        postToServer("DCRAPI", data).then((result) => {
            if( result.data["Status"]=="Fail"){
                this.setState({ Error: true, Errormsg: " NO Product Data" })
                return
            }else{
                if(result.data["Status"]=="Success"){
            this.setState({ datakey: result.data })
                }
            }
        }).catch( (Error)=>{
            this.setState({ Error: true, Errormsg: "Error in App" })
        })
    }
    removeItem(id) { 


            if(this.props.notallowed==true){
            this.setState({ Errormsg:'EDIT NOT Allowed', Error:true })
            
            //message={this.state.Errormsg}
            //show={this.state.Error}
            // this.removeItem(name)
                    return
                   }  
     
        let { selectedData } = this.state

        delete selectedData[id] 
        this.setState({ selectedData })
        console.log(this.state.Selectedprojectdetails )
        this.props.getSelectProduct(id,this.state.Selectedprojectdetails[id]["name"],this.state.Selectedprojectdetails[id]["item"],'1')
   
    
    }
    setSelection(id, name, checked,item,inputVal) {


       if(this.props.notallowed==true){
this.setState({ Errormsg:'EDIT NOT Allowed', Error:true })

//message={this.state.Errormsg}
								//show={this.state.Error}
        return
       }
        //console.log(id, name, checked,item,inputVal)
        let { selectedData } = this.state;
        switch (name) {
            case 'Prescriber':
            case 'Non Prescriber':
            case 'Convert':
            case 'Others':
                if (checked)
                    selectedData[id] = name
                else if (selectedData[id] == name)
                    delete selectedData[id] 
                break;
            default:
                //delete selectedData[id] 
                selectedData[id] = checked
                break;
        }
        let loc=this.state.Selectedprojectdetails
        loc[id]={"name":name, "item":item}
        if(!checked){
            delete selectedData[id] 
            delete loc[id]
            this.props.getSelectProduct(id, name,item,'1')
        }else{
            this.props.getSelectProduct(id, name,item,'0')
        }
        this.setState({ selectedData,Selectedprojectdetails:loc })
        
    }
    update(dataArray) {
        this.setState({
            filterdata: dataArray
        })
    }
    render() { 
        const { datakey, selectedData, filterdata } = this.state
        if (!datakey["downloadDcrPdt"])
            return null
        const items = datakey["downloadDcrPdt"].reduce((prev, item, index) => {
            const id = this.props.id +'$'+item.c_name +'$'+ + '$'  + item.c_item_code + '$' + this.props.docode ;
            const selection = selectedData[id] ? selectedData[id] : false
            prev.push(
                <ProductDetailObject
                    Editmodedata={this.props.Editmodedata}
                    docode={ this.props.docode}
                    key={"ppobject"+this.props.id +'$'+item.c_name +'$'+ + '$'  + item.c_item_code + '$' +this.props.docode }
                    setSelection={this.setSelection.bind(this)}
                    selection={selection}
                    id={id}
                    item={item}
                />
            )
            return prev
        },[])
        const searchitems = filterdata.reduce((prev, item, index) => {
            const id = this.props.id + '$'+item.c_name +'$'+ item.c_item_code + '$' + item.c_doc_code+'$'+item.n_priority ;
            const selection = selectedData[id] ? selectedData[id] : false
            //  if (index <= 2)
            prev.push(
                <ProductDetailObject
                Editmodedata={this.props.Editmodedata}
                docode={ this.props.docode}
                    key={"ProductDetailObject" + this.props.id + '$'+item.c_name +'$'+ item.c_item_code + '$' + item.c_doc_code+'$'+index  }
                    setSelection={this.setSelection.bind(this)}
                    selection={selection}
                    id={id}
                    item={item}
                />
            )
            return prev
        }, [])
        const selections = Object.keys(selectedData).reduce((p, n, i) => {
            // if (typeof (selectedData[n]) === "string") {
                const name = n.split('$')[1];
                p.push(
                    <div key={n} className="selectedDropdown"> {name.toLowerCase()}<span>({selectedData[n]==true  ?'None' : selectedData[n]  })</span>
                        <img src="../public/assets/images/cancel.png" className="closeImg"
                            onClick={this.removeItem.bind(this, n)} />
                    </div>
                )
            // }
            return p
        }, []) 
        return (
            <React.Fragment>
                <div className=" productDetailDrop">
                    <Dropdown className="multiple-dropdown marginBot10">
                        <Dropdown.Toggle id="dropdown-basic">
                            <SearchInput compVal="productDetail" data={datakey['downloadDcrPdt']} update={this.update} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <div className="cal-scrollbar jointData">
                                {filterdata == '' ? items : searchitems}
                            </div>
                            <Dropdown.Item eventKey={this.props.eventKey}>
                                <button  className="doneBtn">DONE</button>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                        
                    </Dropdown>
                </div>
                <StatusPopup
								message={this.state.Errormsg}
								show={this.state.Error}
								onClose={this.Errorclose}
								success={false}
							/>
                <div className="selectedDiv cal-scrollbar">
                    {selections}
                </div>
            </React.Fragment>
        )
    }
}

    const mapStateToProps = state => ({
    
        productdata:state.DCR.productdata
    });
export default connect(mapStateToProps,null)(ProductDeatilDropdown)