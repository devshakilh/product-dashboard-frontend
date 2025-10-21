'use client';

import Image from 'next/image';
import Link from 'next/link';

const ErrorPage405 = () => {
  return (
    <div>
      <div className="mx-auto h-[495px] w-[582px] items-center justify-center text-center">
        <Image
          className="mx-auto mb-2 mt-5"
          width={527}
          height={337}
          alt="Error 405"
          src="/images/error/error-405.png"
        />
        <h3 className="text-[24px] font-semibold leading-6 text-[#070707]">
          Oops! This Action {`Isn't`} Allowed
        </h3>
        <p className="mt-4 h-[36px] font-[14px] text-[#6B7280]">
          The request method {`you're`} using is not supported for this page. If
          you believe this is an issue, please contact support.
        </p>
        <Link href="/">
          <button className="mt-9 rounded-md bg-[#0D92F4] px-5 py-2 text-[14px] font-[500] text-[#FFFFFF]">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage405;
