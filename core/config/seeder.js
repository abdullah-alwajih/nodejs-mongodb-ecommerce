const fs = require('fs');
require('colors');
const dotenv = require('dotenv');
const Product = require('/modules/products/data/models/product.model');
const dbConnection = require('./database');

dotenv.config({path: '../../core.env'});

// connect to DB
dbConnection();

// Read data
const products = JSON.parse(fs.readFileSync('/modules/products/data/dummy/products.json', 'utf8'));


// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);
    console.log('Data Inserted'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === '-i') {
  await insertData();
} else if (process.argv[2] === '-d') {
  await destroyData();
}