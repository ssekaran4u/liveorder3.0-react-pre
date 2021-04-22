
import React,{Component} from 'react'
import {Row,Col, Form} from 'react-bootstrap'
import ReactDOM from 'react-dom'
// import "./custom.css";
// import "./skeleton.css"; 
import "./prog-tracker.css"; 
// import "./normalize.css"; 
import Designation from '../components/Designation'
import FSDropDown from '../components/FSDropDown'
import {postToServer} from '../../lib/comm-utils'
//import Multistep from 'react-multistep'
import Multistep from '../../../public/react-multistep'
import  Step1  from './Step1'
import StatusPopup from '../../lib/StatusPopup'
import UserIdDropdown from '../components/UserIdDropdown'
import UserIdDropdown1 from '../components/UserIdDropdown1'
class FsWiseUserRightsDetails extends Component{
    constructor(props){
        super(props)
        this.state={
            mainmenus:[],
            regionname:[],
            selectedMenu:[],
            Selectcheck:{},
            fsname:'',
            selectedfs:'',
            selectedfsmain:'',
            divisionval:'',
            regionval:'',
            designationval:'',
            showmodal:false,
            msg:'',
            useridval:'',
            useridname:[],
            useridname1:[],
            showuser: false,
        }
        this.getdivision = this.getdivision.bind(this)
        this.getdesignation = this.getdesignation.bind(this)
        this.getregion = this.getregion.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getfsname = this.getfsname.bind(this)
        this.getItem = this.getItem.bind(this)
        this.Mainchange=this.Mainchange.bind(this)
        this.onHide = this.onHide.bind(this)
        this.getuserid = this.getuserid.bind(this)
        this.getuserid1 = this.getuserid1.bind(this)
        this.SaveOnClear=this.SaveOnClear.bind(this)
       // this.getAllData = this.getAllData.bind(this)
    }
    Mainchange(id){
    let lc=this.state.Selectcheck
    delete lc[id]
    this.setState({ Selectcheck:lc   })
    }

