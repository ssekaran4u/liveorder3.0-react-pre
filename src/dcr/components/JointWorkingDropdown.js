/*
* This file will display work with name and code
* Request URL=url/Android
* Index=WorkWith
* Request string={"Header":[{"fsc":"mr1","fscode":"mr1","area":"TNH0012","search":"","cd":"smstest"}],"idx":"WorkWith","Token":""}
* Response string={
    cd:ADM001
    desg:ADMIN
    nm:ADMIN
    typ:7
}
* Response Error=null
*/
import React,{Component} from 'react'
import { Dropdown , Form,Button} from 'react-bootstrap'
import JointCheckbox from './JointCheckbox'
import { connect } from 'react-redux';
import { getJointDetail } from '../../actions/DCRJoint'
import SearchInput from './SearchInput'
import StatusPopup from '../../lib/StatusPopup'
class JointWorkingDropdown extends Component{
    constructor(props){
        super(props)
        this.state={
             data: [],
             selectedItems:[],
             filterdata:[],
             selectedData: {},
             JoinWorkSelected:{}, 
             Errormsg:'',
             Error:false
        }
        this.getJoint = this.getJoint.bind(this)
        this.getData =  this.getData.bind(this)
        this.removeItem =this.removeItem.bind(this)
        this.update= this.update.bind(this)
        this.Errorclose=this.Errorclose.bind(this)
        this.getDataEdit=this.getDataEdit.bind(this)
    }


    Errorclose() {
        this.setState({ Error: false })
    }
    
    componentDidMount(){
        this.getJoint()

        if(this.props.dataDoc!=undefined){

            if(this.props.dataDoc["FsCode"]!=this.props.dataDoc["self"]){
        const k= this.props.dataDoc["FsName"].trim()  +'$'+this.props.dataDoc["desg"].trim()+'$' +this.props.dataDoc["FsCode"].trim()+'$'+this.props.dsccode
        //const k=this.props.Editmodedata['workWith_multiple'][next]["C_Name"].trim()  +'$'+this.props.Editmodedata['workWith_multiple'][next]["C_Desc"].trim()+'$' +this.props.Editmodedata['workWith_multiple'][next]["C_Code"].trim() +'$'+this.props.dsccode
        let local={}
         local[k]=this.props.dataDoc["FsCode"]
         this.setState({selectedData:local})
         this.props.Selected(local[k])
         }
        }

        // if(this.props.Searchdata!=undefined){
        //     this.props.data .push({ cd: this.props.Searchdata[this.props.dsccode]["FsCode"], desg: this.props.Searchdata[this.props.dsccode]["FsName"], nm: this.props.Searchdata[this.props.dsccode]["FsName"] })
        //     const id= this.props.Searchdata[this.props.dsccode]["FsName"]+"$"+this.props.Searchdata[this.props.dsccode]["FsName"]+"$"+this.props.Searchdata[this.props.dsccode]["FsCode"]  +this.props.dsccode;
        //    var m={}
        //    m[id]=this.props.Searchdata[this.props.dsccode]["FsName"]
        //    this.setState( {selectedData:m})
        //    }

        if(this.props.Editmodedata){
            if( this.props.Editmodedata['dwr_workwith_sub_det']){
                let m={}
                
             
        if(this.props.type){
            if(this.props.type=="other"){

                 let j={}
                 
                Object.keys(this.props.Editmodedata['workWith_multiple']).map( (next)=>{ 
                   
                      const k=this.props.Editmodedata['workWith_multiple'][next]["C_Name"].trim()  +'$'+this.props.Editmodedata['workWith_multiple'][next]["C_Desc"].trim()+'$' +this.props.Editmodedata['workWith_multiple'][next]["C_Code"].trim() +'$'+this.props.dsccode
                      j[this.props.Editmodedata['workWith_multiple'][next]["C_Code"].trim()]=this.props.Editmodedata['workWith_multiple'][next]["C_Name"].trim()
                      m[k]=this.props.Editmodedata['workWith_multiple'][next]["C_Name"].trim()
                      let item={cd: this.props.Editmodedata['workWith_multiple'][next]["C_Code"].trim() , nm:this.props.Editmodedata['workWith_multiple'][next]["C_Name"].trim()}
                      this.getDataEdit(k,this.props.Editmodedata['workWith_multiple'][next]["C_Name"].trim(),true,item)
                    
                }, (this.props.Selected(j) , this.setState({selectedData:m})))
            }
        }
                Object.keys(this.props.Editmodedata['dwr_workwith_sub_det']).map( (next)=>{ 
                    if(this.props.Editmodedata['dwr_workwith_sub_det'][next]["c_doc_code"].trim()==this.props.dsccode.trim()){ 
                      const k=this.props.Editmodedata['dwr_workwith_sub_det'][next]["C_Name"].trim()  +'$'+this.props.Editmodedata['dwr_workwith_sub_det'][next]["C_Desc"].trim()+'$' +this.props.Editmodedata['dwr_workwith_sub_det'][next]["C_Code"].trim() +'$'+this.props.dsccode
                      m[k]=this.props.Editmodedata['dwr_workwith_sub_det'][next]["C_Name"].trim()
                      let item={cd: this.props.Editmodedata['dwr_workwith_sub_det'][next]["C_Code"].trim() , nm:this.props.Editmodedata['dwr_workwith_sub_det'][next]["C_Name"].trim()}
                      this.getDataEdit(k,this.props.Editmodedata['dwr_workwith_sub_det'][next]["C_Name"].trim(),true,item)
                    }
                }, (this.props.Selected(m) , this.setState({selectedData:m})))
              
            }
        
        }
        
    }

