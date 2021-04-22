import axios,{ post } from 'axios'
import { URL_BASE, SFA_TOKEN } from './constants'
//import FileSaver from 'FileSaver'

let token = false

export function setCommToken(tkn) {
    token = tkn
    sessionStorage.setItem(SFA_TOKEN, tkn)
    localStorage.setItem(SFA_TOKEN, tkn)
}

export function deleteCommToken(tkn) {
    token = false
    sessionStorage.clear();
    localStorage.clear();
}

export function getCommToken() {
    if (token)
        return token
    let tkn = sessionStorage.getItem(SFA_TOKEN)
    if (tkn)
        token = tkn
    
    //tkn=localStorage.getItem(SFA_TOKEN)
    token = tkn
    return token
}

export function postToServer(url, body={}) {

if(token==null  || token  ==false){
    token= localStorage.getItem("SFA_TOKEN")
}
//    console.log(token,'klkl',localStorage.getItem("SFA_TOKEN"))
     const headers = {  'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', }
    body = token ? {...body, Token:token} : body
     //axios.defaults.headers.common['Content-Type'] = 'application/json'
//      axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*'
//      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
//     // axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*'
//     //"Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization") //自定义 Header
//    axios.defaults.headers.post['Authorization'] = `${token ==null ? "login":token}`;
//     // axios.defaults.headers.option['Authorization'] = `${token}`;
axios.defaults.headers.common['Accept'] = 'application/json, text/plain, image/jpeg,*/*'
// axios.defaults.headers.common.accept = 'application/json'
// if (token) {
   axios.defaults.headers.post['Authorization'] = `${token}`;
    return axios.post(URL_BASE+url, body)
}

export function getFromServer(url, body={}) {
    body = token ? {...body, Token:token} : body
    return axios.get(URL_BASE+url, body)
}



export function getdownload(url, menuid) {

    axios({
        url: URL_BASE + url + '/' + menuid + '/' + token,

        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {

 

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', 'newfile.xlx');
        document.body.appendChild(link);
        link.click();
        //  FileSaver.saveAs(new Blob([response.data]));
    }).catch((Error) => {
        swal("No file exists")
    })
}


export function fileUpload(url,formData){
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(URL_BASE+url, formData,config)
  }
export function tick() {
        let hour =  new Date().getHours();
        let TimeType;
        if(hour <= 11){ 
            TimeType = 'AM';
        }
        else{
            TimeType = 'PM';
        }
        if( hour > 12 ){
            hour = hour - 12;
        }
        return  TimeType
    }

export function convert(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
}


export function Encerypt(datakey) {

  

    return axios.post('https://cors-anywhere.herokuapp.com/http://13.71.49.74:84/EDService.asmx/EDData',
         { compID: 's360demo', UserID: '1', Password: '1', Index: '1', data: datakey },
         {
             headers:
             {
                 "dataType": "json",
                 "contentType": "application/json;charset=utf-8",
                 "async": false,
                 "crossOrigin": true,
             }
         })
 }
export function getDownloadFile(url,image){
    axios({
        url: url,
    
        method: 'GET',
        responseType: 'blob', // important
    }).then((response) => {
    
    
    
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
    
        link.setAttribute('download', image);
        document.body.appendChild(link);
        link.click();
        //  FileSaver.saveAs(new Blob([response.data]));
    }).catch((Error) => {
        swal("No file exists")
    })
}
 


export function POStDownloadFile(url,data,filename){
    const headers = {  'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json', }
   
    axios({
        url: url,
    
        method: 'POST',
        responseType: 'blob', // important
    },data,headers).then((response) => {
    
    
    
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
    
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        //  FileSaver.saveAs(new Blob([response.data]));
    }).catch((Error) => {
        console.log(Error,'Error')
        swal("No file exists")
    })
}
 