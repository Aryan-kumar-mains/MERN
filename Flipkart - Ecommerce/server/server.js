import express from "express";
import dotenv from "dotenv";  // for keeping our username or password in different file
import bodyParser from "body-parser";
import cors from "cors";
import { v4 as uuid } from "uuid";

// components
import Connection  from "./database/db.js";
import DefaultData from "./default.js";
import Routes from "./routes/routes.js";

dotenv.config();   // initialize dotenv file with this

const app = express();

const PORT = process.env.PORT || 8000; // this is useful in both for heroku or in local system

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const URL = `mongodb+srv://${username}:${password}@ecommerceweb.ad8ru.mongodb.net/ECOMMERCE?retryWrites=true&w=majority`;

Connection(process.env.MONGODB_URI || URL);  // for connecting to mongodb via mongoose

if(process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use("/", Routes);
app.listen(PORT, () => console.log(`Server is successfully running on PORT ${PORT}`));

// send default data to database
DefaultData();

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams['MID'] = process.env.PAYTM_MID,
paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
paytmParams['ORDER_ID'] = uuid(), // install it first
paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
paytmParams['TXN_AMOUNT'] = '100',
paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback',
paytmParams['EMAIL'] = 'aryankumar21064@gmail.com',
paytmParams['MOBILE_NO'] = '1234567852'






