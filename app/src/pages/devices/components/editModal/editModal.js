import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import "./editModal.css";

class editModal extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { open } = this.state;

    return (
      <div>
        <Typography gutterBottom>
          Click to get the full Modal experience!
        </Typography>
        <Button onClick={this.handleOpen}>Open Modal</Button>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={this.handleClose}
        >
          <div className="paper">
            <Typography variant="h6" id="modal-title">
              Text in a modal
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </div>
        </Modal>
      </div>
    );
  }
}

export default editModal;
