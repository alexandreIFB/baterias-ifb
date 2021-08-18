import { InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProviderInput {
  @IsString()
  @IsNotEmpty({ message: 'Nome não pode ser nulo' })
  name: string;

  @IsEmail()
  email: string;
}
