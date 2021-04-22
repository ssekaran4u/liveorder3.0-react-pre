
/*
* This code will display stayat component which includes places where to stayat  inside otherworktypedwr
* Request URL=url/DWRSave
* Index=GetPlaceOfWork_DCRMCR
* Request string={{"Token":"","index":"GetPlaceOfWork_DCRMCR","date_report":"18/12/2018"}
* Response string={
   C_CODE:TNP0334
   C_NAME:ACS HOSPITAL (POONAMALLEE)
}
* Response Error={}

*/

import React, {Component} from 'react';

import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getStayedData } from '../../actions/DCRSearch'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'
class StayAtComp extends Component{
    constructor(props){
        super(props)
        this.state={
            Errormsg: '',
            Error: false,
            defaultValue:'-1',
            
            value:'-1'
            
        }
        this.getStayed = this.getStayed.bind(this)
        this.funstayat=this.funstayat.bind(this)
        this.Errorclose=this.Errorclose.bind(this)
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.data !== nextProps.data) 
    //        // console.log("data=",nextProps.data)
    //         return {...prevState, data:nextProps.data}
        
    //     return null
    // }


    Errorclose() {
        this.setState({ Error: false })
    }

    componentDidUpdate(oldprops,oldsatate)
    {
       if(oldprops.clearAll!=this.props.clearAll)
       {

       const _this=this
        _this.setState({ defaultValue:'-1',value:'-1'})


       }


       if(oldprops.palce!=this.props.palce){
        if (this.props.Editstay==''){
               if(oldprops.palce!=this.props.palce){
                const temp=this.props.palce
              
              this.setState({value:temp})
              this.props.onselect(temp)
              
            }
        }else{
           const temp= this.props.Editstay
            this.setState({value:temp})
            this.props.onselect(temp)
        }
               }


    //    if(oldprops.palce!=this.props.palce){
    //     const temp=this.props.palce
      
    //   this.setState({value:temp})
    //   this.props.onselect(temp)
    // //   
    // }
    }
    componentDidMount(){
        this.getStayed()

        if(this.props.palce){
        if(this.props.palce!=''){
         const temp=this.props.palce
            this.setState({value:temp})
            //this.props.onselect(temp) 
        }
        }
    }
    
    getStayed(){
       // var data={"Token": "sfa360|MR1(Salem)|MR1|TNH0012|AIAaDdKtMMZSQSxbEwU2019-05-02T11:33:51+05:30",
        //         "save":"GetChild_SubArea",
        //         "date_report":"18/12/2018"

        // }
        // this.props.getStayedData(data)

        var day=this.props.date.getDate() 
        var year= this.props.date.getFullYear()
        var month= this.props.date.getMonth()+1
        const  date=day+"/"+month+"/"+year
        var data={
        "save":"GetPlaceOfWork_DCRMCR",
        "date_report":date
        }
        
        postToServer("DWRSave",data).then( (Result)=>{
   this.setState({ data:Result.data["place"]})
        }).catch(  (Error)=> {  
            this.setState({ Error: true, Errormsg: "Error in App At stay At API " ,data:[]})
         }  )
    }
    

    funstayat(event,value){

        
        if(this.props.flag!=2){

            // alert(this.props.flag)
        const values=value.value
        const compTopictext  = value.value.text   
        this.setState({   value:values, defaultValue:compTopictext,  Selectedvalue: values})
        this.props.onselect(values)
        }
    }
    render(){
        const { data } = this.state
        if(!data)
            return null
        let stayeddata=[]
        if(this.props.code == "grpactive") {
            stayeddata.push({
                "key"   :"syatat-1",
                "text"  :"Please Select Work Place",
                "value" :"-1",
                
            }) 
        }else{
            stayeddata.push({
                "key"   :"syatat-1",
                "text"  :"Please Select Stay At",
                "value" :"-1",
                
            })
        }
        data.map(data => {
                stayeddata.push({
                    "key"   :data[Object.keys(data)[0]],
                    "text"  :data[Object.keys(data)[1]],
                    "value" :data[Object.keys(data)[0]],
                    
                })
            })
           // console.log('manjula',this.state.value)

           

        return(

            
            <div className="singledropdown dcrStay">
                <Dropdown   value ={this.state.value==''?'-1': this.state.value }    onChange={this.funstayat}  className={this.state.value == -1 || this.state.value == '' ? "customized-input cal-scrollbar custmPlaceholder": "customized-input cal-scrollbar "} fluid selection options={stayeddata} />
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

// const mapStateToProps = (state) => ({
//     data:state.DCRSEARCH.stayedAt
// })

// const mapDispatchToProps = (dispatch) => ({
//     getStayedData:(data) => dispatch(getStayedData(data))
// })
//connect(mapStateToProps,mapDispatchToProps)

export default (StayAtComp);