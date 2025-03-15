const Order = require("../models/order");
const User = require("../models/User"); // Importez le modèle User si nécessaire

exports.getOrdersByAcheteur = async (req, res) => {
  try {
    const { acheteurId } = req.params;

    // ✅ Vérifiez que l'acheteur existe
    const acheteur = await User.findById(acheteurId);
    if (!acheteur) {
      return res.status(404).json({ success: false, message: "Acheteur non trouvé" });
    }

    // ✅ Récupérez les commandes de l'acheteur
    const orders = await Order.find({ acheteurId }).populate("product"); // Assurez-vous que `product` est correctement peuplé

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "Aucune commande trouvée pour cet acheteur" });
    }

    res.json(orders);
  } catch (error) {
    console.error("🚨 Erreur dans getOrdersByAcheteur:", error); // Affichez l'erreur complète
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};