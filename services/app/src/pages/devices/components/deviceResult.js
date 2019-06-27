import React, { Component } from "react";
import propTypes from "prop-types";
import { GridList, GridListTile } from "@material-ui/core";

class DeviceResults extends Component {
  render() {
    let deviceListContent;
    const { devices } = this.props;

    if (devices) {
      deviceListContent = (
        <div>
          {devices.map(device => (
            <p key={device._id}>{device.name}</p>
          ))}
        </div>
        // <GridList cols={3}>
        //   {devices.map(device => (
        //     <GridListTile
        //       title={device.name}
        //       key={device._id}
        //       subtitle={
        //         <span>
        //           by <strong>{device.description}</strong>
        //         </span>
        //       }
        //     />
        //   ))}
        // </GridList>
      );
    } else {
      deviceListContent = null;
    }

    return <div>{deviceListContent}</div>;
  }
}

DeviceResults.propTypes = {
  devices: propTypes.array.isRequired
};

export default DeviceResults;
