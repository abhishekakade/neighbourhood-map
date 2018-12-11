import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

/* DONT delete the comment below! */
/* global google */

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10} 
    zoom={props.zoom} 
    // Mumbai lat lng 
    defaultCenter={{ lat: 19.0760, lng: 72.8777 }} 
    // center={ props.center } 
    center={{lat: 19.0760, lng: 72.8777}} 
  >
    {props.markers && props.markers
      .filter(marker => marker.isVisible)
      .map((marker, index, arr) => {

        const venueInfo = props.venues.find(venue => venue.id === marker.id);
        // console.log(venueInfo.bestPhoto);

        return (
          <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => props.handleMarkerClick(marker)} 
            animation={ arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP } >

            {venueInfo.bestPhoto && marker.isOpen && (
              <InfoWindow>
                <React.Fragment>
                  <img src={`${venueInfo.bestPhoto.prefix}150x150${venueInfo.bestPhoto.suffix}`}
                    alt={"Venue"} />
                  <p>{venueInfo.name}</p>
                </React.Fragment>
              </InfoWindow>
            )}
          </Marker>
        )
      })}
  </GoogleMap>
));


export default class Map extends Component {
  render() {
    return (
      <MyMapComponent
        // isMarkerShown
        { ...this.props }
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBVMy4aEQN-DCE-yrRTof1xoxewMuvGEto"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%`, width: `75%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}