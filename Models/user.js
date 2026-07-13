const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String
  },
  mobile: {
    type: String
  },
  address: {
    type: String
  },
  adhaarCardNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['voter', 'admin'],
    default: 'voter'
  },
  isvoted: {
    type: Boolean,
    default: false
  }
});

userSchema.pre('save', async function (next) {
  const person = this;

  if (!person.isModified('password')) return ;

  try {
    //hash password generation
    const salt = await bcrypt.genSalt(10);

    //hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    //override the plain password with the hashed one
    person.password = hashedPassword;


  }catch(err){
    throw(err);
  }

    
});

userSchema.methods.comparePassword = async function (candidatepassword) {
  try {
    const isMatch = await bcrypt.compare(candidatepassword, this.password);
    return isMatch;
  } catch (arr) {
    throw err;
  }
}

const User = mongoose.model('User', userSchema);
module.exports = User;
