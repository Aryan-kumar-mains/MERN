import express from "express";


import { userSignup, userLoginIn } from "../controller/user-controller.js";
import { getProducts} from "../controller/productController.js"
import { getProductById } from "../controller/productController.js";
import { addPaymentGateway , paymentResponse} from "../controller/payment-controller.js";

const router = express.Router();

router.post("/signup", userSignup);  // it is called from frontend api.js
router.post("/login", userLoginIn);  // it is called from frontend api.js

router.get("/products", getProducts);  // for getting the products from database
router.get("/product/:id", getProductById);  // for getting product details on Clicking

router.post("/payment",addPaymentGateway); // it is called from frontend api.js
router.post("/callback", paymentResponse);

export default router;