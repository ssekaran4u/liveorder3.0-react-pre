import { GET_OACTIVITY } from '../actions/constants'

export default function OTHERACT(state = {}, action) {
    switch (action.type) {
        case GET_OACTIVITY:
            //console.log(action.data.downloadExpense['0'])
            return ({...state, data:action.data});
       
        default:
            return state
    }
}