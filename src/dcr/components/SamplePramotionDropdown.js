/*
* This code will display samples and promotions dropdown which includes samples and promotions and gifts inside selected doctor of
* Request URL=url/DCRValidation
* Index=getSamplePromotionGiftlist
* Request string={"Token":"","validate":"getSamplePromotionGiftlist","fscode":"","date":"05/05/2019","dcrno":"","drcode":"D98831","ntype":"1"}
* Response string={
    DcrItemSamples:""
    N_desc:gift
    Stock Balance:1731
    balsumqty:1731
    c_code:GFM0191
    c_name:GIFT - 4 in 1 COMBO BOX
    n_type:4
    qty:""
}
* Response Error={}


*/
import React,{Component} from 'react'
import { Dropdown , Form} from 'react-bootstrap'
import PramotionsCheckbox from './PramotionsChekbox'

import { connect } from 'react-redux';
import { getPramotions } from '../../actions/DCRSamples'
import SearchInput from './SearchInput'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
//let totalmout={}

class SamplePramotionDropdown extends Component{
    constructor(props){
        super(props)
        this.state={
             data: [],
            
            selectedName:[],
            subList:false,
            selectedItems:[],
            removeData:null,
            productName:'',
            filterdata:[],
            selectedData: {},
            SelectetDic:{},
            Errormsg: '',
            Error: false,
            selectedDocData:{},
            Nosamplestate:false,
            Nosamplestate:false,
            NoGiftstate:false,
        }
        this.Pramotions= this.Pramotions.bind(this)
        this.update = this.update.bind(this)
        this.getData =  this.getData.bind(this)
        this.Nosample=this.Nosample.bind(this)
        this.Errorclose=this.Errorclose.bind(this)
        this.NoGift=this.NoGift.bind(this)  
    }

   // no sample selected
   Nosample(event){


    if(sessionStorage.getItem("ActiveDCR")=="null"){
        sessionStorage.setItem("ActiveDCR",this.props.dsccode)
       }
    const {checked}=event.target
    if(checked==true){
       let k= this.state.SelectetDic
       let l=this.state.selectedData
        Object.keys(k).map( (key)=>{  if(k[key]["type"]=="sample"){ 
           const kl=l[k[key]["c_name"]]
           delete l[k[key]["c_name"]]
           delete k[key] ;   
        }  },this.setState({  Nosamplestate:true,  selectedData:l, SelectetDic:k }))
        this.props.SelectedSample(k,true,this.state.NoGiftstate)
    }else{
        let k= this.state.SelectetDic
   this.setState({ Nosamplestate:false }) 
   this.props.SelectedSample(k,false,this.state.NoGiftstate)
    }
  
}

//Gift

NoGift(event){ 


    if(sessionStorage.getItem("ActiveDCR")=="null"){
        sessionStorage.setItem("ActiveDCR",this.props.dsccode)
       }
   const {checked}=event.target
   if(checked==true){
   
      let k= this.state.SelectetDic
      let l=this.state.selectedData
       Object.keys(k).map( (key)=>{  if(k[key]["type"]=="gift"){ 
           const kl=l[k[key]["c_name"]]
           delete l[k[key]["c_name"]]
           delete k[key] ;
       }  } ,this.setState({  NoGiftstate:true,  selectedData:l, SelectetDic:k }) )
       this.props.SelectedSample(k,this.state.Nosamplestate,true)
       
       
   }else{
    let k= this.state.SelectetDic
    this.setState({ NoGiftstate:false  }) 
    this.props.SelectedSample(k,this.state.Nosamplestate,false)
   }
}

