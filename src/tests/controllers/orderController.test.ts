import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../../controllers/orderController';
import * as orderService from '../../services/orderService';
import type { Request, Response, NextFunction } from 'express';

vi.mock('../../services/orderService');

describe('OrderController', () => {
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
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
    vi.clearAllMocks();
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      const mockOrders = [{ 
        id: '1', 
        userId: '1', 
        items: [{ productId: '1', quantity: 2, price: 100 }], 
        total: 200, 
        status: 'pending' as const,
        createdAt: '2025-01-01T00:00:00.000Z'
      }];
      vi.mocked(orderService.getAllOrders).mockResolvedValue(mockOrders);

      await getAllOrders(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrders);
    });

    it('should call next with an error when service throws', async () => {
      const mockError = new Error('Service error');
      vi.mocked(orderService.getAllOrders).mockRejectedValue(mockError);

      await getAllOrders(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getOrderById', () => {
    it('should return order when id exists', async () => {
      mockReq.params = { id: '1' };
      const mockOrder = { 
        id: '1', 
        userId: '1', 
        items: [{ productId: '1', quantity: 2, price: 100 }], 
        total: 200, 
        status: 'pending' as const,
        createdAt: '2025-01-01T00:00:00.000Z'
      };
      vi.mocked(orderService.getOrderById).mockResolvedValue(mockOrder);

      await getOrderById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockOrder);
    });

    it('should return 404 when order not found', async () => {
      mockReq.params = { id: '999' };
      vi.mocked(orderService.getOrderById).mockResolvedValue(undefined);

      await getOrderById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Order not found' });
    });

    it('should call next with an error when service throws', async () => {
      mockReq.params = { id: '1' };
      const mockError = new Error('Service error');
      vi.mocked(orderService.getOrderById).mockRejectedValue(mockError);

      await getOrderById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const mockOrderData = { 
        userId: '1', 
        items: [{ productId: '1', quantity: 2, price: 100 }], 
        total: 200, 
        status: 'pending' as const
      };
      const mockNewOrder = { 
        id: '1', 
        ...mockOrderData, 
        createdAt: '2025-01-01T00:00:00.000Z'
      };
      mockReq.body = mockOrderData;
      vi.mocked(orderService.createOrder).mockResolvedValue(mockNewOrder);

      await createOrder(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockNewOrder);
    });

    it('should call next with an error when service throws', async () => {
      const mockError = new Error('Service error');
      mockReq.body = { 
        userId: '1', 
        items: [{ productId: '1', quantity: 2, price: 100 }], 
        total: 200, 
        status: 'pending' as const
      };
      vi.mocked(orderService.createOrder).mockRejectedValue(mockError);

      await createOrder(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateOrder', () => {
    it('should update an existing order', async () => {
      mockReq.params = { id: '1' };
      const mockOrderData = { status: 'completed' as const };
      const mockUpdatedOrder = { 
        id: '1', 
        userId: '1', 
        items: [{ productId: '1', quantity: 2, price: 100 }], 
        total: 200, 
        status: 'completed' as const,
        createdAt: '2025-01-01T00:00:00.000Z'
      };
      mockReq.body = mockOrderData;
      vi.mocked(orderService.updateOrder).mockResolvedValue(mockUpdatedOrder);

      await updateOrder(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedOrder);
    });

    it('should return 404 when order not found', async () => {
      mockReq.params = { id: '999' };
      mockReq.body = { status: 'completed' as const };
      vi.mocked(orderService.updateOrder).mockResolvedValue(null);

      await updateOrder(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Order not found' });
    });

    it('should call next with an error when service throws', async () => {
      mockReq.params = { id: '1' };
      const mockError = new Error('Service error');
      mockReq.body = { status: 'completed' as const };
      vi.mocked(orderService.updateOrder).mockRejectedValue(mockError);

      await updateOrder(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteOrder', () => {
    it('should delete an existing order', async () => {
      mockReq.params = { id: '1' };
      vi.mocked(orderService.deleteOrder).mockResolvedValue(true);

      await deleteOrder(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Order deleted successfully' });
    });

    it('should return 404 when order not found', async () => {
      mockReq.params = { id: '999' };
      vi.mocked(orderService.deleteOrder).mockResolvedValue(false);

      await deleteOrder(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Order not found' });
    });

    it('should call next with an error when service throws', async () => {
      mockReq.params = { id: '1' };
      const mockError = new Error('Service error');
      vi.mocked(orderService.deleteOrder).mockRejectedValue(mockError);

      await deleteOrder(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});