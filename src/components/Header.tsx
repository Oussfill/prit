'use client';

import Link from 'next/link';
import { useAuthContext } from '@/app/AuthProvider';

const Header = () => {
  const { user, logout } = useAuthContext();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Printella
        </Link>
        <nav>
          <Link href="/cart" className="mr-4">
            Cart
          </Link>
          {user ? (
            <>
              <span className="mr-4">Welcome, {user.name}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link href="/login">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;