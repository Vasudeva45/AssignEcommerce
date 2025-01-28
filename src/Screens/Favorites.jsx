import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HeartIcon } from "@heroicons/react/24/solid";
import { Loader2 } from "lucide-react";
import axios from "axios";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteIds = JSON.parse(
          localStorage.getItem("favorites") || "[]"
        );

        if (favoriteIds.length === 0) {
          setFavorites([]);
          setLoading(false);
          return;
        }

        const response = await axios.get("https://fakestoreapi.com/products");
        const favoriteProducts = response.data.filter((product) =>
          favoriteIds.includes(product.id)
        );

        setFavorites(favoriteProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const removeFavorite = (productId) => {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites") || "[]");
    const updatedFavoriteIds = favoriteIds.filter((id) => id !== productId);
    localStorage.setItem("favorites", JSON.stringify(updatedFavoriteIds));

    setFavorites((prev) => prev.filter((product) => product.id !== productId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          No favorites yet
        </h2>
        <p className="text-gray-600">
          Start adding some products to your favorites!
        </p>
        <Link
          to="/"
          className="inline-block mt-4 text-blue-600 hover:text-blue-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Favorites</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link to={`/product/${product.id}`}>
              <div className="h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            <div className="p-4 space-y-2">
              <Link to={`/product/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 truncate">
                  {product.title}
                </h3>
              </Link>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <HeartIcon className="h-6 w-6 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
