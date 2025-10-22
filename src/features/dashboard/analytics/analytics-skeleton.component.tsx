// 'use client';

// import { Card, CardContent, CardHeader } from '@/features/ui';

// export default function AnalyticsSkeleton() {
//   return (
//     <div className="space-y-6">
//       {/* Header Skeleton */}
//       <div className="space-y-2">
//         <div className="h-8 w-1/4 animate-pulse rounded-md bg-muted"></div>
//         <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted"></div>
//       </div>

//       {/* Stats Grid Skeleton */}
//       <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
//         {[...Array(4)].map((_, index) => (
//           <Card
//             key={index}
//             className="rounded-lg border border-border shadow-sm"
//           >
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="space-y-2">
//                   <div className="h-4 w-20 animate-pulse rounded-md bg-muted"></div>
//                   <div className="h-6 w-16 animate-pulse rounded-md bg-muted"></div>
//                 </div>
//                 <div className="h-10 w-10 animate-pulse rounded-full bg-muted"></div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Charts Grid Skeleton */}
//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         {[...Array(2)].map((_, index) => (
//           <Card
//             key={index}
//             className="rounded-lg border border-border shadow-sm"
//           >
//             <CardHeader className="pb-2">
//               <div className="h-5 w-1/3 animate-pulse rounded-md bg-muted"></div>
//               <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted"></div>
//             </CardHeader>
//             <CardContent className="p-6">
//               <div className="h-[250px] w-full animate-pulse rounded-md bg-muted"></div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Price Chart Skeleton */}
//       <div className="grid grid-cols-1">
//         <Card className="rounded-lg border border-border shadow-sm">
//           <CardHeader className="pb-2">
//             <div className="h-5 w-1/3 animate-pulse rounded-md bg-muted"></div>
//             <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted"></div>
//           </CardHeader>
//           <CardContent className="p-6">
//             <div className="h-[300px] w-full animate-pulse rounded-md bg-muted"></div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
