import React,{useState, useEffect } from 'react'
import DeleteAlert from '../../lib/DeleteAlert'


const ShowActionDrop =(props)=>{
    const [statuslist,showAction] =React.useState(false)

    const hideApprovalDropdown=()=>{
        showAction(!statuslist)
    }
    const RequestResponse=(data,srno,empCode,empname)=>{
        props.sendResponse(data,srno,empCode,empname)
    }
    return(
        <div>
        {/* {this.state.cancelAlert ? <DeleteAlert  show={props.show} SerialNo={props.srno}  hideMOdal={this.hideMOdal} /> : null} */}
       <img src="../public/assets/images/overflow.svg"  className="handCurser" onClick={()=>showAction(true)}  />
       <div onMouseLeave={()=>showAction(false)}> 
       {statuslist ? 
        <div className="tdPosiion" >
            {props.loginUser == '1' ?
             <div className="menuShow">
             <div className="delText" onClick={()=>RequestResponse('0',props.srno,props.empCode,props.empname)}>Confirm</div>
             <div className="delText" onClick={()=>RequestResponse('1',props.srno,props.empCode,props.empname)}>Reject</div>
             <div className="delText" onClick={()=>RequestResponse('2',props.srno,props.empCode,props.empname)}>Postpone</div>
         </div>
            :
            <div className="menuShow">
                <div className="delText" onClick={()=>RequestResponse('0',props.srno,props.empCode,props.empname)}>Approved</div>
                <div className="delText" onClick={()=>RequestResponse('1',props.srno,props.empCode,props.empname)}>Not Approved</div>
            </div>
            }
        </div>
       : null}
    </div>
  
</div>
    )

}

export default ShowActionDrop