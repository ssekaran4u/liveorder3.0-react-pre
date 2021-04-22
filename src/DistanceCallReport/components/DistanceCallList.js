import React,{Component} from 'react'
import DistanceCallTable from './DistanceCallTable'
import {postToServer} from '../../lib/comm-utils'
import Loder from  '../../lib/Loader'
import { parse } from 'date-fns'

class DistanceCallList extends Component{
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
        
        

         
    }

    RegionDropdown(){
    }

    componentDidUpdate(){
    }

    applyFilterAll(){         
        
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
			"Division" :"Anandsingh Y Thakur",
            "Region" :"Baroda",
            "FsName" :"J12334",
            "FS HQ" :"LEV222",
            "Emp Code" :"100",
            "FS Code" :"30",
            "Product Code" :"70",
            "Product Name" :"4",
        })

        test12.push({	
            "Division" :"Ajay Singh",
            "Region" :"Pune",
            "FsName" :"J11133",
            "FS HQ" :"LEV111",
            "Emp Code" :"50",
            "FS Code" :"5",
            "Product Code" :"45",
            "Product Name" :"3",
        })

        
        this.setState({ loader:false })
              this.setState({ Result1: test12 })

    }

    componentDidMount(){
        this.setState({header:[
            { prop: 'Division', title: 'FS Name', filterable: true,sortable:true },
            { prop: 'Region', title: 'FS Region', filterable: true,sortable:true },
            { prop: 'FsName', title: 'EMP Code', filterable: true },
            { prop: 'FS HQ', title: 'FS Code', filterable: true,sortable:true },
            { prop: 'Emp Code', title: 'No of Chemist Connected', filterable: true,sortable:true },
            { prop: 'FS Code', title: 'POB', filterable: true,sortable:true },
            { prop: 'Product Code', title: 'RCPA', filterable: true },
            { prop: 'Product Name', title: 'No of Stockist Connected', filterable: true,sortable:true },
        ]});
    }
    





    render(){
       
        let {Result1}=this.state
        
        const header = [
            { prop: 'Division', title: 'FS Name', filterable: true,sortable:true },
            { prop: 'Region', title: 'FS Region', filterable: true,sortable:true },
            { prop: 'FsName', title: 'EMP Code', filterable: true },
            { prop: 'FS HQ', title: 'FS Code', filterable: true,sortable:true },
            { prop: 'Emp Code', title: 'No of Chemist Connected', filterable: true,sortable:true },
            { prop: 'FS Code', title: 'POB', filterable: true,sortable:true },
            { prop: 'Product Code', title: 'RCPA', filterable: true },
            { prop: 'Product Name', title: 'No of Stockist Connected', filterable: true,sortable:true },
                                        
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
                 <DistanceCallTable
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

export default DistanceCallList