import React, { useMemo, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { getProductById } from "../../helper/getProductById";

import { Divider, Grid, Typography } from "@material-ui/core";
import { CardMediaCustom } from "../molecules/CardMediaCustom";
import { CardContentCustom } from "../molecules/CardContentCustom";
import { SectionShoppingCart } from "../organisms/SectionShoppingCart";
import { HoverRating } from "../organisms/HoverRating";
import currencyFormatter from "currency-formatter";
import { shortString } from "../../helper/shortString";
import { ButtonBack } from "../molecules/ButtonBack";
export const Detail = ({ history }) => {
  const { id } = useParams();
  const [slice, setSlice] = useState(true);
  const descriptionLimit = 250;
  const product = useMemo(() => getProductById(id), [id]);
  if (!product) {
    return <Redirect to="/" />;
  }
  const handleShowDescription = () => {
    setSlice(!slice);
  };

  const descriptionHardCode = `
  Powerful and portable

  Whether you're working on your latest project or just kicking back and streaming content, 
  the Acer Aspire 5 A515-55 15.6” Laptop delivers all the power you need. The 10th gen Intel® Core™ i5 processor 
  helps your apps load super fast, so you can multitask with ease.
  
  With a 512 GB SSD, you'll get a speedier, more reliable experience than you would with a regular hard drive. 
  Plus, there's plenty of room for your photos, music and files.
  
  Vibrant visuals
  
  The 15.6" Full HD screen delivers vibrant visuals with true-to-life colours. 
  And the super thin bezel won't distract you from your Netflix binging session.
  To complement the visuals, Acer TrueHarmony enhances your playlists - turn up the volume and work to 
  your favourite soundtrack.
  `;
  const description = (
    <>
      <HoverRating scord={product.scored} />
      <Divider />
      <p>{currencyFormatter.format(product.price, { code: "USD" })}</p>
      <Typography variant="overline">
        {slice
          ? shortString(descriptionHardCode, descriptionLimit)
          : descriptionHardCode}
      </Typography>
      <p onClick={handleShowDescription}>
        {slice ? "show more" : " show less"}
      </p>
    </>
  );

  const propsCardContenCustom = {
    title: product.title,
    description,
  };
  const propsCardMediaCustom = {
    alt: product.title,
    src: product.image,
    title: product.title,
    zoom: true,
  };

  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <Grid container direction="row" justify="center">
        <Grid
          item
          xs={12}
          lg={5}
          style={{
            maxHeight: "450px",
          }}
        >
          <CardMediaCustom {...propsCardMediaCustom} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <CardContentCustom {...propsCardContenCustom} />
        </Grid>
        <Grid item xs={12} lg={2}>
          <SectionShoppingCart {...product} />
        </Grid>
      </Grid>
      <ButtonBack history={history} />
    </Grid>
  );
};
