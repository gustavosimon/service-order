import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createServiceOrder1594770538649 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'service_orders',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment',
          },
          {
            name: 'owner_id',
            type: 'integer',
          },
          {
            name: 'operator_id',
            type: 'integer',
          },
          {
            name: 'customer_id',
            type: 'integer',
          },
          {
            name: 'product_id',
            type: 'integer',
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['P', 'A', 'D'],
          },
          {
            name: 'diagnosis',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['owner_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['operator_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            referencedTableName: 'customers',
            referencedColumnNames: ['id'],
            columnNames: ['customer_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['product_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('service_orders');
  }
}
