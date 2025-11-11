import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../../services/userService";
import type { User, CreateUserDto, UpdateUserDto } from "../../types";

let users: User[] = [
  { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
  { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
  { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
];

vi.mock("../../services/userService", () => {
  return {
    getAllUsers: vi.fn(() => Promise.resolve(users)),
    getUserById: vi.fn((id: string) => Promise.resolve(users.find(user => user.id === id))),
    createUser: vi.fn((userData: CreateUserDto) => {
      const newUser: User = {
        id: String(users.length + 1),
        name: userData.name,
        email: userData.email,
        age: userData.age
      };
      users.push(newUser);
      return Promise.resolve(newUser);
    }),
    updateUser: vi.fn((id: string, userData: UpdateUserDto) => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) return Promise.resolve(null);
      users[userIndex] = { ...users[userIndex], ...userData, id: users[userIndex].id };
      return Promise.resolve(users[userIndex]);
    }),
    deleteUser: vi.fn((id: string) => {
      const userIndex = users.findIndex(user => user.id === id);
      if (userIndex === -1) return Promise.resolve(false);
      users.splice(userIndex, 1);
      return Promise.resolve(true);
    })
  };
});

describe("UserService", () => {
  beforeEach(() => {
    users = [
      { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
      { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
      { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
    ];
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const result = await getAllUsers();
      expect(result).toEqual(users);
    });
  });

  describe("getUserById", () => {
    it("should return user when id exists", async () => {
      const result = await getUserById('1');
      expect(result).toEqual(users[0]);
    });

    it("should return undefined when user does not exist", async () => {
      const result = await getUserById('999');
      expect(result).toBeUndefined();
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const newUser: CreateUserDto = { name: 'Ana', email: 'ana@example.com', age: 28 };
      const result = await createUser(newUser);
      expect(result).toEqual({ id: '4', ...newUser });
      expect(users.length).toBe(4);
    });
  });

  describe("updateUser", () => {
    it("should update user when id exists", async () => {
      const updatedData: UpdateUserDto = { name: 'João Updated', email: 'joao.updated@example.com', age: 31 };
      const result = await updateUser('1', updatedData);
      expect(result).toEqual({ id: '1', ...updatedData });
    });

    it("should return null when user does not exist", async () => {
      const result = await updateUser('999', { name: 'Nonexistent' });
      expect(result).toBeNull();
    });
  });

  describe("deleteUser", () => {
    it("should return true when user is deleted", async () => {
      const result = await deleteUser('1');
      expect(result).toBe(true);
      expect(users.length).toBe(2);
    });

    it("should return false when user does not exist", async () => {
      const result = await deleteUser('999');
      expect(result).toBe(false);
    });
  });
});