import React from 'react';
import { Component } from 'react';
import SearchDropdown from "./../../BasicComponet/searchDropdown";
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
import { Button, Col, Row, Form, InputGroup, } from 'react-bootstrap'
import PrpDetailBrands from "./prpdetailviewbrand";
import prpdetailBrandsdetail from "./prpdetailbrandsdet";
import PrpdetailExpesedet from "./prpdetailexpensedet";

class PrpDetFinancialdet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "-1",
      Date: new Date(),
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
                        <img src="../public/assets/images/cancel.png" className="closeImg" />
        </div>
      </div>

    return (
      <React.Fragment>
        <div className="pullleft KamClaimTablesfc ">
          <div>
            <div className="prptype-req">
              Financial Details
           </div>
          </div>
          <div className="alldropsfclocation">
            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Financial Instrument Details </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">Lorem Ipsum thun hyden break</div>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Instrument Date </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">07-May-2020</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Bank Name   </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">ICICI Bank Financial services company</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Accountable Date  </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">07-May-2020</div>
                </div>
              </div>
            </div>


          </div>

        </div>


      </React.Fragment>
    )
  }
}
export default PrpDetFinancialdet;