    componentDidUpdate(oldprops,oldsatate)
    {
       if(oldprops.clearAll!=this.props.clearAll)
       {
          this.setState({    Nosamplestate:false,
            Nosamplestate:false,
            NoGiftstate:false, selectedData:{},EditQty:{},SelectetDic:{} })
       }

       if(this.props.loadsample != oldprops.loadsample){
          this.Pramotions()
       }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
       

        if (prevState.sampledata !== nextProps.sampledata){
           
            return { ...prevState, sampledata:nextProps.sampledata };
        }
        
            
       // return prevState;
    }
    componentDidMount(){

        // alert('kunal')
        this.Pramotions()
        if(this.props.Editmodedata)
        {


            if (this.props.Editmodedata['Dwrdetails']) {

                Object.keys(this.props.Editmodedata['Dwrdetails']).map((next) => {


                    if (this.props.Editmodedata['Dwrdetails'][next]["C_DSC_Code"] == this.props.dsccode) {

                        if (this.props.Editmodedata['Dwrdetails'][next]["C_BA"]) {
                          const  C_BA = this.props.Editmodedata['Dwrdetails'][next]["C_BA"]

                            if (C_BA == "00") {
                                this.setState({
                                    NoGiftstate: true,
                                    Nosamplestate: true
                                })
                            }


                            if (C_BA == "10") {
                                this.setState({
                                    NoGiftstate: true,
                                    Nosamplestate: false
                                })
                            }

                            if (C_BA == "01") {
                                this.setState({
                                    NoGiftstate: false,
                                    Nosamplestate: true
                                })
                            }
                        }
                    }
                })
            }

            if( this.props.Editmodedata['DWR_sub_DETAILS']){
                let m={}
                let EditQty={}
                let BeforeSelectetDic={}
                Object.keys(this.props.Editmodedata['DWR_sub_DETAILS']).map( (next)=>{   
                    let item={}
                    if(this.props.Editmodedata['DWR_sub_DETAILS'][next]["TYPE"].trim()!='Product'){ 

                    if(this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Doc_Code"]==this.props.dsccode){ 
                    const k=this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Name"].trim()
                    //+this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Doc_Code"].trim() ;
                   // console.log(k,'klkl')
                    m[k]=this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Name"].trim()+'('+  this.props.Editmodedata['DWR_sub_DETAILS'][next]["n_Product_Unit"].trim() +')'
                    item["c_name"]=this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Name"].trim()
                    item["qty"]=this.props.Editmodedata['DWR_sub_DETAILS'][next]["n_Product_Unit"].trim()
                    item["type"]=this.props.Editmodedata['DWR_sub_DETAILS'][next]["TYPE"].trim()
                    item["c_name"]=this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Name"].trim()
                    item["c_code"]=this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Item_Code"].trim()
                    BeforeSelectetDic[this.props.Editmodedata['DWR_sub_DETAILS'][next]["C_Item_Code"].trim()]=item
                    EditQty[k]= this.props.Editmodedata['DWR_sub_DETAILS'][next]["n_Product_Unit"].trim()
                    
                    }
                    //selectedData[id] = checked
                }
                })
                this.setState({selectedData:m,EditQty:EditQty,SelectetDic:BeforeSelectetDic})
                this.props.SelectedSample(BeforeSelectetDic,this.state.Nosamplestate,this.state.NoGiftstate) 

                
//this.props.id + '$' + item.c_name + '$' + item.c_doc_code+index ;
//
          
        }
           
        }

        
        
        
        if(this.state.sampledata){ 
            let firstdic = {}
            let k={}
            let  BeforeSelectetDic= this.state.SelectetDic
            this.state.sampledata.map((item) => { 
                //console.log("item",this.props.dcode,item['doc_code'] )
            if(item['doc_code'] == this.props.dsccode){
               // console.log(item['itemname'],item,'jack')
                const t = item['itemname'];
                firstdic[t] = item["itemname"]
                k[item["itemname"].trim()]=""
                item["qty"]='1'
                item["type"]=item.type
                BeforeSelectetDic[item.itemid]=item
            }

            }, this.setState({selectedData:firstdic,EditQty:k,SelectetDic:BeforeSelectetDic }) )
            this.props.SelectedSample(BeforeSelectetDic,this.state.Nosamplestate,this.state.NoGiftstate )
           
        }
    }


