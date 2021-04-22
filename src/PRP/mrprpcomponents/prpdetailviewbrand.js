import React, { Component } from 'react'
// import SearchDropdown from '../../dcr/components/SearchDropdown'
import { Form, Dropdown, Row, Col, InputGroup, Button } from 'react-bootstrap'
import SearchDropdown from "./../../BasicComponet/searchDropdown";



class PrpDetailBrands extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {

        let Araytype = []
        Araytype.push(
            {
                "key": '-1',
                "text": 'Search & Select',
                "value": '-1',
            },
            {
                "key": '100',
                "text": 'ABC',
                "value": '100',
            },
            {
                "key": '101',
                "text": 'DEF',
                "value": '101',
            },
            {
                "key": '102',
                "text": 'HIJ',
                "value": '102',
            }
        )

        const selections =

            <div>
                <div className="selectedDropdown">data
                    <img src="../public/assets/images/cancel.svg" className="closeImg" />
                </div>
            </div>


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
                            <SearchDropdown
                                labelName="Brands"
                                //   errorMessage={this.state.designationErr}
                                // disabled={true}
                                important={true}
                                placeholder="Select or Search for Brands"
                                Selected={this.state.data}
                                dropdownList={Araytype}
                            //   getValue={this.getDesignationValue}
                            />
                        </div>
                    </div>
                    <div className="selectedDiv">
                        {selections}
                    </div>

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
export default PrpDetailBrands



