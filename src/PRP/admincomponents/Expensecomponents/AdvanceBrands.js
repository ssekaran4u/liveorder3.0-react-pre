import React, { Component } from 'react'
import { Form, Dropdown, Row, Col, InputGroup, Button } from 'react-bootstrap'
import SubareDoctocheckbox from "../../mrprpcomponents/subaredoctorcheckbox"
import { postToServer } from '../../../lib/comm-utils'
import { URL_PRP } from '../../../lib/constants'
// import Loader from '../../../lib/Loader'
class ExpenseBrandetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            brands:[],
            brandsfilterdata:[],
            brandsselectedataerr:"",
        }
    this.getBrandsdata = this.getBrandsdata.bind(this)

    }
    componentDidMount() {
          var edit = {
            "Index": "MRExpenseSrnoClick", "Data": {"srno": this.props.srnum},
          }
       let brandselectedd = []
       postToServer(URL_PRP, edit).then((response) => {
        if (response.status == 200 && response.statusText == "OK") {
             response.data.SavedBrands.map(ele=>{
               brandselectedd.push({
                   key:ele.BCode,
                   text:ele.Name,
                   value:ele.Name.toLowerCase()
                 })
             })   
         brandselectedd.map(item=>{
          const id =  item.key+"$"+item.text+"$"+item.value;
          this.getBrandsdata(id,item.value,true,item, brandselectedd)
      })     
         }
         }).catch((Error) => {
             this.setState({ Error: true, Errormsg: "Error in edit" })
         })
    }
    getBrandsdata(id, name, checked, item, brandselectedd) {
      this.props.getBrandsdataAd(id, name, checked, item, brandselectedd)
      }
      removeSelectedItem(id){
        this.props.removeSelectedBrand(id)
    }
    render() {
        let brandsdropdown = []
        if (this.props.Brands.length > 0) {
          this.props.Brands.map((item) => {
            brandsdropdown.push({
              "key": item.c_code,
              "text": item.c_name,
              "value": item.c_name.toLowerCase()
            })
          })
        }
        const doctorlist = brandsdropdown.reduce((prev, item, index) => {    
          const id = item.key + "$" + item.text + "$" + item.value;
          const selection = this.props.brandsselectedata[id] ? this.props.brandsselectedata[id] : false   
          prev.push(
            <SubareDoctocheckbox
              key={index}
              selection={selection}
              getsubarea={this.getBrandsdata.bind(this)}
              id={id}
              item={item}
            />
          )
          return prev
        }, [])
        const doctorselections = Object.keys(this.props.brandsselectedata).reduce((p, n, i) => {
          if (typeof (this.props.brandsselectedata[n]) === "string") {
            const name = n.split('$')[0];
            const desg = n.split('$')[1]
            p.push(
              <div>
                <div key={n} className="subareaselectedDropdown"><div>{desg} </div>
                {this.props.RequestCancel == true ? <div></div>:
              <img src="../../public/assets/images/cancel.svg" className="closeImg"
                onClick={this.removeSelectedItem.bind(this, n)}
              />}
                </div>
              </div>
            )
          }
          return p
        }, [])
        return (
          <div className="pullleft KamClaimTablesfc">
            <div className="prptype-req"> Brands For PRP </div>
              <div className="alldropsfclocation brands-drop-prp">
                <div className="locationsfa">
                  <div className="user-heirarchy-field-containers brandssprp">
                    <div className="productDetailDrop">
                    <div className="sfa-search-dropdown .search-dropdown-label subareaLable">Brands<span className="colorRed">*</span>
                    <div className="daterror-msg"> {this.props.brandsselectedataerr} </div>
                    </div>
                    <Dropdown className="multiple-dropdown marginBot10">
                    <Dropdown.Toggle id="dropdown-basic">
                      <div className="dcrInput">
                        <input className="prp-subarea-text" placeholder="Select Brand" disabled={this.props.RequestCancel}/>
                      </div>
                    </Dropdown.Toggle>
                    {this.props.RequestCancel == true ? <div></div>:
                  <Dropdown.Menu>
                    <div className="Padding10 paddingTop jointData cal-scrollbar">
                      <div className="mt-30">
                        {doctorlist}
                      </div>
                    </div>
                  </Dropdown.Menu>}
                  </Dropdown>
                </div>
                <div className="selectedDiv">
                  {doctorselections}
                </div>
                </div>
              </div>                    
            </div>
          </div>
        )
    }
}
export default ExpenseBrandetail