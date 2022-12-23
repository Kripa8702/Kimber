const express = require('express');
const router = express.Router();
const User = require('./models/userModel');

module.exports = router;

//Get All Method
router.get('/getAll' , async (req, res) => {
    try {
        const data = await User.find()
        res.json(data)

    } catch (error) {

        res.status(500).json({ message : error.message})
        
    }
})

//Get By ID Method
router.get('/getOne/:id' , async (req, res) => {
    try {
        const data = await User.findById(req.params.id)
        res.json(data)

    } catch (error) {

        res.status(500).json({ message : error.message})
        
    }
})

//Post Method
router.post( '/post' , async (req, res) => {
    const data = new User({
        name : req.body.name,
        email : req.body.email
    })

    try {
        const postData = await data.save();
        res.status(200).json(postData)

    } catch (error) {

        res.status(400).json({message : error.message})
        
    }
})

//Update By ID Method
router.patch('/update/:id' , async (req, res) => {
    try {
        const id = req.params.id;
        const newBody = req.body;
        const options = { new : true };

        const data = await User.findByIdAndUpdate( id , newBody , options )

        res.status(200).json(data)

    } catch (error) {

        res.status(400).json({message : error.message})
        
    }
})

//Delete By ID Method
router.delete('/delete/:id' , async (req, res) => {
   try {
    const id = req.params.id;

    const data = await User.findByIdAndDelete(id)
    res.send(`Document ${data.name} has been deleted..`)

   } catch (error) {
        res.status(400).json({message : error.message})
   }
})