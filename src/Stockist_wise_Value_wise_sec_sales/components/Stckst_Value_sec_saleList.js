import React,{Component} from 'react'
import Stckst_Value_sec_saleTable from './Stckst_Value_sec_saleTable'
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'
import { parse } from 'date-fns'

class Stckst_Value_sec_saleList extends Component{
    constructor(props){
        super(props)
        this.state={
            selecteddiv:'',
            selectedreg:'',
            seldiv:'',
            selreg:'All',
            setarea:'All',
            seldesign:'',
            seldate:'0',
            selyr:'',
            Result1:[],
            divisioncode:'',
            loader:false,
        }

        this.DivisionDropdown= this.SelectedDivision.bind(this)
        this.RegionDropdown= this.RegionDropdown.bind(this)
        this.applyFilterAll=this.applyFilterAll.bind(this)
    }


    SelectedDivision(state){
       
        //console.log(state, "name")
       // console.log(state.name, "nameeeeeee")
        if(state.name=="Division")
        {
            
            this.setState({seldiv:state.rvalue})
            
        }
        else if(state.name=="Region")
        {
            
            this.setState({selreg:state.rvalue})
        }
        else if(state.name=="Designation")
        {
           
            this.setState({seldesign:state.rvalue})
        }
        else if(state.name=="Area")
        {
            
            this.setState({setarea:state.rvalue})
        }
        else if(state.name=="Month")
        {
            
            this.setState({seldate:state.rvalue})
        }
        else if(state.name=="Year")
        {
            
            this.setState({selyr:state.rvalue})
        }
        

         
    }

    RegionDropdown(){
        // alert({selectedreg:state})
        // alert('region block')
    }

    componentDidUpdate(){
        // alert(this.props.DivisionDropdown);
    }

