import React, { Component } from "react";
//import { compareDesc, format } from "date-fns";

function LastVisitList(props){
 
        return(
               <div className="pl24">
                   {props.visitDetail != undefined ? 
                props.visitDetail.map((item,index) => (
                    <div key={index}>
                <div className="clinicDiss">DCR Date</div>
                <div className="disscuss">{item.dte}</div>
                <div className="clinicDiss">In Clinic Discussion Message</div>
                <div className="disscuss">{item.C_Note1}</div>
                <div className="clinicDiss">Detailed Product</div>
                <ul className="explained-product disscuss">
                {item.product}
                </ul>
                <div className="border-bottom" />
                </div>
                     )) 
                     : null

                   }
            </div>
           
        
        )
    }
        
     //   );
   // }
    


export default LastVisitList;
