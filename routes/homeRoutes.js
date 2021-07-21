const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.render("login", 
    { title: "ZaWash Login",
    alert: req.query.alert,})
})

router.post("/", (req,res)=>{
    res.redirect("/dashboard");
    console.log('its working')
    // console.log(req.body)
    // const login = new Login(req.body);
    // login.save()
    //     .then(() => { res.redirect("/dashboard"); })
    //     .catch((err) =>{ console.log(err); 
    //                      res.send('Sorry! Something went wrong.');});
  })

module.exports = router;