import React, { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "./UserNavbar";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Styles pour la carte Google Maps
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

// Centre de la carte (par défaut : Tunisie)
const center = {
  lat: 36.8065,
  lng: 10.1815,
};

const LivreurDashboard = () => {
  const [orders, setOrders] = useState([]); // Commandes à livrer
  const [markers, setMarkers] = useState([]); // Marqueurs pour la carte

  // Charger l'API Google Maps
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "VOTRE_CLE_API_GOOGLE_MAPS", // Remplacez par votre clé API
  });

  // Récupérer les commandes à livrer
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/livreur/orders")
      .then((response) => {
        setOrders(response.data);

        // Convertir les commandes en marqueurs pour la carte
        const newMarkers = response.data.map((order) => ({
          position: { lat: order.clientLat, lng: order.clientLng },
          label: order.clientName,
        }));
        setMarkers(newMarkers);
      })
      .catch((error) => console.error("Erreur lors du chargement des commandes:", error));
  }, []);

  // Confirmer la livraison d'une commande
  const confirmDelivery = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/livreur/orders/${orderId}`, { status: "livré" });
      setOrders(orders.filter((order) => order._id !== orderId)); // Retirer la commande livrée
      alert("Livraison confirmée !");
    } catch (error) {
      console.error("Erreur lors de la confirmation de la livraison:", error);
      alert("Erreur lors de la confirmation de la livraison");
    }
  };

  // Gestion des erreurs de chargement de Google Maps
  if (loadError) return <div>Erreur lors du chargement de Google Maps</div>;
  if (!isLoaded) return <div>Chargement de Google Maps...</div>;

  return (
    <div>
      <UserNavbar />
      <div className="container mx-auto p-6 min-h-screen">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Tableau de Bord Livreur</h2>

        {/* Carte Google Maps */}
        <div className="mb-8">
          <GoogleMap mapContainerStyle={mapContainerStyle} zoom={10} center={center}>
            {markers.map((marker, index) => (
              <Marker key={index} position={marker.position} label={marker.label} />
            ))}
          </GoogleMap>
        </div>

        {/* Liste des commandes à livrer */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Commandes à livrer</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">Aucune commande à livrer.</p>
        ) : (
          <table className="w-full text-left border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border">Client</th>
                <th className="p-3 border">Produit</th>
                <th className="p-3 border">Quantité</th>
                <th className="p-3 border">Statut</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{order.clientName}</td>
                  <td className="p-3 border">{order.productName}</td>
                  <td className="p-3 border">{order.quantity}</td>
                  <td className="p-3 border font-medium text-gray-700">{order.status}</td>
                  <td className="p-3 border">
                    <button
                      onClick={() => confirmDelivery(order._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-400"
                    >
                      Confirmer la livraison
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LivreurDashboard;