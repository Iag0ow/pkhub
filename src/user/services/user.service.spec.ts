import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../services/user.service';
import { userModelMock } from '../../global/testing/userTest/user-model.mock';
import { userModelList } from '../../global/testing/userTest/user-model-list.mock';
import { createUserDto } from '../../global/testing/userTest/create-user.dto.mock';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, userModelMock],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    test('method create', async () => {
      const result = await service.register(createUserDto);
      expect(result).toEqual(userModelList[0]);
    });
  });
});
