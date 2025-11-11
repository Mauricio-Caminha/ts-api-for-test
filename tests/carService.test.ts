import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from "../../services/carService";
import type { CreateCarDto, UpdateCarDto, Car } from "../../types";

let cars: Car[] = [
  { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
  { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
  { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
];

describe("CarService", () => {
  beforeEach(() => {
    cars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  describe("getAllCars", () => {
    it("should return all cars", async () => {
      const result = await getAllCars();
      expect(result).toEqual(cars);
    });
  });

  describe("getCarById", () => {
    it("should return a car when id exists", async () => {
      const result = await getCarById('1');
      expect(result).toEqual(cars[0]);
    });

    it("should return undefined when id does not exist", async () => {
      const result = await getCarById('999');
      expect(result).toBeUndefined();
    });
  });

  describe("createCar", () => {
    it("should create a new car and return it", async () => {
      const newCarData: CreateCarDto = { brand: 'Nissan', model: 'Altima', year: 2022, color: 'Blue', price: 95000 };
      const result = await createCar(newCarData);
      expect(result).toMatchObject(newCarData);
      expect(result.id).toBe('4');
    });
  });

  describe("updateCar", () => {
    it("should update an existing car and return it", async () => {
      const updatedData: UpdateCarDto = { color: 'Black', price: 90000 };
      const result = await updateCar('1', updatedData);
      expect(result).toMatchObject({ ...cars[0], ...updatedData });
    });

    it("should return null when car id does not exist", async () => {
      const result = await updateCar('999', { color: 'Green' });
      expect(result).toBeNull();
    });
  });

  describe("deleteCar", () => {
    it("should delete a car and return true", async () => {
      const result = await deleteCar('1');
      expect(result).toBe(true);
      expect(await getCarById('1')).toBeUndefined();
    });

    it("should return false when car id does not exist", async () => {
      const result = await deleteCar('999');
      expect(result).toBe(false);
    });
  });
});