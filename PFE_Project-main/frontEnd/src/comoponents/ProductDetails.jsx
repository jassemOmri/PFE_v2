import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../comoponents/Navbar";
import Footer from "./Footer";

const ProductDetails = () => {
  const { id } = useParams(); // Récupère l'ID du produit depuis l'URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur de chargement du produit:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  if (!product) {
    return <div className="text-center py-8">Produit non trouvé</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-4">
            <a href="/" className="hover:text-gray-900">Home</a> &gt;{" "}
            <a href="/products" className="hover:text-gray-900">Products</a> &gt;{" "}
            <span className="text-gray-900">{product.name}</span>
          </div>

          {/* Product Title */}
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>

          {/* Rating and Stock */}
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {"⭐".repeat(5)} {/* Affiche 5 étoiles */}
            </div>
            <span className="ml-2 text-gray-700">{product.rating} ({product.stock} en stock)</span>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-red-600 mb-6">
            ${product.price} <span className="text-sm text-gray-500">/ unité</span>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-gray-600">Type:</div>
            <div className="text-gray-900">{product.type}</div>
            <div className="text-gray-600">Couleur:</div>
            <div className="text-gray-900">{product.color}</div>
            <div className="text-gray-600">Matériau:</div>
            <div className="text-gray-900">{product.material}</div>
            <div className="text-gray-600">Marque:</div>
            <div className="text-gray-900">{product.brand}</div>
          </div>

          {/* Size and Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="size" className="text-gray-600">Taille:</label>
            <select id="size" className="p-2 border rounded">
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>

            <label htmlFor="quantity" className="text-gray-600">Quantité:</label>
            <input
              type="number"
              id="quantity"
              defaultValue="1"
              min="1"
              className="p-2 border rounded w-16"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
              Acheter maintenant
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Ajouter au panier
            </button>
            <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;