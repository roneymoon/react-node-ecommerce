
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const multer = require("multer");


app.use(express.json());
app.use(cors({
  origin: "*", // or your frontend URL for tighter control
  methods: ["GET", "POST"],
})); // This allows all origins. You can restrict it to a specific origin if necessary.

const port = process.env.PORT || 4000;

// database connection with mongodb
mongoose.connect(
  "mongodb+srv://roneymoon:r0newhy123@cluster0.l5cxqb4.mongodb.net/e-commerce"
);

// API creation
app.get("/", (req, res) => {
  res.send("express app is running");
});

// image storage engine
const storage = multer.diskStorage({
  destination: "uploads/images",
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// creating an endpoint for images
app.use("/images", express.static("uploads/images"));

// creating an endpoint for upload
app.post("/upload", upload.single("product"), (req, res) => {
  res.status(200).json({
    success: 1,
    image_url: `https://react-node-ecommerce-2agh.onrender.com/images/${req.file.filename}`,
  });  
});

// schema for creating products
const Product = mongoose.model("product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// creating an endpoint for adding the products
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    id = products[products.length - 1].id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
    category: req.body.category,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// creating API for deleting products
app.post("/removeproduct", async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.body.id });
  console.log("removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

// creating an API for Fetching all Products
app.get("/allproducts", async (req, res) => {
  const products = await Product.find({});
  res.json({
    success: true,
    products: products,
  });
  console.log("fetched");
});

// creating schema for user Model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

// creating an endpoint for registering the user i.e sign-up
app.post("/signup", async (req, res) => {
  try {
    // find if the same email user exists
    let check = await Users.findOne({ email: req.body.email });

    if (check) {
      return res.status(400).json({
        success: false,
        errors: "existing user has the Same Email-ID",
      });
    }

    // initialize all the cart items with 0
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }

    const user = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });

    await user.save();

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, "secret_ecom");

    return res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passcompare = req.body.password === user.password;
    if (passcompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "wrong password" });
    }
  } else {
    res.json({ success: false, errors: "wrong email id" });
  }
});

// creating an endpoint for the newcollections section
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollections = products.slice(1).slice(-8);
  console.log("new collections fetched");
  res.send(newcollections);
});

// creating an api endpoint for popular in women section
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "womens" });
  let popular_in_women = products.slice(0, 4);
  console.log("popular in women fetched");
  res.send(popular_in_women);
});

// creating a middleware for fetching the user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "please validate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "there is some internal problem with authentication" });
    }
  }
};

// creating an API endpoint for adding products in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });

  // safety fallback if there doesn't exist an item with that id
  const itemId = req.body.itemId;
  if (!itemId)
    return res.status(400).json({ error: "itemId missing in request body" });

  // incrementing the count and updating in database
  userData.cartData[itemId] = (userData.cartData[itemId] || 0) + 1;

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );

  res.send("added");
  console.log(userData);
});

// creating an API endpoint for removing products in cartData
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });

  // safety fallback if there doesn't exist an item with that id
  const itemId = req.body.itemId;
  if (!itemId)
    return res.status(400).json({ error: "itemId missing in request body" });

  // decrementing the count and updating in database
  if (userData.cartData[itemId] > 0) {
    userData.cartData[itemId] = (userData.cartData[itemId] || 0) - 1;
  }

  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );

  res.send("added");
  console.log(userData);
});


// creating a API endpoint for getcart
app.post("/getcart", fetchUser, async (req, res) => {
    const userData = await Users.findOne({_id: req.user.id});
    res.status(200).json(userData.cartData);
})

app.listen(port, (error) => {
  if (!error) {
    console.log(`server running on port ${port}`);
  } else {
    console.log("error: ", error);
  }
});