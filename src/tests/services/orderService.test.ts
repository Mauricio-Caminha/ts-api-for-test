import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../../services/orderService';
import { Order, CreateOrderDto, UpdateOrderDto } from '../../types';

describe('OrderService', () => {
  let initialOrders: Order[];

  beforeEach(() => {
    vi.clearAllMocks();
    initialOrders = [
      { 
        id: '1', 
        userId: '1', 
        items: [{ productId: '1', quantity: 2, price: 3500 }], 
        total: 7000, 
        status: 'pending',
        createdAt: "2025-11-07T18:18:08.792Z"
      },
      { 
        id: '2', 
        userId: '2', 
        items: [{ productId: '2', quantity: 1, price: 150 }], 
        total: 150, 
        status: 'completed',
        createdAt: "2025-11-07T18:18:08.792Z"
      },
      { 
        id: '3', 
        userId: '1', 
        items: [{ productId: '3', quantity: 1, price: 450 }], 
        total: 450, 
        status: 'processing',
        createdAt: "2025-11-07T18:18:08.792Z"
      }
    ];
  });

  describe('getAllOrders', () => {
    it('should return all orders', async () => {
      const result = await getAllOrders();
      expect(result).toEqual(initialOrders);
    });
  });

  describe('getOrderById', () => {
    it('should return the order when it exists', async () => {
      const result = await getOrderById('1');
      expect(result).toEqual(initialOrders[0]);
    });

    it('should return undefined when the order does not exist', async () => {
      const result = await getOrderById('999');
      expect(result).toBeUndefined();
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const newOrderData: CreateOrderDto = {
        userId: '3',
        items: [{ productId: '4', quantity: 1, price: 100 }],
        total: 100,
        status: 'pending'
      };

      const result = await createOrder(newOrderData);
      expect(result).toMatchObject(newOrderData);
      expect(result.id).toBe('4'); // New order ID should be '4'
    });
  });

  describe('updateOrder', () => {
    it('should update the order when it exists', async () => {
      const updateData: UpdateOrderDto = {
        status: 'completed'
      };

      const result = await updateOrder('1', updateData);
      expect(result).toMatchObject({ ...initialOrders[0], ...updateData });
    });

    it('should return null when the order does not exist', async () => {
      const result = await updateOrder('999', { status: 'completed' });
      expect(result).toBeNull();
    });
  });

  describe('deleteOrder', () => {
    it('should delete the order when it exists', async () => {
      const result = await deleteOrder('1');
      expect(result).toBe(true);
    });

    it('should return false when the order does not exist', async () => {
      const result = await deleteOrder('999');
      expect(result).toBe(false);
    });
  });
});