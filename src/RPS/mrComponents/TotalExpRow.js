import React from 'react'

const TotalExpRow=(props)=>{
   
    const {expQtyRow,id,row,grpTotal,grpQtyTotal} = props
    {Object.keys(expQtyRow).map((item)=>{ 
        item == row ? 
            Object.keys(expQtyRow[item]).map((k)=>{
                k == id ?  'hi' :'hello'
            }) 
        :  'gar'
            })}
  
    return(
        <React.Fragment>
             <td className="thead-th-default">
                <div className="flexDisplay">
                    {/* {Object.keys(expQtyRow).map((item)=>(
                        item == row ? 
                            Object.keys(expQtyRow[item]).map((k)=>(
                                k == id ?  <div>{props.totalERx}</div> :null
                            )) 
                        :  null
                    ))} */}
                       {/* {Object.keys(expQtyRow).map((item)=>( */}
                        {/* item == row ?  */}
                            {Object.keys(grpTotal).map((k)=>(
                                k == id ?  <div>{grpTotal[k]}</div> :null
                            ))}
                        {/* :  null */}
                    {/* ))} */}
                     {/* {Object.keys(expQtyRow).map((item)=>(
                        item == row ? 
                            Object.keys(expQtyRow[item]).map((k)=>(
                                k == id ?   <div className="pad65">{props.totalEQty}</div> :null
                            )) 
                        : null
                    ))} */}
                        {Object.keys(grpQtyTotal).map((k)=>(
                                k == id ?  <div className="pad65">{grpQtyTotal[k]}</div> :null
                            ))}
                   
                </div>
            </td>
        </React.Fragment>
    )
}
export default TotalExpRow