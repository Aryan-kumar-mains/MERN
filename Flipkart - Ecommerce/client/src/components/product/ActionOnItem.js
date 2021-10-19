import { Box, Button, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import {ShoppingCart as Cart, FlashOn as Flash} from '@material-ui/icons';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { addToCart } from "../../redux/actions/cartAction";

//  for payment
import { payUsingPaytm } from "../../service/api";  // api
import { post } from "../../utils/paytm";

const useStyle = makeStyles(theme=> ({
    leftContainer: {
        minWidth: '40%',
        padding: "40px 0 0 80px",
        [theme.breakpoints.down('md')]: {
            padding: "20px 0 0 40px",
        }
    },
    image: {
        padding: "15px 20px",
        border: "1px solid #f0f0f0",
        width:"95%"
    },
    button: {
        height: 50,
        width: "46%",
        borderRadius: 2
    },
    addToCart: {
        background: "#ff9f00",
        color: "#fff",
        marginRight: 10,
    },
    buyNow: {
        background: "#fb641b",
        color: "#fff"
    }
}));
const ActionOnItem = ({ product }) => {
    const classes = useStyle();
    const history = useHistory();

    const dispatch = useDispatch();

    const addItemToCart = () => {
        dispatch(addToCart(product.id));
      //  history.push("/cart"); // this is for opening a 'Cart' route when we click on 'Add to Cart' button, this works like a ' <Link to=""/> '
    }

    const buyNow = async() => {
        let response = await payUsingPaytm({amount: 500,email: "aryankumar21064@gmail.com"});
        
        let information = {
            action: "https://securegw-stage.paytm.in/order/process",
            params: response
        }
        post(information);
    }
    return (
        <Box className={classes.leftContainer}>
            <img src={product.detailUrl} className={classes.image}/><br/>
            <Button onClick={() => addItemToCart()} variant="contained" className={clsx(classes.button, classes.addToCart)}><Cart/>Add to Cart</Button>
            <Button onClick={() => buyNow()} className={clsx(classes.button, classes.buyNow)} variant="contained"><Flash /> Buy Now</Button>
        </Box>
    )
}

export default ActionOnItem;