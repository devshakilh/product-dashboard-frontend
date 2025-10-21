'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const ErrorPage503 = () => {
  return (
    <div>
      <div className="mx-auto h-[495px] w-[586px] items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            className="mx-auto mb-2 mt-5"
            width={527}
            height={337}
            alt="Error 503"
            src="/images/error/error-503.png"
          />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[24px] font-semibold leading-6 text-[#070707]"
        >
          Oops!{`We're`} Under Maintenance
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 h-[36px] font-[14px] leading-[18px] text-[#6B7280]"
        >
          Our services are temporarily unavailable. Please check back soon or
          contact support if you need urgent assistance.
        </motion.p>

        <motion.button
          className="mt-9 rounded-md bg-[#0D92F4] px-5 py-2 text-[14px] font-[500] text-[#FFFFFF]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Check Status
        </motion.button>
      </div>
    </div>
  );
};

export default ErrorPage503;
