'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import { Product } from '@/lib/types';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('product');
      setProducts(response);
      setFilteredProducts(response);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = [...products];

    if (searchTerm) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === 'low-to-high') {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [searchTerm, sortOrder, products]);

  return (
    <div>
      <h1 className="text-4xl font-bold">Products</h1>
      <div className="flex justify-between items-center mt-8">
        <input
          type="text"
          placeholder="Search products..."
          className="w-1/3 px-3 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-3 py-2 border rounded-md"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
        {filteredProducts.map((product) => (
          <Link href={`/products/${product.sId}`} key={product.sId}>
            <div className="border rounded-lg overflow-hidden">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="mt-2 text-lg font-semibold">${product.price}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;