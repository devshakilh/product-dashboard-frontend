'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ResultNotFound = () => {
  return (
    <div>
      <div className="mx-auto h-[505px] w-[613px] items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            className="mx-auto mb-2 mt-5"
            width={613}
            height={309}
            alt="Result Not Found"
            src="/images/error/no-result.png"
          />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-[24px] font-semibold leading-6 text-[#070707]"
        >
          No Result Found !
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-4 h-[36px] font-[14px] text-[#6B7280]"
        >
          {`"Sorry, we came up empty-handed.Let's broaden our search and help
          you find what you're looking for."`}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/search">
            <button className="mt-12 rounded-md bg-[#0D92F4] px-5 py-2 text-[14px] font-[500] text-[#FFFFFF]">
              Search Again
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultNotFound;
