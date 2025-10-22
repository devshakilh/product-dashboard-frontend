import { Metadata } from 'next';
import { ProductList } from '@/features/dashboard/products';

export const metadata: Metadata = {
  title: 'Dashboard | ProductList',
};

const ProductListPage = () => {
  return <ProductList />;
};

export default ProductListPage;
