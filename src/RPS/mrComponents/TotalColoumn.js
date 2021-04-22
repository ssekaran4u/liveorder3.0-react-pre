import React from 'react'
import TotalExpRow from '../mrComponents/TotalExpRow'

const TotalColoumn =(props)=>{

    return(
        <React.Fragment>
            <td></td>
                    <td></td>
                    <td style={{"text-align":"right","font-family":"OpenSans-Bold"}}>Total</td>
                    <td>
                      <div className="flexDisplay">
                        <div>{props.t_currrx}</div>
                        <div className="pad65">{props.t_currQty}</div>
                      </div>
                    </td>
                    {props.expectedBuss.map((item,index) => (
                     
                        <TotalExpRow 
                            totalERx ={props.totalERx}
                            totalEQty={props.totalEQty}
                            expQtyRow={props.expQtyRow}
                            grpTotal={props.grpTotal}
                            id={item.id}
                            row={props.totalRow}
                            grpQtyTotal={props.grpQtyTotal}
                            // valueGrpTotal={props.valueGrpTotal}
                        />
                    ))}
                      {localStorage.getItem("roi_value") == "1" ?
                      <td ></td>
                      : null}
                    <td></td>
        </React.Fragment>
    )
}
 export default TotalColoumn