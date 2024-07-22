import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UserWalletAddressSetToBeUnique1721664229695 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
