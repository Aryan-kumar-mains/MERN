import { Card, Box, makeStyles, Typography, Button } from "@material-ui/core"
import clsx from "clsx";

//components
import ButtonForIncreasingQuantityOfItem from "./ButtonForIncreasingQuantityOfItem";

const useStyle = makeStyles({
    component: {
        display: "flex",
        borderRadius: 0,
        borderTop: "1px solid #f0f0f0"
    },
    leftComponent: {
        margin: 20,
        display: "flex",
        flexDirection: "column"
    },
    rightComponent: {
        margin: 20,
    },
    smallText: {
        fontSize : 14,
    },
    greyTextColor: {
        color: "#878787",
    },
    price: {
        fontSize: 18,
        fontWeight:600,
    },
    image: {
        height:110,
        width: 110
    },
    remove: {
        marginTop: 20,
        fontSize: 16
    }
})
const CartItem = ({ item, removeItemFromCart, counter, setCounter }) => {
    const classes = useStyle();
    const fassured = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"

    return (
        <Card className={classes.component}>
            <Box className={classes.leftComponent}>
                <img src={item.url} className={classes.image}/>
            <ButtonForIncreasingQuantityOfItem counter={counter} setCounter={setCounter}/>
            </Box>
            <Box className={classes.rightComponent}>
                <Typography>{item.title.longTitle}</Typography>
                <Typography className={clsx(classes.smallText, classes.greyTextColor)} style={{ marginTop: 10 }}>
                    Seller: SuperComNet
                    <img src={fassured} style={{width: 50, marginLeft: 10}}/>
                </Typography>
                <Typography style={{margin: "20px 0px"}}>
                    <span className={classes.price}>₹{item.price.cost}</span>&nbsp;&nbsp;&nbsp;
                    <span className={classes.greyTextColor}><strike>₹{item.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                    <span style={{color: "#388e3c"}}>{item.price.discount} Off</span>
                </Typography>
                <Button onClick={() => removeItemFromCart(item.id)} className={classes.remove}>Remove</Button>
            </Box>
        </Card>
    )
}

export default CartItem;