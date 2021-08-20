import { CreateProviderInput } from './create-provider.input';
import { InputType, PartialType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class UpdateProviderInput extends PartialType(CreateProviderInput) {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser nulo' })
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email não pode ser nulo' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsNotEmpty({ message: 'CPF não pode ser nulo' })
  @IsOptional()
  cpf?: string;

  @IsNotEmpty({ message: 'Password não pode ser nulo' })
  @IsString()
  @IsOptional()
  password?: string;

  @IsBoolean()
  @IsOptional()
  isSeller?: boolean;

  @IsNotEmpty({ message: 'Data de aniversario não pode ser nulo' })
  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @IsDate()
  @IsOptional()
  @IsOptional()
  startDate?: Date;
}
