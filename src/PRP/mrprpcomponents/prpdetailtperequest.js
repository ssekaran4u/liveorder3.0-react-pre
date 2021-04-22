import React from 'react';
import { Component } from 'react';
import SearchDropdown from "./../../BasicComponet/searchDropdown";
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'
import { Button, Col, Row, Form, InputGroup, } from 'react-bootstrap'
import PrpDetailBrands from "./prpdetailviewbrand";
import PrpdetailExpesedet from "./prpdetailexpensedet";
import PrpDetFinancialdet from "./prpdetailfinacialdet";
import PrpDetailAcrHistory from "./prpdetailacrhistory";
import PrpdetailBrandsdetail from "./prpdetailbrandsdet";

class Prpdetailtypereq extends Component {
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
        <div className="pullleft KamClaimTablesfc newentryprp">
          <div>
            <div className="prptype-req">
              PRP Type Request(Cilacar Webcast)
           </div>
          </div>
          <div className="alldropsfclocation">
            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">PRP No. </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">13562</div>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">PRP Name  </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">Cilacar Webcast</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Requested Date   </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">07-May-2020</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">PRP Date  </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">07-May-2020</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Topic <span className="colorRed">*</span>  </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">Cilacar Webcast</div>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">SubArea <span className="colorRed">*</span>  </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">Kolapur</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Doctors Attended  <span className="colorRed">*</span>  </p>
                </div>
                {/* <div className="selectlocation">
                <div className="prp-det-expense">Kolapur</div>
                </div> */}
              </div>

              <div className="selectedDiv doctorattend">
                {selections}
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Venue <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">Bangalore</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Total Expected No. Of Doctors  <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">05</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Category Of Dr. Going To Attend PRP <span className="colorRed">*</span>  </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">Cardiology</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers ">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Minimum Attendance <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation ">
                  <div className="prp-det-expense">10</div>
                </div>
              </div>
            </div>


            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Invited Speaker Name <span className="colorRed">*</span>  </p>
                </div>
                <div className="selectlocation">
                  <div className="prp-det-expense">Kavitha Shetty</div>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers ">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Doctors Expected To Attend <span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation ">
                  <div className="prp-det-expense">05</div>
                </div>
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers ">
                <div className="distributorClaimListsfc">
                  <p className="paralocation-prp">Location<span className="colorRed">*</span> </p>
                </div>
                <div className="selectlocation ">
                  <div className="prp-det-expense">Tumkur</div>
                </div>
              </div>
            </div>

          </div>

        </div>

        <PrpDetailBrands />
        <PrpdetailBrandsdetail />
        <PrpdetailExpesedet />
        <PrpDetFinancialdet />
        <PrpDetailAcrHistory />
      </React.Fragment>
    )
  }
}
export default Prpdetailtypereq;