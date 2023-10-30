import mongoose from "mongoose";

const EmployerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: String,
  companyName: String,
  location: {
    type: String,
    default: "my city",
  },
  avatar: String,
  avatarPublicId: String,
  role: {
    type: String,
    default: "employer",
  },
});

EmployerSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("Employer", EmployerSchema);
