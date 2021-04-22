import { RPS_LIST } from "../constants";
import { URL_BASE, URL_RPSLIST } from "../../lib/constants";
import axios from "axios";
// import { URL_RPSLIST } from "../../lib/constants";
 import { postToServer } from '../../lib/comm-utils';

export const RPSList = (data) => {
	return {
		type:RPS_LIST,
		data
	}
}

export const getRPSList = (data,setloader) => {
    return (dispatch) => {
		postToServer(URL_RPSLIST,data)
		.then(function(resp) {
			console.log(resp, "resp")
			if (resp.data.Status=="Success") {
				dispatch(RPSList(resp.data.data))
				setloader('false')
			}
		});
	}
}

// function postToServer1(url, body={}) {
// 	const headers = {  'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', }
//    body = body
//    return axios.post(URL_BASE+url, body,headers)
// }