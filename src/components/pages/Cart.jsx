import React, { useState, useContext } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { CardCart } from "../organisms/CardCart";
import { SectionBuy } from "../organisms/SectionBuy";
import _ from "lodash";
import { ButtonBack } from "../molecules/ButtonBack";
import { MyContext } from "../../MyContext";
export const Cart = ({ history }) => {
  const { get, set } = useLocalStorage();
  const { setCart } = useContext(MyContext);
  let getCart = () => get("cart");
  let serializeCart = () => JSON.parse(get("cart") || []);
  const [carts, setCarts] = useState(getCart() ? serializeCart() : []);
  const removeCart = (item) => {
    let cloneCarts = _.cloneDeep(carts);
    _.remove(cloneCarts, (cart) => cart.id === item.id);
    set("cart", cloneCarts);
    setCarts(cloneCarts);
    setCart(cloneCarts.length);
  };
  const sumTotal =
    carts.length > 0
      ? carts.reduce((sum, { price, quantity }) => sum + price * quantity, 0)
      : 0;
  return (
    <Container fixed>
      <Grid container direction="column" spacing={1}>
        <Typography variant="h4">Shopping Cart</Typography>

        <Grid item container direction="row" spacing={1}>
          <Grid item container direction="column" spacing={0} xs={12} md={10}>
            {carts.length > 0 &&
              carts.map((cart) => (
                <Grid
                  item
                  key={cart.id}
                  xs={12}
                  style={{ marginBottom: "8px" }}
                >
                  <CardCart cart={cart} removeCart={removeCart} />
                </Grid>
              ))}
          </Grid>
          <Grid item xs={12} md={2}>
            <SectionBuy sumTotal={sumTotal} />
          </Grid>
        </Grid>
      </Grid>

      <ButtonBack history={history} />
    </Container>
  );
};
