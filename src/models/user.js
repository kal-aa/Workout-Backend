import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// static signup method
UserSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw new Error("Please fill in all the fields");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }

  const exists = await this.findOne({ email });

  if (exists) throw new Error("Email already in use");

  //   const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, 10);

  const user = await this.create({ email, password: hash });

  return user;
};

// static login method
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("Please fill in all the fields");
  }

  const user = await this.findOne({ email });

  if (!user) throw new Error("Incorrect email");

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw new Error("Incorrect password");

  return user;
  e;
};

export default mongoose.model("User", UserSchema);
