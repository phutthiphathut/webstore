"use client";
import React, { useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import M1 from "../public/image/mouse1.jpg";
import M2 from "../public/image/mouse2.jpg";
import M3 from "../public/image/mouse3.jpg";
import M4 from "../public/image/mouse4.jpg";

const MousePage = () => {
  const allMouseProducts = [
    { name: "Logitech Pro X Superlight 2", brand: "Logitech", wireless: "Yes", price: 159.99, image: M1 },
    { name: "Razer Viper V3 Pro", brand: "Razer", wireless: "Yes", price: 159.99, image: M2 },
    { name: "Akko Mouse", brand: "Akko", wireless: "No", price: 49.99, image: M3 },
    { name: "HyperX Mouse", brand: "HyperX", wireless: "Yes", price: 69.99, image: M4 },
  ];

  const [filteredProducts, setFilteredProducts] = useState(allMouseProducts);
  const [brandFilters, setBrandFilters] = useState([]);
  const [wirelessFilter, setWirelessFilter] = useState("");
  const router = useRouter();

  // Handle adding the product to the cart
  const handleAddToCart = (product) => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const productToAdd = {
      ...product,
      price: parseFloat(product.price),  // Ensure price is a number
    };
    currentCart.push(productToAdd);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    router.push('/cart');
  };

  // Handle brand filters
  const handleBrandChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setBrandFilters([...brandFilters, value]);
    } else {
      setBrandFilters(brandFilters.filter((brand) => brand !== value));
    }
  };

  // Handle wireless filter
  const handleWirelessChange = (e) => {
    setWirelessFilter(e.target.value);
  };

  // Apply filters to the product list
  const applyFilters = () => {
    let filtered = allMouseProducts;

    if (brandFilters.length > 0) {
      filtered = filtered.filter((product) => brandFilters.includes(product.brand));
    }

    if (wirelessFilter) {
      filtered = filtered.filter((product) => product.wireless === wirelessFilter);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div className="product-page">
      <h1 className="product-title">MOUSE</h1>

      {/* Filter section */}
      <div className="product-filter">
        <div className="filter-group">
          <h3 className="text-purple-500">Brand:</h3>
          <label>
            <input
              type="checkbox"
              value="Logitech"
              onChange={handleBrandChange}
            />
            Logitech
          </label>
          <label>
            <input
              type="checkbox"
              value="Razer"
              onChange={handleBrandChange}
            />
            Razer
          </label>
          <label>
            <input
              type="checkbox"
              value="Akko"
              onChange={handleBrandChange}
            />
            Akko
          </label>
          <label>
            <input
              type="checkbox"
              value="HyperX"
              onChange={handleBrandChange}
            />
            HyperX
          </label>
        </div>

        <div className="filter-group">
          <h3 className="text-purple-500">Wireless:</h3>
          <label>
            <input
              type="radio"
              value="Yes"
              name="wireless"
              onChange={handleWirelessChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              value="No"
              name="wireless"
              onChange={handleWirelessChange}
            />
            No
          </label>
        </div>

        <button className="apply-filters" onClick={applyFilters}>
          Apply Filters
        </button>
      </div>

      {/* Product listing */}
      <div className="product-grid">
        {filteredProducts.map((product, index) => (
          <div key={index} className="product-card">
            <Image
              src={product.image}
              alt={product.name}
              width={150}
              height={300}
            />
            <p>{product.name}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MousePage;