import React from "react";

class StatCard extends React.PureComponent {
  render () {
    return (
      <div className="stat-card-container">
        <div className="stat-card-box">
          <div className="stat-card-nudge" />
          <div className="stat-card-content">
            <div className="stat-card-signal">
              <p>-</p>
            </div>
            <div className="stat-card-value">
              <p>18</p>
            </div>
            <div className="stat-card-signal">
              <p>+</p>
            </div>
          </div>
          <div className="stat-card-division"/>
          <div className="stat-card-modifier">
            <p>+4</p>
          </div>
        </div>
      </div>
    )
  }
}

export default StatCard;
