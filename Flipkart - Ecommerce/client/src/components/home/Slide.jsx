import React from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import { makeStyles, Box, Typography, Button, Divider } from "@material-ui/core";
import Countdown from 'react-countdown';
import { Link } from "react-router-dom";
// components
// import { products } from "../../Constants/data";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
        slidesToSlide: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
};

const useStyle = makeStyles(theme => ({
    component: {
        marginTop: 12,
        background: "#ffffff",
    },
    deal: {
        padding: "15px 20px",
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            position: "relative",
        }
    },
    dealText: {
        fontSize: 22,
        fontWeight: 600,
        lineHeight: "32px",
        marginRight: 25,
        [theme.breakpoints.down('sm')]: {
            marginRight: 15,
            fontSize: 18
        }
    },
    timer: {
        color: "#7f7f7f",
        marginLeft: 10,
        display: "flex",
        alignItems: "center",
    },
    button: {
        marginLeft: "auto",
        background: "#2874f0",
        borderRadius: 2,
        fontSize: 13
    },
    wrapper: {
        padding: "35px 15px"
    },
    image: {
        height: 150,
        width: 127,
        margin: "0px "
    },
    productText: {
        fontSize: 14,
        marginTop: 5
    },
    timerContainer: {
        display: "flex",
        [theme.breakpoints.down('sm')]: {
            position: "absolute",
            bottom: 0
        }
    }
}));

const Slide = ({ timer, title, products }) => {
    const classes = useStyle();
    const timeUrl = "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg"

    const renderer = ({ hours, minutes, seconds }) => {
        // Render a countdown
        return <span className={classes.timer}>{hours} : {minutes} : {seconds} Left</span>;
    };

    return (
        <Box className={classes.component}>
            <Box className={classes.deal}>
                <Typography className={classes.dealText}>{title}</Typography>
                {
                    timer &&
                    <Box className={classes.timerContainer}>
                        <img style={{width: 24}} src={timeUrl} alt="timer" />
                        <Countdown
                            date={Date.now() + 8.64e+7}
                            renderer={renderer}
                        />
                    </Box>
                }
                <Button className={classes.button} variant="contained" color="primary">View All</Button>
            </Box>
            <Divider />
            <Carousel
                responsive={responsive}
                keyBoardControl={true}
                swipeable={true}
                centerMode={true}
                // removeArrowOnDeviceType={["tablet", "mobile"]}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
                containerClass="carousel-container"
            >
                {
                    products.map(product => (
                         <Link to={ `product/${product.id}`} style={{textDecoration: "none"}} > 
                            <Box textAlign="center" className={classes.wrapper} >
                                <img className={classes.image} src={product.url} />
                                <Typography className={classes.productText} style={{ fontWeight: "600px", color: "#212121" }} >{product.title.shortTitle}</Typography>
                                <Typography className={classes.productText} style={{ color: "green" }} >{product.discount}</Typography>
                                <Typography className={classes.productText} style={{ color: "#212121", opacity: ".6" }} >{product.tagline}</Typography>
                            </Box>
                        </Link> 
                    ))
                }
            </Carousel>
        </Box>
    )
}

export default Slide;