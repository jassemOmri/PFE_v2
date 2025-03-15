import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert("Veuillez accepter les termes et conditions.");
      return;
    }
    alert("Paiement réussi !");
    navigate("/"); // Rediriger vers la page d'accueil
  };

  const applyDiscount = () => {
    if (discountCode === "DISCOUNT20") {
      setDiscountApplied(true);
      alert("Code de réduction appliqué !");
    } else {
      alert("Code de réduction invalide.");
    }
  };

  const subtotal = 44.0;
  const shipping = 5.0;
  const discount = discountApplied ? 20.0 : 0.0;
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h2>

          {/* Informations de livraison */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Shipping Information</h3>
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setDeliveryMethod("delivery")}
                className={`px-6 py-2 rounded-lg ${
                  deliveryMethod === "delivery"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Delivery
              </button>
              <button
                onClick={() => setDeliveryMethod("pickup")}
                className={`px-6 py-2 rounded-lg ${
                  deliveryMethod === "pickup"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Pick up
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country *
                </label>
                <input
                  type="text"
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="agreeTerms" className="text-sm text-gray-700">
                  I have read and agree to the Terms and Conditions.
                </label>
              </div>
            </form>
          </div>

          {/* Récapitulatif du panier */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Review your cart</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">DuoComfort Safe Premium</span>
                <span className="text-gray-700">$20.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">IronOne Desk</span>
                <span className="text-gray-700">$25.00</span>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Subtotal</span>
                <span className="text-gray-700">$44.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Shipping</span>
                <span className="text-gray-700">$5.00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Discount</span>
                <span className="text-gray-700">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Code de réduction */}
          <div className="mb-8">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                onClick={applyDiscount}
                className="ml-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-400 transition"
              >
                Apply
              </button>
            </div>
          </div>

          {/* Bouton de paiement */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-400 transition"
          >
            Pay Now
          </button>

          {/* Sécurité */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <span className="mr-2">🔒</span> Secure Checkout - SSL Encrypted
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;