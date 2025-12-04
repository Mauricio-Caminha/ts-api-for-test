import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from "../../src/services/carService";
import type { Car, CreateCarDto, UpdateCarDto } from "../../src/types";

let cars: Car[];

describe("Car Service", () => {
  beforeEach(() => {
    cars = [
      { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
      { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
      { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
    ];
  });

  afterEach(() => {
    cars = [];
  });

  describe("getAllCars", () => {
    it("should return all cars", async () => {
      const result = await getAllCars();
      expect(result).to.deep.equal(cars);
    });
  });

  describe("getCarById", () => {
    it("should return a car by id", async () => {
      const result = await getCarById('1');
      expect(result).to.deep.equal(cars[0]);
    });

    it("should return undefined for a non-existing id", async () => {
      const result = await getCarById('999');
      expect(result).to.be.undefined;
    });
  });

  describe("createCar", () => {
    it("should create a new car", async () => {
      const newCarData: CreateCarDto = { brand: 'Nissan', model: 'Altima', year: 2022, color: 'Blue', price: 95000 };
      const result = await createCar(newCarData);
      expect(result).to.include(newCarData);
      expect(result.id).to.equal('4'); // Assuming 3 existing cars
    });
  });

  describe("updateCar", () => {
    it("should update an existing car", async () => {
      const updateData: UpdateCarDto = { color: 'Black', price: 90000 };
      const result = await updateCar('1', updateData);
      expect(result).to.deep.equal({ ...cars[0], ...updateData });
    });

    it("should return null for a non-existing car", async () => {
      const result = await updateCar('999', { color: 'Green' });
      expect(result).to.be.null;
    });
  });

  describe("deleteCar", () => {
    it("should delete an existing car", async () => {
      const result = await deleteCar('1');
      expect(result).to.be.true;
      const allCars = await getAllCars();
      expect(allCars).to.have.lengthOf(2); // Should be 2 cars left
    });

    it("should return false for a non-existing car", async () => {
      const result = await deleteCar('999');
      expect(result).to.be.false;
    });
  });
});