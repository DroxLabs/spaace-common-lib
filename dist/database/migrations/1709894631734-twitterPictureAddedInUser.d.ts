import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class TwitterPictureAddedInUser1709894631734 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
