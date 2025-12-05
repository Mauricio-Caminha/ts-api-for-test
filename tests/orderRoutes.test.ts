import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import express from "express";
import orderRoutes from "../../src/routes/orderRoutes";
import * as orderController from "../../src/controllers/orderController";

describe("Order Routes", () => {
  let app: express.Express;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use("/orders", orderRoutes);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should get all orders", async () => {
    const mockGetAllOrders = vi.spyOn(orderController, "getAllOrders").mockImplementation((req, res) => {
      res.status(200).json([{ id: 1, product: "Product A" }]);
    });

    const response = await app.inject({
      method: "GET",
      url: "/orders",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual([{ id: 1, product: "Product A" }]);
    expect(mockGetAllOrders).toHaveBeenCalled();
  });

  it("should get order by id", async () => {
    const mockGetOrderById = vi.spyOn(orderController, "getOrderById").mockImplementation((req, res) => {
      const { id } = req.params;
      res.status(200).json({ id, product: "Product A" });
    });

    const response = await app.inject({
      method: "GET",
      url: "/orders/1",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual({ id: "1", product: "Product A" });
    expect(mockGetOrderById).toHaveBeenCalledWith(expect.objectContaining({ params: { id: "1" } }), expect.anything());
  });

  it("should create a new order", async () => {
    const mockCreateOrder = vi.spyOn(orderController, "createOrder").mockImplementation((req, res) => {
      res.status(201).json({ id: 1, product: "Product A" });
    });

    const response = await app.inject({
      method: "POST",
      url: "/orders",
      payload: { product: "Product A" },
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual({ id: 1, product: "Product A" });
    expect(mockCreateOrder).toHaveBeenCalledWith(expect.objectContaining({ body: { product: "Product A" } }), expect.anything());
  });

  it("should update an existing order", async () => {
    const mockUpdateOrder = vi.spyOn(orderController, "updateOrder").mockImplementation((req, res) => {
      const { id } = req.params;
      res.status(200).json({ id, product: "Updated Product" });
    });

    const response = await app.inject({
      method: "PUT",
      url: "/orders/1",
      payload: { product: "Updated Product" },
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)).toEqual({ id: "1", product: "Updated Product" });
    expect(mockUpdateOrder).toHaveBeenCalledWith(expect.objectContaining({ params: { id: "1" }, body: { product: "Updated Product" } }), expect.anything());
  });

  it("should delete an order", async () => {
    const mockDeleteOrder = vi.spyOn(orderController, "deleteOrder").mockImplementation((req, res) => {
      res.status(204).send();
    });

    const response = await app.inject({
      method: "DELETE",
      url: "/orders/1",
    });

    expect(response.statusCode).toBe(204);
    expect(mockDeleteOrder).toHaveBeenCalledWith(expect.objectContaining({ params: { id: "1" } }), expect.anything());
  });
});