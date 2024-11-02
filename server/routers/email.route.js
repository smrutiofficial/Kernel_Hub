const express =require("express");
const {mailsend}=require("../controllers/testemail.controller");
const {sendOtp}=require("../middlewares/sendotp.middleware")


const router=express.Router();
router.get("/mailsend",mailsend);
router.post("/register", sendOtp);


module.exports = router;