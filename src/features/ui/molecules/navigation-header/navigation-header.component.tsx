'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Breadcrumb {
  label: string;
  href: string;
}

interface NavigationHeaderProps {
  title: string;
  breadcrumbs: Breadcrumb[];
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  breadcrumbs,
}) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button onClick={() => router.back()}>
          <Image
            width={20}
            height={20}
            alt="Back"
            src="/icons/chrevon-left.png"
          />
        </button>
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <div className="justifycenter flex items-center gap-1 text-xs text-gray-500">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                <Link
                  href={crumb.href}
                  className="flex items-center hover:underline"
                >
                  {crumb.label}
                </Link>
                {index < breadcrumbs.length - 1 && (
                  <Image
                    width={12}
                    height={12}
                    alt="Arrow"
                    src="/icons/chevron-right.png"
                    className="mt-1 inline-block"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;