    Errorclose() {
        this.setState({ Error: false })
    }

    Pramotions(){
     //   console.log(this.props,'sample dat')
     //Selectdate
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
      
    //   var day=this.props.Selectdate.getDate() 
    //   var year= this.props.Selectdate.getFullYear()
    //   var month= this.props.Selectdate.getMonth()+1

      //alert(day)
      //alert(year)
      //alert(month)

        const date =month+"/"+ day + "/"+year  
        var data = {
                "Token": ""
                ,"validate":"getSamplePromotionGiftlist"
                ,"fscode":this.props.loadself["FsCode"]
                ,"date":date// Api change  consider by kunal
                ,"dcrno":""
                ,"drcode":this.props.dsccode
                ,"ntype":"1"
            }
         //   this.props.getPramotions(data)

         postToServer('DCRValidation',data).then(  (result )=> { 
               this.setState({ data:result.data })

    //    result.data.map((a)=>{

    //       if(!totalmout[a.c_code]){
    //        totalmout[a.c_code]=a.balsumqty
    //       }
    //    })



             }).catch( (error)=>{

                 console.log(error,'okokok')
                this.setState({ Error: true, Errormsg: "Error in App" })
         })
    }

    getData(id, name, checked, qtyCounter,item,type){  
      



        

        if(this.props.notallowed==true){
            this.setState({ Errormsg:'EDIT NOT Allowed', Error:true })
            
            //message={this.state.Errormsg}
            //show={this.state.Error}
            // this.removeItem(name)
                    return
                   }
        
        // if(checked==true){
        // totalmout[item.c_code]=   totalmout[item.c_code] - 1
        // }else{
        //     totalmout[item.c_code]=   totalmout[item.c_code] + 1
        
        // }


    //console.log(totalmout[item.c_code],item.c_code,qtyCounter,qtyCounter,'kunal---->>>')
        
        // console.log("gift",item.N_desc)
        if(item.N_desc == 'sample'){
            if(this.state.Nosamplestate==true)
            {
            this.setState({ Error:true, Errormsg:'Please UnCheck  No Sample Promotions '})
            return null
            }
        }
        if(item.N_desc == 'gift'){
            if(this.state.NoGiftstate==true)
            {
                this.setState({ Error:true, Errormsg:'Please UnCheck  No Brand Reminder '})
                return null
            }
        }
        let {selectedData} = this.state
        if(checked){
            selectedData[item.c_name] = name +"("+qtyCounter+")"
        }
        else{
            //selectedData[item.c_name] = false
            delete  selectedData[item.c_name] //= false
            let localdic=this.state.SelectetDic
            Object.keys(this.state.SelectetDic).map(( loc)=> {
               if(this.state.SelectetDic[loc]["c_name"]==item.c_name){
                   delete localdic[loc]
                   this.props.SelectedSample(localdic ,this.state.Nosamplestate,this.state.NoGiftstate )
               }
            })
            this.setState({SelectetDic:localdic})
            return
        }
        let  BeforeSelectetDic= this.state.SelectetDic
        item["qty"]=qtyCounter
        item["type"]=type
        BeforeSelectetDic[item.c_code]=item

        this.setState({
            selectedData:selectedData, SelectetDic:BeforeSelectetDic
        })
        this.props.SelectedSample(BeforeSelectetDic ,this.state.Nosamplestate,this.state.NoGiftstate )
        
         
    }
    
