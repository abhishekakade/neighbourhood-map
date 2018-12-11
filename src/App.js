import React, { Component } from 'react';
import "./App.css";
import Map from "./component/Map";
import SquareAPI from "./API"
import SideBar from './component/SideBar';
// import {  } from 'react-google-maps';
// import CurrentLocation from './Map';


class App extends Component {

  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      center: [],
      zoom: 12,
      updateSuperState: obj => {
        this.setState(obj);
      }
    }
  }

  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  }

  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });

    const venue = this.state.venues.find(venue => venue.id === marker.id);
    
    SquareAPI.getVenueDetails(marker.id)
    .then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
      console.log(newVenue);
    })
    .catch(err => console.error(err));
  }

  handleListItemClick = (venue) => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
    console.log(venue);
  }
  
  componentDidMount() {
    // const austin = "Austin, TX";
    SquareAPI.search({
      near: 'Austin, TX',
      query: 'tacos',
      limit: 10
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng:venue.location.lng,
          isOpen: false,
          isVisible: true,
          id: venue.id
        }
      });

      this.setState({ venues, center, markers })

      console.log(results)
    })
      .catch(err => console.error(err));
    // The error Im getting in paramas in cuz of white spaces in URL params like near, query, etc
  }

  render() {
    return (
      <div className="App">
        <SideBar {...this.state} handleListItemClick={this.handleListItemClick} />
        <Map {...this.state}
          handleMarkerClick={this.handleMarkerClick}
        />
      </div>
    );
  }
}

export default App;
