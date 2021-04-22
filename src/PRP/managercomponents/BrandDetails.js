import React from 'react'
import { Component } from 'react';
import { Button, Col, Row, Form } from 'react-bootstrap'
import '../../../public/assets/css/sfcstyle.css'
import '../../../public/assets/css/transactionmodule.css'

class BrandDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Error : '',
				}
		}
    renderTableData () {
      return this.props.Business.map((item, index) => {
        const {code, NAME, CurrbussnessAmt, Expbussinessamt} = item
         return (
           <tr key={index}>
             {this.props.ExpBussinessvisiblity !=0 || this.props.CurBussinessvisiblity != 0 ?
             <th className="trainingamt">{NAME}</th> : null}
             {this.props.CurBussinessvisiblity != 0 ? 
             <th className="trainingamt">{CurrbussnessAmt}</th> : null}
             {this.props.ExpBussinessvisiblity !=0 ?
             <th className="trainingamt">{Expbussinessamt}</th>: null}
           </tr>
         )
      })
    }
    render() {
      const {
        Business
      } = this.props
      let CurrentBusinessTotal = this.props.Business.reduce((item, currentValue) => 
      item + parseFloat(currentValue.CurrbussnessAmt), 0);
      let ExpbussinessTotal = this.props.Business.reduce((item, currentValue) =>
      item + parseFloat(currentValue.Expbussinessamt), 0)
        return (
          <React.Fragment>
            <div>
            {this.props.ExpBussinessvisiblity == 1 || this.props.CurBussinessvisiblity == 1 ? 
            <div className="pullleft KamClaimTablesfc">
            <div className="ongoing-orders-sfc mrsfcTable sfcFilterOpt">
              <div className=" prpacount">
                <div>
                  <div className="acount-detailsprp">
                    Business Details
                  </div>
                </div>
                <div className=" prpacount-table" >
                  <table className="stripe row-border order-column"  >
                    <thead>
                      <tr>
                        {this.props.ExpBussinessvisiblity !=0 || this.props.CurBussinessvisiblity != 0 ? 
                        <th rowSpan="1" colSpan="1" className="acountname">Brand Name</th> : null}
                        {this.props.CurBussinessvisiblity != 0 ?  
                        <th rowSpan="1" colSpan="1"  className="acountname">Current Business(₹)</th> : null}
                        {this.props.ExpBussinessvisiblity !=0 ?
                         <th rowSpan="1" colSpan="1"  className="acountname">Expected Business(₹)</th> : null}
                      </tr>                
                    </thead>
                    <tbody>
                      {this.renderTableData()}
                    </tbody>
                    <tfoot>
                    <tr className="training-amt">  
                      <th></th>
                      {this.props.CurBussinessvisiblity != 0 ? 
                      <th className="trainingamt-total"> ₹ {CurrentBusinessTotal}</th> : null}
                      {this.props.ExpBussinessvisiblity !=0 ? 
                      <th className="trainingamt-total">₹ {ExpbussinessTotal}</th> : null}
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div> : null}
            </div>
            </React.Fragment>
        )
    }
}
export default BrandDetails;        