import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ActionTypeAdded1715095430601 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
