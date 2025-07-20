'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/app/AuthProvider';

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const fetchAddresses = async () => {
        const response = await api.get(`address/user/${user.sId}`);
        setAddresses(response);
      };
      fetchAddresses();
    }
  }, [user]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold">My Addresses</h1>
        <div className="mt-8">
          {addresses.map((address) => (
            <div key={address.sId} className="p-4 border rounded-lg mb-4">
              <p>
                {address.street}, {address.city}, {address.state} {address.zip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AddressPage;