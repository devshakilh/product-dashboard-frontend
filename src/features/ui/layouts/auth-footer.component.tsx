import Link from 'next/link';

const AuthFooter = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-between px-6 py-4 text-sm text-gray-600 sm:grid sm:grid-cols-2 sm:gap-6 lg:px-32">
      <div className="mb-4 text-center sm:mb-0 sm:text-left">
        <span>
          © {new Date().getFullYear()} Eagle 3D Streaming. All rights reserved.
        </span>
      </div>

      <nav className="flex space-x-4 sm:justify-end sm:space-x-6 sm:text-right">
        <Link href="/help" className="transition-colors hover:text-gray-900">
          Help Center
        </Link>

        <Link
          href="/privacy-policy"
          className="transition-colors hover:text-gray-900"
        >
          Privacy Policy
        </Link>

        <Link
          href="/terms-of-service"
          className="transition-colors hover:text-gray-900"
        >
          Terms of Service
        </Link>
      </nav>
    </footer>
  );
};

export default AuthFooter;
