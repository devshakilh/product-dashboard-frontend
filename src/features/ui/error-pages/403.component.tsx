'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ErrorPage403 = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Wrapping the page content in motion.div for fade-in effect */}
      <motion.div
        className="mx-auto h-[495px] w-[582px] items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="mx-auto mb-2 mt-5"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            width={527}
            height={337}
            alt="Error 403"
            src="/images/error/error-403.png"
          />
        </motion.div>

        <motion.h3
          className="text-[24px] font-semibold leading-6 text-[#070707]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Oops! You {`Don't`} Have Permission
        </motion.h3>

        <motion.p
          className="mt-4 h-[36px] font-[14px] text-[#6B7280]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {`We're`} sorry, but you {`don’t`} have the necessary permissions to
          access this page. If you think this is an error, please reach out to
          support.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/">
            <button className="mt-9 rounded-md bg-[#0D92F4] px-5 py-2 text-[14px] font-[500] text-[#FFFFFF]">
              Back to Home
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage403;