    applyFilterAll(){

    //     if(this.state.seldate=="0")
    //     {
    //     this.setState({header:[
    //         { prop: 'Division', title: 'Division', filterable: true,sortable:true },
    //         { prop: 'FS Name', title: 'FS Name', filterable: true,sortable:true },
    //         { prop: 'FS Region', title: 'FS Region', filterable: true },
    //         { prop: 'FS HQ', title: 'FS HQ', filterable: true,sortable:true },
    //         { prop: 'Employee Code', title: 'Employee', filterable: true,sortable:true },
    //         { prop: 'FS Code', title: 'FS Code', filterable: true,sortable:true },
    //         { prop: 'Code', title: 'Code', filterable: true },
    //         { prop: 'Stockist Name', title: 'Stockist Name', filterable: true,sortable:true },
    //         { prop: 'Apr', title: 'Apr', filterable: true,sortable:true },
    //         { prop: 'May', title: 'May', filterable: true,sortable:true },
    //         { prop: 'June', title: 'June', filterable: true,sortable:true },
    //         { prop: 'Jul', title: 'Jul', filterable: true },
    //         { prop: 'Aug', title: 'Aug', filterable: true,sortable:true },
    //         { prop: 'Sep', title: 'Sep', filterable: true,sortable:true },
    //         { prop: 'Oct', title: 'Oct', filterable: true },
    //         { prop: 'Nov', title: 'Nov', filterable: true,sortable:true },
    //         { prop: 'Dec', title: 'Dec', filterable: true,sortable:true },
    //         { prop: 'Jan', title: 'Jan', filterable: true,sortable:true },
    //         { prop: 'Feb', title: 'Feb', filterable: true,sortable:true },
    //         { prop: 'Mar', title: 'Mar', filterable: true,sortable:true },
    //     ]});
    // }
    // else{

    //     this.setState({header:[
    //         { prop: 'Division', title: 'Division', filterable: true,sortable:true },
    //         { prop: 'FS Name', title: 'FS Name', filterable: true,sortable:true },
    //         { prop: 'FS Region', title: 'FS Region', filterable: true },
    //         { prop: 'FS HQ', title: 'FS HQ', filterable: true,sortable:true },
    //         { prop: 'Employee Code', title: 'Employee', filterable: true,sortable:true },
    //         { prop: 'FS Code', title: 'FS Code', filterable: true,sortable:true },
    //         { prop: 'Code', title: 'Code', filterable: true },
    //         { prop: 'Stockist Name', title: 'Stockist Name', filterable: true,sortable:true },
    //         { prop: 'Jan', title: 'Jan', filterable: true,sortable:true },
    //         { prop: 'Feb', title: 'Feb', filterable: true,sortable:true },
    //         { prop: 'Mar', title: 'Mar', filterable: true,sortable:true },
    //         { prop: 'Apr', title: 'Apr', filterable: true,sortable:true },
    //         { prop: 'May', title: 'May', filterable: true,sortable:true },
    //         { prop: 'June', title: 'June', filterable: true,sortable:true },
    //         { prop: 'Jul', title: 'Jul', filterable: true },
    //         { prop: 'Aug', title: 'Aug', filterable: true,sortable:true },
    //         { prop: 'Sep', title: 'Sep', filterable: true,sortable:true },
    //         { prop: 'Oct', title: 'Oct', filterable: true },
    //         { prop: 'Nov', title: 'Nov', filterable: true,sortable:true },
    //         { prop: 'Dec', title: 'Dec', filterable: true,sortable:true },
           
    //     ]});
    // }
        // this.setState({ loader:true })
        // console.log(this.state.seldiv)
        // console.log(this.state.selreg)
        // console.log(this.state.selrps)
        // console.log(this.state.selbr)
        // console.log(this.state.seldate)
        // console.log(this.state.selyr)
         
         if(this.state.seldate=="")
         {
            alert("Month not Selected ............")
                    return;
        } 
      if(this.state.selyr=="")
        {
             alert("Year not Selected ............")
                     return;
        }       
        this.setState({ loader:true })
        var travelModes={ "index": "BtnView",  data:{"DivisionCode":(this.state.seldiv=="")?this.state.divisioncode:this.state.seldiv,"RegionCode":this.state.selreg,"rpscode":this.state.selrps,"brandcode":this.state.selbr,"monthtype":this.state.seldate,"year":this.state.selyr}  }
      //  var travelModes={ "index": "BtnView",  data:{"DivisionCode":"All","RegionCode":"All","rpscode":"All","brandcode":"All","monthtype":"1","year":"2020"}  }
        let test12=[];
      
      // console.log(travelModes)
        // postToServer("RPSBrandWiseRpt", travelModes).then((Result) => {
        //     console.log(Result);
        //     if (Result.data.Status == 'Success') {   
           
                  

  
        //     }
        //   }).catch(() => {
        //     this.setState({ loader:false })
        //     this.setState({ Error: true, Errormsg: "Error in App At SFC APIiii " })
        //   })
        test12.push({	
			"Division" :"division1",
            "FS Name" :"sojan",
            "FS Region" :"kerala",
            "FS HQ" :"kochi",
            "Employee Code" :"0001",
            "FS Code" :"sojan",
            "Code" :"sojan",
            "Stockist Name" :"arun",
            "Apr" :"11",
            "May" :"22",
            "June" :"33",
            "July" :"44",
            "Aug" :"55",
            "Sep" :"66",
            "Oct" :"77",
            "Nov" :"88",
            "Dec" :"99",
            "Jan" :"12",
            "Feb" :"13",
            "Mar" :"14",
        })

        test12.push({	
			"Division" :"",
            "FS Name" :"",
            "FS Region" :"",
            "FS HQ" :"",
            "Employee Code" :"",
            "FS Code" :"",
            "Code" :"",
            "Stockist Name" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: 'Grand Total'}} /> ,
            "Apr" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '11'}} /> ,
            "May" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '22'}} /> ,
            "June" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '33'}} /> ,
            "July" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '44'}} /> ,
            "Aug" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '55'}} /> ,
            "Sep" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '66'}} /> ,
            "Oct" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '77'}} /> ,
            "Nov" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '88'}} /> ,
            "Dec" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '99'}} /> ,
            "Jan" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '12'}} /> ,
            "Feb" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '13'}} /> ,
            "Mar" :<h5 style={{fontWeight: 'bold'}} dangerouslySetInnerHTML={{__html: '14'}} /> ,
        })
        
        this.setState({ loader:false })
              this.setState({ Result1: test12 })

    }

    componentDidMount(){
        this.setState({header:[
            { prop: 'Division', title: 'Division', filterable: true,sortable:true },
            { prop: 'FS Name', title: 'FS Name', filterable: true,sortable:true },
            { prop: 'FS Region', title: 'FS Region', filterable: true },
            { prop: 'FS HQ', title: 'FS HQ', filterable: true,sortable:true },
            { prop: 'Employee Code', title: 'Employee', filterable: true,sortable:true },
            { prop: 'FS Code', title: 'FS Code', filterable: true,sortable:true },
            { prop: 'Code', title: 'Code', filterable: true },
            { prop: 'Stockist Name', title: 'Stockist Name', filterable: true,sortable:true },
            { prop: 'Apr', title: 'Apr', filterable: true,sortable:true },
            { prop: 'May', title: 'May', filterable: true,sortable:true },
            { prop: 'June', title: 'June', filterable: true,sortable:true },
            { prop: 'Jul', title: 'Jul', filterable: true },
            { prop: 'Aug', title: 'Aug', filterable: true,sortable:true },
            { prop: 'Sep', title: 'Sep', filterable: true,sortable:true },
            { prop: 'Oct', title: 'Oct', filterable: true },
            { prop: 'Nov', title: 'Nov', filterable: true,sortable:true },
            { prop: 'Dec', title: 'Dec', filterable: true,sortable:true },
            { prop: 'Jan', title: 'Jan', filterable: true,sortable:true },
            { prop: 'Feb', title: 'Feb', filterable: true,sortable:true },
            { prop: 'Mar', title: 'Mar', filterable: true,sortable:true },
        ]});
    }
    





    render(){
       
        let {Result1}=this.state
        
        const header = [
            { prop: 'Division', title: 'Division', filterable: true,sortable:true },
            { prop: 'FS Name', title: 'FS Name', filterable: true,sortable:true },
            { prop: 'FS Region', title: 'FS Region', filterable: true },
            { prop: 'FS HQ', title: 'FS HQ', filterable: true,sortable:true },
            { prop: 'Employee Code', title: 'Employee', filterable: true,sortable:true },
            { prop: 'FS Code', title: 'FS Code', filterable: true,sortable:true },
            { prop: 'Code', title: 'Code', filterable: true },
            { prop: 'Stockist Name', title: 'Stockist Name', filterable: true,sortable:true },
           { prop: 'Apr', title: 'Apr', filterable: true,sortable:true },
           { prop: 'May', title: 'May', filterable: true,sortable:true },
           { prop: 'June', title: 'June', filterable: true,sortable:true },
           { prop: 'July', title: 'July', filterable: true },
           { prop: 'Aug', title: 'Aug', filterable: true,sortable:true },
           { prop: 'Sep', title: 'Sep', filterable: true,sortable:true },
           { prop: 'Oct', title: 'Oct', filterable: true },
           { prop: 'Nov', title: 'Nov', filterable: true,sortable:true },
           { prop: 'Dec', title: 'Dec', filterable: true,sortable:true },
           { prop: 'Jan', title: 'Jan', filterable: true,sortable:true },
          { prop: 'Feb', title: 'Feb', filterable: true,sortable:true },
          { prop: 'Mar', title: 'Mar', filterable: true,sortable:true },
                               
       ];
        const customLabels = {
            first: "<<",
            last: ">>",
            prev: "< Prev",
            next: "Next >",
            show: "Show",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            entries: "entries",
            filterPlaceholder: "Search Anything",
            noResults: "There is no data to be displayed"
        };
        return(
            <div>
                <Loder show={this.state.loader}></Loder>
                 <Stckst_Value_sec_saleTable
                 DivisionDropdown={this.DivisionDropdown}
                 RegionDropdown={this.RegionDropdown}

                 selecteddiv={this.state.selecteddiv}
                 selectedreg={this.state.selectedreg}
                    tableHeader={header}
                    open={this.props.open}
                    tableBody={Result1}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200,500,700,1000,1500,2000]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    applyFilter={this.applyFilterAll}
                    
                />
            </div>
        )
    }
}

export default Stckst_Value_sec_saleList