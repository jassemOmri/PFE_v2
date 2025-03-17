
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const app = express();


app.use(express.json());
app.use(cors());

// Configuration de Multer pour le stockage des images
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRouter");
const adminRoutes = require("./routes/adminRoutes"); // Importer les routes de l'administrateur
const confirmDelivery=require("./routes/cartRoutes");


app.use("/api/orders", orderRoutes);

app.use("/api/cart", cartRoutes); 




app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Permet d'afficher les images

app.use("/auth", authRoutes);




app.use("/api", productRoutes);
app.use("/api", confirmDelivery);  

app.use("/api/admin", adminRoutes); // Utiliser les routes de l'administrateur


mongoose.connect("mongodb://127.0.0.1:27017/employee", {
}).then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(" MongoDB Connection Error:", err));


app.listen(5000, () => console.log(' Server running '));
