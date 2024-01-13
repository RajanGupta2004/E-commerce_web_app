import userModels from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import productModel from "../models/Addproduct.js";
import AllproductModel from "../models/AlladdProduct.js";

class UserController {
  static userRegistration = async (req, res) => {
    const { name, email, password, confirm_password, tc } = req.body;
    // console.log(name, email, password, confirm_password);
    // cheaking user already exist or not
    const user = await userModels.findOne({ email: email });
    // console.log(user);

    if (user) {
      res.send({ status: "failed", message: "User already exist" });
    } else {
      if (name && email && password && confirm_password) {
        if (password === confirm_password) {
          try {
            const saltround = 5;
            const hashedPassword = await bcrypt.hash(password, saltround);

            const doc = userModels({
              name: name,
              email: email,
              password: hashedPassword,
              tc: tc,
            });

            await doc.save();

            // Generating JWT token

            const saved_user = await userModels.find({ email: email });
            const token = jwt.sign(
              { userId: saved_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "4d" }
            );

            res.status(201).send({
              status: "Success",
              message: "Registration is sucessfull",
              token: token,
            });
          } catch (error) {
            res.send({ status: "failed", message: "unable to register" });
          }
        } else {
          res.send({ status: "failed", message: "mismatch password is given" });
        }
      } else {
        res.send({ status: "failed", message: "All field are required" });
      }
    }
  };

  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await userModels.findOne({ email: email });

        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);

          if (email === user.email && isMatch) {
            // Generate JWT token
            const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "4d" }
            );
            res.send({
              status: "sucess",
              message: "Login success",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Invalid email and password rajan",
            });
          }
        } else {
          res.send({ status: "failed", message: "you are not register user" });
        }
      } else {
        res.send({ ststus: "failed", message: "all field are required" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // change password

  static changePassword = async (req, res, next) => {
    const { password, confirm_password } = req.body;
    try {
      if ((password, confirm_password)) {
        if (password !== confirm_password) {
          res.send({ status: "failed", messsage: "password doesnot match" });
        } else {
          // encrypt the password
          const saltround = 5;
          const hashedPassword = await bcrypt.hash(password, saltround);
          res.send({ status: "sucess", message: "print password is print" });
        }
      } else {
        res.send({ status: "failed", message: "all field are required" });
      }
    } catch (error) {}
  };

  static addProducts = async (req, res) => {
    try {
      const { title, price, descryption } = req.body;
      // console.log(title, price, descryption);

      const productURL = req.files["productURL"][0].filename;
      // console.log(req.files);

      if (title && price && descryption && productURL) {
        const productdata = new productModel({
          title: title,
          price: price,
          descryption: descryption,
          imageURL: productURL,
        });
        await productdata.save();
        // console.log("data added sucessfully");
        res
          .status(201)
          .send({ status: "sucess", message: "data save sucessfully" });
      } else {
        res
          .status(201)
          .send({ status: "failed", message: "all field required" });
      }

      // console.log(productURL);
    } catch (error) {
      res.status(201).send({ message: "Error in getting data ", error });
    }
  };

  static DatafetchfromDB = async (req, res) => {
    try {
      const produtapi = await productModel.find();
      // console.log(produtapi);
      res.status(201).send(produtapi);
    } catch (error) {
      console.log(error);
    }
  };

  // all product controller
  static AlladdProducts = async (req, res) => {
    try {
      const { title, price, descryption } = req.body;
      const productImage = req.files["productImage"][0].filename;
      if (title && price && descryption && productImage) {
        const allproductdata = new AllproductModel({
          title: title,
          price: price,
          descryption: descryption,
          imageURL: productImage,
        });
        await allproductdata.save();
        res
          .status(200)
          .send({ status: "sucess", message: "Data save Sucessfully" });
      } else {
        res
          .status(201)
          .send({ status: "failed", message: "All field are requires" });
      }
    } catch (error) {
      res
        .status(201)
        .send({ status: "failed", message: "all field required" }, error);
    }
  };

  static GetdataForAllProduct = async (req, res) => {
    try {
      const Allproductdatafromdb = await AllproductModel.find();
      res.status(201).send(Allproductdatafromdb);
      // console.log(Allproductdatafromdb);
    } catch (error) {
      res.status(201).send({ message: "Error in fetching data" });
    }
  };

  // controller for get data through id for addproduct data
  static FetchDataThroughId = async (req, res) => {
    try {
      const addproductdata = await productModel.findById(req.params.id);
      res.status(201).send(addproductdata);
    } catch (error) {
      res.status(401).send({ message: "Error in fetching data" });
    }
  };

  // controller for get data through id for Alladdproduct data

  static FetchAllproductData = async (req, res) => {
    try {
      const Alladdproductdata = await AllproductModel.findById(req.params.id);
      res.status(200).send(Alladdproductdata);
    } catch (error) {
      res.status(401).send({ message: "Error in fetching data " });
    }
  };
}

export default UserController;
