// 'use client';

// import { useState } from 'react';
// import {
//   Badge,
//   Button,
//   Input,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/features/ui';
// import {
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   useReactTable,
// } from '@tanstack/react-table';
// import { format } from 'date-fns';
// import { Edit, Search, ToggleLeft, Trash2 } from 'lucide-react';

// import { Product, ProductStatus } from '@/types/product';
// import { useDeleteProductMutation } from '@/lib/store/api/productsApi';

// interface ProductTableProps {
//   products: Product[];
//   onEdit: (product: Product) => void;
//   onStatusChange: (product: Product) => void;
// }

// const statusColors: Record<ProductStatus, string> = {
//   active: 'bg-green-100 text-green-800 border-green-200',
//   inactive: 'bg-gray-100 text-gray-800 border-gray-200',
//   'out-of-stock': 'bg-red-100 text-red-800 border-red-200',
// };

// export default function ProductTable({
//   products,
//   onEdit,
//   onStatusChange,
// }: ProductTableProps) {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [globalFilter, setGlobalFilter] = useState('');
//   const [deleteProduct] = useDeleteProductMutation();

//   const handleDelete = async (id: string) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await deleteProduct(id).unwrap();
//       } catch (error) {
//         console.error('Failed to delete product:', error);
//       }
//     }
//   };

//   const columns: ColumnDef<Product>[] = [
//     {
//       accessorKey: 'name',
//       header: 'Name',
//       cell: ({ row }) => (
//         <div className="font-medium text-gray-900">{row.original.name}</div>
//       ),
//     },
//     {
//       accessorKey: 'category',
//       header: 'Category',
//       cell: ({ row }) => (
//         <div className="text-gray-600">{row.original.category}</div>
//       ),
//     },
//     {
//       accessorKey: 'price',
//       header: 'Price',
//       cell: ({ row }) => (
//         <div className="font-medium text-green-600">
//           ${row.original.price.toFixed(2)}
//         </div>
//       ),
//     },
//     {
//       accessorKey: 'stock',
//       header: 'Stock',
//       cell: ({ row }) => {
//         const stock = row.original.stock;
//         return (
//           <div
//             className={
//               stock < 10 ? 'font-medium text-red-600' : 'text-gray-900'
//             }
//           >
//             {stock} units
//           </div>
//         );
//       },
//     },
//     {
//       accessorKey: 'status',
//       header: 'Status',
//       cell: ({ row }) => {
//         const status = row.original.status;
//         return (
//           <Badge className={statusColors[status]} variant="secondary">
//             {status.replace('-', ' ').toUpperCase()}
//           </Badge>
//         );
//       },
//     },
//     {
//       accessorKey: 'createdAt',
//       header: 'Created',
//       cell: ({ row }) => {
//         const date = row.original.createdAt;
//         return (
//           <div className="text-sm text-gray-600">
//             {format(new Date(date), 'MMM dd, yyyy')}
//           </div>
//         );
//       },
//     },
//     {
//       id: 'actions',
//       header: 'Actions',
//       cell: ({ row }) => (
//         <div className="flex items-center space-x-2">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => onEdit(row.original)}
//             className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
//             title="Edit"
//           >
//             <Edit className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => onStatusChange(row.original)}
//             className="h-8 w-8 p-0 hover:bg-purple-50 hover:text-purple-600"
//             title="Change Status"
//           >
//             <ToggleLeft className="h-4 w-4" />
//           </Button>
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={() => handleDelete(row.original.id)}
//             className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
//             title="Delete"
//           >
//             <Trash2 className="h-4 w-4" />
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const table = useReactTable({
//     data: products,
//     columns,
//     state: {
//       sorting,
//       globalFilter,
//     },
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setGlobalFilter,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     initialState: {
//       pagination: {
//         pageSize: 10,
//       },
//     },
//   });

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center space-x-2">
//         <div className="relative max-w-sm flex-1">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
//           <Input
//             placeholder="Search products..."
//             value={globalFilter}
//             onChange={(e) => setGlobalFilter(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//       </div>

//       <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id} className="bg-gray-50">
//                 {headerGroup.headers.map((header) => (
//                   <TableHead
//                     key={header.id}
//                     className="font-semibold text-gray-700"
//                   >
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow key={row.id} className="hover:bg-gray-50">
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No products found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-between">
//         <div className="text-sm text-gray-700">
//           Showing{' '}
//           {table.getState().pagination.pageIndex *
//             table.getState().pagination.pageSize +
//             1}{' '}
//           to{' '}
//           {Math.min(
//             (table.getState().pagination.pageIndex + 1) *
//               table.getState().pagination.pageSize,
//             products.length
//           )}{' '}
//           of {products.length} products
//         </div>
//         <div className="flex items-center space-x-2">
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
