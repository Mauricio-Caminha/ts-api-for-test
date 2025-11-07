import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import type { Product, CreateProductDto, UpdateProductDto } from '../../types';

let products: Product[];

beforeEach(() => {
  products = [
    { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
    { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
    { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
  ];
});

describe('ProductService', () => {
  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const result = await getAllProducts();
      expect(result).toEqual(products);
    });
  });

  describe('getProductById', () => {
    it('should return product when id exists', async () => {
      const result = await getProductById('1');
      expect(result).toEqual(products[0]);
    });

    it('should return undefined when id does not exist', async () => {
      const result = await getProductById('999');
      expect(result).toBeUndefined();
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const newProductData: CreateProductDto = { name: 'Monitor', description: 'Monitor 24"', price: 1200, stock: 15, category: 'Electronics' };
      const result = await createProduct(newProductData);
      expect(result).toEqual(expect.objectContaining(newProductData));
      expect(result.id).toBe('4'); // Assuming this is the next id
    });
  });

  describe('updateProduct', () => {
    it('should update product when id exists', async () => {
      const updatedData: UpdateProductDto = { name: 'Updated Notebook', price: 3000 };
      const result = await updateProduct('1', updatedData);
      expect(result).toEqual(expect.objectContaining(updatedData));
      expect(result.id).toBe('1');
    });

    it('should return null when id does not exist', async () => {
      const result = await updateProduct('999', { name: 'Non-existent Product' });
      expect(result).toBeNull();
    });
  });

  describe('deleteProduct', () => {
    it('should return true when product is deleted', async () => {
      const result = await deleteProduct('1');
      expect(result).toBe(true);
      expect(await getProductById('1')).toBeUndefined();
    });

    it('should return false when product does not exist', async () => {
      const result = await deleteProduct('999');
      expect(result).toBe(false);
    });
  });
});