import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../controllers/userController';
import * as userService from '../../services/userService';
import type { Request, Response, NextFunction } from 'express';

vi.mock('../../services/userService');

describe('UserController', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {};
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
    };
    mockNext = vi.fn();
    vi.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: '1', name: 'John Doe' }];
      vi.mocked(userService.getAllUsers).mockResolvedValue(mockUsers);

      await getAllUsers(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Database error');
      vi.mocked(userService.getAllUsers).mockRejectedValue(mockError);

      await getAllUsers(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getUserById', () => {
    it('should return user when id exists', async () => {
      const mockUser = { id: '1', name: 'John Doe' };
      mockReq.params = { id: '1' };
      vi.mocked(userService.getUserById).mockResolvedValue(mockUser);

      await getUserById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 when user not found', async () => {
      mockReq.params = { id: '999' };
      vi.mocked(userService.getUserById).mockResolvedValue(null);

      await getUserById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Database error');
      mockReq.params = { id: '1' };
      vi.mocked(userService.getUserById).mockRejectedValue(mockError);

      await getUserById(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const userData = { name: 'Jane Doe' };
      mockReq.body = userData;
      const mockNewUser = { id: '2', ...userData };
      vi.mocked(userService.createUser).mockResolvedValue(mockNewUser);

      await createUser(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith(mockNewUser);
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Database error');
      mockReq.body = { name: 'Jane Doe' };
      vi.mocked(userService.createUser).mockRejectedValue(mockError);

      await createUser(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateUser', () => {
    it('should update and return the user when id exists', async () => {
      const userData = { name: 'John Smith' };
      mockReq.params = { id: '1' };
      mockReq.body = userData;
      const mockUpdatedUser = { id: '1', ...userData };
      vi.mocked(userService.updateUser).mockResolvedValue(mockUpdatedUser);

      await updateUser(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith(mockUpdatedUser);
    });

    it('should return 404 when user not found', async () => {
      mockReq.params = { id: '999' };
      mockReq.body = { name: 'John Smith' };
      vi.mocked(userService.updateUser).mockResolvedValue(null);

      await updateUser(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Database error');
      mockReq.params = { id: '1' };
      mockReq.body = { name: 'John Smith' };
      vi.mocked(userService.updateUser).mockRejectedValue(mockError);

      await updateUser(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteUser', () => {
    it('should delete user and return success message', async () => {
      mockReq.params = { id: '1' };
      vi.mocked(userService.deleteUser).mockResolvedValue(true);

      await deleteUser(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
    });

    it('should return 404 when user not found', async () => {
      mockReq.params = { id: '999' };
      vi.mocked(userService.deleteUser).mockResolvedValue(false);

      await deleteUser(mockReq as Request, mockRes as Response, mockNext);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should call next with error on failure', async () => {
      const mockError = new Error('Database error');
      mockReq.params = { id: '1' };
      vi.mocked(userService.deleteUser).mockRejectedValue(mockError);

      await deleteUser(mockReq as Request, mockRes as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
});