'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { toast } from 'react-hot-toast';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        // const API_URL = process.env.NEXT_PUBLIC_API_URL;

        // await axios.post(
        //   `${API_URL}/auth/signOut`,
        //   {},
        //   {
        //     withCredentials: true,
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   }
        // );
        localStorage.removeItem('schoolId');
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : 'Something went wrong';
        toast.error(errorMessage);
      } finally {
        await signOut({ redirect: false });

        router.push('/login');
      }
    };

    logout();
  }, [router]);

  return <p>Logging out...</p>;
};

export default LogoutPage;
