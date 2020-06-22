import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class ChangePointsOfPlayerToDouble1592808393651
implements MigrationInterface {
  name =
    "ChangePointsOfPlayerToDouble1592808393651";

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE \"player\" ADD CONSTRAINT \"UQ_d04e64fc9b7fd372000c0dfda3f\" UNIQUE (\"user_id\")",
    );
    await queryRunner.query(
      "ALTER TABLE \"player\" DROP COLUMN \"points\"",
    );
    await queryRunner.query(
      "ALTER TABLE \"player\" ADD \"points\" double precision NOT NULL",
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE \"player\" DROP COLUMN \"points\"",
    );
    await queryRunner.query(
      "ALTER TABLE \"player\" ADD \"points\" integer NOT NULL",
    );
    await queryRunner.query(
      "ALTER TABLE \"player\" DROP CONSTRAINT \"UQ_d04e64fc9b7fd372000c0dfda3f\"",
    );
  }
}
