import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { LandingPageHero } from '@/features/public/home';
import { routing } from '@/i18n/routing';

const Contact = dynamic(() =>
  import('@/features/public/home').then((mod) => mod.Contact)
);
const Education = dynamic(() =>
  import('@/features/public/home').then((mod) => mod.Education)
);
const EventManagement = dynamic(() =>
  import('@/features/public/home').then((mod) => mod.EventManagement)
);
const Explorer = dynamic(() =>
  import('@/features/public/home').then((mod) => mod.Explorer)
);
const Faq = dynamic(() =>
  import('@/features/public/home').then((mod) => mod.Faq)
);
const Pricing = dynamic(() =>
  import('@/features/public/home').then((mod) => mod.Pricing)
);
const Collaborate = dynamic(() =>
  import('@/features/public/home').then((mod) => mod.Collaborate)
);
const Testimonial = dynamic(() =>
  import('@/features/public/home').then((mod) => mod.Testimonial)
);
const Features = dynamic(() =>
  import('@/features/public/home').then((mod) => mod.Features)
);

export const metadata: Metadata = {
  title: 'PuliSync | Home',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const HomePage = () => {
  return (
    <div className="overflow-x-hidden font-roboto">
      <LandingPageHero />
      <Features />
      <Education />
      <Testimonial />
      <Explorer />
      <Pricing />
      <EventManagement />
      <Faq />
      <Collaborate />
      <Contact />
    </div>
  );
};

export default HomePage;
