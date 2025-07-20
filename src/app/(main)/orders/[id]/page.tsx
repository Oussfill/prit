'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useParams } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

const OrderDetailsPage = () => {
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        const response = await api.get(`order/${id}`);
        setOrder(response);
      };
      fetchOrder();
    }
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">Order Details</h1>
        <div className="mt-8">
          <p>
            <strong>Order ID:</strong> {order.sId}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <h2 className="text-2xl font-bold mt-8">Items</h2>
          <div>
            {order.orderItems.map((item) => (
              <div key={item.product.sId} className="flex items-center py-4 border-b">
                <img
                  src={item.product.images[0]?.url}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-bold">{item.product.name}</h3>
                  <p className="mt-2">Quantity: {item.quantity}</p>
                  <p className="mt-2">Price: ${item.product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default OrderDetailsPage;