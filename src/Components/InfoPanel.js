import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: "0 auto",
    marginTop: 50,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  title: {
    color: "#3f51bf",
  },
}));

export default function InfoPanel() {
  const classes = useStyles();

  const [globalData, setGlobalData] = useState({});

  useEffect(() => {
    async function getData() {
      let res = await axios.get(
        `https://coronavirus-19-api.herokuapp.com/countries`
      );
      console.log(res.data[0]);
      delete res.data[0].country;
      delete res.data[0].totalTests;
      delete res.data[0].testsPerOneMillion;

      setGlobalData(res.data[0]);
    }

    getData();
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {Object.keys(globalData).map(function (key, index) {
          return (
            <Grid item xs={12} sm={4} key={index}>
              <Paper className={classes.paper} elevation={3}>
                <h3 className={classes.title}>{key}</h3>

                <h3>{globalData[key]}</h3>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
