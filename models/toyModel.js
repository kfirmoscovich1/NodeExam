const mongoose = require("mongoose");
const Joi = require("joi");
const schema = new mongoose.Schema({
  name:String,
  info:String,
  category:String,
  img_url:String,
  price:Number,
  user_id:String
},{timestamps:true})

exports.ToyModel = mongoose.model("toys",schema);

exports.validToy = (_reqBody) => {
  const joiSchema = Joi.object({
    name:Joi.string().min(2).max(50).required(),
    info:Joi.string().min(2).max(200).required(),
    category:Joi.string().min(2).max(50).required(),
    img_url:Joi.string().min(5).max(100),
    price:Joi.number().min(1).max(999).required()
  })
  return joiSchema.validate(_reqBody);
}