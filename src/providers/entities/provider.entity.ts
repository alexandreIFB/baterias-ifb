import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Provider {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  name: string;

  email: string;

  cpf: string;

  password: string;
}
