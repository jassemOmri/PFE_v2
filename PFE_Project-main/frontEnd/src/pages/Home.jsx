import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../comoponents/Footer";
import Navbar from "../comoponents/Navbar";
import UserContext from "../context/UserContext";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  // Fonction pour gérer la recherche
  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products); // Affichez tous les produits si la recherche est vide
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered); // Filtrez les produits en fonction du terme de recherche
    }
  };

  // Charger tous les produits au montage du composant
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialisez les produits filtrés avec tous les produits
      })
      .catch((error) => console.error("Erreur lors du chargement des produits:", error))
      .finally(() => setLoading(false));
  }, []);

  // Fonction pour ajouter un produit au panier
  const addToCart = async (product) => {
    if (!user || !user.userId || user.role !== "acheteur") {
      alert("Veuillez vous connecter pour ajouter des produits au panier !");
      return;
    }

    const payload = {
      acheteurId: user.userId,
      productId: product._id,
      quantity: 1,
    };

    try {
      await axios.post("http://localhost:5000/api/cart/add", payload);
      alert("Produit ajouté au panier !");
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      alert("Erreur lors de l'ajout au panier !");
    }
  };

  return (
    <div>
      {/* Passez la fonction handleSearch à Navbar */}
      <Navbar onSearch={handleSearch} />

      <div className="min-h-screen flex flex-col justify-between">
        <div className="container mx-auto p-8 flex-1">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Produits Disponibles</h2>

          {loading ? (
            <p className="text-center text-gray-500">Chargement des produits...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500">Aucun produit trouvé</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-2xl transition duration-300"
                >
                  <div onClick={() => navigate(`/product/${product._id}`)} className="cursor-pointer">
                    <img
                      src={`http://localhost:5000/uploads/${product.image}`}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-md mb-3"
                    />
                    <h4 className="text-lg font-semibold mb-1 text-gray-900">{product.name}</h4>
                    <p className="text-gray-600 mb-2 text-lg font-medium">${product.price}</p>
                  </div>

                  {user && user.role === "acheteur" && (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition"
                    >
                      Ajouter au panier
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;