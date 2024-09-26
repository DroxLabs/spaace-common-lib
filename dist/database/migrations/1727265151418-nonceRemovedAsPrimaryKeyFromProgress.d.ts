import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class NonceRemovedAsPrimaryKeyFromProgress1727265151418 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
