import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProviders1629317903525 implements MigrationInterface {
  private table = new Table({
    name: 'providers',
    columns: [
      {
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'text',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'email',
        type: 'text',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'cpf',
        type: 'text',
        isUnique: true,
        isNullable: false,
      },
      {
        name: 'password',
        type: 'text',
        isNullable: false,
      },
      {
        name: 'is_seller',
        type: 'boolean',
        default: false,
      },
      {
        name: 'created_at',
        type: 'timestamptz',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamptz',
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
