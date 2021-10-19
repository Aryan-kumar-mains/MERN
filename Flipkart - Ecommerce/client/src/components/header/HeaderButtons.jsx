import { Link } from "react-router-dom";
import { Box, Button, makeStyles, Typography, Badge, Dialog } from "@material-ui/core";
import { ShoppingCart } from '@material-ui/icons';
import { useState, useContext } from "react";

//Component
import LoginDialog from "../login/Login";
import { LoginContext } from "../../context/ContextProvider";
import Profile from "./Profile";
import { useSelector } from "react-redux";

const useStyle = makeStyles(theme => ({
    login: {
        background: "#ffffff",
        color: "#2874f0",
        textTransform: "none",
        fontWeight: 600,
        borderRadius: 2,
        padding: "5px 40px",
        height: 32,
        boxShadow: "none",
        [theme.breakpoints.down('sm')]: {
            backgroundColor: "#2874f0",
            color: "#ffffff",
        }
    },
    wrapper: {
        margin: "0 5% 0 auto",
        display: "flex",
        '& > *': { // this syntax used to add the style in all the child of the 'wrapper' class
            marginRight: 50,
            alignItems: "center",
            textDecoration: "none",
            color: "#ffffff",
            fontSize: 12,
            [theme.breakpoints.down('sm')]: {
                color: "#2874f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
            },
        },
        [theme.breakpoints.down('sm')]: {
            display: "block"
        }
    },
    container: {
        display: "flex",
        // [theme.breakpoints.down('sm')]: {
        //     display: "block"
        // }
    }
}));

const HeaderButtons = ({handleClose}) => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(LoginContext);

    const { cartItems } = useSelector(state => state.cart);

    function openLoginDialog() {
        setOpen(true);
    }
    return (
        <Box className={classes.wrapper}>
            {
                account ? <Profile account={account} setAccount={setAccount} /> :
                    <Link>
                        <Button variant="contained" className={classes.login} onClick={openLoginDialog}>Login</Button>
                    </Link>
            }
            <Link onClick={handleClose}><Typography style={{ marginTop: 5 }}>More</Typography></Link>
            <Link to="/cart" className={classes.container} onClick={handleClose}>
                <Badge badgeContent={cartItems.length} color="secondary"> {/* This is for the number which is written above the cart icon  that is called badge  */}
                    <ShoppingCart />  {/*this is for the The Cart Icon*/}
                </Badge>
                <Typography style={{ marginLeft: 10 }}>Cart</Typography>
            </Link>
            <LoginDialog open={open} setOpen={setOpen} setAccount={setAccount} />
        </Box>
    )
}

export default HeaderButtons;