import { describe, it, expect } from 'vitest';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../src/services/productService';
import { Product, CreateProductDto, UpdateProductDto } from '../src/types';

describe('Product Service', () => {
  it('should return all products', async () => {
    const products = await getAllProducts();
    expect(products).toHaveLength(3);
  });

  it('should return a product by id', async () => {
    const product = await getProductById('1');
    expect(product).toBeDefined();
    expect(product?.name).toBe('Notebook');
  });

  it('should create a new product', async () => {
    const newProductData: CreateProductDto = {
      name: 'Headphones',
      description: 'Wireless Headphones',
      price: 300,
      stock: 20,
      category: 'Electronics'
    };
    const newProduct = await createProduct(newProductData);
    expect(newProduct).toHaveProperty('id');
    expect(newProduct.name).toBe(newProductData.name);
  });

  it('should update an existing product', async () => {
    const updatedData: UpdateProductDto = {
      name: 'Updated Mouse',
      price: 120,
      stock: 45
    };
    const updatedProduct = await updateProduct('2', updatedData);
    expect(updatedProduct).toBeDefined();
    expect(updatedProduct?.name).toBe(updatedData.name);
    expect(updatedProduct?.price).toBe(updatedData.price);
  });

  it('should return null when updating a non-existing product', async () => {
    const updatedProduct = await updateProduct('999', { name: 'Non-existing' });
    expect(updatedProduct).toBeNull();
  });

  it('should delete an existing product', async () => {
    const result = await deleteProduct('1');
    expect(result).toBe(true);
    const product = await getProductById('1');
    expect(product).toBeUndefined();
  });

  it('should return false when deleting a non-existing product', async () => {
    const result = await deleteProduct('999');
    expect(result).toBe(false);
  });
});