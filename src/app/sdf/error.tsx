'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <motion.div
        className="shadowlg w-full max-w-md rounded-lg bg-white p-10 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-2xl font-extrabold text-red-600"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          500
        </motion.div>
        <motion.div
          className="mt-4 text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          Sorry, something went wrong.
        </motion.div>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Link href={'/'}>
            <button className="cursor-pointer rounded-full border-none bg-blue-500 px-12 py-3 font-bold text-white transition-colors hover:bg-blue-600">
              Back Home
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default ErrorPage;
