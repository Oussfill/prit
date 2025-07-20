'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/app/AuthProvider';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const response = await api.get(`order/user/${user.sId}`);
        setOrders(response);
      };
      fetchOrders();
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">My Orders</h1>
        <div className="mt-8">
          {orders.map((order) => (
            <Link href={`/orders/${order.sId}`} key={order.sId}>
              <div className="p-4 border rounded-lg mb-4">
                <p>
                  <strong>Order ID:</strong> {order.sId}
                </p>
                <p>
                  <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default OrdersPage;