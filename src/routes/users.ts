import { Router } from 'express';
import { UserValidationRule } from '../models/user';
import UserControllers from '../controllers/user';

const users = Router();

users.get('', UserControllers.getAllUsers);
users.get('/:userId', UserValidationRule.getUserById, UserControllers.getUserById);
users.patch('/me', UserValidationRule.patchUser, UserControllers.patchUser);
users.patch('/me/avatar', UserValidationRule.patchAvatarUser, UserControllers.patchAvatarUser);

export default users;
