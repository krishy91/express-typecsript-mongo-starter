import {IUser} from "../interfaces/user";
import {Document} from "mongoose";
import {Schema} from "mongoose";

import mongoose = require("mongoose");

const UserSchema = new Schema({
  createdAt: Date,
  email: String,
  firstName: String,
  lastName: String
});

UserSchema.pre("save", function(next) {
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

export const User = mongoose.model<IUser>("User", UserSchema);
