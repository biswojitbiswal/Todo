import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        const connectionInstances = mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`MongoDB connection successfully`)
    } catch (error) {
        console.log(`MongoDB connection failed`, error);
        process.exit(1);
    }
}

export default connectDb