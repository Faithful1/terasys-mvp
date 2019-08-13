import React, { Component } from "react";
import axios from "axios";

import { Grid } from "@material-ui/core";
import { ResponsiveContainer } from "recharts";
import {
    CircularProgress,
    Button,
    Select,
    FormHelperText,
    FormControl,
    InputLabel
} from "@material-ui/core";

import Widget from "../../components/Widget";
import PageTitle from "../../components/PageTitle";
import { Typography } from "../../components/Wrappers";

class Dashboard extends Component {
    state = {
        getApiUrl: "https://www.terasyshub.io/api/v1/devices/",
        devices: [],

        mac: "",
        metricsChoice: "",
        deviceData: [],
        isLoading: false,
        error: ""
    };

    searchHandler = e => {
        e.preventDefault();

        console.log(this.state);
    };

    onChangeHandler = e => {
        e.preventDefault();

        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state);
    };
    componentWillMount() {
        this._getDevices();
    }

    _getDevices() {
        axios
            .get(`${this.state.getApiUrl}`)
            .then(response => this.setState({ devices: response.data }))
            .catch(error => this.setState({ error: error.response.data }));
    }

    render() {
        const {
            devices,
            deviceData,
            mac,
            error,
            metricsChoice,
            isLoading
        } = this.state;

        return (
            <React.Fragment>
                <PageTitle title="Dashboard" />
                <Grid container spacing={32}>
                    <Grid item xs={12}>
                        <Widget
                            header={
                                <div>
                                    <Typography variant="h5" color="textSecondary">
                                        Search
                  </Typography>
                                </div>
                            }
                        >
                            {devices.map(device => (
                                <ResponsiveContainer
                                    key={device._id}
                                    width="100%"
                                    minWidth={500}
                                    height={250}
                                >
                                    <form>
                                        {error ? (
                                            <Typography color="secondary" className="errors">
                                                {error}
                                            </Typography>
                                        ) : null}

                                        <FormControl required>
                                            <InputLabel htmlFor="metric-native-required">
                                                Metric
                      </InputLabel>
                                            <Select
                                                native
                                                name="metricsChoice"
                                                value={metricsChoice}
                                                onChange={this.onChangeHandler}
                                                margin="dense"
                                                inputProps={{
                                                    id: "metric-native-required"
                                                }}
                                            >
                                                <option value="" />
                                                <option value="Temperature">Temperature</option>
                                                <option value="Humidity">Humidity</option>
                                            </Select>
                                            <FormHelperText>Select Metric</FormHelperText>
                                        </FormControl>

                                        <br />
                                        <br />

                                        <FormControl required>
                                            <InputLabel htmlFor="mac-native-required">
                                                Device
                      </InputLabel>
                                            <Select
                                                native
                                                onChange={this.onChangeHandler}
                                                margin="dense"
                                                inputProps={{
                                                    id: "mac-native-required"
                                                }}
                                            >
                                                <option value="" />
                                                <option value={device.name}>{device.name}</option>
                                            </Select>
                                            <FormHelperText>Select Device</FormHelperText>
                                        </FormControl>

                                        <br />
                                        <br />

                                        <div className="creatingButtonContainer">
                                            {isLoading ? (
                                                <CircularProgress size={26} />
                                            ) : (
                                                    <Button
                                                        type="submit"
                                                        size="large"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.searchHandler.bind(this, device.mac)}
                                                    >
                                                        Search Device
                        </Button>
                                                )}
                                        </div>
                                    </form>
                                </ResponsiveContainer>
                            ))}
                        </Widget>
                    </Grid>

                    {deviceData.map(info => (
                        <Grid key={info.id} item xs={12}>
                            <Widget
                                header={
                                    <div>
                                        <Typography variant="h5" color="textSecondary">
                                            Live Data From Device
                    </Typography>
                                    </div>
                                }
                            >
                                <ResponsiveContainer width="100%" minWidth={500} height={500}>
                                    <Typography>Devices</Typography>
                                </ResponsiveContainer>
                            </Widget>
                        </Grid>
                    ))}
                </Grid>
            </React.Fragment>
        );
    }
}

export default Dashboard;
