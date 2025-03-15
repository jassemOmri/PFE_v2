const express = require("express");
const router = express.Router();
const Order = require("../models/order"); // Importez le modèle Order
const { getOrdersByAcheteur } = require("../controller/orderController"); // Importez la fonction existante

// ✅ Route pour récupérer les commandes d'un acheteur
router.get("/acheteur/:acheteurId", getOrdersByAcheteur);

// ✅ Route pour récupérer les commandes à livrer (pour le livreur)
router.get("/livreur/orders", async (req, res) => {
  try {
    const orders = await Order.find({ status: "en cours" }); // Récupérer les commandes non livrées
    res.json(orders);
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// ✅ Route pour confirmer la livraison d'une commande (pour le livreur)
router.put("/livreur/orders/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status: "livré" }, { new: true });
    res.json({ success: true, message: "Livraison confirmée", order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

module.exports = router;