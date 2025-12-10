import { describe, it, expect, beforeEach, vi } from "vitest";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../src/services/productService";
import type { Product, CreateProductDto, UpdateProductDto } from "../src/types";

describe("Product Service", () => {
  let mockProducts: Product[];

  beforeEach(() => {
    vi.clearAllMocks();
    mockProducts = [
      { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
      { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
      { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
    ];
  });

  it("should return all products", async () => {
    const result = await getAllProducts();
    expect(result).toEqual(mockProducts);
  });

  it("should return a product by id", async () => {
    const result = await getProductById('1');
    expect(result).toEqual(mockProducts[0]);
  });

  it("should return undefined for a non-existing product", async () => {
    const result = await getProductById('999');
    expect(result).toBeUndefined();
  });

  it("should create a new product", async () => {
    const newProductData: CreateProductDto = {
      name: 'Headphones',
      description: 'Headphones Sony WH-1000XM4',
      price: 2000,
      stock: 30,
      category: 'Electronics'
    };
    const result = await createProduct(newProductData);
    expect(result).toHaveProperty('id');
    expect(result.name).toEqual(newProductData.name);
    expect(result.description).toEqual(newProductData.description);
  });

  it("should update an existing product", async () => {
    const updateData: UpdateProductDto = {
      name: 'Updated Mouse',
      price: 120,
      stock: 45
    };
    const result = await updateProduct('2', updateData);
    expect(result).toEqual({
      id: '2',
      name: 'Updated Mouse',
      description: 'Mouse Logitech Wireless',
      price: 120,
      stock: 45,
      category: 'Electronics'
    });
  });

  it("should return null for updating a non-existing product", async () => {
    const result = await updateProduct('999', { name: 'Non-existing Product' } as UpdateProductDto);
    expect(result).toBeNull();
  });

  it("should delete an existing product", async () => {
    const result = await deleteProduct('1');
    expect(result).toBe(true);
    const productsAfterDeletion = await getAllProducts();
    expect(productsAfterDeletion).toHaveLength(2);
  });

  it("should return false for deleting a non-existing product", async () => {
    const result = await deleteProduct('999');
    expect(result).toBe(false);
  });
});