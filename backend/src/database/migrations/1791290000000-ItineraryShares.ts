import { MigrationInterface, QueryRunner } from 'typeorm';

export class ItineraryShares1791290000000 implements MigrationInterface {
  name = 'ItineraryShares1791290000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "itinerary_shares" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "itineraryId" uuid NOT NULL,
        "ownerId" uuid NOT NULL,
        "tokenHash" character varying(64) NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "expiresAt" TIMESTAMP,
        "revokedAt" TIMESTAMP,
        "includeNotes" boolean NOT NULL DEFAULT false,
        "viewCount" integer NOT NULL DEFAULT 0,
        "lastViewedAt" TIMESTAMP,
        "allowCopy" boolean NOT NULL DEFAULT true,
        CONSTRAINT "UQ_itinerary_shares_tokenHash" UNIQUE ("tokenHash"),
        CONSTRAINT "PK_itinerary_shares_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_itinerary_shares_itinerary" FOREIGN KEY ("itineraryId") REFERENCES "itineraries"("id") ON DELETE CASCADE ON UPDATE NO ACTION,
        CONSTRAINT "FK_itinerary_shares_owner" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION
      )
    `);
    await queryRunner.query(`CREATE INDEX "IDX_itinerary_shares_itineraryId" ON "itinerary_shares" ("itineraryId")`);
    await queryRunner.query(`CREATE INDEX "IDX_itinerary_shares_ownerId" ON "itinerary_shares" ("ownerId")`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_itinerary_shares_ownerId"`);
    await queryRunner.query(`DROP INDEX "IDX_itinerary_shares_itineraryId"`);
    await queryRunner.query(`DROP TABLE "itinerary_shares"`);
  }
}
