import React, { Component } from 'react';
import { TextField } from 'material-ui';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class PostDeviceForm extends Component {
  state = {
    apiurl: 'https://jsonplaceholder.typicode.com/posts',
    userId: '',
    title: '',
    body: ''
  };

  changeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
    axios
      .post(`${this.state.apiurl}`, this.state)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { userId, title, body } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <div>
            <TextField
              name="userId"
              value={userId}
              onChange={this.changeHandler}
              placeholder="User Id"
              margin="normal"
            />
          </div>

          <div>
            <TextField
              name="title"
              value={title}
              onChange={this.changeHandler}
              placeholder="title"
              margin="normal"
            />
          </div>

          <div>
            <TextField
              name="body"
              value={body}
              onChange={this.changeHandler}
              placeholder="body"
              margin="normal"
            />
          </div>

          <div>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default PostDeviceForm;
