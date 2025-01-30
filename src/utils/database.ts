import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    const MONGODB_URI = process.env.MONGODB_URI;
    if(!MONGODB_URI) {
        console.log("MONGODB_URI not defined");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "database",  // Use environment variable for the database name
        });

        isConnected = true;
        console.log("MongoDB connected successfully");
    } catch(error) {
        console.log(error);
    }
}