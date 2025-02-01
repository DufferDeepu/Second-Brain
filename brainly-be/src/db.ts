import mongoose, { model } from 'mongoose';

mongoose.connect('mongodb+srv://kraftygifthouse:ZP8u97nNS06szvIg@cluster0.5kxko.mongodb.net/');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { 
    type: String,
    unique: true
    },
  password: {
    type: String
  }
});

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{
        type: mongoose.Types.ObjectId, ref: "Tag"
    }],
    type: String,
    userId: {
        type: mongoose.Types.ObjectId, ref: "User", 
        required: true
    }
});

export const ContentModel = model("content", ContentSchema);

const LinkSchema = new Schema({
    hash: String,
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    }
});

export const LinkModel = model("Links", LinkSchema);