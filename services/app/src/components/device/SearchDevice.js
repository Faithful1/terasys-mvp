import React, { Component } from 'react';
import { TextField, SelectField, MenuItem } from 'material-ui';
import axios from 'axios';
import ImageResults from '../image-results/ImageResults';

class Search extends Component {
  state = {
    apiurl: 'https://pixabay.com/api',
    searchText: '',
    amount: 15,
    apikey: '12781134-861f9dac945eb526be64c896f',
    images: []
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        if (val === '') {
          this.setState({ images: [] });
        } else {
          axios
            .get(
              `${this.state.apiurl}/?key=${this.state.apikey}&q=${this.state.searchText}&image_type=photo&per_page=${this.state.amount}&safesearch=true`
            )
            .then(res => this.setState({ images: res.data.hits }))
            .catch(err => console.log(err));
        }
      }
    );
  };

  onAmountChange = (e, index, value) => {
    this.setState({
      amount: value
    });
  };

  render() {
    console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Search for Devices"
          fullWidth={true}
        />

        <br />

        <SelectField
          name="amount"
          floatingLabelText="Amount"
          value={this.state.amount}
          onChange={this.onAmountChange}
        >
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>

        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
