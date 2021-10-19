import { Box, makeStyles,Grid, Table, TableBody, TableRow, TableCell, Typography } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import clsx from "clsx" // this is for adding two classes in same element
import { LocalOffer as Badge } from '@material-ui/icons'; // for the offer badge

import { getProductDetails } from "../../redux/actions/productActions";

// component
import ActionOnItem from "./ActionOnItem";

const useStyle = makeStyles(theme=> ({
    component: {
        marginTop: 55,
        background: "#f2f2f2",
    },
    container: {
        width: "86%",
        margin: "0 auto",
        background: "#fff",
        display: "flex",
        [theme.breakpoints.down('md')]: {
            margin: 0,
            width: "100%",
        }
    },
    rightContainer: {
        marginTop: 50,
        "& > *": {
            marginTop: 10
        },
    },
    smallText: {
        fontSize: 14,
        verticalAlign: "baseline", // due to this text(e.g Seller) starting from start(i.e top)
        "& > *": {
            fontSize: 14,
            marginTop: 10
        }
    },
    greyTextColor: {
        color: "#878787"
    },
    price: {
        fontSize: 28,
    },
    badge: {
        fontSize: 14,
        marginRight: 10,
        color: "#00cc00"
    }
}));

const DetailView = ({ match }) => {
    const classes = useStyle();
    const fassured = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png"
    const sellerUrl = "https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50"

    const { product } = useSelector(state => state.getProductDetails);

    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getProductDetails(match.params.id));
    }, [dispatch])
    return (
        <Box className={classes.component}>
            {/*Note In react 'return' statement calls first, then 'useEffect' call that's why 'product.title' is undefined so below 'Box' will run only if 'product' have some data */}
            {product && Object.keys(product).length &&
                <Grid container className={classes.container}>
                    <Grid item lg={4} md={4} sm={8} xs={12}> 
                        <ActionOnItem product={product}/>
                    </Grid>
                    <Grid item lg={8} md={8} sm={8} xs={12} className={classes.rightContainer} >
                        <Typography style={{lineHeight: 1.4, color: "#212121"}}>{product.title.longTitle}</Typography>
                        {/* In React, we can'nt add two classes, so for doing this install 'clsx' */}
                        <Typography className={clsx(classes.smallText, classes.greyTextColor)}>
                            8 Ratings & 1 Review
                            <span><img src={fassured} style={{ width: 77, marginLeft: 20 }}></img></span>
                        </Typography>
                        <Typography>
                            <span className={classes.price}>₹{product.price.cost}</span> &nbsp;&nbsp;&nbsp;  {/* '&nbsp;' is for spacing  */}
                            <span className={classes.greyTextColor}><strike>₹{product.price.mrp}</strike></span> &nbsp;&nbsp;&nbsp;
                            <span style={{ color: "#388e3c" }}>{product.price.discount}Off</span> &nbsp;&nbsp;&nbsp;
                        </Typography>
                        
                        {/* product Details  */}
                        <Typography style={{marginTop: 20, fontWeight: 600}}>Available Offers</Typography>
                        <Box className={classes.smallText} >
                            <Typography><Badge className={classes.badge} />Special PriceGet extra 10% off (price inclusive of discount)</Typography>
                            <Typography><Badge className={classes.badge} />Bank OfferFlat INR 100 Instant Cashback on Paytm Wallet. Min Order Value ₹1000. Valid once per Paytm account</Typography>
                            <Typography><Badge className={classes.badge} />Bank Offer5% Unlimited Cashback on Flipkart Axis Bank Credit Card</Typography>
                            <Typography><Badge className={classes.badge} />Bank Offer20% off on 1st txn with Amex Network Cards issued by ICICI Bank,IndusInd Bank,SBI Cards and Mobikwik</Typography>
                        </Box>

                        <Table>
                            <TableBody>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyTextColor}>Delivery</TableCell>
                                    <TableCell style={{fontWeight: 600}} >Delivery by {date.toDateString()} | ₹40</TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyTextColor}>Warranty</TableCell>
                                    <TableCell>No Warranty</TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyTextColor}>Seller</TableCell>
                                    <TableCell className={classes.smallText}>
                                        <span style={{color: "#2874f0"}}>SuperComNet</span>
                                        <Typography>GST invoice Available</Typography>
                                        <Typography>14 Days Return Policy</Typography>
                                        <Typography>View more Sellers starting from ₹3000</Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell colSpan={2}>
                                        <img src={sellerUrl} style={{width: 300}}/>
                                    </TableCell>
                                </TableRow>
                                <TableRow className={classes.smallText}>
                                    <TableCell className={classes.greyTextColor}>Description</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            }
        </Box>
    )
}


export default DetailView;