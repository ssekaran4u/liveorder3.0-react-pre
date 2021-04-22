import React,{Component} from 'react'
import { Modal, Button,Dropdown } from "react-bootstrap";
import ProductCheckbox from './ProductCheckbox'
import {postToServer} from '../../../lib/comm-utils'
import StatusPopup from '../../../lib/StatusPopup'
class ProductDropDown extends Component{
    constructor(props){
        super(props)
        this.state={
            datakey:[],
            selectedData:{},
            selectedKey:{},
        }
        this.setSelection = this.setSelection.bind(this)
    }
    componentDidMount(){ 
      
        var data = {
            "Data":{"doc": this.props.doc_code, 
            subarea: this.props.subarea,
            Month: this.props.month,
            Year: this.props.year,
            day: this.props.day,

        
        
        },
            "index": "MTP_product"
           
        }
        //  this.props.getProductDetail(data)
        postToServer("MTP", data).then((result) => {
            if( result.data["Status"]=="Fail"){
                    this.setState({ Error: true, Errormsg: " NO Product Data" })
                return
            }else{
               // if(result.data["Status"]=="Success"){ 
                   this.setState({ datakey: result.data })
                   let m={}
                   let k={}
                   k[this.props.ntype]={}
                   k[this.props.ntype][this.props.doc_code]=[]

                   if(this.props.autoSelectProduct != ""){ 
                    result.data.map((val)=>{ 
                           this.props.autoSelectProduct.map((item)=>{
                               if((val.c_item_code).trim() == item.id.trim()){ 
                                   let itemid = val.c_name.trim()+'$'+this.props.doc_code
                                   if(!m[itemid]){
                                   k[this.props.ntype][this.props.doc_code].push(val.c_item_code)
                                   }
                                   m[itemid] =val.c_name +'('+val.c_item_code+')'
                                  
                               }
                           })
                       })
                   }
                  
                   this.setState({ selectedData:m  ,selectedKey:k })
                   this.props.sendProduct(k)
                   
                //}
            }
        }).catch( (Error)=>{
            this.setState({ Error: true, Errormsg: "Error in App" })
        })
    }
    componentDidUpdate(oldprops,oldsatate){
        if(oldprops.autoSelectProduct != this.props.autoSelectProduct){
            let m={}
            let k={}
            k[this.props.ntype]={}
            k[this.props.ntype][this.props.doc_code]=[]
            if(this.props.autoSelectProduct){ 
                this.state.datakey.map((val)=>{
                    this.props.autoSelectProduct.map((item)=>{
                        if((val.c_item_code).trim() == item.id.trim()){ 
                            let itemid = val.c_name.trim()+'$'+this.props.doc_code
                            m[itemid] =val.c_name +'('+val.c_item_code +')'
                            k[this.props.ntype][this.props.doc_code].push(val.c_item_code)
                            
                        }
                    })
                })
            }
            this.setState({
                selectedData:m
            })
            this.props.sendProduct(k)
        }
    }
    setSelection(id, name, checked,item,inputVal) {

        console.log( this.props.n_core_product_autosave ,this.props.coreproduct,id,name , item["c_item_code"],checked ,'kunal sinha<<<--')



        if(this.props.n_core_product_autosave=="1"){
            if(this.props.coreproduct[item["c_item_code"]]){
                if(this.props.coreproduct[item["c_item_code"]]== true ){
                    return
                }
            }
        }
        let  selectedData  ={}
        selectedData= this.state.selectedData;
        let k = {}
        k=this.state.selectedKey
        let type = this.props.ntype
        if( k[type] ){
            
        }else{
           
            k[type] = {}
        }
       
       if(checked){
        selectedData[id] = name+'('+item["c_item_code"]+')'

        let m=[]
        if(k[type][this.props.doc_code]){
            m=k[type][this.props.doc_code]
            m.push(item.c_item_code)
        }else{
            m.push(item.c_item_code)
        }
        k[type][this.props.doc_code] = m
        
       }else{ 
           if( k[type][this.props.doc_code]){
            if( k[type][this.props.doc_code].indexOf(item.c_item_code)==-1){
                k[type][this.props.doc_code].push(item.c_item_code)
            }else{
                k[type][this.props.doc_code].splice( k[type][this.props.doc_code].indexOf(item.c_item_code), 1 );
            }
        }
            delete selectedData[id]
       }
      
        this.setState({ 
            selectedData:selectedData,
            selectedKey:k

         })
       //  console.log(id, name, checked,item,inputVal,'kunaltri',k)  
         this.props.sendProduct(k)
    }
    removeItem(id,p,i) { 
        let k=this.state.selectedKey
        let { selectedData } = this.state        
        const item= selectedData[id]

        var mySubString = item.substring(
            item.lastIndexOf("(") + 1, 
            item.lastIndexOf(")")
        );




        if(this.props.n_core_product_autosave=="1"){
            if(this.props.coreproduct[mySubString]){
                if(this.props.coreproduct[mySubString]== true ){
                    return
                }
            }
        }
      
        if( k[this.props.ntype][this.props.doc_code]){
            if( k[this.props.ntype][this.props.doc_code].indexOf(item) !=-1){

                 console.log( k[this.props.ntype][this.props.doc_code].indexOf(item),'okokokoko')
            }
        }
           



        if( k[this.props.ntype][this.props.doc_code]){
            if( k[this.props.ntype][this.props.doc_code].indexOf(item)!=-1){
             
                k[this.props.ntype][this.props.doc_code].splice( k[this.props.ntype][this.props.doc_code].indexOf(item), 1 );
            }
        }
        delete selectedData[id] 
        this.setState({ selectedData,selectedKey:k })
        //console.log("docCode",selectedData )
        //this.props.getSelectProduct(id,this.state.Selectedprojectdetails[id]["name"],this.state.Selectedprojectdetails[id]["item"],'1')
    }
    render(){ 

     
        const {selectedData} = this.state
        if (!this.state.datakey)
        return null

        const items = this.state.datakey.reduce((prev, item, index) => {
        const id = item.c_name + '$' + this.props.doc_code ;
        const selection = selectedData[id] ? selectedData[id] : false
        prev.push(
            <ProductCheckbox
                docode={ this.props.doc_code}
                key={"ppobject"+this.props.id +'$'+item.c_name +'$'+ + '$'  + item.c_item_code + '$' +this.props.doc_code }
                setSelection={this.setSelection}
                selection={selection}
                id={id}
                item={item}
            />
        )
    return prev
    },[])
    const selections = Object.keys(selectedData).reduce((p, n, i) => {
        // if (typeof (selectedData[n]) === "string") {
            const name = n.split('$')[1];
            p.push(
                <div key={n} className="selectedDropdown">{selectedData[n]==true  ?'None' : selectedData[n]  }
                    <img src="../public/assets/images/cancel.png" className="closeImg"
                        onClick={this.removeItem.bind(this,n,p,i)} />
                </div>
            )
        // }
        return p
    }, []) 
        return(
            <div className=" productDetailDrop">
                <Dropdown className="multiple-dropdown marginBot10">
                    <Dropdown.Toggle id="dropdown-basic">
                        {/* <SearchInput compVal="productDetail" data={datakey['downloadDcrPdt']} update={this.update} /> */}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <div className="cal-scrollbar jointData">
                            {items }
                        </div>
                        <Dropdown.Item eventKey={this.props.eventKey}>
                            <button  className="doneBtn">DONE</button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <div className="selectedDiv cal-scrollbar">
                    {selections}
                </div>
            </div>
        )
    }
}
export default ProductDropDown