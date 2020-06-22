import {
  MigrationInterface,
  QueryRunner,
} from "typeorm";

export class AddPlayerTable1592809120413
implements MigrationInterface {
  name = "AddPlayerTable1592809120413";

  public async up(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE \"player\" (\"user_id\" character varying NOT NULL, \"display_name\" character varying NOT NULL, \"country\" character varying NOT NULL, \"points\" double precision NOT NULL, CONSTRAINT \"User_id has to be unique\" UNIQUE (\"user_id\"), CONSTRAINT \"PK_d04e64fc9b7fd372000c0dfda3f\" PRIMARY KEY (\"user_id\"))",
    );
  }

  public async down(
    queryRunner: QueryRunner,
  ): Promise<void> {
    await queryRunner.query(
      "DROP TABLE \"player\"",
    );
  }
}
