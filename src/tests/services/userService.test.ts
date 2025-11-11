import { describe, it, expect, beforeEach } from "vitest";
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

describe("UserService", () => {
  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const result = await getAllUsers();
      expect(result).toEqual(users);
    });
  });

  describe("getUserById", () => {
    it("should return user when id exists", async () => {
      const result = await getUserById("1");
      expect(result).toEqual(users[0]);
    });

    it("should return undefined when user id does not exist", async () => {
      const result = await getUserById("999");
      expect(result).toBeUndefined();
    });
  });

  describe("createUser", () => {
    it("should create a new user", async () => {
      const newUser: CreateUserDto = { name: "Ana Costa", email: "ana@example.com", age: 28 };
      const result = await createUser(newUser);
      expect(result).toMatchObject(newUser);
      expect(result.id).toBe("4"); // Assuming this is the fourth user
    });
  });

  describe("updateUser", () => {
    it("should update user when id exists", async () => {
      const updatedData: UpdateUserDto = { name: "João Updated", age: 31 };
      const result = await updateUser("1", updatedData);
      expect(result).toMatchObject({ ...users[0], ...updatedData });
    });

    it("should return null when user id does not exist", async () => {
      const result = await updateUser("999", { name: "Nonexistent" });
      expect(result).toBeNull();
    });
  });

  describe("deleteUser", () => {
    it("should delete user when id exists", async () => {
      const result = await deleteUser("1");
      expect(result).toBe(true);
      expect(await getUserById("1")).toBeUndefined(); // Verify user is deleted
    });

    it("should return false when user id does not exist", async () => {
      const result = await deleteUser("999");
      expect(result).toBe(false);
    });
  });
});