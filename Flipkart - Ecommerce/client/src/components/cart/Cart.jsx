import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, makeStyles, Typography, Button, Grid } from "@material-ui/core"
import { removeFromCart } from "../../redux/actions/cartAction"

// Components
import CartItem from "./CartItem.jsx"
import EmptyCart from "./EmptyCart";
import TotalView from "./TotalView";

//  for payment
import { payUsingPaytm } from "../../service/api";  // api
import { post } from "../../utils/paytm";


const useStyle = makeStyles(theme => ({
    component: {
        marginTop: 55,
        display: "30px 135px",
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            padding: "15px 0"
        }
    },
    leftComponent: {
        // width: "67%",   there is no need bcz we are using grid
        [theme.breakpoints.down('sm')]: {
            marginBottom: "15px"
        }
    },
    header: {
        padding: "15px 24px",
        background: "#fff",
    },
    placeOrder: {
        background: "#fb641b",
        color: "#fff",
        borderRadius: "2px",
        width: 250,
        height: 50,
        display: "flex",
        marginLeft: "auto"
    },
    bottomBtn: {
        padding: "16px 22px",
        background: "#fff",
        borderTop: "1px",
        boxShadow: "0 -2px 10px 0 rgb(0 0 0 /10%)"
    }
}));
const Cart = () => {
    const classes = useStyle();
    const [counter, setCounter] = useState(1);

    const { cartItems } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(cartItems);
    })

    const removeItemFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: "aryankumar21064@gmail.com" });

        let information = {
            action: "https://securegw-stage.paytm.in/order/process",
            params: response
        }
        post(information);
    }

    return (
        <>
            {
                cartItems.length ?
                    <Grid container className={classes.component}>
                        <Grid item lg={9} md={9} sm={12} xs={12} className={classes.leftComponent}>
                            <Box className={classes.header}>
                                <Typography style={{ fontWeight: 600, fontSize: 18 }}>My Cart ({cartItems.length})</Typography>
                            </Box>
                            {
                                cartItems.map(item => (
                                    <CartItem
                                        item={item}
                                        removeItemFromCart={removeItemFromCart}
                                        counter={counter}
                                        setCounter={setCounter}
                                    />
                                ))
                            }
                            <Box className={classes.bottomBtn}>
                                <Button onClick={() => buyNow()} className={classes.placeOrder} variant="contained">Place Order</Button>
                            </Box>
                        </Grid>
                        {/* This is a right container */}
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TotalView cartItems={cartItems} counter={counter} />
                        </Grid>
                    </Grid>

                    : <EmptyCart />
            }
        </>
    )
}
export default Cart;