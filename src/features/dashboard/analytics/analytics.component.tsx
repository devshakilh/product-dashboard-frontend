// 'use client';

// import AnalyticsSkeleton from '@/features/dashboard/analytics/analytics-skeleton.component';
// import CategoryChart from '@/features/dashboard/analytics/category-chart.component';
// import PriceChart from '@/features/dashboard/analytics/price-chart.component';
// import StatusChart from '@/features/dashboard/analytics/status-chart.component';
// import { StatCard } from '@/features/ui';
// import { AlertCircle, DollarSign, Package, TrendingUp } from 'lucide-react';

// import { useFirestoreRealtime } from '@/lib/hooks/useFirestoreRealtime';

// export default function Analytics() {
//   const { products, loading } = useFirestoreRealtime();

//   if (loading) {
//     return <AnalyticsSkeleton />;
//   }

//   const totalProducts = products.length;
//   const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
//   const activeProducts = products.filter((p) => p.status === 'active').length;
//   const lowStock = products.filter((p) => p.stock < 10).length;

//   const stats = [
//     {
//       title: 'Total Products',
//       value: totalProducts,
//       icon: Package,
//       color: 'text-blue-600',
//       bgColor: 'bg-blue-100',
//     },
//     {
//       title: 'Total Value',
//       value: `${totalValue.toLocaleString()}`,
//       icon: DollarSign,
//       color: 'text-green-600',
//       bgColor: 'bg-green-100',
//     },
//     {
//       title: 'Active Products',
//       value: activeProducts,
//       icon: TrendingUp,
//       color: 'text-purple-600',
//       bgColor: 'bg-purple-100',
//     },
//     {
//       title: 'Low Stock',
//       value: lowStock,
//       icon: AlertCircle,
//       color: 'text-orange-600',
//       bgColor: 'bg-orange-100',
//     },
//   ];

//   return (
//     <div className="space-y-6">
//       <div>
//         <h2 className="text-3xl font-bold text-foreground">Analytics</h2>
//         <p className="mt-1 text-sm text-muted-foreground">
//           Real-time insights into your product inventory
//         </p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => (
//           <StatCard
//             key={stat.title}
//             title={stat.title}
//             value={stat.value}
//             icon={stat.icon}
//             color={stat.color}
//             bgColor={stat.bgColor}
//           />
//         ))}
//       </div>

//       {/* Charts Grid */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         <CategoryChart products={products} />
//         <StatusChart products={products} />
//       </div>

//       <div className="grid grid-cols-1">
//         <PriceChart products={products} />
//       </div>
//     </div>
//   );
// }
