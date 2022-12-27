const MONGO_URI =
  "mongodb+srv://employeeManagement:2LRwS1qa3e0FNMPP@cluster0.gavhqqs.mongodb.net/?retryWrites=true&w=majority";

import mongoose from "mongoose";
const connectMongo = async () => {
  try {
    const { connection } = await mongoose.connect(MONGO_URI);
    if (connection.readyState == 1) {
      console.log("Database Connected");
    }
  } catch (e) {
    return Promise.reject(e);
  }
};

export default connectMongo;
