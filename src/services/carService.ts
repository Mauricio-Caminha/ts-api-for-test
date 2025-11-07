import { Car, CreateCarDto, UpdateCarDto } from '../types';

// Simulação de banco de dados em memória
let cars: Car[] = [
  { id: '1', brand: 'Toyota', model: 'Corolla', year: 2020, color: 'White', price: 85000 },
  { id: '2', brand: 'Honda', model: 'Civic', year: 2021, color: 'Black', price: 92000 },
  { id: '3', brand: 'Ford', model: 'Focus', year: 2019, color: 'Red', price: 75000 }
];

export const getAllCars = async (): Promise<Car[]> => {
  return cars;
};

export const getCarById = async (id: string): Promise<Car | undefined> => {
  return cars.find(car => car.id === id);
};

export const createCar = async (carData: CreateCarDto): Promise<Car> => {
  const newCar: Car = {
    id: String(cars.length + 1),
    brand: carData.brand,
    model: carData.model,
    year: carData.year,
    color: carData.color,
    price: carData.price
  };
  
  cars.push(newCar);
  return newCar;
};

export const updateCar = async (id: string, carData: UpdateCarDto): Promise<Car | null> => {
  const carIndex = cars.findIndex(car => car.id === id);
  
  if (carIndex === -1) {
    return null;
  }
  
  cars[carIndex] = {
    ...cars[carIndex],
    ...carData,
    id: cars[carIndex].id // Preserva o ID
  };
  
  return cars[carIndex];
};

export const deleteCar = async (id: string): Promise<boolean> => {
  const carIndex = cars.findIndex(car => car.id === id);
  
  if (carIndex === -1) {
    return false;
  }
  
  cars.splice(carIndex, 1);
  return true;
};

