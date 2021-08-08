import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@material-ui/core";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShopIcon from "@material-ui/icons/Shop";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { MyContext } from "../../MyContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import _ from "lodash";
export const SectionShoppingCart = (props) => {
  const { country, setCart } = useContext(MyContext);
  const [quantity, setQuantity] = useState(1);
  const { get, set } = useLocalStorage();
  const validateCountry = () => {
    let countryCode = get("country_code");
    if (countryCode) {
      return " " + countryCode;
    } else {
      return " " + country;
    }
  };
  const handleChangeQuantity = (event) => setQuantity(event.target.value);

  const handleAddToCart = () => {
    let getCart = get("cart");
    let cartLocalStorage = JSON.parse(getCart || "[]");
    if (getCart) {
      const repeatedProduct = cartLocalStorage.find(
        (product) => product.id === props.id
      );

      if (repeatedProduct) {
        repeatedProduct.quantity = repeatedProduct.quantity + quantity;
        let updateProduct = _.cloneDeep(repeatedProduct);
        let index = _.findIndex(cartLocalStorage, repeatedProduct);
        cartLocalStorage.splice(index, 1, updateProduct);
        set("cart", cartLocalStorage);
      } else {
        let copyProps = _.cloneDeep(props);
        let newProduct = { ...copyProps, ...{ quantity } };
        cartLocalStorage.push(newProduct);
        set("cart", cartLocalStorage);
        setCart(getCart.length);
      }
    } else {
      let copyProps = _.cloneDeep(props);
      let newProduct = { ...copyProps, ...{ quantity } };
      set("cart", [newProduct]);
      setCart(1);
    }
  };
  return (
    <Card>
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <FormControl>
              <InputLabel id="select-qty">Qty</InputLabel>
              <Select
                id="select-qty"
                onChange={handleChangeQuantity}
                value={quantity}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="default"
              style={{ display: "flex", width: "100%" }}
              onClick={handleAddToCart}
              endIcon={<ShoppingCartIcon />}
            >
              Add to Cart
            </Button>
          </Grid>
          <Grid item>
            <Tooltip title="no found">
              <Button
                variant="contained"
                color="default"
                style={{ display: "flex", width: "100%" }}
                endIcon={<ShopIcon />}
              >
                Buy Now
              </Button>
            </Tooltip>
          </Grid>
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              <LocationOnIcon fontSize="small" />
              Deliver to
              {validateCountry()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
