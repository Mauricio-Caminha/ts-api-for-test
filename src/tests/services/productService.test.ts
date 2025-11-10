import { describe, it, expect } from 'vitest';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import { Product, CreateProductDto, UpdateProductDto } from '../../types';

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
      description: 'Headphones Sony WH-1000XM4',
      price: 1200,
      stock: 15,
      category: 'Electronics',
    };

    const newProduct = await createProduct(newProductData);
    expect(newProduct).toBeDefined();
    expect(newProduct.name).toBe('Headphones');
    expect(newProduct.id).toBe('4'); // Assuming this is the next ID
  });

  it('should update an existing product', async () => {
    const updatedData: UpdateProductDto = {
      name: 'Updated Mouse',
      description: 'Updated Mouse Logitech Wireless',
      price: 160,
      stock: 45,
      category: 'Electronics',
    };

    const updatedProduct = await updateProduct('2', updatedData);
    expect(updatedProduct).toBeDefined();
    expect(updatedProduct?.name).toBe('Updated Mouse');
  });

  it('should return null when updating a non-existing product', async () => {
    const updatedProduct = await updateProduct('999', { name: 'Non-existing' });
    expect(updatedProduct).toBeNull();
  });

  it('should delete an existing product', async () => {
    const result = await deleteProduct('3');
    expect(result).toBe(true);
    const product = await getProductById('3');
    expect(product).toBeUndefined();
  });

  it('should return false when deleting a non-existing product', async () => {
    const result = await deleteProduct('999');
    expect(result).toBe(false);
  });
});