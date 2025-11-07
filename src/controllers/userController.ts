import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData = req.body;
    const newUser = await userService.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await userService.updateUser(id, userData);
    
    if (!updatedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await userService.deleteUser(id);
    
    if (!deleted) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

