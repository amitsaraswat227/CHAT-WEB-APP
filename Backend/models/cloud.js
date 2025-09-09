import mongoose from "mongoose";

const cloud=mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
},{timestamps:true})

const Cloud=mongoose.model('Cloud',cloud)
export default Cloud;