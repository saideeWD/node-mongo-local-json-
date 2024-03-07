const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create product schma

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//create a product model

const product = mongoose.model("Product", productsSchema);

const connectDb = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/testProductDB");
  console.log("db is connect");

  try {
  } catch (error) {
    console.log("db is not connect");
    console.log(error.message);
    process.exit(1);
  }
};

app.post("/", async (req, res) => {
  try {
    // get data form request body
    //  const title = req.body.title;
    //  const price = req.body.price;
    //  const description =req.body.description;
    //  res.status(201).send({title,price,description});

     const newProduct = new product({
      title:req.body.title,
      price:req.body.price,
      description:req.body.description,
     });
    const productData = await newProduct.save();
    // const productData = await product.insertMany([
    //   { title: "i phone 5", price: 250, description: "this is i phone" },
    // ]);
    res.status(201).send(productData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/",async(req,res)=>{
  try {
 const products =  await  product.find();
 if(products){
  res.status(200).send({products });
 }
 else{
  res.status(404).send({  message: "product not found" });
 }
  } catch (error) {
    res.status(500).send({ message: error.message}); 
  }

})

app.listen(port, async () => {
  console.log(`server is renning https//:localhost: ${port}`);
  await connectDb();
});


///DATABASE ---> COLLECTIONS --> DOCUMENTS
///GET : /PRODUCTS/:ID --> RETRUN ALL THE PRODUCTS
///POST : /PRODUCTS ---> CREATE A PRODUCT
///PUT: /PRODUCTS/ID ---> UPDATE A PRODUCT BASED ON ID
///DELETE : PRODUCTS/:ID ---> DELETE A PRODUCT BASED ON ID 

