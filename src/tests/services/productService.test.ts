import { describe, it, expect, beforeEach } from "vitest";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../../services/productService";
import type { Product, CreateProductDto, UpdateProductDto } from "../../types";

describe("ProductService", () => {
  let initialProducts: Product[];

  beforeEach(() => {
    initialProducts = [
      { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
      { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
      { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
    ];
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const products = await getAllProducts();
      expect(products).toEqual(initialProducts);
    });
  });

  describe("getProductById", () => {
    it("should return product when id exists", async () => {
      const product = await getProductById('1');
      expect(product).toEqual(initialProducts[0]);
    });

    it("should return undefined when id does not exist", async () => {
      const product = await getProductById('999');
      expect(product).toBeUndefined();
    });
  });

  describe("createProduct", () => {
    it("should create a new product", async () => {
      const newProductData: CreateProductDto = {
        name: 'Headphones',
        description: 'Headphones Bluetooth',
        price: 300,
        stock: 20,
        category: 'Electronics'
      };

      const newProduct = await createProduct(newProductData);
      expect(newProduct).toHaveProperty('id');
      expect(newProduct.name).toEqual(newProductData.name);
      expect(newProduct.description).toEqual(newProductData.description);
    });
  });

  describe("updateProduct", () => {
    it("should update an existing product", async () => {
      const updatedData: UpdateProductDto = {
        name: 'Updated Notebook',
        price: 4000,
        stock: 5
      };

      const updatedProduct = await updateProduct('1', updatedData);
      expect(updatedProduct).toBeDefined();
      expect(updatedProduct?.name).toEqual(updatedData.name);
      expect(updatedProduct?.price).toEqual(updatedData.price);
    });

    it("should return null when product does not exist", async () => {
      const updatedProduct = await updateProduct('999', { name: 'Non-existent Product' });
      expect(updatedProduct).toBeNull();
    });
  });

  describe("deleteProduct", () => {
    it("should delete an existing product", async () => {
      const result = await deleteProduct('1');
      expect(result).toBe(true);
      const products = await getAllProducts();
      expect(products).toHaveLength(2);
    });

    it("should return false when product does not exist", async () => {
      const result = await deleteProduct('999');
      expect(result).toBe(false);
    });
  });
});