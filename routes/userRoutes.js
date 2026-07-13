const express = require('express');
const router = express.Router();
const user = require('./../models/user');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

const checkAdminExists = async () => {
    const admin = await user.findOne({ role: 'admin' });
    return admin ? true : false;
};

//Signup
router.post('/signup', async (req, res) => {
    try {
        const data = req.body; //assume the request body contains the user data

        
         if (data.role === 'admin') {// Agar user admin ban raha hai
            const adminExists = await checkAdminExists();

            if (adminExists) {
                return res.status(400).json({
                    message: "Only one admin is allowed."
                });
            }
        }

        const newUser = new user(data);//create new user using moongose models schema
        const response = await newUser.save();// saving the new user to the database
        
        const payload={
            id: response.id,
        }

        console.log("data saved");

        console.log(JSON.stringify(payload));
        const token=generateToken(payload);
        console.log("token is:",token);
        res.status(201).json({response: response,token: token});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

})

//login Route
router.post('/login',async(req,res)=>{
    try{
        //extract username and password fron request body
        const {adhaarCardNumber,password}=req.body;

        //find the user by adhaarcardNumber

        const User= await user.findOne({adhaarCardNumber:adhaarCardNumber});

        //if doesn't not exist and password does not match ,return error
        if(!User || !(await User.comparePassword(password))){
            return res.status(401).json({error:'Invalid username or password'});
        }

        //generate Token
        const payload={
            id:User.id,
        }
        const token = generateToken(payload);

        //restore token as response 

         res.status(200).json({
      message: 'Login successful',
      token: token
    });

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//profile route
router.get('/profile', jwtAuthMiddleware ,async (req, res) => {
    try {
        const userdata = req.user;//extract the id from the token
        const userId=userdata.id
        const user = await person.findbyId(userId);
        res.status(201).json({user});

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


// update password
router.put('/profile/password',jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user;//extract the id from the token
        
        const {currentPassword, newPassword} = req.body;

        const user = await user.findbyId({UserId})
        
        //if password does not match return error
        if(!(await user.comparePassword(password(currentPassword)))){
            return res.status(401).json({error:'Invalid  password'});
        }
        user.password=newPassword
        await user.save();

        console.log("password updated");

        res.status(200).json({message:"passord updated"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;