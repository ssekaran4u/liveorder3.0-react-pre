

import React, {Component} from 'react';
import {Form} from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { getStayedData } from '../../actions/DCRSearch'
import { postToServer } from '../../lib/comm-utils'
import StatusPopup from '../../lib/StatusPopup'

class SubArea extends Component{
    constructor(props){
        super(props)
        this.state={
            data:[],
            Errormsg: '',
            Error: false,
            defaultValue:'Please Select Place of work'
            
        }
       // this.getStayed = this.getStayed.bind(this)
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


 componentDidUpdate(oldprop,oldsta){
     if(oldprop.subareaupdate!=this.props.subareaupdate){
         const l =this.props.subareaupdate
        this.setState({
            defaultValue:l
        })
     }
 }
    
    
    
    

    funstayat(event,value){
        const values=value.value
        const areaname  = value.value.text   
        this.setState({
            defaultValue:areaname
        })
        this.props.getarea(values)
    }
    render(){ 
      //  const { data } = this.props
      let stayeddata=[] 
        if(this.props.subarea){
         
           // stayeddata.push({
            //     "key"   :'Please Select Place of work',
            //     "text"  :'Please Select Place of work',
            //     "value" :'-1',
                
            // })
        this.props.subarea.map(data => {
                stayeddata.push({
                    "key"   :data[Object.keys(data)[0]],
                    "text"  :data[Object.keys(data)[0]],
                    "value" :data[Object.keys(data)[1]],
                    
                })
            })
        }else{
            stayeddata:[]
        }
           
        return(
            <React.Fragment>
            <Form.Label className="customized-label">SubArea <span className="colorRed">*</span></Form.Label>
            <div className="singledropdown dcrStay">
                <Dropdown   text={this.state.defaultValue} onChange={this.funstayat} placeholder='Select' className="customized-input cal-scrollbar" fluid selection options={stayeddata} />
                <StatusPopup
                message={this.state.Errormsg}
                show={this.state.Error}
                onClose={this.Errorclose}
                success={false}
            />
            
                </div>
                </React.Fragment>
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

export default (SubArea);