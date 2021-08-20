import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProvidersService } from './providers.service';
import { Provider } from './entities/provider.entity';
import { CreateProviderInput } from './dto/create-provider.input';
import { UpdateProviderInput } from './dto/update-provider.input';

@Resolver(() => Provider)
export class ProvidersResolver {
  constructor(private readonly providersService: ProvidersService) {}

  @Mutation(() => Provider)
  async createProvider(
    @Args('data') data: CreateProviderInput,
  ): Promise<Provider> {
    return await this.providersService.create(data);
  }

  @Query(() => [Provider], { name: 'providers' })
  async findAll() {
    return await this.providersService.findAll();
  }

  @Query(() => Provider, { name: 'provider' })
  async findOneById(@Args('id', { type: () => Int }) id: number) {
    return await this.providersService.findOneById(id);
  }

  @Mutation(() => Provider)
  async updateProvider(
    @Args('id') id: number,
    @Args('data') data: UpdateProviderInput,
  ) {
    return await this.providersService.update(id, data);
  }

  @Mutation(() => Boolean)
  async removeProvider(@Args('id', { type: () => Int }) id: number) {
    return await this.providersService.remove(id);
  }
}
