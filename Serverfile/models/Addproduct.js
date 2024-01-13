import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: { type: "String", reqired: true },
  price: { type: "Number", required: true },
  descryption: { type: "String" },
  imageURL: { type: "String" },
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
