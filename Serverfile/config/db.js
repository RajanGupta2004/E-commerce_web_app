import mongoose from "mongoose";

const connectDB = async (DATABASE_URL) => {
    try {
        const option = {
            dbName: "schooldb"
        }

        await mongoose.connect(DATABASE_URL, option);
        console.log("connection with database is connected");


    } catch (error) {
        console.log(error);

    }
}
export default connectDB