import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class DefaultValueAddedInUserStarTracking1727971711655 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
