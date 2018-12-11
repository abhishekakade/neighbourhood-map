import React, { Component } from "react";

export default class ListItem extends Component {
  render() {
    return (
      <li className="list-item" 
        onClick={() => this.props.handleListItemClick(this.props)}>
        
        <div className="main-holder">
          <div className="img-holder">
            <img src={this.props.categories[0].icon.prefix+"32"+this.props.categories[0].icon.suffix} 
              alt={this.props.categories[0].name} />
          </div>
          <div className="title-holder">
            {this.props.name}
          </div>
        </div>

      </li>
    )
  }
}