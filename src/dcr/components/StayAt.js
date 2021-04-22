import React,{Component} from 'react'
import {postToServer} from '../../lib/comm-utils'
import { Dropdown } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'
// const options = [
//     { key: 'angular', text: 'Angular', value: 'angular' },
//     { key: 'css', text: 'CSS', value: 'css' },
//     { key: 'design', text: 'Graphic Design', value: 'design' },
//     { key: 'ember', text: 'Ember', value: 'ember' },
//     { key: 'html', text: 'HTML', value: 'html' },
//     { key: 'ia', text: 'Information Architecture', value: 'ia' },
//     { key: 'javascript', text: 'Javascript', value: 'javascript' },
//     { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
//     { key: 'meteor', text: 'Meteor', value: 'meteor' },
//     { key: 'node', text: 'NodeJS', value: 'node' },
//     { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
//     { key: 'python', text: 'Python', value: 'python' },
//     { key: 'rails', text: 'Rails', value: 'rails' },
//     { key: 'react', text: 'React', value: 'react' },
//     { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
//     { key: 'ruby', text: 'Ruby', value: 'ruby' },
//     { key: 'ui', text: 'UI Design', value: 'ui' },
//     { key: 'ux', text: 'User Experience', value: 'ux' },
// ]
class StayAt extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            hqvalue:'',
            stayAutoFlag:'',
            editMOde:'',
            staydata:[],
            editFlag:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.getStayAt = this.getStayAt.bind(this)
    }
    handleChange(e,data){ 
        const area = data.value
       
        if(this.state.editFlag == 'edit'){
            if(this.state.stayFlag == "1"){
                this.setState({
                    hqvalue:area
                })
                this.props.getStayAtPlace(area)
            }else{
                this.setState({
                    hqvalue:this.state.hqvalue
                })
                this.props.getStayAtPlace(this.state.hqvalue)
            }
        }else{ 
            if(this.state.stayAutoFlag == "0" || this.state.stayAutoFlag == "1"){
                this.setState({
                    hqvalue:area
                })
                this.props.getStayAtPlace(area)
            }
            if(this.state.stayAutoFlag == "2"){
                this.setState({
                    hqvalue:this.state.hqvalue
                })
                this.props.getStayAtPlace(this.state.hqvalue)
            }
            if(this.state.stayAutoFlag == ""){
                this.setState({
                    hqvalue:area
                })
                this.props.getStayAtPlace(area)
            }
        }
    
    }


    componentDidMount() {
      
        let nFlag = localStorage.getItem("nflag")
        let autoflag = "2"
        this.getStayAt('',this.props.docCode,autoflag,this.props.dcrno)
       if(this.props.edit == 'edit'){


        if( this.props.Editmodedata.Group_Details){
           this.props.Editmodedata.Group_Details.map((item)=>{ 
               if(nFlag == '1'){
                this.setState({
                    defaultHq :item.C_Stayed_At,
                    hqvalue :item.C_Stayed_At,

                })
               }else{
                this.setState({
                   // defaultHq :this.state.defaultHq,
                    hqvalue :this.state.defaultHq,

                })
               }
                
           })
        }
        this.setState({
            stayAutoFlag:autoflag,
            stayFlag:nFlag,
            editFlag:this.props.edit
          })
       }else{
      
        this.setState({
            stayAutoFlag:this.props.stayAutoFlag,
            stayFlag:this.props.stayFlag,
            editFlag:this.props.edit
          })
       }
      
      
    }
    componentDidUpdate(oldprop,oldstate){
        if(oldstate.defaultHq != this.state.defaultHq){
            this.props.getStayAtPlace(this.state.defaultHq)
            
        }
          
      

      
    }

    getStayAt(fscode,docCode,autoflag,dcrno){
     if(docCode == undefined){
        docCode =''
     }else{
        docCode =docCode
     }
   
      var data = {"Index":"StayedAt","Token":"token","Data":{"workwithfscode":fscode,"doc_code":docCode,"dcrno":dcrno}} 
       // var data = {"index":"fs_mapped","Data":{"Division":"","Region":"","Desc": Secdata }} 
        postToServer("DCRAPI", data).then((result)=> { 
            if(result){ 
                // if(autoflag == "1" || autoflag == "2"){
                    result.data.map((item)=>{
                        if(item.type != ""){ 
                            
                            this.setState({
                                defaultHq :item.c_code,
                                hqvalue:item.c_code
                            })
                        }
                    })
                // }else{
                //     this.setState({
                //         hqvalue :this.state.hqvalue
                //     })
                // }
              
                this.setState({
                    staydata:result.data
                })  
            }

        }).catch((Error)=> {
            this.setState({ Error: true, Errormsg: Error })
           // console.log(result)
        }  )
    }
    render(){
      //  const { data } = this.props
        let options=[] 
        if(this.state.staydata)
            {
                options.push({
                    "key"   :"-1",
                    "text"  :"Please Select Stay At ",
                    "value" :"-1",
                    
                })
            this.state.staydata.map(data => {
            options.push({
                    "key"   :data[Object.keys(data)[0]],
                    "text"  :data[Object.keys(data)[1]],
                    "value" :data[Object.keys(data)[0]],
                    
                })
            })
        }
    
        return(
            <div className="singledropdown dcrStay userightDrop">
                <Dropdown placeholder='Select' 
                onChange={this.handleChange} 
                // value={this.props.stayAutoFlag == "1" ? this.props.defaultHq :this.state.defvalue} 
                value={this.state.hqvalue}
                search fluid selection options={options} />
            </div>
        )
    }
}
export default withRouter(StayAt)
