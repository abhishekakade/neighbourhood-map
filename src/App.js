import React, { Component } from 'react';
import "./App.css";
import Map from "./components/Map";
import SquareAPI from "./API"
import SideBar from './components/SideBar';
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

  // to close open markers  
  closeAllMarkers = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    })
    this.setState({ markers: Object.assign(this.state.markers, markers) });
  }

  // closes all open markers and opens the selected, gets details + images 
  handleMarkerClick = (marker) => {
    this.closeAllMarkers();
    marker.isOpen = true;
    this.setState({ markers: Object.assign(this.state.markers, marker) });

    const venue = this.state.venues.find(venue => venue.id === marker.id);
    
    SquareAPI.getVenueDetails(marker.id)
    .then(res => {
      const newVenue = Object.assign(venue, res.response.venue);
      this.setState({ venues: Object.assign(this.state.venues, newVenue) });
      // console.log(newVenue);
    })
    .catch(err => {
      alert(`An error occurred while trying to fetch data from the server: ${err}`)
    });
  }

  // opens infowindow for the clicked list item in map 
  handleListItemClick = (venue) => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.handleMarkerClick(marker);
    console.log(venue);
  }
  
  componentDidMount() {

    // to get rid of the default 8px body margin 
    document.body.style.margin = 0;
    
    // hardcoded URL parameters 
    SquareAPI.search({
      near: 'Mumbai, MH',
      query: 'coffee',
      limit: 10
    })
    .then(results => {
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

      // console.log(results)
    })
    .catch(err => {
      alert(`An error occurred while trying to fetch data from the server: ${err}`)
    });
    /* The error Im getting in params in cuz of white spaces (%20) in URL parameters like near, query, etc */ 
  }

  render() {
    return (
      <div className="App">
        
        <SideBar 
          {...this.state} 
          handleListItemClick={this.handleListItemClick} 
        />
        
        <Map 
          {...this.state}
          handleMarkerClick={this.handleMarkerClick}
        />

      </div>
    );
  }
}

export default App;
