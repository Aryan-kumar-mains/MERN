import { Link } from "react-router-dom";
import { AppBar, Toolbar, makeStyles, Typography, Box, withStyles, IconButton, Drawer, List, ListItem } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

// Components
import SearchBar from "./SearchBar";
import HeaderButtons from "./HeaderButtons";
import { useState } from "react";

const useStyle = makeStyles(theme=> ({
    header: { // for that blue background
        background: "#2874f0",
        height: 55
    },
    component: {
        marginLeft: "12%",
        lineHeight: 0,
        color: "#ffffff",
        textDecoration: "none"
    },
    logo: {  // for that flipkart logo
        width: 75
    },
    subHeading: {
        fontSize: 10,
        fontStyle: "italic"
    },
    subURL: {  // for that plus sign below flipkart logo
        width: 10,
        marginLeft: 4,
        height: 10
    },
    container: {
        display: "flex"
    },
    list: {
        width: 250,
    },
    menuButton: {
        display: "none",
        [theme.breakpoints.down('sm')]: {
            display: "block"
        }
    },
    HeaderButtons: {
        margin: "0 5% 0 auto",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        }
    }

}))

const ToolBar = withStyles({
    root: {
        minHeight: 55
    }
})(Toolbar);

function Header() {
    const [open, setOpen] = useState(false);
    const classes = useStyle();

    // for flipkart Logo
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    // for that Plus Logo below the flipkart logo
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const list = () => (
        <Box className={classes.list}>
            <List>
                <ListItem>
                    <HeaderButtons handleClose={handleClose} />
                </ListItem>
            </List>
        </Box>
    )
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }


    return (
        <AppBar className={classes.header}>
            <ToolBar>
                <IconButton
                    color="inherit"
                    className={classes.menuButton}
                    onClick={handleOpen}
                >
                    <Menu />
                </IconButton>

                <Drawer open={open} onClose={handleClose} >
                    {list()}
                </Drawer>

                <Link to="/" className={classes.component}>
                    <img src={logoURL} className={classes.logo} />
                    <Box className={classes.container}>
                        <Typography className={classes.subHeading}>Explore <Box component="span" style={{ color: "#ffe500", fontWeight: "bold" }}>Plus</Box></Typography>
                        <img src={subURL} className={classes.subURL} />
                    </Box>
                </Link>
                <SearchBar />
                <span className={classes.HeaderButtons}><HeaderButtons /> </span>
            </ToolBar>
        </AppBar>
    )
}
export default Header;