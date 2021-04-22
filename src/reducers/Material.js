

import { MATERIAL_LIST,MATERIAL_CONFIRM_LIST } from '../actions/constants';

export default function Material(state = {}, action) {
    switch (action.type) {

        case MATERIAL_LIST:
           // console.log("sweta",action.data)
            return ({...state, listdata:action.data});
        case MATERIAL_CONFIRM_LIST:
         //  console.log("sweta1",action.data)
            return ({...state, list_data:action.data});
                                    
                default:
                      
            return state  
    }
}