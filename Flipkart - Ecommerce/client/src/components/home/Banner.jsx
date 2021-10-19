import Carousel from "react-material-ui-carousel"
import { bannerData } from "../../Constants/data";
import { makeStyles } from "@material-ui/core";


const useStyle = makeStyles(theme => ({
    image: {
        width: "100%",
        height: 280,
        [theme.breakpoints.down('sm')]: {
            objectFit: "cover", // it zoom the image so that ki image fate nhi
            height: 180
        }
    },
    carousel:{
        marginTop: 10
    }
}));
const Banner = () => {
    const classes = useStyle();
    return (
        <Carousel
           autoPlay= {true}
           animation= "slide"
           indicators = {false}
           navButtonsAlwaysVisible = {true}
           cycleNavigation = {true}
           reverseEdgeAnimationDirection = {false}
           navButtonsProps = {{  // for styling the carousel control buttons
               style: {
                   background: "#ffffff",
                   color: "#494949",
                   borderRadius: 0,
                   margin: 0
               }
           }}
           className ={classes.carousel}
        >
             {
                bannerData.map(image => (
                    <img src={image} className={classes.image}/>
                ))
             }
        </Carousel>
    )
}


export default Banner;