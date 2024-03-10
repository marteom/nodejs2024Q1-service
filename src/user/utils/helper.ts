import { UserModel } from '../user.model';
import { v4 as uuidv4 } from 'uuid';

export const getUser = (
  users: UserModel[],
  id: string,
): UserModel | undefined => {
  return users.find((element: UserModel) => element.id === id);
};

export const createUser = async (
  userLogin: string,
  userPassword: string,
): Promise<UserModel> => {
  const user: UserModel = {
    id: uuidv4(),
    login: userLogin,
    password: userPassword,
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  return user;
};

export const responseUserData = (
  user: UserModel,
): Omit<UserModel, 'password'> => {
  const { password, ...rest } = user;
  return rest;
};
