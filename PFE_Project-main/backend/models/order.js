const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  acheteurId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Référence à l'acheteur
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Référence au produit
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "en cours" }, // Statut de la commande
});

module.exports = mongoose.model("Order", orderSchema);