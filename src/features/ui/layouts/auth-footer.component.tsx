import Link from 'next/link';
import { useTranslations } from 'next-intl';

const AuthFooter = () => {
  const t = useTranslations('authFooter');
  return (
    <footer className="flex w-full flex-col items-center justify-between px-6 py-4 text-sm text-gray-600 sm:grid sm:grid-cols-2 sm:gap-6 lg:px-32">
      <div className="mb-4 text-center sm:mb-0 sm:text-left">
        <span>{t('copyright')}</span>
      </div>

      <nav className="flex space-x-4 sm:justify-end sm:space-x-6 sm:text-right">
        <Link href="/help" className="transition-colors hover:text-gray-900">
          {t('links.helpCenter')}
        </Link>

        <Link
          href="/privacy-policy"
          className="transition-colors hover:text-gray-900"
        ></Link>

        <Link
          href="/terms-of-service"
          className="transition-colors hover:text-gray-900"
        >
          {t('links.privacyPolicy')}
        </Link>
      </nav>
    </footer>
  );
};

export default AuthFooter;
