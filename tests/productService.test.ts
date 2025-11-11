import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../../services/productService";
import type { Product, CreateProductDto, UpdateProductDto } from "../../types";

let mockProducts: Product[];

vi.mock("../../services/productService", () => {
  return {
    getAllProducts: vi.fn(),
    getProductById: vi.fn(),
    createProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
  };
});

describe("ProductService", () => {
  beforeEach(() => {
    mockProducts = [
      { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
      { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
      { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
    ];
    (getAllProducts as vi.Mock).mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const products = await getAllProducts();
      expect(products).toEqual(mockProducts);
    });
  });

  describe("getProductById", () => {
    it("should return product when id exists", async () => {
      (getProductById as vi.Mock).mockResolvedValue(mockProducts[0]);
      const product = await getProductById('1');
      expect(product).toEqual(mockProducts[0]);
    });

    it("should return undefined when id does not exist", async () => {
      (getProductById as vi.Mock).mockResolvedValue(undefined);
      const product = await getProductById('999');
      expect(product).toBeUndefined();
    });
  });

  describe("createProduct", () => {
    it("should create a new product", async () => {
      const newProductData: CreateProductDto = { name: 'Headphones', description: 'Wireless Headphones', price: 300, stock: 20, category: 'Electronics' };
      const newProduct: Product = { id: '4', ...newProductData };
      (createProduct as vi.Mock).mockResolvedValue(newProduct);
      
      const product = await createProduct(newProductData);
      expect(product).toEqual(newProduct);
    });
  });

  describe("updateProduct", () => {
    it("should update the product when id exists", async () => {
      const updatedData: UpdateProductDto = { name: 'Updated Mouse', price: 200 };
      const updatedProduct: Product = { id: '2', name: 'Updated Mouse', description: 'Mouse Logitech Wireless', price: 200, stock: 50, category: 'Electronics' };
      (updateProduct as vi.Mock).mockResolvedValue(updatedProduct);
      
      const product = await updateProduct('2', updatedData);
      expect(product).toEqual(updatedProduct);
    });

    it("should return null when id does not exist", async () => {
      const updatedData: UpdateProductDto = { name: 'Non-existent Product', price: 100 };
      (updateProduct as vi.Mock).mockResolvedValue(null);
      
      const product = await updateProduct('999', updatedData);
      expect(product).toBeNull();
    });
  });

  describe("deleteProduct", () => {
    it("should return true when product is deleted", async () => {
      (deleteProduct as vi.Mock).mockResolvedValue(true);
      
      const result = await deleteProduct('1');
      expect(result).toBe(true);
    });

    it("should return false when product does not exist", async () => {
      (deleteProduct as vi.Mock).mockResolvedValue(false);
      
      const result = await deleteProduct('999');
      expect(result).toBe(false);
    });
  });
});