import { makeStyles, Box } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

// components
import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";
import MidSection from "./MidSection";
// import { products } from "../../Constants/data";  comment this bcz i want it from mongoDB database
import { getProducts as listProducts } from "../../redux/actions/productActions";

const useStyle = makeStyles(theme =>({
    component: {
        padding: "10px",
        background: "#f2f2f2"
    },
    leftWrapper: {
        width: "83%",
        [theme.breakpoints.down('md')]: {
            width: "100%"
        }
    },
    rightWrapper: {
        background: "#ffffff",
        padding: "5px",
        margin: "12px 0 0 10px",
        width: "17%",
        [theme.breakpoints.down('md')]: {
            display: "none"
        }
    }
}));
const Home = () => {
    const classes = useStyle();
    const adURL = "https://rukminim1.flixcart.com/flap/464/708/image/dbbd63f34ca56c8a.jpg?q=70"

    const { products } = useSelector(state => state.getProducts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    return (
        <div>
            <NavBar />
            <Box className={classes.component} >
                <Banner />
                <Box style={{ display: "flex" }}>
                    <Box className={classes.leftWrapper}>
                        <Slide
                            timer={true}
                            title="Deal of The Day"
                            products = {products}
                        />
                    </Box>
                    <Box className={classes.rightWrapper}>
                        <img src={adURL} style={{ width: "230px" }} alt="ad" />
                    </Box>
                </Box>
                <MidSection/>
                <Slide
                    timer={false}
                    title="Top Deals"
                    products = {products}
                />
                <Slide
                    timer={false}
                    title="Bestsellers"
                    products = {products}
                />
                <Slide
                    timer={false}
                    title="Trending Offers"
                    products = {products}
                />
                <Slide
                    timer={false}
                    title="Discounts for You"
                    products = {products}
                />
                <Slide
                    timer={false}
                    title="Suggested Items"
                    products = {products}
                />
                <Slide
                    timer={false}
                    title="Top selection"
                    products = {products}
                />
                <Slide
                    timer={false}
                    title="Recommended Items"
                    products = {products}
                />
            </Box>
        </div>

    )
}

export default Home;