'use client';

import { useEffect } from 'react';
import { useAuthContext } from '@/app/AuthProvider';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // or a loading spinner
  }

  return children;
};

export default ProtectedRoute;