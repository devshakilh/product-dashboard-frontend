'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { signOut } from '@/redux/slices/authSlices';

const Logout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignout = async () => {
    localStorage.removeItem('schoolId');
    await dispatch(signOut());
    router.push('/login'); // Redirect to login after logout
  };
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white text-black">
      <div className="w-96 rounded-md bg-white p-8 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold">Welcome to Dashboard</h1>
        <p className="text-mid mb-4 font-sans">
          You have successfully logged in.
        </p>
        <button
          onClick={handleSignout}
          className="w-full rounded border-none bg-red-500 py-2 text-white hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Logout;
