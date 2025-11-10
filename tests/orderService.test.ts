import { describe, it, expect, beforeEach } from 'vitest';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../src/services/orderService';
import { Order, CreateOrderDto, UpdateOrderDto } from '../src/types';

describe('Order Service', () => {
  let ordersBackup: Order[];

  beforeEach(() => {
    ordersBackup = [
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

  it('should return all orders', async () => {
    const orders = await getAllOrders();
    expect(orders).toEqual(ordersBackup);
  });

  it('should return an order by id', async () => {
    const order = await getOrderById('1');
    expect(order).toEqual(ordersBackup[0]);
  });

  it('should create a new order', async () => {
    const newOrderData: CreateOrderDto = {
      userId: '3',
      items: [{ productId: '4', quantity: 1, price: 100 }],
      total: 100,
      status: 'pending'
    };

    const newOrder = await createOrder(newOrderData);
    expect(newOrder).toHaveProperty('id');
    expect(newOrder.userId).toBe(newOrderData.userId);
    expect(newOrder.items).toEqual(newOrderData.items);
    expect(newOrder.total).toBe(newOrderData.total);
    expect(newOrder.status).toBe(newOrderData.status);
  });

  it('should update an existing order', async () => {
    const updateData: UpdateOrderDto = {
      status: 'completed'
    };

    const updatedOrder = await updateOrder('1', updateData);
    expect(updatedOrder).toBeDefined();
    expect(updatedOrder?.status).toBe('completed');
  });

  it('should return null when updating a non-existent order', async () => {
    const updatedOrder = await updateOrder('999', { status: 'completed' });
    expect(updatedOrder).toBeNull();
  });

  it('should delete an existing order', async () => {
    const result = await deleteOrder('1');
    expect(result).toBe(true);
    const orders = await getAllOrders();
    expect(orders).toHaveLength(2);
  });

  it('should return false when deleting a non-existent order', async () => {
    const result = await deleteOrder('999');
    expect(result).toBe(false);
  });
});