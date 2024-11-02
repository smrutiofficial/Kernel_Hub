const express =require("express");
const {mailsend}=require("../controllers/testemail.controller");



const router=express.Router();
router.get("/mailsend",mailsend);



module.exports = router;