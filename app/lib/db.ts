import mongoose from "mongoose";


const MONGODB_URL = process.env.MONGO_URI

const connect = async () => {

    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log('Already connected to the database');
        return;
    }

    if (connectionState === 2) {
        console.log('connecting...');
        return;
    }

    try {
        mongoose.connect(MONGODB_URL!, {
            dbName: 'auto-tweet',
            bufferCommands: true,
        })
        console.log('Connected to the database');
    } catch (error: any) {
        console.log("Error : ", error);
        throw new Error("Error :", error);
    }
}


export default connect;