import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userId) {
      axios
        .get(`http://localhost:5000/api/cart/${user.userId}`)
        .then((response) => setCart(response.data.products))
        .catch((error) => console.error("Erreur:", error));
    }
  }, [user]);

  // Calculer le total du panier
  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  // Rediriger vers la page de paiement en ligne
  const handleOnlinePayment = () => {
    navigate("/payment"); // Redirige vers la page de paiement
  };

  // Confirmer la commande avec paiement à la livraison
  const handleDeliveryPayment = async () => {
    try {
      await axios.post("http://localhost:5000/api/cart/confirm", {
        acheteurId: user.userId,
        paymentMethod: "à la livraison",
      });
      alert("Commande confirmée ! Les produits seront livrés.");
      setCart([]); // Vider le panier
    } catch (error) {
      console.error("Erreur lors de la confirmation de la commande:", error);
      alert("Erreur lors de la confirmation de la commande");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Votre Panier</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((product) => (
            <div key={product.productId} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
              <p className="text-gray-600">{product.price}€ x {product.quantity}</p>
            </div>
          ))}
          <div className="mt-6">
            <p className="text-xl font-bold text-gray-800">Total : {calculateTotal().toFixed(2)}€</p>
          </div>
          <div className="mt-6 space-x-4">
            <button
              onClick={handleOnlinePayment}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition"
            >
              Payer en ligne
            </button>
            <button
              onClick={handleDeliveryPayment}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition"
            >
              Payer à la livraison
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;