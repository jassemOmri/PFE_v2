const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  acheteurId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: "en attente" }, // Statut initial
  livreurs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Livreur" }], // Tous les livreurs
  livreurConfirme: { type: mongoose.Schema.Types.ObjectId, ref: "Livreur" }, // Livreur qui confirme
  clientName: { type: String, required: true },
  clientLat: { type: Number, required: true }, // Latitude du client
  clientLng: { type: Number, required: true }, // Longitude du client
});

module.exports = mongoose.model("Order", orderSchema);