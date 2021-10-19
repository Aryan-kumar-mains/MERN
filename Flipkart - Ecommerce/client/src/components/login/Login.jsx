import { useState } from "react";
import { Box, Button, Dialog, DialogContent, makeStyles, TextField, Typography } from "@material-ui/core";
// importing api made by me for signup 
import { authenticateSignup, authenticateLogin } from "../../service/api.js";

const useStyle = makeStyles({
    component: {
        height: "73vh",
        width: "94vh",
    },
    image: {
        backgroundImage: `url(${"https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png"})`,
        height: "73vh",
        backgroundRepeat: "no-repeat",
        background: "#2874f0",
        width: "40%",
        backgroundPosition: "center 85%",
        padding: "45px 35px",
        '& > *': {
            color: "#ffffff",
            fontWeight: 600,
        }
    },
    login: {
        display: "flex",
        flexDirection: "column",
        flex: 1,   //see this https://stackoverflow.com/questions/37386244/what-does-flex-1-mean
        padding: "25px 35px",
        '& > *': {
            marginTop: "20px"
        }
    },
    text: {
        color: "#878787",
        fontSize: 12,
    },
    loginBtn: {
        textTransform: "none",
        background: "#FB6418",
        color: "#ffffff",
        borderRadius: 2,
        height: 48,
    },
    requestOTPbtn: {
        textTransform: "none",
        background: "#ffffff",
        color: "#2874f0",
        borderRadius: 2,
        height: 48,
        boxShadow: "0 2px 4px 0 rgb(0 0 0 /20%"
    },
    createAccountText: {
        color: "blue",
    },
    error: {
        fontSize: 10,
        color: "#ff6161",
        marginTop: 10,
        fontWeight: 600,
        lineHeight: 0,
    }
})

const initialValue = {
    login: {
        view: "login",
        heading: "Login",
        subHeading: "Get access to your Orders, Wishlist and Recommendations"
    },
    signup: {
        view: "signup",
        heading: "Looks like you are new here",
        subHeading: "Sign up with mobile number to get started"
    }
}

// for authenticate user
const signupInitialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    phone: ""
}

// for authenticate login 
const loginInitialValues = {
    username: "",
    password: "",
}

const Login = ({ open, setOpen, setAccount }) => {
    const classes = useStyle();
    
    const [account, toggleAccount] = useState(initialValue.login);
    const [signup, setSignup ] = useState(signupInitialValues);
    const [login, setLogin] = useState(loginInitialValues);
    const [error, setError] = useState(false);

    function handleClose() {
        setOpen(false);
        toggleAccount(initialValue.login);
        setError(false);
    }

    function toggleUserAccount() {
        toggleAccount(initialValue.signup);
    }

    async function signupUser () {
        let response = await authenticateSignup(signup);
        if(!response) return;
        handleClose();
        setAccount(signup.username)
    }

    async function loginUser() {
        let response = await authenticateLogin(login);
        if(!response) {
            setError(true);
            return;
        };
        handleClose();
        setAccount(login.username);
    }

    function onInputChange(event) {
        setSignup({...signup, [event.target.name] : event.target.value});
    }
    function onLoginInputChange(event) {
        setLogin({...login, [event.target.name] : event.target.value});
    }

    return (
        //  yha pe 'onClose' k jagah 'onClick' bhi use kr sakte the  aur 'open' likhna hi hoga
        <Dialog open={open} onClose={handleClose} >
            <DialogContent className={classes.component}>
                <Box style={{ display: "flex" }}>
                    <Box className={classes.image}>
                        <Typography variant="h5">{account.heading}</Typography>
                        <Typography style={{ marginTop: "20px" }}>{account.subHeading}</Typography>
                    </Box>
                    {
                        account.view === "login" ?
                            <Box className={classes.login}>
                                <TextField onChange={onLoginInputChange} name="username" label="Enter Email/Mobile number" /> {/* React Material Ui mein placeholder k jagah label hi use krte hai */}
                                <TextField onChange={onLoginInputChange} name="password" label="Enter Password" />
                                {/* styling not working using adding a class in below Typography but inline styling works */}
                                { error && <Typography style={{fontSize: 10, color: "#ff6161", marginTop: 10, fontWeight: 600, lineHeight: 0}} className={classes.error}>Please enter valid username/password</Typography> }
                                <Typography className={classes.text} >By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Typography>
                                <Button onClick={loginUser} variant="contained" className={classes.loginBtn} >Login</Button>
                                <Typography className={classes.text} style={{ textAlign: "center" }} >OR</Typography>
                                <Button variant="contained" className={classes.requestOTPbtn} >Request OTP</Button>
                                {/* styling not working using adding a class in below Typography but inline styling works */}
                                <Typography onClick={toggleUserAccount} style={{ textAlign: "center", marginTop: "auto", fontSize: 14, color: "#2874f0", fontWeight: 600, cursor: "pointer" }} >New to Flipkart? Create an account</Typography>
                            </Box> : 
                            <Box className={classes.login}>
                                <TextField onChange={onInputChange} name="firstname" label="Enter First name" /> {/* React Material Ui mein placeholder k jagah label hi use krte hai */}
                                <TextField onChange={onInputChange} name="lastname" label="Enter Last name" />
                                <TextField onChange={onInputChange} name="username" label="Enter Username" /> {/* React Material Ui mein placeholder k jagah label hi use krte hai */}
                                <TextField onChange={onInputChange} name="email" label="Enter Email" />
                                <TextField onChange={onInputChange} name="password" label="Enter Password" />
                                <TextField onChange={onInputChange} name="phone" label="Enter Mobile number" /> {/* React Material Ui mein placeholder k jagah label hi use krte hai */}
                                <Button variant="contained" className={classes.loginBtn} onClick={signupUser} >Sign Up</Button>
                            </Box>
                    }
                </Box>
            </DialogContent>
        </Dialog>
    )
}


export default Login;

