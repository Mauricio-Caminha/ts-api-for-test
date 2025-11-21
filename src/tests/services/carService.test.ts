import { describe, it, expect, beforeEach, afterEach } from "vitest";
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

  afterEach(() => {
    // Reset the cars array after each test
    (global as any).cars = [...initialCars];
  });

  describe("getAllCars", () => {
    it("should return all cars", async () => {
      const cars = await getAllCars();
      expect(cars).toHaveLength(3);
      expect(cars).toEqual(initialCars);
    });
  });

  describe("getCarById", () => {
    it("should return the car with the given id", async () => {
      const car = await getCarById("1");
      expect(car).toEqual(initialCars[0]);
    });

    it("should return undefined if the car does not exist", async () => {
      const car = await getCarById("999");
      expect(car).toBeUndefined();
    });
  });

  describe("createCar", () => {
    it("should create a new car and return it", async () => {
      const newCarData: CreateCarDto = { brand: 'Tesla', model: 'Model 3', year: 2022, color: 'Blue', price: 120000 };
      const newCar = await createCar(newCarData);
      expect(newCar).toMatchObject(newCarData);
      expect(newCar.id).toBe("4"); // Since there are 3 cars initially
    });
  });

  describe("updateCar", () => {
    it("should update the car with the given id", async () => {
      const updatedData: UpdateCarDto = { color: 'Green', price: 95000 };
      const updatedCar = await updateCar("1", updatedData);
      expect(updatedCar).toMatchObject({ ...initialCars[0], ...updatedData });
    });

    it("should return null if the car does not exist", async () => {
      const updatedCar = await updateCar("999", { color: 'Blue' });
      expect(updatedCar).toBeNull();
    });
  });

  describe("deleteCar", () => {
    it("should delete the car with the given id", async () => {
      const result = await deleteCar("1");
      expect(result).toBe(true);
      const cars = await getAllCars();
      expect(cars).toHaveLength(2);
    });

    it("should return false if the car does not exist", async () => {
      const result = await deleteCar("999");
      expect(result).toBe(false);
    });
  });
});