import { DCR_LIST, TOGGLE_DCR_HEADER, IS_FULL } from './constants'
import { URL_DCRLIST } from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const DCRList = (data) => {
	return {
		type:DCR_LIST,
		data
	}
}

export const getDCRList = (data) => {
    return (dispatch) => {
		postToServer(URL_DCRLIST,data)
			.then(function(resp) {
				if (resp.data.Status=="Success") {
					dispatch(DCRList(resp.data.Result))
				}
				else {
					//alert("error")
        }
			});
	}
}

export const toggleDcrHeader = () => {
	return {
		type:TOGGLE_DCR_HEADER
	}
}

export const goFullView = () => {
	return {
		type: IS_FULL
	}
}