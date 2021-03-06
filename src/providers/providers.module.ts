import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ProvidersResolver } from './providers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  providers: [ProvidersResolver, ProvidersService],
})
export class ProvidersModule {}
