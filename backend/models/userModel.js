import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile:{
      type:String,
      
  },
    profileImg: {
      type: String
    },
    password: {
      type: String,
      required: true,
    },
    isStatus:{
      type:Boolean,
      default : true
  },
  },
  {
    timestamps: true,
  }
);

//   comaring the password when the user login ,Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt,hashing password

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;