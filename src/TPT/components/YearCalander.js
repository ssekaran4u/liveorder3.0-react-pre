import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactHover from 'react-hover';
import TotalWeeksDetail from './TotalWeeksDetail';
import EndUserDetail from './EndUserDetail';
import TPTDayWise from './TPTDayWise'
import { postToServer } from '../../lib/comm-utils'
import TotalCallsRow from '../components/TotalCallsRow'

class YearCalander extends Component {
    constructor(props) {
        super(props)
        this.state={
            enduser:false,
            totalcalls:false,
            totalcall1:false,
            loop1:[1,2,3,4,5,6,7,8,9],
            loop2:[1,2,3,4,5,6],
            selectedSubarea:'',
            Datakey:{},
            areaName:'',
            selecteditem:[],
            TotalIndexcount:{},
            rowtotal:{},
            coltotal:{},
            ShowCallPopup:false,
            totalWeekCount:{},
            total:0
        }
        this.getWeekly = this.getWeekly.bind(this)
        this.showEnduser = this.showEnduser.bind(this)
        this.showTotalCalls = this.showTotalCalls.bind(this)
        this.showTotalCalls1 = this.showTotalCalls1.bind(this)
        this.LoadSelectedSub = this.LoadSelectedSub.bind(this)
        // this.getWeeklyInfo= this.getWeeklyInfo.bind(this)
        this.getDetails = this.getDetails.bind(this)
        this.hidePopup =this.hidePopup.bind(this)
    }
    funcLoad(subarea){ 
        var count={}
       
        const _this=this
        var c={}
        var r={}
        var total=0
        var totalcount = 0
        let totalWeek ={}
//        const nodata = {"index":"Cal_Nodetails","Data":{"subarea":subarea},"Token":""}
//        postToServer("TPT", nodata).then(function (result) {
//         if(result.data["Status"]=="Success"){ 
//         result.data["Result"].map((a)=>{ console.log("nodata",a)
//         if(count[a.n_week]){

//             // if(c[a.week])
//             // {
//             //     c[a.n_week]= 1 + c[a.n_week]
//             // }else
//             // {
//             //     c[a.n_week]=1
//             // }
//         if( count[a.n_week][a.day]){ 

//                 // if(r[a.day]){
//                 //     r[a.day]= 1 + c[a.day]
//                 // }else{
//                 //     r[a.day]=1
//                 // }
     
//         if(count[a.n_week][a.day][a.type]){
//             var d= count[a.n_week][a.day][a.type]
//             count[a.n_week][a.day][a.type]= d + 1
//         }else{
//             count[a.n_week][a.day][a.type]=1 
//         }
//     }else{

//         // if(r[a.day]){
//         //     r[a.day]= 1 + c[a.week]
//         // }else{
//         //     r[a.day]=1
//         // }
        
//        // count[a.n_week]={}
//         count[a.n_week][a.day]={}
//         count[a.n_week][a.day][a.type]=1
//     }
// }else{
//     count[a.n_week]={}
//     count[a.n_week][a.day]={}
//     count[a.n_week][a.day][a.type]=1
// }
//         })
//         console.log("count",count)
//         }
    
//        })
//        this.setState({
//         TotalIndexcount:count
//        })
//        return
// let sub_area
// if(subarea){
//     sub_area = subarea
// }else{
//     sub_area = this.props.loadData
// }
        const data={"index":"Cal_details", "Data":{ "subarea":subarea } }
        postToServer("TPT", data).then(function (result) {
            if(result.data["Status"]=="Success"){
               var temp={}
               //console.log(result.data["Result"],'kunal sinha')
               let totalWeekCount={}
                var Newvar={}
                let totalW =0

                if(result.data["Result"] != ""){
                result.data["Result"].map((a)=>{
                total=total+1
                   var ab={}
                   var type={}
                   var Selected={}
                   totalW = totalW+1
                /**
                    *  basic logic to create index wise  dsca set up
                */
                   Selected[a.C_Doc_Code]= {" C_Doc_Code":a.C_Doc_Code,"C_Name":a.C_Name}
                   var templist=[]
                    if(temp[a.n_week]){
                        if(temp[a.n_week][a.N_dayof_week]){
                            if(temp[a.n_week][a.N_dayof_week][a.type]){ 
                                templist=temp[a.n_week][a.N_dayof_week][a.type]
                                templist.push(Selected)
                                temp[a.n_week][a.N_dayof_week][a.type]=templist
                            }else{
                                temp[a.n_week][a.N_dayof_week][a.type]={}
                                templist.push(Selected)
                                temp[a.n_week][a.N_dayof_week][a.type]=templist
                            }
                       }else{
                            temp[a.n_week][a.N_dayof_week]={}
                            templist.push(Selected)
                            temp[a.n_week][a.N_dayof_week][a.type]=templist
                       }
                    }else{
                        temp[a.n_week]={}
                        temp[a.n_week][a.N_dayof_week]={}
                        templist.push(Selected)
                        temp[a.n_week] [a.N_dayof_week][a.type]=templist
                    } 
                 //  

                //    if(temp[a.N_dayof_week])
                //    {
                //        if(temp[a.N_dayof_week] [a.n_week])
                //        {
                //             type=temp[a.N_dayof_week][a.n_week]
                //        }
                //     }
                //    type[a.type]= templist
                //    ab[a.n_week]=type
                //    temp[a.N_dayof_week]=ab
                //    console.log(templist,type,temp,'kunal sinha12')
                   /**
                    * loigc  to calculate   daywise docount
                    */
                   //a.N_dayof_week
                   //a.n_week
                if(totalWeekCount[a.N_dayof_week]){
                    if(totalWeekCount[a.N_dayof_week][a.type]){
                        totalWeekCount[a.N_dayof_week][a.type]=totalWeekCount[a.N_dayof_week][a.type]+1
                    }else{
                        totalWeekCount[a.N_dayof_week][a.type]=1
                    }
                }else{
                    totalWeekCount[a.N_dayof_week]= {}
                    totalWeekCount[a.N_dayof_week][a.type]= 1
                }
                if(count[a.n_week]){
                    if(c[a.n_week])
                    {
                        c[a.n_week]= 1 + c[a.n_week];
                    }else
                    {
                        c[a.n_week]=1
                    }
                if( count[a.n_week][a.N_dayof_week]){


                   
                    if(r[a.N_dayof_week]){  //debugger
                        r[a.N_dayof_week]= 1 + r[a.N_dayof_week];
                       // r[a.N_dayof_week]=  c[a.N_dayof_week];
                    }else{
                        r[a.N_dayof_week]=  1
                    }
             
                    if(count[a.n_week][a.N_dayof_week][a.type]){
                        var d= count[a.n_week][a.N_dayof_week][a.type]
                        count[a.n_week][a.N_dayof_week][a.type]= d + 1
                    }else{
                        count[a.n_week][a.N_dayof_week][a.type]=1 
                    }
                    
                }else{ 
                   
                    if(r[a.N_dayof_week]){
                        r[a.N_dayof_week]= 1 +  r[a.N_dayof_week]
                    }else{
                        r[a.N_dayof_week]=  1
                    }
                    // count[a.n_week]={}
                    count[a.n_week][a.N_dayof_week]={}
                    count[a.n_week][a.N_dayof_week][a.type]=1
                    
                }

                }else{

                    if(c[a.n_week]){
                        c[a.n_week]= 1 + c[a.n_week]
                    }else{
                        c[a.n_week]=1
                    }
                    count[a.n_week]={}
                    count[a.n_week][a.N_dayof_week]={}
                    count[a.n_week][a.N_dayof_week][a.type]=1
                    r[a.N_dayof_week]=1;
                }

                //Datakey
               })
            }
           
            if(result.data["Nodetails"]){
            
            let chem
            let doc
            let stock
            let other
            
            result.data["Nodetails"].map((a)=>{ 
                
                if(a){
                    
                    
                    if(count[a.week] )
                    {

                        if(count[a.week][a.day]){

                            if(count[a.week][a.day]['DOCTOR']){
                                count[a.week][a.day]['DOCTOR'] =   count[a.week][a.day]['DOCTOR']  +  a.DOCTOR
                                
                            }else{
                                count[a.week][a.day]['DOCTOR']=a.DOCTOR
                            }


                            if(count[a.week][a.day]['STOCKIST']){
                                count[a.week][a.day]['STOCKIST'] =   count[a.week][a.day]['STOCKIST']  +  a.STOCKIST
                            }else{
                                count[a.week][a.day]['STOCKIST']=a.STOCKIST
                            }


                            if(count[a.week][a.day]['CHEMIST']){
                                count[a.week][a.day]['CHEMIST'] =   count[a.week][a.day]['CHEMIST']  +  a.CHEMIST
                            }else{
                                count[a.week][a.day]['CHEMIST']=a.CHEMIST
                            }
                            if(count[a.week][a.day]['OTHERS']){
                                count[a.week][a.day]['OTHERS'] =   count[a.week][a.day]['OTHERS']  +  a.OTHERS
                            }else{
                                count[a.week][a.day]['OTHERS']=a.OTHERS
                            }
                            //count[a.week][a.day]['CHEMIST'] =  a.CHEMIST
                        }else{
                            count[a.week][a.day]={}
                            count[a.week][a.day]['CHEMIST'] = a.CHEMIST
                            count[a.week][a.day]['DOCTOR'] = a.DOCTOR
                            count[a.week][a.day]['STOCKIST'] = a.STOCKIST
                            count[a.week][a.day]['OTHERS'] = a.OTHERS
                        }
                        
                    } else{
                        count[a.week] ={}
                        count[a.week][a.day] = {}
                        count[a.week][a.day]['CHEMIST'] = a.CHEMIST
                        count[a.week][a.day]['DOCTOR'] = a.DOCTOR
                        count[a.week][a.day]['STOCKIST'] = a.STOCKIST
                        count[a.week][a.day]['OTHERS'] = a.OTHERS
                    }
                   

                    chem= a.CHEMIST
                    doc= a.DOCTOR
                    stock = a.STOCKIST
                    other = a.OTHERS
                    totalWeek = parseInt(chem)+parseInt(doc)+parseInt(stock)+parseInt(other)
                    
                    
                   if(c[a.week]){
                      
                    c[a.week]=c[a.week]+totalWeek
                   }else{
                    c[a.week]=totalWeek
                   }
                   if(r[a.day]){ 
                    //console.log("kunal",a.day,r[a.day])
                       r[a.day] = r[a.day]+totalWeek

                      // console.log("kunal",a.day,r[a.day])
                   }else{ 
                        r[a.day]=  totalWeek
                   }
                   if(total){
                        total = total+totalWeek
                   }else{
                        total =totalWeek
                   }
                   if(totalWeekCount[a.day]){
                        if(totalWeekCount[a.day]['DOCTOR']){
                            totalWeekCount[a.day]['DOCTOR'] = parseInt(totalWeekCount[a.day]['DOCTOR'])+ parseInt(a.DOCTOR)
                        }else{
                            totalWeekCount[a.day]['DOCTOR'] = a.DOCTOR
                        }
                        if(totalWeekCount[a.day]['CHEMIST']){
                            totalWeekCount[a.day]['CHEMIST'] = parseInt(totalWeekCount[a.day]['CHEMIST'])+ parseInt(a.CHEMIST)
                        }else{
                            totalWeekCount[a.day]['CHEMIST'] =  a.CHEMIST
                        }
                        if(totalWeekCount[a.day]['STOCKIST']){
                            totalWeekCount[a.day]['STOCKIST'] = parseInt(totalWeekCount[a.day]['STOCKIST'])+ parseInt(a.STOCKIST)
                        }else{
                            totalWeekCount[a.day]['STOCKIST'] =  a.STOCKIST
                        }
                        if(totalWeekCount[a.day]['OTHERS']){
                            totalWeekCount[a.day]['OTHERS'] = parseInt(totalWeekCount[a.day]['OTHERS'])+ parseInt(a.STOCKIST)
                        }else{
                            totalWeekCount[a.day]['OTHERS'] =  a.OTHERS
                        }
                       
                     //  console.log("hi",totalWeekCount)
                   }else{
                        totalWeekCount[a.day]= {}
                        totalWeekCount[a.day]['DOCTOR'] = a.DOCTOR
                        totalWeekCount[a.day]['CHEMIST'] =  a.CHEMIST
                        totalWeekCount[a.day]['STOCKIST'] =  a.STOCKIST
                        totalWeekCount[a.day]['OTHERS'] =  a.OTHERS
                   }
                   if(temp[a.week]){ 
                       if(temp[a.week][a.day]){
                        if(temp[a.week][a.day]['DOCTOR']){ 
                            temp[a.week][a.day]['DOCTOR'] = parseInt(temp[a.week][a.day]) + a.DOCTOR
                        }else{
                            temp[a.week][a.day]['DOCTOR'] =  a.DOCTOR
                        }
                        if(temp[a.week][a.day]['CHEMIST']){ 
                            temp[a.week][a.day]['CHEMIST'] = parseInt(temp[a.week][a.day]) + a.CHEMIST
                        }else{
                            temp[a.week][a.day]['CHEMIST'] =  a.CHEMIST
                        }
                        if(temp[a.week][a.day]['STOCKIST']){ 
                            temp[a.week][a.day]['STOCKIST'] = parseInt(temp[a.week][a.day]) + a.STOCKIST
                        }else{
                            temp[a.week][a.day]['STOCKIST'] =  a.STOCKIST
                        }
                       }
                   }else{
                      
                   }
                // totalWeekCount[a.week]={}
                // totalWeekCount[a.week]['DOCTOR'] = a.DOCTOR
                // console.log("san",totalWeekCount)
            }
                        
            })
           
        }
        console.log(c,r,'kunal sinha')
       
        //total = parseInt(totalcount)+parseInt(total)
               _this.setState({
                   Datakey:temp,
                   TotalIndexcount:count,
                   coltotal:c, 
                   rowtotal:r,
                   totalWeekCount:totalWeekCount,
                   total:total })

           }

          

           //Datakey[]

       }).catch( (Error)=>{

            console.log(Error)
         //  _this.setState({ Error: true, Errormsg:"App Error" })
       })
    //    console.log(total,'kunal sinha')
    
   }

//     funcLoad(subarea){
//         const _this=this
//        let c={}
//        let r={}
//        const data={"index":"Cal_details", "Data":{ "subarea":subarea } }
//        postToServer("TPT", data).then(function (result) {

//            if(result.data["Status"]=="Success"){
//                var temp={}
//                //console.log(result.data["Result"],'kunal sinha')
//                var count={}
//                var totalW = 0
//                result.data["Result"].map((a)=>{

//                    var ab={}
//                    var type={}
//                    var Selected={}
//                     totalW = totalW+1

//                    /**
//                     *  basic logic to create index wise  dsca set up
//                     */
//                    Selected[a.C_Doc_Code]= {" C_Doc_Code":a.C_Doc_Code,"C_Name":a.C_Name}
//                    var templist=[]
//                    if(temp[a.N_dayof_week])
//                    {
//                        if(temp[a.N_dayof_week] [a.n_week]){
//                             if(temp[a.N_dayof_week] [a.n_week][a.type]){
//                                 templist=temp[a.N_dayof_week][a.n_week][a.type]
//                             }
//                        }
//                    }
//                    templist.push(Selected)

//                    if(temp[a.N_dayof_week])
//                    {
//                        if(temp[a.N_dayof_week] [a.n_week]){

//                         type=temp[a.N_dayof_week][a.n_week]
//                         }
//                     }
//                    type[a.type]= templist

//                    ab[a.n_week]=type
//                    temp[a.N_dayof_week]=ab
                
                
//                  if(count[a.N_dayof_week]){

//                     if(c[a.N_dayof_week]){
//                         c[a.N_dayof_week]= 1 + c[a.N_dayof_week]
//                     }else{
//                         c[a.N_dayof_week]=1
//                     }
                  
//                      if( count[a.N_dayof_week][a.n_week]){
                       
//                         if(r[a.n_week]){
//                             r[a.n_week]= 1 + c[a.n_week]
//                         }else{
//                             r[a.n_week]=1
//                         }
                        
//                             if(count[a.N_dayof_week][a.n_week][a.type]){ 
//                             var d= count[a.N_dayof_week][a.n_week][a.type]
//                             count[a.N_dayof_week][a.n_week][a.type]=d+1
//                             }else{
                        
//                                 count[a.N_dayof_week][a.n_week][a.type]=1
//                             }
//                         }else{

//                             if(r[a.n_week]){
//                                 r[a.n_week]= 1 + c[a.n_week]
//                             }else{
//                                 r[a.n_week]=1
//                             }

//                            // count[a.N_dayof_week]={}
//                             count[a.N_dayof_week][a.n_week]={}
//                             count[a.N_dayof_week][a.n_week][a.type]=1
//                         }

//                  }else{

//                     if(c[a.N_dayof_week]){
//                         c[a.N_dayof_week]= 1 + c[a.N_dayof_week]
//                     }else{
//                         c[a.N_dayof_week]=1
//                     }
//                     count[a.N_dayof_week]={}
//                     count[a.N_dayof_week][a.n_week]={}
//                     count[a.N_dayof_week][a.n_week][a.type]=1
//                  }

              
//                })
//                console.log("ccc",count,)
//                console.log("ccc",temp,)

//                _this.setState({Datakey:temp,TotalIndexcount:count,coltotal:c, rowtotal:r,totalWeek:totalW})


//                 //console.log(temp)


//            }



//            //Datakey[]

//        }).catch( (Error)=>{

//             console.log(Error)
//          //  _this.setState({ Error: true, Errormsg:"App Error" })
//        })
//    }
    componentDidUpdate(oldProps,oldstate){
        if(oldProps.loadData != this.props.loadData){
            this.funcLoad(this.props.loadData)
            
        }
        if(oldstate.total != this.state.total){
           
            this.props.total(this.state.total)
        }
        
    }
    LoadSelectedSub(selecteditem,total) { 
       
    const code=selecteditem["code"];
    
    if(this.state.selectedSubarea != code){
       this.funcLoad(code)
    }else{
        return null
    }

    this.setState({
        selectedSubarea :code,
        Datakey:{},
        areaName:selecteditem["Name"],
        selecteditem:selecteditem,
        subarea:selecteditem['Type']
     })
    // this.props.total(total)
    }
    getWeekly(){
        this.props.history.push('/daywise')
    }
    showEnduser() {
        this.setState({
            enduser: !this.state.enduser
        })
    }
    showTotalCalls() {
        this.setState({
            totalcalls: !this.state.totalcalls
        })
    }
    showTotalCalls1() {
        this.setState({
            totalcall1: !this.state.totalcall1
        })
    }
    getDetails(){
        this.setState({
            ShowCallPopup:!this.state.ShowCallPopup
        })
    }
    hidePopup(){
        this.setState({
            ShowCallPopup:!this.state.ShowCallPopup
        })
    }

