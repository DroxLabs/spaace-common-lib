import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UuidAddedInUserSchema1720703812000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
