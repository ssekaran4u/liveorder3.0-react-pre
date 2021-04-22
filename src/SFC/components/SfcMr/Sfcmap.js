import React,{Component} from 'react'
import Map from './ShowMap';
import { withScriptjs } from "react-google-maps";
class Sfcmap extends Component{

    render(){
        const MapLoader = withScriptjs(Map);
        return(
            <MapLoader
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDDv6ZlRqW6ETcFPQWVe_hlKjjCKjsm6jY"
                loadingElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

export default Sfcmap