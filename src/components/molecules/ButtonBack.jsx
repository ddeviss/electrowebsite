import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Fab, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  buttonBack: {
    position: "fixed",
    bottom: 30,
    right: 20,
    [theme.breakpoints.up("lg")]: {
      bottom: 50,
      right: 60,
    },
  },
}));
export const ButtonBack = ({ history }) => {
  const classes = useStyles();
  const handleBack = () => {
    console.log({ history });
    if (history.length <= 2) {
      history.push("/");
    } else {
      history.goBack();
    }
  };
  return (
    <Fab
      size="medium"
      color="primary"
      className={classes.buttonBack}
      aria-label="add"
      onClick={handleBack}
    >
      <ArrowBackIcon />
    </Fab>
  );
};
