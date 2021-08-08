import React, { useContext } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import LinkMaterialUI from "@material-ui/core/Link";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import GitHubIcon from "@material-ui/icons/GitHub";
import MoreIcon from "@material-ui/icons/MoreVert";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { MyContext } from "../../MyContext";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    flexGrow: 1,
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.05),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.08),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  countryCode: {
    margin: "0px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "10px",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export const Navbar = ({ search }) => {
  const classes = useStyles();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { country, cart } = useContext(MyContext);
  const { get } = useLocalStorage();
  const handlePushCart = () => {
    history.push(`/cart`);
  };
  const handlePushProduct = () => {
    history.push(`/`);
  };
  const validateCountry = () => {
    let countryCode = get("country_code");
    if (countryCode) {
      return countryCode;
    } else {
      return country;
    }
  };
  const handleValidatedCartQuantity = () => {
    let getCart = get("cart");
    if (getCart) {
      let cartLocalStorage = JSON.parse(getCart || "[]");
      return cartLocalStorage.length;
    }
    return cart;
  };
  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => handlePushCart()}>
        <IconButton
          onClick={() => handlePushCart()}
          aria-label="show 4 new mails"
          color="inherit"
        >
          <Badge badgeContent={handleValidatedCartQuantity()} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Carrito</p>
      </MenuItem>
      <MenuItem>
        <LinkMaterialUI
          component={IconButton}
          color="inherit"
          target="_blank"
          href="https://github.com/senixcode/lightweight-ecommerce-template"
        >
          <GitHubIcon />
        </LinkMaterialUI>
        <p>Source code</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <Typography
            onClick={handlePushProduct}
            className={classes.title}
            variant="h6"
            noWrap
          >
            Electro - Your solution in computing
          </Typography>
          <div className={classes.grow} />
          <Typography className={classes.countryCode} variant="body1">
            {validateCountry()}
          </Typography>
          <div className={classes.search} onClick={handlePushProduct}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              value={search}
              readOnly
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <LinkMaterialUI
              component={IconButton}
              color="inherit"
              target="_blank"
              href="https://github.com/senixcode/lightweight-ecommerce-template"
            >
              <GitHubIcon />
            </LinkMaterialUI>
            <IconButton
              onClick={() => handlePushCart()}
              aria-label="shopping cart"
              color="inherit"
            >
              <Badge
                badgeContent={handleValidatedCartQuantity()}
                color="secondary"
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};
