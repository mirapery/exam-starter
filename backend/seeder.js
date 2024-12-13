require("dotenv").config();
const colors = require("colors");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const books = require("./data/books.js");
const Book = require("./models/bookModel.js");
const users = require("./data/users.js");
const User = require("./models/userModel");

connectDB();

const importData = async () => {
  try {

    await User.deleteMany();
    const user =  await await User.create(users[0]);
    const booksWithUserId = books.map(item => ({
      ...item,
      user_id: user._id.toString()
    }));
    await Book.deleteMany();
    await Book.insertMany(booksWithUserId);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Book.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}