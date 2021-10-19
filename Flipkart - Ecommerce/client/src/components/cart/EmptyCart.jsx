import { Box, makeStyles, Typography, Button } from "@material-ui/core";
import { useHistory } from "react-router";

const useStyle = makeStyles(theme=> ({
    component: {
        margin: " 80px 140px",
        width: "80%",
        background: "#fff",
        height: "65vh",
        [theme.breakpoints.down('md')]: {
            margin: "0 auto",
        }
    },
    image: {
        width: "15%",
    },
    container: {
        textAlign: "center",
        paddingTop: 70,
        "& > *": {
            fontSize: 14,
            marginTop: 10
        },
    },
    button: {
        marginTop: 20,
        padding: "12px 70px",
        borderRadius: 2,
        fontSize: 14,
        background: "#2874f0",
        color: "#fff",
    }
}));

const EmptyCart = () => {
    const classes = useStyle();
    const emptyCartURL = "https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
    const history = useHistory();

    const addItem = () => {
        history.push("/");
    }

    return (
        <Box className={classes.component}>
            <Box className={classes.container}>
                <img className={classes.image} src={emptyCartURL} />
                <Typography>Your Cart is Empty</Typography>
                <Typography>Add items to it now.</Typography>
                <Button onClick={() => addItem()} className={classes.button} variant="contained">Shop Now</Button>
            </Box>
        </Box>
    )
}


export default EmptyCart;