import React,{Component} from 'react'
import {Dropdown,Form} from 'react-bootstrap'
import {postToServer} from '../../../lib/comm-utils'
import PramotionsCheck from '../components/PromotionCheck'

class SamplePromotions extends Component{
constructor(props){
    
    super(props)
    
        this.state={
            selectedData:{},
            selectedKey:{},
            sampleSelection:{},
            data:[],
            Selectedqty:{}
        }
    this.dedup = this.dedup.bind(this)
}
    componentDidMount(){ 


        if (this.props.doc_code==undefined)
        return
        this.setState({ selectedData:{},Selectedqty:{}  })
        let totaldata =[]
        // var data = {
        //     "Token": ""
        //     ,"validate":"getSamplePromotionGiftlist"
        //     ,"fscode":''
        //     ,"date":"05/05/2019"// Api change  consider by kunal
        //     ,"dcrno":""
        //     ,"drcode":this.props.doc_code
        //     ,"ntype":"1"
        //}

        var data = {
            "Data":{"doc": this.props.doc_code,
            subarea: this.props.subarea,
            Month: this.props.month,
            Year: this.props.year,
            day: this.props.day,

        
        
        },
            "index": "MTP_Sample"
           
        }
        postToServer('MTP',data).then(  (result )=> { 
            this.setState({ data:result.data})
            if(this.props.autoSelectedSample != ""){
                let m={}
                let Selectedqty={}
              
                let k={}
                //alert(this.props.doc_code)
                k[this.props.ntype]={}
                k[this.props.ntype][this.props.doc_code]={}
              //  if(this.props.autoSelectedSample){ 
                    result.data.map((val)=>{
                        this.props.autoSelectedSample.map((item)=>{ 
                            if((val.c_code).trim() == item.id.trim()){ 
                                if(!m[val.c_code]){
                                    k[this.props.ntype][this.props.doc_code][val.c_code]={}
                                    k[this.props.ntype][this.props.doc_code][val.c_code][val.c_name] = item.qty
                                }
                                m[val.c_name] = val.c_name+'('+item.qty+')'
                                
                                Selectedqty[val.c_name]=item.qty
                               
                               
                                //k["sample"][this.props.doc_code][item.c_code][val.c_name] =item.qty
                            }
                        })
                    })
               // }
                this.setState({ selectedData:m,Selectedqty:Selectedqty , sampleSelection:k })

               
            this.props.sendSelectedSample(k)
              //  this.props.sendSelectedSample(k)
            }
           
        }).catch( (error)=>{
          
            this.setState({ Error: true, Errormsg: "Error in App" })
        })
    }