    render() {
        var totalsum = 0
         // console.log("coltotal",this.state.coltotal)
        //  this.state.coltotal.map( (oneobect)=>{ console.log("key",oneobect)
        //     totalsum=totalsum + oneobect
        //     console.log("total",totalsum)
        //  })
        // if(this.state.coltotal){
        // Object.keys(this.state.coltotal).forEach(function(key) {
        //     var arr = [];
        //     arr.push(this.state.coltotal[key]);
        //     console.log("total",arr)
        //   });
        // }
        let weekindex
        if(this.state.totalWeek){
            //console.log("hh",this.state.totalWeek,this.props.index1,this.props.index2)
            Object.keys(this.state.totalWeek).map((item) =>{
   //  console.log("kk",item)
                weekindex = item
            })
        }
        const options = {
            followCursor: true,
            shiftY: 250,
            shiftX: -20
        }
        const options1 = {
            followCursor: true,
            shiftY: -70,
            shiftX: -30
        }
     //  console.log("sweta",this.state.coltotal)
        return (
            <React.Fragment>
                
                <div className="calTable">
                    <table className="table table-bordered calanderTable " cellPadding="0" cellSpacing="0">
                    <thead>
                        <tr>
                        <th scope="col" className="desktopView">Patches</th>
                        <th scope="col" ><span className="desktopView">Monday</span><span className="MobileView">Mon</span></th>
                        <th scope="col"><span className="desktopView">Tuesday</span><span className="MobileView">Tue</span></th>
                        <th scope="col"><span className="desktopView">Wednesday</span><span className="MobileView">Wed</span></th>
                        <th scope="col"><span className="desktopView">Thursday</span><span className="MobileView">Thr</span></th>
                        <th scope="col"><span className="desktopView">Friday</span><span className="MobileView">Fri</span></th>
                        <th scope="col"><span className="desktopView">Saturday</span><span className="MobileView">Sat</span></th>
                        <th scope="col"><span className="desktopView">Sunday</span><span className="MobileView">Sun</span></th>
                        <th scope="col" className="desktopView">Week Details</th>
                        </tr>
                    </thead>
                    <tbody>
                    
            {
                this.state.loop2.map((a,index1)=>{
                    return <tr>
            {  this.state.loop1.map((b,index2)=>{

            if(index2==0 && index1==0){
                return  <td rowSpan="5" className="desktopView">
                            <div className="parentsubScroll">
                                {this.props.serachItem != "" ?
                            <div className="toursubarea">
                                {this.props.serachItem.map((item) => (
                            <li onClick={() => { this.LoadSelectedSub(item) }} className={this.state.areaName == item.Name && this.state.subarea == item.Type ?"activeSubArealink areaLinks areaLink":"areaLinks areaLink"}><span>{item.Name}</span>({item.Type})</li>
                                ))} </div> :
                            <div className="toursubarea">
                                {this.props.patches ? this.props.patches.map((item) => (
                                    <li onClick={() => { this.LoadSelectedSub(item) }} className={this.state.areaName == item.Name && this.state.subarea == item.Type ?"activeSubArealink areaLinks areaLink":"areaLinks areaLink"}><span>{item.Name}</span>({item.Type})</li>
                                )) : null}
                            </div>
                                }
                            </div>
                        </td>
            }

            if(index1==5 && index2==0){
                return   <th scope="col" className="desktopView"> Total  </th>
            }
            if(index1==5 && index2==8){
                return   <th className="desktopView"  scope="col"> Week Total({this.state.total}) </th>
            }   
            if(index1==5){
                return  <TotalCallsRow    totalWeekCount={this.state.totalWeekCount}  TotalIndexcount={this.state.TotalIndexcount}    index1={index1}  index2={index2} callDetails={this.state.rowtotal[index2] } />
            }

            if(index2==0){
                return null
            }
            return <TPTDayWise areaType= {this.props.areaname} rowtotal={this.state.coltotal[index1+1]}  basecount={this.state.TotalIndexcount}  Loaddata={this.state.Datakey} subarea={this.state.selectedSubarea ? this.state.selectedSubarea:this.props.loadData} selecteditem={this.state.selecteditem} index1={index1}  index2={index2} > </TPTDayWise>

            })
        }
        </tr>
    })
}
                    </tbody>
                </table>
                </div>

            </React.Fragment>
        );
    }
}

export default withRouter(YearCalander);