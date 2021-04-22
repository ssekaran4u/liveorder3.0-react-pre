import React from 'react';
import { Component } from 'react';
import SearchDropdown from "../../../BasicComponet/searchDropdown";
import '../../../../public/assets/css/sfcstyle.css'
import '../../../../public/assets/css/transactionmodule.css'
import { Button, Col, Row, Form, InputGroup, } from 'react-bootstrap'
import { postToServer } from '../../../lib/comm-utils'
import { URL_PRP } from '../../../lib/constants'



class MRPatchesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prpvalue: "-1",
      Prptype: [{
        "key": '1',
        "text": 'MR1',
        "value": 'MR1',
      },
      {
        "key": '2',
        "text": 'MR2',
        "value": 'MR2',
      }],
    }

  }




  render() {
    

    return (
      <React.Fragment>
          <div className="content-spacing body-scroll">
                <div className="min-height-100">
        <div className="pullleft KamClaimTablesfc newentryprp">
          <div className="alldropsfclocation">
            <div className="locationsfa">
            

              <div className="user-heirarchy-field-containers">
                <SearchDropdown
                  labelName="MR Name"
                //   errorMessage={this.state.selectypeErr}
                  // disabled={true}
                  important={true}
                  placeholder="Please Select"
                  Selected={this.state.prpvalue}
                  dropdownList={this.state.Prptype}
                //   getValue={this.getPrpValue}
                //   disable={true}
                />
              </div>
            </div>

            <div className="locationsfa">
              <div className="user-heirarchy-field-containers">
                <SearchDropdown
                   labelName="Patche"
                //    errorMessage={this.state.selectypeErr}
                   // disabled={true}
                   important={true}
                   placeholder="Please Select"
                   Selected={this.state.prpvalue}
                   dropdownList={this.state.Prptype}
                 //   getValue={this.getPrpValue}
                 //   disable={true}
                />
              </div>
            </div>



            <Button className="sfcAddBtn-loaditem">View details</Button>
          </div>
          </div>
          </div>
        </div>
      
       

      </React.Fragment>
    )
  }
}
export default MRPatchesDetail;