    getData(id, name, checked, qtyCounter,item,type){ 
        let selectedData ={}
        selectedData = this.state.selectedData
        let k = {}
        k=this.state.selectedKey
        let ctype = this.props.ntype

if( k[ctype] ){
           
}else{
    k[ctype] = {}
}
        if(checked){
           
            selectedData[item.c_name] = name +"("+qtyCounter+")"
            let m=[]
            if(k[ctype][this.props.doc_code]){ 
               // m=k[ctype][this.props.doc_code]
                let p ={}
                p[name] = qtyCounter
                
                if(k[ctype][this.props.doc_code][item.c_code]){ 
                   
                    if(k[ctype][this.props.doc_code][item.c_code][name]){
                        k[ctype][this.props.doc_code][item.c_code][name] =qtyCounter
                    }else{
                        k[ctype][this.props.doc_code][item.c_code][name] = qtyCounter
                    }
                }else{
                    k[ctype][this.props.doc_code][item.c_code]={}
                    if(k[ctype][this.props.doc_code][item.c_code][name]){
                        k[ctype][this.props.doc_code][item.c_code][name] =qtyCounter
                    }else{
                        k[ctype][this.props.doc_code][item.c_code][name] = qtyCounter
                    }
                   
                }
              
            }else{ 
                
                k[ctype][this.props.doc_code]={}
              
                if(k[ctype][this.props.doc_code][item.c_code]){
                    if(k[ctype][this.props.doc_code][item.c_code][name]){
                        k[ctype][this.props.doc_code][item.c_code][name] =qtyCounter
                    }else{
                        k[ctype][this.props.doc_code][item.c_code][name] = qtyCounter
                    }
                }else{
                    k[ctype][this.props.doc_code][item.c_code] ={}
                    if(k[ctype][this.props.doc_code][item.c_code][name]){

                    }else{
                        k[ctype][this.props.doc_code][item.c_code][name] = qtyCounter
                    }
                }
                
               // k[ctype][this.props.doc_code][item.c_code] = m
            }
           
          //  k[ctype][this.props.doc_code] = m
        }else{
        
        if( k[ctype]){
            if( k[ctype][this.props.doc_code]){
                if(k[ctype][this.props.doc_code][item.c_code]){
                    if(k[ctype][this.props.doc_code][item.c_code][item.c_name]){
                        delete k[ctype][this.props.doc_code][item.c_code][item.c_name]
                    }
                }

            }
        }
       
   
            delete  selectedData[item.c_name] //= false
        }
  
    this.setState({
       selectedData:selectedData,
       selectname:name,
       sampleSelection:k
    })
    this.props.sendSelectedSample(k)
    }

    dedup(items) {
        let n = items.map(v => v.c_name)
        return items.filter((v,i) => n.indexOf(v.c_name) === i)
    }
    componentDidUpdate(oldprops,oldsatate){
        console.log(this.props.autoSelectedSample,'opopopll')
        if(oldprops.autoSelectedSample != this.props.autoSelectedSample){ 
            let m={}
            let k={}
            let Selectedqty={}
            if(this.props.autoSelectedSample){ 
                this.state.data.map((val)=>{ 
                    this.props.autoSelectedSample.map((item)=>{
                        if((val.c_code).trim() == item.id.trim()){
                            m[val.c_name] = item.id.trim()+'('+item.qty+')'
                            Selectedqty[val.c_name.trim()]=item.qty
                         //   k["sample"][this.props.doc_code][item.c_code][val.c_name] =item.qty
                        }
                    })
                })
            }
            this.setState({
                selectedData:m,Selectedqty:Selectedqty, 
            })
          //  this.props.sendSelectedSample(k)
        }
    }
    removeItem(id,data){

        //alert(id)
        let { selectedData } = this.state
        selectedData[id] = false
        this.setState({selectedData})
        let localdic=this.state.SelectetDic
        let sampleSelection={}
        sampleSelection= this.state.sampleSelection
      // console.log(this.state.sampleSelection[this.props.ntype][this.props.doc_code],'sinha',data)
     // console.log(this.state.selectedData,"sinha",this.state.sampleSelection)
        Object.keys(this.state.sampleSelection[this.props.ntype][this.props.doc_code]).map(( loc)=> {




            if(this.state.sampleSelection[this.props.ntype][this.props.doc_code][loc][id]){
                
                delete sampleSelection[this.props.ntype][this.props.doc_code][loc][id]
                
            }
           // console.log(this.state.sampleSelection[this.props.ntype][this.props.doc_code][loc],"sinha")
        //    if(this.state.SelectetDic[loc]["c_name"]==id){
             

        //     console.log(this.state.SelectetDic[loc]["c_name"],"sinha")
              // delete localdic[loc]
              // this.props.SelectedSample(localdic ,this.state.Nosamplestate,this.state.NoGiftstate  )
         //  }
        })

        
        this.setState({sampleSelection:sampleSelection})

        this.props.sendSelectedSample(sampleSelection)
        
    }

