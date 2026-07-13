const express = require('express');
const router = express.Router();
const candidate = require('./../models/candidate');
const User = require('./../models/user');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

const checkAdminRole=async(userID)=>{
    try{
        const user = await User.findById(userID);
         if(user.role ==='admin'){
            return true;
        }
    }catch(err){
        return false;
    }

}

//post route to add a candidate
router.post('/',jwtAuthMiddleware, async (req, res) => {
    try {if(! await checkAdminRole(req.user.id)){
        return res.status(403).json({message:"user does not have admin role"})
    }
        const data = req.body; //assume the request body contains the user data

        const newCandidate = new candidate(data);//create new user using moongose models schema
        const response = await newCandidate.save();
        console.log("datasaved")// saving the new user to the database
        
       
        res.status(201).json({response: response});
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }

})



router.put('/:candidateID',jwtAuthMiddleware, async (req, res) => {
    try {
        if(!(await checkAdminRole(req.user.id))){
        return res.status(403).json({message:"user does not have admin role"})
    }
    else{
        console.log("admin")
    }

        const candidateId = req.params.candidateID;
        const updatedCandidateData = req.body;

        const response = await candidate.findByIdAndUpdate(candidateId, updatedCandidateData, {
            new: true,
            runValidators: true,
        })
        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        console.log("Candidate data updated");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.delete('/:candidateID',jwtAuthMiddleware, async (req, res) => {
    try {
        if(!(await checkAdminRole(req.user.id))){
        return res.status(403).json({message:"user does not have admin role"})
    }

        const candidateId = req.params.candidateID;
        const response = await candidate.findByIdAndDelete(candidateId)
        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }
        console.log("Candidate data deleted");
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

//lets start voting

router.post('/vote/:candidateID',jwtAuthMiddleware,async (req,res)=>{
    //no admin can vote
    //user can only votes once

    candidateID=req.params.candidateID;
    userID=req.user.id;

    try{
        const Candidate = await candidate.findById(candidateID);
        if(!Candidate){
            return res.status(404).json({message:'candidate not found'});

        }

        const user= await User.findById(userID);

        if(!user){
            return res.status(404).json({message:'user not found'});
        }
        if(user.role==='admin'){
            return res.status(404).json({message:"admin cannot vote"});
        }
        if(user.isvoted){
            return res.status(404).json({message:"you have already voted"});
        }

        //update the candidate document to record the vote
        Candidate.votes.push({user: userID});
        Candidate.voteCount++;

        await Candidate.save();

        //update the user document
        user.isvoted = true;
        await user.save();

        res.status(200).json({message:"Vote recorded successfully"});;

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.get('/vote/count',async (req,res)=>{
    try{
        //find all the candidate and sort them with votecount
        const Candidate = await candidate.find().sort({voteCount:'desc'});

        //Map the candidate to only return their name and voteCount
        const voteRecord = Candidate.map((data)=>{
            return {
                party:data.party,
                count:data.voteCount
            }

        });

        return res.status(200).json(voteRecord);

    }catch(err){
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" });

    }
})

//Candidate list
router.get('/candidatelist', async (req, res) => {
    try {
        const candidates = await candidate.find({}, 'name party');

        res.status(200).json(candidates);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;