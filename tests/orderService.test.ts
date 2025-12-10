import { describe, it, expect, beforeEach, vi } from "vitest";
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../src/services/orderService";
import type { CreateOrderDto, UpdateOrderDto, Order } from "../src/types";

describe("Order Service", () => {
  let orders: Order[];

  beforeEach(() => {
    vi.clearAllMocks();
    orders = [
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

  it("should retrieve all orders", async () => {
    const result = await getAllOrders();
    expect(result).toEqual(orders);
  });

  it("should retrieve order by ID", async () => {
    const result = await getOrderById('1');
    expect(result).toEqual(orders[0]);
  });

  it("should return undefined for non-existent order ID", async () => {
    const result = await getOrderById('999');
    expect(result).toBeUndefined();
  });

  it("should create a new order", async () => {
    const newOrderData: CreateOrderDto = {
      userId: '3',
      items: [{ productId: '4', quantity: 1, price: 100 }],
      total: 100,
      status: 'pending'
    };
    const result = await createOrder(newOrderData);
    expect(result).toHaveProperty('id');
    expect(result.userId).toEqual(newOrderData.userId);
    expect(result.items).toEqual(newOrderData.items);
  });

  it("should update an existing order", async () => {
    const updateData: UpdateOrderDto = {
      status: 'completed'
    };
    const result = await updateOrder('1', updateData);
    expect(result).toBeDefined();
    if (result) {
      expect(result.status).toEqual('completed');
    }
  });

  it("should return null when updating a non-existent order", async () => {
    const result = await updateOrder('999', { status: 'completed' });
    expect(result).toBeNull();
  });

  it("should delete an existing order", async () => {
    const result = await deleteOrder('1');
    expect(result).toBe(true);
    const ordersAfterDelete = await getAllOrders();
    expect(ordersAfterDelete).toHaveLength(2);
  });

  it("should return false when deleting a non-existent order", async () => {
    const result = await deleteOrder('999');
    expect(result).toBe(false);
  });
});