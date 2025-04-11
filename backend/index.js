const fs = require("fs/promises");
const bodyParser = require("body-parser")
const path = require("path");
const express = require("express");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use('/images', express.static(path.join(__dirname, "..", "src", "assets", "images")));
app.use(express.static('public'));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/meals", async (req, res) => {
  const meals = await fs.readFile(path.join(__dirname, "data", "meals.json"));
  res.json(JSON.parse(meals));
});

// New endpoint for handling orders
app.post("/orders", async (req, res) => {
  const orderData = req.body;
  
  // Validate order data
  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: "Invalid order data" });
  }
  
  try {
    // Create a unique order ID
    const orderId = Date.now().toString();
    const order = {
      id: orderId,
      ...orderData,
      date: new Date().toISOString()
    };
    
    // Check if orders file exists, create it if not
    let orders = [];
    try {
      const ordersData = await fs.readFile(path.join(__dirname, "data", "orders.json"));
      orders = JSON.parse(ordersData);
    } catch (error) {
      // File doesn't exist yet, we'll create it
    }
    
    // Add new order to existing orders
    orders.push(order);
    
    // Write updated orders back to file
    await fs.writeFile(
      path.join(__dirname, "data", "orders.json"),
      JSON.stringify(orders, null, 2)
    );
    
    res.status(201).json({ message: "Order saved", orderId });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to save order" });
  }
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3001);
