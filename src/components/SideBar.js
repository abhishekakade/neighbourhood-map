import React, { Component } from "react";
import VenueList from "./VenueList";
import Footer from "./Footer";

export default class SideBar extends Component {

  constructor() {
    super();
    this.state = {
      query: "",
      venues: []
    };
  }

  handleFilterVenues = () => {
    if(this.state.query.trim() !== "") {
      const venues = this.props.venues.filter(venue => 
        venue.name.toLowerCase().includes(this.state.query.toLowerCase())
      );

      return venues;
    }

    else {
      return this.props.venues;
    }

  }

  handleChange = (e) => {
    this.setState({ query: e.target.value });
    const markers = this.props.venues.map(venue => {
      const isMatched = venue.name.toLowerCase().includes(e.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);

      if(isMatched) {
        marker.isVisible = true;
      }
      else {
        marker.isVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers })
  };

  render() {
    return (
      <div className="side-bar">
        <h2 className="taco-header">10 Hottest Coffee Shops in Mumbai</h2>
        <input type={"search"} id={"search"} 
          placeholder={"Search for Venues..."} onChange={this.handleChange} />
        <VenueList 
          {...this.props} 
          venues={this.handleFilterVenues()}
          handleListItemClick={this.props.handleListItemClick} 
        />
        <Footer />
      </div>
    );
  }
}