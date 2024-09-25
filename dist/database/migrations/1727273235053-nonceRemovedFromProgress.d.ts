import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class NonceRemovedFromProgress1727273235053 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
