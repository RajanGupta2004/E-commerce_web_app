import express from "express";
import UserController from "../Controllers/userController.js";
import cheakUserAuth from "../middleware/authMiddleware.js";
import upload from "../middleware/image-upload.js";

const router = express.Router();

// route level middle ware
router.use("/changePassword", cheakUserAuth);

// public routes
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);

// protected routes
router.post("/changePassword", UserController.changePassword);

// router level middle ware to upload images
router.use("/addproducts", upload.fields([{ name: "productURL" }]));

// add product routes
router.post("/addproducts", UserController.addProducts);

// // upload images
// router.post("/addproducts", UserController.addProducts);

// fetch product data from api
router.get("/addproducts", UserController.DatafetchfromDB);

// All product route
// route level middleware to upload images in AllProduct Category
router.use("/Alladdproduct", upload.fields([{ name: "productImage" }]));
router.post("/Alladdproduct", UserController.AlladdProducts);
router.get("/Alladdproduct", UserController.GetdataForAllProduct);

// Api for get data through id

router.get("/addproducts/:id", UserController.FetchDataThroughId);

// Api for get data through id for Alladdproduct
router.get("/Alladdproduct/:id", UserController.FetchAllproductData);
export default router;
