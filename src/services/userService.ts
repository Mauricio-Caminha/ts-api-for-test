import { User, CreateUserDto, UpdateUserDto } from '../types';

// Simulação de banco de dados em memória
let users: User[] = [
  { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
  { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
  { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
];

export const getAllUsers = async (): Promise<User[]> => {
  return users;
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  return users.find(user => user.id === id);
};

export const createUser = async (userData: CreateUserDto): Promise<User> => {
  const newUser: User = {
    id: String(users.length + 1),
    name: userData.name,
    email: userData.email,
    age: userData.age
  };
  
  users.push(newUser);
  return newUser;
};

export const updateUser = async (id: string, userData: UpdateUserDto): Promise<User | null> => {
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return null;
  }
  
  users[userIndex] = {
    ...users[userIndex],
    ...userData,
    id: users[userIndex].id // Preserva o ID
  };
  
  return users[userIndex];
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return false;
  }
  
  users.splice(userIndex, 1);
  return true;
};

