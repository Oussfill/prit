'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useParams } from 'next/navigation';
import { useCartContext } from '@/app/CartProvider';
import { Product } from '@/lib/types';

const ProductDetailsPage = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();
  const { addToCart } = useCartContext();

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await api.get(`product/${id}`);
        setProduct(response);
      };
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-2xl font-semibold">${product.price}</p>
          <p className="mt-4">{product.description}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-8 w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;