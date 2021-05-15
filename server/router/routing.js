const express = require("express");
const router = express.Router();
const User = require("../models/schema");
const bcrypt = require("bcrypt");
const authenticate = require("../middlewares/authenticate");

router.post("/register", async (req, res) =>
{
    const { name, email, password, cpassword } = req.body;

    if (!name || !email || !password || !cpassword)
    {
        return res.status(400).json({error: "Invalid Credentials"})
    }
    else
    {
        if (password === cpassword)
        {
            
        try
        {
            const result = await User.findOne({ email: email });

            if (result)
            {
                return res.status(400).json({error: "Email already exists."})
            }
            
                const newUser = new User({name, email, password, cpassword});

                // hashing the password
                await newUser.save();

                return res.status(201).json({message: "User created succressfully."})
        }
        catch (error)
        {
            console.log(error)
            }
        }
        else
        {
            return res.status(400).json({error: "Invalid Credentials."})
        }
    }


    res.json({error: "There was an internal error. Sorry for the inconvience."})
})

router.post("/login", async (req, res) =>
{
    const { email, password } = req.body;

    if (!email || !password)
    {
        return res.status(400).json({ error: "Please fill the data."})
    }
    

    try
    {
        const emailExist = await User.findOne({ email: email });

        if (!emailExist)
        {
            return res.status(400).json({error: "Invalid Credentials."})
        }

        const isMatch = await bcrypt.compare(password, emailExist.password);

        const token = await emailExist.generateAuthToken();

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: true
        });

        if (isMatch)
        {
            return res.status(200).json({message: "User login successfully."})
        }

        else
        {
            return res.status(400).json({ error: "Invalid Credentials" });
        }

    }
    catch (error)
    {
        console.log(error)
    }

})

router.get("/authenticate", authenticate, async (req, res) =>
{
    res.send(req.rootUser);
})


module.exports = router;