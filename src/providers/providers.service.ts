import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProviderInput } from './dto/create-provider.input';
import { UpdateProviderInput } from './dto/update-provider.input';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) {}

  async create(data: CreateProviderInput): Promise<Provider> {
    const provider = this.providerRepository.create(data);
    const providerSaved = await this.providerRepository.save(provider);

    if (!providerSaved) {
      throw new InternalServerErrorException(
        'Problema ao cadastrar o funcionario',
      );
    }

    return providerSaved;
  }

  async findAll(): Promise<Provider[]> {
    return await this.providerRepository.find();
  }

  async findOneById(id: number): Promise<Provider> {
    const provider = await this.providerRepository.findOne(id);
    if (!provider) {
      throw new NotFoundException('Funcionario com esse id não encontrado');
    }
    return provider;
  }

  async update(id: number, data: UpdateProviderInput) {
    const provider = await this.findOneById(id);

    await this.providerRepository.update(id, { ...data });

    const providerUpdated = this.providerRepository.create({
      ...provider,
      ...data,
    });

    return providerUpdated;
  }

  async remove(id: number): Promise<boolean> {
    await this.findOneById(id);

    const deleted = await this.providerRepository.delete(id);

    return deleted ? true : false;
  }
}
