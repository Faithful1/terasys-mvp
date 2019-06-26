import React, { Component } from "react";
import propTypes from "prop-types";
import { GridList, GridListTile } from "@material-ui/core";

class DeviceResults extends Component {
  render() {
    let deviceListContent;
    const { devices } = this.props;

    if (devices) {
      deviceListContent = (
        <GridList cols={3}>
          {devices.map(device => (
            <GridListTile
              title={device.name}
              key={device.id}
              subtitle={
                <span>
                  by <strong>{device.description}</strong>
                </span>
              }
            />
          ))}
        </GridList>
      );
    } else {
      deviceListContent = null;
    }

    return <div>{deviceListContent}</div>;
  }
}

// eslint-disable-next-line react/no-typos
DeviceResults.propTypes = {
  devices: propTypes.array.isRequired
};

export default DeviceResults;
