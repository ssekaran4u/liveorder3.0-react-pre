import React,{Component} from 'react'
import { Dropdown} from "react-bootstrap";

const FilterSorting =(props)=>{

    const selectMonth=(value)=>{
        props.getVal(value)
    }
    return(
        <div className="flexDisplay">
            <Dropdown className="menuDrop ">
                <Dropdown.Toggle className="languagedrop" variant="success" id="dropdown-basic">
                    <div className=" materialFilter">
                        <img src="../public/assets/images/calendar_gray.svg" />
                        <span className="statusText">{props.defaultValue}</span>
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" >
                        <div className="materialFilterDrop ">
                            {props.monthList ? props.monthList.map((item,index)=>(
                                <div key={index} className="matrialFilterpad"  onClick={()=>selectMonth(item.Code)}>
                                {/* <span className="mimgpad"><img src="../public/assets/images/right_check_gray.svg" /></span> */}
                                <span>{item.Name}</span>
                            </div>
                                )): null}
                        </div>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default FilterSorting