import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Families } from "./Families";

@Index("family_access_pkey", ["id"], { unique: true })
@Entity("family_access", { schema: "public" })
export class FamilyAccess {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "member_name", length: 255 })
  memberName: string;

  @Column("boolean", {
    name: "confirmed",
    nullable: true,
    default: () => null,
  })
  confirmed: boolean | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @ManyToOne(() => Families, (families) => families.familyAccesses, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "family_id", referencedColumnName: "id" }])
  family: Families;
}
