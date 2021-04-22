import React, { Component } from 'react';
import { Dropdown , Form,Button} from 'react-bootstrap'
import OtherExcheck from './otherexcheckbox'
import OtherexAmount from './otherexammount'
// import OtherExSearchInput from './otherexsearchinpt'
import SearchInput from '../../../dcr/components/SearchInput'
class OtherExpensesdropdown extends Component{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            selectedData:{},
            totalAmt:{},
            amtVal:0,
            amt:'',
            proId:{},
            totalSum:0,
            SaveProducts:{}
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.getData = this.getData.bind(this)
        this.getAmount = this.getAmount.bind(this)
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    componentDidMount(){ 
       
    }
    getData(id, name, checked,item,data){  
        let totalAmt = {}
        let amt
        let proId ={}
        
        let {selectedData} = this.state;
        let {SaveProducts} = this.state
        totalAmt = this.state.totalAmt
        var d =   id.split("$")
        proId = this.state.proId;
        if(checked){
            
            selectedData[id] = name
            totalAmt[name] = data
            amt = data
           
            proId[d[0]] = data
            SaveProducts[d[0]] = data

        }else if(selectedData[id] == name){
             selectedData[id] = false
            //delete selectedData[id]
            totalAmt[name] = data
            amt = data
          //  var d =   id.split("$")
            proId[d[0]] = data
            SaveProducts[d[0]] = data
            
        }else{
            delete selectedData[id]
            
        
        }
        var sum = 0
        Object.keys(totalAmt).map((item) =>{
            if(parseInt(totalAmt[item])){
                sum = parseInt(sum) + parseInt(totalAmt[item])
            }
        })
       
        // const totalSum = parseInt(this.props.totalAmount) + parseInt(sum)
        const totalSum =  parseInt(sum)
        
        this.setState({
           selectedData:selectedData, 
           amtVal:sum,
           totalAmt:totalAmt,
           amt:amt,
           proId:proId,
           totalSum:totalSum,
           SaveProducts:SaveProducts
        })
        this.props.getExpenseData(SaveProducts)
    }

    getAmount(data){
        this.setState({
            amount:data
        })
    }
    removeItem(id,name,data){
        let { selectedData, totalAmt, SaveProducts} = this.state
        let sum = 0
        let proId ={}
        delete selectedData[id]
        delete totalAmt[name] 
        var d =   id.split("$")
        proId[d[0]] = data
        delete SaveProducts[d[0]]
        Object.keys(totalAmt).map((item) =>{
            if(parseInt(totalAmt[item])){
                sum = parseInt(sum) + parseInt(totalAmt[item])
            }
        })

        this.setState({
            selectedData:selectedData,
            totalAmt:totalAmt,
            totalSum:sum
            
        })
        //console.log("aa",totalAmt)
        this.props.getExpenseData(SaveProducts)
       
    }
    componentDidUpdate(oldprops, oldstate){
      
        if(oldprops.selectedData != this.props.selectedData)
        {
            this.setState({
                selectedData:this.props.selectedData
            })
        }
        if(oldprops.totalAmt != this.props.totalAmt){
            this.setState({
                totalAmt:this.props.totalAmt
            })
        }
        if(oldprops.SaveProducts != this.props.SaveProducts){
            this.setState({
                SaveProducts:this.props.SaveProducts
            })
        }
       
    }

    render(){
        if(!this.props.expenseList){
            return null
        }
    let { selectedData} = this.state
       
  
          
        const items = this.props.expenseList.reduce((prev, item, index) => { 
            //let a ={}
            
              const id =  item.Code+"$"+item.Name+"$"+this.props.sfcno;
            
            const selection =  selectedData[id] ? selectedData[id] : false
           // console.log("id",selectedData)
           // console.log("selction",selection)
          
                prev.push(
                    <OtherExcheck
                        key={index}
                        getData={this.getData.bind(this)}
                        selection={selection}
                        id={id}
                        item={item}
                        getAmount={this.getAmount}
                    />
                )
            return prev
        }, [])
        
        const selections = Object.keys(selectedData).reduce((p, n, i) => { 
        //console.log("am",this.state.totalAmt)
            if (typeof(selectedData[n]) === "string") { 
                const name = n.split('$')[1];
                    Object.keys(this.state.totalAmt).map((item) =>{ 
                        if(item == name){
                //console.log("val",this.state.totalAmt[item])
                            p.push(
                                <div key={n} className="selectedDropdown"> <span>{name}</span><span>-</span><span>{this.state.totalAmt[item]}</span>
                                    <img src="../public/assets/images/cancel.png" className="closeImg"
                                        onClick={this.removeItem.bind(this, n,name,this.state.totalAmt[item])}/>
                                </div>
                            )
                        }
                    })
            }
            return p
        }, [])
        
    
        return(
            <React.Fragment>
            <div className="productDetailDrop sfcjoint ">
                <Dropdown className="multiple-dropdown marginBot10">
                    <Dropdown.Toggle id="dropdown-basic" className=""   >
                        <SearchInput  compVal="expense" data={this.props.data} update={this.update} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <div className="pl20 paddingTop jointData cal-scrollbar">
                        <div className="otherExHeading">OTHER EXPENSES</div>
                            <Form className="">
                              {/* <OtherExcheck/> */}
                              {items}
                              {/* <OtherexAmount/> */}
                             
                            </Form>
                            {/* <div>TOTAL AMOUNT:{'\u20B9'}1,500</div> */}
                        </div>
                        <div className="sfcTotalEx">Total Amount :{this.state.totalSum ? this.state.totalSum:this.props.totalAmount}</div>
                        <Dropdown.Item eventKey="1">
                            <button  className="doneBtn" >Save</button>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            
            <div className="selectedDiv cal-scrollbar">
                    {selections}
                </div>
                
            
        </React.Fragment>
        )
    }
}

export default OtherExpensesdropdown