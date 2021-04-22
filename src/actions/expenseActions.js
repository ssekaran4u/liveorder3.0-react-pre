import {ENTRY_TYPE} from "./constants";

//To get the type of entry
export const getEntryType = (data) => {
    return(dispatch)=>{
        dispatch({
            type: ENTRY_TYPE,
            payload: data
        })
    }
}