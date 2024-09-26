
import * as fs from 'fs'



// Read data from JSON file
const data = JSON.parse(fs.readFileSync("data.json", "utf-8")) 
const products = data.products;

export const createProduct = (req,res) => {
  console.log(req.body);
  products.push(req.body);
  res.status(201).json(req.body);
};

export const getAllProducts = (req, res) => {
  res.json(products);
};

export const getProduct = (req, res) => {
  const id = +req.params.id;
  const product = products.find((p) => p.id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const replaceProduct = (req , res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex !== -1) {
    products.splice(productIndex, 1, { ...req.body, id: id });
    res.status(201).json();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const updateProduct = (req , res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex !== -1) {
    const product = products[productIndex];
    products.splice(productIndex, 1, { ...product, ...req.body });
    res.status(201).json();
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};

export const deleteProduct = (req , res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex !== -1) {
    const product = products[productIndex];
    products.splice(productIndex, 1);
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
};
