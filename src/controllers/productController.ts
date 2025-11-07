import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/productService';

export const getAllProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productData = req.body;
    const newProduct = await productService.createProduct(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const productData = req.body;
    const updatedProduct = await productService.updateProduct(id, productData);
    
    if (!updatedProduct) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await productService.deleteProduct(id);
    
    if (!deleted) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

