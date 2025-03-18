const Order = require("../models/order");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ livreur: null });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

exports.confirmOrder = async (req, res) => {
  const { livreurId } = req.body;
  const { orderId } = req.params;

  try {
    // Vérifier si la commande existe
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Commande non trouvée" });

    // Associer la commande au livreur et mettre à jour le statut
    order.livreur = livreurId;
    order.status = "en cours de livraison";
    await order.save();

    // Supprimer la commande pour les autres livreurs
    await Order.deleteMany({ _id: { $ne: orderId }, clientName: order.clientName });

    res.json({ message: "Commande assignée avec succès", order });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
