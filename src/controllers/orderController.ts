import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/orderService';

export const getAllOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orderData = req.body;
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const orderData = req.body;
    const updatedOrder = await orderService.updateOrder(id, orderData);
    
    if (!updatedOrder) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    
    res.status(200).json(updatedOrder);
  } catch (error) {
    next(error);
  }
};

export const deleteOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await orderService.deleteOrder(id);
    
    if (!deleted) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    next(error);
  }
};

