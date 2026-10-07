import { MigrationInterface, QueryRunner } from "typeorm";

export class Dbupdated1755591532128 implements MigrationInterface {
    name = 'Dbupdated1755591532128'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "event_name"`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "event_name" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."invitations_event_code_key"`);
        await queryRunner.query(`DROP INDEX "public"."invitations_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."images_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."families_family_code_key"`);
        await queryRunner.query(`DROP INDEX "public"."families_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."family_access_pkey"`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "event_name"`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "event_name" character varying(150) NOT NULL`);
    }

}
