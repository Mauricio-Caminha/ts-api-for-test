import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from "../../services/orderService";
import type { Order, CreateOrderDto, UpdateOrderDto } from "../../types";

describe("OrderService", () => {
  let ordersBackup: Order[];

  beforeEach(() => {
    ordersBackup = [...orders]; // Backup current orders
  });

  afterEach(() => {
    orders = [...ordersBackup]; // Restore orders after each test
  });

  describe("getAllOrders", () => {
    it("should return all orders", async () => {
      const result = await getAllOrders();
      expect(result).toHaveLength(3);
    });
  });

  describe("getOrderById", () => {
    it("should return order when id exists", async () => {
      const result = await getOrderById("1");
      expect(result).toBeDefined();
      expect(result?.id).toBe("1");
    });

    it("should return undefined when id does not exist", async () => {
      const result = await getOrderById("999");
      expect(result).toBeUndefined();
    });
  });

  describe("createOrder", () => {
    it("should create a new order", async () => {
      const newOrderData: CreateOrderDto = {
        userId: "3",
        items: [{ productId: "4", quantity: 1, price: 100 }],
        total: 100,
        status: "pending",
      };

      const result = await createOrder(newOrderData);
      expect(result).toBeDefined();
      expect(result.userId).toBe(newOrderData.userId);
      expect(result.items).toEqual(newOrderData.items);
      expect(result.total).toBe(newOrderData.total);
      expect(result.status).toBe(newOrderData.status);
      expect(result.id).toBe("4"); // Assuming this is the next id
    });
  });

  describe("updateOrder", () => {
    it("should update an existing order", async () => {
      const updateData: UpdateOrderDto = {
        status: "completed",
      };

      const result = await updateOrder("1", updateData);
      expect(result).toBeDefined();
      expect(result?.status).toBe("completed");
    });

    it("should return null when order does not exist", async () => {
      const result = await updateOrder("999", { status: "completed" });
      expect(result).toBeNull();
    });
  });

  describe("deleteOrder", () => {
    it("should delete an existing order", async () => {
      const result = await deleteOrder("1");
      expect(result).toBe(true);
      const order = await getOrderById("1");
      expect(order).toBeUndefined();
    });

    it("should return false when order does not exist", async () => {
      const result = await deleteOrder("999");
      expect(result).toBe(false);
    });
  });
});