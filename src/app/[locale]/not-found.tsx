'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.div>
      <motion.div
        className="flex h-screen items-center justify-center bg-white"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="shadowxl rounded-lg bg-white p-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.h1
            className="text-29xl mb-4 font-bold text-red-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            404
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            The page you are looking for does not exist.
          </motion.p>
          <motion.p
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Link href={'/'}>
              <button className="cursor-pointer rounded-full border-none bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600">
                Back Home
              </button>
            </Link>
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
