
import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-bootstrap'
import { Dropdown } from 'semantic-ui-react'
import { postToServer } from '../../lib/comm-utils'
import { connect } from 'react-redux';
class Dropdown1 extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
           
           SelectedVal:'Select',
           isload:false,
           Edit:{},
           
           
        };
        
        if (this.props.mandatory=="1" || this.props.mandatory=="true"){
            this.state.isload=true  
        }else {
            this.state.isload=false  
        }
         this.DropdownChange=this.DropdownChange.bind(this)
}

    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log("cccccccccc",nextProps.header, nextProps.Edit)
        //  if(prevState.header !== nextProps.header)
        //      return {...prevState, header:nextProps.header}
         if(prevState.Edit !== nextProps.Edit){
             return {...prevState, Edit:nextProps.Edit}
         }
         return null
     }

      DropdownChange(event,value){

      //  console.log(event.target.text,event.target.value,value.value,value.text,event.target)
      this.setState({Editkey:'2'})
        this.setState({SelectedVal:event.target.text})
         this.props.update(this.props.id, this.props.Priority, this.props.child, value.value, this.props.displayname)
      }

      componentDidUpdate(oldprops,newsatte){
       //Dropdownval
          if(oldprops.Dropdownval!=this.props.Dropdownval){
              this.setState({Dropdownval:'2'})
              this.setState({ Editkey: '1' })
          }
      }

    render(){
        const{Edit}=this.state
        //alert(this.props.Dropdownval)
       // if(Edit==null)
        //{

    //   return(
    //       <div>
    //           <Form.Label className="customized-label">{this.props.displayname} { this.props.Mandatory=="true"? <span className="colorRed"> *</span> :'' }  </Form.Label>  
    //           <Dropdown
           
    //             //   placeholder={ Edit ? Edit[[this.props.displayname]] : 'Select'}
    //               key={this.props.key}
    //               onChange={this.DropdownChange}
    //               search  fluid selection options={ this.props.dataotipn}
    //               text={Edit ?  this.state.SelectedVal=='Select'? Edit[[this.props.displayname]] : this.state.SelectedVal : this.state.SelectedVal}
    //          />
    //       </div>
    //   )

    if (this.state.Editkey == "1") {
       
           
        return (
            <div>
                <Form.Label className="customized-label">{this.props.displayname} {this.props.Mandatory == "true" ? <span className="colorRed"> *</span> : ''}  </Form.Label>
                <Dropdown
                    key={this.props.key}
                    onChange={this.DropdownChange}
                    search fluid selection options={this.props.dataotipn}
                    text={'Select' }
                />
            </div>
        )

    }



    else {
        return (
            <div>
                <Form.Label className="customized-label">{this.props.displayname} {this.props.Mandatory == "true" ? <span className="colorRed"> *</span> : ''}  </Form.Label>
                <Dropdown
                    key={this.props.key}
                    onChange={this.DropdownChange}
                    search fluid selection options={this.props.dataotipn}
                    text={Edit ? this.state.SelectedVal == 'Select' ? Edit[[this.props.displayname]] : this.state.SelectedVal : this.state.SelectedVal}
                />
            </div>
        )
    

}
 

    }
}


const mapStateToProps = state => ({
    //data: state.MASTERList.data,
  //  header: state.MASTERList.header,
    Edit: state.MASTERList.Edit,
   //Dropdownval:state.MASTERList.Dropdownval
    
} )

const mapDispatchToProps = dispatch => ({
    getMASTERLEdit: (data) => dispatch(getMASTERLEdit(data))
})
export default connect(mapStateToProps,mapDispatchToProps)(Dropdown1);