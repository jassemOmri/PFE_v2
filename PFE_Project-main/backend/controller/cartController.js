const Cart = require("../models/Cart");
const Product = require("../models/product");
const User = require("../models/User");

exports.addToCart = async (req, res) => {
  try {
    const { acheteurId, productId, quantity } = req.body;

    if (!acheteurId || !productId) {
      return res.status(400).json({ success: false, message: "acheteurId et productId sont requis" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Produit non trouvé" });
    }

    const acheteur = await User.findById(acheteurId);
    if (!acheteur) {
      return res.status(404).json({ success: false, message: "Acheteur non trouvé" });
    }

    let cart = await Cart.findOne({ acheteurId });
    if (!cart) {
      cart = new Cart({ acheteurId, products: [] });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        vendeurId: product.vendeurId,
        quantity,
      });
    }

    await cart.save();
    res.json({ success: true, message: "Produit ajouté au panier", cart });
  } catch (error) {
    console.error("Erreur dans addToCart:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { acheteurId, productId } = req.body;

    let cart = await Cart.findOne({ acheteurId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Panier introuvable" });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();

    res.json({ success: true, message: "Produit supprimé du panier", cart });
  } catch (error) {
    console.error("Erreur dans removeFromCart:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};



exports.confirmOrder = async (req, res) => {
  try {
    const { acheteurId, paymentMethod } = req.body;

    const cart = await Cart.findOne({ acheteurId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ success: false, message: "Panier vide" });
    }

    // Récupérer tous les livreurs
    const livreurs = await Livreur.find({});
    if (livreurs.length === 0) {
      return res.status(404).json({ success: false, message: "Aucun livreur trouvé" });
    }

    // Créer une commande pour chaque produit
    const orders = cart.products.map((product) => ({
      acheteurId,
      productId: product.productId,
      quantity: product.quantity,
      status: "en attente", // Statut initial
      livreurs: livreurs.map((livreur) => livreur._id), // Assigner la commande à tous les livreurs
      clientName: "Nom du client", // Remplacer par les vraies données
      clientLat: 36.8065, // Latitude du client (à remplacer par les vraies coordonnées)
      clientLng: 10.1815, // Longitude du client (à remplacer par les vraies coordonnées)
    }));

    // Enregistrer les commandes dans la base de données
    await Order.insertMany(orders);

    // Vider le panier
    await Cart.findOneAndDelete({ acheteurId });

    res.json({ success: true, message: `Commande confirmée avec paiement ${paymentMethod}` });
  } catch (error) {
    console.error("Erreur dans confirmOrder:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

exports.getCart = async (req, res) => {
  try {
    const { acheteurId } = req.params;
    if (!acheteurId) {
      return res.status(400).json({ success: false, message: "acheteurId est requis" });
    }

    const cart = await Cart.findOne({ acheteurId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Panier introuvable" });
    }

    res.json(cart);
  } catch (error) {
    console.error("Erreur dans getCart:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};

exports.confirmDelivery = async (req, res) => {
  try {
    const { orderId, livreurId } = req.body;

    // Trouver la commande
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Commande non trouvée" });
    }

    // Vérifier si la commande est déjà confirmée par un autre livreur
    if (order.livreurConfirme) {
      return res.status(400).json({ success: false, message: "Commande déjà confirmée" });
    }

    // Assigner la commande au livreur qui confirme
    order.livreurConfirme = livreurId;
    order.status = "en cours"; // Mettre à jour le statut
    await order.save();

    // Supprimer la commande pour tous les autres livreurs
    await Order.updateMany(
      { _id: { $ne: orderId }, livreurs: livreurId },
      { $pull: { livreurs: livreurId } }
    );

    res.json({ success: true, message: "Commande confirmée avec succès", order });
  } catch (error) {
    console.error("Erreur dans confirmDelivery:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
};