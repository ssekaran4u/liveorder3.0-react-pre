import { ADD_TOKEN, SET_LOGIN_ERROR, DELETE_TOKEN,GET_OTP } from "./constants";
import { URL_LOGIN } from "../lib/constants";
import { postToServer, setCommToken } from "../lib/comm-utils";

export const addToken = token => {
    return {
        type: ADD_TOKEN,
        token
       
    };
};

export const setLoginError = message => {
    return {
        type: SET_LOGIN_ERROR,
        message
    };
};

export const deleteToken = () => {
    return {
        type: DELETE_TOKEN
    };
};
export const getOtp = (data) =>{
    return{
            type:GET_OTP,
            data
        }
    
}

export const Makelogin = data => {


   
    return dispatch => {
        dispatch( addToken(data));
    };
};




export const doLogin = data => {
    return dispatch => {
        postToServer(URL_LOGIN, data).then(function(resp) {
            if (resp.data.Status == "Success") {
                localStorage.setItem("type", resp.data.Dashtype)
                localStorage.setItem("KM", resp.data.KM)
                localStorage.setItem("loginUser", resp.data.loginUser)
                sessionStorage.setItem("type", resp.data.Dashtype)
                sessionStorage.setItem("KM",  resp.data.KM)
                sessionStorage.setItem("loginUser",  resp.data.loginUser)
                setCommToken(resp.data.Token);
                dispatch(addToken(resp.data.Token));
            } else {
                dispatch(setLoginError(resp.data.Status_Message));
            }
        });
    };
};

export const doWithOtpLogin = data => { 
    return dispatch => {
        postToServer(URL_LOGIN, data).then(function(resp) { 
            if (resp.data.Status == "Success") { 
                //setCommToken(resp.data.Token);
                dispatch(getOtp(resp.data.Result));
            } else {
                dispatch(setLoginError(resp.data.Status_Message));
            }
        });
    };
};

export const ErrorLogin = data => {
    return dispatch => {
        dispatch(setLoginError(data));
    };
};
