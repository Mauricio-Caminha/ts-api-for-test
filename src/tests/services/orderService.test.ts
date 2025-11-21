import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../../services/orderService";
import type { CreateOrderDto, UpdateOrderDto, Order } from "../../types";

describe("OrderService", () => {
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

  afterEach(() => {
    // Reset orders to backup after each test
    orders = [...ordersBackup];
  });

  describe("getAllOrders", () => {
    it("should return all orders", async () => {
      const orders = await getAllOrders();
      expect(orders).toHaveLength(3);
    });
  });

  describe("getOrderById", () => {
    it("should return the order with the given id", async () => {
      const order = await getOrderById("1");
      expect(order).toBeDefined();
      expect(order?.id).toEqual("1");
    });

    it("should return undefined for a non-existing order", async () => {
      const order = await getOrderById("999");
      expect(order).toBeUndefined();
    });
  });

  describe("createOrder", () => {
    it("should create a new order", async () => {
      const newOrderData: CreateOrderDto = {
        userId: '3',
        items: [{ productId: '4', quantity: 1, price: 200 }],
        total: 200,
        status: 'pending'
      };
      const newOrder = await createOrder(newOrderData);
      expect(newOrder).toHaveProperty("id");
      expect(newOrder.userId).toEqual(newOrderData.userId);
      expect(newOrder.items).toEqual(newOrderData.items);
    });
  });

  describe("updateOrder", () => {
    it("should update an existing order", async () => {
      const updatedData: UpdateOrderDto = {
        status: 'completed'
      };
      const updatedOrder = await updateOrder("1", updatedData);
      expect(updatedOrder).toBeDefined();
      expect(updatedOrder?.status).toEqual('completed');
    });

    it("should return null for a non-existing order", async () => {
      const updatedOrder = await updateOrder("999", { status: 'completed' });
      expect(updatedOrder).toBeNull();
    });
  });

  describe("deleteOrder", () => {
    it("should delete an existing order", async () => {
      const result = await deleteOrder("1");
      expect(result).toBe(true);
      const order = await getOrderById("1");
      expect(order).toBeUndefined();
    });

    it("should return false for a non-existing order", async () => {
      const result = await deleteOrder("999");
      expect(result).toBe(false);
    });
  });
});