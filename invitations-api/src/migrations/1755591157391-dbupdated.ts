import { MigrationInterface, QueryRunner } from "typeorm";

export class Dbupdated1755591157391 implements MigrationInterface {
    name = 'Dbupdated1755591157391'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "event_name"`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "event_name" character varying(150) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "event_name"`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "event_name" character varying(255) NOT NULL`);
    }

}
