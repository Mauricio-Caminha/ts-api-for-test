export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

export interface CreateUserDto {
  name: string;
  email: string;
  age: number;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
}

export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
}

export interface CreateCarDto {
  brand: string;
  model: string;
  year: number;
  color: string;
  price: number;
}

export interface UpdateCarDto {
  brand?: string;
  model?: string;
  year?: number;
  color?: string;
  price?: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  category?: string;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface CreateOrderDto {
  userId: string;
  items: OrderItem[];
  total?: number;
  status?: 'pending' | 'processing' | 'completed' | 'cancelled';
}

export interface UpdateOrderDto {
  userId?: string;
  items?: OrderItem[];
  total?: number;
  status?: 'pending' | 'processing' | 'completed' | 'cancelled';
}

