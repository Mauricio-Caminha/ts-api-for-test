import { describe, it, expect, beforeEach } from "vitest";
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from "../../services/carService";
import type { Car, CreateCarDto, UpdateCarDto } from "../../types";

describe("CarService", () => {
  let initialCars: Car[];

  beforeEach(() => {
    initialCars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  describe("getAllCars", () => {
    it("should return all cars", async () => {
      const cars = await getAllCars();
      expect(cars).toEqual(initialCars);
    });
  });

  describe("getCarById", () => {
    it("should return a car when it exists", async () => {
      const car = await getCarById('1');
      expect(car).toEqual(initialCars[0]);
    });

    it("should return undefined when car does not exist", async () => {
      const car = await getCarById('999');
      expect(car).toBeUndefined();
    });
  });

  describe("createCar", () => {
    it("should create a new car", async () => {
      const newCarData: CreateCarDto = { brand: 'Nissan', model: 'Altima', year: 2022, color: 'Blue', price: 30000 };
      const newCar = await createCar(newCarData);
      expect(newCar).toHaveProperty('id');
      expect(newCar.brand).toBe(newCarData.brand);
      expect(newCar.model).toBe(newCarData.model);
    });
  });

  describe("updateCar", () => {
    it("should update an existing car", async () => {
      const updatedData: UpdateCarDto = { color: 'Green', price: 85000 };
      const updatedCar = await updateCar('1', updatedData);
      expect(updatedCar).toBeDefined();
      expect(updatedCar?.color).toBe(updatedData.color);
      expect(updatedCar?.price).toBe(updatedData.price);
    });

    it("should return null when car does not exist", async () => {
      const updatedCar = await updateCar('999', { color: 'Blue' });
      expect(updatedCar).toBeNull();
    });
  });

  describe("deleteCar", () => {
    it("should delete a car when it exists", async () => {
      const result = await deleteCar('1');
      expect(result).toBe(true);
      const cars = await getAllCars();
      expect(cars).toHaveLength(2);
    });

    it("should return false when car does not exist", async () => {
      const result = await deleteCar('999');
      expect(result).toBe(false);
    });
  });
});