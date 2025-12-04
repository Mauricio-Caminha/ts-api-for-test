import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Request, Response, NextFunction } from 'express';
import * as carService from '../services/carService';
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from '../controllers/carController';

describe('Car Controller', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
    next = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('getAllCars', () => {
    it('should return all cars', async () => {
      const mockCars = [{ id: '1', model: 'Car A' }, { id: '2', model: 'Car B' }];
      vi.spyOn(carService, 'getAllCars').mockResolvedValue(mockCars);

      await getAllCars(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCars);
    });

    it('should handle errors', async () => {
      vi.spyOn(carService, 'getAllCars').mockRejectedValue(new Error('Error fetching cars'));

      await getAllCars(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getCarById', () => {
    it('should return a car by id', async () => {
      req.params = { id: '1' };
      const mockCar = { id: '1', model: 'Car A' };
      vi.spyOn(carService, 'getCarById').mockResolvedValue(mockCar);

      await getCarById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockCar);
    });

    it('should return 404 if car not found', async () => {
      req.params = { id: '999' };
      vi.spyOn(carService, 'getCarById').mockResolvedValue(null);

      await getCarById(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Car not found' });
    });

    it('should handle errors', async () => {
      req.params = { id: '1' };
      vi.spyOn(carService, 'getCarById').mockRejectedValue(new Error('Error fetching car'));

      await getCarById(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('createCar', () => {
    it('should create a new car', async () => {
      req.body = { model: 'Car A' };
      const mockNewCar = { id: '1', model: 'Car A' };
      vi.spyOn(carService, 'createCar').mockResolvedValue(mockNewCar);

      await createCar(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(mockNewCar);
    });

    it('should handle errors', async () => {
      req.body = { model: 'Car A' };
      vi.spyOn(carService, 'createCar').mockRejectedValue(new Error('Error creating car'));

      await createCar(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('updateCar', () => {
    it('should update an existing car', async () => {
      req.params = { id: '1' };
      req.body = { model: 'Updated Car A' };
      const mockUpdatedCar = { id: '1', model: 'Updated Car A' };
      vi.spyOn(carService, 'updateCar').mockResolvedValue(mockUpdatedCar);

      await updateCar(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUpdatedCar);
    });

    it('should return 404 if car not found for update', async () => {
      req.params = { id: '999' };
      req.body = { model: 'Updated Car A' };
      vi.spyOn(carService, 'updateCar').mockResolvedValue(null);

      await updateCar(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Car not found' });
    });

    it('should handle errors', async () => {
      req.params = { id: '1' };
      req.body = { model: 'Updated Car A' };
      vi.spyOn(carService, 'updateCar').mockRejectedValue(new Error('Error updating car'));

      await updateCar(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('deleteCar', () => {
    it('should delete a car', async () => {
      req.params = { id: '1' };
      vi.spyOn(carService, 'deleteCar').mockResolvedValue(true);

      await deleteCar(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Car deleted successfully' });
    });

    it('should return 404 if car not found for deletion', async () => {
      req.params = { id: '999' };
      vi.spyOn(carService, 'deleteCar').mockResolvedValue(false);

      await deleteCar(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Car not found' });
    });

    it('should handle errors', async () => {
      req.params = { id: '1' };
      vi.spyOn(carService, 'deleteCar').mockRejectedValue(new Error('Error deleting car'));

      await deleteCar(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});