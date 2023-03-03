const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const argon2 = require("argon2");
const autoIncrement = require("mongoose-auto-increment");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await argon2.hash(this.password);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return argon2.verify(this.password, candidatePassword);
};

autoIncrement.initialize(mongoose.connection);

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  noteId: {
    type: Number,
    unique: true,
    required: true,
    index: true,
  },
});

NoteSchema.plugin(autoIncrement.plugin, { model: "Note", field: "noteId" });

module.exports = {
  User: mongoose.model("users", UserSchema),
  Note: mongoose.model("notes", NoteSchema),
};
