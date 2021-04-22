/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

class Map extends Component {
    constructor(props){
        super(props)
       this.state={
        directions:'',
        from_lat:'',
        from_lng:'',
        to_lat:'',
        to_lng:''
       }
    }
 

  componentDidMount() {
      
      const from_lat = localStorage.getItem("fromlat");
      const from_lng = localStorage.getItem("fromlng");
      const to_lat = localStorage.getItem("tolat");
      const to_lng = localStorage.getItem("tolng");
    const directionsService = new google.maps.DirectionsService();

    const origin = { lat: parseFloat(from_lat), lng: parseFloat(from_lng) };
    const destination = { lat: parseFloat(to_lat), lng: parseFloat(to_lng) };
    
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, status) => { 
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          // console.error('error fetching directions ${result}');
        }
      }
    );
    this.setState({
        from_lat:from_lat,
        from_lng:from_lng,
        to_lat:to_lat,
        to_lng:to_lng
    })
  }

  render() { // console.log("this.state.directions",this.state.directions)
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        // defaultCenter={{ lat:this.state.from_lat, lng: this.state.from_lng }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={<div style={{ height: '500px', width: "500px" }} />}
          mapElement={<div style={{ height: '100%' }} />}
        />
      </div>
    );
  }
}

export default Map;
