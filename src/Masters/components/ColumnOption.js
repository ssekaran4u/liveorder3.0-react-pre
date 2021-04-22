import React, {Component} from 'react'
import {Form} from 'react-bootstrap'

import { connect } from 'react-redux';
import { getMASTER_FILTER } from '../../actions/master'

import Cust_Check from './Col_Option_checkbox'
const  columnlist ={}
class ColumnOption extends Component{



    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.data !== nextProps.data)
            return {...prevState, data:nextProps.data}
        if(prevState.header !== nextProps.header) 
            return {...prevState, header:nextProps.header}
        if(prevState.Edit !== nextProps.Edit)
            return {...prevState, Edit:nextProps.Edit}
        return null
    }




/*

 this   will update  data what to be display in list like column filter
*/
    Updatecollist(name,status){
        //Filter
        columnlist[name]=status
        this.props.getMASTER_FILTER(null)
        this.props.getMASTER_FILTER(columnlist)
         //console.log('jack hit',columnlist)
    }


    

    constructor(props){
        super(props)
        this.state = {
            data: []
           
        }

        this.Updatecollist = this.Updatecollist.bind(this);
    }



    render(){
        const { data } = this.state
        return(
            <div>
                <h5 className="drop-head">Columns to be shown</h5>
                <Form>

                     { 
                         Object.keys(data[0]).map((a)=>     
                        <Cust_Check   updatehit={this.Updatecollist} key={a} name={a} />
                    )  }

                      
                </Form>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    data: state.MASTERList.data,
    header: state.MASTERList.header,
    Edit :state.MASTERList.Edit,
    toggleHeader: state.DCRList.toggleHeader
} )

const mapDispatchToProps = dispatch => ({
    getMASTER_FILTER: (data) => dispatch(getMASTER_FILTER(data))
})



export default connect(mapStateToProps, mapDispatchToProps)(ColumnOption)