const mongoose = require("mongoose");

const Form = new mongoose.Schema({
  form_id: {
    type: String,
    
  },
  form_title:{
    type:String,
    required:true,
  },
  form_desc: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      // required: true
    }
  ],
  form_budget: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Form", Form);
