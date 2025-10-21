'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/features/ui/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Access translations
  const t = useTranslations('navbar');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[9999]"
      data-testid="navbar-container"
    >
      <nav
        className={cn(
          'w-full bg-white transition-shadow duration-200',
          isScrolled && 'shadow-[0_4px_12px_0_rgba(0,0,0,0.05)]'
        )}
        data-testid="navbar"
      >
        <div className="mx-auto flex h-[72px] max-w-screen-xl items-center justify-between px-4 lg:px-8">
          {/* Logo */}
          <Link href="/" className="relative" data-testid="logo-link">
            <Image
              src="/logos/Pulisync-Blue.png"
              alt="Pulisync Logo"
              width={110}
              height={45}
              priority
              data-testid="logo-image"
            />
          </Link>

          {/* Desktop Navigation */}
          <div
            className="hidden items-center gap-8 md:flex"
            data-testid="desktop-nav"
          >
            <Link
              href="/"
              className="text-sm font-normal text-gray-600 hover:text-primary-500"
              data-testid="nav-home"
            >
              {t('home')}
            </Link>
            <Link
              href="/#features"
              className="text-sm font-normal text-gray-600 hover:text-primary-500"
              data-testid="nav-features"
            >
              {t('features')}
            </Link>
            <Link
              href="/#pricing"
              className="text-sm font-normal text-gray-600 hover:text-primary-500"
              data-testid="nav-pricing"
            >
              {t('pricingPlans')}
            </Link>
            <Link
              href="/#contact"
              className="text-sm font-normal text-gray-600 hover:text-primary-500"
              data-testid="nav-contact"
            >
              {t('contact')}
            </Link>
            <Button
              variant="secondary"
              size="default"
              data-testid="login-button-desktop"
            >
              <Link
                href="/login"
                data-testid="login-link-desktop"
                className="font-medium text-gray-600"
              >
                {t('login')}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            data-testid="mobile-menu-button"
          >
            {isMenuOpen ? (
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-testid="close-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                data-testid="menu-icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute inset-x-0 top-[72px] bg-white p-4 shadow-lg md:hidden"
                data-testid="mobile-menu"
              >
                <div className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="text-sm text-gray-700 hover:text-primary-500"
                    data-testid="mobile-nav-home"
                  >
                    {t('home')}
                  </Link>
                  <Link
                    href="/features"
                    className="text-sm text-gray-700 hover:text-primary-500"
                    data-testid="mobile-nav-features"
                  >
                    {t('features')}
                  </Link>
                  <Link
                    href="/pricing"
                    className="text-sm text-gray-700 hover:text-primary-500"
                    data-testid="mobile-nav-pricing"
                  >
                    {t('pricingPlans')}
                  </Link>
                  <Button
                    variant="secondary"
                    size="default"
                    className="w-full"
                    data-testid="login-button-mobile"
                  >
                    <Link href="/login" data-testid="login-link-mobile">
                      {t('login')}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
