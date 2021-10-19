import { Box, makeStyles, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyle = makeStyles(theme=> ({
    component: {
        // width: "30%",       there is no need bcz we are using grid
        background: "#fff",
        marginLeft: 15,
    },
    header: {
        padding: "16px 24px",
        borderBottom: "1px solid #f0f0f0",
    },
    container: {
        padding: "15px 24px",
        "& > *": {
            marginTop: 20,
            fontSize: 14
        }
    },
    greTextColor: {
        color: "#878787",
    },
    price: {
        float: "right",
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 600,
        borderTop: "1px dashed #e0e0e0",
        padding: "20px 0",
        borderBottom: "1px dashed #e0e0e0",
    }
}));
const TotalView = ({ cartItems, counter }) => {
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    
    useEffect(() => {
        totalAmount();
    }, [cartItems])

    const totalAmount = () => {
        let price = 0, discount = 0; // if u didn't initialize it then NaN(i.e Not a Number) will come
        cartItems.map(item => {
            price += item.price.mrp * counter;
            discount += (item.price.mrp*counter - item.price.cost)
        });
        setPrice(price);
        setDiscount(discount);
    }
    const classes = useStyle();
    return(
        <Box className={classes.component}>
            <Box className={classes.header}>
                <Typography className={classes.greTextColor}>PRICE DETAILS</Typography>
            </Box>
            <Box className={classes.container}>
                <Typography>Price ({cartItems.length} item) <span className={classes.price}>₹{price}</span></Typography>
                <Typography>Discount <span className={classes.price}>-₹{discount}</span></Typography>
                <Typography>Delivery<span className={classes.price}>₹40</span></Typography>
                <Typography  className={classes.totalAmount}>Total Amount<span className={classes.price}>₹{price - discount + 40}</span></Typography>
                <Typography style={{color: "green"}}>You will save ₹{discount - 40} on this Order</Typography>
            </Box>
        </Box>
    )
}

export default TotalView;