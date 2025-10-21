import { Metadata } from 'next';
import UpdateInfo from '@/features/account-setup/components/update-info.component';

export const metadata: Metadata = {
  title: 'Parent | ProfileSetUp',
};

const completeAccountSetup = () => {
  return <UpdateInfo />;
};

export default completeAccountSetup;
