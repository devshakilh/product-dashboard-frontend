// 'use client';

// import { Card, CardContent } from '@/features/ui';
// import { LucideIcon } from 'lucide-react';

// interface StatCardProps {
//   title: string;
//   value: string | number;
//   icon: LucideIcon;
//   color: string;
//   bgColor: string;
// }

// export default function StatCard({
//   title,
//   value,
//   icon: Icon,
//   color,
//   bgColor,
// }: StatCardProps) {
//   return (
//     <Card className="rounded-lg border border-border shadow-sm transition-shadow duration-200 hover:shadow-md">
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm font-medium text-muted-foreground">{title}</p>
//             <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
//           </div>
//           <div className={`${bgColor} rounded-full p-3`}>
//             <Icon className={`h-6 w-6 ${color}`} />
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
