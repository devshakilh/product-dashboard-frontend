'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ConnectionLost = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) {
    // Redirect to the previous page when the connection is restored
    window.location.reload(); // Reloads the page to restore navigation
    return null;
  }
  return (
    <div className="flex items-center justify-center">
      {/* Wrapping the entire page in a motion.div to animate the whole page */}
      <motion.div
        className="mx-auto h-[565px] w-[490px] items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="mx-auto mb-2 mt-5"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Image
            width={490}
            height={337}
            alt="Connection Lost"
            src="/images/error/connection-lost.png"
          />
        </motion.div>

        <motion.h3
          className="mt-12 text-[24px] font-semibold leading-6 text-[#070707]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Connection Lost!
        </motion.h3>

        <motion.p
          className="mt-4 h-[36px] font-[14px] text-[#6B7280]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Oops! Looks like our connection got lost. Sorry, it looks like{' '}
          {`you're`} off the grid.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/login">
            <button className="mt-12 rounded-md bg-[#0D92F4] px-5 py-2 text-[14px] font-[500] text-[#FFFFFF]">
              Back to Login
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ConnectionLost;
