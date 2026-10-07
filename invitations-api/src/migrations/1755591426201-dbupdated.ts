import { MigrationInterface, QueryRunner } from "typeorm";

export class Dbupdated1755591426201 implements MigrationInterface {
    name = 'Dbupdated1755591426201'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "family_access" DROP CONSTRAINT "family_access_family_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "families" DROP CONSTRAINT "families_invitation_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "images_invitation_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "family_access" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "family_access" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "family_access" ALTER COLUMN "family_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "families" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "families" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "families" ALTER COLUMN "invitation_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "invitation_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "event_name"`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "event_name" character varying(150) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "invitations" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "invitations" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "family_access" ADD CONSTRAINT "FK_6d4e027367e0adb2b8375e9ad8f" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "families" ADD CONSTRAINT "FK_fec13306d9c195f31b3d85f96ab" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "FK_257b3e2cd9ac66573f418427954" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "images" DROP CONSTRAINT "FK_257b3e2cd9ac66573f418427954"`);
        await queryRunner.query(`ALTER TABLE "families" DROP CONSTRAINT "FK_fec13306d9c195f31b3d85f96ab"`);
        await queryRunner.query(`ALTER TABLE "family_access" DROP CONSTRAINT "FK_6d4e027367e0adb2b8375e9ad8f"`);
        await queryRunner.query(`DROP INDEX "public"."invitations_event_code_key"`);
        await queryRunner.query(`DROP INDEX "public"."invitations_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."images_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."families_family_code_key"`);
        await queryRunner.query(`DROP INDEX "public"."families_pkey"`);
        await queryRunner.query(`DROP INDEX "public"."family_access_pkey"`);
        await queryRunner.query(`ALTER TABLE "invitations" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "invitations" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "invitations" DROP COLUMN "event_name"`);
        await queryRunner.query(`ALTER TABLE "invitations" ADD "event_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "invitation_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "images" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "families" ALTER COLUMN "invitation_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "families" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "families" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "family_access" ALTER COLUMN "family_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "family_access" ALTER COLUMN "updated_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "family_access" ALTER COLUMN "created_at" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "images" ADD CONSTRAINT "images_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "families" ADD CONSTRAINT "families_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "invitations"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "family_access" ADD CONSTRAINT "family_access_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
