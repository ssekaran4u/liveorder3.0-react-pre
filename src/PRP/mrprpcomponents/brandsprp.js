import React, { Component } from 'react'
// import SearchDropdown from '../../dcr/components/SearchDropdown'
import { Form, Dropdown, Row, Col, InputGroup, Button } from 'react-bootstrap'
import SubAreaCheckbox from "../../campaign_request/components/SubAreaCheckbox"
import { postToServer } from '../../lib/comm-utils'
import { URL_PRP } from '../../lib/constants'
import SubareDoctocheckbox from "./subaredoctorcheckbox"
import Loader from '../../lib/Loader'

class BrandsPrp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      brandsfilterdata: [],
      brandsselectedata: {},
      brandselecetd: [],
      brandsselectedataerr: "",
      // showLoader : true
    }
    this.getBrandsdata = this.getBrandsdata.bind(this)
  }

  componentDidMount() {
    // this.setState({showLoader : true})
    if (this.props.srnum.trim() != '') {
      var edit = {
        "Index": "RequestSrnoClick", "Data": { "srno": this.props.srnum },
      }
      let brandselectedd = []
      postToServer(URL_PRP, edit).then((response) => {
        // console.log(response.data, "edit")
        if (response.status == 200 && response.statusText == "OK") {
          response.data.Brands.map(ele => {
            //  console.log(response.data,"data")
            brandselectedd.push({
              key: ele.C_Code,
              text: ele.c_name,
              value: ele.c_name.toLowerCase()
            })
            this.setState({showLoader: false})
          })
          //  console.log(brandselectedd,"brandselectedd")

          brandselectedd.map(item => {
            const id = item.key + "$" + item.text + "$" + item.value;
            this.getBrandsdata(id, item.value, true, item)
          })
        }

      }).catch((Error) => {
        this.setState({ Error: true, Errormsg: "Error in edit" })
      })
    }
  }


  static getDerivedStateFromProps(nextProps, state) {
    // console.log(nextProps, "nextProps xdg")
    if (nextProps) {
      return {
        brands: nextProps,
      }
    }
  }

  getBrandsdata(id, name, checked, item) {
    let selectedBbrand = {}
    selectedBbrand = this.state.brandselecetd
    let { brandsselectedata } = this.state
    // console.log(id, name, checked, item, "sususususuu")

    if (checked) {
      brandsselectedata[id] = item.key
      selectedBbrand[item.key] = item.value
    } else if (brandsselectedata[id] == item.key) {
      brandsselectedata[id] = false
      delete selectedBbrand[item.key]
    } else {
      delete brandsselectedata[id]
    }
    // console.log("hhhhhhhhhhh", brandsselectedata)

    this.setState({
      brandsselectedata: brandsselectedata,
      brandselecetd: selectedBbrand
    })
    this.props.onBrands(brandsselectedata)
  }

  removeSelectedItem(id) {
    const { brandsselectedata } = this.state;

    delete brandsselectedata[id];

    this.setState({
      brandsselectedata: brandsselectedata
    })
    this.props.onBrands(brandsselectedata)
    //   console.log(brandsselectedata,"brandsselectedata")
  }



  render() {
    //  console.log(this.props.brands,"brands")
    //  console.log(this.state.brands.brands,"bbbbrrr")
    // console.log(this.props.onBrands,"onBrands")

    let brandsdropdown = []

    if (this.state.brands.brands.length > 0) {
      this.state.brands.brands.map((item) => {
        brandsdropdown.push({
          "key": item.c_code,
          "text": item.c_name,
          "value": item.c_name.toLowerCase()
        })
      })
    }

    const { brandsfilterdata, brandsselectedata } = this.state
    const doctorlist = brandsdropdown.reduce((prev, item, index) => {

      const id = item.key + "$" + item.text + "$" + item.value;
      // console.log(id, "idd")
      const selection = brandsselectedata[id] ? brandsselectedata[id] : false

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
    const doctorselections = Object.keys(brandsselectedata).reduce((p, n, i) => {
      if (typeof (brandsselectedata[n]) === "string") {
        const name = n.split('$')[0];
        const desg = n.split('$')[1]
        p.push(
          <div>
            <div key={n} className="subareaselectedDropdown"><div>{desg} </div>
              <img src="../../public/assets/images/cancel.svg" className="closeImg"
                onClick={this.removeSelectedItem.bind(this, n)}
              />
            </div>
          </div>
        )
      }
      return p
    }, [])

    // console.log(brandsdropdown,"brandsdropdown")

    // let Araytype = []
    // Araytype.push(
    //     {
    //         "key": '-1',
    //         "text": 'Search & Select',
    //         "value": '-1',
    //     },
    //     {
    //         "key": '100',
    //         "text": 'ABC',
    //         "value": '100',
    //     },
    //     {
    //         "key": '101',
    //         "text": 'DEF',
    //         "value": '101',
    //     },
    //     {
    //         "key": '102',
    //         "text": 'HIJ',
    //         "value": '102',
    //     }
    // )




    return (
      <div className="pullleft KamClaimTablesfc newentryprp ">
        <div>
          <div className="prptype-req">
            Brands For PRP
           					</div>
        </div>
        <div className="alldropsfclocation brands-drop-prp">
          <div className="locationsfa">
            <div className="user-heirarchy-field-containers brandssprp">
              <div className="productDetailDrop">
                <div className="sfa-search-dropdown .search-dropdown-label subareaLable">Brands<span className="colorRed">*</span></div>
                <Dropdown className="multiple-dropdown marginBot10">
                  <Dropdown.Toggle id="dropdown-basic">
                    <div className="dcrInput">
                      <input className="prp-subarea-text" placeholder="Select Brand" />
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div className="Padding10 paddingTop jointData cal-scrollbar">

                      <div className="mt-30">
                        {doctorlist}
                      </div>
                    </div>

                  </Dropdown.Menu>

                </Dropdown>
              </div>
              {/* <div className="daterror-msg"> {this.props.brandsselectedataerr} </div> */}
              <div className="selectedDiv">
                {doctorselections}
              </div>
            </div>
          </div>
          <Loader show={this.state.showLoader} />

          {/* <div className="selectedDropdown brandleftmargin">item
                      <img src="../public/assets/images/cancel.png" className="closeImg" />
                    </div>
                    <div className="selectedDropdown brandleftmargin">item
                      <img src="../public/assets/images/cancel.png" className="closeImg" />
                    </div> */}
        </div>



        {/* <Col xl={8} lg={8} md={8} sm={12} xs={12} className=" ">
                                <Form.Label className="customized-label">Brands <span className="colorRed">*</span></Form.Label>
                     <div className="productDetailDrop">
                                <Dropdown className="multiple-dropdown marginBot10">
                                    
                                    <Dropdown.Toggle id="dropdown-basic">
                                        <img src="../public/assets/images/search_grey@2x.png" className="serachImg" />
                                    </Dropdown.Toggle>
                                    
                                        <Dropdown.Menu className="cal-scrollbar">
                                            <div className="Padding10 paddingTop searchData cal-scrollbar">
                                                    <Form>
                                                        <div>
                                                                    <div>
                                                                        <div   className='searchDiv'>xfbhdfg </div>
                                                                        
                                                                            <div>
                                                                                <SearchDropdown
                                                                                    data="hjfgj"
                                                                                    key="1"
                                                                                    id={"SearchDropdown"}
                                                                                    // getData={this.getData.bind(this)}
                                                                                    selection="sds"
                                                                                    id="1"
                                                                                    item="hukhi"
                                                                                    type={"1"}
                                                                                />   </div>
                                                                    </div>
                                                        </div>
                                                    </Form> 
                                            </div>
                                            <Dropdown.Item  >
                                                <button   className="serachDoneBtn">DONE</button>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                </Dropdown>
                                </div>
                                <div className="selectedDiv">
                                   {selections}
                                </div>
                                </Col> */}
      </div>
    )
  }
}
export default BrandsPrp;