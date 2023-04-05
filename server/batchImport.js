const testData = require("./testData.json");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  const db = client.db("moviegoer");
  try {
    await client.connect();
    // await db.collection("companies").insertMany(companies);
    await db.collection("users").insertMany(testData);
    await client.close();
  } catch (err) {
    console.log(err);
  }
};

batchImport();
