/*
* This code will display village component which includes village names inside groupactivity
* Request URL=url/GroupActivity
* Index=Village
* Request string={"Index":"Village","Token":""}
* Response string={
  Code:HJ
  NAME:HJ
}
* Response Error={}

*/




import React,{Component} from 'react'
import { Dropdown } from 'semantic-ui-react'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class VillageComponent extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            Errormsg: '',
            Error: false,
            villagedic:{},
            defaultValue:'please Select Village'
            
        }
        this.handleVillage = this.handleVillage.bind(this)
    }
    
    Errorclose() {
        this.setState({ Error: false })
    }
    componentDidUpdate(oldprops,oldsatate)
    {
       if(oldprops.clearAll!=this.props.clearAll)
       {
        this.setState({defaultValue:'please Select Villag'})
       }
    }
    
    componentDidMount(){

      
        var data={"Index":"Village","sub":"uu"}
        postToServer("GroupActivity",data).then( (Result)=>{
        if(Result.data.Status == 'Success')

        if(Result.data.data)
            this.setState({ data: Result.data.data })
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At Group Activity API " })
         }  )
    }
    handleVillage(e,data){
        const villageName = data.value
        const compTopictext  = data.value.text
        this.setState({defaultValue:compTopictext})
        this.props.getVillage(villageName)
    }
    
    
    render(){ 
        const { data } = this.state
        
        if(!data)
            return null
        let villagedata=[] 
        data.map(data => {
                villagedata.push({
                    "key"   :data[Object.keys(data)[0]],
                    "text"  :data[Object.keys(data)[1]],
                    "value" :data[Object.keys(data)[0]],
                    
                })
            })
        
        return(
            <div className="singledropdown dcrStay">
                <Dropdown  text={this.state.defaultValue}  onChange={this.handleVillage}   placeholder='Select' className="customized-input cal-scrollbar" fluid selection options={villagedata} />           
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
export default  VillageComponent

