const express = require("express");
const router = express.Router();
const { addToCart, removeFromCart, getCart,confirmOrder } = require("../controller/cartController"); // ✅ Importez les fonctions du contrôleur

// ✅ Définissez les routes avec les fonctions de rappel
router.post("/add", addToCart); // Utilisez la fonction addToCart
router.post("/remove", removeFromCart); // Utilisez la fonction removeFromCart
router.get("/:acheteurId", getCart); // Utilisez la fonction getCart
router.post("/confirm", confirmOrder);
module.exports = router;