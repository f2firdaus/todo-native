import mongoose, { connect } from "mongoose";


const dbConnnect = async () => {
    const uri = process.env.MONGODB_URI!
   
    try {
        await mongoose.connect(uri); 
        console.log(`db connected running ${mongoose.connection.host}`)
    } catch (error) {
        console.log(error)
    }
   
}

export default dbConnnect;