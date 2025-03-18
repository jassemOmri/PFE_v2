const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: { type: String, default: "en attente" },
  clientLat: { type: Number, required: true },
  clientLng: { type: Number, required: true },
  livreur: { type: mongoose.Schema.Types.ObjectId, ref: "Livreur", default: null },
});

module.exports = mongoose.model("Order", orderSchema);
