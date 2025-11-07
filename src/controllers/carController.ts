import { Request, Response, NextFunction } from 'express';
import * as carService from '../services/carService';

export const getAllCars = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cars = await carService.getAllCars();
    res.status(200).json(cars);
  } catch (error) {
    next(error);
  }
};

export const getCarById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const car = await carService.getCarById(id);
    
    if (!car) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }
    
    res.status(200).json(car);
  } catch (error) {
    next(error);
  }
};

export const createCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const carData = req.body;
    const newCar = await carService.createCar(carData);
    res.status(201).json(newCar);
  } catch (error) {
    next(error);
  }
};

export const updateCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const carData = req.body;
    const updatedCar = await carService.updateCar(id, carData);
    
    if (!updatedCar) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }
    
    res.status(200).json(updatedCar);
  } catch (error) {
    next(error);
  }
};

export const deleteCar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await carService.deleteCar(id);
    
    if (!deleted) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }
    
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (error) {
    next(error);
  }
};

