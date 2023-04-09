import UserModel from '../models/userModel.js';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

var salt = bcrypt.genSaltSync(10);


export async function adminLogin(req, res){
    try
    {
        const {email, password}=req.body;
        console.log(req.body);
        const admin=await UserModel.findOne({email:email, admin:true})
        if(!admin) {

            return res.json({error:true,message:"You have no admin access"})
        }
            else{
                if(password==admin.password){
                    const token=jwt.sign(
                        {
                            admin:true,
                            id:admin._id
                        }, 
                        "myjwtsecretkey"
                    )
                    console.log(token);
                    return res.cookie("adminToken", token, {
                            httpOnly: true,
                            secure: true,
                            maxAge: 1000 * 60 * 60 * 24 * 7,
                            sameSite: "none",
                        }).json({error:false}) 
                }
                else{
                    res.json({message:"incorrect pass", error:true})
                }
            }
        
    }
    catch(err){
        res.json({message:"server error", error:err})
        console.log(err);
    }
}

export const adminLogout=async (req, res) => {
    res.cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      }).json({message:"logged out", error:false});
}


export async function getUsersList(req, res){
    let users = await UserModel.find({admin:{$ne:true}, name:new RegExp(req.query.search, 'i')}, {password:0}).lean();
    res.json(users)

}

export async function getUser(req, res){
    let user = await UserModel.findById(req.params.id);
    res.json(user)

}

export async function createUser(req, res){
    try
    {
        const {name, email, password, proffession}=req.body;
        const hashPassword = bcrypt.hashSync(password, salt);
        const user=await UserModel.findOne({email});
        if(user){
            return res.json({error:true, message:"User Already Exist"})
        }
        const newUser = new UserModel({name, email,password:hashPassword,proffession})
        await newUser.save();
        console.log(newUser)

        return res.json({error:false})
    }
    catch(err){
        res.json({error:err})
        console.log(err);
    } 
}


export async function editUser(req, res){
    try
    {
        const {name, email, proffession, id}=req.body;
        console.log(id)
        await UserModel.findByIdAndUpdate(id, {$set:{
            name, email, proffession
        }})

        return res.json({error:false})
    }
    catch(err){
        res.json({error:err, message:"Something went wrong"})
        console.log(err);
    } 
}


export async function deleteUser(req, res){
    try
    {
        const {id}=req.body;
        await UserModel.findByIdAndDelete(id);
        return res.json({error:false})
    }
    catch(err){
        res.json({error:err, message:"Something went wrong"})
        console.log(err);
    } 
}

export const checkAdminLoggedIn=async (req, res) => {
    try {
      const token = req.cookies.adminToken;

      if (!token) 
        return res.json({loggedIn:false, error:true, message:"no token"});
    
      const verifiedJWT = jwt.verify(token, "myjwtsecretkey");
      return res.json({name:verifiedJWT.name, loggedIn: true});
    } catch (err) {
      res.json({loggedIn:false, error:err});
    }
}
