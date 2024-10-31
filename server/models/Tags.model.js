const mongoose = require("mongoose")

const Tagschema = new mongoose.Schema({
    tagname:{
        type:String,
        require:true,
        unique:true
    }
})

module.exports=mongoose.model("Tags",Tagschema);