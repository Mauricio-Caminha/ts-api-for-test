import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../../controllers/productController';
import * as productService from '../../services/productService';
import type { Request, Response, NextFunction } from 'express';

vi.mock('../../services/productService');

describe('ProductController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    mockNext = vi.fn();
    vi.clearAllMocks();
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockProducts = [{ id: '1', name: 'Product 1' }];
      vi.mocked(productService.getAllProducts).mockResolvedValue(mockProducts);

      await getAllProducts(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Service error');
      vi.mocked(productService.getAllProducts).mockRejectedValue(mockError);

      await getAllProducts(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getProductById', () => {
    it('should return product when id exists', async () => {
      mockReq.params.id = '1';
      const mockProduct = { id: '1', name: 'Product 1' };
      vi.mocked(productService.getProductById).mockResolvedValue(mockProduct);

      await getProductById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should return 404 when product not found', async () => {
      mockReq.params.id = '999';
      vi.mocked(productService.getProductById).mockResolvedValue(null);

      await getProductById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    it('should call next with error on failure', async () => {
      mockReq.params.id = '1';
      const mockError = new Error('Service error');
      vi.mocked(productService.getProductById).mockRejectedValue(mockError);

      await getProductById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const mockProductData = { name: 'New Product' };
      const mockNewProduct = { id: '2', ...mockProductData };
      mockReq.body = mockProductData;
      vi.mocked(productService.createProduct).mockResolvedValue(mockNewProduct);

      await createProduct(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockNewProduct);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Service error');
      mockReq.body = { name: 'New Product' };
      vi.mocked(productService.createProduct).mockRejectedValue(mockError);

      await createProduct(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateProduct', () => {
    it('should update product when id exists', async () => {
      mockReq.params.id = '1';
      const mockProductData = { name: 'Updated Product' };
      const mockUpdatedProduct = { id: '1', ...mockProductData };
      mockReq.body = mockProductData;
      vi.mocked(productService.updateProduct).mockResolvedValue(mockUpdatedProduct);

      await updateProduct(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedProduct);
    });

    it('should return 404 when product not found', async () => {
      mockReq.params.id = '999';
      mockReq.body = { name: 'Updated Product' };
      vi.mocked(productService.updateProduct).mockResolvedValue(null);

      await updateProduct(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    it('should call next with error on failure', async () => {
      mockReq.params.id = '1';
      const mockError = new Error('Service error');
      mockReq.body = { name: 'Updated Product' };
      vi.mocked(productService.updateProduct).mockRejectedValue(mockError);

      await updateProduct(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteProduct', () => {
    it('should delete product when id exists', async () => {
      mockReq.params.id = '1';
      vi.mocked(productService.deleteProduct).mockResolvedValue(true);

      await deleteProduct(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Product deleted successfully' });
    });

    it('should return 404 when product not found', async () => {
      mockReq.params.id = '999';
      vi.mocked(productService.deleteProduct).mockResolvedValue(false);

      await deleteProduct(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Product not found' });
    });

    it('should call next with error on failure', async () => {
      mockReq.params.id = '1';
      const mockError = new Error('Service error');
      vi.mocked(productService.deleteProduct).mockRejectedValue(mockError);

      await deleteProduct(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});