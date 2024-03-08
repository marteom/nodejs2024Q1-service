import { UserModel } from '../user.model';

export const responseUserData = (
  user: UserModel,
): Omit<UserModel, 'password'> => {
  const { password, ...rest } = user;
  return rest;
};
