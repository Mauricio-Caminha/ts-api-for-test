import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from '../../services/carService';
import type { Car, CreateCarDto, UpdateCarDto } from '../../types';

describe('CarService', () => {
  let mockCars: Car[];

  beforeEach(() => {
    vi.clearAllMocks();
    mockCars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  describe('getAllCars', () => {
    it('should return all cars', async () => {
      const expectedCars = mockCars;
      const result = await getAllCars();
      expect(result).toEqual(expectedCars);
    });
  });

  describe('getCarById', () => {
    it('should return car when id exists', async () => {
      const expectedCar = mockCars[0];
      const result = await getCarById('1');
      expect(result).toEqual(expectedCar);
    });

    it('should return undefined when id does not exist', async () => {
      const result = await getCarById('999');
      expect(result).toBeUndefined();
    });
  });

  describe('createCar', () => {
    it('should create a new car and return it', async () => {
      const newCarData: CreateCarDto = { brand: 'Nissan', model: 'Altima', year: 2022, color: 'Blue', price: 95000 };
      const expectedCar: Car = { id: '4', ...newCarData };
      const result = await createCar(newCarData);
      expect(result).toEqual(expectedCar);
    });
  });

  describe('updateCar', () => {
    it('should update the car and return the updated car', async () => {
      const updateData: UpdateCarDto = { color: 'Black', price: 90000 };
      const result = await updateCar('1', updateData);
      expect(result).toEqual({ id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'Black', price: 90000 });
    });

    it('should return null when car id does not exist', async () => {
      const updateData: UpdateCarDto = { color: 'Black', price: 90000 };
      const result = await updateCar('999', updateData);
      expect(result).toBeNull();
    });
  });

  describe('deleteCar', () => {
    it('should delete the car and return true', async () => {
      const result = await deleteCar('1');
      expect(result).toBe(true);
    });

    it('should return false when car id does not exist', async () => {
      const result = await deleteCar('999');
      expect(result).toBe(false);
    });
  });
});