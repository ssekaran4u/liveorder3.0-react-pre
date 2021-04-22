import React, { Component } from "react";
import ProductTable from './productablelist'
import { Row, Col, Table, Nav,Collapse,Dropdown } from "react-bootstrap";
import "../../../../public/assets/css/kamStyle.css"
import "../../../../public/assets/css/bootstrap.min.css";
import "../../../../public/assets/css/style.css";


class ProductwiseTable extends Component {
  render() {
    const header = [
           
        { prop: 'skuno', title: 'SKU No',filterable: true},
        { prop: 'BrandName', title: 'Brand Name',filterable: true },
        { prop: 'ItemName', title: 'Item Name' ,filterable: true },
        { prop: 'Division', title: 'Division' ,filterable: true },
        { prop: 'Scheme', title: 'Scheme' ,filterable: true },
        { prop: 'SalesQuantity', title: 'Sales Quantity' ,filterable: true },
        { prop: 'PricePerUnit', title: 'Price Per Unit(Rs.)' ,filterable: true },
        { prop: 'TotalSales', title: 'Total Sales(Lakh)' ,filterable: true },
        { prop: 'Status', title: 'Pr. Status' ,filterable: true },
      ];
       
      const body = [
        { skuno: 'WD00769', BrandName: 'Telpres', ItemName: 'Telpres 20 mg  Tab', Division: 'Cardiac', Scheme: '100+20', SalesQuantity: '1000', PricePerUnit: '500.00', TotalSales: '5.00', Status: 'New'},
        { skuno: 'WD00769', BrandName: 'Telpres', ItemName: 'Telpres 40 mg  Tab', Division: 'Cardiac', Scheme: '100+25  `', SalesQuantity: '1000', PricePerUnit: '500.00', TotalSales: '5.00', Status: 'Regular'},
        { skuno: 'WD00769', BrandName: 'Telpres', ItemName: 'Telpres 200 mg  Tab', Division: 'Neuro', Scheme: '100+10', SalesQuantity: '2000', PricePerUnit: '400.00', TotalSales: '8.00', Status: 'focused'},
        { skuno: 'WD00769', BrandName: 'Telpres', ItemName: 'Telpres Cream 30 ml', Division: 'Cardiac', Scheme: '100+20', SalesQuantity: '4000', PricePerUnit: '200.00', TotalSales: '8.00', Status: 'New'},
      ];

      const customLabels = {
        first: "<<",
        last: ">>",
        prev: "< Prev",
        next: "Next >", 
        show: "Show",
        entries: "items/page",
        filterPlaceholder: "Search",
        noResults: "There is no data to be displayed"
    };
        
        var activeText= <span className="activeTextGreen1">New</span>
        var inactiveText= <span className="inActiveTextRed1">Regular</span>
        var partiallyActiveText = <span className="partiallyActiveTextYellow1">Focused</span>

        body.map((item) => {
            if(item.Status == "New" ){
                item.Status = activeText
            }
            if(item.Status == "Regular" ){
                item.Status = inactiveText
            }
            if(item.Status == "focused" ){
                item.Status = partiallyActiveText
            }
        })

    return (
      <div className="pullleft KamClaimTable">
        <div className="distributorClaimList">
          <div className="flex-row1">
            <p>PRODUCT WISE SALES VIEW</p>
            <div className="all-drop">
           
            <div className="adashboardmenu">
                                 <Dropdown className="menuDrop">
                                     <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                         <div className="kfilterBtn">
                                             <span className="statusText1">Retailer: <span className="retailer-med">Om Medicals</span> </span>
                                         </div>
                                     </Dropdown.Toggle>
                                     <Dropdown.Menu>
                                         {/* <Dropdown.Item href="#/action-1" > */}
                                             <div className="statusdropmenu1" >
                                             <div>
                            <div className="other-ops admindas ksearch1">
                                <div class="form-group">
                                    <span className="input-group">
                                        <input placeholder="Search Retailer" type="text"  className="searchBox"   />
                                        <span className="input-group-btn">
                                            <button type="button" className="btn btn-default"><i className="fa fa-times fa-fw" aria-hidden="true"></i></button>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                                            <div className="pipelinePad"> <img className = "ritcheck" src="../public/assets/images/right check.png"/> Om medical</div>
                                            <div className="pipelinePad"> <img className = "ritcheck" src="../public/assets/images/right check.png"/> Ramdev medical</div>
                                            <div className="pipelinePad"> <img className = "ritcheck" src="../public/assets/images/right check.png"/> Sham medical</div>
                                            <div className="pipelinePad"> <img className = "ritcheck" src="../public/assets/images/right check.png"/> Shree medical</div>
                                            <div className="pipelinePad"> <img className = "ritcheck" src="../public/assets/images/right check.png"/> Ram medical</div>
                                            <div className="pipelinePad"> <img className = "ritcheck" src="../public/assets/images/right check.png"/> Rao medical</div>
                                             </div>
                                             
                                         {/* </Dropdown.Item> */}
                                         
                                     </Dropdown.Menu>
                                 </Dropdown>
                             </div>

                             <div className="adashboardmenu">
                                 <Dropdown className="menuDrop">
                                     <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                         <div className="kfilterBtn">
                                             <span className="statusText1">Division: <span className="retailer-med">select</span></span>
                                         </div>
                                     </Dropdown.Toggle>
                                     <Dropdown.Menu>
                                         <Dropdown.Item href="#/action-1" >
                                             <div className="statusdropmenu2" >
                                             <div className="pipelinePad"> <img className = "ritcheck" src="../public/assets/images/right check.png"/>Cardiac</div>
                                            <div className="pipelinePad"><img className = "ritcheck" src="../public/assets/images/right check.png"/>Urology</div>
                                            <div className="pipelinePad"><img className = "ritcheck" src="../public/assets/images/right check.png"/>Neurology</div>
                                            <div className="pipelinePad"><img className = "ritcheck" src="../public/assets/images/right check.png"/>Edicronology</div>
                                            <div className="pipelinePad"><img className = "ritcheck" src="../public/assets/images/right check.png"/>Dermatologist</div>

                                            </div>
                                             
                                         </Dropdown.Item>
                                         
                                     </Dropdown.Menu>
                                 </Dropdown>
                             </div>

                             <div className="adashboardmenu">
                                 <Dropdown className="menuDrop">
                                     <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                         <div className="kfilterBtn">
                                             <span className="statusText1">Brand: <span className="retailer-med">select</span></span>
                                         </div>
                                     </Dropdown.Toggle>
                                     <Dropdown.Menu>
                                         <Dropdown.Item href="#/action-1" >
                                             <div className="statusdropmenu2">
                                             <div className="pipelinePad"><img className = "ritcheck" src="../public/assets/images/right check.png"/>Dolo</div>
                                            <div className="pipelinePad"><img className = "ritcheck" src="../public/assets/images/right check.png"/>Telpres</div>
                                            <div className="pipelinePad"><img className = "ritcheck" src="../public/assets/images/right check.png"/>Calpol</div>
                                             </div>
                                             
                                         </Dropdown.Item>
                                         
                                     </Dropdown.Menu>
                                 </Dropdown>
                             </div>

                             <div className="adashboardmenu">
                                 <Dropdown className="menuDrop">
                                     <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                                         <div className="kfilterBtn">
                                             <span className="statusText1"><span className="retailer-med">August</span></span>
                                         </div>
                                     </Dropdown.Toggle>
                                     <Dropdown.Menu>
                                         <Dropdown.Item href="#/action-1" >
                                             <div className="statusdropmenu3" >
                                             <div className="pipelinePad">April</div>
                                             <div className="pipelinePad">May</div>
                                            <div className="pipelinePad">June</div>
                                            <div className="pipelinePad">July</div>
                                             </div>
                                             
                                         </Dropdown.Item>
                                         
                                     </Dropdown.Menu>
                                 </Dropdown>
                             </div>
                                   
            </div>
          </div>
          <ProductTable
            tableHeader={header}
            tableBody={body}
            keyName="userTable"
            tableClass="striped hover table-responsive"
            rowsPerPage={10}
            rowsPerPageOption={[10, 20, 50, 100, 200]}
            initialSort={{ prop: "username", isAscending: true }}
            labels={customLabels}
          />
        </div>
      </div>
    );
  }
}

export default ProductwiseTable;


 