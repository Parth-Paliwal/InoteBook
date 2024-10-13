const express = require('express');
const User = require('../models/User');
const fetchuser = require("../middleware/fetchuser")
const router = express.Router();
const bcrypt = require("bcryptjs")
var jwt = require('jsonwebtoken');
const sign = "authentication";
const { body, validationResult } = require('express-validator');


//Route 1 : for singning up
router.post('/signup', [

    //checking for validations

    body("email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 6 })
    
], async (req, res) => {

    //actions over invalid data

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }

    //checking weather email is unique or not
    try {
        let emt = await User.findOne({ email: req.body.email })
        if (emt) {
            return res.status(400).json({show : true, error: "user with same email already exist" });
        }
        const saltRounds = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, saltRounds)
        emt = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secpass
        })

        // sending JsonWebToken

        let data = {
            user:{
            id: emt.id
            }
        }
        const authtoken = jwt.sign(data, sign)
        res.send({ authtoken: authtoken })
    }
    catch (error) {
        console.log(error.message)
        res.status(500).send("something went wrong")
    }
})

//Route 2 : authenticating a user using post request : login

router.post('/login', [

    //checking for validations
    
    body("email", "enter a valid email").isEmail(),
    body("password", "enter password").exists()
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() })
    }
    const { email, password } = req.body                

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "please login with correct credentials" })
        }
        let passresult = await bcrypt.compare(password, user.password)

        if (!passresult) {
            return res.status(400).json({ error: "please login with correct credentials" })
        }
        let data = {
            user : {
            id: user.id
        }
        }
        const authtoken = jwt.sign(data, sign)

        res.send({ authtoken: authtoken })

    } catch (error) {
        console.log(error.message)
        res.status(500).send("inter sever error occurs")
    }
})

//Route 3 : get detail of logged in user using post request 
router.post('/getuser' , fetchuser , async(req , res)=>{
    try {
        let userid =  req.user.id;
        const user = await User.findById(userid).select("-password")
        console.log(user)
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("inter sever error occurs")
    }
})

module.exports = router;
