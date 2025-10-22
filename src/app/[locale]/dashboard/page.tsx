'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { RootState } from '@/lib/store';

export default function ProductsPage() {
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Products</h2>
      <div className="rounded-lg bg-white p-6 shadow">
        <p className="text-gray-600">Welcome to the Products page!</p>
        <p className="mt-2 text-gray-600">
          This is where you can manage your products. Add product listings, edit
          details, or view inventory.
        </p>
        <div className="mt-4">
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            onClick={() => alert('Add product functionality coming soon!')}
          >
            Add New Product
          </button>
        </div>
      </div>
    </div>
  );
}
