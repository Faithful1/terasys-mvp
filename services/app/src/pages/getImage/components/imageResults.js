import React, { Component } from "react";
import propTypes from "prop-types";
import {
  GridList,
  GridListTile,
  Dialog,
  IconButton,
  Button,
  Zoom
} from "@material-ui/core";

class ImageResults extends Component {
  state = {
    open: false,
    currentImg: ""
  };

  handleOpen = img => {
    this.setState({ open: true, currentImg: img });
  };

  handleClose = img => {
    this.setState({ open: false });
  };

  render() {
    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cols={3}>
          {images.map(img => (
            <GridListTile
              title={img.tags}
              key={img.id}
              subtitle={
                <span>
                  by <strong>{img.user}</strong>
                </span>
              }
              actionIcon={
                <IconButton onClick={() => this.handleOpen(img.largeImageURL)}>
                  <Zoom color="white" />
                </IconButton>
              }
            >
              <img src={img.largeImageURL} alt="" />
            </GridListTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
    }

    const actions = [
      <Button label="close" primary={true} onClick={this.handleClose} />
    ];

    return (
      <div>
        {imageListContent}
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <img src={this.state.currentImg} alt="" style={{ width: "100%" }} />
        </Dialog>
      </div>
    );
  }
}

// eslint-disable-next-line react/no-typos
ImageResults.propTypes = {
  images: propTypes.array.isRequired
};

export default ImageResults;
