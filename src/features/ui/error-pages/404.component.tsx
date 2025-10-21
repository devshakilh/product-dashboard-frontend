'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Wrapping the content inside motion.div to animate fade-in */}
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
            alt="Error 404"
            src="/images/error/error-404.png"
          />
        </motion.div>

        <motion.h3
          className="text-[24px] font-semibold leading-6 text-[#070707]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Oops! Looks like {`you’re`} lost.
        </motion.h3>

        <motion.p
          className="mt-4 h-[36px] font-[14px] text-[#6B7280]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          The page {`you’re`} looking for doesn’t exist or has been moved.
          Please check the URL or head back to the previous page.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button
            onClick={handleGoBack}
            className="mt-9 rounded-md bg-[#0D92F4] px-5 py-2 text-[14px] font-[500] text-[#FFFFFF]"
          >
            Back to Previous Page
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
