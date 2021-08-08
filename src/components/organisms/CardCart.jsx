import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {
  FormControl,
  Grid,
  Hidden,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  useMediaQuery,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router-dom";
import { shortString } from "../../helper/shortString";
import json2mq from "json2mq";
import _ from "lodash";
import currencyFormatter from "currency-formatter";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
  },

  cover: {
    minWidth: "18rem",
    minHeight: "1em",
  },
}));

export const CardCart = ({ cart, removeCart }) => {
  const classes = useStyles();
  const history = useHistory();
  const matches = useMediaQuery(
    json2mq({
      maxWidth: 518,
    })
  );
  const title = () => {
    if (matches) {
      return shortString(cart.title, 55);
    } else {
      return cart.title;
    }
  };
  const handlePushDetail = () => {
    history.push(`/product/${cart.id}`);
  };
  const arrayPropsQuantity = _.range(cart.quantity);

  return (
    <Card className={classes.root}>
      <Hidden smDown>
        <CardMedia
          className={classes.cover}
          image={cart.image}
          title={cart.title}
        />
      </Hidden>
      <CardContent>
        <Grid container direction="column">
          <Grid item container direction="row" justify="flex-end">
            <IconButton
              color="secondary"
              style={{ boxSizing: "content-box", padding: 3 }}
              onClick={() => removeCart(cart)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Typography component="p" variant="body1">
              <Link onClick={handlePushDetail}>{title()}</Link>
            </Typography>
          </Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <FormControl>
                <InputLabel id="select-qty">Qty</InputLabel>
                <Select id="select-qty" value={cart.quantity} disabled>
                  {arrayPropsQuantity.map((number) => {
                    number = number + 1;
                    return (
                      <MenuItem key={number} value={number}>
                        {number}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <Typography color="textSecondary">Price:</Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">
                {currencyFormatter.format(cart.price, { code: "USD" })}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <Typography color="textSecondary">Total:</Typography>
            </Grid>
            <Grid item>
              <Typography color="textSecondary">
                {currencyFormatter.format(cart.price * cart.quantity, {
                  code: "USD",
                })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
