import mongoose from "mongoose";



const MongoClusterURL = "mongodb+srv://adminUser9:test1234@cluster0.61z82hb.mongodb.net";
const DBName = "BlogDB";
const CollectionName = "BlogCollection";


const docSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  post: {
    type: String
  }
}); 

const BlogModel = mongoose.model(CollectionName, docSchema);


export async function connectToDB() {
  try{
    await mongoose.connect(`${MongoClusterURL}/${DBName}`);
  } catch(err) {
    console.error("Error while connecting to DB !!!");
    console.error(err);
  }
}

export async function disconnectFromDB() {
  try{
    await mongoose.connection.close();
  } catch(err) {
    console.error("Error while disconnecting from DB !!!");
    console.error(err);
  }
}

export function addNewBlog(postTitle, postContent) {
  const newDoc = new BlogModel({
    title: postTitle,
    post: postContent
  });
  newDoc.save();
}

export function findAllPost() {
  return BlogModel.find().exec();
}


export function findPostById(id) {
  return BlogModel.findById(id).exec();
}