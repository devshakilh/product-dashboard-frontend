export type ProductStatus = 'active' | 'inactive' | 'out-of-stock';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateProductDTO {
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description?: string;
}

export interface UpdateProductDTO {
  name?: string;
  category?: string;
  price?: number;
  stock?: number;
  status?: ProductStatus;
  description?: string;
}

export interface UpdateProductStatusDTO {
  status: ProductStatus;
}
