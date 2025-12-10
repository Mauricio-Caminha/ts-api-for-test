import { describe, it, expect, beforeEach, vi } from "vitest";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../src/services/userService";
import type { User, CreateUserDto, UpdateUserDto } from "../src/types";

let users: User[];

beforeEach(() => {
  users = [
    { id: '1', name: 'João Silva', email: 'joao@example.com', age: 30 },
    { id: '2', name: 'Maria Santos', email: 'maria@example.com', age: 25 },
    { id: '3', name: 'Pedro Oliveira', email: 'pedro@example.com', age: 35 }
  ];
  vi.spyOn(global, 'users', 'get').mockReturnValue(users);
});

describe("User Service", () => {
  it("should return all users", async () => {
    const result = await getAllUsers();
    expect(result).toEqual(users);
  });

  it("should return a user by ID", async () => {
    const result = await getUserById('1');
    expect(result).toEqual(users[0]);
  });

  it("should create a new user", async () => {
    const newUserData: CreateUserDto = { name: 'Ana Costa', email: 'ana@example.com', age: 28 };
    const result = await createUser(newUserData);
    expect(result).toHaveProperty('id');
    expect(result.name).toBe(newUserData.name);
    expect(result.email).toBe(newUserData.email);
    expect(result.age).toBe(newUserData.age);
  });

  it("should update an existing user", async () => {
    const updatedData: UpdateUserDto = { name: 'João Silva Updated', email: 'joao.updated@example.com', age: 31 };
    const result = await updateUser('1', updatedData);
    expect(result).toEqual({ ...users[0], ...updatedData });
  });

  it("should return null when updating a non-existing user", async () => {
    const result = await updateUser('999', { name: 'Non-existent', email: 'nonexistent@example.com', age: 40 });
    expect(result).toBeNull();
  });

  it("should delete an existing user", async () => {
    const result = await deleteUser('1');
    expect(result).toBe(true);
    expect(await getUserById('1')).toBeUndefined();
  });

  it("should return false when deleting a non-existing user", async () => {
    const result = await deleteUser('999');
    expect(result).toBe(false);
  });
});