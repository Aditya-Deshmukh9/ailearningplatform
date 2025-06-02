import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userModel.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userModel.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
      username: this.username,
    },
    "ADAPDOADPII2023pw0kc304fkpv30v4V42O2I",
    {
      expiresIn: "1d",
    }
  );
};

userModel.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this.id,
    },
    "ADAP24242DOADPII20v2f535a2353w0kc304fffsf114b677ndjmkpv30v4V42O2I",
    {
      expiresIn: "7d",
    }
  );
};

const User = mongoose.models.users || mongoose.model("users", userModel);

export default User;
