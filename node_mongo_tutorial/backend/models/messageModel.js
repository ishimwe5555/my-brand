const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const messageSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: false,
    lowercase: true,
  },
  content: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
}, {
    timestamps : true,
});

const validateMessage = (message) => {
  const schema = Joi.object({
    names: Joi.string().min(3).max(30).required(),
    content: Joi.string().min(5).max(200).required(),
    email: Joi.string().email().required(),
  });

  return schema.validate(message);
};
// async function dropAndRecreateCollection() {
//   // Drop the existing collection
//   await mongoose.connection.dropCollection('messages');

//   // Recreate the collection with the updated schema
//   const Message = mongoose.model('Message', messageSchema);
// }

// dropAndRecreateCollection();

const Message = mongoose.model("Message", messageSchema);

module.exports = { Message, validateMessage };
