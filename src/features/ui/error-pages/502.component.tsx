'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ErrorPage502 = () => {
  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };

  return (
    <div>
      <div className="mx-auto h-[489px] w-[688px] items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            className="mx-auto mb-2 mt-5"
            width={527}
            height={337}
            alt="Error 502"
            src="/images/error/error-502.png"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-[24px] text-[24px] font-semibold leading-6 text-[#070707]"
        >
          Oops! Temporary Connection Issue
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 h-[18px] font-[14px] leading-[18px] text-[#6B7280]"
        >
          There seems to be a problem with the connection. Please refresh the
          page or try again later.
        </motion.p>

        <motion.button
          onClick={handleRefresh}
          className="mt-9 rounded-md bg-[#0D92F4] px-5 py-2 text-[14px] font-[500] text-[#FFFFFF]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Refresh Page
        </motion.button>
      </div>
    </div>
  );
};

export default ErrorPage502;
