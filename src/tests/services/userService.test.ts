import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../../services/userService";
import type { User, CreateUserDto, UpdateUserDto } from "../../types";

let users: User[];

beforeEach(() => {
  users = [
    { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
    { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
    { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
  ];
});

afterEach(() => {
  users = [];
});

describe("UserService", () => {
  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const result = await getAllUsers();
      expect(result).toHaveLength(3);
      expect(result).toEqual(users);
    });
  });

  describe("getUserById", () => {
    it("should return a user by id", async () => {
      const result = await getUserById("1");
      expect(result).toEqual(users[0]);
    });

    it("should return undefined for a non-existent user", async () => {
      const result = await getUserById("999");
      expect(result).toBeUndefined();
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const newUser: CreateUserDto = { name: "Ana Costa", email: "ana@example.com", age: 28 };
      const result = await createUser(newUser);
      expect(result).toHaveProperty("id");
      expect(result.name).toEqual(newUser.name);
      expect(result.email).toEqual(newUser.email);
      expect(result.age).toEqual(newUser.age);
    });
  });

  describe("updateUser", () => {
    it("should update an existing user", async () => {
      const updatedData: UpdateUserDto = { name: "João Updated", email: "joao.updated@example.com", age: 31 };
      const result = await updateUser("1", updatedData);
      expect(result).toEqual({ id: "1", ...updatedData });
    });

    it("should return null for a non-existent user", async () => {
      const result = await updateUser("999", { name: "Non-existent" });
      expect(result).toBeNull();
    });
  });

  describe("deleteUser", () => {
    it("should delete an existing user", async () => {
      const result = await deleteUser("1");
      expect(result).toBe(true);
      const usersAfterDelete = await getAllUsers();
      expect(usersAfterDelete).toHaveLength(2);
    });

    it("should return false for a non-existent user", async () => {
      const result = await deleteUser("999");
      expect(result).toBe(false);
    });
  });
});