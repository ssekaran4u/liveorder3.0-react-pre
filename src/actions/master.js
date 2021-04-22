import { SET_MASTER_DATA, MASTEREDIT,TOGGLE_DCR_HEADER } from './constants'
import { URL_LIST_MASTER } from '../lib/constants'
import { postToServer } from '../lib/comm-utils'

export const setMasterData = (header, data) => {
	return {
		type:SET_MASTER_DATA,
		header,
        data
	}
}
/*export const MASTERList = (data) => {
	return {
		type:MASTER_LIST,
		data
	}
}*/


export const toggleDcrHeader = () => {
	return {
		type:TOGGLE_DCR_HEADER
	}
}

/*
export const MASTERhead= (data) => {
	return {
		type:MASTERheader,
		data
	}
}



export const MASTERfilter= (data) => {
	return {
		type:MASTER_FILTER,
		data
	}
}
*/




export const MASTEREdit= (data) => {
	return {
		type:MASTEREDIT,
		data
	}
}
export const getMASTERList = (data) => {
	return (dispatch) => {
		postToServer(URL_LIST_MASTER,data)
			.then(function(resp) {
				let header=[]
				if (resp.data.length!=0) {
					Object.keys(resp.data[0]).map((name)=>{
                        name = name.charAt(0).toUpperCase() + name.slice(1)
						header.push( { "title": name , "prop": name, "sortable": true, "filterable": true } )
					 } )
					dispatch(setMasterData(header, resp.data))
				}
				else {
                    //TODO: Handle error
                }
			});
	}
}




 /*export const getMASTER_FILTER=(data)=>{
	return (dispatch) => {
	
		dispatch(MASTERfilter(data))	 
}

 } */

export const getMASTERLEdit = (data) => {

	

	
    return (dispatch) => {
	
					dispatch(MASTEREdit(data))
					 
	}
}
