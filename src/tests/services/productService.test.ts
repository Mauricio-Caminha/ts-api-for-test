import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../../services/productService";
import type { Product, CreateProductDto, UpdateProductDto } from "../../types";

describe("ProductService", () => {
  let products: Product[];

  beforeEach(() => {
    products = [
      { id: '1', name: 'Notebook', description: 'Notebook Dell Inspiron', price: 3500, stock: 10, category: 'Electronics' },
      { id: '2', name: 'Mouse', description: 'Mouse Logitech Wireless', price: 150, stock: 50, category: 'Electronics' },
      { id: '3', name: 'Teclado', description: 'Teclado Mecânico RGB', price: 450, stock: 25, category: 'Electronics' }
    ];
  });

  afterEach(() => {
    // Reset products array after each test
    products = [];
  });

  describe("getAllProducts", () => {
    it("should return all products", async () => {
      const result = await getAllProducts();
      expect(result).to.deep.equal(products);
    });
  });

  describe("getProductById", () => {
    it("should return a product when it exists", async () => {
      const result = await getProductById("1");
      expect(result).to.deep.equal(products[0]);
    });

    it("should return undefined when the product does not exist", async () => {
      const result = await getProductById("999");
      expect(result).to.be.undefined;
    });
  });

  describe("createProduct", () => {
    it("should create a new product and return it", async () => {
      const newProductData: CreateProductDto = { name: 'Headphones', description: 'Headphones Sony', price: 300, stock: 20, category: 'Electronics' };
      const result = await createProduct(newProductData);
      expect(result).to.include(newProductData);
      expect(result.id).to.equal('4'); // Assuming this is the next ID
    });
  });

  describe("updateProduct", () => {
    it("should update an existing product and return it", async () => {
      const updateData: UpdateProductDto = { name: 'Updated Notebook', price: 4000 };
      const result = await updateProduct("1", updateData);
      expect(result).to.exist;
      expect(result?.name).to.equal('Updated Notebook');
      expect(result?.price).to.equal(4000);
    });

    it("should return null when the product does not exist", async () => {
      const result = await updateProduct("999", { name: 'Non-existent Product' });
      expect(result).to.be.null;
    });
  });

  describe("deleteProduct", () => {
    it("should delete an existing product and return true", async () => {
      const result = await deleteProduct("1");
      expect(result).to.be.true;
      const checkDeleted = await getProductById("1");
      expect(checkDeleted).to.be.undefined;
    });

    it("should return false when the product does not exist", async () => {
      const result = await deleteProduct("999");
      expect(result).to.be.false;
    });
  });
});