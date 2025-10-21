'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const ErrorPage410 = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex h-full items-center justify-center py-24">
      <motion.div
        className="mx-auto items-center justify-center text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="mx-auto mb-2 mt-5 h-[340px] w-[339px]"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            width={339}
            height={340}
            alt="Error 404"
            src="/images/error/error-410.gif"
          />
        </motion.div>

        <motion.h3
          className="text-[24px] font-semibold leading-6 text-[#070707]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          This feature will be live Soon !!
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={handleGoBack}
            className="mt-9 rounded-md bg-[#0D92F4] px-6 py-3 text-[14px] font-[500] text-[#FFFFFF]"
          >
            Back
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage410;
