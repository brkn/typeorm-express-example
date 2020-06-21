import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class AddUuidExtension1589042328082
implements MigrationInterface {
  name = "AddUuidExtension1589042328082";

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "create extension if not exists \"uuid-ossp\"",
      undefined,
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "drop extension if exists \"uuid-ossp\"",
      undefined,
    );
  }
}
