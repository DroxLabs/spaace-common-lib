import { MigrationInterface, QueryRunner } from "typeorm";
export declare class addLoginNonce1686152338407 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}