    render(){  


      //   console.log(this.state.Selectedqty,'opop')
        const {data,filterdata, selectedData} = this.state
        if (!data)
            return null
        const sampleArr = this.dedup(data.filter(item =>
            item.N_Type == "2"
        ))
        const promotionArr = data.filter(item =>
            item.N_Type == "3"
        )
        const giftArr = data.filter(item => 
            item.N_Type == "4"
        )
       
        const sampleItems = sampleArr.reduce((prev, item, index) => { 
            const id = item.c_name;
            const selection = selectedData[id] ? selectedData[id] : false
                prev.push(
                    <PramotionsCheck
                    dsccode={this.props.doc_code}
                        key={index  + item.c_code +this.props.doc_code}
                        getData={this.getData.bind(this)}
                        selection={selection}
                        id={id}
                        item={item}
                        type="sample"
                        editQty={this.state.Selectedqty  }
                        autoSelectedSample={this.props.autoSelectedSample}
                    />
                )
            return prev
        }, [])  

        const promotionItems = promotionArr.reduce((prev, item, index) => { 
            const id = item.c_name;
            const selection = selectedData[id] ? selectedData[id] : false
                prev.push(
                    <PramotionsCheck
                    dsccode={this.props.doc_code}
                    key={index +"promotion" + item.c_code +this.props.doc_code}
                        getData={this.getData.bind(this)}
                        selection={selection}
                        id={id}
                        item={item}
                        type="promotion"
                        editQty={this.state.Selectedqty  }
                        autoSelectedSample={this.props.autoSelectedSample}
                        
                    />
                )
            return prev
        }, [])  

        const giftItems = giftArr.reduce((prev, item, index) => { 
            const id = item.c_name;
            const selection = selectedData[id] ? selectedData[id] : false
                prev.push(
                    <PramotionsCheck
                      dsccode={this.props.doc_code}
                       key={index +"gift"+ item.c_code +this.props.doc_code}
                        getData={this.getData.bind(this)}
                        selection={selection}
                        id={id}
                        item={item}
                        type="gift"
                        editQty={this.state.Selectedqty }
                        autoSelectedSample={this.props.autoSelectedSample}
                       
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
                            onClick={this.removeItem.bind(this,n,selectedData[n])}/>
                    </div>
                )
            }
            return p
        }, [])
        return(
            <div>
                <div className='sample jointDropdown'>
                    <Dropdown className="multiple-dropdown marginBot10">
                        <Dropdown.Toggle id="dropdown-basic">
                            {/* <SearchInput compVal="samples"  data={this.state.data} update={this.update} /> */}
                        </Dropdown.Toggle>

                        <Dropdown.Menu >
                            <div className="samples-dropdown cal-scrollbar paddLeft10">
                                
                                    <Form>
                                       
                                        {sampleItems && promotionItems && giftItems ? "" : "No data to display" }
                                        {sampleItems.length >0 ? 
                                            <div>
                                                <div className="samples-titlebar">Samples   </div>
                                                {sampleItems}
                                            </div>
                                        : null }

                                        {promotionItems.length > 0? 
                                            <div>
                                                <div className="samples-titlebar">promotions</div>
                                                {promotionItems}
                                            </div>
                                        : null }

                                        {giftItems.length > 0 ? 
                                            <div>
                                                <div className="samples-titlebar">Brand Reminder    </div>
                                                {giftItems}
                                            </div>
                                        : null }
                                        
                                    </Form> 
                                   
                                
                            </div>
                            <Dropdown.Item eventKey={this.props.eventKey}>
                                <button  className="doneBtn">DONE</button>
                        </Dropdown.Item>
                        </Dropdown.Menu>
                        
                    </Dropdown>
                    <div className="selectedDiv cal-scrollbar">
                        {selections}
                    </div>
                    {/* <StatusPopup
                                message={this.state.Errormsg}
                                show={this.state.Error}
                                onClose={this.Errorclose}
                                success={false}
                            /> */}
                </div>
            </div>
        )
    }
}

export default SamplePromotions