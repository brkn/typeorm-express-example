import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class AddIndexForLeaderboard1592819085637
implements MigrationInterface {
  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "create index rankings_index on \"player\" (user_id, display_name, country, points desc)",
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "DROP INDEX IF EXISTS rankings_index;",
    );
  }
}