    componentDidUpdate(oldprops,oldsatate)
    {


        if(oldprops.dataDoc!=this.props.dataDoc){


            if(this.props.dataDoc["FsCode"]!=this.props.dataDoc["self"]){
            const k= this.props.dataDoc["FsName"].trim()  +'$'+this.props.dataDoc["desg"].trim()+'$' +this.props.dataDoc["FsCode"].trim()+this.props.dataDoc["DoctorCode"].trim()
             let local={}
             local[k]=this.props.dataDoc["FsName"]
             this.setState({selectedData:local})
             this.props.Selected(local[k])
            }
           }
           
       if(oldprops.clearAll!=this.props.clearAll)
       {
          this.setState({selectedData:{}})
       }


       if(oldprops.Editmodedata!= this.props.Editmodedata){


    //     if(this.props.type){
    //     if(this.props.type=="other"){
    //         alert('i came from other work type')
    //     }
    // }
       

        if( this.props.Editmodedata['dwr_workwith_sub_det']){
            let m={}
          
            Object.keys(this.props.Editmodedata['dwr_workwith_sub_det']).map( (next)=>{  
                
              
                if(this.props.Editmodedata['dwr_workwith_sub_det'][next]["c_doc_code"]==this.props.dsccode){ 
                  const k=this.props.Editmodedata['dwr_workwith_sub_det'][next]["C_Name"].trim()  +'$'+this.props.Editmodedata['dwr_workwith_sub_det'][next]["C_Desc"].trim()+'$' +this.props.Editmodedata['dwr_workwith_sub_det'][next]["C_Code"].trim()+this.props.dsccode
                 
                 // item.nm+"$"+item.desg+"$"+item.cd  +this.props.dsccode;
                  m[k]=this.props.Editmodedata['dwr_workwith_sub_det'][next]["C_Name"].trim()
                }
                //selectedData[id] = checked
            })
            //this.setState({selectedData:m})
            //this.props.Selected(m)
        }
            
//this.props.id + '$' + item.c_name + '$' + item.c_doc_code+index ;
//
      
    }
    }
//    static getDerivedStateFromProps(nextProps, prevState) {
//        if (prevState.data !== nextProps.data) 
//           // console.log(nextProps.data)
//            return {...prevState, data:nextProps.data}
//        return null
//    }
    getJoint(){
        var data=	{"index":"Workwith","Data":{"doc":this.props.dsccode }}
             try{
        this.props.getJointDetail(data)
             }catch{
                
             }
    }
    getDataEdit(id, name, checked,item){ 


      
         let   jointworktemp={}
         jointworktemp=this.state.JoinWorkSelected
       
        let {selectedData} = this.state
        if(checked){
            selectedData[id] = name
            jointworktemp[item.cd]=item.nm
        }else if(selectedData[id] == name){
            selectedData[id] = false
            delete jointworktemp[item.cd]
        }else{
            delete selectedData[id]
        }
        this.setState({
            selectedData:selectedData,JoinWorkSelected:jointworktemp 
        })

          this.props.Selected(jointworktemp)
        
    }




