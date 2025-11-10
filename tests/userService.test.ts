import { describe, it, expect } from 'vitest';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../src/services/userService';
import { User, CreateUserDto, UpdateUserDto } from '../src/types';

describe('User Service', () => {
  it('should return all users', async () => {
    const users = await getAllUsers();
    expect(users).toHaveLength(3);
    expect(users).toEqual(expect.arrayContaining([
      expect.objectContaining({ id: '1', name: 'João Silva' }),
      expect.objectContaining({ id: '2', name: 'Maria Santos' }),
      expect.objectContaining({ id: '3', name: 'Pedro Oliveira' }),
    ]));
  });

  it('should return user by id', async () => {
    const user = await getUserById('1');
    expect(user).toEqual(expect.objectContaining({ id: '1', name: 'João Silva' }));
  });

  it('should return undefined for non-existent user', async () => {
    const user = await getUserById('999');
    expect(user).toBeUndefined();
  });

  it('should create a new user', async () => {
    const newUserData: CreateUserDto = { name: 'Ana', email: 'ana@example.com', age: 28 };
    const newUser = await createUser(newUserData);
    expect(newUser).toEqual(expect.objectContaining({ id: '4', name: 'Ana' }));
  });

  it('should update an existing user', async () => {
    const updatedData: UpdateUserDto = { name: 'João Updated', email: 'joao.updated@example.com', age: 31 };
    const updatedUser = await updateUser('1', updatedData);
    expect(updatedUser).toEqual(expect.objectContaining({ id: '1', name: 'João Updated' }));
  });

  it('should return null when updating a non-existent user', async () => {
    const updatedUser = await updateUser('999', { name: 'Non-existent' });
    expect(updatedUser).toBeNull();
  });

  it('should delete an existing user', async () => {
    const result = await deleteUser('1');
    expect(result).toBe(true);
    const user = await getUserById('1');
    expect(user).toBeUndefined();
  });

  it('should return false when deleting a non-existent user', async () => {
    const result = await deleteUser('999');
    expect(result).toBe(false);
  });
});