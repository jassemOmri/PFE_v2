const express = require("express");
const router = express.Router();
const { addToCart, removeFromCart, confirmOrder, getCart,confirmDelivery } = require("../controller/cartController"); // ✅ Importez les fonctions du contrôleur

// ✅ Définissez les routes avec les fonctions de rappel
router.post("/add", addToCart); // Utilisez la fonction addToCart
router.post("/remove", removeFromCart); // Utilisez la fonction removeFromCart
router.post("/confirm", confirmOrder); // Utilisez la fonction confirmOrder
router.get("/:acheteurId", getCart); // Utilisez la fonction getCart
router.post("/confirmDelivery", confirmDelivery); // Utilisez la fonction confirmDelivery  
module.exports = router;