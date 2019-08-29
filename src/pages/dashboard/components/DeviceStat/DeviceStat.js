import React from "react";

import { Grid, withStyles } from "@material-ui/core";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";

const DeviceStat = ({ classes, theme, ...props }) => {
  return (
    <Grid container spacing={32}>
      <Grid item xs={12}>
        <Widget
          bodyClass={classes.mainChartBody}
          header={
            <div className={classes.mainChartHeader}>
              <Typography variant="h5" color="textSecondary">
                View Live Data
              </Typography>
            </div>
          }
        >
          <ResponsiveContainer width="100%" minWidth={500} height={350}>
            <LineChart
              width={500}
              height={300}
              data={props.TemperatureContent}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis
                domain={[0, "dataMax"]}
                ticks={[0, 5, 10, 15, 20, 25, 30, 35, 40]}
              />
              <Tooltip />
              <Legend />
              <Line
                name="Temperature"
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <br />
          <br />
          <br />
          <br />
          <ResponsiveContainer width="100%" minWidth={500} height={350}>
            <LineChart
              width={500}
              height={300}
              data={props.HumidityContent}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]} />
              <Tooltip />
              <Legend />
              <Line
                name="Humidity"
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
              />
            </LineChart>
          </ResponsiveContainer>
        </Widget>
      </Grid>
    </Grid>
  );
};

const styles = theme => ({
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column"
  },
  temperatureColor: {
    backgroundColor: "#8884d8"
  },
  humidityColor: {
    backgroundColor: "#82ca9d"
  },
  visitsNumberContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: theme.spacing.unit
  },
  progressSection: {
    marginBottom: theme.spacing.unit
  },
  progressTitle: {
    marginBottom: theme.spacing.unit * 2
  },
  progress: {
    marginBottom: theme.spacing.unit,
    backgroundColor: theme.palette.primary.main
  },
  pieChartLegendWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: theme.spacing.unit
  },
  legendItemContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing.unit
  },
  fullHeightBody: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  tableWidget: {
    overflowX: "auto"
  },
  progressBar: {
    backgroundColor: theme.palette.warning.main
  },
  performanceLegendWrapper: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    marginBottom: theme.spacing.unit
  },
  legendElement: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing.unit * 2
  },
  legendElementText: {
    marginLeft: theme.spacing.unit
  },
  serverOverviewElement: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%"
  },
  serverOverviewElementText: {
    minWidth: 145,
    paddingRight: theme.spacing.unit * 2
  },
  serverOverviewElementChartWrapper: {
    width: "100%"
  },
  mainChartBody: {
    overflowX: "auto"
  },
  mainChartHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap"
    }
  },
  mainChartHeaderLabels: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      order: 3,
      width: "100%",
      justifyContent: "center",
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 2
    }
  },
  mainChartHeaderLabel: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing.unit * 3
  },
  mainChartSelectRoot: {
    borderColor: theme.palette.text.hint + "80 !important"
  },
  mainChartSelect: {
    padding: 10,
    paddingRight: 25
  },
  mainChartLegentElement: {
    fontSize: "18px !important",
    marginLeft: theme.spacing.unit
  }
});

export default withStyles(styles, { withTheme: true })(DeviceStat);
