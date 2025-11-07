import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from '../../controllers/carController';
import * as carService from '../../services/carService';
import type { Request, Response, NextFunction } from 'express';

vi.mock('../../services/carService');

describe('CarController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
    vi.clearAllMocks();
  });

  describe('getAllCars', () => {
    it('should return all cars', async () => {
      const mockCars = [{ id: '1', model: 'Car A' }, { id: '2', model: 'Car B' }];
      vi.mocked(carService.getAllCars).mockResolvedValue(mockCars);

      await getAllCars(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockCars);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Service error');
      vi.mocked(carService.getAllCars).mockRejectedValue(mockError);

      await getAllCars(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getCarById', () => {
    it('should return car by id', async () => {
      mockReq.params.id = '1';
      const mockCar = { id: '1', model: 'Car A' };
      vi.mocked(carService.getCarById).mockResolvedValue(mockCar);

      await getCarById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockCar);
    });

    it('should return 404 if car not found', async () => {
      mockReq.params.id = '999';
      vi.mocked(carService.getCarById).mockResolvedValue(null);

      await getCarById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Car not found' });
    });

    it('should call next with error on failure', async () => {
      mockReq.params.id = '1';
      const mockError = new Error('Service error');
      vi.mocked(carService.getCarById).mockRejectedValue(mockError);

      await getCarById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('createCar', () => {
    it('should create a new car', async () => {
      const mockCarData = { model: 'Car A' };
      const mockNewCar = { id: '1', ...mockCarData };
      mockReq.body = mockCarData;
      vi.mocked(carService.createCar).mockResolvedValue(mockNewCar);

      await createCar(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockNewCar);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Service error');
      mockReq.body = { model: 'Car A' };
      vi.mocked(carService.createCar).mockRejectedValue(mockError);

      await createCar(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateCar', () => {
    it('should update a car by id', async () => {
      mockReq.params.id = '1';
      const mockCarData = { model: 'Updated Car A' };
      const mockUpdatedCar = { id: '1', ...mockCarData };
      mockReq.body = mockCarData;
      vi.mocked(carService.updateCar).mockResolvedValue(mockUpdatedCar);

      await updateCar(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedCar);
    });

    it('should return 404 if car not found', async () => {
      mockReq.params.id = '999';
      mockReq.body = { model: 'Updated Car A' };
      vi.mocked(carService.updateCar).mockResolvedValue(null);

      await updateCar(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Car not found' });
    });

    it('should call next with error on failure', async () => {
      mockReq.params.id = '1';
      const mockError = new Error('Service error');
      mockReq.body = { model: 'Updated Car A' };
      vi.mocked(carService.updateCar).mockRejectedValue(mockError);

      await updateCar(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteCar', () => {
    it('should delete a car by id', async () => {
      mockReq.params.id = '1';
      vi.mocked(carService.deleteCar).mockResolvedValue(true);

      await deleteCar(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'Car deleted successfully' });
    });

    it('should return 404 if car not found', async () => {
      mockReq.params.id = '999';
      vi.mocked(carService.deleteCar).mockResolvedValue(false);

      await deleteCar(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Car not found' });
    });

    it('should call next with error on failure', async () => {
      mockReq.params.id = '1';
      const mockError = new Error('Service error');
      vi.mocked(carService.deleteCar).mockRejectedValue(mockError);

      await deleteCar(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});