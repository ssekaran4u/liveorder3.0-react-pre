import React, { Component } from 'react';
import DoctorNameTable from './DoctorNameTable';
import NextPlan from './NextPlan';
import {Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import CustomCheckbox from '../components/CustomCheckbox'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
import {connect} from 'react-redux'
import SuccessPopup from '../popups/SuccessPopup'
import {withRouter} from 'react-router-dom'
class DoctorName extends Component {
    constructor(props){
        super(props);
       
        this.state = {
            checkedval:{},
            slectcheck:{},
            Selectedkey:this.props.Selectedkey,
            Selected_Array:{},
            SelectedStp:this.props.SelectedStp,
            data:[],Messagetype:true,Error: false, Errormsg:'',
            rowperpage:10,
            list:this.props.list
        }
        this.handleViewChange= this.handleViewChange.bind(this)
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
        this.load_dsca_type_data=this.load_dsca_type_data.bind(this)
        this.getData= this.getData.bind(this)
        this.onclickData= this.onclickData.bind(this)
        this.handleClose=this.handleClose.bind(this)
        this.onHide=this.onHide.bind(this)
        this.Errorclose=this.Errorclose.bind(this)
        this.nextplandata=this.nextplandata.bind(this)
        this.showpage = this.showpage.bind(this)
    }


    nextplandata(Selected_Array,doc){
      let temp ={}
   temp=this.state.Selected_Array
       temp[doc]=Selected_Array

     this.setState({Selected_Array:temp})
//console.log(Selected_Array)
    }

    handleClose() {
        this.setState({
            showModal: false
        })
    }

    Errorclose(){
        this.setState({
            showModal: false,Error:false
        })
       // this.props.history.push('/tpt')
    }


    onHide() {
        this.setState({
            showModal: false
        })
        
    }

    onclickData(){ 
        
       var stri=''
       let countkey=0
        let string2 =''
       
        
       // return
        //const subarea=this.props.areainfo["code"]
        let subarea
        if(this.props.areainfo["code"]){
             subarea=this.props.areainfo["code"]
        }else{
            subarea=this.props.area
        }


        Object.keys(this.state.Selected_Array).map((doctor)=>{
        Object.keys(this.state.Selected_Array[doctor]).map((key1)=>{


            Object.keys(this.state.Selected_Array[doctor][key1]).map((key2)=>{
                countkey=countkey+1
                stri=stri+key1+'~'+key2+'~'+subarea+'~'+doctor.trim()+'#';
                string2 = string2+key2+'~'+key1+'#'
              //  console.log(key1,key2,subarea,this.state.Selected_Array[key1][key2],'Next plan')
            })

        })
    })





        if(this.state.SelectedStp[this.props.N_Type]){
           // let a=this.state.SelectedStp[this.props.N_Type]
            Object.keys(this.state.SelectedStp[this.props.N_Type]).map((key1)=>{
                Object.keys(this.state.SelectedStp[this.props.N_Type][key1]).map((key2)=>{
    
                    this.state.SelectedStp[this.props.N_Type][key1][key2].map( (a)=>{
    
    
                        // console.log(this.state.SelectedStp[this.props.N_Type][key1][key2] ,'kunal' )
                        countkey=countkey+1
                        stri=stri+key1+'~'+key2+'~'+subarea+'~'+a.trim()+'#';
                        string2 = string2+key2+'~'+key1+'#'
                    //console.log(key1,key2,subarea,a,'Checkbox')
                    })
                })
            })
        }
      
// console.log( stri,'Arrat')
// return 
     // console.log('string',stri,'SelectedStp',this.state.SelectedStp,'Selected_Array',this.state.Selected_Array)
        //return

        //const week= this.props.areainfo["week"] + 1
        //const day=this.props.areainfo["day"]
        //const subarea=this.props.areainfo["code"]
       // const head=this.state.slectcheck

   
   // console.log(head,'fffk')
        const data = {"index":"Save_MtpStp",
        "Data":{ "data":stri,"data2":string2   , "Ntype":this.props.N_Type  }
    }
    if(countkey == 0){
       


         const thisweek = parseInt(localStorage.getItem("week"))+1 + ''
         const thisday = localStorage.getItem("day")
         let area = localStorage.getItem("subarea")
         const N_Type  = this.props.N_Type
         const data = {"index":"Save_MtpStp_Delete",
         "Data":{ 
            "subarea":area,
            "week":thisweek,
            "day" : thisday  , "Ntype":this.props.N_Type  }
     }


         postToServer("TPT",data).then( (Result)=>{
            if(Result.data.Status == 'Success'){
                this.setState({   Messagetype:true, Error: true, Errormsg: "Saved STP" })
                
            }
        }).catch(  (Error)=> {
            this.setState({  Messagetype:false, Error: true, Errormsg: "STP Not Get Saved " })
        })

//    let    kkl= Objects.keys(this.state.SelectedStp[this.props.N_Type])
//    let  pp= Objects.keys(this.state.SelectedStp[this.props.N_Type][kkl])
        
        // [key1][key2].

        //   console.log(this.props.N_Type,'kunal')
        //   console.log(this.state,'kunal')
       // this.setState({  Messagetype:false, Error: true, Errormsg: "Please Select  Data" })
        return
    }

   
        postToServer("TPT",data).then( (Result)=>{
            if(Result.data.Status == 'Success'){
                this.setState({   Messagetype:true, Error: true, Errormsg: "Saved STP" })
                
            }
        }).catch(  (Error)=> {
            this.setState({  Messagetype:false, Error: true, Errormsg: "STP Not Get Saved " })
        })
    }
    handleViewChange(){
        this.setState({
            isFull: !this.state.isFull
        });
    }
    // handleCheckboxChange(){
    //     const value = event.target.checked
    //    // console.log("val",value)
    //     if(value == true){
    //         this.setState({
    //             checkedval:value
    //         })
    //     }else{
    //         this.setState({
    //             checkedval:false
    //         })
    //     }
    // }

    getData(name,checked,id){
        const week= this.props.areainfo["week"] 
        const day=this.props.areainfo["day"]
        let k = this.state.slectcheck
        let Selectedkey={}
        Selectedkey=this.state.Selectedkey
        let  SelectedStp={}
        let Listkey= []// this.state.list
        SelectedStp=this.state.SelectedStp

        if(SelectedStp[this.props.N_Type]){
        if(SelectedStp[this.props.N_Type][week]){
            Listkey=SelectedStp[this.props.N_Type][week][day]
            if(Listkey.indexOf(id)==-1){
                Listkey.push(id)
            }else{
                Listkey.splice( Listkey.indexOf(id), 1 );
            }
            SelectedStp[this.props.N_Type][week][day]=Listkey;
        }else{

            SelectedStp[this.props.N_Type][week]={}
            Listkey.push(id)
            SelectedStp[this.props.N_Type][week][day]=Listkey
        }

        this.props.getAllData(Selectedkey,Listkey,SelectedStp )
    }
    else{
        SelectedStp[this.props.N_Type]={}
        SelectedStp[this.props.N_Type][week]={}
        Listkey.push(id)
        SelectedStp[this.props.N_Type][week][day]=Listkey
    }
        if(checked){
            k[id] = name
            if(this.props.N_Type=="1"){
                Selectedkey[id]="Doctor"
            }
            if(this.props.N_Type=="2"){
                Selectedkey[id]="Chemist"
            }
           
            if(this.props.N_Type=="3"){
                Selectedkey[id]="Stockist"
            }

            if(this.props.N_Type=="4"){
                Selectedkey[id]="Other"
            }
           // Selectedkey[id]="Added Doc"
        }else{
           delete k[id]
           delete  Selectedkey[id]
        }

        this.setState({slectcheck:k,SelectedStp:SelectedStp,Selectedkey: Selectedkey })
    }


    handleCheckboxChange(){



        // console.log(this.state.SelectedStp,'<--kunal sinha')
        let Listkey=[]
        let day=this.props.areainfo["day"]
        let week=this.props.areainfo["week"]
        let SelectedStp =this.state.SelectedStp
       
        let list =  []//this.state.list
        const value = event.target.checked
        let checked ={}
        let checkedval = this.state.data
        let selectCheck = this.state.checked
        let Selectedkey=this.state.Selectedkey
        //console.log("val",selectCheck)
        if(value == true){
            //checkedval = true
         //   console.log(checkedval)
            checkedval.map((item) => {
                checked[item.c_cust_code] = true;
                //Selectedkey[item.c_cust_code]="Added "
                if(this.props.N_Type=="1"){
                    Selectedkey[item.c_cust_code]="Doctor"
                }
                if(this.props.N_Type=="2"){
                    Selectedkey[item.c_cust_code]="Chemist"
                }
               
                if(this.props.N_Type=="3"){
                    Selectedkey[item.c_cust_code]="Stockist"
                }

                if(this.props.N_Type=="4"){
                    Selectedkey[item.c_cust_code]="Other"
                }
                list.push(item.c_cust_code)
                // SelectedStp[week][day]
            })

            SelectedStp[this.props.N_Type]={}
            SelectedStp[this.props.N_Type][week]={}
            SelectedStp[this.props.N_Type][week][day]=[]
            SelectedStp[this.props.N_Type][week][day]=list
            this.setState({
                checked:checked,Selectedkey:Selectedkey,SelectedStp:SelectedStp,list:list
            })
            this.props.getAllData(Selectedkey,list,SelectedStp )
        }else{

            Listkey=SelectedStp[this.props.N_Type][week][day]

          //  console.log(checkedval,'data',Listkey,SelectedStp[this.props.N_Type][week][day])
            checkedval.map((item) => {
                
              
                if(this.props.N_Type=="1"){
                    Selectedkey[item.c_cust_code] ?  Selectedkey[item.c_cust_code]=="Doctor" ?   delete  Selectedkey[item.c_cust_code]  :null :null
                    if(Listkey.indexOf(item.c_cust_code)!=-1){
                        Listkey.splice( Listkey.indexOf(item.c_cust_code), 1 );
                     

                    }
                    
                    SelectedStp[this.props.N_Type][week][day]=Listkey;
               
                }
                if(this.props.N_Type=="2"){
                   
                    Selectedkey[item.c_cust_code] ?  Selectedkey[item.c_cust_code]=="Chemist" ?   delete  Selectedkey[item.c_cust_code]  :null :null
                    if(Listkey.indexOf(item.c_cust_code)!=-1){
                        Listkey.splice( Listkey.indexOf(item.c_cust_code), 1 );
                    }
                    SelectedStp[this.props.N_Type][week][day]=Listkey;
                }
               
                if(this.props.N_Type=="3"){
                    Selectedkey[item.c_cust_code] ?  Selectedkey[item.c_cust_code]=="Stockist" ?   delete  Selectedkey[item.c_cust_code]  :null :null
                    if(Listkey.indexOf(item.c_cust_code)!=-1){
                        Listkey.splice( Listkey.indexOf(item.c_cust_code), 1 );
                    }
                    SelectedStp[this.props.N_Type][week][day]=Listkey;
                }

                if(this.props.N_Type=="4"){
                  

                    Selectedkey[item.c_cust_code] ?  Selectedkey[item.c_cust_code]=="Other" ?   delete  Selectedkey[item.c_cust_code]  :null :null
                    if(Listkey.indexOf(item.c_cust_code)!=-1){
                        Listkey.splice( Listkey.indexOf(item.c_cust_code), 1 );
                    }
                    SelectedStp[this.props.N_Type][week][day]=Listkey;
                }


               
            })

          //  console.log(SelectedStp[this.props.N_Type][week][day],'kunal sinha')
        //SelectedStp[week]={}
      //  SelectedStp[week][day]=[]
        //list=[]
      //  list=SelectedStp[week][day]
            this.setState({
                checked:false,Selectedkey:Selectedkey,SelectedStp:SelectedStp,list:list
            })
            //this.props.getAllData(Selectedkey,list)
            this.props.getAllData(Selectedkey,list,SelectedStp )
        }
    }



    componentDidMount(){

 try{
     this.load_dsca_type_data()
 }
 catch(Error){
    this.props.history.push('/tpt')
 }
    }

load_dsca_type_data(){

   if(this.props.areainfo["code"]){
    var data = {"index":"Doc_list", "Data":{ "N_Type":this.props.N_Type,   "week":(this.props.areainfo.week).toString() , "day": this.props.areainfo.day.toString()  , "subarea":this.props.areainfo["code"] }}
    postToServer("TPT",data).then( (Result)=>{
        if(Result.data.Status == 'Success'){
           


let Selectedkey=this.state.Selectedkey
let lista= [] //this.state.list
let SelectedStp =   this.props.SelectedStp 
            Result.data.Grade_mst.map((item)=> {
                if(this.props.areainfo.week==item.week && this.props.areainfo.day==item.day ){
                    
                    if(this.props.N_Type=="1"){
                        Selectedkey[item.c_cust_code]="Doctor"
                    }
                    if(this.props.N_Type=="2"){
                        Selectedkey[item.c_cust_code]="Chemist"
                    }
                   
                    if(this.props.N_Type=="3"){
                        Selectedkey[item.c_cust_code]="Stockist"
                    }

                    if(this.props.N_Type=="4"){
                        Selectedkey[item.c_cust_code]="Other"
                    }
                    lista.push(item.c_cust_code)
               }
            })

           if(!SelectedStp[this.props.N_Type]){
            SelectedStp[this.props.N_Type]={}

            if( !SelectedStp[this.props.N_Type] [this.props.areainfo.week]){
                SelectedStp[this.props.N_Type] [this.props.areainfo.week]={}

                if(!SelectedStp[this.props.N_Type] [this.props.areainfo.week] [this.props.areainfo.day]){
                    SelectedStp [this.props.N_Type][this.props.areainfo.week][this.props.areainfo.day]=[]
                }
            }

           }else{
            if( SelectedStp[this.props.N_Type] [this.props.areainfo.week]){
               

                if(SelectedStp[this.props.N_Type] [this.props.areainfo.week] [this.props.areainfo.day]){

                    let km=SelectedStp [this.props.N_Type][this.props.areainfo.week][this.props.areainfo.day]
                    if(km.length>0){
                    lista=  SelectedStp [this.props.N_Type][this.props.areainfo.week][this.props.areainfo.day]
                    }
                }
            }
           }
           
           
            SelectedStp [this.props.N_Type][this.props.areainfo.week][this.props.areainfo.day]=lista
            this.setState({ data: Result.data.Grade_mst ,Selectedkey:Selectedkey,SelectedStp:SelectedStp })
            this.props.getAllData(Selectedkey,lista,SelectedStp )
            
            // Selectedkey



           
            //     this.setState({
            //         checked:false,Selectedkey:Selectedkey,SelectedStp:SelectedStp
            //     })
        }
    }).catch(  (Error)=> {

      //  console.log(Error,'Error')
        this.setState({ Error: true, Errormsg: "App Error Please Contact Admin" })
    })
}else{
    this.setState({ Error: true, Errormsg: "Sub Area not Found" })
}

}
showpage(rowperpage){
    this.setState({
        rowperpage:rowperpage
    })
}

    render() {

        let header=[]
        if(this.props.N_Type == "1" ){
         header = [
            { prop: 'c_cust_code1', title: 'Checkbox', filterable: true},
            { prop: 'Sl', title: 'Sl. No.',filterable: true },
            { prop: 'c_cust_code', title: 'Code',filterable: true },
            { prop: 'DName', title: ' Name',filterable: true },
            { prop: 'C_Name', title: 'Locality', filterable: true },
           
            { prop: 'Target', title: 'Target', filterable: true},
            { prop: 'planed', title: 'Planned', filterable: true},
            { prop: 'status', title: 'Status',filterable: true,sortable:true }

        ];
        }
    
        if(this.props.N_Type != "1" ){

           
             header = [
                { prop: 'c_cust_code1', title: 'Checkbox', filterable: true},
                { prop: 'Sl', title: 'Sl. No.',filterable: true },
                { prop: 'c_cust_code', title: 'Code',filterable: true },
                { prop: 'DName', title: ' Name',filterable: true },
                { prop: 'C_Name', title: 'Locality', filterable: true },
              //  { prop: 'planed', title: 'Planned', filterable: true},
                { prop: 'status', title: 'Status',filterable: true,sortable:true }
    
            ];
        }


          const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",
            entries: "items/page",
            filterPlaceholder: "Search",
            noResults: "There is no data to be displayed"
        };
        var activeText= <span className="activeTextGreen">Completed</span>
        var inactiveText= <span className="inActiveTextRed">Excess</span>
        var partiallyActiveText = <NextPlan />
        var headcheckBoxButton =<div className="weekheadCheck"><Form.Check
                                custom

                                type="checkbox"
                                id="day1"
                                label=""
                                name=""
                                onChange={this.handleCheckboxChange}
                            /></div>
                            let toDoc
        if(this.state.data){
        this.state.data.map((item) => { 
            //{this.props.areainfo.week+1} - {dayArray[this.props.areainfo.day]}
            
            if(this.props.N_Type == 1){
                toDoc ='/profile/'+ item.c_cust_code
            }else if(this.props.N_Type == 3){
                toDoc ='/ChemistProfile/'+ item.c_cust_code
            }else if(this.props.N_Type == 2){
                toDoc ='/StockiestProfile/'+ item.c_cust_code
            }
            
            if(item.Status == "Completed" ){
                item.status = activeText
            }
            if(item.Status == "Excess" ){
                item.status = inactiveText
            }
            if(item.Status == "next plan" ){
                if( item.planed > item.Target){
                    item.status=inactiveText
                }else if(item.planed == item.Target ){
                    item.status = activeText
                }else{
                    item.status = <NextPlan  nextplandata={this.nextplandata}  Doc={ item.c_cust_code  }  subarea={ this.props.areainfo["code"]  }  />
                }
                //item.Status = <NextPlan  nextplandata={this.nextplandata}  Doc={ item.c_cust_code  }  subarea={ this.props.areainfo["code"]  }  />
            }

            if(item.c_cust_code){
                const id =  item.c_cust_code;
  //{this.props.areainfo.week+1} - {dayArray[this.props.areainfo.day]}
  let selection={}
                if( this.state.Selectedkey[id]){
                     selection = this.state.slectcheck[id] ? this.state.slectcheck[id] : true
                }else{
                     selection = this.state.slectcheck[id] ? this.state.slectcheck[id] : false
                }


                item.c_cust_code1 = <CustomCheckbox
                                        item={item}
                                        check={this.state.checked}
                                        getData={this.getData}
                                        id={item.c_cust_code}
                                        slectcheck={selection}
                                    />
            }
            // if(item.c_cust_code){
            //     item.c_cust_code = <CustomCheckbox item={item.c_cust_code} check={this.state.checkedval}/>
            // }
            if(item.DName){

                item.DName = <Link to={toDoc}> {item.DName}</Link>
            }
        })
    }
        header.map((item) => {

            if (item.Target){

            }
            if(item.title == "Checkbox"){
                item.title = headcheckBoxButton
            }
        })
        if(!this.state.data){
            return null
        }



        const dayArray = ['Sunday','Monday','Tuesday','Wednesday','Thrusday','Friday','Sataurday']

//console.log("week",this.props.weekinfo)
        return (
            <div className="docttable">
                <div className={this.state.isFull ? "fullscreenView" : "dwrsubmit-first  "}>
                  <div className="doctorNameList">
                        <div className="dcr-head flex-row tptWeekDet">
                            <div>
                                {this.props.areainfo ?
                                <h5 className="dcr-list-sec-head">
                                    Week {this.props.areainfo.week} - Day {this.props.areainfo.day} {dayArray[this.props.areainfo.day]} , {this.props.areainfo.Name ? this.props.areainfo.Name+'('+ this.props.areainfo.Type+')' :this.props.areaType}
                                </h5>
                                 : null}

                            </div>
                            <div className="dcr-head-options ml32Res">
                                    {this.state.isFull ? (
                                        <img
                                            src="../public/assets/images/collapse-grey.svg"
                                            className="fullscreen_img"
                                            alt="fullscreen_img"
                                            onClick={this.handleViewChange}
                                        />
                                    ) : (
                                        <img
                                            src="../public/assets/images/fullscreen.svg"
                                            className="fullscreen_img"
                                            alt="fullscreen_img"
                                            onClick={this.handleViewChange}
                                        />
                                    )}
                                </div>
                        </div>
                        </div>
                 <DoctorNameTable
                    onclickData={this.onclickData}
                    tableHeader={header}
                    tableBody={this.state.data}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={this.state.data.length}
                    rowsPerPageOption={[]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    showpage={this.showpage}
                />
                </div>

                   {/* <StatusPopup
                        message={this.state.Errormsg}
                        show={this.state.Error}
                        onClose={this.Errorclose}
                        success={this.state.Messagetype}
                    /> */}
                    <SuccessPopup  
                        show={this.state.Error}
                        week={this.props.areainfo.week}
                        day={dayArray[this.props.areainfo.day]} 
                       onHide={this.Errorclose}
                    />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    areainfo : state.STP.areainfo

})

export default connect(mapStateToProps,null)(withRouter(DoctorName));
