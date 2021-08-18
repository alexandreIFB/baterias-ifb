import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    const provider = await this.providerRepository.create(data);
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

  findOne(id: number) {
    return `This action returns a #${id} provider`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateProviderInput: UpdateProviderInput) {
    return `This action updates a #${id} provider`;
  }

  remove(id: number) {
    return `This action removes a #${id} provider`;
  }
}
