import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useHistory } from "react-router-dom";
import { CardContentCustom } from "../molecules/CardContentCustom";
import { shortString } from "../../helper/shortString";
import { CardMediaCustom } from "../molecules/CardMediaCustom";
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles({
  root: {
       width:"300px",
        minWidth:"250px",
  },
});
export const CardProduct = (props) => {
  let history = useHistory();
  let title = shortString(props.title);

  const propsCardMediaCustom = {
    alt: props.title,
    height: "250px",
    src: props.image,
    title: props.title,
  };
  const handlePushDetail = (id) => {
    history.push(`/product/${id}`);
  };
   const classes = useStyles();
  return (
    <Card onClick={() => handlePushDetail(props.id)} elevation={0} className={classes.root}>
      <CardActionArea>
        <CardMediaCustom {...propsCardMediaCustom} />
        <CardContentCustom title={title} />
      </CardActionArea>
    </Card>
  );
};
