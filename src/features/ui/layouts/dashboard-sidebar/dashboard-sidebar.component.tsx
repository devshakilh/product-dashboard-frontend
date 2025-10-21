'use client';

import Image from 'next/image';
import { Link, usePathname } from '@/i18n/routing';
import { cva, VariantProps } from 'class-variance-authority';
import {
  Building,
  Calendar,
  ChartSpline,
  CreditCard,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  NotebookPen,
  Package,
  Settings,
  Users,
  Utensils,
} from 'lucide-react';

import { cn } from '@/lib/utils';

const sidebarVariants = cva(
  'flex w-64 flex-col items-center border-r border-gray-200 bg-white p-6',
  {
    variants: {
      variant: {
        default: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const MODULES = [
  {
    title: 'Management',
    items: [
      { name: 'Dashboard', link: '/dashboard' },
      { name: 'Children', link: '/dashboard/children' },
      { name: 'Attendance', link: '/dashboard/attendance' },
      { name: 'Students', link: '/dashboard/students' },
      { name: 'Events', link: '/dashboard/events' },
      { name: 'School', link: '/dashboard/school' },
      { name: 'Teacher', link: '/dashboard/teachers' },
    ],
  },
  {
    title: 'Operational',
    items: [
      { name: 'Payments', link: '/dashboard/payments' },
      { name: 'Parents', link: '/dashboard/parents' },
      { name: 'Booking', link: '/dashboard/booking' },
      { name: 'Meals', link: '/dashboard/meals' },
      { name: 'Upgrade Plan', link: '/dashboard/upgrade-plans' },
      { name: 'Service', link: '/dashboard/service' },
    ],
  },
  {
    title: 'Others',
    items: [
      { name: 'Settings', link: '/dashboard/settings' },
      { name: 'Message', link: '/dashboard/messages' },
      { name: 'Support', link: '/dashboard/support' },
      { name: 'Logout', link: '/logout' },
    ],
  },
] as const;

// Automatically derive ModuleName type from MODULES
export type ModuleName = (typeof MODULES)[number]['items'][number]['name'];

// Ensure ICONS keys only accept valid module names
const ICONS: Record<ModuleName, React.ReactNode> = {
  Dashboard: <LayoutDashboard size={20} />,
  Children: <Users size={20} />,
  Attendance: <NotebookPen size={20} />,
  Students: <Users size={20} />,
  Events: <Calendar size={20} />,
  School: <Building size={20} />,
  Teacher: <GraduationCap size={20} />,
  Payments: <CreditCard size={20} />,
  Parents: <Users size={20} />,
  Booking: <Calendar size={20} />,
  Meals: <Utensils size={20} />,
  'Upgrade Plan': <ChartSpline size={20} />,
  Service: <Package size={20} />,
  Settings: <Settings size={20} />,
  Message: <MessageCircle size={20} />,
  Support: <Headphones size={20} />,
  Logout: <LogOut size={20} />,
};

interface SidebarProps extends VariantProps<typeof sidebarVariants> {
  allowedModules: ModuleName[];
}

const Sidebar: React.FC<SidebarProps> = ({
  allowedModules,
  variant,
  ...props
}) => {
  const pathname = usePathname();

  // Helper function to check if a route is active
  const isRouteActive = (link: string) => {
    if (link === '/dashboard' && pathname === '/dashboard') {
      return true;
    }
    return link !== '/dashboard' && pathname.startsWith(link);
  };

  return (
    <aside className={cn(sidebarVariants({ variant }))} {...props}>
      <Link href="/">
        <Image
          src="/logos/Pulisync-Blue.png"
          alt="Pulisync Logo"
          width={127}
          height={45}
          priority
        />
      </Link>
      <div className="mt-10 w-full">
        {MODULES.map(({ title, items }, index) => {
          const filteredItems = items.filter((item) =>
            allowedModules.includes(item.name)
          );

          if (filteredItems.length === 0) return null;

          return (
            <div key={index} className="mb-8">
              {variant === 'default' && (
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-600">
                  {title}
                </h3>
              )}
              <ul>
                {filteredItems.map(({ name, link }, i) => {
                  const isActive = isRouteActive(link);
                  return (
                    <li key={i}>
                      <Link
                        href={link}
                        className={cn(
                          'mb-2 flex cursor-pointer items-center gap-3 rounded-xl py-2 pl-8 text-sm font-semibold transition-colors',
                          isActive
                            ? 'bg-primary-50 text-blue-500'
                            : 'text-gray-700 hover:bg-primary-50 hover:text-blue-500'
                        )}
                      >
                        <span>{ICONS[name]}</span>
                        {variant === 'default' && <span>{name}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
