import { InputType } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProviderInput {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser nulo' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email não pode ser nulo' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'CPF não pode ser nulo' })
  cpf: string;

  @IsNotEmpty({ message: 'Password não pode ser nulo' })
  @IsString()
  password: string;

  @IsBoolean()
  isSeller: boolean;
}
