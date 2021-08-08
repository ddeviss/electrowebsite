import React, { useState } from "react";
import { CardMedia, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  zoomImg: {
    position: "relative",
    height: "100%",
    zIndex: 100,
    [theme.breakpoints.up("sm")]: {
      height: ({height}) => {
        const size = height? height : "auto"
        return size
      },
      transitionDuration: "0.5s",
      transform: "translate(200px,20px) scale(1.5,1.5)",
    },
  },
  transition: {
    height: "100%",
    [theme.breakpoints.up("sm")]: {
       height: ({height}) => {
        const size = height? height : "auto"
        return size
      },
      position: "relative",
      zIndex: 100,
      transitionDuration: "0.5s",
    },
  },
  normal:{
      height: ({height}) => {
        const size = height? height : "auto"
        return size
      },
  }
}));
export const CardMediaCustom = ({ alt, height = false, src, title, zoom = false }) => {
  const [hovered, setHovered] = useState(false);
  const classes = useStyles({height});
  const validate = () => {
    if (zoom & hovered) {
      return classes.zoomImg;
    } else if (zoom & !hovered) {
      return classes.transition;
    } else {
      return classes.normal;
    }
  };
  return (
    <CardMedia
      component="img"
      alt={alt}
      src={src}
      title={title}
      onMouseOut={() => setHovered(false)}
      onMouseOver={() => setHovered(true)}
      className={validate()}
    />
  );
};
