const express = require("express");
const multer = require("multer");
const { getProducts, addProduct, getProductsByVendeur, deleteProduct } = require("../controller/productController"); // ✅ Importation correcte

const router = express.Router();

// 📌 **Configuration de `multer` pour le stockage des images**



const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 📌 **Routes des produits**
router.get("/products", getProducts); // ✅ Récupérer tous les produits
router.get("/products/vendeur/:vendeurId", getProductsByVendeur); // ✅ Récupérer les produits d'un vendeur spécifique
router.post("/products", upload.single("image"), addProduct); // ✅ Ajouter un produit avec `vendeurId`
router.delete("/products/:productId", deleteProduct); // ✅ Supprimer un produit spécifique
module.exports = router;
