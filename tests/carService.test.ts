import { describe, it, expect, beforeEach, vi } from "vitest";
import { getAllCars, getCarById, createCar, updateCar, deleteCar } from "../src/services/carService";
import type { Car, CreateCarDto, UpdateCarDto } from "../src/types";

describe("Car Service", () => {
  const mockCars: Car[] = [
    { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
    { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
    { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the cars array before each test
    cars = [...mockCars];
  });

  it("should return all cars", async () => {
    const result = await getAllCars();
    expect(result).toEqual(mockCars);
  });

  it("should return a car by ID", async () => {
    const result = await getCarById("1");
    expect(result).toEqual(mockCars[0]);
  });

  it("should return undefined for a non-existing car ID", async () => {
    const result = await getCarById("999");
    expect(result).toBeUndefined();
  });

  it("should create a new car", async () => {
    const newCarData: CreateCarDto = { brand: 'Nissan', model: 'Altima', year: 2022, color: 'Blue', price: 95000 };
    const result = await createCar(newCarData);
    expect(result).toHaveProperty('id');
    expect(result.brand).toBe(newCarData.brand);
    expect(result.model).toBe(newCarData.model);
    expect(cars).toHaveLength(mockCars.length + 1);
  });

  it("should update an existing car", async () => {
    const updatedData: UpdateCarDto = { model: 'Camry', price: 90000 };
    const result = await updateCar("1", updatedData);
    expect(result).toEqual({ ...mockCars[0], ...updatedData });
  });

  it("should return null for updating a non-existing car ID", async () => {
    const result = await updateCar("999", { model: 'Test', price: 100000 });
    expect(result).toBeNull();
  });

  it("should delete an existing car", async () => {
    const result = await deleteCar("1");
    expect(result).toBe(true);
    expect(cars).toHaveLength(mockCars.length - 1);
  });

  it("should return false for deleting a non-existing car ID", async () => {
    const result = await deleteCar("999");
    expect(result).toBe(false);
  });
});