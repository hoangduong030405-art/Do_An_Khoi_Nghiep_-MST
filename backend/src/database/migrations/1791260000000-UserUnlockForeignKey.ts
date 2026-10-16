import { MigrationInterface, QueryRunner } from "typeorm";

export class UserUnlockForeignKey1791260000000 implements MigrationInterface {
    name = 'UserUnlockForeignKey1791260000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add foreign key constraint for user_unlocks.placeId -> places.id
        await queryRunner.query(
            `ALTER TABLE "user_unlocks" ADD CONSTRAINT "FK_user_unlocks_placeId" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_unlocks" DROP CONSTRAINT "FK_user_unlocks_placeId"`);
    }
}
