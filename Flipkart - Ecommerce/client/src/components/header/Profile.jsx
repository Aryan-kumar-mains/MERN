import { Typography, Menu, MenuItem, makeStyles } from "@material-ui/core";
import { useState } from "react";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Link } from "react-router-dom";

const useStyle = makeStyles(theme=> ({
    component: {
        marginTop: 40
    },
    logout: {
        marginLeft: 20,
        fontSize: 14,
    },
    userName: {
        [theme.breakpoints.down('sm')]: {
            padding: "5px 40px",
            borderRadius: "3px",
            backgroundColor: "#2874f0",
            color: "#ffffff",
        }   
    }
}));

const Profile = ({ account, setAccount }) => {
    const [open, setOpen] = useState(false);
    const classes = useStyle();

    const handleClose = () => {
        setOpen(false);
    }
    const logout = () => {
        setAccount("");
    }

    const handleClick = (event) => {
        setOpen(event.currentTarget);
    }

    return (
        <>
            <Link><Typography className={classes.userName} onClick={handleClick} style={{ marginTop: 4, color: "white" }}>{account}</Typography></Link>
            <Menu
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                className={classes.component}
            >
                <MenuItem onClick={() => {handleClose(); logout();}}>
                    <PowerSettingsNewIcon fontSize="small" color="primary" />
                    <Typography className={classes.logout}>Logout</Typography>
                </MenuItem>
            </Menu>
        </>
    )

}

export default Profile;