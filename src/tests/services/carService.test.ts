import { describe, it, expect } from 'vitest';
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from '../../services/carService';
import { Car, CreateCarDto, UpdateCarDto } from '../../types';

describe('Car Service', () => {
  it('should return all cars', async () => {
    const cars = await getAllCars();
    expect(cars).toHaveLength(3);
  });

  it('should return a car by id', async () => {
    const car = await getCarById('1');
    expect(car).toEqual({ id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 });
  });

  it('should create a new car', async () => {
    const newCarData: CreateCarDto = { brand: 'Nissan', model: 'Altima', year: 2022, color: 'Blue', price: 95000 };
    const newCar = await createCar(newCarData);
    expect(newCar).toHaveProperty('id');
    expect(newCar.brand).toBe('Nissan');
    expect(newCar.model).toBe('Altima');
  });

  it('should update an existing car', async () => {
    const updatedData: UpdateCarDto = { color: 'Green', price: 80000 };
    const updatedCar = await updateCar('1', updatedData);
    expect(updatedCar).toEqual({ id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'Green', price: 80000 });
  });

  it('should return null when updating a non-existing car', async () => {
    const result = await updateCar('999', { color: 'Yellow' });
    expect(result).toBeNull();
  });

  it('should delete a car by id', async () => {
    const result = await deleteCar('1');
    expect(result).toBe(true);
    const car = await getCarById('1');
    expect(car).toBeUndefined();
  });

  it('should return false when deleting a non-existing car', async () => {
    const result = await deleteCar('999');
    expect(result).toBe(false);
  });
});