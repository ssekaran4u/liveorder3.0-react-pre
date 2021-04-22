/*
* This code will display placeofwork component inside otherworktypedwr
* Request URL=url/DWRSave
* Index=GetPlaceOfWork_DCRMCR
* Request string={"Token":"","save":"GetPlaceOfWork_DCRMCR","date_report":"18/12/2018"}
* Request Error={}

*/





import React, {Component} from 'react';
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
// import { getStayedData } from '../../actions/DCRSearch'
import { postToServer } from '../../lib/comm-utils'

class Placeofwork extends Component{
    constructor(props){
        super(props)
        this.state={
            Selectedvalue:'',
            defaultValue:'-1'
            
        }
        this.funcgetplace = this.funcgetplace.bind(this)
        this.funPlaceofwork=this.funPlaceofwork.bind(this)
    }
    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (prevState.data !== nextProps.data) 
    //        // console.log("data=",nextProps.data)
    //         return {...prevState, data:nextProps.data}
        
    //     return null
    // }
    componentDidMount(){
        this.funcgetplace()
    }
    componentDidUpdate(oldprops,oldsatate)
    {
       if(oldprops.clearAll!=this.props.clearAll)
       {
        this.setState({defaultValue:'-1'})
       }

       if(oldprops.Work!=this.props.Work){
         
           const c=this.props.Work
        this.setState({defaultValue:c})
        this.props.onselect(c,this.state.flag)
       }
    }
    funcgetplace(){
        var day=this.props.date.getDate() 
        var year= this.props.date.getFullYear()
        var month= this.props.date.getMonth()+1

       const  date=day+"/"+month+"/"+year

        var data={
        "save":"GetPlaceOfWork_DCRMCR",
        "date_report":date
        }
        

        postToServer("DWRSave",data).then( (Result)=>{
            this.setState({ data: Result.data["place"], "flag":Result.data["flag"][0]["n_stayflg"] })
//this.setState({ data: Result.data })
        })
        //this.props.getStayedData(data)
    }

    funPlaceofwork(event,value){
         const values=value.value
         const compTopictext  = value.value.text   
         this.setState({ defaultValue:values,    Selectedvalue: values})
         //this.props.onselect(values)
         this.props.onselect(values,this.state.flag)
    }
    
    render(){
        const { data } = this.state
        if(!data)
            return null
        let stayeddata=[] 
        stayeddata.push({
            "key"   :"Selectplacework-1",
            "text"  :"Please Select place Of Work",
            "value" :"-1"
        })
        data.map(data => {

          
                stayeddata.push({
                    "key"   :data[Object.keys(data)[0]],
                    "text"  :data[Object.keys(data)[1]],
                    "value" :data[Object.keys(data)[0]],
                    
                })
            })
           
        return(
            <div className="singledropdown dcrStay">
                <Dropdown  value={this.state.defaultValue}  onChange={this.funPlaceofwork}  className={this.state.defaultValue == -1 ? "customized-input cal-scrollbar custmPlaceholder": "customized-input cal-scrollbar "} fluid selection options={stayeddata} />
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

export default (Placeofwork);