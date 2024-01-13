import mongoose from "mongoose";

const AllproductSchema = new mongoose.Schema({
  title: { type: "String", reqired: true },
  price: { type: "Number", required: true },
  descryption: { type: "String" },
  imageURL: { type: "String" },
});

const AllproductModel = mongoose.model("Allproduct", AllproductSchema);

export default AllproductModel;
