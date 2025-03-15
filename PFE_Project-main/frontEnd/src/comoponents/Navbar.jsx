import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import SearchIcon from "@mui/icons-material/Search";
import UserContext from "../context/UserContext";

const Navbar = ({ onSearch }) => {
  const { user, logout } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (typeof onSearch === "function") {
      onSearch(searchTerm); // Appelez onSearch seulement si c'est une fonction
    } else {
      console.error("onSearch n'est pas une fonction");
    }
  };

  return (
    <div className="pt-20">
      <nav className="fixed top-0 left-0 w-full bg-white text-gray-800 shadow-md z-50 h-auto">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <Link to="/" className="text-2xl font-extrabold text-green-600 hover:text-green-500 transition">
            MarketPlace
          </Link>

          {/* Barre de recherche */}
          <div className="flex items-center flex-1 mx-6 relative">
            <input
              type="text"
              placeholder="Cherchez vos produits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-l-lg bg-gray-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              className="bg-green-500 px-3 py-2 rounded-r-lg hover:bg-green-400 text-white"
              onClick={handleSearch} // Utilisez handleSearch ici
            >
              <SearchIcon />
            </button>
          </div>

          {/* Liens d'authentification ou profil */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {user.role === "acheteur" && (
                  <Link to="/cart" className="relative text-gray-700 hover:text-green-500">
                    <ShoppingCartCheckoutIcon fontSize="large" />
                    <div className="bg-red-600 flex justify-center items-center w-6 h-6 text-white text-sm font-bold rounded-full">
                      2
                    </div>
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <span className="text-xs text-green-500">{user.role}</span>
                </div>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition"
                >
                  Déconnecter
                </button>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition">
                    S'inscrire
                  </button>
                </Link>
                <Link to="/login">
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition">
                    Se connecter
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;