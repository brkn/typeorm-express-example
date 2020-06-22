import {
  Entity,
  BaseEntity,
  Column,
  Unique,
  PrimaryColumn,
} from "typeorm";

export interface PlayerParams {
  user_id: string;
  display_name: string;
  country?: string;
  points?: number;
}

@Entity()
@Unique("User_id has to be unique", ["user_id"])
export class Player extends BaseEntity {
  @PrimaryColumn()
  user_id!: string;

  @Column()
  display_name!: string;

  @Column()
  country!: string;

  @Column("double precision")
  points!: number;

  construct({
    user_id,
    display_name,
    country = "tr",
    points = 0,
  }: PlayerParams) {
    this.user_id = user_id;
    this.display_name = display_name;
    this.country = country;
    this.points = points;
  }
}
