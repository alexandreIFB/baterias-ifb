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
  async findAll(): Promise<Provider[]> {
    return await this.providersService.findAll();
  }

  @Query(() => Provider, { name: 'provider' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.providersService.findOne(id);
  }

  @Mutation(() => Provider)
  updateProvider(
    @Args('updateProviderInput') updateProviderInput: UpdateProviderInput,
  ) {
    return this.providersService.update(
      updateProviderInput.id,
      updateProviderInput,
    );
  }

  @Mutation(() => Provider)
  removeProvider(@Args('id', { type: () => Int }) id: number) {
    return this.providersService.remove(id);
  }
}
