'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuthContext } from '@/app/AuthProvider';

const ProfilePage = () => {
  const { user } = useAuthContext();

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-4xl font-bold">Profile</h1>
        <div className="mt-8">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone}
          </p>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;