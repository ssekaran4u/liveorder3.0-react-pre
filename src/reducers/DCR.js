import { DCR_PRODUCT, DCR_DROPDOWN,DCR_RCPA ,RCPAdetails,GET_PRODUCTS } from '../actions/constants'

export default function DCR(state = {}, action) {
    switch (action.type) {
        case DCR_PRODUCT:
            return ({...state, data:action.data});
        case DCR_DROPDOWN:
            return ({...state, dataDropdown:action.data});
        case DCR_RCPA:
            return ({...state, dataRCPA:action.data});
        case RCPAdetails:
            return ({...state, RCPAdetailskey:action.data});
        case GET_PRODUCTS :
                console.log("setting token in global store....",action.data)
                return ({...state, productdata:action.data});
          
        default:
            return state
    }
}