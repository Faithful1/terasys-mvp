import React, { Component } from "react";
import { InputLabel, TextField, Select, MenuItem } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";

import axios from "axios";
import ImageResults from "./components/imageResults";

class SearchImage extends Component {
  state = {
    apiurl: "https://pixabay.com/api",
    searchText: "",
    amount: 15,
    apikey: "12781134-861f9dac945eb526be64c896f",
    images: []
  };

  onTextChange = e => {
    const val = e.target.value;
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        if (val === "") {
          this.setState({ images: [] });
        } else {
          axios
            .get(
              `${this.state.apiurl}/?key=${this.state.apikey}&q=${
                this.state.searchText
              }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
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
    const { searchText, amount } = this.state;
    return (
      <React.Fragment>
        <PageTitle title="All Images" />

        <TextField
          name="searchText"
          value={searchText}
          onChange={this.onTextChange}
          fullWidth={true}
        />

        <br />
        <InputLabel htmlFor="demo-controlled-open-select" />

        <Select name="amount" value={amount} onChange={this.onAmountChange}>
          <MenuItem>
            <em>None</em>
          </MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
        </Select>

        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default SearchImage;
