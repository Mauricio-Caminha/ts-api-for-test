import { describe, it, expect } from 'vitest';
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../../services/orderService';
import { Order, CreateOrderDto, UpdateOrderDto } from '../../types';

describe('Order Service', () => {
  it('should get all orders', async () => {
    const orders = await getAllOrders();
    expect(orders).toHaveLength(3);
  });

  it('should get order by id when it exists', async () => {
    const order = await getOrderById('1');
    expect(order).toBeDefined();
    expect(order?.id).toBe('1');
  });

  it('should return undefined when getting order by id that does not exist', async () => {
    const order = await getOrderById('999');
    expect(order).toBeUndefined();
  });

  it('should create a new order', async () => {
    const orderData: CreateOrderDto = {
      userId: '3',
      items: [{ productId: '4', quantity: 1, price: 200 }],
      total: 200,
      status: 'pending',
    };
    const newOrder = await createOrder(orderData);
    expect(newOrder).toBeDefined();
    expect(newOrder.userId).toBe(orderData.userId);
    expect(newOrder.items).toEqual(orderData.items);
  });

  it('should update an existing order', async () => {
    const orderData: UpdateOrderDto = {
      status: 'completed',
    };
    const updatedOrder = await updateOrder('1', orderData);
    expect(updatedOrder).toBeDefined();
    expect(updatedOrder?.status).toBe('completed');
  });

  it('should return null when updating an order that does not exist', async () => {
    const orderData: UpdateOrderDto = {
      status: 'completed',
    };
    const updatedOrder = await updateOrder('999', orderData);
    expect(updatedOrder).toBeNull();
  });

  it('should delete an existing order', async () => {
    const result = await deleteOrder('1');
    expect(result).toBe(true);
    const order = await getOrderById('1');
    expect(order).toBeUndefined();
  });

  it('should return false when deleting an order that does not exist', async () => {
    const result = await deleteOrder('999');
    expect(result).toBe(false);
  });
});