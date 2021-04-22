import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { Row, Col, Dropdown, Tab, Nav, Form } from 'react-bootstrap';
import Filter from 'react-bs-datatable/lib/Filter';
import CompanyInventoryTable from '../components/CompanyInventoryTable'
import TableRow from '../components/TableRow'
class CompanyInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false,
      // showSubdiv:false,
      showSecondDiv: false,
      showThirdDiv: false,
      expandedRows: [],
      filterdata: [],
      data: [
        {
          id: 1, date: "101-abt", realname: 'Kera Matifyer Cream 30ml', realnameuppercase: '1*10', batch: 'abt00987', scheme: '100+20', expdate: '14-11-2017',
          Qty: '10',
          price: '600.65',
          pts: "600.65", points: "600.65", percent: '50%', packing: 'Blister'
        },
        {
          id: 2, date: "101-abt", realname: 'Anaphase Matifyer Cream 30ml', realnameuppercase: '1*10', batch: 'abt00987', scheme: '100+20',
          expdate: '14-11-2017',
          Qty: '10',
          price: '600.65',
          name: "600.65", points: "600.65", percent: '60%', packing: 'Blister'
        },
        {
          id: 3, date: "101-abt", realname: 'Keracnyl Matifyer Cream 30ml', realnameuppercase: '1*10', batch: 'abt00987', scheme: '100+20',
          expdate: '14-11-2017',
          Qty: '10',
          price: '600.65',
          pts: "600.65", points: "600.65", percent: '70%', packing: 'Blister'
        },
        {
          id: 4, date: "101-abt", realname: 'Anaphase Matifyer Cream 30ml', realnameuppercase: '1*10', batch: 'abt00987', scheme: '100+20',
          expdate: '14-11-2017',
          Qty: '10',
          price: '600.65',
          pts: "600.65", points: "600.65", percent: '80%', packing: 'Blister'
        },
        {
          id: 5, date: "101-abt", realname: 'Keracnyl Matifyer Cream 30ml', realnameuppercase: '1*10', batch: 'abt00987', scheme: '100+20',
          expdate: '14-11-2017',
          Qty: '10',
          price: '600.65',
          pts: "600.65", points: "600.65", percent: '90%', packing: 'Blister'
        },
      ],
    }
    this.showInfo = this.showInfo.bind(this)
    this.showSecondRow = this.showSecondRow.bind(this)
    this.showThirdRow = this.showThirdRow.bind(this)
    this.showRow = this.showRow.bind(this)
    this.renderItem = this.renderItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  showInfo() {
    this.setState({
      showSubdiv: !this.state.showSubdiv
    })
  }
  showSecondRow() {
    this.setState({
      showSecondDiv: !this.state.showSecondDiv
    })
  }
  showThirdRow() {
    this.setState({
      showThirdDiv: !this.state.showThirdDiv
    })
  }
  handleView() {
    this.setState({
      isFull: !this.state.isFull
    });
  }
  showRow(rowId) {
    this.setState({
      showSubdiv: !this.state.showSubdiv
    })
    const currentExpandedRows = this.state.expandedRows;
    const isRowCurrentlyExpanded = currentExpandedRows.includes(rowId);
    const newExpandedRows = isRowCurrentlyExpanded ?
      currentExpandedRows.filter(id => id !== rowId) :
      currentExpandedRows.concat(rowId);
    this.setState({ expandedRows: newExpandedRows });
  }

  renderItem(item) {
    //  const clickCallback = () => this.showRow(item.id);
    const itemRows = [
      <tr key={"row-data-" + item.id}>
        <td><div className="flexDisplay"><div className="kwhitecircle mt15"></div><img src="../public/assets/images/product.png" className="proimg" /></div></td>
        <td>{item.date}</td>
        <td>{item.realname}</td>
        <td>{item.realnameuppercase}</td>
        <td>{item.batch}</td>
        <td>{item.scheme}</td>
        <td>{item.expdate}</td>
        <td>{item.Qty}</td>
        <td>{item.price}<span className="priceborder" onClick={() => this.showRow(item.id)}><i className={this.state.showSubdiv ? "activepriceBtn" : "priceBtn"} ></i></span></td>
      </tr>
    ];

    if (this.state.expandedRows.includes(item.id)) {
      itemRows.push(
        <tr key={"row-expanded-" + item.id} style={{ backgroundColor: "#f2f2f2" }}>
          <td></td>
          <td>
            <div>pts(unit)</div>
            <div className="grayColor">{item.pts}</div>
          </td>
          <td>

            <div>ptr(unit)</div>
            <div className="grayColor"> {item.points}</div>
          </td>
          <td>
            <div>MRP(unit)</div>
            <div className="grayColor">{item.percent}</div>
          </td>
          <td>
            <div>Discount Value</div>
            <div className="grayColor">{item.percent}</div>
          </td>
          <td>
            <div>packing</div>
            <div className="grayColor">{item.packing}</div>
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }

    return itemRows;
  }
  handleChange(event) {
    const { value } = event.target
    let filteredSuggestions = []
    console.log("data", value)
    filteredSuggestions = this.state.data.filter(
      suggestion => suggestion.realname.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    console.log("suggestion", filteredSuggestions)
    this.setState({
      filterdata: filteredSuggestions
    })
  }
  render() {
    // console.log("abc", this.state.abc)
    // const allItemRows = []

    let allItemRows = [];

    this.state.data.forEach(item => {
      const perItemRows = this.renderItem(item);
      allItemRows = allItemRows.concat(perItemRows);
    });

    const months = this.props.months;
    const status = this.props.status;

    return (
      <div>
        <div className="flex-row">
          <div className="dwrSubHeading mainhead_content_one bartitle">Inventory Managment</div>
          <div className="flex-row">
            {/* <div className="compBrand">
                                 <Dropdown className="menuDrop">
                                     <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                         <div className="kfilterBtn kmb10">
                                             <span className="statusText">Category: Cardiology</span>
                                         </div>
                                     </Dropdown.Toggle>
                                     <Dropdown.Menu>
                                         <Dropdown.Item  >
                                         <div className="statusdropmenu" >
                                                    <div className="pipelinePad">Neurology</div>
                                                    <div className="pipelinePad">Urology</div>
                                                    <div className="pipelinePad">Edicronology</div>
                                                </div>
                                             
                                         </Dropdown.Item>
                                         
                                     </Dropdown.Menu>
                                 </Dropdown>
                             </div> */}
            <div className="adashboardmenu unlockmenu catlist">
              <Dropdown className="menuDrop">
                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                  <div className="kfilterBtn topdistResponsivepad">
                    <img src="../../../../public/assets/images/Path_2093.svg" />
                    <span className="distributorStatusText">Category: Cardiology</span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" >
                    <div className="statusdropmenu" >
                      <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Neurology</div>
                      <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Urology</div>
                      <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Edicronology</div>

                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="adashboardmenu unlockmenu brandlist">
              <Dropdown className="menuDrop">
                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                  <div className="kfilterBtn topdistResponsivepad">
                    <img src="../../../../public/assets/images/Path_2093.svg" />
                    <span className="distributorStatusText">Brand:Telpress</span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" >
                    <div className="statusdropmenu" >
                      <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Telepress</div>
                      <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Dolo</div>
                      <div className="distributorListpad"><img src="../public/assets/images/right check.svg" className="imgrightpad" /> Calpol</div>

                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="invenSearch">
              {/* <div>
                                <div className="other-ops ">
                                    <Filter
                                        tableHeader={tableHeader}
                                        onChangeFilter={this.onChangeFilter}
                                        filterText={filterText}
                                        keyName={keyName}
                                        placeholder={labels.filterPlaceholder}
                                    />
                                </div>
                            </div> */}
              <div className="other-ops ">
                <Form.Control type="text" className="customized-input" placeholder="Quick Search" onChange={this.handleChange} />
              </div>
            </div>
            <div className="unlockmenu invenMonth m12">
              <Dropdown>
                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                  <div className="distrubutorFilter">
                    <span className="unloackStatusText">August</span>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1" >
                    <div className="statusdropmenu" >
                      {months!=undefined && months.length > 0 ? months.map(months => (
                        <div className="pipelinePad" key={months.Code}>{months.Name}</div>)) : null}
                    </div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="manager_component_head_icon">
              {this.state.isFull ? (
                <img src="../public/assets/images/collapse-grey.svg" onClick={this.handleView.bind(this)} />
              ) : (
                  <img src="../public/assets/images/fullscreen.svg" onClick={this.handleView.bind(this)} />
                )}
              <img
                className="dashfullscreen"
                src="../public/assets/images/overflow.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex-row">
          {/* <div className="stockLine">In Stock</div> */}
          <div className="unlockmenu stockdropdown">
            <Dropdown>
              <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                <div className="stockDrop">
                  <span className="unloackStatusText">In Stock</span>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <div className="statusdropmenu dropdownWidth" >
                    {status!=undefined && status.length > 0 ? status.map((status) => (
                      <div className="stockhover" key={status.Code}><img className="image" src="../public/assets/images/right check.svg" aria-hidden="true"></img>{status.Name}</div>
                    )) : null}
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="expiry flexDisplay"><div className="kredcircle"></div>Near By Expiry</div>
        </div>
        <div className="datatable inventorytable inventoryScroll">
          <Table responsive >
            <thead>
              <tr>
                <th></th>
                <th>SKU</th>
                <th>Product Name</th>
                <th>Packing</th>
                <th>Batch No</th>
                <th>Scheme Qt.</th>
                <th>Expirey Date</th>
                <th>Qty(In box)</th>
                <th>Price(per Box)</th>
              </tr>
            </thead>

            {this.state.filterdata != "" ?
              <TableRow data={this.state.filterdata} /> :
              <TableRow data={this.state.data} />}
          </Table>
        </div>
        {/* <CompanyInventoryTable
                    tableHeader={header}
                    tableBody={body}
                    keyName="userTable"
                    tableClass="striped hover table-responsive"
                    rowsPerPage={10}
                    rowsPerPageOption={[10, 20, 50, 100, 200]}
                    initialSort={{ prop: "username", isAscending: true, }}
                    labels={customLabels}
                    // toggleHeader={toggleHeader}
                    // headerColums={headerColums}
                    // getUnselectedColumns={this.getUnselectedColumns}
                /> */}
        {/* <div className="datatable inventorytable">
                  <Table responsive >
                      <thead>
                          <tr>
                             <th></th>
                             <th>SKU</th>
                             <th>Product Name</th>
                             <th>Packing</th>
                             <th>Batch No</th>
                             <th>Scheme Qt.</th>
                             <th>Expirey Date</th>
                             <th>Qty(In box)</th>
                             <th>Price(per Box)</th>
                          </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><div className="flexDisplay"><div className="kwhitecircle mt15"></div><img src="../public/assets/images/product.png" className="proimg" /></div></td>
                          <td>101-abt
                          {this.state.showSubdiv ? 
                          <div className="marginTop30">
                              <div>pts(unit)</div>
                              <div className="grayColor">600</div>
                            </div>:''}
                          </td>
                          <td>Keranccly
                          {this.state.showSubdiv ? 
                          <div className="marginTop30">
                              <div>pts(unit)</div>
                              <div className="grayColor">600</div>
                            </div>:''}
                          </td>
                          <td>1*10
                          {this.state.showSubdiv ? 
                          <div className="marginTop30">
                              <div>Mrp(unit)</div>
                              <div className="grayColor">600</div>
                            </div>:''}
                          </td>
                          <td>abt001
                          {this.state.showSubdiv ? 
                          <div className="marginTop30">
                              <div>Discount value</div>
                              <div className="grayColor">600</div>
                            </div>:''}
                          </td>
                          <td>100+20
                          {this.state.showSubdiv ? 
                          <div className="marginTop30">
                              <div>Packing</div>
                              <div className="grayColor">Bilster</div>
                            </div>:''}
                          </td>
                          <td>14-11-2001</td>
                          <td>1000</td>
                          <td>64.4<span className="priceborder" onClick={this.showInfo}><i className={this.state.showSubdiv ? "activepriceBtn" : "priceBtn" } ></i></span></td>
                          
                        </tr>
                       
                        <tr className={this.state.showSecondDiv ? 'secondDivtabletr' :''}>
                          <td><div className="flexDisplay"><div className="kwhitecircle mt15"></div><img src="../public/assets/images/product.png" className="proimg" /></div></td>
                          <td>101-abt
                          {this.state.showSecondDiv ? 
                          <div className="marginTop30">
                              <div>pts</div>
                              <div className="grayColor">600</div>
                            </div>:''}
                          </td>
                          <td>Anphase
                          {this.state.showSecondDiv ? 
                          <div className="marginTop30">
                              <div>pts</div>
                              <div className="grayColor">600</div>
                            </div>:''}
                          </td>
                          <td>1*10
                          {this.state.showSecondDiv ? 
                          <div className="marginTop30">
                              <div>pts</div>
                              <div className="grayColor">600</div>
                            </div>:''}
                          </td>
                          <td>abt001
                          {this.state.showSecondDiv ? 
                          <div className="marginTop30">
                              <div>pts</div>
                              <div className="grayColor">600</div>
                            </div>:''}
                          </td>
                          <td>100+20
                          {this.state.showSecondDiv ? 
                          <div className="marginTop30">
                              <div>Packing</div>
                              <div className="grayColor">Bilster</div>
                            </div>:''}
                          </td>
                          <td>14-11-2001</td>
                          <td>1000</td>
                          <td>64.4<span className="priceborder" onClick={this.showSecondRow}><i className={this.state.showSecondDiv ? "activepriceBtn" : "priceBtn" } ></i></span></td>
                          
                        </tr>
                        <tr>
                          <td><div className="flexDisplay"><div className="kredcircle mt15"></div><img src="../public/assets/images/product.png" className="proimg" /></div></td>
                          <td>101-abt
                          {this.state.showThirdDiv ? 
                          <div className="marginTop30">
                              <div>pts.(Unit)</div>
                              <div className="grayColor">600</div>
                            </div>:''}
                          </td>
                          <td>Keranccly
                          {this.state.showThirdDiv ? 
                          <div className="marginTop30">
                              <div>pts.(Unit)</div>
                              <div className="grayColor">600</div>
                            </div>:''}
                          </td>
                          <td>1*10
                          {this.state.showThirdDiv ? 
                          <div className="marginTop30">
                              <div>Mrp.(Unit)</div>
                              <div className="grayColor">600</div>
                            </div>:''}
                          </td>
                          <td>abt001
                          {this.state.showThirdDiv ? 
                          <div className="marginTop30">
                              <div>Discount Value</div>
                              <div className="grayColor">20%</div>
                            </div>:''}
                          </td>
                          <td>100+20
                          {this.state.showThirdDiv ? 
                          <div className="marginTop30">
                              <div>Packing</div>
                              <div className="grayColor">Bilster</div>
                            </div>:''}
                          </td>
                          <td>14-11-2001</td>
                          <td>1000</td>
                          <td>64.4<span className="priceborder" onClick={this.showThirdRow}><i className={this.state.showThirdDiv ? "activepriceBtn" : "priceBtn" } ></i></span></td>
                          
                        </tr>
                      </tbody>
                  </Table>
            </div> */}
      </div>
    )
  }
}

export default CompanyInventory