    removeItem(id){




        if(this.props.notallowed==true){
            this.setState({ Errormsg:'EDIT NOT Allowed', Error:true })
            
            //message={this.state.Errormsg}
            //show={this.state.Error}
            // this.removeItem(name)
                    return
                   }
                   if(sessionStorage.getItem("ActiveDCR")=="null"){
                    sessionStorage.setItem("ActiveDCR",this.props.dsccode)
                   }

        let { selectedData } = this.state
        selectedData[id] = false
        this.setState({selectedData})
        let localdic=this.state.SelectetDic
        Object.keys(this.state.SelectetDic).map(( loc)=> {
           if(this.state.SelectetDic[loc]["c_name"]==id){
             
               delete localdic[loc]
               this.props.SelectedSample(localdic ,this.state.Nosamplestate,this.state.NoGiftstate  )
           }
        })
        this.setState({SelectetDic:localdic})
        
    }

    update(dataArray){ 
        this.setState({
            filterdata:dataArray
        })
    }

    dedup(items) {
        let n = items.map(v => v.c_name)
        return items.filter((v,i) => n.indexOf(v.c_name) === i)
    }

    render(){ 

       // console.log(totalmout,'okokoko')
        const {data,filterdata, selectedData} = this.state


        
        if (!data)
            return null
        const sampleArr = this.dedup(data.filter(item =>
            item.N_desc == "sample"
        ))
        const promotionArr = data.filter(item =>
            item.N_desc == "Promotional"
        )
        const giftArr = data.filter(item => 
            item.N_desc == "gift"
        )
        const sampleItems = sampleArr.reduce((prev, item, index) => { 
            const id = item.c_name;
            const selection = selectedData[id] ? selectedData[id] : false
                prev.push(
                    <PramotionsCheckbox
                    dcrtype={this.props.dcrtype}
                    dsccode={this.props.dsccode}
                        key={index  + item.c_code +this.props.dsccode}
                        getData={this.getData.bind(this)}
                        selection={selection}
                        id={id}
                        item={item}
                        type="sample"
                        editQty={this.state.EditQty}
                    />
                )
            return prev
        }, [])  

        const promotionItems = promotionArr.reduce((prev, item, index) => { 
            const id = item.c_name;
            const selection = selectedData[id] ? selectedData[id] : false
                prev.push(
                    <PramotionsCheckbox
                    dcrtype={this.props.dcrtype}
                    dsccode={this.props.dsccode}
                    key={index +"promotion" + item.c_code +this.props.dsccode}
                        getData={this.getData.bind(this)}
                        selection={selection}
                        id={id}
                        item={item}
                        type="promotion"
                        editQty={this.state.EditQty}
                    />
                )
            return prev
        }, [])  

        const giftItems = giftArr.reduce((prev, item, index) => { 
            const id = item.c_name;
            const selection = selectedData[id] ? selectedData[id] : false
                prev.push(
                    <PramotionsCheckbox
                      dcrtype={this.props.dcrtype}
                      dsccode={this.props.dsccode}
                       key={index +"gift"+ item.c_code +this.props.dsccode}
                        getData={this.getData.bind(this)}
                        selection={selection}
                        id={id}
                        item={item}
                        type="gift"
                        editQty={this.state.EditQty}
                    />
                )
            return prev
        }, [])  

        const searchGiftItems = filterdata.reduce((prev, item, index) => { 
            const id = item.c_name;
            const selection = selectedData[id] ? selectedData[id] : false
          
                prev.push(
                    <PramotionsCheckbox
                    dcrtype={this.props.dcrtype}
                    dsccode={ this.props.dsccode}
                    key={index+ "gift" + item.c_code +this.props.dsccode}
                        getData={this.getData.bind(this)}
                        selection={selection}
                        id={id}
                        item={item}
                        type="gift"
                        editQty={this.state.EditQty}
                    />
                )
            return prev
        }, [])  

        const searchPramotionItems = filterdata.reduce((prev, item, index) => { 
            const id = item.c_name;
            const selection = selectedData[id] ? selectedData[id] : false
                prev.push(
                    <PramotionsCheckbox
                    dcrtype={this.props.dcrtype}
                    dsccode={this.props.dsccode}
                    key={index +"promotion" + item.c_code +this.props.dsccode}
                        getData={this.getData.bind(this)}
                        selection={selection}
                        id={id}
                        item={item}
                        type="promotion"
                        editQty={this.state.EditQty}
                    />
                )
            return prev
        }, [])  
       const selections = Object.keys(selectedData).reduce((p, n, i) => { 
            if (typeof(selectedData[n]) === "string") { 
                const name = selectedData[n];
                p.push(
                    <div key={n + this.props.dsccode} className="selectedDropdown"> {name.toLowerCase()}
                        <img src="../public/assets/images/cancel.png" className="closeImg"
                            onClick={this.removeItem.bind(this,n)}/>
                    </div>
                )
            }
            return p
        }, [])

        return(
            <React.Fragment>
                <div className='sample jointDropdown'>
                    <Dropdown className="multiple-dropdown marginBot10">
                        <Dropdown.Toggle id="dropdown-basic">
                            <SearchInput compVal="samples"  data={this.state.data} update={this.update} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <div className="samples-dropdown cal-scrollbar paddLeft10">
                                {filterdata == '' ?
                                    <Form>
                                        <div className="flexDisplay">
                                        <div>
                                    <Form.Check 
                                                custom
                                                type="checkbox"
                                                id="checkbox2"
                                                checked={this.state.Nosamplestate == true ? "checked" : null}
                                                onChange={this.Nosample}
                                                label="No Sample "
                                                className="mb-2 jointCheck noPromo"
                                            />
                                        </div>
                                        <div>
                                             <Form.Check 
                                                custom
                                                type="checkbox"
                                                id="checkbox3"
                                                onChange={this.NoGift}
                                                checked={this.state.NoGiftstate == true ? "checked" : null}
                                                label="No Brand Reminder"
                                                className="mb-2 jointCheck noPromo"
                                            />
                                            </div></div>
                                        {sampleItems && promotionItems && giftItems ? "" : "No data to display" }
                                        {sampleItems.length>0 ? 
                                            <div>
                                                <div className="samples-titlebar">Samples  {this.props.Mandatory["SampleMan"]=="1"  ? <span className="colorRed">*</span> : ''  }  </div>
                                                {sampleItems}
                                            </div>
                                        : null }

                                        {promotionItems.length>0 ? 
                                            <div>
                                                <div className="samples-titlebar">promotions</div>
                                                {promotionItems}
                                            </div>
                                        : null }

                                        {giftItems.length>0 ? 
                                            <div>
                                                <div className="samples-titlebar">Brand Reminder  {this.props.Mandatory["GiftMan"]=="1"  ? <span className="colorRed">*</span> : ''  }  </div>
                                                {giftItems}
                                            </div>
                                        : null }
                                    </Form> :
                                    <Form>
                                         {searchPramotionItems.length>0 ? 
                                            <div>
                                                <div className="samples-titlebar">Samples {this.props.Mandatory["SampleMan"]=="1"  ? <span className="colorRed">*</span> : ''  }  </div>
                                                {searchPramotionItems}
                                            </div>
                                        : null }
                                         {searchGiftItems.length>0 ? 
                                            <div>
                                                <div className="samples-titlebar">Brand Reminder  {this.props.Mandatory["SampleMan"]=="1"  ? <span className="colorRed">*</span> : ''  }  </div>
                                                {searchGiftItems}
                                            </div>
                                        : null }
                                    </Form>
                                }
                            </div>
                            <Dropdown.Item eventKey={this.props.eventKey}>
                                <button  className="doneBtn">DONE</button>
                        </Dropdown.Item>
                        </Dropdown.Menu>
                        
                    </Dropdown>
                    <div className="selectedDiv cal-scrollbar">
                        {selections}
                    </div>
                    <StatusPopup
                                message={this.state.Errormsg}
                                show={this.state.Error}
                                onClose={this.Errorclose}
                                success={false}
                            />
                </div>
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => ({ 
    
    sampledata:state.DCRSamples.data,
   
} );


export default connect(mapStateToProps)(SamplePramotionDropdown);