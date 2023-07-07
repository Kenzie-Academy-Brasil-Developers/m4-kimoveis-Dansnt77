import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688666425198 implements MigrationInterface {
    name = 'InitialMigration1688666425198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "date" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "hour" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "hour"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "hour" TIME NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "date" date NOT NULL`);
    }

}
