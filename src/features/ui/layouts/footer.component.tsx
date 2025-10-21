import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/features/ui/atoms';
import { useTranslations } from 'next-intl';

export type FooterType = {
  className?: string;
};

const Footer: NextPage<FooterType> = ({ className = '' }) => {
  const t = useTranslations('footer');

  return (
    <footer className={`px-6 py-10 text-center ${className}`}>
      <div className="mx-auto max-w-5xl px-4">
        <div className="mb-8">
          <Image
            className="mx-auto"
            src="/logos/Pulikidz Logo.png"
            alt="Pulikidz Logo"
            width={127}
            height={45}
          />
        </div>

        <p className="mb-6 text-base">{t('subscribeMessage')}</p>

        <div className="mx-auto mb-6 flex w-full max-w-md justify-center gap-2">
          <input
            className="grow rounded-lg border border-gray-200 px-4 py-2"
            placeholder={t('emailPlaceholder')}
            type="email"
          />
          <Button
            variant={'secondary'}
            className="px-8 font-medium text-gray-600"
          >
            {t('join')}
          </Button>
        </div>
        <p className="mb-8 text-xs text-gray-600">{t('consentMessage')}</p>

        <hr className="mb-6 border-t border-gray-600" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="order-2 text-sm sm:order-1">{t('copyright')}</p>
          <div className="order-1 flex flex-nowrap justify-center gap-4 text-sm sm:order-2">
            <Link href="/privacy-policy" className="underline">
              {t('links.privacyPolicy')}
            </Link>
            <Link href="/terms-of-service" className="underline">
              {t('links.termsOfService')}
            </Link>
            <Link href="/legal-policy" className="underline">
              {t('links.legalPolicy')}
            </Link>
            <Link href="/cookie-settings" className="underline">
              {t('links.cookieSettings')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
