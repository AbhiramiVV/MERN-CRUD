import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    proffession:{
        type:String,
        required:true,
    },
    password :{
        type:String,
        required:true
    },
    admin:{
        default:false
    },
    profile:{
        type:String,
        default:"avatar.png"
    }
})

const UserModel=mongoose.model("User", UserSchema)
export default UserModel