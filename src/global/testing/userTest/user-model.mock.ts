import { getModelToken } from '@nestjs/mongoose';
import { userModelList } from './user-model-list.mock';

export const userModelMock = {
  provide: getModelToken('User'),
  useValue: {
    findOne: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    create: jest.fn().mockResolvedValue(userModelList[0]),
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
};
