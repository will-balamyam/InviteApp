import { MigrationInterface, QueryRunner } from "typeorm";

export class Dbupdated1755613282079 implements MigrationInterface {
    name = 'Dbupdated1755613282079'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "user" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "created_at" TIMESTAMP DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_pkey" ON "users" ("id") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."invitations_event_code_key"`);
        await queryRunner.query(`DROP INDEX "public"."invitations_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."images_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."families_family_code_key"`);
        await queryRunner.query(`DROP INDEX "public"."families_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."family_access_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."users_pkey"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
