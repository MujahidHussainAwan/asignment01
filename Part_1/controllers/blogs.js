//const express = require("express");
//const router = express.Router();
const { v4 } = require("uuid");
const blog = require("../data/blogs");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

let blogData = [];

const getBlog = (req, res) => {
  res.json(blog);
};

const addBlog = async (req, res) => {
  const item = req.body;
  const hashedPassword = await bcrypt.hash(req.body.reference, 10);
  blog.push({ ...item, reference: hashedPassword, id: v4() });
  res.send(`Item "${item.title}" has been added successfully.`);
};

//const login = async (req, res) => {
const login = async (req, res) => {
  try {
    const item = req.body;
    console.log(item);

    if (item == null) res.status(404).send("User does not exist!")

    if (item.reference == null) res.status(404).send("User does not exist!")
    //check to see if the user exists
 
    const accessToken = generateAccessToken({ user: req.body.reference })

    res.send(
      accessToken
    ); 

  } catch (E) {
    console.log(E);
  }


};


// accessTokens
function generateAccessToken(user) {


  return jwt.sign(user, 'SECRET', { expiresIn: "15m" })
}
const getBlogId = (req, res) => {
  const { id } = req.params;
  const itemFound = blog.find((item) => item.id === id);
  console.log(itemFound);
  res.send(itemFound);
};

const deleteBlog = (req, res) => {
  const { id } = req.params;
  blogData = blog.filter((item) => item.id !== id);
  console.log(blogData);
  res.send(`Item with id ${id} has been deleted successfully.`);
};

const updateBlog= (req, res) => {
  const { id } = req.params;
  const { name, toppings, price } = req.body;

  const item = blog.find((item) => item.id === id);

  if (name) item.name = name;
  if (toppings) item.toppings = toppings;
  if (price) item.price = price;

  res.send(
    `Item with id ${id} and name ${item.name} has been updated successfully`
  );
};

module.exports = { login, getBlog, addBlog, getBlogId, deleteBlog, updateBlog };
//https://medium.com/7span/crud-operation-using-node-js-and-express-js-a0d63a2216aa