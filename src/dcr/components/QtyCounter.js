import React from 'react'

function QtyCounter(props){
    return(
        <React.Fragment>
            <div className="flex-row">
                <div onClick = {props.localdecQty ? props.localdecQty :props.decrement} className="counterBtnleft"> <img src="../public/assets/images/SUBTRACTION.svg" /></div> 
                {props.editQty == 'edit' ? 
                 <div className="counternum">{props.qtyCounter}</div> : <div className="counternum">{props.editQty}</div> }
                <div onClick = {props.localincreQty ? props.localincreQty :props.increment} className="counterBtnright"><img src="../public/assets/images/plus_blue.svg" /></div>
            </div>
        </React.Fragment>
    )
}

export default QtyCounter

