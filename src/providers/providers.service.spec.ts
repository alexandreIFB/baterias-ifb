import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestUtil } from './../common/test/TestUtil';
import { Provider } from './entities/provider.entity';
import { ProvidersService } from './providers.service';

describe('ProvidersService', () => {
  let service: ProvidersService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProvidersService,
        {
          provide: getRepositoryToken(Provider),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ProvidersService>(ProvidersService);
  });

  beforeEach(() => {
    mockRepository.create.mockReset();
    mockRepository.find.mockReset();
    mockRepository.findOne.mockReset();
    mockRepository.save.mockReset();
    mockRepository.update.mockReset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should be list all providers', async () => {
      const provider = TestUtil.giveAMeValideProvider();
      mockRepository.find.mockReturnValue([provider, provider]);
      const providers = await service.findAll();

      expect(providers).toHaveLength(2);
      expect(mockRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOneById', () => {
    it('should be one provider', async () => {
      const provider = TestUtil.giveAMeValideProvider();
      mockRepository.findOne.mockReturnValue(provider);
      const providerFound = await service.findOneById(1);

      expect(providerFound).toMatchObject({ name: provider.name });
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should return a expection when does not to find a user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      expect(service.findOneById(4)).rejects.toBeInstanceOf(NotFoundException);
      expect(mockRepository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('shoul create a user', async () => {
      const provider = TestUtil.giveAMeValideProvider();
      mockRepository.create.mockReturnValue(provider);
      mockRepository.save.mockReturnValue(provider);

      const saveProvider = await service.create(provider);
      expect(saveProvider).toMatchObject(provider);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
    it('shoul return a expection when does not to create a user', async () => {
      const provider = TestUtil.giveAMeValideProvider();
      mockRepository.create.mockReturnValue(null);
      mockRepository.save.mockReturnValue(null);

      await service.create(provider).catch((e) => {
        expect(e).toBeInstanceOf(InternalServerErrorException);
        expect(e).toMatchObject({
          message: 'Problema ao cadastrar o funcionario',
        });
      });
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledTimes(1);
    });
  });

  describe('update', () => {
    it('shoul updated a user', async () => {
      const provider = TestUtil.giveAMeValideProvider();
      const paramsUpdateProvider = {
        name: 'Nome Atualizado',
      };

      mockRepository.findOne.mockReturnValue(provider);
      mockRepository.update.mockReturnValue({
        ...provider,
        ...paramsUpdateProvider,
      });
      mockRepository.create.mockReturnValue({
        ...provider,
        ...paramsUpdateProvider,
      });

      const providerUpdated = await service.update(1, {
        ...paramsUpdateProvider,
      });

      expect(providerUpdated).toMatchObject(paramsUpdateProvider);
      expect(mockRepository.update).toBeCalledTimes(1);
      expect(mockRepository.create).toBeCalledTimes(1);
      expect(mockRepository.findOne).toBeCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should be remove provider', async () => {
      const provider = TestUtil.giveAMeValideProvider();
      mockRepository.findOne.mockReturnValue(provider);
      mockRepository.delete.mockReturnValue(1);

      const deleted = await service.remove(1);

      expect(deleted).toBe(true);
    });
    it('should be remove error', async () => {
      const provider = TestUtil.giveAMeValideProvider();
      mockRepository.findOne.mockReturnValue(provider);
      mockRepository.delete.mockReturnValue(null);

      const deleted = await service.remove(1);

      expect(deleted).toBe(false);
    });
  });
});
