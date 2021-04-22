import React, { Component } from "react";
import Master from "./mastercontrols";
import List from "./DCRLIst";
import { connect } from "react-redux";
import { getMASTERLEdit } from "../../actions/master";
// import { getMASTER_FILTER } from '../../actions/master'
import Footer from "../../landing-page/components/Footer";

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listsate: false,
            edit_data: [],
            Edit: [],
            Editkey: true,
            Seturlid: '',
            tablename: ''
            //addkey:'0'
            //listsatenew:this.props.list_satenew

            
        };

        this.onChangelist = this.onChangelist.bind(this);
        this.clickrow = this.clickrow.bind(this);
        this.tablenamecall = this.tablenamecall.bind(this);
        this.convertExcel = this.convertExcel.bind(this);
    }

    tablenamecall(name) {
        //alert(name)

        this.setState({ tablename: name });
    }

    convertExcel(data) {

         
  
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.header !== nextProps.header)
            return { ...prevState, header: nextProps.header };
        if (prevState.Edit !== nextProps.Edit) {
            return { ...prevState, Edit: nextProps.Edit };
        }
        return null;
    }

    componentDidMount() {
     this.props.getMASTERLEdit(null)
    }

    componentDidUpdate(prevProps, prevState) {
        //this.props.match.params.id
        
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({ listsate: false });
        }
    }

    onChangelist() {
    
      
        const _this = this
        _this.props.getMASTERLEdit(null)
  
        if (_this.state.listsate) {
            _this.setState({ listsate: false });
        }
        else {

            _this.setState({ listsate: true});          
    
        }
    }

    clickrow(data) {
        //console.log(data,"hi am came")

        this.props.getMASTERLEdit(data)
        const _this = this
        if (_this.state.listsate) {


            _this.setState({ listsate: false });
        }
        else {
            //this.setState({ addkey:'1'});
            _this.setState({ listsate: true });
            //alert(this.state.addkey);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
        //this.props.match.params.id
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({ listsate: false });
        }
    }

    render() {
       
        
        return (
            <div className="content-spacing">
                
                <List tblname={this.state.tablename} urlid={this.props.match.params.id} clickrow={this.clickrow} headkey={this.state.listsate}/>
                <Master loadchange={this.onChangelist} tablenamecallkey={this.tablenamecall} urlid={this.props.match.params.id} edit_data={this.edit_data} headkey={this.state.listsate}/>
                <div className="add-new-dcr">
                    {this.state.listsate ?
                        <img onClick={this.onChangelist} src="../public/assets/images/left-arrow.svg" className="p3" alt="add_icon" />
                        : <img onClick={this.onChangelist} src="../public/assets/images/add-icon.svg" alt="add_icon" />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    data: state.MASTERList.data,
    header: state.MASTERList.header,
    Edit: state.MASTERList.Edit,
    //listsatenew: state.MASTERList.listsatenew
})

const mapDispatchToProps = dispatch => ({
    getMASTERLEdit: data => dispatch(getMASTERLEdit(data)),
    getMASTER_FILTER: data => dispatch(getMASTER_FILTER(null))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(index);
