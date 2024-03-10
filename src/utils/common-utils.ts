import { validate as uuidValidate } from 'uuid';

export const isIdValid = async (id: string): Promise<boolean> => {
  return uuidValidate(id);
};