    getdivision(data){
        let divisionval
        if(data){
            divisionval = data
        }else{
            divisionval = ""
        }
        // var data = {"index":"fsdetails",
        // "Data":{"Division":divisionval,"Region":"","Desc":""},
        // "Token":""}
        
        // postToServer("UserRight", data).then((result)=> { 
            
        //     if(result){ 
        //         this.setState({
        //             regionname:result.data.Data
        //         })
                
        //     }

        // }).catch((Error)=> {
        //     this.setState({ Error: true, Errormsg: Error })
        //    // console.log(result)
        // }  )
       this.setState({
           divisionval:divisionval
       })
     //  this.getAllData()
    }
    getregion(data){ 
        let regionval
        if(data){
            regionval = data
        }else{
            regionval = ""
        }
let des=''
if(this.state.designationval=='')
{
    des='-999'
}
else
{
    des=this.state.designationval
}
        var data = {"index":"fsdetails",
        "Data":{"Region":data,"Desc":des},
        // "Data":{"Region":this.state.regionval,"Desc":this.state.designationval},
        "Token":""}
        // console.log(data,'rrr')
        postToServer("UserRight", data).then((result)=> { 
            
            if(result){ 
                this.setState({ 
                    regionname:result.data.Data
                })
                
            }

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )

        this.setState({ useridname: [] })
        // var data = {"index":"fsdetails",
        // "Data":{"Division":"","Region":regionval,"Desc":""},
        // "Token":""}
        
        // postToServer("UserRight", data).then((result)=> { 
            
        //     if(result){ 
        //         this.setState({
        //             regionname:result.data.Data
        //         })
                
        //     }

        // }).catch((Error)=> {
        //     this.setState({ Error: true, Errormsg: Error })
        //    // console.log(result)
        // }  )
        this.setState({
            regionval:regionval
        })
        //this.getAllData()
    }
    getdesignation(data){ //console.log("desc",data)
        
        // var data = {"index":"fsdetails",
        // "Data":{"Division":"","Region":"","Desc":desc},
        // "Token":""}
        
        // postToServer("UserRight", data).then((result)=> { 
            
        //     if(result){ 
        //         this.setState({
        //             regionname:result.data.Data
        //         })
                
        //     }

        // }).catch((Error)=> {
        //     this.setState({ Error: true, Errormsg: Error })
        //    // console.log(result)
        // }  )
        this.setState({
            designationval:data
        })

        let regionval
        if(data){
            regionval = data
        }else{
            regionval = ""
        }
            let reg='-999'
            if(this.state.regionval!='')
            {
                reg=this.state.regionval;
            }

        var data = {"index":"fsdetails",
        "Data":{"Region":reg,"Desc":data},
        // "Data":{"Region":this.state.regionval,"Desc":this.state.designationval},
        "Token":""}
        // console.log(data,'designation')
        postToServer("UserRight", data).then((result)=> { 
            
            if(result){ 
                this.setState({ 
                    regionname:result.data.Data
                })
                
            }

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )
       // this.getAllData()
       this.setState({ useridname: [] })
        
    }
    componentDidUpdate(oldprops, oldstate) {
        if (oldstate.designationval != this.state.designationval || oldstate.regionval != this.state.regionval ) {
        var data = {"index":"fsdetails",
        "Data":{"Region":this.state.regionval,"Desc":this.state.designationval},
        // "Data":{"Region":this.state.regionval,"Desc":this.state.designationval},
        "Token":""}
        
        postToServer("UserRight", data).then((result)=> { 
            
            if(result){ 
                this.setState({ 
                    regionname:result.data.Data
                })
                
            }

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )
    }
}
SaveOnClear(){
this.setState({ useridname: [] })
    var data = {"index":"fsdetails",
    "Data":{"Region":"-999","Desc":"-999"},
    // "Data":{"Region":this.state.regionval,"Desc":this.state.designationval},
    "Token":""}
    
    postToServer("UserRight", data).then((result)=> { 
        
        if(result){ 
            this.setState({ 
                regionname:result.data.Data
            })
            
        }

    }).catch((Error)=> {
        this.setState({ Error: true, Errormsg: Error })
       // console.log(result)
    }  )

    var data = {"index":"Menudetails","Token":""}
    
    postToServer("UserRight", data).then( (result)=> { 
        
        if(result){ 
            
            this.setState({
                mainmenus:result.data.submenu,
                submenus:result.data.Menu,
                division:result.data.Divsion,
                designation:result.data.Deg,
                region:result.data.Region,
                //userid:{}
            })
        }

    }).catch((Error)=> {
        this.setState({ Error: true, Errormsg: Error })
       // console.log(result)
    }  )
}
    componentDidMount(){

        var data = {"index":"fsdetails",
        "Data":{"Region":"-999","Desc":"-999"},
        // "Data":{"Region":this.state.regionval,"Desc":this.state.designationval},
        "Token":""}
        
        postToServer("UserRight", data).then((result)=> { 
            
            if(result){ 
                this.setState({ 
                    regionname:result.data.Data
                })
                
            }

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )

        var data = {"index":"Menudetails","Token":""}
        
        postToServer("UserRight", data).then( (result)=> { 
            
            if(result){ 
                
                this.setState({
                    mainmenus:result.data.submenu,
                    submenus:result.data.Menu,
                    division:result.data.Divsion,
                    designation:result.data.Deg,
                    region:result.data.Region,
                    //userid:{}
                })
            }

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )
    }
    handleSubmit(){ 
        debugger;
    //    if(this.state.designationval == ""){
    //     this.setState({
    //         showmodal:true,
    //         msg:"Please Select Designation"
    //     })
    //    }else{
        //  alert(this.state.useridval)
        // alert(this.state.designationval)
        this.setState({ showuser: true })
        var k=this.state.fsname
        if(k == ""){
            this.setState({
                showmodal:true,
                msg:"Please Select Field Staff Name",
                showuser: false
            })
        }
        else if (this.state.useridval==""){
            this.setState({
                showmodal:true,
                msg:"Please Select User Id",
                showuser: false
            })
        }
        else{
            var kk= this.state.useridval
        //    this.setState({selectedfs:k})
           this.setState({selectedfs:kk})
           this.setState({selectedfsmain:kk})
        
            let rr='-999';
            if(this.state.designationval!='')
            {
                rr=this.state.designationval;
            }


        var user = { "Index": "ListUsertocopy", "Token": "", "Data": { "DesignationCode": rr, "user":this.state.useridval } }
         console.log(user,'userlist')
                            postToServer("CopyOption", user).then((response) => {
                                //  console.log(response, user, "user")
                                // if (response.status == 200 && response.statusText == "OK") {
                                    // this.setState({ userlist: response.data.data })
                                    // console.log('listuse2')
                                    // if(response.data.data>0)
                                    // {
                                    // response.data.data.map((res, i) => {
                                    //     // userli.push({
                                    //     //     // fcode: res.fs_code,
                                    //     //     // fname: res.fsname,
                                    //     //     "key": item.fs_code,
                                    //     //     "text": item.fsname,
                                    //     //     "value": item.fsname
                                    //     //     // --Checked: true
                                    //     // })
                                    // })
                                    this.setState({ useridname1: response.data.data })
                                    // this.setState({ useridname1: userli })
                                    this.setState({ showuser: true })
                                    // this.setState({ spinner: false })
                                // }
                                // else{
                                //     alert('No User in the Selected Designation.')
                                //     this.setState({ spinner: false })
                                //     showuser: false
                                // }
                                // }
                            }).catch((Error) => {
                                // alert();
                                this.setState({ showuser: false })
                                this.setState({ spinner: false })
                                this.setState({ Error: true, Errormsg: "Error in Copy option" })
                            })
        // this.setState({cname : this.state.fsname+'('+this.state.useridval+')'})
   // }
        // var data ={"index":"Fsmenu",
        //             "Data":{"fscode":this.state.fsname},
        //             "Token":""}
        // postToServer("UserRight", data).then( (result)=> { 

            
                

            
        //         if(result.data.Status.trim() == "success" ){
        //              var locl={}
                
        //             result.data["Data"].map( (lp)=>  locl[lp.old_url]=true  )
        //             this.setState({Selectcheck:locl})


                    
        //         }
                
        //         // this.setState({
        //         //     selectedMenu:result.data.Data
        //         // })
            

        // }).catch((Error)=> {
        //     this.setState({ Error: true, Errormsg: Error })
        //     // console.log(result)
        // }  )
                        }
    }
    getfsname(name){ 
        this.setState({
            fsname:name
            ,useridval:''
            ,showuser:false
        })
        this.setState({selectedfs:''})
        // this.state.useridval
        // console.log(this.state.divisionval, this.state.designationval,'all state' )
            var user = { "Index": "FsCode", "Token": "", "Data": { "selectedfs": name } }
            postToServer("CopyOption", user).then((response) => {
                //  console.log(response.data, "user")
                if (response.data.Status == "Success") {
                    // console.log(response.data.data,'sojan')
                    this.setState({ useridname: response.data.data,spinner: false })


                    // console.log( response.data.data,'<<kunal')
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })

    }
    getuserid(name){ 
        // alert(name+'pubg')
        this.setState({
            useridval:name,
            showuser:false
        })
        this.setState({selectedfs:''})
    }

    getuserid1(name){ 
        //  alert(name+'sojan')
         if(name=="-999")
         {
            //  alert(this.state.selectedfsmain);
            this.setState({selectedfs:this.state.selectedfsmain})
            this.setState({
                useridval:this.state.selectedfsmain
            })
            
         }
         else{
        this.setState({
            useridval:name
        })
        this.setState({selectedfs:name})
    }
    }
    
    // changeCheckbox(id, name, checked,item){ 
    // let lc=this.state.Selectcheck
    // delete lc[id]
    // this.setState({ Selectcheck:lc   })
    // }
    getItem(name){
       this.setState({
           cname:name
       })
       if(name=="")
       {
           this.setState({
           
            division:[],
            designation:[],
            region:[],
            showuser:false,
            regionname:[],
            // fsname:'-1'
            
        })
        var user = { "Index": "FsCode", "Token": "", "Data": { "selectedfs": this.state.fsname } }
            postToServer("CopyOption", user).then((response) => {
                //  console.log(response.data, "user")
                if (response.data.Status == "Success") {
                    // console.log(response.data.data,'sojan')
                    this.setState({ useridname: response.data.data,spinner: false })


                    // console.log( response.data.data,'<<kunal')
                }
            }).catch((Error) => {
                this.setState({ Error: true, Errormsg: "Error in Copy option" })
            })
        this.setState({ useridname: [] })
        var data = {"index":"fsdetails",
        "Data":{"Region":"-999","Desc":"-999"},
        // "Data":{"Region":this.state.regionval,"Desc":this.state.designationval},
        "Token":""}
        
        postToServer("UserRight", data).then((result)=> { 
            
            if(result){ 
                this.setState({ 
                    regionname:result.data.Data
                })
                
            }
    
        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )


        var data = {"index":"Menudetails","Token":""}
        
        postToServer("UserRight", data).then( (result)=> { 
            
            if(result){ 
                
                this.setState({
                    designation:result.data.Deg,
                    region:result.data.Region,
                    //userid:{}
                })
            }

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )
            console.log(this.state.useridval,'kkk')
        this.setState({selectedfs:this.state.useridval})

       }
    }
    onHide(){
        this.setState({
            showmodal:!this.state.showmodal
        })
    }
    render(){ 
        const nameaaray =[]


        if(this.state.mainmenus.length==0 || !this.state.selectedMenu)
        return null
 
        let lastItem = this.state.mainmenus.slice(-1)[0];
      
        this.state.mainmenus.map((item) =>{
           const cc=this.Mainchange
           
        nameaaray.push({name: [<img key={item.n_id} src={'../public/assets/images/' + item.c_image}  />,
         <span> { item.c_name }</span>], component: <Step1 code="fswise" fscodemain={this.state.selectedfsmain} fscode={this.state.selectedfs} getItem={this.getItem} Selectcheck={this.state.Selectcheck}  iconval={this.state.submenus} id ={item.n_id} Mainchange={cc}   mainmenu={item.c_name} lastitem={lastItem.c_name} />})
       
        })
        
        return(
            <div>
                
                <div className="userRight mb-20">
                    <div className="userpadd flexDisplay">
                    {/* <div className="colpad20">
                             <Form.Label className="customized-label">Division</Form.Label>
                            <Designation data={this.state.division} getValue={this.getdivision} passcode="region" />
                        </div>  */}
                        <div className="colpad20">
                            <Form.Label className="customized-label">Region</Form.Label>
                            <Designation data={this.state.region} value1='-999' getValue={this.getregion} passcode="region" />
                        </div>
                        <div className="colpad20">
                            <Form.Label className="customized-label">Designation<span className="colorRed">*</span></Form.Label>
                            <Designation data={this.state.designation} getValue={this.getdesignation} />
                        </div>
                        <div className="colpad20">
                            <Form.Label className="customized-label">Field Staff Name<span className="colorRed">*</span></Form.Label>
                            <FSDropDown  data={this.state.regionname} getfsname={this.getfsname} />
                        </div>
                        <div className="colpad20">
                            <Form.Label className="customized-label">User Id<span className="colorRed">*</span></Form.Label>
                            <UserIdDropdown data={this.state.useridname} getuserid={this.getuserid} /></div>
                        <div className="">
                           
                            <div className="gobtn" onClick={this.handleSubmit}>Go</div>
                           
                        </div>
                       
                    </div>
                </div>
                {this.state.showuser == true ?
                <div className="userRight mb-20" id='cpyfrmuser'>
                    <div className="userpadd flexDisplay">
                    <div className="colpad20">
                    <Form.Label className="customized-label">Copy Form User
                    {/* <span className="colorRed">*</span> */}
                    </Form.Label>
                            <UserIdDropdown1 data={this.state.useridname1} getuserid1={this.getuserid1} /></div>
                    </div>
                    </div>
                     : null}
                <div className="userRight pd-bottom">
                    {this.state.cname ? <div className="drname">{this.state.cname}</div> : '' }
                    <Multistep   steps={nameaaray}   />
                   
                </div>
                    <StatusPopup
                        message={this.state.msg}
                        show={this.state.showmodal}
                        onClose={this.onHide}
                        success={false}
                    />
            </div>
        )
    }
}
export default FsWiseUserRightsDetails