    getData(id, name, checked,item){ 
        if(sessionStorage.getItem("ActiveDCR")=="null"){
            sessionStorage.setItem("ActiveDCR",this.props.dsccode)
           }
        if(this.props.notallowed==true){
            this.setState({ Errormsg:'EDIT NOT Allowed ', Error:true })
            
            //message={this.state.Errormsg}
            //show={this.state.Error}
            // this.removeItem(name)
                    return
                   }
         let   jointworktemp={}
         jointworktemp=this.state.JoinWorkSelected
       
        let {selectedData} = this.state
        if(checked){
            selectedData[id] = name
            jointworktemp[item.cd]=item.nm
        }else if(selectedData[id] == name){
            selectedData[id] = false
            delete jointworktemp[item.cd]
        }else{
            delete selectedData[id]
        }
        this.setState({
            selectedData:selectedData,JoinWorkSelected:jointworktemp 
        })

          this.props.Selected(jointworktemp)
        
    }
    
    removeItem(id){




        if(sessionStorage.getItem("ActiveDCR")=="null"){
            sessionStorage.setItem("ActiveDCR",this.props.dsccode)
           }

        if(this.props.notallowed==true){
            this.setState({ Errormsg:'EDIT NOT Allowed', Error:true })
            
            //message={this.state.Errormsg}
            //show={this.state.Error}
            // this.removeItem(name)
                    return
                   }
        let { selectedData } = this.state
        delete selectedData[id] 
      
        let JoinWorkSelected=this.state.JoinWorkSelected
        var k=id.split('$')
        delete JoinWorkSelected[k[2]]
        this.setState({selectedData ,JoinWorkSelected:JoinWorkSelected})
        this.props.Selected(JoinWorkSelected)

    }
    update(dataArray){
        this.setState({
            filterdata:dataArray
        })
    }
    
    render(){ 
        const {filterdata, selectedData} = this.state
        if (!this.props.data)
           return null
        

           
       
        const items = this.props.data.reduce((prev, item, index) => { 
          
            const id =  item.nm+"$"+item.desg+"$"+item.cd +"$" +this.props.dsccode;
            const selection = selectedData[id] ? selectedData[id] : false
          
                prev.push(
                    <JointCheckbox
                        key={index}
                        getData={this.getData.bind(this)}
                        selection={selection}
                        id={id}
                        item={item}
                    />
                )
            return prev
        }, [])  
        const searchitems = filterdata.reduce((prev, item, index) => { 
            const id = item.nm+"$"+item.desg+"$"+item.cd +"$" +this.props.dsccode;
            const selection = selectedData[id] ? selectedData[id] : false
          
                prev.push(
                    <JointCheckbox
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
                const name = n.split('$')[0];
                const desg = n.split('$')[1]
                p.push(
                        <div key={n} className="selectedDropdown"> {name+"("+ desg  +")"}
                            <img src="../public/assets/images/cancel.png" className="closeImg"
                                onClick={this.removeItem.bind(this, n)}/>
                        </div>
                )
            }
            return p
        }, [])

       
        return (
            <React.Fragment>
                 <StatusPopup
                                message={this.state.Errormsg}
                                show={this.state.Error}
                                onClose={this.Errorclose}
                                success={false}
                            />
                <div className="productDetailDrop">
                    <Dropdown className="multiple-dropdown marginBot10">
                        <Dropdown.Toggle id="dropdown-basic">
                            <SearchInput  compVal="joint" data={this.props.data} update={this.update} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <div className="Padding10 paddingTop jointData cal-scrollbar">
                            {filterdata == "" ?
                                <Form>
                                    {items}
                                </Form> :
                                 <Form>
                                    {searchitems}
                                </Form>}       
                               
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
    data:state.DCRJoint.data
})

const mapDispatchToProps = dispatch => ({
    getJointDetail:(data) => dispatch(getJointDetail(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(JointWorkingDropdown)

