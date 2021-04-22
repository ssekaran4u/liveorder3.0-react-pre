import React, { Component } from 'react'
import { Table } from 'react-bootstrap';
import { Row, Col, Dropdown, Tab, Nav, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class DistributorInventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFull: false,
            showSubdiv: false,
            showSecondDiv: false,
            showThirdDiv: false,
            expandedRows: [],
            distributorList: [],
            data: [
                {
                    id: 1, date: "101-abt", realname: 'Telepress  Cream 30ml', realnameuppercase: '1*10', batch: '1000', scheme: '2000', expdate: '4 Lakh',
                    Qty: '1000',
                    price: '1500',
                    pts: "102-abt", points: "18-11-2019", percent: '600.32', packing: '100+10', return: '2 lakh', discount: '20%', sku: '10289'
                },
                {
                    id: 2, date: "101-abt", realname: 'Telepress 40mg', realnameuppercase: '1*10', batch: '2000', scheme: '500',
                    expdate: '5 Lakh',
                    Qty: '1500',
                    price: '2000',
                    pts: "102-abt", points: "18-11-2019", percent: '600.32', packing: '100+10', return: '2 lakh', discount: '20%', sku: '10289'
                },
                {
                    id: 3, date: "101-abt", realname: 'Keracnyl Matifyer Cream 30ml', realnameuppercase: '1*10', batch: '500', scheme: '500',
                    expdate: '2 Lakh',
                    Qty: '2000',
                    price: '6000',
                    pts: "102-abt", points: "18-11-2019", percent: '600.32', packing: '100+10', return: '2 lakh', discount: '20%', sku: '10289'
                },

            ],
        }
        this.showInfo = this.showInfo.bind(this)
        this.showSecondRow = this.showSecondRow.bind(this)
        this.showThirdRow = this.showThirdRow.bind(this)
        this.showRow = this.showRow.bind(this)
        this.renderItem = this.renderItem.bind(this)
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
                <td>{item.realname}</td>
                <td>{item.realnameuppercase}</td>
                <td>{item.batch}</td>
                <td>{item.scheme}</td>
                <td>{item.expdate}</td>
                <td>{item.Qty}</td>
                <td>{item.price}</td>
                <td><div className="flexDisplay">
                    <div className="suggestqty">1000</div>
                    <div className="addButton">Add</div>
                    <div className="priceborder" onClick={() => this.showRow(item.id)}><i className={this.state.showSubdiv ? "activepriceBtn" : "priceBtn"} ></i></div>
                </div>
                </td>
            </tr>
        ];

        if (this.state.expandedRows.includes(item.id)) {
            itemRows.push(
                <tr key={"row-expanded-" + item.id} style={{ backgroundColor: "#f2f2f2" }}>
                    <td></td>
                    <td>
                        <div>Batch Number</div>
                        <div className="grayColor kborder-bot">{item.pts}</div>
                    </td>
                    <td>

                        <div>Expiry Date</div>
                        <div className="grayColor kborder-bot"> {item.points}</div>
                    </td>
                    <td>
                        <div>Price(Per Box)</div>
                        <div className="grayColor kborder-bot">{item.percent}</div>
                    </td>
                    <td>
                        <div>Scheme Given</div>
                        <div className="grayColor kborder-bot">{item.packing}</div>
                    </td>
                    <td>
                        <div>Return</div>
                        <div className="grayColor kborder-bot">{item.return}</div>
                    </td>
                    <td>
                        <div>Discount</div>
                        <div className="grayColor kborder-bot">{item.discount}</div>
                    </td>
                    <td>
                        <div>SKU</div>
                        <div className="grayColor kborder-bot">{item.sku}</div>
                    </td>
                    <td></td>

                </tr>
            );
        }

        return itemRows;
    }
    render() {
        const status= this.props.status;
        const distributorList = this.props.distributorList;
        let allItemRows = [];

        this.state.data.forEach(item => {
            const perItemRows = this.renderItem(item);
            allItemRows = allItemRows.concat(perItemRows);
        });
        const months = this.props.months
        return (
            <div>
                <div className="flex-row">
                    <div className="dwrSubHeading mainhead_content_one bartitle">Inventory Managment</div>
                    <div className="flex-row" >
                        <Link to='/cartsummary'><div className="flexDisplay shoppingcartpad">
                            <div className="cartBox ">
                                <img src="../../../../public/assets/images/shopping-cart.svg" /></div>
                            <div className="cartitem">02</div>
                        </div>
                        </Link>


                        <div className="unlockmenu categoryDrop m12 mobilecatpad">
                            <Dropdown>
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                    <div className="distrubutorFilter">
                                        <span className="unloackStatusText">Category: Cardiology</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" >
                                            <div className="pipelinePad">Neurology</div>
                                            <div className="pipelinePad">Gyenology</div>
                                            <div className="pipelinePad">Endicronology</div>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="unlockmenu branddrop  m12">
                            <Dropdown>
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                    <div className="distrubutorFilter">
                                        <span className="unloackStatusText">Brand:Telpress</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1" >
                                        <div className="statusdropmenu" >
                                            <div className="pipelinePad">Dolo</div>
                                            <div className="pipelinePad">Activase</div>
                                            <div className="pipelinePad">Actemra</div>
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="invenSearch">
                            <div className="other-ops ">
                                <Form.Control type="text" className="customized-input" placeholder="Quick Search" />
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
                                            {months.length > 0 ? months.map(months => (
                                                <div className="pipelinePad" key={months.Code}>{months.Name}</div>
                                            )) : null}
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
                    <div className="flexDisplay">

                        <div className="unlockmenu stockdropdown phramadropdown">
                            <Dropdown>
                                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                    <div className="stockDrop">
                                        <span className="unloackStatusText">WELLNESS PHARMACEUTICALS</span>
                                    </div>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <div className="statusdropmenu " >
                                            {distributorList!=undefined && distributorList.length>0?distributorList.map((distributorList)=>(
                                            <div className="stockhover" key={distributorList.C_Code}><img className="image" src="../public/assets/images/right check.svg" /> {distributorList.C_Name.toLowerCase()}</div>
                                            )):null}
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
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
                                            {/* <div className="stockhover">
                                                <img src="../public/assets/images/rightcheck.svg"
                                                    onmouseover="this.src='../public/assets/images/right check.svg'"
                                                    onmouseout="this.src='../public/assets/images/right check.svg'"
                                                /> In Stock
                                                    </div> */}
                                                    {status!=undefined && status.length>0?status.map((status)=>(
                                            <div className="stockhover" key={status.Code}><img className="image" src="../public/assets/images/right check.svg" />{status.Name}</div>
                                            )):null}
                                        </div>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className="expiry flexDisplay kamMarginLeft20"><div className="kredcircle"></div>Near By Expiry</div>
                </div>
                <div className="datatable inventorytable inventoryScroll">
                    <Table responsive >
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product Name</th>
                                <th>Packing</th>
                                <th>Opening Qty</th>
                                <th>Purchase Qty.</th>
                                <th>Purchase Value</th>
                                <th>Sales Qty.</th>
                                <th>Closing Qty.</th>
                                <th>Suggested Order Qty.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allItemRows}
                        </tbody>
                    </Table>
                </div>
                {/* <div className="datatable">
                    <Table responsive >
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product Name</th>
                                <th>Packing</th>
                                <th>Opening Qty.</th>
                                <th>Purchase Value</th>
                                <th>Sales Qty.</th>
                                <th>Sales Value</th>
                                <th>Closing Qty.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="rowborder">
                                
                                <td><div className="flexDisplay"><div className="kwhitecircle mt15"></div><img src="../public/assets/images/product.png" className="proimg" /></div></td>
                                <td>Keranccly
                                    {this.state.showSubdiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Batch Number </div>
                                            <Form.Control type="text" className="customized-input"  value="102-abt" />
                                        </div>
                                    :''}
                                </td>
                                <td>1*10
                                    {this.state.showSubdiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Expiry Date</div>
                                            <Form.Control type="text" className="customized-input"  value="18-05-2003" />
                                        </div>
                                    :''}
                                </td>
                                <td>abt001
                                    {this.state.showSubdiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">price per box</div>
                                            <Form.Control type="text" className="customized-input"  value="220.0" />
                                        </div>
                                    :''}
                                </td>
                                <td>100+20
                                    {this.state.showSubdiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Scheme Given</div>
                                            <Form.Control type="text" className="customized-input"  value="100+2" />
                                        </div>
                                    :''}
                                </td>
                                <td>14-11-2001
                                    {this.state.showSubdiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Return</div>
                                            <Form.Control type="text" className="customized-input"  value="2 laks" />
                                        </div>
                                    :''}
                                </td>
                                <td>1000
                                    {this.state.showSubdiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Discount</div>
                                            <Form.Control type="text" className="customized-input"  value="20%" />
                                        </div>
                                    :''}
                                </td>
                                <td>64.4<span className="priceborder" onClick={this.showInfo}><i className={this.state.showSubdiv ? "activepriceBtn" : "priceBtn" } ></img></span>
                                    {this.state.showSubdiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">SKU</div>
                                            <Form.Control type="text" className="customized-input"  value="102980" />
                                        </div>
                                    :''}
                                </td>
                            </tr>
                            <tr>
                               
                                <td><div className="flexDisplay"><div className="kwhitecircle mt15"></div><img src="../public/assets/images/product.png" className="proimg" /></div></td>
                                <td>Keranccly
                                    {this.state.showSecondDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Batch Number </div>
                                            <Form.Control type="text" className="customized-input"  value="102-abt" />
                                        </div>
                                    :''}
                                </td>
                                <td>1*10
                                    {this.state.showSecondDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Expiry Date</div>
                                            <Form.Control type="text" className="customized-input"  value="18-05-2003" />
                                        </div>
                                    :''}
                                </td>
                                <td>abt001
                                    {this.state.showSecondDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">price per box</div>
                                            <Form.Control type="text" className="customized-input"  value="220.0" />
                                        </div>
                                    :''}
                                </td>
                                <td>100+20
                                    {this.state.showSecondDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Scheme Given</div>
                                            <Form.Control type="text" className="customized-input"  value="100+2" />
                                        </div>
                                    :''}
                                </td>
                                <td>14-11-2001
                                    {this.state.showSecondDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Return</div>
                                            <Form.Control type="text" className="customized-input"  value="2 laks" />
                                        </div>
                                    :''}
                                </td>
                                <td>1000
                                    {this.state.showSecondDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Discount</div>
                                            <Form.Control type="text" className="customized-input"  value="20%" />
                                        </div>
                                    :''}
                                </td>
                                <td>64.4<span className="priceborder" onClick={this.showSecondRow}><i className={this.state.showSecondDiv ? "activepriceBtn" : "priceBtn" } ></i></span>
                                    {this.state.showSecondDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">SKU</div>
                                            <Form.Control type="text" className="customized-input"  value="102980" />
                                        </div>
                                    :''}
                                </td>
                            </tr>
                            <tr>
                                
                                <td><div className="flexDisplay"><div className="kredcircle mt15"></div><img src="../public/assets/images/product.png" className="proimg" /></div></td>
                                <td>Keranccly
                                    {this.state.showThirdDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Batch Number </div>
                                            <Form.Control type="text" className="customized-input"  value="102-abt" />
                                        </div>
                                        :''}
                                </td>
                                <td>1*10
                                {this.state.showThirdDiv ? 
                                    <div className="marginTop30 distributorcol">
                                        <div className="subtablelabel">Expiry Date</div>
                                        <Form.Control type="text" className="customized-input"  value="18-05-2003" />
                                    </div>
                                    :''}
                                </td>
                                <td>abt001
                                {this.state.showThirdDiv ? 
                                    <div className="marginTop30 distributorcol">
                                        <div className="subtablelabel">price per box</div>
                                        <Form.Control type="text" className="customized-input"  value="220.0" />
                                    </div>
                                    :''}
                                </td>
                                <td>100+20
                                    {this.state.showThirdDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Scheme Given</div>
                                            <Form.Control type="text" className="customized-input"  value="100+2" />
                                        </div>
                                    :''}
                                </td>
                                <td>14-11-2001
                                    {this.state.showThirdDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Return</div>
                                            <Form.Control type="text" className="customized-input"  value="2 laks" />
                                        </div>
                                    :''}
                                </td>
                                <td>1000
                                    {this.state.showThirdDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">Discount</div>
                                            <Form.Control type="text" className="customized-input"  value="20%" />
                                        </div>
                                    :''}
                                </td>
                                <td>64.4<span className="priceborder" onClick={this.showThirdRow}><i className={this.state.showThirdDiv ? "activepriceBtn" : "priceBtn" } ></i></span>
                                    {this.state.showThirdDiv ? 
                                        <div className="marginTop30 distributorcol">
                                            <div className="subtablelabel">SKU</div>
                                            <Form.Control type="text" className="customized-input"  value="102980" />
                                        </div>
                                    :''}
                                </td>
                            </tr>
                      </tbody>
                  </Table>
            </div> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    distributorList: state.KAMDashboard.distributor_list,
})

export default  connect(mapStateToProps)(DistributorInventory);