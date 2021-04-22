/* 
* This code will display CampType component inside GroupActivity
* Index=CampType
* Request URL=url/GroupActivity
* Request string={"Token":"","Index":"CampType"}
* Response string={
   Code:1
   NAME:CAMP TYPE
}
* Response Error={}
*/

import React,{Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class CampTypeComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            defaultValue:'-1'
        }
    }
    componentDidUpdate(oldprops,oldsatate)
    {


        if(this.props.n_CType_Code!= oldprops.n_CType_Code ){
            const n_CType_Code=this.props.n_CType_Code
            this.setState({ defaultValue:n_CType_Code })
          
        }

       if(oldprops.clearAll!=this.props.clearAll)
       {
        this.setState({defaultValue:'-1'})
       }
    }
    Errorclose() {
        this.setState({ Error: false })
    }
    
    componentDidMount(){
        var data={
            "Token": "",
            "Index":"CampType"}
        postToServer("GroupActivity",data).then( (Result)=>{
        if(Result.data.Status == 'Success')
            this.setState({ data: Result.data.data })
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At Group Activity API " })
         }  )
         if(this.props.n_CType_Code){
             if(this.props.n_CType_Code!=''){
                 const n_CType_Code=this.props.n_CType_Code
                 this.setState({ defaultValue:n_CType_Code })
                
             }
         }
         
    }
    
    handleCamp(e,data){
        const camptype = data.value
        const compTopictext  = data.value.text
        this.setState({defaultValue:camptype})
        this.props.getCampType(camptype)
    }
    
    render(){ 
        const { data } = this.state
        
        if(!data)
            return null
        let camptypedata=[] 
        camptypedata.push({
            "key"   :"-1",
            "text"  :'Please Select Camp Type',
            "value" :"-1",
            
        })
        data.map(data => {
                camptypedata.push({
                    "key"   :data[Object.keys(data)[0]],
                    "text"  :data[Object.keys(data)[1]],
                    "value" :data[Object.keys(data)[0]],
                    
                })
            })
        
        return(
            <div className="singledropdown dcrStay">
            <Dropdown  value={this.state.defaultValue} onChange={this.handleCamp.bind(this)}  placeholder='Select' className={this.state.defaultValue == -1 ? "customized-input cal-scrollbar custmPlaceholder": "customized-input cal-scrollbar "} fluid selection options={camptypedata} />           
            <StatusPopup
                    message={this.state.Errormsg}
                    show={this.state.Error}
                    onClose={this.Errorclose}
                    success={false}
            />
            </div>
        )
    }
}
export default  CampTypeComponent

